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
import { BillingFilter } from "@/components/customer/billing-filter"
import {
  FileText, CreditCard, Receipt, CheckCircle2,
  AlertCircle, Clock, ArrowUpRight, Search
} from "lucide-react"
import { cn } from "@/lib/utils"

function statusBadgeVariant(name: string): "default" | "secondary" | "destructive" | "outline" {
  const s = String(name || "").toLowerCase()
  if (s.includes("paid") || s.includes("lunas") || s.includes("settled")) return "default"
  if (s.includes("unpaid") || s.includes("belum") || s.includes("overdue") || s.includes("jatuh tempo")) return "destructive"
  if (s.includes("cancel")) return "secondary"
  if (s.includes("draft")) return "outline"
  return "secondary"
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

function formatDateRelative(v: unknown): string {
  const s = typeof v === "string" ? v : String(v ?? "")
  if (!s) return "-"
  const d = new Date(s)
  if (Number.isNaN(d.getTime())) return "-"
  const now = new Date()
  const diff = d.getTime() - now.getTime()
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24))
  if (days < 0) return `Lewat ${Math.abs(days)} hari`
  if (days === 0) return "Hari ini"
  if (days === 1) return "Besok"
  return `${days} hari lagi`
}

function statusDot(name: string | null): string {
  const s = String(name || "").toLowerCase()
  if (s.includes("paid") || s.includes("lunas") || s.includes("settled")) return "bg-emerald-500"
  if (s.includes("unpaid") || s.includes("belum")) return "bg-amber-500"
  if (s.includes("overdue") || s.includes("jatuh tempo")) return "bg-red-500"
  if (s.includes("draft")) return "bg-slate-300"
  if (s.includes("cancel")) return "bg-slate-400"
  return "bg-blue-500"
}

const VALID_TABS = ["all", "unpaid", "paid", "overdue"] as const
type FilterTab = typeof VALID_TABS[number]

export const metadata = {
  title: "Billing | Customer Portal",
}

export default async function CustomerBillingPage({
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

  const invoiceDocType = await prisma.docType.findUnique({ where: { key: "invoice" } })
  if (!invoiceDocType) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <CustomerSidebar roleId={me.roleId} />
        <div className="lg:col-span-9 space-y-6">
          <Card>
            <CardHeader className="pb-2 border-b">
              <CardTitle className="text-base">Invoices</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="text-sm text-muted-foreground">DocType invoice belum tersedia.</div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const cookieStore = await cookies()
  const cookieBranchId = cookieStore.get("branchId")?.value

  const userCompanyId = (await prisma.user.findUnique({ where: { email }, select: { companyId: true } }))?.companyId ?? null
  if (!userCompanyId) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <CustomerSidebar roleId={me.roleId} />
        <div className="lg:col-span-9 space-y-6">
          <Card>
            <CardHeader className="pb-2 border-b">
              <CardTitle className="text-base">Invoice</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="text-sm text-muted-foreground">Akun ini belum terhubung ke company, sehingga invoice tidak dapat ditampilkan.</div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const parentCompanyId = (await prisma.company.findUnique({ where: { id: userCompanyId }, select: { parentId: true } }))?.parentId ?? null
  const scopeCompanyId = parentCompanyId ?? userCompanyId
  const allowedCompanyIds = new Set([userCompanyId, scopeCompanyId].filter(Boolean))

  const invoices = await prisma.docRecord.findMany({
    where: {
      docTypeId: invoiceDocType.id,
      ...(cookieBranchId ? { branchId: cookieBranchId } : {}),
      status: { not: null },
      NOT: { status: { in: ["Draft", "DRAFT"] } },
    },
    orderBy: { createdAt: "desc" },
    take: 200,
  })

  const invoicesFiltered = invoices.filter((inv) => {
    const d = (inv.data ?? {}) as Record<string, unknown>
    const customerIdRaw = d["customer_id"] ?? d["customer"]
    const customerId = typeof customerIdRaw === "string" ? customerIdRaw : String(customerIdRaw ?? "")
    return customerId && allowedCompanyIds.has(customerId)
  })

  let totalUnpaid = 0
  let totalPaid = 0
  let totalOverdue = 0
  let overdueCount = 0

  for (const inv of invoicesFiltered) {
    const d = (inv.data ?? {}) as Record<string, unknown>
    const raw = d["total_amount"] ?? d["total"] ?? d["grand_total"]
    const n = typeof raw === "number" ? raw : Number(raw ?? 0)
    const amount = Number.isFinite(n) ? n : 0

    const s = String(inv.status || "").toLowerCase()
    if (s.includes("paid") || s.includes("lunas") || s.includes("settled")) {
      totalPaid += amount
    } else if (s.includes("overdue") || s.includes("jatuh tempo")) {
      totalUnpaid += amount
      overdueCount += 1
    } else if (s.includes("unpaid") || s.includes("belum")) {
      totalUnpaid += amount
    }
  }
  totalOverdue = overdueCount

  const sp = await searchParams
  const rawTab = sp?.tab
  const activeTab: FilterTab = typeof rawTab === "string" && VALID_TABS.includes(rawTab as FilterTab)
    ? (rawTab as FilterTab)
    : "all"

  const rawQ = sp?.q
  const searchQuery = typeof rawQ === "string" ? rawQ : ""

  let displayInvoices = [...invoicesFiltered]
  if (activeTab === "unpaid") {
    displayInvoices = displayInvoices.filter((inv) => {
      const s = String(inv.status || "").toLowerCase()
      return s.includes("unpaid") || s.includes("belum") || s.includes("overdue")
    })
  } else if (activeTab === "paid") {
    displayInvoices = displayInvoices.filter((inv) => {
      const s = String(inv.status || "").toLowerCase()
      return s.includes("paid") || s.includes("lunas") || s.includes("settled")
    })
  } else if (activeTab === "overdue") {
    displayInvoices = displayInvoices.filter((inv) => {
      const s = String(inv.status || "").toLowerCase()
      return s.includes("overdue") || s.includes("jatuh tempo")
    })
  }
  if (searchQuery) {
    const q = searchQuery.toLowerCase()
    displayInvoices = displayInvoices.filter((inv) => {
      const code = (inv.code || "").toLowerCase()
      const d = (inv.data ?? {}) as Record<string, unknown>
      const invNum = String(d["invoice_number"] || d["invoice_no"] || "").toLowerCase()
      return code.includes(q) || invNum.includes(q)
    })
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <CustomerSidebar roleId={me.roleId} />

      <div className="lg:col-span-9 space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">Billing</h1>
            <p className="text-sm text-slate-500">Kelola dan pantau semua tagihan anda.</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-9 text-xs gap-1.5" asChild>
              <Link href="/customer/order">
                <CreditCard className="w-3.5 h-3.5" />
                Pesan Layanan
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
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Total Invoice</p>
                  <p className="text-2xl font-bold text-slate-900 mt-1.5">{invoicesFiltered.length}</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                  <Receipt className="w-5 h-5 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-slate-200/60">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Total Tagihan</p>
                  <p className="text-2xl font-bold text-slate-900 mt-1.5">{formatIDR(totalUnpaid + totalPaid)}</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-slate-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-slate-200/60">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Belum Dibayar</p>
                  <p className="text-2xl font-bold text-amber-600 mt-1.5">{formatIDR(totalUnpaid)}</p>
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
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Sudah Dibayar</p>
                  <p className="text-2xl font-bold text-emerald-600 mt-1.5">{formatIDR(totalPaid)}</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Overdue Alert */}
        {totalOverdue > 0 && (
          <div className="flex items-center gap-3 px-5 py-3.5 bg-red-50 border border-red-200 rounded-xl text-sm">
            <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
            <div className="text-red-800">
              <span className="font-semibold">{totalOverdue} invoice</span> melewati jatuh tempo. Segera lakukan pembayaran untuk menghindari denda.
            </div>
            <Link
              href="/customer/billing?tab=overdue"
              className="ml-auto shrink-0 text-xs font-semibold text-red-700 hover:text-red-900 underline underline-offset-2"
            >
              Lihat
            </Link>
          </div>
        )}

        {/* Invoice List Card */}
        <Card className="border border-slate-200/60 overflow-hidden">
          <CardHeader className="px-6 py-4 border-b border-slate-100">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <CardTitle className="text-base font-semibold text-slate-900 flex items-center gap-2">
                <Receipt className="w-4 h-4 text-slate-500" />
                Daftar Invoice
                <span className="text-xs font-normal text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                  {displayInvoices.length} dari {invoicesFiltered.length}
                </span>
              </CardTitle>
              <BillingFilter activeTab={activeTab} searchQuery={searchQuery} />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {displayInvoices.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-slate-50/80">
                      <TableHead className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider px-6 py-3">Invoice</TableHead>
                      <TableHead className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider px-4 py-3">Tanggal</TableHead>
                      <TableHead className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider px-4 py-3">Jatuh Tempo</TableHead>
                      <TableHead className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider px-4 py-3 text-right">Total</TableHead>
                      <TableHead className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider px-4 py-3">Status</TableHead>
                      <TableHead className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider px-4 py-3 text-right">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {displayInvoices.map((inv, idx) => {
                      const d = (inv.data ?? {}) as Record<string, unknown>
                      const invoiceDate = formatDate(d["invoice_date"])
                      const dueDate = formatDate(d["due_date"])
                      const dueDateRel = formatDateRelative(d["due_date"])
                      const total = formatIDR(d["total_amount"])
                      const status = inv.status || "-"
                      const isOverdue = String(status).toLowerCase().includes("overdue")
                      const isUnpaid = String(status).toLowerCase().includes("unpaid") || String(status).toLowerCase().includes("belum")

                      return (
                        <TableRow
                          key={inv.id}
                          className={cn(
                            "transition-colors",
                            isOverdue ? "bg-red-50/40 hover:bg-red-50/80" : "hover:bg-slate-50/60"
                          )}
                        >
                          <TableCell className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className={cn(
                                "flex items-center justify-center w-9 h-9 rounded-lg shrink-0",
                                isOverdue ? "bg-red-100" : isUnpaid ? "bg-amber-50" : "bg-emerald-50"
                              )}>
                                <FileText className={cn(
                                  "w-4 h-4",
                                  isOverdue ? "text-red-600" : isUnpaid ? "text-amber-600" : "text-emerald-600"
                                )} />
                              </div>
                              <div>
                                <Link
                                  href={`/customer/billing/${inv.id}`}
                                  className="text-sm font-semibold text-slate-900 hover:text-primary transition-colors"
                                >
                                  {inv.code || "No Code"}
                                </Link>
                                {d["invoice_number"] ? (
                                  <p className="text-[11px] text-slate-400 mt-0.5">{String(d["invoice_number"])}</p>
                                ) : null}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="px-4 py-4">
                            <div className="flex items-center gap-2">
                              <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                              <span className="text-sm text-slate-700">{invoiceDate}</span>
                            </div>
                          </TableCell>
                          <TableCell className="px-4 py-4">
                            <div className="flex flex-col">
                              <span className={cn(
                                "text-sm",
                                isOverdue ? "text-red-600 font-semibold" : "text-slate-700"
                              )}>
                                {dueDate}
                              </span>
                              <span className={cn(
                                "text-[11px] mt-0.5",
                                isOverdue ? "text-red-500 font-medium" : "text-slate-400"
                              )}>
                                {dueDateRel}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="px-4 py-4 text-right">
                            <span className={cn(
                              "text-sm font-bold",
                              isOverdue ? "text-red-600" : "text-slate-900"
                            )}>
                              {total}
                            </span>
                          </TableCell>
                          <TableCell className="px-4 py-4">
                            <div className="flex items-center gap-2">
                              <span className={cn("w-2 h-2 rounded-full shrink-0", statusDot(status))} />
                              <Badge variant={statusBadgeVariant(status)} className="text-[10px] font-medium">
                                {status}
                              </Badge>
                            </div>
                          </TableCell>
                          <TableCell className="px-4 py-4 text-right">
                            <div className="flex items-center justify-end gap-1">
                              <Button size="sm" variant="ghost" className="h-8 w-8 p-0" asChild>
                                <Link href={`/customer/billing/${inv.id}`}>
                                  <ArrowUpRight className="w-4 h-4 text-slate-500" />
                                </Link>
                              </Button>
                              <Button size="sm" variant="outline" className="h-8 text-xs gap-1 px-2.5" asChild>
                                <Link href={`/customer/docs/invoice/${inv.id}/preview`}>
                                  <FileText className="w-3.5 h-3.5" />
                                  <span className="hidden sm:inline">PDF</span>
                                </Link>
                              </Button>
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
                  <Receipt className="w-7 h-7 text-slate-400" />
                </div>
                <h3 className="text-base font-semibold text-slate-900">Belum ada invoice</h3>
                <p className="text-sm text-slate-500 mt-1 max-w-sm">
                  {searchQuery
                    ? "Tidak ada invoice yang cocok dengan pencarian anda."
                    : "Belum ada tagihan yang tersedia untuk company anda."}
                </p>
                {!searchQuery && (
                  <Button variant="outline" className="mt-4 h-9 text-xs gap-1.5" asChild>
                    <Link href="/customer/order">
                      <CreditCard className="w-3.5 h-3.5" />
                      Pesan Layanan
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
