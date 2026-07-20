
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
import { ArrowLeft, Building, Phone, Mail, MapPin, Users, FileText, LayoutGrid, Printer, Trash2 } from "lucide-react";
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

  // Fetch documents related to this company
  // We check for documents where data->customer_id or data->customer matches company.id
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
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link href="/admin/companies">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Company Details</h1>
            <p className="text-muted-foreground">Manage company profile and view related resources.</p>
          </div>
        </div>
        <div className="flex gap-2">
            <form action={deleteCompany}>
                <input type="hidden" name="id" value={company.id} />
                <Button variant="destructive" size="sm">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Hapus Company
                </Button>
            </form>
        </div>
      </div>

      {/* Top Summary Card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="h-24 w-24 rounded-lg bg-muted flex items-center justify-center overflow-hidden border shrink-0">
              {company.logoUrl ? (
                <img src={company.logoUrl} alt={company.name} className="h-full w-full object-contain" />
              ) : (
                <Building className="h-12 w-12 text-muted-foreground" />
              )}
            </div>
            <div className="flex-1 text-center md:text-left space-y-2">
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 justify-center md:justify-start">
                <h2 className="text-2xl font-bold">{company.name}</h2>
                <div className="flex gap-2 justify-center">
                  {company.isDataCenter && <Badge>Data Center</Badge>}
                  {company.parentId && <Badge variant="outline">Sub-Company</Badge>}
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4 justify-center md:justify-start pt-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span>{company.companyEmail ?? "-"}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span>{company.companyPhoneNumber ?? "-"}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{company.address ?? "-"}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8 border-l pl-8 hidden md:grid">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-1">Users</p>
                <p className="text-2xl font-bold">{company.customers.length}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-1">Branches</p>
                <p className="text-2xl font-bold text-primary">{company.branches.length}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="info" className="space-y-6">
        <TabsList className="flex flex-wrap h-auto gap-1 bg-transparent p-0 justify-start">
          <TabsTrigger value="info" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border">General Info</TabsTrigger>
          <TabsTrigger value="users" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border">Users / Customers</TabsTrigger>
          <TabsTrigger value="branches" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border">Branches</TabsTrigger>
          <TabsTrigger value="documents" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border">Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="info">
          <Card>
            <CardHeader>
              <CardTitle>Edit Company Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form action={updateCompany} className="space-y-8">
                <input type="hidden" name="id" value={company.id} />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Company Name</Label>
                      <Input id="name" name="name" defaultValue={company.name} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Input id="address" name="address" defaultValue={company.address ?? ""} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company_email">Company Email</Label>
                      <Input id="company_email" name="company_email" type="email" defaultValue={company.companyEmail ?? ""} />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="company_phone_number">Phone Number</Label>
                      <Input id="company_phone_number" name="company_phone_number" defaultValue={company.companyPhoneNumber ?? ""} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="fax">Fax</Label>
                      <Input id="fax" name="fax" defaultValue={company.fax ?? ""} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pic_id">Primary PIC</Label>
                      <Select name="pic_id" defaultValue={company.picId ?? "unassigned"}>
                        <SelectTrigger id="pic_id">
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

                  <div className="md:col-span-2 space-y-2">
                    <Label htmlFor="logo">Company Logo</Label>
                    <LogoUpload id="logo" name="logo" defaultImageUrl={company.logoUrl ?? undefined} />
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-6 border-t">
                  <Button variant="outline" asChild>
                    <Link href="/admin/companies">Cancel</Link>
                  </Button>
                  <Button type="submit">Save Changes</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Company Users</CardTitle>
              <Button size="sm" asChild>
                <Link href={`/admin/customers?q=${encodeURIComponent(company.name)}`}>Manage Users</Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50 border-b">
                    <tr className="text-left">
                      <th className="p-3">Name</th>
                      <th className="p-3">Email</th>
                      <th className="p-3">Role</th>
                      <th className="p-3">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {company.customers.length > 0 ? (
                      company.customers.map((u) => (
                        <tr key={u.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                          <td className="p-3 font-medium">{u.name || "-"}</td>
                          <td className="p-3 text-muted-foreground">{u.email}</td>
                          <td className="p-3">
                            <Badge variant="secondary" className="font-normal">{u.role.name}</Badge>
                          </td>
                          <td className="p-3">
                            <Button variant="ghost" size="sm" asChild>
                                <Link href={`/admin/customers/${u.id}/edit`}>Detail</Link>
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} className="p-8 text-center text-muted-foreground italic">No users found for this company.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="branches">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Company Branches</CardTitle>
              <Button size="sm" asChild>
                <Link href="/admin/branches">Manage Branches</Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {company.branches.length > 0 ? (
                  company.branches.map((b) => (
                    <div key={b.id} className="p-4 rounded-lg border bg-card hover:shadow-md transition-all">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="h-10 w-10 rounded bg-primary/10 flex items-center justify-center text-primary">
                          <LayoutGrid className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="font-bold">{b.name}</div>
                          <div className="text-xs text-muted-foreground">Code: {b.code}</div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="w-full" asChild>
                        <Link href={`/admin/branches`}>View Branch</Link>
                      </Button>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full p-8 text-center text-muted-foreground border border-dashed rounded-lg">
                    No branches found for this company.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <CardTitle>Related Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {relatedDocs.length > 0 ? (
                  relatedDocs.map((doc) => (
                    <Link 
                      key={doc.id} 
                      href={`/admin/docs/${doc.docType.key}/${doc.id}`}
                      className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded bg-muted flex items-center justify-center">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div>
                          <div className="font-medium text-sm">{doc.docType.name} - {doc.code ?? doc.id}</div>
                          <div className="text-xs text-muted-foreground">
                            {new Date(doc.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
                          </div>
                        </div>
                      </div>
                      <Badge variant="outline">{doc.status}</Badge>
                    </Link>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground italic">
                    No related documents found.
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
