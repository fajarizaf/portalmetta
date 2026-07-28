import { prisma } from "@/lib/prisma";
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
import { CompanyBranchFields } from "@/components/company-branch-fields";
import { LogoUpload } from "@/components/logo-upload";
import fs from "node:fs/promises";
import path from "node:path";
import { SearchableSelect } from "@/components/ui/select";
import bcrypt from "bcryptjs";
import { UserPlus } from "lucide-react";

async function createAdmin(formData: FormData) {
  "use server";
  const session = await getServerSession(authOptions);
  const emailSession = session?.user?.email ?? "";
  const meSession = emailSession ? await prisma.user.findUnique({ where: { email: emailSession }, include: { role: { include: { permissions: { include: { permission: true } } } } } }) : null;
  const permSession = new Set((meSession?.role?.permissions ?? []).map((rp) => rp.permission.key));
  if (!permSession.has("ADMIN_PANEL_ACCESS")) return;
  const email = String(formData.get("email") || "").trim();
  const name = String(formData.get("name") || "").trim();
  const firstName = String(formData.get("first_name") || "").trim();
  const lastName = String(formData.get("last_name") || "").trim();
  const emailAddress = String(formData.get("email_address") || "").trim();
  const address = String(formData.get("address") || "").trim();
  const phoneNumber = String(formData.get("phone_number") || "").trim();
  const password = String(formData.get("password") || "").trim();
  const branchIds = formData.getAll("branchId").map(String).filter(Boolean);
  const roleIdInput = String(formData.get("roleId") || "").trim();
  const avatar = formData.get("avatar") as File | null;
  const finalEmail = email || emailAddress;
  const finalName = name || [firstName, lastName].filter(Boolean).join(" ");
  if (!finalEmail || !password || branchIds.length === 0) return;
  const primaryBranchId = branchIds[0];
  let roleId = roleIdInput;
  if (!roleId) {
    let role = await prisma.role.findFirst({ where: { name: "ADMIN", branchId: primaryBranchId } });
    if (!role) {
      role = await prisma.role.create({ data: { name: "ADMIN", branchId: primaryBranchId } });
      const allPerms = await prisma.permission.findMany();
      for (const perm of allPerms) {
        await prisma.rolePermission.create({ data: { roleId: role.id, permissionId: perm.id } });
      }
    }
    roleId = role.id;
  }
  const formCompanyId = String(formData.get("companyId") || "").trim();
  const effectiveCompanyId = permSession.has("COMPANY_MANAGEMENT") && formCompanyId ? formCompanyId : (meSession?.companyId ?? null);
  if (!effectiveCompanyId) return;
  const validBranches = await prisma.branch.findMany({ where: { id: { in: branchIds }, companyId: effectiveCompanyId } });
  if (validBranches.length !== branchIds.length) return;
  const hash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({ data: { email: finalEmail, name: finalName, address, phoneNumber, companyId: effectiveCompanyId, passwordHash: hash, roleId } });
  if (avatar && avatar.size > 0) {
    const type = avatar.type as string | undefined;
    const ext = type?.includes("png") ? "png" : type?.includes("jpeg") ? "jpg" : type?.includes("svg") ? "svg" : "png";
    const dir = path.join(process.cwd(), "public", "uploads", "avatars");
    await fs.mkdir(dir, { recursive: true });
    const filePath = path.join(dir, `${user.id}.${ext}`);
    const buf = Buffer.from(await avatar.arrayBuffer());
    await fs.writeFile(filePath, buf);
  }
  for (const bid of branchIds) {
    await prisma.userBranchAssignment.create({ data: { userId: user.id, branchId: bid } });
  }
  revalidatePath("/admin/admins");
  redirect("/admin/admins?toast=Admin%20berhasil%20ditambahkan")
}

async function deleteAdmin(formData: FormData) {
  "use server";
  const session = await getServerSession(authOptions);
  const emailSession = session?.user?.email ?? "";
  const meSession = emailSession ? await prisma.user.findUnique({ where: { email: emailSession }, include: { role: { include: { permissions: { include: { permission: true } } } } } }) : null;
  const permSession = new Set((meSession?.role?.permissions ?? []).map((rp) => rp.permission.key));
  if (!permSession.has("ADMIN_PANEL_ACCESS")) return;
  const id = String(formData.get("id") || "");
  if (!id) return;
  await prisma.user.delete({ where: { id } });
  revalidatePath("/admin/admins");
}

async function updateAdmin(formData: FormData) {
  "use server";
  const session = await getServerSession(authOptions);
  const emailSession = session?.user?.email ?? "";
  const meSession = emailSession ? await prisma.user.findUnique({ where: { email: emailSession }, include: { role: { include: { permissions: { include: { permission: true } } } } } }) : null;
  const permSession = new Set((meSession?.role?.permissions ?? []).map((rp) => rp.permission.key));
  if (!permSession.has("ADMIN_PANEL_ACCESS")) return;
  const id = String(formData.get("id") || "");
  const email = String(formData.get("email") || "").trim();
  const name = String(formData.get("name") || "").trim();
  const firstName = String(formData.get("first_name") || "").trim();
  const lastName = String(formData.get("last_name") || "").trim();
  const emailAddress = String(formData.get("email_address") || "").trim();
  const address = String(formData.get("address") || "").trim();
  const phoneNumber = String(formData.get("phone_number") || "").trim();
  const password = String(formData.get("password") || "").trim();
  const branchIds = formData.getAll("branchId").map(String);
  const roleId = String(formData.get("roleId") || "").trim();
  const avatar = formData.get("avatar") as File | null;
  const finalEmail = email || emailAddress;
  const finalName = name || [firstName, lastName].filter(Boolean).join(" ");
  if (!id || !finalEmail || branchIds.length === 0) return;
  const data: { email: string; name?: string; address?: string | null; phoneNumber?: string | null; companyId?: string | null; passwordHash?: string; roleId?: string } = { email: finalEmail };
  if (finalName) data.name = finalName;
  data.address = address || null;
  data.phoneNumber = phoneNumber || null;
  const formCompanyId = String(formData.get("companyId") || "").trim();
  const effectiveCompanyId = permSession.has("COMPANY_MANAGEMENT") && formCompanyId ? formCompanyId : (meSession?.companyId ?? null);
  if (!effectiveCompanyId) return;
  data.companyId = effectiveCompanyId;
  if (password) {
    const hash = await bcrypt.hash(password, 10);
    data.passwordHash = hash;
  }
  if (roleId) data.roleId = roleId;
  await prisma.user.update({ where: { id }, data });
  if (avatar && avatar.size > 0) {
    const type = avatar.type as string | undefined;
    const ext = type?.includes("png") ? "png" : type?.includes("jpeg") ? "jpg" : type?.includes("svg") ? "svg" : "png";
    const dir = path.join(process.cwd(), "public", "uploads", "avatars");
    await fs.mkdir(dir, { recursive: true });
    const filePath = path.join(dir, `${id}.${ext}`);
    const buf = Buffer.from(await avatar.arrayBuffer());
    await fs.writeFile(filePath, buf);
  }
  await prisma.userBranchAssignment.deleteMany({ where: { userId: id } });
  const validBranches = await prisma.branch.findMany({ where: { id: { in: branchIds }, companyId: effectiveCompanyId } });
  for (const bid of validBranches.map((b) => b.id)) {
    await prisma.userBranchAssignment.create({ data: { userId: id, branchId: bid } });
  }
  revalidatePath("/admin/admins");
  redirect("/admin/admins?toast=Admin%20berhasil%20diperbarui")
}

export default async function AdminsPage({ searchParams }: { searchParams?: Record<string, string | string[] | undefined> | Promise<Record<string, string | string[] | undefined>> }) {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email ?? "";
  const me = email ? await prisma.user.findUnique({ where: { email }, include: { role: { include: { permissions: { include: { permission: true } } } } } }) : null;
  const perm = new Set((me?.role?.permissions ?? []).map((rp) => rp.permission.key));
  const isSuper = perm.has("COMPANY_MANAGEMENT");
  if (!perm.has("ADMIN_PANEL_ACCESS")) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold">Admin Management</h1>
        <p>Anda tidak memiliki permission untuk mengakses halaman ini.</p>
      </div>
    );
  }
  const assigned = me
    ? await prisma.branch.findMany({ where: { admins: { some: { userId: me.id } }, companyId: me.companyId ?? undefined }, orderBy: { name: "asc" } })
    : [];
  const branches = await prisma.branch.findMany({ where: { companyId: me?.companyId ?? undefined }, orderBy: { name: "asc" } });
  const companies = isSuper
    ? await prisma.company.findMany({ orderBy: { name: "asc" } })
    : me?.companyId
    ? await prisma.company.findMany({ where: { id: me.companyId } })
    : [];
  const allBranches = isSuper
    ? await prisma.branch.findMany({ orderBy: { name: "asc" } })
    : branches;
  const cookieStore = await cookies();
  const cookieBranchId = cookieStore.get("branchId")?.value;
  const sp = ((await searchParams) ?? {}) as Record<string, string | string[] | undefined>;
  const selectedCandidate = cookieBranchId ?? (typeof sp?.branchId === "string" ? (sp?.branchId as string) : assigned[0]?.id ?? branches[0]?.id);
  const allowedBranchIds = new Set(branches.map((b) => b.id));
  const selectedBranchId = allowedBranchIds.has(String(selectedCandidate)) ? selectedCandidate : branches[0]?.id;
  const roles = selectedBranchId ? await prisma.role.findMany({ where: { branchId: selectedBranchId }, orderBy: { name: "asc" } }) : [];
  const roleNameFilter = typeof sp?.role === "string" ? String(sp?.role) : "ALL";
  const admins = await prisma.user.findMany({
    where: {
      assignedBranches: { some: { branchId: selectedBranchId } },
      ...(isSuper ? {} : { companyId: me?.companyId ?? undefined }),
      ...(roleNameFilter !== "ALL" ? { role: { name: roleNameFilter } } : {}),
    },
    include: { assignedBranches: true, role: { include: { permissions: { include: { permission: true } } } } },
  });
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-xl font-semibold text-slate-900 tracking-tight">Admin Management</h1>
          <p className="text-sm text-slate-500">Kelola akun admin dan akses branch.</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="h-9 bg-slate-900 hover:bg-slate-800">
              <UserPlus className="h-4 w-4 mr-2" />
              Tambah Admin
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-4xl max-h-[80vh] overflow-y-auto scrollbar-none">
            <DialogHeader>
              <DialogTitle className="text-base font-semibold">Tambah Admin</DialogTitle>
            </DialogHeader>
            <form action={createAdmin} className="space-y-5">
              <div className="space-y-3">
                <div className="text-sm font-medium text-slate-700">Personal Information</div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="first_name" className="text-sm font-medium text-slate-700">First Name</Label>
                    <Input id="first_name" name="first_name" className="h-9 border-slate-200 focus:border-primary focus:ring-primary/20" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="last_name" className="text-sm font-medium text-slate-700">Last Name</Label>
                    <Input id="last_name" name="last_name" className="h-9 border-slate-200 focus:border-primary focus:ring-primary/20" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="email_address" className="text-sm font-medium text-slate-700">Email Address</Label>
                    <Input id="email_address" name="email_address" type="email" className="h-9 border-slate-200 focus:border-primary focus:ring-primary/20" />
                  </div>
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="avatar" className="text-sm font-medium text-slate-700">Avatar</Label>
                <LogoUpload id="avatar" name="avatar" />
              </div>
              <div className="space-y-3">
                <div className="text-sm font-medium text-slate-700">Contact Information</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="address" className="text-sm font-medium text-slate-700">Address</Label>
                    <Input id="address" name="address" className="h-9 border-slate-200 focus:border-primary focus:ring-primary/20" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="phone_number" className="text-sm font-medium text-slate-700">Phone Number</Label>
                    <Input id="phone_number" name="phone_number" type="tel" className="h-9 border-slate-200 focus:border-primary focus:ring-primary/20" />
                  </div>
                </div>
              </div>
              <CompanyBranchFields
                companies={companies}
                branches={allBranches}
                isSuper={isSuper}
                defaultCompanyId={me?.companyId ?? ""}
                defaultSelectedBranchId={selectedBranchId}
                selectId="companyId"
                showCompanySelect={isSuper}
              />
              <div className="space-y-1.5">
                <Label htmlFor="password" className="text-sm font-medium text-slate-700">Password</Label>
                <Input id="password" name="password" type="password" className="h-9 border-slate-200 focus:border-primary focus:ring-primary/20" />
              </div>
              
              <div className="space-y-1.5">
                <Label htmlFor="roleId" className="text-sm font-medium text-slate-700">Role</Label>
                <SearchableSelect name="roleId" options={roles.map((r) => ({ label: r.name, value: r.id }))} />
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
                  <th className="text-left py-3 px-5 font-medium text-slate-500 text-xs uppercase tracking-wider">Email</th>
                  <th className="text-left py-3 px-5 font-medium text-slate-500 text-xs uppercase tracking-wider">Name</th>
                  <th className="text-right py-3 px-5 font-medium text-slate-500 text-xs uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {admins.map((a) => (
                  <tr key={a.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-3 px-5 font-medium text-slate-900">{a.email}</td>
                    <td className="py-3 px-5 text-slate-600">{a.name}</td>
                    <td className="py-3 px-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" className="h-8 border-slate-200 hover:border-slate-300 hover:bg-slate-50">Edit</Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-4xl max-h-[80vh] overflow-y-auto scrollbar-none">
                            <DialogHeader>
                              <DialogTitle className="text-base font-semibold">Edit Admin</DialogTitle>
                            </DialogHeader>
                            <form action={updateAdmin} className="space-y-4">
                              <input type="hidden" name="id" value={a.id} />
                              <div className="space-y-3">
                                <div className="text-sm font-medium text-slate-700">Personal Information</div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                  <div className="space-y-1.5">
                                    <Label htmlFor={`admin_first_name_${a.id}`} className="text-sm font-medium text-slate-700">First Name</Label>
                                    <Input id={`admin_first_name_${a.id}`} name="first_name" defaultValue={(a.name ?? "").split(" ")[0] ?? ""} className="h-9 border-slate-200 focus:border-primary focus:ring-primary/20" />
                                  </div>
                                  <div className="space-y-1.5">
                                    <Label htmlFor={`admin_last_name_${a.id}`} className="text-sm font-medium text-slate-700">Last Name</Label>
                                    <Input id={`admin_last_name_${a.id}`} name="last_name" defaultValue={(a.name ?? "").split(" ").slice(1).join(" ")} className="h-9 border-slate-200 focus:border-primary focus:ring-primary/20" />
                                  </div>
                                  <div className="space-y-1.5">
                                    <Label htmlFor={`admin_email_address_${a.id}`} className="text-sm font-medium text-slate-700">Email Address</Label>
                                    <Input id={`admin_email_address_${a.id}`} name="email_address" type="email" defaultValue={a.email} className="h-9 border-slate-200 focus:border-primary focus:ring-primary/20" />
                                  </div>
                                </div>
                              </div>
                              <div className="space-y-1.5">
                                <Label htmlFor={`admin_avatar_${a.id}`} className="text-sm font-medium text-slate-700">Avatar</Label>
                                <LogoUpload id={`admin_avatar_${a.id}`} name="avatar" />
                              </div>
                              <div className="space-y-3">
                                <div className="text-sm font-medium text-slate-700">Contact Information</div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div className="space-y-1.5">
                                    <Label htmlFor={`admin_address_${a.id}`} className="text-sm font-medium text-slate-700">Address</Label>
                                    <Input id={`admin_address_${a.id}`} name="address" defaultValue={a.address ?? ""} className="h-9 border-slate-200 focus:border-primary focus:ring-primary/20" />
                                  </div>
                                  <div className="space-y-1.5">
                                    <Label htmlFor={`admin_phone_number_${a.id}`} className="text-sm font-medium text-slate-700">Phone Number</Label>
                                    <Input id={`admin_phone_number_${a.id}`} name="phone_number" type="tel" defaultValue={a.phoneNumber ?? ""} className="h-9 border-slate-200 focus:border-primary focus:ring-primary/20" />
                                  </div>
                                </div>
                              </div>
                              <CompanyBranchFields
                                companies={companies}
                                branches={allBranches}
                                isSuper={isSuper}
                                defaultCompanyId={a.companyId ?? me?.companyId ?? ""}
                                selectedBranchIds={new Set(a.assignedBranches.map((ab) => ab.branchId))}
                                selectId={`admin_company_${a.id}`}
                                showCompanySelect={isSuper}
                              />
                              <div className="space-y-1.5">
                                <Label htmlFor={`admin_password_${a.id}`} className="text-sm font-medium text-slate-700">Password baru</Label>
                                <Input id={`admin_password_${a.id}`} name="password" type="password" placeholder="(opsional)" className="h-9 border-slate-200 focus:border-primary focus:ring-primary/20" />
                              </div>
                              <div className="space-y-1.5">
                                <Label htmlFor={`admin_role_${a.id}`} className="text-sm font-medium text-slate-700">Role</Label>
                                <SearchableSelect name="roleId" defaultValue={a.roleId ?? ""} options={roles.map((r) => ({ label: r.name, value: r.id }))} />
                              </div>
                              
                              <DialogFooter>
                                <Button type="submit" className="bg-slate-900 hover:bg-slate-800">Simpan</Button>
                              </DialogFooter>
                            </form>
                          </DialogContent>
                        </Dialog>
                        <form action={deleteAdmin} className="inline-flex">
                          <input type="hidden" name="id" value={a.id} />
                          <Button variant="destructive" size="sm" className="bg-red-600 hover:bg-red-700">Hapus</Button>
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
