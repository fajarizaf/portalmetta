import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { SubscriptionService } from "@/lib/services/subscription-service";
import { BillingScheduleService } from "@/lib/services/billing-schedule-service";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: salesOrderId } = await params;
    const subscription = await SubscriptionService.createSubscriptionFromSalesOrder(salesOrderId);
    return NextResponse.json({ success: true, subscription });
  } catch (error) {
    console.error("Error generating subscription from Sales Order:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Gagal membuat subscription" },
      { status: 400 }
    );
  }
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: salesOrderId } = await params;

    const subDt = await prisma.docType.findUnique({ where: { key: "subscription_management" } });
    if (!subDt) {
      return NextResponse.json({ subscriptions: [], invoices: [], schedules: [] });
    }

    let subscriptions = await prisma.docRecord.findMany({
      where: {
        docTypeId: subDt.id,
        data: {
          path: "$.sales_order_id",
          equals: salesOrderId,
        },
      },
    });

    // Auto-generate Subscription if not yet created for this Sales Order
    if (subscriptions.length === 0) {
      try {
        const newSub = await SubscriptionService.createSubscriptionFromSalesOrder(salesOrderId);
        if (newSub) {
          subscriptions = [newSub];
        }
      } catch (err) {
        console.warn("Auto-creation of subscription on GET failed:", err);
      }
    }

    const subIds = subscriptions.map((s) => s.id);

    const invoiceDt = await prisma.docType.findUnique({ where: { key: "invoice" } });
    const invoices = invoiceDt && subIds.length > 0
      ? await prisma.docRecord.findMany({
          where: {
            docTypeId: invoiceDt.id,
            parentId: { in: subIds },
          },
          orderBy: { createdAt: "desc" },
        })
      : [];

    const allSchedules = [];
    for (const subId of subIds) {
      const schs = await BillingScheduleService.getSchedulesForSubscription(subId);
      allSchedules.push(...schs);
    }

    return NextResponse.json({
      subscriptions,
      invoices,
      schedules: allSchedules,
    });
  } catch (error) {
    console.error("Error fetching Sales Order subscription data:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Gagal mengambil data" },
      { status: 500 }
    );
  }
}
