import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CustomerSidebar } from "@/components/customer/customer-sidebar"
import {
  LayoutGrid, MapPin, Building2, DoorOpen, Server,
  Activity, AlertCircle, Wifi, Plus, ArrowUpRight
} from "lucide-react"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { cn } from "@/lib/utils"
import Link from "next/link"

function statusBadgeVariant(name: unknown): "default" | "secondary" | "destructive" | "outline" {
  const s = String(name || "").toLowerCase()
  if (s.includes("cancel") || s.includes("reject") || s.includes("inactive")) return "destructive"
  if (s.includes("submit") || s.includes("progress")) return "secondary"
  if (s.includes("draft")) return "outline"
  if (s.includes("active") || s.includes("in use") || s.includes("completed") || s.includes("verified")) return "default"
  return "outline"
}

function statusLabel(name: string | null): { label: string; color: string } {
  const s = String(name || "").toLowerCase()
  if (s === "active" || s === "in use") return { label: "Active", color: "text-emerald-700 bg-emerald-50 border-emerald-200" }
  if (s === "inactive") return { label: "Inactive", color: "text-slate-600 bg-slate-100 border-slate-200" }
  if (s === "draft") return { label: "Draft", color: "text-amber-700 bg-amber-50 border-amber-200" }
  return { label: s || "Unknown", color: "text-slate-600 bg-slate-50 border-slate-200" }
}

export const metadata = {
  title: "My Racks | Customer Portal",
}

export default async function MyRacksPage() {
  const session = await getServerSession(authOptions)
  const email = session?.user?.email ?? ""
  const me = email ? await prisma.user.findUnique({ where: { email }, include: { role: { include: { permissions: { include: { permission: true } } } } } }) : null
  if (!me) redirect("/auth/signin")

  const userRecord = email ? await prisma.user.findUnique({ where: { email }, include: { company: true } }) : null
  const cookieStore = await cookies()
  const selectedBranchId = cookieStore.get("branchId")?.value

  if (!userRecord || !userRecord.company) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <CustomerSidebar roleId={me.roleId} />
        <div className="lg:col-span-9 space-y-6">
          <Card>
            <CardHeader className="pb-2 border-b">
              <CardTitle className="text-base">Rack Management</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="text-sm text-muted-foreground">Company information not found. Please contact administrator.</div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const racks = await prisma.docRecord.findMany({
    where: {
      docType: { key: "master_rack" },
      data: { path: "$.company_id", equals: userRecord.company.id },
      ...(selectedBranchId && { branchId: selectedBranchId })
    },
    orderBy: { createdAt: "desc" },
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

  const activeCount = racks.filter((r) => {
    const s = String(r.status || "").toLowerCase()
    return s === "active" || s === "in use" || s === "completed" || s === "verified"
  }).length

  const inactiveCount = racks.filter((r) => {
    const s = String(r.status || "").toLowerCase()
    return s === "inactive" || s === "draft"
  }).length

  const uniqueBuildings = new Set<string>()
  for (const rack of racks) {
    const data = rack.data as any
    if (data.building_id) uniqueBuildings.add(data.building_id)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <CustomerSidebar roleId={me.roleId} />

      <div className="lg:col-span-9 space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">Rack Management</h1>
            <p className="text-sm text-slate-500">Kelola dan pantau semua rack yang anda miliki.</p>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border border-slate-200/60">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Total Rack</p>
                  <p className="text-2xl font-bold text-slate-900 mt-1.5">{racks.length}</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                  <Server className="w-5 h-5 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-slate-200/60">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Aktif</p>
                  <p className="text-2xl font-bold text-emerald-600 mt-1.5">{activeCount}</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                  <Activity className="w-5 h-5 text-emerald-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-slate-200/60">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Non-Aktif</p>
                  <p className="text-2xl font-bold text-slate-600 mt-1.5">{inactiveCount}</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-slate-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-slate-200/60">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Lokasi</p>
                  <p className="text-2xl font-bold text-slate-900 mt-1.5">{uniqueBuildings.size}</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-violet-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Rack List */}
        <Card className="border border-slate-200/60 overflow-hidden">
          <CardHeader className="px-6 py-4 border-b border-slate-100">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold text-slate-900 flex items-center gap-2">
                <LayoutGrid className="w-4 h-4 text-slate-500" />
                Daftar Rack
                <span className="text-xs font-normal text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                  {racks.length}
                </span>
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {racks.length > 0 ? (
              <div>
                {racks.map((rack, index) => {
                  const data = rack.data as any
                  const branchName = locationMap.get(data.branch_id) || "-"
                  const buildingName = locationMap.get(data.building_id) || "-"
                  const roomName = locationMap.get(data.room_id) || "-"
                  const status = rack.status || "Unknown"
                  const statusInfo = statusLabel(status)

                  return (
                    <Link
                      key={rack.id}
                      href={`/customer/docs/master_rack/${rack.id}`}
                      className={cn(
                        "flex items-center gap-4 px-6 py-4 transition-colors hover:bg-slate-50/60 border-b border-slate-100 last:border-b-0 group",
                      )}
                    >
                      {/* Icon */}
                      <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-50 shrink-0 group-hover:bg-blue-100 transition-colors">
                        <Wifi className="w-5 h-5 text-blue-600" />
                      </div>

                      {/* Rack Info */}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-slate-900 group-hover:text-primary transition-colors">
                            {data.rack_name || "Unnamed Rack"}
                          </span>
                          <span className="text-[11px] text-slate-400 font-mono">
                            {data.id_rack ? `#${data.id_rack}` : ""}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 mt-1">
                          <div className="flex items-center gap-1 text-xs text-slate-500">
                            <MapPin className="w-3 h-3 shrink-0" />
                            <span>{branchName}</span>
                          </div>
                          <span className="text-slate-300">/</span>
                          <div className="flex items-center gap-1 text-xs text-slate-500">
                            <Building2 className="w-3 h-3 shrink-0" />
                            <span>{buildingName}</span>
                          </div>
                          <span className="text-slate-300">/</span>
                          <div className="flex items-center gap-1 text-xs text-slate-500">
                            <DoorOpen className="w-3 h-3 shrink-0" />
                            <span>{roomName}</span>
                          </div>
                        </div>
                      </div>

                      {/* Status + Arrow */}
                      <div className="flex items-center gap-3 shrink-0">
                        <span className={cn(
                          "inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-medium border",
                          statusInfo.color
                        )}>
                          {statusInfo.label}
                        </span>
                        <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover:text-primary transition-colors" />
                      </div>
                    </Link>
                  )
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
                <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
                  <Server className="w-7 h-7 text-slate-400" />
                </div>
                <h3 className="text-base font-semibold text-slate-900">Belum ada rack</h3>
                <p className="text-sm text-slate-500 mt-1 max-w-sm">
                  Anda belum memiliki rack. Hubungi administrator untuk menambahkan rack.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
