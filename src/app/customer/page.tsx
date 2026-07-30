import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { FileText, CreditCard, User, Zap, Clock, CheckCircle2, XCircle, ArrowRight, LayoutGrid, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { cookies } from "next/headers";
import { CustomerSidebar } from "@/components/customer/customer-sidebar"

export default async function CustomerHome() {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email ?? "";
  const me = email ? await prisma.user.findUnique({ where: { email }, include: { role: { include: { permissions: { include: { permission: true } } } } } }) : null;
  const perm = new Set((me?.role?.permissions ?? []).map((rp) => rp.permission.key));
  if (perm.has("ADMIN_PANEL_ACCESS")) {
    redirect("/admin");
  }

  const docTypesAll = await prisma.docType.findMany({
    include: { permissions: true, fields: true },
    orderBy: { name: "asc" }
  });

  const userCompanyId = email ? (await prisma.user.findUnique({ where: { email }, select: { companyId: true } }))?.companyId ?? null : null
  const parentCompanyId = userCompanyId ? (await prisma.company.findUnique({ where: { id: userCompanyId }, select: { parentId: true } }))?.parentId ?? null : null
  const scopeCompanyId = parentCompanyId ?? userCompanyId
  const cookieStore = await cookies()
  const cookieBranchId = cookieStore.get("branchId")?.value
  const branches = scopeCompanyId ? await prisma.branch.findMany({ where: { companyId: scopeCompanyId }, orderBy: { name: "asc" } }) : []
  const allowedBranchIds = new Set(branches.map((b) => b.id))
  const candidateBranchId = cookieBranchId ?? branches[0]?.id
  const selectedBranchId = allowedBranchIds.has(String(candidateBranchId)) ? candidateBranchId : branches[0]?.id

  const allCompanyLinkKeys = new Set<string>()
  const allUserLinkKeys = new Set<string>()

  for (const dt of docTypesAll) {
    for (const f of dt.fields) {
        if (f.type === "LINK") {
            const cfg = (f.config ?? {}) as { ref?: string }
            if (cfg.ref === "Company") allCompanyLinkKeys.add(f.key)
            if (cfg.ref === "User") allUserLinkKeys.add(f.key)
        }
    }
  }

  const ownershipConditions: any[] = []
  ownershipConditions.push({ createdById: me?.id })
  if (scopeCompanyId) {
      ownershipConditions.push({ createdBy: { companyId: scopeCompanyId } })
  }
  ownershipConditions.push({ assignedToId: me?.id })
  if (userCompanyId) {
      for (const key of Array.from(allCompanyLinkKeys)) {
          ownershipConditions.push({ data: { path: `$.${key}`, equals: userCompanyId } })
      }
  }
  for (const key of Array.from(allUserLinkKeys)) {
      ownershipConditions.push({ data: { path: `$.${key}`, equals: me?.id } })
  }

  const recentRequests = await prisma.docRecord.findMany({
    where: {
      OR: ownershipConditions,
      NOT: {
        status: { in: ["Draft", "DRAFT"] }
      },
      ...(selectedBranchId ? { branchId: selectedBranchId } : {}),
    },
    include: {
      docType: true
    },
    orderBy: {
      updatedAt: 'desc'
    },
    take: 5
  });

  const openTicketsCount = await prisma.docRecord.count({
    where: {
      docType: { key: "support_ticket" },
      OR: ownershipConditions,
      NOT: {
        status: { in: ["Resolved", "Closed"] }
      },
      ...(selectedBranchId ? { branchId: selectedBranchId } : {}),
    }
  })

  const subDt = await prisma.docType.findUnique({ where: { key: "subscription_management" } })
  const activeSubscriptions = subDt && userCompanyId ? await prisma.docRecord.findMany({
    where: {
      docTypeId: subDt.id,
      data: { path: "$.customer_id", equals: userCompanyId },
      ...(selectedBranchId ? { branchId: selectedBranchId } : {}),
    },
    orderBy: { createdAt: "desc" },
    take: 5
  }) : []

  const formatIDR = (v: unknown) => {
    const n = typeof v === "number" ? v : Number(v ?? 0)
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(n)
  }

  const invoiceDt = await prisma.docType.findUnique({ where: { key: "invoice" } })
  const normalizeId = (v: unknown): string => {
    if (typeof v === "string") return v.trim()
    if (typeof v === "number") return String(v)
    if (Array.isArray(v)) {
      const first = v[0]
      if (typeof first === "string") return first.trim()
      if (typeof first === "number") return String(first)
      return String(first ?? "").trim()
    }
    if (v && typeof v === "object" && "id" in (v as Record<string, unknown>)) {
      const id = (v as Record<string, unknown>)["id"]
      return typeof id === "string" ? id.trim() : String(id ?? "").trim()
    }
    return String(v ?? "").trim()
  }
  const isUnpaidInvoice = (status: unknown): boolean => {
    const s = String(status ?? "").trim().toLowerCase()
    if (!s) return false
    if (s.includes("draft")) return false
    if (s.includes("cancel")) return false
    if (s.includes("unpaid") || s.includes("belum")) return true
    if (s.includes("paid")) return false
    return true
  }

  const unpaidInvoiceSummary = await (async () => {
    if (!invoiceDt || !userCompanyId) return { count: 0, total: 0 }
    const allowedCompanyIds = new Set([userCompanyId, scopeCompanyId].filter(Boolean))
    const invoices = await prisma.docRecord.findMany({
      where: {
        docTypeId: invoiceDt.id,
        ...(selectedBranchId ? { branchId: selectedBranchId } : {}),
      },
      orderBy: { createdAt: "desc" },
      take: 300,
    })
    const mine = invoices.filter((inv) => {
      const d = (inv.data ?? {}) as Record<string, unknown>
      const customerId = normalizeId(d["customer_id"] ?? d["customer"])
      return customerId && allowedCompanyIds.has(customerId)
    })
    const unpaid = mine.filter((inv) => {
      const d = (inv.data ?? {}) as Record<string, unknown>
      return isUnpaidInvoice(inv.status ?? d["status"])
    })
    const total = unpaid.reduce((acc, inv) => {
      const d = (inv.data ?? {}) as Record<string, unknown>
      const raw = d["total_amount"] ?? d["total"] ?? d["grand_total"]
      const n = typeof raw === "number" ? raw : Number(raw ?? 0)
      return acc + (Number.isFinite(n) ? n : 0)
    }, 0)
    return { count: unpaid.length, total }
  })()

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <CustomerSidebar roleId={me?.roleId ?? ""} />

      {/* Main Content */}
      <div className="lg:col-span-6 space-y-6">
        {/* Welcome Section */}
        <div>
          <h1 className="text-xl font-semibold text-slate-900">
            Welcome back, {session?.user?.name?.split(" ")[0] || "there"}
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage your data center services and track your requests.
          </p>
        </div>

        {/* Active Services */}
        <div className="bg-white rounded-xl border border-slate-200/60 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <div>
              <h2 className="text-sm font-semibold text-slate-900">Active Services</h2>
              <p className="text-xs text-slate-500 mt-0.5">Your current data center subscriptions</p>
            </div>
            <Link
              href="/customer/services"
              className="text-xs font-medium text-slate-500 hover:text-slate-900 transition-colors flex items-center gap-1"
            >
              View all
              <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>

          {activeSubscriptions.length > 0 ? (
            <div className="divide-y divide-slate-100">
              {activeSubscriptions.map((sub, idx) => {
                const d = (sub.data ?? {}) as Record<string, unknown>
                return (
                  <div key={sub.id} className="flex items-center gap-4 px-5 py-3.5 hover:bg-slate-50/50 transition-colors">
                    <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-slate-100 text-slate-600 shrink-0">
                      <span className="text-xs font-bold">{idx + 1}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-900 truncate">{String(d.service_name || "Service")}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{sub.code ?? sub.id}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-semibold text-slate-900">{formatIDR(d.total_mrc)}</p>
                      <p className="text-xs text-slate-400">/{String(d.frequency || "Monthly")}</p>
                    </div>
                    <span className={cn(
                      "px-2 py-0.5 rounded-full text-[11px] font-medium shrink-0",
                      sub.status === "Active" ? "bg-emerald-50 text-emerald-700" :
                      sub.status === "Deactive" ? "bg-amber-50 text-amber-700" :
                      "bg-slate-100 text-slate-600"
                    )}>
                      {sub.status ?? "Unknown"}
                    </span>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
              <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center mb-3">
                <CreditCard className="w-5 h-5 text-slate-400" />
              </div>
              <p className="text-sm font-medium text-slate-900">No active services</p>
              <p className="text-xs text-slate-500 mt-1">Subscribe to get started with our data center services.</p>
              <Button className="mt-4 h-9 px-4 text-xs font-medium" variant="outline">
                Browse Services
              </Button>
            </div>
          )}
        </div>

        {/* Quick Access */}
        <div>
          <h2 className="text-sm font-semibold text-slate-900 mb-3">Quick Access</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Link
              href="/customer/my-racks"
              className="group relative bg-white rounded-xl border border-slate-200/60 p-4 hover:border-slate-300/60 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <LayoutGrid className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wide">Rack</h3>
              <p className="text-[11px] text-slate-500 mt-0.5">Manage racks</p>
            </Link>

            <Link
              href="/customer/docs/visitor_request/create"
              className="group relative bg-white rounded-xl border border-slate-200/60 p-4 hover:border-slate-300/60 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <User className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wide">Visitor</h3>
              <p className="text-[11px] text-slate-500 mt-0.5">Schedule visit</p>
            </Link>

            <Link
              href="/customer/order/cmkkwfq8400015grnyatwxk86"
              className="group relative bg-white rounded-xl border border-slate-200/60 p-4 hover:border-slate-300/60 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wide">Smart Hands</h3>
              <p className="text-[11px] text-slate-500 mt-0.5">Technical help</p>
            </Link>

            <Link
              href="/customer/docs/request"
              className="group relative bg-white rounded-xl border border-slate-200/60 p-4 hover:border-slate-300/60 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wide">Requests</h3>
              <p className="text-[11px] text-slate-500 mt-0.5">View all</p>
            </Link>
          </div>
        </div>

        {/* Recent Requests */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-slate-900">Recent Activity</h2>
            <Link
              href="/customer/docs/request"
              className="text-xs font-medium text-slate-500 hover:text-slate-900 transition-colors flex items-center gap-1"
            >
              View all
              <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>

          {recentRequests.length > 0 ? (
            <div className="bg-white rounded-xl border border-slate-200/60 overflow-hidden divide-y divide-slate-100">
              {recentRequests.map((req) => {
                const isCompleted = ['Completed', 'Approved', 'Selesai', 'Disetujui'].includes(req.status || '');
                const isRejected = ['Rejected', 'Cancelled', 'Ditolak', 'Dibatalkan'].includes(req.status || '');

                return (
                  <Link
                    key={req.id}
                    href={`/customer/docs/${req.docType.key}/${req.id}`}
                    className="flex items-center gap-3 px-5 py-3.5 hover:bg-slate-50/50 transition-colors group"
                  >
                    <div className={cn(
                      "flex items-center justify-center w-8 h-8 rounded-lg shrink-0",
                      isCompleted ? "bg-emerald-50 text-emerald-600" :
                      isRejected ? "bg-red-50 text-red-600" :
                      "bg-blue-50 text-blue-600"
                    )}>
                      {isCompleted ? <CheckCircle2 className="w-4 h-4" /> :
                       isRejected ? <XCircle className="w-4 h-4" /> :
                       <Clock className="w-4 h-4" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-medium text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded uppercase tracking-wider">
                          {req.docType.name}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-slate-900 mt-0.5 truncate">
                        {req.code || 'No Code'}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className={cn(
                        "inline-flex px-2 py-0.5 rounded-full text-[11px] font-medium",
                        isCompleted ? "bg-emerald-50 text-emerald-700" :
                        isRejected ? "bg-red-50 text-red-700" :
                        "bg-blue-50 text-blue-700"
                      )}>
                        {req.status || 'Draft'}
                      </span>
                      <p className="text-[11px] text-slate-400 mt-1">
                        {new Date(req.updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </p>
                    </div>
                  </Link>
                )
              })}
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-slate-200/60 p-8 text-center">
              <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center mx-auto mb-3">
                <FileText className="w-5 h-5 text-slate-400" />
              </div>
              <p className="text-sm font-medium text-slate-900">No recent activity</p>
              <p className="text-xs text-slate-500 mt-1">Your requests and tickets will appear here.</p>
            </div>
          )}
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="lg:col-span-3 space-y-6">
        {/* Billing Summary */}
        <div className="bg-white rounded-xl border border-slate-200/60 overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-slate-900">Billing & Support</h3>
              <Link
                href="/customer/billing"
                className="text-xs font-medium text-slate-500 hover:text-slate-900 transition-colors flex items-center gap-1"
              >
                View
                <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          <div className="p-5 space-y-4">
            {/* Unpaid Invoices */}
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center shrink-0">
                <CreditCard className="w-4 h-4 text-amber-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-slate-900">Unpaid Invoices</p>
                  {unpaidInvoiceSummary.count > 0 && (
                    <span className="px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-700 text-[11px] font-semibold">
                      {unpaidInvoiceSummary.count}
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  {unpaidInvoiceSummary.count > 0
                    ? `${formatIDR(unpaidInvoiceSummary.total)} total`
                    : "All paid"
                  }
                </p>
              </div>
            </div>

            <div className="w-full h-px bg-slate-100" />

            {/* Open Tickets */}
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                <Zap className="w-4 h-4 text-blue-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-slate-900">Open Tickets</p>
                  {openTicketsCount > 0 && (
                    <span className="px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-700 text-[11px] font-semibold">
                      {openTicketsCount}
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  {openTicketsCount > 0
                    ? `${openTicketsCount} active support tickets`
                    : "All tickets resolved"
                  }
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="bg-white rounded-xl border border-slate-200/60 overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100">
            <h3 className="text-sm font-semibold text-slate-900">Quick Links</h3>
          </div>
          <div className="p-2">
            <Link
              href="/customer/my-racks"
              className="flex items-center gap-3 px-3 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-lg transition-all"
            >
              <LayoutGrid className="w-4 h-4 text-slate-400" />
              Rack Management
            </Link>
            <Link
              href="/customer/order"
              className="flex items-center gap-3 px-3 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-lg transition-all"
            >
              <FileText className="w-4 h-4 text-slate-400" />
              Order Services
            </Link>
            <Link
              href="/customer/inbound-outbound"
              className="flex items-center gap-3 px-3 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-lg transition-all"
            >
              <ArrowUpRight className="w-4 h-4 text-slate-400" />
              Goods Movement
            </Link>
            <Link
              href="/customer/account"
              className="flex items-center gap-3 px-3 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-lg transition-all"
            >
              <User className="w-4 h-4 text-slate-400" />
              Account Settings
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
