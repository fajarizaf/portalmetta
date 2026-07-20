"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type FieldType = "TEXT" | "TEXTAREA" | "NUMBER" | "PRICE" | "DROPDOWN" | "CHECKBOX" | "DATE" | "DATETIME" | "LINK" | "ATTACHMENT" | "TABLE"

type Option = { label: string; value: string }

function toString(val: unknown): string {
  if (val === undefined || val === null) return ""
  if (typeof val === "string") return val
  if (typeof val === "number") return String(val)
  if (typeof val === "boolean") return val ? "Ya" : "Tidak"
  return String(val)
}

function formatIDR(value: unknown): string {
  const num = typeof value === "number" ? value : Number(value ?? 0)
  if (!Number.isFinite(num)) return toString(value)
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", currencyDisplay: "code", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(num)
}

function labelFor(value: unknown, opts: Option[]): string {
  const v = typeof value === "string" ? value : String(value ?? "")
  const found = opts.find((o) => o.value === v)
  return found ? found.label : v
}

function specsSummary(d: Record<string, unknown>): string {
  const items: string[] = []
  for (const [k, v] of Object.entries(d)) {
    if (!k.startsWith("spec_")) continue
    if (k.includes("__qty")) continue
    const suffix = k.slice(5)
    if (Array.isArray(v)) {
      const parts: string[] = []
      for (const vv of v as unknown[]) {
        const valStr = typeof vv === "string" ? vv : String(vv ?? "")
        const qKey = `spec_${suffix}__${valStr}__qty`
        const qRaw = d[qKey]
        const qty = typeof qRaw === "number" ? qRaw : Number(qRaw ?? "")
        parts.push(Number.isFinite(qty) && qty > 0 ? `${valStr} x${qty}` : valStr)
      }
      items.push(`${suffix}: ${parts.join(", ")}`)
    } else {
      items.push(`${suffix}: ${toString(v)}`)
    }
  }
  return items.join("; ")
}

function specsSummaryHtml(d: Record<string, unknown>): string {
  const sum = specsSummary(d)
  if (!sum) return ""
  const lines = sum.split(/;\s*/).filter(Boolean)
  const inner = lines.map((ln) => `<div>${ln}</div>`).join("")
  return `<div style="color:#6b7280;font-size:11px;margin-top:4px;">${inner}</div>`
}

function buildItemsSectionHtml(args: {
  childFields?: Array<{ key: string; label: string; type: FieldType }>
  rows?: Array<{ data: Record<string, unknown> }>
  childOptions: Record<string, Option[]>
}): string {
  const childFields = args.childFields ?? []
  const rows = args.rows ?? []
  const childOptions = args.childOptions
  if (childFields.length === 0 || rows.length === 0) return ""
  let html = ""
  html += `<div style="margin-top:12px;">`
  html += `<div style="font-size:14px;font-weight:600;margin-bottom:6px;">Items</div>`
  html += `<table style="width:100%;border-collapse:collapse;">`
  html += `<thead><tr>`
  for (const cf of childFields) {
    html += `<th style="text-align:left;font-size:12px;padding:6px;border-bottom:1px solid #e5e7eb;">${cf.label}</th>`
  }
  html += `</tr></thead>`
  html += `<tbody>`
  for (const row of rows) {
    const d = row.data
    html += `<tr>`
    for (const cf of childFields) {
      const raw = d[cf.key]
      let val = ""
      if (cf.type === "DROPDOWN") {
        const opts = childOptions[cf.key] ?? []
        val = labelFor(raw, opts)
      } else if (cf.type === "CHECKBOX") {
        val = toString(Boolean(raw))
      } else if (cf.type === "PRICE") {
        val = formatIDR(raw)
      } else {
        val = toString(raw)
      }
      html += `<td style="font-size:12px;padding:6px;border-bottom:1px solid #f3f4f6;">${val}</td>`
    }
    html += `</tr>`
  }
  html += `</tbody>`
  html += `</table>`
  const hasSpecBlocks = rows.some((r) => Object.keys(r.data ?? {}).some((k) => k.startsWith("spec_")))
  if (hasSpecBlocks) {
    html += `<div style="margin-top:8px;">`
    html += `<div style="font-size:14px;font-weight:600;margin-bottom:6px;">Spesifikasi Items</div>`
    for (const row of rows) {
      const d = row.data
      const specHtml = specsSummaryHtml(d)
      if (!specHtml) continue
      const prodField = childFields.find((f) => f.key.toLowerCase() === "product_id" || f.key.toLowerCase().includes("product"))
      let prodLabel = "Item"
      if (prodField) {
        const raw = d[prodField.key]
        if (prodField.type === "DROPDOWN") {
          const opts = childOptions[prodField.key] ?? []
          prodLabel = labelFor(raw, opts)
        } else {
          prodLabel = toString(raw)
        }
      }
      html += `<div style="font-size:12px;padding:6px 0;border-bottom:1px solid #f3f4f6;"><div style="font-weight:600;">${prodLabel}</div>${specHtml}</div>`
    }
    html += `</div>`
  }
  html += `</div>`
  return html
}

function buildDefaultHtml(args: {
  docTypeName: string
  code?: string | null
  status?: string | null
  currency?: string | null
  grandTotal?: number | null
  fields: Array<{ key: string; label: string; type: FieldType }>
  values: Record<string, unknown>
  dynamicOptions: Record<string, Option[]>
  childFields?: Array<{ key: string; label: string; type: FieldType }>
  rows?: Array<{ data: Record<string, unknown> }>
  childOptions: Record<string, Option[]>
  fromCompanyName?: string
  companyLogoUrl?: string
  fromCompanyEmail?: string
  fromCompanyPhone?: string
  toName?: string
}): string {
  const { docTypeName, code, status, currency, grandTotal, fields, values, dynamicOptions, childFields = [], rows = [], childOptions, fromCompanyName, companyLogoUrl, fromCompanyEmail, fromCompanyPhone, toName } = args
  let html = ""
  html += `<div style="font-family: ui-sans-serif, system-ui, -apple-system;">`
  html += `<div style="display:flex;align-items:center;gap:12px;margin-bottom:12px;">`
  if (companyLogoUrl) html += `<img src="${companyLogoUrl}" style="height:40px;object-fit:contain;border-radius:4px;" />`
  html += `<div>`
  html += `<div style="font-size:20px;font-weight:600;margin-bottom:4px;">${docTypeName}</div>`
  const metaParts: string[] = []
  if (toName && toName.trim().length > 0) metaParts.push(`To: ${toName}`)
  if (fromCompanyName && fromCompanyName.trim().length > 0) metaParts.push(`From: ${fromCompanyName}`)
  if (fromCompanyEmail && fromCompanyEmail.trim().length > 0) metaParts.push(fromCompanyEmail)
  if (fromCompanyPhone && fromCompanyPhone.trim().length > 0) metaParts.push(fromCompanyPhone)
  metaParts.push(`${toString(code ?? "")} • ${toString(status ?? "")}`)
  html += `<div style="font-size:12px;color:#6b7280;">${metaParts.join(" • ")}</div>`
  html += `</div>`
  html += `</div>`
  html += `<div style="margin-bottom:12px;">`
  html += `<table style="width:100%;border-collapse:collapse;">`
  for (const f of fields) {
    if (f.type === "TABLE") continue
    if (
      f.key === "prorate_details" || f.key === "prorateDetails" ||
      f.key === "subscription_id" || f.key === "subscription" || f.key === "subscriptionId" ||
      f.key === "billing_period_start" || f.key === "billing_period_end" ||
      f.key === "nrc_amount" || f.key === "mrc_amount"
    ) continue
    const raw = values[f.key]
    let val = ""
    if (f.type === "DROPDOWN") {
      const opts = dynamicOptions[f.key] ?? []
      val = labelFor(raw, opts)
    } else if (f.type === "CHECKBOX") {
      val = toString(Boolean(raw))
    } else if (f.type === "PRICE") {
      val = formatIDR(raw)
    } else {
      val = toString(raw)
    }
    html += `<tr><td style="font-size:12px;padding:4px 6px;width:30%;color:#374151;">${f.label}</td><td style="font-size:12px;padding:4px 6px;">${val}</td></tr>`
  }
  html += `</table>`
  html += `</div>`
  if (childFields.length > 0) {
    html += `<div style="font-size:14px;font-weight:600;margin-bottom:6px;">Items</div>`
    html += `<table style="width:100%;border-collapse:collapse;">`
    html += `<thead><tr>`
    for (const cf of childFields) {
      html += `<th style="text-align:left;font-size:12px;padding:6px;border-bottom:1px solid #e5e7eb;">${cf.label}</th>`
    }
    html += `</tr></thead>`
    html += `<tbody>`
    for (const row of rows) {
      const d = row.data
      html += `<tr>`
      for (const cf of childFields) {
        const raw = d[cf.key]
        let val = ""
        if (cf.type === "DROPDOWN") {
          const opts = childOptions[cf.key] ?? []
          val = labelFor(raw, opts)
        } else if (cf.type === "CHECKBOX") {
          val = toString(Boolean(raw))
        } else if (cf.type === "PRICE") {
          val = formatIDR(raw)
        } else {
          val = toString(raw)
        }
        html += `<td style="font-size:12px;padding:6px;border-bottom:1px solid #f3f4f6;">${val}</td>`
      }
      html += `</tr>`
    }
    html += `</tbody>`
    html += `</table>`
    const hasSpecBlocks = rows.some((r) => Object.keys(r.data ?? {}).some((k) => k.startsWith("spec_")))
    if (hasSpecBlocks) {
      html += `<div style="margin-top:8px;">`
      html += `<div style="font-size:14px;font-weight:600;margin-bottom:6px;">Spesifikasi Items</div>`
      for (const row of rows) {
        const d = row.data
        const specHtml = specsSummaryHtml(d)
        if (!specHtml) continue
        const prodField = childFields.find((f) => f.key.toLowerCase() === "product_id" || f.key.toLowerCase().includes("product"))
        let prodLabel = "Item"
        if (prodField) {
          const raw = d[prodField.key]
          if (prodField.type === "DROPDOWN") {
            const opts = childOptions[prodField.key] ?? []
            prodLabel = labelFor(raw, opts)
          } else {
            prodLabel = toString(raw)
          }
        }
        html += `<div style="font-size:12px;padding:6px 0;border-bottom:1px solid #f3f4f6;"><div style="font-weight:600;">${prodLabel}</div>${specHtml}</div>`
      }
      html += `</div>`
    }
  }
  if (currency || typeof grandTotal === "number") {
    html += `<div style="margin-top:8px;display:flex;gap:8px;align-items:center;"><span style="min-width:80px;font-size:12px;font-weight:600;">Total</span><span style="font-size:12px;font-weight:500;">${formatIDR(grandTotal ?? 0)}</span></div>`
  }
  html += `</div>`
  return html
}

function buildVisualHtml(args: {
  docTypeName: string
  code?: string | null
  status?: string | null
  currency?: string | null
  grandTotal?: number | null
  fields: Array<{ key: string; label: string; type: FieldType }>
  values: Record<string, unknown>
  dynamicOptions: Record<string, Option[]>
  childFields?: Array<{ key: string; label: string; type: FieldType }>
  rows?: Array<{ data: Record<string, unknown> }>
  childOptions: Record<string, Option[]>
  fieldCfgs: Array<{ key: string; label: string; enabled: boolean }>
  childCfgs: Array<{ key: string; label: string; enabled: boolean }>
  specPlacement: "hidden" | "under_product" | "separate"
}): string {
  const { docTypeName, code, status, currency, grandTotal, fields, values, dynamicOptions, rows = [], childOptions, fieldCfgs, childCfgs, childFields = [], specPlacement } = args
  let html = ""
  html += `<div style="font-family: ui-sans-serif, system-ui, -apple-system;">`
  html += `<div style="font-size:20px;font-weight:600;margin-bottom:4px;">${docTypeName}</div>`
  html += `<div style="font-size:12px;color:#6b7280;margin-bottom:12px;">${toString(code ?? "")} • ${toString(status ?? "")}</div>`
  html += `<div style="margin-bottom:12px;">`
  html += `<table style="width:100%;border-collapse:collapse;">`
  for (const fc of fieldCfgs) {
    if (!fc.enabled) continue
    const f = fields.find((x) => x.key === fc.key)
    if (!f || f.type === "TABLE") continue
    const raw = values[f.key]
    let val = ""
    if (f.type === "DROPDOWN") {
      const opts = dynamicOptions[f.key] ?? []
      val = labelFor(raw, opts)
    } else if (f.type === "CHECKBOX") {
      val = toString(Boolean(raw))
    } else if (f.type === "PRICE") {
      val = formatIDR(raw)
    } else {
      val = toString(raw)
    }
    html += `<tr><td style="font-size:12px;padding:4px 6px;width:30%;color:#374151;">${fc.label}</td><td style="font-size:12px;padding:4px 6px;">${val}</td></tr>`
  }
  html += `</table>`
  html += `</div>`
  const activeChildCols = childCfgs.filter((c) => c.enabled)
  if (activeChildCols.length > 0) {
    html += `<div style="font-size:14px;font-weight:600;margin-bottom:6px;">Items</div>`
    html += `<table style="width:100%;border-collapse:collapse;">`
    html += `<thead><tr>`
    for (const cc of activeChildCols) {
      html += `<th style="text-align:left;font-size:12px;padding:6px;border-bottom:1px solid #e5e7eb;">${cc.label}</th>`
    }
    html += `</tr></thead>`
    html += `<tbody>`
    const prodField = childFields.find((f) => f.key.toLowerCase() === "product_id" || f.key.toLowerCase().includes("product"))
    for (const row of rows) {
      const d = row.data
      html += `<tr>`
      for (const cc of activeChildCols) {
        const cf = childFields.find((x) => x.key === cc.key)
        const raw = d[cc.key]
        let val = ""
        if (cf?.type === "DROPDOWN") {
          const opts = childOptions[cc.key] ?? []
          val = labelFor(raw, opts)
        } else if (cf?.type === "CHECKBOX") {
          val = toString(Boolean(raw))
        } else if (cf?.type === "PRICE") {
          val = formatIDR(raw)
        } else {
          val = toString(raw)
        }
        let extra = ""
        if (specPlacement === "under_product" && prodField && cc.key === prodField.key) {
          extra = specsSummaryHtml(d)
        }
        html += `<td style="font-size:12px;padding:6px;border-bottom:1px solid #f3f4f6;">${val}${extra}</td>`
      }
      html += `</tr>`
    }
    html += `</tbody>`
    html += `</table>`
    if (specPlacement === "separate") {
      html += `<div style="margin-top:8px;">`
      html += `<div style="font-size:14px;font-weight:600;margin-bottom:6px;">Spesifikasi Items</div>`
      for (const row of rows) {
        const d = row.data
        const specHtml = specsSummaryHtml(d)
        if (!specHtml) continue
        let prodLabel = "Item"
        if (prodField) {
          const raw = d[prodField.key]
          if (prodField.type === "DROPDOWN") {
            const opts = childOptions[prodField.key] ?? []
            prodLabel = labelFor(raw, opts)
          } else {
            prodLabel = toString(raw)
          }
        }
        html += `<div style="font-size:12px;padding:6px 0;border-bottom:1px solid #f3f4f6;"><div style="font-weight:600;">${prodLabel}</div>${specHtml}</div>`
      }
      html += `</div>`
    }
  }
  if (currency || typeof grandTotal === "number") {
    html += `<div style="margin-top:8px;display:flex;gap:8px;align-items:center;"><span style="min-width:80px;font-size:12px;font-weight:600;">Total</span><span style="font-size:12px;font-weight:500;">${formatIDR(grandTotal ?? 0)}</span></div>`
  }
  html += `</div>`
  return html
}

function buildInvoiceItemsTrsHtml(originalTrHtml: string, args: {
  rows?: Array<{ data: Record<string, unknown> }>
}): string {
  const rows = args.rows ?? []
  const tdOpen = originalTrHtml.match(/<td[^>]*>/gi) ?? []
  const fallbackTd = `<td style="font-size:12px;padding:6px;border-bottom:1px solid #f3f4f6;">`
  const colCount = Math.max(2, tdOpen.length || 0)
  const getTdOpen = (i: number) => tdOpen[i] ?? tdOpen[0] ?? fallbackTd
  const parts: string[] = []
  for (const row of rows) {
    const d = row.data ?? {}
    const desc = toString(d["description"] ?? "")
    const qtyRaw = d["qty"]
    const priceRaw = d["price"]
    const discRaw = d["discount_percent"]
    const qty = typeof qtyRaw === "number" ? qtyRaw : Number(qtyRaw ?? 0)
    const price = typeof priceRaw === "number" ? priceRaw : Number(priceRaw ?? 0)
    const disc = typeof discRaw === "number" ? discRaw : Number(discRaw ?? 0)
    const subtotalRaw = d["subtotal"]
    const subtotalCalc = qty * price * (disc ? (1 - disc / 100) : 1)
    const subtotal = typeof subtotalRaw === "number" ? subtotalRaw : Number(subtotalRaw ?? subtotalCalc ?? 0)

    const descFull = (() => {
      const base = desc || "Item"
      const extras: string[] = []
      if (Number.isFinite(qty) && qty > 0) extras.push(`Qty ${qty}`)
      if (Number.isFinite(price) && price > 0) extras.push(`@ ${formatIDR(price)}`)
      if (Number.isFinite(disc) && disc > 0) extras.push(`Disc ${disc}%`)
      return extras.length > 0 ? `${base} (${extras.join(" ")})` : base
    })()

    let tr = "<tr>"
    for (let i = 0; i < colCount; i++) {
      let cell = ""
      if (colCount === 2) {
        cell = i === 0 ? descFull : formatIDR(subtotal || 0)
      } else if (colCount === 3) {
        cell = i === 0 ? descFull : i === 1 ? toString(qty || "") : formatIDR(subtotal || 0)
      } else if (colCount === 4) {
        cell = i === 0 ? descFull : i === 1 ? toString(qty || "") : i === 2 ? formatIDR(price || 0) : formatIDR(subtotal || 0)
      } else {
        cell = i === 0 ? descFull : (i === colCount - 1 ? formatIDR(subtotal || 0) : "")
      }
      tr += `${getTdOpen(i)}${cell}</td>`
    }
    tr += "</tr>"
    parts.push(tr)
  }
  return parts.join("")
}

export function renderFromTemplate(tpl: string, args: {
  docTypeName: string
  code?: string | null
  status?: string | null
  currency?: string | null
  grandTotal?: number | null
  fields: Array<{ key: string; label: string; type: FieldType }>
  values: Record<string, unknown>
  dynamicOptions: Record<string, Option[]>
  childFields?: Array<{ key: string; label: string; type: FieldType }>
  rows?: Array<{ data: Record<string, unknown> }>
  childOptions: Record<string, Option[]>
  fromCompanyName?: string
  companyLogoUrl?: string
  fromCompanyAddress?: string
  fromCompanyEmail?: string
  fromCompanyPhone?: string
  customerCompanyName?: string
  customerEmail?: string
  customerPhoneNumber?: string
  customerAddress?: string
  customerJobTitle?: string
  creatorName?: string
  creatorEmail?: string
  creatorRole?: string
  seriesName?: string
  parentSeriesName?: string
  grandParentSeriesName?: string
  createdDate?: string
  toName?: string
  assignedToName?: string
  assignedToEmail?: string
  assignedToRole?: string
  salesManagerName?: string
  salesManagerEmail?: string
  parentRecord?: Record<string, unknown> | null
  grandParentRecord?: Record<string, unknown> | null
  companyPIC?: {
    name?: string | null
    email?: string | null
    phoneNumber?: string | null
    technicalContactName?: string | null
    billingContactName?: string | null
    technicalPhoneNumber?: string | null
    billingPhoneNumber?: string | null
    technicalEmail?: string | null
    billingEmail?: string | null
    jobTitle?: string | null
  } | null
  customerPIC?: {
    name?: string | null
    email?: string | null
    phoneNumber?: string | null
    technicalContactName?: string | null
    billingContactName?: string | null
    technicalPhoneNumber?: string | null
    billingPhoneNumber?: string | null
    technicalEmail?: string | null
    billingEmail?: string | null
    jobTitle?: string | null
  } | null
}): string {
  const { docTypeName, code, status, currency, grandTotal, fields, values, dynamicOptions, childFields = [], rows = [], childOptions, fromCompanyName, companyLogoUrl, fromCompanyAddress, fromCompanyEmail, fromCompanyPhone, customerCompanyName, customerEmail, customerPhoneNumber, customerAddress, customerJobTitle, creatorName, creatorEmail, creatorRole, seriesName, parentSeriesName, grandParentSeriesName, createdDate, toName, assignedToName, assignedToEmail, assignedToRole, salesManagerName, salesManagerEmail, parentRecord, grandParentRecord, companyPIC, customerPIC } = args
  let out = tpl
  out = out.replace(/\{\{docTypeName\}\}/g, toString(docTypeName))
  out = out.replace(/\{\{code\}\}/g, toString(code ?? ""))
  if (parentRecord) {
    out = out.replace(/\{\{parent\.code\}\}/g, toString(parentRecord.code ?? ""))
    out = out.replace(/\{\{parent\.id\}\}/g, toString(parentRecord.id ?? ""))
    const pData = (parentRecord.data ?? {}) as Record<string, unknown>
    for (const [pk, pv] of Object.entries(pData)) {
       out = out.replace(new RegExp(`\\{\\{parent\\.${pk}\\}\\}`, "g"), toString(pv))
    }
    // Also support parent.naming_series if it exists in data or is alias for code
    if (pData.naming_series) {
        out = out.replace(/\{\{parent\.naming_series\}\}/g, toString(pData.naming_series))
    }
    // Also support parent.status
    if (parentRecord.status) {
        out = out.replace(/\{\{parent\.status\}\}/g, toString(parentRecord.status))
    }
    // Also support parent.created_at formatted
    if (parentRecord.createdAt) {
        const dt = new Date(parentRecord.createdAt as string | number | Date)
        if (!isNaN(dt.getTime())) {
             const y = dt.getFullYear()
             const m = String(dt.getMonth() + 1).padStart(2, "0")
             const d = String(dt.getDate()).padStart(2, "0")
             const fmt = `${y}-${m}-${d}`
             out = out.replace(/\{\{parent\.created_at\}\}/g, fmt)
             out = out.replace(/\{\{parent\.createdAt\}\}/g, fmt)
             out = out.replace(/\{\{parent\.createdDate\}\}/g, fmt)
        }
    }
  }
  if (parentSeriesName) {
    out = out.replace(/\{\{parent\.naming_series\}\}/g, toString(parentSeriesName))
    out = out.replace(/\{\{parent\.series_name\}\}/g, toString(parentSeriesName))
  }
  if (grandParentRecord) {
    out = out.replace(/\{\{parent\.parent\.code\}\}/g, toString((grandParentRecord as Record<string, unknown>).code ?? ""))
    out = out.replace(/\{\{parent\.parent\.id\}\}/g, toString((grandParentRecord as Record<string, unknown>).id ?? ""))
    const gpData = ((grandParentRecord as Record<string, unknown>).data ?? {}) as Record<string, unknown>
    for (const [gk, gv] of Object.entries(gpData)) {
      out = out.replace(new RegExp(`\\{\\{parent\\.parent\\.${gk}\\}\\}`, "g"), toString(gv))
    }
    const gpStatus = (grandParentRecord as Record<string, unknown>).status as unknown
    if (gpStatus !== undefined) {
      out = out.replace(/\{\{parent\.parent\.status\}\}/g, toString(gpStatus))
    }
    const gpCreated = (grandParentRecord as Record<string, unknown>).createdAt as unknown
    if (gpCreated) {
      const dt = new Date(gpCreated as string | number | Date)
      if (!isNaN(dt.getTime())) {
        const y = dt.getFullYear()
        const m = String(dt.getMonth() + 1).padStart(2, "0")
        const d = String(dt.getDate()).padStart(2, "0")
        const fmt = `${y}-${m}-${d}`
        out = out.replace(/\{\{parent\.parent\.created_at\}\}/g, fmt)
        out = out.replace(/\{\{parent\.parent\.createdAt\}\}/g, fmt)
        out = out.replace(/\{\{parent\.parent\.createdDate\}\}/g, fmt)
      }
    }
  }
  if (grandParentSeriesName) {
    out = out.replace(/\{\{parent\.parent\.naming_series\}\}/g, toString(grandParentSeriesName))
    out = out.replace(/\{\{parent\.parent\.series_name\}\}/g, toString(grandParentSeriesName))
  }
  out = out.replace(/\{\{status\}\}/g, toString(status ?? ""))
  out = out.replace(/\{\{currency\}\}/g, toString(currency ?? ""))
  out = out.replace(/\{\{grandTotal\}\}/g, toString(grandTotal ?? ""))
  out = out.replace(/\{\{grandTotal_currency\}\}/g, formatIDR(grandTotal ?? 0))
  out = out.replace(new RegExp("\\{\\{\\s*fromCompanyName\\s*\\}\\}", "g"), toString(fromCompanyName ?? ""))
  out = out.replace(new RegExp("\\{\\{\\s*fromCompanyLogo\\s*\\}\\}", "g"), toString(companyLogoUrl ?? ""))
  out = out.replace(new RegExp("\\{\\{\\s*fromCompanyAddress\\s*\\}\\}", "g"), toString(fromCompanyAddress ?? ""))
  out = out.replace(new RegExp("\\{\\{\\s*fromCompanyEmail\\s*\\}\\}", "g"), toString(fromCompanyEmail ?? ""))
  out = out.replace(new RegExp("\\{\\{\\s*fromCompanyPhone\\s*\\}\\}", "g"), toString(fromCompanyPhone ?? ""))

  // Company PIC replacements - handle both camelCase and snake_case, and clean up if null
  out = out.replace(new RegExp("\\{\\{\\s*company\\.pic\\.name\\s*\\}\\}", "g"), toString(companyPIC?.name ?? ""))
  out = out.replace(new RegExp("\\{\\{\\s*company\\.pic\\.email\\s*\\}\\}", "g"), toString(companyPIC?.email ?? ""))
  out = out.replace(new RegExp("\\{\\{\\s*company\\.pic\\.phoneNumber\\s*\\}\\}", "g"), toString(companyPIC?.phoneNumber ?? ""))
  out = out.replace(new RegExp("\\{\\{\\s*company\\.pic\\.technicalContactName\\s*\\}\\}", "g"), toString(companyPIC?.technicalContactName ?? ""))
  out = out.replace(new RegExp("\\{\\{\\s*company\\.pic\\.billingContactName\\s*\\}\\}", "g"), toString(companyPIC?.billingContactName ?? ""))
  out = out.replace(new RegExp("\\{\\{\\s*company\\.pic\\.technicalPhoneNumber\\s*\\}\\}", "g"), toString(companyPIC?.technicalPhoneNumber ?? ""))
  out = out.replace(new RegExp("\\{\\{\\s*company\\.pic\\.billingPhoneNumber\\s*\\}\\}", "g"), toString(companyPIC?.billingPhoneNumber ?? ""))
  out = out.replace(new RegExp("\\{\\{\\s*company\\.pic\\.technicalEmail\\s*\\}\\}", "g"), toString(companyPIC?.technicalEmail ?? ""))
  out = out.replace(new RegExp("\\{\\{\\s*company\\.pic\\.billingEmail\\s*\\}\\}", "g"), toString(companyPIC?.billingEmail ?? ""))
  
  // Snake case aliases for Company PIC
  out = out.replace(new RegExp("\\{\\{\\s*company_pic_name\\s*\\}\\}", "g"), toString(companyPIC?.name ?? ""))
  out = out.replace(new RegExp("\\{\\{\\s*company_pic_email\\s*\\}\\}", "g"), toString(companyPIC?.email ?? ""))
  out = out.replace(new RegExp("\\{\\{\\s*company_pic_phone\\s*\\}\\}", "g"), toString(companyPIC?.phoneNumber ?? ""))
  out = out.replace(new RegExp("\\{\\{\\s*company_pic_technical_contact_name\\s*\\}\\}", "g"), toString(companyPIC?.technicalContactName ?? ""))
  out = out.replace(new RegExp("\\{\\{\\s*company_pic_billing_contact_name\\s*\\}\\}", "g"), toString(companyPIC?.billingContactName ?? ""))
  out = out.replace(new RegExp("\\{\\{\\s*company_pic_technical_phone\\s*\\}\\}", "g"), toString(companyPIC?.technicalPhoneNumber ?? ""))
  out = out.replace(new RegExp("\\{\\{\\s*company_pic_billing_phone\\s*\\}\\}", "g"), toString(companyPIC?.billingPhoneNumber ?? ""))
  out = out.replace(new RegExp("\\{\\{\\s*company_pic_technical_email\\s*\\}\\}", "g"), toString(companyPIC?.technicalEmail ?? ""))
  out = out.replace(new RegExp("\\{\\{\\s*company_pic_billing_email\\s*\\}\\}", "g"), toString(companyPIC?.billingEmail ?? ""))

  // Customer PIC replacements - handle both camelCase and snake_case, and clean up if null
  out = out.replace(new RegExp("\\{\\{\\s*customer\\.pic\\.name\\s*\\}\\}", "g"), toString(customerPIC?.name ?? ""))
  out = out.replace(new RegExp("\\{\\{\\s*customer\\.pic\\.email\\s*\\}\\}", "g"), toString(customerPIC?.email ?? ""))
  out = out.replace(new RegExp("\\{\\{\\s*customer\\.pic\\.phoneNumber\\s*\\}\\}", "g"), toString(customerPIC?.phoneNumber ?? ""))
  out = out.replace(new RegExp("\\{\\{\\s*customer\\.pic\\.technicalContactName\\s*\\}\\}", "g"), toString(customerPIC?.technicalContactName ?? ""))
  out = out.replace(new RegExp("\\{\\{\\s*customer\\.pic\\.billingContactName\\s*\\}\\}", "g"), toString(customerPIC?.billingContactName ?? ""))
  out = out.replace(new RegExp("\\{\\{\\s*customer\\.pic\\.technicalPhoneNumber\\s*\\}\\}", "g"), toString(customerPIC?.technicalPhoneNumber ?? ""))
  out = out.replace(new RegExp("\\{\\{\\s*customer\\.pic\\.billingPhoneNumber\\s*\\}\\}", "g"), toString(customerPIC?.billingPhoneNumber ?? ""))
  out = out.replace(new RegExp("\\{\\{\\s*customer\\.pic\\.technicalEmail\\s*\\}\\}", "g"), toString(customerPIC?.technicalEmail ?? ""))
  out = out.replace(new RegExp("\\{\\{\\s*customer\\.pic\\.billingEmail\\s*\\}\\}", "g"), toString(customerPIC?.billingEmail ?? ""))
  out = out.replace(new RegExp("\\{\\{\\s*customer\\.pic\\.jobTitle\\s*\\}\\}", "g"), toString(customerPIC?.jobTitle ?? ""))

  // Snake case aliases for Customer PIC
  out = out.replace(new RegExp("\\{\\{\\s*customer_pic_name\\s*\\}\\}", "g"), toString(customerPIC?.name ?? ""))
  out = out.replace(new RegExp("\\{\\{\\s*customer_pic_email\\s*\\}\\}", "g"), toString(customerPIC?.email ?? ""))
  out = out.replace(new RegExp("\\{\\{\\s*customer_pic_phone\\s*\\}\\}", "g"), toString(customerPIC?.phoneNumber ?? ""))
  out = out.replace(new RegExp("\\{\\{\\s*customer_pic_technical_contact_name\\s*\\}\\}", "g"), toString(customerPIC?.technicalContactName ?? ""))
  out = out.replace(new RegExp("\\{\\{\\s*customer_pic_billing_contact_name\\s*\\}\\}", "g"), toString(customerPIC?.billingContactName ?? ""))
  out = out.replace(new RegExp("\\{\\{\\s*customer_pic_technical_phone\\s*\\}\\}", "g"), toString(customerPIC?.technicalPhoneNumber ?? ""))
  out = out.replace(new RegExp("\\{\\{\\s*customer_pic_billing_phone\\s*\\}\\}", "g"), toString(customerPIC?.billingPhoneNumber ?? ""))
  out = out.replace(new RegExp("\\{\\{\\s*customer_pic_technical_email\\s*\\}\\}", "g"), toString(customerPIC?.technicalEmail ?? ""))
  out = out.replace(new RegExp("\\{\\{\\s*customer_pic_billing_email\\s*\\}\\}", "g"), toString(customerPIC?.billingEmail ?? ""))

  out = out.replace(new RegExp("\\{\\{\\s*company_name_label\\s*\\}\\}", "g"), toString(customerCompanyName ?? ""))
  out = out.replace(new RegExp("\\{\\{\\s*company_email_label\\s*\\}\\}", "g"), toString(customerEmail ?? ""))
  out = out.replace(new RegExp("\\{\\{\\s*company_phonenumber_label\\s*\\}\\}", "g"), toString(customerPhoneNumber ?? ""))
  out = out.replace(new RegExp("\\{\\{\\s*company_address_label\\s*\\}\\}", "g"), toString(customerAddress ?? ""))
  out = out.replace(new RegExp("\\{\\{\\s*creator_name_label\\s*\\}\\}", "g"), toString(creatorName ?? ""))
  out = out.replace(new RegExp("\\{\\{\\s*creator_email_label\\s*\\}\\}", "g"), toString(creatorEmail ?? ""))
  out = out.replace(new RegExp("\\{\\{\\s*creator_role_label\\s*\\}\\}", "g"), toString(creatorRole ?? ""))
  out = out.replace(new RegExp("\\{\\{\\s*creator_role\\s*\\}\\}", "g"), toString(creatorRole ?? ""))
  out = out.replace(new RegExp("\\{\\{\\s*creator\\.role\\.name\\s*\\}\\}", "g"), toString(creatorRole ?? ""))
  out = out.replace(new RegExp("\\{\\{\\s*creator\\.role\\s*\\}\\}", "g"), toString(creatorRole ?? ""))
  out = out.replace(new RegExp("\\{\\{\\s*series_name_label\\s*\\}\\}", "g"), toString(seriesName ?? ""))
  out = out.replace(new RegExp("\\{\\{\\s*naming_series_label\\s*\\}\\}", "g"), toString(seriesName ?? ""))
  out = out.replace(new RegExp("\\{\\{\\s*document_series_label\\s*\\}\\}", "g"), toString(seriesName ?? ""))
  out = out.replace(new RegExp("\\{\\{\\s*series_name\\s*\\}\\}", "g"), toString(seriesName ?? ""))
  out = out.replace(new RegExp("\\{\\{\\s*naming_series\\s*\\}\\}", "g"), toString(seriesName ?? ""))
  out = out.replace(new RegExp("\\{\\{\\s*document_series\\s*\\}\\}", "g"), toString(seriesName ?? ""))
  out = out.replace(new RegExp("\\{\\{\\s*created_date_label\\s*\\}\\}", "g"), toString(createdDate ?? ""))
  out = out.replace(new RegExp("\\{\\{\\s*created_at_label\\s*\\}\\}", "g"), toString(createdDate ?? ""))
  out = out.replace(new RegExp("\\{\\{\\s*created_date\\s*\\}\\}", "g"), toString(createdDate ?? ""))
  out = out.replace(new RegExp("\\{\\{\\s*created_at\\s*\\}\\}", "g"), toString(createdDate ?? ""))
  out = out.replace(new RegExp("\\{\\{\\s*document_created_date_label\\s*\\}\\}", "g"), toString(createdDate ?? ""))
  out = out.replace(new RegExp("\\{\\{\\s*customer_email_label\\s*\\}\\}", "g"), toString(customerEmail ?? ""))
  out = out.replace(new RegExp("\\{\\{\\s*customer_phonenumber_label\\s*\\}\\}", "g"), toString(customerPhoneNumber ?? ""))

  // Direct aliases for customer info
  out = out.replace(new RegExp("\\{\\{\\s*customerCompanyName\\s*\\}\\}", "g"), toString(customerCompanyName ?? ""))
  out = out.replace(new RegExp("\\{\\{\\s*customerEmail\\s*\\}\\}", "g"), toString(customerEmail ?? ""))
  out = out.replace(new RegExp("\\{\\{\\s*customerPhoneNumber\\s*\\}\\}", "g"), toString(customerPhoneNumber ?? ""))
  out = out.replace(new RegExp("\\{\\{\\s*customerAddress\\s*\\}\\}", "g"), toString(customerAddress ?? ""))
  out = out.replace(new RegExp("\\{\\{\\s*customerJobTitle\\s*\\}\\}", "g"), toString(customerJobTitle ?? ""))

  // Snake case aliases for customer info
  out = out.replace(new RegExp("\\{\\{\\s*customer_company_name\\s*\\}\\}", "g"), toString(customerCompanyName ?? ""))
  out = out.replace(new RegExp("\\{\\{\\s*customer_email\\s*\\}\\}", "g"), toString(customerEmail ?? ""))
  out = out.replace(new RegExp("\\{\\{\\s*customer_phone_number\\s*\\}\\}", "g"), toString(customerPhoneNumber ?? ""))
  out = out.replace(new RegExp("\\{\\{\\s*customer_address\\s*\\}\\}", "g"), toString(customerAddress ?? ""))
  out = out.replace(new RegExp("\\{\\{\\s*customer_job_title\\s*\\}\\}", "g"), toString(customerJobTitle ?? ""))
  out = out.replace(new RegExp("\\{\\{\\s*customer_address_label\\s*\\}\\}", "g"), toString(customerAddress ?? ""))
  out = out.replace(new RegExp("\\{\\{\\s*customer_job_title\\s*\\}\\}", "g"), toString(customerJobTitle ?? ""))
  out = out.replace(new RegExp("\\{\\{\\s*customer_job_title_label\\s*\\}\\}", "g"), toString(customerJobTitle ?? ""))
  out = out.replace(new RegExp("\\{\\{\\s*customer\\.jobTitle\\s*\\}\\}", "g"), toString(customerJobTitle ?? ""))
  out = out.replace(new RegExp("\\{\\{\\s*toName\\s*\\}\\}", "g"), toString(toName ?? ""))
  out = out.replace(new RegExp("\\{\\{\\s*assignedToName\\s*\\}\\}", "g"), toString(assignedToName ?? ""))
  out = out.replace(new RegExp("\\{\\{\\s*assignedToEmail\\s*\\}\\}", "g"), toString(assignedToEmail ?? ""))
  out = out.replace(new RegExp("\\{\\{\\s*assignedToRole\\s*\\}\\}", "g"), toString(assignedToRole ?? ""))
  out = out.replace(new RegExp("\\{\\{\\s*assigned_to_role\\s*\\}\\}", "g"), toString(assignedToRole ?? ""))
  out = out.replace(new RegExp("\\{\\{\\s*assigned_to_role_label\\s*\\}\\}", "g"), toString(assignedToRole ?? ""))
  out = out.replace(new RegExp("\\{\\{\\s*assignedTo\\.role\\.name\\s*\\}\\}", "g"), toString(assignedToRole ?? ""))
  out = out.replace(new RegExp("\\{\\{\\s*assigned_to_name_label\\s*\\}\\}", "g"), toString(assignedToName ?? ""))
  out = out.replace(new RegExp("\\{\\{\\s*assigned_to_email_label\\s*\\}\\}", "g"), toString(assignedToEmail ?? ""))
  out = out.replace(new RegExp("\\{\\{\\s*salesManagerName\\s*\\}\\}", "g"), toString(salesManagerName ?? ""))
  out = out.replace(new RegExp("\\{\\{\\s*salesManagerEmail\\s*\\}\\}", "g"), toString(salesManagerEmail ?? ""))
  out = out.replace(new RegExp("\\{\\{\\s*sales_manager_name\\s*\\}\\}", "g"), toString(salesManagerName ?? ""))
  out = out.replace(new RegExp("\\{\\{\\s*sales_manager_email\\s*\\}\\}", "g"), toString(salesManagerEmail ?? ""))
  out = out.replace(new RegExp("\\{\\{\\s*salesManager\\.name\\s*\\}\\}", "g"), toString(salesManagerName ?? ""))
  out = out.replace(new RegExp("\\{\\{\\s*salesManager\\.email\\s*\\}\\}", "g"), toString(salesManagerEmail ?? ""))
  for (const f of fields) {
    const raw = values[f.key]
    if (
      f.key === "prorate_details" || f.key === "prorateDetails" ||
      f.key === "subscription_id" || f.key === "subscription" || f.key === "subscriptionId" ||
      f.key === "billing_period_start" || f.key === "billing_period_end" ||
      f.key === "nrc_amount" || f.key === "mrc_amount"
    ) {
      const escapedKey = f.key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
      out = out.replace(new RegExp(`\\{\\{\\s*${escapedKey}\\s*\\}\\}`, "g"), "")
      out = out.replace(new RegExp(`\\{\\{\\s*${escapedKey}_label\\s*\\}\\}`, "g"), "")
      out = out.replace(new RegExp(`\\{\\{\\s*${escapedKey}_currency\\s*\\}\\}`, "g"), "")
      continue
    }
    const val = f.type === "DROPDOWN" ? labelFor(raw, dynamicOptions[f.key] ?? []) : f.type === "CHECKBOX" ? toString(Boolean(raw)) : toString(raw)
    
    // Support {{field_key}}, {{ field_key }}, {{field_key_label}}, etc.
    const escapedKey = f.key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    out = out.replace(new RegExp(`\\{\\{\\s*${escapedKey}\\s*\\}\\}`, "g"), toString(raw))
    out = out.replace(new RegExp(`\\{\\{\\s*${escapedKey}_label\\s*\\}\\}`, "g"), val)
    out = out.replace(new RegExp(`\\{\\{\\s*${escapedKey}_currency\\s*\\}\\}`, "g"), formatIDR(typeof raw === "number" ? raw : Number(raw ?? 0)))
  }
  out = out.replace(/\{\{#rows\}\}([\s\S]*?)\{\{\/rows\}\}/g, (_, inner: string) => {
    const parts: string[] = []
    for (const row of rows) {
      const d = row.data
      let p = inner
      for (const cf of childFields) {
        const raw = d[cf.key]
        const val = cf.type === "DROPDOWN" ? labelFor(raw, childOptions[cf.key] ?? []) : cf.type === "CHECKBOX" ? toString(Boolean(raw)) : toString(raw)
        p = p.replace(new RegExp(`\\{\\{row\\.${cf.key}\\}\\}`, "g"), toString(raw))
        p = p.replace(new RegExp(`\\{\\{row\\.${cf.key}_label\\}\\}`, "g"), val)
        p = p.replace(new RegExp(`\\{\\{row\\.${cf.key}_currency\\}\\}`, "g"), formatIDR(typeof raw === "number" ? raw : Number(raw ?? 0)))
      }
      for (const [rk, rv] of Object.entries(d)) {
        if (!rk.startsWith("spec_")) continue
        const rawStr = Array.isArray(rv) ? (rv as unknown[]).map((x) => (typeof x === "string" ? x : String(x ?? ""))).join(", ") : toString(rv)
        p = p.replace(new RegExp(`\\{\\{row\\.${rk}\\}\\}`, "g"), rawStr)
      }
      const specSum = specsSummary(d)
      p = p.replace(/\{\{row\.specs\}\}/g, specSum)
      p = p.replace(/\{\{row\.specs_summary\}\}/g, specSum)
      parts.push(p)
    }
    return parts.join("")
  })
  out = out.replace(/\{\{sum_rows\.([a-zA-Z0-9_]+)_currency\}\}/g, (_m: string, k: string) => {
    const sum = rows.reduce((acc, r) => {
      const raw = (r.data ?? {})[k]
      const num = typeof raw === "number" ? raw : Number(raw ?? 0)
      return acc + (Number.isFinite(num) ? num : 0)
    }, 0)
    return formatIDR(sum)
  })
  out = out.replace(/\{\{sum_rows\.([a-zA-Z0-9_]+)\}\}/g, (_m: string, k: string) => {
    const sum = rows.reduce((acc, r) => {
      const raw = (r.data ?? {})[k]
      const num = typeof raw === "number" ? raw : Number(raw ?? 0)
      return acc + (Number.isFinite(num) ? num : 0)
    }, 0)
    return toString(sum)
  })
  {
    const itemsHtml = buildItemsSectionHtml({ childFields, rows, childOptions })
    out = out.replace(/\{\{\s*(items|items_html|items_section_html|items_table_html|itemsTable|itemsSection)\s*\}\}/g, itemsHtml)
  }
  return out
}

export function DocumentPreview({
  docTypeKey,
  docTypeName,
  code,
  status,
  currency,
  grandTotal,
  fields,
  values,
  dynamicOptions,
  childFields,
  rows,
  childOptions,
  defaultTemplate,
  companyName,
  companyLogoUrl,
  companyAddress,
  companyEmail,
  companyPhoneNumber,
  customerEmail,
  customerPhoneNumber,
  customerAddress,
  customerJobTitle,
  customerCompanyName,
  creatorName,
  creatorEmail,
  creatorRole,
  seriesName,
  parentSeriesName,
  grandParentSeriesName,
  createdDate,
  assignedToName,
  assignedToEmail,
  assignedToRole,
  salesManagerName,
  salesManagerEmail,
  parentRecord,
  grandParentRecord,
  companyPIC,
  customerPIC,
  grandTotalInWords,
}: {
  docTypeKey: string
  grandTotalInWords?: string | null
  docTypeName: string
  code?: string | null
  status?: string | null
  currency?: string | null
  grandTotal?: number | null
  fields: Array<{ key: string; label: string; type: FieldType }>
  values: Record<string, unknown>
  dynamicOptions: Record<string, Option[]>
  childFields?: Array<{ key: string; label: string; type: FieldType }>
  rows?: Array<{ data: Record<string, unknown> }>
  childOptions: Record<string, Option[]>
  defaultTemplate?: string
  companyName?: string
  companyLogoUrl?: string
  companyAddress?: string
  companyEmail?: string
  companyPhoneNumber?: string
  customerEmail?: string
  customerPhoneNumber?: string
  customerAddress?: string
  customerJobTitle?: string
  customerCompanyName?: string
  creatorName?: string
  creatorEmail?: string
  creatorRole?: string
  seriesName?: string
  parentSeriesName?: string
  grandParentSeriesName?: string
  createdDate?: string
  assignedToName?: string
  assignedToEmail?: string
  assignedToRole?: string
  salesManagerName?: string
  salesManagerEmail?: string
  parentRecord?: Record<string, unknown> | null
  grandParentRecord?: Record<string, unknown> | null
  companyPIC?: {
    name?: string | null
    email?: string | null
    phoneNumber?: string | null
    technicalContactName?: string | null
    billingContactName?: string | null
    technicalPhoneNumber?: string | null
    billingPhoneNumber?: string | null
    technicalEmail?: string | null
    billingEmail?: string | null
  } | null
  customerPIC?: {
    name?: string | null
    email?: string | null
    phoneNumber?: string | null
    technicalContactName?: string | null
    billingContactName?: string | null
    technicalPhoneNumber?: string | null
    billingPhoneNumber?: string | null
    technicalEmail?: string | null
    billingEmail?: string | null
  } | null
}) {
  const html = React.useMemo(() => {
    const tpl = (defaultTemplate ?? "").trim()
    const tplHasRows = /\{\{\#rows\}\}/.test(tpl)
    const tplHasItemsPlaceholder = /\{\{\s*(items|items_html|items_section_html|items_table_html|itemsTable|itemsSection)\s*\}\}/.test(tpl)
    const candidates = ["customer_id", "customer", "customer_name", "customerId"]
    let toName = ""
    for (const k of candidates) {
      const raw = (values as Record<string, unknown>)[k]
      if (raw !== undefined && raw !== null) {
        const f = fields.find((x) => x.key === k)
        if (f?.type === ("DROPDOWN" as FieldType)) {
          toName = labelFor(raw, dynamicOptions[k] ?? [])
        } else {
          toName = toString(raw)
        }
        break
      }
    }
    const hasRows = Array.isArray(rows) && rows.length > 0
    const itemsHtml = hasRows ? buildItemsSectionHtml({ childFields, rows, childOptions }) : ""
    const injectItems = (base: string) => {
      if (!itemsHtml) return base
      if (docTypeKey === "invoice") {
        const mrcRe = /Monthly\s+Recur\w*\s+Charge/i
        const mrcMatch = mrcRe.exec(base)
        if (mrcMatch && typeof mrcMatch.index === "number") {
          const idx = mrcMatch.index
          const lower = base.toLowerCase()
          const trStart = lower.lastIndexOf("<tr", idx)
          const trEnd = lower.indexOf("</tr>", idx)
          if (trStart >= 0 && trEnd >= 0 && trEnd > trStart) {
            const trHtml = base.slice(trStart, trEnd + 5)
            const trs = buildInvoiceItemsTrsHtml(trHtml, { rows })
            return base.slice(0, trStart) + trs + base.slice(trEnd + 5)
          }
          const pStart = lower.lastIndexOf("<p", idx)
          const pEnd = lower.indexOf("</p>", idx)
          if (pStart >= 0 && pEnd >= 0 && pEnd > pStart) {
            return base.slice(0, pStart) + itemsHtml + base.slice(pEnd + 4)
          }
        }
        const kw = /(grand\s*total|total\s*amount|amount\s*due|subtotal|ppn|tax|total)/i
        const m = kw.exec(base)
        if (m && typeof m.index === "number" && m.index >= 0) {
          const idx = m.index
          const tags = ["<table", "<div", "<section", "<hr", "<p"]
          let best = -1
          for (const t of tags) {
            const p = base.toLowerCase().lastIndexOf(t, idx)
            if (p > best) best = p
          }
          if (best >= 0) return base.slice(0, best) + itemsHtml + base.slice(best)
        }
        const firstTableEnd = base.search(/<\/table\s*>/i)
        if (firstTableEnd >= 0) {
          const insertAt = firstTableEnd + (base.slice(firstTableEnd).match(/<\/table\s*>/i)?.[0]?.length ?? 8)
          return base.slice(0, insertAt) + itemsHtml + base.slice(insertAt)
        }
      }
      const m = base.match(/<\/body\s*>/i)
      if (m && m.index != null) return base.slice(0, m.index) + itemsHtml + base.slice(m.index)
      const m2 = base.match(/<\/html\s*>/i)
      if (m2 && m2.index != null) return base.slice(0, m2.index) + itemsHtml + base.slice(m2.index)
      return base + itemsHtml
    }
    if (tpl.length > 0) {
        try {
          const rendered = renderFromTemplate(tpl, { docTypeName, code, status, currency, grandTotal, fields, values, dynamicOptions, childFields, rows, childOptions, fromCompanyName: companyName, companyLogoUrl, fromCompanyAddress: companyAddress, fromCompanyEmail: companyEmail, fromCompanyPhone: companyPhoneNumber, customerCompanyName, customerEmail,
    customerPhoneNumber,
    customerAddress,
    customerJobTitle,
    creatorName,
    creatorEmail, creatorRole, seriesName, parentSeriesName, grandParentSeriesName, createdDate, toName, assignedToName, assignedToEmail, assignedToRole, salesManagerName, salesManagerEmail, parentRecord, grandParentRecord, companyPIC, customerPIC })
          if (hasRows && !tplHasRows && !tplHasItemsPlaceholder) return injectItems(rendered)
          return rendered
        } catch {
          return buildDefaultHtml({ docTypeName, code, status, currency, grandTotal, fields, values, dynamicOptions, childFields, rows, childOptions, fromCompanyName: companyName, companyLogoUrl, fromCompanyEmail: companyEmail, fromCompanyPhone: companyPhoneNumber, toName })
        }
      }
      return buildDefaultHtml({ docTypeName, code, status, currency, grandTotal, fields, values, dynamicOptions, childFields, rows, childOptions, fromCompanyName: companyName, companyLogoUrl, fromCompanyEmail: companyEmail, fromCompanyPhone: companyPhoneNumber, toName })
    }, [defaultTemplate, docTypeName, code, status, currency, grandTotal, fields, values, dynamicOptions, childFields, rows, childOptions, companyName, companyLogoUrl, companyAddress, companyEmail, companyPhoneNumber, customerCompanyName, customerEmail, customerPhoneNumber, customerAddress, creatorName, creatorEmail, creatorRole, seriesName, parentSeriesName, grandParentSeriesName, createdDate, assignedToName, assignedToEmail, assignedToRole, salesManagerName, salesManagerEmail, parentRecord, grandParentRecord, companyPIC, customerPIC])

  const [paperSize, setPaperSize] = React.useState<"A4" | "F4">("A4")
  const [editMode, setEditMode] = React.useState<"view" | "html">("view")
  const [fieldCfgs, setFieldCfgs] = React.useState<Array<{ key: string; label: string; enabled: boolean }>>([])
  const [childCfgs, setChildCfgs] = React.useState<Array<{ key: string; label: string; enabled: boolean }>>([])
  const [specPlacement, setSpecPlacement] = React.useState<"hidden" | "under_product" | "separate">("separate")
  const [template, setTemplate] = React.useState<string>(defaultTemplate ?? "")
  const [pages, setPages] = React.useState<string[]>([])
  const measureRef = React.useRef<HTMLDivElement | null>(null)
  const mmToPx = React.useCallback((mm: number) => mm * (96 / 25.4), [])
  const storageKey = React.useMemo(() => `doc_preview_template_${docTypeKey}`, [docTypeKey])
  const [open, setOpen] = React.useState(false)
  React.useEffect(() => {
    setFieldCfgs(fields.filter((f) => f.type !== ("TABLE" as FieldType)).map((f) => ({ key: f.key, label: f.label, enabled: true })))
    setChildCfgs((childFields ?? []).map((cf) => ({ key: cf.key, label: cf.label, enabled: true })))
  }, [fields, childFields])

  const visualHtml = React.useMemo(() => {
    return buildVisualHtml({ docTypeName, code, status, currency, grandTotal, fields, values, dynamicOptions, childFields: childFields ?? [], rows: rows ?? [], childOptions, fieldCfgs, childCfgs, specPlacement })
  }, [docTypeName, code, status, currency, grandTotal, fields, values, dynamicOptions, childFields, rows, childOptions, fieldCfgs, childCfgs, specPlacement])

  const moveChild = (idx: number, dir: -1 | 1) => {
    setChildCfgs((prev) => {
      const next = prev.slice()
      const j = idx + dir
      if (j < 0 || j >= next.length) return prev
      const tmp = next[idx]
      next[idx] = next[j]
      next[j] = tmp
      return next
    })
  }

  const moveField = (idx: number, dir: -1 | 1) => {
    setFieldCfgs((prev) => {
      const next = prev.slice()
      const j = idx + dir
      if (j < 0 || j >= next.length) return prev
      const tmp = next[idx]
      next[idx] = next[j]
      next[j] = tmp
      return next
    })
  }

  const generateTemplate = () => {
    let tpl = ""
    tpl += `<div>`
    tpl += `<div>{{docTypeName}}</div>`
    tpl += `<div style="font-size:12px;color:#6b7280;">{{code}} • {{status}}</div>`
    tpl += `<div><table style="width:100%;border-collapse:collapse;">`
    for (const fc of fieldCfgs) {
      if (!fc.enabled) continue
      tpl += `<tr><td style="font-size:12px;padding:4px 6px;width:30%;color:#374151;">${fc.label}</td><td style="font-size:12px;padding:4px 6px;">{{${fc.key}_label}}</td></tr>`
    }
    tpl += `</table></div>`
    const activeChild = childCfgs.filter((c) => c.enabled)
    if (activeChild.length > 0) {
      tpl += `<div style="font-size:14px;font-weight:600;margin-bottom:6px;">Items</div>`
      tpl += `<table style="width:100%;border-collapse:collapse;">`
      tpl += `<thead><tr>`
      for (const cc of activeChild) {
        tpl += `<th style="text-align:left;font-size:12px;padding:6px;border-bottom:1px solid #e5e7eb;">${cc.label}</th>`
      }
      tpl += `</tr></thead>`
      tpl += `<tbody>`
      tpl += `{{#rows}}<tr>`
      const productKey = (childFields ?? []).find((f) => f.key.toLowerCase() === "product_id" || f.key.toLowerCase().includes("product"))?.key
      for (const cc of activeChild) {
        const isProd = productKey && cc.key === productKey
        if (specPlacement === "under_product" && isProd) {
          tpl += `<td style="font-size:12px;padding:6px;border-bottom:1px solid #f3f4f6;">{{row.${cc.key}_label}}<div style="color:#6b7280;font-size:11px;margin-top:4px;">{{row.specs}}</div></td>`
        } else {
          tpl += `<td style="font-size:12px;padding:6px;border-bottom:1px solid #f3f4f6;">{{row.${cc.key}_label}}</td>`
        }
      }
      tpl += `</tr>{{/rows}}`
      tpl += `</tbody>`
      tpl += `</table>`
      if (specPlacement === "separate") {
        tpl += `<div style="margin-top:8px;">`
        tpl += `<div style="font-size:14px;font-weight:600;margin-bottom:6px;">Spesifikasi Items</div>`
        tpl += `{{#rows}}<div style="font-size:12px;padding:6px 0;border-bottom:1px solid #f3f4f6;"><div style="font-weight:600;">{{row.${productKey ?? activeChild[0].key}_label}}</div><div style="color:#6b7280;font-size:11px;margin-top:4px;">{{row.specs}}</div></div>{{/rows}}`
        tpl += `</div>`
      }
    }
    tpl += `</div>`
    setTemplate(tpl)
    setEditMode("html")
  }

  const openPrint = () => {
    const w = window.open("", "_blank")
    if (!w) return
    const width = paperSize === "A4" ? "210mm" : "215mm"
    const height = paperSize === "A4" ? "297mm" : "330mm"
    const size = paperSize === "A4" ? "A4" : "215mm 330mm"
    
    const style = `
      @page { size: ${size}; margin: 0; }
      body { margin: 0; font-family: ui-sans-serif, system-ui, -apple-system; background: #eee; }
      .sheet {
        width: ${width};
        min-height: ${height};
        background: white;
        padding: 15mm;
        margin: 20px auto;
        box-shadow: 0 0 10px rgba(0,0,0,0.1);
        box-sizing: border-box;
      }
      @media print {
        body { background: white; margin: 0; }
        .sheet { width: 100%; min-height: auto; margin: 0; padding: 15mm; box-shadow: none; }
      }
      table{border-collapse:collapse; width: 100%;} 
      th,td{border-color:#e5e7eb}
    `
    const body = (pages && pages.length > 0)
      ? pages.map((p) => `<div class="sheet">${p}</div>`).join("")
      : `<div class="sheet">${html}</div>`
    w.document.write(`<html><head><meta charset=\"utf-8\"/><title>${docTypeName}</title><style>${style}</style></head><body>${body}</body></html>`)
    w.document.close()
    w.focus()
    setTimeout(() => { try { w.print() } catch {} }, 300)
  }

  const openTab = () => {
    const w = window.open("", "_blank")
    if (!w) return
    const width = paperSize === "A4" ? "210mm" : "215mm"
    const height = paperSize === "A4" ? "297mm" : "330mm"
    const size = paperSize === "A4" ? "A4" : "215mm 330mm"

    const style = `
      @page { size: ${size}; margin: 0; }
      body { margin: 0; font-family: ui-sans-serif, system-ui, -apple-system; background: #eee; }
      .sheet {
        width: ${width};
        min-height: ${height};
        background: white;
        padding: 15mm;
        margin: 20px auto;
        box-shadow: 0 0 10px rgba(0,0,0,0.1);
        box-sizing: border-box;
      }
      table{border-collapse:collapse; width: 100%;} 
      th,td{border-color:#e5e7eb}
    `
    const body = (pages && pages.length > 0)
      ? pages.map((p) => `<div class="sheet">${p}</div>`).join("")
      : `<div class="sheet">${html}</div>`
    w.document.write(`<html><head><meta charset=\"utf-8\"/><title>${docTypeName}</title><style>${style}</style></head><body>${body}</body></html>`)
    w.document.close()
    w.focus()
  }

  const saveTemplate = () => {
    try {
      window.localStorage.setItem(storageKey, template)
      setOpen(false)
    } catch {}
  }
  const resetTemplate = () => {
    setTemplate(defaultTemplate ?? "")
  }

  React.useEffect(() => {
    const el = measureRef.current
    if (!el) return
    const pageHeightMm = paperSize === "A4" ? 297 : 330
    const pageWidthMm = paperSize === "A4" ? 210 : 215
    const paddingMm = 15
    const contentHeightPx = mmToPx(pageHeightMm - paddingMm * 2)

    el.style.width = `${pageWidthMm}mm`
    el.style.padding = `${paddingMm}mm`
    el.style.boxSizing = "border-box"
    el.innerHTML = ""

    const tmp = document.createElement("div")
    tmp.innerHTML = html || ""

    const outPages: string[] = []
    const makePageContainer = () => {
      const d = document.createElement("div")
      d.style.width = "100%"
      return d
    }
    let pageContainer = makePageContainer()
    el.appendChild(pageContainer)

    const children = Array.from(tmp.children)
    for (let i = 0; i < children.length; i++) {
      const child = children[i] as HTMLElement
      const clone = child.cloneNode(true) as HTMLElement
      pageContainer.appendChild(clone)
      const h = pageContainer.scrollHeight
      if (h > contentHeightPx) {
        pageContainer.removeChild(clone)
        outPages.push(pageContainer.innerHTML)
        el.innerHTML = ""
        pageContainer = makePageContainer()
        el.appendChild(pageContainer)
        pageContainer.appendChild(clone)
      }
    }
    if (pageContainer.childElementCount > 0) {
      outPages.push(pageContainer.innerHTML)
    }
    setPages(outPages)
  }, [html, paperSize, mmToPx])

  return (
    <div className="space-y-2">
      <div className="text-sm font-semibold">Preview Dokumen</div>
      <div className="flex items-center gap-2">
        <Button type="button" onClick={openPrint}>Cetak / Download</Button>
        <Button type="button" variant="secondary" onClick={openTab}>Buka di Tab</Button>
        <div className="w-[100px]">
          <Select value={paperSize} onValueChange={(v) => setPaperSize(v as "A4" | "F4")}>
            <SelectTrigger>
              <SelectValue placeholder="Ukuran Kertas" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="A4">A4</SelectItem>
              <SelectItem value="F4">F4 (Folio)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="border rounded p-4 bg-gray-100 flex justify-center overflow-auto max-h-[800px]">
        <div style={{ width: paperSize === 'A4' ? '210mm' : '215mm', flexShrink: 0 }}>
          {(pages && pages.length > 0 ? pages : [html]).map((page, idx) => (
            <div
              key={idx}
              style={{
                minHeight: paperSize === 'A4' ? '297mm' : '330mm',
                backgroundColor: 'white',
                padding: '15mm',
                boxShadow: '0 0 10px rgba(0,0,0,0.1)',
                boxSizing: 'border-box',
                marginBottom: '20px',
              }}
              dangerouslySetInnerHTML={{ __html: page }}
            />
          ))}
        </div>
      </div>
      <div
        ref={measureRef}
        style={{
          position: "fixed",
          left: -99999,
          top: -99999,
          opacity: 0,
          pointerEvents: "none",
          zIndex: -1,
        }}
      />
    </div>
  )
}
