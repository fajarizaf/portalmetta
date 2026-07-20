"use client"

import * as React from "react"
import { ChevronsUpDown } from "lucide-react"

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
          className="bg-[#efefef] text-[#333] hover:bg-[#e5e5e5] hover:text-[#333] data-[state=open]:bg-[#efefef] data-[state=open]:text-[#333] group-data-[collapsible=icon]:bg-transparent group-data-[collapsible=icon]:text-sidebar-foreground"
        >
          <div className="flex flex-col gap-0.5 leading-none">
            <span className="">{selectedName}</span>
          </div>
          <ChevronsUpDown className="ml-auto" />
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[--radix-popper-anchor-width]" align="start">
        {branches.map((b) => (
          <DropdownMenuItem
            key={b.id}
            onSelect={() => {
              setValue(b.id)
              if (inputRef.current) inputRef.current.value = b.id
              formRef.current?.requestSubmit()
            }}
          >
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
