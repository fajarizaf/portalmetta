import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsTrigger, TabsList } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Building, Phone, Mail, MapPin, Users, FileText, LayoutGrid, Trash2 } from "lucide-react";
import Link from "next/link";
import { revalidatePath } from "next/cache";
import { LogoUpload } from "@/components/logo-upload";
import path from "path";
import { promises as fs } from "fs";

async function updateCompany(formData: FormData) {
  "use server";
  const session = await getServerSession(authOptions);
  const email = session?.user?.email ?? "";
  const me = email ? await prisma.user.findUnique({ where: { email }, include: { role: { include: { permissions: { include: { permission: true } } } } } }) : null;
  const perm = new Set((me?.role?.permissions ?? []).map((rp) => rp.permission.key));
  if (!perm.has("COMPANY_MANAGEMENT")) return;

  const id = String(formData.get("id") || "");
  const name = String(formData.get("name") || "").trim();
  const address = String(formData.get("address") || "").trim();
  const companyEmail = String(formData.get("company_email") || "").trim();
  const companyPhoneNumber = String(formData.get("company_phone_number") || "").trim();
  const fax = String(formData.get("fax") || "").trim();
  let picId = String(formData.get("pic_id") || "").trim();
  if (picId === "unassigned") picId = "";
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
      picId: picId || null,
    },
  });

  if (logo && logo.size > 0) {
    const type = logo.type as string | undefined;
    const ext = type?.includes("png") ? "png" : type?.includes("jpeg") ? "jpg" : type?.includes("svg") ? "svg" : "png";
    const dir = path.join(process.cwd(), "public", "uploads", "company");
    await fs.mkdir(dir, { recursive: true });
    const filePath = path.join(dir, `${id}.${ext}`);
    const buf = Buffer.from(await logo.arrayBuffer());
    await fs.writeFile(filePath, buf);
    const publicUrl = `/uploads/company/${id}.${ext}`;
    await prisma.company.update({ where: { id }, data: { logoUrl: publicUrl } });
  }

  revalidatePath(`/admin/companies/${id}`);
  revalidatePath("/admin/companies");
  redirect(`/admin/companies/${id}?toast=Company%20berhasil%20diperbarui`);
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
  redirect("/admin/companies?toast=Company%20berhasil%20dihapus");
}

export default async function CompanyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getServerSession(authOptions);
  const email = session?.user?.email ?? "";
  const me = email ? await prisma.user.findUnique({ where: { email }, include: { role: { include: { permissions: { include: { permission: true } } } } } }) : null;
  const perm = new Set((me?.role?.permissions ?? []).map((rp) => rp.permission.key));

  if (!perm.has("COMPANY_MANAGEMENT")) {
    return redirect("/admin/companies?toast=Akses%20Ditolak&toastType=error");
  }

  const company = await prisma.company.findUnique({
    where: { id },
    include: {
      customers: {
        include: { role: true }
      },
      pic: true,
      branches: true,
      parent: true,
      children: true,
    }
  });

  if (!company) return notFound();

  const relatedDocs = await prisma.docRecord.findMany({
    where: {
      OR: [
        { data: { path: "$.customer_id", equals: company.id as any } },
        { data: { path: "$.customer", equals: company.id as any } }
      ]
    },
    include: { docType: true },
    orderBy: { createdAt: "desc" },
    take: 20
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="outline" size="icon" asChild className="h-9 w-9 border-slate-200 hover:border-slate-300 hover:bg-slate-50">
            <Link href="/admin/companies">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-xl font-semibold text-slate-900 tracking-tight">Company Details</h1>
            <p className="text-sm text-slate-500 mt-0.5">Manage company profile and view related resources.</p>
          </div>
        </div>
        <form action={deleteCompany}>
          <input type="hidden" name="id" value={company.id} />
          <Button variant="destructive" size="sm" className="bg-red-600 hover:bg-red-700">
            <Trash2 className="h-4 w-4 mr-2" />
            Hapus Company
          </Button>
        </form>
      </div>

      {/* Profile Header Card */}
      <Card className="border-slate-200/80 bg-white">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6">
            <div className="h-20 w-20 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center overflow-hidden shrink-0">
              {company.logoUrl ? (
                <img src={company.logoUrl} alt={company.name} className="h-full w-full object-contain p-1.5" />
              ) : (
                <Building className="h-9 w-9 text-slate-400" />
              )}
            </div>
            
            <div className="flex-1 text-center lg:text-left space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 justify-center lg:justify-start">
                <h2 className="text-xl font-semibold text-slate-900 tracking-tight">{company.name}</h2>
                <div className="flex gap-2 justify-center">
                  {company.isDataCenter && <Badge variant="secondary" className="font-normal">Data Center</Badge>}
                  {company.parentId && <Badge variant="outline" className="font-normal">Sub-Company</Badge>}
                </div>
              </div>
              
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-5 text-sm text-slate-500">
                {company.companyEmail && (
                  <div className="flex items-center gap-1.5">
                    <Mail className="h-3.5 w-3.5 text-slate-400" />
                    <span>{company.companyEmail}</span>
                  </div>
                )}
                {company.companyPhoneNumber && (
                  <div className="flex items-center gap-1.5">
                    <Phone className="h-3.5 w-3.5 text-slate-400" />
                    <span>{company.companyPhoneNumber}</span>
                  </div>
                )}
                {company.address && (
                  <div className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-slate-400" />
                    <span>{company.address}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-6 border-l border-slate-100 pl-6 hidden xl:flex">
              <div className="text-center">
                <p className="text-[11px] text-slate-500 font-medium uppercase tracking-wider mb-1">Users</p>
                <p className="text-2xl font-bold tracking-tight text-slate-900">{company.customers.length}</p>
              </div>
              <div className="w-px h-10 bg-slate-100" />
              <div className="text-center">
                <p className="text-[11px] text-slate-500 font-medium uppercase tracking-wider mb-1">Branches</p>
                <p className="text-2xl font-bold tracking-tight text-primary">{company.branches.length}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="info" className="space-y-6">
        <TabsList className="inline-flex h-9 items-center gap-1 bg-slate-100/80 p-1 rounded-lg">
          <TabsTrigger value="info" className="data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm rounded-md px-3 py-1.5 text-sm font-medium text-slate-600 hover:text-slate-900 transition-all">General Info</TabsTrigger>
          <TabsTrigger value="users" className="data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm rounded-md px-3 py-1.5 text-sm font-medium text-slate-600 hover:text-slate-900 transition-all">Users / Customers</TabsTrigger>
          <TabsTrigger value="branches" className="data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm rounded-md px-3 py-1.5 text-sm font-medium text-slate-600 hover:text-slate-900 transition-all">Branches</TabsTrigger>
          <TabsTrigger value="documents" className="data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm rounded-md px-3 py-1.5 text-sm font-medium text-slate-600 hover:text-slate-900 transition-all">Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="info" className="space-y-6">
          <Card className="border-slate-200/80 bg-white">
            <CardHeader className="pb-5 border-b border-slate-100">
              <CardTitle className="text-base font-semibold text-slate-900">Edit Company Information</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <form action={updateCompany} className="space-y-6">
                <input type="hidden" name="id" value={company.id} />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="name" className="text-sm font-medium text-slate-700">Company Name</Label>
                      <Input id="name" name="name" defaultValue={company.name} required className="h-9 border-slate-200 focus:border-primary focus:ring-primary/20" />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="address" className="text-sm font-medium text-slate-700">Address</Label>
                      <Input id="address" name="address" defaultValue={company.address ?? ""} className="h-9 border-slate-200 focus:border-primary focus:ring-primary/20" />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="company_email" className="text-sm font-medium text-slate-700">Company Email</Label>
                      <Input id="company_email" name="company_email" type="email" defaultValue={company.companyEmail ?? ""} className="h-9 border-slate-200 focus:border-primary focus:ring-primary/20" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="company_phone_number" className="text-sm font-medium text-slate-700">Phone Number</Label>
                      <Input id="company_phone_number" name="company_phone_number" defaultValue={company.companyPhoneNumber ?? ""} className="h-9 border-slate-200 focus:border-primary focus:ring-primary/20" />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="fax" className="text-sm font-medium text-slate-700">Fax</Label>
                      <Input id="fax" name="fax" defaultValue={company.fax ?? ""} className="h-9 border-slate-200 focus:border-primary focus:ring-primary/20" />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="pic_id" className="text-sm font-medium text-slate-700">Primary PIC</Label>
                      <Select name="pic_id" defaultValue={company.picId ?? "unassigned"}>
                        <SelectTrigger id="pic_id" className="h-9 border-slate-200 focus:border-primary focus:ring-primary/20">
                          <SelectValue placeholder="Select PIC" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="unassigned">-- No PIC assigned --</SelectItem>
                          {company.customers.map((u) => (
                            <SelectItem key={u.id} value={u.id}>{u.name || u.email}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="md:col-span-2 space-y-1.5">
                    <Label htmlFor="logo" className="text-sm font-medium text-slate-700">Company Logo</Label>
                    <LogoUpload id="logo" name="logo" defaultImageUrl={company.logoUrl ?? undefined} />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-100">
                  <Button variant="outline" asChild className="border-slate-200 hover:border-slate-300 hover:bg-slate-50">
                    <Link href="/admin/companies">Cancel</Link>
                  </Button>
                  <Button type="submit" className="bg-slate-900 hover:bg-slate-800">Save Changes</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card className="border-slate-200/80 bg-white">
            <CardHeader className="pb-5 border-b border-slate-100">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-semibold text-slate-900">Company Users</CardTitle>
                <Button size="sm" asChild className="h-8 text-xs border-slate-200 hover:border-slate-300 hover:bg-slate-50">
                  <Link href={`/admin/customers?q=${encodeURIComponent(company.name)}`}>Manage Users</Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-50/50">
                      <th className="text-left py-3 px-5 font-medium text-slate-500 text-xs uppercase tracking-wider">Name</th>
                      <th className="text-left py-3 px-5 font-medium text-slate-500 text-xs uppercase tracking-wider">Email</th>
                      <th className="text-left py-3 px-5 font-medium text-slate-500 text-xs uppercase tracking-wider">Role</th>
                      <th className="text-right py-3 px-5 font-medium text-slate-500 text-xs uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {company.customers.length > 0 ? (
                      company.customers.map((u) => (
                        <tr key={u.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="py-3 px-5 font-medium text-slate-900">{u.name || "-"}</td>
                          <td className="py-3 px-5 text-slate-500">{u.email}</td>
                          <td className="py-3 px-5">
                            <Badge variant="secondary" className="font-normal bg-slate-100 text-slate-700 hover:bg-slate-200">{u.role.name}</Badge>
                          </td>
                          <td className="py-3 px-5 text-right">
                            <Button variant="ghost" size="sm" asChild className="h-8 text-xs hover:bg-slate-100">
                                <Link href={`/admin/customers/${u.id}/edit`}>Detail</Link>
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} className="p-10 text-center text-slate-500">
                          <div className="flex flex-col items-center gap-2">
                            <Users className="h-8 w-8 text-slate-300" />
                            <span className="text-sm">No users found for this company.</span>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="branches">
          <Card className="border-slate-200/80 bg-white">
            <CardHeader className="pb-5 border-b border-slate-100">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-semibold text-slate-900">Company Branches</CardTitle>
                <Button size="sm" asChild className="h-8 text-xs border-slate-200 hover:border-slate-300 hover:bg-slate-50">
                  <Link href="/admin/branches">Manage Branches</Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-5">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {company.branches.length > 0 ? (
                  company.branches.map((b) => (
                    <div key={b.id} className="group p-4 rounded-xl border border-slate-200 bg-white hover:border-slate-300 hover:shadow-lg hover:shadow-slate-900/5 transition-all duration-200">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="h-10 w-10 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-600 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all">
                          <LayoutGrid className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="font-semibold text-sm text-slate-900">{b.name}</div>
                          <div className="text-xs text-slate-500">Code: {b.code}</div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="w-full h-8 text-xs border-slate-200 hover:border-slate-300 hover:bg-slate-50" asChild>
                        <Link href={`/admin/branches`}>View Branch</Link>
                      </Button>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full py-12 text-center text-slate-500 border border-dashed rounded-xl bg-slate-50/50">
                    <LayoutGrid className="h-8 w-8 text-slate-300 mx-auto mb-2" />
                    <span className="text-sm">No branches found for this company.</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents">
          <Card className="border-slate-200/80 bg-white">
            <CardHeader className="pb-5 border-b border-slate-100">
              <CardTitle className="text-base font-semibold text-slate-900">Related Documents</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-slate-50">
                {relatedDocs.length > 0 ? (
                  relatedDocs.map((doc) => (
                    <Link 
                      key={doc.id} 
                      href={`/admin/docs/${doc.docType.key}/${doc.id}`}
                      className="flex items-center justify-between p-4 hover:bg-slate-50/50 transition-colors group"
                    >
                      <div className="flex items-center gap-3.5">
                        <div className="h-9 w-9 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 group-hover:bg-slate-900 group-hover:text-white group-hover:border-slate-900 transition-all">
                          <FileText className="h-4 w-4 text-slate-500 group-hover:text-white transition-colors" />
                        </div>
                        <div>
                          <div className="font-medium text-sm text-slate-900">{doc.docType.name} - {doc.code ?? doc.id}</div>
                          <div className="text-xs text-slate-500 mt-0.5">
                            {new Date(doc.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
                          </div>
                        </div>
                      </div>
                      <Badge variant="outline" className="font-normal border-slate-200 text-slate-600">{doc.status}</Badge>
                    </Link>
                  ))
                ) : (
                  <div className="p-10 text-center text-slate-500">
                    <div className="flex flex-col items-center gap-2">
                      <FileText className="h-8 w-8 text-slate-300" />
                      <span className="text-sm">No related documents found.</span>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
