import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { 
  Settings2, 
  UserCog, 
  ShieldCheck, 
  KeyRound, 
  MapPinned, 
  Server, 
  HelpCircle,
  ChevronRight
} from "lucide-react";

export default async function AdminSettingsLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email ?? "";
  const me = email ? await prisma.user.findUnique({ where: { email }, include: { role: { include: { permissions: { include: { permission: true } } } } } }) : null;
  const perm = new Set((me?.role?.permissions ?? []).map((rp) => rp.permission.key));

  const canAdmins = perm.has("ADMIN_PANEL_ACCESS");
  const canRoles = perm.has("ROLE_MANAGEMENT");
  const canRoleAccess = perm.has("ROLE_ACCESS_MANAGEMENT");
  const canLocation = perm.has("BRANCH_MANAGEMENT") || perm.has("BUILDING_MANAGEMENT") || perm.has("FLOOR_MANAGEMENT") || perm.has("ROOM_MANAGEMENT");
  const canDcCompany = perm.has("DC_COMPANY_MANAGEMENT");

  const menuItems = [
    { href: "/admin/settings/admins", label: "Admins", icon: UserCog, perm: canAdmins },
    { href: "/admin/settings/roles", label: "Roles", icon: ShieldCheck, perm: canRoles },
    { href: "/admin/settings/role-access", label: "Role Access", icon: KeyRound, perm: canRoleAccess },
    { href: "/admin/settings/location-management", label: "Location", icon: MapPinned, perm: canLocation },
    { href: "/admin/settings/dc-company", label: "DC Company", icon: Server, perm: canDcCompany },
    { href: "/admin/settings/help", label: "Help Page", icon: HelpCircle, perm: canAdmins },
  ].filter((item) => item.perm);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Sidebar Navigation */}
      <aside className="lg:col-span-3">
        <div className="sticky top-20">
          <div className="flex items-center gap-2 mb-4 px-1">
            <Settings2 className="h-4 w-4 text-slate-500" />
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Settings</span>
          </div>
          <nav className="space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all"
              >
                <item.icon className="h-4 w-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
                <span className="flex-1">{item.label}</span>
                <ChevronRight className="h-3.5 w-3.5 text-slate-300 group-hover:text-slate-400 transition-colors" />
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <section className="lg:col-span-9">
        {children}
      </section>
    </div>
  );
}
