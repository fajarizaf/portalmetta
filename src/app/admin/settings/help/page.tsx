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
        <h1 className="text-2xl font-semibold">Help Page</h1>
        <p className="text-sm text-muted-foreground">Kelola konten halaman /help untuk customer.</p>
      </div>

      <Card>
        <CardHeader className="pb-2 border-b">
          <CardTitle className="text-base">Tambah Topik</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <form action={createHelpItem} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Judul</Label>
              <Input id="title" name="title" placeholder="Contoh: Cara Membayar Invoice" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">Slug (opsional)</Label>
              <Input id="slug" name="slug" placeholder="contoh: cara-membayar-invoice" />
            </div>
            <div className="md:col-span-2">
              <Button type="submit">Buat Topik</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2 border-b">
          <CardTitle className="text-base">Daftar Topik</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          {items.length > 0 ? (
            <div className="space-y-2">
              {items.map((it) => (
                <div key={it.id} className="flex items-center justify-between gap-3 rounded-md border p-3">
                  <div className="min-w-0">
                    <div className="font-semibold text-sm truncate">{it.title}</div>
                    <div className="text-xs text-muted-foreground truncate">/help/{it.slug}</div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Button asChild size="sm" variant="outline">
                      <Link href={`/help/${encodeURIComponent(it.slug)}`} target="_blank">Preview</Link>
                    </Button>
                    <Button asChild size="sm">
                      <Link href={`/admin/settings/help/${encodeURIComponent(it.id)}`}>Edit</Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-sm text-muted-foreground">Belum ada topik bantuan.</div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
