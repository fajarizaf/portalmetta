import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

async function save(formData: FormData) {
  "use server";
  const session = await getServerSession(authOptions);
  const emailSession = session?.user?.email ?? "";
  const meSession = emailSession ? await prisma.user.findUnique({ where: { email: emailSession }, include: { role: { include: { permissions: { include: { permission: true } } } } } }) : null;
  const permSession = new Set((meSession?.role?.permissions ?? []).map((rp) => rp.permission.key));
  if (!permSession.has("ROLE_ACCESS_MANAGEMENT")) return;
  const roleId = String(formData.get("roleId") || "");
  const selected = formData.getAll("permId").map(String);
  if (!roleId) return;
  const role = await prisma.role.findUnique({ where: { id: roleId }, include: { branch: true } });
  if (!role) {
    revalidatePath("/admin/role-access");
    revalidatePath("/admin/settings/role-access");
    const referer = (await headers()).get("referer") || "";
    const isSettings = referer.includes("/admin/settings");
    return redirect(`${isSettings ? "/admin/settings/role-access" : "/admin/role-access"}?toast=Role%20tidak%20ditemukan`);
  }
  const hasAccess = role.branch?.id && meSession
    ? await prisma.userBranchAssignment.findUnique({ where: { userId_branchId: { userId: meSession.id, branchId: role.branch.id } } })
    : null;
  if (!hasAccess) {
    revalidatePath(`/admin/role-access/${roleId}`);
    revalidatePath(`/admin/settings/role-access/${roleId}`);
    const referer = (await headers()).get("referer") || "";
    const isSettings = referer.includes("/admin/settings");
    return redirect(`${isSettings ? "/admin/settings/role-access" : "/admin/role-access"}/${roleId}?toast=Tidak%20diizinkan`);
  }
  await prisma.rolePermission.deleteMany({ where: { roleId } });
  if (selected.length > 0) {
    await prisma.rolePermission.createMany({ data: selected.map((id) => ({ roleId, permissionId: id })), skipDuplicates: true });
  }
  revalidatePath(`/admin/role-access/${roleId}`);
  revalidatePath(`/admin/settings/role-access/${roleId}`);
  const referer = (await headers()).get("referer") || "";
  const isSettings = referer.includes("/admin/settings");
  redirect(`${isSettings ? "/admin/settings/role-access" : "/admin/role-access"}/${roleId}?toast=Permissions%20berhasil%20disimpan`)
}

export default async function RoleAccessEdit({ params }: { params: { id?: string } }) {
  const roleId = params?.id;
  const role = roleId ? await prisma.role.findUnique({ where: { id: roleId }, include: { permissions: true, branch: true } }) : null;
  const session = await getServerSession(authOptions);
  const email = session?.user?.email ?? "";
  const me = email ? await prisma.user.findUnique({ where: { email }, include: { role: { include: { permissions: { include: { permission: true } } } } } }) : null;
  const perm = new Set((me?.role?.permissions ?? []).map((rp) => rp.permission.key));
  if (!perm.has("ROLE_ACCESS_MANAGEMENT")) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold">Edit Akses</h1>
        <p>Anda tidak memiliki permission untuk mengakses halaman ini.</p>
      </div>
    );
  }
  const hasAccess = role?.branchId && me ? await prisma.userBranchAssignment.findUnique({ where: { userId_branchId: { userId: me.id, branchId: role.branchId } } }) : null;
  const perms = await prisma.permission.findMany();
  const selected = new Set(role?.permissions.map((rp) => rp.permissionId));
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Edit Akses: {role?.name ?? "Role tidak ditemukan"}</h1>
      {role?.branch?.name && (
        <p className="text-sm text-muted-foreground">Branch: {role.branch.name}</p>
      )}
      {role && hasAccess ? (
        <Dialog>
          <DialogTrigger asChild>
            <Button>Ubah Permissions</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-4xl max-height-[80vh] max-h-[80vh] overflow-y-auto scrollbar-none">
            <DialogHeader>
              <DialogTitle>Ubah Permissions</DialogTitle>
            </DialogHeader>
            <form action={save} className="space-y-4">
              <input type="hidden" name="roleId" value={role.id} />
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Permissions</span>
                  <Badge variant="outline">{selected.size} dipilih</Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 max-h-60 overflow-y-auto">
                  {perms.map((p) => (
                    <label key={p.id} className="flex gap-2 items-center">
                      <Checkbox defaultChecked={selected.has(p.id)} name="permId" value={p.id} />
                      <span>{p.key}</span>
                    </label>
                  ))}
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Simpan</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      ) : (
        <div className="space-y-4">
          <p>{!role ? "Role tidak ditemukan atau ID tidak valid." : "Anda tidak memiliki akses ke branch ini."}</p>
          <Button asChild variant="outline"><Link href="/admin/role-access">Kembali ke daftar role</Link></Button>
        </div>
      )}
    </div>
  );
}