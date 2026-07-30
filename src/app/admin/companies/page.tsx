import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { LogoUpload } from "@/components/logo-upload";
import path from "path";
import { promises as fs } from "fs";
import { Building2, Mail, Phone, Trash2, Search, ExternalLink } from "lucide-react";
import Link from "next/link";

async function createCompany(formData: FormData) {
  "use server";
  const session = await getServerSession(authOptions);
  const email = session?.user?.email ?? "";
  const me = email ? await prisma.user.findUnique({ where: { email }, include: { role: { include: { permissions: { include: { permission: true } } } } } }) : null;
  const perm = new Set((me?.role?.permissions ?? []).map((rp) => rp.permission.key));
  if (!perm.has("COMPANY_MANAGEMENT")) return;
  const name = String(formData.get("name") || "").trim();
  const address = String(formData.get("address") || "").trim();
  const companyEmail = String(formData.get("company_email") || "").trim();
  const companyPhoneNumber = String(formData.get("company_phone_number") || "").trim();
  const fax = String(formData.get("fax") || "").trim();
  const logo = formData.get("logo") as File | null;
  if (!name) return;
  if (!me?.companyId) {
    redirect("/admin/companies?toast=Company%20sesi%20tidak%20ditemukan");
  }
  const created = await prisma.company.create({
    data: {
      name,
      address: address || null,
      companyEmail: companyEmail || null,
      companyPhoneNumber: companyPhoneNumber || null,
      fax: fax || null,
      parentId: me?.companyId ?? null,
    },
  });
  if (logo && logo.size > 0) {
    const type = logo.type as string | undefined;
    const ext = type?.includes("png") ? "png" : type?.includes("jpeg") ? "jpg" : type?.includes("svg") ? "svg" : "png";
    const dir = path.join(process.cwd(), "public", "uploads", "company");
    await fs.mkdir(dir, { recursive: true });
    const filePath = path.join(dir, `${created.id}.${ext}`);
    const buf = Buffer.from(await logo.arrayBuffer());
    await fs.writeFile(filePath, buf);
    const publicUrl = `/uploads/company/${created.id}.${ext}`;
    await prisma.company.update({ where: { id: created.id }, data: { logoUrl: publicUrl } });
  }
  revalidatePath("/admin/companies");
  redirect("/admin/companies?toast=Company%20berhasil%20ditambahkan")
}

async function deleteCompany(formData: FormData) {
  "use server";
  const session = await getServerSession(authOptions);
  const email = session?.user?.email ?? "";
  const me = email ? await prisma.user.findUnique({ where: { email }, include: { role: { include: { permissions: { include: { permission: true } } } } } }) : null;
  const perm = new Set((me?.role?.permissions ?? []).map((rp) => rp.permission.key));
  if (!perm.has("COMPANY_MANAGEMENT")) return;
  const id = String(formData.get("id") || "");
  if (!id) return;
  await prisma.company.delete({ where: { id } });
  revalidatePath("/admin/companies");
}

export default async function CompaniesPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ q?: string }> 
}) {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email ?? "";
  const me = email ? await prisma.user.findUnique({ where: { email }, include: { role: { include: { permissions: { include: { permission: true } } } } } }) : null;
  const perm = new Set((me?.role?.permissions ?? []).map((rp) => rp.permission.key));
  if (!perm.has("COMPANY_MANAGEMENT")) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold">Company Management</h1>
        <p>Anda tidak memiliki permission untuk mengakses halaman ini.</p>
      </div>
    );
  }

  const query = (await searchParams).q ?? "";

  const companies = await prisma.company.findMany({ 
    where: { 
      isDataCenter: false, 
      ...(me?.companyId ? { parentId: me.companyId } : {}),
      OR: [
        { name: { contains: query } },
        { companyEmail: { contains: query } },
        { address: { contains: query } }
      ]
    }, 
    orderBy: { name: "asc" }, 
    include: { _count: { select: { customers: true, branches: true } } } 
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">Company Management</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">Daftar semua perusahaan mitra dan sub-perusahaan.</p>
        </div>
        <div className="flex items-center gap-3">
          <form className="relative flex-1 sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input 
              name="q" 
              placeholder="Cari nama, email, atau alamat..." 
              defaultValue={query}
              className="pl-9 h-9 border-slate-200 focus:border-primary focus:ring-primary/20"
            />
          </form>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="h-9 bg-slate-900 hover:bg-slate-800 text-white shadow-sm">
                Tambah Company
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-base font-semibold">Tambah Company</DialogTitle>
              </DialogHeader>
              <form action={createCompany} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium text-slate-700">Nama</Label>
                  <Input id="name" name="name" placeholder="Nama Perusahaan" required className="h-9 border-slate-200 focus:border-primary focus:ring-primary/20" />
                </div>
                <div className="space-y-3">
                  <div className="text-sm font-medium text-slate-700">Contact Information</div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="address" className="text-sm font-medium text-slate-700">Address</Label>
                      <Input id="address" name="address" placeholder="Alamat Lengkap" className="h-9 border-slate-200 focus:border-primary focus:ring-primary/20" />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="company_email" className="text-sm font-medium text-slate-700">Company Email</Label>
                      <Input id="company_email" name="company_email" type="email" placeholder="email@perusahaan.com" className="h-9 border-slate-200 focus:border-primary focus:ring-primary/20" />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="company_phone_number" className="text-sm font-medium text-slate-700">Company Phone Number</Label>
                      <Input id="company_phone_number" name="company_phone_number" type="tel" placeholder="Nomor Telepon" className="h-9 border-slate-200 focus:border-primary focus:ring-primary/20" />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="fax" className="text-sm font-medium text-slate-700">Fax</Label>
                      <Input id="fax" name="fax" placeholder="Nomor Fax" className="h-9 border-slate-200 focus:border-primary focus:ring-primary/20" />
                    </div>
                    <div className="space-y-1.5 md:col-span-2">
                      <Label htmlFor="company_logo" className="text-sm font-medium text-slate-700">Logo</Label>
                      <LogoUpload id="company_logo" name="logo" />
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
      </div>

      <div className="rounded-xl border border-slate-200/80 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="text-left py-3 px-5 font-medium text-slate-500 text-xs uppercase tracking-wider">Company</th>
                <th className="text-left py-3 px-5 font-medium text-slate-500 text-xs uppercase tracking-wider">Email</th>
                <th className="text-left py-3 px-5 font-medium text-slate-500 text-xs uppercase tracking-wider">Phone</th>
                <th className="text-center py-3 px-5 font-medium text-slate-500 text-xs uppercase tracking-wider">Users</th>
                <th className="text-center py-3 px-5 font-medium text-slate-500 text-xs uppercase tracking-wider">Branches</th>
                <th className="text-right py-3 px-5 font-medium text-slate-500 text-xs uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {companies.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-16">
                    <div className="flex flex-col items-center justify-center text-center">
                      <div className="h-12 w-12 rounded-full bg-slate-50 flex items-center justify-center mb-3">
                        <Building2 className="h-6 w-6 text-slate-400" />
                      </div>
                      <p className="text-sm font-medium text-slate-900">Tidak ada perusahaan ditemukan</p>
                      <p className="text-xs text-slate-500 mt-1">Coba ubah kata kunci pencarian atau tambah perusahaan baru.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                companies.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="py-3 px-5">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden shrink-0">
                          {c.logoUrl ? (
                            <img src={c.logoUrl} alt={c.name} className="h-full w-full object-contain p-1" />
                          ) : (
                            <Building2 className="h-5 w-5 text-slate-400" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <div className="font-medium text-slate-900 truncate">{c.name}</div>
                          <div className="text-xs text-slate-500 truncate">{c.address || "-"}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-5">
                      <div className="flex items-center gap-2 text-slate-600">
                        <Mail className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">{c.companyEmail || "-"}</span>
                      </div>
                    </td>
                    <td className="py-3 px-5">
                      <div className="flex items-center gap-2 text-slate-600">
                        <Phone className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">{c.companyPhoneNumber || "-"}</span>
                      </div>
                    </td>
                    <td className="py-3 px-5 text-center">
                      <span className="inline-flex items-center justify-center min-w-[2rem] h-6 px-2 rounded-full bg-slate-100 text-xs font-medium text-slate-700">
                        {c._count.customers}
                      </span>
                    </td>
                    <td className="py-3 px-5 text-center">
                      <span className="inline-flex items-center justify-center min-w-[2rem] h-6 px-2 rounded-full bg-slate-100 text-xs font-medium text-slate-700">
                        {c._count.branches}
                      </span>
                    </td>
                    <td className="py-3 px-5 text-right">
                      <div className="flex items-center justify-end gap-1 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-slate-900 hover:bg-slate-100" asChild>
                          <Link href={`/admin/companies/${c.id}`} title={`Detail ${c.name}`}>
                            <ExternalLink className="h-3.5 w-3.5" />
                          </Link>
                        </Button>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50" title="Hapus">
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle className="text-base font-semibold">Hapus Company</DialogTitle>
                            </DialogHeader>
                            <div className="py-4 text-sm text-slate-600">
                              Apakah Anda yakin ingin menghapus perusahaan <strong className="text-slate-900">{c.name}</strong>? Tindakan ini tidak dapat dibatalkan.
                            </div>
                            <DialogFooter>
                              <form action={deleteCompany}>
                                <input type="hidden" name="id" value={c.id} />
                                <Button variant="destructive" type="submit" className="bg-red-600 hover:bg-red-700">Hapus Permanen</Button>
                              </form>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
