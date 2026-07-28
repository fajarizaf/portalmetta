import { prisma } from "./prisma"
import { Prisma } from "@/generated/prisma/client"
import crypto from "crypto"
import QRCodeLib from "qrcode"
import { sendVisitorPassEmail } from "./mail"

export type DocEventName = "before_insert" | "validate" | "before_save" | "after_insert" | "on_submit" | "on_cancel" | "on_update_after_submit" | "on_approve"

function toNumber(v: unknown): number {
  if (typeof v === "number") return v
  if (typeof v === "string") {
    const n = Number(v)
    return Number.isNaN(n) ? 0 : n
  }
  if (typeof v === "boolean") return v ? 1 : 0
  return 0
}

export async function runDocEventHook(event: DocEventName, docTypeKey: string, recordId: string, actorId?: string): Promise<void> {
  console.log(`[runDocEventHook] TRIGGERED: event=${event}, docType=${docTypeKey}, recordId=${recordId}`)
  if (!docTypeKey || !recordId) return
  const dt = await prisma.docType.findUnique({ where: { key: docTypeKey } })
  if (!dt) {
    console.warn(`[runDocEventHook] DocType not found: ${docTypeKey}`)
    return
  }
  const cfg = (dt.config ?? {}) as Record<string, unknown>
  const rec = await prisma.docRecord.findUnique({ where: { id: recordId } })
  if (!rec) {
    console.warn(`[runDocEventHook] Record not found: ${recordId}`)
    return
  }

  function getRowValue(rowData: Record<string, unknown>, key: string): unknown {
    if (key in rowData) return rowData[key]
    const lower = key.toLowerCase()
    const upper = key.toUpperCase()
    if (lower in rowData) return rowData[lower]
    if (upper in rowData) return rowData[upper]
    return undefined
  }

  function evalRowFormula(formula?: string, rowData?: Record<string, unknown>, headerData?: Record<string, unknown>): number | null {
    if (!formula || !rowData) return null
    const allowedFns = new Set(["round","floor","ceil","min","max"])
    let expr = formula.replace(/\^/g, "**")
    expr = expr.replace(/\b([A-Za-z_][A-Za-z0-9_]*)\b/g, (m) => {
      if (allowedFns.has(m)) return `Math.${m}`
      return `get("${m}")`
    })
    try {
      const fn = new Function("get","Math", `return ( ${expr} )`)
      const res = fn((k: string) => {
        const v = (() => {
          const fromRow = getRowValue(rowData, k)
          if (fromRow !== undefined) return fromRow
          if (headerData) {
            const fromHeader = getRowValue(headerData, k)
            if (fromHeader !== undefined) return fromHeader
          }
          return undefined
        })()
        if (typeof v === "number") return v
        if (typeof v === "string") { const n = Number(v); return Number.isNaN(n) ? 0 : n }
        if (typeof v === "boolean") return v ? 1 : 0
        return 0
      }, Math)
      return (typeof res === "number" && Number.isFinite(res)) ? res : null
    } catch { return null }
  }

  const norm = (s: unknown) => String(s ?? "").trim().toLowerCase()

  const computeCfg = (cfg["compute"] ?? {}) as Record<string, unknown>
  const specRaw = computeCfg["totalFromRows"]
  const specs = Array.isArray(specRaw) ? specRaw as Array<Record<string, unknown>> : (specRaw ? [specRaw as Record<string, unknown>] : [])
  
  if (specs.length > 0) {
    const currentData = (rec.data ?? {}) as Record<string, unknown>
    const dataObj = JSON.parse(JSON.stringify(currentData)) as Record<string, unknown>
    for (const s of specs) {
      const targetField = String(s["targetField"] || "")
      const childKey = String(s["childDocTypeKey"] || "")
      const qtyKey = String(s["qtyKey"] || "qty")
      const nrcKey = String(s["nrcKey"] || "nrc")
      const mrcKey = String(s["mrcKey"] || "mrc")
      let formula = typeof s["formula"] === "string" ? (s["formula"] as string) : undefined
      
      if (formula) {
        formula = formula.replace(/Sum\s*\(([^)]+)\)/gi, "$1")
      }

      if (!targetField || !childKey) continue
      const child = await prisma.docType.findUnique({ where: { key: childKey } })
      const rows = await prisma.docRow.findMany({ where: { recordId, ...(child ? { childDocTypeId: child.id } : {}) }, orderBy: { idx: "asc" } })
      let total = 0
      for (const row of rows) {
        const d = (row.data ?? {}) as Record<string, unknown>
        if (formula) {
          const v = evalRowFormula(formula, d, dataObj)
          total += typeof v === "number" ? v : 0
        } else {
          const qty = toNumber(getRowValue(d, qtyKey)) || 0
          const nrc = toNumber(getRowValue(d, nrcKey)) || 0
          const mrc = toNumber(getRowValue(d, mrcKey)) || 0
          total += qty * (nrc + mrc)
        }
      }
      dataObj[targetField] = total
    }
    const hasChanged = JSON.stringify(currentData) !== JSON.stringify(dataObj)
    if (hasChanged) {
      await prisma.docRecord.update({ where: { id: recordId }, data: { data: dataObj as Prisma.InputJsonValue } })
    }
  }

  // --- Support Ticket Sender Name & Status Hook ---
  if (event === "after_insert" && docTypeKey === "ticket_message") {
    const actor = actorId ? await prisma.user.findUnique({ where: { id: actorId }, include: { role: true } }) : null
    if (actor) {
      const rows = await prisma.docRow.findMany({ where: { recordId } })
      for (const row of rows) {
        const d = (row.data ?? {}) as Record<string, unknown>
        if (!d["sender_name"]) {
          d["sender_name"] = actor.name || actor.email
          await prisma.docRow.update({ where: { id: row.id }, data: { data: d as Prisma.InputJsonValue } })
        }
      }

      // Update parent ticket status based on sender role
      const parentTicket = await prisma.docRecord.findUnique({ where: { id: recordId } })
      if (parentTicket && !["Resolved", "Closed"].includes(parentTicket.status || "")) {
        const isCustomer = actor.role?.name === "Customer"
        const isAdmin = actor.role?.name === "Admin"
        const nextStatus = isCustomer ? "Customer Reply" : isAdmin ? "Admin Reply" : null

        if (nextStatus && parentTicket.status !== nextStatus) {
          await prisma.docRecord.update({
            where: { id: recordId },
            data: { status: nextStatus }
          })
        }
      }
    }
  }

  if (event === "on_submit") {
    let wf: { config?: unknown } | null = null
    try {
      if (rec.branchId) {
        wf = await prisma.docWorkflow.findUnique({ where: { docTypeId_branchId: { docTypeId: dt.id, branchId: rec.branchId } } })
      }
      if (!wf && dt.branchId) {
        wf = await prisma.docWorkflow.findUnique({ where: { docTypeId_branchId: { docTypeId: dt.id, branchId: dt.branchId } } })
      }
      if (!wf) {
        wf = await prisma.docWorkflow.findFirst({ where: { docTypeId: dt.id, branchId: null } })
      }
    } catch {}
    const wfCfg = (wf?.config ?? {}) as unknown as { states?: Array<{ name: string; actions?: string[] }> }
    const actions = (wfCfg.states ?? []).find((s) => s.name === (rec.status ?? ""))?.actions ?? []
    const createdRecords: Array<{ key: string, id: string }> = []
    for (const act of actions) {
      const m = /^create\s*:\s*([A-Za-z0-9_\-]+)$/.exec(act)
      const targetKey = m ? m[1] : ""
      if (!targetKey) continue
      const targetDt = await prisma.docType.findUnique({ where: { key: targetKey } })
      if (!targetDt) continue
      const targetDtId = targetDt.id
      let initialStatus: string | undefined = undefined
      let initialDocStatus: number | undefined = undefined
      try {
        const wfTarget = await prisma.docWorkflow.findFirst({ where: { docTypeId: targetDt.id, isActive: true, OR: [{ branchId: rec.branchId ?? null }, { branchId: null }] }, orderBy: { branchId: "desc" } })
        const cfgT = (wfTarget?.config ?? {}) as unknown as { states?: Array<{ name: string; docStatus?: number }> }
        const st0 = cfgT.states && cfgT.states.length > 0 ? cfgT.states[0] : undefined
        initialStatus = st0?.name
        initialDocStatus = typeof st0?.docStatus === "number" ? st0?.docStatus : undefined
      } catch {}
      let code: string | undefined = undefined
      try {
        const namingCfgT = (targetDt.config ?? {}) as unknown as { naming?: { mode?: string; field?: string; defaultPattern?: string } }
        const namingMode = namingCfgT.naming?.mode ?? "series"
        const namingField = namingCfgT.naming?.field ?? "naming_series"
        const defaultPattern = namingCfgT.naming?.defaultPattern ?? ""
        const dataObj = (rec.data ?? {}) as Record<string, unknown>
        function nextCodePatternString(): string | null {
          let pattern = ""
          if (namingMode === "series") {
            const v = dataObj[namingField]
            pattern = typeof v === "string" && v ? v : defaultPattern
          } else if (namingMode === "uuid") {
            return crypto.randomUUID()
          } else if (namingMode === "random") {
            const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"
            let s = ""
            for (let i = 0; i < 8; i++) s += chars[Math.floor(Math.random() * chars.length)]
            return s
          } else if (namingMode === "field") {
            const v = dataObj[namingField]
            return typeof v === "string" && v ? v : null
          }
          if (!pattern) return null
          return pattern
        }
        async function generateSeriesCode(pattern: string, branchId: string | null): Promise<string> {
          const m = /^(.*?)(#+)(.*)$/.exec(pattern)
          const prefix = m ? m[1] : pattern
          const hashes = m ? m[2] : "#####"
          const suffix = m ? m[3] : ""
          const digits = hashes.length
          const keySeries = pattern
          const existing = await prisma.docNamingCounter.findFirst({
            where: { docTypeId: targetDtId, branchId: branchId ?? null, series: keySeries }
          })
          
          let counter
          if (existing) {
            counter = await prisma.docNamingCounter.update({
              where: { id: existing.id },
              data: { seq: { increment: 1 } }
            })
          } else {
            counter = await prisma.docNamingCounter.create({
              data: { docTypeId: targetDtId, branchId: branchId ?? null, series: keySeries, seq: 1 }
            })
          }
          const seq = counter.seq
          const pad = String(seq).padStart(digits, "0")
          return `${prefix}${pad}${suffix}`
        }
        const chosenPattern = nextCodePatternString()
        if (chosenPattern) {
          if (namingMode === "series") {
            code = await generateSeriesCode(chosenPattern, rec.branchId ?? null)
          } else {
            code = chosenPattern
          }
        }
      } catch {}

      const tgtCfg = (targetDt.config ?? {}) as Record<string, unknown>
      const srcAssignEnabled = Boolean(cfg["assignmentEnabled"])
      const tgtAssignEnabled = Boolean(tgtCfg["assignmentEnabled"])
      let assignedToId: string | null = null
      if (actorId) {
        assignedToId = actorId
      } else if (srcAssignEnabled && tgtAssignEnabled) {
        assignedToId = rec.assignedToId
      }

      await prisma.$transaction(async (tx) => {
        const headerData = (rec.data ?? {}) as Record<string, unknown>
        const newData: Record<string, unknown> = { ...headerData, _parentId: rec.id, _parentDocType: dt.key }
        
        // Handle customer mapping
        if (norm(dt.key) === "cross_connect" && norm(targetDt.key) === "sales_order") {
          let customerId = headerData.customer || headerData.customer_id || headerData.company_id || headerData.company
          if (!customerId && rec.createdById) {
            const creator = await tx.user.findUnique({ where: { id: rec.createdById }, select: { companyId: true } })
            if (creator?.companyId) customerId = creator.companyId
          }
          if (customerId) {
            newData.customer_id = customerId
          }
        }

        const created = await tx.docRecord.create({
          data: {
            docTypeId: targetDtId,
            branchId: rec.branchId ?? null,
            code,
            status: initialStatus,
            docStatus: initialDocStatus,
            data: newData as Prisma.InputJsonValue,
            createdById: rec.createdById,
            updatedById: rec.updatedById,
            assignedToId,
            parentId: rec.id
          }
        })
        createdRecords.push({ key: targetDt.key, id: created.id })

        // --- Handle Child Rows / Special Generation ---
        const srcCfgAll = (cfg as Record<string, unknown>)
        const srcChildMap = (srcCfgAll["childDocTypes"] ?? {}) as Record<string, string>
        const sourceChildKeys = Object.values(srcChildMap)
        
        // Fallback for known types
        if (sourceChildKeys.length === 0 && dt.key === "quotation") sourceChildKeys.push("quotation_item")
        if (sourceChildKeys.length === 0 && dt.key === "request") sourceChildKeys.push("request_item")
        if (dt.key === "work_order" && !sourceChildKeys.includes("work_order_item")) sourceChildKeys.push("work_order_item")

        const tgtCfgAll = (targetDt.config ?? {}) as Record<string, unknown>
        const tgtChildMap = (tgtCfgAll["childDocTypes"] ?? {}) as Record<string, string>
        const targetChildKeys = Object.values(tgtChildMap)
        if (targetChildKeys.length === 0 && targetDt.key === "sales_order") targetChildKeys.push("sales_order_item")
        if (targetChildKeys.length === 0 && targetDt.key === "work_order") targetChildKeys.push("work_order_item")

        const pickTargetChildKey = (): string | undefined => {
          if (targetChildKeys.length === 0) return undefined
          if (targetChildKeys.length === 1) return targetChildKeys[0]
          const preferred = targetChildKeys.find((k) => /item$/i.test(k))
          return preferred ?? targetChildKeys[0]
        }
        const targetChildKey = pickTargetChildKey()

        const pickSourceChildKey = (): string | undefined => {
          if (sourceChildKeys.length === 0) return undefined
          if (targetChildKey && /item$/i.test(targetChildKey)) {
             const match = sourceChildKeys.find((k) => /item$/i.test(k))
             if (match) return match
          }
          if (dt.key === "work_order") {
             const match = sourceChildKeys.find((k) => k === "work_order_item")
             if (match) return match
          }
          return sourceChildKeys[0]
        }
        const srcChildKey = pickSourceChildKey()

        // Handle child row creation
        if (targetChildKey) {
          const tgtChildDt = await tx.docType.findUnique({ where: { key: targetChildKey } })
          if (tgtChildDt) {
            let childStatus = "Draft"
            let childDocStatus: number | undefined = undefined
            try {
              const wf = await tx.docWorkflow.findFirst({
                where: { docTypeId: tgtChildDt.id, isActive: true, OR: [{ branchId: rec.branchId ?? null }, { branchId: null }] },
                orderBy: { branchId: "desc" }
              })
              const cfg = (wf?.config ?? {}) as unknown as { states?: Array<{ name: string; docStatus?: number }> }
              const st0 = cfg.states && cfg.states.length > 0 ? cfg.states[0] : undefined
              if (st0) {
                childStatus = st0.name
                childDocStatus = typeof st0.docStatus === "number" ? st0.docStatus : undefined
              } else {
                 if (initialStatus) childStatus = initialStatus
                 if (initialDocStatus !== undefined) childDocStatus = initialDocStatus
              }
            } catch {}

            // Case A: Source has child rows
            if (srcChildKey) {
              const srcChildDt = await tx.docType.findUnique({ where: { key: srcChildKey } })
              if (srcChildDt) {
                const rows = await tx.docRow.findMany({ where: { recordId, childDocTypeId: srcChildDt.id }, orderBy: { idx: "asc" } })
                for (const row of rows) {
                  await tx.docRow.create({ data: { recordId: created.id, childDocTypeId: tgtChildDt.id, idx: row.idx, data: (row.data ?? {}) as Prisma.InputJsonValue } })
                  await tx.docRecord.create({
                    data: {
                      docTypeId: tgtChildDt.id,
                      branchId: rec.branchId ?? null,
                      status: childStatus,
                      docStatus: childDocStatus,
                      data: { ...((row.data ?? {}) as Record<string, unknown>), _parentId: created.id, _parentDocType: targetDt.key } as Prisma.InputJsonValue,
                      createdById: rec.createdById,
                      updatedById: rec.updatedById,
                      parentId: created.id
                    }
                  })
                }
              }
            } 
            // Case B: Special generation (e.g. Cross Connect -> Sales Order)
            else if (norm(dt.key) === "cross_connect" && norm(targetDt.key) === "sales_order") {
              const product = await tx.product.findUnique({ 
                where: { id: "prod_cross_connect" },
                include: { prices: true }
              })
              const priceObj = product?.prices[0]
              const nrc = priceObj?.setupFee ?? 0
              const mrc = priceObj?.basePrice ?? 0

              const itemData = {
                product_id: "prod_cross_connect",
                qty: 1,
                nrc: nrc,
                mrc: mrc,
                price: nrc + mrc,
                description: `Cross Connect Service: ${headerData.cross_connect_type || ""} (${headerData.request_type || "New"})`
              }
              await tx.docRow.create({ 
                data: { 
                  recordId: created.id, 
                  childDocTypeId: tgtChildDt.id, 
                  idx: 0, 
                  data: itemData as Prisma.InputJsonValue 
                } 
              })
              await tx.docRecord.create({
                data: {
                  docTypeId: tgtChildDt.id,
                  branchId: rec.branchId ?? null,
                  status: childStatus,
                  docStatus: childDocStatus,
                  data: { ...itemData, _parentId: created.id, _parentDocType: targetDt.key } as Prisma.InputJsonValue,
                  createdById: rec.createdById,
                  updatedById: rec.updatedById,
                  parentId: created.id
                }
              })
            }
          }
        }
      })
    }
  }

  if (event === "on_approve") {
    console.log(`[runDocEventHook] on_approve hook for ${docTypeKey}`)

    // --- Visitor Request: Send QR Pass Email ---
    if (docTypeKey === "visitor_request") {
      try {
        const data = (rec.data ?? {}) as Record<string, unknown>
        const qrToken = typeof data["qr_token"] === "string" ? data["qr_token"] : null

        if (qrToken) {
          // Get creator info
          const creator = rec.createdById
            ? await prisma.user.findUnique({ where: { id: rec.createdById }, select: { email: true, name: true, companyId: true } })
            : null

          const customerEmail = creator?.email
          const customerName = creator?.name || "Customer"
          const location = "MettaDC"

          // Get branch info if available
          let branchName = location
          if (rec.branchId) {
            const branch = await prisma.branch.findUnique({ where: { id: rec.branchId }, select: { name: true } })
            if (branch) branchName = `MettaDC ${branch.name}`
          }

          const qrPayload = JSON.stringify({
            docType: "visitor_request",
            id: rec.id,
            token: qrToken,
            customerId: creator?.companyId || "",
            expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
          })

          const qrDataUrl = await QRCodeLib.toDataURL(qrPayload, {
            width: 300,
            margin: 2,
            color: { dark: "#000000", light: "#ffffff" },
          })

          const visitors = Array.isArray(data["visitors"])
            ? (data["visitors"] as Array<Record<string, unknown>>).map((v) => ({
                visitor_name: String(v["visitor_name"] || "-"),
                nik: String(v["nik"] || "-"),
                phone_number: typeof v["phone_number"] === "string" ? v["phone_number"] : undefined,
                email: typeof v["email"] === "string" ? v["email"] : undefined,
              }))
            : []

          const visitDate = typeof data["visit_date"] === "string" ? data["visit_date"] : "-"
          const purpose = typeof data["purpose"] === "string" ? data["purpose"] : "-"

          // 1) Send email to each visitor that has an email
          const visitorEmailsSent: string[] = []
          for (const v of visitors) {
            if (v.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) {
              try {
                await sendVisitorPassEmail({
                  toEmail: v.email,
                  customerName: customerName,
                  recordCode: rec.code,
                  visitDate,
                  purpose,
                  qrDataUrl,
                  visitors: [v],
                  recipientType: "visitor",
                  targetVisitorName: v.visitor_name,
                  location: branchName,
                })
                visitorEmailsSent.push(v.email)
              } catch (e) {
                console.error(`[runDocEventHook] Error sending visitor email to ${v.email}:`, e)
              }
            }
          }

          if (visitorEmailsSent.length > 0) {
            console.log(`[runDocEventHook] Visitor pass email sent to ${visitorEmailsSent.length} visitor(s): ${visitorEmailsSent.join(", ")} for ${rec.code}`)
          } else {
            console.warn(`[runDocEventHook] No visitor emails with valid addresses for visitor_request ${rec.id}`)
          }

          // 2) Also send summary email to the customer (requester) with all visitors
          if (customerEmail && customerEmail !== visitorEmailsSent[0]) {
            try {
              await sendVisitorPassEmail({
                toEmail: customerEmail,
                customerName,
                recordCode: rec.code,
                visitDate,
                purpose,
                qrDataUrl,
                visitors,
                recipientType: "customer",
                location: branchName,
              })
              console.log(`[runDocEventHook] Visitor pass summary email sent to customer ${customerEmail} for ${rec.code}`)
            } catch (e) {
              console.error(`[runDocEventHook] Error sending customer summary email:`, e)
            }
          } else if (!customerEmail) {
            console.warn(`[runDocEventHook] No creator email found for visitor_request ${rec.id}`)
          }
        }
      } catch (e) {
        console.error("[runDocEventHook] Error sending visitor pass email:", e)
      }
    }

    // --- Subscription Management Hook for Sales Order ---
    if (docTypeKey === "sales_order") {
      const data = (rec.data ?? {}) as Record<string, unknown>
      console.log(`[runDocEventHook] SO Data:`, JSON.stringify(data))
      const termOfPayment = String(data["term_of_payment"] || "One Time")
      
      // Get service names and check for recurring costs (MRC)
      let serviceName = ""
      let totalMrc = 0
      let hasMrc = false
      
      try {
        const soItemDt = await prisma.docType.findUnique({ where: { key: "sales_order_item" } })
        console.log(`[runDocEventHook] SO Item DocType: ${soItemDt?.id}`)
        if (soItemDt) {
          const items = await prisma.docRow.findMany({
            where: { recordId: rec.id, childDocTypeId: soItemDt.id }
          })
          console.log(`[runDocEventHook] Found ${items.length} items for SO ${rec.id}`)
          
          const recurringItems = items.filter(it => {
            const d = (it.data ?? {}) as Record<string, unknown>
            const mrcValue = toNumber(d["mrc"])
            console.log(`[runDocEventHook] Item ${it.id} MRC: ${mrcValue}`)
            return mrcValue > 0
          })
          
          // Additional check for total MRC from SO header
          const headerData = (rec.data ?? {}) as Record<string, unknown>
          const headerMrc = toNumber(headerData["subtotal_mrc"])
          console.log(`[runDocEventHook] Header Subtotal MRC: ${headerMrc}`)
          
          if (recurringItems.length > 0 || headerMrc > 0) {
            hasMrc = true
            console.log(`[runDocEventHook] hasMrc = true (by items or header)`)
            
            // Fetch product names to ensure accurate Service Name
            const productIds = recurringItems
              .map(it => String(((it.data ?? {}) as any)["product_id"] || ""))
              .filter(Boolean)
            
            const products = await prisma.product.findMany({
              where: { id: { in: productIds } },
              select: { id: true, name: true }
            })
            const productMap = new Map(products.map(p => [p.id, p.name]))

            serviceName = recurringItems.map(it => {
              const d = (it.data ?? {}) as Record<string, unknown>
              const pid = String(d["product_id"] || "")
              const pName = productMap.get(pid)
              const sName = String(d["service_name"] || "")
              const desc = String(d["description"] || "")
              
              // Priority: 1. Service Name field, 2. Description, 3. Product Name, 4. Fallback label
              if (sName && sName.trim()) return sName.trim()
              if (desc && desc.trim()) return desc.trim()
              if (pName) return pName
              return String(d["product_id_label"] || "Service")
            }).join(", ")
            
            totalMrc = recurringItems.reduce((acc, it) => {
              const d = (it.data ?? {}) as Record<string, unknown>
              const qty = toNumber(d["qty"]) || 1
              const mrc = toNumber(d["mrc"]) || 0
              return acc + (qty * mrc)
            }, 0)
          }
        }
      } catch (e) {
        console.error("[runDocEventHook] Error fetching SO items for subscription:", e)
      }

      console.log(`[runDocEventHook] Sales Order has MRC: ${hasMrc}`)

      // Generate subscription if there is MRC, regardless of term_of_payment
      if (hasMrc) {
        console.log(`[runDocEventHook] SO ${rec.code} has MRC, checking subscription creation...`)
        try {
          const subDt = await prisma.docType.findUnique({ where: { key: "subscription_management" } })
          if (subDt) {
            // Check if already exists to avoid duplicates
            console.log(`[runDocEventHook] Checking existing subscription for SO: ${rec.id}`)
            let existing = await prisma.docRecord.findFirst({
              where: {
                docTypeId: subDt.id,
                data: { path: "$.sales_order_id", equals: rec.id }
              }
            })

            // Fallback for cases where JSON path query might fail or behave unexpectedly
            if (!existing) {
              const allSubs = await prisma.docRecord.findMany({
                where: { docTypeId: subDt.id },
                select: { id: true, data: true }
              })
              existing = allSubs.find(s => {
                const d = (s.data ?? {}) as Record<string, unknown>
                return d["sales_order_id"] === rec.id
              }) as any
            }
            
            console.log(`[runDocEventHook] Existing subscription for SO ${rec.id}: ${existing ? (existing as any).id : 'NONE'}`)

            if (!existing) {
              console.log(`[runDocEventHook] No existing subscription found for SO: ${rec.code}. Creating...`)
              let code: string | undefined = undefined
              try {
                const namingCfg = (subDt.config ?? {}) as any
                const pattern = namingCfg?.naming?.defaultPattern || "SUB-#####"
                console.log(`[runDocEventHook] Using pattern: ${pattern}`)
                
                const m = /^(.*?)(#+)(.*)$/.exec(pattern)
                const prefix = m ? m[1].replace(".YYYY.", new Date().getFullYear().toString()) : "SUB-"
                const hashes = m ? m[2] : "#####"
                const suffix = m ? m[3] : ""
                const digits = hashes.length

                // Use manual check instead of upsert to be safe
                const branchIdForQuery = rec.branchId || null
                
                const existingCounter = await prisma.docNamingCounter.findFirst({
                  where: { docTypeId: subDt.id, branchId: branchIdForQuery, series: pattern }
                })

                let counter
                if (existingCounter) {
                  counter = await prisma.docNamingCounter.update({
                    where: { id: existingCounter.id },
                    data: { seq: { increment: 1 } }
                  })
                } else {
                  counter = await prisma.docNamingCounter.create({
                    data: { docTypeId: subDt.id, branchId: branchIdForQuery, series: pattern, seq: 1 }
                  })
                }
                code = `${prefix}${String(counter.seq).padStart(digits, "0")}${suffix}`
                console.log(`[runDocEventHook] Generated Subscription Code: ${code}`)
              } catch (e) {
                console.error("[runDocEventHook] Error generating subscription code:", e)
              }

              const subData = {
                sales_order_id: rec.id,
                service_name: serviceName,
                customer_id: data["customer_id"] || data["customer"],
                start_date: data["commencement_date"] || new Date().toISOString().split("T")[0],
                frequency: termOfPayment === "One Time" ? "Monthly" : termOfPayment,
                status: "Deactive",
                total_mrc: totalMrc,
                next_billing_date: data["commencement_date"] || new Date().toISOString().split("T")[0]
              }

              console.log(`[runDocEventHook] Finalizing Subscription creation for SO: ${rec.code}`)
              await prisma.docRecord.create({
                data: {
                  docTypeId: subDt.id,
                  branchId: rec.branchId,
                  code,
                  status: "Deactive",
                  docStatus: 0,
                  data: subData as Prisma.InputJsonValue,
                  createdById: rec.createdById,
                  updatedById: rec.updatedById,
                  assignedToId: rec.assignedToId
                }
              })
              console.log(`[runDocEventHook] Subscription ${code} created successfully for SO: ${rec.code}`)
            } else {
              console.log(`[runDocEventHook] Subscription already exists for SO: ${rec.code}`)
            }
          } else {
            console.error(`[runDocEventHook] DocType 'subscription_management' not found!`)
          }
        } catch (e) {
          console.error("[runDocEventHook] Error in subscription creation:", e)
        }
      }
    }

    const isGoodsIn = docTypeKey === "goods_in_request"
    const isGoodsOut = docTypeKey === "goods_out_request"
    
    if (isGoodsIn || isGoodsOut) {
        if (!rec.branchId) {
            console.error(`[runDocEventHook] Goods in/out record ${rec.id} has no branchId — skipping inventory update`)
            return
        }

        const childKey = isGoodsIn ? "goods_in_item" : "goods_out_item"
        const childDt = await prisma.docType.findUnique({ where: { key: childKey } })
        
        if (childDt) {
            const rows = await prisma.docRow.findMany({ where: { recordId, childDocTypeId: childDt.id } })
            
            for (const row of rows) {
                const d = (row.data ?? {}) as Record<string, unknown>
                const typeOfMaterial = String(d["type_of_material"] || "")
                const qty = toNumber(d["quantity"] || d["qty"])
                const branchId = rec.branchId
                const roomId = String(d["room_id"] || "") || null
                const ownerCustomerId = String(d["owner_customer_id"] || "") || null
                
                if (typeOfMaterial && qty > 0 && branchId) {
                    const sign = isGoodsIn ? 1 : -1
                    const change = qty * sign
                    
                    await prisma.inventoryMovement.create({
                        data: {
                            quantity: change,
                            reference: rec.code || rec.id,
                            type: isGoodsIn ? "IN" : "OUT",
                            roomId: roomId || null,
                            ownerCustomerId: ownerCustomerId || null,
                            metadata: {
                                typeOfMaterial,
                                itemName: d["item_name"] || "",
                                serialNumber: d["serial_number"] || "",
                                buildingId: d["building_id"] || "",
                                floorId: d["floor_id"] || "",
                                branchId,
                            }
                        }
                    })
                }
            }
        }
    }
  }

  // --- Visitor Request QR Token Auto-Generation ---
  if (event === "after_insert" && docTypeKey === "visitor_request") {
    try {
      const data = (rec.data ?? {}) as Record<string, unknown>
      if (!data["qr_token"]) {
        const qrToken = crypto.randomUUID()
        const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
        await prisma.docRecord.update({
          where: { id: recordId },
          data: {
            data: {
              ...data,
              qr_token: qrToken,
              qr_status: "pending",
              qr_expires_at: expiresAt,
              qr_generated_at: new Date().toISOString(),
            } as any,
          },
        })
      }
    } catch (e) {
      console.error("[runDocEventHook] Error generating QR token for visitor_request:", e)
    }
  }
}
