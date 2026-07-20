import { prisma } from "@/lib/prisma";
import { calculateProrate, calculateMonthlyProrate, formatCurrency, generateInvoiceNumber, type ProrateResult } from "./billing";
import { sendDocumentEmail } from "./mail";
import type { Prisma } from "@/generated/prisma/client";

function isUniqueCodeError(err: unknown): boolean {
  if (!err || typeof err !== "object") return false;
  const e = err as { code?: unknown; meta?: unknown };
  if (e.code !== "P2002") return false;
  const meta = e.meta as { target?: unknown } | undefined;
  const target = meta?.target;
  if (Array.isArray(target)) return target.includes("code");
  return String(target ?? "").includes("code") || String(target ?? "").includes("DocRecord_code_key");
}

export interface GenerateInvoiceOptions {
  subscriptionId: string;
  invoiceDate?: Date;
  forceGenerate?: boolean;
}

export interface GenerateBulkInvoiceOptions {
  branchId?: string;
  billingDate?: Date;
  sendEmail?: boolean;
}

export interface GenerateSetupInvoiceOptions {
  subscriptionId: string;
  invoiceDate?: Date;
  forceGenerate?: boolean;
}

export async function generateSetupInvoiceForSubscription(options: GenerateSetupInvoiceOptions) {
  const { subscriptionId, invoiceDate = new Date(), forceGenerate = false } = options

  const subscription = await prisma.docRecord.findUnique({
    where: { id: subscriptionId },
    include: { docType: true }
  })

  if (!subscription || subscription.docType.key !== "subscription_management") {
    throw new Error("Invalid subscription ID")
  }

  const existing = await prisma.docRecord.findFirst({
    where: {
      docType: { key: "invoice" },
      parentId: subscriptionId,
      data: { path: "$.invoice_type", equals: "setup" }
    }
  })
  if (existing && !forceGenerate) {
    throw new Error("Setup invoice already exists for this subscription")
  }

  const data = (subscription.data ?? {}) as Record<string, any>
  const customerId = data.customer_id
  const customer = await prisma.company.findUnique({ where: { id: customerId } })
  if (!customer) throw new Error("Customer not found")

  const salesOrderId = String(data.sales_order_id ?? data.salesOrderId ?? "").trim()
  if (!salesOrderId) throw new Error("Sales order not found for this subscription")

  const soItemDt = await prisma.docType.findUnique({ where: { key: "sales_order_item" } })
  if (!soItemDt) throw new Error("sales_order_item DocType not found")

  const soRows = await prisma.docRow.findMany({
    where: { recordId: salesOrderId, childDocTypeId: soItemDt.id },
    orderBy: { idx: "asc" }
  })

  const serviceNameRaw = data.service_name ?? data.serviceName ?? subscription.code ?? ""
  const serviceName = String(serviceNameRaw ?? "").trim()

  const items = soRows.map((r) => {
    const d = (r.data ?? {}) as Record<string, unknown>
    const qtyRaw = d["qty"]
    const nrcRaw = d["nrc"] ?? d["setup_fee"] ?? d["setupFee"]
    const qty = typeof qtyRaw === "number" ? qtyRaw : Number(qtyRaw ?? 0)
    const nrc = typeof nrcRaw === "number" ? nrcRaw : Number(nrcRaw ?? 0)
    const q = Number.isFinite(qty) && qty > 0 ? qty : 1
    const p = Number.isFinite(nrc) ? nrc : 0
    const subtotal = q * p
    const itemDesc = String(d["service_name"] ?? d["description"] ?? d["product_id_label"] ?? "").trim()
    const baseDesc = [serviceName, itemDesc].filter(Boolean).join(" - ")
    const desc = baseDesc ? `${baseDesc} - Setup Fee` : "Setup Fee"
    return {
      description: desc,
      qty: q,
      price: p,
      discount_percent: 0,
      subtotal
    }
  }).filter((it) => it.price > 0 && it.subtotal > 0)

  if (items.length === 0) {
    throw new Error("Tidak ada biaya setup (NRC) untuk dibuatkan invoice")
  }

  const subtotal = items.reduce((acc, it) => acc + it.subtotal, 0)
  const taxRate = 0.11
  const tax = Math.round(subtotal * taxRate)
  const total = subtotal + tax

  const dueDate = new Date(invoiceDate)
  dueDate.setDate(dueDate.getDate() + 10)
  const invoiceDt = await prisma.docType.findUnique({ where: { key: "invoice" } })
  if (!invoiceDt) throw new Error("invoice DocType not found")

  let invoiceRecord: any = null
  for (let attempt = 0; attempt < 60; attempt++) {
    const invoiceNumber = await generateInvoiceNumber(prisma, subscription.branchId || "")
    const invoiceData = {
      invoice_number: invoiceNumber,
      invoice_type: "setup",
      customer_id: customerId,
      invoice_date: invoiceDate.toISOString().split("T")[0],
      due_date: dueDate.toISOString().split("T")[0],
      billing_period_start: invoiceDate.toISOString().split("T")[0],
      billing_period_end: invoiceDate.toISOString().split("T")[0],
      subtotal,
      tax,
      total_amount: total,
      nrc_amount: subtotal,
      mrc_amount: 0,
      status: "Draft"
    }
    try {
      invoiceRecord = await prisma.docRecord.create({
        data: {
          docTypeId: invoiceDt.id,
          branchId: subscription.branchId,
          code: invoiceNumber,
          status: "Draft",
          docStatus: 0,
          data: invoiceData as unknown as Prisma.InputJsonValue,
          createdById: subscription.createdById,
          parentId: subscriptionId
        }
      })
      break
    } catch (e) {
      if (isUniqueCodeError(e)) continue
      throw e
    }
  }
  if (!invoiceRecord) throw new Error("Gagal membuat invoice karena nomor invoice duplikat.")

  await prisma.docRow.createMany({
    data: items.map((it, idx) => ({
      recordId: invoiceRecord.id,
      childDocTypeId: null,
      idx,
      data: it as unknown as Prisma.InputJsonValue
    }))
  })

  return { invoice: invoiceRecord, customer, subscription }
}

export async function generateInvoiceForSubscription(options: GenerateInvoiceOptions) {
  const { subscriptionId, invoiceDate = new Date(), forceGenerate = false } = options;

  const subscription = await prisma.docRecord.findUnique({
    where: { id: subscriptionId },
    include: { docType: true }
  });

  if (!subscription || subscription.docType.key !== "subscription_management") {
    throw new Error("Invalid subscription ID");
  }

  const data = subscription.data as Record<string, any>;
  const status = data.status || subscription.status;
  
  if (status !== "Active" && !forceGenerate) {
    throw new Error("Subscription is not active");
  }

  const mrc = Number(data.total_mrc) || 0;
  const frequency = data.frequency || "Monthly";
  const startDate = new Date(data.start_date);
  const customerId = data.customer_id;

  if (mrc <= 0) {
    throw new Error("Invalid MRC amount");
  }

  const customer = await prisma.company.findUnique({
    where: { id: customerId }
  });

  if (!customer) {
    throw new Error("Customer not found");
  }

  const dueDate = new Date(invoiceDate);
  dueDate.setDate(dueDate.getDate() + 10);
  const invoiceDt = await prisma.docType.findUnique({ where: { key: "invoice" } })
  if (!invoiceDt) throw new Error("invoice DocType not found")

  let prorateResult: ProrateResult;
  if (frequency === "Monthly") {
    prorateResult = calculateMonthlyProrate(startDate, mrc);
  } else {
    const endDate = data.end_date ? new Date(data.end_date) : null;
    prorateResult = calculateProrate(startDate, endDate, mrc, frequency);
  }

  const subtotal = prorateResult.totalAmount;
  const taxRate = 0.11;
  const tax = Math.round(subtotal * taxRate);
  const total = subtotal + tax;

  let invoiceRecord: any = null
  for (let attempt = 0; attempt < 60; attempt++) {
    const invoiceNumber = await generateInvoiceNumber(prisma, subscription.branchId || "");
    const invoiceData = {
      invoice_number: invoiceNumber,
      customer_id: customerId,
      invoice_date: invoiceDate.toISOString().split("T")[0],
      due_date: dueDate.toISOString().split("T")[0],
      billing_period_start: prorateResult.periodStart.toISOString().split("T")[0],
      billing_period_end: prorateResult.periodEnd.toISOString().split("T")[0],
      subtotal,
      tax,
      total_amount: total,
      nrc_amount: 0,
      mrc_amount: mrc,
      status: "Draft"
    };
    try {
      invoiceRecord = await prisma.docRecord.create({
        data: {
          docTypeId: invoiceDt.id,
          branchId: subscription.branchId,
          code: invoiceNumber,
          status: "Draft",
          docStatus: 0,
          data: invoiceData as unknown as Prisma.InputJsonValue,
          createdById: subscription.createdById,
          parentId: subscriptionId
        }
      });
      break
    } catch (e) {
      if (isUniqueCodeError(e)) continue
      throw e
    }
  }
  if (!invoiceRecord) throw new Error("Gagal membuat invoice karena nomor invoice duplikat.")

  {
    const serviceNameRaw = data.service_name ?? data.serviceName ?? subscription.code ?? ""
    const serviceName = String(serviceNameRaw ?? "").trim()
    const items = (prorateResult.breakdown ?? []).map((b) => {
      const amount = typeof b.amount === "number" ? b.amount : Number(b.amount ?? 0)
      const days = typeof b.days === "number" ? b.days : Number(b.days ?? 0)
      const dailyRate = typeof b.dailyRate === "number" ? b.dailyRate : Number(b.dailyRate ?? 0)
      const baseDesc = String(b.description ?? "").trim()
      const parts: string[] = []
      if (serviceName) parts.push(serviceName)
      if (baseDesc) parts.push(baseDesc)
      const meta: string[] = []
      if (Number.isFinite(days) && days > 0) meta.push(`${days} hari`)
      if (Number.isFinite(dailyRate) && dailyRate > 0) meta.push(`@ ${formatCurrency(dailyRate)}/hari`)
      const desc = meta.length > 0 ? `${parts.join(" - ")} (${meta.join(" ")})` : parts.join(" - ")
      const safeAmount = Number.isFinite(amount) ? amount : 0
      const qty = Number.isFinite(days) && days > 0 ? days : 1
      const price = Number.isFinite(dailyRate) && dailyRate !== 0 ? dailyRate : safeAmount
      return {
        description: desc || (serviceName ? serviceName : "Service"),
        qty,
        price,
        discount_percent: 0,
        subtotal: safeAmount
      }
    }).filter((it) => it.description && (typeof it.price === "number"))
    if (items.length > 0) {
      await prisma.docRow.createMany({
        data: items.map((it, idx) => ({
          recordId: invoiceRecord.id,
          childDocTypeId: null,
          idx,
          data: it as unknown as Prisma.InputJsonValue
        }))
      })
    }
  }

  return {
    invoice: invoiceRecord,
    prorate: prorateResult,
    customer,
    subscription
  };
}

export async function generateBulkInvoices(options: GenerateBulkInvoiceOptions = {}) {
  const { branchId, billingDate = new Date(), sendEmail = true } = options;

  const billingMonth = billingDate.getMonth();
  const billingYear = billingDate.getFullYear();
  const billingPeriodStart = new Date(billingYear, billingMonth, 1);
  const billingPeriodEnd = new Date(billingYear, billingMonth + 1, 0);

  const whereClause: any = {
    docType: { key: "subscription_management" },
    status: "Active"
  };

  if (branchId) {
    whereClause.branchId = branchId;
  }

  const subscriptions = await prisma.docRecord.findMany({
    where: whereClause,
    include: { docType: true }
  });

  const results = {
    success: [] as Array<{ subscriptionId: string; invoiceId: string; invoiceNumber: string; amount: number }>,
    failed: [] as Array<{ subscriptionId: string; error: string }>
  };

  for (const subscription of subscriptions) {
    try {
      const existingInvoice = await prisma.docRecord.findFirst({
        where: {
          docType: { key: "invoice" },
          parentId: subscription.id,
          data: {
            path: "$.invoice_date",
            string_contains: `${billingYear}-${String(billingMonth + 1).padStart(2, "0")}`
          }
        }
      });

      if (existingInvoice) {
        results.failed.push({
          subscriptionId: subscription.id,
          error: "Invoice already exists for this billing period"
        });
        continue;
      }

      const result = await generateInvoiceForSubscription({
        subscriptionId: subscription.id,
        invoiceDate: billingDate
      });

      results.success.push({
        subscriptionId: subscription.id,
        invoiceId: result.invoice.id,
        invoiceNumber: result.invoice.code || "",
        amount: (result.invoice.data as any).total_amount || 0
      });

      if (sendEmail) {
        const customerEmail = result.customer.companyEmail;
        if (customerEmail) {
          try {
            const invoiceData = result.invoice.data as Record<string, any>;
            await sendDocumentEmail(
              customerEmail,
              "Invoice",
              result.invoice.code,
              result.invoice.status,
              invoiceData,
              [
                { key: "invoice_number", label: "Invoice Number", type: "TEXT" },
                { key: "invoice_date", label: "Invoice Date", type: "DATE" },
                { key: "due_date", label: "Due Date", type: "DATE" },
                { key: "billing_period_start", label: "Period Start", type: "DATE" },
                { key: "billing_period_end", label: "Period End", type: "DATE" },
                { key: "subtotal", label: "Subtotal", type: "PRICE" },
                { key: "tax", label: "Tax (11%)", type: "PRICE" },
                { key: "total_amount", label: "Total Amount", type: "PRICE" }
              ],
              result.customer.name,
              `Invoice for billing period ${billingPeriodStart.toLocaleDateString("en-GB")} - ${billingPeriodEnd.toLocaleDateString("en-GB")}`
            );

            await prisma.docRecord.update({
              where: { id: result.invoice.id },
              data: {
                status: "Sent"
              }
            });
          } catch (emailError) {
            console.error("Failed to send invoice email:", emailError);
          }
        }
      }
    } catch (error) {
      results.failed.push({
        subscriptionId: subscription.id,
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  }

  return results;
}

export async function getSubscriptionBillingPreview(subscriptionId: string) {
  const subscription = await prisma.docRecord.findUnique({
    where: { id: subscriptionId },
    include: { docType: true }
  });

  if (!subscription || subscription.docType.key !== "subscription_management") {
    throw new Error("Invalid subscription ID");
  }

  const data = subscription.data as Record<string, any>;
  const mrc = Number(data.total_mrc) || 0;
  const frequency = data.frequency || "Monthly";
  const startDate = new Date(data.start_date);

  let prorateResult: ProrateResult;
  if (frequency === "Monthly") {
    prorateResult = calculateMonthlyProrate(startDate, mrc);
  } else {
    const endDate = data.end_date ? new Date(data.end_date) : null;
    prorateResult = calculateProrate(startDate, endDate, mrc, frequency);
  }

  const subtotal = prorateResult.totalAmount;
  const taxRate = 0.11;
  const tax = Math.round(subtotal * taxRate);
  const total = subtotal + tax;

  return {
    subscriptionCode: subscription.code,
    serviceName: data.service_name,
    mrc,
    frequency,
    startDate: data.start_date,
    nextBillingDate: data.next_billing_date,
    prorate: prorateResult,
    subtotal,
    taxRate,
    tax,
    total,
    formattedSubtotal: formatCurrency(subtotal),
    formattedTax: formatCurrency(tax),
    formattedTotal: formatCurrency(total),
    formattedMrc: formatCurrency(mrc)
  };
}
