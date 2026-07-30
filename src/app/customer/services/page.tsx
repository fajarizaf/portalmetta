import Link from "next/link"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"
import { CustomerSidebar } from "@/components/customer/customer-sidebar"
import { ServicesFilter } from "@/components/customer/services-filter"
import {
  Package, Calendar, CreditCard, Clock, AlertCircle,
  Activity, ArrowUpRight, Plus
} from "lucide-react"
import { cn } from "@/lib/utils"

function statusBadgeVariant(name: string): "default" | "secondary" | "destructive" | "outline" {
  const s = String(name || "").toLowerCase()
  if (s === "active") return "default"
  if (s === "deactive") return "secondary"
  if (s === "cancelled" || s === "expired") return "destructive"
  return "outline"
}

function statusDot(name: string | null): string {
  const s = String(name || "").toLowerCase()
  if (s === "active") return "bg-emerald-500"
  if (s === "deactive") return "bg-amber-500"
  if (s === "cancelled" || s === "expired") return "bg-red-500"
  return "bg-slate-300"
}

function statusLabel(name: string | null): { label: string; color: string } {
  const s = String(name || "").toLowerCase()
  if (s === "active") return { label: "Active", color: "text-emerald-700 bg-emerald-50 border-emerald-200" }
  if (s === "deactive") return { label: "Deactive", color: "text-amber-700 bg-amber-50 border-amber-200" }
  if (s === "cancelled") return { label: "Cancelled", color: "text-red-700 bg-red-50 border-red-200" }
  if (s === "expired") return { label: "Expired", color: "text-slate-600 bg-slate-100 border-slate-200" }
  return { label: s || "Unknown", color: "text-slate-600 bg-slate-50 border-slate-200" }
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

function getDaysLeft(endDate: unknown): { days: number; label: string; urgent: boolean } | null {
  const s = typeof endDate === "string" ? endDate : String(endDate ?? "")
  if (!s) return null
  const d = new Date(s)
  if (Number.isNaN(d.getTime())) return null
  const now = new Date()
  const diff = d.getTime() - now.getTime()
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24))
  if (days < 0) return { days, label: `Berakhir ${Math.abs(days)} hari lalu`, urgent: true }
  if (days === 0) return { days, label: "Berakhir hari ini", urgent: true }
  if (days <= 7) return { days, label: `${days} hari lagi`, urgent: true }
  if (days <= 30) return { days, label: `${days} hari lagi`, urgent: false }
  return { days, label: `${Math.floor(days / 30)} bulan lagi`, urgent: false }
}

const VALID_TABS = ["all", "active", "deactive", "expired"] as const
type FilterTab = typeof VALID_TABS[number]

export const metadata = {
  title: "Layanan Saya | Customer Portal",
}

export default async function CustomerServicesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
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
  const deactiveCount = subscriptions.filter((s) => s.status === "Deactive").length
  const expiredCount = subscriptions.filter((s) => s.status === "Expired" || s.status === "Cancelled").length

  let totalMonthlyMRC = 0
  for (const sub of subscriptions) {
    if (sub.status === "Active") {
      const d = (sub.data ?? {}) as Record<string, unknown>
      const raw = d["total_mrc"]
      const n = typeof raw === "number" ? raw : Number(raw ?? 0)
      totalMonthlyMRC += Number.isFinite(n) ? n : 0
    }
  }

  const sp = await searchParams
  const rawTab = sp?.tab
  const activeTab: FilterTab = typeof rawTab === "string" && VALID_TABS.includes(rawTab as FilterTab)
    ? (rawTab as FilterTab)
    : "all"

  const rawQ = sp?.q
  const searchQuery = typeof rawQ === "string" ? rawQ : ""

  let displaySubs = [...subscriptions]
  if (activeTab === "active") displaySubs = displaySubs.filter((s) => s.status === "Active")
  else if (activeTab === "deactive") displaySubs = displaySubs.filter((s) => s.status === "Deactive")
  else if (activeTab === "expired") displaySubs = displaySubs.filter((s) => s.status === "Expired" || s.status === "Cancelled")

  if (searchQuery) {
    const q = searchQuery.toLowerCase()
    displaySubs = displaySubs.filter((sub) => {
      const d = (sub.data ?? {}) as Record<string, unknown>
      const name = String(d.service_name || "").toLowerCase()
      const code = (sub.code || "").toLowerCase()
      return name.includes(q) || code.includes(q)
    })
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <CustomerSidebar roleId={me.roleId} />

      <div className="lg:col-span-9 space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">Layanan Saya</h1>
            <p className="text-sm text-slate-500">Kelola dan pantau semua layanan yang anda miliki.</p>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" className="h-9 text-xs gap-1.5" asChild>
              <Link href="/customer/order">
                <Plus className="w-3.5 h-3.5" />
                Pesan Baru
              </Link>
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border border-slate-200/60">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Total Layanan</p>
                  <p className="text-2xl font-bold text-slate-900 mt-1.5">{subscriptions.length}</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                  <Package className="w-5 h-5 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-slate-200/60">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Aktif</p>
                  <p className="text-2xl font-bold text-emerald-600 mt-1.5">{activeCount}</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                  <Activity className="w-5 h-5 text-emerald-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-slate-200/60">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Non-Aktif</p>
                  <p className="text-2xl font-bold text-amber-600 mt-1.5">{deactiveCount}</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-amber-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-slate-200/60">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Total MRC/Bulan</p>
                  <p className="text-2xl font-bold text-slate-900 mt-1.5">{formatIDR(totalMonthlyMRC)}</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-violet-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Expiring Alert */}
        {(() => {
          const expiring = subscriptions.filter((s) => {
            if (s.status !== "Active") return false
            const d = (s.data ?? {}) as Record<string, unknown>
            const end = getDaysLeft(d.end_date)
            return end && end.urgent && end.days <= 14
          })
          if (expiring.length === 0) return null
          return (
            <div className="flex items-center gap-3 px-5 py-3.5 bg-amber-50 border border-amber-200 rounded-xl text-sm">
              <AlertCircle className="w-5 h-5 text-amber-500 shrink-0" />
              <div className="text-amber-800">
                <span className="font-semibold">{expiring.length} layanan</span> akan segera berakhir. Perpanjang sebelum masa aktif habis.
              </div>
              <Link
                href="/customer/order"
                className="ml-auto shrink-0 text-xs font-semibold text-amber-700 hover:text-amber-900 underline underline-offset-2"
              >
                Perpanjang
              </Link>
            </div>
          )
        })()}

        {/* Service List Card */}
        <Card className="border border-slate-200/60 overflow-hidden">
          <CardHeader className="px-6 py-4 border-b border-slate-100">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <CardTitle className="text-base font-semibold text-slate-900 flex items-center gap-2">
                <Package className="w-4 h-4 text-slate-500" />
                Daftar Layanan
                <span className="text-xs font-normal text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                  {displaySubs.length} dari {subscriptions.length}
                </span>
              </CardTitle>
              <ServicesFilter activeTab={activeTab} searchQuery={searchQuery} />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {displaySubs.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-slate-50/80">
                      <TableHead className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider px-6 py-3">Layanan</TableHead>
                      <TableHead className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider px-4 py-3">Periode</TableHead>
                      <TableHead className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider px-4 py-3">Kontrak</TableHead>
                      <TableHead className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider px-4 py-3 text-right">MRC</TableHead>
                      <TableHead className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider px-4 py-3">Frekuensi</TableHead>
                      <TableHead className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider px-4 py-3">Status</TableHead>
                      <TableHead className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider px-4 py-3 text-right">Next Billing</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {displaySubs.map((sub) => {
                      const d = (sub.data ?? {}) as Record<string, unknown>
                      const serviceName = String(d.service_name || "Layanan")
                      const frequency = String(d.frequency || "-")
                      const totalMRC = formatIDR(d.total_mrc)
                      const startDate = formatDate(d.start_date)
                      const endDate = formatDate(d.end_date)
                      const nextBilling = formatDate(d.next_billing_date)
                      const contractDuration = d.contract_duration ? `${d.contract_duration} bulan` : "-"
                      const status = sub.status || "Unknown"
                      const statusInfo = statusLabel(status)
                      const endDays = getDaysLeft(d.end_date)
                      const isExpiring = endDays && endDays.urgent && endDays.days <= 14 && endDays.days >= 0

                      return (
                        <TableRow
                          key={sub.id}
                          className={cn(
                            "transition-colors",
                            isExpiring ? "bg-amber-50/40 hover:bg-amber-50/80" : "hover:bg-slate-50/60"
                          )}
                        >
                          <TableCell className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className={cn(
                                "flex items-center justify-center w-9 h-9 rounded-lg shrink-0",
                                status === "Active" ? "bg-emerald-50" :
                                status === "Deactive" ? "bg-amber-50" :
                                status === "Expired" || status === "Cancelled" ? "bg-red-50" :
                                "bg-slate-100"
                              )}>
                                <Package className={cn(
                                  "w-4 h-4",
                                  status === "Active" ? "text-emerald-600" :
                                  status === "Deactive" ? "text-amber-600" :
                                  status === "Expired" || status === "Cancelled" ? "text-red-500" :
                                  "text-slate-500"
                                )} />
                              </div>
                              <div>
                                <Link
                                  href={`/customer/docs/subscription_management/${sub.id}`}
                                  className="text-sm font-semibold text-slate-900 hover:text-primary transition-colors"
                                >
                                  {serviceName}
                                </Link>
                                <p className="text-[11px] text-slate-400 mt-0.5">{sub.code || sub.id}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="px-4 py-4">
                            <div className="flex flex-col gap-0.5">
                              <div className="flex items-center gap-1.5">
                                <Calendar className="w-3 h-3 text-slate-400 shrink-0" />
                                <span className="text-sm text-slate-700">{startDate}</span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <ArrowUpRight className="w-3 h-3 text-slate-400 shrink-0" />
                                <span className={cn(
                                  "text-sm",
                                  endDays && endDays.urgent ? "text-red-600 font-medium" : "text-slate-700"
                                )}>
                                  {endDate}
                                </span>
                              </div>
                              {endDays && (
                                <span className={cn(
                                  "text-[11px] mt-0.5",
                                  endDays.urgent ? "text-red-500 font-medium" : "text-slate-400"
                                )}>
                                  {endDays.label}
                                </span>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="px-4 py-4">
                            <span className="text-sm text-slate-700">{contractDuration}</span>
                          </TableCell>
                          <TableCell className="px-4 py-4 text-right">
                            <span className="text-sm font-bold text-slate-900">{totalMRC}</span>
                          </TableCell>
                          <TableCell className="px-4 py-4">
                            <span className="text-sm text-slate-600 capitalize">{frequency.toLowerCase()}</span>
                          </TableCell>
                          <TableCell className="px-4 py-4">
                            <div className="flex items-center gap-2">
                              <span className={cn("w-2 h-2 rounded-full shrink-0", statusDot(status))} />
                              <span className={cn(
                                "inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border",
                                statusInfo.color
                              )}>
                                {statusInfo.label}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="px-4 py-4 text-right">
                            <div className="flex flex-col items-end">
                              <span className="text-sm text-slate-700">{nextBilling}</span>
                              <span className="text-[11px] text-slate-400">Tagihan</span>
                            </div>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
                <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
                  <Package className="w-7 h-7 text-slate-400" />
                </div>
                <h3 className="text-base font-semibold text-slate-900">
                  {searchQuery ? "Tidak ada hasil" : "Belum ada layanan"}
                </h3>
                <p className="text-sm text-slate-500 mt-1 max-w-sm">
                  {searchQuery
                    ? "Tidak ada layanan yang cocok dengan pencarian anda."
                    : "Anda belum memiliki layanan. Pesan layanan baru untuk memulai."}
                </p>
                {!searchQuery && (
                  <Button className="mt-4 h-9 text-xs gap-1.5" asChild>
                    <Link href="/customer/order">
                      <Plus className="w-3.5 h-3.5" />
                      Pesan Layanan Baru
                    </Link>
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
