import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export default async function HelpArticlePage({ params }: { params: { slug?: string | string[] } | Promise<{ slug?: string | string[] }> }) {
  const p = ((await params) ?? {}) as { slug?: string | string[] }
  const slugRaw = p?.slug
  const slug = typeof slugRaw === "string" ? slugRaw : Array.isArray(slugRaw) ? (slugRaw[0] ?? "") : ""

  const dt = await prisma.docType.findUnique({ where: { key: "help_page" } })
  const cfg = (dt?.config ?? {}) as unknown as { items?: Array<{ id?: unknown; title?: unknown; slug?: unknown; html?: unknown }> }
  const items = Array.isArray(cfg.items) ? cfg.items : []
  const normalized = items
    .map((it) => ({
      id: String(it?.id ?? "").trim(),
      title: String(it?.title ?? "").trim(),
      slug: String(it?.slug ?? "").trim(),
      html: String(it?.html ?? "").trim(),
    }))
    .filter((it) => it.id && it.title && it.slug)
  const article = normalized.find((it) => it.slug === slug) ?? null

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

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold">{article?.title ?? "Bantuan"}</h1>
          <p className="text-sm text-muted-foreground">Artikel bantuan</p>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild variant="outline">
            <Link href="/help">Kembali</Link>
          </Button>
          {isAdmin ? (
            <Button asChild>
              <Link href="/admin/settings/help">Kelola Konten</Link>
            </Button>
          ) : null}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-3">
          <Card className="border-none">
            <CardHeader className="pb-2 border-b">
              <CardTitle className="text-base">Topik</CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-2">
              {normalized.length > 0 ? (
                normalized.map((it) => (
                  <Link
                    key={it.id}
                    href={`/help/${encodeURIComponent(it.slug)}`}
                    className={`block rounded-md px-3 py-2 text-sm border hover:bg-muted transition-colors ${it.slug === slug ? "bg-muted font-semibold" : ""}`}
                  >
                    {it.title}
                  </Link>
                ))
              ) : (
                <div className="text-sm text-muted-foreground">Belum ada topik.</div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-9">
          <Card className="border-none">
            <CardHeader className="pb-2 border-b">
              <CardTitle className="text-base">{article?.title ?? "Tidak ditemukan"}</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              {article?.html ? (
                <div className="space-y-3 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: article.html }} />
              ) : (
                <div className="text-sm text-muted-foreground">Artikel tidak ditemukan.</div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

