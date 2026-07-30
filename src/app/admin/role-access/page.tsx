import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { cookies } from "next/headers";
import { KeyRound } from "lucide-react";

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
      <div className="space-y-1">
        <h1 className="text-xl font-semibold text-slate-900 tracking-tight">Role Access Management</h1>
        <p className="text-sm text-slate-500">Manage permissions for each role.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {roles.map((r) => (
          <Link key={r.id} href={`/admin/role-access/${r.id}`}>
            <div className="group flex items-center gap-3 border border-slate-200 rounded-xl p-4 hover:border-slate-300 transition-all duration-200 bg-white cursor-pointer">
              <div className="h-10 w-10 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 group-hover:bg-slate-900 group-hover:text-white group-hover:border-slate-900 transition-all">
                <KeyRound className="h-5 w-5 text-slate-500 group-hover:text-white transition-colors" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-slate-900 truncate">{r.name}</div>
                <div className="text-xs text-slate-500 mt-0.5">{r.permissions.length} permissions</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
