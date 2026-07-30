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
import type { FieldType } from "@/generated/prisma/enums"
import type { Prisma } from "@/generated/prisma/client"
import { SearchableSelect } from "@/components/ui/select"
import DependentDropdown from "@/components/dependent-dropdown"
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible"
import { runDocEventHook } from "@/lib/doc-hooks"
import { Package, FileText, Send, LifeBuoy, ArrowLeft } from "lucide-react"
import { IconDisplay } from "@/components/icon-display"
import { FormValidationProvider } from "@/components/form-validation-context"
import { ValidatedButton } from "@/components/validated-button"
import QuotationItemSpecs from "@/components/quotation-item-specs"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { VisitorQRCard } from "@/components/visitor-qr-card"
import { WorkflowStateTracker } from "@/components/admin/workflow-state-tracker"
import fs from "fs/promises"
import path from "path"
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

function statusBadgeVariant(name: string): "default" | "secondary" | "destructive" | "outline" {
  const s = String(name || "").toLowerCase()
  if (s.includes("cancel")) return "destructive"
  if (s.includes("submit")) return "secondary"
  if (s.includes("draft")) return "outline"
  if (s.includes("review") || s.includes("approve") || s.includes("verified") || s.includes("active") || s.includes("publish")) return "default"
  return "outline"
}

async function updateRecord(formData: FormData) {
  "use server"
  const session = await getServerSession(authOptions)
  const email = session?.user?.email ?? ""
  const me = email ? await prisma.user.findUnique({ where: { email }, include: { role: true } }) : null
  if (!me) return

  const key = String(formData.get("docTypeKey") || "")
  const id = String(formData.get("id") || "")
  const action = String(formData.get("action") || "save")
  
  const docType = await prisma.docType.findUnique({ where: { key }, include: { fields: true, permissions: true } })
  if (!docType || !id) {
    if (key && id) redirect(`/customer/docs/${key}/${id}?toast=Error:%20DocType%20tidak%20ditemukan&toastType=error`)
    return
  }
  
  const perm = docType.permissions.find((p) => p.roleId === me.roleId)
  const canWrite = perm ? perm.canWrite : false
  
  const prev = await prisma.docRecord.findUnique({ where: { id } })
  if (!prev) {
    redirect(`/customer/docs/${key}?toast=Error:%20Data%20tidak%20ditemukan&toastType=error`)
    return
  }

  const isTransition = action.startsWith("transition:")
  const nextState = isTransition ? action.substring("transition:".length) : undefined
  console.log(`[updateRecord] isTransition=${isTransition}, action=${action}, nextState=${nextState}`)
  const currentStatus = prev.status || "Draft"

  let wfCfg: { states?: Array<{ name: string; actions?: string[] }>; transitions?: Array<{ from: string; to: string; roles: string[]; condition?: string }> } = { states: [], transitions: [] }

  if (!isTransition) {
      if (!canWrite) {
        redirect(`/customer/docs/${key}/${id}?toast=Error:%20Anda%20tidak%20memiliki%20izin%20untuk%20mengedit&toastType=error`)
        return
      }
      if (String(prev.status ?? "").toUpperCase().includes("SUBMIT")) {
        redirect(`/customer/docs/${key}/${id}?toast=Error:%20Dokumen%20sudah%20disubmit&toastType=error`)
        return
      }
  } else if (nextState) {
      // Validate transition
      let wfRecord = await prisma.docWorkflow.findFirst({ 
        where: { 
          docTypeId: docType.id, 
          isActive: true, 
          OR: [{ branchId: prev.branchId ?? null }, { branchId: null }] 
        }, 
        orderBy: { branchId: "desc" } 
      })

      // Fallback: If no branch-specific or global workflow found, take the first active one for this DocType
      if (!wfRecord) {
        wfRecord = await prisma.docWorkflow.findFirst({ where: { docTypeId: docType.id, isActive: true } })
      }

      if (!wfRecord) {
          redirect(`/customer/docs/${key}/${id}?toast=Error:%20Workflow%20tidak%20aktif&toastType=error`)
          return
        }

        wfCfg = wfRecord.config ? ((wfRecord.config as unknown) as { states?: Array<{ name: string; actions?: string[] }>; transitions?: Array<{ from: string; to: string; roles: string[]; condition?: string }> }) : { states: [], transitions: [] }
        
        // Determine effective current status (handle initial state, case-insensitive match)
      const stateNames = (wfCfg.states ?? []).map((s) => s.name)
      let effectiveCurrent = currentStatus
      if (!stateNames.includes(effectiveCurrent)) {
        const match = stateNames.find(s => s.toLowerCase() === effectiveCurrent.toLowerCase())
        if (match) effectiveCurrent = match
      }
      // Try partial match if still not found
      if (!stateNames.includes(effectiveCurrent) && effectiveCurrent) {
        const partialMatch = stateNames.find(s => s.toLowerCase().startsWith(effectiveCurrent.toLowerCase()) || effectiveCurrent.toLowerCase().startsWith(s.toLowerCase()))
        if (partialMatch) effectiveCurrent = partialMatch
      }
      if (!stateNames.includes(effectiveCurrent) && stateNames.length > 0) effectiveCurrent = stateNames[0]

      const transition = wfCfg.transitions?.find(t => t.from === effectiveCurrent && t.to === nextState)
      if (!transition) {
        redirect(`/customer/docs/${key}/${id}?toast=Error:%20Transisi%20tidak%20valid&toastType=error`)
        return
      }
      
      const userRoleName = me.role.name
      const rolesLower = transition.roles.map(r => r.toLowerCase().trim())
      const myRoleLower = userRoleName.toLowerCase().trim()
      const isAuthorized = rolesLower.includes(myRoleLower) ||
                          rolesLower.includes("*") ||
                          (rolesLower.includes("customer") && myRoleLower.includes("customer"))


      if (!isAuthorized) {
        redirect(`/customer/docs/${key}/${id}?toast=Error:%20Anda%20tidak%20memiliki%20izin%20untuk%20transisi%20ini&toastType=error`)
        return
      }
  }

  const payload: Record<string, unknown> = {}
  const shouldUpdateData = canWrite && !String(prev.status ?? "").toUpperCase().includes("SUBMIT")

  if (shouldUpdateData) {
      for (const f of docType.fields) {
        if (f.readOnly) continue
        if (f.type === ("CHECKBOX" as FieldType)) {
          const raw = String(formData.get(f.key) || "")
          payload[f.key] = raw === "on"
          continue
        }
        if (f.type === ("ATTACHMENT" as FieldType)) {
          const file = formData.get(f.key) as File | null
          payload[f.key] = file ? file.name : null
          continue
        }
        const raw = String(formData.get(f.key) || "")
        if (f.required && !raw) {
          redirect(`/customer/docs/${key}/${id}?toast=Error:%20Field%20${f.label}%20wajib%20diisi&toastType=error`)
          return
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
  }
  
  const updateData: Prisma.DocRecordUpdateInput = { updatedBy: { connect: { id: me.id } } }
  if (shouldUpdateData && Object.keys(payload).length > 0) {
      updateData.data = payload as unknown as Prisma.InputJsonValue
  }
  if (isTransition && nextState) {
      updateData.status = nextState
      
      // Append activity
      const prevData = (prev.data ?? {}) as Record<string, unknown>
      const activities = Array.isArray(prevData["__activity"]) ? (prevData["__activity"] as Array<unknown>) : []
      activities.push({
          at: new Date().toISOString(),
          by: me.email,
          text: `Status diubah: ${currentStatus} -> ${nextState}`
      })
      if (!updateData.data) updateData.data = prevData as unknown as Prisma.InputJsonValue
      const currentData = (updateData.data as Record<string, unknown>)
      currentData["__activity"] = activities
  }

    try {
        const updated = await prisma.docRecord.update({ where: { id: id }, data: updateData })
        
        // --- Support Ticket Reply Logic (Manual Row Insertion) ---
        const cfgAll = (docType.config ?? {}) as unknown as Record<string, unknown>
        const childDocTypeKey = typeof cfgAll["childDocTypeKey"] === "string" ? (cfgAll["childDocTypeKey"] as string) : ""
        if (childDocTypeKey) {
          const childDt = await prisma.docType.findUnique({ where: { key: childDocTypeKey }, include: { fields: true } })
          if (childDt) {
            const entries = Array.from(formData.entries())
            const rowsMap = new Map<number, Record<string, unknown>>()
            const attachmentKeys = new Set(childDt.fields.filter(cf => cf.type === "ATTACHMENT").map(cf => cf.key))
            
            for (const [k, v] of entries) {
              if (!k.startsWith("row_")) continue
              const m = /^row_(\d+)_(.+)$/.exec(k)
              if (m) {
                const idx = Number(m[1])
                const fieldKey = m[2]
                const current = rowsMap.get(idx) ?? {}
                
                if (attachmentKeys.has(fieldKey)) {
                  if (v instanceof File && v.size > 0) {
                    current[fieldKey] = v
                  } else {
                    current[fieldKey] = null
                  }
                } else {
                  if (v instanceof File) {
                    current[fieldKey] = v.size > 0 ? v.name : ""
                  } else {
                    current[fieldKey] = v != null ? String(v) : ""
                  }
                }
                rowsMap.set(idx, current)
              }
            }
            
            const existingRowsCount = await prisma.docRow.count({ where: { recordId: id, childDocTypeId: childDt.id } })
            let rowsAdded = 0
            for (const [idx, rowPayload] of rowsMap.entries()) {
              if (idx >= existingRowsCount) {
                const finalPayload = { ...rowPayload }
                for (const k of Array.from(attachmentKeys)) {
                  const file = rowPayload[k]
                  if (file instanceof File && file.size > 0) {
                    const dir = path.join(process.cwd(), "public", "uploads", "doc-attachments", childDt.key, id)
                    await fs.mkdir(dir, { recursive: true })
                    const extRaw = (file.name || "").includes(".") ? (file.name.split(".").pop() || "") : ""
                    const ext = extRaw ? `.${extRaw.replace(/[^A-Za-z0-9]/g, "")}` : ""
                    const fileName = `row-${idx}-${k}-${Date.now()}${ext}`
                    const abs = path.join(dir, fileName)
                    const buf = Buffer.from(await file.arrayBuffer())
                    await fs.writeFile(abs, buf)
                    finalPayload[k] = `/api/uploads/doc-attachments/${childDt.key}/${id}/${fileName}`
                  } else {
                    finalPayload[k] = null
                  }
                }

                await prisma.docRow.create({
                  data: {
                    recordId: id,
                    childDocTypeId: childDt.id,
                    idx,
                    data: finalPayload as Prisma.InputJsonValue
                  }
                })
                rowsAdded++
              }
            }

            if (rowsAdded > 0 && childDocTypeKey === "ticket_message") {
              try {
                await runDocEventHook("after_insert", "ticket_message", id, me.id)
              } catch (e) {
                console.error("[updateRecord] Hook after_insert failed:", e)
              }
            }
          }
        }

        if (isTransition && nextState) {
            const t = nextState.toUpperCase()
            const actionsForTarget = (wfCfg.states ?? []).find((s: { name: string }) => s.name === nextState)?.actions ?? []
            
            try {
                if (actionsForTarget.some((a: string) => /^create\s*:/i.test(a))) {
                    await runDocEventHook("on_submit", key, id, me.id)
                } else if (t.includes("CANCEL")) {
                    await runDocEventHook("on_cancel", key, id, me.id)
                } else if (t.includes("SUBMIT")) {
                    await runDocEventHook("on_submit", key, id, me.id)
                } else if (t.includes("APPROVE") || t.includes("COMPLETE")) {
                    await runDocEventHook("on_approve", key, id, me.id)
                } else {
                    await runDocEventHook("validate", key, id, me.id)
                }
            } catch (hookErr) {
                console.error(`[updateRecord] Hook execution failed for ${nextState}:`, hookErr)
                // We don't throw here to ensure the user gets redirected after the main status update
            }
        }
    } catch (err) {
        console.error("[updateRecord] FATAL ERROR during update:", err)
        redirect(`/customer/docs/${key}/${id}?toast=Error:%20Gagal%20memperbarui%20data&toastType=error`)
        return
    }

  const successMsg = isTransition ? `Status berhasil diubah ke ${nextState}` : "Data berhasil disimpan"
  revalidatePath(`/customer/docs/${key}/${id}`)
  redirect(`/customer/docs/${key}/${id}?toast=${encodeURIComponent(successMsg)}&toastType=success&t=${Date.now()}`)
}

export default async function CustomerDocDetailPage({ params }: { params?: Record<string, string | string[] | undefined> | Promise<Record<string, string | string[] | undefined>> }) {
  const session = await getServerSession(authOptions)
  const email = session?.user?.email ?? ""
  const user = email ? await prisma.user.findUnique({ where: { email }, include: { role: { include: { permissions: { include: { permission: true } } } } } }) : null
  if (!user) redirect("/customer")

  const p = ((await params) ?? {}) as Record<string, string | string[] | undefined>
  const keyRaw = p?.key
  const idRaw = p?.id
  const key = typeof keyRaw === "string" ? keyRaw : Array.isArray(keyRaw) ? keyRaw[0] : ""
  const id = typeof idRaw === "string" ? idRaw : Array.isArray(idRaw) ? idRaw[0] : ""
  if (!key) redirect("/customer/docs")
  if (!id) redirect(`/customer/docs/${key}`)
  const docType = await prisma.docType.findUnique({ where: { key }, include: { fields: { orderBy: { order: "asc" } }, permissions: true } })
  if (!docType) redirect("/customer/docs")
  const record = await prisma.docRecord.findUnique({ where: { id }, include: { createdBy: { include: { role: true } }, updatedBy: true, parent: { include: { docType: true } } } })
  if (!record) redirect(`/customer/docs/${key}`)
  
  const permission = docType.permissions.find((p) => p.roleId === user?.roleId)
  const canRead = permission ? permission.canRead : false
  const canWrite = permission ? permission.canWrite : false
  if (!canRead) redirect("/customer")

  const values = (record.data ?? {}) as Record<string, unknown>
  const selectedBranchId = record.branchId ?? undefined
  const dynamicOptions: Record<string, Array<{ label: string; value: string }>> = {}
  
  // Load dynamic options (simplified from admin)
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
          const recs = await prisma.docRecord.findMany({ where: { docTypeId: targetDT.id }, orderBy: { createdAt: "desc" } })
          dynamicOptions[f.key] = recs.map((r) => {
            const d = (r.data ?? {}) as Record<string, unknown>
            const labelRaw = d[labelField]
            const valueRaw = d[valueField]
            const label = typeof labelRaw === "string" ? labelRaw : String(labelRaw ?? r.id)
            const value = typeof valueRaw === "string" ? valueRaw : r.id
            return { label, value }
          })
        }
      } else if (src && typeof src["table"] === "string" && src["table"]) {
         // Table source loading
         const tableName = String(src["table"]) || ""
         const modelProp = tableName ? (tableName.slice(0, 1).toLowerCase() + tableName.slice(1)) : ""
         const client = prisma as unknown as Record<string, { findMany: (args?: unknown) => Promise<Array<Record<string, unknown>>> }>
         if (modelProp && client && typeof client[modelProp]?.findMany === "function") {
           const labelField = src && typeof src["labelField"] === "string" ? (src["labelField"] as string) : "name"
           const valueField = src && typeof src["valueField"] === "string" ? (src["valueField"] as string) : "id"
           const recs = await client[modelProp].findMany()
            dynamicOptions[f.key] = recs.map((r) => {
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
  const childMapRaw = (cfgAll["childDocTypes"] ?? {}) as Record<string, string>
  const childDefaultKey = typeof cfgAll["childDocTypeKey"] === "string" ? (cfgAll["childDocTypeKey"] as string) : ""
  const tableFields = docType.fields.filter((f) => f.type === ("TABLE" as FieldType))
  const nonTableFields = docType.fields.filter((f) => 
    f.type !== ("TABLE" as FieldType) && 
    f.type !== ("SECTION" as FieldType)
  )

  const childEntitiesByFieldKey: Record<string, { id: string; key: string; name: string; icon?: string | null; fields: Array<{ id: string; key: string; label: string; type: FieldType; required: boolean; readOnly?: boolean; config?: unknown }> } | null> = {}
  const childListFieldsByFieldKey: Record<string, string[]> = {}
  
  for (const tf of tableFields) {
    const tfConfig = (tf.config ?? {}) as Record<string, unknown>
    const childKey = childMapRaw[tf.key] || (typeof tfConfig["childDocType"] === "string" ? tfConfig["childDocType"] as string : "") || childDefaultKey || ""
    const child = childKey ? await prisma.docType.findUnique({ where: { key: childKey }, include: { fields: { orderBy: { order: "asc" } }, permissions: true } }) : null
    childEntitiesByFieldKey[tf.key] = child ? { id: child.id, key: child.key, name: child.name, icon: child.icon, fields: child.fields.map((f) => ({ id: f.id, key: f.key, label: f.label, type: f.type as FieldType, required: f.required, readOnly: Boolean(f.readOnly), config: f.config })) } : null
    
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
        const cfg = ((docType.config ?? {}) as Record<string, unknown>) 
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
        const parentValRaw = depFieldKey ? values[depFieldKey] : undefined
        const parentValStr = typeof parentValRaw === "string" ? parentValRaw : String(parentValRaw ?? "")
        
        if (targetKey) {
          const targetDT = await prisma.docType.findUnique({ where: { key: targetKey } })
          if (targetDT) {
            const labelField = src && typeof src["labelField"] === "string" ? (src["labelField"] as string) : "name"
            const valueField = src && typeof src["valueField"] === "string" ? (src["valueField"] as string) : "id"
            const recs = await prisma.docRecord.findMany({ where: { docTypeId: targetDT.id, ...(selectedBranchId ? { branchId: selectedBranchId } : {}) }, orderBy: { createdAt: "desc" } })
            const filtered = (depFieldKey && depSourceField && parentValStr) ? recs.filter((r) => {
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
            const recs: Array<Record<string, unknown>> = await client[modelProp].findMany()
            const toCamel = (s: string) => s.replace(/[_-]([a-zA-Z])/g, (_, c) => c.toUpperCase())
            const depFieldCamel = toCamel(depSourceField)
            const filtered = (depFieldKey && depSourceField && parentValStr) ? recs.filter((r) => {
              const rawA = r[depSourceField]
              const rawB = r[depFieldCamel]
              const srcValRaw = rawA !== undefined ? rawA : rawB
              const srcValStr = typeof srcValRaw === "string" ? srcValRaw : String(srcValRaw ?? "")
              return srcValStr === parentValStr
            }) : recs
            childOptionsByFieldKey[tf.key][f.key] = filtered.map((r) => {
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

  // Fetch products for product_id fields to ensure nice display in accordion
  const allProducts = await prisma.product.findMany({ select: { id: true, name: true } })
  const productOptions = allProducts.map(p => ({ label: p.name, value: p.id }))

  for (const tf of tableFields) {
    if (!childOptionsByFieldKey[tf.key]) childOptionsByFieldKey[tf.key] = {}
    
    // Check if the child entity has a product_id field
    const child = childEntitiesByFieldKey[tf.key]
    if (child && child.fields.some(f => f.key === "product_id")) {
         // If product_id doesn't have options yet (e.g. it's a LINK or TEXT field not caught by DROPDOWN logic), assign them
         if (!childOptionsByFieldKey[tf.key]["product_id"]) {
             childOptionsByFieldKey[tf.key]["product_id"] = productOptions
         }
    }
  }

  const rows = await prisma.docRow.findMany({ where: { recordId: id }, orderBy: { idx: "asc" } })

  const linkedRecords = await prisma.docRecord.findMany({
    where: { parentId: id, docStatus: { not: 0 } },
    include: { docType: true },
    orderBy: { createdAt: "desc" }
  })

  // Filter out child items that are already displayed in the main form
  const childDocTypeIds = Object.values(childEntitiesByFieldKey)
    .filter((c): c is NonNullable<typeof c> => c !== null)
    .map((c) => c.id)

  const linkedGroups: Record<string, typeof linkedRecords> = {}
  for (const r of linkedRecords) {
    if (childDocTypeIds.includes(r.docTypeId)) continue
    const k = r.docType.name
    if (!linkedGroups[k]) linkedGroups[k] = []
    linkedGroups[k].push(r)
  }

  // Calculate totals if needed
  let grandTotal = 0
  for (const row of rows) {
    const d = (row.data ?? {}) as Record<string, unknown>
    const qtyRaw = d["qty"]
    const priceRaw = d["price"]
    const setupRaw = d["setup_fee"]
    const discountRaw = d["discount_percent"]
    
    const qty = typeof qtyRaw === "number" ? qtyRaw : Number(qtyRaw ?? 1) // Default qty 1
    const price = typeof priceRaw === "number" ? priceRaw : Number(priceRaw ?? 0)
    const setup = typeof setupRaw === "number" ? setupRaw : Number(setupRaw ?? 0)
    const disc = typeof discountRaw === "number" ? discountRaw : Number(discountRaw ?? 0)
    
    const sub = (qty * price) + (qty * setup)
    const subDisc = sub * (1 - disc / 100)
    grandTotal += subDisc
  }

  // Workflow info
  let wfRecord: { name?: string; config?: unknown; isActive?: boolean; branchId?: string | null; branch?: { name: string } | null } | null = null
  try {
    if (record.branchId) {
      const cand1 = await prisma.docWorkflow.findUnique({ where: { docTypeId_branchId: { docTypeId: docType.id, branchId: record.branchId } }, include: { branch: true } })
      if (cand1 && cand1.isActive) wfRecord = cand1
    }
    if (!wfRecord && docType.branchId) {
      const cand2 = await prisma.docWorkflow.findUnique({ where: { docTypeId_branchId: { docTypeId: docType.id, branchId: docType.branchId } }, include: { branch: true } })
      if (cand2 && cand2.isActive) wfRecord = cand2
    }
    if (!wfRecord) {
      wfRecord = await prisma.docWorkflow.findFirst({ where: { docTypeId: docType.id, branchId: null, isActive: true }, include: { branch: true } })
    }
    if (!wfRecord) {
      wfRecord = await prisma.docWorkflow.findFirst({ where: { docTypeId: docType.id, isActive: true }, include: { branch: true } })
    }
  } catch (e) { console.error("Workflow lookup error:", e) }

  const activity: Array<{ at: Date; text: string }> = []
  activity.push({ at: record.createdAt, text: `Dokumen dibuat oleh ${record.createdBy?.name ?? record.createdBy?.email ?? "-"}` })
  const stored = (() => { const d = (record.data ?? {}) as Record<string, unknown>; const arr = d["__activity"]; return Array.isArray(arr) ? (arr as Array<{ at: string; text: string }>) : [] })()
  for (const e of stored) { activity.push({ at: new Date(e.at), text: e.text }) }
  if (record.updatedAt && record.updatedAt.getTime() !== record.createdAt.getTime()) {
    activity.push({ at: record.updatedAt, text: `Dokumen diubah oleh ${record.updatedBy?.name ?? record.updatedBy?.email ?? "-"}` })
  }
  activity.sort((a, b) => b.at.getTime() - a.at.getTime())
  
  const wfCfg = wfRecord?.config ? ((wfRecord.config as unknown) as { states?: Array<{ name: string }>; transitions?: Array<{ from: string; to: string; roles: string[]; condition?: string }> }) : { states: [], transitions: [] }
  const stateNames = (wfCfg.states ?? []).map((s) => s.name)
  const currentRaw = record.status ?? (stateNames[0] ?? "DRAFT")
  // Match status to workflow state: try exact, then case-insensitive, then startsWith
  let current = stateNames.includes(currentRaw)
    ? currentRaw
    : stateNames.find(s => s.toLowerCase() === currentRaw.toLowerCase()) ?? currentRaw
  // If still not matched, try partial match (for statuses like "Pending" matching "Pending Approval")
  if (!stateNames.includes(current) && currentRaw) {
    const partialMatch = stateNames.find(s => s.toLowerCase().startsWith(currentRaw.toLowerCase()) || currentRaw.toLowerCase().startsWith(s.toLowerCase()))
    if (partialMatch) current = partialMatch
  }
  const roleName = (user?.role?.name ?? "").trim()
  
  const dataObjView = (record.data ?? {}) as Record<string, unknown>
  function evalAtomicView(expr: string): boolean {
    const m = expr.match(/^([A-Za-z0-9_\.]+)\s*(==|!=|>=|<=|>|<|contains|empty|notempty)\s*(.*)$/)
    if (!m) return false
    const field = m[1]
    const op = m[2]
    const rhsRaw = m[3]
    const lhsVal = field.split(".").reduce<unknown>((acc, k) => {
      if (acc && typeof acc === "object" && k in (acc as Record<string, unknown>)) return (acc as Record<string, unknown>)[k]
      return undefined
    }, dataObjView)
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
  function evalConditionView(expr?: string): boolean { if (!expr) return true; const orGroups = expr.split(/\|\|/).map((g) => g.trim()).filter(Boolean); for (const g of orGroups) { const andParts = g.split(/&&|\band\b/).map((p) => p.trim()).filter(Boolean); let ok = true; for (const p of andParts) { if (!evalAtomicView(p)) { ok = false; break } } if (ok) return true } return false }

  const isSubmitted = String(current ?? "").toUpperCase().includes("SUBMIT") || String(current ?? "").toUpperCase().includes("APPROVE")

  const allowedTransitions = (wfCfg.transitions ?? []).filter(t => {
    const rolesLower = t.roles.map(r => r.toLowerCase().trim())
    const myRoleLower = roleName.toLowerCase().trim()
    
    const isAuthorized = rolesLower.includes(myRoleLower) || 
                        rolesLower.includes("*") || 
                        (rolesLower.includes("customer") && myRoleLower.includes("customer"))
    
    return t.from === current && isAuthorized && evalConditionView(t.condition)
  })

  // For customer, if canWrite is false, we treat as submitted/readonly
  // Also, if not a support ticket and no transitions are available, it's effectively readonly
  const isReadOnly = !canWrite || isSubmitted || (key !== "support_ticket" && allowedTransitions.length === 0)

  const hasPreview = docType.hasPreview ?? false

  const isCrossConnect = key === "cross_connect"
  const generalFields = isCrossConnect ? nonTableFields.filter(f => !f.key.startsWith("source_") && !f.key.startsWith("destination_") && !f.key.startsWith("__header_")) : nonTableFields
  const sourceFields = isCrossConnect ? nonTableFields.filter(f => f.key.startsWith("source_")) : []
  const destinationFields = isCrossConnect ? nonTableFields.filter(f => f.key.startsWith("destination_")) : []

  const workflowButtons = ((!isReadOnly && key === "support_ticket") || allowedTransitions.length > 0) && (
    <>
      {allowedTransitions.map((t) => (
        <ValidatedButton 
          key={t.to} 
          type="submit" 
          name="action" 
          value={`transition:${t.to}`} 
          variant={statusBadgeVariant(t.to)}
          size="sm"
          form="customer-edit-form"
        >
          {t.to}
        </ValidatedButton>
      ))}
      
      {!isReadOnly && key === "support_ticket" && (
        <ValidatedButton type="submit" size="sm" form="customer-edit-form">
          Reply
        </ValidatedButton>
      )}
    </>
  )

  const renderField = (f: typeof nonTableFields[0]) => {
    const valRaw = values[f.key]
    let val = valRaw !== undefined && valRaw !== null ? String(valRaw) : ""
    
    // Fallback for customer fields which are sometimes stored as 'customer' or 'customer_id'
    if (!val) {
      if (f.key === "customer_id" && values["customer"]) val = String(values["customer"])
      else if (f.key === "customer" && values["customer_id"]) val = String(values["customer_id"])
    }

    const isFieldReadOnly = isReadOnly || f.readOnly
    
    if (f.key.startsWith("__header_")) {
      return (
        <div key={f.id} className="col-span-full pt-4 pb-2 border-b border-dashed">
          <h3 className="text-sm font-bold text-primary">{f.label}</h3>
        </div>
      )
    }

    if (f.key === "branch_id") {
      return <input key={f.id} type="hidden" name="branch_id" value={selectedBranchId || ""} />
    }

    if (f.type === ("TEXTAREA" as FieldType)) {
        return (
            <div key={f.id} className="col-span-1 md:col-span-2 space-y-2">
                <Label>{f.label}{f.required ? " *" : ""}</Label>
                <textarea name={f.key} defaultValue={val} disabled={isFieldReadOnly} required={f.required} className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
            </div>
        )
    }
    if (f.type === ("DROPDOWN" as FieldType)) {
        const cfg = (f.config ?? {}) as unknown as { options?: Array<{ label: string; value: string }>; source?: Record<string, unknown> }
        const src = cfg.source as Record<string, unknown> | undefined
        const staticOptions = Array.isArray(cfg.options) ? cfg.options : []
        const options = [...staticOptions, ...(dynamicOptions[f.key] || [])]
        
        if (src) {
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

          const initialDepValues = {
            ...Object.fromEntries(Object.entries(values).map(([k, v]) => [k, String(v ?? "")])),
            branch_id: selectedBranchId || "",
            branchId: selectedBranchId || "",
          }

          return (
              <div key={f.id} className="space-y-2">
                  <Label>{f.label}{f.required ? " *" : ""}</Label>
                  {isFieldReadOnly ? (
                      <Input value={options.find(o => o.value === val)?.label ?? val} disabled />
                  ) : (
                      <DependentDropdown
                          name={f.key}
                          label=""
                          options={options}
                          source={sourceObj}
                          branchId={selectedBranchId || undefined}
                          defaultValue={val}
                          initialDependsOnValues={initialDepValues}
                      />
                  )}
                  {(() => {
                      const isProduct = (typeof sourceObj.table === "string" && String(sourceObj.table).toLowerCase() === "product") || (typeof sourceObj.key === "string" && String(sourceObj.key).toLowerCase().includes("product")) || f.key === "product_id"
                    return isProduct ? <QuotationItemSpecs dependsOnName={f.key} branchId={selectedBranchId || undefined} namePrefix="" defaultProductId={val} defaultValues={values} /> : null
                })()}
            </div>
        )
    }

    return (
        <div key={f.id} className="space-y-2">
            <Label>{f.label}{f.required ? " *" : ""}</Label>
            {isFieldReadOnly ? (
                <Input value={options.find(o => o.value === val)?.label ?? val} disabled />
            ) : (
                <SearchableSelect name={f.key} defaultValue={val} options={options} placeholder="Select..." required={f.required} emitChangeEvent={true} />
            )}
            {(() => {
                const isProduct = f.key === "product_id"
                return isProduct ? <QuotationItemSpecs dependsOnName={f.key} branchId={selectedBranchId || undefined} namePrefix="" defaultProductId={val} defaultValues={values} /> : null
            })()}
            </div>
        )
    }
    if (f.type === ("DATE" as FieldType)) {
        return (
            <div key={f.id} className="space-y-2">
                <Label>{f.label}{f.required ? " *" : ""}</Label>
                <Input name={f.key} type="date" defaultValue={val} disabled={isFieldReadOnly} required={f.required} />
            </div>
        )
    }
    return (
        <div key={f.id} className="space-y-2">
            <Label>{f.label}{f.required ? " *" : ""}</Label>
            <Input name={f.key} defaultValue={val} disabled={isFieldReadOnly} type={f.type === ("NUMBER" as FieldType) || f.type === ("PRICE" as FieldType) ? "number" : "text"} required={f.required} />
        </div>
    )
  }

  return (
    <FormValidationProvider formId="customer-edit-form">
    <div className="container mx-auto py-8 max-w-4xl">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href={`/customer/docs/${key}`}>
            <Button variant="outline" size="icon">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold">{docType.name} {record.code ?? record.id}</h1>
              <Badge variant={statusBadgeVariant(record.status ?? "DRAFT")}>{record.status ?? "DRAFT"}</Badge>
            </div>
            <div className="text-sm text-muted-foreground">
               Created on {record.createdAt.toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" })}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
            {workflowButtons}
            {hasPreview && (
              <Link href={`/customer/docs/${key}/${id}/preview`}><Button variant="outline" size="sm">Preview Dokument</Button></Link>
            )}
        </div>
      </div>

      {key === "visitor_request" && (
        <div className="mb-8 max-w-sm mx-auto">
          <VisitorQRCard
            recordId={id}
            companyId={user.companyId ?? ""}
            qrToken={typeof values["qr_token"] === "string" ? values["qr_token"] as string : null}
            qrStatus={typeof values["qr_status"] === "string" ? values["qr_status"] as string : null}
            checkInTime={typeof values["check_in_time"] === "string" ? values["check_in_time"] as string : null}
            checkOutTime={typeof values["check_out_time"] === "string" ? values["check_out_time"] as string : null}
            visitDate={typeof values["visit_date"] === "string" ? values["visit_date"] as string : null}
          />
        </div>
      )}

      <div className="mb-8">
        <WorkflowStateTracker
          workflowName={wfRecord?.name ?? `${docType.name} Workflow`}
          isBranchSpecific={Boolean(wfRecord?.branchId)}
          branchName={wfRecord?.branch?.name}
          currentStatus={current}
          effectiveDocStatus={record.docStatus}
          states={wfCfg.states ?? []}
          transitions={wfCfg.transitions ?? []}
          userRole={roleName}
          canWriteEffective={canWrite}
          formId="customer-edit-form"
          activities={activity}
          hideUnauthorizedActions={true}
        />
      </div>

      <form action={updateRecord} id="customer-edit-form" className="space-y-8">
        <input type="hidden" name="docTypeKey" value={key} />
        <input type="hidden" name="id" value={id} />
        
        <Card>
          <CardHeader>
            <CardTitle>Request Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {generalFields.map(renderField)}
            </div>

            {isCrossConnect && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4 p-4 rounded-xl bg-primary/[0.03] border border-primary/10 shadow-sm relative overflow-hidden group hover:shadow-md transition-all duration-300">
                  <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Package className="w-12 h-12 text-primary" />
                  </div>
                  <div className="flex items-center gap-2 pb-2 border-b border-primary/10">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <h3 className="text-sm font-bold text-primary uppercase tracking-widest">SOURCE</h3>
                  </div>
                  <div className="space-y-4 relative z-10">
                    {sourceFields.map(renderField)}
                  </div>
                </div>

                <div className="space-y-4 p-4 rounded-xl bg-orange-500/[0.03] border border-orange-500/10 shadow-sm relative overflow-hidden group hover:shadow-md transition-all duration-300">
                  <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Send className="w-12 h-12 text-orange-500" />
                  </div>
                  <div className="flex items-center gap-2 pb-2 border-b border-orange-500/10">
                    <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                    <h3 className="text-sm font-bold text-orange-500 uppercase tracking-widest">DESTINATION</h3>
                  </div>
                  <div className="space-y-4 relative z-10">
                    {destinationFields.map(renderField)}
                  </div>
                </div>
              </div>
            )}

            {!isCrossConnect && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                {nonTableFields.filter(f => !generalFields.includes(f)).map(renderField)}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Child Rows display */}
        <div className="space-y-8">
            {tableFields.map((f: any) => {
                const child = childEntitiesByFieldKey[f.key]
                const relevantRows = child ? rows.filter((r) => r.childDocTypeId === child.id) : []
                
                if (!child) return null

                // Special handling for Support Ticket Messages (Always show even if empty, allowing replies)
                if (key === "support_ticket" && f.key === "messages") {
                    return (
                        <div key={f.id} className="space-y-4 pt-6 border-t">
                            <div className="flex items-center justify-between border-b pb-2">
                                <div className="flex items-center gap-2">
                                    <LifeBuoy className="size-5 text-primary" />
                                    <span className="text-lg font-semibold">{f.label}</span>
                                    <Badge variant="secondary">{relevantRows.length} messages</Badge>
                                </div>
                            </div>
                            
                            {/* Chat History View (Sync with Admin Style) */}
                            <div className="space-y-4 bg-muted/10 p-4 rounded-xl border min-h-[200px]">
                                {relevantRows.length > 0 ? (
                                    <div className="space-y-6">
                                        {relevantRows.map((row) => {
                                            const d = (row.data ?? {}) as Record<string, unknown>
                                            const sender = String(d.sender_name || "Unknown")
                                            const message = String(d.message || "")
                                            const attachment = String(d.attachment || "")
                                            const date = new Date(row.createdAt).toLocaleString("en-US", { 
                                                        day: "numeric", 
                                                        month: "short", 
                                                        hour: "2-digit", 
                                                        minute: "2-digit" 
                                                    })
                                            
                                            const isMe = sender.toLowerCase().includes("customer") || sender === user.name || sender === user.email || !sender.toLowerCase().includes("admin")

                                            return (
                                                <div key={row.id} className={cn("flex flex-col gap-1 max-w-[85%]", isMe ? "ml-auto items-end" : "mr-auto items-start")}>
                                                    <div className="flex items-center gap-2 text-[10px] text-muted-foreground px-1">
                                                        <span className={cn("font-bold uppercase tracking-tight", isMe ? "text-primary" : "text-foreground")}>{sender}</span>
                                                        <span>•</span>
                                                        <span>{date}</span>
                                                    </div>
                                                    <div className={cn("p-3 rounded-2xl text-sm shadow-sm border", 
                                                        isMe ? "bg-primary text-primary-foreground rounded-tr-none border-primary" : "bg-white text-foreground rounded-tl-none border-slate-200")}>
                                                        <div className="whitespace-pre-wrap">{message}</div>
                                                        {attachment && (
                                                            <div className={cn("mt-2 pt-2 border-t", isMe ? "border-white/20" : "border-slate-100")}>
                                                                <a href={attachment} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs underline hover:no-underline">
                                                                    <FileText className="size-3" />
                                                                    View Attachment
                                                                </a>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                ) : (
                                    <div className="text-center py-12 text-muted-foreground italic text-sm">
                                                No conversations in this ticket yet.
                                            </div>
                                )}
                            </div>

                            {/* Integrated Reply Form (Sync with Admin Style) */}
                            {!isReadOnly && (
                                <div className="bg-white p-4 rounded-xl border border-dashed shadow-sm">
                                    <div className="text-sm font-semibold mb-4 flex items-center gap-2">
                                        <Send className="size-4 text-primary" />
                                                Reply Ticket
                                            </div>
                                    <div className="space-y-4">
                                        {/* Since customer uses one big form for everything, we use index 0 for the new reply */}
                                        {child.fields.map((cf) => {
                                            const isSender = cf.key === "sender_name"
                                            const isMessage = cf.key === "message"
                                            const isAttachment = cf.key === "attachment"
                                            const name = `row_${relevantRows.length}_${cf.key}`
                                            
                                            if (isSender) {
                                                const defVal = user.name || user.email
                                                return (
                                                    <div key={cf.id} className="hidden">
                                                        <input type="hidden" name={name} value={defVal} />
                                                    </div>
                                                )
                                            }
                                            
                                            return (
                                                <div key={cf.id} className="space-y-2">
                                                    <Label className="text-xs">{cf.label}{cf.required ? " *" : ""}</Label>
                                                    {cf.type === "TEXTAREA" || isMessage ? (
                                                        <textarea 
                                                            name={name} 
                                                            required={cf.required}
                                                            placeholder="Write your reply here..."
                                                            className="w-full border rounded-lg p-3 text-sm min-h-[120px] focus:ring-2 focus:ring-primary/20 outline-none transition-all" 
                                                        />
                                                    ) : cf.type === "ATTACHMENT" || isAttachment ? (
                                                        <Input name={name} type="file" className="text-xs" />
                                                    ) : (
                                                        <Input name={name} required={cf.required} className="text-sm" />
                                                    )}
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                    )
                }

                if (relevantRows.length === 0) return null

                return (
                    <div key={f.id} className="space-y-4">
                         <div className="flex items-center gap-2 border-b pb-2">
                            {child.icon ? <IconDisplay name={child.icon} className="size-5 text-muted-foreground" /> : <Package className="size-5 text-muted-foreground" />}
                            <div className="font-semibold text-lg">{f.label}</div>
                        </div>
                        <div className="space-y-2">
                            {relevantRows.map((row) => {
                                const d = (row.data ?? {}) as Record<string, unknown>
                                const qty = typeof d.qty === "number" ? d.qty : Number(d.qty ?? 0)
                                const price = typeof d.price === "number" ? d.price : Number(d.price ?? 0)
                                const disc = typeof d.discount_percent === "number" ? d.discount_percent : Number(d.discount_percent ?? 0)
                                const subtotal = qty * price * (disc ? (1 - disc / 100) : 1)
                                
                                return (
                                    <Collapsible key={row.id} className="border rounded-md bg-card">
                                        <div className="flex items-center justify-between p-3">
                                            <CollapsibleTrigger asChild>
                                                <div className="flex items-center gap-4 text-sm cursor-pointer w-full select-none">
                                                    {(() => {
                                                        const keys = childListFieldsByFieldKey[f.key] ?? []
                                                        if (keys.length === 0) {
                                                             const pidRaw = d["product_id"]
                                                             const pid = typeof pidRaw === "string" ? pidRaw : String(pidRaw ?? "")
                                                             const prodOpts = ((childOptionsByFieldKey[f.key] ?? {})["product_id"] ?? [])
                                                             const prodLabel = prodOpts.find(o => o.value === pid)?.label ?? pid
                                                             return (
                                                                <>
                                                                    <span className="font-semibold">{prodLabel || "Item"}</span>
                                                                    <span className="text-muted-foreground">Qty {qty}</span>
                                                                    <span className="text-muted-foreground">{formatIDR(subtotal)}</span>
                                                                </>
                                                             )
                                                        }
                                                        return keys.map((k, i) => {
                                                            const cf = child.fields.find(x => x.key === k)
                                                            if (!cf) return null
                                                            const raw = d[k]
                                                            let display: React.ReactNode = ""
                                                            if (cf.type === ("DROPDOWN" as FieldType)) {
                                                                const opts = (childOptionsByFieldKey[f.key] ?? {})[k] ?? []
                                                                display = opts.find(o => o.value === String(raw))?.label ?? (typeof raw === "string" ? raw : String(raw ?? ""))
                                                            } else if (cf.type === ("PRICE" as FieldType) || isPriceLikeKey(k)) {
                                                                display = formatIDR(raw)
                                                            } else if (cf.type === ("ATTACHMENT" as FieldType)) {
                                                                display = raw ? <FileText className="size-3 text-primary" /> : "-"
                                                            } else {
                                                                display = typeof raw === "string" ? raw : String(raw ?? "")
                                                            }
                                                            
                                                            return (
                                                                <span key={`${row.id}-${k}`} className={i === 0 ? "font-semibold text-primary" : "flex items-center gap-1.5"}>
                                                                    {i > 0 && <span className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground bg-muted px-1.5 py-0.5 rounded-sm">{cf.label}</span>}
                                                                    <span className="font-medium">{display}</span>
                                                                </span>
                                                            )
                                                        })
                                                    })()}
                                                </div>
                                            </CollapsibleTrigger>
                                        </div>
                                        <CollapsibleContent>
                                            <div className="p-4 border-t bg-muted/20 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                                {child.fields.map((cf) => {
                                                    const val = d[cf.key]
                                                    let display: React.ReactNode = typeof val === "string" ? val : String(val ?? "")
                                                    if (cf.type === ("DROPDOWN" as FieldType)) {
                                                         const opts = (childOptionsByFieldKey[f.key] ?? {})[cf.key] ?? []
                                                         display = opts.find(o => o.value === String(val))?.label ?? display
                                                    } else if (cf.type === ("PRICE" as FieldType) || isPriceLikeKey(cf.key)) {
                                                        display = formatIDR(val)
                                                    } else if (cf.type === ("ATTACHMENT" as FieldType) && val) {
                                                        display = (
                                                          <a href={String(val)} target="_blank" rel="noopener noreferrer" className="text-primary underline flex items-center gap-1">
                                                            <FileText className="size-3" />
                                                            View Attachment
                                                          </a>
                                                        )
                                                    }
                                                    
                                                    return (
                                                        <div key={cf.id} className="space-y-1">
                                                            <div className="text-xs text-muted-foreground">{cf.label}</div>
                                                            <div className="font-medium">{display || "-"}</div>
                                                        </div>
                                                    )
                                                })}
                                                {(() => {
                                                    const entries = Object.entries(d).filter(([k]) => k.startsWith("spec_"))
                                                    if (entries.length === 0) return null
                                                    return entries.map(([k, v]) => {
                                                        const label = k.slice(5).replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
                                                        const display = Array.isArray(v)
                                                            ? (v as unknown[]).map((x) => (typeof x === "string" ? x : String(x ?? ""))).join(", ")
                                                            : typeof v === "string" ? v : typeof v === "number" ? String(v) : typeof v === "boolean" ? (v ? "Yes" : "No") : ""
                                                        return (
                                                            <div key={`${row.id}-${k}`} className="space-y-1">
                                                                <div className="text-xs text-muted-foreground">{label}</div>
                                                                <div className="font-medium">{display || "-"}</div>
                                                            </div>
                                                        )
                                                    })
                                                })()}
                                            </div>
                                        </CollapsibleContent>
                                    </Collapsible>
                                )
                            })}
                        </div>
                    </div>
                )
            })}
            
            {grandTotal > 0 && (
                <div className="flex justify-end p-4 border rounded-md bg-muted/20">
                    <div className="flex gap-4 items-center">
                        <span className="font-semibold text-lg">Grand Total</span>
                        <span className="font-bold text-xl">{formatIDR(grandTotal)}</span>
                    </div>
                </div>
            )}
        </div>

        {Object.keys(linkedGroups).length > 0 && (
            <div className="space-y-4 pt-4 border-t">
                <h3 className="font-semibold">Related Documents</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(linkedGroups).map(([groupName, groupRecords]) => (
                         <div key={groupName} className="border rounded-md p-3">
                             <div className="flex items-center gap-2 mb-2 font-medium">
                                {groupRecords[0]?.docType?.icon && <IconDisplay name={groupRecords[0].docType.icon} className="w-4 h-4" />}
                                <span>{groupName}</span>
                             </div>
                             <div className="space-y-2">
                                {groupRecords.map((lr) => (
                                    <Link key={lr.id} href={`/customer/docs/${lr.docType.key}/${lr.id}`} className="block text-sm p-2 bg-muted/50 rounded hover:bg-muted transition-colors">
                                        <div className="flex items-center justify-between">
                                            <span>{lr.code ?? lr.id}</span>
                                            <Badge variant="outline" className="text-[10px]">{lr.status ?? "DRAFT"}</Badge>
                                        </div>
                                    </Link>
                                ))}
                             </div>
                         </div>
                    ))}
                </div>
            </div>
        )}

      </form>
    </div>
    </FormValidationProvider>
  )
}
