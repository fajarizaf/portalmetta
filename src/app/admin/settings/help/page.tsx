import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { Prisma } from "@/generated/prisma/client"
import Link from "next/link"
import crypto from "node:crypto"
import { Plus, ExternalLink } from "lucide-react"

function slugify(input: string): string {
  return String(input || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "")
}

type HelpItem = { id: string; title: string; slug: string; html: string }

async function createHelpItem(formData: FormData) {
  "use server"
  const session = await getServerSession(authOptions)
  const email = session?.user?.email ?? ""
  const me = email
    ? await prisma.user.findUnique({ where: { email }, include: { role: { include: { permissions: { include: { permission: true } } } } } })
    : null
  const perm = new Set((me?.role?.permissions ?? []).map((rp) => rp.permission.key))
  if (!perm.has("ADMIN_PANEL_ACCESS")) redirect("/admin")

  const title = String(formData.get("title") || "").trim()
  const slugRaw = String(formData.get("slug") || "").trim()
  if (!title) redirect(`/admin/settings/help?toast=${encodeURIComponent("Judul wajib diisi")}&toastType=error`)

  const existing = await prisma.docType.findUnique({ where: { key: "help_page" } })
  const cfgRaw = (existing?.config ?? {}) as Record<string, unknown>
  const itemsRaw = (cfgRaw["items"] ?? []) as unknown
  const items: HelpItem[] = Array.isArray(itemsRaw)
    ? (itemsRaw as Array<Record<string, unknown>>).map((x) => ({
        id: String(x["id"] ?? "").trim(),
        title: String(x["title"] ?? "").trim(),
        slug: String(x["slug"] ?? "").trim(),
        html: String(x["html"] ?? "").trim(),
      })).filter((x) => x.id && x.title && x.slug)
    : []

  const baseSlug = slugify(slugRaw || title)
  if (!baseSlug) redirect(`/admin/settings/help?toast=${encodeURIComponent("Slug tidak valid")}&toastType=error`)
  let slug = baseSlug
  let idx = 2
  const used = new Set(items.map((it) => it.slug))
  while (used.has(slug)) {
    slug = `${baseSlug}-${idx}`
    idx++
  }

  const id = crypto.randomUUID()
  const nextItems = [{ id, title, slug, html: "" }, ...items]
  const payload = { ...cfgRaw, items: nextItems } as unknown as Prisma.InputJsonValue

  if (existing) await prisma.docType.update({ where: { id: existing.id }, data: { config: payload } })
  else await prisma.docType.create({ data: { key: "help_page", name: "Help Page", description: "Konten halaman bantuan", branchId: null, config: payload } })

  redirect(`/admin/settings/help/${encodeURIComponent(id)}?toast=${encodeURIComponent("Topik bantuan dibuat")}&toastType=success`)
}

export const metadata = {
  title: "Help Content | Admin Settings",
}

export default async function AdminHelpSettingsPage() {
  const session = await getServerSession(authOptions)
  const email = session?.user?.email ?? ""
  const me = email
    ? await prisma.user.findUnique({ where: { email }, include: { role: { include: { permissions: { include: { permission: true } } } } } })
    : null
  const perm = new Set((me?.role?.permissions ?? []).map((rp) => rp.permission.key))
  if (!perm.has("ADMIN_PANEL_ACCESS")) redirect("/admin")

  const dt = await prisma.docType.findUnique({ where: { key: "help_page" } })
  const cfg = (dt?.config ?? {}) as unknown as { items?: Array<{ id?: unknown; title?: unknown; slug?: unknown }> }
  const itemsRaw = Array.isArray(cfg.items) ? cfg.items : []
  const items = itemsRaw
    .map((it) => ({ id: String(it?.id ?? "").trim(), title: String(it?.title ?? "").trim(), slug: String(it?.slug ?? "").trim() }))
    .filter((it) => it.id && it.title && it.slug)

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-xl font-semibold text-slate-900 tracking-tight">Help Page</h1>
        <p className="text-sm text-slate-500">Kelola konten halaman /help untuk customer.</p>
      </div>

      <Card className="border border-slate-200/80 bg-white">
        <CardHeader className="pb-5 border-b border-slate-100">
          <CardTitle className="text-base font-semibold text-slate-900">Tambah Topik</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <form action={createHelpItem} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="title" className="text-sm font-medium text-slate-700">Judul</Label>
              <Input id="title" name="title" placeholder="Contoh: Cara Membayar Invoice" required className="h-9 border-slate-200 focus:border-primary focus:ring-primary/20" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="slug" className="text-sm font-medium text-slate-700">Slug (opsional)</Label>
              <Input id="slug" name="slug" placeholder="contoh: cara-membayar-invoice" className="h-9 border-slate-200 focus:border-primary focus:ring-primary/20" />
            </div>
            <div className="md:col-span-2">
              <Button type="submit" className="bg-slate-900 hover:bg-slate-800">
                <Plus className="h-4 w-4 mr-2" />
                Buat Topik
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card className="border border-slate-200/80 bg-white">
        <CardHeader className="pb-5 border-b border-slate-100">
          <CardTitle className="text-base font-semibold text-slate-900">Daftar Topik</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {items.length > 0 ? (
            <div className="divide-y divide-slate-50">
              {items.map((it) => (
                <div key={it.id} className="flex items-center justify-between gap-3 px-5 py-4 hover:bg-slate-50/50 transition-colors">
                  <div className="min-w-0">
                    <div className="font-semibold text-sm text-slate-900 truncate">{it.title}</div>
                    <div className="text-xs text-slate-500 mt-0.5">/help/{it.slug}</div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Button asChild size="sm" variant="outline" className="h-8 border-slate-200 hover:border-slate-300 hover:bg-slate-50">
                      <Link href={`/help/${encodeURIComponent(it.slug)}`} target="_blank">
                        <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
                        Preview
                      </Link>
                    </Button>
                    <Button asChild size="sm" className="h-8 bg-slate-900 hover:bg-slate-800">
                      <Link href={`/admin/settings/help/${encodeURIComponent(it.id)}`}>
                        Edit
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-10 text-center text-slate-500">
              <p className="text-sm">Belum ada topik bantuan.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
