import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import RackMappingClient from "./rack-mapping-client"

import { Plus, ArrowLeft, LayoutGrid, Server, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function RackMappingPage({
  searchParams,
}: {
  searchParams?: Promise<{
    branchId?: string
    buildingId?: string
    floorId?: string
    roomId?: string
    companyId?: string
  }>
}) {
  const session = await getServerSession(authOptions)
  if (!session) redirect("/api/auth/signin")

  const email = session.user?.email ?? ""
  const me = await prisma.user.findUnique({
    where: { email },
    include: { role: { include: { permissions: { include: { permission: true } } } } }
  })

  const perm = new Set((me?.role?.permissions ?? []).map((rp) => rp.permission.key))
  if (!perm.has("ADMIN_PANEL_ACCESS")) {
    return (
      <div className="min-h-screen bg-slate-50/30 -m-4 sm:-m-6 p-4 sm:p-8">
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-center min-h-[60vh] space-y-4 text-center">
          <div className="h-16 w-16 rounded-2xl bg-slate-100 flex items-center justify-center">
            <Server className="h-8 w-8 text-slate-400" />
          </div>
          <h1 className="text-xl font-semibold text-slate-900">Access Denied</h1>
          <p className="text-sm text-slate-500 max-w-sm">Anda tidak memiliki akses ke halaman ini.</p>
        </div>
      </div>
    )
  }

  const params = await searchParams
  const selectedBranchId = params?.branchId
  const selectedBuildingId = params?.buildingId
  const selectedFloorId = params?.floorId
  const selectedRoomId = params?.roomId
  const selectedCompanyId = params?.companyId

  // Fetch all hierarchy data for filters
  const branches = await prisma.branch.findMany({ orderBy: { name: "asc" } })
  const buildings = selectedBranchId
    ? await prisma.building.findMany({ where: { branchId: selectedBranchId }, orderBy: { name: "asc" } })
    : []
  const floors = selectedBuildingId
    ? await prisma.floor.findMany({ where: { buildingId: selectedBuildingId }, orderBy: { level: "asc" } })
    : []
  const rooms = selectedFloorId
    ? await prisma.room.findMany({ where: { floorId: selectedFloorId }, orderBy: { name: "asc" } })
    : []

  // Fetch Racks
  const rackDt = await prisma.docType.findUnique({ where: { key: "master_rack" } })
  let racks: any[] = []
  if (rackDt) {
    const and: any[] = [{ docTypeId: rackDt.id }]
    if (selectedRoomId) {
      and.push({ data: { path: "$.room_id", equals: selectedRoomId } })
    } else if (selectedFloorId) {
      and.push({ data: { path: "$.floor_id", equals: selectedFloorId } })
    } else if (selectedBuildingId) {
      and.push({ data: { path: "$.building_id", equals: selectedBuildingId } })
    } else if (selectedBranchId) {
      and.push({ data: { path: "$.branch_id", equals: selectedBranchId } })
    }

    if (selectedCompanyId) {
      and.push({ data: { path: "$.company_id", equals: selectedCompanyId } })
    }

    racks = await prisma.docRecord.findMany({
      where: { AND: and },
      orderBy: { createdAt: "asc" }
    })
  }

  // Fetch Companies for assignment
  const companies = await prisma.company.findMany({ orderBy: { name: "asc" } })

  const createUrl = `/admin/docs/master_rack/create?${new URLSearchParams({
    branch_id: selectedBranchId || "",
    building_id: selectedBuildingId || "",
    floor_id: selectedFloorId || "",
    room_id: selectedRoomId || ""
  }).toString()}`

  const selectedBranch = branches.find((b) => b.id === selectedBranchId)
  const selectedBuilding = buildings.find((b) => b.id === selectedBuildingId)
  const selectedFloor = floors.find((f) => f.id === selectedFloorId)
  const selectedRoom = rooms.find((r) => r.id === selectedRoomId)

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
            <span className="text-slate-900 font-medium">Rack Mapping</span>
          </div>

          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-2xl bg-white border border-slate-200/80 flex items-center justify-center shadow-sm">
                <LayoutGrid className="h-7 w-7 text-slate-700" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Rack Mapping</h1>
                <div className="flex items-center gap-2 mt-1 text-sm text-slate-500">
                  <Building2 className="h-3.5 w-3.5" />
                  <span>{selectedBranch?.name ?? "All Branches"}</span>
                  {selectedBuilding && (
                    <>
                      <span className="text-slate-300">/</span>
                      <span>{selectedBuilding.name}</span>
                    </>
                  )}
                  {selectedFloor && (
                    <>
                      <span className="text-slate-300">/</span>
                      <span>Level {selectedFloor.level}</span>
                    </>
                  )}
                  {selectedRoom && (
                    <>
                      <span className="text-slate-300">/</span>
                      <span>{selectedRoom.name}</span>
                    </>
                  )}
                  <span className="text-slate-300">·</span>
                  <span className="font-medium text-slate-700">{racks.length} racks</span>
                </div>
              </div>
            </div>

            <Button asChild className="h-9 bg-slate-900 hover:bg-slate-800 text-white shadow-sm">
              <Link href={createUrl}>
                <Plus className="h-4 w-4 mr-2" />
                Tambah Rack
              </Link>
            </Button>
          </div>
        </div>

        {/* Content */}
        <RackMappingClient
          branches={branches}
          buildings={buildings}
          floors={floors}
          rooms={rooms}
          racks={racks}
          companies={companies}
          selectedBranchId={selectedBranchId}
          selectedBuildingId={selectedBuildingId}
          selectedFloorId={selectedFloorId}
          selectedRoomId={selectedRoomId}
          selectedCompanyId={selectedCompanyId}
        />
      </div>
    </div>
  )
}
