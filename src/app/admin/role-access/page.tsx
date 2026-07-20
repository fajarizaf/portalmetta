import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { cookies } from "next/headers";

export default async function RoleAccessPage({ searchParams }: { searchParams?: Record<string, string | string[] | undefined> | Promise<Record<string, string | string[] | undefined>> }) {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email ?? "";
  const me = email ? await prisma.user.findUnique({ where: { email }, include: { role: { include: { permissions: { include: { permission: true } } } } } }) : null;
  const perm = new Set((me?.role?.permissions ?? []).map((rp) => rp.permission.key));
  if (!perm.has("ROLE_ACCESS_MANAGEMENT")) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold">Role Access Management</h1>
        <p>Anda tidak memiliki permission untuk mengakses halaman ini.</p>
      </div>
    );
  }
  const assigned = me
    ? await prisma.branch.findMany({ where: { admins: { some: { userId: me.id } } }, orderBy: { name: "asc" } })
    : [];
  const branches = assigned.length > 0
    ? assigned
    : await prisma.branch.findMany({ orderBy: { name: "asc" } });
  const cookieStore = await cookies();
  const cookieBranchId = cookieStore.get("branchId")?.value;
  const sp = ((await searchParams) ?? {}) as Record<string, string | string[] | undefined>;
  const selectedBranchId = cookieBranchId ?? (typeof sp?.branchId === "string" ? (sp?.branchId as string) : branches[0]?.id);
  const roles = await prisma.role.findMany({ where: { branchId: selectedBranchId }, include: { permissions: true } });
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Role Access Management</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {roles.map((r) => (
          <Link key={r.id} href={`/admin/role-access/${r.id}`}>
            <Button variant="outline" className="w-full justify-start">{r.name} · {r.permissions.length}</Button>
          </Link>
        ))}
      </div>
    </div>
  );
}