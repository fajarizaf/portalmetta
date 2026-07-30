"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { SearchableSelect } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog"
import { updateRackAssignment, deleteRack } from "./actions"
import { useState } from "react"
import { Trash2, ExternalLink } from "lucide-react"

interface RackMappingClientProps {
  branches: any[]
  buildings: any[]
  floors: any[]
  rooms: any[]
  racks: any[]
  companies: any[]
  selectedBranchId?: string
  selectedBuildingId?: string
  selectedFloorId?: string
  selectedRoomId?: string
  selectedCompanyId?: string
}

export default function RackMappingClient({
  branches,
  buildings,
  floors,
  rooms,
  racks,
  companies,
  selectedBranchId,
  selectedBuildingId,
  selectedFloorId,
  selectedRoomId,
  selectedCompanyId,
}: RackMappingClientProps) {
  const router = useRouter()
  const [isUpdating, setIsUpdating] = useState(false)
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState<string | null>(null)

  const updateUrl = (params: Record<string, string | undefined>) => {
    const searchParams = new URLSearchParams(window.location.search)
    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        searchParams.set(key, value)
      } else {
        searchParams.delete(key)
      }
    })
    router.push(`/admin/rack-mapping?${searchParams.toString()}`)
  }

  const handleAction = async (formData: FormData) => {
    setIsUpdating(true)
    try {
      await updateRackAssignment(formData)
    } finally {
      setIsUpdating(false)
    }
  }

  const handleDelete = async (recordId: string) => {
    setIsUpdating(true)
    try {
      const formData = new FormData()
      formData.append("recordId", recordId)
      await deleteRack(formData)
      setDeleteConfirmOpen(null)
    } finally {
      setIsUpdating(false)
    }
  }

  const stats = {
    total: racks.length,
    available: racks.filter(r => (r.data?.status || "Available") === "Available").length,
    inUse: racks.filter(r => r.data?.status === "In Use").length,
    other: racks.filter(r => !["Available", "In Use"].includes(r.data?.status || "Available")).length
  }

  return (
    <div className="space-y-6">
      {/* Stats Summary */}
      {(selectedRoomId || selectedCompanyId) && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-slate-50 border-slate-200">
            <CardContent className="p-5 flex flex-col items-center justify-center">
              <span className="text-xs text-slate-500 uppercase font-semibold tracking-wider mb-1">Total Racks</span>
              <span className="text-[28px] font-bold tracking-tight text-slate-900">{stats.total}</span>
            </CardContent>
          </Card>
          <Card className="bg-emerald-50 border-emerald-100">
            <CardContent className="p-5 flex flex-col items-center justify-center text-emerald-700">
              <span className="text-xs uppercase font-semibold tracking-wider mb-1 opacity-80">Available</span>
              <span className="text-[28px] font-bold tracking-tight">{stats.available}</span>
            </CardContent>
          </Card>
          <Card className="bg-rose-50 border-rose-100">
            <CardContent className="p-5 flex flex-col items-center justify-center text-rose-700">
              <span className="text-xs uppercase font-semibold tracking-wider mb-1 opacity-80">In Use</span>
              <span className="text-[28px] font-bold tracking-tight">{stats.inUse}</span>
            </CardContent>
          </Card>
          <Card className="bg-blue-50 border-blue-100">
            <CardContent className="p-5 flex flex-col items-center justify-center text-blue-700">
              <span className="text-xs uppercase font-semibold tracking-wider mb-1 opacity-80">Reserved / Maint.</span>
              <span className="text-[28px] font-bold tracking-tight">{stats.other}</span>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="space-y-2">
              <Label>Branch</Label>
              <SearchableSelect 
                placeholder="Pilih Branch"
                defaultValue={selectedBranchId}
                options={branches.map(b => ({ label: b.name, value: b.id }))}
                onValueChange={(val) => updateUrl({ branchId: val, buildingId: undefined, floorId: undefined, roomId: undefined })}
              />
            </div>
            <div className="space-y-2">
              <Label>Building</Label>
              <SearchableSelect 
                placeholder="Pilih Building"
                defaultValue={selectedBuildingId}
                disabled={!selectedBranchId}
                options={buildings.map(b => ({ label: b.name, value: b.id }))}
                onValueChange={(val) => updateUrl({ buildingId: val, floorId: undefined, roomId: undefined })}
              />
            </div>
            <div className="space-y-2">
              <Label>Floor</Label>
              <SearchableSelect 
                placeholder="Pilih Floor"
                defaultValue={selectedFloorId}
                disabled={!selectedBuildingId}
                options={floors.map(f => ({ label: `Floor ${f.level}`, value: f.id }))}
                onValueChange={(val) => updateUrl({ floorId: val, roomId: undefined })}
              />
            </div>
            <div className="space-y-2">
              <Label>Room</Label>
              <SearchableSelect 
                placeholder="Pilih Room"
                defaultValue={selectedRoomId}
                disabled={!selectedFloorId}
                options={rooms.map(r => ({ label: r.name, value: r.id }))}
                onValueChange={(val) => updateUrl({ roomId: val })}
              />
            </div>
            <div className="space-y-2">
              <Label>Company (Owner)</Label>
              <SearchableSelect 
                placeholder="Semua Company"
                defaultValue={selectedCompanyId}
                options={companies.map(c => ({ label: c.name, value: c.id }))}
                onValueChange={(val) => updateUrl({ companyId: val })}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Racks Grid */}
      {(selectedRoomId || selectedCompanyId) ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
          {racks.map((rack) => {
            const data = (rack.data ?? {}) as Record<string, any>
            const companyId = data.company_id
            const company = companies.find(c => c.id === companyId)
            const status = data.status || "Available"
            
            const statusColors: Record<string, string> = {
              "Available": "bg-emerald-50 border-emerald-200 hover:bg-emerald-100 text-emerald-700",
              "In Use": "bg-rose-50 border-red-200 hover:bg-rose-100 text-red-700",
              "Maintenance": "bg-amber-50 border-amber-200 hover:bg-amber-100 text-amber-700",
              "Reserved": "bg-blue-50 border-blue-200 hover:bg-blue-100 text-blue-700"
            }

            return (
              <Dialog key={rack.id}>
                <DialogTrigger asChild>
                  <button 
                    className={cn(
                      "flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all text-center h-32 space-y-2",
                      statusColors[status] || "bg-slate-50 border-slate-200"
                    )}
                  >
                    <span className="text-lg font-bold truncate w-full">{data.rack_id || rack.code || rack.id}</span>
                    <span className="text-[10px] uppercase font-semibold opacity-80">{status}</span>
                    {company && (
                      <span className="text-[10px] font-medium line-clamp-2 mt-1 leading-tight">{company.name}</span>
                    )}
                  </button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <div className="flex items-center justify-between pr-8">
                      <DialogTitle>Update Rack: {data.rack_id || rack.code}</DialogTitle>
                      <Button asChild variant="ghost" size="sm" className="gap-2">
                        <Link href={`/admin/docs/master_rack/${rack.id}`}>
                          <ExternalLink className="h-4 w-4" />
                          Detail
                        </Link>
                      </Button>
                    </div>
                  </DialogHeader>
                  <form action={handleAction} className="space-y-4 pt-4">
                    <input type="hidden" name="recordId" value={rack.id} />
                    
                    <div className="space-y-2">
                      <Label>Status</Label>
                      <SearchableSelect 
                        name="status"
                        defaultValue={status}
                        options={[
                          { label: "Available", value: "Available" },
                          { label: "In Use", value: "In Use" },
                          { label: "Maintenance", value: "Maintenance" },
                          { label: "Reserved", value: "Reserved" }
                        ]}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Assign Company</Label>
                      <SearchableSelect 
                        name="companyId"
                        placeholder="(None / Deassign)"
                        defaultValue={companyId || ""}
                        options={companies.map(c => ({ label: c.name, value: c.id }))}
                      />
                    </div>

                    <DialogFooter className="flex justify-between sm:justify-between">
                      <Button 
                        type="button" 
                        variant="destructive" 
                        size="icon"
                        onClick={() => setDeleteConfirmOpen(rack.id)}
                        disabled={isUpdating}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <Button type="submit" disabled={isUpdating}>
                        {isUpdating ? "Updating..." : "Simpan Perubahan"}
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            )
          })}
          
          {/* Delete Confirmation Dialog */}
          <Dialog open={!!deleteConfirmOpen} onOpenChange={(open) => !open && setDeleteConfirmOpen(null)}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Hapus Rack?</DialogTitle>
                <DialogDescription>
                  Tindakan ini tidak dapat dibatalkan. Rack ini akan dihapus permanen dari sistem.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDeleteConfirmOpen(null)} disabled={isUpdating}>
                  Batal
                </Button>
                <Button 
                  variant="destructive" 
                  onClick={() => deleteConfirmOpen && handleDelete(deleteConfirmOpen)}
                  disabled={isUpdating}
                >
                  {isUpdating ? "Menghapus..." : "Ya, Hapus"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {racks.length === 0 && (
            <div className="col-span-full py-12 text-center text-muted-foreground italic bg-slate-50 rounded-xl border border-dashed">
              Tidak ada rack ditemukan di ruangan ini.
            </div>
          )}
        </div>
      ) : (
        <div className="py-24 text-center text-muted-foreground bg-slate-50 rounded-xl border border-dashed">
          Silakan pilih ruangan atau company untuk melihat pemetaan rack.
        </div>
      )}
    </div>
  )
}
