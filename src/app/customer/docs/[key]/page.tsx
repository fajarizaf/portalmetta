import Link from "next/link"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SearchableSelect } from "@/components/ui/select"
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible"
import { Card, CardContent } from "@/components/ui/card"
import { Filter as FilterIcon, ArrowLeft, Eye, FileText, Plus } from "lucide-react"
import type { FieldType } from "@/generated/prisma/enums"
import type { Prisma } from "@/generated/prisma/client"

function statusBadgeVariant(name: string): "default" | "secondary" | "destructive" | "outline" {
  const s = String(name || "").toLowerCase()
  if (s.includes("cancel")) return "destructive"
  if (s.includes("submit")) return "secondary"
  if (s.includes("draft")) return "outline"
  if (s.includes("review") || s.includes("approve") || s.includes("verified") || s.includes("active") || s.includes("publish")) return "default"
  return "outline"
}

export default async function CustomerDocsListByType({ params, searchParams }: { params?: Record<string, string | string[] | undefined> | Promise<Record<string, string | string[] | undefined>>; searchParams?: Record<string, string | string[] | undefined> | Promise<Record<string, string | string[] | undefined>> }) {
  const session = await getServerSession(authOptions)
  const email = session?.user?.email ?? ""
  const me = email ? await prisma.user.findUnique({ where: { email }, include: { role: { include: { permissions: { include: { permission: true } } } } } }) : null
  if (!me) redirect("/customer")
  const p = ((await params) ?? {}) as Record<string, string | string[] | undefined>
  const keyRaw = p?.key
  const key = typeof keyRaw === "string" ? keyRaw : Array.isArray(keyRaw) ? keyRaw[0] : ""
  if (!key) redirect("/customer/docs")
  const docType = await prisma.docType.findUnique({ where: { key }, include: { fields: { orderBy: { order: "asc" } }, permissions: true } })
  if (!docType) redirect("/customer/docs")
  const permission = docType.permissions.find((pr) => pr.roleId === me.roleId)
  const canRead = permission ? permission.canRead : false
  if (!canRead) redirect("/customer")

  const cookieStore = await cookies()
  const cookieBranchId = cookieStore.get("branchId")?.value

  const userCompanyId = email ? (await prisma.user.findUnique({ where: { email }, select: { companyId: true } }))?.companyId ?? null : null
  const parentCompanyId = userCompanyId ? (await prisma.company.findUnique({ where: { id: userCompanyId }, select: { parentId: true } }))?.parentId ?? null : null
  const scopeCompanyId = parentCompanyId ?? userCompanyId

  // --- Dynamic Ownership Filtering (Zero Config) ---
  // Identify fields that link to "Company" or "User" to determine ownership
  const companyLinkFields = docType.fields
    .filter(f => f.type === ("LINK" as FieldType) && (f.config as any)?.ref === "Company")
    .map(f => f.key)
  
  const userLinkFields = docType.fields
    .filter(f => f.type === ("LINK" as FieldType) && (f.config as any)?.ref === "User")
    .map(f => f.key)

  const ownershipConditions: Prisma.DocRecordWhereInput[] = []
  
  // 1. Created by Me (Direct)
  ownershipConditions.push({ createdById: me.id })
  
  // 2. Created by My Team (Company Scope)
  if (scopeCompanyId) {
    ownershipConditions.push({ createdBy: { companyId: scopeCompanyId } })
  }
  
  // 3. Assigned to Me (Direct)
  ownershipConditions.push({ assignedToId: me.id })
  
  // 4. Linked to My Company (via Doc Fields)
  if (userCompanyId) {
    for (const key of companyLinkFields) {
        ownershipConditions.push({ data: { path: `$.${key}`, equals: userCompanyId } as unknown as Prisma.JsonFilter })
    }
  }

  // 5. Linked to Me (via Doc Fields)
  for (const key of userLinkFields) {
      ownershipConditions.push({ data: { path: `$.${key}`, equals: me.id } as unknown as Prisma.JsonFilter })
  }

  const cfgAll = (docType.config ?? {}) as unknown as Record<string, unknown>
  const listFields = Array.isArray(cfgAll["listFields"]) ? (cfgAll["listFields"] as string[]) : []
  const filterFields = Array.isArray(cfgAll["filterFields"]) ? (cfgAll["filterFields"] as string[]) : []
  const dynamicOptions: Record<string, Array<{ label: string; value: string }>> = {}
  for (const f of docType.fields) {
    if (f.type === ("DROPDOWN" as FieldType)) {
      const cfg = (f.config ?? {}) as unknown as { options?: Array<{ label: string; value: string }> }
      if (Array.isArray(cfg.options)) dynamicOptions[f.key] = cfg.options
    }
  }
  const sp = ((await searchParams) ?? {}) as Record<string, string | string[] | undefined>
  const qRaw = sp?.q
  const q = typeof qRaw === "string" ? qRaw : Array.isArray(qRaw) ? qRaw[0] : ""
  const statusRaw = sp?.status
  const statusFilter = typeof statusRaw === "string" ? statusRaw : Array.isArray(statusRaw) ? statusRaw[0] : ""
  const createdFromRaw = sp?.createdFrom
  const createdToRaw = sp?.createdTo
  const createdFrom = typeof createdFromRaw === "string" ? createdFromRaw : Array.isArray(createdFromRaw) ? createdFromRaw[0] : ""
  const createdTo = typeof createdToRaw === "string" ? createdToRaw : Array.isArray(createdToRaw) ? createdToRaw[0] : ""
  const pageRaw = sp?.page
  const pageSizeRaw = sp?.pageSize
  const page = (() => { const n = typeof pageRaw === "string" ? parseInt(pageRaw, 10) : Array.isArray(pageRaw) ? parseInt(pageRaw[0] ?? "1", 10) : 1; return Number.isFinite(n) && n > 0 ? n : 1 })()
  const pageSize = (() => { const n = typeof pageSizeRaw === "string" ? parseInt(pageSizeRaw, 10) : Array.isArray(pageSizeRaw) ? parseInt(pageSizeRaw[0] ?? "20", 10) : 20; return Number.isFinite(n) && n > 0 && n <= 100 ? n : 20 })()
  
  // Base Where with Ownership Logic
  const whereBase: Prisma.DocRecordWhereInput = { 
      docTypeId: docType.id, 
      ...(cookieBranchId ? { branchId: cookieBranchId } : {}),
      OR: ownershipConditions,
      // Globally hide DRAFT documents for customers
      NOT: {
        status: { in: ["Draft", "DRAFT"] }
      }
  }
  
  const filters: Prisma.DocRecordWhereInput[] = []
  if (statusFilter) filters.push({ status: statusFilter })
  if (createdFrom) {
    const d = new Date(createdFrom)
    if (!Number.isNaN(d.getTime())) filters.push({ createdAt: { gte: d } })
  }
  if (createdTo) {
    const d = new Date(createdTo)
    if (!Number.isNaN(d.getTime())) {
      d.setHours(23, 59, 59, 999)
      filters.push({ createdAt: { lte: d } })
    }
  }
  for (const keyField of filterFields) {
    const raw = sp?.[keyField]
    const val = typeof raw === "string" ? raw : Array.isArray(raw) ? raw[0] : ""
    if (!val) continue
    const f = docType.fields.find((x) => x.key === keyField)
    if (!f) continue
    const path = `$.${keyField}`
    if (f.type === ("NUMBER" as FieldType) || f.type === ("PRICE" as FieldType)) {
      const num = Number(val)
      if (!Number.isNaN(num)) filters.push({ data: { path, equals: num as unknown as Prisma.InputJsonValue } as unknown as Prisma.JsonFilter })
    } else if (f.type === ("CHECKBOX" as FieldType)) {
      const b = val === "true" || val === "1" || val === "on"
      filters.push({ data: { path, equals: b as unknown as Prisma.InputJsonValue } as unknown as Prisma.JsonFilter })
    } else {
      filters.push({ data: { path, mode: "insensitive", string_contains: val } as unknown as Prisma.JsonFilter })
    }
  }
  const searchOr: Prisma.DocRecordWhereInput[] = []
  if (q) {
    searchOr.push({ code: { contains: q } })
    for (const k of listFields) {
      searchOr.push({ data: { path: `$.${k}`, mode: "insensitive", string_contains: q } as unknown as Prisma.JsonFilter })
    }
  }

  // Construct final where to avoid OR overwriting
  const where: Prisma.DocRecordWhereInput = {
    AND: [
      whereBase,
      ...(filters.length > 0 ? filters : []),
      ...(searchOr.length > 0 ? [{ OR: searchOr }] : [])
    ]
  }
  const totalCount = await prisma.docRecord.count({ where })
  const skip = (page - 1) * pageSize
  const take = pageSize
  const records = await prisma.docRecord.findMany({ where, orderBy: { createdAt: "desc" }, skip, take, include: { children: true } })

  // Extract product names from children for display
  const productIds = new Set<string>()
  const rackIds = new Set<string>()
  const companyIds = new Set<string>()

  for (const r of records) {
    const d = (r.data ?? {}) as any
    if (d.source_material) productIds.add(String(d.source_material))
    if (d.source_rack_id) rackIds.add(String(d.source_rack_id))
    if (d.destination_rack_id) rackIds.add(String(d.destination_rack_id))
    if (d.destination) companyIds.add(String(d.destination))

    for (const c of r.children) {
      const cd = c.data as any
      if (cd?.product_id) productIds.add(String(cd.product_id))
    }
  }

  const products = await prisma.product.findMany({ where: { id: { in: Array.from(productIds) } }, select: { id: true, name: true } })
  const productMap = new Map(products.map(p => [p.id, p.name]))

  const rackDT = await prisma.docType.findUnique({ where: { key: "master_rack" } })
  const rackRecords = rackDT ? await prisma.docRecord.findMany({ 
    where: { docTypeId: rackDT.id, id: { in: Array.from(rackIds) } } 
  }) : []
  const rackMap = new Map(rackRecords.map(r => [r.id, ((r.data as any)?.rack_name || r.code || r.id)]))

  const companies = await prisma.company.findMany({ where: { id: { in: Array.from(companyIds) } }, select: { id: true, name: true } })
  const companyMap = new Map(companies.map(c => [c.id, c.name]))

  let wfRecord: { config?: unknown } | null = null
  try {
    wfRecord = await prisma.docWorkflow.findFirst({ where: { docTypeId: docType.id, isActive: true, OR: [{ branchId: docType.branchId ?? null }, { branchId: null }] }, orderBy: { branchId: "desc" } })
  } catch {}
  const wfCfg = wfRecord?.config ? ((wfRecord.config as unknown) as { states?: Array<{ name: string }>; transitions?: Array<{ from: string; to: string; roles: string[]; condition?: string }> }) : { states: [], transitions: [] }
  let stateNames = (wfCfg.states ?? []).map((s) => s.name)

  const countsByStatus = new Map<string, number>()
  try {
    const grouped = await prisma.docRecord.groupBy({ by: ["status"], where, _count: { _all: true } })
    for (const g of grouped) countsByStatus.set(g.status ?? (stateNames[0] ?? ""), g._count._all)
  } catch {
    for (const r of records) {
      const st = r.status ?? (stateNames[0] ?? "")
      if (!st) continue
      countsByStatus.set(st, (countsByStatus.get(st) ?? 0) + 1)
    }
  }
  const summaryCards = stateNames.map((n) => ({ name: n, count: countsByStatus.get(n) ?? 0 }))

  const isCrossConnect = key === "cross_connect"

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold">{docType.name}</h1>
          <div className="text-xs text-muted-foreground">{docType.key}</div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/customer/docs" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Kembali
            </Link>
          </Button>
          {permission?.canCreate && (
            <Button size="sm" asChild>
              <Link href={`/customer/docs/${docType.key}/create`} className="gap-2">
                <Plus className="w-4 h-4" />
                Buat Baru
              </Link>
            </Button>
          )}
        </div>
      </div>

      {summaryCards.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {summaryCards.map((s) => (
            <Card key={s.name} className="py-3">
              <CardContent className="flex items-center justify-between">
                <div className="text-sm font-medium">{s.name}</div>
                <div className="text-2xl font-semibold">{s.count}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : null}

      <Collapsible>
        <div className="flex items-center justify-between">
          <div className="text-sm font-semibold">Filter</div>
          <CollapsibleTrigger asChild>
            <Button type="button" variant="outline"><FilterIcon />Filter</Button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent>
          <form className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="space-y-2">
              <Label>Pencarian</Label>
              <Input name="q" defaultValue={q} placeholder="Cari kode atau field daftar" />
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <SearchableSelect name="status" placeholder="-" defaultValue={statusFilter} options={stateNames.map((n) => ({ label: n, value: n }))} />
            </div>
            <div className="space-y-2">
              <Label>Dari Tanggal</Label>
              <Input name="createdFrom" type="date" defaultValue={createdFrom} />
            </div>
            <div className="space-y-2">
              <Label>Sampai Tanggal</Label>
              <Input name="createdTo" type="date" defaultValue={createdTo} />
            </div>
            {filterFields.map((k) => {
              const f = docType.fields.find((x) => x.key === k)
              if (!f) return null
              const def = (() => {
                const raw = sp?.[k]
                return typeof raw === "string" ? raw : Array.isArray(raw) ? raw[0] : ""
              })()
              if (f.type === ("TEXT" as FieldType) || f.type === ("TEXTAREA" as FieldType) || f.type === ("LINK" as FieldType)) {
                return (
                  <div key={f.id} className="space-y-2">
                    <Label>{f.label}</Label>
                    <Input name={k} defaultValue={def} />
                  </div>
                )
              }
              if (f.type === ("NUMBER" as FieldType) || f.type === ("PRICE" as FieldType)) {
                return (
                  <div key={f.id} className="space-y-2">
                    <Label>{f.label}</Label>
                    <Input name={k} type="number" defaultValue={def} />
                  </div>
                )
              }
              if (f.type === ("DATE" as FieldType)) {
                return (
                  <div key={f.id} className="space-y-2">
                    <Label>{f.label}</Label>
                    <Input name={k} type="date" defaultValue={def} />
                  </div>
                )
              }
              if (f.type === ("DATETIME" as FieldType)) {
                return (
                  <div key={f.id} className="space-y-2">
                    <Label>{f.label}</Label>
                    <Input name={k} type="datetime-local" defaultValue={def} />
                  </div>
                )
              }
              if (f.type === ("CHECKBOX" as FieldType)) {
                return (
                  <div key={f.id} className="space-y-2">
                    <Label>{f.label}</Label>
                    <SearchableSelect name={k} defaultValue={def} options={[{ label: "Ya", value: "true" }, { label: "Tidak", value: "false" }]} />
                  </div>
                )
              }
              if (f.type === ("DROPDOWN" as FieldType)) {
                const cfg = (f.config ?? {}) as unknown as { options?: Array<{ label: string; value: string }> }
                const options = dynamicOptions[f.key] ?? (Array.isArray(cfg.options) ? cfg.options : [])
                return (
                  <div key={f.id} className="space-y-2">
                    <Label>{f.label}</Label>
                    <SearchableSelect name={k} placeholder="-" defaultValue={def} options={options} />
                  </div>
                )
              }
              return null
            })}
            <div className="mt-2 md:col-span-3 flex items-center gap-2">
              <Button type="submit">Terapkan Filter</Button>
              <Link href={`/customer/docs/${docType.key}`} className="text-sm underline">Reset</Link>
            </div>
          </form>
        </CollapsibleContent>
      </Collapsible>

      <div className="space-y-2">
        {records.map((r) => (
          <div key={r.id} className="border rounded-lg p-4 flex items-center justify-between bg-white shadow-sm hover:shadow-md transition-shadow">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                 <div className="bg-primary/10 text-primary p-2 rounded-md">
                    <FileText className="w-4 h-4" />
                 </div>
                 <div>
                    <div className="text-sm font-bold text-gray-900">{r.code ?? r.id}</div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(r.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
                      {r.children.length > 0 && (
                        <span className="ml-2 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium border border-primary/20">
                           {(() => {
                              const firstChild = r.children[0]
                              const d = firstChild.data as any
                              const pid = d?.product_id
                              const name = productMap.get(pid) || d?.spec_description || ""
                              return name ? `${name}${r.children.length > 1 ? ` (+${r.children.length - 1} more)` : ""}` : ""
                           })()}
                        </span>
                      )}
                    </div>
                 </div>
              </div>
              {listFields.length > 0 || isCrossConnect ? (
                <div className="text-xs space-y-1">
                  {isCrossConnect && (
                    <div className="flex flex-col gap-2 mb-2">
                      <div className="flex items-center gap-3">
                        <div className="flex flex-col gap-1 p-2 rounded-lg bg-primary/5 border border-primary/10 text-primary min-w-[200px]">
                          <div className="flex items-center gap-1.5">
                            <span className="opacity-50 text-[10px] uppercase font-bold tracking-tighter">Source</span>
                            <span className="font-bold text-sm">{(() => {
                              const d = (r.data ?? {}) as any
                              return rackMap.get(d.source_rack_id) || d.source_rack_id || "-"
                            })()}</span>
                          </div>
                          <div className="flex flex-col text-[10px] opacity-80 leading-tight border-t border-primary/10 pt-1 mt-1">
                            <span>Material: {(() => {
                              const d = (r.data ?? {}) as any
                              return productMap.get(d.source_material) || d.source_material || "-"
                            })()}</span>
                            <span>Type: {(() => {
                              const d = (r.data ?? {}) as any
                              return d.source_connector_type || "-"
                            })()}</span>
                          </div>
                        </div>

                        <div className="flex flex-col items-center justify-center gap-1">
                          <div className="w-8 h-[1px] bg-gray-200 relative">
                            <div className="absolute -right-1 -top-[3.5px] border-t-[4px] border-b-[4px] border-l-[6px] border-t-transparent border-b-transparent border-l-gray-300" />
                          </div>
                          <Badge variant="outline" className="text-[9px] px-1 py-0 h-4 bg-white whitespace-nowrap">
                            {(() => {
                              const d = (r.data ?? {}) as any
                              return d.cross_connect_type || "FO"
                            })()}
                          </Badge>
                        </div>

                        <div className="flex flex-col gap-1 p-2 rounded-lg bg-orange-500/5 border border-orange-500/10 text-orange-700 min-w-[200px]">
                          <div className="flex items-center gap-1.5">
                            <span className="opacity-50 text-[10px] uppercase font-bold tracking-tighter">Destination</span>
                            <span className="font-bold text-sm">{(() => {
                              const d = (r.data ?? {}) as any
                              return companyMap.get(d.destination) || d.destination || "Target"
                            })()}</span>
                          </div>
                          <div className="flex flex-col text-[10px] opacity-80 leading-tight border-t border-orange-500/10 pt-1 mt-1">
                            <span>Rack: {(() => {
                              const d = (r.data ?? {}) as any
                              return rackMap.get(d.destination_rack_id) || d.destination_rack_id || "-"
                            })()}</span>
                            <span>Type: {(() => {
                              const d = (r.data ?? {}) as any
                              return d.destination_connector_type || "-"
                            })()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {listFields.length > 0 && (
                    <div className="flex flex-wrap gap-x-3 gap-y-1">
                      {listFields.map((k) => {
                        // Skip fields already shown in the Cross Connect summary box
                        if (isCrossConnect && [
                          "source_rack_id", "source_material", "source_connector_type",
                          "destination", "destination_rack_id", "destination_connector_type",
                          "cross_connect_type", "branch_id"
                        ].includes(k)) return null

                        const f = docType.fields.find((x) => x.key === k)
                        if (!f) return null
                        const d = (r.data ?? {}) as Record<string, unknown>
                        const raw = d[k]
                        let val = "-"
                        if (raw !== undefined && raw !== null) {
                          if (f.type === ("DROPDOWN" as FieldType)) {
                            const opts = dynamicOptions[f.key] ?? []
                            const found = opts.find((o) => o.value === String(raw))
                            val = found ? found.label : String(raw)
                          } else if (f.type === ("CHECKBOX" as FieldType)) {
                            val = (raw as boolean) ? "Ya" : "Tidak"
                          } else {
                            val = String(raw)
                          }
                        }
                        return (
                          <span key={k} className="inline-block">{f.label}: <span className="text-gray-700">{val}</span></span>
                        )
                      })}
                    </div>
                  )}
                </div>
              ) : null}
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={statusBadgeVariant(r.status ?? "DRAFT")}>{r.status ?? "DRAFT"}</Badge>
              <Button variant="outline" size="sm" className="h-8" asChild>
                <Link href={`/customer/docs/${docType.key}/${r.id}`}>
                  Detail
                </Link>
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="Preview" asChild>
                <Link href={`/customer/docs/${docType.key}/${r.id}/preview`}>
                  <Eye className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        ))}
        {records.length === 0 ? (
          <div className="text-sm text-muted-foreground">Belum ada dokumen.</div>
        ) : null}
        <div className="flex items-center justify-between mt-2">
          <div className="text-xs text-muted-foreground">Menampilkan {totalCount === 0 ? 0 : (skip + 1)}–{Math.min(skip + records.length, totalCount)} dari total {totalCount}</div>
          <div className="flex items-center gap-2">
            {page > 1 ? (
              <Link href={`/customer/docs/${docType.key}?${(() => { const cur = new URLSearchParams(); if (q) cur.set("q", q); if (statusFilter) cur.set("status", statusFilter); if (createdFrom) cur.set("createdFrom", createdFrom); if (createdTo) cur.set("createdTo", createdTo); for (const k of filterFields) { const raw = sp?.[k]; const val = typeof raw === "string" ? raw : Array.isArray(raw) ? raw[0] : ""; if (val) cur.set(k, val) } cur.set("page", String(page - 1)); cur.set("pageSize", String(pageSize)); return cur.toString() })()}` } className="text-sm underline">Prev</Link>
            ) : null}
            {skip + records.length < totalCount ? (
              <Link href={`/customer/docs/${docType.key}?${(() => { const cur = new URLSearchParams(); if (q) cur.set("q", q); if (statusFilter) cur.set("status", statusFilter); if (createdFrom) cur.set("createdFrom", createdFrom); if (createdTo) cur.set("createdTo", createdTo); for (const k of filterFields) { const raw = sp?.[k]; const val = typeof raw === "string" ? raw : Array.isArray(raw) ? raw[0] : ""; if (val) cur.set(k, val) } cur.set("page", String(page + 1)); cur.set("pageSize", String(pageSize)); return cur.toString() })()}` } className="text-sm underline">Next</Link>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}