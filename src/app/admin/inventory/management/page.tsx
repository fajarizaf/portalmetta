import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { InventoryManagementClient } from "./client"

export const metadata = {
  title: "Inventory Management | Admin",
}

export default async function InventoryManagementPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) redirect("/auth/signin")

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { role: true },
  })
  if (!user) redirect("/auth/signin")

  const cookieStore = await cookies()
  const selectedBranchId = cookieStore.get("branchId")?.value || ""

  const goodsInItemType = await prisma.docType.findUnique({ where: { key: "goods_in_item" } })
  const goodsOutItemType = await prisma.docType.findUnique({ where: { key: "goods_out_item" } })

  if (!goodsInItemType || !goodsOutItemType) {
    return <InventoryManagementClient inItems={[]} outItems={[]} branches={[]} buildings={[]} floors={[]} rooms={[]} customers={[]} buildingMap={{}} floorMap={{}} roomMap={{}} customerMap={{}} selectedBranchId="" />
  }

  const branchWhere = selectedBranchId ? { branchId: selectedBranchId } : {}
  const completedStatus = { in: ["Completed", "Complete", "COMPLETED"] }

  const [goodsInItems, goodsOutItems, branches, buildings, floors, rooms, customers] = await Promise.all([
    prisma.docRow.findMany({
      where: {
        childDocTypeId: goodsInItemType.id,
        record: { status: completedStatus, ...branchWhere },
      },
      include: { record: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.docRow.findMany({
      where: {
        childDocTypeId: goodsOutItemType.id,
        record: { status: completedStatus, ...branchWhere },
      },
      include: { record: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.branch.findMany({ orderBy: { name: "asc" } }),
    prisma.building.findMany({ orderBy: { name: "asc" } }),
    prisma.floor.findMany({ orderBy: { level: "asc" } }),
    prisma.room.findMany({ orderBy: { name: "asc" } }),
    prisma.company.findMany({ orderBy: { name: "asc" } }),
  ])

  const buildingMap = new Map(buildings.map(b => [b.id, b.name]))
  const floorMap = new Map(floors.map(f => [f.id, f.name]))
  const roomMap = new Map(rooms.map(r => [r.id, r.name]))
  const customerMap = new Map(customers.map(c => [c.id, c.name]))

  return (
    <InventoryManagementClient
      inItems={goodsInItems as any}
      outItems={goodsOutItems as any}
      branches={branches.map(b => ({ id: b.id, name: b.name }))}
      buildings={buildings.map(b => ({ id: b.id, name: b.name, branchId: b.branchId }))}
      floors={floors.map(f => ({ id: f.id, name: f.name, buildingId: f.buildingId }))}
      rooms={rooms.map(r => ({ id: r.id, name: r.name, floorId: r.floorId }))}
      customers={customers.map(c => ({ id: c.id, name: c.name }))}
      buildingMap={Object.fromEntries(buildingMap)}
      floorMap={Object.fromEntries(floorMap)}
      roomMap={Object.fromEntries(roomMap)}
      customerMap={Object.fromEntries(customerMap)}
      selectedBranchId={selectedBranchId}
    />
  )
}
