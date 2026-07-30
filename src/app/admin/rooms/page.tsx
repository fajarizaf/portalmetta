import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

async function createRoom(formData: FormData) {
  "use server";
  const session = await getServerSession(authOptions);
  const email = session?.user?.email ?? "";
  const me = email ? await prisma.user.findUnique({ where: { email }, include: { role: { include: { permissions: { include: { permission: true } } } } } }) : null;
  const perm = new Set((me?.role?.permissions ?? []).map((rp) => rp.permission.key));
  if (!perm.has("ROOM_MANAGEMENT")) return;
  const name = String(formData.get("name") || "").trim();
  const floorId = String(formData.get("floorId") || "").trim();
  if (!name || !floorId) return;
  await prisma.room.create({ data: { name, floorId } });
  revalidatePath("/admin/rooms");
  redirect("/admin/rooms?toast=Room%20berhasil%20ditambahkan")
}

async function deleteRoom(formData: FormData) {
  "use server";
  const session = await getServerSession(authOptions);
  const email = session?.user?.email ?? "";
  const me = email ? await prisma.user.findUnique({ where: { email }, include: { role: { include: { permissions: { include: { permission: true } } } } } }) : null;
  const perm = new Set((me?.role?.permissions ?? []).map((rp) => rp.permission.key));
  if (!perm.has("ROOM_MANAGEMENT")) return;
  const id = String(formData.get("id") || "");
  if (!id) return;
  await prisma.room.delete({ where: { id } });
  revalidatePath("/admin/rooms");
}

export default async function RoomsPage() {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email ?? "";
  const me = email ? await prisma.user.findUnique({ where: { email }, include: { role: { include: { permissions: { include: { permission: true } } } } } }) : null;
  const perm = new Set((me?.role?.permissions ?? []).map((rp) => rp.permission.key));
  if (!perm.has("ROOM_MANAGEMENT")) {
    return (
      <div className="space-y-4">
      <h1 className="text-xl sm:text-2xl font-semibold">Room Management</h1>
        <p>Anda tidak memiliki permission untuk mengakses halaman ini.</p>
      </div>
    );
  }
  const [rooms, floors] = await Promise.all([
    prisma.room.findMany({ include: { floor: { include: { building: { include: { branch: true } } } } } }),
    prisma.floor.findMany({ include: { building: { include: { branch: true } } } }),
  ]);
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Room Management</h1>
      <form action={createRoom} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        <div className="space-y-2">
          <Label htmlFor="name">Nama</Label>
          <Input id="name" name="name" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="floorId">Floor</Label>
          <select
            name="floorId"
            id="floorId"
            className={cn("border-input text-sm rounded-md border bg-transparent px-3 py-2 shadow-xs outline-none focus-visible:ring-[3px] focus-visible:border-ring w-full")}
          >
            <option value="">-</option>
            {floors.map((f) => (
              <option key={f.id} value={f.id}>{f.building.branch.name} / {f.building.name} / L{f.level}</option>
            ))}
          </select>
        </div>
        <Button type="submit">Tambah</Button>
      </form>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b">
              <th className="p-2">Nama</th>
              <th className="p-2">Floor</th>
              <th className="p-2">Building</th>
              <th className="p-2">Branch</th>
              <th className="p-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((r) => (
              <tr key={r.id} className="border-b">
                <td className="p-2">{r.name}</td>
                <td className="p-2">L{r.floor.level}</td>
                <td className="p-2">{r.floor.building.name}</td>
                <td className="p-2">{r.floor.building.branch.name}</td>
                <td className="p-2">
                  <form action={deleteRoom} className="inline-flex">
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