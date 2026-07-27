"use client"

import * as React from "react"
import { ChevronsUpDown, Check, MapPin } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function TeamSwitcher({
  branches,
  selectedBranchId,
  action,
}: {
  branches: { id: string; name: string }[]
  selectedBranchId?: string
  action?: (formData: FormData) => void
}) {
  const formRef = React.useRef<HTMLFormElement>(null)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [value, setValue] = React.useState<string | undefined>(selectedBranchId)
  React.useEffect(() => { setValue(selectedBranchId) }, [selectedBranchId])
  const selectedName = React.useMemo(
    () => branches.find((b) => b.id === value)?.name ?? "Select Branch",
    [branches, value]
  )

  const content = (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton
          size="lg"
          className="bg-slate-100/80 text-slate-700 hover:bg-slate-200/80 hover:text-slate-900 data-[state=open]:bg-slate-100 data-[state=open]:text-slate-900 group-data-[collapsible=icon]:bg-transparent group-data-[collapsible=icon]:text-sidebar-foreground transition-all duration-200"
        >
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-7 h-7 rounded-md bg-slate-200/80 shrink-0">
              <MapPin className="w-3.5 h-3.5 text-slate-500" />
            </div>
            <div className="flex flex-col gap-0 leading-none">
              <span className="text-[11px] font-medium text-slate-400 group-data-[collapsible=icon]:hidden">Branch</span>
              <span className="text-[13px] font-medium group-data-[collapsible=icon]:hidden">{selectedName}</span>
            </div>
          </div>
          <ChevronsUpDown className="ml-auto w-4 h-4 text-slate-400 group-data-[collapsible=icon]:hidden" />
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[--radix-popper-anchor-width] rounded-xl border-slate-200/60 shadow-xl shadow-slate-900/5" align="start">
        {branches.map((b) => (
          <DropdownMenuItem
            key={b.id}
            onSelect={() => {
              setValue(b.id)
              if (inputRef.current) inputRef.current.value = b.id
              formRef.current?.requestSubmit()
            }}
            className="flex items-center gap-2 text-[13px] rounded-lg cursor-pointer"
          >
            <Check className={`w-3.5 h-3.5 ${b.id === value ? "text-slate-900" : "text-transparent"}`} />
            {b.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )

  if (!action) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>{content}</SidebarMenuItem>
      </SidebarMenu>
    )
  }

  return (
    <form action={action} ref={formRef}>
      <input ref={inputRef} type="hidden" name="branchId" defaultValue={selectedBranchId ?? ""} />
      <SidebarMenu>
        <SidebarMenuItem>{content}</SidebarMenuItem>
      </SidebarMenu>
    </form>
  )
}
