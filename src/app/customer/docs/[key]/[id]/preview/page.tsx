import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { DocumentPreview } from "@/components/document-preview"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import type { FieldType } from "@/generated/prisma/enums"

export default async function CustomerDocPreviewPage({ params }: { params?: Record<string, string | string[] | undefined> | Promise<Record<string, string | string[] | undefined>> }) {
  const session = await getServerSession(authOptions)
  const email = session?.user?.email ?? ""
  const me = email ? await prisma.user.findUnique({ where: { email }, select: { id: true, roleId: true, companyId: true } }) : null
  const p = ((await params) ?? {}) as Record<string, string | string[] | undefined>
  const keyRaw = p?.key
  const idRaw = p?.id
  const key = typeof keyRaw === "string" ? keyRaw : Array.isArray(keyRaw) ? keyRaw[0] : ""
  const id = typeof idRaw === "string" ? idRaw : Array.isArray(idRaw) ? idRaw[0] : ""
  if (!key) redirect("/customer/docs")
  if (!id || !me?.id) redirect(`/customer/docs/${key}`)
  const docType = await prisma.docType.findUnique({ where: { key }, include: { fields: { orderBy: { order: "asc" } }, permissions: true } })
  if (!docType) redirect("/customer/docs")
  const permission = docType.permissions.find((pr) => pr.roleId === me?.roleId)
  const canRead = permission ? permission.canRead : false
  if (!canRead) redirect("/customer")
  const userCompanyId = me?.companyId ?? null
  const parentCompanyId = userCompanyId ? (await prisma.company.findUnique({ where: { id: userCompanyId }, select: { parentId: true } }))?.parentId ?? null : null
  const scopeCompanyId = parentCompanyId ?? userCompanyId
  const record = await prisma.docRecord.findUnique({ where: { id }, include: { createdBy: { include: { role: true } }, updatedBy: true, assignedTo: { include: { role: true } }, parent: true } })
  if (!record) redirect(`/customer/docs/${key}`)

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

  const isCreator = record.createdById === me.id
  const isAssigned = record.assignedToId === me.id
  const isCompanyCreator = Boolean(scopeCompanyId && record.createdBy?.companyId === scopeCompanyId)
  
  let isLinked = false
  const data = (record.data ?? {}) as Record<string, unknown>
  for (const f of docType.fields) {
      const val = data[f.key]
      if (val === me.id) isLinked = true
      if (scopeCompanyId && val === scopeCompanyId) isLinked = true
  }

  const hasAccess = isCreator || isAssigned || isCompanyCreator || isLinked
  if (!hasAccess) redirect(`/customer/docs/${key}`)
  const values = (record.data ?? {}) as Record<string, unknown>
  const targetCompanyId = parentCompanyId ?? me?.companyId ?? ""
  const company = await prisma.company.findUnique({ where: { id: targetCompanyId }, select: { name: true, logoUrl: true, address: true, companyEmail: true, companyPhoneNumber: true, pic: true } })

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
          const rows = await prisma.docRecord.findMany({ where: { docTypeId: targetDT.id }, orderBy: { createdAt: "desc" } })
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
  const childMapRaw = (cfgAll["childDocTypes"] ?? {}) as Record<string, string>
  const tableFields = docType.fields.filter((f) => f.type === ("TABLE" as FieldType))
  const childEntitiesByFieldKey: Record<string, { id: string; key: string; fields: Array<{ key: string; label: string; type: FieldType }> } | null> = {}
  for (const tf of tableFields) {
    const childKey = childMapRaw[tf.key] || ""
    const child = childKey ? await prisma.docType.findUnique({ where: { key: childKey }, include: { fields: { orderBy: { order: "asc" } } } }) : null
    childEntitiesByFieldKey[tf.key] = child ? { id: child.id, key: child.key, fields: child.fields.map((f) => ({ key: f.key, label: f.label, type: f.type as FieldType })) } : null
  }
  const rows = await prisma.docRow.findMany({ where: { recordId: id }, orderBy: { idx: "asc" } })
  let grandTotal = 0
  for (const row of rows) {
    const d = (row.data ?? {}) as Record<string, unknown>
    const qtyRaw = d["qty"]
    const priceRaw = d["price"]
    const discountRaw = d["discount_percent"]
    const qty = typeof qtyRaw === "number" ? qtyRaw : Number(qtyRaw ?? 0)
    const price = typeof priceRaw === "number" ? priceRaw : Number(priceRaw ?? 0)
    const disc = typeof discountRaw === "number" ? discountRaw : Number(discountRaw ?? 0)
    const subtotal = qty * price * (disc ? (1 - disc / 100) : 1)
    grandTotal += subtotal
  }
  const firstTable = tableFields.find((tf) => Boolean(childEntitiesByFieldKey[tf.key]))
  const childPrev = firstTable ? childEntitiesByFieldKey[firstTable.key] : null
  const rowsPrev = childPrev ? rows.filter((r) => r.childDocTypeId === childPrev.id).map((r) => ({ data: (r.data ?? {}) as Record<string, unknown> })) : []
  const childOptionsPrev: Record<string, Array<{ label: string; value: string }>> = {}
  if (childPrev) {
    for (const f of childPrev.fields) {
      if (f.type === ("DROPDOWN" as FieldType)) {
        const childDT = await prisma.docType.findUnique({ where: { key: childPrev.key }, include: { fields: true } })
        const childField = childDT?.fields.find((cf) => cf.key === f.key)
        const cCfg = (childField?.config ?? {}) as unknown as { options?: Array<{ label: string; value: string }>; source?: Record<string, unknown> }
        const src = cCfg?.source as Record<string, unknown> | undefined
        if (Array.isArray(cCfg.options)) {
          childOptionsPrev[f.key] = cCfg.options
        } else if (src && typeof src["table"] === "string" && src["table"]) {
          const tableName = String(src["table"]) || ""
          const modelProp = tableName ? (tableName.slice(0, 1).toLowerCase() + tableName.slice(1)) : ""
          const client = prisma as unknown as Record<string, { findMany: (args?: unknown) => Promise<Array<Record<string, unknown>>> }>
          if (modelProp && client && typeof client[modelProp]?.findMany === "function") {
            const labelField = src && typeof src["labelField"] === "string" ? (src["labelField"] as string) : "name"
            const valueField = src && typeof src["valueField"] === "string" ? (src["valueField"] as string) : "id"
            const rows2: Array<Record<string, unknown>> = await client[modelProp].findMany()
            childOptionsPrev[f.key] = rows2.map((r) => {
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
  }

  let customerEmail: string | undefined = undefined
  let customerPhoneNumber: string | undefined = undefined
  let customerAddress: string | undefined = undefined
  let customerJobTitle: string | undefined = undefined
  let customerCompanyName: string | undefined = undefined
  let customerPIC: any = null
  {
    const custIdRaw = (values as Record<string, unknown>)["customer_id"] ?? (values as Record<string, unknown>)["customerId"]
    const custId = typeof custIdRaw === "string" ? custIdRaw : Array.isArray(custIdRaw) ? custIdRaw[0] : typeof custIdRaw === "number" ? String(custIdRaw) : ""
    if (custId) {
      const custField = docType.fields.find((f) => f.key === "customer_id" || f.key === "customerId")
      const fieldCfg = (custField?.config ?? {}) as unknown as { source?: Record<string, unknown> }
      const src = fieldCfg?.source as Record<string, unknown> | undefined
      const tableName = src && typeof src["table"] === "string" ? String(src["table"]) : ""
      if (tableName && tableName.toLowerCase() === "company") {
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
        }
      } else if (tableName && tableName.toLowerCase() === "user") {
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
        }
      } else {
        // Try User table first
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
          // Fallback to DocRecord
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
              const companyRec = await prisma.company.findUnique({ where: { id: companyId }, select: { name: true, address: true, companyEmail: true, companyPhoneNumber: true, pic: true } })
              if (companyRec) {
                customerCompanyName = companyRec.name ?? undefined
                customerEmail = companyRec.companyEmail ?? (typeof emailRaw === "string" ? emailRaw : String(emailRaw ?? ""))
                customerPhoneNumber = companyRec.companyPhoneNumber ?? (typeof phoneRaw === "string" ? phoneRaw : String(phoneRaw ?? ""))
                customerAddress = companyRec.address ?? (typeof addressRaw === "string" ? addressRaw : String(addressRaw ?? ""))
                if (companyRec.pic) customerPIC = companyRec.pic
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

  const namingCfg = (docType.config ?? {}) as unknown as { naming?: { mode?: string; field?: string; defaultPattern?: string } }
  const namingMode = namingCfg.naming?.mode ?? "series"
  const namingField = namingCfg.naming?.field ?? "naming_series"
  const seriesName = (() => {
    const codeStr = typeof record.code === "string" ? record.code : ""
    if (codeStr) return codeStr
    if (namingMode === "series" || namingMode === "field") {
      const raw = (values as Record<string, unknown>)[namingField]
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

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Preview Dokumen</h1>
        <Button asChild><Link href={`/customer/docs/${key}`}>Kembali</Link></Button>
      </div>
      <DocumentPreview
        docTypeKey={docType.key}
        docTypeName={docType.name}
        code={record.code ?? record.id}
        status={record.status ?? ""}
        currency={String(values["currency"] ?? "")}
        grandTotal={grandTotal}
        fields={docType.fields.map((f) => ({ key: f.key, label: f.label, type: f.type as FieldType }))}
        values={values}
        dynamicOptions={dynamicOptions}
        childFields={childPrev ? childPrev.fields.map((cf) => ({ key: cf.key, label: cf.label, type: cf.type as FieldType })) : []}
        rows={rowsPrev}
        childOptions={childOptionsPrev}
        defaultTemplate={(docType.config as unknown as Record<string, unknown>)?.["previewTemplate"] as string | undefined}
        companyName={company?.name}
        companyLogoUrl={company?.logoUrl ?? undefined}
        companyEmail={company?.companyEmail ?? undefined}
        companyPhoneNumber={company?.companyPhoneNumber ?? undefined}
        customerEmail={customerEmail}
        customerPhoneNumber={customerPhoneNumber}
        customerAddress={customerAddress}
        customerJobTitle={customerJobTitle}
        customerCompanyName={customerCompanyName}
        companyAddress={company?.address ?? undefined}
        creatorName={record.createdBy?.name ?? undefined}
        creatorEmail={record.createdBy?.email ?? undefined}
        creatorRole={record.createdBy?.role?.name ?? undefined}
        assignedToName={record.assignedTo?.name ?? undefined}
        assignedToEmail={record.assignedTo?.email ?? undefined}
        assignedToRole={record.assignedTo?.role?.name ?? undefined}
        salesManagerName={salesManagerName}
        salesManagerEmail={salesManagerEmail}
        seriesName={seriesName}
        parentSeriesName={parentSeriesName}
        grandParentSeriesName={grandParentSeriesName}
        createdDate={createdDate}
        parentRecord={record.parent ? (record.parent as unknown as Record<string, unknown>) : null}
        grandParentRecord={grandParentRecord}
        companyPIC={company?.pic ? {
          name: company.pic.name,
          email: company.pic.email,
          phoneNumber: company.pic.phoneNumber,
          technicalContactName: company.pic.technicalContactName,
          billingContactName: company.pic.billingContactName,
          technicalPhoneNumber: company.pic.technicalPhoneNumber,
          billingPhoneNumber: company.pic.billingPhoneNumber,
          technicalEmail: company.pic.technicalEmail,
          billingEmail: company.pic.billingEmail
        } : null}
        customerPIC={customerPIC ? {
          name: customerPIC.name,
          email: customerPIC.email,
          phoneNumber: customerPIC.phoneNumber,
          technicalContactName: customerPIC.technicalContactName,
          billingContactName: customerPIC.billingContactName,
          technicalPhoneNumber: customerPIC.technicalPhoneNumber,
          billingPhoneNumber: customerPIC.billingPhoneNumber,
          technicalEmail: customerPIC.technicalEmail,
          billingEmail: customerPIC.billingEmail
        } : null}

      />
    </div>
  )
}
