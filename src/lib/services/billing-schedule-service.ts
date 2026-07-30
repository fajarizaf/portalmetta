import { prisma } from "@/lib/prisma";
import { Prisma } from "@/generated/prisma/client";
import { ChargeTypeRegistry } from "./charge-type-registry";

export interface BillingScheduleInput {
  subscriptionId: string;
  salesOrderId: string;
  customerId: string;
  itemName: string;
  chargeType: string; // NRC, MRC, SETUP_FEE, etc.
  billingPeriodStart: Date;
  billingPeriodEnd: Date;
  dueDate: Date;
  amount: number;
}

export interface BillingScheduleItem {
  id: string;
  subscriptionId: string;
  salesOrderId: string;
  customerId: string;
  itemName: string;
  chargeType: string;
  billingPeriodStart: string; // YYYY-MM-DD
  billingPeriodEnd: string;   // YYYY-MM-DD
  dueDate: string;            // YYYY-MM-DD
  amount: number;
  invoiceId?: string | null;
  invoiceCode?: string | null;
  status: "Pending" | "Ready" | "Invoiced" | "Paid" | "Cancelled" | "Skipped";
}

function formatDate(date: Date): string {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

export class BillingScheduleService {
  /**
   * Generates all Billing Schedule records for a given Subscription.
   * Handles NRC (one time) and MRC (periodic per contract duration).
   */
  public static async generateSchedulesForSubscription(subscriptionId: string): Promise<BillingScheduleItem[]> {
    const subscription = await prisma.docRecord.findUnique({
      where: { id: subscriptionId },
      include: { docType: true },
    });

    if (!subscription || subscription.docType.key !== "subscription_management") {
      throw new Error("Subscription non-existent or invalid docType");
    }

    const subData = (subscription.data ?? {}) as Record<string, any>;
    const salesOrderId = String(subData.sales_order_id || "");
    const customerId = String(subData.customer_id || "");
    const startDateStr = String(subData.start_date || new Date().toISOString().split("T")[0]);
    const durationMonths = Math.max(1, Number(subData.contract_duration || subData.duration || 12));
    const frequency = String(subData.frequency || "Monthly");
    const serviceName = String(subData.service_name || "Layanan Service");

    const startDate = new Date(startDateStr);
    const scheduleDt = await prisma.docType.findUnique({ where: { key: "billing_schedule" } });
    if (!scheduleDt) {
      throw new Error("DocType 'billing_schedule' not found. Please ensure seed is executed.");
    }

    // Check if schedules already generated to prevent duplication
    const existingSchedules = await prisma.docRecord.findMany({
      where: {
        docTypeId: scheduleDt.id,
        parentId: subscriptionId,
      },
    });

    if (existingSchedules.length > 0) {
      return existingSchedules.map((rec) => this.mapDocRecordToScheduleItem(rec));
    }

    // Fetch items from Sales Order
    const soItemDt = await prisma.docType.findUnique({ where: { key: "sales_order_item" } });
    const soItems = soItemDt
      ? await prisma.docRow.findMany({
          where: { recordId: salesOrderId, childDocTypeId: soItemDt.id },
          orderBy: { idx: "asc" },
        })
      : [];

    const scheduleInputs: BillingScheduleInput[] = [];

    if (soItems.length > 0) {
      for (const itemRow of soItems) {
        const itemData = (itemRow.data ?? {}) as Record<string, any>;
        const itemName = String(itemData.service_name || itemData.description || serviceName);
        const qty = Number(itemData.qty) || 1;
        const nrc = Number(itemData.nrc) || Number(itemData.setup_fee) || 0;
        const mrc = Number(itemData.mrc) || 0;

        // 1. NRC Schedule (One time charge at contract start)
        if (nrc > 0) {
          scheduleInputs.push({
            subscriptionId,
            salesOrderId,
            customerId,
            itemName: `${itemName} - Setup (NRC)`,
            chargeType: "NRC",
            billingPeriodStart: new Date(startDate),
            billingPeriodEnd: new Date(startDate),
            dueDate: new Date(startDate),
            amount: nrc * qty,
          });
        }

        // 2. MRC Schedules (Periodic recurring charges with mid-month Prorate support)
        if (mrc > 0) {
          const stepMonths = frequency === "Quarterly" ? 3 : frequency === "Annually" ? 12 : 1;
          const totalPeriods = Math.ceil(durationMonths / stepMonths);
          const startDay = startDate.getDate();

          for (let p = 0; p < totalPeriods; p++) {
            let periodStart: Date;
            let periodEnd: Date;
            let amount = mrc * qty * stepMonths;
            let periodLabel = totalPeriods === 1 ? "" : ` Bulan ${p + 1}`;

            if (p === 0 && startDay > 1) {
              // Mid-month Prorate calculation for period 1
              periodStart = new Date(startDate);
              periodEnd = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);
              const daysInMonth = periodEnd.getDate();
              const activeDays = daysInMonth - startDay + 1;
              amount = Math.round((mrc * qty * activeDays) / daysInMonth);
              periodLabel += ` (Prorate ${activeDays}/${daysInMonth} Hari)`;
            } else {
              periodStart = new Date(startDate.getFullYear(), startDate.getMonth() + p * stepMonths, p === 0 ? startDay : 1);
              periodEnd = new Date(startDate.getFullYear(), startDate.getMonth() + (p + 1) * stepMonths, 0);
            }
            
            const dueDate = new Date(periodStart);

            scheduleInputs.push({
              subscriptionId,
              salesOrderId,
              customerId,
              itemName: `${itemName} - MRC${periodLabel}`,
              chargeType: "MRC",
              billingPeriodStart: periodStart,
              billingPeriodEnd: periodEnd,
              dueDate: dueDate,
              amount: amount,
            });
          }
        }
      }
    } else {
      // Fallback if no item rows detailed: generate based on subscription header fields
      const totalNrc = Number(subData.total_nrc) || 0;
      const totalMrc = Number(subData.total_mrc) || 0;

      if (totalNrc > 0) {
        scheduleInputs.push({
          subscriptionId,
          salesOrderId,
          customerId,
          itemName: `${serviceName} - Setup (NRC)`,
          chargeType: "NRC",
          billingPeriodStart: new Date(startDate),
          billingPeriodEnd: new Date(startDate),
          dueDate: new Date(startDate),
          amount: totalNrc,
        });
      }

      if (totalMrc > 0) {
        const stepMonths = frequency === "Quarterly" ? 3 : frequency === "Annually" ? 12 : 1;
        const totalPeriods = Math.ceil(durationMonths / stepMonths);
        const startDay = startDate.getDate();

        for (let p = 0; p < totalPeriods; p++) {
          let periodStart: Date;
          let periodEnd: Date;
          let amount = totalMrc * stepMonths;
          let periodLabel = totalPeriods === 1 ? "" : ` Bulan ${p + 1}`;

          if (p === 0 && startDay > 1) {
            periodStart = new Date(startDate);
            periodEnd = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);
            const daysInMonth = periodEnd.getDate();
            const activeDays = daysInMonth - startDay + 1;
            amount = Math.round((totalMrc * activeDays) / daysInMonth);
            periodLabel += ` (Prorate ${activeDays}/${daysInMonth} Hari)`;
          } else {
            periodStart = new Date(startDate.getFullYear(), startDate.getMonth() + p * stepMonths, p === 0 ? startDay : 1);
            periodEnd = new Date(startDate.getFullYear(), startDate.getMonth() + (p + 1) * stepMonths, 0);
          }

          const dueDate = new Date(periodStart);

          scheduleInputs.push({
            subscriptionId,
            salesOrderId,
            customerId,
            itemName: `${serviceName} - MRC${periodLabel}`,
            chargeType: "MRC",
            billingPeriodStart: periodStart,
            billingPeriodEnd: periodEnd,
            dueDate: dueDate,
            amount: amount,
          });
        }
      }
    }

    const todayStr = formatDate(new Date());
    const createdItems: BillingScheduleItem[] = [];

    // Create DocRecords for each schedule input
    for (let i = 0; i < scheduleInputs.length; i++) {
      const input = scheduleInputs[i];
      const dueStr = formatDate(input.dueDate);
      const isDueOrPast = dueStr <= todayStr;
      const initialStatus = isDueOrPast ? "Ready" : "Pending";

      const scheduleData = {
        subscription_id: input.subscriptionId,
        sales_order_id: input.salesOrderId,
        customer_id: input.customerId,
        item_name: input.itemName,
        charge_type: input.chargeType,
        billing_period_start: formatDate(input.billingPeriodStart),
        billing_period_end: formatDate(input.billingPeriodEnd),
        due_date: dueStr,
        amount: input.amount,
        status: initialStatus,
        invoice_id: null,
        invoice_code: null,
      };

      const record = await prisma.docRecord.create({
        data: {
          docTypeId: scheduleDt.id,
          branchId: subscription.branchId,
          code: `SCH-${subscription.code || subscription.id.slice(0, 6)}-${String(i + 1).padStart(2, "0")}`,
          status: initialStatus,
          docStatus: 0,
          data: scheduleData as unknown as Prisma.InputJsonValue,
          parentId: subscriptionId,
          createdById: subscription.createdById,
        },
      });

      createdItems.push(this.mapDocRecordToScheduleItem(record));
    }

    return createdItems;
  }

  /**
   * Retrieves all billing schedule items for a subscription and updates Pending -> Ready if due date reached.
   */
  public static async getSchedulesForSubscription(subscriptionId: string): Promise<BillingScheduleItem[]> {
    const scheduleDt = await prisma.docType.findUnique({ where: { key: "billing_schedule" } });
    if (!scheduleDt) return [];

    const records = await prisma.docRecord.findMany({
      where: {
        docTypeId: scheduleDt.id,
        parentId: subscriptionId,
      },
      orderBy: { createdAt: "asc" },
    });

    const todayStr = formatDate(new Date());
    const results: BillingScheduleItem[] = [];

    for (const rec of records) {
      const d = (rec.data ?? {}) as Record<string, any>;
      let status = rec.status || d.status || "Pending";
      const dueDate = String(d.due_date || "");

      // Auto update Pending -> Ready if due date is reached
      if (status === "Pending" && dueDate && dueDate <= todayStr) {
        status = "Ready";
        d.status = "Ready";
        await prisma.docRecord.update({
          where: { id: rec.id },
          data: {
            status: "Ready",
            data: d as unknown as Prisma.InputJsonValue,
          },
        });
      }

      results.push(this.mapDocRecordToScheduleItem({ ...rec, status }));
    }

    return results;
  }

  /**
   * Sync schedule status when invoice is cancelled (resets Invoiced -> Pending / Ready).
   */
  public static async rollbackSchedulesOnInvoiceCancel(invoiceId: string): Promise<void> {
    const scheduleDt = await prisma.docType.findUnique({ where: { key: "billing_schedule" } });
    if (!scheduleDt) return;

    const records = await prisma.docRecord.findMany({
      where: {
        docTypeId: scheduleDt.id,
        data: {
          path: "$.invoice_id",
          equals: invoiceId,
        },
      },
    });

    const todayStr = formatDate(new Date());

    for (const rec of records) {
      const d = (rec.data ?? {}) as Record<string, any>;
      const dueDate = String(d.due_date || "");
      const nextStatus = dueDate <= todayStr ? "Ready" : "Pending";

      d.status = nextStatus;
      d.invoice_id = null;
      d.invoice_code = null;

      await prisma.docRecord.update({
        where: { id: rec.id },
        data: {
          status: nextStatus,
          data: d as unknown as Prisma.InputJsonValue,
        },
      });
    }
  }

  /**
   * Sync schedule status when invoice is paid (Invoiced -> Paid).
   */
  public static async markSchedulesAsPaid(invoiceId: string): Promise<void> {
    const scheduleDt = await prisma.docType.findUnique({ where: { key: "billing_schedule" } });
    if (!scheduleDt) return;

    const records = await prisma.docRecord.findMany({
      where: {
        docTypeId: scheduleDt.id,
        data: {
          path: "$.invoice_id",
          equals: invoiceId,
        },
      },
    });

    for (const rec of records) {
      const d = (rec.data ?? {}) as Record<string, any>;
      d.status = "Paid";

      await prisma.docRecord.update({
        where: { id: rec.id },
        data: {
          status: "Paid",
          data: d as unknown as Prisma.InputJsonValue,
        },
      });
    }
  }

  private static mapDocRecordToScheduleItem(record: any): BillingScheduleItem {
    const d = (record.data ?? {}) as Record<string, any>;
    return {
      id: record.id,
      subscriptionId: String(d.subscription_id || record.parentId || ""),
      salesOrderId: String(d.sales_order_id || ""),
      customerId: String(d.customer_id || ""),
      itemName: String(d.item_name || record.code || "Item"),
      chargeType: String(d.charge_type || "MRC"),
      billingPeriodStart: String(d.billing_period_start || ""),
      billingPeriodEnd: String(d.billing_period_end || ""),
      dueDate: String(d.due_date || ""),
      amount: Number(d.amount || 0),
      invoiceId: d.invoice_id ? String(d.invoice_id) : null,
      invoiceCode: d.invoice_code ? String(d.invoice_code) : null,
      status: (record.status || d.status || "Pending") as any,
    };
  }
}
