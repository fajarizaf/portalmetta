import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { cookies } from "next/headers"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Zap, FileText } from "lucide-react"
import { CustomerSidebar } from "@/components/customer/customer-sidebar"

export default async function CustomerOrderPage() {
  const session = await getServerSession(authOptions)
  const email = session?.user?.email ?? ""
  
  // Fetch user with role for permissions
  const me = email ? await prisma.user.findUnique({ 
    where: { email }, 
    include: { role: { include: { permissions: { include: { permission: true } } } } } 
  }) : null

  if (!me) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold">Product Order</h1>
        <p>Please login to make an order.</p>
      </div>
    )
  }

  // Data fetching for Order Content
  const userRecord = await prisma.user.findUnique({ where: { email }, select: { companyId: true } })
  const userCompanyId = userRecord?.companyId ?? undefined
  const parentCompanyId = userCompanyId ? (await prisma.company.findUnique({ where: { id: userCompanyId }, select: { parentId: true } }))?.parentId ?? undefined : undefined
  const scopeCompanyId = parentCompanyId ?? userCompanyId
  const cookieStore = await cookies()
  const cookieBranchId = cookieStore.get("branchId")?.value
  const branches = scopeCompanyId ? await prisma.branch.findMany({ where: { companyId: scopeCompanyId }, orderBy: { name: "asc" } }) : []
  const allowedBranchIds = new Set(branches.map((b) => b.id))
  const candidateBranchId = cookieBranchId ?? branches[0]?.id
  const selectedBranchId = allowedBranchIds.has(String(candidateBranchId)) ? candidateBranchId : branches[0]?.id
  const groups = selectedBranchId
    ? await prisma.productGroup.findMany({ where: { branchId: selectedBranchId, parentId: null }, orderBy: { name: "asc" } })
    : []

  const formatIDR = (v: unknown) => {
    const n = typeof v === "number" ? v : Number(v ?? 0)
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(n)
  }

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

  const invoiceDt = await prisma.docType.findUnique({ where: { key: "invoice" } })
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

  const supportDt = await prisma.docType.findUnique({ where: { key: "support_ticket" }, include: { fields: true } })
  const supportCompanyLinkKeys = new Set<string>()
  const supportUserLinkKeys = new Set<string>()
  for (const f of (supportDt?.fields ?? [])) {
    if (f.type !== "LINK") continue
    const cfg = (f.config ?? {}) as { ref?: string }
    if (cfg.ref === "Company") supportCompanyLinkKeys.add(f.key)
    if (cfg.ref === "User") supportUserLinkKeys.add(f.key)
  }
  const supportOwnershipConditions: any[] = []
  supportOwnershipConditions.push({ createdById: me.id })
  if (scopeCompanyId) supportOwnershipConditions.push({ createdBy: { companyId: scopeCompanyId } })
  supportOwnershipConditions.push({ assignedToId: me.id })
  if (userCompanyId) {
    for (const key of Array.from(supportCompanyLinkKeys)) {
      supportOwnershipConditions.push({ data: { path: `$.${key}`, equals: userCompanyId } })
    }
  }
  for (const key of Array.from(supportUserLinkKeys)) {
    supportOwnershipConditions.push({ data: { path: `$.${key}`, equals: me.id } })
  }
  const openTicketsCount = await prisma.docRecord.count({
    where: {
      docType: { key: "support_ticket" },
      OR: supportOwnershipConditions,
      NOT: { status: { in: ["Resolved", "Closed"] } },
      ...(selectedBranchId ? { branchId: selectedBranchId } : {}),
    },
  })
  const ticketHealth = openTicketsCount > 0 ? "Perlu Perhatian" : "Normal"

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Left Sidebar - Navigation */}
      <CustomerSidebar roleId={me.roleId} />

      {/* Main Content - Order Groups */}
      <div className="lg:col-span-6 space-y-6">
        <Card className="border-0 shadow-sm bg-white">
            <CardHeader className="pb-5">
               <CardTitle className="text-lg font-semibold text-slate-900 tracking-tight">Product Order</CardTitle>
               <p className="text-sm text-slate-500 mt-1">Choose the service category you want to order.</p>
            </CardHeader>
            <CardContent className="px-6 pb-6">
                {selectedBranchId ? (
                    <div className="flex items-center gap-2 mb-5">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                        <p className="text-sm text-slate-500">Active branch: <span className="font-semibold text-slate-900">{branches.find((b) => b.id === selectedBranchId)?.name ?? "(not found)"}</span></p>
                    </div>
                ) : (
                    <div className="flex items-center gap-2 mb-5">
                        <div className="h-1.5 w-1.5 rounded-full bg-slate-300" />
                        <p className="text-sm text-slate-500">No branches available.</p>
                    </div>
                )}

                {groups.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-50 mb-3">
                            <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
                        </div>
                        <p className="text-sm text-slate-500">No categories for this branch.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {groups.map((g) => (
                        <Link key={g.id} href={`/customer/order/${g.id}`} className="group relative flex items-center gap-4 border border-slate-200 rounded-xl p-4 hover:border-primary/40 hover:shadow-md hover:shadow-primary/5 transition-all duration-200 bg-white">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-50 group-hover:bg-primary/5 transition-colors">
                                <svg className="h-5 w-5 text-slate-400 group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
                            </div>
                            <div className="min-w-0">
                                <div className="text-sm font-semibold text-slate-900 group-hover:text-primary transition-colors truncate">{g.name}</div>
                                {g.description ? (
                                <div className="text-xs text-slate-500 line-clamp-1 mt-0.5">{g.description}</div>
                                ) : null}
                            </div>
                            <svg className="h-4 w-4 text-slate-300 group-hover:text-primary ml-auto shrink-0 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                        </Link>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
      </div>

      {/* Right Sidebar */}
      <div className="lg:col-span-3 space-y-6">
         {/* Billing & Support Summary Card */}
         <Card className="border-0 shadow-sm bg-white">
            <CardHeader className="pb-4">
               <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Billing & Support</span>
                  <Button asChild size="sm" variant="ghost" className="h-7 text-xs gap-1.5 text-primary hover:text-primary hover:bg-primary/5">
                    <Link href="/customer/billing">
                      <FileText className="w-3.5 h-3.5" />
                      View All
                    </Link>
                  </Button>
               </div>
            </CardHeader>
            <CardContent className="space-y-5">
               {/* Unpaid Invoice Section */}
               <div>
                  <div className="text-xs text-slate-500 mb-1.5 font-medium">Total Unpaid Bill</div>
                  <div className="text-2xl font-bold text-slate-900 tracking-tight">{formatIDR(unpaidInvoiceSummary.total)}</div>
                  <div className="text-xs text-slate-400 mt-1">{unpaidInvoiceSummary.count > 0 ? `${unpaidInvoiceSummary.count} invoice belum dibayar.` : "No pending bills to pay."}</div>
               </div>
               
               {/* Support Ticket Section */}
               <div className="pt-4 border-t border-slate-100">
                  <div className="flex items-center justify-between mb-3">
                     <div className="text-xs text-slate-500 font-medium">Open Tickets</div>
                     <span className={`text-[10px] px-2 py-1 rounded-full font-semibold ${openTicketsCount > 0 ? "bg-amber-50 text-amber-700" : "bg-emerald-50 text-emerald-700"}`}>{ticketHealth}</span>
                  </div>
                  <Link href="/customer/support" className="flex items-center justify-between p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors border border-slate-100 group">
                     <div className="flex items-center gap-2.5">
                        <div className="h-2 w-2 rounded-full bg-slate-300 group-hover:bg-primary transition-colors"></div>
                        <span className="text-sm font-medium text-slate-700">{openTicketsCount} Tickets</span>
                     </div>
                     <Button size="sm" variant="ghost" className="h-7 w-7 p-0 rounded-full hover:bg-white">
                        <Plus className="w-3.5 h-3.5 text-slate-400" />
                     </Button>
                  </Link>
               </div>

               <div className="pt-4 border-t border-slate-100">
                  <p className="text-xs text-slate-500 font-medium mb-2">Need Urgent Help?</p>
                  <Link href="/help" className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors">
                    <Zap className="w-3.5 h-3.5" />
                    <span className="font-medium">Contact Technical Support 24/7</span>
                  </Link>
               </div>
            </CardContent>
         </Card>
      </div>
    </div>
  )
}
