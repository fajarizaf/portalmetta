import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

async function createFloor(formData: FormData) {
  "use server";
  const session = await getServerSession(authOptions);
  const email = session?.user?.email ?? "";
  const me = email ? await prisma.user.findUnique({ where: { email }, include: { role: { include: { permissions: { include: { permission: true } } } } } }) : null;
  const perm = new Set((me?.role?.permissions ?? []).map((rp) => rp.permission.key));
  if (!perm.has("FLOOR_MANAGEMENT")) return;
  const level = Number(formData.get("level") || 0);
  const buildingId = String(formData.get("buildingId") || "").trim();
  if (!level || !buildingId) return;
  await prisma.floor.create({ data: { name: `Lantai ${level}`, level, buildingId } });
  revalidatePath("/admin/floors");
  redirect("/admin/floors?toast=Floor%20berhasil%20ditambahkan")
}

async function deleteFloor(formData: FormData) {
  "use server";
  const session = await getServerSession(authOptions);
  const email = session?.user?.email ?? "";
  const me = email ? await prisma.user.findUnique({ where: { email }, include: { role: { include: { permissions: { include: { permission: true } } } } } }) : null;
  const perm = new Set((me?.role?.permissions ?? []).map((rp) => rp.permission.key));
  if (!perm.has("FLOOR_MANAGEMENT")) return;
  const id = String(formData.get("id") || "");
  if (!id) return;
  await prisma.floor.delete({ where: { id } });
  revalidatePath("/admin/floors");
}

export default async function FloorsPage() {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email ?? "";
  const me = email ? await prisma.user.findUnique({ where: { email }, include: { role: { include: { permissions: { include: { permission: true } } } } } }) : null;
  const perm = new Set((me?.role?.permissions ?? []).map((rp) => rp.permission.key));
  if (!perm.has("FLOOR_MANAGEMENT")) {
    return (
      <div className="space-y-4">
      <h1 className="text-xl sm:text-2xl font-semibold">Floor Management</h1>
        <p>Anda tidak memiliki permission untuk mengakses halaman ini.</p>
      </div>
    );
  }
  const [floors, buildings] = await Promise.all([
    prisma.floor.findMany({ include: { building: { include: { branch: true } } } }),
    prisma.building.findMany({ include: { branch: true } }),
  ]);
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Floor Management</h1>
      <form action={createFloor} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        <div className="space-y-2">
          <Label htmlFor="level">Level</Label>
          <Input id="level" name="level" type="number" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="buildingId">Building</Label>
          <select
            name="buildingId"
            id="buildingId"
            className={cn("border-input text-sm rounded-md border bg-transparent px-3 py-2 shadow-xs outline-none focus-visible:ring-[3px] focus-visible:border-ring w-full")}
          >
            <option value="">-</option>
            {buildings.map((b) => (
              <option key={b.id} value={b.id}>{b.name} ({b.branch.name})</option>
            ))}
          </select>
        </div>
        <Button type="submit">Tambah</Button>
      </form>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b">
              <th className="p-2">Level</th>
              <th className="p-2">Building</th>
              <th className="p-2">Branch</th>
              <th className="p-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {floors.map((f) => (
              <tr key={f.id} className="border-b">
                <td className="p-2">{f.level}</td>
                <td className="p-2">{f.building.name}</td>
                <td className="p-2">{f.building.branch.name}</td>
                <td className="p-2">
                  <form action={deleteFloor} className="inline-flex">
                    <input type="hidden" name="id" value={f.id} />
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