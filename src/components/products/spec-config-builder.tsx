"use client"
import * as React from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { SearchableSelect } from "@/components/ui/select"

export default function SpecConfigBuilder({
  initialType,
  initialConfig,
  typeName = "type",
  name = "config",
  docTypes,
}: {
  initialType?: "TEXT" | "TEXTAREA" | "NUMBER" | "DROPDOWN" | "CHECKBOX"
  initialConfig?: { options?: Array<{ label: string; value: string; qty?: number }>; source?: { key?: string; docTypeKey?: string; target?: string; labelField?: string; valueField?: string; filters?: Array<{ field: string; op: string; value?: string; valueSource?: string; valueKey?: string }> } }
  typeName?: string
  name?: string
  docTypes?: Array<{ key: string; name: string; fields: Array<{ key: string; label: string }> }>
}) {
  const [type, setType] = React.useState<"TEXT" | "TEXTAREA" | "NUMBER" | "DROPDOWN" | "CHECKBOX">(initialType ?? "TEXT")
  const [options, setOptions] = React.useState<Array<{ label: string; value: string; qty?: number; price?: number }>>(() => {
    const opts = initialConfig?.options
    return Array.isArray(opts)
      ? opts.map((o: { label: unknown; value: unknown; qty?: unknown; price?: unknown }) => ({
          label: String(o.label ?? ""),
          value: String(o.value ?? ""),
          qty: Number(o.qty ?? 0),
          price: Number(o.price ?? 0),
        }))
      : []
  })
  const src = (initialConfig?.source ?? {}) as { key?: string; docTypeKey?: string; target?: string; labelField?: string; valueField?: string; filters?: Array<{ field: string; op: string; value?: string; valueSource?: string; valueKey?: string }> }
  const initialSourceKey = typeof src.key === "string" && src.key
    ? src.key
    : typeof src.docTypeKey === "string" && src.docTypeKey
    ? src.docTypeKey
    : typeof src.target === "string" && src.target
    ? src.target
    : ""
  const [mode, setMode] = React.useState<string>(() => (initialType === "DROPDOWN" && initialSourceKey ? "dynamic" : "static"))
  const [sourceKey, setSourceKey] = React.useState<string>(initialSourceKey)
  const [labelField, setLabelField] = React.useState<string>(typeof src.labelField === "string" && src.labelField ? src.labelField : "name")
  const [valueField, setValueField] = React.useState<string>(typeof src.valueField === "string" && src.valueField ? src.valueField : "id")
  const [filters, setFilters] = React.useState<Array<{ field: string; op: string; value?: string; valueSource?: string; valueKey?: string }>>(() => {
    const arr = Array.isArray(src.filters) ? src.filters : []
    return arr.map((f) => ({ field: String(f.field || ""), op: String(f.op || "eq"), value: typeof f.value === "string" ? f.value : "", valueSource: typeof f.valueSource === "string" ? f.valueSource : "literal", valueKey: typeof f.valueKey === "string" ? f.valueKey : "" }))
  })

  const sourceFields = React.useMemo(() => {
    const dt = (docTypes ?? []).find((d) => d.key === sourceKey)
    const base: Array<{ key: string; label: string }> = [
      { key: "id", label: "id (Record ID)" },
      { key: "name", label: "name" },
    ]
    if (!dt) return base
    const unique = new Map<string, string>()
    for (const f of base) unique.set(f.key, f.label)
    for (const f of dt.fields) unique.set(f.key, f.label || f.key)
    return Array.from(unique.entries()).map(([key, label]) => ({ key, label }))
  }, [docTypes, sourceKey])

  const addOption = () => setOptions((prev) => [...prev, { label: "", value: "", qty: 0, price: 0 }])
  const removeOption = (idx: number) => setOptions((prev) => prev.filter((_, i) => i !== idx))
  const updateOption = (idx: number, patch: Partial<{ label: string; value: string; qty?: number; price?: number }>) =>
    setOptions((prev) => prev.map((o, i) => (i === idx ? { ...o, ...patch } : o)))
  const addFilter = () => setFilters((prev) => [...prev, { field: "", op: "eq", value: "", valueSource: "literal", valueKey: "" }])
  const removeFilter = (idx: number) => setFilters((prev) => prev.filter((_, i) => i !== idx))
  const updateFilter = (idx: number, patch: Partial<{ field: string; op: string; value?: string; valueSource?: string; valueKey?: string }>) =>
    setFilters((prev) => prev.map((f, i) => (i === idx ? { ...f, ...patch } : f)))

  const configString = React.useMemo(() => {
    if (type === "DROPDOWN") {
      if (mode === "dynamic" && sourceKey) {
        const fs = filters.filter((f) => f.field && f.op && ((f.valueSource === "session" && typeof f.valueKey === "string" && f.valueKey.length > 0) || (typeof f.value === "string" && f.value.length > 0)))
        const out = { source: { key: sourceKey, labelField: labelField || "name", valueField: valueField || "id", ...(fs.length > 0 ? { filters: fs } : {}) } }
        return JSON.stringify(out)
      }
      const out = { options: options.map((o) => ({ label: o.label, value: o.value })) }
      return JSON.stringify(out)
    }
    if (type === "CHECKBOX") {
      const out = { options: options.map((o) => ({ label: o.label, value: o.value, qty: Number(o.qty || 0), price: Number(o.price || 0) })) }
      return JSON.stringify(out)
    }
    return ""
  }, [type, options, mode, sourceKey, labelField, valueField, filters])

  return (
    <div className="space-y-3">
      <div className="space-y-2">
        <Label>Tipe</Label>
        <SearchableSelect
          value={type}
          onValueChange={(v) => setType(v as "TEXT" | "TEXTAREA" | "NUMBER" | "DROPDOWN" | "CHECKBOX")}
          allowEmpty={false}
          options={[
            { label: "Text", value: "TEXT" },
            { label: "Textarea", value: "TEXTAREA" },
            { label: "Number", value: "NUMBER" },
            { label: "Dropdown", value: "DROPDOWN" },
            { label: "Checkbox", value: "CHECKBOX" },
          ]}
        />
      </div>

      {(type === "DROPDOWN" || type === "CHECKBOX") && (
        <div className="space-y-2">
          {type === "DROPDOWN" && (docTypes && docTypes.length > 0) ? (
            <div className="space-y-2">
              <Label>Mode Dropdown</Label>
              <SearchableSelect
                value={mode}
                onValueChange={setMode}
                allowEmpty={false}
                options={[
                  { label: "Static", value: "static" },
                  { label: "Dinamis (DocType)", value: "dynamic" },
                ]}
              />
            </div>
          ) : null}

          {mode === "dynamic" && type === "DROPDOWN" ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <div className="space-y-2">
                <Label>DocType Sumber</Label>
                <SearchableSelect
                  value={sourceKey}
                  onValueChange={setSourceKey}
                  placeholder="-"
                  options={(docTypes ?? []).map((d) => ({ label: `${d.name} (${d.key})`, value: d.key }))}
                />
              </div>
              <div className="space-y-2">
                <Label>Label Field</Label>
                <SearchableSelect
                  value={labelField}
                  onValueChange={setLabelField}
                  allowEmpty={false}
                  options={sourceFields.map((f) => ({ label: f.label, value: f.key }))}
                />
              </div>
              <div className="space-y-2">
                <Label>Value Field</Label>
                <SearchableSelect
                  value={valueField}
                  onValueChange={setValueField}
                  allowEmpty={false}
                  options={sourceFields.map((f) => ({ label: f.label, value: f.key }))}
                />
              </div>
              <div className="md:col-span-3 space-y-2">
                <Label>Filter</Label>
                <div className="space-y-2">
                  {filters.map((f, i) => (
                    <div key={i} className="grid grid-cols-6 gap-2">
                      <div className="col-span-2">
                        <SearchableSelect
                          value={f.field}
                          onValueChange={(v) => updateFilter(i, { field: v })}
                          placeholder="-"
                          options={sourceFields.map((sf) => ({ label: sf.label, value: sf.key }))}
                        />
                      </div>
                      <div>
                        <SearchableSelect
                          value={f.op}
                          onValueChange={(v) => updateFilter(i, { op: v })}
                          allowEmpty={false}
                          options={[
                            { label: "=", value: "eq" },
                            { label: "≠", value: "neq" },
                            { label: "contains", value: "contains" },
                            { label: "startsWith", value: "startsWith" },
                            { label: "endsWith", value: "endsWith" },
                          ]}
                        />
                      </div>
                      <div>
                        <SearchableSelect
                          value={f.valueSource ?? "literal"}
                          onValueChange={(v) => updateFilter(i, { valueSource: v })}
                          allowEmpty={false}
                          options={[
                            { label: "Literal", value: "literal" },
                            { label: "Sesi", value: "session" },
                          ]}
                        />
                      </div>
                      {(f.valueSource ?? "literal") === "session" ? (
                        <div className="col-span-2">
                          <SearchableSelect
                            value={f.valueKey ?? ""}
                            onValueChange={(v) => updateFilter(i, { valueKey: v })}
                            placeholder="-"
                            options={[
                              { label: "branchId", value: "branchId" },
                              { label: "currentGroupId", value: "currentGroupId" },
                              { label: "companyParentId", value: "companyParentId" },
                              { label: "userEmail", value: "userEmail" },
                              { label: "userCompanyId", value: "userCompanyId" },
                              { label: "groupId", value: "groupId" },
                            ]}
                          />
                        </div>
                      ) : (
                        <div className="col-span-2">
                          <Input value={f.value ?? ""} onChange={(e) => updateFilter(i, { value: e.target.value })} placeholder="Nilai" />
                        </div>
                      )}
                      <div>
                        <Button type="button" variant="destructive" onClick={() => removeFilter(i)}>Hapus</Button>
                      </div>
                    </div>
                  ))}
                  <Button type="button" onClick={addFilter}>Tambah Filter</Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <Label>Opsi</Label>
              <div className="space-y-2">
                {options.map((o, i) => (
                  <div key={i} className="grid grid-cols-6 gap-2">
                    <div className="col-span-2">
                      <Input value={o.label} onChange={(e) => updateOption(i, { label: e.target.value })} placeholder="Label" />
                    </div>
                    <div className="col-span-2">
                      <Input value={o.value} onChange={(e) => updateOption(i, { value: e.target.value })} placeholder="Value" />
                    </div>
                    {type === "CHECKBOX" && (
                      <>
                        <div className="col-span-1">
                          <Input type="number" value={o.qty ?? 0} onChange={(e) => updateOption(i, { qty: Number(e.target.value || 0) })} placeholder="Qty Flag" title="Set > 0 untuk mengaktifkan input Qty" />
                        </div>
                        <div className="col-span-1">
                          <Input type="number" value={o.price ?? 0} onChange={(e) => updateOption(i, { price: Number(e.target.value || 0) })} placeholder="Price" title="Harga Satuan" />
                        </div>
                      </>
                    )}
                    <div>
                      <Button type="button" variant="destructive" onClick={() => removeOption(i)}>Hapus</Button>
                    </div>
                  </div>
                ))}
                <Button type="button" onClick={addOption}>Tambah Opsi</Button>
              </div>
            </div>
          )}
        </div>
      )}

      <input type="hidden" name={typeName} value={type} />
      <input type="hidden" name={name} value={configString} />
    </div>
  )
}