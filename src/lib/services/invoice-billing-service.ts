import { prisma } from "@/lib/prisma";
import { Prisma } from "@/generated/prisma/client";
import { generateInvoiceNumber } from "@/lib/billing";
import { BillingScheduleService } from "./billing-schedule-service";
import { ChargeTypeRegistry } from "./charge-type-registry";

export interface GenerateInvoiceOptions {
  subscriptionId: string;
  scheduleIds: string[];
  invoiceDate?: Date;
  dueDate?: Date;
  notes?: string;
  sendEmail?: boolean;
}

export interface InvoiceResult {
  invoiceRecord: any;
  invoiceNumber: string;
  subtotal: number;
  tax: number;
  totalAmount: number;
  schedules: any[];
}

export class InvoiceBillingService {
  /**
   * Selective Invoicing: Generates an Invoice from an array of selected Billing Schedule IDs.
   */
  public static async generateInvoiceFromSchedules(options: GenerateInvoiceOptions): Promise<InvoiceResult> {
    const { subscriptionId, scheduleIds, invoiceDate = new Date(), notes } = options;

    if (!scheduleIds || scheduleIds.length === 0) {
      throw new Error("Pilih setidaknya satu Billing Schedule untuk membuat Invoice.");
    }

    const subscription = await prisma.docRecord.findUnique({
      where: { id: subscriptionId },
      include: { docType: true },
    });

    if (!subscription || subscription.docType.key !== "subscription_management") {
      throw new Error("Subscription tidak ditemukan.");
    }

    const subData = (subscription.data ?? {}) as Record<string, any>;
    const salesOrderId = String(subData.sales_order_id || "");
    const customerId = String(subData.customer_id || "");

    const scheduleDt = await prisma.docType.findUnique({ where: { key: "billing_schedule" } });
    if (!scheduleDt) {
      throw new Error("DocType 'billing_schedule' tidak ditemukan.");
    }

    // Fetch and validate selected schedule items
    const selectedSchedules = await prisma.docRecord.findMany({
      where: {
        id: { in: scheduleIds },
        parentId: subscriptionId,
      },
    });

    if (selectedSchedules.length !== scheduleIds.length) {
      throw new Error("Satu atau beberapa Billing Schedule yang dipilih tidak valid untuk Subscription ini.");
    }

    // Validate Status & Rules
    for (const scheduleRec of selectedSchedules) {
      const d = (scheduleRec.data ?? {}) as Record<string, any>;
      const status = scheduleRec.status || d.status;
      const chargeType = String(d.charge_type || "MRC");
      const chargeDef = ChargeTypeRegistry.get(chargeType);

      if (status === "Invoiced" || status === "Paid") {
        throw new Error(`Item '${d.item_name || scheduleRec.code}' sudah pernah ditagihkan (Status: ${status}). Tidak dapat ditagih ganda.`);
      }

      if (status === "Cancelled" || status === "Skipped") {
        throw new Error(`Item '${d.item_name || scheduleRec.code}' berstatus ${status} dan tidak dapat dibuatkan invoice.`);
      }

      if (chargeDef.isSingleInvoiceOnly && d.invoice_id) {
        throw new Error(`Charge type ${chargeDef.name} (${d.item_name}) hanya boleh ditagihkan 1 kali.`);
      }
    }

    // Calculate Subtotal and Tax
    let subtotal = 0;
    let nrcTotal = 0;
    let mrcTotal = 0;

    const invoiceItems = selectedSchedules.map((sch) => {
      const d = (sch.data ?? {}) as Record<string, any>;
      const amount = Number(d.amount || 0);
      const chargeType = String(d.charge_type || "MRC");
      subtotal += amount;

      if (chargeType === "NRC" || chargeType === "SETUP_FEE") {
        nrcTotal += amount;
      } else {
        mrcTotal += amount;
      }

      const periodDesc = d.billing_period_start && d.billing_period_end
        ? ` (${d.billing_period_start} - ${d.billing_period_end})`
        : "";

      return {
        schedule_id: sch.id,
        description: `${d.item_name || "Layanan"}${periodDesc}`,
        charge_type: chargeType,
        qty: 1,
        price: amount,
        discount_percent: 0,
        subtotal: amount,
      };
    });

    const taxRate = 0.11; // 11% PPN
    const tax = Math.round(subtotal * taxRate);
    const totalAmount = subtotal + tax;

    const defaultDueDate = options.dueDate || new Date(invoiceDate.getTime() + 14 * 24 * 60 * 60 * 1000);
    const invoiceDt = await prisma.docType.findUnique({ where: { key: "invoice" } });
    if (!invoiceDt) throw new Error("DocType 'invoice' tidak ditemukan.");

    const invoiceNumber = await generateInvoiceNumber(prisma, subscription.branchId || "");

    const firstPeriodStart = selectedSchedules.reduce((min, s) => {
      const p = String((s.data as any)?.billing_period_start || "");
      return !min || (p && p < min) ? p : min;
    }, "");

    const lastPeriodEnd = selectedSchedules.reduce((max, s) => {
      const p = String((s.data as any)?.billing_period_end || "");
      return !max || (p && p > max) ? p : max;
    }, "");

    const invoiceData = {
      invoice_number: invoiceNumber,
      invoice_type: "recurring",
      subscription_id: subscriptionId,
      sales_order_id: salesOrderId,
      customer_id: customerId,
      billing_schedule_ids: scheduleIds,
      invoice_date: invoiceDate.toISOString().split("T")[0],
      due_date: defaultDueDate.toISOString().split("T")[0],
      billing_period_start: firstPeriodStart || invoiceDate.toISOString().split("T")[0],
      billing_period_end: lastPeriodEnd || invoiceDate.toISOString().split("T")[0],
      subtotal,
      tax,
      total_amount: totalAmount,
      nrc_amount: nrcTotal,
      mrc_amount: mrcTotal,
      status: "Draft",
      notes: notes || `Invoice untuk ${selectedSchedules.length} jadwal tagihan`,
    };

    const invoiceRecord = await prisma.docRecord.create({
      data: {
        docTypeId: invoiceDt.id,
        branchId: subscription.branchId,
        code: invoiceNumber,
        status: "Draft",
        docStatus: 0,
        data: invoiceData as unknown as Prisma.InputJsonValue,
        parentId: subscriptionId,
        createdById: subscription.createdById,
      },
    });

    // Create child rows for invoice line items
    await prisma.docRow.createMany({
      data: invoiceItems.map((it, idx) => ({
        recordId: invoiceRecord.id,
        childDocTypeId: null,
        idx,
        data: it as unknown as Prisma.InputJsonValue,
      })),
    });

    // Update status of selected schedules to 'Invoiced' and store invoice reference
    for (const schRec of selectedSchedules) {
      const d = (schRec.data ?? {}) as Record<string, any>;
      d.status = "Invoiced";
      d.invoice_id = invoiceRecord.id;
      d.invoice_code = invoiceNumber;

      await prisma.docRecord.update({
        where: { id: schRec.id },
        data: {
          status: "Invoiced",
          data: d as unknown as Prisma.InputJsonValue,
        },
      });
    }

    return {
      invoiceRecord,
      invoiceNumber,
      subtotal,
      tax,
      totalAmount,
      schedules: selectedSchedules,
    };
  }

  /**
   * Cancels an Invoice and rolls back linked schedules from Invoiced back to Pending/Ready.
   */
  public static async cancelInvoice(invoiceId: string): Promise<void> {
    const invoiceRecord = await prisma.docRecord.findUnique({ where: { id: invoiceId } });
    if (!invoiceRecord) throw new Error("Invoice tidak ditemukan.");

    const d = (invoiceRecord.data ?? {}) as Record<string, any>;
    d.status = "Cancelled";

    await prisma.docRecord.update({
      where: { id: invoiceId },
      data: {
        status: "Cancelled",
        data: d as unknown as Prisma.InputJsonValue,
      },
    });

    // Rollback linked schedule statuses
    await BillingScheduleService.rollbackSchedulesOnInvoiceCancel(invoiceId);
  }

  /**
   * Marks an Invoice as Paid and updates linked schedules to Paid.
   */
  public static async markInvoiceAsPaid(invoiceId: string, paymentInfo?: Record<string, any>): Promise<void> {
    const invoiceRecord = await prisma.docRecord.findUnique({ where: { id: invoiceId } });
    if (!invoiceRecord) throw new Error("Invoice tidak ditemukan.");

    const d = (invoiceRecord.data ?? {}) as Record<string, any>;
    d.status = "Paid";
    d.paid_at = new Date().toISOString();
    if (paymentInfo) {
      d.payment_info = paymentInfo;
    }

    await prisma.docRecord.update({
      where: { id: invoiceId },
      data: {
        status: "Paid",
        docStatus: 1,
        data: d as unknown as Prisma.InputJsonValue,
      },
    });

    // Update schedules to Paid
    await BillingScheduleService.markSchedulesAsPaid(invoiceId);
  }
}
