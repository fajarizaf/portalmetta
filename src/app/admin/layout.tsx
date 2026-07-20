import { Button } from "@/components/ui/button";
import { Bell, LifeBuoy, LayoutGrid } from "lucide-react";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { AdminBreadcrumbs } from "@/components/admin-breadcrumbs";
import { UserMenu } from "@/components/user-menu";
import { ToastHost } from "@/components/toast";
import { NavigationLoadingOverlay } from "@/components/navigation-loading";

async function setBranchFilter(formData: FormData) {
  "use server";
  const branchId = String(formData.get("branchId") || "");
  if (!branchId) return;
  const store = await cookies();
  store.set("branchId", branchId, { path: "/" });
  const referer = (await headers()).get("referer") || "/admin";
  redirect(referer);
}

async function clearImpersonation() {
  "use server";
  const store = await cookies();
  store.delete("impersonateUserId");
}

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email ?? "";
  const me = email
    ? await prisma.user.findUnique({ where: { email }, select: { id: true, name: true, companyId: true, role: { select: { id: true, name: true, permissions: { include: { permission: true } } } } } })
    : null;
  const perm = new Set(me?.role?.permissions?.map((rp) => rp.permission.key) ?? []);
  const isSuper = perm.has("COMPANY_MANAGEMENT");
  const cookieStore = await cookies();
  const assignedBranches = await prisma.branch.findMany({ where: { admins: { some: { userId: me?.id ?? "" } } }, orderBy: { name: "asc" } });
  
  // Strict check: Only show super branches if user has COMPANY_MANAGEMENT (Super Admin/Admin)
  // For others (like Sales, Security), ONLY show assignedBranches.
  // Note: Some roles like Operational Manager might have COMPANY_MANAGEMENT but should only see assigned branches?
  // Let's refine: "isSuper" logic seems to rely on COMPANY_MANAGEMENT. 
  // If user is Admin (role: Admin), they usually have COMPANY_MANAGEMENT.
  // If user is Sales, they might have COMPANY_MANAGEMENT too? Let's check.
  // Based on previous logs: Sales has ADMIN_PANEL_ACCESS, COMPANY_MANAGEMENT, CUSTOMER_MANAGEMENT.
  // So Sales is considered "isSuper" by this logic, which means they see all branches in company.
  // BUT the requirement is: "admin di asign ke branch mana saja berarti akan nampil list branch nya".
  // This implies we should prioritize assigned branches if they exist, OR only show assigned branches if not truly a "Super Admin" who needs to see everything.
  
  // If the requirement is strict "only assigned branches", then we should ignore superBranches unless assignedBranches is empty OR we want to explicitely allow Company Managers to see all.
  // However, "Sales" role having "COMPANY_MANAGEMENT" seems to be why they see all branches.
  // If we want to restrict Sales to only assigned branches, we need to know if they are *supposed* to manage the whole company or just their branches.
  
  // Assuming the user wants strict assignment-based visibility for "Admin" (which might refer to branch admins):
  // Let's change logic: Always use assignedBranches. Only fall back to company-wide branches if assignedBranches is empty AND user is Super Admin.
  // OR: If assignedBranches > 0, ONLY show those.
  
  const useStrictAssigned = assignedBranches.length > 0 && !isSuper;
  
  const superBranches = isSuper
    ? await prisma.branch.findMany({
        where: {
          OR: [
            { companyId: me?.companyId ?? undefined },
            { company: { parentId: me?.companyId ?? undefined } },
          ],
        },
        orderBy: { name: "asc" },
      })
    : [];
    
  const baseBranches = useStrictAssigned
      ? assignedBranches
      : (superBranches.length > 0 ? superBranches : await prisma.branch.findMany({ where: { companyId: me?.companyId ?? undefined }, orderBy: { name: "asc" } }));
      
  const branchesMap = new Map<string, { id: string; name: string }>();
  for (const b of baseBranches) branchesMap.set(b.id, { id: b.id, name: b.name });
  // Ensure assigned are always there (redundant if baseBranches is assigned, but safe)
  for (const b of assignedBranches) branchesMap.set(b.id, { id: b.id, name: b.name });
  
  const branches = Array.from(branchesMap.values());
  const cookieBranchId = cookieStore.get("branchId")?.value;
  const isImpersonating = Boolean(cookieStore.get("impersonateUserId")?.value);
  const candidateBranchId = cookieBranchId ?? branches[0]?.id;
  const allowedBranchIds = new Set(branches.map((b) => b.id));
  const selectedBranchId = allowedBranchIds.has(String(candidateBranchId)) ? candidateBranchId : branches[0]?.id;
  const company = me?.companyId ? await prisma.company.findUnique({ where: { id: me.companyId }, select: { logoUrl: true, name: true } }) : null;
  const docTypesAll = await prisma.docType.findMany({ select: { id: true, key: true, name: true, branchId: true, config: true, icon: true, permissions: { where: { roleId: me?.role?.id } } } })
  
  const childDocTypeKeys = new Set<string>()
  for (const dt of docTypesAll) {
    const cfg = (dt.config ?? {}) as unknown as { childDocTypeKey?: string; childDocTypes?: Record<string, string> }
    if (cfg.childDocTypeKey) childDocTypeKeys.add(cfg.childDocTypeKey)
    if (cfg.childDocTypes) {
      for (const k of Object.values(cfg.childDocTypes)) {
        if (typeof k === "string") childDocTypeKeys.add(k)
      }
    }
  }

  const navDocTypes = docTypesAll
    .filter((dt) => {
      // Branch filter
      if (dt.branchId && dt.branchId !== selectedBranchId) return false
      
      // Child filter logic
      // By default we hide child doctypes to avoid clutter (e.g. sales_order_item)
      // However, some child doctypes are actually standalone documents linked to a parent (e.g. sales_order linked to request)
      // We should only hide "Item" or "Detail" tables, usually identified by ending with "_item" or "_detail" or "_row"
      // Or we can rely on childDocTypeKeys but make an exception if the DocType seems to be a main document.
      // Current implementation of childDocTypeKeys collects ALL child doctypes.
      // Let's refine: if it's in childDocTypeKeys AND key ends with "_item", hide it.
      // Otherwise, show it (e.g. sales_order).
      if (childDocTypeKeys.has(dt.key)) {
        if (dt.key.endsWith("_item") || dt.key.endsWith("_row") || dt.key.endsWith("_detail") || dt.key === "rack_patch_panel" || dt.key === "rack_hardware" || dt.key === "cross_connect") {
          return false
        }
      }
      
      // Permission filter
      if (dt.key === "support_ticket") return false
      
      const p = dt.permissions[0]
      const hasGlobalAccess = perm.has("DOCUMENTS_MANAGEMENT") || perm.has("ADMIN_PANEL_ACCESS")
      
      return (p && p.canRead) || hasGlobalAccess
    })
    .sort((a, b) => a.name.localeCompare(b.name))

  console.log("[AdminLayout] Total DocTypes:", docTypesAll.length)
  console.log("[AdminLayout] Child Keys:", Array.from(childDocTypeKeys))
  console.log("[AdminLayout] Nav DocTypes:", navDocTypes.map(d => d.key))

  const notifyEnabledIds = docTypesAll.filter((dt) => {
    const cfg = (dt.config ?? {}) as unknown as { notifyConfig?: { adminEnabled?: boolean } }
    return Boolean(cfg.notifyConfig?.adminEnabled)
  }).map((dt) => dt.id)
  const notifyDocTypes = new Map(docTypesAll.filter((dt) => notifyEnabledIds.includes(dt.id)).map((dt) => [dt.id, dt]))
  const recentRecords = notifyEnabledIds.length > 0 ? await prisma.docRecord.findMany({ where: { docTypeId: { in: notifyEnabledIds }, ...(selectedBranchId ? { branchId: selectedBranchId } : {}) }, orderBy: { updatedAt: "desc" }, take: 20 }) : []
  const notifItems = recentRecords.flatMap((r) => {
    const d = (r.data ?? {}) as Record<string, unknown>
    const acts = Array.isArray(d["__activity"]) ? (d["__activity"] as Array<{ at: string; text: string }>) : []
    const lastStatus = acts.filter((a) => a.text.startsWith("Status diubah:"))
    const a = lastStatus.length > 0 ? lastStatus[lastStatus.length - 1] : null
    return a ? [{ at: a.at, text: a.text, recordId: r.id, docTypeId: r.docTypeId }] : []
  })

  return (
    <SidebarProvider>
      <AppSidebar
        company={company}
        branches={branches}
        selectedBranchId={selectedBranchId}
        setBranchFilter={setBranchFilter}
        canManageCompanies={perm.has("COMPANY_MANAGEMENT")}
        canManageCustomers={perm.has("CUSTOMER_MANAGEMENT")}
        canManageDoctypes={perm.has("DOCTYPE_MANAGEMENT")}
        canManageDocuments={perm.has("DOCUMENTS_MANAGEMENT")}
        showSettings={perm.has("ADMIN_PANEL_ACCESS")}
        roleName={me?.role?.name}
        docTypes={navDocTypes}
      />
      <SidebarInset>
        <NavigationLoadingOverlay />
        <header className="bg-background sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <div className="flex items-center gap-2">
            <SidebarTrigger />
            <AdminBreadcrumbs />
          </div>
          <div className="ml-auto flex items-center gap-4">
            {isImpersonating ? (
              <form action={clearImpersonation}>
                <Button variant="outline">Kembali ke Super Admin</Button>
              </form>
            ) : null}
            <Button asChild variant="ghost" className="relative gap-2" title="Rack Management">
              <Link href="/admin/rack-mapping">
                <LayoutGrid className="size-5" />
                <span className="text-sm font-medium">Rack Management</span>
              </Link>
            </Button>
            <Button asChild variant="ghost" className="relative gap-2" title="Support Ticket">
              <Link href="/admin/docs/support_ticket">
                <LifeBuoy className="size-5" />
                <span className="text-sm font-medium">Support Ticket</span>
              </Link>
            </Button>
            <details className="relative">
              <summary className="cursor-pointer relative flex items-center" aria-label={`Notifikasi (${notifItems.length})`}>
                <Bell className="size-5" />
                {notifItems.length > 0 ? (
                  <span className="absolute -top-1 -right-1 inline-flex items-center justify-center rounded-full bg-destructive text-destructive-foreground text-[10px] min-w-5 h-5 px-1 font-medium">
                    {notifItems.length}
                  </span>
                ) : null}
              </summary>
              <div className="absolute right-0 mt-2 w-80 border bg-background rounded shadow">
                <div className="max-h-80 overflow-auto">
                  {notifItems.length === 0 ? (
                    <div className="p-3 text-xs text-muted-foreground">Tidak ada notifikasi</div>
                  ) : (
                    notifItems.map((n, i) => {
                      const dt = notifyDocTypes.get(n.docTypeId)
                      const dtLabel = dt?.name ?? "Dokumen"
                      const path = dt?.key ? `/admin/docs/${dt.key}/${n.recordId}` : "#"
                      return (
                        <a key={i} href={path} className="block p-3 hover:bg-muted text-sm">
                          <div className="font-medium">{dtLabel}</div>
                          <div className="text-xs text-muted-foreground">{n.text}</div>
                        </a>
                      )
                    })
                  )}
                </div>
              </div>
            </details>
            <UserMenu name={me?.name || email} email={email} roleName={me?.role?.name || ""} imageUrl={session?.user?.image ?? undefined} />
          </div>
        </header>
        <main className="p-4">
          <ToastHost />
          
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
