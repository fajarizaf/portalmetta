import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, CreditCard, User, Zap, Clock, CheckCircle2, XCircle, ArrowRight, LayoutGrid } from "lucide-react";
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

  // Fetch DocTypes accessible by the user (or their role)
  const docTypesAll = await prisma.docType.findMany({
    include: { permissions: true, fields: true },
    orderBy: { name: "asc" }
  });

  // Fetch recent requests (DocRecords) created by the user or assigned/linked to them
  const userCompanyId = email ? (await prisma.user.findUnique({ where: { email }, select: { companyId: true } }))?.companyId ?? null : null
  const parentCompanyId = userCompanyId ? (await prisma.company.findUnique({ where: { id: userCompanyId }, select: { parentId: true } }))?.parentId ?? null : null
  const scopeCompanyId = parentCompanyId ?? userCompanyId
  const cookieStore = await cookies()
  const cookieBranchId = cookieStore.get("branchId")?.value
  const branches = scopeCompanyId ? await prisma.branch.findMany({ where: { companyId: scopeCompanyId }, orderBy: { name: "asc" } }) : []
  const allowedBranchIds = new Set(branches.map((b) => b.id))
  const candidateBranchId = cookieBranchId ?? branches[0]?.id
  const selectedBranchId = allowedBranchIds.has(String(candidateBranchId)) ? candidateBranchId : branches[0]?.id

  // Collect all potential link fields across all DocTypes to build a comprehensive filter
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
  // 1. Created by Me
  ownershipConditions.push({ createdById: me?.id })
  // 2. Created by My Team
  if (scopeCompanyId) {
      ownershipConditions.push({ createdBy: { companyId: scopeCompanyId } })
  }
  // 3. Assigned to Me
  ownershipConditions.push({ assignedToId: me?.id })
  // 4. Linked to My Company
  if (userCompanyId) {
      for (const key of Array.from(allCompanyLinkKeys)) {
          ownershipConditions.push({ data: { path: `$.${key}`, equals: userCompanyId } })
      }
  }
  // 5. Linked to Me
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

  // Fetch Active Subscriptions for this user's company
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


  // Group DocTypes if needed, or just list them. 
  // For now, we'll list them all under "Dokumen" or similar.
  // Or we can fetch counts if needed (optional optimization).

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Left Sidebar - Navigation */}
      <CustomerSidebar roleId={me?.roleId ?? ""} />

      {/* Main Content */}
      <div className="lg:col-span-6 space-y-6">
        {/* Active Services */}
        <Card className="border-none shadow-sm">
          <CardHeader className="pb-2 border-b">
            <CardTitle className="text-base font-semibold text-primary uppercase tracking-wide">Active Services</CardTitle>
            <p className="text-sm text-muted-foreground">Monitor and Manage Your Data Center & Colocation Services Here.</p>
          </CardHeader>
          <CardContent className="p-0">
             {/* Table Header */}
             <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-slate-50 text-xs font-semibold text-slate-500 uppercase">
                <div className="col-span-1">No.</div>
                <div className="col-span-4">Data Center Service</div>
                <div className="col-span-3">Price</div>
                <div className="col-span-2">Start Date</div>
                <div className="col-span-2">Status</div>
             </div>
             
             {/* Subscriptions List */}
             {activeSubscriptions.length > 0 ? (
               <div className="divide-y">
                 {activeSubscriptions.map((sub, idx) => {
                   const d = (sub.data ?? {}) as Record<string, unknown>
                   return (
                     <div key={sub.id} className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-slate-50 transition-colors">
                       <div className="col-span-1 text-sm text-slate-500">{idx + 1}</div>
                       <div className="col-span-4">
                         <div className="font-medium text-slate-900">{String(d.service_name || "Service")}</div>
                         <div className="text-xs text-slate-400">{sub.code ?? sub.id}</div>
                       </div>
                       <div className="col-span-3 text-sm">
                         <div className="font-semibold text-primary">{formatIDR(d.total_mrc)}</div>
                         <div className="text-xs text-slate-400">/{String(d.frequency || "Monthly")}</div>
                       </div>
                       <div className="col-span-2 text-sm text-slate-600">
                         {String(d.start_date ?? "-")}
                       </div>
                       <div className="col-span-2">
                         <span className={cn(
                           "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                           sub.status === "Active" ? "bg-green-100 text-green-800" :
                           sub.status === "Deactive" ? "bg-yellow-100 text-yellow-800" :
                           "bg-slate-100 text-slate-800"
                         )}>
                           {sub.status ?? "Unknown"}
                         </span>
                       </div>
                     </div>
                   )
                 })}
               </div>
             ) : (
             /* Empty State */
             <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                <div className="w-20 h-20 bg-slate-100 rounded-2xl flex items-center justify-center mb-4">
                   <CreditCard className="w-10 h-10 text-slate-300" />
                </div>
                <h3 className="text-slate-900 font-medium mb-1">You don't have any active services yet.</h3>
                <Button className="mt-4" variant="outline">
                  START SUBSCRIBING NOW!
                </Button>
             </div>
             )}
          </CardContent>
        </Card>

        {/* Quick Access */}
        <div className="space-y-4">
           <div className="border-b pb-2">
              <h3 className="text-base font-semibold text-primary uppercase tracking-wide">Quick Access</h3>
              <p className="text-sm text-muted-foreground">Easily manage your technical needs and access.</p>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Rack Management */}
              <Link 
                href="/customer/my-racks"
                className="relative aspect-[16/9] md:aspect-auto md:h-32 rounded-xl overflow-hidden bg-gradient-to-br from-slate-700 to-slate-600 flex items-center justify-center p-4 text-white group cursor-pointer transition-all hover:shadow-lg"
              >
                 <div className="relative z-10 text-center">
                    <div className="bg-white/20 w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2 backdrop-blur-sm">
                       <LayoutGrid className="w-5 h-5 text-white" />
                    </div>
                    <h4 className="font-bold text-sm mb-0.5 uppercase text-[10px] md:text-sm">RACK MANAGEMENT</h4>
                    <p className="text-[10px] opacity-90 hidden md:block">Manage your server racks.</p>
                 </div>
                 <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
              </Link>

              {/* Visitor Registration */}
              <Link 
                href="/customer/docs/visitor_request/create"
                className="relative aspect-[16/9] md:aspect-auto md:h-32 rounded-xl overflow-hidden bg-gradient-to-br from-emerald-500 to-teal-400 flex items-center justify-center p-4 text-white group cursor-pointer transition-all hover:shadow-lg"
              >
                 <div className="relative z-10 text-center">
                    <div className="bg-white/20 w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2 backdrop-blur-sm">
                       <User className="w-5 h-5 text-white" />
                    </div>
                    <h4 className="font-bold text-sm mb-0.5 text-[10px] md:text-sm">VISITOR REGISTRATION</h4>
                    <p className="text-[10px] opacity-90 hidden md:block">Schedule technician visits.</p>
                 </div>
                 <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
              </Link>

              {/* Smart Hands */}
               <Link 
                href="/customer/order/cmkkwfq8400015grnyatwxk86"
                className="relative aspect-[16/9] md:aspect-auto md:h-32 rounded-xl overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-500 flex items-center justify-center p-4 text-white group cursor-pointer transition-all hover:shadow-lg"
               >
                 <div className="relative z-10 text-center">
                    <div className="bg-white/20 w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2 backdrop-blur-sm">
                       <Zap className="w-5 h-5 text-white" />
                    </div>
                    <h4 className="font-bold text-sm mb-0.5 text-[10px] md:text-sm uppercase">SMART HANDS</h4>
                    <p className="text-[10px] opacity-90 hidden md:block">Remote technical assistance.</p>
                 </div>
                 <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
              </Link>

              {/* Request List */}
              <Link 
                href="/customer/docs/request"
                className="relative aspect-[16/9] md:aspect-auto md:h-32 rounded-xl overflow-hidden bg-gradient-to-br from-orange-500 to-amber-400 flex items-center justify-center p-4 text-white group cursor-pointer transition-all hover:shadow-lg"
              >
                 <div className="relative z-10 text-center">
                    <div className="bg-white/20 w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2 backdrop-blur-sm">
                       <FileText className="w-5 h-5 text-white" />
                    </div>
                    <h4 className="font-bold text-sm mb-0.5 text-[10px] md:text-sm uppercase">REQUEST LIST</h4>
                    <p className="text-[10px] opacity-90 hidden md:block">View all your requests.</p>
                 </div>
                 <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
              </Link>
           </div>
        </div>

        {/* Recent Request Updates */}
        <div className="space-y-4">
           <div className="border-b pb-2 flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-primary uppercase tracking-wide">Request Status Update</h3>
                <p className="text-sm text-muted-foreground">Monitor the progress of your tickets and requests.</p>
              </div>
              <Button variant="link" className="text-sm h-auto p-0 text-primary" asChild>
                <Link href="/customer/requests">View All <ArrowRight className="ml-1 w-4 h-4" /></Link>
              </Button>
           </div>

           <div className="space-y-3">
              {recentRequests.length > 0 ? (
                recentRequests.map((req) => (
                  <div key={req.id} className="bg-white rounded-lg p-4 border shadow-sm flex items-start gap-4 transition-all hover:shadow-md">
                     {/* Icon based on status */}
                     <div className={`mt-1 w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                        ['Completed', 'Approved', 'Selesai', 'Disetujui'].includes(req.status || '') ? 'bg-green-100 text-green-600' :
                        ['Rejected', 'Cancelled', 'Ditolak', 'Dibatalkan'].includes(req.status || '') ? 'bg-red-100 text-red-600' :
                        'bg-blue-100 text-blue-600'
                     }`}>
                        {['Completed', 'Approved', 'Selesai', 'Disetujui'].includes(req.status || '') ? <CheckCircle2 className="w-4 h-4" /> :
                         ['Rejected', 'Cancelled', 'Ditolak', 'Dibatalkan'].includes(req.status || '') ? <XCircle className="w-4 h-4" /> :
                         <Clock className="w-4 h-4" />}
                     </div>
                     
                     <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                           <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded uppercase tracking-wider truncate max-w-[150px]">{req.docType.name}</span>
                           <span className="text-xs text-slate-400 shrink-0 ml-2">{new Date(req.updatedAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                        <h4 className="text-sm font-medium text-slate-900 line-clamp-1">{req.code || 'No Code'} - {req.status || 'Draft'}</h4>
                        <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                          Status last updated on {new Date(req.updatedAt).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>
                     </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 bg-slate-50 rounded-lg border border-dashed border-slate-200">
                   <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm">
                      <FileText className="w-6 h-6 text-slate-300" />
                   </div>
                   <p className="text-sm text-slate-500">No requests or tickets have been created yet.</p>
                   <Button variant="link" className="text-primary text-sm mt-1">Create New Request</Button>
                </div>
              )}
           </div>
        </div>
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
                  <div className="flex items-center justify-between mb-2">
                     <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center">
                           <CreditCard className="w-4 h-4 text-orange-500" />
                        </div>
                        <span className="text-sm font-medium text-slate-700">Unpaid Invoices</span>
                     </div>
                     <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">{unpaidInvoiceSummary.count}</span>
                  </div>
                  <p className="text-xs text-slate-400 pl-10">
                    {unpaidInvoiceSummary.count > 0 ? `Total unpaid: ${formatIDR(unpaidInvoiceSummary.total)}` : "No pending invoices."}
                  </p>
               </div>

               {/* Open Tickets Section */}
               <div>
                  <div className="flex items-center justify-between mb-2">
                     <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                           <Zap className="w-4 h-4 text-blue-500" />
                        </div>
                        <span className="text-sm font-medium text-slate-700">Open Tickets</span>
                     </div>
                     <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">{openTicketsCount}</span>
                  </div>
                  <p className="text-xs text-slate-400 pl-10">
                    {openTicketsCount > 0 ? `You have ${openTicketsCount} active tickets.` : "All tickets are resolved."}
                  </p>
               </div>
            </CardContent>
         </Card>

         
      </div>
    </div>
  );
}
