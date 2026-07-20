import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
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
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
      <aside className="md:col-span-3">
        <div className="border rounded-md p-2">
          <nav className="flex flex-col">
            {canAdmins ? (<Button asChild variant="ghost" className="justify-start"><Link href="/admin/settings/admins">Admins</Link></Button>) : null}
            {canRoles ? (<Button asChild variant="ghost" className="justify-start"><Link href="/admin/settings/roles">Roles</Link></Button>) : null}
            {canRoleAccess ? (<Button asChild variant="ghost" className="justify-start"><Link href="/admin/settings/role-access">Role Access</Link></Button>) : null}
            {canLocation ? (<Button asChild variant="ghost" className="justify-start"><Link href="/admin/settings/location-management">Location</Link></Button>) : null}
            {canDcCompany ? (<Button asChild variant="ghost" className="justify-start"><Link href="/admin/settings/dc-company">DC Company</Link></Button>) : null}
            {canAdmins ? (<Button asChild variant="ghost" className="justify-start"><Link href="/admin/settings/help">Help Page</Link></Button>) : null}
          </nav>
        </div>
      </aside>
      <section className="md:col-span-9">
        {children}
      </section>
    </div>
  );
}
import Link from "next/link";
import { Button } from "@/components/ui/button";
