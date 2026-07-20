import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function GET(req: Request) {
  try {
    const url = new URL(req.url)
    const mode = url.searchParams.get("mode") || ""
    const key = url.searchParams.get("key") || ""
    const table = url.searchParams.get("table") || ""
    const labelField = url.searchParams.get("labelField") || "name"
    const valueField = url.searchParams.get("valueField") || "id"
    const branchId = url.searchParams.get("branchId") || ""
    const depFields = url.searchParams.getAll("depField")
    const depValues = url.searchParams.getAll("depValue")
    const filters = depFields.map((f, i) => ({ field: f, value: depValues[i] || "" })).filter((x) => x.field && x.value)
    
    // Fallback: check if they are sent as single params instead of getAll
    if (filters.length === 0) {
      const f1 = url.searchParams.get("depField")
      const v1 = url.searchParams.get("depValue")
      if (f1 && v1) {
        filters.push({ field: f1, value: v1 })
      }
    }

    const options: Array<{ label: string; value: string }> = []

    if (mode === "static_dep") {
      // Find any filter that has the expected values, or matches the field name
      // Be more flexible with field names (handle spec_ prefix or exact match)
      const typeFilter = filters.find(f => {
        const field = (f.field || "").toLowerCase()
        const val = (f.value || "").trim()
        return field.includes("cross_connect_type") ||
               val === "Fiber Optic" || 
               val === "UTP"
      })
      
      let type = (typeFilter?.value || "").trim()
      
      // Fallback: check all filters for these specific values regardless of field name
      if (!type) {
        for (const f of filters) {
          const val = (f.value || "").trim().toLowerCase()
          if (val === "fiber optic") {
            type = "Fiber Optic"
            break
          } else if (val === "utp") {
            type = "UTP"
            break
          }
        }
      }
      
      if (type === "Fiber Optic") {
        options.push({ label: "SC-SC", value: "SC-SC" })
        options.push({ label: "LC-SC", value: "LC-SC" })
        options.push({ label: "LC-LC", value: "LC-LC" })
      } else if (type === "UTP") {
        options.push({ label: "LAN", value: "LAN" })
      } else {
        // Return all possible options for static_dep if nothing selected yet
        // This ensures the dropdown is not empty.
        options.push({ label: "SC-SC", value: "SC-SC" })
        options.push({ label: "LC-SC", value: "LC-SC" })
        options.push({ label: "LC-LC", value: "LC-LC" })
        options.push({ label: "LAN", value: "LAN" })
      }
    } else if (mode === "doctype" && key) {
      const dt = await prisma.docType.findUnique({ where: { key } })
      if (dt) {
        const recs = await prisma.docRecord.findMany({ where: { docTypeId: dt.id, ...(branchId ? { branchId } : {}) as Record<string, string> }, orderBy: { createdAt: "desc" } })
        const toCamel = (s: string) => s.replace(/[_-]([a-zA-Z])/g, (_, c) => String(c).toUpperCase())
        const filtered = (filters.length > 0)
          ? recs.filter((r) => {
              const d = (r.data ?? {}) as Record<string, unknown>
              for (const fl of filters) {
                const rawA = d[fl.field]
                const rawB = d[toCamel(fl.field)]
                const raw = rawA !== undefined ? rawA : rawB
                const v = typeof raw === "string" ? raw : String(raw ?? "")
                if (v !== fl.value) return false
              }
              return true
            })
          : recs
        for (const r of filtered) {
          const d = (r.data ?? {}) as Record<string, unknown>
          const labelRaw = d[labelField]
          const valueRaw = d[valueField]
          const label = typeof labelRaw === "string" ? labelRaw : String(labelRaw ?? r.id)
          const value = typeof valueRaw === "string" ? valueRaw : r.id
          options.push({ label, value })
        }
      }
    } else if (mode === "inventory") {
      const session = await getServerSession(authOptions)
      if (!session?.user?.email) {
        return NextResponse.json([])
      }
      const user = await prisma.user.findUnique({ where: { email: session.user.email }, include: { role: true } })
      if (!user) return NextResponse.json([])

      const goodsInItemType = await prisma.docType.findUnique({ where: { key: "goods_in_item" } })
      const goodsOutItemType = await prisma.docType.findUnique({ where: { key: "goods_out_item" } })
      
      if (!goodsInItemType || !goodsOutItemType) {
        return NextResponse.json([])
      }

      const effectiveBranchId = branchId || filters.find(f => f.field === "branch_id" || f.field === "branchId")?.value || ""

      const isCustomer = user.role?.name === "Customer"

      // Common where clause for stock items
      const commonWhere = {
        record: {
          status: { in: ["Completed", "Complete", "COMPLETED"] },
          ...(isCustomer ? { createdById: user.id } : (effectiveBranchId ? { branchId: effectiveBranchId } : {})),
        },
      }

      // Fetch Goods In items
      const goodsInItems = await prisma.docRow.findMany({
        where: {
          childDocTypeId: goodsInItemType.id,
          ...commonWhere,
        },
      })

      // Fetch Goods Out items
      const goodsOutItems = await prisma.docRow.findMany({
        where: {
          childDocTypeId: goodsOutItemType.id,
          ...commonWhere,
        },
      })

      const balanceMap = new Map<string, { itemName: string, qty: number }>()

      goodsInItems.forEach(row => {
        const d = (row.data as any) || {}
        const name = d.item_name || d.name || d.itemName || d.label || "Unknown Item"
        const qty = Number(d.quantity || d.qty || d.amount || 0)
        const key = name.trim().toLowerCase()
        if (!balanceMap.has(key)) balanceMap.set(key, { itemName: name, qty: 0 })
        balanceMap.get(key)!.qty += qty
      })

      goodsOutItems.forEach(row => {
        const d = (row.data as any) || {}
        const name = d.item_name || d.name || d.itemName || d.label || "Unknown Item"
        const qty = Number(d.quantity || d.qty || d.amount || 0)
        const key = name.trim().toLowerCase()
        if (balanceMap.has(key)) {
          balanceMap.get(key)!.qty -= qty
        }
      })

      for (const item of balanceMap.values()) {
        if (item.qty > 0) {
          options.push({
            label: `${item.itemName} (Stok: ${item.qty})`,
            value: item.itemName
          })
        }
      }
    } else if (mode === "table" && table) {
      const modelProp = table.slice(0, 1).toLowerCase() + table.slice(1)
      const client = prisma as unknown as Record<string, { findMany: (args?: unknown) => Promise<Array<Record<string, unknown>>> }>
      if (client && typeof client[modelProp]?.findMany === "function") {
        const recs: Array<Record<string, unknown>> = await client[modelProp].findMany()
        const hasBranchField = branchId && recs.some((r) => Object.prototype.hasOwnProperty.call(r, "branchId") || Object.prototype.hasOwnProperty.call(r, "branch_id"))
        const scoped = hasBranchField
          ? recs.filter((r) => {
              const raw = (r["branchId"] ?? r["branch_id"]) as unknown
              const v = typeof raw === "string" ? raw : String(raw ?? "")
              return v === branchId
            })
          : recs
        const toCamel = (s: string) => s.replace(/[_-]([a-zA-Z])/g, (_, c) => c.toUpperCase())
        const filtered = (filters.length > 0)
          ? scoped.filter((r) => {
              for (const fl of filters) {
                const rawA = r[fl.field]
                const rawB = r[toCamel(fl.field)]
                const raw = rawA !== undefined ? rawA : rawB
                const v = typeof raw === "string" ? raw : String(raw ?? "")
                if (v !== fl.value) return false
              }
              return true
            })
          : scoped
        for (const r of filtered) {
          const labelRaw = r[labelField]
          const valueRaw = r[valueField]
          const label = typeof labelRaw === "string" ? labelRaw : String(labelRaw ?? r["id"]) 
          const value = typeof valueRaw === "string" ? valueRaw : String(r["id"]) 
          options.push({ label, value })
        }
      }
    }

    return NextResponse.json(options)
  } catch (e) {
    return NextResponse.json([], { status: 200 })
  }
}
