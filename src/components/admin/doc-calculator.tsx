"use client"

import * as React from "react"

interface FormulaField {
  key: string
  formula: string
}

interface DocCalculatorProps {
  fields: FormulaField[]
}

export function DocCalculator({ fields }: DocCalculatorProps) {
  React.useEffect(() => {
    const runCalculations = (form: HTMLFormElement) => {
      // Determine if we are in a row form (prefixed with row_)
      const isRow = Array.from(form.elements).some(el => (el as HTMLInputElement).name?.startsWith("row_"))
      const prefix = isRow ? "row_" : ""

      const getVal = (key: string): number => {
        // Try with prefix first, then without
        let el = form.elements.namedItem(`${prefix}${key}`) as HTMLInputElement
        if (!el && prefix) el = form.elements.namedItem(key) as HTMLInputElement
        
        if (!el) return 0
        let val = el.value || "0"
        
        // Handle IDR format
        val = val.replace(/Rp\.?\s*/i, "")
        val = val.replace(/IDR\s*/i, "")
        val = val.replace(/\./g, "")
        val = val.replace(/,/g, ".")
        
        const n = parseFloat(val)
        return isNaN(n) ? 0 : n
      }

      const setVal = (key: string, val: number) => {
        let el = form.elements.namedItem(`${prefix}${key}`) as HTMLInputElement
        if (!el && prefix) el = form.elements.namedItem(key) as HTMLInputElement
        
        if (!el) return
        
        // If it's a price-like field, format it
        const name = String(el.name || "").toLowerCase()
        const isPrice = name.includes("total") || name.includes("nrc") || name.includes("mrc") || name.includes("price")
        
        const newVal = isPrice 
          ? new Intl.NumberFormat("id-ID", { 
              style: "currency", 
              currency: "IDR", 
              currencyDisplay: "code", 
              minimumFractionDigits: 0, 
              maximumFractionDigits: 0 
            }).format(val)
          : val.toString()

        if (el.value !== newVal) {
          el.value = newVal
          // Trigger a change event so other listeners know
          el.dispatchEvent(new Event("change", { bubbles: true }))
        }
      }

      fields.forEach((f) => {
        try {
          const allowedFns = new Set(["round", "floor", "ceil", "min", "max"])
          let expr = f.formula.replace(/\^/g, "**")
          expr = expr.replace(/\b([A-Za-z_][A-Za-z0-9_]*)\b/g, (m) => {
            if (allowedFns.has(m)) return `Math.${m}`
            return `getVal("${m}")`
          })

          // eslint-disable-next-line no-new-func
          const fn = new Function("getVal", "Math", `return (${expr})`)
          const result = fn(getVal, Math)
          
          if (typeof result === "number" && isFinite(result)) {
            setVal(f.key, result)
          }
        } catch (err) {
          // Ignore
        }
      })
    }

    const handleInput = (e: Event) => {
      const target = e.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      if (target && target.form) {
        runCalculations(target.form)
      }
    }

    // Run initial calculation if form exists
    const forms = document.querySelectorAll("form")
    forms.forEach(f => runCalculations(f))

    document.addEventListener("input", handleInput)
    return () => document.removeEventListener("input", handleInput)
  }, [fields])

  return null
}
