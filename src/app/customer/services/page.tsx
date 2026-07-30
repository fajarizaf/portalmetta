import Link from "next/link"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CustomerSidebar } from "@/components/customer/customer-sidebar"
import { Package, Calendar, ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"

function statusBadgeVariant(name: string): "default" | "secondary" | "destructive" | "outline" {
  const s = String(name || "").toLowerCase()
  if (s === "active") return "default"
  if (s === "deactive") return "secondary"
  if (s === "cancelled" || s === "expired") return "destructive"
  return "outline"
}

function formatIDR(v: unknown): string {
  const n = typeof v === "number" ? v : Number(v ?? 0)
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(Number.isFinite(n) ? n : 0)
}

function formatDate(v: unknown): string {
  const s = typeof v === "string" ? v : String(v ?? "")
  if (!s) return "-"
  const d = new Date(s)
  return Number.isNaN(d.getTime()) ? "-" : d.toLocaleDateString("id-ID", { year: "numeric", month: "short", day: "numeric" })
}

export const metadata = {
  title: "Layanan Saya | Customer Portal",
}

export default async function CustomerServicesPage() {
  const session = await getServerSession(authOptions)
  const email = session?.user?.email ?? ""
  const me = email ? await prisma.user.findUnique({ where: { email }, include: { role: { include: { permissions: { include: { permission: true } } } } } }) : null
  if (!me) redirect("/auth/signin")
  const perm = new Set((me.role?.permissions ?? []).map((rp) => rp.permission.key))
  if (perm.has("ADMIN_PANEL_ACCESS")) redirect("/admin")

  const userCompanyId = (await prisma.user.findUnique({ where: { email }, select: { companyId: true } }))?.companyId ?? null
  if (!userCompanyId) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <CustomerSidebar roleId={me.roleId} />
        <div className="lg:col-span-9 space-y-6">
          <div className="space-y-1">
            <h1 className="text-2xl font-semibold">Layanan Saya</h1>
            <p className="text-sm text-muted-foreground">Daftar layanan yang anda miliki.</p>
          </div>
          <Card>
            <CardHeader className="pb-2 border-b">
              <CardTitle className="text-base">Layanan</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="text-sm text-muted-foreground">Akun ini belum terhubung ke company, sehingga layanan tidak dapat ditampilkan.</div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const subDt = await prisma.docType.findUnique({ where: { key: "subscription_management" } })
  if (!subDt) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <CustomerSidebar roleId={me.roleId} />
        <div className="lg:col-span-9 space-y-6">
          <div className="space-y-1">
            <h1 className="text-2xl font-semibold">Layanan Saya</h1>
            <p className="text-sm text-muted-foreground">Daftar layanan yang anda miliki.</p>
          </div>
          <Card>
            <CardHeader className="pb-2 border-b">
              <CardTitle className="text-base">Layanan</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="text-sm text-muted-foreground">Fitur layanan belum tersedia.</div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const cookieStore = await cookies()
  const cookieBranchId = cookieStore.get("branchId")?.value

  const userRecord = await prisma.user.findUnique({ where: { email }, select: { companyId: true } })
  const parentCompanyId = userRecord?.companyId ? (await prisma.company.findUnique({ where: { id: userRecord.companyId }, select: { parentId: true } }))?.parentId ?? null : null
  const scopeCompanyId = parentCompanyId ?? userCompanyId
  const branches = scopeCompanyId ? await prisma.branch.findMany({ where: { companyId: scopeCompanyId }, orderBy: { name: "asc" } }) : []
  const allowedBranchIds = new Set(branches.map((b) => b.id))
  const candidateBranchId = cookieBranchId ?? branches[0]?.id
  const selectedBranchId = allowedBranchIds.has(String(candidateBranchId)) ? candidateBranchId : branches[0]?.id

  const subscriptions = await prisma.docRecord.findMany({
    where: {
      docTypeId: subDt.id,
      data: { path: "$.customer_id", equals: userCompanyId },
      ...(selectedBranchId ? { branchId: selectedBranchId } : {}),
    },
    orderBy: { createdAt: "desc" },
    take: 200,
  })

  const activeCount = subscriptions.filter((s) => s.status === "Active").length

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <CustomerSidebar roleId={me.roleId} />

      <div className="lg:col-span-9 space-y-6">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold">Layanan Saya</h1>
          <p className="text-sm text-muted-foreground">
            {subscriptions.length > 0
              ? `${subscriptions.length} layanan (${activeCount} aktif)`
              : "Daftar layanan yang anda miliki."}
          </p>
        </div>

        {subscriptions.length > 0 ? (
          <div className="space-y-3">
            {subscriptions.map((sub) => {
              const d = (sub.data ?? {}) as Record<string, unknown>
              const serviceName = String(d.service_name || "Layanan")
              const frequency = String(d.frequency || "-")
              const totalMRC = formatIDR(d.total_mrc)
              const startDate = formatDate(d.start_date)
              const endDate = formatDate(d.end_date)
              const nextBilling = formatDate(d.next_billing_date)
              const contractDuration = d.contract_duration ? `${d.contract_duration} bulan` : "-"
              const status = sub.status || "Unknown"

              return (
                <Card key={sub.id} className="border border-slate-200/60 hover:border-slate-300/60 transition-all">
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4 min-w-0">
                        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-slate-100 text-slate-600 shrink-0">
                          <Package className="w-5 h-5" />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="text-base font-semibold text-slate-900 truncate">{serviceName}</h3>
                            <Badge variant={statusBadgeVariant(status)} className="text-[10px]">
                              {status}
                            </Badge>
                          </div>
                          <p className="text-sm text-slate-500 mt-0.5">{sub.code || sub.id}</p>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-lg font-bold text-slate-900">{totalMRC}</p>
                        <p className="text-xs text-slate-400">/{frequency.toLowerCase()}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-5 pt-4 border-t border-slate-100">
                      <div>
                        <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Start Date</p>
                        <p className="text-sm font-medium text-slate-700 mt-1">{startDate}</p>
                      </div>
                      <div>
                        <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">End Date</p>
                        <p className="text-sm font-medium text-slate-700 mt-1">{endDate}</p>
                      </div>
                      <div>
                        <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Kontrak</p>
                        <p className="text-sm font-medium text-slate-700 mt-1">{contractDuration}</p>
                      </div>
                      <div>
                        <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Next Billing</p>
                        <div className="flex items-center gap-1 mt-1">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          <p className="text-sm font-medium text-slate-700">{nextBilling}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        ) : (
          <Card>
            <CardHeader className="pb-2 border-b">
              <CardTitle className="text-base">Layanan</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center mb-3">
                  <Package className="w-5 h-5 text-slate-400" />
                </div>
                <p className="text-sm font-medium text-slate-900">Belum ada layanan</p>
                <p className="text-xs text-slate-500 mt-1">Anda belum memiliki layanan aktif saat ini.</p>
                <Link
                  href="/customer/order"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  Pesan layanan baru
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
