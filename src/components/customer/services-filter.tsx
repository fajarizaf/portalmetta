"use client"

import { useRouter, usePathname } from "next/navigation"
import { Search } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

type FilterTab = "all" | "active" | "deactive" | "expired"

export function ServicesFilter({
  activeTab,
  searchQuery,
}: {
  activeTab: FilterTab
  searchQuery: string
}) {
  const router = useRouter()
  const pathname = usePathname()

  const navigate = (tab: string, q: string) => {
    const params = new URLSearchParams()
    if (tab !== "all") params.set("tab", tab)
    if (q) params.set("q", q)
    const href = params.toString() ? `${pathname}?${params.toString()}` : pathname
    router.push(href)
  }

  const handleSearch = (value: string) => {
    navigate(activeTab, value)
  }

  const handleTabChange = (value: string) => {
    navigate(value, searchQuery)
  }

  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
        <input
          type="text"
          placeholder="Cari layanan..."
          defaultValue={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="pl-9 pr-3 h-9 w-48 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-300 focus:bg-white transition-all placeholder:text-slate-400"
        />
      </div>
      <Tabs defaultValue="all" value={activeTab} onValueChange={handleTabChange} className="hidden sm:block">
        <TabsList className="h-9 text-xs">
          <TabsTrigger value="all" className="text-xs px-3 py-1.5">Semua</TabsTrigger>
          <TabsTrigger value="active" className="text-xs px-3 py-1.5">Aktif</TabsTrigger>
          <TabsTrigger value="deactive" className="text-xs px-3 py-1.5">Non-Aktif</TabsTrigger>
          <TabsTrigger value="expired" className="text-xs px-3 py-1.5">Berakhir</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  )
}
