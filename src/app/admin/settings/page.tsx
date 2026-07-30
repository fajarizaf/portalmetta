import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Card, CardContent } from "@/components/ui/card";
import { UserCog, ShieldCheck, KeyRound, MapPinned, Server, HelpCircle } from "lucide-react";
import Link from "next/link";

export default async function AdminSettingsPage() {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email ?? "";
  const me = email ? await prisma.user.findUnique({ where: { email }, include: { role: { include: { permissions: { include: { permission: true } } } } } }) : null;
  const perm = new Set((me?.role?.permissions ?? []).map((rp) => rp.permission.key));

  const menus = [
    { href: "/admin/settings/admins", label: "Admins", desc: "Manage admin users and access", icon: UserCog, perm: perm.has("ADMIN_PANEL_ACCESS") },
    { href: "/admin/settings/roles", label: "Roles", desc: "Configure roles and permissions", icon: ShieldCheck, perm: perm.has("ROLE_MANAGEMENT") },
    { href: "/admin/settings/role-access", label: "Role Access", desc: "Manage role-based access control", icon: KeyRound, perm: perm.has("ROLE_ACCESS_MANAGEMENT") },
    { href: "/admin/settings/location-management", label: "Location", desc: "Manage branches, buildings, floors, rooms", icon: MapPinned, perm: perm.has("BRANCH_MANAGEMENT") || perm.has("BUILDING_MANAGEMENT") || perm.has("FLOOR_MANAGEMENT") || perm.has("ROOM_MANAGEMENT") },
    { href: "/admin/settings/dc-company", label: "DC Company", desc: "Data center company configuration", icon: Server, perm: perm.has("DC_COMPANY_MANAGEMENT") },
    { href: "/admin/settings/help", label: "Help Page", desc: "Manage customer help content", icon: HelpCircle, perm: perm.has("ADMIN_PANEL_ACCESS") },
  ].filter((m) => m.perm);

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-lg sm:text-xl font-semibold text-slate-900 tracking-tight">Settings</h1>
        <p className="text-xs sm:text-sm text-slate-500">Platform configuration and administration tools.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {menus.map((menu) => (
          <Link key={menu.href} href={menu.href}>
            <Card className="group h-full border border-slate-200/80 bg-white hover:border-slate-300 transition-all duration-200 cursor-pointer">
              <CardContent className="p-5 flex items-start gap-4">
                <div className="h-10 w-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 group-hover:bg-slate-900 group-hover:text-white group-hover:border-slate-900 transition-all">
                  <menu.icon className="h-5 w-5 text-slate-500 group-hover:text-white transition-colors" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-slate-900 group-hover:text-slate-900 transition-colors">{menu.label}</h3>
                  <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">{menu.desc}</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
