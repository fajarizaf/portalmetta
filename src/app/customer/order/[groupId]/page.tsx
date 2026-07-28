
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { cookies } from "next/headers"
import type { FieldType } from "@/generated/prisma/enums"
import { DirectOrderList } from "@/components/customer/direct-order-list"

export const dynamic = "force-dynamic"
export const revalidate = 0

export default async function OrderByGroupPage(props: { params: Promise<{ groupId?: string }> }) {
  const params = await props.params;
  const session = await getServerSession(authOptions)
  const cookieStore = await cookies()
  const cookieGroupId = cookieStore.get("currentGroupId")?.value
  const groupId = params?.groupId ?? cookieGroupId
  const me = session?.user ?? null
  const userRecord = await prisma.user.findUnique({ 
    where: { email: me?.email ?? "" }, 
    include: { role: true } 
  })
  const rawCompanyId = userRecord?.companyId ?? undefined
  const parentCompanyId = rawCompanyId ? (await prisma.company.findUnique({ where: { id: rawCompanyId }, select: { parentId: true } }))?.parentId ?? undefined : undefined
  const companyId = parentCompanyId
  const cookieBranchId = cookieStore.get("branchId")?.value
  const branches = companyId ? await prisma.branch.findMany({ where: { companyId }, orderBy: { name: "asc" } }) : []
  const allowedBranchIds = new Set(branches.map((b) => b.id))
  const candidateBranchId = cookieBranchId ?? branches[0]?.id
  const selectedBranchId = allowedBranchIds.has(String(candidateBranchId)) ? candidateBranchId : branches[0]?.id

  const group = groupId ? await prisma.productGroup.findUnique({ where: { id: groupId } }) : null
  const selectedBranchIdFromGroup = group?.branchId
  const selectedBranchIdFinal = selectedBranchIdFromGroup ?? selectedBranchId

  const allGroups = selectedBranchIdFinal
    ? await prisma.productGroup.findMany({ where: { branchId: selectedBranchIdFinal }, select: { id: true, name: true, parentId: true } })
    : []
  const groupMap = new Map<string, { id: string; name: string; parentId: string | null }>()
  for (const g of allGroups) groupMap.set(g.id, { id: g.id, name: g.name, parentId: g.parentId ?? null })
  const descendantIds = new Set<string>()
  if (groupId) descendantIds.add(groupId)
  let frontier = groupId ? [groupId] : []
  for (let i = 0; i < 10 && frontier.length > 0; i++) {
    const next: string[] = []
    for (const node of frontier) {
      for (const g of allGroups) {
        if (g.parentId === node) {
          if (!descendantIds.has(g.id)) {
            descendantIds.add(g.id)
            next.push(g.id)
          }
        }
      }
    }
    frontier = next
  }
  const allGroupIds = Array.from(descendantIds)

  const products = await prisma.product.findMany({
    where: {
      active: true,
      ...(selectedBranchIdFinal ? { branchId: selectedBranchIdFinal } : companyId ? { branch: { companyId } } : {}),
      ...(groupId ? { groupId: { in: allGroupIds } } : {}),
    },
    include: { group: { include: { parent: true } }, specs: true, prices: true },
    orderBy: { name: "asc" },
  })
  const filteredProducts = products.filter((p) => p.groupId && allGroupIds.includes(p.groupId))

  let displayGroupName = group?.name ?? undefined
  if (!displayGroupName && groupId) {
    const fallbackById = await prisma.productGroup.findFirst({ where: { id: groupId } })
    displayGroupName = fallbackById?.name ?? displayGroupName
  }
  if (!displayGroupName) {
    const node = groupId ? groupMap.get(groupId) : undefined
    displayGroupName = node?.name ?? displayGroupName
  }
  if (!displayGroupName) {
    const direct = products.find((p) => p.group?.id === groupId)
    displayGroupName = direct?.group?.name ?? displayGroupName
  }
  if (!displayGroupName) {
    const child = products.find((p) => p.group?.parentId === groupId)
    displayGroupName = child?.group?.parent?.name ?? displayGroupName
  }
  displayGroupName = displayGroupName ?? "(unknown)"

  type ProductRow = (typeof products)[number]
  const subsMap = new Map<string, { id: string; name: string; items: ProductRow[] }>()
  for (const p of filteredProducts) {
    const gid = p.group?.id ?? null
    if (gid && gid === groupId) {
      const subId = `${groupId}__direct`
      const curr = subsMap.get(subId) ?? { id: subId, name: "General", items: [] }
      curr.items.push(p)
      subsMap.set(subId, curr)
      continue
    }
    let cursor = gid
    let nearestChildId: string | null = null
    while (cursor && cursor !== groupId) {
      const node = groupMap.get(cursor)
      if (!node) break
      if (node.parentId === groupId) {
        nearestChildId = node.id
        break
      }
      cursor = node.parentId
    }
    const key = nearestChildId ?? `${groupId ?? "__"}__direct`
    const name = nearestChildId ? (groupMap.get(nearestChildId)?.name ?? "Subcategory") : "General"
    const curr = subsMap.get(key) ?? { id: key, name, items: [] }
    curr.items.push(p)
    subsMap.set(key, curr)
  }
  const subs = Array.from(subsMap.values()).sort((a, b) => a.name.localeCompare(b.name))
  const immediateSubs = allGroups.filter((g) => g.parentId === groupId)

  const specDynamicOptions = new Map<string, Record<string, Array<{ label: string; value: string }>>>()
  for (const p of filteredProducts) {
    const per: Record<string, Array<{ label: string; value: string }>> = {}
    for (const s of p.specs) {
      if (s.type === ("DROPDOWN" as FieldType)) {
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
            // Use the selectedBranchId (from cookies/selector) instead of selectedBranchIdFinal (which is tied to the product group)
            // This allows customers to see their racks in the branch they have currently selected in the UI.
            const rows = await prisma.docRecord.findMany({ where: { docTypeId: targetDT.id, ...(selectedBranchId ? { branchId: selectedBranchId } : {}) }, orderBy: { createdAt: "desc" } })
            const filtersArr = Array.isArray((src as Record<string, unknown>)["filters"]) ? ((src as Record<string, unknown>)["filters"] as Array<Record<string, unknown>>) : []
            const filteredRows = rows.filter((r) => {
              const d = (r.data ?? {}) as Record<string, unknown>
              for (const f of filtersArr) {
                const field = typeof f["field"] === "string" ? (f["field"] as string) : ""
                const op = typeof f["op"] === "string" ? (f["op"] as string) : "eq"
                const vsrc = typeof f["valueSource"] === "string" ? (f["valueSource"] as string) : "literal"
                const vkey = typeof f["valueKey"] === "string" ? (f["valueKey"] as string) : ""
                const sessionMap = new Map<string, string>([
                  ["branchId", String(selectedBranchId ?? "")],
                  ["groupId", String(groupId ?? "")],
                  ["currentGroupId", String(cookieGroupId ?? "")],
                  ["userEmail", String(me?.email ?? "")],
                  ["userCompanyId", String(rawCompanyId ?? "")],
                  ["companyParentId", String(companyId ?? "")],
                ])
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
            per[s.key] = filteredRows.map((r) => {
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
            const filtersArr = Array.isArray((src as Record<string, unknown>)["filters"]) ? ((src as Record<string, unknown>)["filters"] as Array<Record<string, unknown>>) : []
            const filteredRows = rows.filter((r) => {
              for (const f of filtersArr) {
                const field = typeof f["field"] === "string" ? (f["field"] as string) : ""
                const op = typeof f["op"] === "string" ? (f["op"] as string) : "eq"
                const vsrc = typeof f["valueSource"] === "string" ? (f["valueSource"] as string) : "literal"
                const vkey = typeof f["valueKey"] === "string" ? (f["valueKey"] as string) : ""
                const sessionMap = new Map<string, string>([
                  ["branchId", String(selectedBranchId ?? "")],
                  ["groupId", String(groupId ?? "")],
                  ["currentGroupId", String(cookieGroupId ?? "")],
                  ["userEmail", String(me?.email ?? "")],
                  ["userCompanyId", String(rawCompanyId ?? "")],
                  ["companyParentId", String(companyId ?? "")],
                ])
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
            per[s.key] = filteredRows.map((r) => {
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
        } else if (src && src["mode"] === "inventory") {
          const goodsInItemType = await prisma.docType.findUnique({ where: { key: "goods_in_item" } })
          const goodsOutItemType = await prisma.docType.findUnique({ where: { key: "goods_out_item" } })
          if (goodsInItemType && goodsOutItemType) {
            const isCustomer = userRecord?.role?.name === "Customer"
            const commonWhere = {
              record: {
                status: { in: ["Completed", "Complete", "COMPLETED"] },
                ...(isCustomer ? { createdById: userRecord?.id } : (selectedBranchId ? { branchId: selectedBranchId } : {})),
              },
            }
            const goodsInItems = await prisma.docRow.findMany({ where: { childDocTypeId: goodsInItemType.id, ...commonWhere } })
            const goodsOutItems = await prisma.docRow.findMany({ where: { childDocTypeId: goodsOutItemType.id, ...commonWhere } })
            const balanceMap = new Map<string, { itemName: string, qty: number }>()
            goodsInItems.forEach(row => {
               const d = (row.data as any) || {}
               const name = d.item_name || d.name || d.itemName || d.label || "Unknown Item"
               const qty = Number(d.quantity || d.qty || d.amount || 0)
               const k = name.trim().toLowerCase()
               if (!balanceMap.has(k)) balanceMap.set(k, { itemName: name, qty: 0 })
               balanceMap.get(k)!.qty += qty
             })
             goodsOutItems.forEach(row => {
               const d = (row.data as any) || {}
               const name = d.item_name || d.name || d.itemName || d.label || "Unknown Item"
               const qty = Number(d.quantity || d.qty || d.amount || 0)
               const k = name.trim().toLowerCase()
               if (balanceMap.has(k)) balanceMap.get(k)!.qty -= qty
             })
            const opts: Array<{ label: string; value: string }> = []
            for (const item of balanceMap.values()) {
              if (item.qty > 0) {
                opts.push({ label: `${item.itemName} (Stok: ${item.qty})`, value: item.itemName })
              }
            }
            per[s.key] = opts
          }
        }
      }
    }
    specDynamicOptions.set(p.id, per)
  }

  // Convert Map to plain object for Client Component
  const specDynamicOptionsObj = Object.fromEntries(specDynamicOptions)

  return (
    <DirectOrderList
      displayGroupName={displayGroupName}
      immediateSubs={immediateSubs}
      subs={subs}
      specDynamicOptions={specDynamicOptionsObj}
      branchId={selectedBranchIdFinal}
    />
  )
}
