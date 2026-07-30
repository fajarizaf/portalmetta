import { NextResponse } from "next/server";
import { SubscriptionService } from "@/lib/services/subscription-service";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: subscriptionId } = await params;
    const body = await req.json();
    const { action, additionalMonths, newEndDate, updatedMrc, autoRenewal } = body;

    if (action === "suspend") {
      await SubscriptionService.suspendSubscription(subscriptionId);
      return NextResponse.json({ success: true, message: "Subscription berhasil di-suspend" });
    }

    if (action === "resume") {
      await SubscriptionService.resumeSubscription(subscriptionId);
      return NextResponse.json({ success: true, message: "Subscription berhasil di-aktifkan kembali" });
    }

    if (action === "renew") {
      if (!additionalMonths || Number(additionalMonths) <= 0) {
        return NextResponse.json(
          { error: "Jumlah bulan perpanjangan (additionalMonths) harus lebih dari 0" },
          { status: 400 }
        );
      }

      const updated = await SubscriptionService.renewSubscription(subscriptionId, {
        additionalMonths: Number(additionalMonths),
        newEndDate,
        updatedMrc: updatedMrc ? Number(updatedMrc) : undefined,
        autoRenewal,
      });

      return NextResponse.json({ success: true, subscription: updated, message: "Subscription berhasil di-renew" });
    }

    return NextResponse.json({ error: "Action tidak dikenal" }, { status: 400 });
  } catch (error) {
    console.error("Error executing subscription action:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Gagal mengeksekusi aksi" },
      { status: 400 }
    );
  }
}
