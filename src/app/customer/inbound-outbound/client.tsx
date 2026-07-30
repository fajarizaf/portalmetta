"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Plus, ArrowRight, ArrowDownToLine, ArrowUpFromLine, Package } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface DocType {
  id: string
  key: string
  name: string
  config: any
}

interface DocRecord {
  id: string
  code: string | null
  status: string | null
  createdAt: string
  data: any
}

interface InventoryItem {
  id: string
  createdAt: string
  data: any
  record: {
    code: string | null
    createdAt: string
    data: any
  }
}

interface Props {
  goodsInType: DocType | null
  goodsInDocs: DocRecord[]
  goodsOutType: DocType | null
  goodsOutDocs: DocRecord[]
  goodsInItems: InventoryItem[]
  goodsOutItems: InventoryItem[]
  buildingMap: Record<string, string>
  floorMap: Record<string, string>
  roomMap: Record<string, string>
  customerMap: Record<string, string>
  productMap: Record<string, string>
}

export function InboundOutboundClient({
  goodsInType, goodsInDocs, goodsOutType, goodsOutDocs,
  goodsInItems, goodsOutItems,
  buildingMap, floorMap, roomMap, customerMap, productMap,
}: Props) {
  const [activeTab, setActiveTab] = useState("inbound")

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Inbound & Outbound</h1>
        <p className="text-sm text-slate-500">Manage inbound, outbound item requests, and view current stock.</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6 h-auto p-1 bg-slate-100 rounded-lg">
          <TabsTrigger value="inbound" className="py-2.5 data-[state=active]:bg-white rounded-md transition-all gap-2">
            <ArrowDownToLine className="w-4 h-4" />
            Inbound
          </TabsTrigger>
          <TabsTrigger value="outbound" className="py-2.5 data-[state=active]:bg-white rounded-md transition-all gap-2">
            <ArrowUpFromLine className="w-4 h-4" />
            Outbound
          </TabsTrigger>
          <TabsTrigger value="inventory" className="py-2.5 data-[state=active]:bg-white rounded-md transition-all gap-2">
            <Package className="w-4 h-4" />
            Inventory
          </TabsTrigger>
        </TabsList>

        <TabsContent value="inbound" className="mt-0">
          {goodsInType ? (
            <DocList docType={goodsInType} docs={goodsInDocs} title="Inbound Item Requests" prefix="inbound" />
          ) : (
            <div className="p-4 border rounded bg-slate-50 text-slate-500 text-center">Goods In document type not found.</div>
          )}
        </TabsContent>

        <TabsContent value="outbound" className="mt-0">
          {goodsOutType ? (
            <DocList docType={goodsOutType} docs={goodsOutDocs} title="Outbound Item Requests" prefix="outbound" />
          ) : (
            <div className="p-4 border rounded bg-slate-50 text-slate-500 text-center">Goods Out document type not found.</div>
          )}
        </TabsContent>

        <TabsContent value="inventory" className="mt-0">
          <InventoryView
            inItems={goodsInItems}
            outItems={goodsOutItems}
            buildingMap={buildingMap}
            floorMap={floorMap}
            roomMap={roomMap}
            customerMap={customerMap}
            productMap={productMap}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function DocList({ docType, docs, title, prefix }: { docType: DocType; docs: DocRecord[]; title: string; prefix: string }) {
  const listFields = (docType.config?.listFields as string[]) || ["request_date", "status"]

  return (
    <Card className="border border-slate-200/60">
      <CardHeader className="flex flex-row items-center justify-between px-6 py-4 border-b border-slate-100">
        <CardTitle className="text-base font-semibold text-slate-900">{title}</CardTitle>
        <div className="flex items-center gap-2">
          <Button asChild size="sm" variant="outline" className="h-8 text-xs">
            <Link href={`/customer/docs/${docType.key}`}>
              View All <ArrowRight className="ml-1 w-3 h-3" />
            </Link>
          </Button>
          <Button asChild size="sm" className="h-8 text-xs">
            <Link href={`/customer/docs/${docType.key}/create`}>
              <Plus className="mr-1 w-3 h-3" /> Create New
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50/50">
              <TableHead className="text-[11px] font-semibold text-slate-500 uppercase px-6">Code</TableHead>
              {listFields.map(f => (
                <TableHead key={f} className="text-[11px] font-semibold text-slate-500 uppercase capitalize">{f.replace(/_/g, " ")}</TableHead>
              ))}
              <TableHead className="text-[11px] font-semibold text-slate-500 uppercase w-[100px]">Status</TableHead>
              <TableHead className="text-[11px] font-semibold text-slate-500 uppercase w-[150px]">Date Created</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {docs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={listFields.length + 3} className="h-32 text-center text-muted-foreground">
                  <div className="flex flex-col items-center justify-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                      <Package className="w-5 h-5 text-slate-400" />
                    </div>
                    <p className="text-sm font-medium text-slate-700">Belum ada data request</p>
                    <Button asChild size="sm" variant="outline" className="h-8 text-xs">
                      <Link href={`/customer/docs/${docType.key}/create`}>
                        <Plus className="mr-1 w-3 h-3" /> Buat Request Baru
                      </Link>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              docs.map((doc) => (
                <TableRow key={doc.id} className="hover:bg-slate-50 transition-colors">
                  <TableCell className="font-medium px-6">
                    <Link href={`/customer/docs/${docType.key}/${doc.id}`} className="hover:text-primary transition-colors">
                      {doc.code || "DRAFT"}
                    </Link>
                  </TableCell>
                  {listFields.map(f => (
                    <TableCell key={f} className="text-slate-700">
                      {String((doc.data as any)?.[f] ?? "-")}
                    </TableCell>
                  ))}
                  <TableCell>
                    <Badge variant={String(doc.status || "").toLowerCase().includes("completed") ? "default" : "outline"} className="text-[10px]">
                      {doc.status || "Draft"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-xs">
                    {new Date(doc.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

function InventoryView({
  inItems, outItems,
  buildingMap, floorMap, roomMap, customerMap, productMap,
}: {
  inItems: InventoryItem[]
  outItems: InventoryItem[]
  buildingMap: Record<string, string>
  floorMap: Record<string, string>
  roomMap: Record<string, string>
  customerMap: Record<string, string>
  productMap: Record<string, string>
}) {
  const [stockTab, setStockTab] = useState<"balance" | "in" | "out">("balance")

  const resolveLocation = (d: Record<string, any>) => ({
    buildingName: d.building_id ? (buildingMap[d.building_id] || d.building_id) : "",
    floorName: d.floor_id ? (floorMap[d.floor_id] || d.floor_id) : "",
    roomName: d.room_id ? (roomMap[d.room_id] || d.room_id) : "",
    ownerCustomerName: d.owner_customer_id ? (customerMap[d.owner_customer_id] || d.owner_customer_id) : "",
  })

  const balanceMap = new Map<string, {
    id: string
    productName: string
    itemName: string
    qty: number
    lastUpdate: Date
    serialNumbers: Set<string>
    buildingName: string
    floorName: string
    roomName: string
    ownerCustomerName: string
  }>()

  inItems.forEach(item => {
    const d = item.data || {}
    const productId = d.product_id || ""
    const name = d.item_name || "Unknown Item"
    const qty = Number(d.quantity || 0)
    const sn = d.serial_number
    const loc = resolveLocation(d)
    const key = productId || name.trim().toLowerCase()

    if (!balanceMap.has(key)) {
      balanceMap.set(key, {
        id: key, productName: productId ? (productMap[productId] || name) : "",
        itemName: name, qty: 0, lastUpdate: new Date(0),
        serialNumbers: new Set(),
        buildingName: "", floorName: "", roomName: "", ownerCustomerName: "",
      })
    }

    const entry = balanceMap.get(key)!
    entry.qty += qty
    if (sn) entry.serialNumbers.add(sn)
    if (loc.buildingName) entry.buildingName = loc.buildingName
    if (loc.floorName) entry.floorName = loc.floorName
    if (loc.roomName) entry.roomName = loc.roomName
    if (loc.ownerCustomerName) entry.ownerCustomerName = loc.ownerCustomerName
    const date = new Date(item.record.createdAt)
    if (date > entry.lastUpdate) entry.lastUpdate = date
  })

  outItems.forEach(item => {
    const d = item.data || {}
    const productId = d.product_id || ""
    const name = d.item_name || "Unknown Item"
    const qty = Number(d.quantity || 0)
    const sn = d.serial_number
    const key = productId || name.trim().toLowerCase()

    if (balanceMap.has(key)) {
      const entry = balanceMap.get(key)!
      entry.qty -= qty
      if (sn) entry.serialNumbers.delete(sn)
      const date = new Date(item.record.createdAt)
      if (date > entry.lastUpdate) entry.lastUpdate = date
    } else {
      const loc = resolveLocation(d)
      balanceMap.set(key, {
        id: key, productName: productId ? (productMap[productId] || name) : "",
        itemName: name, qty: -qty, lastUpdate: new Date(item.record.createdAt),
        serialNumbers: new Set(),
        buildingName: loc.buildingName, floorName: loc.floorName,
        roomName: loc.roomName, ownerCustomerName: loc.ownerCustomerName,
      })
    }
  })

  const balanceItems = Array.from(balanceMap.values()).filter(i => i.qty !== 0)

  const formatDate = (date: string | Date) => {
    if (!date) return "-"
    return new Date(date).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })
  }

  const stockTabs = [
    { key: "balance" as const, label: "Stock (Balance)" },
    { key: "in" as const, label: "Inbound History" },
    { key: "out" as const, label: "Outbound History" },
  ]

  const renderInventoryTable = () => {
    if (stockTab === "balance") {
      return (
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50/50">
              <TableHead className="text-[11px] font-semibold text-slate-500 uppercase">Item</TableHead>
              <TableHead className="text-[11px] font-semibold text-slate-500 uppercase">Location</TableHead>
              <TableHead className="text-[11px] font-semibold text-slate-500 uppercase">Customer</TableHead>
              <TableHead className="text-[11px] font-semibold text-slate-500 uppercase text-right">Stock</TableHead>
              <TableHead className="text-[11px] font-semibold text-slate-500 uppercase">Serial Numbers</TableHead>
              <TableHead className="text-[11px] font-semibold text-slate-500 uppercase">Last Update</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {balanceItems.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-32 text-center">
                  <div className="flex flex-col items-center justify-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                      <Package className="w-5 h-5 text-slate-400" />
                    </div>
                    <p className="text-sm font-medium text-slate-700">Belum ada stok</p>
                    <p className="text-xs text-slate-500">Belum ada barang yang tercatat di inventory.</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              balanceItems.map((item) => (
                <TableRow key={item.id} className="hover:bg-slate-50 transition-colors">
                  <TableCell>
                    <span className="text-sm font-medium text-slate-900">{item.productName || item.itemName}</span>
                  </TableCell>
                  <TableCell className="text-sm text-slate-700">
                    {[item.buildingName, item.floorName, item.roomName].filter(Boolean).join(" / ") || "-"}
                  </TableCell>
                  <TableCell className="text-sm text-slate-700">{item.ownerCustomerName || "-"}</TableCell>
                  <TableCell className="text-right">
                    <span className={cn(
                      "text-sm font-bold",
                      item.qty > 0 ? "text-emerald-600" : "text-red-600"
                    )}>
                      {item.qty}
                    </span>
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate text-sm text-slate-600" title={Array.from(item.serialNumbers).join(", ")}>
                    {item.serialNumbers.size > 0 ? Array.from(item.serialNumbers).join(", ") : "-"}
                  </TableCell>
                  <TableCell className="text-xs text-slate-400">{formatDate(item.lastUpdate)}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      )
    }

    const items = stockTab === "in" ? inItems : outItems
    return (
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-50/50">
            <TableHead className="text-[11px] font-semibold text-slate-500 uppercase">Date</TableHead>
            <TableHead className="text-[11px] font-semibold text-slate-500 uppercase">Document</TableHead>
            <TableHead className="text-[11px] font-semibold text-slate-500 uppercase">Item</TableHead>
            <TableHead className="text-[11px] font-semibold text-slate-500 uppercase text-right">Qty</TableHead>
            <TableHead className="text-[11px] font-semibold text-slate-500 uppercase">Location</TableHead>
            <TableHead className="text-[11px] font-semibold text-slate-500 uppercase">Customer</TableHead>
            <TableHead className="text-[11px] font-semibold text-slate-500 uppercase">Serial Number</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="h-32 text-center">
                <div className="flex flex-col items-center justify-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                    <Package className="w-5 h-5 text-slate-400" />
                  </div>
                  <p className="text-sm font-medium text-slate-700">Belum ada data</p>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            items.map((item) => {
              const d = item.data || {}
              const parentData = item.record.data || {}
              const dateStr = parentData.request_date || item.record.createdAt
              const loc = [d.building_id ? (buildingMap[d.building_id] || d.building_id) : "",
                d.floor_id ? (floorMap[d.floor_id] || d.floor_id) : "",
                d.room_id ? (roomMap[d.room_id] || d.room_id) : ""].filter(Boolean).join(" / ")

              return (
                <TableRow key={item.id} className="hover:bg-slate-50 transition-colors">
                  <TableCell className="whitespace-nowrap text-sm text-slate-700">{formatDate(dateStr)}</TableCell>
                  <TableCell className="text-sm font-medium text-slate-900">{item.record.code || "-"}</TableCell>
                  <TableCell className="text-sm text-slate-700">
                    {d.product_id ? (productMap[d.product_id] || d.product_id) : (d.item_name || "-")}
                  </TableCell>
                  <TableCell className="text-right text-sm font-semibold text-slate-900">{d.quantity || 0}</TableCell>
                  <TableCell className="text-sm text-slate-600">{loc || "-"}</TableCell>
                  <TableCell className="text-sm text-slate-600">
                    {d.owner_customer_id ? (customerMap[d.owner_customer_id] || d.owner_customer_id) : "-"}
                  </TableCell>
                  <TableCell className="text-sm text-slate-600">{d.serial_number || "-"}</TableCell>
                </TableRow>
              )
            })
          )}
        </TableBody>
      </Table>
    )
  }

  return (
    <Card className="border border-slate-200/60">
      <CardHeader className="px-6 py-4 border-b border-slate-100">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <CardTitle className="text-base font-semibold text-slate-900 flex items-center gap-2">
            <Package className="w-4 h-4 text-slate-500" />
            Current Stock
            {balanceItems.length > 0 && (
              <span className="text-xs font-normal text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                {balanceItems.length} items
              </span>
            )}
          </CardTitle>
          <div className="flex space-x-1 rounded-lg bg-slate-100 p-0.5 w-fit">
            {stockTabs.map((t) => (
              <button
                key={t.key}
                onClick={() => setStockTab(t.key)}
                className={cn(
                  "px-3 py-1.5 text-xs font-medium rounded-md transition-all",
                  stockTab === t.key ? "bg-white shadow text-slate-900" : "text-slate-500 hover:text-slate-900"
                )}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0 overflow-x-auto">
        {renderInventoryTable()}
      </CardContent>
    </Card>
  )
}
