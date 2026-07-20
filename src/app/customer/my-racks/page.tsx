
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText } from "lucide-react"
import { cookies } from "next/headers"

function statusBadgeVariant(name: unknown): "default" | "secondary" | "destructive" | "outline" {
  const s = String(name || "").toLowerCase()
  if (s.includes("cancel") || s.includes("reject")) return "destructive"
  if (s.includes("submit") || s.includes("progress")) return "secondary"
  if (s.includes("draft")) return "outline"
  if (s.includes("review") || s.includes("approve") || s.includes("verified") || s.includes("active") || s.includes("publish") || s.includes("in use") || s.includes("completed")) return "default"
  return "outline"
}

export default async function MyRacksPage() {
  const session = await getServerSession(authOptions)
  const email = session?.user?.email ?? ""
  const user = email ? await prisma.user.findUnique({ where: { email }, include: { company: true } }) : null
  const cookieStore = await cookies()
  const selectedBranchId = cookieStore.get("branchId")?.value

  if (!user || !user.company) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold">Rack Management</h1>
        <p>Company information not found. Please contact administrator.</p>
      </div>
    )
  }

  const racks = await prisma.docRecord.findMany({
    where: {
      docType: { key: "master_rack" },
      data: {
        path: "$.company_id",
        equals: user.company.id
      },
      ...(selectedBranchId && { branchId: selectedBranchId })
    },
    orderBy: { createdAt: "desc" }
  })

  const locationIds = new Set<string>()
  for (const rack of racks) {
    const data = rack.data as any
    if (data.branch_id) locationIds.add(data.branch_id)
    if (data.building_id) locationIds.add(data.building_id)
    if (data.room_id) locationIds.add(data.room_id)
  }

  const branches = await prisma.branch.findMany({ where: { id: { in: Array.from(locationIds) } } })
  const buildings = await prisma.building.findMany({ where: { id: { in: Array.from(locationIds) } } })
  const rooms = await prisma.room.findMany({ where: { id: { in: Array.from(locationIds) } } })

  const locationMap = new Map<string, string>()
  for (const b of branches) locationMap.set(b.id, b.name)
  for (const b of buildings) locationMap.set(b.id, b.name)
  for (const r of rooms) locationMap.set(r.id, r.name)

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Rack Management</h1>
      
      {racks.length === 0 ? (
        <div className="border rounded p-6 flex items-center gap-2 text-sm text-muted-foreground">
          <FileText className="h-4 w-4" />
          <span>You don't have any racks yet.</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {racks.map((rack) => {
            const data = rack.data as any
            const branchName = locationMap.get(data.branch_id) || "-"
            const buildingName = locationMap.get(data.building_id) || "-"
            const roomName = locationMap.get(data.room_id) || "-"

            return (
              <Card key={rack.id}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{data.rack_name || "Unnamed Rack"}</span>
                    <Badge variant={statusBadgeVariant(rack.status)}>
                      {rack.status}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground space-y-1">
                  <p><strong>Rack ID:</strong> {data.id_rack || "-"}</p>
                  <p><strong>Location:</strong> {branchName} / {buildingName} / {roomName}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
