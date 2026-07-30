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
import { IconDisplay } from "@/components/icon-display"
import type { FieldType } from "@/generated/prisma/enums"
import type { Prisma } from "@/generated/prisma/client"
import { SearchableSelect } from "@/components/ui/select"
import DependentDropdown from "@/components/dependent-dropdown"
import ChildRowsAccordion from "@/components/child-rows-accordion"
import { runDocEventHook } from "@/lib/doc-hooks"
import QuotationItemSpecs from "@/components/quotation-item-specs"
import { ArrowLeft, ChevronRight, Plus, Save, Copy, Link2 } from "lucide-react"

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

function formatDateInput(d: Date): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, "0")
  const dd = String(d.getDate()).padStart(2, "0")
  return `${y}-${m}-${dd}`
}

async function createRecord(formData: FormData) {
  "use server"
  const session = await getServerSession(authOptions)
  const email = session?.user?.email ?? ""
  const me = email ? await prisma.user.findUnique({ where: { email }, include: { role: true, assignedBranches: { include: { branch: true } } } }) : null
  if (!me) return
  const key = String(formData.get("docTypeKey") || "")
  const docType = await prisma.docType.findUnique({ where: { key } , include: { fields: true, permissions: true } })
  if (!docType) return
  const docTypeId = docType.id
  const perm = docType.permissions.find((p) => p.roleId === me.roleId)
  if (perm && !perm.canCreate) return
  const cookieStore = await cookies()
  const cookieBranchId = cookieStore.get("branchId")?.value
  const assigned = me.assignedBranches.map((a) => a.branch.id)
  const branchId = String(formData.get("branch_id") || "") || docType.branchId || (cookieBranchId && assigned.includes(cookieBranchId) ? cookieBranchId : assigned[0])
  const payload: Record<string, unknown> = {}
  for (const f of docType.fields) {
    if (docType.key === "invoice" && (
      f.key === "subscription_id" || f.key === "subscription" || f.key === "subscriptionId" ||
      f.key === "prorate_details" || f.key === "prorateDetails" ||
      f.key === "billing_period_start" || f.key === "billing_period_end" ||
      f.key === "nrc_amount" || f.key === "mrc_amount"
    )) {
      continue
    }
    if (f.readOnly) continue
    if (f.type === ("CHECKBOX" as FieldType)) {
      const raw = String(formData.get(f.key) || "")
      payload[f.key] = raw === "on"
      continue
    }
    const raw = String(formData.get(f.key) || "")
    if (f.required && !raw) return
    if (f.type === ("PRICE" as FieldType) || isPriceLikeKey(f.key)) {
      const parsed = parseIDR(raw)
      payload[f.key] = parsed != null ? parsed : (raw ? Number(raw) : null)
    } else if (f.type === ("NUMBER" as FieldType)) {
      payload[f.key] = raw ? Number(raw) : null
    } else {
      payload[f.key] = raw
    }
  }
  {
    const productField = docType.fields.find((cf) => {
      const cfg = (cf.config ?? {}) as unknown as { source?: Record<string, unknown> }
      const src = cfg?.source as Record<string, unknown> | undefined
      const table = src && typeof src["table"] === "string" ? (src["table"] as string) : ""
      const keySrc = src && typeof src["key"] === "string" ? (src["key"] as string) : ""
      return cf.key === "product_id" || table.toLowerCase() === "product" || keySrc.toLowerCase().includes("product")
    })
    const productId = productField ? String(payload[productField.key] ?? "") : ""
    if (productId) {
      const specs = await prisma.productSpecField.findMany({ where: { productId } })
      for (const s of specs) {
        const base = `spec_${s.key}`
        if (s.type === ("CHECKBOX" as FieldType)) {
          const cfg = (s.config ?? {}) as unknown as { options?: Array<{ label: string; value: string; qty?: number }> }
          const opts = Array.isArray(cfg.options) ? cfg.options : []
          const selected: string[] = []
          for (const o of opts) {
            const ck = `${base}__${o.value}`
            const on = String(formData.get(ck) || "") === "on"
            if (on) {
              selected.push(String(o.value))
              if (typeof o.qty === "number") {
                const qk = `${base}__${o.value}__qty`
                const qraw = String(formData.get(qk) || "")
                const qnum = qraw ? Number(qraw) : undefined
                if (typeof qnum === "number" && !Number.isNaN(qnum)) {
                  payload[`spec_${s.key}__${o.value}__qty`] = qnum
                }
              }
            }
          }
          if (selected.length > 0) {
            payload[`spec_${s.key}`] = selected
          }
        } else if (s.type === ("NUMBER" as FieldType)) {
          const rawSpec = String(formData.get(base) || "")
          if (rawSpec) {
            payload[`spec_${s.key}`] = Number(rawSpec)
          }
        } else {
          const rawSpec = String(formData.get(base) || "")
          if (rawSpec) {
            payload[`spec_${s.key}`] = rawSpec
          }
        }
      }
    }
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
  const namingCfg = (docType.config ?? {}) as unknown as { naming?: { mode?: string; field?: string; defaultPattern?: string } }
  const namingMode = namingCfg.naming?.mode ?? "series"
  const namingField = namingCfg.naming?.field ?? "naming_series"
  const defaultPattern = namingCfg.naming?.defaultPattern ?? ""
  function nextCodePatternString(): string | null {
    let pattern = ""
    if (namingMode === "series") {
      const v = payload[namingField]
      pattern = typeof v === "string" && v ? v : defaultPattern
    } else if (namingMode === "uuid") {
      return crypto.randomUUID()
    } else if (namingMode === "random") {
      const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"
      let s = ""
      for (let i = 0; i < 8; i++) s += chars[Math.floor(Math.random() * chars.length)]
      return s
    } else if (namingMode === "field") {
      const v = payload[namingField]
      return typeof v === "string" && v ? v : null
    }
    if (!pattern) return null
    return pattern
  }
  async function generateSeriesCode(pattern: string, branchId: string | undefined): Promise<string> {
    const m = /^(.*?)(#+)(.*)$/.exec(pattern)
    const prefix = m ? m[1] : pattern
    const hashes = m ? m[2] : "#####"
    const suffix = m ? m[3] : ""
    const digits = hashes.length
    const keySeries = pattern
    const existing = await prisma.docNamingCounter.findFirst({
      where: { docTypeId: docTypeId, branchId: branchId ?? null, series: keySeries }
    })
    
    let counter
    if (existing) {
      counter = await prisma.docNamingCounter.update({
        where: { id: existing.id },
        data: { seq: { increment: 1 } }
      })
    } else {
      counter = await prisma.docNamingCounter.create({
        data: { docTypeId: docTypeId, branchId: branchId ?? null, series: keySeries, seq: 1 }
      })
    }
    const seq = counter.seq
    const pad = String(seq).padStart(digits, "0")
    return `${prefix}${pad}${suffix}`
  }
  let wf = null as { config?: unknown; isActive?: boolean; dontOverrideStatus?: boolean } | null
  try {
    if (branchId) {
      const cand = await prisma.docWorkflow.findUnique({ where: { docTypeId_branchId: { docTypeId: docType.id, branchId } } })
      wf = cand && cand.isActive ? cand : null
    }
    if (!wf && docType.branchId) {
      const cand = await prisma.docWorkflow.findUnique({ where: { docTypeId_branchId: { docTypeId: docType.id, branchId: docType.branchId } } })
      wf = cand && cand.isActive ? cand : null
    }
    if (!wf) {
      wf = await prisma.docWorkflow.findFirst({ where: { docTypeId: docType.id, branchId: null, isActive: true } })
    }
  } catch {}
  const wfCfg = wf?.config ? (wf.config as unknown as { states?: Array<{ name: string; docStatus?: number }> }) : { states: [] }
  const initialState = wfCfg.states && wfCfg.states.length > 0 ? wfCfg.states[0] : undefined
  const initialStatus = initialState ? initialState.name : "DRAFT"
  const initialDocStatus = typeof initialState?.docStatus === "number" ? initialState.docStatus : undefined
  let code: string | undefined = undefined
  const chosenPattern = nextCodePatternString()
  if (chosenPattern) {
    if (namingMode === "series") {
      code = await generateSeriesCode(chosenPattern, branchId)
    } else {
      code = chosenPattern
    }
  }
  if (!code) {
    code = `NEW-${crypto.randomUUID().slice(0, 8).toUpperCase()}`
  }
  const parentId = String(formData.get("parentId") || "")
  const parentDocTypeKey = String(formData.get("parentDocType") || "")
  console.log("[createRecord] parentId:", parentId, "parentDocType:", parentDocTypeKey)

  const created = await prisma.docRecord.create({
    data: {
      docTypeId: docType.id,
      branchId,
      code,
      status: initialStatus,
      docStatus: wf?.dontOverrideStatus ? undefined : initialDocStatus,
      data: { ...(payload as Record<string, unknown>), _parentId: parentId, _parentDocType: parentDocTypeKey } as Prisma.InputJsonValue,
      createdById: me.id,
      updatedById: me.id,
      assignedToId: me.id,
      parentId: parentId || undefined
    }
  })
  const cfgAll = (docType.config ?? {}) as unknown as Record<string, unknown>
  const childDocTypeKeyCfg = typeof cfgAll["childDocTypeKey"] === "string" ? (cfgAll["childDocTypeKey"] as string) : ""
  const childDocTypeKeyForm = String(formData.get("childDocTypeKey") || "")
  const childDocTypeKey = childDocTypeKeyCfg || childDocTypeKeyForm
  if (childDocTypeKey) {
    const child = await prisma.docType.findUnique({ where: { key: childDocTypeKey }, include: { fields: true } })
    if (child) {
      const entries = Array.from(formData.entries())
      const rowsMap = new Map<number, Record<string, unknown>>()
      const checkboxKeys = new Set(child.fields.filter((cf) => cf.type === ("CHECKBOX" as FieldType)).map((cf) => cf.key))
      const numberKeys = new Set(child.fields.filter((cf) => cf.type === ("NUMBER" as FieldType) || cf.type === ("PRICE" as FieldType)).map((cf) => cf.key))
      const priceKeys = new Set(child.fields.filter((cf) => cf.type === ("PRICE" as FieldType)).map((cf) => cf.key))
      for (const [k, v] of entries) {
        if (!k.startsWith("row_")) continue
        let idx = 0
        let fieldKey = ""
        const m = /^row_(\d+)_(.+)$/.exec(k)
        if (m) {
          idx = Number(m[1])
          fieldKey = m[2]
        } else {
          fieldKey = k.slice(4)
        }
        const valStr = typeof v === "string" ? v : String(v)
        const current = rowsMap.get(idx) ?? {}
        if (checkboxKeys.has(fieldKey)) {
          const boolVal = valStr === "on"
          current[fieldKey] = boolVal
        } else if (numberKeys.has(fieldKey)) {
          if (priceKeys.has(fieldKey) || isPriceLikeKey(fieldKey)) {
            const parsed = parseIDR(valStr)
            current[fieldKey] = parsed != null ? parsed : (valStr ? Number(valStr) : null)
          } else {
            current[fieldKey] = valStr ? Number(valStr) : null
          }
        } else {
          current[fieldKey] = valStr
        }
        rowsMap.set(idx, current)
      }
      const productField = child.fields.find((cf) => {
        const cfg = (cf.config ?? {}) as unknown as { source?: Record<string, unknown> }
        const src = cfg?.source as Record<string, unknown> | undefined
        const table = src && typeof src["table"] === "string" ? (src["table"] as string) : ""
        const keySrc = src && typeof src["key"] === "string" ? (src["key"] as string) : ""
        return cf.key === "product_id" || table.toLowerCase() === "product" || keySrc.toLowerCase().includes("product")
      })
      for (const [idx, rowPayload] of rowsMap.entries()) {
        let hasData = Object.values(rowPayload).some((v) => {
          if (typeof v === "string") return v.length > 0
          if (typeof v === "number") return !Number.isNaN(v)
          if (typeof v === "boolean") return v
          return v != null
        })
        const productId = productField ? String(rowPayload[productField.key] ?? "") : ""
        if (productId) {
          const specs = await prisma.productSpecField.findMany({ where: { productId } })
          for (const s of specs) {
            const base = `row_${idx}_spec_${s.key}`
            if (s.type === ("CHECKBOX" as FieldType)) {
              const cfg = (s.config ?? {}) as unknown as { options?: Array<{ label: string; value: string; qty?: number }> }
              const opts = Array.isArray(cfg.options) ? cfg.options : []
              const selected: string[] = []
              for (const o of opts) {
                const ck = `${base}__${o.value}`
                const on = String(formData.get(ck) || "") === "on"
                if (on) {
                  selected.push(String(o.value))
                  if (typeof o.qty === "number") {
                    const qk = `${base}__${o.value}__qty`
                    const qraw = String(formData.get(qk) || "")
                    const qnum = qraw ? Number(qraw) : undefined
                    if (typeof qnum === "number" && !Number.isNaN(qnum)) {
                      rowPayload[`spec_${s.key}__${o.value}__qty`] = qnum
                    }
                  }
                }
              }
              if (selected.length > 0) {
                rowPayload[`spec_${s.key}`] = selected
                hasData = true
              }
            } else if (s.type === ("NUMBER" as FieldType)) {
              const raw = String(formData.get(base) || "")
              if (raw) {
                rowPayload[`spec_${s.key}`] = Number(raw)
                hasData = true
              }
            } else {
              const raw = String(formData.get(base) || "")
              if (raw) {
                rowPayload[`spec_${s.key}`] = raw
                hasData = true
              }
            }
          }
        }
        {
          const allowed = new Set(["round","floor","ceil","min","max"])
          const evalRow = (formula?: string, vars?: Record<string, unknown>): number | null => {
            if (!formula || !vars) return null
            let expr = formula.replace(/\^/g, "**")
            expr = expr.replace(/\b([A-Za-z_][A-Za-z0-9_]*)\b/g, (m) => {
              if (allowed.has(m)) return `Math.${m}`
              return `get("${m}")`
            })
            try {
              const fn = new Function("get","Math", `return ( ${expr} )`)
              const res = fn((k: string) => {
                const lower = k.toLowerCase(); const upper = k.toUpperCase()
                const v = (k in rowPayload) ? rowPayload[k]
                  : (lower in rowPayload) ? rowPayload[lower]
                  : (upper in rowPayload) ? rowPayload[upper]
                  : undefined
                if (typeof v === "number") return v
                if (typeof v === "string") { const n = Number(v); return Number.isNaN(n) ? 0 : n }
                if (typeof v === "boolean") return v ? 1 : 0
                return 0
              }, Math)
              return (typeof res === "number" && Number.isFinite(res)) ? res : null
            } catch { return null }
          }
          for (const f of child.fields) {
            if (!f.readOnly) continue
            const cfg = (f.config ?? {}) as unknown as { compute?: { formula?: string } }
            const val = evalRow(cfg.compute?.formula, rowPayload)
            if (val != null) rowPayload[f.key] = val
          }
          const qty = (() => { const v = rowPayload["qty"] ?? rowPayload["QTY"] ?? rowPayload["Qty"]; return typeof v === "number" ? v : Number(v ?? 0) })()
          const nrc = (() => { const v = rowPayload["nrc"] ?? rowPayload["NRC"] ?? rowPayload["Nrc"]; return typeof v === "number" ? v : Number(v ?? 0) })()
          const mrc = (() => { const v = rowPayload["mrc"] ?? rowPayload["MRC"] ?? rowPayload["Mrc"]; return typeof v === "number" ? v : Number(v ?? 0) })()
          for (const f of child.fields) {
            const k = f.key.toLowerCase()
            if (k === "subtotal_nrc" || k === "sub_total_nrc") {
              rowPayload[f.key] = qty * nrc
            } else if (k === "subtotal_mrc" || k === "sub_total_mrc") {
              rowPayload[f.key] = qty * mrc
            }
          }
        }
        if (hasData) {
          await prisma.docRow.create({ data: { recordId: created.id, childDocTypeId: child.id, idx, data: rowPayload as Prisma.InputJsonValue } })
        }
      }
    }
  }
  if (!childDocTypeKey && docType.key === "invoice") {
    const entries = Array.from(formData.entries())
    const rowsMap = new Map<number, Record<string, unknown>>()
    for (const [k, v] of entries) {
      if (!k.startsWith("row_")) continue
      const m = /^row_(\d+)_(.+)$/.exec(k)
      if (!m) continue
      const idx = Number(m[1])
      const fieldKey = m[2]
      const valStr = typeof v === "string" ? v : String(v)
      const current = rowsMap.get(idx) ?? {}
      if (fieldKey === "qty" || fieldKey === "discount_percent") {
        current[fieldKey] = valStr ? Number(valStr) : null
      } else if (fieldKey === "price") {
        const parsed = parseIDR(valStr)
        current[fieldKey] = parsed != null ? parsed : (valStr ? Number(valStr) : null)
      } else {
        current[fieldKey] = valStr
      }
      rowsMap.set(idx, current)
    }
    for (const [idx, rowPayload] of rowsMap.entries()) {
      const description = String(rowPayload["description"] ?? "").trim()
      const qty = typeof rowPayload["qty"] === "number" ? (rowPayload["qty"] as number) : Number(rowPayload["qty"] ?? 0)
      const price = typeof rowPayload["price"] === "number" ? (rowPayload["price"] as number) : Number(rowPayload["price"] ?? 0)
      const disc = typeof rowPayload["discount_percent"] === "number" ? (rowPayload["discount_percent"] as number) : Number(rowPayload["discount_percent"] ?? 0)
      const hasData = Boolean(description) || (Number.isFinite(qty) && qty > 0) || (Number.isFinite(price) && price > 0)
      if (!hasData) continue
      const subtotal = qty * price * (disc ? (1 - disc / 100) : 1)
      rowPayload["subtotal"] = Number.isFinite(subtotal) ? subtotal : 0
      await prisma.docRow.create({ data: { recordId: created.id, childDocTypeId: null, idx, data: rowPayload as Prisma.InputJsonValue } })
    }
  }
  const saveAndAddAnother = formData.get("saveAndAddAnother") === "true"
  await runDocEventHook("after_insert", docType.key, created.id, me.id)
  revalidatePath(`/admin/docs/${key}`)
  
  if (saveAndAddAnother) {
    const params = new URLSearchParams()
    // Preserve relevant location fields for master_rack or others
    const locationFields = ["branch_id", "building_id", "floor_id", "room_id"]
    locationFields.forEach(f => {
      const val = formData.get(f)
      if (val) params.set(f, String(val))
    })
    redirect(`/admin/docs/${key}/new?${params.toString()}`)
  }
  
  redirect(`/admin/docs/${key}/${created.id}`)
}

export default async function NewRecordPage({ params, searchParams }: { params?: Record<string, string | string[] | undefined> | Promise<Record<string, string | string[] | undefined>>; searchParams?: Record<string, string | string[] | undefined> | Promise<Record<string, string | string[] | undefined>> }) {
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
  const parentId = typeof sp.parentId === "string" ? sp.parentId : ""
  const parentDocTypeKey = typeof sp.parentDocType === "string" ? sp.parentDocType : ""
  const parentDocType = parentDocTypeKey ? await prisma.docType.findUnique({ where: { key: parentDocTypeKey }, include: { fields: true } }) : null
  const parentRecord = parentId && parentDocType ? await prisma.docRecord.findUnique({ where: { id: parentId } }) : null
  const parentRows = parentRecord ? await prisma.docRow.findMany({ where: { recordId: parentRecord.id }, orderBy: { idx: "asc" } }) : []
  
  if (!key) redirect("/admin/doctypes")
  const docType = await prisma.docType.findUnique({ where: { key }, include: { fields: { orderBy: { order: "asc" } }, permissions: true } })
  if (!docType) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold">Dokumen</h1>
        <p>DocType dengan key {key} tidak ditemukan.</p>
        <div>
          <Link href="/admin/doctypes" className="text-sm underline">Ke daftar DocType</Link>
        </div>
      </div>
    )
  }
  const permission = docType.permissions.find((p) => p.roleId === user?.roleId)
  const canCreate = permission ? permission.canCreate : true
  if (!canCreate) {
    redirect(`/admin/docs/${docType.key}`)
  }
  const cookieStore = await cookies()
  const cookieBranchId = cookieStore.get("branchId")?.value
  const branches = user?.assignedBranches?.map((a) => a.branch) ?? []
  const assigned = new Set(branches.map((b) => b.id))
  // Priority: cookie > DocType's branch (if user has access) > first assigned branch
  const docTypeBranchId = docType.branchId && assigned.has(docType.branchId) ? docType.branchId : undefined
  const selectedBranchId = (cookieBranchId && assigned.has(cookieBranchId)) ? cookieBranchId : (docTypeBranchId ?? branches[0]?.id)
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
            const labelRaw = r.code || d[labelField] || d["code"] || d["name"] || d["title"] || r.id
            const valueRaw = valueField === "id" ? r.id : (d[valueField] ?? r.id)
            const label = typeof labelRaw === "string" && labelRaw ? labelRaw : String(r.code || r.id)
            const value = typeof valueRaw === "string" && valueRaw ? valueRaw : r.id
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
  const childMap = (cfgAll["childDocTypes"] ?? {}) as Record<string, string>
  const singleChildKey = typeof cfgAll["childDocTypeKey"] === "string" ? (cfgAll["childDocTypeKey"] as string) : ""
  const childEntitiesByFieldKey: Record<string, { id: string; key: string; name: string; fields: Array<{ id: string; key: string; label: string; type: FieldType; required?: boolean; readOnly?: boolean; config?: Record<string, unknown> }> } | null> = {}
  const childOptionsByFieldKey: Record<string, Record<string, Array<{ label: string; value: string }>>> = {}
  const canAddRowsByFieldKey: Record<string, boolean> = {}
  const defaultValuesByFieldKey: Record<string, Array<Record<string, unknown>>> = {}
  
  // Auto-fill logic for Rack ID
  let suggestedRackId = ""
  if (key === "master_rack") {
    const latestRack = await prisma.docRecord.findFirst({
      where: { docTypeId: docType.id },
      orderBy: { createdAt: "desc" }
    })
    if (latestRack) {
      const data = (latestRack.data ?? {}) as Record<string, any>
      const lastId = String(data.id_rack || "")
      const match = lastId.match(/(\d+)$/)
      if (match) {
        const num = parseInt(match[1], 10)
        const prefix = lastId.slice(0, lastId.length - match[1].length)
        suggestedRackId = `${prefix}${String(num + 1).padStart(match[1].length, "0")}`
      }
    } else {
      suggestedRackId = "R-001"
    }
  }

  for (const tf of docType.fields.filter((f) => f.type === ("TABLE" as FieldType))) {
    const tfConfig = (tf.config ?? {}) as Record<string, unknown>
    const childKey = childMap[tf.key] || (typeof tfConfig["childDocType"] === "string" ? tfConfig["childDocType"] as string : "") || singleChildKey
    const child = childKey ? await prisma.docType.findUnique({ where: { key: childKey }, include: { fields: { orderBy: { order: "asc" } }, permissions: true } }) : null
    childEntitiesByFieldKey[tf.key] = child ? { id: child.id, key: child.key, name: child.name, fields: child.fields.map((cf) => ({ id: cf.id, key: cf.key, label: cf.label, type: cf.type as FieldType, required: cf.required, readOnly: Boolean(cf.readOnly), config: cf.config as Record<string, unknown> | undefined })) } : null
    const perm = child?.permissions?.find((p) => p.roleId === user?.roleId)
    canAddRowsByFieldKey[tf.key] = perm ? Boolean(perm.canCreate) : true
    childOptionsByFieldKey[tf.key] = {}
    
    // Populate default values from parent rows if available
    if (child && parentDocType && parentRows.length > 0) {
      const parentField = parentDocType.fields.find((pf) => pf.key === tf.key && pf.type === ("TABLE" as FieldType))
      if (parentField) {
        const pfConfig = (parentField.config ?? {}) as Record<string, unknown>
        const pChildMap = ((parentDocType.config as Record<string, unknown> | null)?.["childDocTypes"] ?? {}) as Record<string, string>
        const pChildDefaultKey = (parentDocType.config as Record<string, unknown> | null)?.["childDocTypeKey"] as string | undefined
        const parentChildKey = pChildMap[parentField.key] || (typeof pfConfig["childDocType"] === "string" ? pfConfig["childDocType"] as string : "") || pChildDefaultKey
        
        if (parentChildKey) {
          const parentChildDT = await prisma.docType.findUnique({ where: { key: parentChildKey } })
          if (parentChildDT) {
            const relevantRows = parentRows.filter((r) => r.childDocTypeId === parentChildDT.id)
            if (relevantRows.length > 0) {
              defaultValuesByFieldKey[tf.key] = relevantRows.map((r) => (r.data ?? {}) as Record<string, unknown>)
            }
          }
        }
      }
    }

    if (child) {
      for (const f of child.fields) {
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
              childOptionsByFieldKey[tf.key][f.key] = rows.map((r) => {
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
              const rows: Array<Record<string, unknown>> = await client[modelProp].findMany({ where: whereClause })
              childOptionsByFieldKey[tf.key][f.key] = rows.map((r) => {
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
            childOptionsByFieldKey[tf.key][f.key] = cfg.options
          }
        }
      }
    }
  }

  return (
    <div className="min-h-screen bg-slate-50/30 -m-4 sm:-m-6 p-4 sm:p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-4">
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
            <span className="text-slate-900 font-medium">New</span>
          </div>

          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-2xl bg-white border border-slate-200/80 flex items-center justify-center shadow-sm">
                {docType.icon ? (
                  <IconDisplay name={docType.icon} className="h-7 w-7 text-slate-700" />
                ) : (
                  <Plus className="h-7 w-7 text-slate-700" />
                )}
              </div>
              <div>
                <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Tambah {docType.name}</h1>
                <div className="flex items-center gap-2 mt-1 text-sm text-slate-500">
                  <span className="font-mono text-xs px-1.5 py-0.5 bg-slate-100 rounded text-slate-600">{docType.key}</span>
                  {parentDocType && parentRecord && (
                    <>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Link2 className="h-3 w-3" />
                        Dari {parentDocType.name}: <span className="text-slate-700 font-mono">{parentRecord.code}</span>
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>

            <Button asChild variant="ghost" size="sm" className="text-slate-600 hover:text-slate-900 h-9">
              <Link href={`/admin/docs/${docType.key}`}>
                <ArrowLeft className="h-3.5 w-3.5 mr-1.5" />
                Kembali
              </Link>
            </Button>
          </div>
        </div>

        <form action={createRecord} id="new-record-form" className="space-y-6">
          <input type="hidden" name="docTypeKey" value={docType.key} />
          <input type="hidden" name="parentId" value={parentId} />
          <input type="hidden" name="parentDocType" value={parentDocTypeKey} />
          <input type="hidden" name="branch_id" value={selectedBranchId || ""} />
          {suggestedRackId && <input type="hidden" name="id_rack" value={suggestedRackId} />}

          {/* Form fields card */}
          <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
          {docType.fields.map((f) => {
            const valFromParams = sp[f.key]
            const defaultValueFromParams = Array.isArray(valFromParams) ? valFromParams[0] : (valFromParams ?? undefined)
            
            // Apply suggested value for rack_id if it is not in params
            const finalDefaultValue = (f.key === "id_rack" && !defaultValueFromParams) 
              ? suggestedRackId 
              : defaultValueFromParams

            if (f.key === "id_rack") return null
            if (docType.key === "invoice" && (
              f.key === "subscription_id" || f.key === "subscription" || f.key === "subscriptionId" ||
              f.key === "prorate_details" || f.key === "prorateDetails" ||
              f.key === "billing_period_start" || f.key === "billing_period_end" ||
              f.key === "nrc_amount" || f.key === "mrc_amount"
            )) return null

            if (f.key.startsWith("__header_")) {
              return (
                <div key={f.id} className="col-span-full pt-2 pb-2 first:pt-0">
                  <h3 className="text-sm font-semibold text-slate-900 tracking-tight flex items-center gap-2">
                    <span className="h-4 w-0.5 bg-slate-900 rounded-full" />
                    {f.label}
                  </h3>
                </div>
              )
            }

            if (f.type === ("TEXT" as FieldType)) {
              return (
                <div key={f.id} className="space-y-2">
                  <Label>{f.label}{f.required ? " *" : ""}</Label>
                  <Input name={f.key} readOnly={f.readOnly} placeholder={f.readOnly ? "Otomatis" : undefined} defaultValue={finalDefaultValue} />
                </div>
              )
            }
            if (f.type === ("TEXTAREA" as FieldType)) {
              return (
                <div key={f.id} className="space-y-2">
                  <Label>{f.label}{f.required ? " *" : ""}</Label>
                  <textarea name={f.key} className="border rounded p-2 w-full min-h-24 text-sm" readOnly={f.readOnly} placeholder={f.readOnly ? "Otomatis" : undefined} defaultValue={finalDefaultValue} />
                </div>
              )
            }
            if (f.type === ("NUMBER" as FieldType)) {
              const cfg = (f.config ?? {}) as unknown as { defaultValue?: number }
              const dv = finalDefaultValue ?? (typeof cfg.defaultValue === "number" ? String(cfg.defaultValue) : undefined)
              return (
                <div key={f.id} className="space-y-2">
                  <Label>{f.label}{f.required ? " *" : ""}</Label>
                  <Input name={f.key} type="number" readOnly={f.readOnly} placeholder={f.readOnly ? "Otomatis" : undefined} defaultValue={dv} />
                </div>
              )
            }
            if (f.type === ("DROPDOWN" as FieldType)) {
              const cfg = (f.config ?? {}) as unknown as { options?: Array<{ label: string; value: string }>; source?: Record<string, unknown> }
              const src = cfg?.source as Record<string, unknown> | undefined
              const options = dynamicOptions[f.key] ?? (Array.isArray(cfg.options) ? cfg.options : [])
              const targetKey = src && typeof src["key"] === "string" ? (src["key"] as string)
                : src && typeof src["docTypeKey"] === "string" ? (src["docTypeKey"] as string)
                : src && typeof src["target"] === "string" ? (src["target"] as string)
                : ""
              const hasConfiguredFilter = Boolean(src && typeof src["filter"] === "object")
              const isInvoiceSubscriptionField = docType.key === "invoice"
                && String(f.key || "").toLowerCase().includes("subscription")
                && String(targetKey || "").toLowerCase() === "subscription_management"
              const canInjectInvoiceCustomerFilter = isInvoiceSubscriptionField && !hasConfiguredFilter
              const customerFieldKey = canInjectInvoiceCustomerFilter
                ? (docType.fields.find((x) => ["customer_id", "customer", "company_id", "company"].includes(String(x.key || "").toLowerCase()))?.key || "")
                : ""
              const hasFilter = hasConfiguredFilter || Boolean(canInjectInvoiceCustomerFilter && customerFieldKey)
              if (hasFilter) {
                const filterRaw = canInjectInvoiceCustomerFilter
                  ? ({ dependsOn: customerFieldKey, field: "customer_id" } as unknown)
                  : (() => {
                      const raw = src?.["filter"] as unknown
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
                return (
                  <div key={f.id} className="space-y-2">
                    <DependentDropdown
                      name={f.key}
                      label={f.label}
                      required={f.required}
                      options={canInjectInvoiceCustomerFilter ? [] : options}
                      source={sourceObj}
                      branchId={selectedBranchId}
                      defaultValue={finalDefaultValue}
                      initialDependsOnValues={Object.fromEntries(
                        Object.entries(sp)
                          .filter(([_, v]) => typeof v === "string")
                          .map(([k, v]) => [k, v as string])
                      )}
                    />
                    {(() => {
                      const isProduct = (typeof sourceObj.table === "string" && String(sourceObj.table).toLowerCase() === "product") || (typeof sourceObj.key === "string" && String(sourceObj.key).toLowerCase().includes("product")) || f.key === "product_id"
                      return isProduct ? <QuotationItemSpecs dependsOnName={f.key} branchId={selectedBranchId} namePrefix="" /> : null
                    })()}
                  </div>
                )
              }
              return (
                <div key={f.id} className="space-y-2">
                  <Label>{f.label}{f.required ? " *" : ""}</Label>
                  <SearchableSelect name={f.key} placeholder={f.readOnly ? "Otomatis" : "-"} options={options} disabled={f.readOnly} defaultValue={finalDefaultValue} emitChangeEvent={true} />
                  {(() => {
                    const isProduct = (typeof src?.["table"] === "string" && String(src?.["table"]).toLowerCase() === "product") || (typeof src?.["key"] === "string" && String(src?.["key"]).toLowerCase().includes("product")) || f.key === "product_id"
                    return isProduct ? <QuotationItemSpecs dependsOnName={f.key} branchId={selectedBranchId} namePrefix="" /> : null
                  })()}
                </div>
              )
            }
            if (f.type === ("CHECKBOX" as FieldType)) {
              return (
                <div key={f.id} className="flex items-center gap-2">
                  <input type="checkbox" name={f.key} readOnly={f.readOnly} defaultChecked={finalDefaultValue === "true"} />
                  <Label>{f.label}</Label>
                </div>
              )
            }
            if (f.type === ("DATE" as FieldType)) {
              const cfg = (f.config ?? {}) as unknown as { defaultNow?: boolean; defaultDateCreated?: boolean }
              const today = formatDateInput(new Date())
              const useDefault = (cfg.defaultNow !== false) || (cfg.defaultDateCreated === true)
              return (
                <div key={f.id} className="space-y-2">
                  <Label>{f.label}{f.required ? " *" : ""}</Label>
                  <Input name={f.key} type="date" readOnly={f.readOnly} placeholder={f.readOnly ? "Otomatis" : undefined} defaultValue={finalDefaultValue ?? (useDefault ? today : undefined)} />
                </div>
              )
            }
            if (f.type === ("DATETIME" as FieldType)) {
              return (
                <div key={f.id} className="space-y-2">
                  <Label>{f.label}{f.required ? " *" : ""}</Label>
                  <Input name={f.key} type="datetime-local" readOnly={f.readOnly} placeholder={f.readOnly ? "Otomatis" : undefined} defaultValue={finalDefaultValue} />
                </div>
              )
            }
            if (f.type === ("PRICE" as FieldType)) {
              return (
                <div key={f.id} className="space-y-2">
                  <Label>{f.label}{f.required ? " *" : ""}</Label>
                  <Input name={f.key} type="number" readOnly={f.readOnly} placeholder={f.readOnly ? "Otomatis" : undefined} defaultValue={finalDefaultValue} />
                </div>
              )
            }
            if (f.type === ("LINK" as FieldType)) {
              const cfg = (f.config ?? {}) as unknown as { target?: string }
              return (
                <div key={f.id} className="space-y-2">
                  <Label>{f.label}{f.required ? " *" : ""}</Label>
                  <Input name={f.key} placeholder={f.readOnly ? "Otomatis" : (cfg.target ? `Link ke ${cfg.target}` : "Link")} readOnly={f.readOnly} defaultValue={finalDefaultValue} />
                </div>
              )
            }
            if (f.type === ("ATTACHMENT" as FieldType)) {
              return (
                <div key={f.id} className="space-y-2">
                  <Label>{f.label}{f.required ? " *" : ""}</Label>
                  <Input name={f.key} type="file" readOnly={f.readOnly} />
                </div>
              )
            }
            if (f.type === ("TABLE" as FieldType)) {
              const child = childEntitiesByFieldKey[f.key]
              const defaultValues = defaultValuesByFieldKey[f.key]

              return (
                <div key={f.id} className="space-y-3 md:col-span-2">
                  <div className="text-sm font-semibold">{f.label}</div>
                  {child ? (
                    <div className="space-y-3">
                      <input type="hidden" name="childDocTypeKey" value={child.key} />
                      <ChildRowsAccordion
                        fields={child.fields.map((cf) => ({ id: cf.id, key: cf.key, label: cf.label, type: cf.type as FieldType, required: cf.required, readOnly: cf.readOnly, config: cf.config as Record<string, unknown> | undefined }))}
                        optionsMap={childOptionsByFieldKey[f.key] ?? {}}
                        branchId={selectedBranchId}
                        formId="new-record-form"
                        canAddRows={canAddRowsByFieldKey[f.key]}
                        childName={(child.name && child.name.trim()) ? child.name : String(child.key).replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                        defaultValues={defaultValues}
                      />
                    </div>
                  ) : (
                    <div className="text-xs text-muted-foreground">Konfigurasi baris tidak tersedia</div>
                  )}
                </div>
              )
            }
          return null
        })}
        {docType.key === "invoice" && docType.fields.every((x) => x.type !== ("TABLE" as FieldType)) ? (
          <div className="space-y-3 md:col-span-2">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">Invoice Items</div>
            <ChildRowsAccordion
              fields={[
                { id: "invoice_item_description", key: "description", label: "Description", type: ("TEXT" as FieldType), required: true },
                { id: "invoice_item_qty", key: "qty", label: "Qty", type: ("NUMBER" as FieldType), required: true, config: { defaultValue: 1 } },
                { id: "invoice_item_price", key: "price", label: "Unit Price", type: ("PRICE" as FieldType), required: true },
                { id: "invoice_item_discount", key: "discount_percent", label: "Discount (%)", type: ("NUMBER" as FieldType) },
              ]}
              optionsMap={{}}
              branchId={selectedBranchId}
              formId="new-record-form"
              canAddRows={true}
              childName="Item"
            />
          </div>
        ) : null}
        </div>
        </div>

        {/* Submit Actions */}
        <div className="flex items-center justify-between bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm sticky bottom-4">
          <div className="text-xs text-slate-500">
            <span className="font-mono">{docType.key}</span>
            <span className="mx-2">·</span>
            <span>Fields dengan tanda <span className="text-red-500">*</span> wajib diisi</span>
          </div>
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm" className="h-9 text-slate-600">
              <Link href={`/admin/docs/${docType.key}`}>Batal</Link>
            </Button>
            <Button
              type="submit"
              name="saveAndAddAnother"
              value="true"
              variant="outline"
              size="sm"
              className="h-9 border-slate-200"
            >
              <Copy className="h-3.5 w-3.5 mr-1.5" />
              Simpan & Tambah Lagi
            </Button>
            <Button type="submit" size="sm" className="h-9 bg-slate-900 hover:bg-slate-800 text-white shadow-sm">
              <Save className="h-3.5 w-3.5 mr-1.5" />
              Simpan
            </Button>
          </div>
        </div>
      </form>
    </div>
    </div>
  )
}
