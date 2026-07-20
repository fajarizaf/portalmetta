import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { generateBulkInvoices, getSubscriptionBillingPreview } from "@/lib/invoice-generator";

// Force refresh - Timestamp: 2026-04-24
/**
 * Helper to check if the current user has billing management permissions.
 */
function isFinancesRole(roleName: unknown): boolean {
  const r = String(roleName ?? "").trim().toLowerCase();
  return r === "finances" || r === "finance";
}

async function checkPermission(email: string): Promise<{ hasPermission: boolean; userId?: string }> {
  const user = await prisma.user.findUnique({
    where: { 
      email: email 
    },
    include: {
      role: {
        include: {
          permissions: {
            include: {
              permission: true
            }
          }
        }
      }
    }
  });
  
  if (!user) return { hasPermission: false };

  const hasPermission = isFinancesRole(user.role?.name);

  return { hasPermission, userId: user.id };
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const email = session?.user?.email ?? "";
    
    if (!email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { hasPermission } = await checkPermission(email);
    if (!hasPermission) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();
    const { subscriptionId, branchId, billingDate, mode } = body;

    // If subscriptionId is provided, generate only for that one
    if (subscriptionId) {
      const invoiceDate = billingDate ? new Date(billingDate) : new Date()
      const m = String(mode || "").toLowerCase()
      const result = m === "setup"
        ? await (await import("@/lib/invoice-generator")).generateSetupInvoiceForSubscription({ subscriptionId, invoiceDate, forceGenerate: true })
        : await (await import("@/lib/invoice-generator")).generateInvoiceForSubscription({ subscriptionId, invoiceDate, forceGenerate: true })
      return NextResponse.json({ success: true, result });
    }

    const results = await generateBulkInvoices({
      branchId,
      billingDate: billingDate ? new Date(billingDate) : new Date(),
      sendEmail: false
    });

    return NextResponse.json({
      success: true,
      results
    });
  } catch (error) {
    console.error("Error generating invoices:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const email = session?.user?.email ?? "";
    
    if (!email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { hasPermission } = await checkPermission(email);
    if (!hasPermission) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const searchParams = request.nextUrl.searchParams;
    const subscriptionId = searchParams.get("subscriptionId");

    if (!subscriptionId) {
      return NextResponse.json({ error: "subscriptionId is required" }, { status: 400 });
    }

    const preview = await getSubscriptionBillingPreview(subscriptionId);

    return NextResponse.json({
      success: true,
      preview
    });
  } catch (error) {
    console.error("Error getting billing preview:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    );
  }
}
