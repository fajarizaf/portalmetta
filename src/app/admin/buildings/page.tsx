import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SearchableSelect } from "@/components/ui/select";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

async function createBuilding(formData: FormData) {
  "use server";
  const session = await getServerSession(authOptions);
  const email = session?.user?.email ?? "";
  const me = email ? await prisma.user.findUnique({ where: { email }, include: { role: { include: { permissions: { include: { permission: true } } } } } }) : null;
  const perm = new Set((me?.role?.permissions ?? []).map((rp) => rp.permission.key));
  if (!perm.has("BUILDING_MANAGEMENT")) return;
  const name = String(formData.get("name") || "").trim();
  const branchId = String(formData.get("branchId") || "").trim();
  if (!name || !branchId) return;
  await prisma.building.create({ data: { name, branchId } });
  revalidatePath("/admin/buildings");
  redirect("/admin/buildings?toast=Building%20berhasil%20ditambahkan")
}

async function deleteBuilding(formData: FormData) {
  "use server";
  const session = await getServerSession(authOptions);
  const email = session?.user?.email ?? "";
  const me = email ? await prisma.user.findUnique({ where: { email }, include: { role: { include: { permissions: { include: { permission: true } } } } } }) : null;
  const perm = new Set((me?.role?.permissions ?? []).map((rp) => rp.permission.key));
  if (!perm.has("BUILDING_MANAGEMENT")) return;
  const id = String(formData.get("id") || "");
  if (!id) return;
  await prisma.building.delete({ where: { id } });
  revalidatePath("/admin/buildings");
}

export default async function BuildingsPage() {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email ?? "";
  const me = email ? await prisma.user.findUnique({ where: { email }, include: { role: { include: { permissions: { include: { permission: true } } } } } }) : null;
  const perm = new Set((me?.role?.permissions ?? []).map((rp) => rp.permission.key));
  if (!perm.has("BUILDING_MANAGEMENT")) {
    return (
      <div className="space-y-4">
      <h1 className="text-xl sm:text-2xl font-semibold">Building Management</h1>
        <p>Anda tidak memiliki permission untuk mengakses halaman ini.</p>
      </div>
    );
  }
  const [buildings, branches] = await Promise.all([
    prisma.building.findMany({ include: { branch: true } }),
    prisma.branch.findMany(),
  ]);
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Building Management</h1>
      <form action={createBuilding} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        <div className="space-y-2">
          <Label htmlFor="name">Nama</Label>
          <Input id="name" name="name" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="branchId">Branch</Label>
          <SearchableSelect
            name="branchId"
            placeholder="-"
            options={branches.map((b) => ({ label: b.name, value: b.id }))}
          />
        </div>
        <Button type="submit">Tambah</Button>
      </form>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b">
              <th className="p-2">Nama</th>
              <th className="p-2">Branch</th>
              <th className="p-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {buildings.map((b) => (
              <tr key={b.id} className="border-b">
                <td className="p-2">{b.name}</td>
                <td className="p-2">{b.branch.name}</td>
                <td className="p-2">
                  <form action={deleteBuilding} className="inline-flex">
                    <input type="hidden" name="id" value={b.id} />
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