
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
  childFields?: Array<{ key: string; label: string; type: string }>
  rows?: Array<{ data: Record<string, unknown> }>
  childOptions: Record<string, Option[]>
}): string {
  const childFields = (args.childFields ?? []) as Array<{ key: string; label: string; type: FieldType }>
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
    const d = (row.data ?? {}) as Record<string, unknown>
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
      const d = (row.data ?? {}) as Record<string, unknown>
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
    const d = (row.data ?? {}) as Record<string, unknown>
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

export function buildDefaultHtml(args: {
  docTypeName: string
  code?: string | null
  status?: string | null
  currency?: string | null
  grandTotal?: number | null
  fields: Array<{ key: string; label: string; type: string }>
  values: Record<string, unknown>
  dynamicOptions: Record<string, Option[]>
  childFields?: Array<{ key: string; label: string; type: string }>
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
      const d = (row.data ?? {}) as Record<string, unknown>
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
        const d = (row.data ?? {}) as Record<string, unknown>
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

export function renderFromTemplate(tpl: string, args: {
  docTypeName: string
  code?: string | null
  status?: string | null
  currency?: string | null
  grandTotal?: number | null
  fields: Array<{ key: string; label: string; type: string }>
  values: Record<string, unknown>
  dynamicOptions: Record<string, Option[]>
  childFields?: Array<{ key: string; label: string; type: string }>
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
  const tplHasRows = /\{\{#rows\}\}/.test(tpl)
  const tplHasItemsPlaceholder = /\{\{\s*(items|items_html|items_section_html|items_table_html|itemsTable|itemsSection)\s*\}\}/.test(tpl)
  const { docTypeName, code, status, currency, grandTotal, fields, values, dynamicOptions, childFields = [], rows = [], childOptions, fromCompanyName, companyLogoUrl, fromCompanyAddress, fromCompanyEmail, fromCompanyPhone, customerCompanyName, customerEmail, customerPhoneNumber, customerAddress, customerJobTitle, creatorName, creatorEmail, creatorRole, seriesName, parentSeriesName, grandParentSeriesName, createdDate, toName, assignedToName, assignedToEmail, assignedToRole, salesManagerName, salesManagerEmail, parentRecord, grandParentRecord, companyPIC, customerPIC } = args
  let out = tpl
  out = out.replace(/\{\{docTypeName\}\}/g, toString(docTypeName))
  out = out.replace(/\{\{code\}\}/g, toString(code ?? ""))
  if (parentRecord) {
    out = out.replace(/\{\{parent\.code\}\}/g, toString((parentRecord as any).code ?? ""))
    out = out.replace(/\{\{parent\.id\}\}/g, toString((parentRecord as any).id ?? ""))
    const pData = ((parentRecord as any).data ?? {}) as Record<string, unknown>
    for (const [pk, pv] of Object.entries(pData)) {
       out = out.replace(new RegExp(`\\{\\{parent\\.${pk}\\}\\}`, "g"), toString(pv))
    }
    if (pData.naming_series) {
        out = out.replace(/\{\{parent\.naming_series\}\}/g, toString(pData.naming_series))
    }
    if ((parentRecord as any).status) {
        out = out.replace(/\{\{parent\.status\}\}/g, toString((parentRecord as any).status))
    }
    if ((parentRecord as any).createdAt) {
        const dt = new Date((parentRecord as any).createdAt as string | number | Date)
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
    out = out.replace(/\{\{parent\.parent\.code\}\}/g, toString((grandParentRecord as any).code ?? ""))
    out = out.replace(/\{\{parent\.parent\.id\}\}/g, toString((grandParentRecord as any).id ?? ""))
    const gpData = ((grandParentRecord as any).data ?? {}) as Record<string, unknown>
    for (const [gk, gv] of Object.entries(gpData)) {
      out = out.replace(new RegExp(`\\{\\{parent\\.parent\\.${gk}\\}\\}`, "g"), toString(gv))
    }
    const gpStatus = (grandParentRecord as any).status as unknown
    if (gpStatus !== undefined) {
      out = out.replace(/\{\{parent\.parent\.status\}\}/g, toString(gpStatus))
    }
    const gpCreated = (grandParentRecord as any).createdAt as unknown
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

  out = out.replace(new RegExp("\\{\\{\\s*company\\.pic\\.name\\s*\\}\\}", "g"), toString(companyPIC?.name ?? ""))
  out = out.replace(new RegExp("\\{\\{\\s*company\\.pic\\.email\\s*\\}\\}", "g"), toString(companyPIC?.email ?? ""))
  out = out.replace(new RegExp("\\{\\{\\s*company\\.pic\\.phoneNumber\\s*\\}\\}", "g"), toString(companyPIC?.phoneNumber ?? ""))
  out = out.replace(new RegExp("\\{\\{\\s*company\\.pic\\.technicalContactName\\s*\\}\\}", "g"), toString(companyPIC?.technicalContactName ?? ""))
  out = out.replace(new RegExp("\\{\\{\\s*company\\.pic\\.billingContactName\\s*\\}\\}", "g"), toString(companyPIC?.billingContactName ?? ""))
  out = out.replace(new RegExp("\\{\\{\\s*company\\.pic\\.technicalPhoneNumber\\s*\\}\\}", "g"), toString(companyPIC?.technicalPhoneNumber ?? ""))
  out = out.replace(new RegExp("\\{\\{\\s*company\\.pic\\.billingPhoneNumber\\s*\\}\\}", "g"), toString(companyPIC?.billingPhoneNumber ?? ""))
  out = out.replace(new RegExp("\\{\\{\\s*company\\.pic\\.technicalEmail\\s*\\}\\}", "g"), toString(companyPIC?.technicalEmail ?? ""))
  out = out.replace(new RegExp("\\{\\{\\s*company\\.pic\\.billingEmail\\s*\\}\\}", "g"), toString(companyPIC?.billingEmail ?? ""))
  
  out = out.replace(new RegExp("\\{\\{\\s*company_pic_name\\s*\\}\\}", "g"), toString(companyPIC?.name ?? ""))
  out = out.replace(new RegExp("\\{\\{\\s*company_pic_email\\s*\\}\\}", "g"), toString(companyPIC?.email ?? ""))
  out = out.replace(new RegExp("\\{\\{\\s*company_pic_phone\\s*\\}\\}", "g"), toString(companyPIC?.phoneNumber ?? ""))
  out = out.replace(new RegExp("\\{\\{\\s*company_pic_technical_contact_name\\s*\\}\\}", "g"), toString(companyPIC?.technicalContactName ?? ""))
  out = out.replace(new RegExp("\\{\\{\\s*company_pic_billing_contact_name\\s*\\}\\}", "g"), toString(companyPIC?.billingContactName ?? ""))
  out = out.replace(new RegExp("\\{\\{\\s*company_pic_technical_phone\\s*\\}\\}", "g"), toString(companyPIC?.technicalPhoneNumber ?? ""))
  out = out.replace(new RegExp("\\{\\{\\s*company_pic_billing_phone\\s*\\}\\}", "g"), toString(companyPIC?.billingPhoneNumber ?? ""))
  out = out.replace(new RegExp("\\{\\{\\s*company_pic_technical_email\\s*\\}\\}", "g"), toString(companyPIC?.technicalEmail ?? ""))
  out = out.replace(new RegExp("\\{\\{\\s*company_pic_billing_email\\s*\\}\\}", "g"), toString(companyPIC?.billingEmail ?? ""))

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
  const resolvedCustName = customerCompanyName || labelFor((values as Record<string, unknown>)["customer_id"] ?? (values as Record<string, unknown>)["customerId"], dynamicOptions["customer_id"] ?? dynamicOptions["customerId"] ?? []) || toName || ""

  if (resolvedCustName) {
    out = out.replace(/\{\{\s*customer_id\s*\}\}/g, resolvedCustName)
    out = out.replace(/\{\{\s*customer_id_label\s*\}\}/g, resolvedCustName)
    out = out.replace(/\{\{\s*customerId\s*\}\}/g, resolvedCustName)
    out = out.replace(/\{\{\s*customerId_label\s*\}\}/g, resolvedCustName)
    out = out.replace(/\{\{\s*customer_name\s*\}\}/g, resolvedCustName)
    out = out.replace(/\{\{\s*customerCompanyName\s*\}\}/g, resolvedCustName)
    out = out.replace(/\{\{\s*customer_company_name\s*\}\}/g, resolvedCustName)
    out = out.replace(/\{\{\s*customer\s*\}\}/g, resolvedCustName)
    out = out.replace(/\{\{\s*customer_label\s*\}\}/g, resolvedCustName)
    out = out.replace(/\{\{\s*toName\s*\}\}/g, resolvedCustName)
  }

  // Replace all keys present in values (top-level fields)
  for (const [vk, vv] of Object.entries(values)) {
    if (vv === undefined || vv === null) continue
    const escapedKey = vk.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    const isCustomerKey = vk === "customer_id" || vk === "customerId" || vk === "customer"
    const strVal = isCustomerKey && resolvedCustName ? resolvedCustName : toString(vv)
    const numVal = typeof vv === "number" ? vv : Number(vv ?? 0)
    const currVal = formatIDR(numVal)

    out = out.replace(new RegExp(`\\{\\{\\s*${escapedKey}\\s*\\}\\}`, "g"), strVal)
    out = out.replace(new RegExp(`\\{\\{\\s*${escapedKey}_label\\s*\\}\\}`, "g"), strVal)
    out = out.replace(new RegExp(`\\{\\{\\s*${escapedKey}_currency\\s*\\}\\}`, "g"), currVal)
  }

  for (const f of (fields ?? [])) {
    const raw = values[f.key]
    const isCustomerKey = f.key === "customer_id" || f.key === "customerId" || f.key === "customer"
    const val = isCustomerKey && resolvedCustName ? resolvedCustName : (f.type === "DROPDOWN" ? labelFor(raw, dynamicOptions[f.key] ?? []) : f.type === "CHECKBOX" ? toString(Boolean(raw)) : toString(raw))
    const escapedKey = f.key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    const displayVal = isCustomerKey && resolvedCustName ? resolvedCustName : toString(raw)
    out = out.replace(new RegExp(`\\{\\{\\s*${escapedKey}\\s*\\}\\}`, "g"), displayVal)
    out = out.replace(new RegExp(`\\{\\{\\s*${escapedKey}_label\\s*\\}\\}`, "g"), val)
    out = out.replace(new RegExp(`\\{\\{\\s*${escapedKey}_currency\\s*\\}\\}`, "g"), formatIDR(typeof raw === "number" ? raw : Number(raw ?? 0)))
  }

  // Explicit aliases for invoice and metadata fields
  out = out.replace(/\{\{\s*invoice_number\s*\}\}/g, toString(values["invoice_number"] || code || ""))
  out = out.replace(/\{\{\s*code\s*\}\}/g, toString(code || ""))
  out = out.replace(/\{\{\s*customer_id_label\s*\}\}/g, resolvedCustName || toString(values["customer_id"] || ""))
  out = out.replace(/\{\{\s*subscription_id_label\s*\}\}/g, toString(values["subscription_id_label"] || values["subscription_id"] || ""))
  out = out.replace(/\{\{\s*customerAddress\s*\}\}/g, toString(customerAddress ?? ""))
  out = out.replace(/\{\{\s*customerEmail\s*\}\}/g, toString(customerEmail ?? ""))
  out = out.replace(/\{\{\s*customerPhoneNumber\s*\}\}/g, toString(customerPhoneNumber ?? ""))
  out = out.replace(/\{\{\s*fromCompanyName\s*\}\}/g, toString(fromCompanyName || "MettaDC Data Center"))
  out = out.replace(/\{\{\s*fromCompanyLogo\s*\}\}/g, toString(companyLogoUrl || ""))
  out = out.replace(/\{\{\s*fromCompanyAddress\s*\}\}/g, toString(fromCompanyAddress || ""))
  out = out.replace(/\{\{\s*fromCompanyEmail\s*\}\}/g, toString(fromCompanyEmail || ""))
  out = out.replace(/\{\{\s*fromCompanyPhone\s*\}\}/g, toString(fromCompanyPhone || ""))

  // Row-level Mustache template processing
  out = out.replace(/\{\{#rows\}\}([\s\S]*?)\{\{\/rows\}\}/g, (_, inner: string) => {
    const parts: string[] = []
    for (const row of rows) {
      const d = (row.data ?? {}) as Record<string, unknown>
      let p = inner
      for (const cf of (childFields ?? [])) {
        const raw = d[cf.key]
        const val = cf.type === "DROPDOWN" ? labelFor(raw, childOptions[cf.key] ?? []) : cf.type === "CHECKBOX" ? toString(Boolean(raw)) : toString(raw)
        p = p.replace(new RegExp(`\\{\\{\\s*row\\.${cf.key}\\s*\\}\\}`, "g"), toString(raw))
        p = p.replace(new RegExp(`\\{\\{\\s*row\\.${cf.key}_label\\s*\\}\\}`, "g"), val)
        p = p.replace(new RegExp(`\\{\\{\\s*row\\.${cf.key}_currency\\s*\\}\\}`, "g"), formatIDR(typeof raw === "number" ? raw : Number(raw ?? 0)))
      }
      for (const [rk, rv] of Object.entries(d)) {
        if (rv === undefined || rv === null) continue
        const escapedRk = rk.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
        const strVal = toString(rv)
        const numVal = typeof rv === "number" ? rv : Number(rv ?? 0)
        const currVal = formatIDR(numVal)

        p = p.replace(new RegExp(`\\{\\{\\s*row\\.${escapedRk}\\s*\\}\\}`, "g"), strVal)
        p = p.replace(new RegExp(`\\{\\{\\s*row\\.${escapedRk}_label\\s*\\}\\}`, "g"), strVal)
        p = p.replace(new RegExp(`\\{\\{\\s*row\\.${escapedRk}_currency\\s*\\}\\}`, "g"), currVal)
      }
      const specSum = specsSummary(d)
      p = p.replace(/\{\{\s*row\.specs\s*\}\}/g, specSum)
      p = p.replace(/\{\{\s*row\.specs_summary\s*\}\}/g, specSum)
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
    if (rows.length > 0 && itemsHtml && !tplHasRows && !tplHasItemsPlaceholder) {
      const mrcRe = /Monthly\s+Recur\w*\s+Charge/i
      const mrcMatch = mrcRe.exec(out)
      if (mrcMatch && typeof mrcMatch.index === "number") {
        const idx = mrcMatch.index
        const lower = out.toLowerCase()
        const trStart = lower.lastIndexOf("<tr", idx)
        const trEnd = lower.indexOf("</tr>", idx)
        if (trStart >= 0 && trEnd >= 0 && trEnd > trStart) {
          const trHtml = out.slice(trStart, trEnd + 5)
          const trs = buildInvoiceItemsTrsHtml(trHtml, { rows })
          out = out.slice(0, trStart) + trs + out.slice(trEnd + 5)
          return out
        }
        const pStart = lower.lastIndexOf("<p", idx)
        const pEnd = lower.indexOf("</p>", idx)
        if (pStart >= 0 && pEnd >= 0 && pEnd > pStart) {
          out = out.slice(0, pStart) + itemsHtml + out.slice(pEnd + 4)
          return out
        }
      }
      const kw = /(grand\s*total|total\s*amount|amount\s*due|subtotal|ppn|tax|total)/i
      const m = kw.exec(out)
      if (m && typeof m.index === "number" && m.index >= 0) {
        const idx = m.index
        const lower = out.toLowerCase()
        const tags = ["<table", "<div", "<section", "<hr", "<p"]
        let best = -1
        for (const t of tags) {
          const p = lower.lastIndexOf(t, idx)
          if (p > best) best = p
        }
        if (best >= 0) {
          out = out.slice(0, best) + itemsHtml + out.slice(best)
        } else {
          out = out + itemsHtml
        }
      } else {
        out = out + itemsHtml
      }
    }
  }
  return out
}
