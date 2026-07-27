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
import { Building, Mail, Phone, ExternalLink, Trash2, Search } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Company Management</h1>
          <p className="text-muted-foreground">Daftar semua perusahaan mitra dan sub-perusahaan.</p>
        </div>
        <div className="flex items-center gap-2">
          <form className="relative flex-1 md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              name="q" 
              placeholder="Cari nama, email, atau alamat..." 
              defaultValue={query}
              className="pl-9"
            />
          </form>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Tambah Company</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Tambah Company</DialogTitle>
              </DialogHeader>
              <form action={createCompany} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nama</Label>
                  <Input id="name" name="name" placeholder="Nama Perusahaan" required />
                </div>
                <div className="space-y-3">
                  <div className="text-sm font-medium">Contact Information</div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Input id="address" name="address" placeholder="Alamat Lengkap" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company_email">Company Email</Label>
                      <Input id="company_email" name="company_email" type="email" placeholder="email@perusahaan.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company_phone_number">Company Phone Number</Label>
                      <Input id="company_phone_number" name="company_phone_number" type="tel" placeholder="Nomor Telepon" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="fax">Fax</Label>
                      <Input id="fax" name="fax" placeholder="Nomor Fax" />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="company_logo">Logo</Label>
                      <LogoUpload id="company_logo" name="logo" />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Simpan</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {companies.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed rounded-xl bg-muted/20">
          <Building className="h-12 w-12 text-muted-foreground mb-4 opacity-20" />
          <h3 className="text-lg font-semibold">Tidak ada perusahaan ditemukan</h3>
          <p className="text-muted-foreground">Coba ubah kata kunci pencarian Anda.</p>
          {query && (
            <Button variant="link" asChild className="mt-2">
              <Link href="/admin/companies">Reset Pencarian</Link>
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {companies.map((c) => (
            <Card key={c.id} className="group overflow-hidden border border-slate-200/80 bg-white hover:shadow-xl hover:shadow-slate-900/5 hover:border-slate-300 transition-all duration-300">
              <CardContent className="p-0">
                <div className="p-6 space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="h-14 w-14 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center overflow-hidden shrink-0">
                      {c.logoUrl ? (
                        <img src={c.logoUrl} alt={c.name} className="h-full w-full object-contain p-1" />
                      ) : (
                        <Building className="h-7 w-7 text-slate-400" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0 pt-1">
                      <h3 className="font-semibold text-[15px] text-slate-900 truncate leading-snug">{c.name}</h3>
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1.5">
                        <Mail className="h-3 w-3 shrink-0" />
                        <span className="truncate">{c.companyEmail || "-"}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 py-3 border-y border-slate-100">
                    <div className="flex-1 text-center">
                      <p className="text-[11px] text-slate-500 font-medium uppercase tracking-wider mb-1">Users</p>
                      <p className="text-xl font-bold tracking-tight text-slate-900">{c._count.customers}</p>
                    </div>
                    <div className="w-px h-8 bg-slate-100" />
                    <div className="flex-1 text-center">
                      <p className="text-[11px] text-slate-500 font-medium uppercase tracking-wider mb-1">Branches</p>
                      <p className="text-xl font-bold tracking-tight text-primary">{c._count.branches}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="flex-1 h-9 border-slate-200 hover:border-slate-300 hover:bg-slate-50 font-medium" asChild>
                      <Link href={`/admin/companies/${c.id}`}>
                        <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
                        Detail
                      </Link>
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-9 w-9 text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Hapus Company</DialogTitle>
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
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}