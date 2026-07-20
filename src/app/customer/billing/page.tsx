import Link from "next/link"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CustomerSidebar } from "@/components/customer/customer-sidebar"

function statusBadgeVariant(name: string): "default" | "secondary" | "destructive" | "outline" {
  const s = String(name || "").toLowerCase()
  if (s.includes("cancel")) return "destructive"
  if (s.includes("submit")) return "secondary"
  if (s.includes("draft")) return "outline"
  if (s.includes("review") || s.includes("approve") || s.includes("verified") || s.includes("active") || s.includes("publish") || s.includes("sent") || s.includes("paid")) return "default"
  return "outline"
}

function formatIDR(v: unknown): string {
  const n = typeof v === "number" ? v : Number(v ?? 0)
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(Number.isFinite(n) ? n : 0)
}

function formatDateOnly(v: unknown): string {
  const s = typeof v === "string" ? v : String(v ?? "")
  if (!s) return "-"
  const d = new Date(s)
  return Number.isNaN(d.getTime()) ? "-" : d.toLocaleDateString("id-ID")
}

export const metadata = {
  title: "Billing | Customer Portal",
}

export default async function CustomerBillingPage() {
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
          <div className="space-y-1">
            <h1 className="text-2xl font-semibold">Billing</h1>
            <p className="text-sm text-muted-foreground">Invoice yang ditampilkan hanya yang status-nya bukan Draft.</p>
          </div>
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
          <div className="space-y-1">
            <h1 className="text-2xl font-semibold">Billing</h1>
            <p className="text-sm text-muted-foreground">Daftar invoice yang dapat diakses untuk company Anda.</p>
          </div>
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

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <CustomerSidebar roleId={me.roleId} />

      <div className="lg:col-span-9 space-y-6">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold">Billing</h1>
          <p className="text-sm text-muted-foreground">Daftar invoice yang dapat diakses untuk company Anda.</p>
        </div>

        <Card className="border-none shadow-sm">
          <CardHeader className="pb-2 border-b">
            <CardTitle className="text-base font-semibold text-primary uppercase tracking-wide">Invoices</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="grid grid-cols-12 gap-3 px-6 py-3 bg-slate-50 text-xs font-semibold text-slate-500 uppercase">
              <div className="col-span-1">No.</div>
              <div className="col-span-4">Invoice</div>
              <div className="col-span-2">Invoice Date</div>
              <div className="col-span-2">Due Date</div>
              <div className="col-span-2">Total Amount</div>
              <div className="col-span-1">Status</div>
            </div>

            {invoicesFiltered.length > 0 ? (
              <div className="divide-y">
                {invoicesFiltered.map((inv, idx) => {
                  const d = (inv.data ?? {}) as Record<string, unknown>
                  const invoiceDate = formatDateOnly(d["invoice_date"])
                  const dueDate = formatDateOnly(d["due_date"])
                  const total = formatIDR(d["total_amount"])
                  return (
                    <Link
                      key={inv.id}
                      href={`/customer/billing/${inv.id}`}
                      className="grid grid-cols-12 gap-3 px-6 py-4 items-center hover:bg-slate-50 transition-colors"
                    >
                      <div className="col-span-1 text-sm text-slate-500">{idx + 1}</div>
                      <div className="col-span-4">
                        <div className="text-sm font-semibold text-slate-900 hover:underline">
                          {inv.code || inv.id}
                        </div>
                        <div className="text-[11px] text-slate-500">{inv.createdAt.toLocaleDateString("id-ID")}</div>
                      </div>
                      <div className="col-span-2 text-sm text-slate-700">{invoiceDate}</div>
                      <div className="col-span-2 text-sm text-slate-700">{dueDate}</div>
                      <div className="col-span-2 text-sm font-semibold text-slate-900">{total}</div>
                      <div className="col-span-1">
                        <Badge variant={statusBadgeVariant(inv.status || "")} className="text-[10px]">
                          {inv.status || "-"}
                        </Badge>
                      </div>
                    </Link>
                  )
                })}
              </div>
            ) : (
              <div className="px-6 py-8 text-sm text-muted-foreground">Belum ada invoice selain Draft.</div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
