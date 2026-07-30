import { NextResponse } from "next/server";
import { InvoiceBillingService } from "@/lib/services/invoice-billing-service";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: subscriptionId } = await params;
    const body = await req.json();
    const { scheduleIds, invoiceDate, notes } = body;

    if (!scheduleIds || !Array.isArray(scheduleIds) || scheduleIds.length === 0) {
      return NextResponse.json(
        { error: "Pilih setidaknya satu Billing Schedule untuk ditagihkan." },
        { status: 400 }
      );
    }

    const result = await InvoiceBillingService.generateInvoiceFromSchedules({
      subscriptionId,
      scheduleIds,
      invoiceDate: invoiceDate ? new Date(invoiceDate) : new Date(),
      notes,
    });

    return NextResponse.json({
      success: true,
      invoice: result.invoiceRecord,
      invoiceNumber: result.invoiceNumber,
      totalAmount: result.totalAmount,
    });
  } catch (error) {
    console.error("Error generating invoice from schedules:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Gagal memproses Invoice." },
      { status: 400 }
    );
  }
}
