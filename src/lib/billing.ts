export interface ProrateResult {
  totalAmount: number;
  breakdown: {
    description: string;
    amount: number;
    days: number;
    dailyRate: number;
    totalDays: number;
  }[];
  periodStart: Date;
  periodEnd: Date;
  nextBillingDate: Date;
}

export function calculateProrate(
  startDate: Date,
  endDate: Date | null,
  mrc: number,
  frequency: "Monthly" | "Quarterly" | "Annually" | "One Time"
): ProrateResult {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  
  const periodsPerYear = frequency === "Monthly" ? 12 : frequency === "Quarterly" ? 4 : 1;
  const periodDays = frequency === "Monthly" ? 30 : frequency === "Quarterly" ? 90 : 365;
  const annualMrc = mrc * periodsPerYear;
  const dailyRate = annualMrc / 365;

  const result: ProrateResult = {
    totalAmount: 0,
    breakdown: [],
    periodStart: startDate,
    periodEnd: endDate && endDate < today ? endDate : today,
    nextBillingDate: getNextBillingDate(today, frequency)
  };

  if (frequency === "One Time") {
    const amount = mrc;
    result.totalAmount = amount;
    result.breakdown.push({
      description: "One-time service charge",
      amount,
      days: 0,
      dailyRate: 0,
      totalDays: 0
    });
    return result;
  }

  const billingCycleStart = getBillingCycleStart(startDate, frequency);
  const billingCycleEnd = getBillingCycleEnd(billingCycleStart, frequency);
  
  if (startDate < billingCycleStart) {
    const actualStart = billingCycleStart;
    const daysInPeriod = getDaysBetween(actualStart, billingCycleEnd);
    const amount = Math.round(dailyRate * daysInPeriod);
    result.breakdown.push({
      description: `Prorate: ${actualStart.toLocaleDateString("en-GB")} - ${billingCycleEnd.toLocaleDateString("en-GB")}`,
      amount,
      days: daysInPeriod,
      dailyRate: Math.round(dailyRate * 100) / 100,
      totalDays: daysInPeriod
    });
    result.totalAmount += amount;
  } else {
    const daysInPeriod = getDaysBetween(startDate, billingCycleEnd);
    if (daysInPeriod > 0) {
      const amount = Math.round(dailyRate * daysInPeriod);
      result.breakdown.push({
        description: `Prorate: ${startDate.toLocaleDateString("en-GB")} - ${billingCycleEnd.toLocaleDateString("en-GB")}`,
        amount,
        days: daysInPeriod,
        dailyRate: Math.round(dailyRate * 100) / 100,
        totalDays: daysInPeriod
      });
      result.totalAmount += amount;
    }
  }

  return result;
}

export function calculateMonthlyProrate(
  startDate: Date,
  mrc: number
): ProrateResult {
  const today = new Date();
  const currentDay = today.getDate();
  const daysInMonth = getDaysInMonth(today.getFullYear(), today.getMonth());
  const dailyRate = mrc / daysInMonth;

  const startDay = startDate.getDate();
  const startMonth = startDate.getMonth();
  const startYear = startDate.getFullYear();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  const result: ProrateResult = {
    totalAmount: 0,
    breakdown: [],
    periodStart: startDate,
    periodEnd: today,
    nextBillingDate: getNextBillingDate(today, "Monthly")
  };

  if (startYear === currentYear && startMonth === currentMonth) {
    const daysRemaining = daysInMonth - startDay + 1;
    const amount = Math.round(dailyRate * daysRemaining);
    result.totalAmount = amount;
    result.breakdown.push({
      description: `Prorate (${startDay} - ${daysInMonth} ${getMonthName(startMonth)})`,
      amount,
      days: daysRemaining,
      dailyRate: Math.round(dailyRate * 100) / 100,
      totalDays: daysInMonth
    });
  } else {
    const fullMonths = (currentYear - startYear) * 12 + (currentMonth - startMonth);
    if (fullMonths > 0) {
      result.totalAmount = mrc * fullMonths;
      result.breakdown.push({
        description: `Full month(s): ${fullMonths} month(s)`,
        amount: mrc * fullMonths,
        days: 0,
        dailyRate: 0,
        totalDays: 0
      });
    }
    
    const daysRemaining = daysInMonth - currentDay + 1;
    const prorateAmount = Math.round(dailyRate * daysRemaining);
    result.totalAmount += prorateAmount;
    result.breakdown.push({
      description: `Prorate (${currentDay} - ${daysInMonth} ${getMonthName(currentMonth)})`,
      amount: prorateAmount,
      days: daysRemaining,
      dailyRate: Math.round(dailyRate * 100) / 100,
      totalDays: daysInMonth
    });
  }

  return result;
}

export function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

export function getDaysBetween(start: Date, end: Date): number {
  const msPerDay = 24 * 60 * 60 * 1000;
  return Math.ceil((end.getTime() - start.getTime()) / msPerDay);
}

export function getMonthName(month: number): string {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return months[month];
}

export function getNextBillingDate(from: Date, frequency: "Monthly" | "Quarterly" | "Annually" | "One Time"): Date {
  const year = from.getFullYear();
  const month = from.getMonth();
  const day = from.getDate();

  if (frequency === "One Time") {
    return from;
  }

  if (frequency === "Monthly") {
    return new Date(year, month + 1, 1);
  }
  
  if (frequency === "Quarterly") {
    const nextQuarterMonth = Math.floor(month / 3) * 3 + 3;
    if (nextQuarterMonth >= 12) {
      return new Date(year + 1, nextQuarterMonth - 12, 1);
    }
    return new Date(year, nextQuarterMonth, 1);
  }

  return new Date(year + 1, month, 1);
}

export function getBillingCycleStart(date: Date, frequency: "Monthly" | "Quarterly" | "Annually"): Date {
  const year = date.getFullYear();
  const month = date.getMonth();

  if (frequency === "Monthly") {
    return new Date(year, month, 1);
  }
  
  if (frequency === "Quarterly") {
    const quarterStart = Math.floor(month / 3) * 3;
    return new Date(year, quarterStart, 1);
  }

  return new Date(year, 0, 1);
}

export function getBillingCycleEnd(start: Date, frequency: "Monthly" | "Quarterly" | "Annually"): Date {
  if (frequency === "Monthly") {
    return new Date(start.getFullYear(), start.getMonth() + 1, 0);
  }
  
  if (frequency === "Quarterly") {
    return new Date(start.getFullYear(), start.getMonth() + 3, 0);
  }

  return new Date(start.getFullYear(), 11, 31);
}

export function formatCurrency(amount: number, currency: string = "IDR"): string {
  if (currency === "IDR") {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency
  }).format(amount);
}

export interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
  isProrate: boolean;
  period?: string;
}

export interface InvoiceData {
  invoiceNumber: string;
  invoiceDate: Date;
  dueDate: Date;
  subscriptionId: string;
  subscriptionCode: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  total: number;
  notes?: string;
}

export async function generateInvoiceNumber(prisma: any, branchId: string): Promise<string> {
  const year = new Date().getFullYear();
  const month = String(new Date().getMonth() + 1).padStart(2, "0");

  const invoiceDt = await prisma.docType.findUnique({ where: { key: "invoice" }, select: { id: true } });
  if (!invoiceDt) throw new Error("invoice DocType not found");

  const series = `INV/${year}/${month}`;
  let counter = await prisma.docNamingCounter.findFirst({ where: { docTypeId: invoiceDt.id, branchId: null, series } });
  if (!counter) {
    try {
      counter = await prisma.docNamingCounter.create({ data: { docTypeId: invoiceDt.id, branchId: null, series, seq: 0 } });
    } catch (e) {
      const code = (e as any)?.code;
      if (code !== "P2002") throw e;
      counter = await prisma.docNamingCounter.findFirst({ where: { docTypeId: invoiceDt.id, branchId: null, series } });
      if (!counter) throw e;
    }
  }

  const prefix = `INV/${year}/${month}`;
  for (let i = 0; i < 500; i++) {
    const next = await prisma.docNamingCounter.update({
      where: { id: counter.id },
      data: { seq: { increment: 1 } }
    });
    const code = `${prefix}/${String(next.seq).padStart(4, "0")}`;
    const exists = await prisma.docRecord.findUnique({ where: { code } });
    if (!exists) return code;
  }

  throw new Error("Gagal menghasilkan nomor invoice yang unik.");
}
