"use client"

import { useEffect, useMemo, useState } from "react"
import { Label } from "@/components/ui/label"
import { SearchableSelect } from "@/components/ui/select"

type DocTypeInfo = {
  key: string
  name: string
  fields: Array<{ key: string; label: string }>
}

export default function DocTypeDropdownConfig({ docTypes, tables, currentDropdownFields, parentDropdownFields, defaults }: { docTypes: DocTypeInfo[]; tables: Array<{ name: string; columns: string[] }>; currentDropdownFields?: Array<{ key: string; label: string; config?: Record<string, unknown> }>; parentDropdownFields?: Array<{ key: string; label: string; config?: Record<string, unknown> }>; defaults?: { mode?: string; sourceKey?: string; labelField?: string; valueField?: string; tableName?: string; optionsText?: string; depFieldKey?: string; depSourceField?: string } }) {
  const [mode, setMode] = useState<string>(defaults?.mode || "static")
  const [sourceKey, setSourceKey] = useState<string>(defaults?.sourceKey || "")
  const [labelField, setLabelField] = useState<string>(defaults?.labelField || "name")
  const [valueField, setValueField] = useState<string>(defaults?.valueField || "id")
  const [tableName, setTableName] = useState<string>(defaults?.tableName || "")
  const [depFieldKey, setDepFieldKey] = useState<string>(defaults?.depFieldKey || "")
  const [depSourceField, setDepSourceField] = useState<string>(defaults?.depSourceField || "")

  const sourceFields = useMemo(() => {
    const dt = docTypes.find((d) => d.key === sourceKey)
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

  const tableFields = useMemo(() => {
    const t = tables.find((t) => t.name === tableName)
    const base = ["id", "name", "code"]
    const cols = new Map<string, string>()
    for (const k of base) cols.set(k, k)
    for (const c of (t?.columns ?? [])) cols.set(c, c)
    return Array.from(cols.keys())
  }, [tables, tableName])

  const acuanValueField = useMemo(() => {
    const all = [...(currentDropdownFields ?? []), ...(parentDropdownFields ?? [])]
    const found = all.find((f) => f.key === depFieldKey)
    const cfg = (found?.config ?? {}) as Record<string, unknown>
    const src = (cfg["source"] ?? {}) as Record<string, unknown>
    const val = typeof src["valueField"] === "string" ? (src["valueField"] as string) : "id"
    return val
  }, [depFieldKey, currentDropdownFields, parentDropdownFields])

  const depFieldOptions = useMemo(() => {
    const map = new Map<string, string>()
    for (const f of (currentDropdownFields ?? [])) {
      if (!map.has(f.key)) map.set(f.key, f.label)
    }
    for (const f of (parentDropdownFields ?? [])) {
      if (!map.has(f.key)) map.set(f.key, f.label)
    }
    return Array.from(map.entries()).map(([key, label]) => ({ label, value: key }))
  }, [currentDropdownFields, parentDropdownFields])

  const recommendedSourceField = useMemo(() => {
    const recommend = acuanValueField || "id"
    if (mode === "dynamic") {
      const exists = sourceFields.some((f) => f.key === recommend)
      const fallback = sourceFields.some((f) => f.key === "id") ? "id" : (sourceFields[0]?.key ?? "")
      return exists ? recommend : fallback
    }
    if (mode === "dynamic-table") {
      const exists = tableFields.includes(recommend)
      const fallback = tableFields.includes("id") ? "id" : (tableFields[0] ?? "")
      return exists ? recommend : fallback
    }
    return ""
  }, [mode, acuanValueField, sourceFields, tableFields])

  return (
    <div className="space-y-3">
      <div className="space-y-2">
        <Label>Mode Dropdown</Label>
        <SearchableSelect
          name="dropdownMode"
          value={mode}
          onValueChange={setMode}
          allowEmpty={false}
          options={[
            { label: "Static", value: "static" },
            { label: "Dinamis (DocType)", value: "dynamic" },
            { label: "Dinamis (Table Internal)", value: "dynamic-table" },
          ]}
        />
      </div>

      {mode === "static" ? (
        <div className="space-y-2">
          <Label>Pilihan Static (satu per baris: label|value)</Label>
          <textarea name="optionsText" className="border rounded p-2 w-full min-h-20 text-sm" placeholder="Contoh:\nAktif|Y\nTidak Aktif|N" defaultValue={defaults?.optionsText || ""} />
        </div>
      ) : null}

      {mode === "dynamic" ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="space-y-2">
            <Label>DocType Sumber</Label>
            <SearchableSelect
              name="sourceKey"
              value={sourceKey}
              onValueChange={setSourceKey}
              placeholder="-"
              options={docTypes.map((d) => ({ label: `${d.name} (${d.key})`, value: d.key }))}
            />
          </div>
          <div className="space-y-2">
            <Label>Label Field</Label>
            <SearchableSelect
              name="labelField"
              value={labelField}
              onValueChange={setLabelField}
              allowEmpty={false}
              options={sourceFields.map((f) => ({ label: f.label, value: f.key }))}
            />
          </div>
          <div className="space-y-2">
            <Label>Value Field</Label>
            <SearchableSelect
              name="valueField"
              value={valueField}
              onValueChange={setValueField}
              allowEmpty={false}
              options={sourceFields.map((f) => ({ label: f.label, value: f.key }))}
            />
          </div>
          <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="space-y-2">
              <Label>Field Acuan</Label>
              <SearchableSelect
                name="depFieldKey"
                value={depFieldKey}
                onValueChange={setDepFieldKey}
                placeholder="-"
                options={depFieldOptions}
              />
            </div>
            <div className="space-y-2">
              <Label>Field Sumber</Label>
              <SearchableSelect
                name="depSourceField"
                value={depSourceField || recommendedSourceField}
                onValueChange={setDepSourceField}
                placeholder="-"
                options={sourceFields.map((f) => ({ label: f.label, value: f.key }))}
              />
              <div className="text-xs text-muted-foreground">Disarankan: {acuanValueField || "id"}</div>
            </div>
          </div>
        </div>
      ) : null}

      {mode === "dynamic-table" ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="space-y-2">
            <Label>Tabel Sumber</Label>
            <SearchableSelect
              name="tableName"
              value={tableName}
              onValueChange={setTableName}
              placeholder="-"
              options={tables.map((t) => ({ label: t.name, value: t.name }))}
            />
          </div>
          <div className="space-y-2">
            <Label>Label Field</Label>
            <SearchableSelect
              name="labelField"
              value={labelField}
              onValueChange={setLabelField}
              allowEmpty={false}
              options={tableFields.map((f) => ({ label: f, value: f }))}
            />
          </div>
          <div className="space-y-2">
            <Label>Value Field</Label>
            <SearchableSelect
              name="valueField"
              value={valueField}
              onValueChange={setValueField}
              allowEmpty={false}
              options={tableFields.map((f) => ({ label: f, value: f }))}
            />
          </div>
          <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="space-y-2">
              <Label>Field Acuan</Label>
              <SearchableSelect
                name="depFieldKey"
                value={depFieldKey}
                onValueChange={setDepFieldKey}
                placeholder="-"
                options={depFieldOptions}
              />
            </div>
            <div className="space-y-2">
              <Label>Field Sumber</Label>
              <SearchableSelect
                name="depSourceField"
                value={depSourceField || recommendedSourceField}
                onValueChange={setDepSourceField}
                placeholder="-"
                options={tableFields.map((f) => ({ label: f, value: f }))}
              />
              <div className="text-xs text-muted-foreground">Disarankan: {acuanValueField || "id"}</div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}