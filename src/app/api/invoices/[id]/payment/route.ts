import { NextResponse } from "next/server";
import { InvoiceBillingService } from "@/lib/services/invoice-billing-service";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: invoiceId } = await params;
    const body = await req.json();
    const { action, paymentMethod, referenceNo } = body;

    if (action === "pay") {
      await InvoiceBillingService.markInvoiceAsPaid(invoiceId, {
        paymentMethod: paymentMethod || "Bank Transfer",
        referenceNo: referenceNo || "",
        paidAt: new Date().toISOString(),
      });
      return NextResponse.json({ success: true, message: "Invoice berhasil ditandai Lunas (Paid)." });
    }

    if (action === "cancel") {
      await InvoiceBillingService.cancelInvoice(invoiceId);
      return NextResponse.json({ success: true, message: "Invoice dibatalkan. Billing Schedule kembali ke status Pending/Ready." });
    }

    return NextResponse.json({ error: "Action tidak dikenal" }, { status: 400 });
  } catch (error) {
    console.error("Error updating invoice status:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Gagal memproses Invoice." },
      { status: 400 }
    );
  }
}
