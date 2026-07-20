"use client"
import * as React from "react"
import { useSearchParams, useRouter } from "next/navigation"

export function ToastHost() {
  const sp = useSearchParams()
  const router = useRouter()
  const [visible, setVisible] = React.useState(false)
  const [message, setMessage] = React.useState("")
  const [variant, setVariant] = React.useState<"success" | "error">("success")

  React.useEffect(() => {
    const t = sp.get("toast")
    const ty = sp.get("toastType")
    if (t) {
      setMessage(t)
      setVariant(ty === "error" ? "error" : "success")
      setVisible(true)
      const id = setTimeout(() => {
        setVisible(false)
        const next = new URLSearchParams(sp.toString())
        next.delete("toast")
        next.delete("toastType")
        const url = `${window.location.pathname}${next.size ? `?${next.toString()}` : ""}`
        router.replace(url, { scroll: false })
      }, 3000)
      return () => clearTimeout(id)
    }
  }, [sp, router])

  if (!visible) return null

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className={`rounded-md shadow-lg px-4 py-3 text-sm text-white ${variant === "success" ? "bg-green-600" : "bg-red-600"}`}>
        {message}
      </div>
    </div>
  )
}