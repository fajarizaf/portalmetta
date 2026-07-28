import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import { InventoryClient } from "./client"

export const metadata = {
  title: "Inventory | Customer Portal",
}

export default async function InventoryPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.email) {
    redirect("/auth/signin")
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  })

  if (!user) {
    redirect("/auth/signin")
  }

  const goodsInItemType = await prisma.docType.findUnique({
    where: { key: "goods_in_item" },
  })

  const goodsOutItemType = await prisma.docType.findUnique({
    where: { key: "goods_out_item" },
  })

  let goodsInItems: any[] = []
  if (goodsInItemType) {
    goodsInItems = await prisma.docRow.findMany({
      where: {
        childDocTypeId: goodsInItemType.id,
        record: {
          createdById: user.id,
          OR: [
            { status: { equals: "Completed" } },
            { status: { contains: "Complete" } },
            { status: { contains: "COMPLETED" } },
          ],
        },
      },
      include: {
        record: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    })
  }

  let goodsOutItems: any[] = []
  if (goodsOutItemType) {
    goodsOutItems = await prisma.docRow.findMany({
      where: {
        childDocTypeId: goodsOutItemType.id,
        record: {
          createdById: user.id,
          OR: [
            { status: { equals: "Completed" } },
            { status: { contains: "Complete" } },
            { status: { contains: "COMPLETED" } },
          ],
        },
      },
      include: {
        record: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    })
  }

  // Collect all IDs from items to resolve names
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

  const buildingMap = Object.fromEntries(buildings.map(b => [b.id, b.name]))
  const floorMap = Object.fromEntries(floors.map(f => [f.id, f.name]))
  const roomMap = Object.fromEntries(roomRecords.map(r => [r.id, r.name]))
  const customerMap = Object.fromEntries(customers.map(c => [c.id, c.name]))
  const productMap = Object.fromEntries(products.map(p => [p.id, p.name]))

  return (
    <InventoryClient
      inItems={goodsInItems}
      outItems={goodsOutItems}
      buildingMap={buildingMap}
      floorMap={floorMap}
      roomMap={roomMap}
      customerMap={customerMap}
      productMap={productMap}
    />
  )
}
