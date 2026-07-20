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
        <Card className="border-none shadow-sm">
            <CardHeader className="pb-2 border-b">
               <CardTitle className="text-base font-semibold text-primary uppercase tracking-wide">Product Order</CardTitle>
               <p className="text-sm text-muted-foreground">Choose the service category you want to order.</p>
            </CardHeader>
            <CardContent className="p-6">
                {selectedBranchId ? (
                    <p className="text-sm text-muted-foreground mb-4">Active branch: <span className="font-medium text-slate-900">{branches.find((b) => b.id === selectedBranchId)?.name ?? "(not found)"}</span></p>
                ) : (
                    <p className="text-sm text-muted-foreground mb-4">No branches available.</p>
                )}

                {groups.length === 0 ? (
                    <div className="text-center py-8">
                        <p className="text-sm text-muted-foreground">No categories for this branch.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {groups.map((g) => (
                        <Link key={g.id} href={`/customer/order/${g.id}`} className="group relative border rounded-xl p-5 hover:border-primary hover:bg-slate-50 transition-all">
                            <div className="text-base font-semibold text-slate-900 group-hover:text-primary mb-1">{g.name}</div>
                            {g.description ? (
                            <div className="text-sm text-muted-foreground line-clamp-2">{g.description}</div>
                            ) : null}
                            <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-slate-200 group-hover:ring-primary/50 pointer-events-none" />
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
         <Card className="border-none shadow-sm">
            <CardHeader className="pb-2">
               <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-500 uppercase">Billing & Support</span>
                  <Button asChild size="sm" variant="outline" className="h-8 text-xs gap-1 border-primary text-primary hover:bg-primary hover:text-white">
                    <Link href="/customer/billing">
                      <FileText className="w-3 h-3" />
                      View All
                    </Link>
                  </Button>
               </div>
            </CardHeader>
            <CardContent>
               {/* Unpaid Invoice Section */}
               <div className="mb-4">
                  <div className="text-xs text-slate-500 mb-1">Total Unpaid Bill</div>
                  <div className="text-2xl font-bold text-slate-900 mb-2">{formatIDR(unpaidInvoiceSummary.total)}</div>
                  <div className="text-xs text-slate-400">{unpaidInvoiceSummary.count > 0 ? `${unpaidInvoiceSummary.count} invoice belum dibayar.` : "No pending bills to pay."}</div>
               </div>
               
               {/* Support Ticket Section */}
               <div className="mt-4 pt-4 border-t">
                  <div className="flex items-center justify-between mb-2">
                     <div className="text-xs text-slate-500">Open Tickets</div>
                     <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${openTicketsCount > 0 ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-700"}`}>{ticketHealth}</span>
                  </div>
                  <div className="flex items-center gap-3">
                     <Link href="/customer/support" className="flex-1 bg-slate-50 rounded-lg p-3 flex items-center justify-between hover:bg-slate-100 transition-colors cursor-pointer border border-slate-100">
                        <div className="flex items-center gap-2">
                           <div className="w-2 h-2 rounded-full bg-slate-300"></div>
                           <span className="text-sm font-medium text-slate-600">{openTicketsCount} Tickets</span>
                        </div>
                        <Button size="sm" variant="ghost" className="h-6 w-6 p-0 rounded-full">
                           <Plus className="w-3 h-3 text-slate-400" />
                        </Button>
                     </Link>
                  </div>
               </div>

               <div className="mt-4 pt-4 border-t text-xs text-slate-500">
                  <p className="font-semibold mb-1">Need Urgent Help?</p>
                  <Link href="/help" className="flex items-center gap-2 text-primary cursor-pointer hover:underline">
                    <Zap className="w-3 h-3" />
                    <span>Contact Technical Support 24/7</span>
                  </Link>
               </div>
            </CardContent>
         </Card>
      </div>
    </div>
  )
}
