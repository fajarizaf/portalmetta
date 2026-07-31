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
import { ArrowLeft, Building, Phone, Mail, MapPin, Users, FileText, LayoutGrid, Trash2, ChevronRight, Building2, Globe, Hash, CircleDashed, CheckCircle2, Clock, XCircle } from "lucide-react";
import Link from "next/link";
import { revalidatePath } from "next/cache";
import { LogoUpload } from "@/components/logo-upload";
import path from "path";
import { promises as fs } from "fs";
import { cn } from "@/lib/utils";

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

function statusIcon(status: string | null) {
  const s = (status || "").toLowerCase()
  if (s.includes("active") || s.includes("complete") || s.includes("approve")) return CheckCircle2
  if (s.includes("draft")) return CircleDashed
  if (s.includes("submit") || s.includes("review") || s.includes("progress")) return Clock
  if (s.includes("cancel") || s.includes("reject")) return XCircle
  return CircleDashed
}

function statusColor(status: string | null) {
  const s = (status || "").toLowerCase()
  if (s.includes("active") || s.includes("complete") || s.includes("approve")) return "text-emerald-600"
  if (s.includes("draft")) return "text-slate-400"
  if (s.includes("submit") || s.includes("review") || s.includes("progress")) return "text-amber-600"
  if (s.includes("cancel") || s.includes("reject")) return "text-red-600"
  return "text-slate-400"
}

function DocListCard({ docs, docTypeKey, label, icon: Icon, emptyMessage, filterParam }: {
  docs: Array<{ id: string; code: string | null; status: string | null; createdAt: Date; docType: { key: string } }>
  docTypeKey: string
  label: string
  icon: typeof FileText
  emptyMessage: string
  filterParam?: string
}) {
  return (
    <Card className="border-slate-200/60 bg-white overflow-hidden">
      <CardHeader className="px-6 py-4 border-b border-slate-100">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold text-slate-900 flex items-center gap-2">
            <Icon className="w-4 h-4 text-slate-500" />
            {label}
            <span className="text-xs font-normal text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">{docs.length}</span>
          </CardTitle>
          <Button size="sm" variant="ghost" asChild className="h-7 text-xs text-slate-500 hover:text-slate-900">
            <Link href={`/admin/docs/${docTypeKey}${filterParam ? `?${filterParam}` : ''}`}>
              View All
              <ChevronRight className="w-3 h-3 ml-0.5" />
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {docs.length > 0 ? (
          <div className="divide-y divide-slate-50">
            {docs.slice(0, 10).map((doc) => {
              const StatusIcon = statusIcon(doc.status)
              return (
                <Link
                  key={doc.id}
                  href={`/admin/docs/${doc.docType.key}/${doc.id}`}
                  className="flex items-center justify-between px-6 py-3.5 hover:bg-slate-50/60 transition-colors group"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-50 border border-slate-100 shrink-0 group-hover:border-slate-900/20 group-hover:bg-slate-100 transition-all">
                      <FileText className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-medium text-slate-900 truncate">{doc.code || doc.id}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        {new Date(doc.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <StatusIcon className={cn("w-3.5 h-3.5", statusColor(doc.status))} />
                    <span className="text-xs font-medium text-slate-600 capitalize">{doc.status?.toLowerCase() || "draft"}</span>
                  </div>
                </Link>
              )
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
            <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center mb-3">
              <Icon className="w-6 h-6 text-slate-300" />
            </div>
            <p className="text-sm text-slate-400">{emptyMessage}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
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
      customers: { include: { role: true } },
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
        { data: { path: "$.owner_customer_id", equals: company.id as any } },
        { data: { path: "$.customer", equals: company.id as any } }
      ]
    },
    include: { docType: true },
    orderBy: { createdAt: "desc" }
  });

  const docsByKey = relatedDocs.reduce((acc, doc) => {
    if (!acc[doc.docType.key]) acc[doc.docType.key] = [];
    acc[doc.docType.key].push(doc);
    return acc;
  }, {} as Record<string, typeof relatedDocs>);

  const totalDocs = relatedDocs.length

  const docTabs: Array<{ key: string; label: string; icon: typeof FileText }> = [
    { key: "quotation", label: "Quotation", icon: FileText },
    { key: "visitor_request", label: "Request", icon: FileText },
    { key: "sales_order", label: "Sales Order", icon: FileText },
    { key: "subscription_management", label: "Subscription", icon: FileText },
    { key: "master_rack", label: "Rack", icon: LayoutGrid },
    { key: "invoice", label: "Invoices", icon: FileText },
    { key: "transaction", label: "Transaction", icon: FileText },
    { key: "work_order", label: "Work Order", icon: FileText },
  ]

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
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <Link href="/admin/companies" className="hover:text-slate-600 transition-colors">Companies</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-slate-900 font-medium">{company.name}</span>
            </div>
          </div>
        </div>
        <form action={deleteCompany}>
          <input type="hidden" name="id" value={company.id} />
          <Button variant="outline" size="sm" className="border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300">
            <Trash2 className="h-3.5 w-3.5 mr-1.5" />
            Delete
          </Button>
        </form>
      </div>

      {/* Profile Card */}
      <Card className="border-slate-200/60 bg-white overflow-hidden">
        <div className="sm:flex">
          {/* Logo + Identity */}
          <div className="sm:flex sm:items-center gap-6 p-6 flex-1">
            <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-100 overflow-hidden shrink-0 mx-auto sm:mx-0">
              {company.logoUrl ? (
                <img src={company.logoUrl} alt={company.name} className="h-full w-full object-contain p-2" />
              ) : (
                <Building2 className="h-9 w-9 text-slate-400" />
              )}
            </div>
            <div className="flex-1 text-center sm:text-left mt-4 sm:mt-0">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
                <h1 className="text-xl font-bold text-slate-900 tracking-tight">{company.name}</h1>
                <div className="flex gap-1.5">
                  {company.isDataCenter && <Badge className="bg-blue-50 text-blue-700 border-blue-200 font-normal text-[10px]">Data Center</Badge>}
                  {company.parentId && <Badge variant="outline" className="text-slate-500 border-slate-200 font-normal text-[10px]">Subsidiary</Badge>}
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-5 gap-y-1.5 mt-2.5 text-sm text-slate-500">
                {company.companyEmail && (
                  <div className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{company.companyEmail}</span>
                  </div>
                )}
                {company.companyPhoneNumber && (
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{company.companyPhoneNumber}</span>
                  </div>
                )}
                {company.fax && (
                  <div className="flex items-center gap-1.5">
                    <Hash className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>Fax: {company.fax}</span>
                  </div>
                )}
              </div>
              {company.address && (
                <div className="flex items-center justify-center sm:justify-start gap-1.5 mt-1.5 text-sm text-slate-500">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="text-slate-400">{company.address}</span>
                </div>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="flex sm:flex-col border-t sm:border-t-0 sm:border-l border-slate-100 divide-x sm:divide-x-0 sm:divide-y divide-slate-100">
            <div className="flex-1 px-6 py-4 text-center sm:min-w-[100px]">
              <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Users</p>
              <p className="text-xl font-bold text-slate-900 mt-1">{company.customers.length}</p>
            </div>
            <div className="flex-1 px-6 py-4 text-center sm:min-w-[100px]">
              <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Branches</p>
              <p className="text-xl font-bold text-slate-900 mt-1">{company.branches.length}</p>
            </div>
            <div className="flex-1 px-6 py-4 text-center sm:min-w-[100px]">
              <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Documents</p>
              <p className="text-xl font-bold text-slate-900 mt-1">{totalDocs}</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="info" className="space-y-6">
        <div className="overflow-x-auto -mx-4 px-4">
          <TabsList className="inline-flex h-10 items-center gap-1 bg-white border border-slate-200/60 p-1 rounded-xl shadow-sm w-max">
            <TabsTrigger value="info" className="data-[state=active]:bg-slate-900 data-[state=active]:text-white rounded-lg px-4 py-1.5 text-sm font-medium text-slate-600 hover:text-slate-900 transition-all whitespace-nowrap">General Info</TabsTrigger>
            <TabsTrigger value="users" className="data-[state=active]:bg-slate-900 data-[state=active]:text-white rounded-lg px-4 py-1.5 text-sm font-medium text-slate-600 hover:text-slate-900 transition-all whitespace-nowrap">Users</TabsTrigger>
            <TabsTrigger value="documents" className="data-[state=active]:bg-slate-900 data-[state=active]:text-white rounded-lg px-4 py-1.5 text-sm font-medium text-slate-600 hover:text-slate-900 transition-all whitespace-nowrap">Documents</TabsTrigger>
          </TabsList>
        </div>

        {/* General Info */}
        <TabsContent value="info" className="space-y-6">
          <Card className="border-slate-200/60 bg-white">
            <CardHeader className="px-6 py-5 border-b border-slate-100">
              <CardTitle className="text-base font-semibold text-slate-900">Edit Company Information</CardTitle>
              <p className="text-sm text-slate-400 mt-0.5">Update company profile details and contact information.</p>
            </CardHeader>
            <CardContent className="p-6">
              <form action={updateCompany} className="space-y-8">
                <input type="hidden" name="id" value={company.id} />

                {/* Section: Company Details */}
                <div>
                  <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">Company Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <Label htmlFor="name" className="text-sm font-medium text-slate-700">Company Name</Label>
                      <Input id="name" name="name" defaultValue={company.name} required className="h-10 border-slate-200 focus:border-slate-400 focus:ring-slate-400/20" />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="fax" className="text-sm font-medium text-slate-700">Fax</Label>
                      <Input id="fax" name="fax" defaultValue={company.fax ?? ""} placeholder="+62-21-xxxxxxx" className="h-10 border-slate-200 focus:border-slate-400 focus:ring-slate-400/20" />
                    </div>
                    <div className="md:col-span-2 space-y-1.5">
                      <Label htmlFor="address" className="text-sm font-medium text-slate-700">Address</Label>
                      <Input id="address" name="address" defaultValue={company.address ?? ""} placeholder="Jl. Contoh No. 123" className="h-10 border-slate-200 focus:border-slate-400 focus:ring-slate-400/20" />
                    </div>
                  </div>
                </div>

                {/* Section: Contact */}
                <div>
                  <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">Contact Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <Label htmlFor="company_email" className="text-sm font-medium text-slate-700">Email Address</Label>
                      <Input id="company_email" name="company_email" type="email" defaultValue={company.companyEmail ?? ""} placeholder="company@example.com" className="h-10 border-slate-200 focus:border-slate-400 focus:ring-slate-400/20" />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="company_phone_number" className="text-sm font-medium text-slate-700">Phone Number</Label>
                      <Input id="company_phone_number" name="company_phone_number" defaultValue={company.companyPhoneNumber ?? ""} placeholder="+62-xxx-xxxxxxx" className="h-10 border-slate-200 focus:border-slate-400 focus:ring-slate-400/20" />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="pic_id" className="text-sm font-medium text-slate-700">Primary PIC</Label>
                      <Select name="pic_id" defaultValue={company.picId ?? "unassigned"}>
                        <SelectTrigger id="pic_id" className="h-10 border-slate-200 focus:border-slate-400 focus:ring-slate-400/20">
                          <SelectValue placeholder="Select PIC" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="unassigned">No PIC assigned</SelectItem>
                          {company.customers.map((u) => (
                            <SelectItem key={u.id} value={u.id}>{u.name || u.email}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="created_display" className="text-sm font-medium text-slate-700">Created</Label>
                      <div className="flex items-center h-10 px-3 rounded-lg border border-slate-200 bg-slate-50/50 text-sm text-slate-600">
                        {new Date(company.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" })}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section: Logo */}
                <div>
                  <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">Company Logo</h3>
                  <div className="max-w-md">
                    <LogoUpload id="logo" name="logo" defaultImageUrl={company.logoUrl ?? undefined} />
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-100">
                  <Button variant="outline" asChild className="border-slate-200 hover:border-slate-300">
                    <Link href="/admin/companies">Cancel</Link>
                  </Button>
                  <Button type="submit" className="bg-slate-900 hover:bg-slate-800 text-white">
                    Save Changes
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Parent/Child Info */}
          {(company.parent || company.children.length > 0) && (
            <Card className="border-slate-200/60 bg-white">
              <CardHeader className="px-6 py-5 border-b border-slate-100">
                <CardTitle className="text-base font-semibold text-slate-900">Corporate Structure</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {company.parent && (
                    <div>
                      <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">Parent Company</p>
                      <Link href={`/admin/companies/${company.parent.id}`} className="flex items-center gap-3 p-3 rounded-lg border border-slate-100 hover:bg-slate-50 transition-colors group">
                        <div className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
                          <Building2 className="w-4 h-4 text-slate-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-900 truncate group-hover:text-primary transition-colors">{company.parent.name}</p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-300 shrink-0" />
                      </Link>
                    </div>
                  )}
                  {company.children.length > 0 && (
                    <div>
                      <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">Subsidiaries ({company.children.length})</p>
                      <div className="space-y-1.5">
                        {company.children.map((child) => (
                          <Link key={child.id} href={`/admin/companies/${child.id}`} className="flex items-center gap-3 p-3 rounded-lg border border-slate-100 hover:bg-slate-50 transition-colors group">
                            <div className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
                              <Building2 className="w-4 h-4 text-slate-500" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-slate-900 truncate group-hover:text-primary transition-colors">{child.name}</p>
                            </div>
                            <ChevronRight className="w-4 h-4 text-slate-300 shrink-0" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Users */}
        <TabsContent value="users">
          <Card className="border-slate-200/60 bg-white overflow-hidden">
            <CardHeader className="px-6 py-4 border-b border-slate-100">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-sm font-semibold text-slate-900">Company Users</CardTitle>
                  <p className="text-xs text-slate-400 mt-0.5">{company.customers.length} user{company.customers.length !== 1 ? "s" : ""} registered</p>
                </div>
                <Button size="sm" asChild className="h-8 text-xs bg-slate-900 hover:bg-slate-800 text-white">
                  <Link href={`/admin/customers?q=${encodeURIComponent(company.name)}`}>Manage Users</Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {company.customers.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-100">
                        <th className="text-left py-3 px-6 font-medium text-slate-400 text-[11px] uppercase tracking-wider">Name</th>
                        <th className="text-left py-3 px-6 font-medium text-slate-400 text-[11px] uppercase tracking-wider">Email</th>
                        <th className="text-left py-3 px-6 font-medium text-slate-400 text-[11px] uppercase tracking-wider">Role</th>
                        <th className="text-right py-3 px-6 font-medium text-slate-400 text-[11px] uppercase tracking-wider">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {company.customers.map((u) => (
                        <tr key={u.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="py-3.5 px-6">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-sm font-medium text-slate-600 shrink-0">
                                {(u.name || u.email).charAt(0).toUpperCase()}
                              </div>
                              <span className="font-medium text-slate-900">{u.name || "-"}</span>
                            </div>
                          </td>
                          <td className="py-3.5 px-6 text-slate-500">{u.email}</td>
                          <td className="py-3.5 px-6">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-slate-100 text-slate-600">
                              {u.role.name}
                            </span>
                          </td>
                          <td className="py-3.5 px-6 text-right">
                            <Button variant="ghost" size="sm" asChild className="h-8 text-xs hover:bg-slate-100">
                              <Link href={`/admin/customers/${u.id}/edit`}>Detail</Link>
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center mb-3">
                    <Users className="w-6 h-6 text-slate-300" />
                  </div>
                  <p className="text-sm text-slate-500 font-medium">No users yet</p>
                  <p className="text-xs text-slate-400 mt-1">This company has no registered users.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Documents */}
        <TabsContent value="documents">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {docTabs.map(({ key, label, icon }) => (
              <DocListCard
                key={key}
                docs={docsByKey[key] || []}
                docTypeKey={key}
                label={label}
                icon={icon}
                emptyMessage={`No ${label.toLowerCase()} history found.`}
                filterParam={key === "visitor_request" ? `owner_customer_id=${company.id}` : `customer_id=${company.id}`}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
