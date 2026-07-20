"use client"
import * as React from "react"
import { usePathname, useSearchParams } from "next/navigation"

export function NavigationLoadingOverlay() {
  const pathname = usePathname()
  const sp = useSearchParams()
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const t = e.target as Element | null
      const a = t?.closest ? (t.closest("a") as HTMLAnchorElement | null) : null
      if (!a) return
      const href = a.getAttribute("href") ?? ""
      if (!href) return
      if (a.target === "_blank") return
      if (href.startsWith("#")) return
      try {
        const url = new URL(href, window.location.origin)
        if (url.origin === window.location.origin) {
          setLoading(true)
        }
      } catch {}
    }
    const onSubmit = () => {
      setLoading(true)
    }
    document.addEventListener("click", onClick, true)
    document.addEventListener("submit", onSubmit, true)
    return () => {
      document.removeEventListener("click", onClick, true)
      document.removeEventListener("submit", onSubmit, true)
    }
  }, [])

  React.useEffect(() => {
    setLoading(false)
  }, [pathname, sp])

  if (!loading) return null

  return (
    <div className="absolute inset-0 z-40">
      <div className="absolute inset-0 bg-white/60 dark:bg-black/40 backdrop-blur-sm" />
      <div className="absolute inset-0 grid place-items-center">
        <div className="animate-spin rounded-full border-2 border-muted-foreground border-t-transparent h-8 w-8" />
      </div>
    </div>
  )
}