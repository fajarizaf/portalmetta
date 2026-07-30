import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { cookies } from "next/headers"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Prisma } from "@/generated/prisma/client"
import type { FieldType } from "@/generated/prisma/enums"
import { Badge } from "@/components/ui/badge"
import { SearchableSelect } from "@/components/ui/select"
import { IconDisplay } from "@/components/icon-display"
import { FileText } from "lucide-react"

async function createDocType(formData: FormData) {
  "use server"
  const session = await getServerSession(authOptions)
  const email = session?.user?.email ?? ""
  const me = email ? await prisma.user.findUnique({ where: { email }, include: { role: { include: { permissions: { include: { permission: true } } } } } }) : null
  const perm = new Set((me?.role?.permissions ?? []).map((rp) => rp.permission.key))
  if (!perm.has("ADMIN_PANEL_ACCESS") && !perm.has("DOCTYPE_MANAGEMENT")) return
  const name = String(formData.get("name") || "").trim()
  const key = String(formData.get("key") || "").trim()
  const branchIdRaw = String(formData.get("branchId") || "").trim()
  const branchId = branchIdRaw === "GLOBAL" ? undefined : (branchIdRaw || undefined)
  const description = String(formData.get("description") || "").trim() || undefined
  const icon = String(formData.get("icon") || "").trim() || undefined
  if (!name || !key) return

  const createData: Prisma.DocTypeCreateInput = {
    name,
    key,
    description,
    icon
  }

  if (branchId) {
    createData.branch = { connect: { id: branchId } }
  }

  await prisma.docType.create({ data: createData })
  revalidatePath("/admin/doctypes")
}

async function deleteDocType(formData: FormData) {
  "use server"
  const session = await getServerSession(authOptions)
  const email = session?.user?.email ?? ""
  const me = email ? await prisma.user.findUnique({ where: { email }, include: { role: { include: { permissions: { include: { permission: true } } } } } }) : null
  const perm = new Set((me?.role?.permissions ?? []).map((rp) => rp.permission.key))
  if (!perm.has("ADMIN_PANEL_ACCESS") && !perm.has("DOCTYPE_MANAGEMENT")) return
  const id = String(formData.get("id") || "")
  if (!id) return
  const recordCount = await prisma.docRecord.count({ where: { docTypeId: id } })
  if (recordCount > 0) {
    redirect("/admin/doctypes?toast=Tidak%20bisa%20hapus%20DocType%20yang%20memiliki%20dokumen&toastType=error")
  }
  await prisma.$transaction([
    prisma.docField.deleteMany({ where: { docTypeId: id } }),
    prisma.docPermission.deleteMany({ where: { docTypeId: id } }),
    prisma.docRow.deleteMany({ where: { childDocTypeId: id } }),
    prisma.docType.delete({ where: { id } }),
  ])
  redirect("/admin/doctypes?toast=DocType%20berhasil%20dihapus")
}

export default async function DocTypesPage() {
  const session = await getServerSession(authOptions)
  const email = session?.user?.email ?? ""
  const me = email ? await prisma.user.findUnique({ where: { email }, include: { role: { include: { permissions: { include: { permission: true } } } }, assignedBranches: { include: { branch: true } } } }) : null
  const perm = new Set((me?.role?.permissions ?? []).map((rp) => rp.permission.key))
  if (!perm.has("ADMIN_PANEL_ACCESS") && !perm.has("DOCTYPE_MANAGEMENT")) {
    return (
      <div className="space-y-4">
        <h1 className="text-xl sm:text-2xl font-semibold">DocType</h1>
        <p className="text-xs sm:text-sm">Anda tidak memiliki akses.</p>
      </div>
    )
  }

  const assigned = me?.assignedBranches?.map((a) => a.branch) ?? []
  const branches = assigned.length > 0 ? assigned : await prisma.branch.findMany({ orderBy: { name: "asc" } })
  const cookieStore = await cookies()
  const cookieBranchId = cookieStore.get("branchId")?.value
  const selectedBranchId = cookieBranchId ?? branches[0]?.id

  const list = await prisma.docType.findMany({ include: { branch: true }, orderBy: { name: "asc" } })

  async function scanTables() {
    "use server"
    const session = await getServerSession(authOptions)
    const email = session?.user?.email ?? ""
    const me = email ? await prisma.user.findUnique({ where: { email }, include: { role: { include: { permissions: { include: { permission: true } } } } } }) : null
    const perm = new Set((me?.role?.permissions ?? []).map((rp) => rp.permission.key))
    if (!perm.has("ADMIN_PANEL_ACCESS") && !perm.has("DOCTYPE_MANAGEMENT")) return
    const db = process.env.DATABASE_NAME || "mettadc"
    const ignore = new Set(["prisma_migrations"].map((t) => t.toLowerCase()))
    let tables = await prisma.$queryRaw<Array<{ TABLE_NAME: string }>>(Prisma.sql`SELECT TABLE_NAME FROM information_schema.TABLES WHERE TABLE_SCHEMA = ${db}`)
    if (tables.length === 0) {
      tables = await prisma.$queryRaw<Array<{ TABLE_NAME: string }>>(Prisma.sql`SELECT TABLE_NAME FROM information_schema.TABLES WHERE TABLE_SCHEMA = DATABASE()`)
    }
    for (const t of tables) {
      const table = t.TABLE_NAME
      if (!table) continue
      if (ignore.has(table.toLowerCase())) continue
      const key = table
      const name = table
      const configSystem: Prisma.InputJsonValue = ({ system: true } as unknown) as Prisma.InputJsonValue
      const dt = await prisma.docType.upsert({
        where: { key },
        update: {},
        create: { key, name, config: configSystem },
      })
      let cols = await prisma.$queryRaw<Array<{ COLUMN_NAME: unknown; DATA_TYPE: unknown; IS_NULLABLE: unknown; COLUMN_TYPE: unknown; ORDINAL_POSITION: unknown }>>(Prisma.sql`
        SELECT CAST(COLUMN_NAME AS CHAR) AS COLUMN_NAME,
               CAST(DATA_TYPE AS CHAR) AS DATA_TYPE,
               CAST(IS_NULLABLE AS CHAR) AS IS_NULLABLE,
               CAST(COLUMN_TYPE AS CHAR) AS COLUMN_TYPE,
               ORDINAL_POSITION
        FROM information_schema.COLUMNS
        WHERE TABLE_SCHEMA = ${db} AND TABLE_NAME = ${table}
        ORDER BY ORDINAL_POSITION ASC
      `)
      if (cols.length === 0) {
        cols = await prisma.$queryRaw<Array<{ COLUMN_NAME: unknown; DATA_TYPE: unknown; IS_NULLABLE: unknown; COLUMN_TYPE: unknown; ORDINAL_POSITION: unknown }>>(Prisma.sql`
          SELECT CAST(COLUMN_NAME AS CHAR) AS COLUMN_NAME,
                 CAST(DATA_TYPE AS CHAR) AS DATA_TYPE,
                 CAST(IS_NULLABLE AS CHAR) AS IS_NULLABLE,
                 CAST(COLUMN_TYPE AS CHAR) AS COLUMN_TYPE,
                 ORDINAL_POSITION
          FROM information_schema.COLUMNS
          WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ${table}
          ORDER BY ORDINAL_POSITION ASC
        `)
      }
      let order = 0
      for (const c of cols) {
        const keyCol = String(c.COLUMN_NAME ?? "")
        if (!keyCol) continue
        const dtLower = String(c.DATA_TYPE ?? "").toLowerCase()
        const colType = String(c.COLUMN_TYPE ?? "").toLowerCase()
        const required = String(c.IS_NULLABLE ?? "YES").toUpperCase() === "NO"
        let type: FieldType = "TEXT" as FieldType
        let config: Record<string, unknown> | undefined = undefined
        if ((dtLower === "tinyint" && colType.includes("(1)")) || dtLower === "boolean" || dtLower === "bool" || (dtLower === "bit" && colType.includes("(1)"))) type = "CHECKBOX" as FieldType
        else if (dtLower.includes("int")) type = "NUMBER" as FieldType
        else if (dtLower === "decimal" || dtLower === "float" || dtLower === "double" || dtLower === "real") type = "NUMBER" as FieldType
        else if (dtLower === "date") type = "DATE" as FieldType
        else if (dtLower === "datetime" || dtLower === "timestamp" || dtLower === "time") type = "DATETIME" as FieldType
        else if (dtLower === "enum" || dtLower === "set") {
          type = "DROPDOWN" as FieldType
          const m = colType.match(/(?:enum|set)\((.*)\)/)
          if (m && m[1]) {
            const opts = m[1].split(",").map((s) => String(s).trim().replace(/^'|"|`|\(|\)$/g, "").replace(/'$/,""))
            config = { options: opts.filter(Boolean).map((v) => ({ label: v, value: v })) }
          }
        }
        else if (dtLower.includes("text") || dtLower === "json") type = "TEXTAREA" as FieldType
        else if (dtLower === "char" || dtLower === "varchar") type = "TEXT" as FieldType
        else if (dtLower.includes("blob") || dtLower === "binary" || dtLower === "varbinary") type = "ATTACHMENT" as FieldType
        const label = keyCol
        const configValue: Prisma.InputJsonValue | undefined = config as unknown as Prisma.InputJsonValue | undefined
        await prisma.docField.upsert({
          where: { docTypeId_key: { docTypeId: dt.id, key: keyCol } },
          update: { label, type, required, order },
          create: { docTypeId: dt.id, key: keyCol, label, type, required, order, config: configValue },
        })
        order++
      }
    }
    revalidatePath("/admin/doctypes")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl sm:text-2xl font-semibold">DocType</h1>
        <Link href="/admin" className="text-xs sm:text-sm">Kembali</Link>
      </div>

      <form action={createDocType} className="space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="space-y-2">
            <Label>Nama</Label>
            <Input name="name" />
          </div>
          <div className="space-y-2">
            <Label>Key</Label>
            <Input name="key" />
          </div>
          <div className="space-y-2">
            <Label>Branch</Label>
            <SearchableSelect name="branchId" placeholder="Pilih Branch" defaultValue={selectedBranchId ?? ""} options={[{ label: "Global (Semua Branch)", value: "GLOBAL" }, ...branches.map((b) => ({ label: b.name, value: b.id }))]} />
          </div>
        </div>
        <div className="space-y-2">
          <Label>Icon (Lucide Name)</Label>
          <Input name="icon" placeholder="e.g. FileText" />
        </div>
        <div className="space-y-2">
          <Label>Deskripsi</Label>
          <textarea name="description" className="border rounded p-2 w-full min-h-20 text-sm" />
        </div>
        <div>
          <Button type="submit">Tambah</Button>
        </div>
      </form>

      <form action={scanTables}>
        <Button type="submit" variant="outline">Scan & Register Tables</Button>
      </form>

      <div className="space-y-3">
        <div className="text-sm font-semibold">Daftar</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {list.map((d) => (
            <div key={d.id} className="border rounded p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg border flex items-center justify-center bg-background text-muted-foreground">
                    {d.icon ? <IconDisplay name={d.icon} className="h-5 w-5" /> : <FileText className="h-5 w-5" />}
                  </div>
                  <div className="space-y-1">
                    <div className="text-base font-medium">
                      {d.name}
                      {(d.config && typeof d.config === "object" && ((d.config as { system?: boolean }).system === true)) ? (
                        <Badge variant="secondary" className="ml-2">Sistem</Badge>
                      ) : null}
                    </div>
                    <div className="text-xs text-muted-foreground">{d.key} • {d.branch?.name ?? "Global"}</div>
                  </div>
                </div>
                <Link href={`/admin/doctypes/${d.id}`} className="text-sm underline">Kelola</Link>
              </div>
              <form action={deleteDocType}>
                <input type="hidden" name="id" value={d.id} />
                <Button variant="destructive">Hapus</Button>
              </form>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}