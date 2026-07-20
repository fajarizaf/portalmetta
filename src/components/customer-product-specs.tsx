"use client"

import * as React from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import DependentDropdown from "./dependent-dropdown"

type FieldType = "TEXT" | "TEXTAREA" | "NUMBER" | "DROPDOWN" | "CHECKBOX"

export type SpecField = {
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
  formId,
}: { 
  option: Option; 
  namePrefix: string; 
  fieldKey: string; 
  formId?: string;
}) {
  const [qty, setQty] = React.useState(0)
  const [checked, setChecked] = React.useState(false)
  
  const price = option.price ?? 0
  const subtotal = (qty || 0) * price

  return (
    <tr className={`border-b ${checked ? "bg-muted/20" : ""}`}>
      <td className="py-2 pr-4 align-top">
        <div className="flex items-start gap-2 pt-2">
           <Checkbox 
             checked={checked}
             onCheckedChange={(c) => setChecked(!!c)}
             id={`${namePrefix}spec_${fieldKey}__${option.value}`}
           />
           <input 
             type="hidden" 
             name={`${namePrefix}spec_${fieldKey}__${option.value}`} 
             value={checked ? "on" : ""} 
             form={formId}
           />
           <Label htmlFor={`${namePrefix}spec_${fieldKey}__${option.value}`} className="cursor-pointer font-normal text-sm leading-none pt-0.5">
             {option.label}
             {price > 0 && (
               <span className="block text-xs text-muted-foreground mt-1">
                 @ {formatIDR(price)}
               </span>
             )}
           </Label>
        </div>
      </td>
      <td className="py-2 pr-4 align-top">
        {typeof option.qty === "number" && (
          <Input 
            name={`${namePrefix}spec_${fieldKey}__${option.value}__qty`} 
            type="number" 
            className="h-8 w-24" 
            placeholder="Qty"
            value={qty || ""}
            onChange={(e) => setQty(Number(e.target.value))}
            disabled={!checked}
            form={formId}
          />
        )}
      </td>
      <td className="py-2 text-sm text-right align-top pt-3">
        {checked && subtotal > 0 ? formatIDR(subtotal) : "-"}
      </td>
    </tr>
  )
}

export function CustomerProductSpecs({
  specs,
  dynamicOptions,
  namePrefix = "",
  formId,
  branchId,
}: {
  specs: SpecField[]
  dynamicOptions?: Record<string, Array<{ label: string; value: string }>>
  namePrefix?: string
  formId?: string
  branchId?: string
}) {
  const containerId = React.useId().replace(/:/g, "_")

  return (
    <div className="space-y-3" id={containerId}>
      {specs.map((s) => {
        const cfg = (s.config ?? {}) as { options?: Option[]; source?: Record<string, unknown> }
        
        if (s.type === "TEXT") {
          return (
            <div key={s.id} className="space-y-1">
              <Label>{s.label}{s.required ? " *" : ""}</Label>
              <Input name={`${namePrefix}spec_${s.key}`} form={formId} />
            </div>
          )
        }
        if (s.type === "TEXTAREA") {
          return (
            <div key={s.id} className="space-y-1">
              <Label>{s.label}{s.required ? " *" : ""}</Label>
              <textarea name={`${namePrefix}spec_${s.key}`} form={formId} className="border-input text-sm rounded-md border bg-transparent px-3 py-2 shadow-xs outline-none focus-visible:ring-[3px] focus-visible:border-ring w-full min-h-20" />
            </div>
          )
        }
        if (s.type === "NUMBER") {
          return (
            <div key={s.id} className="space-y-1">
              <Label>{s.label}{s.required ? " *" : ""}</Label>
              <Input name={`${namePrefix}spec_${s.key}`} type="number" form={formId} />
            </div>
          )
        }
        if (s.type === "DROPDOWN") {
          const dyn = (dynamicOptions ?? {})[s.key]
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
              <div key={`${s.id}_${branchId || "none"}`}>
                <DependentDropdown
                  name={`${namePrefix}spec_${s.key}`}
                  label={s.label}
                  required={s.required}
                  options={options}
                  source={sourceObj}
                  branchId={branchId}
                  containerId={containerId}
                  form={formId}
                />
              </div>
            )
          }

          const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
            const val = e.target.value
            try {
              window.dispatchEvent(new CustomEvent("docFieldChange", { 
                detail: { 
                  name: `${namePrefix}spec_${s.key}`, 
                  value: val,
                  containerId 
                } 
              }))
            } catch {}
          }

          return (
            <div key={s.id} className="space-y-1">
              <Label>{s.label}{s.required ? " *" : ""}</Label>
              <select 
                name={`${namePrefix}spec_${s.key}`} 
                form={formId} 
                onChange={handleChange}
                className="border-input text-sm rounded-md border bg-transparent px-3 py-2 shadow-xs outline-none focus-visible:ring-[3px] focus-visible:border-ring w-full"
              >
                <option value="">-</option>
                {options.map((o, i) => (
                  <option key={i} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
          )
        }
        if (s.type === "CHECKBOX") {
          const opts = Array.isArray(cfg.options) ? cfg.options : []
          return (
            <div key={s.id} className="space-y-1">
              <Label>{s.label}{s.required ? " *" : ""}</Label>
              <div className="overflow-x-auto border rounded-md p-2">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 font-medium text-muted-foreground w-[50%]">Item</th>
                      <th className="text-left py-2 w-24 font-medium text-muted-foreground">Qty</th>
                      <th className="text-right py-2 font-medium text-muted-foreground">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {opts.map((o, i) => (
                      <CheckboxRow 
                        key={i}
                        option={o}
                        namePrefix={namePrefix}
                        fieldKey={s.key}
                        formId={formId}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )
        }
        return null
      })}
    </div>
  )
}
