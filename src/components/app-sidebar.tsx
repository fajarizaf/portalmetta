"use client"
import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Home, Settings, Building2, Users, FileText, Folder, LayoutGrid, Package, type LucideIcon } from "lucide-react"
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
  SidebarRail,
} from "@/components/ui/sidebar"

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
  roleName,
  docTypes,
  ...props
}: AppSidebarProps) {
  const list = React.useMemo(() => branches ?? [], [branches])
  const groups: { title: string; items: { title: string; href: string; icon?: LucideIcon; iconName?: string | null }[] }[] = [
    {
      title: "Main",
      items: [
        { title: "Dashboard", href: "/admin", icon: Home },
        { title: "Rack Mapping", href: "/admin/rack-mapping", icon: LayoutGrid },
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
      <SidebarHeader>
        {company?.logoUrl ? (
          <div className="flex items-center justify-start">
            <Image src={company.logoUrl} alt={company?.name || "Company"} width={240} height={96} className="h-12 w-auto rounded-md object-contain" />
          </div>
        ) : null}
        <TeamSwitcher branches={list} selectedBranchId={selectedBranchId} action={setBranchFilter} />
      </SidebarHeader>
      <SidebarContent className="gap-0">
        {groups.map((group) => (
          <Collapsible key={group.title} title={group.title} defaultOpen className="group/collapsible">
            <SidebarGroup>
              <SidebarGroupLabel asChild className="group/label text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sm">
                <CollapsibleTrigger>
                  {group.title} <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {group.items.map((it) => (
                      <SidebarMenuItem key={it.title}>
                        <SidebarMenuButton asChild>
                          <Link href={it.href}>
                            {it.icon ? <it.icon /> : (it.iconName ? <IconDisplay name={it.iconName} /> : null)}
                            <span>{it.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
