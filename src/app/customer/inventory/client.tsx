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
}

export function InventoryClient({ inItems, outItems }: InventoryClientProps) {
  const [tab, setTab] = useState<"in" | "out" | "balance">("balance")
  
  // Group and calculate balance
  const balanceMap = new Map<string, { 
    id: string, 
    itemName: string, 
    qty: number, 
    lastUpdate: Date,
    serialNumbers: Set<string> 
  }>()

  // Process Goods In
  inItems.forEach(item => {
    const d = item.data || {}
    const name = d.item_name || "Unknown Item"
    const qty = Number(d.quantity || 0)
    const sn = d.serial_number
    
    // Key could be product_id if available, or just name
    const key = name.trim().toLowerCase()
    
    if (!balanceMap.has(key)) {
      balanceMap.set(key, { 
        id: key, 
        itemName: name, 
        qty: 0, 
        lastUpdate: new Date(0),
        serialNumbers: new Set()
      })
    }
    
    const entry = balanceMap.get(key)!
    entry.qty += qty
    if (sn) entry.serialNumbers.add(sn)
    
    const date = new Date(item.record.createdAt)
    if (date > entry.lastUpdate) entry.lastUpdate = date
  })

  // Process Goods Out
  outItems.forEach(item => {
    const d = item.data || {}
    const name = d.item_name || "Unknown Item"
    const qty = Number(d.quantity || 0)
    const sn = d.serial_number
    
    const key = name.trim().toLowerCase()
    
    if (balanceMap.has(key)) {
      const entry = balanceMap.get(key)!
      entry.qty -= qty
      if (sn) entry.serialNumbers.delete(sn)
      
      const date = new Date(item.record.createdAt)
      if (date > entry.lastUpdate) entry.lastUpdate = date
    }
    // If we have goods out for item not in goods in, we might show negative or handle it. 
    // Assuming goods out only happens for existing goods in, but let's be safe.
    else {
      balanceMap.set(key, { 
        id: key, 
        itemName: name, 
        qty: -qty, 
        lastUpdate: new Date(item.record.createdAt),
        serialNumbers: new Set()
      })
    }
  })

  const balanceItems = Array.from(balanceMap.values()).filter(i => i.qty !== 0) // Hide zero qty items if preferred

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
              <TableHead>Item Name</TableHead>
              <TableHead>Current Stock</TableHead>
              <TableHead>Serial Numbers</TableHead>
              <TableHead>Last Update</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {balanceItems.length === 0 ? (
               <TableRow>
                 <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                   No stock items.
                 </TableCell>
               </TableRow>
            ) : (
              balanceItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.itemName}</TableCell>
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
            <TableHead>Item Name</TableHead>
            <TableHead>Qty</TableHead>
            <TableHead>Serial Number</TableHead>
            <TableHead>Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
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
                  <TableCell>{itemData.item_name || "-"}</TableCell>
                  <TableCell>{itemData.quantity || 0}</TableCell>
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
