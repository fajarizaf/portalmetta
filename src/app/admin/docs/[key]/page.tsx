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
import { Card, CardContent } from "@/components/ui/card"
import { IconDisplay } from "@/components/icon-display"
import { ImagePreview } from "@/components/image-preview"
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible"

import {
  ArrowLeft,
  ChevronRight,
  Filter as FilterIcon,
  FileText,
  Send,
  XCircle,
  Eye,
  CheckCircle2,
  BadgeCheck,
  PlayCircle,
  Globe,
  Plus,
  Search,
  MoreHorizontal,
  Pencil,
  Trash2,
  Inbox,
  Calendar,
  User as UserIcon,
  ChevronDown,
  Loader2,
} from "lucide-react"
import type { FieldType } from "@/generated/prisma/enums"
import type { LucideIcon } from "lucide-react"
import type { Prisma } from "@/generated/prisma/client"
import { SearchableSelect } from "@/components/ui/select"
import { cn } from "@/lib/utils"

// ============================================================
// SERVER ACTIONS
// ============================================================

async function deleteRecord(formData: FormData) {
  "use server"
  const session = await getServerSession(authOptions)
  const email = session?.user?.email ?? ""
  const me = email ? await prisma.user.findUnique({ where: { email }, include: { role: true } }) : null
  if (!me) return
  const id = String(formData.get("id") || "")
  const key = String(formData.get("docTypeKey") || "")
  const docType = await prisma.docType.findUnique({ where: { key }, include: { permissions: true } })
  if (!docType) return
  const perm = docType.permissions.find((p) => p.roleId === me.roleId)
  if (perm && !perm.canDelete) return
  if (!id) return
  const record = await prisma.docRecord.findUnique({ where: { id } })
  if (!record) return
  try {
    await prisma.docRow.deleteMany({ where: { recordId: id } })
    await prisma.docRecord.delete({ where: { id } })
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
    wf = await prisma.docWorkflow.findFirst({
      where: { docTypeId: docType.id, isActive: true, OR: [{ branchId: docType.branchId ?? null }, { branchId: null }] },
      orderBy: { branchId: "desc" },
    })
  } catch {}
  const cfg = (wf?.config ?? {}) as unknown as {
    states?: Array<{ name: string; updates?: Record<string, string> }>
    transitions?: Array<{ from: string; to: string; roles: string[]; condition?: string }>
  }
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
    wf = await prisma.docWorkflow.findFirst({
      where: { docTypeId: docType.id, isActive: true, OR: [{ branchId: branchId ?? docType.branchId ?? null }, { branchId: null }] },
      orderBy: { branchId: "desc" },
    })
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

// ============================================================
// HELPERS
// ============================================================

type StatusStyle = {
  bg: string
  text: string
  border: string
  icon: LucideIcon
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
    return { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200/60", icon: Send }
  }
  if (s.includes("approve") || s.includes("active") || s.includes("verified") || s.includes("publish") || s.includes("complete")) {
    return { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200/60", icon: CheckCircle2 }
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

// ============================================================
// MAIN PAGE
// ============================================================

export default async function DocsByTypePage({
  params,
  searchParams,
}: {
  params?: Record<string, string | string[] | undefined> | Promise<Record<string, string | string[] | undefined>>
  searchParams?: Record<string, string | string[] | undefined> | Promise<Record<string, string | string[] | undefined>>
}) {
  const session = await getServerSession(authOptions)
  const email = session?.user?.email ?? ""
  const user = email
    ? await prisma.user.findUnique({
        where: { email },
        include: { role: { include: { permissions: { include: { permission: true } } } }, assignedBranches: { include: { branch: true } } },
      })
    : null
  const permGlobal = new Set((user?.role?.permissions ?? []).map((rp) => rp.permission.key))

  if (!permGlobal.has("ADMIN_PANEL_ACCESS") && !permGlobal.has("DOCUMENTS_MANAGEMENT")) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4 text-center">
        <div className="h-16 w-16 rounded-2xl bg-slate-100 flex items-center justify-center">
          <Inbox className="h-8 w-8 text-slate-400" />
        </div>
        <h1 className="text-xl font-semibold text-slate-900">Akses Ditolak</h1>
        <p className="text-sm text-slate-500 max-w-sm">Anda tidak memiliki akses ke halaman dokumen.</p>
      </div>
    )
  }

  const p = ((await params) ?? {}) as Record<string, string | string[] | undefined>
  const sp = ((await searchParams) ?? {}) as Record<string, string | string[] | undefined>
  const keyRaw = p?.key
  const key = typeof keyRaw === "string" ? keyRaw : Array.isArray(keyRaw) ? keyRaw[0] : ""
  if (!key) redirect("/admin/doctypes")

  const docType = await prisma.docType.findUnique({
    where: { key },
    include: { fields: { orderBy: { order: "asc" } }, permissions: true },
  })
  if (!docType) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4 text-center">
        <div className="h-16 w-16 rounded-2xl bg-slate-100 flex items-center justify-center">
          <Inbox className="h-8 w-8 text-slate-400" />
        </div>
        <h1 className="text-xl font-semibold text-slate-900">DocType Tidak Ditemukan</h1>
        <p className="text-sm text-slate-500 max-w-sm">DocType dengan key "{key}" tidak ditemukan.</p>
        {permGlobal.has("DOCTYPE_MANAGEMENT") && (
          <Link href="/admin/doctypes" className="text-sm text-slate-700 hover:text-slate-900 underline underline-offset-4">
            Kembali ke daftar DocType
          </Link>
        )}
      </div>
    )
  }

  const permission = docType.permissions.find((p) => p.roleId === user?.roleId)
  const canWrite = permission ? permission.canWrite : true
  const canAssign =
    (permission ? permission.canAssign : true) || permGlobal.has("ADMIN_PANEL_ACCESS") || permGlobal.has("DOCUMENTS_MANAGEMENT")

  const cookieStore = await cookies()
  const cookieBranchId = cookieStore.get("branchId")?.value

  const isSuper = permGlobal.has("COMPANY_MANAGEMENT")
  const assignedBranches = await prisma.branch.findMany({
    where: { admins: { some: { userId: user?.id ?? "" } } },
    orderBy: { name: "asc" },
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

  const baseBranches =
    assignedBranches.length > 0 && !isSuper
      ? assignedBranches
      : superBranches.length > 0
        ? superBranches
        : await prisma.branch.findMany({ where: { companyId: user?.companyId ?? undefined }, orderBy: { name: "asc" } })

  const branchesMap = new Map<string, { id: string; name: string }>()
  for (const b of baseBranches) branchesMap.set(b.id, { id: b.id, name: b.name })
  for (const b of assignedBranches) branchesMap.set(b.id, { id: b.id, name: b.name })

  const branches = Array.from(branchesMap.values())
  const candidateBranchId = cookieBranchId ?? branches[0]?.id
  const allowedBranchIds = new Set(branches.map((b) => b.id))
  const selectedBranchId = allowedBranchIds.has(String(candidateBranchId)) ? candidateBranchId : branches[0]?.id

  // Build dynamic options for DROPDOWN fields with source
  const dynamicOptions: Record<string, Array<{ label: string; value: string }>> = {}
  for (const f of docType.fields) {
    if (f.type === ("DROPDOWN" as FieldType)) {
      const cfg = (f.config ?? {}) as unknown as { options?: Array<{ label: string; value: string }>; source?: Record<string, unknown> }
      const src = cfg?.source as Record<string, unknown> | undefined
      const targetKey =
        src && typeof src["key"] === "string"
          ? (src["key"] as string)
          : src && typeof src["docTypeKey"] === "string"
            ? (src["docTypeKey"] as string)
            : src && typeof src["target"] === "string"
              ? (src["target"] as string)
              : ""
      if (targetKey) {
        const targetDT = await prisma.docType.findUnique({ where: { key: targetKey } })
        if (targetDT) {
          const labelField = src && typeof src["labelField"] === "string" ? (src["labelField"] as string) : "name"
          const valueField = src && typeof src["valueField"] === "string" ? (src["valueField"] as string) : "id"
          const rows = await prisma.docRecord.findMany({
            where: { docTypeId: targetDT.id, ...(selectedBranchId ? { branchId: selectedBranchId } : {}) },
            orderBy: { createdAt: "desc" },
          })
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
        const modelProp = tableName ? tableName.slice(0, 1).toLowerCase() + tableName.slice(1) : ""
        const client = prisma as unknown as Record<string, { findMany: (args?: unknown) => Promise<Array<Record<string, unknown>>> }>
        if (modelProp && client && typeof client[modelProp]?.findMany === "function") {
          const labelField = src && typeof src["labelField"] === "string" ? (src["labelField"] as string) : "name"
          const valueField = src && typeof src["valueField"] === "string" ? (src["valueField"] as string) : "id"
          const whereClause: Record<string, unknown> = {}
          if (selectedBranchId) {
            if (modelProp === "building") whereClause.branchId = selectedBranchId
            else if (modelProp === "floor") whereClause.building = { branchId: selectedBranchId }
            else if (modelProp === "room") whereClause.floor = { building: { branchId: selectedBranchId } }
          }
          const rows: Array<Record<string, unknown>> = await client[modelProp].findMany({ where: whereClause })
          dynamicOptions[f.key] = rows.map((r) => {
            const labelRaw = r[labelField]
            const valueRaw = r[valueField]
            let label = typeof labelRaw === "string" ? labelRaw : String(labelRaw ?? "")
            if (!label) {
              const fallbacks = [r["name"], r["title"], r["label"], r["level"]]
              for (const fb of fallbacks) {
                if (typeof fb === "string" && fb) { label = fb; break }
                if (typeof fb === "number") { label = `Lantai ${fb}`; break }
              }
              if (!label) label = String(r["id"] ?? "")
            }
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
      orderBy: { name: "asc" },
    })
  }

  const childDocTypeKey = typeof cfgAll["childDocTypeKey"] === "string" ? (cfgAll["childDocTypeKey"] as string) : ""
  const childDocType = childDocTypeKey
    ? await prisma.docType.findUnique({ where: { key: childDocTypeKey }, include: { fields: { orderBy: { order: "asc" } } } })
    : null
  const childOptions: Record<string, Array<{ label: string; value: string }>> = {}
  if (childDocType) {
    for (const f of childDocType.fields) {
      if (f.type === ("DROPDOWN" as FieldType)) {
        const cfg = (f.config ?? {}) as unknown as { options?: Array<{ label: string; value: string }>; source?: Record<string, unknown> }
        const src = cfg?.source as Record<string, unknown> | undefined
        const targetKey =
          src && typeof src["key"] === "string"
            ? (src["key"] as string)
            : src && typeof src["docTypeKey"] === "string"
              ? (src["docTypeKey"] as string)
              : src && typeof src["target"] === "string"
                ? (src["target"] as string)
                : ""
        if (targetKey) {
          const targetDT = await prisma.docType.findUnique({ where: { key: targetKey } })
          if (targetDT) {
            const labelField = src && typeof src["labelField"] === "string" ? (src["labelField"] as string) : "name"
            const valueField = src && typeof src["valueField"] === "string" ? (src["valueField"] as string) : "id"
            const rows = await prisma.docRecord.findMany({
              where: { docTypeId: targetDT.id, ...(selectedBranchId ? { branchId: selectedBranchId } : {}) },
              orderBy: { createdAt: "desc" },
            })
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
          const modelProp = tableName ? tableName.slice(0, 1).toLowerCase() + tableName.slice(1) : ""
          const client = prisma as unknown as Record<string, { findMany: (args?: unknown) => Promise<Array<Record<string, unknown>>> }>
          if (modelProp && client && typeof client[modelProp]?.findMany === "function") {
            const labelField = src && typeof src["labelField"] === "string" ? (src["labelField"] as string) : "name"
            const valueField = src && typeof src["valueField"] === "string" ? (src["valueField"] as string) : "id"
            const whereClause: Record<string, unknown> = {}
            if (selectedBranchId) {
              if (modelProp === "building") whereClause.branchId = selectedBranchId
              else if (modelProp === "floor") whereClause.building = { branchId: selectedBranchId }
              else if (modelProp === "room") whereClause.floor = { building: { branchId: selectedBranchId } }
            }
            const rows: Array<Record<string, unknown>> = await client[modelProp].findMany({ where: whereClause })
            childOptions[f.key] = rows.map((r) => {
              const labelRaw = r[labelField]
              const valueRaw = r[valueField]
              let label = typeof labelRaw === "string" ? labelRaw : String(labelRaw ?? "")
              if (!label) {
                const fallbacks = [r["name"], r["title"], r["label"], r["level"]]
                for (const fb of fallbacks) {
                  if (typeof fb === "string" && fb) { label = fb; break }
                  if (typeof fb === "number") { label = `Lantai ${fb}`; break }
                }
                if (!label) label = String(r["id"] ?? "")
              }
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
  const searchQuery = typeof sp?.q === "string" ? sp.q : ""

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

  const allRecordsForSummary = await prisma.docRecord.findMany({
    where: baseWhere,
    select: { status: true },
  })

  const finalWhere: Prisma.DocRecordWhereInput = {
    ...baseWhere,
    ...(statusFilter ? { status: statusFilter } : {}),
  }

  const nullBranchCount = canWrite && selectedBranchId
    ? await prisma.docRecord.count({ where: { docTypeId: docType.id, branchId: null } })
    : 0
  const records = await prisma.docRecord.findMany({
    where: finalWhere,
    include: {
      parent: { select: { id: true, code: true, docType: { select: { name: true, key: true, icon: true } } } },
      assignedTo: { select: { name: true, email: true } },
      children: true,
    },
    orderBy: { createdAt: "desc" },
  })

  const productIds = new Set<string>()
  for (const r of records) {
    for (const c of r.children) {
      const d = c.data as any
      if (d?.product_id) productIds.add(String(d.product_id))
    }
  }
  const products = await prisma.product.findMany({ where: { id: { in: Array.from(productIds) } }, select: { id: true, name: true } })
  const productMap = new Map(products.map((p) => [p.id, p.name]))

  const canCreate = permission ? permission.canCreate : true
  const canRead = permission ? permission.canRead : true
  const canDelete = permission ? permission.canDelete : false

  let wfRecord: { config?: unknown } | null = null
  try {
    if (selectedBranchId) {
      wfRecord = await prisma.docWorkflow.findUnique({
        where: { docTypeId_branchId: { docTypeId: docType.id, branchId: selectedBranchId } },
      })
    }
    if (!wfRecord && docType.branchId) {
      wfRecord = await prisma.docWorkflow.findUnique({
        where: { docTypeId_branchId: { docTypeId: docType.id, branchId: docType.branchId } },
      })
    }
    if (!wfRecord) {
      wfRecord = await prisma.docWorkflow.findFirst({ where: { docTypeId: docType.id, branchId: null, isActive: true } })
    }
  } catch {}
  const wfCfg = wfRecord?.config
    ? ((wfRecord.config as unknown) as { states?: Array<{ name: string }>; transitions?: Array<{ from: string; to: string; roles: string[]; condition?: string }> })
    : { states: [], transitions: [] }
  const bulkTargets = (wfCfg.states ?? []).map((s) => ({ label: s.name, value: s.name }))

  const stateNames = (wfCfg.states ?? []).map((s) => s.name)
  const countsByStatus = new Map<string, number>()
  for (const r of allRecordsForSummary) {
    const st = r.status ?? (stateNames[0] ?? "")
    if (!st) continue
    countsByStatus.set(st, (countsByStatus.get(st) ?? 0) + 1)
  }
  const summaryCards = stateNames.map((n) => ({ name: n, count: countsByStatus.get(n) ?? 0 }))

  const branchName = selectedBranchId
    ? branches.find((b) => b.id === selectedBranchId)?.name ?? "Branch"
    : "All Branches"

  const totalCount = summaryCards.reduce((sum, c) => sum + c.count, 0)
  const filteredCount = records.length

  return (
    <div className="min-h-screen bg-slate-50/30 -m-4 sm:-m-6 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Link href="/admin" className="hover:text-slate-900 transition-colors flex items-center gap-1">
              <ArrowLeft className="h-3.5 w-3.5" />
              Admin
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-slate-300" />
            <span className="text-slate-900 font-medium">{docType.name}</span>
          </div>

          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-2xl bg-white border border-slate-200/80 flex items-center justify-center">
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
                  <span>{branchName}</span>
                  <span>·</span>
                  <span>{totalCount} total</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {canCreate && (
                <Link href={`/admin/docs/${docType.key}/new`}>
                  <Button className="bg-slate-900 hover:bg-slate-800 text-white shadow-sm h-9 px-4">
                    <Plus className="h-4 w-4 mr-2" />
                    Create New
                  </Button>
                </Link>
              )}
            </div>
          </div>

          {/* Utility actions */}
          <div className="flex items-center gap-2 flex-wrap">
            {canWrite && (
              <form action={normalizeStatuses} className="inline-flex">
                <input type="hidden" name="docTypeKey" value={docType.key} />
                <input type="hidden" name="branchId" value={selectedBranchId ?? ""} />
                <Button type="submit" variant="ghost" size="sm" className="text-slate-600 hover:text-slate-900 h-8">
                  <Loader2 className="h-3.5 w-3.5 mr-1.5" />
                  Sync Status
                </Button>
              </form>
            )}
            {canWrite && selectedBranchId && nullBranchCount > 0 && (
              <form action={migrateNullBranchRecords} className="inline-flex">
                <input type="hidden" name="docTypeKey" value={docType.key} />
                <input type="hidden" name="branchId" value={selectedBranchId} />
                <Button type="submit" variant="ghost" size="sm" className="text-amber-600 hover:text-amber-700 h-8">
                  Migrate {nullBranchCount} records
                </Button>
              </form>
            )}
            {permGlobal.has("DOCTYPE_MANAGEMENT") && (
              <Link
                href="/admin/doctypes"
                className="text-xs text-slate-500 hover:text-slate-900 transition-colors h-8 px-2 inline-flex items-center"
              >
                Manage DocType
              </Link>
            )}
          </div>
        </div>

        {/* Stats Cards */}
        {canRead && summaryCards.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {summaryCards.map((s) => {
              const IconComp = statusIcon(s.name)
              const isActive = statusFilter === s.name
              const params = new URLSearchParams()
              Object.entries(sp).forEach(([k, v]) => {
                if (k !== "status" && v) params.append(k, String(v))
              })
              if (!isActive) params.append("status", s.name)
              const href = `/admin/docs/${docType.key}${params.toString() ? `?${params.toString()}` : ""}`

              return (
                <Link key={s.name} href={href} className="group">
                  <div
                    className={cn(
                      "relative bg-white rounded-xl border p-4 transition-all duration-200",
"border-slate-200/80 hover:border-slate-300",
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
                          <IconComp className="h-4 w-4" />
                        </div>
                        <span className={cn("text-sm font-medium", isActive ? "text-slate-900" : "text-slate-600")}>
                          {s.name}
                        </span>
                      </div>
                      <span
                        className={cn(
                          "text-2xl font-semibold tracking-tight tabular-nums",
                          isActive ? "text-slate-900" : "text-slate-900"
                        )}
                      >
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
        {canRead && (
          <div className="bg-white rounded-xl border border-slate-200/80">
            <div className="p-3 flex items-center gap-2 flex-wrap">
              <form className="flex-1 min-w-[200px] relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  name="q"
                  defaultValue={searchQuery}
                  placeholder="Search by code, customer, or any field..."
                  className="pl-10 h-9 border-slate-200 bg-slate-50/50 focus-visible:bg-white"
                />
              </form>

              {statusFilter && (
                <Link
                  href={`/admin/docs/${docType.key}`}
                  className="inline-flex items-center gap-1.5 h-9 px-3 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors"
                >
                  <span>Filter: {statusFilter}</span>
                  <XCircle className="h-3.5 w-3.5" />
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
                      {filterFields.map((k) => {
                        if (k === "assignedToId" && assignmentEnabled) {
                          const def = typeof sp?.assignedToId === "string" ? sp.assignedToId : ""
                          return (
                            <div key={k} className="space-y-1.5">
                              <Label className="text-xs text-slate-600">Assigned To</Label>
                              <SearchableSelect
                                name={k}
                                placeholder="-"
                                defaultValue={def}
                                options={assignmentUsers.map((u) => ({ label: u.name || u.email || "-", value: u.id }))}
                              />
                            </div>
                          )
                        }
                        const f = docType.fields.find((x) => x.key === k)
                        if (!f) return null
                        const def = (() => {
                          const raw = sp?.[k]
                          return typeof raw === "string" ? raw : Array.isArray(raw) ? raw[0] : ""
                        })()
                        if (
                          f.type === ("TEXT" as FieldType) ||
                          f.type === ("TEXTAREA" as FieldType) ||
                          f.type === ("LINK" as FieldType)
                        ) {
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
                              <SearchableSelect
                                name={k}
                                defaultValue={def}
                                options={[
                                  { label: "Ya", value: "true" },
                                  { label: "Tidak", value: "false" },
                                ]}
                              />
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
                          Apply Filters
                        </Button>
                        <Link
                          href={`/admin/docs/${docType.key}`}
                          className="text-sm text-slate-500 hover:text-slate-900 transition-colors"
                        >
                          Reset
                        </Link>
                      </div>
                    </form>
                  </div>
                </CollapsibleContent>
              </Collapsible>

              {bulkTargets.length > 0 && canWrite && (
                <form id="bulk-form" action={bulkTransitionRecords} className="flex items-center gap-1.5">
                  <input type="hidden" name="docTypeKey" value={docType.key} />
                  <SearchableSelect name="targetStatus" placeholder="Bulk action..." options={bulkTargets} className="min-w-[160px]" />
                  <Button type="submit" size="sm" variant="outline" className="h-9 border-slate-200">
                    Apply
                  </Button>
                </form>
              )}
            </div>
          </div>
        )}

        {/* Records List */}
        {canRead && (
          <div className="space-y-2">
            {records.length === 0 ? (
              <div className="bg-white rounded-xl border border-slate-200/80 border-dashed py-16 flex flex-col items-center justify-center text-center">
                <div className="h-12 w-12 rounded-full bg-slate-50 flex items-center justify-center mb-3">
                  <Inbox className="h-6 w-6 text-slate-400" />
                </div>
                <h3 className="text-sm font-medium text-slate-900">No records found</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-sm">
                  {searchQuery || statusFilter || filters.length > 0
                    ? "Try adjusting your filters or search query"
                    : `Get started by creating your first ${docType.name.toLowerCase()}`}
                </p>
                {canCreate && !searchQuery && !statusFilter && filters.length === 0 && (
                  <Link href={`/admin/docs/${docType.key}/new`}>
                    <Button size="sm" className="mt-4 bg-slate-900 hover:bg-slate-800">
                      <Plus className="h-3.5 w-3.5 mr-1.5" />
                      Create {docType.name}
                    </Button>
                  </Link>
                )}
              </div>
            ) : (
              records.map((r) => {
                const data = (r.data ?? {}) as Record<string, unknown>
                const visitors = Array.isArray(data["visitors"])
                  ? (data["visitors"] as Array<Record<string, unknown>>)
                  : []
                const firstVisitor = visitors[0]
                const visitorName = firstVisitor
                  ? String(firstVisitor["visitor_name"] || "N/A")
                  : "-"
                const statusName = r.status ?? "DRAFT"
                const style = getStatusStyle(statusName)
                const StatusIcon = style.icon

                return (
                  <div
                    key={r.id}
                    className="group bg-white rounded-xl border border-slate-200/80 hover:border-slate-300 transition-all duration-200"
                  >
                    <div className="p-4 flex items-center gap-4">
                      {/* Checkbox for bulk select */}
                      <input
                        type="checkbox"
                        name="ids"
                        value={r.id}
                        form="bulk-form"
                        className="h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900 cursor-pointer"
                      />

                      {/* Main content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                          <Link
                            href={`/admin/docs/${docType.key}/${r.id}`}
                            className="font-mono text-sm font-medium text-slate-900 hover:text-slate-700 transition-colors"
                          >
                            {r.code ?? r.id.slice(0, 8)}
                          </Link>
                          <span
                            className={cn(
                              "inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium border",
                              style.bg,
                              style.text,
                              style.border
                            )}
                          >
                            <StatusIcon className="h-3 w-3" />
                            {statusName}
                          </span>
                          {r.children.length > 0 && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium bg-slate-50 text-slate-600 border border-slate-200/60">
                              {(() => {
                                const firstChild = r.children[0]
                                const d = firstChild.data as any
                                const pid = d?.product_id
                                const name = productMap.get(pid) || d?.spec_description || ""
                                return name
                                  ? `${name}${r.children.length > 1 ? ` +${r.children.length - 1}` : ""}`
                                  : `${r.children.length} item${r.children.length > 1 ? "s" : ""}`
                              })()}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-4 text-xs text-slate-500 flex-wrap">
                          {r.parent && (
                            <div className="flex items-center gap-1">
                              <span className="text-slate-400">Parent:</span>
                              {r.parent.docType?.icon ? (
                                <IconDisplay name={r.parent.docType.icon} className="h-3 w-3" />
                              ) : null}
                              <span className="text-slate-700">{r.parent.docType?.name ?? r.parent.docType?.key}</span>
                              <span className="text-slate-400">·</span>
                              <span className="font-mono">{r.parent.code ?? r.parent.id.slice(0, 8)}</span>
                            </div>
                          )}
                          {listFields.slice(0, 4).map((k) => {
                            if (k === "assignedToId") {
                              const u = (r as any).assignedTo
                              const val = u ? u.name || u.email : "-"
                              return (
                                <div key={k} className="flex items-center gap-1">
                                  <UserIcon className="h-3 w-3 text-slate-400" />
                                  <span className="text-slate-700">{val}</span>
                                </div>
                              )
                            }
                            const f = docType.fields.find((x) => x.key === k)
                            if (!f) return null
                            const raw = data[k]
                            let val: React.ReactNode = "-"
                            let isDate = false
                            if (raw !== undefined && raw !== null) {
                              if (f.type === ("DROPDOWN" as FieldType)) {
                                const cfg = (f.config ?? {}) as unknown as { options?: Array<{ label: string; value: string }> }
                                const opts = dynamicOptions[f.key] ?? (Array.isArray(cfg.options) ? cfg.options : [])
                                const found = opts.find((o) => o.value === String(raw))
                                val = found ? found.label : String(raw)
                              } else if (f.type === ("CHECKBOX" as FieldType)) {
                                val = raw ? "Ya" : "Tidak"
                              } else if (f.type === ("ATTACHMENT" as FieldType) && raw) {
                                val = <ImagePreview src={raw as string} alt={f.label} />
                              } else if (f.type === ("DATE" as FieldType)) {
                                val = String(raw)
                                isDate = true
                              } else {
                                val = String(raw)
                              }
                            }
                            return (
                              <div key={k} className="flex items-center gap-1.5">
                                {isDate && <Calendar className="h-3 w-3 text-slate-400" />}
                                <span className="text-slate-400">{f.label}:</span>
                                <span className="text-slate-700 font-medium">{val}</span>
                              </div>
                            )
                          })}
                          {listFields.length > 4 && (
                            <span className="text-slate-400 text-xs">+{listFields.length - 4} more</span>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        {String(r.status ?? "DRAFT").toUpperCase().includes("SUBMIT") ? null : (
                          <Link href={`/admin/docs/${docType.key}/${r.id}`}>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-slate-900">
                              <Pencil className="h-4 w-4" />
                            </Button>
                          </Link>
                        )}
                        {canDelete && (
                          <form action={deleteRecord} className="inline-flex">
                            <input type="hidden" name="id" value={r.id} />
                            <input type="hidden" name="docTypeKey" value={docType.key} />
                            <Button
                              type="submit"
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-slate-400 hover:text-red-600"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </form>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        )}
      </div>
    </div>
  )
}
