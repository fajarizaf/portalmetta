
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { cookies } from "next/headers"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { FieldType } from "@/generated/prisma/enums"
import type { Prisma } from "@/generated/prisma/client"
import { SearchableSelect } from "@/components/ui/select"
import DependentDropdown from "@/components/dependent-dropdown"
import ChildRowsAccordion from "@/components/child-rows-accordion"
import { runDocEventHook } from "@/lib/doc-hooks"
import QuotationItemSpecs from "@/components/quotation-item-specs"
import { ValidatedButton } from "@/components/validated-button"
import { FormValidationProvider } from "@/components/form-validation-context"
import fs from "fs/promises"
import path from "path"

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
  console.log("createRecord started")
  const session = await getServerSession(authOptions)
  const email = session?.user?.email ?? ""
  console.log("Session email:", email)
  const me = email ? await prisma.user.findUnique({ where: { email }, include: { role: true, assignedBranches: { include: { branch: true } } } }) : null
  if (!me) { console.log("User not found"); return }
  const key = String(formData.get("docTypeKey") || "")
  console.log("DocType Key:", key)
  const docType = await prisma.docType.findUnique({ where: { key } , include: { fields: true, permissions: true } })
  if (!docType) { console.log("DocType not found"); return }
  const docTypeId = docType.id
  const perm = docType.permissions.find((p) => p.roleId === me.roleId)
  if (perm && !perm.canCreate) { console.log("Permission denied"); return }
  
  // For customers, we usually don't set branchId unless they are assigned to one, or it's global
  // Assuming requests are global or tied to customer's company if needed, but schema uses branchId
  // We'll keep branchId null if not explicitly managed, or reuse existing logic if customers are assigned to branches
  const cookieStore = await cookies()
  const cookieBranchId = cookieStore.get("branchId")?.value
  
  const userCompanyId = me.companyId ?? null
  const parentCompanyId = userCompanyId ? (await prisma.company.findUnique({ where: { id: userCompanyId }, select: { parentId: true } }))?.parentId ?? null : null
  const scopeCompanyId = parentCompanyId ?? userCompanyId
  const branches = scopeCompanyId ? await prisma.branch.findMany({ where: { companyId: scopeCompanyId }, orderBy: { name: "asc" } }) : []
  const allowedBranchIds = new Set(branches.map((b) => b.id))
  const candidateBranchId = cookieBranchId ?? branches[0]?.id
  const selectedBranchId = allowedBranchIds.has(String(candidateBranchId)) ? candidateBranchId : branches[0]?.id
  const branchId = selectedBranchId ?? (docType.branchId ?? null)
  
  const payload: Record<string, unknown> = {}
  const parentFiles: Record<string, File> = {}
  for (const f of docType.fields) {
    if (f.readOnly) continue
    if (f.type === ("TABLE" as FieldType)) continue
    if (f.key === "status") continue
    if (f.type === ("CHECKBOX" as FieldType)) {
      const raw = String(formData.get(f.key) || "")
      payload[f.key] = raw === "on"
      continue
    }
    if (f.type === ("ATTACHMENT" as FieldType)) {
      const file = formData.get(f.key)
      if (file instanceof File && file.size > 0) {
        parentFiles[f.key] = file
      }
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
  // Auto-fill owner_customer_id from session (customer's company)
  if (me.companyId) {
    const company = await prisma.company.findUnique({ where: { id: me.companyId }, select: { name: true } })
    payload["owner_customer_id"] = company?.name || me.companyId
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
  async function generateUniqueSeriesCode(pattern: string, branchId: string | undefined): Promise<string> {
    // Attempt multiple times to avoid collisions across branches or previous codes
    for (let attempt = 0; attempt < 10; attempt++) {
      const candidate = await generateSeriesCode(pattern, branchId)
      const exists = await prisma.docRecord.findUnique({ where: { code: candidate } })
      if (!exists) return candidate
    }
    // Fallback: add random suffix to ensure uniqueness if collisions persist
    const base = await generateSeriesCode(pattern, branchId)
    return `${base}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`
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
    if (!wf) {
      wf = await prisma.docWorkflow.findFirst({ where: { docTypeId: docType.id, isActive: true }, orderBy: { branchId: "desc" } })
    }
  } catch {}
  const wfCfg = wf?.config ? (wf.config as unknown as { states?: Array<{ name: string; docStatus?: number }> }) : { states: [] }
  const initialState = wfCfg.states && wfCfg.states.length > 0 ? wfCfg.states[0] : undefined
  const initialStatus = initialState ? initialState.name : "DRAFT"
  const initialDocStatus = typeof initialState?.docStatus === "number" ? initialState.docStatus : undefined
  const effectiveBranchId = branchId || undefined
  let code: string | undefined = undefined
  const chosenPattern = nextCodePatternString()
  if (chosenPattern) {
    if (namingMode === "series") {
      console.log("Generating series code...")
      code = await generateUniqueSeriesCode(chosenPattern, effectiveBranchId)
      console.log("Generated code:", code)
    } else {
      code = chosenPattern
    }
  }
  const parentId = String(formData.get("parentId") || "")
  const parentDocTypeKey = String(formData.get("parentDocType") || "")

  console.log("Creating parent record...")
  const created = await prisma.docRecord.create({
    data: {
      docTypeId: docType.id,
      branchId: effectiveBranchId,
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
  console.log("Parent record created:", created.id)
  {
    const fileKeys = Object.keys(parentFiles)
    if (fileKeys.length > 0) {
      const dir = path.join(process.cwd(), "public", "uploads", "doc-attachments", docType.key, created.id)
      await fs.mkdir(dir, { recursive: true })
      const nextData = { ...(created.data as unknown as Record<string, unknown>) }
      for (const k of fileKeys) {
        const file = parentFiles[k]
        const extRaw = (file.name || "").includes(".") ? (file.name.split(".").pop() || "") : ""
        const ext = extRaw ? `.${extRaw.replace(/[^A-Za-z0-9]/g, "")}` : ""
        const fileName = `${k}-${Date.now()}${ext}`
        const abs = path.join(dir, fileName)
        const buf = Buffer.from(await file.arrayBuffer())
        await fs.writeFile(abs, buf)
        nextData[k] = `/api/uploads/doc-attachments/${docType.key}/${created.id}/${fileName}`
      }
      await prisma.docRecord.update({ where: { id: created.id }, data: { data: nextData as Prisma.InputJsonValue } })
    }
  }
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
      const attachmentKeys = new Set(child.fields.filter((cf) => cf.type === ("ATTACHMENT" as FieldType)).map((cf) => cf.key))
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
        const current = rowsMap.get(idx) ?? {}
        if (attachmentKeys.has(fieldKey)) {
          if (v instanceof File && v.size > 0) {
            current[fieldKey] = v
          }
          rowsMap.set(idx, current)
          continue
        }
        const valStr = typeof v === "string" ? v : String(v)
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
          current[fieldKey] = (fieldKey === "item_name" && valStr.includes("::")) ? valStr.split("::")[0] : valStr
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
          if (v instanceof File) return v.size > 0
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
        if (attachmentKeys.size > 0) {
          const dir = path.join(process.cwd(), "public", "uploads", "doc-attachments", child.key, created.id)
          let dirReady = false
          for (const k of attachmentKeys) {
            const v = rowPayload[k]
            if (!(v instanceof File) || v.size === 0) continue
            if (!dirReady) {
              await fs.mkdir(dir, { recursive: true })
              dirReady = true
            }
            const extRaw = (v.name || "").includes(".") ? (v.name.split(".").pop() || "") : ""
            const ext = extRaw ? `.${extRaw.replace(/[^A-Za-z0-9]/g, "")}` : ""
            const fileName = `row-${idx}-${k}-${Date.now()}${ext}`
            const abs = path.join(dir, fileName)
            const buf = Buffer.from(await v.arrayBuffer())
            await fs.writeFile(abs, buf)
            rowPayload[k] = `/api/uploads/doc-attachments/${child.key}/${created.id}/${fileName}`
            hasData = true
          }
        }
        if (hasData) {
          await prisma.docRow.create({ data: { recordId: created.id, childDocTypeId: child.id, idx, data: rowPayload as Prisma.InputJsonValue } })
        }
      }
    }
  }
  console.log("Running after_insert hook...")
  await runDocEventHook("after_insert", docType.key, created.id, me.id)
  console.log("Hook finished. Redirecting...")
  revalidatePath(`/customer/docs/${key}`)
  redirect(`/customer/docs/${key}/${created.id}`)
}

export default async function NewRecordPage({ params, searchParams }: { params?: Record<string, string | string[] | undefined> | Promise<Record<string, string | string[] | undefined>>; searchParams?: Record<string, string | string[] | undefined> | Promise<Record<string, string | string[] | undefined>> }) {
  const session = await getServerSession(authOptions)
  const email = session?.user?.email ?? ""
  const user = email ? await prisma.user.findUnique({ where: { email }, include: { role: { include: { permissions: { include: { permission: true } } } }, assignedBranches: { include: { branch: true } } } }) : null
  
  // Customer specific permission check
  if (!user) redirect("/customer")
  
  const cookieStore = await cookies()
  const cookieBranchId = cookieStore.get("branchId")?.value
  const userCompanyId = user.companyId ?? null
  const parentCompanyId = userCompanyId ? (await prisma.company.findUnique({ where: { id: userCompanyId }, select: { parentId: true } }))?.parentId ?? null : null
  const scopeCompanyId = parentCompanyId ?? userCompanyId
  const companyName = userCompanyId ? (await prisma.company.findUnique({ where: { id: userCompanyId }, select: { name: true } }))?.name ?? "" : ""
  const branches = scopeCompanyId ? await prisma.branch.findMany({ where: { companyId: scopeCompanyId }, orderBy: { name: "asc" } }) : []
  const allowedBranchIds = new Set(branches.map((b) => b.id))
  const candidateBranchId = cookieBranchId ?? branches[0]?.id
  const selectedBranchId = allowedBranchIds.has(String(candidateBranchId)) ? candidateBranchId : branches[0]?.id

  const p = ((await params) ?? {}) as Record<string, string | string[] | undefined>
  const sp = ((await searchParams) ?? {}) as Record<string, string | string[] | undefined>
  const keyRaw = p?.key
  const key = typeof keyRaw === "string" ? keyRaw : Array.isArray(keyRaw) ? keyRaw[0] : ""
  const parentId = typeof sp.parentId === "string" ? sp.parentId : ""
  const parentDocTypeKey = typeof sp.parentDocType === "string" ? sp.parentDocType : ""
  
  if (!key) redirect("/customer")
  const docType = await prisma.docType.findUnique({ where: { key }, include: { fields: { orderBy: { order: "asc" } }, permissions: true } })
  if (!docType) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold">Dokumen</h1>
        <p>DocType dengan key {key} tidak ditemukan.</p>
        <div>
          <Link href="/customer" className="text-sm underline">Kembali ke Dashboard</Link>
        </div>
      </div>
    )
  }

  const permission = docType.permissions.find((p) => p.roleId === user.roleId)
  if (!permission || !permission.canCreate) {
    return (
        <div className="space-y-4">
          <h1 className="text-2xl font-semibold">Akses Ditolak</h1>
          <p>Anda tidak memiliki izin untuk membuat dokumen ini.</p>
          <Button asChild>
              <Link href="/customer">Kembali</Link>
          </Button>
        </div>
      )
  }

  const dynamicOptions: Record<string, Array<{ label: string; value: string }>> = {}
  for (const f of docType.fields) {
    if (f.type === ("DROPDOWN" as FieldType)) {
      const cfg = (f.config ?? {}) as unknown as { options?: Array<{ label: string; value: string }>; source?: Record<string, unknown> }
      const src = cfg?.source as Record<string, unknown> | undefined
      const targetKey = src && typeof src["key"] === "string" ? (src["key"] as string) : ""
      if (src && src["table"] === "Product" && targetKey) {
        // Fetch products, filter by branch if needed
        // For customer, maybe we want to show all active products or filter by some logic
        // Reusing similar logic to admin but scoped
        const products = await prisma.product.findMany({ where: { active: true } })
        dynamicOptions[f.key] = products.map((prod) => ({ label: prod.name, value: prod.id }))
      } else if (cfg?.options) {
        dynamicOptions[f.key] = cfg.options
      }
    }
  }

  const cfg = (docType.config ?? {}) as unknown as Record<string, unknown>
  const childDocTypeKey = typeof cfg["childDocTypeKey"] === "string" ? (cfg["childDocTypeKey"] as string) : ""
  let childDocType = null
  const childOptionsMap: Record<string, Array<{ label: string; value: string }>> = {}

  if (childDocTypeKey) {
    childDocType = await prisma.docType.findUnique({ where: { key: childDocTypeKey }, include: { fields: { orderBy: { order: "asc" } } } })
    if (childDocType) {
      // Logic for Goods Out: Fetch available stock if childDocType is goods_out_item
      if (childDocTypeKey === "goods_out_item") {
        const goodsInItemType = await prisma.docType.findUnique({ where: { key: "goods_in_item" } })
        const goodsOutItemType = await prisma.docType.findUnique({ where: { key: "goods_out_item" } })
        
        if (goodsInItemType && goodsOutItemType) {
          // Fetch Goods In
          const goodsInItems = await prisma.docRow.findMany({
            where: {
              childDocTypeId: goodsInItemType.id,
              record: {
                createdById: user.id,
                OR: [{ status: { equals: "Completed" } }, { status: { contains: "Complete" } }, { status: { contains: "COMPLETED" } }],
              },
            },
            include: { record: true },
          })
          
          // Fetch Goods Out
          const goodsOutItems = await prisma.docRow.findMany({
            where: {
              childDocTypeId: goodsOutItemType.id,
              record: {
                createdById: user.id,
                OR: [{ status: { equals: "Completed" } }, { status: { contains: "Complete" } }, { status: { contains: "COMPLETED" } }],
              },
            },
            include: { record: true },
          })
          
          // Calculate Balance
           const balanceMap = new Map<string, { id: string, name: string, qty: number, serial: string, desc: string, brand: string, type_of_material: string, building_id: string, floor_id: string, room_id: string, owner_customer_id: string }>()
           
           goodsInItems.forEach(item => {
             const d = (item.data ?? {}) as Record<string, unknown>
             const name = String(d.item_name || "Unknown")
             const qty = Number(d.quantity || 0)
             const sn = String(d.serial_number || "")
             const desc = String(d.description || "")
             const brand = String(d.brand || "")
             const typeOfMaterial = String(d.type_of_material || "")
             const buildingId = String(d.building_id || "")
             const floorId = String(d.floor_id || "")
             const roomId = String(d.room_id || "")
             const ownerCustomerId = String(d.owner_customer_id || "")
             
             // Create a unique key for grouping. If serial number exists, it should be unique.
             // If no serial, group by name + material + location.
             const key = sn ? `${name}::${sn}` : `${name}::${typeOfMaterial}::${buildingId}::${floorId}::${roomId}`
             
             if (!balanceMap.has(key)) {
               balanceMap.set(key, { id: key, name, qty: 0, serial: sn, desc, brand, type_of_material: typeOfMaterial, building_id: buildingId, floor_id: floorId, room_id: roomId, owner_customer_id: ownerCustomerId })
             }
             const entry = balanceMap.get(key)!
             entry.qty += qty
             if (desc && !entry.desc) entry.desc = desc
             if (brand && !entry.brand) entry.brand = brand
             if (typeOfMaterial && !entry.type_of_material) entry.type_of_material = typeOfMaterial
             if (buildingId && !entry.building_id) entry.building_id = buildingId
             if (floorId && !entry.floor_id) entry.floor_id = floorId
             if (roomId && !entry.room_id) entry.room_id = roomId
             if (ownerCustomerId && !entry.owner_customer_id) entry.owner_customer_id = ownerCustomerId
           })
          
          goodsOutItems.forEach(item => {
            const d = (item.data ?? {}) as Record<string, unknown>
            const name = String(d.item_name || "Unknown")
            const qty = Number(d.quantity || 0)
            const sn = String(d.serial_number || "")
            const typeOfMaterial = String(d.type_of_material || "")
            const buildingId = String(d.building_id || "")
            const floorId = String(d.floor_id || "")
            const roomId = String(d.room_id || "")
            const key = sn ? `${name}::${sn}` : `${name}::${typeOfMaterial}::${buildingId}::${floorId}::${roomId}`
            
            if (balanceMap.has(key)) {
              balanceMap.get(key)!.qty -= qty
            } else {
              const fallbackKey = sn ? `${name}::${sn}` : name
              if (balanceMap.has(fallbackKey)) {
                balanceMap.get(fallbackKey)!.qty -= qty
              }
            }
          })
          
          // Generate Options for Item Name Dropdown
          const stockOptions = Array.from(balanceMap.values())
            .filter(i => i.qty > 0)
            .map(i => ({
              label: `${i.name} (Qty: ${i.qty}${i.serial ? `, SN: ${i.serial}` : ""})`,
              value: i.id,
              original: i
            }))
            
          // Inject into childOptionsMap
          for (const f of childDocType.fields) {
            if (f.key === "item_name") {
               childOptionsMap[f.key] = stockOptions
            }
          }
        }
      }
      
      // Standard logic for other child doc types
      for (const f of childDocType.fields) {
        if (f.key === "item_name" && childDocTypeKey === "goods_out_item") continue // Skip if already handled

        if (f.type === ("DROPDOWN" as FieldType)) {
          const cfg = (f.config ?? {}) as unknown as { options?: Array<{ label: string; value: string }>; source?: Record<string, unknown> }
          const src = cfg?.source as Record<string, unknown> | undefined
          const targetKey = src && typeof src["key"] === "string" ? (src["key"] as string) : ""
          if (targetKey) {
            // DocType mode — fetch all records (client-side DependentDropdown handles filtering)
            const dt = await prisma.docType.findUnique({ where: { key: targetKey } })
            if (dt) {
              const labelField = src && typeof src["labelField"] === "string" ? (src["labelField"] as string) : "name"
              const valueField = src && typeof src["valueField"] === "string" ? (src["valueField"] as string) : "id"
              const recs = await prisma.docRecord.findMany({ where: { docTypeId: dt.id, ...(selectedBranchId ? { branchId: selectedBranchId } : {}) }, orderBy: { createdAt: "desc" } })
              childOptionsMap[f.key] = recs.map((r) => {
                const d = (r.data ?? {}) as Record<string, unknown>
                const labelRaw = d[labelField]
                const valueRaw = d[valueField]
                const label = typeof labelRaw === "string" ? labelRaw : String(labelRaw ?? r.id)
                const value = typeof valueRaw === "string" ? valueRaw : r.id
                return { label, value }
              })
            }
          } else if (src && typeof src["table"] === "string" && src["table"]) {
            // Table mode — fetch from Prisma model directly (client-side DependentDropdown handles filtering)
            const tableName = String(src["table"])
            const modelProp = tableName.slice(0, 1).toLowerCase() + tableName.slice(1)
            const client = prisma as unknown as Record<string, { findMany: (args?: unknown) => Promise<Array<Record<string, unknown>>> }>
            if (typeof client[modelProp]?.findMany === "function") {
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
              const recs = await client[modelProp].findMany({ where: whereClause })
              childOptionsMap[f.key] = recs.map((r) => {
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
          } else if (cfg?.options) {
             childOptionsMap[f.key] = cfg.options
          }
        }
      }
    }
  }

  const formId = "new-record-form"

  return (
    <div className="container mx-auto py-6 max-w-4xl">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" asChild>
          <Link href={`/customer/docs/${key}`}>
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">New {docType.name}</h1>
          <p className="text-muted-foreground text-sm">Fill in the form below to create a new document</p>
        </div>
      </div>
      
      <FormValidationProvider formId={formId}>
      <form id={formId} action={createRecord} className="space-y-8 bg-white p-6 rounded-lg border">
        <input type="hidden" name="docTypeKey" value={key} />
        <input type="hidden" name="parentId" value={parentId} />
        <input type="hidden" name="parentDocType" value={parentDocTypeKey} />
        <input type="hidden" name="status" value="Draft" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {docType.fields.map((f) => {
                if (f.readOnly) return null
                if (f.type === ("TABLE" as FieldType)) return null
                if (f.key === "status") return null
                if (f.key === "branch_id") {
                  return <input key={f.id} type="hidden" name="branch_id" value={selectedBranchId || ""} />
                }

                if (f.key === "owner_customer_id") {
                  return (
                    <div key={f.id} className="col-span-1">
                      <Label className="mb-2 block">{f.label}</Label>
                      <input type="hidden" name="owner_customer_id" value={companyName} />
                      <div className="flex h-10 w-full rounded-md border border-input bg-muted px-3 py-2 text-sm">{companyName || "-"}</div>
                    </div>
                  )
                }

                if (f.key.startsWith("__header_")) {
                  return (
                    <div key={f.id} className="col-span-full pt-4 pb-2 border-b border-dashed">
                      <h3 className="text-sm font-bold text-primary">{f.label}</h3>
                    </div>
                  )
                }

                return (
                    <div key={f.key} className={f.type === ("TEXTAREA" as FieldType) ? "col-span-1 md:col-span-2" : "col-span-1"}>
                        <Label htmlFor={f.key} className="mb-2 block">
                            {f.label} {f.required && <span className="text-red-500">*</span>}
                        </Label>
                        
                        {(() => {
                            if (f.type === ("DROPDOWN" as FieldType)) {
                                const cfg = (f.config ?? {}) as unknown as { options?: Array<{ label: string; value: string }>; source?: Record<string, unknown> }
                                const src = cfg?.source as Record<string, unknown> | undefined
                                const options = dynamicOptions[f.key] || []
                                const hasFilter = Boolean(src && typeof src["filter"] === "object")
                                
                                if (hasFilter) {
                                    const filterRaw = src?.["filter"] as unknown
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
                                        <>
                                            <DependentDropdown
                                                name={f.key}
                                                label="" // Label is already rendered outside
                                                options={options}
                                                source={sourceObj}
                                                branchId={selectedBranchId || undefined}
                                                initialDependsOnValues={{ branch_id: selectedBranchId || "" }}
                                            />
                                            {(() => {
                                              const isProduct = (typeof sourceObj.table === "string" && String(sourceObj.table).toLowerCase() === "product") || (typeof sourceObj.key === "string" && String(sourceObj.key).toLowerCase().includes("product")) || f.key === "product_id"
                                              return isProduct ? <QuotationItemSpecs dependsOnName={f.key} branchId={selectedBranchId || undefined} namePrefix="" /> : null
                                            })()}
                                        </>
                                    )
                                }
                                
                                return (
                                    <>
                                        <SearchableSelect 
                                            name={f.key} 
                                            options={options} 
                                            placeholder={`Select ${f.label}`} 
                                            emitChangeEvent={true}
                                        />
                                        {(() => {
                                            const isProduct = (typeof src?.["table"] === "string" && String(src?.["table"]).toLowerCase() === "product") || (typeof src?.["key"] === "string" && String(src?.["key"]).toLowerCase().includes("product")) || f.key === "product_id"
                                            return isProduct ? <QuotationItemSpecs dependsOnName={f.key} branchId={selectedBranchId || undefined} namePrefix="" /> : null
                                        })()}
                                    </>
                                )
                            }
                            
                            if (f.type === ("TEXTAREA" as FieldType)) {
                                return (
                                    <textarea 
                                        name={f.key} 
                                        id={f.key} 
                                        className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        required={f.required}
                                    />
                                )
                            }
                            
                            if (f.type === ("DATE" as FieldType)) {
                                return <Input type="date" name={f.key} id={f.key} required={f.required} defaultValue={formatDateInput(new Date())} />
                            }
                            
                            if (f.type === ("CHECKBOX" as FieldType)) {
                                return (
                                    <div className="flex items-center space-x-2">
                                        <Input type="checkbox" name={f.key} id={f.key} className="w-4 h-4" />
                                        <span className="text-sm text-muted-foreground">Yes</span>
                                    </div>
                                )
                            }

                            if (f.type === ("ATTACHMENT" as FieldType)) {
                                return (
                                    <Input 
                                        type="file" 
                                        name={f.key} 
                                        id={f.key} 
                                        required={f.required} 
                                    />
                                )
                            }
                            
                            return (
                                <Input 
                                    type={f.type === ("NUMBER" as FieldType) || f.type === ("PRICE" as FieldType) ? "number" : "text"} 
                                    name={f.key} 
                                    id={f.key} 
                                    required={f.required} 
                                />
                            )
                        })()}
                    </div>
                )
            })}
        </div>

        {childDocType && (
            <div className="mt-8 pt-6 border-t">
                <h3 className="text-lg font-semibold mb-4">{childDocType.name} Items</h3>
                <input type="hidden" name="childDocTypeKey" value={childDocType.key} />
                <ChildRowsAccordion 
                    fields={childDocType.fields.map((f) => {
                        // For goods_out_item, force item_name to be dropdown if it's not
                        if (childDocTypeKey === "goods_out_item" && f.key === "item_name") {
                             return { ...f, type: "DROPDOWN" as FieldType, config: (f.config ?? undefined) as Record<string, unknown> | undefined }
                        }
                        return { ...f, config: (f.config ?? undefined) as Record<string, unknown> | undefined }
                    })}
                    optionsMap={childOptionsMap}
                    formId={formId}
                    childName={childDocType.name}
                    branchId={selectedBranchId || undefined}
                    defaultValues={[]}
                    initialData={companyName ? { owner_customer_id: companyName } : undefined}
                />
            </div>
        )}

        <div className="flex justify-end pt-6 border-t">
            <ValidatedButton>Submit Request</ValidatedButton>
        </div>
      </form>
      </FormValidationProvider>
    </div>
  )
}
