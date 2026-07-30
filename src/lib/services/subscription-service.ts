import { prisma } from "@/lib/prisma";
import { Prisma } from "@/generated/prisma/client";
import { BillingScheduleService, BillingScheduleItem } from "./billing-schedule-service";

export interface SubscriptionSummaryMetrics {
  totalContractValue: number;
  totalNrc: number;
  totalMrc: number;
  totalInvoiced: number;
  totalPaid: number;
  outstanding: number;
  nextBillingDate: string | null;
  remainingContractMonths: number;
  contractDurationMonths: number;
}

export interface RenewSubscriptionInput {
  additionalMonths: number;
  newEndDate?: string;
  updatedMrc?: number;
  autoRenewal?: boolean;
}

export class SubscriptionService {
  /**
   * Creates a Subscription from an approved Sales Order record.
   */
  public static async createSubscriptionFromSalesOrder(salesOrderId: string): Promise<any> {
    const soRecord = await prisma.docRecord.findUnique({
      where: { id: salesOrderId },
      include: { docType: true },
    });

    if (!soRecord || soRecord.docType.key !== "sales_order") {
      throw new Error("Sales Order not found or invalid docType");
    }

    const soData = (soRecord.data ?? {}) as Record<string, any>;
    const status = String(soRecord.status || soData.status || "");

    const isCancelled = ["Cancelled", "Rejected"].includes(status);
    if (isCancelled) {
      throw new Error(`Sales Order berstatus ${status} dan tidak dapat dibuatkan Subscription.`);
    }

    const subDt = await prisma.docType.findUnique({ where: { key: "subscription_management" } });
    if (!subDt) {
      throw new Error("DocType 'subscription_management' not found.");
    }

    // Check if Subscription already exists for this Sales Order
    const existingSub = await prisma.docRecord.findFirst({
      where: {
        docTypeId: subDt.id,
        data: {
          path: "$.sales_order_id",
          equals: salesOrderId,
        },
      },
    });

    if (existingSub) {
      // Ensure schedules are generated if not yet generated
      await BillingScheduleService.generateSchedulesForSubscription(existingSub.id);
      return existingSub;
    }

    // Fetch SO items
    const soItemDt = await prisma.docType.findUnique({ where: { key: "sales_order_item" } });
    const items = soItemDt
      ? await prisma.docRow.findMany({
          where: { recordId: salesOrderId, childDocTypeId: soItemDt.id },
          orderBy: { idx: "asc" },
        })
      : [];

    let totalNrc = 0;
    let totalMrc = 0;
    const serviceNames: string[] = [];

    for (const item of items) {
      const d = (item.data ?? {}) as Record<string, any>;
      const qty = Number(d.qty) || 1;
      const nrc = Number(d.nrc) || Number(d.setup_fee) || 0;
      const mrc = Number(d.mrc) || 0;
      totalNrc += nrc * qty;
      totalMrc += mrc * qty;
      if (d.service_name || d.description) {
        serviceNames.push(String(d.service_name || d.description));
      }
    }

    if (totalNrc === 0 && Number(soData.subtotal_nrc) > 0) totalNrc = Number(soData.subtotal_nrc);
    if (totalMrc === 0 && Number(soData.subtotal_mrc) > 0) totalMrc = Number(soData.subtotal_mrc);

    const durationMonths = Math.max(1, Number(soData.contract_duration || soData.duration || 12));
    const startDateStr = String(soData.commencement_date || soData.start_date || soData.order_date || new Date().toISOString().split("T")[0]);
    const startDate = new Date(startDateStr);

    const endDate = new Date(startDate.getFullYear(), startDate.getMonth() + durationMonths, startDate.getDate());
    const endDateStr = endDate.toISOString().split("T")[0];

    const serviceName = serviceNames.length > 0 ? serviceNames.join(", ") : String(soData.notes || soRecord.code || "Services");
    const frequency = String(soData.term_of_payment || "Monthly");
    const customerId = String(soData.customer_id || soData.customer || "");

    // Generate Subscription Naming Code
    const year = new Date().getFullYear();
    const namingCfg = (subDt.config ?? {}) as any;
    const pattern = namingCfg?.naming?.defaultPattern || "SUB-.YYYY.-#####";
    const prefix = pattern.replace(".YYYY.", String(year)).replace(/#+/g, "");

    const branchIdQuery = soRecord.branchId || null;
    const existingCounter = await prisma.docNamingCounter.findFirst({
      where: {
        docTypeId: subDt.id,
        branchId: branchIdQuery,
        series: pattern,
      },
    });

    let counter;
    if (existingCounter) {
      counter = await prisma.docNamingCounter.update({
        where: { id: existingCounter.id },
        data: { seq: { increment: 1 } },
      });
    } else {
      counter = await prisma.docNamingCounter.create({
        data: {
          docTypeId: subDt.id,
          branchId: branchIdQuery,
          series: pattern,
          seq: 1,
        },
      });
    }

    let code = `${prefix}${String(counter.seq).padStart(5, "0")}`;
    let exists = await prisma.docRecord.findUnique({ where: { code } });
    while (exists) {
      const nextCounter = await prisma.docNamingCounter.update({
        where: { id: counter.id },
        data: { seq: { increment: 1 } },
      });
      code = `${prefix}${String(nextCounter.seq).padStart(5, "0")}`;
      exists = await prisma.docRecord.findUnique({ where: { code } });
    }

    const totalContractValue = totalNrc + totalMrc * durationMonths;

    const subData = {
      subscription_no: code,
      sales_order_id: salesOrderId,
      customer_id: customerId,
      service_name: serviceName,
      start_date: startDateStr,
      end_date: endDateStr,
      contract_duration: durationMonths,
      frequency: frequency === "One Time" ? "Monthly" : frequency,
      total_nrc: totalNrc,
      total_mrc: totalMrc,
      total_contract_value: totalContractValue,
      status: "Active",
      auto_renewal: true,
      next_billing_date: startDateStr,
    };

    const subRecord = await prisma.docRecord.create({
      data: {
        docTypeId: subDt.id,
        branchId: soRecord.branchId,
        code,
        status: "Active",
        docStatus: 1,
        data: subData as unknown as Prisma.InputJsonValue,
        parentId: salesOrderId,
        createdById: soRecord.createdById,
      },
    });

    // Auto-generate Billing Schedule
    await BillingScheduleService.generateSchedulesForSubscription(subRecord.id);

    return subRecord;
  }

  /**
   * Calculates comprehensive Summary Metrics for a Subscription.
   */
  public static async getSubscriptionSummaryMetrics(subscriptionId: string): Promise<SubscriptionSummaryMetrics> {
    const subRecord = await prisma.docRecord.findUnique({
      where: { id: subscriptionId },
    });

    if (!subRecord) {
      throw new Error("Subscription not found");
    }

    const subData = (subRecord.data ?? {}) as Record<string, any>;
    const durationMonths = Number(subData.contract_duration || 12);
    const totalNrc = Number(subData.total_nrc || 0);
    const totalMrc = Number(subData.total_mrc || 0);
    const totalContractValue = Number(subData.total_contract_value || totalNrc + totalMrc * durationMonths);

    // Fetch schedules
    const schedules = await BillingScheduleService.getSchedulesForSubscription(subscriptionId);

    let totalInvoiced = 0;
    let totalPaid = 0;
    let nextBillingDate: string | null = null;

    // Fetch invoices linked to this subscription
    const invoiceDt = await prisma.docType.findUnique({ where: { key: "invoice" } });
    const invoices = invoiceDt
      ? await prisma.docRecord.findMany({
          where: {
            docTypeId: invoiceDt.id,
            parentId: subscriptionId,
            status: { not: "Cancelled" },
          },
        })
      : [];

    for (const inv of invoices) {
      const d = (inv.data ?? {}) as Record<string, any>;
      const invTotal = Number(d.total_amount || 0);
      totalInvoiced += invTotal;
      if (inv.status === "Paid") {
        totalPaid += invTotal;
      }
    }

    // Find next pending or ready schedule for next billing date
    const pendingSchedules = schedules.filter((s) => s.status === "Pending" || s.status === "Ready");
    if (pendingSchedules.length > 0) {
      nextBillingDate = pendingSchedules[0].dueDate;
    }

    // Calculate remaining contract months
    const today = new Date();
    const endDate = subData.end_date ? new Date(subData.end_date) : new Date(today.getFullYear(), today.getMonth() + durationMonths, 1);
    let remainingContractMonths = 0;
    if (endDate > today) {
      remainingContractMonths = Math.max(0, (endDate.getFullYear() - today.getFullYear()) * 12 + (endDate.getMonth() - today.getMonth()));
    }

    const outstanding = Math.max(0, totalInvoiced - totalPaid);

    return {
      totalContractValue,
      totalNrc,
      totalMrc,
      totalInvoiced,
      totalPaid,
      outstanding,
      nextBillingDate,
      remainingContractMonths,
      contractDurationMonths: durationMonths,
    };
  }

  /**
   * Suspends an Active Subscription.
   */
  public static async suspendSubscription(subscriptionId: string): Promise<void> {
    const subRecord = await prisma.docRecord.findUnique({ where: { id: subscriptionId } });
    if (!subRecord) throw new Error("Subscription not found");

    const d = (subRecord.data ?? {}) as Record<string, any>;
    d.status = "Suspended";

    await prisma.docRecord.update({
      where: { id: subscriptionId },
      data: {
        status: "Suspended",
        data: d as unknown as Prisma.InputJsonValue,
      },
    });
  }

  /**
   * Resumes a Suspended Subscription.
   */
  public static async resumeSubscription(subscriptionId: string): Promise<void> {
    const subRecord = await prisma.docRecord.findUnique({ where: { id: subscriptionId } });
    if (!subRecord) throw new Error("Subscription not found");

    const d = (subRecord.data ?? {}) as Record<string, any>;
    d.status = "Active";

    await prisma.docRecord.update({
      where: { id: subscriptionId },
      data: {
        status: "Active",
        data: d as unknown as Prisma.InputJsonValue,
      },
    });
  }

  /**
   * Renews contract term and appends new billing schedules.
   */
  public static async renewSubscription(subscriptionId: string, input: RenewSubscriptionInput): Promise<any> {
    const subRecord = await prisma.docRecord.findUnique({ where: { id: subscriptionId } });
    if (!subRecord) throw new Error("Subscription not found");

    const d = (subRecord.data ?? {}) as Record<string, any>;
    const currentDuration = Number(d.contract_duration || 12);
    const newDuration = currentDuration + input.additionalMonths;
    const currentEndDate = d.end_date ? new Date(d.end_date) : new Date();

    const newEndDate = new Date(currentEndDate.getFullYear(), currentEndDate.getMonth() + input.additionalMonths, currentEndDate.getDate());
    const newEndDateStr = input.newEndDate || newEndDate.toISOString().split("T")[0];

    const currentMrc = input.updatedMrc !== undefined ? input.updatedMrc : Number(d.total_mrc || 0);

    d.contract_duration = newDuration;
    d.end_date = newEndDateStr;
    d.total_mrc = currentMrc;
    d.status = "Active";
    if (input.autoRenewal !== undefined) d.auto_renewal = input.autoRenewal;

    // Append activity log
    const activity = Array.isArray(d.__activity) ? d.__activity : [];
    activity.push({
      at: new Date().toISOString(),
      text: `Subscription diperpanjang ${input.additionalMonths} bulan hingga ${newEndDateStr}`,
    });
    d.__activity = activity;

    const updated = await prisma.docRecord.update({
      where: { id: subscriptionId },
      data: {
        status: "Active",
        data: d as unknown as Prisma.InputJsonValue,
      },
    });

    // Generate appended schedules for renewal period
    const scheduleDt = await prisma.docType.findUnique({ where: { key: "billing_schedule" } });
    if (scheduleDt) {
      const salesOrderId = String(d.sales_order_id || "");
      const customerId = String(d.customer_id || "");
      const serviceName = String(d.service_name || "Layanan");
      const frequency = String(d.frequency || "Monthly");

      const stepMonths = frequency === "Quarterly" ? 3 : frequency === "Annually" ? 12 : 1;
      const extensionPeriods = Math.ceil(input.additionalMonths / stepMonths);

      const existingCount = await prisma.docRecord.count({
        where: { docTypeId: scheduleDt.id, parentId: subscriptionId },
      });

      for (let p = 0; p < extensionPeriods; p++) {
        const periodStart = new Date(currentEndDate.getFullYear(), currentEndDate.getMonth() + p * stepMonths, 1);
        const periodEnd = new Date(currentEndDate.getFullYear(), currentEndDate.getMonth() + (p + 1) * stepMonths, 0);

        const scheduleData = {
          subscription_id: subscriptionId,
          sales_order_id: salesOrderId,
          customer_id: customerId,
          item_name: `${serviceName} - MRC (Renewal ${p + 1})`,
          charge_type: "MRC",
          billing_period_start: periodStart.toISOString().split("T")[0],
          billing_period_end: periodEnd.toISOString().split("T")[0],
          due_date: periodStart.toISOString().split("T")[0],
          amount: currentMrc * stepMonths,
          status: "Pending",
          invoice_id: null,
          invoice_code: null,
        };

        await prisma.docRecord.create({
          data: {
            docTypeId: scheduleDt.id,
            branchId: subRecord.branchId,
            code: `SCH-${subRecord.code || subRecord.id.slice(0, 6)}-${String(existingCount + p + 1).padStart(2, "0")}`,
            status: "Pending",
            docStatus: 0,
            data: scheduleData as unknown as Prisma.InputJsonValue,
            parentId: subscriptionId,
            createdById: subRecord.createdById,
          },
        });
      }
    }

    return updated;
  }
}
