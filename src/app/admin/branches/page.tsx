import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

async function createBranch(formData: FormData) {
  "use server";
  const session = await getServerSession(authOptions);
  const email = session?.user?.email ?? "";
  const me = email ? await prisma.user.findUnique({ where: { email }, include: { role: { include: { permissions: { include: { permission: true } } } } } }) : null;
  const perm = new Set((me?.role?.permissions ?? []).map((rp) => rp.permission.key));
  if (!perm.has("BRANCH_MANAGEMENT")) return;
  const name = String(formData.get("name") || "").trim();
  const code = String(formData.get("code") || "").trim();
  const companyId = String(formData.get("companyId") || "").trim() || undefined;
  if (!name || !code) return;
  const effectiveCompanyId = perm.has("COMPANY_MANAGEMENT") ? companyId : (me?.companyId ?? undefined);
  await prisma.branch.create({ data: { name, code, companyId: effectiveCompanyId } });
  revalidatePath("/admin/branches");
  redirect("/admin/branches?toast=Branch%20berhasil%20ditambahkan")
}

async function deleteBranch(formData: FormData) {
  "use server";
  const session = await getServerSession(authOptions);
  const email = session?.user?.email ?? "";
  const me = email ? await prisma.user.findUnique({ where: { email }, include: { role: { include: { permissions: { include: { permission: true } } } } } }) : null;
  const perm = new Set((me?.role?.permissions ?? []).map((rp) => rp.permission.key));
  if (!perm.has("BRANCH_MANAGEMENT")) return;
  const id = String(formData.get("id") || "");
  if (!id) return;
  await prisma.branch.delete({ where: { id } });
  revalidatePath("/admin/branches");
}

async function updateBranch(formData: FormData) {
  "use server";
  const session = await getServerSession(authOptions);
  const email = session?.user?.email ?? "";
  const me = email ? await prisma.user.findUnique({ where: { email }, include: { role: { include: { permissions: { include: { permission: true } } } } } }) : null;
  const perm = new Set((me?.role?.permissions ?? []).map((rp) => rp.permission.key));
  if (!perm.has("BRANCH_MANAGEMENT")) return;
  const id = String(formData.get("id") || "");
  const name = String(formData.get("name") || "").trim();
  const code = String(formData.get("code") || "").trim();
  const companyId = String(formData.get("companyId") || "").trim() || undefined;
  if (!id || !name || !code) return;
  const effectiveCompanyId = perm.has("COMPANY_MANAGEMENT") ? companyId : (me?.companyId ?? undefined);
  await prisma.branch.update({ where: { id }, data: { name, code, companyId: effectiveCompanyId } });
  revalidatePath("/admin/branches");
  redirect("/admin/branches?toast=Branch%20berhasil%20diperbarui")
}

export default async function BranchesPage() {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email ?? "";
  const me = email ? await prisma.user.findUnique({ where: { email }, include: { role: { include: { permissions: { include: { permission: true } } } } } }) : null;
  const perm = new Set((me?.role?.permissions ?? []).map((rp) => rp.permission.key));
  if (!perm.has("BRANCH_MANAGEMENT")) {
    return (
      <div className="space-y-4">
      <h1 className="text-xl sm:text-2xl font-semibold">Branch Management</h1>
        <p>Anda tidak memiliki permission untuk mengakses halaman ini.</p>
      </div>
    );
  }
  const isSuper = perm.has("COMPANY_MANAGEMENT");
  const [branches, companies] = await Promise.all([
    prisma.branch.findMany({ where: isSuper ? {} : { companyId: me?.companyId ?? undefined }, include: { company: true } }),
    isSuper ? prisma.company.findMany() : prisma.company.findMany({ where: { id: me?.companyId ?? undefined } }),
  ]);
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Branch Management</h1>
      <form action={createBranch} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        <div className="space-y-2">
          <Label htmlFor="name">Nama</Label>
          <Input id="name" name="name" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="code">Kode</Label>
          <Input id="code" name="code" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="companyId">Company</Label>
          <select
            name="companyId"
            id="companyId"
            className={cn("border-input text-sm rounded-md border bg-transparent px-3 py-2 shadow-xs outline-none focus-visible:ring-[3px] focus-visible:border-ring w-full")}
          >
            <option value="">-</option>
            {companies.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
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
                        <input type="hidden" name="id" value={b.id} />
                        <div className="space-y-2">
                          <Label htmlFor={`branch_name_${b.id}`}>Nama</Label>
                          <Input id={`branch_name_${b.id}`} name="name" defaultValue={b.name} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`branch_code_${b.id}`}>Kode</Label>
                          <Input id={`branch_code_${b.id}`} name="code" defaultValue={b.code} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`branch_company_${b.id}`}>Company</Label>
                          <select
                            id={`branch_company_${b.id}`}
                            name="companyId"
                            defaultValue={b.company?.id || ""}
                            className={cn("border-input text-sm rounded-md border bg-transparent px-3 py-2 shadow-xs outline-none focus-visible:ring-[3px] focus-visible:border-ring w-full")}
                          >
                            <option value="">-</option>
                            {companies.map((c) => (
                              <option key={c.id} value={c.id}>{c.name}</option>
                            ))}
                          </select>
                        </div>
                        <DialogFooter>
                          <Button type="submit">Simpan</Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                  <form action={deleteBranch} className="inline-flex">
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