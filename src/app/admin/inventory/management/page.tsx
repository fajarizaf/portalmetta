import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { InventoryManagementClient } from "./client"
import { ArrowLeft, Package, ArrowDownToLine, ArrowUpFromLine } from "lucide-react"
import Link from "next/link"

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
    return (
      <div className="min-h-screen bg-slate-50/30 -m-4 sm:-m-6 p-4 sm:p-8">
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-center min-h-[60vh] space-y-4 text-center">
          <div className="h-16 w-16 rounded-2xl bg-slate-100 flex items-center justify-center">
            <Package className="h-8 w-8 text-slate-400" />
          </div>
          <h1 className="text-xl font-semibold text-slate-900">Inventory</h1>
          <p className="text-sm text-slate-500 max-w-sm">DocType goods_in_item / goods_out_item belum tersedia.</p>
        </div>
      </div>
    )
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

  const buildingMap = new Map(buildings.map((b) => [b.id, b.name]))
  const floorMap = new Map(floors.map((f) => [f.id, f.name]))
  const roomMap = new Map(rooms.map((r) => [r.id, r.name]))
  const customerMap = new Map(customers.map((c) => [c.id, c.name]))

  const selectedBranch = branches.find((b) => b.id === selectedBranchId)
  const totalIn = goodsInItems.length
  const totalOut = goodsOutItems.length

  return (
    <div className="min-h-screen bg-slate-50/30 -m-4 sm:-m-6 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Link href="/admin" className="hover:text-slate-900 transition-colors flex items-center gap-1">
              <ArrowLeft className="h-3.5 w-3.5" />
              Admin
            </Link>
            <span className="text-slate-300">/</span>
            <span className="text-slate-900 font-medium">Inventory Management</span>
          </div>

          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-2xl bg-white border border-slate-200/80 flex items-center justify-center">
                <Package className="h-7 w-7 text-slate-700" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Inventory Management</h1>
                <div className="flex items-center gap-2 mt-1 text-sm text-slate-500">
                  <span>{selectedBranch?.name ?? "All Branches"}</span>
                  <span className="text-slate-300">·</span>
                  <span className="flex items-center gap-1">
                    <ArrowDownToLine className="h-3.5 w-3.5 text-emerald-600" />
                    <span className="text-slate-700 font-medium">{totalIn}</span>
                    <span>in</span>
                  </span>
                  <span className="text-slate-300">·</span>
                  <span className="flex items-center gap-1">
                    <ArrowUpFromLine className="h-3.5 w-3.5 text-amber-600" />
                    <span className="text-slate-700 font-medium">{totalOut}</span>
                    <span>out</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <InventoryManagementClient
          inItems={goodsInItems as any}
          outItems={goodsOutItems as any}
          branches={branches.map((b) => ({ id: b.id, name: b.name }))}
          buildings={buildings.map((b) => ({ id: b.id, name: b.name, branchId: b.branchId }))}
          floors={floors.map((f) => ({ id: f.id, name: f.name, buildingId: f.buildingId }))}
          rooms={rooms.map((r) => ({ id: r.id, name: r.name, floorId: r.floorId }))}
          customers={customers.map((c) => ({ id: c.id, name: c.name }))}
          buildingMap={Object.fromEntries(buildingMap)}
          floorMap={Object.fromEntries(floorMap)}
          roomMap={Object.fromEntries(roomMap)}
          customerMap={Object.fromEntries(customerMap)}
          selectedBranchId={selectedBranchId}
        />
      </div>
    </div>
  )
}
