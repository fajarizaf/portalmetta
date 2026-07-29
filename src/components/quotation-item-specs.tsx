"use client"

import * as React from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { SearchableSelect } from "@/components/ui/select"
import DependentDropdown from "./dependent-dropdown"

type FieldType = "TEXT" | "TEXTAREA" | "NUMBER" | "DROPDOWN" | "CHECKBOX"

type SpecField = {
  id: string
  key: string
  label: string
  type: FieldType
  required?: boolean
  config?: Record<string, unknown>
}

type Option = { label: string; value: string; qty?: number; price?: number }

function formatIDR(value: unknown): string {
  const num = typeof value === "number" ? value : Number(value ?? 0)
  if (!Number.isFinite(num)) return String(value ?? "")
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", currencyDisplay: "code", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(num)
}

function CheckboxRow({ 
  option, 
  namePrefix, 
  fieldKey, 
  defaultChecked, 
  defaultQty 
}: { 
  option: Option; 
  namePrefix: string; 
  fieldKey: string; 
  defaultChecked: boolean; 
  defaultQty: number;
}) {
  const [qty, setQty] = React.useState(defaultQty)
  const [checked, setChecked] = React.useState(defaultChecked)
  
  const price = option.price ?? 0
  const subtotal = (qty || 0) * price

  return (
    <tr className={`border-b ${checked ? "bg-muted/20" : ""}`}>
      <td className="py-2 pr-4">
        <div className="flex items-center gap-2">
           <input 
             type="checkbox" 
             name={`${namePrefix}spec_${fieldKey}__${option.value}`} 
             defaultChecked={checked}
             onChange={(e) => setChecked(e.target.checked)}
             id={`${namePrefix}spec_${fieldKey}__${option.value}`}
             className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
           />
           <Label htmlFor={`${namePrefix}spec_${fieldKey}__${option.value}`} className="cursor-pointer font-normal text-sm">
             {option.label}
           </Label>
        </div>
      </td>
      <td className="py-2 pr-4">
        {/* Always show Qty input if configured */}
        {typeof option.qty === "number" && option.qty > 0 ? (
          <Input 
            name={`${namePrefix}spec_${fieldKey}__${option.value}__qty`} 
            type="number" 
            className="h-8 w-24" 
            value={qty || ""}
            onChange={(e) => setQty(Number(e.target.value))}
            disabled={!checked}
          />
        ) : null}
      </td>
      <td className="py-2 text-sm">
        {formatIDR(subtotal)}
      </td>
    </tr>
  )
}

export default function QuotationItemSpecs({
  dependsOnName,
  branchId,
  defaultProductId,
  defaultValues,
  namePrefix = "row_",
  containerId,
}: {
  dependsOnName: string
  branchId?: string
  defaultProductId?: string
  defaultValues?: Record<string, unknown>
  namePrefix?: string
  containerId?: string
}) {
  const [productId, setProductId] = React.useState<string | undefined>(defaultProductId)
  const [fields, setFields] = React.useState<SpecField[]>([])
  const [optionsMap, setOptionsMap] = React.useState<Record<string, Option[]>>({})
  const internalContainerId = React.useId().replace(/:/g, "_")
  const actualContainerId = containerId || internalContainerId

  const fetchSpecs = React.useCallback(async (pid: string) => {
    if (!pid) return
    const params = new URLSearchParams({ productId: pid })
    if (branchId) params.set("branchId", branchId)
    const res = await fetch(`/api/product-specs?${params.toString()}`)
    if (!res.ok) return
    const data = (await res.json()) as { fields: SpecField[]; options: Record<string, Option[]> }
    setFields(data.fields)
    setOptionsMap(data.options || {})
  }, [branchId])

  React.useEffect(() => {
    const checkAndLoad = () => {
      const scopeEl = actualContainerId ? document.getElementById(actualContainerId) : undefined
      const el = scopeEl ? scopeEl.querySelector<HTMLInputElement>(`input[name="${dependsOnName}"]`) : document.querySelector<HTMLInputElement>(`input[name="${dependsOnName}"]`)
      const initial = el?.value || defaultProductId || ""
      if (initial) {
        setProductId(initial)
        fetchSpecs(initial)
        return true
      }
      return false
    }
    
    // Try immediately
    if (!checkAndLoad()) {
      // If not found, retry after a short delay (in case of render timing)
      const timer = setTimeout(() => {
        checkAndLoad()
      }, 100)
      return () => clearTimeout(timer)
    }
    
    const handler = (e: Event) => {
      const ev = e as CustomEvent<{ name: string; value: string }>
      if (!ev.detail) return
      const { name, value } = ev.detail
      if (name === dependsOnName) {
        const scopeElLocal = actualContainerId ? document.getElementById(actualContainerId) : undefined
        const elLocal = scopeElLocal ? scopeElLocal.querySelector<HTMLInputElement>(`input[name="${dependsOnName}"]`) : document.querySelector<HTMLInputElement>(`input[name="${dependsOnName}"]`)
        const v = elLocal?.value || value || ""
        setProductId(v || undefined)
        if (v) fetchSpecs(v)
      }
    }
    window.addEventListener("docFieldChange", handler as EventListener)
    return () => window.removeEventListener("docFieldChange", handler as EventListener)
  }, [dependsOnName, branchId, defaultProductId, fetchSpecs, actualContainerId])

  if (!productId) return null

  return (
    <div className="md:col-span-2" id={actualContainerId}>
      <div className="rounded-md border p-3 space-y-3">
        <div className="text-sm font-semibold">Spesifikasi Produk</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fields.map((s) => {
          const def = defaultValues ? defaultValues[`spec_${s.key}`] : undefined
          if (s.type === "TEXT") {
            return (
              <div key={s.id} className="space-y-2">
                <Label>{s.label}{s.required ? " *" : ""}</Label>
                <Input name={`${namePrefix}spec_${s.key}`} defaultValue={typeof def === "string" ? def : ""} />
              </div>
            )
          }
          if (s.type === "TEXTAREA") {
            return (
              <div key={s.id} className="space-y-2">
                <Label>{s.label}{s.required ? " *" : ""}</Label>
                <textarea name={`${namePrefix}spec_${s.key}`} className="border rounded-md p-3 w-full min-h-28 text-sm" defaultValue={typeof def === "string" ? def : ""} />
              </div>
            )
          }
          if (s.type === "NUMBER") {
            return (
              <div key={s.id} className="space-y-2">
                <Label>{s.label}{s.required ? " *" : ""}</Label>
                <Input name={`${namePrefix}spec_${s.key}`} type="number" defaultValue={typeof def === "number" ? String(def) : ""} />
              </div>
            )
          }
          if (s.type === "DROPDOWN") {
            const cfg = (s.config ?? {}) as { options?: Option[]; source?: Record<string, unknown> }
            const dyn = optionsMap[s.key]
            const options = dyn ?? (Array.isArray(cfg.options) ? cfg.options : [])
            
            if (cfg.source) {
              const src = cfg.source as any
              const filterRaw = src["filter"] as unknown
              const filters = Array.isArray(filterRaw)
                ? (filterRaw as Array<Record<string, unknown>>).map((x) => ({
                    dependsOn: typeof x["dependsOn"] === "string" ? (x["dependsOn"] as string) : "",
                    field: typeof x["field"] === "string" ? (x["field"] as string) : "",
                  })).filter((it) => it.dependsOn && it.field)
                : (() => {
                    const dependsOn = typeof (filterRaw as Record<string, unknown>)?.["dependsOn"] === "string" ? ((filterRaw as Record<string, unknown>)["dependsOn"] as string) : ""
                    const fieldSrc = typeof (filterRaw as Record<string, unknown>)?.["field"] === "string" ? ((filterRaw as Record<string, unknown>)["field"] as string) : ""
                    return (dependsOn && fieldSrc) ? [{ dependsOn, field: fieldSrc }] : []
                  })()

              const sourceObj = {
                mode: src["mode"],
                key: src["key"],
                table: src["table"],
                labelField: src["labelField"] || "name",
                valueField: src["valueField"] || "id",
                filter: (filters.length > 1 ? filters : (filters[0] ?? undefined)) as any,
              }

              return (
                <div key={s.id} className="space-y-2">
                  <DependentDropdown
                    name={`${namePrefix}spec_${s.key}`}
                    label={s.label}
                    required={s.required}
                    options={options}
                    defaultValue={typeof def === "string" ? def : ""}
                    source={sourceObj}
                    branchId={branchId}
                    containerId={actualContainerId}
                  />
                </div>
              )
            }

            return (
              <div key={s.id} className="space-y-2">
                <Label>{s.label}{s.required ? " *" : ""}</Label>
                <SearchableSelect 
                  name={`${namePrefix}spec_${s.key}`} 
                  placeholder="-" 
                  options={options.map((o) => ({ label: o.label, value: o.value }))} 
                  defaultValue={typeof def === "string" ? def : ""} 
                  emitChangeEvent={true} 
                  containerId={actualContainerId}
                  required={s.required}
                />
              </div>
            )
          }
          if (s.type === "CHECKBOX") {
            const cfg = (s.config ?? {}) as { options?: Option[] }
            const opts = Array.isArray(cfg.options) ? cfg.options : []
            const selectedArr = Array.isArray(def) ? (def as unknown[]).map(String) : []
            return (
              <div key={s.id} className="space-y-2 md:col-span-2">
                <Label>{s.label}{s.required ? " *" : ""}</Label>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 font-medium text-muted-foreground">Item</th>
                        <th className="text-left py-2 w-32 font-medium text-muted-foreground">QTY</th>
                        <th className="text-left py-2 w-32 font-medium text-muted-foreground">Sub Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {opts.map((o, i) => {
                        const checked = selectedArr.includes(String(o.value))
                        const qtyDefKey = `spec_${s.key}__${o.value}__qty`
                        const qtyDefRaw = defaultValues ? defaultValues[qtyDefKey] : undefined
                        const qtyVal = typeof qtyDefRaw === "number" ? qtyDefRaw : 0
                        
                        return (
                          <CheckboxRow 
                            key={i}
                            option={o}
                            namePrefix={namePrefix}
                            fieldKey={s.key}
                            defaultChecked={checked}
                            defaultQty={qtyVal}
                          />
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )
          }
          return null
        })}
        </div>
      </div>
    </div>
  )
}