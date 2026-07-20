"use client"
import * as React from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { SearchableSelect } from "@/components/ui/select"

export default function PriceConfigBuilder({
  initialModel,
  initialConfig,
  modelName = "pricingModel",
  name = "config",
}: {
  initialModel?: "FIXED" | "DISCOUNT" | "TIERED"
  initialConfig?: { discountPercent?: number; tiers?: Array<{ upTo: number; price: number }>; mrcPeriod?: "MONTHLY" | "YEARLY"; nrcPeriod?: "HOUR" | "DAY" | "MONTH" | "YEAR" }
  modelName?: string
  name?: string
}) {
  const [model, setModel] = React.useState<"FIXED" | "DISCOUNT" | "TIERED">(initialModel ?? "FIXED")
  const [discountPercent, setDiscountPercent] = React.useState<number>(() => Number(initialConfig?.discountPercent ?? 0))
  const [tiers, setTiers] = React.useState<Array<{ upTo: number; price: number }>>(() => {
    const arr = initialConfig?.tiers
    return Array.isArray(arr)
      ? arr.map((t: { upTo: unknown; price: unknown }) => ({ upTo: Number(t.upTo ?? 0), price: Number(t.price ?? 0) }))
      : []
  })
  const [mrcPeriod, setMrcPeriod] = React.useState<"MONTHLY" | "YEARLY">(() => (initialConfig?.mrcPeriod === "YEARLY" ? "YEARLY" : "MONTHLY"))
  const [nrcPeriod, setNrcPeriod] = React.useState<"HOUR" | "DAY" | "MONTH" | "YEAR">(() => (initialConfig?.nrcPeriod === "HOUR" || initialConfig?.nrcPeriod === "MONTH" || initialConfig?.nrcPeriod === "YEAR" ? initialConfig.nrcPeriod : "DAY"))

  const addTier = () => setTiers((prev) => [...prev, { upTo: 0, price: 0 }])
  const removeTier = (idx: number) => setTiers((prev) => prev.filter((_, i) => i !== idx))
  const updateTier = (idx: number, patch: Partial<{ upTo: number; price: number }>) => setTiers((prev) => prev.map((t, i) => (i === idx ? { ...t, ...patch } : t)))

  const configString = React.useMemo(() => {
    const base: { mrcPeriod: "MONTHLY" | "YEARLY"; nrcPeriod: "HOUR" | "DAY" | "MONTH" | "YEAR"; discountPercent?: number; tiers?: Array<{ upTo: number; price: number }> } = { mrcPeriod, nrcPeriod }
    if (model === "DISCOUNT") {
      base.discountPercent = Number(discountPercent || 0)
    }
    if (model === "TIERED") {
      base.tiers = tiers.map((t) => ({ upTo: Number(t.upTo || 0), price: Number(t.price || 0) }))
    }
    return JSON.stringify(base)
  }, [model, discountPercent, tiers, mrcPeriod, nrcPeriod])

  return (
    <div className="space-y-3">
      <div className="space-y-2">
        <Label>NRC Period</Label>
        <SearchableSelect
          value={nrcPeriod}
          onValueChange={(v) => setNrcPeriod(v as "HOUR" | "DAY" | "MONTH" | "YEAR")}
          allowEmpty={false}
          options={[
            { label: "Per Hour", value: "HOUR" },
            { label: "Per Day", value: "DAY" },
            { label: "Per Month", value: "MONTH" },
            { label: "Per Year", value: "YEAR" },
          ]}
        />
      </div>

      <div className="space-y-2">
        <Label>Pricing Model</Label>
        <SearchableSelect
          value={model}
          onValueChange={(v) => setModel(v as "FIXED" | "DISCOUNT" | "TIERED")}
          allowEmpty={false}
          options={[
            { label: "Fixed", value: "FIXED" },
            { label: "Discount", value: "DISCOUNT" },
            { label: "Tiered", value: "TIERED" },
          ]}
        />
      </div>

      <div className="space-y-2">
        <Label>MRC Period</Label>
        <SearchableSelect
          value={mrcPeriod}
          onValueChange={(v) => setMrcPeriod(v as "MONTHLY" | "YEARLY")}
          allowEmpty={false}
          options={[
            { label: "Monthly", value: "MONTHLY" },
            { label: "Yearly", value: "YEARLY" },
          ]}
        />
      </div>

      {model === "DISCOUNT" && (
        <div className="space-y-2">
          <Label>Discount Percent</Label>
          <Input type="number" value={discountPercent} onChange={(e) => setDiscountPercent(Number(e.target.value || 0))} />
        </div>
      )}

      {model === "TIERED" && (
        <div className="space-y-2">
          <Label>Tiers</Label>
          <div className="space-y-2">
            {tiers.map((t, i) => (
              <div key={i} className="grid grid-cols-5 gap-2">
                <div>
                  <Input type="number" value={t.upTo} onChange={(e) => updateTier(i, { upTo: Number(e.target.value || 0) })} placeholder="Up to" />
                </div>
                <div>
                  <Input type="number" value={t.price} onChange={(e) => updateTier(i, { price: Number(e.target.value || 0) })} placeholder="Price" />
                </div>
                <div>
                  <Button type="button" variant="destructive" onClick={() => removeTier(i)}>Hapus</Button>
                </div>
              </div>
            ))}
            <Button type="button" onClick={addTier}>Tambah Tier</Button>
          </div>
        </div>
      )}

      <input type="hidden" name={modelName} value={model} />
      <input type="hidden" name={name} value={configString} />
    </div>
  )
}