import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { cookies } from "next/headers";

async function createRole(formData: FormData) {
  "use server";
  const session = await getServerSession(authOptions);
  const emailSession = session?.user?.email ?? "";
  const meSession = emailSession ? await prisma.user.findUnique({ where: { email: emailSession }, include: { role: { include: { permissions: { include: { permission: true } } } } } }) : null;
  const permSession = new Set((meSession?.role?.permissions ?? []).map((rp) => rp.permission.key));
  if (!permSession.has("ROLE_MANAGEMENT")) return;
  const name = String(formData.get("name") || "").trim();
  const selectedPerms = formData.getAll("permId").map(String);
  const cookieStore = await cookies();
  const cookieBranchId = cookieStore.get("branchId")?.value;
  const assigned = meSession
    ? await prisma.branch.findMany({ where: { admins: { some: { userId: meSession.id } } }, orderBy: { name: "asc" } })
    : [];
  const selectedBranchId = cookieBranchId ?? assigned[0]?.id;
  if (!name || !selectedBranchId) return;
  const role = await prisma.role.create({ data: { name, branchId: selectedBranchId } });
  if (selectedPerms.length > 0) {
    await prisma.rolePermission.createMany({ data: selectedPerms.map((permissionId) => ({ roleId: role.id, permissionId })), skipDuplicates: true });
  }
  revalidatePath("/admin/roles");
  revalidatePath("/admin/settings/roles");
  const referer = (await headers()).get("referer") || "";
  const isSettings = referer.includes("/admin/settings");
  redirect(`${isSettings ? "/admin/settings/roles" : "/admin/roles"}?toast=Role%20berhasil%20ditambahkan`)
}

async function deleteRole(formData: FormData) {
  "use server";
  const session = await getServerSession(authOptions);
  const emailSession = session?.user?.email ?? "";
  const meSession = emailSession ? await prisma.user.findUnique({ where: { email: emailSession }, include: { role: { include: { permissions: { include: { permission: true } } } } } }) : null;
  const permSession = new Set((meSession?.role?.permissions ?? []).map((rp) => rp.permission.key));
  if (!permSession.has("ROLE_MANAGEMENT")) return;
  const id = String(formData.get("id") || "");
  if (!id) return;
  const usage = await prisma.user.count({ where: { roleId: id } });
  if (usage > 0) {
    redirect("/admin/roles?toast=Role%20tidak%20dapat%20dihapus%20karena%20sedang%20digunakan");
    return;
  }
  await prisma.rolePermission.deleteMany({ where: { roleId: id } });
  await prisma.role.delete({ where: { id } });
  revalidatePath("/admin/roles");
  revalidatePath("/admin/settings/roles");
}

async function updateRole(formData: FormData) {
  "use server";
  const session = await getServerSession(authOptions);
  const emailSession = session?.user?.email ?? "";
  const meSession = emailSession ? await prisma.user.findUnique({ where: { email: emailSession }, include: { role: { include: { permissions: { include: { permission: true } } } } } }) : null;
  const permSession = new Set((meSession?.role?.permissions ?? []).map((rp) => rp.permission.key));
  if (!permSession.has("ROLE_MANAGEMENT")) return;
  const id = String(formData.get("id") || "");
  const name = String(formData.get("name") || "").trim();
  const cookieStore = await cookies();
  const cookieBranchId = cookieStore.get("branchId")?.value;
  const assigned = meSession
    ? await prisma.branch.findMany({ where: { admins: { some: { userId: meSession.id } } }, orderBy: { name: "asc" } })
    : [];
  const selectedBranchId = cookieBranchId ?? assigned[0]?.id;
  if (!id || !name || !selectedBranchId) return;
  await prisma.role.update({ where: { id }, data: { name, branchId: selectedBranchId } });
  const selected = formData.getAll("permId").map(String);
  await prisma.rolePermission.deleteMany({ where: { roleId: id } });
  if (selected.length > 0) {
    await prisma.rolePermission.createMany({ data: selected.map((permissionId) => ({ roleId: id, permissionId })), skipDuplicates: true });
  }
  revalidatePath("/admin/roles");
  revalidatePath("/admin/settings/roles");
  const referer = (await headers()).get("referer") || "";
  const isSettings = referer.includes("/admin/settings");
  redirect(`${isSettings ? "/admin/settings/roles" : "/admin/roles"}?toast=Role%20berhasil%20diperbarui`)
}

export default async function RolesPage() {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email ?? "";
  const me = email ? await prisma.user.findUnique({ where: { email }, include: { role: { include: { permissions: { include: { permission: true } } } } } }) : null;
  const perm = new Set((me?.role?.permissions ?? []).map((rp) => rp.permission.key));
  if (!perm.has("ROLE_MANAGEMENT")) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold">Role Management</h1>
        <p>Anda tidak memiliki permission untuk mengakses halaman ini.</p>
      </div>
    );
  }
  const cookieStore = await cookies();
  const cookieBranchId = cookieStore.get("branchId")?.value;
  const assigned = me
    ? await prisma.branch.findMany({ where: { admins: { some: { userId: me.id } } }, orderBy: { name: "asc" } })
    : [];
  const branches = assigned.length > 0 ? assigned : await prisma.branch.findMany({ orderBy: { name: "asc" } });
  const allowedBranchIds = new Set(branches.map((b) => b.id));
  const candidateBranchId = cookieBranchId ?? branches[0]?.id;
  const selectedBranchId = allowedBranchIds.has(String(candidateBranchId)) ? candidateBranchId : branches[0]?.id;
  const [roles, perms] = await Promise.all([
    prisma.role.findMany({ where: { branchId: selectedBranchId }, include: { permissions: { include: { permission: true } }, users: true } }),
    prisma.permission.findMany(),
  ]);
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Role Management</h1>
      {selectedBranchId ? (
        <p className="text-sm text-muted-foreground">Branch aktif: {branches.find((b) => b.id === selectedBranchId)?.name ?? "(tidak ditemukan)"}</p>
      ) : (
        <p className="text-sm text-muted-foreground">Tidak ada branch yang tersedia. Buat branch terlebih dahulu.</p>
      )}
      <Dialog>
        <DialogTrigger asChild>
          <Button>Tambah Role</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-4xl max-h-[80vh] overflow-y-auto scrollbar-none">
          <DialogHeader>
            <DialogTitle>Tambah Role</DialogTitle>
          </DialogHeader>
          <form action={createRole} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nama</Label>
              <Input id="name" name="name" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Permissions</Label>
                <Badge variant="outline">0 dipilih</Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-60 overflow-y-auto">
                {perms.map((p) => (
                  <label key={p.id} className="flex items-center gap-2">
                    <Checkbox name="permId" value={p.id} />
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
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b">
              <th className="p-2">Nama</th>
              <th className="p-2">Users</th>
              <th className="p-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((r) => (
              <tr key={r.id} className="border-b">
                <td className="p-2">{r.name}</td>
                <td className="p-2">{r.users.length}</td>
                <td className="p-2 space-x-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline">Edit</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-4xl max-h-[80vh] overflow-y-auto scrollbar-none">
                      <DialogHeader>
                        <DialogTitle>Edit Role</DialogTitle>
                      </DialogHeader>
                      <form action={updateRole} className="space-y-4">
                        <input type="hidden" name="id" value={r.id} />
                        <div className="space-y-2">
                          <Label htmlFor={`role_name_${r.id}`}>Nama</Label>
                          <Input id={`role_name_${r.id}`} name="name" defaultValue={r.name} />
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label>Permissions</Label>
                            <Badge variant="outline">{r.permissions.length} dipilih</Badge>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-60 overflow-y-auto">
                            {(() => {
                              const selected = new Set(r.permissions.map((rp) => rp.permissionId));
                              return perms.map((p) => (
                                <label key={p.id} className="flex items-center gap-2">
                                  <Checkbox name="permId" value={p.id} defaultChecked={selected.has(p.id)} />
                                  <span>{p.key}</span>
                                </label>
                              ));
                            })()}
                          </div>
                        </div>
                        <DialogFooter>
                          <Button type="submit">Simpan</Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                  <form action={deleteRole} className="inline-flex">
                    <input type="hidden" name="id" value={r.id} />
                    <Button variant="destructive">Hapus</Button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}