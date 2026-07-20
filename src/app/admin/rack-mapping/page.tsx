import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import RackMappingClient from "./rack-mapping-client"

import { Plus } from "lucide-react"
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
    return <div>Access Denied</div>
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

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Rack Mapping</h1>
        <Button asChild>
          <Link href={createUrl}>
            <Plus className="mr-2 h-4 w-4" />
            Tambah Rack
          </Link>
        </Button>
      </div>

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
  )
}
