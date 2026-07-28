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
import { IconDisplay } from "@/components/icon-display"
import { cn } from "@/lib/utils"
import {
  Filter as FilterIcon,
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  ChevronDown,
  Eye,
  FileText,
  Plus,
  Search,
  XCircle,
  Inbox,
  Calendar,
  X,
  Package,
  ArrowDownToLine,
  ArrowUpFromLine,
} from "lucide-react"
import type { FieldType } from "@/generated/prisma/enums"
import type { Prisma } from "@/generated/prisma/client"

type StatusStyle = {
  bg: string
  text: string
  border: string
  icon: typeof FileText
}

function getStatusStyle(name: string): StatusStyle {
  const s = String(name || "").toLowerCase()
  if (s.includes("cancel") || s.includes("reject")) {
    return { bg: "bg-red-50", text: "text-red-700", border: "border-red-200/60", icon: XCircle }
  }
  if (s.includes("draft")) {
    return { bg: "bg-slate-50", text: "text-slate-600", border: "border-slate-200/60", icon: FileText }
  }
  if (s.includes("submit") || s.includes("review") || s.includes("pending")) {
    return { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200/60", icon: ArrowUpFromLine }
  }
  if (s.includes("approve") || s.includes("active") || s.includes("verified") || s.includes("publish") || s.includes("complete")) {
    return { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200/60", icon: ArrowDownToLine }
  }
  return { bg: "bg-slate-50", text: "text-slate-600", border: "border-slate-200/60", icon: FileText }
}

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

  const totalPages = Math.ceil(totalCount / pageSize)

  return (
    <div className="min-h-screen bg-slate-50/30 -m-4 sm:-m-6 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Link href="/customer/docs" className="hover:text-slate-900 transition-colors flex items-center gap-1">
              <ArrowLeft className="h-3.5 w-3.5" />
              Documents
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-slate-300" />
            <span className="text-slate-900 font-medium">{docType.name}</span>
          </div>

          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-2xl bg-white border border-slate-200/80 flex items-center justify-center shadow-sm">
                {docType.icon ? (
                  <IconDisplay name={docType.icon} className="h-7 w-7 text-slate-700" />
                ) : (
                  <FileText className="h-7 w-7 text-slate-700" />
                )}
              </div>
              <div>
                <h1 className="text-2xl font-semibold tracking-tight text-slate-900">{docType.name}</h1>
                <div className="flex items-center gap-2 mt-1 text-sm text-slate-500">
                  <span className="font-mono text-xs px-1.5 py-0.5 bg-slate-100 rounded text-slate-600">{docType.key}</span>
                  <span>·</span>
                  <span>{totalCount} total</span>
                  <span>·</span>
                  <span>{records.length} shown</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {permission?.canCreate && (
                <Button asChild className="h-9 bg-slate-900 hover:bg-slate-800 text-white shadow-sm">
                  <Link href={`/customer/docs/${docType.key}/create`}>
                    <Plus className="h-4 w-4 mr-2" />
                    Buat Baru
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        {summaryCards.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {summaryCards.map((s) => {
              const style = getStatusStyle(s.name)
              const StatusIcon = style.icon
              const isActive = statusFilter === s.name
              const params = new URLSearchParams()
              if (q) params.set("q", q)
              if (createdFrom) params.set("createdFrom", createdFrom)
              if (createdTo) params.set("createdTo", createdTo)
              for (const k of filterFields) {
                const raw = sp?.[k]
                const val = typeof raw === "string" ? raw : Array.isArray(raw) ? raw[0] : ""
                if (val) params.set(k, val)
              }
              if (!isActive) params.set("status", s.name)
              const href = `/customer/docs/${docType.key}${params.toString() ? `?${params.toString()}` : ""}`

              return (
                <Link key={s.name} href={href} className="group">
                  <div
                    className={cn(
                      "relative bg-white rounded-xl border p-4 transition-all duration-200",
                      "border-slate-200/80 hover:border-slate-300 hover:shadow-sm",
                      isActive && "border-slate-900 bg-slate-50 ring-1 ring-slate-900"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div
                          className={cn(
                            "h-8 w-8 rounded-lg flex items-center justify-center transition-colors",
                            isActive ? "bg-slate-900 text-white" : "bg-slate-50 text-slate-500"
                          )}
                        >
                          <StatusIcon className="h-4 w-4" />
                        </div>
                        <span className={cn("text-sm font-medium", isActive ? "text-slate-900" : "text-slate-600")}>
                          {s.name}
                        </span>
                      </div>
                      <span className="text-2xl font-semibold tracking-tight tabular-nums text-slate-900">
                        {s.count}
                      </span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        )}

        {/* Search & Filter Bar */}
        <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm">
          <div className="p-3 flex items-center gap-2 flex-wrap">
            <form className="flex-1 min-w-[200px] relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                name="q"
                defaultValue={q}
                placeholder="Cari kode atau field daftar..."
                className="pl-10 h-9 border-slate-200 bg-slate-50/50 focus-visible:bg-white"
              />
            </form>

            {(q || statusFilter || createdFrom || createdTo || filterFields.some((k) => sp?.[k])) && (
              <Link
                href={`/customer/docs/${docType.key}`}
                className="inline-flex items-center gap-1.5 h-9 px-3 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors"
              >
                <span>Reset all filters</span>
                <X className="h-3.5 w-3.5" />
              </Link>
            )}

            <Collapsible>
              <CollapsibleTrigger asChild>
                <Button type="button" variant="outline" size="sm" className="h-9 border-slate-200">
                  <FilterIcon className="h-3.5 w-3.5 mr-1.5" />
                  Filters
                  <ChevronDown className="h-3.5 w-3.5 ml-1.5" />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="px-3 pb-3 pt-2 border-t border-slate-100 mt-2">
                  <form className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="space-y-1.5">
                      <Label className="text-xs text-slate-600">Status</Label>
                      <SearchableSelect name="status" placeholder="-" defaultValue={statusFilter} options={stateNames.map((n) => ({ label: n, value: n }))} />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs text-slate-600">Dari Tanggal</Label>
                      <Input name="createdFrom" type="date" defaultValue={createdFrom} className="h-9" />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs text-slate-600">Sampai Tanggal</Label>
                      <Input name="createdTo" type="date" defaultValue={createdTo} className="h-9" />
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
                          <div key={f.id} className="space-y-1.5">
                            <Label className="text-xs text-slate-600">{f.label}</Label>
                            <Input name={k} defaultValue={def} className="h-9" />
                          </div>
                        )
                      }
                      if (f.type === ("NUMBER" as FieldType) || f.type === ("PRICE" as FieldType)) {
                        return (
                          <div key={f.id} className="space-y-1.5">
                            <Label className="text-xs text-slate-600">{f.label}</Label>
                            <Input name={k} type="number" defaultValue={def} className="h-9" />
                          </div>
                        )
                      }
                      if (f.type === ("DATE" as FieldType)) {
                        return (
                          <div key={f.id} className="space-y-1.5">
                            <Label className="text-xs text-slate-600">{f.label}</Label>
                            <Input name={k} type="date" defaultValue={def} className="h-9" />
                          </div>
                        )
                      }
                      if (f.type === ("DATETIME" as FieldType)) {
                        return (
                          <div key={f.id} className="space-y-1.5">
                            <Label className="text-xs text-slate-600">{f.label}</Label>
                            <Input name={k} type="datetime-local" defaultValue={def} className="h-9" />
                          </div>
                        )
                      }
                      if (f.type === ("CHECKBOX" as FieldType)) {
                        return (
                          <div key={f.id} className="space-y-1.5">
                            <Label className="text-xs text-slate-600">{f.label}</Label>
                            <SearchableSelect name={k} defaultValue={def} options={[{ label: "Ya", value: "true" }, { label: "Tidak", value: "false" }]} />
                          </div>
                        )
                      }
                      if (f.type === ("DROPDOWN" as FieldType)) {
                        const cfg = (f.config ?? {}) as unknown as { options?: Array<{ label: string; value: string }> }
                        const options = dynamicOptions[f.key] ?? (Array.isArray(cfg.options) ? cfg.options : [])
                        return (
                          <div key={f.id} className="space-y-1.5">
                            <Label className="text-xs text-slate-600">{f.label}</Label>
                            <SearchableSelect name={k} placeholder="-" defaultValue={def} options={options} />
                          </div>
                        )
                      }
                      return null
                    })}
                    <div className="md:col-span-3 flex items-center gap-2 pt-1">
                      <Button type="submit" size="sm" className="h-9 bg-slate-900 hover:bg-slate-800">
                        Terapkan Filter
                      </Button>
                      <Link
                        href={`/customer/docs/${docType.key}`}
                        className="text-sm text-slate-500 hover:text-slate-900 transition-colors"
                      >
                        Reset
                      </Link>
                    </div>
                  </form>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </div>

        {/* Records List */}
        <div className="space-y-2">
          {records.length === 0 ? (
            <div className="bg-white rounded-xl border border-slate-200/80 border-dashed py-16 flex flex-col items-center justify-center text-center">
              <div className="h-12 w-12 rounded-full bg-slate-50 flex items-center justify-center mb-3">
                <Inbox className="h-6 w-6 text-slate-400" />
              </div>
              <h3 className="text-sm font-medium text-slate-900">No documents found</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm">
                {q || statusFilter || createdFrom || createdTo || filterFields.some((k) => sp?.[k])
                  ? "Try adjusting your filters or search query"
                  : `Get started by creating your first ${docType.name.toLowerCase()}`}
              </p>
              {permission?.canCreate && !q && !statusFilter && !createdFrom && !createdTo && !filterFields.some((k) => sp?.[k]) && (
                <Button asChild size="sm" className="mt-4 bg-slate-900 hover:bg-slate-800">
                  <Link href={`/customer/docs/${docType.key}/create`}>
                    <Plus className="h-3.5 w-3.5 mr-1.5" />
                    Buat {docType.name}
                  </Link>
                </Button>
              )}
            </div>
          ) : (
            records.map((r) => {
              const data = (r.data ?? {}) as Record<string, unknown>
              const visitors = Array.isArray(data["visitors"])
                ? (data["visitors"] as Array<Record<string, unknown>>)
                : []
              const firstChild = r.children[0]
              const cd = firstChild?.data as any
              const pid = cd?.product_id
              const childName = productMap.get(pid) || cd?.spec_description || ""
              const statusName = r.status ?? "DRAFT"
              const style = getStatusStyle(statusName)
              const StatusIcon = style.icon

              return (
                <div
                  key={r.id}
                  className="group bg-white rounded-xl border border-slate-200/80 hover:border-slate-300 hover:shadow-sm transition-all duration-200"
                >
                  <div className="p-4 flex items-center gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                        <Link
                          href={`/customer/docs/${docType.key}/${r.id}`}
                          className="font-mono text-sm font-medium text-slate-900 hover:text-slate-700 transition-colors"
                        >
                          {r.code ?? r.id.slice(0, 8)}
                        </Link>
                        <span
                          className={cn(
                            "inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium border",
                            style.bg, style.text, style.border
                          )}
                        >
                          <StatusIcon className="h-3 w-3" />
                          {statusName}
                        </span>
                        {r.children.length > 0 && childName && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium border bg-slate-50 text-slate-600 border-slate-200/60">
                            <Package className="h-3 w-3" />
                            {childName}{r.children.length > 1 ? ` +${r.children.length - 1}` : ""}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-4 text-xs text-slate-500 flex-wrap">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-3 w-3 text-slate-400" />
                          <span>{new Date(r.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}</span>
                        </div>
                        {isCrossConnect && (
                          <div className="flex items-center gap-1.5">
                            <span className="text-slate-400">From</span>
                            <span className="text-slate-700 font-medium">{rackMap.get(String(data["source_rack_id"] ?? "")) || data["source_rack_id"] || "-"}</span>
                            <ArrowRight className="h-3 w-3 text-slate-300" />
                            <span className="text-slate-400">to</span>
                            <span className="text-slate-700 font-medium">{companyMap.get(String(data["destination"] ?? "")) || data["destination"] || "-"}</span>
                          </div>
                        )}
                        {listFields.length > 0 && !isCrossConnect && listFields.slice(0, 3).map((k) => {
                          const f = docType.fields.find((x) => x.key === k)
                          if (!f) return null
                          const raw = data[k]
                          let val: React.ReactNode = "-"
                          if (raw !== undefined && raw !== null) {
                            if (f.type === ("DROPDOWN" as FieldType)) {
                              const opts = dynamicOptions[f.key] ?? []
                              const found = opts.find((o) => o.value === String(raw))
                              val = found ? found.label : String(raw)
                            } else if (f.type === ("CHECKBOX" as FieldType)) {
                              val = raw ? "Ya" : "Tidak"
                            } else {
                              val = String(raw)
                            }
                          }
                          return (
                            <div key={k} className="flex items-center gap-1.5">
                              <span className="text-slate-400">{f.label}:</span>
                              <span className="text-slate-700 font-medium">{val}</span>
                            </div>
                          )
                        })}
                        {listFields.length > 3 && (
                          <span className="text-slate-400 text-xs">+{listFields.length - 3} more</span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link href={`/customer/docs/${docType.key}/${r.id}/preview`}>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-slate-900">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Link href={`/customer/docs/${docType.key}/${r.id}`}>
                        <Button variant="outline" size="sm" className="h-8 border-slate-200">
                          Detail
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>

        {/* Pagination */}
        {totalCount > 0 && totalPages > 1 && (
          <div className="flex items-center justify-between pt-2">
            <div className="text-xs text-slate-500">
              Menampilkan {skip + 1}–{Math.min(skip + records.length, totalCount)} dari {totalCount}
            </div>
            <div className="flex items-center gap-1">
              {page > 1 ? (
                <Link
                  href={`/customer/docs/${docType.key}?${(() => { const cur = new URLSearchParams(); if (q) cur.set("q", q); if (statusFilter) cur.set("status", statusFilter); if (createdFrom) cur.set("createdFrom", createdFrom); if (createdTo) cur.set("createdTo", createdTo); for (const k of filterFields) { const raw = sp?.[k]; const val = typeof raw === "string" ? raw : Array.isArray(raw) ? raw[0] : ""; if (val) cur.set(k, val) } cur.set("page", String(page - 1)); cur.set("pageSize", String(pageSize)); return cur.toString() })()}`}
                  className="inline-flex items-center gap-1 h-8 px-3 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors"
                >
                  <ArrowLeft className="h-3 w-3" />
                  Previous
                </Link>
              ) : (
                <span className="inline-flex items-center gap-1 h-8 px-3 text-xs font-medium text-slate-300 rounded-md">
                  <ArrowLeft className="h-3 w-3" />
                  Previous
                </span>
              )}
              <span className="text-xs text-slate-500 px-2">
                Page {page} of {totalPages}
              </span>
              {skip + records.length < totalCount ? (
                <Link
                  href={`/customer/docs/${docType.key}?${(() => { const cur = new URLSearchParams(); if (q) cur.set("q", q); if (statusFilter) cur.set("status", statusFilter); if (createdFrom) cur.set("createdFrom", createdFrom); if (createdTo) cur.set("createdTo", createdTo); for (const k of filterFields) { const raw = sp?.[k]; const val = typeof raw === "string" ? raw : Array.isArray(raw) ? raw[0] : ""; if (val) cur.set(k, val) } cur.set("page", String(page + 1)); cur.set("pageSize", String(pageSize)); return cur.toString() })()}`}
                  className="inline-flex items-center gap-1 h-8 px-3 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors"
                >
                  Next
                  <ArrowRight className="h-3 w-3" />
                </Link>
              ) : (
                <span className="inline-flex items-center gap-1 h-8 px-3 text-xs font-medium text-slate-300 rounded-md">
                  Next
                  <ArrowRight className="h-3 w-3" />
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}