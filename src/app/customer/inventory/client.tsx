"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface InventoryItem {
  id: string
  createdAt: Date
  data: any
  record: {
    code: string | null
    createdAt: Date
    data: any
  }
}

interface InventoryClientProps {
  inItems: InventoryItem[]
  outItems: InventoryItem[]
  buildingMap?: Record<string, string>
  floorMap?: Record<string, string>
  roomMap?: Record<string, string>
  customerMap?: Record<string, string>
  productMap?: Record<string, string>
}

export function InventoryClient({
  inItems,
  outItems,
  buildingMap = {},
  floorMap = {},
  roomMap = {},
  customerMap = {},
  productMap = {},
}: InventoryClientProps) {
  const [tab, setTab] = useState<"in" | "out" | "balance">("balance")

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

  const resolveLocation = (d: Record<string, any>) => ({
    buildingId: d.building_id || "",
    buildingName: d.building_id ? (buildingMap[d.building_id] || d.building_id) : "",
    floorId: d.floor_id || "",
    floorName: d.floor_id ? (floorMap[d.floor_id] || d.floor_id) : "",
    roomId: d.room_id || "",
    roomName: d.room_id ? (roomMap[d.room_id] || d.room_id) : "",
    ownerCustomerId: d.owner_customer_id || "",
    ownerCustomerName: d.owner_customer_id ? (customerMap[d.owner_customer_id] || d.owner_customer_id) : "",
  })

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
        id: key,
        productName: productId ? name : "",
        itemName: name,
        qty: 0,
        lastUpdate: new Date(0),
        serialNumbers: new Set(),
        buildingName: "",
        floorName: "",
        roomName: "",
        ownerCustomerName: "",
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
        id: key,
        productName: productId ? name : "",
        itemName: name,
        qty: -qty,
        lastUpdate: new Date(item.record.createdAt),
        serialNumbers: new Set(),
        buildingName: loc.buildingName,
        floorName: loc.floorName,
        roomName: loc.roomName,
        ownerCustomerName: loc.ownerCustomerName,
      })
    }
  })

  const balanceItems = Array.from(balanceMap.values()).filter(i => i.qty !== 0)

  const formatDate = (date: string | Date) => {
    if (!date) return "-"
    return new Date(date).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
  }

  const renderContent = () => {
    if (tab === "balance") {
      return (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product / Item</TableHead>
              <TableHead>Building</TableHead>
              <TableHead>Floor</TableHead>
              <TableHead>Room</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Current Stock</TableHead>
              <TableHead>Serial Numbers</TableHead>
              <TableHead>Last Update</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {balanceItems.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                  No stock items.
                </TableCell>
              </TableRow>
            ) : (
              balanceItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.productName || item.itemName}</TableCell>
                  <TableCell>{item.buildingName || "-"}</TableCell>
                  <TableCell>{item.floorName || "-"}</TableCell>
                  <TableCell>{item.roomName || "-"}</TableCell>
                  <TableCell>{item.ownerCustomerName || "-"}</TableCell>
                  <TableCell>{item.qty}</TableCell>
                  <TableCell className="max-w-[200px] truncate" title={Array.from(item.serialNumbers).join(", ")}>
                    {item.serialNumbers.size > 0 ? Array.from(item.serialNumbers).join(", ") : "-"}
                  </TableCell>
                  <TableCell>{formatDate(item.lastUpdate)}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      )
    }

    const items = tab === "in" ? inItems : outItems
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Document No.</TableHead>
            <TableHead>Product / Item</TableHead>
            <TableHead>Qty</TableHead>
            <TableHead>Building</TableHead>
            <TableHead>Floor</TableHead>
            <TableHead>Room</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Serial Number</TableHead>
            <TableHead>Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.length === 0 ? (
            <TableRow>
              <TableCell colSpan={10} className="text-center py-8 text-muted-foreground">
                No item data.
              </TableCell>
            </TableRow>
          ) : (
            items.map((item) => {
              const itemData = item.data || {}
              const parentData = item.record.data || {}
              const dateStr = parentData.request_date || item.record.createdAt

              return (
                <TableRow key={item.id}>
                  <TableCell className="whitespace-nowrap">
                    {formatDate(dateStr)}
                  </TableCell>
                  <TableCell className="font-medium">
                    {item.record.code || "-"}
                  </TableCell>
                  <TableCell>{itemData.product_id ? (productMap[itemData.product_id] || itemData.product_id) : (itemData.item_name || "-")}</TableCell>
                  <TableCell>{itemData.quantity || 0}</TableCell>
                  <TableCell>{itemData.building_id ? (buildingMap[itemData.building_id] || itemData.building_id) : "-"}</TableCell>
                  <TableCell>{itemData.floor_id ? (floorMap[itemData.floor_id] || itemData.floor_id) : "-"}</TableCell>
                  <TableCell>{itemData.room_id ? (roomMap[itemData.room_id] || itemData.room_id) : "-"}</TableCell>
                  <TableCell>{itemData.owner_customer_id ? (customerMap[itemData.owner_customer_id] || itemData.owner_customer_id) : "-"}</TableCell>
                  <TableCell>{itemData.serial_number || "-"}</TableCell>
                  <TableCell className="max-w-[200px] truncate" title={itemData.description}>
                    {itemData.description || "-"}
                  </TableCell>
                </TableRow>
              )
            })
          )}
        </TableBody>
      </Table>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold">Inventory</h1>
        <p className="text-sm text-muted-foreground">
          List of current stock as well as inbound and outbound item history.
        </p>
      </div>

      <div className="flex space-x-1 rounded-lg bg-slate-100 p-1 w-fit">
        <button
          onClick={() => setTab("balance")}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
            tab === "balance"
              ? "bg-white shadow text-slate-900"
              : "text-slate-500 hover:text-slate-900"
          }`}
        >
          Stock (Balance)
        </button>
        <button
          onClick={() => setTab("in")}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
            tab === "in"
              ? "bg-white shadow text-slate-900"
              : "text-slate-500 hover:text-slate-900"
          }`}
        >
          Inbound History (In)
        </button>
        <button
          onClick={() => setTab("out")}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
            tab === "out"
              ? "bg-white shadow text-slate-900"
              : "text-slate-500 hover:text-slate-900"
          }`}
        >
          Outbound History (Out)
        </button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            {tab === "balance" ? "Current Stock Items" : tab === "in" ? "Inbound Item History" : "Outbound Item History"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {renderContent()}
        </CardContent>
      </Card>
    </div>
  )
}
