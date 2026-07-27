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
      if (dt.branchId && dt.branchId !== selectedBranchId) return false
      if (childDocTypeKeys.has(dt.key)) {
        if (dt.key.endsWith("_item") || dt.key.endsWith("_row") || dt.key.endsWith("_detail") || dt.key === "rack_patch_panel" || dt.key === "rack_hardware" || dt.key === "cross_connect") {
          return false
        }
      }
      if (dt.key === "support_ticket") return false
      const p = dt.permissions[0]
      const hasGlobalAccess = perm.has("DOCUMENTS_MANAGEMENT") || perm.has("ADMIN_PANEL_ACCESS")
      return (p && p.canRead) || hasGlobalAccess
    })
    .sort((a, b) => a.name.localeCompare(b.name))

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

        {/* Premium Header */}
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/60">
          <div className="flex h-14 items-center gap-3 px-4">
            <div className="flex items-center gap-3">
              <SidebarTrigger className="text-slate-500 hover:text-slate-900 hover:bg-slate-100/80 transition-colors -ml-1" />
              <div className="w-px h-5 bg-slate-200" />
              <AdminBreadcrumbs />
            </div>

            <div className="ml-auto flex items-center gap-1.5">
              {isImpersonating ? (
                <form action={clearImpersonation}>
                  <Button variant="outline" size="sm" className="h-8 text-xs font-medium border-slate-200 text-slate-600 hover:bg-slate-50">
                    Kembali ke Super Admin
                  </Button>
                </form>
              ) : null}

              <Link
                href="/admin/rack-mapping"
                className="flex items-center gap-2 px-3 py-2 text-[13px] font-medium text-slate-500 hover:text-slate-900 hover:bg-slate-100/80 rounded-lg transition-all"
              >
                <LayoutGrid className="w-4 h-4" />
                <span className="hidden sm:inline">Rack</span>
              </Link>

              <Link
                href="/admin/docs/support_ticket"
                className="flex items-center gap-2 px-3 py-2 text-[13px] font-medium text-slate-500 hover:text-slate-900 hover:bg-slate-100/80 rounded-lg transition-all"
              >
                <LifeBuoy className="w-4 h-4" />
                <span className="hidden sm:inline">Support</span>
              </Link>

              <div className="w-px h-5 bg-slate-200 mx-1" />

              {/* Notification Bell */}
              <div className="relative group">
                <button className="relative flex items-center justify-center w-9 h-9 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100/80 transition-all">
                  <Bell className="w-4 h-4" />
                  {notifItems.length > 0 ? (
                    <span className="absolute -top-0.5 -right-0.5 inline-flex items-center justify-center rounded-full bg-red-500 text-white text-[10px] min-w-[18px] h-[18px] px-1 font-semibold ring-2 ring-white">
                      {notifItems.length > 99 ? "99+" : notifItems.length}
                    </span>
                  ) : null}
                </button>

                {/* Dropdown */}
                <div className="invisible group-hover:invisible opacity-0 group-hover:opacity-100 absolute right-0 mt-1 w-80 bg-white rounded-xl border border-slate-200/60 shadow-xl shadow-slate-900/5 transition-all duration-200 pointer-events-none group-hover:pointer-events-auto z-50">
                  <div className="px-4 py-3 border-b border-slate-100">
                    <p className="text-xs font-semibold text-slate-900">Notifications</p>
                  </div>
                  <div className="max-h-80 overflow-auto">
                    {notifItems.length === 0 ? (
                      <div className="p-6 text-center">
                        <Bell className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                        <p className="text-xs text-slate-500">No new notifications</p>
                      </div>
                    ) : (
                      notifItems.map((n, i) => {
                        const dt = notifyDocTypes.get(n.docTypeId)
                        const dtLabel = dt?.name ?? "Document"
                        const path = dt?.key ? `/admin/docs/${dt.key}/${n.recordId}` : "#"
                        return (
                          <a key={i} href={path} className="block px-4 py-3 hover:bg-slate-50/80 transition-colors border-b border-slate-50 last:border-0">
                            <p className="text-xs font-medium text-slate-900">{dtLabel}</p>
                            <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">{n.text}</p>
                            <p className="text-[10px] text-slate-400 mt-1">{new Date(n.at).toLocaleString("id-ID", { dateStyle: "medium", timeStyle: "short" })}</p>
                          </a>
                        )
                      })
                    )}
                  </div>
                </div>
              </div>

              <div className="w-px h-5 bg-slate-200 mx-0.5" />

              <UserMenu name={me?.name || email} email={email} roleName={me?.role?.name || ""} imageUrl={session?.user?.image ?? undefined} />
            </div>
          </div>
        </header>

        <main className="p-6 bg-[#f8fafc] min-h-[calc(100vh-3.5rem)] flex-1">
          <ToastHost />
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
