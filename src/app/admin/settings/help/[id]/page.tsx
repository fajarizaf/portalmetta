import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import HtmlEditor from "@/components/products/html-editor"
import type { Prisma } from "@/generated/prisma/client"
import Link from "next/link"

type HelpItem = { id: string; title: string; slug: string; html: string }

function slugify(input: string): string {
  return String(input || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "")
}

async function updateHelpItem(formData: FormData) {
  "use server"
  const session = await getServerSession(authOptions)
  const email = session?.user?.email ?? ""
  const me = email
    ? await prisma.user.findUnique({ where: { email }, include: { role: { include: { permissions: { include: { permission: true } } } } } })
    : null
  const perm = new Set((me?.role?.permissions ?? []).map((rp) => rp.permission.key))
  if (!perm.has("ADMIN_PANEL_ACCESS")) redirect("/admin")

  const id = String(formData.get("id") || "").trim()
  const title = String(formData.get("title") || "").trim()
  const slugRaw = String(formData.get("slug") || "").trim()
  const html = String(formData.get("html") || "")
  if (!id) redirect(`/admin/settings/help?toast=${encodeURIComponent("ID tidak valid")}&toastType=error`)
  if (!title) redirect(`/admin/settings/help/${encodeURIComponent(id)}?toast=${encodeURIComponent("Judul wajib diisi")}&toastType=error`)

  const dt = await prisma.docType.findUnique({ where: { key: "help_page" } })
  const cfgRaw = (dt?.config ?? {}) as Record<string, unknown>
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
  if (!baseSlug) redirect(`/admin/settings/help/${encodeURIComponent(id)}?toast=${encodeURIComponent("Slug tidak valid")}&toastType=error`)

  const used = new Set(items.filter((it) => it.id !== id).map((it) => it.slug))
  let slug = baseSlug
  let idx = 2
  while (used.has(slug)) {
    slug = `${baseSlug}-${idx}`
    idx++
  }

  const nextItems = items.map((it) => (it.id === id ? { ...it, title, slug, html } : it))
  const payload = { ...cfgRaw, items: nextItems } as unknown as Prisma.InputJsonValue
  if (dt) await prisma.docType.update({ where: { id: dt.id }, data: { config: payload } })

  redirect(`/admin/settings/help/${encodeURIComponent(id)}?toast=${encodeURIComponent("Topik berhasil disimpan")}&toastType=success`)
}

async function deleteHelpItem(formData: FormData) {
  "use server"
  const session = await getServerSession(authOptions)
  const email = session?.user?.email ?? ""
  const me = email
    ? await prisma.user.findUnique({ where: { email }, include: { role: { include: { permissions: { include: { permission: true } } } } } })
    : null
  const perm = new Set((me?.role?.permissions ?? []).map((rp) => rp.permission.key))
  if (!perm.has("ADMIN_PANEL_ACCESS")) redirect("/admin")

  const id = String(formData.get("id") || "").trim()
  const dt = await prisma.docType.findUnique({ where: { key: "help_page" } })
  const cfgRaw = (dt?.config ?? {}) as Record<string, unknown>
  const itemsRaw = (cfgRaw["items"] ?? []) as unknown
  const items: HelpItem[] = Array.isArray(itemsRaw)
    ? (itemsRaw as Array<Record<string, unknown>>).map((x) => ({
        id: String(x["id"] ?? "").trim(),
        title: String(x["title"] ?? "").trim(),
        slug: String(x["slug"] ?? "").trim(),
        html: String(x["html"] ?? "").trim(),
      })).filter((x) => x.id && x.title && x.slug)
    : []

  const nextItems = items.filter((it) => it.id !== id)
  const payload = { ...cfgRaw, items: nextItems } as unknown as Prisma.InputJsonValue
  if (dt) await prisma.docType.update({ where: { id: dt.id }, data: { config: payload } })

  redirect(`/admin/settings/help?toast=${encodeURIComponent("Topik berhasil dihapus")}&toastType=success`)
}

export default async function AdminHelpItemPage({ params }: { params: { id?: string | string[] } | Promise<{ id?: string | string[] }> }) {
  const session = await getServerSession(authOptions)
  const email = session?.user?.email ?? ""
  const me = email
    ? await prisma.user.findUnique({ where: { email }, include: { role: { include: { permissions: { include: { permission: true } } } } } })
    : null
  const perm = new Set((me?.role?.permissions ?? []).map((rp) => rp.permission.key))
  if (!perm.has("ADMIN_PANEL_ACCESS")) redirect("/admin")

  const p = ((await params) ?? {}) as { id?: string | string[] }
  const idRaw = p?.id
  const id = typeof idRaw === "string" ? idRaw : Array.isArray(idRaw) ? (idRaw[0] ?? "") : ""
  if (!id) redirect("/admin/settings/help")

  const dt = await prisma.docType.findUnique({ where: { key: "help_page" } })
  const cfg = (dt?.config ?? {}) as unknown as { items?: Array<{ id?: unknown; title?: unknown; slug?: unknown; html?: unknown }> }
  const itemsRaw = Array.isArray(cfg.items) ? cfg.items : []
  const items = itemsRaw
    .map((it) => ({
      id: String(it?.id ?? "").trim(),
      title: String(it?.title ?? "").trim(),
      slug: String(it?.slug ?? "").trim(),
      html: String(it?.html ?? "").trim(),
    }))
    .filter((it) => it.id && it.title && it.slug)
  const item = items.find((x) => x.id === id) ?? null
  if (!item) redirect(`/admin/settings/help?toast=${encodeURIComponent("Topik tidak ditemukan")}&toastType=error`)

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold">Edit Topik Bantuan</h1>
          <p className="text-sm text-muted-foreground">Kelola konten untuk /help/{item.slug}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild variant="outline">
            <Link href="/admin/settings/help">Kembali</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href={`/help/${encodeURIComponent(item.slug)}`} target="_blank">Preview</Link>
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-2 border-b">
          <CardTitle className="text-base">Konten</CardTitle>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <form action={updateHelpItem} className="space-y-4">
            <input type="hidden" name="id" value={item.id} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Judul</Label>
                <Input id="title" name="title" defaultValue={item.title} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug">Slug</Label>
                <Input id="slug" name="slug" defaultValue={item.slug} required />
              </div>
            </div>
            <HtmlEditor name="html" label="Isi (HTML)" initialHTML={item.html} />
            <div className="flex items-center gap-2">
              <Button type="submit">Simpan</Button>
            </div>
          </form>

          <form action={deleteHelpItem}>
            <input type="hidden" name="id" value={item.id} />
            <Button type="submit" variant="destructive">Hapus Topik</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

