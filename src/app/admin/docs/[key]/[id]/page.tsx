import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { getLogoDataUri } from "@/lib/server-utils"
import type { FieldType } from "@/generated/prisma/enums"
import type { Prisma } from "@/generated/prisma/client"
import { SearchableSelect } from "@/components/ui/select"
import DependentDropdown from "@/components/dependent-dropdown"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog"
import { FormDialog } from "@/components/form-dialog"
import QuotationItemSpecs from "@/components/quotation-item-specs"
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible"
import { runDocEventHook } from "@/lib/doc-hooks"
import { Package, FileText, Check, Info, Send, LifeBuoy, ArrowLeft, Plus, Edit, Mail, ChevronRight, Eye, XCircle, CheckCircle2, BadgeCheck, PlayCircle, Globe } from "lucide-react";
import { IconDisplay } from "@/components/icon-display"
import { FormValidationProvider } from "@/components/form-validation-context"
import { ValidatedButton } from "@/components/validated-button"
import { WorkflowSubmitter } from "@/components/workflow-submitter"
import { AssignmentSelector } from "@/components/assignment-selector"
import { DocCalculator } from "@/components/admin/doc-calculator"
import { sendDocumentEmail, generatePDFFromHTML } from "@/lib/mail"
import { buildDefaultHtml, renderFromTemplate } from "@/lib/doc-renderer"
import { getDocPreviewData } from "@/lib/doc-data"
import { getSubscriptionBillingPreview } from "@/lib/invoice-generator"
import { ImagePreview } from "@/components/image-preview"
import { SubscriptionBillingActions } from "@/components/admin/subscription-billing-actions"
import * as React from "react"

function formatIDR(value: unknown): string {
  const num = typeof value === "number" ? value : Number(value ?? 0)
  if (!Number.isFinite(num)) return String(value ?? "")
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", currencyDisplay: "code", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(num)
}

function parseIDR(raw: string): number | null {
  if (!raw) return null
  let s = String(raw).trim()
  s = s.replace(/^IDR\s*/i, "")
  s = s.replace(/^Rp\.?\s*/i, "")
  s = s.replace(/\./g, "")
  s = s.replace(/,/g, ".")
  const n = Number(s)
  return Number.isNaN(n) ? null : n
}
function isPriceLikeKey(key: string): boolean {
  const k = String(key || "").toLowerCase()
  return k === "nrc" || k === "mrc" || k === "subtotal_nrc" || k === "sub_total_nrc" || k === "subtotal_mrc" || k === "sub_total_mrc" || k === "price" || k === "unit_price"
}

function getDiscountPercent(d: Record<string, unknown>): number {
  const raw = d["discount_percent"] ?? d["discount_pct"] ?? d["discountPercentage"] ?? d["discount"] ?? d["disc"]
  const n = typeof raw === "number" ? raw : Number(raw ?? 0)
  return Number.isFinite(n) ? n : 0
}

function computeInvoiceSubtotalFromRows(rows: Array<{ data?: unknown; childDocTypeId?: string | null }>): number {
  const itemRows = rows.filter((r) => {
    const d = (r.data ?? {}) as Record<string, unknown>
    if (typeof d["subtotal"] === "number") return true
    if (d["price"] != null || d["unit_price"] != null) return true
    if (d["qty"] != null) return true
    return false
  })
  return itemRows.reduce((acc, r) => {
    const d = (r.data ?? {}) as Record<string, unknown>
    const qtyRaw = d["qty"]
    const priceRaw = d["price"] ?? d["unit_price"]
    const qty = typeof qtyRaw === "number" ? qtyRaw : Number(qtyRaw ?? 0)
    const price = typeof priceRaw === "number" ? priceRaw : Number(priceRaw ?? 0)
    const disc = getDiscountPercent(d)
    const fallbackSubtotal = qty * price * (disc ? (1 - disc / 100) : 1)
    const subRaw = d["subtotal"]
    const subtotal = typeof subRaw === "number" ? subRaw : Number(subRaw ?? fallbackSubtotal ?? 0)
    return acc + (Number.isFinite(subtotal) ? subtotal : 0)
  }, 0)
}

function findFirstFieldKey(fields: Array<{ key: string }>, candidates: string[]): string {
  const lowered = new Map(fields.map((f) => [f.key.toLowerCase(), f.key]))
  for (const c of candidates) {
    const k = lowered.get(c.toLowerCase())
    if (k) return k
  }
  return ""
}

function statusBadgeVariant(name: string): "default" | "secondary" | "destructive" | "outline" {
  const s = String(name || "").toLowerCase()
  if (s.includes("cancel")) return "destructive"
  if (s.includes("submit")) return "secondary"
  if (s.includes("draft")) return "outline"
  if (s.includes("review") || s.includes("approve") || s.includes("verified") || s.includes("active") || s.includes("publish")) return "default"
  return "outline"
}

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
    return { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200/60", icon: Send }
  }
  if (s.includes("approve") || s.includes("active") || s.includes("verified") || s.includes("publish") || s.includes("complete")) {
    return { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200/60", icon: CheckCircle2 }
  }
  return { bg: "bg-slate-50", text: "text-slate-600", border: "border-slate-200/60", icon: FileText }
}

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

function evalCondition(expr: string | undefined, dataObj: Record<string, unknown>): boolean {
  if (!expr) return true
  const orGroups = expr.split(/\|\|/).map((g) => g.trim()).filter(Boolean)
  for (const g of orGroups) {
    const andParts = g.split(/&&|\band\b/).map((p) => p.trim()).filter(Boolean)
    let ok = true
    for (const p of andParts) { if (!evalAtomic(p, dataObj)) { ok = false; break } }
    if (ok) return true
  }
  return false
}

function norm(s: unknown): string { return String(s ?? "").trim().toLowerCase() }

async function processTransition(
  key: string,
  recordId: string,
  target: string,
  me: { id: string; name?: string | null; email?: string | null; role: { name: string } }
) {
  const docType = await prisma.docType.findUnique({ where: { key } })
  if (!docType || !recordId || !target) return
  const record = await prisma.docRecord.findUnique({ where: { id: recordId } })
  if (!record) return
  let wf: { config?: unknown; dontOverrideStatus?: boolean; isActive?: boolean } | null = null
  try {
    if (record.branchId) {
      const cand = await prisma.docWorkflow.findUnique({ where: { docTypeId_branchId: { docTypeId: docType.id, branchId: record.branchId } } })
      if (cand) wf = cand
    }
    if (!wf && docType.branchId) {
      const cand = await prisma.docWorkflow.findUnique({ where: { docTypeId_branchId: { docTypeId: docType.id, branchId: docType.branchId } } })
      if (cand) wf = cand
    }
    if (!wf) {
      wf = await prisma.docWorkflow.findFirst({ where: { docTypeId: docType.id, branchId: null, isActive: true } })
    }
    if (!wf) {
      wf = await prisma.docWorkflow.findFirst({ where: { docTypeId: docType.id, branchId: null } })
    }
  } catch {}
  if (!wf) {
    redirect(`/admin/docs/${key}/${recordId}?toast=${encodeURIComponent("Workflow aktif tidak ditemukan")}&toastType=error`)
  }
  const cfg = (wf?.config ?? {}) as unknown as { states?: Array<{ name: string; docStatus?: number; updates?: Record<string, string>; actions?: string[] }>; transitions?: Array<{ from: string; to: string; roles: string[]; condition?: string }> }
  const stateNames = (cfg.states ?? []).map((s) => s.name)
  let currentRaw = record.status ?? (stateNames[0] ?? undefined)
  if (!currentRaw) return

  // Case-insensitive match for current status
  const currentMatch = stateNames.find(s => norm(s) === norm(currentRaw))
  let current = currentMatch ?? (stateNames[0] ?? currentRaw)
  
  const dataObj = (record.data ?? {}) as Record<string, unknown>
  
  const allowed = (cfg.transitions ?? []).find((t) => {
      const matchFrom = norm(t.from) === norm(current)
      const matchTo = norm(t.to) === norm(target)
      const matchRole = (t.roles ?? []).some((r) => norm(r) === norm(me.role.name))
      const matchCond = evalCondition(t.condition, dataObj)
      return matchFrom && matchTo && matchRole && matchCond
  })
  
  if (!allowed) {
    redirect(`/admin/docs/${key}/${recordId}?toast=${encodeURIComponent("Transisi tidak diizinkan")}&toastType=error`)
  }
  const targetState = (cfg.states ?? []).find((s) => norm(s.name) === norm(target))
  if (!targetState) {
    redirect(`/admin/docs/${key}/${recordId}?toast=${encodeURIComponent("State tujuan tidak dikenal")}&toastType=error`)
  }
  const nextDocStatus = typeof targetState?.docStatus === "number" ? targetState?.docStatus : undefined
  const updates = (targetState?.updates ?? {}) as Record<string, string>
  const newData = { ...dataObj }
  for (const k of Object.keys(updates)) { newData[k] = updates[k] }
  const actor = (me.name || me.email || "-")
  const actRaw = (newData["__activity"] ?? []) as unknown
  const activities: Array<{ at: string; text: string }> = Array.isArray(actRaw) ? (actRaw as Array<{ at: string; text: string }>) : []
  activities.push({ at: new Date().toISOString(), text: `Status diubah: ${current} → ${target} oleh ${actor}` })
  const prevDocStatus = typeof record.docStatus === "number" ? record.docStatus : undefined
  if (prevDocStatus !== nextDocStatus && nextDocStatus !== undefined && !wf?.dontOverrideStatus) {
    activities.push({ at: new Date().toISOString(), text: `DocStatus diubah: ${String(prevDocStatus ?? "-")} → ${String(nextDocStatus)} oleh ${actor}` })
  }
  newData["__activity"] = activities
  await prisma.docRecord.update({ where: { id: recordId }, data: { status: target, docStatus: wf?.dontOverrideStatus ? undefined : nextDocStatus, data: newData as Prisma.InputJsonValue, updatedById: me.id } })
  if (key) {
    const t = target.toUpperCase()
    let ranSubmit = false
    if (t.includes("CANCEL")) {
      await runDocEventHook("on_cancel", key, recordId, me.id)
    } else if (t.includes("SUBMIT")) {
      await runDocEventHook("on_submit", key, recordId, me.id)
      ranSubmit = true
    } else if (t.includes("APPROVE") || t.includes("COMPLETE")) {
      await runDocEventHook("on_approve", key, recordId, me.id)
    } else {
      await runDocEventHook("validate", key, recordId, me.id)
    }
    const actionsForTarget = (cfg.states ?? []).find((s) => s.name === target)?.actions ?? []
    if (!ranSubmit && actionsForTarget.some((a) => /^create\s*:/i.test(a))) {
      await runDocEventHook("on_submit", key, recordId, me.id)
    }
  }
  const notifyCfg = ((docType.config ?? {}) as unknown as { notifyConfig?: { toastEnabled?: boolean } }).notifyConfig
  const toastMsg = `Status diubah ke ${target}`
  if (notifyCfg?.toastEnabled) {
    redirect(`/admin/docs/${key}/${recordId}?toast=${encodeURIComponent(toastMsg)}&toastType=success`)
  }
}

async function updateRecord(formData: FormData) {
  "use server"
  try {
    const session = await getServerSession(authOptions)
    const email = session?.user?.email ?? ""
    const me = email ? await prisma.user.findUnique({ where: { email }, include: { role: { include: { permissions: { include: { permission: true } } } } } }) : null
    if (!me) return
    const permGlobal = new Set((me.role?.permissions ?? []).map((rp) => rp.permission.key))
    const key = String(formData.get("docTypeKey") || "")
    const id = String(formData.get("id") || "")
    const docType = await prisma.docType.findUnique({ where: { key }, include: { fields: true, permissions: true } })
    if (!docType || !id) return
    const perm = docType.permissions.find((p) => p.roleId === me.roleId)
    const canWriteEffective = (perm ? perm.canWrite : true) || permGlobal.has("ADMIN_PANEL_ACCESS") || permGlobal.has("DOCUMENTS_MANAGEMENT")
    if (!canWriteEffective && !String(formData.get("targetStatus") || "")) return
    const prev = await prisma.docRecord.findUnique({ where: { id } })
    if (!prev) return
    
    const isSubmitted = String(prev.status ?? "").toUpperCase().includes("SUBMIT")
    const targetStatus = String(formData.get("targetStatus") || "")
    const currentStatusUpper = String(prev.status || "DRAFT").toUpperCase()
    let wfRecord: { config?: unknown; isActive?: boolean } | null = null
    try {
      if (prev.branchId) {
        const cand = await prisma.docWorkflow.findUnique({ where: { docTypeId_branchId: { docTypeId: docType.id, branchId: prev.branchId } } })
        wfRecord = cand ?? null
      }
      if (!wfRecord && docType.branchId) {
        const cand = await prisma.docWorkflow.findUnique({ where: { docTypeId_branchId: { docTypeId: docType.id, branchId: docType.branchId } } })
        wfRecord = cand ?? null
      }
      if (!wfRecord) wfRecord = await prisma.docWorkflow.findFirst({ where: { docTypeId: docType.id, branchId: null, isActive: true } })
      if (!wfRecord) wfRecord = await prisma.docWorkflow.findFirst({ where: { docTypeId: docType.id, branchId: null } })
    } catch {}
    const wfCfg = wfRecord?.config
      ? ((wfRecord.config as unknown) as { states?: Array<{ name: string; docStatus?: number }> })
      : { states: [] }
    const stateNames = (wfCfg.states ?? []).map((s) => s.name)
    const currentStatusRaw = prev.status ?? (stateNames[0] ?? "DRAFT")
    const currentMatch = stateNames.find((s) => norm(s) === norm(currentStatusRaw))
    const currentStatus = currentMatch ?? (stateNames[0] ?? currentStatusRaw)
    const currentState = (wfCfg.states ?? []).find((s) => norm(s.name) === norm(currentStatus))
    const effectiveDocStatus = typeof currentState?.docStatus === "number" ? currentState.docStatus : prev.docStatus
    const isEditableServer = typeof effectiveDocStatus === "number"
      ? effectiveDocStatus === 0
      : (currentStatusUpper === "DRAFT" || !prev.status)

    if (!isEditableServer && !targetStatus) {
      redirect(`/admin/docs/${key}/${id}?toast=${encodeURIComponent("Dokumen tidak dapat diubah")}&toastType=error`)
    }

    const wasSubmitted = isSubmitted

    if (isEditableServer) {
      const prevDataObj = (prev.data ?? {}) as Record<string, unknown>
      const payload: Record<string, unknown> = {}
      for (const f of docType.fields) {
        if (key === "invoice" && (
          f.key === "subscription_id" || f.key === "subscription" || f.key === "subscriptionId" ||
          f.key === "prorate_details" || f.key === "prorateDetails" ||
          f.key === "billing_period_start" || f.key === "billing_period_end" ||
          f.key === "nrc_amount" || f.key === "mrc_amount"
        )) continue
        if (f.readOnly) continue
        
        if (f.type !== ("CHECKBOX" as FieldType) && !formData.has(f.key)) {
          const existingVal = (() => {
               if (f.key in prevDataObj) return prevDataObj[f.key]
               const foundKey = Object.keys(prevDataObj).find(k => k.toLowerCase() === f.key.toLowerCase())
               return foundKey ? prevDataObj[foundKey] : undefined
          })()
          const isEmptyInDb = existingVal === undefined || existingVal === null || String(existingVal).trim() === ""
          if (f.required && isEmptyInDb) {
             redirect(`/admin/docs/${key}/${id}?toast=${encodeURIComponent(`Lengkapi field wajib: ${f.label}`)}&toastType=error`)
          }
          continue
        }

        if (f.type === ("CHECKBOX" as FieldType)) {
          const raw = String(formData.get(f.key) || "")
          payload[f.key] = raw === "on"
          continue
        }
        if (f.type === ("ATTACHMENT" as FieldType)) {
          const file = formData.get(f.key) as File | null
          if (file && file.size > 0 && file.name) {
            payload[f.key] = file.name
          } else {
             const existingVal = prevDataObj[f.key]
             if (f.required && (!existingVal || String(existingVal).trim() === "")) {
                 redirect(`/admin/docs/${key}/${id}?toast=${encodeURIComponent(`Lengkapi field wajib: ${f.label}`)}&toastType=error`)
             }
          }
          continue
        }
        const raw = String(formData.get(f.key) || "")
        if (f.required && !raw) {
          redirect(`/admin/docs/${key}/${id}?toast=${encodeURIComponent(`Lengkapi field wajib: ${f.label}`)}&toastType=error`)
        }
        if (f.type === ("PRICE" as FieldType) || isPriceLikeKey(f.key)) {
          const parsed = parseIDR(raw)
          payload[f.key] = parsed != null ? parsed : (raw ? Number(raw) : null)
        } else if (f.type === ("NUMBER" as FieldType)) {
          payload[f.key] = raw ? Number(raw) : null
        } else {
          payload[f.key] = raw
        }
      }
      if (key === "invoice") {
        const rows = await prisma.docRow.findMany({ where: { recordId: id }, orderBy: { idx: "asc" } })
        const subtotal = computeInvoiceSubtotalFromRows(rows.map((r) => ({ data: r.data as unknown, childDocTypeId: r.childDocTypeId })))
        const taxKey = findFirstFieldKey(docType.fields, ["tax", "ppn", "vat"])
        const rawTax = taxKey ? (payload[taxKey] ?? prevDataObj[taxKey]) : 0
        const tax = typeof rawTax === "number" ? rawTax : Number(rawTax ?? 0)
        const subtotalKey = findFirstFieldKey(docType.fields, ["subtotal", "sub_total", "sub_total_amount", "subtotal_amount"])
        const totalKey = findFirstFieldKey(docType.fields, ["total_amount", "totalamount", "grand_total", "grandtotal", "total"])
        if (subtotalKey) payload[subtotalKey] = subtotal
        if (totalKey) payload[totalKey] = subtotal + (Number.isFinite(tax) ? tax : 0)
      }
      function evalFormula(formula?: string, vars?: Record<string, unknown>): number | null {
        if (!formula || !vars) return null
        const allowedFns = new Set(["round","floor","ceil","min","max"])
        let expr = formula.replace(/\^/g, "**")
        expr = expr.replace(/\b([A-Za-z_][A-Za-z0-9_]*)\b/g, (m) => {
          if (allowedFns.has(m)) return `Math.${m}`
          return `get("${m}")`
        })
        try {
          const fn = new Function("get","Math", `return ( ${expr} )`)
          const res = fn((k: string) => {
            const v = vars[k]
            if (typeof v === "number") return v
            if (typeof v === "string") { const n = Number(v); return Number.isNaN(n) ? 0 : n }
            if (typeof v === "boolean") return v ? 1 : 0
            return 0
          }, Math)
          return (typeof res === "number" && Number.isFinite(res)) ? res : null
        } catch { return null }
      }
      for (const f of docType.fields) {
        if (!f.readOnly) continue
        const cfg = (f.config ?? {}) as unknown as { compute?: { formula?: string } }
        const formula = cfg.compute?.formula
        const val = evalFormula(formula, payload)
        if (val != null) {
          payload[f.key] = val
        }
      }
      const merged = { ...prevDataObj, ...payload }
      await prisma.docRecord.update({ where: { id }, data: { data: merged as Prisma.InputJsonValue, updatedById: me.id } })
      if (key) await runDocEventHook("before_save", key, id)
      if (key && wasSubmitted) await runDocEventHook("on_update_after_submit", key, id)
    }

    if (targetStatus) {
      await processTransition(key, id, targetStatus, me)
    }
    revalidatePath(`/admin/docs/${key}/${id}`)
    redirect(`/admin/docs/${key}/${id}`)
  } catch (e) {
    if (e instanceof Error && e.message.includes("NEXT_REDIRECT")) throw e
    console.error("Update Error:", e)
    const key = String(formData.get("docTypeKey") || "")
    const id = String(formData.get("id") || "")
    if (key && id) {
      redirect(`/admin/docs/${key}/${id}?toast=${encodeURIComponent("Gagal menyimpan data")}&toastType=error`)
    }
  }
}

async function addRow(prevState: unknown, formData: FormData) {
  "use server"
  const session = await getServerSession(authOptions)
  const email = session?.user?.email ?? ""
  const me = email ? await prisma.user.findUnique({ where: { email }, include: { role: true } }) : null
  if (!me) return { ok: false }
  const key = String(formData.get("docTypeKey") || "")
  const recordId = String(formData.get("recordId") || "")
  const childKey = String(formData.get("childDocTypeKey") || "")
  const docType = await prisma.docType.findUnique({ where: { key }, include: { permissions: true } })
  if (!docType || !recordId || !childKey) return { ok: false }
  const perm = docType.permissions.find((p) => p.roleId === me.roleId)
  if (perm && !perm.canWrite) return { ok: false }
  const record = await prisma.docRecord.findUnique({ where: { id: recordId } })
  if (!record) return { ok: false }
  const isLocked = String(record.status ?? "").toUpperCase().includes("SUBMIT") || String(record.status ?? "").toUpperCase().includes("APPROVE") || record.docStatus === 1
  if (isLocked) return { ok: false }
  const child = await prisma.docType.findUnique({ where: { key: childKey }, include: { fields: true, permissions: true } })
  if (!child) return { ok: false }
  {
    const permChild = child.permissions.find((p) => p.roleId === me.roleId)
    if (permChild && !permChild.canCreate) return { ok: false }
  }
  const payload: Record<string, unknown> = {}
  for (const f of child.fields) {
    if (f.type === ("CHECKBOX" as FieldType)) {
      const raw = String(formData.get(`row_${f.key}`) || "")
      payload[f.key] = raw === "on"
      continue
    }
    if (f.type === ("ATTACHMENT" as FieldType)) {
      const file = formData.get(`row_${f.key}`) as File | null
      payload[f.key] = file ? file.name : null
      continue
    }
    const raw = String(formData.get(`row_${f.key}`) || "")
    if (f.required && !raw) return { ok: false }
    if (f.type === ("PRICE" as FieldType) || isPriceLikeKey(f.key)) {
      const parsed = parseIDR(raw)
      payload[f.key] = parsed != null ? parsed : (raw ? Number(raw) : null)
    } else if (f.type === ("NUMBER" as FieldType)) {
      payload[f.key] = raw ? Number(raw) : null
    } else {
      payload[f.key] = raw
    }
  }
  // Collect spec fields
  for (const [k, v] of formData.entries()) {
    if (k.startsWith("row_spec_")) {
      const specKey = k.slice(4)
      payload[specKey] = String(v)
    }
  }
  const count = await prisma.docRow.count({ where: { recordId } })
  await prisma.docRow.create({ data: { recordId, childDocTypeId: child.id, idx: count, data: payload as Prisma.InputJsonValue } })
  if (key) await runDocEventHook("before_save", key, recordId)
  revalidatePath(`/admin/docs/${key}/${recordId}`)
  return { ok: true }
}

async function sendDocEmail(formData: FormData) {
  "use server"
  const session = await getServerSession(authOptions)
  const email = session?.user?.email ?? ""
  const me = email ? await prisma.user.findUnique({ where: { email }, include: { role: { include: { permissions: { include: { permission: true } } } } } }) : null
  if (!me) return
  
  const key = String(formData.get("docTypeKey") || "")
  const recordId = String(formData.get("id") || "")
  const toEmail = String(formData.get("to_email") || "").trim()
  const notes = String(formData.get("notes") || "").trim()
  
  if (!key || !recordId || !toEmail) {
    redirect(`/admin/docs/${key}/${recordId}?toast=${encodeURIComponent("Email tujuan wajib diisi")}&toastType=error`)
  }
  
  const data = await getDocPreviewData(key, recordId, me.id)
  if (!data) return

  const { docType, record, values, dynamicOptions, childFields, rows, childOptions, grandTotal, company, customerEmail, customerPhoneNumber, customerAddress, customerJobTitle, customerCompanyName, creatorName, creatorEmail, creatorRole, assignedToName, assignedToEmail, assignedToRole, salesManagerName, salesManagerEmail, seriesName, parentSeriesName, grandParentSeriesName, createdDate, parentRecord, grandParentRecord, customerPIC } = data

  const logoDataUri = getLogoDataUri(company?.logoUrl)
  const templateConfig = (docType.config as any)?.previewTemplate as string | undefined
  let docHtml = ""
  if (templateConfig) {
    docHtml = renderFromTemplate(templateConfig, {
      docTypeName: docType.name,
      code: record.code ?? record.id,
      status: record.status ?? "",
      currency: String(values["currency"] ?? ""),
      grandTotal,
      fields: docType.fields.map(f => ({ key: f.key, label: f.label, type: String(f.type) })),
      values,
      dynamicOptions,
      childFields,
      rows,
      childOptions,
      fromCompanyName: company?.name ?? undefined,
      companyLogoUrl: logoDataUri,
      fromCompanyAddress: company?.address ?? undefined,
      fromCompanyEmail: company?.companyEmail ?? undefined,
      fromCompanyPhone: company?.companyPhoneNumber ?? undefined,
      customerEmail,
      customerPhoneNumber,
      customerAddress,
      customerJobTitle,
      customerCompanyName,
      creatorName,
      creatorEmail,
      creatorRole,
      assignedToName,
      assignedToEmail,
      assignedToRole,
      salesManagerName,
      salesManagerEmail,
      seriesName,
      parentSeriesName,
      grandParentSeriesName,
      createdDate,
      parentRecord,
      grandParentRecord,
      companyPIC: company?.pic ? {
        name: company.pic.name,
        email: company.pic.email,
        phoneNumber: company.pic.phoneNumber,
        technicalContactName: company.pic.technicalContactName,
        billingContactName: company.pic.billingContactName,
        technicalPhoneNumber: company.pic.technicalPhoneNumber,
        billingPhoneNumber: company.pic.billingPhoneNumber,
        technicalEmail: company.pic.technicalEmail,
        billingEmail: company.pic.billingEmail
      } : null,
      customerPIC: customerPIC ? {
        name: customerPIC.name,
        email: customerPIC.email,
        phoneNumber: customerPIC.phoneNumber,
        technicalContactName: customerPIC.technicalContactName,
        billingContactName: customerPIC.billingContactName,
        technicalPhoneNumber: customerPIC.technicalPhoneNumber,
        billingPhoneNumber: customerPIC.billingPhoneNumber,
        technicalEmail: customerPIC.technicalEmail,
        billingEmail: customerPIC.billingEmail
      } : null
    })
  } else {
    docHtml = buildDefaultHtml({
      docTypeName: docType.name,
      code: record.code ?? record.id,
      status: record.status ?? "",
      currency: String(values["currency"] ?? ""),
      grandTotal,
      fields: docType.fields.map(f => ({ key: f.key, label: f.label, type: String(f.type) })),
      values,
      dynamicOptions,
      childFields,
      rows,
      childOptions,
      fromCompanyName: company?.name ?? undefined,
      companyLogoUrl: logoDataUri,
      fromCompanyEmail: company?.companyEmail ?? undefined,
      fromCompanyPhone: company?.companyPhoneNumber ?? undefined,
      toName: customerCompanyName || customerEmail || undefined
    })
  }

  const resolvedValues: Record<string, unknown> = { ...values }
  for (const f of docType.fields) {
    if (f.type === "DROPDOWN" && dynamicOptions[f.key]) {
      const val = values[f.key]
      const opt = dynamicOptions[f.key].find(o => o.value === String(val))
      if (opt) resolvedValues[f.key] = opt.label
    }
  }

  const isNextRedirect = (err: unknown): boolean => {
    if (!err || typeof err !== "object") return false
    const anyErr = err as any
    return anyErr?.digest === "NEXT_REDIRECT" || anyErr?.message === "NEXT_REDIRECT"
  }

  try {
    let pdfBuffer: Buffer
    try {
      pdfBuffer = await generatePDFFromHTML(docHtml)
    } catch (error) {
      const msg = error instanceof Error ? error.message : "Unknown error"
      console.error("Failed to generate PDF for email:", error)
      redirect(`/admin/docs/${key}/${recordId}?toast=${encodeURIComponent(`Gagal membuat PDF: ${msg}`)}&toastType=error`)
    }
    await sendDocumentEmail(
      toEmail,
      docType.name,
      record.code,
      record.status,
      resolvedValues,
      docType.fields.map(f => ({ key: f.key, label: f.label, type: String(f.type) })),
      customerCompanyName || toEmail,
      notes || undefined,
      [{ filename: `${docType.name}_${record.code ?? record.id}.pdf`, content: pdfBuffer }]
    )
    redirect(`/admin/docs/${key}/${recordId}?toast=${encodeURIComponent("Dokumen berhasil dikirim ke email beserta PDF")}&toastType=success`)
  } catch (error) {
    if (isNextRedirect(error)) throw error
    const msg = error instanceof Error ? error.message : "Unknown error"
    console.error("Failed to send document email:", error)
    redirect(`/admin/docs/${key}/${recordId}?toast=${encodeURIComponent(`Gagal mengirim email: ${msg}`)}&toastType=error`)
  }
}

async function deleteRow(formData: FormData) {
  "use server"
  const session = await getServerSession(authOptions)
  const email = session?.user?.email ?? ""
  const me = email ? await prisma.user.findUnique({ where: { email }, include: { role: true } }) : null
  if (!me) return
  const key = String(formData.get("docTypeKey") || "")
  const rowId = String(formData.get("rowId") || "")
  const recordId = String(formData.get("recordId") || "")
  const docType = await prisma.docType.findUnique({ where: { key }, include: { permissions: true } })
  if (!docType || !rowId || !recordId) return
  const perm = docType.permissions.find((p) => p.roleId === me.roleId)
  if (perm && !perm.canWrite) return
  const record = await prisma.docRecord.findUnique({ where: { id: recordId } })
  if (!record) return
  const isLocked = String(record.status ?? "").toUpperCase().includes("SUBMIT") || String(record.status ?? "").toUpperCase().includes("APPROVE") || record.docStatus === 1
  if (isLocked) return
  await prisma.docRow.delete({ where: { id: rowId } })
  if (key) await runDocEventHook("before_save", key, recordId)
  revalidatePath(`/admin/docs/${key}/${recordId}`)
}

async function updateRow(prevState: unknown, formData: FormData) {
  "use server"
  const session = await getServerSession(authOptions)
  const email = session?.user?.email ?? ""
  const me = email ? await prisma.user.findUnique({ where: { email }, include: { role: true } }) : null
  if (!me) return { ok: false }
  const key = String(formData.get("docTypeKey") || "")
  const recordId = String(formData.get("recordId") || "")
  const rowId = String(formData.get("rowId") || "")
  const childKey = String(formData.get("childDocTypeKey") || "")
  const docType = await prisma.docType.findUnique({ where: { key }, include: { permissions: true } })
  if (!docType || !recordId || !rowId || !childKey) return { ok: false }
  const perm = docType.permissions.find((p) => p.roleId === me.roleId)
  if (perm && !perm.canWrite) return { ok: false }
  const record = await prisma.docRecord.findUnique({ where: { id: recordId } })
  if (!record) return { ok: false }
  const isLocked = String(record.status ?? "").toUpperCase().includes("SUBMIT") || String(record.status ?? "").toUpperCase().includes("APPROVE") || record.docStatus === 1
  if (isLocked) return { ok: false }
  const child = await prisma.docType.findUnique({ where: { key: childKey }, include: { fields: true } })
  if (!child) return { ok: false }
  const payload: Record<string, unknown> = {}
  for (const f of child.fields) {
    if (f.type === ("CHECKBOX" as FieldType)) {
      const raw = String(formData.get(`row_${f.key}`) || "")
      payload[f.key] = raw === "on"
      continue
    }
    if (f.type === ("ATTACHMENT" as FieldType)) {
      const file = formData.get(`row_${f.key}`) as File | null
      payload[f.key] = file ? file.name : null
      continue
    }
    const raw = String(formData.get(`row_${f.key}`) || "")
    if (f.required && !raw) return { ok: false }
    if (f.type === ("PRICE" as FieldType) || isPriceLikeKey(f.key)) {
      const parsed = parseIDR(raw)
      payload[f.key] = parsed != null ? parsed : (raw ? Number(raw) : null)
    } else if (f.type === ("NUMBER" as FieldType)) {
      payload[f.key] = raw ? Number(raw) : null
    } else {
      payload[f.key] = raw
    }
  }
  // Collect spec fields
  for (const [k, v] of formData.entries()) {
    if (k.startsWith("row_spec_")) {
      const specKey = k.slice(4)
      payload[specKey] = String(v)
    }
  }
  await prisma.docRow.update({ where: { id: rowId }, data: { data: payload as Prisma.InputJsonValue } })
  if (key) await runDocEventHook("before_save", key, recordId)
  revalidatePath(`/admin/docs/${key}/${recordId}`)
  return { ok: true }
}

function buildInvoiceItemPayload(formData: FormData): Record<string, unknown> | null {
  const description = String(formData.get("row_description") || "").trim()
  const qtyRaw = String(formData.get("row_qty") || "").trim()
  const priceRaw = String(formData.get("row_price") || "").trim()
  const discRaw = String(formData.get("row_discount_percent") || "").trim()
  if (!description) return null
  const qty = qtyRaw ? Number(qtyRaw) : 0
  const priceParsed = parseIDR(priceRaw)
  const price = priceParsed != null ? priceParsed : (priceRaw ? Number(priceRaw) : 0)
  const disc = discRaw ? Number(discRaw) : 0
  const subtotal = qty * price * (disc ? (1 - disc / 100) : 1)
  return {
    description,
    qty: Number.isFinite(qty) ? qty : 0,
    price: Number.isFinite(price) ? price : 0,
    discount_percent: Number.isFinite(disc) ? disc : 0,
    subtotal: Number.isFinite(subtotal) ? subtotal : 0,
  }
}

async function addInvoiceItem(formData: FormData) {
  "use server"
  const session = await getServerSession(authOptions)
  const email = session?.user?.email ?? ""
  const me = email ? await prisma.user.findUnique({ where: { email }, include: { role: true } }) : null
  if (!me) return
  const key = String(formData.get("docTypeKey") || "")
  const recordId = String(formData.get("recordId") || "")
  const docType = await prisma.docType.findUnique({ where: { key }, include: { permissions: true } })
  if (!docType || !recordId) return
  const perm = docType.permissions.find((p) => p.roleId === me.roleId)
  if (perm && !perm.canWrite) return
  const record = await prisma.docRecord.findUnique({ where: { id: recordId } })
  if (!record) return
  const isLocked = String(record.status ?? "").toUpperCase().includes("SUBMIT") || String(record.status ?? "").toUpperCase().includes("APPROVE") || record.docStatus === 1
  if (isLocked) return
  const payload = buildInvoiceItemPayload(formData)
  if (!payload) return
  const count = await prisma.docRow.count({ where: { recordId, childDocTypeId: null } })
  await prisma.docRow.create({ data: { recordId, childDocTypeId: null, idx: count, data: payload as Prisma.InputJsonValue } })
  if (key) await runDocEventHook("before_save", key, recordId)
  revalidatePath(`/admin/docs/${key}/${recordId}`)
}

async function updateInvoiceItem(formData: FormData) {
  "use server"
  const session = await getServerSession(authOptions)
  const email = session?.user?.email ?? ""
  const me = email ? await prisma.user.findUnique({ where: { email }, include: { role: true } }) : null
  if (!me) return
  const key = String(formData.get("docTypeKey") || "")
  const recordId = String(formData.get("recordId") || "")
  const rowId = String(formData.get("rowId") || "")
  const docType = await prisma.docType.findUnique({ where: { key }, include: { permissions: true } })
  if (!docType || !recordId || !rowId) return
  const perm = docType.permissions.find((p) => p.roleId === me.roleId)
  if (perm && !perm.canWrite) return
  const record = await prisma.docRecord.findUnique({ where: { id: recordId } })
  if (!record) return
  const isLocked = String(record.status ?? "").toUpperCase().includes("SUBMIT") || String(record.status ?? "").toUpperCase().includes("APPROVE") || record.docStatus === 1
  if (isLocked) return
  const existing = await prisma.docRow.findUnique({ where: { id: rowId } })
  if (!existing || existing.recordId !== recordId || existing.childDocTypeId !== null) return
  const payload = buildInvoiceItemPayload(formData)
  if (!payload) return
  await prisma.docRow.update({ where: { id: rowId }, data: { data: payload as Prisma.InputJsonValue } })
  if (key) await runDocEventHook("before_save", key, recordId)
  revalidatePath(`/admin/docs/${key}/${recordId}`)
}

async function deleteInvoiceItem(formData: FormData) {
  "use server"
  const session = await getServerSession(authOptions)
  const email = session?.user?.email ?? ""
  const me = email ? await prisma.user.findUnique({ where: { email }, include: { role: true } }) : null
  if (!me) return
  const key = String(formData.get("docTypeKey") || "")
  const rowId = String(formData.get("rowId") || "")
  const recordId = String(formData.get("recordId") || "")
  const docType = await prisma.docType.findUnique({ where: { key }, include: { permissions: true } })
  if (!docType || !rowId || !recordId) return
  const perm = docType.permissions.find((p) => p.roleId === me.roleId)
  if (perm && !perm.canWrite) return
  const record = await prisma.docRecord.findUnique({ where: { id: recordId } })
  if (!record) return
  const isLocked = String(record.status ?? "").toUpperCase().includes("SUBMIT") || String(record.status ?? "").toUpperCase().includes("APPROVE") || record.docStatus === 1
  if (isLocked) return
  const existing = await prisma.docRow.findUnique({ where: { id: rowId } })
  if (!existing || existing.recordId !== recordId || existing.childDocTypeId !== null) return
  await prisma.docRow.delete({ where: { id: rowId } })
  if (key) await runDocEventHook("before_save", key, recordId)
  revalidatePath(`/admin/docs/${key}/${recordId}`)
}

async function assignDocument(formData: FormData) {
  "use server"
  const session = await getServerSession(authOptions)
  const email = session?.user?.email ?? ""
  const me = email ? await prisma.user.findUnique({ where: { email }, include: { role: true } }) : null
  if (!me) return
  const key = String(formData.get("docTypeKey") || "")
  const id = String(formData.get("id") || "")
  const assignedToId = String(formData.get("assignedToId") || "")
  const docType = await prisma.docType.findUnique({ where: { key }, include: { permissions: true } })
  if (!docType) return
  const perm = docType.permissions.find((p) => p.roleId === me.roleId)
  if (perm && !perm.canAssign) return
  await prisma.docRecord.update({ where: { id }, data: { assignedToId: assignedToId || null, updatedById: me.id } })
  revalidatePath(`/admin/docs/${key}/${id}`)
}

export default async function DocEditPage({ params }: { params?: Record<string, string | string[] | undefined> | Promise<Record<string, string | string[] | undefined>> }) {
  const session = await getServerSession(authOptions)
  const email = session?.user?.email ?? ""
  const user = email ? await prisma.user.findUnique({ where: { email }, include: { role: { include: { permissions: { include: { permission: true } } } } } }) : null
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
  const keyRaw = p?.key
  const idRaw = p?.id
  const key = typeof keyRaw === "string" ? keyRaw : Array.isArray(keyRaw) ? keyRaw[0] : ""
  const id = typeof idRaw === "string" ? idRaw : Array.isArray(idRaw) ? idRaw[0] : ""
  if (!key) redirect("/admin/doctypes")
  if (!id) redirect(`/admin/docs/${key}`)
  const docType = await prisma.docType.findUnique({ where: { key }, include: { fields: { orderBy: { order: "asc" } }, permissions: true } })
  if (!docType) redirect("/admin/doctypes")
  const record = await prisma.docRecord.findUnique({ where: { id }, include: { createdBy: { include: { role: true } }, updatedBy: true, parent: { include: { docType: true } }, assignedTo: true } })
  if (!record) redirect(`/admin/docs/${key}`)
  const permission = docType.permissions.find((p) => p.roleId === user?.roleId)
  const canRead = permission ? permission.canRead : true
  const canWrite = permission ? permission.canWrite : true
  const canWriteEffective = canWrite || permGlobal.has("ADMIN_PANEL_ACCESS") || permGlobal.has("DOCUMENTS_MANAGEMENT")
  const canAssign = permission ? permission.canAssign : true
  if (!canRead) redirect("/admin")
  const values = (record.data ?? {}) as any
  const selectedBranchId = record.branchId ?? undefined
  const assignmentCfg = (docType.config ?? {}) as unknown as { assignmentEnabled?: boolean }
  const assignmentEnabled = Boolean(assignmentCfg.assignmentEnabled)
  let assignmentUsers: Array<{ id: string; name: string | null; email: string | null }> = []
  if (assignmentEnabled) {
      assignmentUsers = await prisma.user.findMany({
        select: { id: true, name: true, email: true },
        orderBy: { name: "asc" }
      })
    }
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
          const filterObj = (src && typeof src["filter"] === "object") ? (src["filter"] as Record<string, unknown>) : undefined
          const depFieldKey = filterObj && typeof filterObj["dependsOn"] === "string" ? (filterObj["dependsOn"] as string) : ""
          const depSourceField = filterObj && typeof filterObj["field"] === "string" ? (filterObj["field"] as string) : ""
          const parentValRaw = depFieldKey ? (values as any)[depFieldKey] : undefined
          const parentValStr = typeof parentValRaw === "string" ? parentValRaw : String(parentValRaw ?? "")
          const recs: any[] = await prisma.docRecord.findMany({ where: { docTypeId: targetDT.id, ...(selectedBranchId ? { branchId: selectedBranchId } : {}) }, orderBy: { createdAt: "desc" } })
          const filtered = ((depFieldKey && depSourceField && parentValStr) ? recs.filter((r: any) => {
            const d = (r.data ?? {}) as Record<string, unknown>
            const srcValRaw = d[depSourceField]
            const srcValStr = typeof srcValRaw === "string" ? srcValRaw : String(srcValRaw ?? "")
            return srcValStr === parentValStr
          }) : recs) as any[]
          dynamicOptions[f.key] = filtered.map((r: any) => {
            const rowAny = r as any
            const labelRaw = rowAny[labelField]
            const valueRaw = rowAny[valueField]
            const label = typeof labelRaw === "string" ? labelRaw : String(labelRaw ?? rowAny.id)
            const value = typeof valueRaw === "string" ? valueRaw : String(valueRaw ?? rowAny.id)
            return { label, value }
          })
        }
      } else if (src && (src as any)["mode"] === "inventory") {
        const goodsInItemType = await prisma.docType.findUnique({ where: { key: "goods_in_item" } })
        const goodsOutItemType = await prisma.docType.findUnique({ where: { key: "goods_out_item" } })
        if (goodsInItemType && goodsOutItemType) {
          const effectiveBranchId = selectedBranchId || ""
          const commonWhere = {
            record: {
              OR: [{ status: "Completed" }, { status: { contains: "Complete" } }, { status: { contains: "COMPLETED" } }],
              ...(effectiveBranchId ? { branchId: effectiveBranchId } : {}),
            },
          }
          const goodsInItems = await prisma.docRow.findMany({ where: { childDocTypeId: goodsInItemType.id, ...commonWhere } })
          const goodsOutItems = await prisma.docRow.findMany({ where: { childDocTypeId: goodsOutItemType.id, ...commonWhere } })
          const balanceMap = new Map<string, { productName: string, qty: number }>()
          goodsInItems.forEach(row => {
            const d = (row.data as any) || {}
            const productId = d.product_id || ""
            const name = d.item_name || "Unknown Item"
            const qty = Number(d.quantity || 0)
            const k = productId || name.trim().toLowerCase()
            if (!balanceMap.has(k)) balanceMap.set(k, { productName: productId ? name : name, qty: 0 })
            balanceMap.get(k)!.qty += qty
          })
          goodsOutItems.forEach(row => {
            const d = (row.data as any) || {}
            const productId = d.product_id || ""
            const name = d.item_name || "Unknown Item"
            const qty = Number(d.quantity || 0)
            const k = productId || name.trim().toLowerCase()
            if (balanceMap.has(k)) balanceMap.get(k)!.qty -= qty
          })

          const currentValue = values[f.key] ? String(values[f.key]) : undefined
          const options = Array.from(balanceMap.values())
            .filter(item => item.qty > 0)
            .map(item => ({ label: `${item.productName} (Stok: ${item.qty})`, value: item.productName }))
          
          if (currentValue && !options.some(opt => opt.value === currentValue)) {
            const currentItemInMap = balanceMap.get(currentValue.trim().toLowerCase())
            if (currentItemInMap) {
              options.unshift({
                label: `${currentItemInMap.productName} (Stok: ${currentItemInMap.qty})`,
                value: currentItemInMap.productName,
              })
            } else {
              options.unshift({ label: `${currentValue} (Stok: 0)`, value: currentValue })
            }
          }
          dynamicOptions[f.key] = options
        }
      } else if (src && typeof src["table"] === "string" && src["table"]) {
        const tableName = String(src["table"]) || ""
        const modelProp = tableName ? (tableName.slice(0, 1).toLowerCase() + tableName.slice(1)) : ""
        const client = prisma as unknown as Record<string, { findMany: (args?: unknown) => Promise<Array<Record<string, unknown>>> }>
        if (modelProp && client && typeof client[modelProp]?.findMany === "function") {
          const labelField = src && typeof src["labelField"] === "string" ? (src["labelField"] as string) : "name"
          const valueField = src && typeof src["valueField"] === "string" ? (src["valueField"] as string) : "id"
          const filterObj = (src && typeof src["filter"] === "object") ? (src["filter"] as Record<string, unknown>) : undefined
          const depFieldKey = filterObj && typeof filterObj["dependsOn"] === "string" ? (filterObj["dependsOn"] as string) : ""
          const depSourceField = filterObj && typeof filterObj["field"] === "string" ? (filterObj["field"] as string) : ""
          const parentValRaw = depFieldKey ? (values as any)[depFieldKey] : undefined
          const parentValStr = typeof parentValRaw === "string" ? parentValRaw : String(parentValRaw ?? "")
          // Build where clause based on model type
          const whereClause: Record<string, unknown> = {}
          if (selectedBranchId) {
            if (modelProp === "building") {
              whereClause.branchId = selectedBranchId
            } else if (modelProp === "floor") {
              whereClause.building = { branchId: selectedBranchId }
            } else if (modelProp === "room") {
              whereClause.floor = { building: { branchId: selectedBranchId } }
            }
          }
          const recs: Array<Record<string, unknown>> = await client[modelProp].findMany({ where: whereClause })
          const toCamel = (s: string) => s.replace(/[_-]([a-zA-Z])/g, (_, c) => c.toUpperCase())
          const depFieldCamel = toCamel(depSourceField)
          const filtered = (depFieldKey && depSourceField && parentValStr) ? recs.filter((r: any) => {
            const rowAny = r as any
            const rawA = rowAny[depSourceField]
            const rawB = rowAny[depFieldCamel]
            const srcValRaw = rawA !== undefined ? rawA : rawB
            const srcValStr = typeof srcValRaw === "string" ? srcValRaw : String(srcValRaw ?? "")
            return srcValStr === parentValStr
          }) : recs
          dynamicOptions[f.key] = filtered.map((r: any) => {
            const rowAny = r as any
            const labelRaw = rowAny[labelField]
            const valueRaw = rowAny[valueField]
            const label = typeof labelRaw === "string" ? labelRaw : String(labelRaw ?? rowAny["id"]) 
            const value = typeof valueRaw === "string" ? valueRaw : String(rowAny["id"]) 
            return { label, value }
          })
        }
      }
    }
  }

  const cfgAll = (docType.config ?? {}) as unknown as Record<string, unknown>
  const childMapRaw = (cfgAll["childDocTypes"] ?? {}) as Record<string, string>
  const childDefaultKey = typeof cfgAll["childDocTypeKey"] === "string" ? (cfgAll["childDocTypeKey"] as string) : ""
  const tableFields = docType.fields.filter((f) => f.type === ("TABLE" as FieldType))
  const nonTableFields = docType.fields.filter((f) => f.type !== ("TABLE" as FieldType))
  const childEntitiesByFieldKey: Record<string, { id: string; key: string; name: string; icon?: string | null; fields: Array<{ id: string; key: string; label: string; type: FieldType; required: boolean; readOnly?: boolean; config?: unknown }> } | null> = {}
  const canAddRowsByFieldKey: Record<string, boolean> = {}
  const canEditRowsByFieldKey: Record<string, boolean> = {}
  const canDeleteRowsByFieldKey: Record<string, boolean> = {}
  const childListFieldsByFieldKey: Record<string, string[]> = {}
  for (const tf of tableFields) {
    const tfConfig = (tf.config ?? {}) as Record<string, unknown>
    const childKey = childMapRaw[tf.key] || (typeof tfConfig["childDocType"] === "string" ? tfConfig["childDocType"] as string : "") || childDefaultKey || ""
    const child = childKey ? await prisma.docType.findUnique({ where: { key: childKey }, include: { fields: { orderBy: { order: "asc" } }, permissions: true } }) : null
    childEntitiesByFieldKey[tf.key] = child ? { id: child.id, key: child.key, name: child.name, icon: child.icon, fields: child.fields.map((f) => ({ id: f.id, key: f.key, label: f.label, type: f.type as FieldType, required: f.required, readOnly: Boolean(f.readOnly), config: f.config })) } : null
    const permChild = child?.permissions?.find((p) => p.roleId === user?.roleId)
    canAddRowsByFieldKey[tf.key] = permChild ? Boolean(permChild.canCreate) : false
    canEditRowsByFieldKey[tf.key] = permChild ? Boolean(permChild.canWrite) : false
    canDeleteRowsByFieldKey[tf.key] = permChild ? Boolean(permChild.canDelete) : false
    childListFieldsByFieldKey[tf.key] = (() => {
      const cfg = (child?.config ?? {}) as unknown as { listFields?: string[] }
      const explicit = (cfg.listFields ?? []).filter((k) => k && k.length > 0)
      if (explicit.length > 0) return explicit
      if (!child) return []
      return child.fields.slice(0, 4).map((f) => f.key)
    })()
  }
  const childOptionsByFieldKey: Record<string, Record<string, Array<{ label: string; value: string }>>> = {}
  const childSourceByFieldKey: Record<string, Record<string, { key?: string; table?: string; labelField?: string; valueField?: string; filter?: { dependsOn: string; field: string } }>> = {}
  for (const tf of tableFields) {
    const child = childEntitiesByFieldKey[tf.key]
    if (!child) continue
    childOptionsByFieldKey[tf.key] = {}
    childSourceByFieldKey[tf.key] = {}
    for (const f of child.fields) {
      if (f.type === ("DROPDOWN" as FieldType)) {
        const childDT = await prisma.docType.findUnique({ where: { key: child.key }, include: { fields: true } })
        const childField = childDT?.fields.find((cf) => cf.key === f.key)
        const cCfg = (childField?.config ?? {}) as unknown as { options?: Array<{ label: string; value: string }>; source?: Record<string, unknown> }
        const src = cCfg?.source as Record<string, unknown> | undefined
        const srcObj: { key?: string; table?: string; labelField?: string; valueField?: string; filter?: { dependsOn: string; field: string } } = {
          key: (src && typeof src["key"] === "string") ? (src["key"] as string) : undefined,
          table: (src && typeof src["table"] === "string") ? (src["table"] as string) : undefined,
          labelField: (src && typeof src["labelField"] === "string") ? (src["labelField"] as string) : "name",
          valueField: (src && typeof src["valueField"] === "string") ? (src["valueField"] as string) : "id",
          filter: (() => {
            const fo = (src && typeof src["filter"] === "object") ? (src["filter"] as Record<string, unknown>) : undefined
            const dependsOn = fo && typeof fo["dependsOn"] === "string" ? (fo["dependsOn"] as string) : ""
            const field = fo && typeof fo["field"] === "string" ? (fo["field"] as string) : ""
            return dependsOn && field ? { dependsOn, field } : undefined
          })(),
        }
        childSourceByFieldKey[tf.key][f.key] = srcObj
        const targetKey = src && typeof src["key"] === "string" ? (src["key"] as string)
          : src && typeof src["docTypeKey"] === "string" ? (src["docTypeKey"] as string)
          : src && typeof src["target"] === "string" ? (src["target"] as string)
          : ""
        const filterObj = (src && typeof src["filter"] === "object") ? (src["filter"] as Record<string, unknown>) : undefined
        const depFieldKey = filterObj && typeof filterObj["dependsOn"] === "string" ? (filterObj["dependsOn"] as string) : ""
        const depSourceField = filterObj && typeof filterObj["field"] === "string" ? (filterObj["field"] as string) : ""
        const parentValRaw = depFieldKey ? (values as any)[depFieldKey] : undefined
          const parentValStr = typeof parentValRaw === "string" ? parentValRaw : String(parentValRaw ?? "")
        if (targetKey) {
          const targetDT = await prisma.docType.findUnique({ where: { key: targetKey } })
          if (targetDT) {
            const labelField = src && typeof src["labelField"] === "string" ? (src["labelField"] as string) : "name"
            const valueField = src && typeof src["valueField"] === "string" ? (src["valueField"] as string) : "id"
            const recs = await prisma.docRecord.findMany({ where: { docTypeId: targetDT.id, ...(selectedBranchId ? { branchId: selectedBranchId } : {}) }, orderBy: { createdAt: "desc" } })
            const filtered = (depFieldKey && depSourceField && parentValStr) ? recs.filter((r: any) => {
              const d = (r.data ?? {}) as Record<string, unknown>
              const srcValRaw = d[depSourceField]
              const srcValStr = typeof srcValRaw === "string" ? srcValRaw : String(srcValRaw ?? "")
              return srcValStr === parentValStr
            }) : recs
            childOptionsByFieldKey[tf.key][f.key] = filtered.map((r) => {
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
            // Build where clause based on model type
            const whereClause: Record<string, unknown> = {}
            if (selectedBranchId) {
              if (modelProp === "building") {
                whereClause.branchId = selectedBranchId
              } else if (modelProp === "floor") {
                whereClause.building = { branchId: selectedBranchId }
              } else if (modelProp === "room") {
                whereClause.floor = { building: { branchId: selectedBranchId } }
              }
            }
            // Apply source-level where filter
            const srcWhere = src && typeof src["where"] === "object" && src["where"] ? (src["where"] as Record<string, unknown>) : undefined
            if (srcWhere) {
              for (const [k, v] of Object.entries(srcWhere)) {
                whereClause[k] = v
              }
            }
            const recs: Array<Record<string, unknown>> = await client[modelProp].findMany({ where: whereClause })
            const toCamel = (s: string) => s.replace(/[_-]([a-zA-Z])/g, (_, c) => c.toUpperCase())
            const depFieldCamel = toCamel(depSourceField)
            const filtered = (depFieldKey && depSourceField && parentValStr) ? recs.filter((r) => {
              const rawA = r[depSourceField]
              const rawB = r[depFieldCamel]
              const srcValRaw = rawA !== undefined ? rawA : rawB
              const srcValStr = typeof srcValRaw === "string" ? srcValRaw : String(srcValRaw ?? "")
              return srcValStr === parentValStr
            }) : recs
            childOptionsByFieldKey[tf.key][f.key] = filtered.map((r: any) => {
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
        } else {
          const opts = (cCfg.options ?? [])
          childOptionsByFieldKey[tf.key][f.key] = opts.map((o) => ({ label: o.label, value: o.value }))
        }
      }
    }
  }
  const rows = await prisma.docRow.findMany({ where: { recordId: id }, orderBy: { idx: "asc" } })
  const linkedRecords = await prisma.docRecord.findMany({
    where: { parentId: id },
    include: { docType: true },
    orderBy: { createdAt: "desc" }
  })
  const linkedGroups: Record<string, typeof linkedRecords> = {}
  for (const r of linkedRecords) {
    if (r.docType.key.endsWith("_item") || r.docType.name.endsWith(" Item")) continue
    const k = r.docType.name
    if (!linkedGroups[k]) linkedGroups[k] = []
    linkedGroups[k].push(r)
  }

  let grandTotal = 0
  for (const row of rows) {
    const d = (row.data ?? {}) as Record<string, unknown>
    const qtyRaw = d["qty"]
    const priceRaw = d["price"]
    const qty = typeof qtyRaw === "number" ? qtyRaw : Number(qtyRaw ?? 0)
    const price = typeof priceRaw === "number" ? priceRaw : Number(priceRaw ?? 0)
    const disc = getDiscountPercent(d)
    const subtotal = qty * price * (disc ? (1 - disc / 100) : 1)
    grandTotal += subtotal
  }

  let salesOrderSubtotalNrc = 0
  let salesOrderSubtotalMrc = 0
  let salesOrderTotalContract = 0
  if (docType.key === "sales_order") {
    for (const row of rows) {
      const d = (row.data ?? {}) as Record<string, unknown>
      if (!("nrc" in d) && !("mrc" in d)) continue
      const qtyN = typeof d.qty === "number" ? d.qty : Number(d.qty ?? 1)
      const qty = Number.isFinite(qtyN) ? qtyN : 1
      const nrcN = typeof d.nrc === "number" ? d.nrc : Number(d.nrc ?? 0)
      const nrc = Number.isFinite(nrcN) ? nrcN : 0
      const mrcN = typeof d.mrc === "number" ? d.mrc : Number(d.mrc ?? 0)
      const mrc = Number.isFinite(mrcN) ? mrcN : 0
      salesOrderSubtotalNrc += qty * nrc
      salesOrderSubtotalMrc += qty * mrc
      salesOrderTotalContract += qty * (nrc + mrc)
    }
  }

  const invoiceSubtotalKey = docType.key === "invoice"
    ? findFirstFieldKey(docType.fields, ["subtotal", "sub_total", "sub_total_amount", "subtotal_amount"])
    : ""
  const invoiceTotalKey = docType.key === "invoice"
    ? findFirstFieldKey(docType.fields, ["total_amount", "totalamount", "grand_total", "grandtotal", "total"])
    : ""
  const invoiceTaxKey = docType.key === "invoice"
    ? findFirstFieldKey(docType.fields, ["tax", "ppn", "vat"])
    : ""
  const invoiceSubtotal = docType.key === "invoice"
    ? computeInvoiceSubtotalFromRows(rows.map((r) => ({ data: r.data as unknown, childDocTypeId: r.childDocTypeId })))
    : 0
  const invoiceTaxVal = docType.key === "invoice"
    ? (() => {
        const raw = invoiceTaxKey ? (values as Record<string, unknown>)[invoiceTaxKey] : 0
        const n = typeof raw === "number" ? raw : Number(raw ?? 0)
        return Number.isFinite(n) ? n : 0
      })()
    : 0
  const invoiceTotal = docType.key === "invoice" ? invoiceSubtotal + invoiceTaxVal : 0

  let wfRecord: { config?: unknown; isActive?: boolean } | null = null
  try {
    if (record.branchId) {
      const cand = await prisma.docWorkflow.findUnique({ where: { docTypeId_branchId: { docTypeId: docType.id, branchId: record.branchId } } })
      wfRecord = cand ?? null
    }
    if (!wfRecord && docType.branchId) {
      const cand = await prisma.docWorkflow.findUnique({ where: { docTypeId_branchId: { docTypeId: docType.id, branchId: docType.branchId } } })
      wfRecord = cand ?? null
    }
    if (!wfRecord) wfRecord = await prisma.docWorkflow.findFirst({ where: { docTypeId: docType.id, branchId: null, isActive: true } })
    if (!wfRecord) wfRecord = await prisma.docWorkflow.findFirst({ where: { docTypeId: docType.id, branchId: null } })
  } catch {}
  const wfCfg = wfRecord?.config
    ? ((wfRecord.config as unknown) as {
        states?: Array<{ name: string; docStatus?: number; actions?: string[] }>
        transitions?: Array<{ from: string; to: string; roles: string[]; condition?: string }>
      })
    : { states: [], transitions: [] }
  const stateNames = (wfCfg.states ?? []).map((s) => s.name)
  const currentStatusRaw = record.status ?? (stateNames[0] ?? "DRAFT")
  
  // Improved status matching (fuzzy/case-insensitive)
  let currentStatus = stateNames.includes(currentStatusRaw) ? currentStatusRaw : ""
  if (!currentStatus) {
    currentStatus = stateNames.find(s => s.toLowerCase() === currentStatusRaw.toLowerCase()) || ""
  }
  if (!currentStatus) {
    currentStatus = stateNames.find(s => s.toLowerCase().includes(currentStatusRaw.toLowerCase()) || currentStatusRaw.toLowerCase().includes(s.toLowerCase())) || ""
  }
  if (!currentStatus) {
    currentStatus = stateNames[0] ?? currentStatusRaw
  }

  const currentState = (wfCfg.states ?? []).find((s) => norm(s.name) === norm(currentStatus))
  const effectiveDocStatus = typeof currentState?.docStatus === "number" ? currentState.docStatus : record.docStatus

  const roleName = user?.role?.name ?? ""
  const canManageBilling = key === "subscription_management" && ["finances", "finance"].includes(norm(roleName))
  
  const nextTransitions = (wfCfg.transitions ?? []).filter((t) => {
    const fromMatch = norm(t.from) === norm(currentStatus)
    const roleMatch = (t.roles ?? []).some((r) => norm(r) === norm(roleName))
    const condMatch = evalCondition(t.condition, values)
    return fromMatch && roleMatch && condMatch
  })
  const isSupportTicket = docType.key === "support_ticket"
  const isTicketLocked = isSupportTicket && ["Resolved", "Closed"].includes(currentStatus)
  
  // Admins should be able to edit if they have canWrite permission, 
  // unless the document is specifically in a final state (docStatus >= 1 in some systems means submitted, but for Admin we might want to allow edit)
  // Let's at least fix the DRAFT check to be case-insensitive and use the fuzzy matched status
  const isEditable = canWriteEffective && (
    isSupportTicket ? !isTicketLocked : (
      typeof effectiveDocStatus === "number"
        ? effectiveDocStatus === 0
        : currentStatus.toUpperCase() === "DRAFT"
    )
  )
  const activity: Array<{ at: Date; text: string }> = []
  activity.push({ at: record.createdAt, text: `Dokumen dibuat oleh ${record.createdBy?.name ?? record.createdBy?.email ?? "-"}` })
  const stored = (() => { const d = (record.data ?? {}) as Record<string, unknown>; const arr = d["__activity"]; return Array.isArray(arr) ? (arr as Array<{ at: string; text: string }>) : [] })()
  for (const e of stored) { activity.push({ at: new Date(e.at), text: e.text }) }
  if (record.updatedAt && record.updatedAt.getTime() !== record.createdAt.getTime()) {
    activity.push({ at: record.updatedAt, text: `Dokumen diubah oleh ${record.updatedBy?.name ?? record.updatedBy?.email ?? "-"}` })
  }
  activity.sort((a, b) => b.at.getTime() - a.at.getTime())

  const formulaFields = docType.fields
    .filter(f => f.readOnly && (f.config as any)?.compute?.formula)
    .map(f => ({ key: f.key, formula: (f.config as any).compute.formula as string }))

  const billingPreview = canManageBilling ? await getSubscriptionBillingPreview(id).catch(() => null) : null

  // Add formulas from child doc types
  for (const tf of tableFields) {
    const child = childEntitiesByFieldKey[tf.key]
    if (child) {
      child.fields.forEach(cf => {
        if (cf.readOnly && (cf.config as any)?.compute?.formula) {
          formulaFields.push({ key: cf.key, formula: (cf.config as any).compute.formula as string })
        }
      })
    }
  }

  return (
    <FormValidationProvider formId="edit-record-form">
    <DocCalculator fields={formulaFields} />
    <div className="min-h-screen bg-slate-50/30 -m-4 sm:-m-6 p-4 sm:p-8">
    <div className="max-w-7xl mx-auto">
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-8">
        {/* Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Link href="/admin" className="hover:text-slate-900 transition-colors flex items-center gap-1">
              <ArrowLeft className="h-3.5 w-3.5" />
              Admin
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-slate-300" />
            <Link href={`/admin/docs/${docType.key}`} className="hover:text-slate-900 transition-colors">
              {docType.name}
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-slate-300" />
            <span className="text-slate-900 font-mono text-xs">{record.code ?? record.id.slice(0, 8)}</span>
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
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="text-2xl font-semibold tracking-tight text-slate-900">{docType.name}</h1>
                  {(() => {
                    const style = getStatusStyle(currentStatus)
                    const StatusIcon = style.icon
                    return (
                      <span className={cn(
                        "inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium border",
                        style.bg, style.text, style.border
                      )}>
                        <StatusIcon className="h-3 w-3" />
                        {currentStatus}
                      </span>
                    )
                  })()}
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-500">
                  <span className="font-mono text-xs px-1.5 py-0.5 bg-slate-100 rounded text-slate-600">{record.code ?? record.id.slice(0, 8)}</span>
                  <span>·</span>
                  <span>Created {record.createdAt.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button asChild variant="ghost" size="sm" className="text-slate-600 hover:text-slate-900 h-9">
                <Link href={`/admin/docs/${docType.key}`}>
                  <ArrowLeft className="h-3.5 w-3.5 mr-1.5" />
                  Back
                </Link>
              </Button>
              <Button asChild variant="outline" size="sm" className="h-9 border-slate-200">
                <Link href={`/admin/docs/${docType.key}/${id}/preview`} target="_blank">
                  <Eye className="h-3.5 w-3.5 mr-1.5" />
                  Preview
                </Link>
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button type="button" variant="outline" size="sm" className="h-9 border-slate-200">
                    <Mail className="h-3.5 w-3.5 mr-1.5" />
                    Email
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Kirim Dokumen via Email</DialogTitle>
                  </DialogHeader>
                  <form action={sendDocEmail} className="space-y-4">
                    <input type="hidden" name="docTypeKey" value={docType.key} />
                    <input type="hidden" name="id" value={id} />
                    <div className="space-y-2">
                      <Label htmlFor="to_email">Email Tujuan *</Label>
                      <Input id="to_email" name="to_email" type="email" placeholder="contoh@email.com" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="notes">Catatan (Opsional)</Label>
                      <textarea id="notes" name="notes" className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" placeholder="Tambahkan catatan untuk email ini..." />
                    </div>
                    <DialogFooter>
                      <Button type="submit">Kirim</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
              {isEditable ? (
                <ValidatedButton type="submit" form="edit-record-form" className="h-9 bg-slate-900 hover:bg-slate-800">
                  Save Changes
                </ValidatedButton>
              ) : null}
            </div>
          </div>
        </div>

        <div className="space-y-2">
          {canWriteEffective && nextTransitions.length > 0 ? (
            <div className="bg-white rounded-xl border border-slate-200/80 p-3 flex items-center gap-3 flex-wrap shadow-sm">
              <span className="text-xs font-medium text-slate-500">Workflow:</span>
              <div className="flex flex-wrap gap-2">
                {nextTransitions.map((t, i) => (
                  <WorkflowSubmitter
                    key={`${t.from}-${t.to}-${i}`}
                    targetStatus={t.to}
                    formId="edit-record-form"
                    variant={statusBadgeVariant(t.to)}
                  >
                    Move to {t.to}
                  </WorkflowSubmitter>
                ))}
              </div>
            </div>
          ) : null}
        </div>

        <form action={updateRecord} id="edit-record-form" className="space-y-6">
            <input type="hidden" name="docTypeKey" value={docType.key} />
            <input type="hidden" name="id" value={id} />

            <div className="bg-white rounded-xl border border-slate-200/80 p-6 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
              {nonTableFields.map((f) => {
                if (f.key === "branch_id") return <input key={f.id} type="hidden" name="branch_id" value={selectedBranchId || ""} />
                if (key === "cross_connect" && f.key === "status") return null
                if (docType.key === "invoice" && (
                  f.key === "subscription_id" || f.key === "subscription" || f.key === "subscriptionId" ||
                  f.key === "prorate_details" || f.key === "prorateDetails" ||
                  f.key === "billing_period_start" || f.key === "billing_period_end" ||
                  f.key === "nrc_amount" || f.key === "mrc_amount"
                )) return null

                const isHeader = f.key.startsWith("__header_")
                if (isHeader) {
                  return (
                    <div key={f.id} className="col-span-full pt-2 pb-2 first:pt-0">
                      <h3 className="text-sm font-semibold text-slate-900 tracking-tight flex items-center gap-2">
                        <span className="h-4 w-0.5 bg-slate-900 rounded-full" />
                        {f.label}
                      </h3>
                    </div>
                  )
                }
                const vRaw = values[f.key]
                    const val = vRaw !== undefined && vRaw !== null ? String(vRaw) : ""
                    const isFieldReadOnly = !isEditable || f.readOnly
                    const isInvoiceAutoTotal = docType.key === "invoice" && (
                      (invoiceSubtotalKey ? f.key === invoiceSubtotalKey : false) ||
                      (invoiceTotalKey ? f.key === invoiceTotalKey : false)
                    )
                    const isSalesOrderAutoTotal = docType.key === "sales_order" && (
                      f.key === "subtotal_nrc" || f.key === "subtotal_mrc" || f.key === "total_contract"
                    )
                    const soAutoNumber = isSalesOrderAutoTotal
                      ? (f.key === "subtotal_nrc" ? salesOrderSubtotalNrc
                          : f.key === "subtotal_mrc" ? salesOrderSubtotalMrc
                          : salesOrderTotalContract)
                      : 0
                    const autoNumber = isInvoiceAutoTotal
                      ? (f.key === invoiceSubtotalKey ? invoiceSubtotal : invoiceTotal)
                      : soAutoNumber
                    const effectiveVal = isInvoiceAutoTotal || isSalesOrderAutoTotal ? String(autoNumber) : val
                    const effectiveRaw = isInvoiceAutoTotal || isSalesOrderAutoTotal ? autoNumber : vRaw
                    const disabled = isInvoiceAutoTotal || isSalesOrderAutoTotal ? !isEditable : isFieldReadOnly

                    const typeStr = String(f.type).toUpperCase()

                    if (typeStr === "TEXT") {
                      return (
                        <div key={f.id} className="space-y-2">
                          <Label>{f.label}{f.required ? " *" : ""}</Label>
                          <Input name={f.key} defaultValue={effectiveVal} disabled={disabled} readOnly={isInvoiceAutoTotal} placeholder={f.readOnly ? "Otomatis" : undefined} required={f.required} />
                        </div>
                      )
                    }
                    if (typeStr === "TEXTAREA") {
                      return (
                        <div key={f.id} className="col-span-1 md:col-span-2 space-y-2">
                          <Label>{f.label}{f.required ? " *" : ""}</Label>
                          <textarea name={f.key} className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" defaultValue={effectiveVal} disabled={disabled} readOnly={isInvoiceAutoTotal} required={f.required} />
                        </div>
                      )
                    }
                    if (typeStr === "NUMBER") {
                      return (
                        <div key={f.id} className="space-y-2">
                          <Label>{f.label}{f.required ? " *" : ""}</Label>
                          <Input name={f.key} type="number" defaultValue={effectiveVal} disabled={disabled} readOnly={isInvoiceAutoTotal} placeholder={f.readOnly ? "Otomatis" : undefined} required={f.required} />
                        </div>
                      )
                    }
                    if (typeStr === "PRICE") {
                      return (
                        <div key={f.id} className="space-y-2">
                          <Label>{f.label}{f.required ? " *" : ""}</Label>
                          <Input name={f.key} type="text" defaultValue={typeof effectiveRaw === "number" ? formatIDR(effectiveRaw) : effectiveVal} disabled={disabled} readOnly={isInvoiceAutoTotal} placeholder={f.readOnly ? "Otomatis" : undefined} required={f.required} />
                        </div>
                      )
                    }
                    if (typeStr === "DROPDOWN") {
                      const cfg = (f.config ?? {}) as unknown as { options?: Array<{ label: string; value: string }>; source?: Record<string, unknown> }
                      const src = cfg?.source as Record<string, unknown> | undefined
                      const hasFilter = Boolean(src && src["filter"] != null)
                      if (hasFilter) {
                        const raw = src?.["filter"] as unknown
                        const filterRaw = (() => {
                          if (typeof raw !== "string") return raw
                          try {
                            return JSON.parse(raw)
                          } catch {
                            return raw
                          }
                        })()
                        const filters = Array.isArray(filterRaw)
                          ? (filterRaw as Array<Record<string, unknown>>).map((x) => ({
                              dependsOn: typeof x["dependsOn"] === "string" ? (x["dependsOn"] as string) : "",
                              field: typeof x["field"] === "string" ? (x["field"] as string) : "",
                            })).filter((it) => it.dependsOn && it.field)
                          : (() => {
                              const dependsOn = typeof (filterRaw as Record<string, unknown>)?.["dependsOn"] === "string" ? ((filterRaw as Record<string, unknown>)["dependsOn"] as string) : ""
                              const fieldSrc = typeof (filterRaw as Record<string, unknown>)?.["field"] === "string" ? ((filterRaw as Record<string, unknown>)["field"] as string) : ""
                              return (dependsOn && fieldSrc) ? [{ dependsOn, field: fieldSrc }] : []
                            })()
                        const sourceObj = {
                          mode: (src && typeof (src as any)["mode"] === "string") ? ((src as any)["mode"] as string) : undefined,
                          key: (src && typeof src["key"] === "string") ? (src["key"] as string) : undefined,
                          table: (src && typeof src["table"] === "string") ? (src["table"] as string) : undefined,
                          labelField: (src && typeof src["labelField"] === "string") ? (src["labelField"] as string) : "name",
                          valueField: (src && typeof src["valueField"] === "string") ? (src["valueField"] as string) : "id",
                          filter: (filters.length > 1 ? filters : (filters[0] ?? undefined)) as unknown as { dependsOn: string; field: string } | Array<{ dependsOn: string; field: string }>,
                        }
                        const optionsInit = dynamicOptions[f.key] ?? (Array.isArray(cfg.options) ? cfg.options : [])
                        const initMap: Record<string, string> = {
                          ...Object.fromEntries(Object.entries(values).map(([k, v]) => [k, String(v ?? "")])),
                          branch_id: selectedBranchId || "",
                          branchId: selectedBranchId || "",
                        }
                        return (
                          <div key={f.id} className="space-y-2">
                            <Label>{f.label}{f.required ? " *" : ""}</Label>
                            <DependentDropdown
                              name={f.key}
                              label=""
                              required={f.required}
                              options={optionsInit}
                              defaultValue={val}
                              source={sourceObj}
                              branchId={selectedBranchId}
                              initialDependsOnValues={initMap}
                              disabled={isFieldReadOnly}
                            />
                            {(() => {
                                const isProduct = (typeof sourceObj.table === "string" && String(sourceObj.table).toLowerCase() === "product") || (typeof sourceObj.key === "string" && String(sourceObj.key).toLowerCase().includes("product")) || f.key === "product_id"
                                return isProduct ? <QuotationItemSpecs dependsOnName={f.key} branchId={selectedBranchId || undefined} namePrefix="" /> : null
                            })()}
                          </div>
                        )
                      } else {
                        const options = dynamicOptions[f.key] ?? (Array.isArray(cfg.options) ? cfg.options : [])
                        return (
                          <div key={f.id} className="space-y-2">
                            <Label>{f.label}{f.required ? " *" : ""}</Label>
                            <SearchableSelect name={f.key} placeholder={f.readOnly ? "Otomatis" : "Select..."} options={options} defaultValue={val} disabled={isFieldReadOnly} required={f.required} emitChangeEvent={true} />
                            {(() => {
                                const isProduct = f.key === "product_id"
                                return isProduct ? <QuotationItemSpecs dependsOnName={f.key} branchId={selectedBranchId || undefined} namePrefix="" /> : null
                            })()}
                          </div>
                        )
                      }
                    }
                    if (typeStr === "CHECKBOX") {
                      return (
                        <div key={f.id} className="flex items-center gap-2 pt-4">
                          <input type="checkbox" name={f.key} defaultChecked={Boolean(vRaw)} disabled={isFieldReadOnly} />
                          <Label>{f.label}</Label>
                        </div>
                      )
                    }
                     if (typeStr === "DATE") {
                       return (
                         <div key={f.id} className="space-y-2">
                           <Label>{f.label}{f.required ? " *" : ""}</Label>
                           <Input name={f.key} type="date" defaultValue={val} disabled={isFieldReadOnly} required={f.required} />
                         </div>
                       )
                     }
                     if (typeStr === "ATTACHMENT") {
                       return (
                         <div key={f.id} className="space-y-2">
                           <Label>{f.label}{f.required ? " *" : ""}</Label>
                           {vRaw ? (
                             <ImagePreview src={String(vRaw)} alt={f.label} />
                           ) : (
                             <Input name={f.key} defaultValue={val} disabled={isFieldReadOnly} required={f.required} />
                           )}
                         </div>
                       )
                     }
                     // Fallback for any other type
                    return (
                      <div key={f.id} className="space-y-2">
                        <Label>{f.label}{f.required ? " *" : ""}</Label>
                        <Input name={f.key} defaultValue={val} disabled={isFieldReadOnly} required={f.required} />
                      </div>
                    )
                  })}
                </div>
            </div>
        </form>

        {key === "subscription_management" && Object.keys(linkedGroups).length > 0 && (
          <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-sm">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">Related Documents</h3>
            <div className="space-y-4">
              {Object.entries(linkedGroups).map(([groupName, items]) => (
                <div key={groupName} className="space-y-2">
                  <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">{groupName}</div>
                  <div className="space-y-1">
                    {items.map((it) => {
                      const isInvoice = it.docType.key === "invoice"
                      const d = (it.data ?? {}) as Record<string, unknown>
                      const invoiceDateRaw = d["invoice_date"]
                      const dueDateRaw = d["due_date"]
                      const totalRaw = d["total_amount"]
                      const invoiceDate = (() => {
                        const s = typeof invoiceDateRaw === "string" ? invoiceDateRaw : String(invoiceDateRaw ?? "")
                        const dt = s ? new Date(s) : null
                        return dt && !Number.isNaN(dt.getTime()) ? dt.toLocaleDateString("id-ID") : "-"
                      })()
                      const dueDate = (() => {
                        const s = typeof dueDateRaw === "string" ? dueDateRaw : String(dueDateRaw ?? "")
                        const dt = s ? new Date(s) : null
                        return dt && !Number.isNaN(dt.getTime()) ? dt.toLocaleDateString("id-ID") : "-"
                      })()
                      const total = typeof totalRaw === "number" ? totalRaw : Number(totalRaw ?? 0)
                      return (
                        <div
                          key={it.id}
                          className="flex items-center justify-between gap-3 p-3 rounded-md border hover:bg-muted transition-colors"
                        >
                          <div className="min-w-0 space-y-1">
                            <div className="flex items-center gap-2">
                              <div className="text-xs font-semibold text-primary truncate">{it.code || it.id}</div>
                              <Badge variant={statusBadgeVariant(it.status || "")} className="text-[9px] px-1.5 py-0 h-4 shrink-0">
                                {it.status}
                              </Badge>
                            </div>
                            {isInvoice ? (
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-[11px] text-muted-foreground">
                                <div>Tanggal Invoice: <span className="text-foreground">{invoiceDate}</span></div>
                                <div>Jatuh Tempo: <span className="text-foreground">{dueDate}</span></div>
                                <div>Total Tagihan: <span className="text-foreground">{formatIDR(total)}</span></div>
                              </div>
                            ) : (
                              <div className="text-[10px] text-muted-foreground">Dibuat: {it.createdAt.toLocaleDateString("id-ID")}</div>
                            )}
                          </div>
                          <Button asChild size="sm" variant="outline" className="shrink-0">
                            <Link href={`/admin/docs/${it.docType.key}/${it.id}`}>Klik Detail</Link>
                          </Button>
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-8">
          {docType.key === "invoice" && tableFields.length === 0 ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b pb-2">
                <div className="font-semibold text-lg">Invoice Items</div>
                {isEditable && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button type="button" size="sm">Add Item</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-4xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Add Invoice Item</DialogTitle>
                      </DialogHeader>
                      <form action={addInvoiceItem} className="space-y-4">
                        <input type="hidden" name="docTypeKey" value={docType.key} />
                        <input type="hidden" name="recordId" value={id} />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2 md:col-span-2">
                            <Label>Description *</Label>
                            <Input name="row_description" required />
                          </div>
                          <div className="space-y-2">
                            <Label>Qty *</Label>
                            <Input name="row_qty" type="number" required defaultValue="1" />
                          </div>
                          <div className="space-y-2">
                            <Label>Unit Price *</Label>
                            <Input name="row_price" type="text" placeholder="IDR 0" required />
                          </div>
                          <div className="space-y-2">
                            <Label>Discount (%)</Label>
                            <Input name="row_discount_percent" type="number" defaultValue="0" />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button type="submit">Add Item</Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                )}
              </div>

              <div className="space-y-2">
                {rows.filter((r) => r.childDocTypeId === null).map((row) => {
                  const d = (row.data ?? {}) as Record<string, unknown>
                  const desc = String(d["description"] ?? "")
                  const qty = typeof d["qty"] === "number" ? (d["qty"] as number) : Number(d["qty"] ?? 0)
                  const price = typeof d["price"] === "number" ? (d["price"] as number) : Number(d["price"] ?? 0)
                  const disc = typeof d["discount_percent"] === "number" ? (d["discount_percent"] as number) : Number(d["discount_percent"] ?? 0)
                  const subtotal = qty * price * (disc ? (1 - disc / 100) : 1)
                  return (
                    <Collapsible key={row.id} className="border rounded-md bg-card">
                      <div className="flex items-center justify-between p-3">
                        <CollapsibleTrigger asChild>
                          <div className="flex items-center gap-4 text-sm cursor-pointer w-full select-none">
                            <span className="font-semibold text-primary">{desc || `Item ${row.idx + 1}`}</span>
                            <span className="text-xs text-muted-foreground">Qty {qty || 0}</span>
                            <span className="text-xs text-muted-foreground">{formatIDR(price || 0)}</span>
                            <span className="text-xs text-muted-foreground">{formatIDR(subtotal || 0)}</span>
                          </div>
                        </CollapsibleTrigger>
                        <div className="flex items-center gap-1">
                          {isEditable && (
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                                  <Edit className="size-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-4xl max-h-[80vh] overflow-y-auto">
                                <DialogHeader>
                                  <DialogTitle>Edit Invoice Item</DialogTitle>
                                </DialogHeader>
                                <form action={updateInvoiceItem} className="space-y-4">
                                  <input type="hidden" name="docTypeKey" value={docType.key} />
                                  <input type="hidden" name="recordId" value={id} />
                                  <input type="hidden" name="rowId" value={row.id} />
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2 md:col-span-2">
                                      <Label>Description *</Label>
                                      <Input name="row_description" required defaultValue={String(d["description"] ?? "")} />
                                    </div>
                                    <div className="space-y-2">
                                      <Label>Qty *</Label>
                                      <Input name="row_qty" type="number" required defaultValue={String(d["qty"] ?? 1)} />
                                    </div>
                                    <div className="space-y-2">
                                      <Label>Unit Price *</Label>
                                      <Input name="row_price" type="text" required defaultValue={formatIDR(d["price"] ?? 0)} />
                                    </div>
                                    <div className="space-y-2">
                                      <Label>Discount (%)</Label>
                                      <Input name="row_discount_percent" type="number" defaultValue={String(d["discount_percent"] ?? 0)} />
                                    </div>
                                  </div>
                                  <DialogFooter>
                                    <Button type="submit">Update Item</Button>
                                  </DialogFooter>
                                </form>
                              </DialogContent>
                            </Dialog>
                          )}
                          {isEditable && (
                            <form action={deleteInvoiceItem}>
                              <input type="hidden" name="docTypeKey" value={docType.key} />
                              <input type="hidden" name="recordId" value={id} />
                              <input type="hidden" name="rowId" value={row.id} />
                              <Button variant="ghost" size="icon" className="text-destructive"><Plus className="size-4 rotate-45" /></Button>
                            </form>
                          )}
                        </div>
                      </div>
                      <CollapsibleContent>
                        <div className="p-4 border-t bg-muted/20 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div className="space-y-1">
                            <div className="text-xs text-muted-foreground">Description</div>
                            <div className="font-medium">{desc || "-"}</div>
                          </div>
                          <div className="space-y-1">
                            <div className="text-xs text-muted-foreground">Qty</div>
                            <div className="font-medium">{String(qty || 0)}</div>
                          </div>
                          <div className="space-y-1">
                            <div className="text-xs text-muted-foreground">Unit Price</div>
                            <div className="font-medium">{formatIDR(price || 0)}</div>
                          </div>
                          <div className="space-y-1">
                            <div className="text-xs text-muted-foreground">Discount (%)</div>
                            <div className="font-medium">{String(disc || 0)}</div>
                          </div>
                          <div className="space-y-1">
                            <div className="text-xs text-muted-foreground">Subtotal</div>
                            <div className="font-medium">{formatIDR(subtotal || 0)}</div>
                          </div>
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  )
                })}
              </div>
            </div>
          ) : null}
          {tableFields.map((f) => {
            const child = childEntitiesByFieldKey[f.key]
            if (!child) return null
            const relevantRows = rows.filter((r) => r.childDocTypeId === child.id)
            return (
              <div key={f.id} className="space-y-4">
                <div className="flex items-center justify-between border-b pb-2">
                  <div className="flex items-center gap-2">
                    {child.icon ? <IconDisplay name={child.icon} className="size-5 text-muted-foreground" /> : <Package className="size-5 text-muted-foreground" />}
                    <div className="font-semibold text-lg">{f.label}</div>
                  </div>
                  {isEditable && (canAddRowsByFieldKey[f.key] ?? true) && (
                    <FormDialog
                      title={`Add ${child.name}`}
                      className="sm:max-w-5xl max-h-[80vh] overflow-y-auto"
                      action={addRow}
                      trigger={<Button type="button" size="sm">Add Item</Button>}
                    >
                      <input type="hidden" name="docTypeKey" value={docType.key} />
                      <input type="hidden" name="recordId" value={id} />
                      <input type="hidden" name="childDocTypeKey" value={child.key} />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {child.fields.map((cf) => {
                          const opt = ((childOptionsByFieldKey[f.key] ?? {})[cf.key] ?? [])
                          const cfCfg = (cf.config ?? {}) as Record<string, unknown>
                          const defaultValue = cfCfg.default !== undefined ? String(cfCfg.default) : ""
                          
                          return (
                            <div key={cf.id} className="space-y-2">
                              <Label>{cf.label}{cf.required ? " *" : ""}</Label>
                              {cf.type === "DROPDOWN" ? (
                                <SearchableSelect name={`row_${cf.key}`} options={opt} required={cf.required} defaultValue={defaultValue} emitChangeEvent={true} />
                              ) : cf.type === "TEXTAREA" ? (
                                <textarea 
                                  name={`row_${cf.key}`}
                                  required={cf.required}
                                  className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                                  defaultValue={defaultValue}
                                />
                              ) : cf.type === "PRICE" ? (
                                <Input 
                                  name={`row_${cf.key}`} 
                                  type="text"
                                  required={cf.required} 
                                  defaultValue={defaultValue ? formatIDR(defaultValue) : defaultValue} 
                                />
                              ) : (
                                <Input 
                                  name={`row_${cf.key}`} 
                                  type={cf.type === "NUMBER" ? "number" : "text"} 
                                  required={cf.required} 
                                  defaultValue={defaultValue} 
                                />
                              )}
                            </div>
                          )
                        })}
                        {(() => {
                          const hasProductId = child.fields.some(cf => cf.key === "product_id")
                          return hasProductId ? (
                            <div className="col-span-full border-t pt-4 mt-4">
                              <QuotationItemSpecs 
                                dependsOnName="row_product_id" 
                                branchId={selectedBranchId || undefined} 
                                namePrefix="row_" 
                              />
                            </div>
                          ) : null
                        })()}
                      </div>
                      <DialogFooter>
                        <Button type="submit">Add Item</Button>
                      </DialogFooter>
                    </FormDialog>
                  )}
                </div>

                <div className="space-y-2">
                  {relevantRows.map((row) => {
                    const d = (row.data ?? {}) as Record<string, unknown>
                    return (
                      <Collapsible key={row.id} className="border rounded-md bg-card">
                        <div className="flex items-center justify-between p-3">
                          <CollapsibleTrigger asChild>
                            <div className="flex items-center gap-4 text-sm cursor-pointer w-full select-none">
                               {(() => {
                                 const keys = childListFieldsByFieldKey[f.key] ?? []
                                 if (keys.length === 0) return <span className="font-semibold">Item {row.idx + 1}</span>
                                 return keys.map((k, i) => {
                                   const cf = child.fields.find(x => x.key === k)
                                   if (!cf) return null
                                   const raw = d[k]
                                   let display: React.ReactNode = String(raw ?? "")
                                   if (cf.type === "DROPDOWN") {
                                     const opts = (childOptionsByFieldKey[f.key] ?? {})[k] ?? []
                                     display = opts.find(o => o.value === String(raw))?.label ?? display
                                   } else if (cf.type === ("ATTACHMENT" as FieldType) && raw) {
                                      display = <ImagePreview src={raw as string} alt={cf.label} />
                                    }
                                   return (
                                     <span key={k} className={i === 0 ? "font-semibold text-primary" : "flex items-center gap-1.5"}>
                                       {i > 0 && <span className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground bg-muted px-1.5 py-0.5 rounded-sm">{cf.label}</span>}
                                       <span className="font-medium">{display}</span>
                                     </span>
                                   )
                                 })
                               })()}
                            </div>
                          </CollapsibleTrigger>
                          <div className="flex items-center gap-1">
                             {isEditable && (canEditRowsByFieldKey[f.key] ?? true) && (
                               <FormDialog
                                 title={`Edit ${child.name}`}
                                 className="sm:max-w-5xl max-h-[80vh] overflow-y-auto"
                                 action={updateRow}
                                 trigger={
                                   <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                                     <Edit className="size-4" />
                                   </Button>
                                 }
                               >
                                 <input type="hidden" name="docTypeKey" value={docType.key} />
                                 <input type="hidden" name="recordId" value={id} />
                                 <input type="hidden" name="rowId" value={row.id} />
                                 <input type="hidden" name="childDocTypeKey" value={child.key} />
                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                   {child.fields.map((cf) => {
                                     const opt = ((childOptionsByFieldKey[f.key] ?? {})[cf.key] ?? [])
                                     const val = d[cf.key]
                                     
                                     return (
                                       <div key={cf.id} className="space-y-2">
                                         <Label>{cf.label}{cf.required ? " *" : ""}</Label>
                                         {cf.type === "DROPDOWN" ? (
                                           <SearchableSelect 
                                             name={`row_${cf.key}`} 
                                             options={opt} 
                                             required={cf.required} 
                                             defaultValue={String(val ?? "")} 
                                             emitChangeEvent={true}
                                           />
                                         ) : cf.type === "TEXTAREA" ? (
                                           <textarea 
                                             name={`row_${cf.key}`}
                                             required={cf.required}
                                             className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                                             defaultValue={String(val ?? "")}
                                           />
                                         ) : cf.type === "PRICE" ? (
                                           <Input 
                                             name={`row_${cf.key}`} 
                                             type="text"
                                             required={cf.required} 
                                             defaultValue={formatIDR(val)} 
                                           />
                                         ) : (
                                           <Input 
                                             name={`row_${cf.key}`} 
                                             type={cf.type === "NUMBER" ? "number" : "text"} 
                                             required={cf.required} 
                                             defaultValue={String(val ?? "")} 
                                           />
                                         )}
                                       </div>
                                     )
                                   })}
                                   {(() => {
                                     const hasProductId = child.fields.some(cf => cf.key === "product_id")
                                     return hasProductId ? (
                                       <div className="col-span-full border-t pt-4 mt-4">
                                         <QuotationItemSpecs 
                                           dependsOnName="row_product_id" 
                                           branchId={selectedBranchId || undefined} 
                                           namePrefix="row_" 
                                           defaultValues={d}
                                         />
                                       </div>
                                     ) : null
                                   })()}
                                 </div>
                                 <DialogFooter>
                                   <Button type="submit">Update Item</Button>
                                 </DialogFooter>
                               </FormDialog>
                             )}
                            {isEditable && (canDeleteRowsByFieldKey[f.key] ?? true) && (
                              <form action={deleteRow}>
                                <input type="hidden" name="docTypeKey" value={docType.key} />
                                <input type="hidden" name="recordId" value={id} />
                                <input type="hidden" name="rowId" value={row.id} />
                                <Button variant="ghost" size="icon" className="text-destructive"><Plus className="size-4 rotate-45" /></Button>
                              </form>
                            )}
                          </div>
                        </div>
                        <CollapsibleContent>
                          <div className="p-4 border-t bg-muted/20 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            {child.fields.map((cf) => {
                              const val = d[cf.key]
                              let display: React.ReactNode = String(val ?? "")
                              if (cf.type === "DROPDOWN") {
                                const opts = (childOptionsByFieldKey[f.key] ?? {})[cf.key] ?? []
                                display = opts.find(o => o.value === String(val))?.label ?? display
                              } else if (cf.type === ("ATTACHMENT" as FieldType) && val) {
                                display = <ImagePreview src={val as string} alt={cf.label} />
                              }
                              return (
                                <div key={cf.id} className="space-y-1">
                                  <div className="text-xs text-muted-foreground">{cf.label}</div>
                                  <div className="font-medium">{display || "-"}</div>
                                </div>
                              )
                            })}
                          </div>
                        </CollapsibleContent>
                      </Collapsible>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="space-y-6">
        {key !== "subscription_management" && Object.keys(linkedGroups).length > 0 && (
          <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-sm">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">Related Documents</h3>
            <div className="space-y-4">
              {Object.entries(linkedGroups).map(([groupName, items]) => (
                <div key={groupName} className="space-y-2">
                  <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">{groupName}</div>
                  <div className="space-y-1">
                    {items.map((it) => (
                      <Link 
                        key={it.id} 
                        href={`/admin/docs/${it.docType.key}/${it.id}`}
                        className="flex items-center justify-between p-2 rounded-md hover:bg-muted transition-colors border border-transparent hover:border-border group"
                      >
                        <div className="space-y-0.5">
                          <div className="text-xs font-medium group-hover:text-primary transition-colors">{it.code || it.id}</div>
                          <div className="text-[10px] text-muted-foreground">{it.createdAt.toLocaleDateString()}</div>
                        </div>
                        <Badge variant={statusBadgeVariant(it.status || "")} className="text-[9px] px-1.5 py-0 h-4">
                          {it.status}
                        </Badge>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {assignmentEnabled && (
          <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-sm">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">Assignment</h3>
            <AssignmentSelector 
              users={assignmentUsers} 
              currentUserId={record.assignedToId || ""} 
              docTypeKey={key}
              recordId={id}
              assignAction={assignDocument}
              disabled={!canAssign}
            />
          </div>
        )}

        {key === "subscription_management" ? (
          canManageBilling ? (
            billingPreview ? (
              <SubscriptionBillingActions subscriptionId={id} preview={billingPreview} />
            ) : (
              <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-sm">
                <h3 className="text-sm font-semibold mb-2">Billing Preview</h3>
                <p className="text-xs text-muted-foreground">Billing preview belum tersedia untuk subscription ini.</p>
              </div>
            )
          ) : (
            <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-sm">
              <h3 className="text-sm font-semibold mb-2">Billing Preview</h3>
              <p className="text-xs text-muted-foreground">Hanya role Finances yang dapat melihat billing preview dan melakukan generate invoice.</p>
            </div>
          )
        ) : null}

        <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-sm">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">Activity Timeline</h3>
          <div className="space-y-4">
            {activity.map((a, i) => (
              <div key={i} className="flex gap-3 text-xs">
                <div className="mt-1 size-1.5 rounded-full bg-primary shrink-0" />
                <div className="space-y-1">
                  <div className="font-medium">{a.text}</div>
                  <div className="text-muted-foreground">
                    {a.at.toLocaleDateString("en-US", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </div>
    </div>
    </FormValidationProvider>
  )
}
