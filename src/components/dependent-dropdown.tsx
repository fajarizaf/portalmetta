"use client"

import * as React from "react"
import { Label } from "@/components/ui/label"
import { SearchableSelect } from "@/components/ui/select"

type Option = { label: string; value: string }
type SourceFilterItem = { dependsOn: string; field: string }
type SourceFilter = SourceFilterItem | SourceFilterItem[]

export default function DependentDropdown({
  name,
  label,
  required,
  placeholder = "-",
  defaultValue,
  options,
  source,
  branchId,
  initialDependsOnValue,
  initialDependsOnValues,
  containerId,
  disabled,
  form,
}: {
  name: string
  label: string
  required?: boolean
  placeholder?: string
  defaultValue?: string
  options?: Option[]
  source?: { mode?: string; key?: string; table?: string; labelField?: string; valueField?: string; filter?: SourceFilter }
  branchId?: string
  initialDependsOnValue?: string
  initialDependsOnValues?: Record<string, string>
  containerId?: string
  disabled?: boolean
  form?: string
}) {
  const [opts, setOpts] = React.useState<Option[]>(options ?? [])
  const [loaded, setLoaded] = React.useState<boolean>(false)
  const isRowScope = typeof name === "string" && name.startsWith("row_")
  const rowIdPrefix = React.useMemo(() => {
    if (!isRowScope) return ""
    const suf = name.slice("row_".length)
    const idx = suf.indexOf("_")
    if (idx < 0) return "row_" 
    const rid = suf.slice(0, idx)
    return `row_${rid}_`
  }, [name, isRowScope])
  const filtersArr: SourceFilterItem[] = React.useMemo(() => {
    const f = source?.filter
    if (!f) return []
    return Array.isArray(f) ? f : [f]
  }, [source])
  const [depMap, setDepMap] = React.useState<Record<string, string>>(initialDependsOnValues || {})
  const depMapRef = React.useRef<Record<string, string>>(depMap)
  React.useEffect(() => { depMapRef.current = depMap }, [depMap])

  React.useEffect(() => {
    if (filtersArr.length === 0) return
    const matchDep = (dep: string, cand: string) => {
      const a = String(dep || "").toLowerCase()
      const b = String(cand || "").toLowerCase()
      return a === b || b.endsWith(`_${a}`) || a.endsWith(`_${b}`) || b.includes(a)
    }
    const runAll = async (currentMap: Record<string, string>) => {
      try {
        const params = new URLSearchParams()
        const hasDocTypeKey = Boolean((source as Record<string, unknown>)?.["key"] || (source as Record<string, unknown>)?.["docTypeKey"] || (source as Record<string, unknown>)?.["target"])
        const mode = (source as any)?.mode || (hasDocTypeKey ? "doctype" : (source?.table ? "table" : ""))
        if (!mode) return
        if (mode === "doctype") {
          const k = (source as Record<string, unknown>)?.["key"]
            || (source as Record<string, unknown>)?.["docTypeKey"]
            || (source as Record<string, unknown>)?.["target"]
          params.set("key", String(k || ""))
        }
        if (mode === "table") params.set("table", String(source?.table || ""))
        params.set("mode", mode)
        params.set("labelField", String(source?.labelField || "name"))
        params.set("valueField", String(source?.valueField || "id"))
        if (branchId) params.set("branchId", branchId)
        
        let hasFilter = false
        for (const it of filtersArr) {
          const val = currentMap[it.dependsOn]
          if (it.field && typeof val === "string" && val) {
            params.append("depField", it.field)
            params.append("depValue", val)
            hasFilter = true
          }
        }
        
        if (!hasFilter && mode !== "static_dep") {
          setOpts(options ?? [])
          setLoaded(true)
          return
        }
        
        const res = await fetch(`/api/dynamic-options?${params.toString()}`)
        if (!res.ok) return
        const data = (await res.json()) as Option[]
        
        // Ensure current defaultValue is always available in options
        if (defaultValue && !data.some(o => o.value === defaultValue)) {
          const existing = (options ?? []).find(o => o.value === defaultValue)
          if (existing) data.unshift(existing)
        }
        
        setOpts(data)
        setLoaded(true)
      } catch (err) {
        console.error("[DependentDropdown] fetch error:", err)
      }
    }
    const mapInit: Record<string, string> = { ...depMapRef.current }
    const scopeEl = containerId ? document.getElementById(containerId) : undefined
    for (const it of filtersArr) {
      let val = ""
      if (isRowScope) {
        const selector = `input[name^="${rowIdPrefix || "row_"}"]`
        const list = scopeEl ? Array.from(scopeEl.querySelectorAll<HTMLInputElement>(selector)) : Array.from(document.querySelectorAll<HTMLInputElement>(selector))
        const found = list.find((e) => {
          const nm = e.getAttribute("name") || ""
          if (!nm.startsWith(rowIdPrefix || "row_")) return false
          const suf = nm.slice((rowIdPrefix || "row_").length)
          return matchDep(it.dependsOn, suf)
        })
        val = found?.value || ""
        if (!val) {
          const globalEl = document.querySelector<HTMLInputElement>(`input[name="${it.dependsOn}"]`)
          val = globalEl?.value || ""
        }
      } else {
        const el = scopeEl ? scopeEl.querySelector<HTMLInputElement>(`input[name="${it.dependsOn}"]`) : document.querySelector<HTMLInputElement>(`input[name="${it.dependsOn}"]`)
        val = el?.value || ""
        if (!val) {
          const el2 = scopeEl ? scopeEl.querySelector<HTMLInputElement>(`input[name$="${it.dependsOn}"]`) : document.querySelector<HTMLInputElement>(`input[name$="${it.dependsOn}"]`)
          val = el2?.value || ""
        }
      }
      if (val) mapInit[it.dependsOn] = val
    }
    if (Object.values(mapInit).some(Boolean)) {
      const changed = filtersArr.some((f) => (depMapRef.current[f.dependsOn] || "") !== (mapInit[f.dependsOn] || ""))
      if (changed) {
        setDepMap(mapInit)
        runAll(mapInit)
      } else if (!loaded) {
        runAll(mapInit)
      }
    } else if (initialDependsOnValue && !Array.isArray(source?.filter)) {
      const single = source?.filter as SourceFilterItem | undefined
      if (single?.field) runAll({ [single.dependsOn]: initialDependsOnValue })
    } else if (!loaded) {
      // If not loaded yet, try an initial fetch
      runAll(mapInit)
    }
    const handler = (e: Event) => {
      const ev = e as CustomEvent<{ name: string; value: string; containerId?: string }>
      if (!ev.detail) return
      const { name: evName, value, containerId: evContainerId } = ev.detail
      
      // If the event has a containerId, and it doesn't match ours, ignore it
      if (evContainerId && containerId && evContainerId !== containerId) return

      const scopeEl = containerId ? document.getElementById(containerId) : undefined
      const scopeHasName = scopeEl ? Boolean(scopeEl.querySelector<HTMLInputElement>(`input[name="${evName}"]`)) : true
      if (!scopeHasName) {
        // If we have a scope but the event is from outside, ignore it unless it's a row field that might belong to us
        if (!(isRowScope && (evName.startsWith(rowIdPrefix || "row_") || evName.endsWith(`_${filtersArr[0]?.dependsOn || ""}`)))) return
      }

      const it = filtersArr.find((f) => {
        // Try multiple ways to match the dependency
        if (matchDep(f.dependsOn, evName)) return true
        if (isRowScope && evName.startsWith(rowIdPrefix || "row_")) {
          const suffix = evName.slice((rowIdPrefix || "row_").length)
          if (matchDep(f.dependsOn, suffix)) return true
        }
        // Fallback for spec fields which might be row_spec_... or just spec_...
        if (evName.startsWith("row_spec_") || evName.startsWith("spec_")) {
          const suffix = evName.slice(evName.indexOf("spec_") + 5)
          if (matchDep(f.dependsOn, suffix)) return true
        }
        return false
      })

      if (it) {
        const nextVal = value || ""
        setDepMap((prev) => {
          const next = { ...prev, [it.dependsOn]: nextVal }
          runAll(next)
          return next
        })
      }
    }
    window.addEventListener("docFieldChange", handler as EventListener)
    return () => window.removeEventListener("docFieldChange", handler as EventListener)
  }, [filtersArr, source, branchId, initialDependsOnValue, isRowScope, containerId, rowIdPrefix])

  return (
    <div className="space-y-2">
      <Label>{label}{required ? " *" : ""}</Label>
      {(() => {
        const showOpts = loaded ? opts : (options ?? [])
        return <SearchableSelect name={name} placeholder={placeholder} options={showOpts} defaultValue={defaultValue} emitChangeEvent={true} disabled={disabled} required={required} containerId={containerId} form={form} />
      })()}
    </div>
  )
}
