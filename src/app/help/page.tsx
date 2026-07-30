import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "Bantuan | MettaDC",
}

export default async function HelpPage() {
  const session = await getServerSession(authOptions)
  const email = session?.user?.email ?? ""

  const me = email
    ? await prisma.user.findUnique({
        where: { email },
        include: { role: { include: { permissions: { include: { permission: true } } } } },
      })
    : null

  const perm = new Set((me?.role?.permissions ?? []).map((rp) => rp.permission.key))
  const isAdmin = perm.has("ADMIN_PANEL_ACCESS")

  let dt = await prisma.docType.findUnique({ where: { key: "help_page" } })
  if (!dt) {
    dt = await prisma.docType.create({
      data: {
        key: "help_page",
        name: "Help Page",
        description: "Konten halaman bantuan",
        branchId: null,
        config: {
          items: [
            {
              id: "default",
              title: "Bantuan",
              slug: "bantuan",
              html: "<h2>Bantuan</h2><p>Konten bantuan belum diatur.</p>",
            },
          ],
        },
      },
    })
  }

  const cfg = (dt.config ?? {}) as unknown as { helpHtml?: unknown; items?: Array<{ id?: unknown; title?: unknown; slug?: unknown; html?: unknown }> }
  const items = Array.isArray(cfg.items) ? cfg.items : []
  const legacyHtml = String(cfg.helpHtml ?? "").trim()
  const normalizedItems = items
    .map((it) => ({
      id: String(it?.id ?? "").trim(),
      title: String(it?.title ?? "").trim(),
      slug: String(it?.slug ?? "").trim(),
      html: String(it?.html ?? "").trim(),
    }))
    .filter((it) => it.id && it.title && it.slug)
  const effectiveItems =
    normalizedItems.length > 0
      ? normalizedItems
      : legacyHtml
        ? [{ id: "legacy", title: "Bantuan", slug: "bantuan", html: legacyHtml }]
        : []

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold">Bantuan</h1>
          <p className="text-sm text-muted-foreground">Panduan dan informasi untuk menggunakan aplikasi.</p>
        </div>
        <div className="flex items-center gap-2">
          {email ? (
            <Button asChild variant="outline">
              <Link href={isAdmin ? "/admin" : "/customer"}>Kembali</Link>
            </Button>
          ) : (
            <Button asChild variant="outline">
              <Link href="/login">Login</Link>
            </Button>
          )}
          {isAdmin ? (
            <Button asChild>
              <Link href="/admin/settings/help">Kelola Konten</Link>
            </Button>
          ) : null}
        </div>
      </div>

      <Card className="border-none">
        <CardHeader className="pb-2 border-b">
          <CardTitle className="text-base">Pusat Bantuan</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          {effectiveItems.length > 0 ? (
            <div className="space-y-3">
              <div className="text-sm text-muted-foreground">Pilih topik bantuan:</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {effectiveItems.map((it) => (
                  <Link
                    key={it.id}
                    href={`/help/${encodeURIComponent(it.slug)}`}
                    className="rounded-md border bg-white hover:bg-muted transition-colors p-4"
                  >
                    <div className="font-semibold text-sm text-slate-900">{it.title}</div>
                    <div className="text-xs text-slate-500 mt-1">Buka artikel</div>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-sm text-muted-foreground">Konten bantuan belum tersedia.</div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
