import { prisma } from "@/lib/prisma";
import fs from "node:fs/promises";
import path from "node:path";
import { LogoUpload } from "@/components/logo-upload";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { cookies } from "next/headers";
import { SearchableSelect } from "@/components/ui/select";
import { Plus, Pencil, Trash2, LogIn } from "lucide-react";

async function createDcCompany(formData: FormData) {
  "use server";
  const session = await getServerSession(authOptions);
  const email = session?.user?.email ?? "";
  const me = email ? await prisma.user.findUnique({ where: { email }, include: { role: { include: { permissions: { include: { permission: true } } } } } }) : null;
  const perm = new Set((me?.role?.permissions ?? []).map((rp) => rp.permission.key));
  if (!perm.has("DC_COMPANY_MANAGEMENT")) return;
  const name = String(formData.get("name") || "").trim();
  const address = String(formData.get("address") || "").trim();
  const companyEmail = String(formData.get("company_email") || "").trim();
  const companyPhoneNumber = String(formData.get("company_phone_number") || "").trim();
  const fax = String(formData.get("fax") || "").trim();
  const logo = formData.get("logo") as File | null;
  if (!name) return;
  const created = await prisma.company.create({
    data: {
      name,
      address: address || null,
      companyEmail: companyEmail || null,
      companyPhoneNumber: companyPhoneNumber || null,
      fax: fax || null,
      isDataCenter: true,
    },
  });
  if (logo && logo.size > 0) {
    const type = logo.type as string | undefined;
    const ext = type?.includes("png") ? "png" : type?.includes("jpeg") ? "jpg" : type?.includes("svg") ? "svg" : "png";
    const dir = path.join(process.cwd(), "public", "uploads", "dc-company");
    await fs.mkdir(dir, { recursive: true });
    const filePath = path.join(dir, `${created.id}.${ext}`);
    const buf = Buffer.from(await logo.arrayBuffer());
    await fs.writeFile(filePath, buf);
    const publicUrl = `/uploads/dc-company/${created.id}.${ext}`;
    await prisma.company.update({ where: { id: created.id }, data: { logoUrl: publicUrl } });
  }
  revalidatePath("/admin/settings/dc-company");
  redirect("/admin/settings/dc-company?toast=DC%20Company%20berhasil%20ditambahkan");
}

async function updateDcCompany(formData: FormData) {
  "use server";
  const session = await getServerSession(authOptions);
  const email = session?.user?.email ?? "";
  const me = email ? await prisma.user.findUnique({ where: { email }, include: { role: { include: { permissions: { include: { permission: true } } } } } }) : null;
  const perm = new Set((me?.role?.permissions ?? []).map((rp) => rp.permission.key));
  if (!perm.has("DC_COMPANY_MANAGEMENT")) return;
  const id = String(formData.get("id") || "");
  const name = String(formData.get("name") || "").trim();
  const address = String(formData.get("address") || "").trim();
  const companyEmail = String(formData.get("company_email") || "").trim();
  const companyPhoneNumber = String(formData.get("company_phone_number") || "").trim();
  const fax = String(formData.get("fax") || "").trim();
  const logo = formData.get("logo") as File | null;
  if (!id || !name) return;
  await prisma.company.update({
    where: { id },
    data: {
      name,
      address: address || null,
      companyEmail: companyEmail || null,
      companyPhoneNumber: companyPhoneNumber || null,
      fax: fax || null,
      isDataCenter: true,
    },
  });
  if (logo && logo.size > 0) {
    const type = logo.type as string | undefined;
    const ext = type?.includes("png") ? "png" : type?.includes("jpeg") ? "jpg" : type?.includes("svg") ? "svg" : "png";
    const dir = path.join(process.cwd(), "public", "uploads", "dc-company");
    await fs.mkdir(dir, { recursive: true });
    const filePath = path.join(dir, `${id}.${ext}`);
    const buf = Buffer.from(await logo.arrayBuffer());
    await fs.writeFile(filePath, buf);
    const publicUrl = `/uploads/dc-company/${id}.${ext}`;
    await prisma.company.update({ where: { id }, data: { logoUrl: publicUrl } });
  }
  revalidatePath("/admin/settings/dc-company");
  redirect("/admin/settings/dc-company?toast=DC%20Company%20berhasil%20diperbarui");
}

async function deleteDcCompany(formData: FormData) {
  "use server";
  const session = await getServerSession(authOptions);
  const email = session?.user?.email ?? "";
  const me = email ? await prisma.user.findUnique({ where: { email }, include: { role: { include: { permissions: { include: { permission: true } } } } } }) : null;
  const perm = new Set((me?.role?.permissions ?? []).map((rp) => rp.permission.key));
  if (!perm.has("DC_COMPANY_MANAGEMENT")) return;
  const id = String(formData.get("id") || "");
  if (!id) return;
  await prisma.company.delete({ where: { id } });
  revalidatePath("/admin/settings/dc-company");
}

export default async function DcCompanySettingsPage() {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email ?? "";
  const me = email ? await prisma.user.findUnique({ where: { email }, include: { role: { include: { permissions: { include: { permission: true } } } } } }) : null;
  const perm = new Set((me?.role?.permissions ?? []).map((rp) => rp.permission.key));
  if (!perm.has("DC_COMPANY_MANAGEMENT")) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold">DC Company</h1>
        <p>Anda tidak memiliki permission untuk mengakses halaman ini.</p>
      </div>
    );
  }
  const companies = await prisma.company.findMany({ where: { isDataCenter: true }, orderBy: { name: "asc" } });
  const admins = await prisma.user.findMany({ where: { companyId: { in: companies.map((c) => c.id) } }, include: { role: true }, orderBy: { email: "asc" } });
  const adminsMap = new Map<string, { id: string; email: string; name: string | null; roleId: string | null; roleName: string | null }[]>();
  for (const a of admins) {
    const arr = adminsMap.get(a.companyId ?? "") ?? [];
    arr.push({ id: a.id, email: a.email, name: a.name ?? null, roleId: a.roleId ?? null, roleName: a.role?.name ?? null });
    adminsMap.set(a.companyId ?? "", arr);
  }
  const roles = await prisma.role.findMany({ where: { branch: { companyId: { in: companies.map((c) => c.id) } } }, include: { branch: true }, orderBy: { name: "asc" } });
  const rolesMap = new Map<string, { id: string; name: string }[]>();
  for (const r of roles) {
    const cid = r.branch?.companyId ?? "";
    const arr = rolesMap.get(cid) ?? [];
    arr.push({ id: r.id, name: r.name });
    rolesMap.set(cid, arr);
  }
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-xl font-semibold text-slate-900 tracking-tight">DC Company</h1>
          <p className="text-sm text-slate-500">Manage data center company configurations.</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="h-9 bg-slate-900 hover:bg-slate-800">
              <Plus className="h-4 w-4 mr-2" />
              Tambah DC Company
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-base font-semibold">Tambah DC Company</DialogTitle>
            </DialogHeader>
            <form action={createDcCompany} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="name" className="text-sm font-medium text-slate-700">Nama</Label>
                <Input id="name" name="name" className="h-9 border-slate-200 focus:border-primary focus:ring-primary/20" />
              </div>
              <div className="space-y-3">
                <div className="text-sm font-medium text-slate-700">Contact Information</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="address" className="text-sm font-medium text-slate-700">Address</Label>
                    <Input id="address" name="address" className="h-9 border-slate-200 focus:border-primary focus:ring-primary/20" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="company_email" className="text-sm font-medium text-slate-700">Company Email</Label>
                    <Input id="company_email" name="company_email" type="email" className="h-9 border-slate-200 focus:border-primary focus:ring-primary/20" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="company_phone_number" className="text-sm font-medium text-slate-700">Company Phone Number</Label>
                    <Input id="company_phone_number" name="company_phone_number" type="tel" className="h-9 border-slate-200 focus:border-primary focus:ring-primary/20" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="fax" className="text-sm font-medium text-slate-700">Fax</Label>
                    <Input id="fax" name="fax" className="h-9 border-slate-200 focus:border-primary focus:ring-primary/20" />
                  </div>
                  <div className="space-y-1.5 md:col-span-2">
                    <Label htmlFor="logo" className="text-sm font-medium text-slate-700">Logo</Label>
                    <LogoUpload id="logo" name="logo" />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" className="bg-slate-900 hover:bg-slate-800">Simpan</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="border border-slate-200/80 bg-white">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50">
                  <th className="text-left py-3 px-5 font-medium text-slate-500 text-xs uppercase tracking-wider">Nama</th>
                  <th className="text-left py-3 px-5 font-medium text-slate-500 text-xs uppercase tracking-wider">Email</th>
                  <th className="text-right py-3 px-5 font-medium text-slate-500 text-xs uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {companies.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-3 px-5 font-medium text-slate-900">{c.name}</td>
                    <td className="py-3 px-5 text-slate-600">{c.companyEmail || "-"}</td>
                    <td className="py-3 px-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" className="h-8 border-slate-200 hover:border-slate-300 hover:bg-slate-50">
                              <Pencil className="h-3.5 w-3.5 mr-1.5" />
                              Edit
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-5xl max-h-[80vh] overflow-y-auto scrollbar-none">
                            <DialogHeader>
                              <DialogTitle className="text-base font-semibold">Edit DC Company</DialogTitle>
                            </DialogHeader>
                            <form action={updateDcCompany} className="space-y-4">
                              <input type="hidden" name="id" value={c.id} />
                              <div className="space-y-1.5">
                                <Label htmlFor={`company_name_${c.id}`} className="text-sm font-medium text-slate-700">Nama</Label>
                                <Input id={`company_name_${c.id}`} name="name" defaultValue={c.name} className="h-9 border-slate-200 focus:border-primary focus:ring-primary/20" />
                              </div>
                              <div className="space-y-3">
                                <div className="text-sm font-medium text-slate-700">Contact Information</div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div className="space-y-1.5">
                                    <Label htmlFor={`company_address_${c.id}`} className="text-sm font-medium text-slate-700">Address</Label>
                                    <Input id={`company_address_${c.id}`} name="address" defaultValue={c.address ?? ""} className="h-9 border-slate-200 focus:border-primary focus:ring-primary/20" />
                                  </div>
                                  <div className="space-y-1.5">
                                    <Label htmlFor={`company_email_${c.id}`} className="text-sm font-medium text-slate-700">Company Email</Label>
                                    <Input id={`company_email_${c.id}`} name="company_email" type="email" defaultValue={c.companyEmail ?? ""} className="h-9 border-slate-200 focus:border-primary focus:ring-primary/20" />
                                  </div>
                                  <div className="space-y-1.5">
                                    <Label htmlFor={`company_phone_${c.id}`} className="text-sm font-medium text-slate-700">Company Phone Number</Label>
                                    <Input id={`company_phone_${c.id}`} name="company_phone_number" type="tel" defaultValue={c.companyPhoneNumber ?? ""} className="h-9 border-slate-200 focus:border-primary focus:ring-primary/20" />
                                  </div>
                                  <div className="space-y-1.5">
                                    <Label htmlFor={`company_fax_${c.id}`} className="text-sm font-medium text-slate-700">Fax</Label>
                                    <Input id={`company_fax_${c.id}`} name="fax" defaultValue={c.fax ?? ""} className="h-9 border-slate-200 focus:border-primary focus:ring-primary/20" />
                                  </div>
                                  <div className="space-y-1.5 md:col-span-2">
                                    <Label htmlFor={`company_logo_${c.id}`} className="text-sm font-medium text-slate-700">Logo</Label>
                                    <LogoUpload id={`company_logo_${c.id}`} name="logo" defaultImageUrl={c.logoUrl ?? undefined} />
                                  </div>
                                </div>
                              </div>
                              <DialogFooter>
                                <Button type="submit" className="bg-slate-900 hover:bg-slate-800">Simpan</Button>
                              </DialogFooter>
                            </form>
                            <div className="space-y-4 mt-6">
                              <div className="text-sm font-semibold text-slate-900">Company Admins</div>
                              <form action={createDcAdmin} className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
                                <input type="hidden" name="company_id" value={c.id} />
                                <div className="space-y-1.5">
                                  <Label htmlFor={`admin_email_new_${c.id}`} className="text-sm font-medium text-slate-700">Email</Label>
                                  <Input id={`admin_email_new_${c.id}`} name="email" type="email" className="h-9 border-slate-200 focus:border-primary focus:ring-primary/20" />
                                </div>
                                <div className="space-y-1.5">
                                  <Label htmlFor={`admin_name_new_${c.id}`} className="text-sm font-medium text-slate-700">Nama</Label>
                                  <Input id={`admin_name_new_${c.id}`} name="name" className="h-9 border-slate-200 focus:border-primary focus:ring-primary/20" />
                                </div>
                                <div className="space-y-1.5">
                                  <Label htmlFor={`admin_password_new_${c.id}`} className="text-sm font-medium text-slate-700">Password</Label>
                                  <Input id={`admin_password_new_${c.id}`} name="password" type="password" className="h-9 border-slate-200 focus:border-primary focus:ring-primary/20" />
                                </div>
                                <div className="space-y-1.5">
                                  <Label htmlFor={`admin_role_new_${c.id}`} className="text-sm font-medium text-slate-700">Role</Label>
                                  <SearchableSelect name="role_id" options={(rolesMap.get(c.id) ?? []).map((r) => ({ label: r.name, value: r.id }))} />
                                </div>
                                <DialogFooter>
                                  <Button type="submit" className="h-9 bg-slate-900 hover:bg-slate-800">
                                    <Plus className="h-4 w-4 mr-2" />
                                    Tambah Admin
                                  </Button>
                                </DialogFooter>
                              </form>
                              <div className="overflow-x-auto border border-slate-200 rounded-xl">
                                <table className="w-full text-sm">
                                  <thead>
                                    <tr className="border-b border-slate-100 bg-slate-50/50">
                                      <th className="text-left py-2.5 px-4 font-medium text-slate-500 text-xs uppercase tracking-wider">Email</th>
                                      <th className="text-left py-2.5 px-4 font-medium text-slate-500 text-xs uppercase tracking-wider">Nama</th>
                                      <th className="text-left py-2.5 px-4 font-medium text-slate-500 text-xs uppercase tracking-wider">Role</th>
                                      <th className="text-right py-2.5 px-4 font-medium text-slate-500 text-xs uppercase tracking-wider">Aksi</th>
                                    </tr>
                                  </thead>
                                  <tbody className="divide-y divide-slate-50">
                                    {(adminsMap.get(c.id) ?? []).map((a) => (
                                      <tr key={a.id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="py-2.5 px-4 font-medium text-slate-900">{a.email}</td>
                                        <td className="py-2.5 px-4 text-slate-600">{a.name ?? "-"}</td>
                                        <td className="py-2.5 px-4 text-slate-600">{a.roleName ?? "-"}</td>
                                        <td className="py-2.5 px-4">
                                          <div className="flex items-center justify-end gap-2">
                                            <Dialog>
                                              <DialogTrigger asChild>
                                                <Button variant="outline" size="sm" className="h-8 border-slate-200 hover:border-slate-300 hover:bg-slate-50">
                                                  <Pencil className="h-3.5 w-3.5 mr-1.5" />
                                                  Edit
                                                </Button>
                                              </DialogTrigger>
                                              <DialogContent className="sm:max-w-md">
                                                <DialogHeader>
                                                  <DialogTitle className="text-base font-semibold">Edit Admin</DialogTitle>
                                                </DialogHeader>
                                                <form action={updateDcAdmin} className="space-y-3">
                                                  <input type="hidden" name="id" value={a.id} />
                                                  <input type="hidden" name="company_id" value={c.id} />
                                                  <div className="space-y-1.5">
                                                    <Label htmlFor={`admin_email_edit_${a.id}`} className="text-sm font-medium text-slate-700">Email</Label>
                                                    <Input id={`admin_email_edit_${a.id}`} name="email" type="email" defaultValue={a.email} className="h-9 border-slate-200 focus:border-primary focus:ring-primary/20" />
                                                  </div>
                                                  <div className="space-y-1.5">
                                                    <Label htmlFor={`admin_name_edit_${a.id}`} className="text-sm font-medium text-slate-700">Nama</Label>
                                                    <Input id={`admin_name_edit_${a.id}`} name="name" defaultValue={a.name ?? ""} className="h-9 border-slate-200 focus:border-primary focus:ring-primary/20" />
                                                  </div>
                                                  <div className="space-y-1.5">
                                                    <Label htmlFor={`admin_password_edit_${a.id}`} className="text-sm font-medium text-slate-700">Password</Label>
                                                    <Input id={`admin_password_edit_${a.id}`} name="password" type="password" className="h-9 border-slate-200 focus:border-primary focus:ring-primary/20" />
                                                  </div>
                                                  <div className="space-y-1.5">
                                                    <Label htmlFor={`admin_role_edit_${a.id}`} className="text-sm font-medium text-slate-700">Role</Label>
                                                    <SearchableSelect name="role_id" defaultValue={a.roleId ?? ""} options={(rolesMap.get(c.id) ?? []).map((r) => ({ label: r.name, value: r.id }))} />
                                                  </div>
                                                  <DialogFooter>
                                                    <Button type="submit" className="bg-slate-900 hover:bg-slate-800">Simpan</Button>
                                                  </DialogFooter>
                                                </form>
                                              </DialogContent>
                                            </Dialog>
                                            <form action={impersonateDcAdmin} className="inline-flex">
                                              <input type="hidden" name="id" value={a.id} />
                                              <input type="hidden" name="company_id" value={c.id} />
                                              <Button variant="secondary" size="sm" className="h-8">
                                                <LogIn className="h-3.5 w-3.5 mr-1.5" />
                                                Login as
                                              </Button>
                                            </form>
                                            <form action={deleteDcAdmin} className="inline-flex">
                                              <input type="hidden" name="id" value={a.id} />
                                              <input type="hidden" name="company_id" value={c.id} />
                                              <Button variant="destructive" size="sm" className="bg-red-600 hover:bg-red-700">
                                                <Trash2 className="h-3.5 w-3.5 mr-1.5" />
                                                Hapus
                                              </Button>
                                            </form>
                                          </div>
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <form action={deleteDcCompany} className="inline-flex">
                          <input type="hidden" name="id" value={c.id} />
                          <Button variant="destructive" size="sm" className="bg-red-600 hover:bg-red-700">
                            <Trash2 className="h-3.5 w-3.5 mr-1.5" />
                            Hapus
                          </Button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


async function createDcAdmin(formData: FormData) {
  "use server";
  const session = await getServerSession(authOptions);
  const email = session?.user?.email ?? "";
  const me = email ? await prisma.user.findUnique({ where: { email }, include: { role: { include: { permissions: { include: { permission: true } } } } } }) : null;
  const perm = new Set((me?.role?.permissions ?? []).map((rp) => rp.permission.key));
  if (!perm.has("DC_COMPANY_MANAGEMENT")) return;
  const companyId = String(formData.get("company_id") || "").trim();
  const adminEmail = String(formData.get("email") || "").trim();
  const adminName = String(formData.get("name") || "").trim();
  const password = String(formData.get("password") || "").trim();
  const roleId = String(formData.get("role_id") || "").trim();
  if (!companyId || !adminEmail || !password || !roleId) return;
  const company = await prisma.company.findUnique({ where: { id: companyId } });
  if (!company || !company.isDataCenter) return;
  const role = await prisma.role.findUnique({ where: { id: roleId }, include: { branch: true } });
  if (!role || !role.branch || role.branch.companyId !== companyId) return;
  const hash = await bcrypt.hash(password, 10);
  await prisma.user.create({ data: { email: adminEmail, name: adminName || null, passwordHash: hash, roleId, companyId } });
  revalidatePath("/admin/settings/dc-company");
  redirect("/admin/settings/dc-company?toast=Admin%20DC%20berhasil%20ditambahkan");
}

async function updateDcAdmin(formData: FormData) {
  "use server";
  const session = await getServerSession(authOptions);
  const email = session?.user?.email ?? "";
  const me = email ? await prisma.user.findUnique({ where: { email }, include: { role: { include: { permissions: { include: { permission: true } } } } } }) : null;
  const perm = new Set((me?.role?.permissions ?? []).map((rp) => rp.permission.key));
  if (!perm.has("DC_COMPANY_MANAGEMENT")) return;
  const id = String(formData.get("id") || "").trim();
  const companyId = String(formData.get("company_id") || "").trim();
  const adminEmail = String(formData.get("email") || "").trim();
  const adminName = String(formData.get("name") || "").trim();
  const password = String(formData.get("password") || "").trim();
  const roleId = String(formData.get("role_id") || "").trim();
  if (!id || !companyId || !adminEmail) return;
  const u = await prisma.user.findUnique({ where: { id } });
  if (!u || u.companyId !== companyId) return;
  const data: { email?: string; name?: string | null; passwordHash?: string; roleId?: string } = {};
  data.email = adminEmail;
  data.name = adminName || null;
  if (password) {
    const hash = await bcrypt.hash(password, 10);
    data.passwordHash = hash;
  }
  if (roleId) {
    const role = await prisma.role.findUnique({ where: { id: roleId }, include: { branch: true } });
    if (!role || !role.branch || role.branch.companyId !== companyId) return;
    data.roleId = roleId;
  }
  await prisma.user.update({ where: { id }, data });
  revalidatePath("/admin/settings/dc-company");
  redirect("/admin/settings/dc-company?toast=Admin%20DC%20berhasil%20diperbarui");
}

async function deleteDcAdmin(formData: FormData) {
  "use server";
  const session = await getServerSession(authOptions);
  const email = session?.user?.email ?? "";
  const me = email ? await prisma.user.findUnique({ where: { email }, include: { role: { include: { permissions: { include: { permission: true } } } } } }) : null;
  const perm = new Set((me?.role?.permissions ?? []).map((rp) => rp.permission.key));
  if (!perm.has("DC_COMPANY_MANAGEMENT")) return;
  const id = String(formData.get("id") || "").trim();
  const companyId = String(formData.get("company_id") || "").trim();
  if (!id || !companyId) return;
  const u = await prisma.user.findUnique({ where: { id } });
  if (!u || u.companyId !== companyId) return;
  await prisma.user.delete({ where: { id } });
  revalidatePath("/admin/settings/dc-company");
}

async function impersonateDcAdmin(formData: FormData) {
  "use server";
  const session = await getServerSession(authOptions);
  const email = session?.user?.email ?? "";
  const me = email ? await prisma.user.findUnique({ where: { email }, include: { role: { include: { permissions: { include: { permission: true } } } } } }) : null;
  const perm = new Set((me?.role?.permissions ?? []).map((rp) => rp.permission.key));
  if (!perm.has("DC_COMPANY_MANAGEMENT")) return;
  const id = String(formData.get("id") || "").trim();
  const companyId = String(formData.get("company_id") || "").trim();
  if (!id || !companyId) return;
  const u = await prisma.user.findUnique({ where: { id }, include: { role: true } });
  if (!u || u.companyId !== companyId) return;
  const store = await cookies();
  store.set("impersonateUserId", id, { path: "/" });
  revalidatePath("/admin");
  revalidatePath("/admin/settings/dc-company");
  redirect("/admin?toast=Login%20as%20berhasil");
}
