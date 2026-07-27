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
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible"
import { Card, CardContent } from "@/components/ui/card"
import { IconDisplay } from "@/components/icon-display"

import { Filter as FilterIcon, FileText, Send, XCircle, Eye, CheckCircle2, BadgeCheck, PlayCircle, Globe } from "lucide-react"
import type { FieldType } from "@/generated/prisma/enums"
import type { LucideIcon } from "lucide-react"
import type { Prisma } from "@/generated/prisma/client"
import { SearchableSelect } from "@/components/ui/select"
import { cn } from "@/lib/utils"
 

 

async function deleteRecord(formData: FormData) {
  "use server"
  console.log("Delete triggered")
  const session = await getServerSession(authOptions)
  const email = session?.user?.email ?? ""
  const me = email ? await prisma.user.findUnique({ where: { email }, include: { role: true } }) : null
  if (!me) { console.log("No user"); return }
  const id = String(formData.get("id") || "")
  const key = String(formData.get("docTypeKey") || "")
  console.log("Deleting", id, key)
  const docType = await prisma.docType.findUnique({ where: { key }, include: { permissions: true } })
  if (!docType) { console.log("No docType"); return }
  const perm = docType.permissions.find((p) => p.roleId === me.roleId)
  if (perm && !perm.canDelete) { console.log("No permission"); return }
  if (!id) return
  const record = await prisma.docRecord.findUnique({ where: { id } })
  if (!record) { console.log("No record"); return }

  try {
    await prisma.docRow.deleteMany({ where: { recordId: id } })
    await prisma.docRecord.delete({ where: { id } })
    console.log("Deleted successfully")
  } catch (e) {
    console.error("Delete failed", e)
  }
  revalidatePath(`/admin/docs/${key}`)
}

async function migrateNullBranchRecords(formData: FormData) {
  "use server"
  const session = await getServerSession(authOptions)
  const email = session?.user?.email ?? ""
  const me = email ? await prisma.user.findUnique({ where: { email }, include: { role: true, assignedBranches: { include: { branch: true } } } }) : null
  if (!me) return
  const key = String(formData.get("docTypeKey") || "")
  const branchId = String(formData.get("branchId") || "")
  if (!key || !branchId) return
  const docType = await prisma.docType.findUnique({ where: { key }, include: { permissions: true } })
  if (!docType) return
  const perm = docType.permissions.find((p) => p.roleId === me.roleId)
  if (perm && !perm.canWrite) return
  const allowed = new Set((me.assignedBranches ?? []).map((a) => a.branch.id))
  if (allowed.size > 0 && !allowed.has(branchId)) return
  await prisma.docRecord.updateMany({ where: { docTypeId: docType.id, branchId: null }, data: { branchId } })
  revalidatePath(`/admin/docs/${key}`)
}

async function bulkTransitionRecords(formData: FormData) {
  "use server"
  const session = await getServerSession(authOptions)
  const email = session?.user?.email ?? ""
  const me = email ? await prisma.user.findUnique({ where: { email }, include: { role: true } }) : null
  if (!me) return
  const key = String(formData.get("docTypeKey") || "")
  const target = String(formData.get("targetStatus") || "")
  const ids = (formData.getAll("ids") ?? []).map((v) => String(v || "")).filter(Boolean)
  if (!key || !target || ids.length === 0) return
  const docType = await prisma.docType.findUnique({ where: { key }, include: { permissions: true } })
  if (!docType) return
  const perm = docType.permissions.find((p) => p.roleId === me.roleId)
  if (perm && !perm.canWrite) return
  const roleName = me.role?.name ?? ""
  let wf: { config?: unknown } | null = null
  try {
    wf = await prisma.docWorkflow.findFirst({ where: { docTypeId: docType.id, isActive: true, OR: [{ branchId: docType.branchId ?? null }, { branchId: null }] }, orderBy: { branchId: "desc" } })
  } catch {}
  const cfg = (wf?.config ?? {}) as unknown as { states?: Array<{ name: string; updates?: Record<string, string> }>; transitions?: Array<{ from: string; to: string; roles: string[]; condition?: string }> }
  const states = cfg.states ?? []
  const transitions = cfg.transitions ?? []
  function evalAtomic(expr: string, dataObj: Record<string, unknown>): boolean {
    const m = expr.match(/^([A-Za-z0-9_\.]+)\s*(==|!=|>=|<=|>|<|contains|empty|notempty)\s*(.*)$/)
    if (!m) return false
    const field = m[1]
    const op = m[2]
    const rhsRaw = m[3]
    const lhsVal = field.split(".").reduce<unknown>((acc, k) => {
      if (acc && typeof acc === "object" && k in (acc as Record<string, unknown>)) return (acc as Record<string, unknown>)[k]
      return undefined
    }, dataObj)
    if (op === "empty") return lhsVal === undefined || lhsVal === null || String(lhsVal).trim() === ""
    if (op === "notempty") return !(lhsVal === undefined || lhsVal === null || String(lhsVal).trim() === "")
    const rhs = rhsRaw.replace(/^['"`]/, "").replace(/['"`]$/, "")
    const ln = typeof lhsVal === "number" ? lhsVal : Number(lhsVal)
    const rn = Number(rhs)
    const bothNum = !Number.isNaN(ln) && !Number.isNaN(rn)
    if (op === "contains") return String(lhsVal ?? "").includes(rhs)
    if (op === "==") return bothNum ? ln === rn : String(lhsVal ?? "") === rhs
    if (op === "!=") return bothNum ? ln !== rn : String(lhsVal ?? "") !== rhs
    if (op === ">") return bothNum ? ln > rn : String(lhsVal ?? "") > rhs
    if (op === "<") return bothNum ? ln < rn : String(lhsVal ?? "") < rhs
    if (op === ">=") return bothNum ? ln >= rn : String(lhsVal ?? "") >= rhs
    if (op === "<=") return bothNum ? ln <= rn : String(lhsVal ?? "") <= rhs
    return false
  }
  function evalCondition(expr?: string, dataObj?: Record<string, unknown>): boolean {
    if (!expr) return true
    const orGroups = expr.split(/\|\|/).map((g) => g.trim()).filter(Boolean)
    for (const g of orGroups) {
      const ands = g.split(/&&/).map((x) => x.trim()).filter(Boolean)
      let ok = true
      for (const a of ands) { if (!evalAtomic(a, dataObj ?? {})) { ok = false; break } }
      if (ok) return true
    }
    return false
  }
  for (const id of ids) {
    const rec = await prisma.docRecord.findUnique({ where: { id } })
    if (!rec) continue
    if (perm && !perm.canAssign && rec.assignedToId !== me.id) continue
    const current = rec.status ?? (states[0]?.name || "")
    if (!current) continue
    const dataObj = (rec.data ?? {}) as Record<string, unknown>
    const tr = transitions.find((t) => t.from === current && t.to === target && t.roles.includes(roleName) && evalCondition(t.condition, dataObj))
    if (!tr) continue
    const upd = (states.find((s) => s.name === target)?.updates ?? {})
    const newData: Record<string, unknown> = { ...dataObj }
    for (const k of Object.keys(upd)) newData[k] = upd[k]
    const actor = (me.name || me.email || "-")
    const actRaw = (newData["__activity"] ?? []) as unknown
    const activities: Array<{ at: string; text: string }> = Array.isArray(actRaw) ? (actRaw as Array<{ at: string; text: string }>) : []
    activities.push({ at: new Date().toISOString(), text: `Status diubah: ${current} → ${target} oleh ${actor}` })
    newData["__activity"] = activities
    await prisma.docRecord.update({ where: { id }, data: { status: target, data: newData as unknown as Prisma.InputJsonValue, updatedById: me.id } })
  }
  revalidatePath(`/admin/docs/${key}`)
}

async function normalizeStatuses(formData: FormData) {
  "use server"
  const session = await getServerSession(authOptions)
  const email = session?.user?.email ?? ""
  const me = email ? await prisma.user.findUnique({ where: { email }, include: { role: true } }) : null
  if (!me) return
  const key = String(formData.get("docTypeKey") || "")
  const branchId = String(formData.get("branchId") || "") || undefined
  if (!key) return
  const docType = await prisma.docType.findUnique({ where: { key }, include: { permissions: true } })
  if (!docType) return
  const perm = docType.permissions.find((p) => p.roleId === me.roleId)
  if (perm && !perm.canWrite) return
  let wf: { config?: unknown } | null = null
  try {
    wf = await prisma.docWorkflow.findFirst({ where: { docTypeId: docType.id, isActive: true, OR: [{ branchId: branchId ?? docType.branchId ?? null }, { branchId: null }] }, orderBy: { branchId: "desc" } })
  } catch {}
  const cfg = (wf?.config ?? {}) as unknown as { states?: Array<{ name: string; docStatus?: number }>; renameMap?: Record<string, string> }
  const states = cfg.states ?? []
  const stateNames = states.map((s) => s.name)
  const renameMap = cfg.renameMap ?? {}
  const caseInsensitiveLookup = (cur: string): string | undefined => {
    const found = stateNames.find((n) => n.toLowerCase() === cur.toLowerCase())
    return found
  }
  const where: Prisma.DocRecordWhereInput = { docTypeId: docType.id, ...(branchId ? { branchId } : {}) }
  if (perm && !perm.canAssign) {
    where.assignedToId = me.id
  }
  const records = await prisma.docRecord.findMany({ where })
  const actor = me.name || me.email || "-"
  for (const rec of records) {
    const cur = rec.status ?? (stateNames[0] ?? "")
    if (!cur) continue
    if (stateNames.includes(cur)) continue
    const mapped = renameMap[cur] ?? renameMap[cur.toUpperCase()] ?? renameMap[cur.toLowerCase()] ?? caseInsensitiveLookup(cur)
    const next = mapped ?? (stateNames[0] ?? cur)
    if (next === cur) continue
    const nextDocStatus = (states.find((s) => s.name === next)?.docStatus)
    const dataObj = (rec.data ?? {}) as Record<string, unknown>
    const actRaw = (dataObj["__activity"] ?? []) as unknown
    const activities: Array<{ at: string; text: string }> = Array.isArray(actRaw) ? (actRaw as Array<{ at: string; text: string }>) : []
    activities.push({ at: new Date().toISOString(), text: `Status diubah (sinkronisasi): ${cur} → ${next} oleh ${actor}` })
    dataObj["__activity"] = activities
    await prisma.docRecord.update({ where: { id: rec.id }, data: { status: next, docStatus: nextDocStatus ?? rec.docStatus, data: dataObj as unknown as Prisma.InputJsonValue, updatedById: me.id } })
  }
  revalidatePath(`/admin/docs/${key}`)
}

function statusBadgeVariant(name: string): "default" | "secondary" | "destructive" | "outline" {
  const s = String(name || "").toLowerCase()
  if (s.includes("cancel")) return "destructive"
  if (s.includes("submit")) return "secondary"
  if (s.includes("draft")) return "outline"
  if (s.includes("review") || s.includes("approve") || s.includes("verified") || s.includes("active") || s.includes("publish")) return "default"
  return "outline"
}

function statusIcon(name: string): LucideIcon {
  const s = String(name || "").toLowerCase()
  if (s.includes("cancel")) return XCircle
  if (s.includes("submit")) return Send
  if (s.includes("draft")) return FileText
  if (s.includes("review")) return Eye
  if (s.includes("approve")) return CheckCircle2
  if (s.includes("verified")) return BadgeCheck
  if (s.includes("active")) return PlayCircle
  if (s.includes("publish")) return Globe
  return FileText
}

export default async function DocsByTypePage({ params, searchParams }: { params?: Record<string, string | string[] | undefined> | Promise<Record<string, string | string[] | undefined>>; searchParams?: Record<string, string | string[] | undefined> | Promise<Record<string, string | string[] | undefined>> }) {
  const session = await getServerSession(authOptions)
  const email = session?.user?.email ?? ""
  const user = email ? await prisma.user.findUnique({ where: { email }, include: { role: { include: { permissions: { include: { permission: true } } } }, assignedBranches: { include: { branch: true } } } }) : null
  const permGlobal = new Set((user?.role?.permissions ?? []).map((rp) => rp.permission.key))
  if (!permGlobal.has("ADMIN_PANEL_ACCESS") && !permGlobal.has("DOCUMENTS_MANAGEMENT")) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold">Dokumen</h1>
        <p>Anda tidak memiliki akses.</p>
      </div>
    )
  }
  const p = ((await params) ?? {}) as Record<string, string | string[] | undefined>
  const sp = ((await searchParams) ?? {}) as Record<string, string | string[] | undefined>
  const keyRaw = p?.key
  const key = typeof keyRaw === "string" ? keyRaw : Array.isArray(keyRaw) ? keyRaw[0] : ""
  if (!key) redirect("/admin/doctypes")
  const docType = await prisma.docType.findUnique({ where: { key }, include: { fields: { orderBy: { order: "asc" } }, permissions: true } })
  if (!docType) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold">Dokumen</h1>
        <p>DocType dengan key {key} tidak ditemukan.</p>
        <div>
          {permGlobal.has("DOCTYPE_MANAGEMENT") ? (
            <Link href="/admin/doctypes" className="text-sm underline">Ke daftar DocType</Link>
          ) : null}
        </div>
      </div>
    )
  }
  const permission = docType.permissions.find((p) => p.roleId === user?.roleId)
  const canWrite = permission ? permission.canWrite : true
  // Admin/Manager with global access should be able to see all assignments regardless of specific docType permission
  const canAssign = (permission ? permission.canAssign : true) || permGlobal.has("ADMIN_PANEL_ACCESS") || permGlobal.has("DOCUMENTS_MANAGEMENT")
  
  const cookieStore = await cookies()
  const cookieBranchId = cookieStore.get("branchId")?.value
  
  // Robust branch resolution matching admin/layout.tsx
  const isSuper = permGlobal.has("COMPANY_MANAGEMENT")
  const assignedBranches = await prisma.branch.findMany({ 
    where: { admins: { some: { userId: user?.id ?? "" } } }, 
    orderBy: { name: "asc" } 
  })
  
  const superBranches = isSuper
    ? await prisma.branch.findMany({
        where: {
          OR: [
            { companyId: user?.companyId ?? undefined },
            { company: { parentId: user?.companyId ?? undefined } },
          ],
        },
        orderBy: { name: "asc" },
      })
    : []
    
  const baseBranches = (assignedBranches.length > 0 && !isSuper)
      ? assignedBranches
      : (superBranches.length > 0 ? superBranches : await prisma.branch.findMany({ where: { companyId: user?.companyId ?? undefined }, orderBy: { name: "asc" } }))
      
  const branchesMap = new Map<string, { id: string; name: string }>()
  for (const b of baseBranches) branchesMap.set(b.id, { id: b.id, name: b.name })
  for (const b of assignedBranches) branchesMap.set(b.id, { id: b.id, name: b.name })
  
  const branches = Array.from(branchesMap.values())
  const candidateBranchId = cookieBranchId ?? branches[0]?.id
  const allowedBranchIds = new Set(branches.map((b) => b.id))
  const selectedBranchId = allowedBranchIds.has(String(candidateBranchId)) ? candidateBranchId : branches[0]?.id

  const dynamicOptions: Record<string, Array<{ label: string; value: string }>> = {}
  for (const f of docType.fields) {
    if (f.type === ("DROPDOWN" as FieldType)) {
      const cfg = (f.config ?? {}) as unknown as { options?: Array<{ label: string; value: string }>; source?: Record<string, unknown> }
      const src = cfg?.source as Record<string, unknown> | undefined
      const targetKey = src && typeof src["key"] === "string" ? (src["key"] as string)
        : src && typeof src["docTypeKey"] === "string" ? (src["docTypeKey"] as string)
        : src && typeof src["target"] === "string" ? (src["target"] as string)
        : ""
      if (targetKey) {
        const targetDT = await prisma.docType.findUnique({ where: { key: targetKey } })
        if (targetDT) {
          const labelField = src && typeof src["labelField"] === "string" ? (src["labelField"] as string) : "name"
          const valueField = src && typeof src["valueField"] === "string" ? (src["valueField"] as string) : "id"
          const rows = await prisma.docRecord.findMany({ where: { docTypeId: targetDT.id, ...(selectedBranchId ? { branchId: selectedBranchId } : {}) }, orderBy: { createdAt: "desc" } })
          dynamicOptions[f.key] = rows.map((r) => {
            const d = (r.data ?? {}) as Record<string, unknown>
            const labelRaw = d[labelField]
            const valueRaw = d[valueField]
            const label = typeof labelRaw === "string" ? labelRaw : String(labelRaw ?? r.id)
            const value = typeof valueRaw === "string" ? valueRaw : r.id
            return { label, value }
          })
        }
      } else if (src && typeof src["table"] === "string" && src["table"]) {
        const tableName = String(src["table"]) || ""
        const modelProp = tableName ? (tableName.slice(0, 1).toLowerCase() + tableName.slice(1)) : ""
        const client = prisma as unknown as Record<string, { findMany: (args?: unknown) => Promise<Array<Record<string, unknown>>> }>
        if (modelProp && client && typeof client[modelProp]?.findMany === "function") {
          const labelField = src && typeof src["labelField"] === "string" ? (src["labelField"] as string) : "name"
          const valueField = src && typeof src["valueField"] === "string" ? (src["valueField"] as string) : "id"
          const rows: Array<Record<string, unknown>> = await client[modelProp].findMany()
          dynamicOptions[f.key] = rows.map((r) => {
            const labelRaw = r[labelField]
            const valueRaw = r[valueField]
            const label = typeof labelRaw === "string" ? labelRaw : String(labelRaw ?? r["id"]) 
            const value = typeof valueRaw === "string" ? valueRaw : String(r["id"]) 
            return { label, value }
          })
        }
      }
    }
  }
  const cfgAll = (docType.config ?? {}) as unknown as Record<string, unknown>
  const assignmentEnabled = Boolean(cfgAll["assignmentEnabled"])
  let assignmentUsers: Array<{ id: string; name: string | null; email: string | null }> = []
  if (assignmentEnabled) {
    assignmentUsers = await prisma.user.findMany({
      select: { id: true, name: true, email: true },
      orderBy: { name: "asc" }
    })
  }

  const childDocTypeKey = typeof cfgAll["childDocTypeKey"] === "string" ? (cfgAll["childDocTypeKey"] as string) : ""
  const childDocType = childDocTypeKey ? await prisma.docType.findUnique({ where: { key: childDocTypeKey }, include: { fields: { orderBy: { order: "asc" } } } }) : null
  const childOptions: Record<string, Array<{ label: string; value: string }>> = {}
  if (childDocType) {
    for (const f of childDocType.fields) {
      if (f.type === ("DROPDOWN" as FieldType)) {
        const cfg = (f.config ?? {}) as unknown as { options?: Array<{ label: string; value: string }>; source?: Record<string, unknown> }
        const src = cfg?.source as Record<string, unknown> | undefined
        const targetKey = src && typeof src["key"] === "string" ? (src["key"] as string)
          : src && typeof src["docTypeKey"] === "string" ? (src["docTypeKey"] as string)
          : src && typeof src["target"] === "string" ? (src["target"] as string)
          : ""
        if (targetKey) {
          const targetDT = await prisma.docType.findUnique({ where: { key: targetKey } })
          if (targetDT) {
            const labelField = src && typeof src["labelField"] === "string" ? (src["labelField"] as string) : "name"
            const valueField = src && typeof src["valueField"] === "string" ? (src["valueField"] as string) : "id"
            const rows = await prisma.docRecord.findMany({ where: { docTypeId: targetDT.id, ...(selectedBranchId ? { branchId: selectedBranchId } : {}) }, orderBy: { createdAt: "desc" } })
            childOptions[f.key] = rows.map((r) => {
              const d = (r.data ?? {}) as Record<string, unknown>
              const labelRaw = d[labelField]
              const valueRaw = d[valueField]
              const label = typeof labelRaw === "string" ? labelRaw : String(labelRaw ?? r.id)
              const value = typeof valueRaw === "string" ? valueRaw : r.id
              return { label, value }
            })
          }
        } else if (src && typeof src["table"] === "string" && src["table"]) {
          const tableName = String(src["table"]) || ""
          const modelProp = tableName ? (tableName.slice(0, 1).toLowerCase() + tableName.slice(1)) : ""
          const client = prisma as unknown as Record<string, { findMany: (args?: unknown) => Promise<Array<Record<string, unknown>>> }>
          if (modelProp && client && typeof client[modelProp]?.findMany === "function") {
            const labelField = src && typeof src["labelField"] === "string" ? (src["labelField"] as string) : "name"
            const valueField = src && typeof src["valueField"] === "string" ? (src["valueField"] as string) : "id"
            const rows: Array<Record<string, unknown>> = await client[modelProp].findMany()
            childOptions[f.key] = rows.map((r) => {
              const labelRaw = r[labelField]
              const valueRaw = r[valueField]
              const label = typeof labelRaw === "string" ? labelRaw : String(labelRaw ?? r["id"]) 
              const value = typeof valueRaw === "string" ? valueRaw : String(r["id"]) 
              return { label, value }
            })
          }
        } else if (Array.isArray(cfg.options)) {
          childOptions[f.key] = cfg.options
        }
      }
    }
  }
  const listFields = Array.isArray(cfgAll["listFields"]) ? (cfgAll["listFields"] as string[]) : []
  const filterFields = Array.isArray(cfgAll["filterFields"]) ? (cfgAll["filterFields"] as string[]) : []
  
  const statusRaw = sp?.status
  const statusFilter = typeof statusRaw === "string" ? statusRaw : Array.isArray(statusRaw) ? statusRaw[0] : ""

  const filters: Prisma.DocRecordWhereInput[] = []
  for (const keyField of filterFields) {
    const raw = sp?.[keyField]
    const val = typeof raw === "string" ? raw : Array.isArray(raw) ? raw[0] : ""
    if (!val) continue

    if (keyField === "assignedToId") {
      filters.push({ assignedToId: val })
      continue
    }

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
  const andConditions: Prisma.DocRecordWhereInput[] = []
  if (filters.length > 0) andConditions.push({ AND: filters })
  if (selectedBranchId) {
    andConditions.push({ branchId: selectedBranchId })
  }
  if (!canAssign && user) andConditions.push({ OR: [{ assignedToId: user.id }, { assignedToId: null }] })

  const baseWhere: Prisma.DocRecordWhereInput = {
    docTypeId: docType.id,
    ...(andConditions.length > 0 ? { AND: andConditions } : {}),
  }

  // Summary counts should be calculated BEFORE status filter is applied
  const allRecordsForSummary = await prisma.docRecord.findMany({ 
    where: baseWhere, 
    select: { status: true } 
  })

  const finalWhere: Prisma.DocRecordWhereInput = {
    ...baseWhere,
    ...(statusFilter ? { status: statusFilter } : {})
  }

  const nullBranchCount = canWrite && selectedBranchId ? await prisma.docRecord.count({ where: { docTypeId: docType.id, branchId: null } }) : 0
  const records = await prisma.docRecord.findMany({ 
    where: finalWhere, 
    include: { 
      parent: { select: { id: true, code: true, docType: { select: { name: true, key: true, icon: true } } } }, 
      assignedTo: { select: { name: true, email: true } }, 
      children: true 
    }, 
    orderBy: { createdAt: "desc" } 
  })

  // Extract product names from children for display
  const productIds = new Set<string>()
  for (const r of records) {
    for (const c of r.children) {
      const d = c.data as any
      if (d?.product_id) productIds.add(String(d.product_id))
    }
  }
  const products = await prisma.product.findMany({ where: { id: { in: Array.from(productIds) } }, select: { id: true, name: true } })
  const productMap = new Map(products.map(p => [p.id, p.name]))
  
  const canCreate = permission ? permission.canCreate : true
  const canRead = permission ? permission.canRead : true
  const canDelete = permission ? permission.canDelete : false
  let wfRecord: { config?: unknown } | null = null
  try {
    if (selectedBranchId) {
      wfRecord = await prisma.docWorkflow.findUnique({ where: { docTypeId_branchId: { docTypeId: docType.id, branchId: selectedBranchId } } })
    }
    if (!wfRecord && docType.branchId) {
      wfRecord = await prisma.docWorkflow.findUnique({ where: { docTypeId_branchId: { docTypeId: docType.id, branchId: docType.branchId } } })
    }
    if (!wfRecord) {
      wfRecord = await prisma.docWorkflow.findFirst({ where: { docTypeId: docType.id, branchId: null, isActive: true } })
    }
  } catch {}
  const wfCfg = wfRecord?.config ? ((wfRecord.config as unknown) as { states?: Array<{ name: string }>; transitions?: Array<{ from: string; to: string; roles: string[]; condition?: string }> }) : { states: [], transitions: [] }
  const bulkTargets = (wfCfg.states ?? []).map((s) => ({ label: s.name, value: s.name }))

  const stateNames = (wfCfg.states ?? []).map((s) => s.name)
  const countsByStatus = new Map<string, number>()
  for (const r of allRecordsForSummary) {
    const st = r.status ?? (stateNames[0] ?? "")
    if (!st) continue
    countsByStatus.set(st, (countsByStatus.get(st) ?? 0) + 1)
  }
  const summaryCards = stateNames.map((n) => ({ name: n, count: countsByStatus.get(n) ?? 0 }))

  return (
      <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg border flex items-center justify-center bg-background text-muted-foreground">
            {docType.icon ? <IconDisplay name={docType.icon} className="h-5 w-5" /> : <FileText className="h-5 w-5" />}
          </div>
          <div className="space-y-1">
            <h1 className="text-2xl font-semibold">{docType.name}</h1>
            <div className="text-xs text-muted-foreground">{docType.key} • {docType.branchId ? branches.find((b) => b.id === docType.branchId)?.name ?? "Branch" : "Global"}</div>
          </div>
          {canCreate ? (
            <Link href={`/admin/docs/${docType.key}/new`}>
              <Button type="button">Create New</Button>
            </Link>
          ) : null}
        </div>
        <div className="flex items-center gap-3">
          {permGlobal.has("DOCTYPE_MANAGEMENT") ? (
            <Link href="/admin/doctypes" className="text-sm underline">DocType</Link>
          ) : null}
          <Link href="/admin" className="text-sm underline">Kembali</Link>
          {canWrite ? (
            <form action={normalizeStatuses} className="inline-flex">
              <input type="hidden" name="docTypeKey" value={docType.key} />
              <input type="hidden" name="branchId" value={selectedBranchId ?? ""} />
              <Button type="submit" variant="outline">Sinkronkan Status</Button>
            </form>
          ) : null}
          {canWrite && selectedBranchId && nullBranchCount > 0 ? (
            <form action={migrateNullBranchRecords} className="inline-flex">
              <input type="hidden" name="docTypeKey" value={docType.key} />
              <input type="hidden" name="branchId" value={selectedBranchId} />
              <Button type="submit" variant="outline">{`Migrasi ${nullBranchCount} data (branch kosong)`}</Button>
            </form>
          ) : null}
        </div>
      </div>

      {null}

      {canRead ? (
        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {summaryCards.map((s) => {
              const IconComp = statusIcon(s.name)
              const v = statusBadgeVariant(s.name)
              const colorClass = v === "destructive" ? "text-destructive" : v === "secondary" ? "text-muted-foreground" : v === "default" ? "text-primary" : "text-muted-foreground"
              
              const isActive = statusFilter === s.name
              const params = new URLSearchParams()
              Object.entries(sp).forEach(([k, v]) => {
                if (k !== "status" && v) params.append(k, String(v))
              })
              if (!isActive) params.append("status", s.name)
              const href = `/admin/docs/${docType.key}${params.toString() ? `?${params.toString()}` : ""}`

               return (
                 <Link key={s.name} href={href}>
                   <Card className={cn(
                     "py-4 transition-all hover:shadow-lg hover:shadow-slate-900/5 hover:border-slate-300 cursor-pointer border border-slate-200/80",
                     isActive && "border-primary bg-primary/5 ring-1 ring-primary shadow-md"
                   )}>
                     <CardContent className="flex items-center justify-between">
                       <div className="flex items-center gap-3">
                         <IconComp className={`h-5 w-5 ${colorClass}`} />
                         <div className="text-sm font-semibold text-slate-700">{s.name}</div>
                       </div>
                       <div className="text-[28px] font-bold tracking-tight text-slate-900">{s.count}</div>
                     </CardContent>
                   </Card>
                 </Link>
               )
            })}
          </div>
          
          <Collapsible>
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold">Daftar Dokumen</div>
              <CollapsibleTrigger asChild>
                <Button type="button" variant="outline"><FilterIcon />Filter</Button>
              </CollapsibleTrigger>
            </div>
            <CollapsibleContent>
          <form className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {filterFields.map((k) => {
              if (k === "assignedToId" && assignmentEnabled) {
                const def = typeof sp?.assignedToId === "string" ? sp.assignedToId : ""
                return (
                  <div key={k} className="space-y-2">
                    <Label>Assigned To</Label>
                    <SearchableSelect name={k} placeholder="-" defaultValue={def} options={assignmentUsers.map(u => ({ label: u.name || u.email || "-", value: u.id }))} />
                  </div>
                )
              }
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
              <Button type="submit">Filter</Button>
              <Link href={`/admin/docs/${docType.key}`} className="text-sm underline">Reset</Link>
            </div>
          </form>
            </CollapsibleContent>
          </Collapsible>
          <form id="bulk-form" action={bulkTransitionRecords} className="space-y-3">
            <input type="hidden" name="docTypeKey" value={docType.key} />
            {bulkTargets.length > 0 ? (
              <div className="flex items-center gap-2">
                <SearchableSelect name="targetStatus" placeholder="Pilih status" options={bulkTargets} />
                <Button type="submit">Apply</Button>
              </div>
            ) : null}
          </form>
          <div className="space-y-2">
            {records.length === 0 ? (
              <div className="border rounded p-6 flex items-center gap-2 text-sm text-muted-foreground">
                <FileText className="h-4 w-4" />
                <span>Belum ada data</span>
              </div>
            ) : (
              records.map((r) => (
                <div key={r.id} className="border rounded p-3 flex items-center justify-between">
                  <div className="flex items-start gap-3">
                    <input type="checkbox" name="ids" value={r.id} form="bulk-form" />
                    <div className="space-y-1">
                    <div className="text-xs font-bold">
                        <Link href={`/admin/docs/${docType.key}/${r.id}`} className="hover:underline">
                        {r.code ?? r.id}
                        </Link>
                        {r.children.length > 0 && (
                            <span className="ml-2 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium border border-primary/20">
                                {(() => {
                                    const firstChild = r.children[0]
                                    const d = firstChild.data as any
                                    const pid = d?.product_id
                                    const name = productMap.get(pid) || d?.spec_description || ""
                                    return name ? `${name}${r.children.length > 1 ? ` (+${r.children.length - 1})` : ""}` : ""
                                })()}
                            </span>
                        )}
                    </div>
                    {r.parent ? (
                      <div className="text-xs text-muted-foreground flex items-center gap-1">
                        <span>Parent:</span>
                        {r.parent.docType?.icon ? <IconDisplay name={r.parent.docType.icon} className="h-3 w-3" /> : null}
                        <span>{r.parent.docType?.name ?? r.parent.docType?.key ?? ""} • {r.parent.code ?? r.parent.id}</span>
                      </div>
                    ) : null}
                    {listFields.length > 0 ? (
                      <div className="text-xs">
                        {listFields.map((k) => {
                          if (k === "assignedToId") {
                            const u = (r as any).assignedTo
                            const val = u ? (u.name || u.email) : "-"
                            return (
                              <span key={k} className="inline-block mr-2">Assigned To: {val}</span>
                            )
                          }
                          const f = docType.fields.find((x) => x.key === k)
                          if (!f) return null
                          const d = (r.data ?? {}) as Record<string, unknown>
                          const raw = d[k]
                          let val = "-"
                          if (raw !== undefined && raw !== null) {
                            if (f.type === ("DROPDOWN" as FieldType)) {
                              const cfg = (f.config ?? {}) as unknown as { options?: Array<{ label: string; value: string }> }
                              const opts = dynamicOptions[f.key] ?? (Array.isArray(cfg.options) ? cfg.options : [])
                              const found = opts.find((o) => o.value === String(raw))
                              val = found ? found.label : String(raw)
                            } else if (f.type === ("CHECKBOX" as FieldType)) {
                              val = (raw as boolean) ? "Ya" : "Tidak"
                            } else {
                              val = String(raw)
                            }
                          }
                          return (
                            <span key={k} className="inline-block mr-2">{f.label}: {val}</span>
                          )
                        })}
                      </div>
                    ) : null}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={statusBadgeVariant(r.status ?? "DRAFT")}>{r.status ?? "DRAFT"}</Badge>
                    {String(r.status ?? "DRAFT").toUpperCase().includes("SUBMIT") ? null : (
                      <Button asChild variant="outline"><Link href={`/admin/docs/${docType.key}/${r.id}`}>Ubah</Link></Button>
                    )}
                    {canDelete ? (
                      <form action={deleteRecord}>
                        <input type="hidden" name="id" value={r.id} />
                        <input type="hidden" name="docTypeKey" value={docType.key} />
                        <Button variant="destructive">Hapus</Button>
                      </form>
                    ) : null}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      ) : null}

    </div>
  )
}
