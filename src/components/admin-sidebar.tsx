"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarRail,
} from "@/components/ui/sidebar";

export function AdminSidebar({
  company,
  branches,
  selectedBranchId,
  setBranchFilter,
  canManageCompanies,
  canManageCustomers,
}: {
  company?: { logoUrl?: string | null; name?: string | null } | null;
  branches: { id: string; name: string }[];
  selectedBranchId?: string;
  setBranchFilter: (formData: FormData) => void;
  canManageCompanies: boolean;
  canManageCustomers: boolean;
}) {
  return (
    <Sidebar collapsible="offcanvas" variant="sidebar" side="left">
      <SidebarRail />
      <SidebarHeader>
        {company?.logoUrl ? (
          <div className="flex items-center justify-start px-2">
            <Image src={company.logoUrl} alt={company?.name || "Company"} width={240} height={96} className="h-12 w-auto rounded-md object-contain" />
          </div>
        ) : null}
      </SidebarHeader>
      <SidebarContent>
        

        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/admin">Dashboard</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/admin/settings">Settings</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            {canManageCompanies ? (
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/admin/companies">Companies</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ) : null}
            {canManageCustomers ? (
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/admin/customers">Customers</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ) : null}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}