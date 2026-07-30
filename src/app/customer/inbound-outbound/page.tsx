import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { CustomerSidebar } from "@/components/customer/customer-sidebar"
import { InboundOutboundClient } from "./client"
import type { FieldType } from "@/generated/prisma/enums"
import type { Prisma } from "@/generated/prisma/client"

async function getDocs(key: string, me: any, scopeCompanyId: string | null, userCompanyId: string | null) {
  const docType = await prisma.docType.findUnique({ 
    where: { key }, 
    include: { fields: true, permissions: true } 
  })
  
  if (!docType) return { type: null, docs: [] }

  const permission = docType.permissions.find((pr) => pr.roleId === me.roleId)
  if (!permission?.canRead) return { type: null, docs: [] }

  // Ownership Logic
  const companyLinkFields = docType.fields
    .filter((f) => f.type === ("LINK" as FieldType) && (f.config as any)?.ref === "Company")
    .map((f) => f.key)
  
  const userLinkFields = docType.fields
    .filter((f) => f.type === ("LINK" as FieldType) && (f.config as any)?.ref === "User")
    .map((f) => f.key)

  const ownershipConditions: Prisma.DocRecordWhereInput[] = []
  
  // 1. Created by Me
  ownershipConditions.push({ createdById: me.id })
  
  // 2. Created by My Team
  if (scopeCompanyId) {
    ownershipConditions.push({ createdBy: { companyId: scopeCompanyId } })
  }
  
  // 3. Assigned to Me
  ownershipConditions.push({ assignedToId: me.id })
  
  // 4. Linked to My Company
  if (userCompanyId) {
    for (const k of companyLinkFields) {
        ownershipConditions.push({ data: { path: `$.${k}`, equals: userCompanyId } as unknown as Prisma.JsonFilter })
    }
  }

  // 5. Linked to Me
  for (const k of userLinkFields) {
      ownershipConditions.push({ data: { path: `$.${k}`, equals: me.id } as unknown as Prisma.JsonFilter })
  }

  const docs = await prisma.docRecord.findMany({
    where: {
        docTypeId: docType.id,
        OR: ownershipConditions
    },
    orderBy: { updatedAt: "desc" },
    take: 20
  })

  // Serialize dates
  const docsSerialized = docs.map((d) => ({
    ...d,
    createdAt: d.createdAt.toISOString(),
    updatedAt: d.updatedAt.toISOString(),
  }))

  return { type: docType, docs: docsSerialized }
}

export default async function InboundOutboundPage() {
  const session = await getServerSession(authOptions)
  const email = session?.user?.email ?? ""
  const me = email ? await prisma.user.findUnique({ where: { email }, include: { role: { include: { permissions: { include: { permission: true } } } } } }) : null
  
  if (!me) redirect("/customer")

  const userCompanyId = email ? (await prisma.user.findUnique({ where: { email }, select: { companyId: true } }))?.companyId ?? null : null
  const parentCompanyId = userCompanyId ? (await prisma.company.findUnique({ where: { id: userCompanyId }, select: { parentId: true } }))?.parentId ?? null : null
  const scopeCompanyId = parentCompanyId ?? userCompanyId

  const goodsIn = await getDocs("goods_in_request", me, scopeCompanyId, userCompanyId)
  const goodsOut = await getDocs("goods_out_request", me, scopeCompanyId, userCompanyId)

  // Fetch inventory items for stock balance
  const goodsInItemType = await prisma.docType.findUnique({ where: { key: "goods_in_item" } })
  const goodsOutItemType = await prisma.docType.findUnique({ where: { key: "goods_out_item" } })

  let goodsInItems: any[] = []
  if (goodsInItemType) {
    goodsInItems = await prisma.docRow.findMany({
      where: {
        childDocTypeId: goodsInItemType.id,
        record: {
          createdById: me.id,
          OR: [
            { status: { equals: "Completed" } },
            { status: { contains: "Complete" } },
            { status: { contains: "COMPLETED" } },
          ],
        },
      },
      include: { record: true },
      orderBy: { createdAt: "desc" },
    })
  }

  let goodsOutItems: any[] = []
  if (goodsOutItemType) {
    goodsOutItems = await prisma.docRow.findMany({
      where: {
        childDocTypeId: goodsOutItemType.id,
        record: {
          createdById: me.id,
          OR: [
            { status: { equals: "Completed" } },
            { status: { contains: "Complete" } },
            { status: { contains: "COMPLETED" } },
          ],
        },
      },
      include: { record: true },
      orderBy: { createdAt: "desc" },
    })
  }

  const allItems = [...goodsInItems, ...goodsOutItems]
  const buildingIds = new Set<string>()
  const floorIds = new Set<string>()
  const roomIds = new Set<string>()
  const customerIds = new Set<string>()
  const productIds = new Set<string>()

  for (const item of allItems) {
    const d = (item.data ?? {}) as Record<string, any>
    if (d.building_id) buildingIds.add(d.building_id)
    if (d.floor_id) floorIds.add(d.floor_id)
    if (d.room_id) roomIds.add(d.room_id)
    if (d.owner_customer_id) customerIds.add(d.owner_customer_id)
    if (d.product_id) productIds.add(d.product_id)
  }

  const [buildings, floors, roomRecords, customers, products] = await Promise.all([
    buildingIds.size > 0 ? prisma.building.findMany({ where: { id: { in: Array.from(buildingIds) } } }) : [],
    floorIds.size > 0 ? prisma.floor.findMany({ where: { id: { in: Array.from(floorIds) } } }) : [],
    roomIds.size > 0 ? prisma.room.findMany({ where: { id: { in: Array.from(roomIds) } } }) : [],
    customerIds.size > 0 ? prisma.company.findMany({ where: { id: { in: Array.from(customerIds) } } }) : [],
    productIds.size > 0 ? prisma.product.findMany({ where: { id: { in: Array.from(productIds) } } }) : [],
  ])

  const buildingMap: Record<string, string> = Object.fromEntries(buildings.map(b => [b.id, b.name]))
  const floorMap: Record<string, string> = Object.fromEntries(floors.map(f => [f.id, f.name]))
  const roomMap: Record<string, string> = Object.fromEntries(roomRecords.map(r => [r.id, r.name]))
  const customerMap: Record<string, string> = Object.fromEntries(customers.map(c => [c.id, c.name]))
  const productMap: Record<string, string> = Object.fromEntries(products.map(p => [p.id, p.name]))

  const serializeItems = (items: any[]) => items.map((item) => ({
    id: item.id,
    createdAt: item.createdAt.toISOString(),
    data: item.data,
    record: {
      code: item.record.code,
      createdAt: item.record.createdAt.toISOString(),
      data: item.record.data,
    },
  }))

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <CustomerSidebar roleId={me.roleId} />
      <div className="lg:col-span-9">
         <InboundOutboundClient 
            goodsInType={goodsIn.type} 
            goodsInDocs={goodsIn.docs} 
            goodsOutType={goodsOut.type} 
            goodsOutDocs={goodsOut.docs}
            goodsInItems={serializeItems(goodsInItems)}
            goodsOutItems={serializeItems(goodsOutItems)}
            buildingMap={buildingMap}
            floorMap={floorMap}
            roomMap={roomMap}
            customerMap={customerMap}
            productMap={productMap}
         />
      </div>
    </div>
  )
}
