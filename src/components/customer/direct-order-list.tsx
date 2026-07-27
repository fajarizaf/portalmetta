"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowLeft, ShoppingCart, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { GroupParamSync } from "@/components/group-param-sync"
import { CustomerProductSpecs, SpecField } from "@/components/customer-product-specs"
import { submitMultiDirectOrder, submitRequestOrder } from "@/app/customer/order/actions"

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
    <div className="space-y-6 pb-32">
      <GroupParamSync />
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Product Order</h1>
          <p className="text-sm text-slate-500 mt-1">Browse and select services to request.</p>
        </div>
        <Link href="/customer/order">
          <Button variant="outline" size="sm" className="gap-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50">
            <ArrowLeft className="w-4 h-4" />
            Back to Categories
          </Button>
        </Link>
      </div>
      
      <div className="flex items-center gap-2">
        <span className="text-sm text-slate-500">Category:</span>
        <span className="text-sm font-semibold text-slate-900 bg-slate-100 px-2.5 py-0.5 rounded-md">{displayGroupName}</span>
      </div>

      {immediateSubs.length > 0 ? (
        <div className="space-y-4">
          <div className="text-sm font-medium text-slate-700">Select subcategory</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {immediateSubs.map((sg) => (
              <Link key={sg.id} href={`/customer/order/${sg.id}`} className="group flex items-center gap-3 border border-slate-200 rounded-xl p-4 hover:border-primary/40 hover:shadow-md hover:shadow-primary/5 transition-all duration-200 bg-white">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-50 group-hover:bg-primary/5 transition-colors">
                  <svg className="h-5 w-5 text-slate-400 group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-semibold text-slate-900 group-hover:text-primary transition-colors truncate">{sg.name}</div>
                </div>
                <ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-primary ml-auto shrink-0 transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <>
          {/* Main Form for DIRECT orders */}
          <form id="multi-order-form" action={submitMultiDirectOrder}></form>

          {subs.length === 0 && (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-50 mb-3">
                <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
              </div>
              <p className="text-sm text-slate-500">Products for this category are not available.</p>
            </div>
          )}

          {subs.map((sub) => (
            <div key={sub.id} className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-slate-200" />
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{sub.name}</span>
                <div className="h-px flex-1 bg-slate-200" />
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {sub.items.map((p) => {
                  const isDirect = !p.orderMode || p.orderMode === "DIRECT"
                  
                  if (!isDirect) {
                    return (
                      <div key={p.id} className="group border border-slate-200 rounded-2xl p-5 space-y-5 bg-white hover:shadow-lg hover:shadow-slate-200/50 hover:border-slate-300 transition-all duration-200">
                         <div className="space-y-1.5">
                            <div className="text-base font-semibold text-slate-900">{p.name}</div>
                            <div className="text-xs text-slate-500">{p.group?.name ?? "-"} • {p.classification}</div>
                         </div>
                         <form action={submitRequestOrder} className="space-y-4">
                            <input type="hidden" name="productId" value={p.id} />
                            <div className="space-y-1.5">
                                <Label className="text-xs font-medium text-slate-600">Price</Label>
                                <select name="priceId" className="border-slate-200 text-sm rounded-lg border bg-slate-50/50 px-3 py-2.5 shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary w-full transition-all">
                                {p.prices.map((pr) => (
                                    <option key={pr.id} value={pr.id}>{pr.currency} • {pr.pricingModel} • MRC {pr.basePrice} • NRC {pr.setupFee}</option>
                                ))}
                                </select>
                            </div>
                            <div className="space-y-1.5">
                                <Label className="text-xs font-medium text-slate-600">Specifications</Label>
                                <CustomerProductSpecs 
                                  specs={p.specs as unknown as SpecField[]} 
                                  dynamicOptions={specDynamicOptions[p.id]} 
                                  branchId={branchId}
                                />
                            </div>
                            <div>
                                <Button type="submit" className="w-full bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-lg transition-colors">Submit Request</Button>
                            </div>
                         </form>
                      </div>
                    )
                  }

                  const isSelected = selectedIds.has(p.id)
                  const priceId = selectedPrices[p.id] || p.prices[0]?.id
                  const price = p.prices.find(pr => pr.id === priceId)
                  
                  return (
                    <div key={p.id} className={`group border rounded-2xl p-5 space-y-4 bg-white transition-all duration-200 ${isSelected ? "border-primary/40 shadow-lg shadow-primary/5 ring-1 ring-primary/10" : "border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300"}`}>
                        <div className="flex items-start gap-3.5">
                            <div className="pt-0.5">
                                <Checkbox 
                                    id={`select-${p.id}`}
                                    checked={isSelected}
                                    onCheckedChange={(c) => toggleSelection(p.id, !!c)}
                                    className={`transition-colors ${isSelected ? "border-primary data-[state=checked]:bg-primary data-[state=checked]:border-primary" : "border-slate-300"}`}
                                />
                            </div>
                            <div className="space-y-1 flex-1 min-w-0">
                                <Label htmlFor={`select-${p.id}`} className="text-base font-semibold text-slate-900 cursor-pointer leading-tight">{p.name}</Label>
                                <div className="text-xs text-slate-500">{p.group?.name ?? "-"} • {p.classification}</div>
                                {price && (price.basePrice || price.setupFee) && (
                                  <div className="flex items-center gap-3 mt-2">
                                    {price.basePrice && (
                                      <span className="text-xs font-medium text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md">MRC {typeof price.basePrice === 'number' ? price.basePrice.toLocaleString('id-ID') : price.basePrice}</span>
                                    )}
                                    {price.setupFee && (
                                      <span className="text-xs font-medium text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md">NRC {typeof price.setupFee === 'number' ? price.setupFee.toLocaleString('id-ID') : price.setupFee}</span>
                                    )}
                                  </div>
                                )}
                            </div>
                        </div>

                        {isSelected && (
                            <div className="pl-[2.75rem] pr-1 space-y-4 border-l-2 border-primary/20 ml-0.5 animate-in fade-in slide-in-from-top-2 duration-200">
                                {/* Hidden Inputs linked to form */}
                                <input form="multi-order-form" type="hidden" name={`items[${p.id}].productId`} value={p.id} />
                                
                                <div className="space-y-1.5">
                                    <Label className="text-xs font-medium text-slate-600">Quantity</Label>
                                    <Input 
                                        form="multi-order-form"
                                        name={`items[${p.id}].qty`}
                                        type="number" 
                                        min={1} 
                                        value={quantities[p.id] ?? 1} 
                                        onChange={(e) => handleQuantityChange(p.id, e.target.value)}
                                        className="w-full border-slate-200 focus:border-primary focus:ring-primary/20"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <Label className="text-xs font-medium text-slate-600">Price</Label>
                                    <select 
                                        form="multi-order-form" 
                                        name={`items[${p.id}].priceId`} 
                                        className="border-slate-200 text-sm rounded-lg border bg-slate-50/50 px-3 py-2.5 shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary w-full transition-all"
                                        value={priceId}
                                        onChange={(e) => handlePriceChange(p.id, e.target.value)}
                                    >
                                    {p.prices.map((pr) => (
                                        <option key={pr.id} value={pr.id}>{pr.currency} • {pr.pricingModel} • MRC {pr.basePrice} • NRC {pr.setupFee}</option>
                                    ))}
                                    </select>
                                </div>

                                <div className="space-y-1.5">
                                    <Label className="text-xs font-medium text-slate-600">Specifications</Label>
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
             <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2 animate-in fade-in slide-in-from-bottom-4">
                 {showGlobalContractFields && (
                     <div className="bg-white/95 backdrop-blur-xl p-5 rounded-2xl shadow-2xl border border-slate-200/80 w-full max-w-sm space-y-3 mb-3">
                        <h3 className="font-semibold text-sm text-slate-900">Contract Details</h3>
                        <div className="space-y-1.5">
                            <Label className="text-xs font-medium text-slate-600">Commencement Date</Label>
                            <Input 
                                form="multi-order-form" 
                                name="commencement_date" 
                                type="date" 
                                required 
                                className="h-9 border-slate-200 focus:border-primary focus:ring-primary/20"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <Label className="text-xs font-medium text-slate-600">Term Of Payment</Label>
                            <Input 
                                form="multi-order-form" 
                                name="term_of_payment" 
                                defaultValue="Monthly" 
                                required 
                                className="h-9 border-slate-200 focus:border-primary focus:ring-primary/20"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <Label className="text-xs font-medium text-slate-600">Term Of Contract (Months)</Label>
                            <Input 
                                form="multi-order-form" 
                                name="term_of_contract" 
                                type="number" 
                                min={1} 
                                defaultValue={12} 
                                required 
                                className="h-9 border-slate-200 focus:border-primary focus:ring-primary/20"
                            />
                        </div>
                     </div>
                 )}
                 <div className="bg-slate-900 text-white px-6 py-4 rounded-2xl shadow-2xl shadow-slate-900/20 flex items-center gap-5 border border-slate-700/50">
                    <div className="flex items-center gap-2.5">
                      <div className="relative">
                        <ShoppingCart className="w-5 h-5" />
                        <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-white text-[10px] font-bold text-slate-900">{selectedCount}</span>
                      </div>
                      <div className="text-sm font-medium">{selectedCount} Product{selectedCount > 1 ? "s" : ""} selected</div>
                    </div>
                    <Button form="multi-order-form" className="bg-white text-slate-900 hover:bg-slate-100 border-none font-semibold rounded-lg transition-colors">
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
