import { NextResponse } from "next/server";
import { BillingScheduleService } from "@/lib/services/billing-schedule-service";
import { SubscriptionService } from "@/lib/services/subscription-service";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: subscriptionId } = await params;
    const schedules = await BillingScheduleService.getSchedulesForSubscription(subscriptionId);
    const metrics = await SubscriptionService.getSubscriptionSummaryMetrics(subscriptionId);

    return NextResponse.json({
      schedules,
      metrics,
    });
  } catch (error) {
    console.error("Error fetching billing schedules:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Gagal mengambil data billing schedule" },
      { status: 500 }
    );
  }
}
