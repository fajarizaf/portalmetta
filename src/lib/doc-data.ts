
import { prisma } from "@/lib/prisma"
import type { FieldType } from "@/generated/prisma/enums"

export async function getDocPreviewData(key: string, id: string, userId: string) {
  const docType = await prisma.docType.findUnique({ 
    where: { key }, 
    include: { fields: { orderBy: { order: "asc" } }, permissions: true } 
  })
  if (!docType) return null

  const record = await prisma.docRecord.findUnique({ 
    where: { id }, 
    include: { 
      createdBy: { include: { role: true } }, 
      updatedBy: true, 
      assignedTo: { include: { role: true } }, 
      parent: true 
    } 
  })
  if (!record) return null

  const user = await prisma.user.findUnique({ 
    where: { id: userId }, 
    select: { companyId: true, roleId: true } 
  })

  const salesManagers = await prisma.user.findMany({
    where: { role: { name: "Sales Manager" } },
    select: { name: true, email: true }
  })
  let salesManagerName: string | undefined = undefined
  let salesManagerEmail: string | undefined = undefined
  if (salesManagers.length > 0) {
    const randomIndex = Math.floor(Math.random() * salesManagers.length)
    const sm = salesManagers[randomIndex]
    salesManagerName = sm.name ?? undefined
    salesManagerEmail = sm.email
  }

  const values = (record.data ?? {}) as Record<string, unknown>
  const selectedBranchId = record.branchId ?? undefined
  const company = await prisma.company.findUnique({ 
    where: { id: user?.companyId ?? "" }, 
    select: { name: true, logoUrl: true, address: true, companyEmail: true, companyPhoneNumber: true, pic: true, parentId: true } 
  })

  // Fallback to parent company logo if current company logo is null
  if (company && !company.logoUrl && company.parentId) {
    const parentCompany = await prisma.company.findUnique({
      where: { id: company.parentId },
      select: { logoUrl: true }
    })
    if (parentCompany?.logoUrl) {
      company.logoUrl = parentCompany.logoUrl
    }
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
          const parentValRaw = depFieldKey ? values[depFieldKey] : undefined
          const parentValStr = typeof parentValRaw === "string" ? parentValRaw : String(parentValRaw ?? "")
          const recs = await prisma.docRecord.findMany({ where: { docTypeId: targetDT.id, ...(selectedBranchId ? { branchId: selectedBranchId } : {}) }, orderBy: { createdAt: "desc" } })
          const filtered = (depFieldKey && depSourceField && parentValStr) ? recs.filter((r) => {
            const d = (r.data ?? {}) as Record<string, unknown>
            const srcValRaw = d[depSourceField]
            const srcValStr = typeof srcValRaw === "string" ? srcValRaw : String(srcValRaw ?? "")
            return srcValStr === parentValStr
          }) : recs
          dynamicOptions[f.key] = filtered.map((r) => {
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
          const filterObj = (src && typeof src["filter"] === "object") ? (src["filter"] as Record<string, unknown>) : undefined
          const depFieldKey = filterObj && typeof filterObj["dependsOn"] === "string" ? (filterObj["dependsOn"] as string) : ""
          const depSourceField = filterObj && typeof filterObj["field"] === "string" ? (filterObj["field"] as string) : ""
          const parentValRaw = depFieldKey ? values[depFieldKey] : undefined
          const parentValStr = typeof parentValRaw === "string" ? parentValRaw : String(parentValRaw ?? "")
          // Build where clause from source config
          const whereClause: Record<string, unknown> = {}
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
          dynamicOptions[f.key] = filtered.map((r) => {
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
        const cfgOpts = cfg.options ?? []
        dynamicOptions[f.key] = cfgOpts.map((o) => ({ label: o.label, value: o.value }))
      }
    }
  }

  const cfgAll = (docType.config ?? {}) as unknown as Record<string, unknown>
  const childMapRaw = (cfgAll["childDocTypes"] ?? {}) as Record<string, string>
  const childDefaultKey = typeof cfgAll["childDocTypeKey"] === "string" ? (cfgAll["childDocTypeKey"] as string) : ""
  const tableFields = docType.fields.filter((f) => f.type === ("TABLE" as FieldType))
  const childEntitiesByFieldKey: Record<string, { id: string; key: string; fields: Array<{ key: string; label: string; type: FieldType }> } | null> = {}
  for (const tf of tableFields) {
    const childKey = childMapRaw[tf.key] || childDefaultKey || ""
    const child = childKey ? await prisma.docType.findUnique({ where: { key: childKey }, include: { fields: { orderBy: { order: "asc" } } } }) : null
    childEntitiesByFieldKey[tf.key] = child ? { id: child.id, key: child.key, fields: child.fields.map((f) => ({ key: f.key, label: f.label, type: f.type as FieldType })) } : null
  }
  const childOptionsByFieldKey: Record<string, Record<string, Array<{ label: string; value: string }>>> = {}
  for (const tf of tableFields) {
    const child = childEntitiesByFieldKey[tf.key]
    if (!child) continue
    childOptionsByFieldKey[tf.key] = {}
    for (const f of child.fields) {
      if (f.type === ("DROPDOWN" as FieldType)) {
        const childDT = await prisma.docType.findUnique({ where: { key: child.key }, include: { fields: true } })
        const childField = childDT?.fields.find((cf) => cf.key === f.key)
        const cCfg = (childField?.config ?? {}) as unknown as { options?: Array<{ label: string; value: string }>; source?: Record<string, unknown> }
        const src = cCfg?.source as Record<string, unknown> | undefined
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
            const whereClause: Record<string, unknown> = {}
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
  const rows = await prisma.docRow.findMany({ where: { recordId: id }, orderBy: { idx: "asc" } })
  let grandTotal = 0
  for (const row of rows) {
    const d = (row.data ?? {}) as Record<string, unknown>
    const qtyRaw = d["qty"]
    const priceRaw = d["price"]
    const qty = typeof qtyRaw === "number" ? qtyRaw : Number(qtyRaw ?? 0)
    const price = typeof priceRaw === "number" ? priceRaw : Number(priceRaw ?? 0)
    const discountRaw = d["discount_percent"] ?? d["discount_pct"] ?? d["discountPercentage"] ?? d["discount"] ?? d["disc"]
    const disc = typeof discountRaw === "number" ? discountRaw : Number(discountRaw ?? 0)
    const subtotal = qty * price * (disc ? (1 - disc / 100) : 1)
    grandTotal += subtotal
  }

  const rowsNull = rows.filter((r) => r.childDocTypeId === null)
  const isInvoiceFallback = docType.key === "invoice" && rowsNull.length > 0
  const firstTable = tableFields.find((tf) => Boolean(childEntitiesByFieldKey[tf.key]))
  const firstTableChild = firstTable ? childEntitiesByFieldKey[firstTable.key] : null
  const firstTableRows = firstTableChild ? rows.filter((r) => r.childDocTypeId === firstTableChild.id) : []
  const useInvoiceFallback = isInvoiceFallback && (!firstTableChild || firstTableRows.length === 0)
  const childPrev = useInvoiceFallback ? { id: "", key: "invoice_item", fields: [
    { key: "description", label: "Description", type: ("TEXT" as FieldType) },
    { key: "qty", label: "Qty", type: ("NUMBER" as FieldType) },
    { key: "price", label: "Unit Price", type: ("PRICE" as FieldType) },
    { key: "discount_percent", label: "Discount (%)", type: ("NUMBER" as FieldType) },
    { key: "subtotal", label: "Subtotal", type: ("PRICE" as FieldType) },
  ] } : (firstTable ? childEntitiesByFieldKey[firstTable.key] : null)
  const rowsPrev = useInvoiceFallback
    ? rowsNull.map((r) => ({ data: (r.data ?? {}) as Record<string, unknown> }))
    : (childPrev ? rows.filter((r) => r.childDocTypeId === childPrev.id).map((r) => ({ data: (r.data ?? {}) as Record<string, unknown> })) : [])
  const childOptionsPrev = useInvoiceFallback ? {} : (firstTable ? (childOptionsByFieldKey[firstTable.key] ?? {}) : {})
  const namingCfg = (docType.config ?? {}) as unknown as { naming?: { mode?: string; field?: string; defaultPattern?: string } }
  const namingMode = namingCfg.naming?.mode ?? "series"
  const namingField = namingCfg.naming?.field ?? "naming_series"
  const seriesName = (() => {
    const codeStr = typeof record.code === "string" ? record.code : ""
    if (codeStr) return codeStr
    if (namingMode === "series" || namingMode === "field") {
      const raw = values[namingField]
      const str = typeof raw === "string" ? raw : String(raw ?? "")
      if (str) return str
    }
    const def = namingCfg.naming?.defaultPattern ?? ""
    if (def) return def
    return ""
  })()
  
  let parentSeriesName = ""
  if (record.parent) {
    const pDT = await prisma.docType.findUnique({ where: { id: record.parent.docTypeId } })
    if (pDT) {
      const pCfg = (pDT.config ?? {}) as unknown as { naming?: { mode?: string; field?: string; defaultPattern?: string } }
      const pMode = pCfg.naming?.mode ?? "series"
      const pField = pCfg.naming?.field ?? "naming_series"
      const pData = (record.parent.data ?? {}) as Record<string, unknown>

      if (record.parent.code) {
        parentSeriesName = record.parent.code
      } else {
        if (pMode === "series" || pMode === "field") {
          const raw = pData[pField]
          const str = typeof raw === "string" ? raw : String(raw ?? "")
          if (str) parentSeriesName = str
        }
        if (!parentSeriesName) {
          parentSeriesName = pCfg.naming?.defaultPattern ?? ""
        }
      }
    }
  }

  let grandParentRecord: Record<string, unknown> | null = null
  let grandParentSeriesName = ""
  if (record.parent?.parentId) {
    const gp = await prisma.docRecord.findUnique({ where: { id: record.parent.parentId } })
    if (gp) {
      grandParentRecord = gp as unknown as Record<string, unknown>
      const gpDT = await prisma.docType.findUnique({ where: { id: gp.docTypeId } })
      if (gpDT) {
        const gpCfg = (gpDT.config ?? {}) as unknown as { naming?: { mode?: string; field?: string; defaultPattern?: string } }
        const gpMode = gpCfg.naming?.mode ?? "series"
        const gpField = gpCfg.naming?.field ?? "naming_series"
        const gpData = (gp.data ?? {}) as Record<string, unknown>
        if (gp.code) {
          grandParentSeriesName = gp.code
        } else {
          if (gpMode === "series" || gpMode === "field") {
            const raw = gpData[gpField]
            const str = typeof raw === "string" ? raw : String(raw ?? "")
            if (str) grandParentSeriesName = str
          }
          if (!grandParentSeriesName) {
            grandParentSeriesName = gpCfg.naming?.defaultPattern ?? ""
          }
        }
      }
    }
  }

  const createdDate = (() => {
    const dt = record.createdAt
    if (!dt) return ""
    const d = new Date(dt)
    const y = d.getFullYear()
    const m = String(d.getMonth() + 1).padStart(2, "0")
    const dd = String(d.getDate()).padStart(2, "0")
    return `${y}-${m}-${dd}`
  })()
  let customerEmail: string | undefined = undefined
  let customerPhoneNumber: string | undefined = undefined
  let customerAddress: string | undefined = undefined
  let customerJobTitle: string | undefined = undefined
  let customerCompanyName: string | undefined = undefined
  let customerPIC: any = null
  {
    const custIdRaw = values["customer_id"] ?? values["customerId"]
    const custId = typeof custIdRaw === "string" ? custIdRaw : Array.isArray(custIdRaw) ? custIdRaw[0] : typeof custIdRaw === "number" ? String(custIdRaw) : ""
    if (custId) {
      const companyRec = await prisma.company.findUnique({ where: { id: custId }, select: { name: true, address: true, companyEmail: true, companyPhoneNumber: true, pic: true } })
      if (companyRec) {
        customerCompanyName = companyRec.name ?? undefined
        customerEmail = companyRec.companyEmail ?? undefined
        customerPhoneNumber = companyRec.companyPhoneNumber ?? undefined
        customerAddress = companyRec.address ?? undefined
        if (companyRec.pic) {
          customerPIC = companyRec.pic
          customerJobTitle = companyRec.pic.jobTitle ?? undefined
        }
      } else {
        const userRec = await prisma.user.findUnique({ where: { id: custId }, include: { company: { include: { pic: true } } } })
        if (userRec) {
          customerEmail = userRec.email
          customerPhoneNumber = userRec.phoneNumber ?? undefined
          customerAddress = userRec.address ?? undefined
          customerJobTitle = userRec.jobTitle ?? undefined
          if (userRec.company) {
            customerCompanyName = userRec.company.name
            if (userRec.company.pic) customerPIC = userRec.company.pic
          }
        } else {
          const custRec = await prisma.docRecord.findUnique({ where: { id: custId } })
          if (custRec) {
            const cd = (custRec.data ?? {}) as Record<string, unknown>
            const emailRaw = cd["customer_email"] ?? cd["email"]
            const phoneRaw = cd["customer_phonenumber"] ?? cd["phone_number"]
            const addressRaw = cd["customer_address"] ?? cd["address"]
            const jobTitleRaw = cd["customer_job_title"] ?? cd["job_title"] ?? cd["jobTitle"]
            const companyIdRaw = cd["companyId"] ?? cd["company_id"]
            customerJobTitle = typeof jobTitleRaw === "string" ? jobTitleRaw : (jobTitleRaw ? String(jobTitleRaw) : undefined)
            const companyId = typeof companyIdRaw === "string" ? companyIdRaw : String(companyIdRaw ?? "")
            if (companyId) {
              const compRec = await prisma.company.findUnique({ where: { id: companyId }, select: { name: true, address: true, companyEmail: true, companyPhoneNumber: true, pic: true } })
              if (compRec) {
                customerCompanyName = compRec.name ?? undefined
                customerEmail = compRec.companyEmail ?? (typeof emailRaw === "string" ? emailRaw : String(emailRaw ?? ""))
                customerPhoneNumber = compRec.companyPhoneNumber ?? (typeof phoneRaw === "string" ? phoneRaw : String(phoneRaw ?? ""))
                customerAddress = compRec.address ?? (typeof addressRaw === "string" ? addressRaw : String(addressRaw ?? ""))
                if (compRec.pic) customerPIC = compRec.pic
              } else {
                customerEmail = typeof emailRaw === "string" ? emailRaw : String(emailRaw ?? "")
                customerPhoneNumber = typeof phoneRaw === "string" ? phoneRaw : String(phoneRaw ?? "")
                customerAddress = typeof addressRaw === "string" ? addressRaw : String(addressRaw ?? "")
              }
            } else {
              customerEmail = typeof emailRaw === "string" ? emailRaw : String(emailRaw ?? "")
              customerPhoneNumber = typeof phoneRaw === "string" ? phoneRaw : String(phoneRaw ?? "")
              customerAddress = typeof addressRaw === "string" ? addressRaw : String(addressRaw ?? "")
            }
          }
        }
      }
    }
  }

  return {
    docType,
    record,
    values,
    dynamicOptions,
    childFields: childPrev ? childPrev.fields.map((cf) => ({ key: cf.key, label: cf.label, type: cf.type as FieldType })) : [],
    rows: rowsPrev,
    childOptions: childOptionsPrev,
    grandTotal,
    company,
    customerEmail,
    customerPhoneNumber,
    customerAddress,
    customerJobTitle,
    customerCompanyName,
    customerPIC,
    creatorName: record.createdBy?.name ?? undefined,
    creatorEmail: record.createdBy?.email ?? undefined,
    creatorRole: record.createdBy?.role?.name ?? undefined,
    assignedToName: record.assignedTo?.name ?? undefined,
    assignedToEmail: record.assignedTo?.email ?? undefined,
    assignedToRole: record.assignedTo?.role?.name ?? undefined,
    salesManagerName,
    salesManagerEmail,
    seriesName,
    parentSeriesName,
    grandParentSeriesName,
    createdDate,
    parentRecord: record.parent ? (record.parent as unknown as Record<string, unknown>) : null,
    grandParentRecord,
  }
}
