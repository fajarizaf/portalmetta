import Link from "next/link"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CustomerSidebar } from "@/components/customer/customer-sidebar"
import { FileText } from "lucide-react"

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
  title: "Invoice Detail | Customer Portal",
}

export default async function CustomerBillingDetailPage({ params }: { params: { id?: string | string[] } | Promise<{ id?: string | string[] }> }) {
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
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <h1 className="text-2xl font-semibold">Invoice</h1>
              <div className="text-sm text-muted-foreground">Detail</div>
            </div>
            <Button asChild variant="outline">
              <Link href="/customer/billing">Kembali</Link>
            </Button>
          </div>
          <Card className="border-none shadow-sm">
            <CardHeader className="pb-2 border-b">
              <CardTitle className="text-base">Tidak dapat membuka invoice</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="text-sm text-muted-foreground">DocType invoice belum tersedia.</div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const userCompanyId = (await prisma.user.findUnique({ where: { email }, select: { companyId: true } }))?.companyId ?? null
  if (!userCompanyId) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <CustomerSidebar roleId={me.roleId} />
        <div className="lg:col-span-9 space-y-6">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <h1 className="text-2xl font-semibold">Invoice</h1>
              <div className="text-sm text-muted-foreground">Detail</div>
            </div>
            <Button asChild variant="outline">
              <Link href="/customer/billing">Kembali</Link>
            </Button>
          </div>
          <Card className="border-none shadow-sm">
            <CardHeader className="pb-2 border-b">
              <CardTitle className="text-base">Tidak dapat membuka invoice</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="text-sm text-muted-foreground">Akun ini belum terhubung ke company.</div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const parentCompanyId = (await prisma.company.findUnique({ where: { id: userCompanyId }, select: { parentId: true } }))?.parentId ?? null
  const scopeCompanyId = parentCompanyId ?? userCompanyId
  const allowedCompanyIds = new Set([userCompanyId, scopeCompanyId].filter(Boolean))

  const p = ((await params) ?? {}) as { id?: string | string[] }
  const idRaw = p?.id
  const id = typeof idRaw === "string" ? idRaw : Array.isArray(idRaw) ? (idRaw[0] ?? "") : ""
  if (!id) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <CustomerSidebar roleId={me.roleId} />
        <div className="lg:col-span-9 space-y-6">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <h1 className="text-2xl font-semibold">Invoice</h1>
              <div className="text-sm text-muted-foreground">Detail</div>
            </div>
            <Button asChild variant="outline">
              <Link href="/customer/billing">Kembali</Link>
            </Button>
          </div>
          <Card className="border-none shadow-sm">
            <CardHeader className="pb-2 border-b">
              <CardTitle className="text-base">Tidak dapat membuka invoice</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="text-sm text-muted-foreground">Invoice ID tidak valid.</div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const invoice = await prisma.docRecord.findUnique({ where: { id } })

  if (!invoice || invoice.docTypeId !== invoiceDocType.id) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <CustomerSidebar roleId={me.roleId} />
        <div className="lg:col-span-9 space-y-6">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <h1 className="text-2xl font-semibold">Invoice</h1>
              <div className="text-sm text-muted-foreground">{id}</div>
            </div>
            <Button asChild variant="outline">
              <Link href="/customer/billing">Kembali</Link>
            </Button>
          </div>
          <Card className="border-none shadow-sm">
            <CardHeader className="pb-2 border-b">
              <CardTitle className="text-base">Invoice tidak ditemukan</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="text-sm text-muted-foreground">Invoice tidak tersedia atau sudah dihapus.</div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }
  if (!invoice.status || ["draft"].includes(String(invoice.status).toLowerCase())) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <CustomerSidebar roleId={me.roleId} />
        <div className="lg:col-span-9 space-y-6">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <h1 className="text-2xl font-semibold">Invoice</h1>
              <div className="text-sm text-muted-foreground">{invoice.code || invoice.id}</div>
            </div>
            <Button asChild variant="outline">
              <Link href="/customer/billing">Kembali</Link>
            </Button>
          </div>
          <Card className="border-none shadow-sm">
            <CardHeader className="pb-2 border-b">
              <CardTitle className="text-base">Invoice belum dapat diakses</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="text-sm text-muted-foreground">Invoice masih berstatus Draft.</div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const data = (invoice.data ?? {}) as Record<string, unknown>
  const customerIdRaw = data["customer_id"] ?? data["customer"]
  const customerId = (() => {
    if (typeof customerIdRaw === "string") return customerIdRaw
    if (typeof customerIdRaw === "number") return String(customerIdRaw)
    if (Array.isArray(customerIdRaw)) {
      const first = customerIdRaw[0]
      return typeof first === "string" ? first : typeof first === "number" ? String(first) : String(first ?? "")
    }
    if (customerIdRaw && typeof customerIdRaw === "object" && "id" in (customerIdRaw as Record<string, unknown>)) {
      const v = (customerIdRaw as Record<string, unknown>)["id"]
      return typeof v === "string" ? v : String(v ?? "")
    }
    return String(customerIdRaw ?? "")
  })().trim()
  if (!customerId || !allowedCompanyIds.has(customerId)) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <CustomerSidebar roleId={me.roleId} />
        <div className="lg:col-span-9 space-y-6">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <h1 className="text-2xl font-semibold">Invoice</h1>
              <div className="text-sm text-muted-foreground">{invoice.code || invoice.id}</div>
            </div>
            <Button asChild variant="outline">
              <Link href="/customer/billing">Kembali</Link>
            </Button>
          </div>
          <Card className="border-none shadow-sm">
            <CardHeader className="pb-2 border-b">
              <CardTitle className="text-base">Tidak memiliki akses</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="text-sm text-muted-foreground">Invoice ini tidak terhubung ke company Anda.</div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const d = data
  const items = await prisma.docRow.findMany({
    where: { recordId: invoice.id, childDocTypeId: null },
    orderBy: { idx: "asc" },
  })

  const invoiceDate = formatDateOnly(d["invoice_date"])
  const dueDate = formatDateOnly(d["due_date"])
  const subtotal = formatIDR(d["subtotal"])
  const tax = formatIDR(d["tax"])
  const total = formatIDR(d["total_amount"])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <CustomerSidebar roleId={me.roleId} />

      <div className="lg:col-span-9 space-y-6">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl font-semibold">Invoice</h1>
            <div className="text-sm text-muted-foreground">{invoice.code || invoice.id}</div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={statusBadgeVariant(invoice.status || "")}>{invoice.status || "-"}</Badge>
            <Button size="sm" variant="outline" className="gap-1.5" asChild>
              <Link href={`/customer/docs/invoice/${invoice.id}/preview`}>
                <FileText className="h-4 w-4" />
                Preview Dokumen
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/customer/billing">Kembali</Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-none shadow-sm">
            <CardHeader className="pb-2 border-b">
              <CardTitle className="text-sm">Invoice Date</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="text-base font-semibold">{invoiceDate}</div>
            </CardContent>
          </Card>
          <Card className="border-none shadow-sm">
            <CardHeader className="pb-2 border-b">
              <CardTitle className="text-sm">Due Date</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="text-base font-semibold">{dueDate}</div>
            </CardContent>
          </Card>
          <Card className="border-none shadow-sm">
            <CardHeader className="pb-2 border-b">
              <CardTitle className="text-sm">Total Amount</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="text-base font-semibold text-primary">{total}</div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-none shadow-sm">
          <CardHeader className="pb-2 border-b">
            <CardTitle className="text-base font-semibold text-primary uppercase tracking-wide">Invoice Items</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="grid grid-cols-12 gap-3 px-6 py-3 bg-slate-50 text-xs font-semibold text-slate-500 uppercase">
              <div className="col-span-1">No.</div>
              <div className="col-span-5">Description</div>
              <div className="col-span-2">Qty</div>
              <div className="col-span-2">Price</div>
              <div className="col-span-2">Subtotal</div>
            </div>
            {items.length > 0 ? (
              <div className="divide-y">
                {items.map((row, idx) => {
                  const rd = (row.data ?? {}) as Record<string, unknown>
                  const desc = String(rd["description"] ?? "-")
                  const qtyRaw = rd["qty"]
                  const priceRaw = rd["price"]
                  const subtotalRaw = rd["subtotal"]
                  const qty = typeof qtyRaw === "number" ? qtyRaw : Number(qtyRaw ?? 0)
                  const price = typeof priceRaw === "number" ? priceRaw : Number(priceRaw ?? 0)
                  const subtotalNum = typeof subtotalRaw === "number" ? subtotalRaw : Number(subtotalRaw ?? qty * price)
                  return (
                    <div key={row.id} className="grid grid-cols-12 gap-3 px-6 py-4 items-start">
                      <div className="col-span-1 text-sm text-slate-500">{idx + 1}</div>
                      <div className="col-span-5 text-sm text-slate-900 whitespace-normal">{desc}</div>
                      <div className="col-span-2 text-sm text-slate-700">{Number.isFinite(qty) ? qty : "-"}</div>
                      <div className="col-span-2 text-sm text-slate-700">{formatIDR(price)}</div>
                      <div className="col-span-2 text-sm font-semibold text-slate-900">{formatIDR(subtotalNum)}</div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="px-6 py-8 text-sm text-muted-foreground">Belum ada item pada invoice ini.</div>
            )}
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardHeader className="pb-2 border-b">
            <CardTitle className="text-base font-semibold text-primary uppercase tracking-wide">Ringkasan</CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-medium">{subtotal}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Tax</span>
              <span className="font-medium">{tax}</span>
            </div>
            <div className="flex items-center justify-between text-base font-semibold">
              <span>Total Amount</span>
              <span className="text-primary">{total}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
