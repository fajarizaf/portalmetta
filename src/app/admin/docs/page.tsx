import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import Link from "next/link"
import { IconDisplay } from "@/components/icon-display"
import { FileText } from "lucide-react"


export default async function DocsIndexPage() {
  const session = await getServerSession(authOptions)
  const email = session?.user?.email ?? ""
  const me = email ? await prisma.user.findUnique({ where: { email }, include: { role: { include: { permissions: { include: { permission: true } } } } } }) : null
  const perm = new Set((me?.role?.permissions ?? []).map((rp) => rp.permission.key))
  if (!perm.has("ADMIN_PANEL_ACCESS") && !perm.has("DOCUMENTS_MANAGEMENT")) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold">Dokumen</h1>
        <p>Anda tidak memiliki akses.</p>
      </div>
    )
  }
  const doctypes = await prisma.docType.findMany({ orderBy: { name: "asc" } })
  const childMap = new Map<string, Array<{ parentKey: string; parentName: string; fieldKey?: string }>>()
  for (const dt of doctypes) {
    const cfg = (dt.config ?? {}) as unknown as Record<string, unknown>
    const single = typeof cfg["childDocTypeKey"] === "string" ? (cfg["childDocTypeKey"] as string) : ""
    if (single) {
      const arr = childMap.get(single) ?? []
      arr.push({ parentKey: dt.key, parentName: dt.name })
      childMap.set(single, arr)
    }
    const dict = (cfg["childDocTypes"] ?? {}) as Record<string, string>
    for (const [fieldKey, childKey] of Object.entries(dict)) {
      const arr = childMap.get(childKey) ?? []
      arr.push({ parentKey: dt.key, parentName: dt.name, fieldKey })
      childMap.set(childKey, arr)
    }
  }
  const childKeys = new Set(Array.from(childMap.keys()))
  const parents = doctypes.filter((d) => !childKeys.has(d.key))
  const children = doctypes.filter((d) => childKeys.has(d.key))
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Dokumen</h1>
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="text-sm font-semibold">DocType (Parent)</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {parents.map((d) => (
              <Link key={d.id} href={`/admin/docs/${d.key}`} className="border rounded p-4 flex items-center gap-3">
                {d.icon ? <IconDisplay name={d.icon} className="h-6 w-6 text-muted-foreground" /> : <FileText className="h-6 w-6 text-muted-foreground" />}
                <div>
                  <div className="text-base font-medium">{d.name}</div>
                  <div className="text-xs text-muted-foreground">{d.key}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <div className="text-sm font-semibold">DocType (Child)</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {children.map((d) => {
              const parentsArr = childMap.get(d.key) ?? []
              const parentText = parentsArr.length > 0 ? parentsArr.map((p) => `${p.parentName}${p.fieldKey ? ` • via ${p.fieldKey}` : ""}`).join(", ") : "-"
              return (
                <Link key={d.id} href={`/admin/docs/${d.key}`} className="border rounded p-4 flex items-center gap-3">
                  {d.icon ? <IconDisplay name={d.icon} className="h-6 w-6 text-muted-foreground" /> : <FileText className="h-6 w-6 text-muted-foreground" />}
                  <div>
                    <div className="text-base font-medium">{d.name}</div>
                    <div className="text-xs text-muted-foreground">{d.key} • child of {parentText}</div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}