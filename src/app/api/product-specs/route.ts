import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import type { FieldType } from "@/generated/prisma/enums"

export async function GET(req: Request) {
  try {
    const url = new URL(req.url)
    const productId = url.searchParams.get("productId") || ""
    const branchId = url.searchParams.get("branchId") || ""
    if (!productId) return NextResponse.json({ error: "productId required" }, { status: 400 })
    const specs = await prisma.productSpecField.findMany({ where: { productId } })
    const outFields = specs.map((s) => ({ id: s.id, key: s.key, label: s.label, type: s.type as FieldType, required: s.required, config: s.config as unknown as Record<string, unknown> }))
    const options: Record<string, Array<{ label: string; value: string }>> = {}
    for (const s of specs) {
      if ((s.type as FieldType) !== ("DROPDOWN" as FieldType)) continue
      const cfg = (s.config ?? {}) as unknown as { options?: Array<{ label: string; value: string }>; source?: Record<string, unknown> }
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
          const rows = await prisma.docRecord.findMany({ where: { docTypeId: targetDT.id, ...(branchId ? { branchId } : {}) }, orderBy: { createdAt: "desc" } })
          const filtersArr = Array.isArray((src as Record<string, unknown>)["filters"]) ? (((src as Record<string, unknown>)["filters"]) as Array<Record<string, unknown>>) : []
          const sessionMap = new Map<string, string>([
            ["branchId", String(branchId || "")],
          ])
          const filtered = rows.filter((r) => {
            const d = (r.data ?? {}) as Record<string, unknown>
            for (const f of filtersArr) {
              const field = typeof f["field"] === "string" ? (f["field"] as string) : ""
              const op = typeof f["op"] === "string" ? (f["op"] as string) : "eq"
              const vsrc = typeof f["valueSource"] === "string" ? (f["valueSource"] as string) : "literal"
              const vkey = typeof f["valueKey"] === "string" ? (f["valueKey"] as string) : ""
              const target = vsrc === "session" ? (sessionMap.get(vkey) ?? "") : String(f["value"] ?? "")
              if (!field) continue
              const valRaw = d[field]
              const valStr = typeof valRaw === "string" ? valRaw : String(valRaw ?? "")
              if (op === "eq" && !(valStr === target)) return false
              if (op === "neq" && !(valStr !== target)) return false
              if (op === "contains" && !valStr.toLowerCase().includes(target.toLowerCase())) return false
              if (op === "startsWith" && !valStr.toLowerCase().startsWith(target.toLowerCase())) return false
              if (op === "endsWith" && !valStr.toLowerCase().endsWith(target.toLowerCase())) return false
            }
            return true
          })
          options[s.key] = filtered.map((r) => {
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
          const filtersArr = Array.isArray((src as Record<string, unknown>)["filters"]) ? (((src as Record<string, unknown>)["filters"]) as Array<Record<string, unknown>>) : []
          const sessionMap = new Map<string, string>([
            ["branchId", String(branchId || "")],
          ])
          const filtered = rows.filter((r) => {
            for (const f of filtersArr) {
              const field = typeof f["field"] === "string" ? (f["field"] as string) : ""
              const op = typeof f["op"] === "string" ? (f["op"] as string) : "eq"
              const vsrc = typeof f["valueSource"] === "string" ? (f["valueSource"] as string) : "literal"
              const vkey = typeof f["valueKey"] === "string" ? (f["valueKey"] as string) : ""
              const target = vsrc === "session" ? (sessionMap.get(vkey) ?? "") : String(f["value"] ?? "")
              if (!field) continue
              const valRaw = r[field]
              const valStr = typeof valRaw === "string" ? valRaw : String(valRaw ?? "")
              if (op === "eq" && !(valStr === target)) return false
              if (op === "neq" && !(valStr !== target)) return false
              if (op === "contains" && !valStr.toLowerCase().includes(target.toLowerCase())) return false
              if (op === "startsWith" && !valStr.toLowerCase().startsWith(target.toLowerCase())) return false
              if (op === "endsWith" && !valStr.toLowerCase().endsWith(target.toLowerCase())) return false
            }
            return true
          })
          options[s.key] = filtered.map((r) => {
            const labelRaw = r[labelField]
            const valueRaw = r[valueField]
            const label = typeof labelRaw === "string" ? labelRaw : String(labelRaw ?? r["id"]) 
            const value = typeof valueRaw === "string" ? valueRaw : String(r["id"]) 
            return { label, value }
          })
        }
      } else if (src && src["mode"] === "static_dep") {
        // Handle static dependencies like in dynamic-options
        // For product specs, we might not have the dependent values yet in the API call,
        // so we return all possible options or handle it on the client.
        // For now, let's return all common options if no filter is provided.
        options[s.key] = [
          { label: "SC-SC", value: "SC-SC" },
          { label: "LC-SC", value: "LC-SC" },
          { label: "LC-LC", value: "LC-LC" },
          { label: "LAN", value: "LAN" }
        ]
      } else if (Array.isArray(cfg.options)) {
        options[s.key] = cfg.options
      }
    }
    return NextResponse.json({ fields: outFields, options })
  } catch (e) {
    return NextResponse.json({ error: "unexpected" }, { status: 500 })
  }
}