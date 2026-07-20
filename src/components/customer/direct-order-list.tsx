"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { GroupParamSync } from "@/components/group-param-sync"
import { CustomerProductSpecs, SpecField } from "@/components/customer-product-specs"
import { submitMultiDirectOrder, submitRequestOrder } from "@/app/customer/order/actions"

// Minimal types to avoid circular deps or complex Prisma types
type Product = {
  id: string
  name: string
  classification?: string | null
  group?: { name: string } | null
  orderMode?: string | null
  prices: Array<{ id: string; currency: string; pricingModel: string; basePrice: number | null; setupFee: number | null }>
  specs: unknown[]
}

type SpecOption = { label: string; value: string }

interface DirectOrderListProps {
  displayGroupName: string
  immediateSubs: Array<{ id: string; name: string }>
  subs: Array<{ id: string; name: string; items: Product[] }>
  specDynamicOptions: Record<string, Record<string, SpecOption[]>>
  branchId?: string
}

export function DirectOrderList({
  displayGroupName,
  immediateSubs,
  subs,
  specDynamicOptions,
  branchId
}: DirectOrderListProps) {
  // State for selected DIRECT products
  const [selectedIds, setSelectedIds] = React.useState<Set<string>>(new Set())
  const [quantities, setQuantities] = React.useState<Record<string, number>>({})
  const [selectedPrices, setSelectedPrices] = React.useState<Record<string, string>>({})

  const toggleSelection = (productId: string, checked: boolean) => {
    const next = new Set(selectedIds)
    if (checked) next.add(productId)
    else next.delete(productId)
    setSelectedIds(next)
  }

  const handleQuantityChange = (productId: string, val: string) => {
    const n = parseInt(val)
    if (!isNaN(n) && n > 0) {
      setQuantities(prev => ({ ...prev, [productId]: n }))
    }
  }

  const handlePriceChange = (productId: string, val: string) => {
    setSelectedPrices(prev => ({ ...prev, [productId]: val }))
  }

  const showGlobalContractFields = React.useMemo(() => {
    for (const sub of subs) {
      for (const p of sub.items) {
        if (selectedIds.has(p.id)) {
          const priceId = selectedPrices[p.id] || p.prices[0]?.id
          const price = p.prices.find(pr => pr.id === priceId)
          if (price && price.basePrice && price.basePrice > 0) return true
        }
      }
    }
    return false
   }, [selectedIds, selectedPrices, subs])

   const selectedCount = selectedIds.size

   return (
     <div className="space-y-6 pb-24">
      <GroupParamSync />
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Product Order</h1>
        <Link href="/customer/order">
          <Button variant="outline" size="sm" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Categories
          </Button>
        </Link>
      </div>
      
      <div className="text-base font-semibold">Category: {displayGroupName}</div>

      {immediateSubs.length > 0 ? (
        <div className="space-y-4">
          <div className="text-sm text-muted-foreground">Select subcategory</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {immediateSubs.map((sg) => (
              <Link key={sg.id} href={`/customer/order/${sg.id}`} className="border rounded p-4 hover:bg-accent">
                <div className="text-base font-medium">{sg.name}</div>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <>
          {/* Main Form for DIRECT orders */}
          <form id="multi-order-form" action={submitMultiDirectOrder}></form>

          {subs.length === 0 && (
            <p className="text-sm text-muted-foreground">Products for this category are not available.</p>
          )}

          {subs.map((sub) => (
            <div key={sub.id} className="space-y-3">
              <div className="text-sm font-medium">{sub.name}</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sub.items.map((p) => {
                  const isDirect = !p.orderMode || p.orderMode === "DIRECT"
                  
                  if (!isDirect) {
                    // Render standard REQUEST card (standalone form)
                    return (
                      <div key={p.id} className="border rounded p-4 space-y-4 bg-white shadow-sm">
                         <div className="space-y-1">
                            <div className="text-lg font-medium">{p.name}</div>
                            <div className="text-xs text-muted-foreground">{p.group?.name ?? "-"} • {p.classification}</div>
                         </div>
                         <form action={submitRequestOrder} className="space-y-4">
                            <input type="hidden" name="productId" value={p.id} />
                            <div className="space-y-2">
                                <Label>Price</Label>
                                <select name="priceId" className="border-input text-sm rounded-md border bg-transparent px-3 py-2 shadow-xs outline-none focus-visible:ring-[3px] focus-visible:border-ring w-full">
                                {p.prices.map((pr) => (
                                    <option key={pr.id} value={pr.id}>{pr.currency} • {pr.pricingModel} • MRC {pr.basePrice} • NRC {pr.setupFee}</option>
                                ))}
                                </select>
                            </div>
                            <div className="space-y-2">
                                <Label>Specifications</Label>
                                <CustomerProductSpecs 
                                  specs={p.specs as unknown as SpecField[]} 
                                  dynamicOptions={specDynamicOptions[p.id]} 
                                  branchId={branchId}
                                />
                            </div>
                            <div>
                                <Button type="submit">Submit Request</Button>
                            </div>
                         </form>
                      </div>
                    )
                  }

                  // Render DIRECT card (linked to multi-order-form)
                  const isSelected = selectedIds.has(p.id)
                  const priceId = selectedPrices[p.id] || p.prices[0]?.id
                  
                  return (
                    <div key={p.id} className={`border rounded p-4 space-y-4 bg-white shadow-sm transition-colors ${isSelected ? "border-primary bg-primary/5" : ""}`}>
                        <div className="flex items-start gap-3">
                            <Checkbox 
                                id={`select-${p.id}`}
                                checked={isSelected}
                                onCheckedChange={(c) => toggleSelection(p.id, !!c)}
                                className="mt-1"
                            />
                            <div className="space-y-1 flex-1">
                                <Label htmlFor={`select-${p.id}`} className="text-lg font-medium cursor-pointer">{p.name}</Label>
                                <div className="text-xs text-muted-foreground">{p.group?.name ?? "-"} • {p.classification}</div>
                            </div>
                        </div>

                        {isSelected && (
                            <div className="pl-7 space-y-4 border-l-2 border-primary/20 ml-2">
                                {/* Hidden Inputs linked to form */}
                                <input form="multi-order-form" type="hidden" name={`items[${p.id}].productId`} value={p.id} />
                                
                                <div className="space-y-2">
                                    <Label>Quantity</Label>
                                    <Input 
                                        form="multi-order-form"
                                        name={`items[${p.id}].qty`}
                                        type="number" 
                                        min={1} 
                                        value={quantities[p.id] ?? 1} 
                                        onChange={(e) => handleQuantityChange(p.id, e.target.value)}
                                        className="w-full"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>Price</Label>
                                    <select 
                                        form="multi-order-form" 
                                        name={`items[${p.id}].priceId`} 
                                        className="border-input text-sm rounded-md border bg-transparent px-3 py-2 shadow-xs outline-none focus-visible:ring-[3px] focus-visible:border-ring w-full"
                                        value={priceId}
                                        onChange={(e) => handlePriceChange(p.id, e.target.value)}
                                    >
                                    {p.prices.map((pr) => (
                                        <option key={pr.id} value={pr.id}>{pr.currency} • {pr.pricingModel} • MRC {pr.basePrice} • NRC {pr.setupFee}</option>
                                    ))}
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <Label>Specifications</Label>
                                    <CustomerProductSpecs 
                                        specs={p.specs as unknown as SpecField[]} 
                                        dynamicOptions={specDynamicOptions[p.id]}
                                        namePrefix={`items[${p.id}].`}
                                        formId="multi-order-form"
                                        branchId={branchId}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}

          {/* Checkout Bar */}
          {selectedCount > 0 && (
             <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2 animate-in fade-in slide-in-from-bottom-4">
                 {showGlobalContractFields && (
                     <div className="bg-white p-4 rounded-lg shadow-xl border w-full max-w-sm space-y-3 mb-2">
                        <h3 className="font-semibold text-sm">Contract Details</h3>
                        <div className="space-y-2">
                            <Label className="text-xs">Commencement Date</Label>
                            <Input 
                                form="multi-order-form" 
                                name="commencement_date" 
                                type="date" 
                                required 
                                className="h-8"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-xs">Term Of Payment</Label>
                            <Input 
                                form="multi-order-form" 
                                name="term_of_payment" 
                                defaultValue="Monthly" 
                                required 
                                className="h-8"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-xs">Term Of Contract (Months)</Label>
                            <Input 
                                form="multi-order-form" 
                                name="term_of_contract" 
                                type="number" 
                                min={1} 
                                defaultValue={12} 
                                required 
                                className="h-8"
                            />
                        </div>
                     </div>
                 )}
                 <div className="bg-primary text-white px-6 py-4 rounded-full shadow-2xl flex items-center gap-6">
                    <div className="text-sm font-medium">{selectedCount} Product{selectedCount > 1 ? "s" : ""} selected</div>
                    <Button form="multi-order-form" className="bg-white text-primary hover:bg-slate-100 border-none font-bold">
                       Order Now
                    </Button>
                 </div>
             </div>
          )}
        </>
      )}
    </div>
   )
}
