"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SearchableSelect } from "@/components/ui/select"

type Spec = {
  targetField?: string
  childDocTypeKey?: string
  qtyKey?: string
  nrcKey?: string
  mrcKey?: string
  formula?: string
}

export default function ComputeSpecsEditor({ initialSpecs, fields, docTypes }: { initialSpecs: Spec[]; fields: Array<{ key: string; label: string }>; docTypes: Array<{ key: string; name: string }> }) {
  const [specs, setSpecs] = useState<Spec[]>(initialSpecs.length > 0 ? initialSpecs : [{ targetField: "", childDocTypeKey: "", qtyKey: "qty", nrcKey: "nrc", mrcKey: "mrc", formula: "" }])

  const addSpec = () => {
    setSpecs((prev) => [...prev, { targetField: "", childDocTypeKey: "", qtyKey: "qty", nrcKey: "nrc", mrcKey: "mrc", formula: "" }])
  }

  const removeSpec = (idx: number) => {
    setSpecs((prev) => prev.filter((_, i) => i !== idx))
  }

  return (
    <div className="space-y-4">
      {specs.map((s, i) => (
        <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-3 border rounded p-3">
          <div className="space-y-2">
            <Label>Target Field (header)</Label>
            <SearchableSelect name={`compute_spec_${i}_targetField`} placeholder="Pilih field total di header" defaultValue={String(s.targetField ?? "")} options={fields.map((f) => ({ label: `${f.label} (${f.key})`, value: f.key }))} />
          </div>
          <div className="space-y-2">
            <Label>Child DocType (rows)</Label>
            <SearchableSelect name={`compute_spec_${i}_childDocTypeKey`} placeholder="Pilih DocType anak" defaultValue={String(s.childDocTypeKey ?? "")} options={docTypes.map((d) => ({ label: `${d.name} (${d.key})`, value: d.key }))} />
          </div>
          <div className="space-y-2">
            <Label>Key Qty (row)</Label>
            <Input name={`compute_spec_${i}_qtyKey`} defaultValue={String(s.qtyKey ?? "qty")} />
          </div>
          <div className="space-y-2">
            <Label>Key NRC (row)</Label>
            <Input name={`compute_spec_${i}_nrcKey`} defaultValue={String(s.nrcKey ?? "nrc")} />
          </div>
          <div className="space-y-2">
            <Label>Key MRC (row)</Label>
            <Input name={`compute_spec_${i}_mrcKey`} defaultValue={String(s.mrcKey ?? "mrc")} />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label>Formula (opsional)</Label>
            <Input name={`compute_spec_${i}_formula`} defaultValue={String(s.formula ?? "")} />
            <div className="text-xs text-muted-foreground">Gunakan key row, operator + - * / ^ dan fungsi Math: round, floor, ceil, min, max.</div>
          </div>
          <div className="md:col-span-2">
            <Button type="button" variant="secondary" onClick={() => removeSpec(i)}>Hapus spesifikasi</Button>
          </div>
        </div>
      ))}
      <div>
        <Button type="button" onClick={addSpec}>Tambah Spesifikasi</Button>
      </div>
    </div>
  )
}