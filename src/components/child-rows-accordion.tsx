"use client"

import * as React from "react"
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SearchableSelect } from "@/components/ui/select"
import DependentDropdown from "@/components/dependent-dropdown"
import QuotationItemSpecs from "@/components/quotation-item-specs"
import type { FieldType } from "@/generated/prisma/enums"
import { FileText, Plus } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"

function isPriceLikeKey(key: string): boolean {
  const k = String(key || "").toLowerCase()
  return k === "nrc" || k === "mrc" || k === "subtotal_nrc" || k === "sub_total_nrc" || k === "subtotal_mrc" || k === "sub_total_mrc" || k === "price" || k === "unit_price"
}

function formatDateInput(d: Date): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, "0")
  const dd = String(d.getDate()).padStart(2, "0")
  return `${y}-${m}-${dd}`
}

type Option = { label: string; value: string; original?: any }

export default function ChildRowsAccordion({
  fields,
  optionsMap,
  branchId,
  formId,
  canAddRows = true,
  childName,
  defaultValues,
  initialData,
  disabledFields = [],
}: {
  fields: Array<{ id: string; key: string; label: string; type: FieldType; required?: boolean; readOnly?: boolean; config?: Record<string, unknown> }>
  optionsMap: Record<string, Option[]>
  branchId?: string
  formId?: string
  canAddRows?: boolean
  childName?: string
  defaultValues?: Array<Record<string, unknown>>
  initialData?: Record<string, string>
  disabledFields?: string[]
}) {
  const [rows, setRows] = React.useState<number[]>(() => {
    if (defaultValues && defaultValues.length > 0) {
      return defaultValues.map((_, i) => i)
    }
    return []
  })
  const [counter, setCounter] = React.useState<number>(defaultValues ? defaultValues.length : 0)
  const [newRowsData, setNewRowsData] = React.useState<Record<number, Record<string, string>>>({})

  const rowValuesMap = React.useMemo(() => {
    const map: Record<number, Record<string, string>> = {}
    if (defaultValues) {
      defaultValues.forEach((d, i) => {
        const row: Record<string, string> = {}
        for (const [k, v] of Object.entries(d)) {
          row[k] = v != null ? String(v) : ""
        }
        map[i] = row
      })
    }
    return map
  }, [defaultValues])

  const ridPreview = counter

  const addEmptyRow = () => {
    const rid = counter
    if (initialData) {
      setNewRowsData(prev => ({ ...prev, [rid]: initialData }))
    }
    setRows((prev) => [...prev, rid])
    setCounter((c) => c + 1)
  }

  const removeRow = (id: number) => {
    setRows((prev) => prev.filter((r) => r !== id))
  }

  return (
    <div className="space-y-3">
      <div className="space-y-2">
        {rows.length === 0 ? (
          <div className="rounded-md border border-dashed bg-muted/30 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText className="size-5 text-muted-foreground" />
              <div className="space-y-0.5">
                <div className="text-sm font-semibold">Belum ada item</div>
                <div className="text-xs text-muted-foreground">Tambah item ke dokumen ini</div>
              </div>
            </div>
            {canAddRows ? (
              <Button type="button" onClick={addEmptyRow}>{`Tambah ${childName || "Item"}`}</Button>
            ) : null}
          </div>
        ) : null}
        {rows.map((rid, idx) => {
          const containerId = `${formId || "new-record-form"}-row-${rid}`
          return (
            <Collapsible key={rid} className="border rounded" defaultOpen={true}>
              <div className="flex items-center justify-between p-3">
                <CollapsibleTrigger>
                  <div className="text-sm font-semibold">Item {idx + 1}</div>
                </CollapsibleTrigger>
                <div className="flex items-center gap-2">
                  <Button type="button" variant="destructive" onClick={() => removeRow(rid)}>Hapus</Button>
                </div>
              </div>
              <CollapsibleContent forceMount>
                <div id={containerId} className="p-3 grid grid-cols-1 md:grid-cols-2 gap-3">
                  {fields.map((cf) => {
                    const opt = optionsMap[cf.key] ?? []
                    const nameBase = `row_${rid}_`
                    const fieldName = `${nameBase}${cf.key}`
                    const preset = (rowValuesMap[rid] ?? newRowsData[rid] ?? {})[cf.key]
                    const isDisabled = cf.readOnly || disabledFields.includes(cf.key)

                    if (cf.type === ("TEXT" as FieldType)) {
                      return (
                        <div key={cf.id} className="space-y-2">
                          <Label>{cf.label}{cf.required ? " *" : ""}</Label>
                          <Input name={fieldName} defaultValue={typeof preset === "string" ? preset : undefined} disabled={isDisabled} />
                          {isDisabled && <input type="hidden" name={fieldName} value={typeof preset === "string" ? preset : ""} />}
                        </div>
                      )
                    }
                    if (cf.type === ("TEXTAREA" as FieldType)) {
                      return (
                        <div key={cf.id} className="space-y-2">
                          <Label>{cf.label}{cf.required ? " *" : ""}</Label>
                          <textarea name={fieldName} className="border rounded p-2 w-full min-h-24 text-sm" defaultValue={typeof preset === "string" ? preset : undefined} disabled={isDisabled} />
                          {isDisabled && <input type="hidden" name={fieldName} value={typeof preset === "string" ? preset : ""} />}
                        </div>
                      )
                    }
                    if (cf.type === ("PRICE" as FieldType) || isPriceLikeKey(cf.key)) {
                      return (
                        <div key={cf.id} className="space-y-2">
                          <Label>{cf.label}{cf.required ? " *" : ""}</Label>
                          <Input name={fieldName} type="text" placeholder="IDR 0" disabled={cf.readOnly} defaultValue={typeof preset === "string" ? preset : undefined} />
                        </div>
                      )
                    }
                    if (cf.type === ("NUMBER" as FieldType)) {
                      const cfg = (cf.config ?? {}) as unknown as { defaultValue?: number }
                      const dv = typeof cfg.defaultValue === "number" ? String(cfg.defaultValue) : undefined
                      return (
                        <div key={cf.id} className="space-y-2">
                          <Label>{cf.label}{cf.required ? " *" : ""}</Label>
                          <Input name={fieldName} type="number" disabled={cf.readOnly} defaultValue={typeof preset === "string" ? preset : dv} />
                        </div>
                      )
                    }
                    if (cf.type === ("DROPDOWN" as FieldType)) {
                      const cfg = (cf.config ?? {}) as unknown as { options?: Array<{ label: string; value: string }>; source?: Record<string, unknown> }
                      const src = cfg?.source as Record<string, unknown> | undefined
                      const hasFilter = Boolean(src && src["filter"] != null)
                      if (hasFilter) {
                        const raw = src?.["filter"] as unknown
                        const filterRaw = (() => {
                          if (typeof raw !== "string") return raw
                          try {
                            return JSON.parse(raw)
                          } catch {
                            return raw
                          }
                        })()
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
                          mode: (src && typeof (src as any)["mode"] === "string") ? ((src as any)["mode"] as string) : undefined,
                          key: (src && typeof src["key"] === "string") ? (src["key"] as string) : undefined,
                          table: (src && typeof src["table"] === "string") ? (src["table"] as string) : undefined,
                          labelField: (src && typeof src["labelField"] === "string") ? (src["labelField"] as string) : "name",
                          valueField: (src && typeof src["valueField"] === "string") ? (src["valueField"] as string) : "id",
                          filter: (filters.length > 1 ? filters : (filters[0] ?? undefined)) as unknown as { dependsOn: string; field: string } | Array<{ dependsOn: string; field: string }>,
                        }
                        const isProduct = (typeof src?.["table"] === "string" && String(src?.["table"]).toLowerCase() === "product") || (typeof src?.["key"] === "string" && String(src?.["key"]).toLowerCase().includes("product"))
                        const initMap: Record<string, string> = {}
                        for (const it of filters) {
                          const raw = (rowValuesMap[rid] ?? {})[it.dependsOn]
                          const v = typeof raw === "string" ? raw : String(raw ?? "")
                          if (v) {
                            initMap[it.dependsOn] = v
                          } else if (branchId && it.field === "branchId") {
                            initMap[it.dependsOn] = branchId
                          }
                        }
                        return (
                          <div key={cf.id} className="space-y-2">
                            <DependentDropdown
                              key={`${fieldName}-${JSON.stringify(initMap)}`}
                              name={fieldName}
                              label={cf.label}
                              required={cf.required}
                              options={opt}
                              source={sourceObj}
                              branchId={branchId}
                              initialDependsOnValues={initMap}
                              initialDependsOnValue={undefined}
                              defaultValue={typeof preset === "string" ? preset : undefined}
                              containerId={containerId}
                            />
                            {isProduct ? (
                              <QuotationItemSpecs dependsOnName={fieldName} branchId={branchId} namePrefix={nameBase} containerId={containerId} defaultProductId={typeof preset === "string" ? preset : undefined} defaultValues={rowValuesMap[rid]} />
                            ) : null}
                          </div>
                        )
                      }
                      const isProduct = (typeof src?.["table"] === "string" && String(src?.["table"]).toLowerCase() === "product") || (typeof src?.["key"] === "string" && String(src?.["key"]).toLowerCase().includes("product"))
                      return (
                        <div key={cf.id} className="space-y-2">
                          <Label>{cf.label}{cf.required ? " *" : ""}</Label>
                          <SearchableSelect name={fieldName} placeholder="-" options={opt} defaultValue={typeof preset === "string" ? preset : undefined} emitChangeEvent={true} containerId={containerId} />
                          {isProduct ? (
                            <QuotationItemSpecs dependsOnName={fieldName} branchId={branchId} namePrefix={nameBase} containerId={containerId} defaultProductId={typeof preset === "string" ? preset : undefined} defaultValues={rowValuesMap[rid]} />
                          ) : null}
                        </div>
                      )
                    }
                    if (cf.type === ("CHECKBOX" as FieldType)) {
                      return (
                        <div key={cf.id} className="flex items-center gap-2">
                          <input type="checkbox" name={fieldName} defaultChecked={preset === "true" || preset === "on"} />
                          <Label>{cf.label}</Label>
                        </div>
                      )
                    }
                    if (cf.type === ("DATE" as FieldType)) {
                      return (
                        <div key={cf.id} className="space-y-2">
                          <Label>{cf.label}{cf.required ? " *" : ""}</Label>
                          <Input name={fieldName} type="date" defaultValue={typeof preset === "string" ? preset : undefined} />
                        </div>
                      )
                    }
                    if (cf.type === ("DATETIME" as FieldType)) {
                      return (
                        <div key={cf.id} className="space-y-2">
                          <Label>{cf.label}{cf.required ? " *" : ""}</Label>
                          <Input name={fieldName} type="datetime-local" defaultValue={typeof preset === "string" ? preset : undefined} />
                        </div>
                      )
                    }
                    if (cf.type === ("LINK" as FieldType)) {
                      const cfg = (cf.config ?? {}) as unknown as { target?: string }
                      return (
                        <div key={cf.id} className="space-y-2">
                          <Label>{cf.label}{cf.required ? " *" : ""}</Label>
                          <Input name={fieldName} placeholder={cfg.target ? `Link ke ${cfg.target}` : "Link"} defaultValue={typeof preset === "string" ? preset : undefined} />
                        </div>
                      )
                    }
                    if (cf.type === ("ATTACHMENT" as FieldType)) {
                      return (
                        <div key={cf.id} className="space-y-2">
                          <Label>{cf.label}{cf.required ? " *" : ""}</Label>
                          <Input name={fieldName} type="file" />
                          {preset ? (
                            <div className="text-xs text-muted-foreground">
                              File saat ini:{" "}
                              <a href={preset} target="_blank" rel="noopener noreferrer" className="text-primary underline inline-flex items-center gap-1">
                                <FileText className="size-3" />
                                Lihat Lampiran
                              </a>
                            </div>
                          ) : null}
                        </div>
                      )
                    }
                    return null
                  })}
                </div>
              </CollapsibleContent>
            </Collapsible>
          )
        })}
      </div>
      {canAddRows && rows.length > 0 ? (
        <div className="flex justify-end pt-2">
          <Button type="button" variant="outline" size="sm" onClick={addEmptyRow} className="gap-2">
            <Plus className="size-4" />
            Tambah {childName || "Item"}
          </Button>
        </div>
      ) : null}
    </div>
  )
}
