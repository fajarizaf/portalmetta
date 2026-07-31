"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SearchableSelect } from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Package, Building2, MapPin, Users, ArrowUpDown } from "lucide-react"

interface InventoryRow {
  id: string
  createdAt: Date
  data: any
  record: { code: string | null; createdAt: Date; data: any }
}

interface LocationEntry {
  id: string
  name: string
  branchId?: string
  buildingId?: string
  floorId?: string
}

interface BalanceEntry {
  key: string
  typeOfMaterial: string
  qty: number
  buildingId: string
  buildingName: string
  floorId: string
  floorName: string
  roomId: string
  roomName: string
  customerId: string
  customerName: string
  serialNumbers: Set<string>
  lastUpdate: Date
}

interface InventoryManagementClientProps {
  inItems: InventoryRow[]
  outItems: InventoryRow[]
  branches: { id: string; name: string }[]
  buildings: LocationEntry[]
  floors: LocationEntry[]
  rooms: LocationEntry[]
  customers: { id: string; name: string }[]
  buildingMap: Record<string, string>
  floorMap: Record<string, string>
  roomMap: Record<string, string>
  customerMap: Record<string, string>
  selectedBranchId: string
}

export function InventoryManagementClient({
  inItems,
  outItems,
  branches,
  buildings,
  floors,
  rooms,
  customers,
  buildingMap,
  floorMap,
  roomMap,
  customerMap,
  selectedBranchId: initialBranchId,
}: InventoryManagementClientProps) {
  const [filterBranch, setFilterBranch] = useState(initialBranchId)
  const [filterBuilding, setFilterBuilding] = useState("")
  const [filterFloor, setFilterFloor] = useState("")
  const [filterRoom, setFilterRoom] = useState("")
  const [filterCustomer, setFilterCustomer] = useState("")
  const [sortField, setSortField] = useState<"building" | "floor" | "room" | "material" | "qty" | "customer">("building")

  const filteredBuildings = useMemo(() =>
    filterBranch ? buildings.filter(b => b.branchId === filterBranch) : buildings,
    [buildings, filterBranch]
  )

  const filteredFloors = useMemo(() =>
    filterBuilding ? floors.filter(f => f.buildingId === filterBuilding) : (filterBranch ? floors.filter(f => filteredBuildings.some(b => b.id === f.buildingId)) : floors),
    [floors, filterBuilding, filterBranch, filteredBuildings]
  )

  const filteredRooms = useMemo(() =>
    filterFloor ? rooms.filter(r => r.floorId === filterFloor) : (filterBuilding ? rooms.filter(r => filteredFloors.some(f => f.id === r.floorId)) : rooms),
    [rooms, filterFloor, filterBuilding, filteredFloors]
  )

  const buildingFilterOpts = useMemo(() =>
    filteredBuildings.map(b => ({ label: b.name, value: b.id })),
    [filteredBuildings]
  )

  const floorFilterOpts = useMemo(() =>
    filteredFloors.map(f => ({ label: f.name, value: f.id })),
    [filteredFloors]
  )

  const roomFilterOpts = useMemo(() =>
    filteredRooms.map(r => ({ label: r.name, value: r.id })),
    [filteredRooms]
  )

  const branchFilterOpts = useMemo(() =>
    branches.map(b => ({ label: b.name, value: b.id })),
    [branches]
  )

  const balanceItems = useMemo(() => {
    const map = new Map<string, BalanceEntry>()

    const addItem = (d: Record<string, any>, sign: number, rec?: any) => {
      const typeOfMaterial = d.type_of_material || ""
      const buildingId = d.building_id || ""
      const floorId = d.floor_id || ""
      const roomId = d.room_id || ""
      const rawCustomer = d.owner_customer_id || rec?.createdBy?.company?.id || rec?.createdBy?.company?.name || ""
      const customerName = customerMap[rawCustomer] || (rawCustomer ? String(rawCustomer) : "") || rec?.createdBy?.company?.name || "-"
      const customerId = rawCustomer || customerName
      const key = `${typeOfMaterial}|${buildingId}|${floorId}|${roomId}|${customerId}`

      if (!map.has(key)) {
        map.set(key, {
          key,
          typeOfMaterial,
          qty: 0,
          buildingId,
          buildingName: buildingMap[buildingId] || "-",
          floorId,
          floorName: floorMap[floorId] || "-",
          roomId,
          roomName: roomMap[roomId] || "-",
          customerId,
          customerName,
          serialNumbers: new Set(),
          lastUpdate: new Date(0),
        })
      }

      const entry = map.get(key)!
      const qty = Number(d.quantity || 0)
      entry.qty += qty * sign
      if (d.serial_number) {
        if (sign > 0) entry.serialNumbers.add(d.serial_number)
        else entry.serialNumbers.delete(d.serial_number)
      }
      return key
    }

    inItems.forEach(item => {
      const d = item.data || {}
      const itemKey = addItem(d, 1, item.record)
      const date = new Date(item.record?.createdAt || 0)
      const entry = map.get(itemKey)
      if (entry && date > entry.lastUpdate) entry.lastUpdate = date
    })

    outItems.forEach(item => {
      const d = item.data || {}
      const itemKey = addItem(d, -1, item.record)
      const date = new Date(item.record?.createdAt || 0)
      const entry = map.get(itemKey)
      if (entry && date > entry.lastUpdate) entry.lastUpdate = date
    })

    let items = Array.from(map.values())

    if (filterBuilding) items = items.filter(i => i.buildingId === filterBuilding)
    if (filterFloor) items = items.filter(i => i.floorId === filterFloor)
    if (filterRoom) items = items.filter(i => i.roomId === filterRoom)
    if (filterCustomer) items = items.filter(i => i.customerId === filterCustomer)

    items.sort((a, b) => {
      const cmp = (x: string, y: string) => x.localeCompare(y)
      switch (sortField) {
        case "building": return cmp(a.buildingName, b.buildingName) || cmp(a.floorName, b.floorName) || cmp(a.roomName, b.roomName)
        case "floor": return cmp(a.floorName, b.floorName) || cmp(a.roomName, b.roomName)
        case "room": return cmp(a.roomName, b.roomName)
        case "material": return cmp(a.typeOfMaterial, b.typeOfMaterial)
        case "qty": return b.qty - a.qty
        case "customer": return cmp(a.customerName, b.customerName)
        default: return 0
      }
    })

    return items
  }, [inItems, outItems, filterBuilding, filterFloor, filterRoom, filterCustomer, sortField, buildingMap, floorMap, roomMap, customerMap])

  const customerFilterOpts = useMemo(() => {
    const optsMap = new Map<string, string>()
    customers.forEach(c => optsMap.set(c.id, c.name))
    balanceItems.forEach(i => {
      if (i.customerId && i.customerName && i.customerName !== "-") {
        optsMap.set(i.customerId, i.customerName)
      }
    })
    return Array.from(optsMap.entries()).map(([value, label]) => ({ label, value }))
  }, [customers, balanceItems])

  const totalItems = balanceItems.reduce((sum, i) => sum + Math.abs(i.qty), 0)
  const totalRooms = new Set(balanceItems.filter(i => i.qty > 0).map(i => i.roomId)).size
  const totalCustomers = new Set(balanceItems.filter(i => i.qty > 0).map(i => i.customerId)).size

  const formatDate = (date: Date) => {
    if (!date || date.getTime() === 0) return "-"
    return date.toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })
  }

  const SortButton = ({ field, label }: { field: typeof sortField; label: string }) => (
    <button
      onClick={() => setSortField(field)}
      className="flex items-center gap-1 hover:text-primary transition-colors"
    >
      {label}
      <ArrowUpDown className={`size-3 ${sortField === field ? "text-primary" : "text-muted-foreground"}`} />
    </button>
  )

  return (
    <div className="space-y-6">
    
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Package className="size-8 text-primary" />
              <div>
                <div className="text-2xl font-bold">{totalItems}</div>
                <div className="text-xs text-muted-foreground">Total Stock Items</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <MapPin className="size-8 text-primary" />
              <div>
                <div className="text-2xl font-bold">{totalRooms}</div>
                <div className="text-xs text-muted-foreground">Active Rooms</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Users className="size-8 text-primary" />
              <div>
                <div className="text-2xl font-bold">{totalCustomers}</div>
                <div className="text-xs text-muted-foreground">Customers with Stock</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground">Branch</label>
              <SearchableSelect
                name="filter_branch"
                options={branchFilterOpts}
                value={filterBranch}
                onValueChange={(v) => { setFilterBranch(v); setFilterBuilding(""); setFilterFloor(""); setFilterRoom("") }}
                placeholder="All Branches"
                allowEmpty
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground">Building</label>
              <SearchableSelect
                name="filter_building"
                options={buildingFilterOpts}
                value={filterBuilding}
                onValueChange={(v) => { setFilterBuilding(v); setFilterFloor(""); setFilterRoom("") }}
                placeholder="All Buildings"
                allowEmpty
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground">Floor</label>
              <SearchableSelect
                name="filter_floor"
                options={floorFilterOpts}
                value={filterFloor}
                onValueChange={(v) => { setFilterFloor(v); setFilterRoom("") }}
                placeholder="All Floors"
                allowEmpty
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground">Room</label>
              <SearchableSelect
                name="filter_room"
                options={roomFilterOpts}
                value={filterRoom}
                onValueChange={setFilterRoom}
                placeholder="All Rooms"
                allowEmpty
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground">Customer</label>
              <SearchableSelect
                name="filter_customer"
                options={customerFilterOpts}
                value={filterCustomer}
                onValueChange={setFilterCustomer}
                placeholder="All Customers"
                allowEmpty
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            Inventory by Location ({balanceItems.length} entries)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead><SortButton field="building" label="Building" /></TableHead>
                  <TableHead><SortButton field="floor" label="Floor" /></TableHead>
                  <TableHead><SortButton field="room" label="Room" /></TableHead>
                  <TableHead><SortButton field="material" label="Material" /></TableHead>
                  <TableHead><SortButton field="qty" label="Qty" /></TableHead>
                  <TableHead><SortButton field="customer" label="Customer" /></TableHead>
                  <TableHead>Serial Numbers</TableHead>
                  <TableHead>Last Movement</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {balanceItems.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                      No inventory items found.
                    </TableCell>
                  </TableRow>
                ) : (
                  balanceItems.map((item) => (
                    <TableRow key={item.key}>
                      <TableCell className="font-medium">{item.buildingName}</TableCell>
                      <TableCell>{item.floorName}</TableCell>
                      <TableCell>{item.roomName}</TableCell>
                      <TableCell>{item.typeOfMaterial}</TableCell>
                      <TableCell>
                        <Badge variant={item.qty > 0 ? "default" : item.qty < 0 ? "destructive" : "secondary"}>
                          {item.qty}
                        </Badge>
                      </TableCell>
                      <TableCell>{item.customerName}</TableCell>
                      <TableCell className="max-w-[200px] truncate" title={Array.from(item.serialNumbers).join(", ")}>
                        {item.serialNumbers.size > 0 ? Array.from(item.serialNumbers).join(", ") : "-"}
                      </TableCell>
                      <TableCell className="whitespace-nowrap">{formatDate(item.lastUpdate)}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
