"use client"
import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Home, Settings, Building2, Users, FileText, Folder, LayoutGrid, Package, QrCode, type LucideIcon } from "lucide-react"
import { IconDisplay } from "@/components/icon-display"
import { TeamSwitcher } from "@/components/team-switcher"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {
  company?: { logoUrl?: string | null; name?: string | null } | null
  branches?: { id: string; name: string }[]
  selectedBranchId?: string
  setBranchFilter?: (formData: FormData) => void
  canManageCompanies?: boolean
  canManageCustomers?: boolean
  canManageDoctypes?: boolean
  canManageDocuments?: boolean
  showSettings?: boolean
  canManageVisits?: boolean
  roleName?: string
  docTypes?: { key: string; name: string; icon?: string | null }[]
}

export function AppSidebar({
  company,
  branches,
  selectedBranchId,
  setBranchFilter,
  canManageCompanies,
  canManageCustomers,
  canManageDoctypes,
  canManageDocuments,
  showSettings = false,
  canManageVisits = false,
  roleName,
  docTypes,
  ...props
}: AppSidebarProps) {
  const pathname = usePathname()
  const list = React.useMemo(() => branches ?? [], [branches])
  const groups: { title: string; items: { title: string; href: string; icon?: LucideIcon; iconName?: string | null }[] }[] = [
    {
      title: "Main",
      items: [
        { title: "Dashboard", href: "/admin", icon: Home },
        { title: "Rack Mapping", href: "/admin/rack-mapping", icon: LayoutGrid },
        { title: "Inventory", href: "/admin/inventory/management", icon: Package },
        ...(canManageVisits ? [{ title: "Visits", href: "/admin/visits", icon: QrCode }] : []),
        ...(showSettings ? [{ title: "Settings", href: "/admin/settings", icon: Settings }] : []),
      ],
    },
    {
      title: "Documents",
      items: (docTypes || []).map((dt) => ({
        title: dt.name,
        href: `/admin/docs/${dt.key}`,
        iconName: dt.icon,
      })),
    },
    {
      title: "Management",
      items: [
        ...(canManageCompanies ? [{ title: "Companies", href: "/admin/companies", icon: Building2 }] : []),
        ...(canManageCustomers ? [{ title: "Customers", href: "/admin/customers", icon: Users }] : []),
        ...(showSettings ? [{ title: "Products", href: "/admin/products", icon: Package }] : []),
        ...(canManageDoctypes ? [{ title: "DocTypes", href: "/admin/doctypes", icon: FileText }] : []),
        ...(canManageDocuments && roleName === "Admin" ? [{ title: "All Documents", href: "/admin/docs", icon: Folder }] : []),
      ],
    },
  ].filter((g) => g.items.length > 0)

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="border-b border-slate-100 pb-3">
        {company?.logoUrl ? (
          <div className="flex items-center px-2 py-1">
            <Image src={company.logoUrl} alt={company?.name || "Company"} width={240} height={96} className="h-10 w-auto rounded-md object-contain" />
          </div>
        ) : null}
        <TeamSwitcher branches={list} selectedBranchId={selectedBranchId} action={setBranchFilter} />
      </SidebarHeader>
      <SidebarContent className="gap-1 px-2 py-2">
        {groups.map((group) => (
          <Collapsible key={group.title} title={group.title} defaultOpen className="group/collapsible">
            <SidebarGroup className="p-0">
              <SidebarGroupLabel asChild className="group/label text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-2 py-2 h-auto hover:bg-transparent hover:text-slate-400">
                <CollapsibleTrigger>
                  {group.title}
                  <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90 w-3 h-3" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu className="gap-0.5">
                    {group.items.map((it) => {
                      const isActive = pathname === it.href || (it.href !== "/admin" && pathname.startsWith(it.href))
                      return (
                        <SidebarMenuItem key={it.title}>
                          <SidebarMenuButton
                            asChild
                            className={cn(
                              "h-9 px-3 rounded-lg text-[13px] font-medium transition-all duration-200",
                              isActive
                                ? "bg-slate-900 text-white shadow-sm"
                                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                            )}
                          >
                            <Link href={it.href}>
                              {it.icon ? <it.icon className={cn("w-4 h-4", isActive && "text-white")} /> : (it.iconName ? <IconDisplay name={it.iconName} /> : null)}
                              <span>{it.title}</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      )
                    })}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        ))}
      </SidebarContent>
    </Sidebar>
  )
}
