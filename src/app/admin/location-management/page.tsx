import { prisma } from "@/lib/prisma";
import { revalidatePath, unstable_noStore as noStore } from "next/cache";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
// redirect removed to avoid loops; default tab is computed client-side
import { TabsBar } from "./tabs-bar";
import { TabsContent } from "./tabs-content";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { SearchableSelect } from "@/components/ui/select";
import { cookies } from "next/headers";
export const dynamic = "force-dynamic";
export const revalidate = 0;
function refreshLocation() {
  revalidatePath("/admin/location-management");
  revalidatePath("/admin/settings/location-management");
}

async function createBranch(formData: FormData) {
  "use server";
  const session = await getServerSession(authOptions);
  const emailSession = session?.user?.email ?? "";
  const meSession = emailSession ? await prisma.user.findUnique({ where: { email: emailSession }, include: { role: { include: { permissions: { include: { permission: true } } } } } }) : null;
  const permSession = new Set((meSession?.role?.permissions ?? []).map((rp) => rp.permission.key));
  if (!permSession.has("BRANCH_MANAGEMENT")) return;
  const name = String(formData.get("branch_name") || "").trim();
  const code = String(formData.get("branch_code") || "").trim();
  if (!name || !code) return;
  const finalCompanyId = meSession?.companyId ?? undefined;
  if (!finalCompanyId) return;
  const exists = await prisma.branch.findUnique({ where: { code } });
  if (exists) {
    redirect("/admin/location-management?toast=Kode%20branch%20sudah%20digunakan");
  }
  await prisma.branch.create({ data: { name, code, companyId: finalCompanyId } });
  refreshLocation();
  redirect("/admin/location-management?toast=Branch%20berhasil%20ditambahkan")
}

async function deleteBranch(formData: FormData) {
  "use server";
  const session = await getServerSession(authOptions);
  const emailSession = session?.user?.email ?? "";
  const meSession = emailSession ? await prisma.user.findUnique({ where: { email: emailSession }, include: { role: { include: { permissions: { include: { permission: true } } } } } }) : null;
  const permSession = new Set((meSession?.role?.permissions ?? []).map((rp) => rp.permission.key));
  if (!permSession.has("BRANCH_MANAGEMENT")) return;
  const id = String(formData.get("branch_id") || "");
  if (!id) return;
  const isSuperSession = permSession.has("COMPANY_MANAGEMENT");
  if (!isSuperSession) {
    const b = await prisma.branch.findUnique({ where: { id } });
    if (!b || b.companyId !== (meSession?.companyId ?? undefined)) {
      redirect("/admin/location-management?toast=Tidak%20diizinkan");
    }
  }
  await prisma.branch.delete({ where: { id } });
  refreshLocation();
}

async function updateBranch(formData: FormData) {
  "use server";
  const session = await getServerSession(authOptions);
  const emailSession = session?.user?.email ?? "";
  const meSession = emailSession ? await prisma.user.findUnique({ where: { email: emailSession }, include: { role: { include: { permissions: { include: { permission: true } } } } } }) : null;
  const permSession = new Set((meSession?.role?.permissions ?? []).map((rp) => rp.permission.key));
  if (!permSession.has("BRANCH_MANAGEMENT")) return;
  const id = String(formData.get("branch_id") || "");
  const name = String(formData.get("branch_name") || "").trim();
  const code = String(formData.get("branch_code") || "").trim();
  if (!id || !name || !code) return;
  const finalCompanyId = meSession?.companyId ?? undefined;
  const b = await prisma.branch.findUnique({ where: { id } });
  if (!b || b.companyId !== finalCompanyId) {
    redirect("/admin/location-management?toast=Tidak%20diizinkan");
  }
  await prisma.branch.update({ where: { id }, data: { name, code, companyId: finalCompanyId } });
  refreshLocation();
  redirect("/admin/location-management?toast=Branch%20berhasil%20diperbarui")
}

async function createBuilding(formData: FormData) {
  "use server";
  const session = await getServerSession(authOptions);
  const emailSession = session?.user?.email ?? "";
  const meSession = emailSession ? await prisma.user.findUnique({ where: { email: emailSession }, include: { role: { include: { permissions: { include: { permission: true } } } } } }) : null;
  const permSession = new Set((meSession?.role?.permissions ?? []).map((rp) => rp.permission.key));
  if (!permSession.has("BUILDING_MANAGEMENT")) return;
  const name = String(formData.get("building_name") || "").trim();
  const branchId = String(formData.get("building_branchId") || "").trim();
  if (!name || !branchId) return;
  const isSuperSession = permSession.has("COMPANY_MANAGEMENT");
  if (!isSuperSession) {
    const br = await prisma.branch.findUnique({ where: { id: branchId } });
    if (!br || br.companyId !== (meSession?.companyId ?? undefined)) return;
  }
  await prisma.building.create({ data: { name, branchId } });
  refreshLocation();
  redirect("/admin/location-management?toast=Building%20berhasil%20ditambahkan")
}

async function deleteBuilding(formData: FormData) {
  "use server";
  const session = await getServerSession(authOptions);
  const emailSession = session?.user?.email ?? "";
  const meSession = emailSession ? await prisma.user.findUnique({ where: { email: emailSession }, include: { role: { include: { permissions: { include: { permission: true } } } } } }) : null;
  const permSession = new Set((meSession?.role?.permissions ?? []).map((rp) => rp.permission.key));
  if (!permSession.has("BUILDING_MANAGEMENT")) return;
  const id = String(formData.get("building_id") || "");
  if (!id) return;
  const isSuperSession = permSession.has("COMPANY_MANAGEMENT");
  if (!isSuperSession) {
    const b = await prisma.building.findUnique({ where: { id }, include: { branch: true } });
    if (!b || b.branch.companyId !== (meSession?.companyId ?? undefined)) {
      redirect("/admin/location-management?toast=Tidak%20diizinkan");
    }
  }
  await prisma.building.delete({ where: { id } });
  refreshLocation();
}

async function updateBuilding(formData: FormData) {
  "use server";
  const session = await getServerSession(authOptions);
  const emailSession = session?.user?.email ?? "";
  const meSession = emailSession ? await prisma.user.findUnique({ where: { email: emailSession }, include: { role: { include: { permissions: { include: { permission: true } } } } } }) : null;
  const permSession = new Set((meSession?.role?.permissions ?? []).map((rp) => rp.permission.key));
  if (!permSession.has("BUILDING_MANAGEMENT")) return;
  const id = String(formData.get("building_id") || "");
  const name = String(formData.get("building_name") || "").trim();
  const branchId = String(formData.get("building_branchId") || "").trim();
  if (!id || !name || !branchId) return;
  const isSuperSession = permSession.has("COMPANY_MANAGEMENT");
  if (!isSuperSession) {
    const br = await prisma.branch.findUnique({ where: { id: branchId } });
    if (!br || br.companyId !== (meSession?.companyId ?? undefined)) {
      redirect("/admin/location-management?toast=Tidak%20diizinkan");
    }
  }
  await prisma.building.update({ where: { id }, data: { name, branchId } });
  refreshLocation();
  redirect("/admin/location-management?toast=Building%20berhasil%20diperbarui")
}

async function createFloor(formData: FormData) {
  "use server";
  const session = await getServerSession(authOptions);
  const emailSession = session?.user?.email ?? "";
  const meSession = emailSession ? await prisma.user.findUnique({ where: { email: emailSession }, include: { role: { include: { permissions: { include: { permission: true } } } } } }) : null;
  const permSession = new Set((meSession?.role?.permissions ?? []).map((rp) => rp.permission.key));
  if (!permSession.has("FLOOR_MANAGEMENT")) return;
  const level = Number(formData.get("floor_level") || 0);
  const buildingId = String(formData.get("floor_buildingId") || "").trim();
  if (!level || !buildingId) return;
  const isSuperSession = permSession.has("COMPANY_MANAGEMENT");
  if (!isSuperSession) {
    const bd = await prisma.building.findUnique({ where: { id: buildingId }, include: { branch: true } });
    if (!bd || bd.branch.companyId !== (meSession?.companyId ?? undefined)) return;
  }
  await prisma.floor.create({ data: { name: `Lantai ${level}`, level, buildingId } });
  refreshLocation();
  redirect("/admin/location-management?toast=Floor%20berhasil%20ditambahkan")
}

async function deleteFloor(formData: FormData) {
  "use server";
  const session = await getServerSession(authOptions);
  const emailSession = session?.user?.email ?? "";
  const meSession = emailSession ? await prisma.user.findUnique({ where: { email: emailSession }, include: { role: { include: { permissions: { include: { permission: true } } } } } }) : null;
  const permSession = new Set((meSession?.role?.permissions ?? []).map((rp) => rp.permission.key));
  if (!permSession.has("FLOOR_MANAGEMENT")) return;
  const id = String(formData.get("floor_id") || "");
  if (!id) return;
  const isSuperSession = permSession.has("COMPANY_MANAGEMENT");
  if (!isSuperSession) {
    const f = await prisma.floor.findUnique({ where: { id }, include: { building: { include: { branch: true } } } });
    if (!f || f.building.branch.companyId !== (meSession?.companyId ?? undefined)) {
      redirect("/admin/location-management?toast=Tidak%20diizinkan");
    }
  }
  await prisma.floor.delete({ where: { id } });
  refreshLocation();
}

async function updateFloor(formData: FormData) {
  "use server";
  const session = await getServerSession(authOptions);
  const emailSession = session?.user?.email ?? "";
  const meSession = emailSession ? await prisma.user.findUnique({ where: { email: emailSession }, include: { role: { include: { permissions: { include: { permission: true } } } } } }) : null;
  const permSession = new Set((meSession?.role?.permissions ?? []).map((rp) => rp.permission.key));
  if (!permSession.has("FLOOR_MANAGEMENT")) return;
  const id = String(formData.get("floor_id") || "");
  const level = Number(formData.get("floor_level") || 0);
  const buildingId = String(formData.get("floor_buildingId") || "").trim();
  if (!id || !level || !buildingId) return;
  const isSuperSession = permSession.has("COMPANY_MANAGEMENT");
  if (!isSuperSession) {
    const bd = await prisma.building.findUnique({ where: { id: buildingId }, include: { branch: true } });
    if (!bd || bd.branch.companyId !== (meSession?.companyId ?? undefined)) {
      redirect("/admin/location-management?toast=Tidak%20diizinkan");
    }
  }
  await prisma.floor.update({ where: { id }, data: { level, buildingId } });
  refreshLocation();
  redirect("/admin/location-management?toast=Floor%20berhasil%20diperbarui")
}

async function createRoom(formData: FormData) {
  "use server";
  const session = await getServerSession(authOptions);
  const emailSession = session?.user?.email ?? "";
  const meSession = emailSession ? await prisma.user.findUnique({ where: { email: emailSession }, include: { role: { include: { permissions: { include: { permission: true } } } } } }) : null;
  const permSession = new Set((meSession?.role?.permissions ?? []).map((rp) => rp.permission.key));
  if (!permSession.has("ROOM_MANAGEMENT")) return;
  const name = String(formData.get("room_name") || "").trim();
  const floorId = String(formData.get("room_floorId") || "").trim();
  if (!name || !floorId) return;
  const isSuperSession = permSession.has("COMPANY_MANAGEMENT");
  if (!isSuperSession) {
    const fl = await prisma.floor.findUnique({ where: { id: floorId }, include: { building: { include: { branch: true } } } });
    if (!fl || fl.building.branch.companyId !== (meSession?.companyId ?? undefined)) return;
  }
  await prisma.room.create({ data: { name, floorId } });
  refreshLocation();
  redirect("/admin/location-management?toast=Room%20berhasil%20ditambahkan")
}

async function deleteRoom(formData: FormData) {
  "use server";
  const session = await getServerSession(authOptions);
  const emailSession = session?.user?.email ?? "";
  const meSession = emailSession ? await prisma.user.findUnique({ where: { email: emailSession }, include: { role: { include: { permissions: { include: { permission: true } } } } } }) : null;
  const permSession = new Set((meSession?.role?.permissions ?? []).map((rp) => rp.permission.key));
  if (!permSession.has("ROOM_MANAGEMENT")) return;
  const id = String(formData.get("room_id") || "");
  if (!id) return;
  const isSuperSession = permSession.has("COMPANY_MANAGEMENT");
  if (!isSuperSession) {
    const r = await prisma.room.findUnique({ where: { id }, include: { floor: { include: { building: { include: { branch: true } } } } } });
    if (!r || r.floor.building.branch.companyId !== (meSession?.companyId ?? undefined)) {
      redirect("/admin/location-management?toast=Tidak%20diizinkan");
    }
  }
  await prisma.room.delete({ where: { id } });
  refreshLocation();
}

async function updateRoom(formData: FormData) {
  "use server";
  const session = await getServerSession(authOptions);
  const emailSession = session?.user?.email ?? "";
  const meSession = emailSession ? await prisma.user.findUnique({ where: { email: emailSession }, include: { role: { include: { permissions: { include: { permission: true } } } } } }) : null;
  const permSession = new Set((meSession?.role?.permissions ?? []).map((rp) => rp.permission.key));
  if (!permSession.has("ROOM_MANAGEMENT")) return;
  const id = String(formData.get("room_id") || "");
  const name = String(formData.get("room_name") || "").trim();
  const floorId = String(formData.get("room_floorId") || "").trim();
  if (!id || !name || !floorId) return;
  const isSuperSession = permSession.has("COMPANY_MANAGEMENT");
  if (!isSuperSession) {
    const fl = await prisma.floor.findUnique({ where: { id: floorId }, include: { building: { include: { branch: true } } } });
    if (!fl || fl.building.branch.companyId !== (meSession?.companyId ?? undefined)) {
      redirect("/admin/location-management?toast=Tidak%20diizinkan");
    }
  }
  await prisma.room.update({ where: { id }, data: { name, floorId } });
  refreshLocation();
  redirect("/admin/location-management?toast=Room%20berhasil%20diperbarui")
}

export default async function LocationManagementPage({ searchParams }: { searchParams?: Record<string, string | string[] | undefined> | Promise<Record<string, string | string[] | undefined>> }) {
  noStore();
  const session = await getServerSession(authOptions);
  const email = session?.user?.email ?? "";
  const me = email ? await prisma.user.findUnique({ where: { email }, include: { role: { include: { permissions: { include: { permission: true } } } } } }) : null;
  const perm = new Set((me?.role?.permissions ?? []).map((rp) => rp.permission.key));
  const hasAny = perm.has("BRANCH_MANAGEMENT") || perm.has("BUILDING_MANAGEMENT") || perm.has("FLOOR_MANAGEMENT") || perm.has("ROOM_MANAGEMENT");
  if (!hasAny) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold">Location Management</h1>
        <p>Anda tidak memiliki permission untuk mengakses halaman ini.</p>
      </div>
    );
  }
  const isSuper = perm.has("COMPANY_MANAGEMENT");
  const cookieStore = await cookies();
  const selectedBranchIdFromSession = cookieStore.get("branchId")?.value;
  const selectedCompanyId = isSuper ? undefined : (me?.companyId ?? undefined);
  
  const [companies, branches, buildings, floors, rooms] = await Promise.all([
    isSuper ? prisma.company.findMany() : prisma.company.findMany({ where: { id: selectedCompanyId } }),
    prisma.branch.findMany({ where: { ...(me?.companyId ? { companyId: me.companyId } : {}) }, include: { company: true } }),
    prisma.building.findMany({ 
      where: { 
        ...(selectedBranchIdFromSession ? { branchId: selectedBranchIdFromSession } : (selectedCompanyId ? { branch: { companyId: selectedCompanyId } } : {})) 
      }, 
      include: { branch: true } 
    }),
    prisma.floor.findMany({ 
      where: { 
        ...(selectedBranchIdFromSession ? { building: { branchId: selectedBranchIdFromSession } } : (selectedCompanyId ? { building: { branch: { companyId: selectedCompanyId } } } : {})) 
      }, 
      include: { building: { include: { branch: true } } } 
    }),
    prisma.room.findMany({ 
      where: { 
        ...(selectedBranchIdFromSession ? { floor: { building: { branchId: selectedBranchIdFromSession } } } : (selectedCompanyId ? { floor: { building: { branch: { companyId: selectedCompanyId } } } } : {})) 
      }, 
      include: { floor: { include: { building: { include: { branch: true } } } } } 
    }),
  ]);
  const sp = ((await searchParams) ?? {}) as Record<string, string | string[] | undefined>;
  const tabParam = sp?.t;
  const tab = typeof tabParam === "string" ? tabParam : "branch";

  const selectedBranch = selectedBranchIdFromSession ? branches.find(b => b.id === selectedBranchIdFromSession) : null;

  return (
    <div className="space-y-10" key={tab}>
      <div className="flex flex-col gap-2">
        <h1 className="text-xl sm:text-2xl font-semibold">Location Management</h1>
        {selectedBranch && (
          <p className="text-xs sm:text-sm text-muted-foreground">
            Menampilkan data untuk branch: <span className="font-semibold text-primary">{selectedBranch.name}</span>
          </p>
        )}
      </div>

      <TabsBar />

      <TabsContent
        branch={
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-medium">Branch</h2>
          <Dialog>
            <DialogTrigger asChild>
              <Button type="button">Tambah Branch</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Tambah Branch</DialogTitle>
              </DialogHeader>
              <form action={createBranch} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                <div className="space-y-2">
                  <Label htmlFor="branch_name">Nama</Label>
                  <Input id="branch_name" name="branch_name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="branch_code">Kode</Label>
                  <Input id="branch_code" name="branch_code" />
                </div>
                <DialogFooter>
                  <Button type="submit">Simpan</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b">
                <th className="p-2">Nama</th>
                <th className="p-2">Kode</th>
                <th className="p-2">Company</th>
                <th className="p-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {branches.map((b) => (
                <tr key={b.id} className="border-b">
                  <td className="p-2">{b.name}</td>
                  <td className="p-2">{b.code}</td>
                  <td className="p-2">{b.company?.name || "-"}</td>
                  <td className="p-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline">Edit</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edit Branch</DialogTitle>
                        </DialogHeader>
                        <form action={updateBranch} className="space-y-4">
                          <input type="hidden" name="branch_id" value={b.id} />
                          <div className="space-y-2">
                            <Label htmlFor={`branch_name_${b.id}`}>Nama</Label>
                            <Input id={`branch_name_${b.id}`} name="branch_name" defaultValue={b.name} />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`branch_code_${b.id}`}>Kode</Label>
                            <Input id={`branch_code_${b.id}`} name="branch_code" defaultValue={b.code} />
                          </div>
                          <DialogFooter>
                            <Button type="submit">Simpan</Button>
                          </DialogFooter>
                        </form>
                      </DialogContent>
                    </Dialog>
                    <form action={deleteBranch} className="inline-flex">
                      <input type="hidden" name="branch_id" value={b.id} />
                      <Button variant="destructive">Hapus</Button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
        }
        building={
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-medium">Building</h2>
          <Dialog>
            <DialogTrigger asChild>
              <Button type="button">Tambah Building</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Tambah Building</DialogTitle>
              </DialogHeader>
              <form action={createBuilding} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                <div className="space-y-2">
                  <Label htmlFor="building_name">Nama</Label>
                  <Input id="building_name" name="building_name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="building_branchId">Branch</Label>
                  <SearchableSelect
                    name="building_branchId"
                    defaultValue={selectedBranchIdFromSession}
                    options={branches.map((b) => ({ label: b.name, value: b.id }))}
                  />
                </div>
                <DialogFooter>
                  <Button type="submit">Simpan</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
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
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline">Edit</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edit Building</DialogTitle>
                        </DialogHeader>
                        <form action={updateBuilding} className="space-y-4">
                          <input type="hidden" name="building_id" value={b.id} />
                          <div className="space-y-2">
                            <Label htmlFor={`building_name_${b.id}`}>Nama</Label>
                            <Input id={`building_name_${b.id}`} name="building_name" defaultValue={b.name} />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`building_branchId_${b.id}`}>Branch</Label>
                            <SearchableSelect
                              name="building_branchId"
                              defaultValue={b.branch.id}
                              options={branches.map((br) => ({ label: br.name, value: br.id }))}
                            />
                          </div>
                          <DialogFooter>
                            <Button type="submit">Simpan</Button>
                          </DialogFooter>
                        </form>
                      </DialogContent>
                    </Dialog>
                    <form action={deleteBuilding} className="inline-flex">
                      <input type="hidden" name="building_id" value={b.id} />
                      <Button variant="destructive">Hapus</Button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
        }
        floor={
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-medium">Floor</h2>
          <Dialog>
            <DialogTrigger asChild>
              <Button type="button">Tambah Floor</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Tambah Floor</DialogTitle>
              </DialogHeader>
              <form action={createFloor} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                <div className="space-y-2">
                  <Label htmlFor="floor_level">Level</Label>
                  <Input id="floor_level" name="floor_level" type="number" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="floor_buildingId">Building</Label>
                  <SearchableSelect
                    name="floor_buildingId"
                    defaultValue={buildings.length === 1 ? buildings[0].id : undefined}
                    options={buildings.map((b) => ({ label: `${b.name} (${b.branch.name})`, value: b.id }))}
                  />
                </div>
                <DialogFooter>
                  <Button type="submit">Simpan</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
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
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline">Edit</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edit Floor</DialogTitle>
                        </DialogHeader>
                        <form action={updateFloor} className="space-y-4">
                          <input type="hidden" name="floor_id" value={f.id} />
                          <div className="space-y-2">
                            <Label htmlFor={`floor_level_${f.id}`}>Level</Label>
                            <Input id={`floor_level_${f.id}`} name="floor_level" type="number" defaultValue={f.level} />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`floor_buildingId_${f.id}`}>Building</Label>
                            <SearchableSelect
                              name="floor_buildingId"
                              defaultValue={f.building.id}
                              options={buildings.map((bd) => ({ label: `${bd.name} (${bd.branch.name})`, value: bd.id }))}
                            />
                          </div>
                          <DialogFooter>
                            <Button type="submit">Simpan</Button>
                          </DialogFooter>
                        </form>
                      </DialogContent>
                    </Dialog>
                    <form action={deleteFloor} className="inline-flex">
                      <input type="hidden" name="floor_id" value={f.id} />
                      <Button variant="destructive">Hapus</Button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
        }
        room={
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-medium">Room</h2>
          <Dialog>
            <DialogTrigger asChild>
              <Button type="button">Tambah Room</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Tambah Room</DialogTitle>
              </DialogHeader>
              <form action={createRoom} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                <div className="space-y-2">
                  <Label htmlFor="room_name">Nama</Label>
                  <Input id="room_name" name="room_name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="room_floorId">Floor</Label>
                  <SearchableSelect
                    name="room_floorId"
                    defaultValue={floors.length === 1 ? floors[0].id : undefined}
                    options={floors.map((f) => ({ label: `${f.building.branch.name} / ${f.building.name} / L${f.level}`, value: f.id }))}
                  />
                </div>
                <DialogFooter>
                  <Button type="submit">Simpan</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
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
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline">Edit</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edit Room</DialogTitle>
                        </DialogHeader>
                        <form action={updateRoom} className="space-y-4">
                          <input type="hidden" name="room_id" value={r.id} />
                          <div className="space-y-2">
                            <Label htmlFor={`room_name_${r.id}`}>Nama</Label>
                            <Input id={`room_name_${r.id}`} name="room_name" defaultValue={r.name} />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`room_floorId_${r.id}`}>Floor</Label>
                            <SearchableSelect
                              name="room_floorId"
                              defaultValue={r.floor.id}
                              options={floors.map((fl) => ({ label: `${fl.building.branch.name} / ${fl.building.name} / L${fl.level}`, value: fl.id }))}
                            />
                          </div>
                          <DialogFooter>
                            <Button type="submit">Simpan</Button>
                          </DialogFooter>
                        </form>
                      </DialogContent>
                    </Dialog>
                    <form action={deleteRoom} className="inline-flex">
                      <input type="hidden" name="room_id" value={r.id} />
                      <Button variant="destructive">Hapus</Button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
        }
      />
    </div>
  );
}