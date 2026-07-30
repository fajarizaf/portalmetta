import { prisma } from "@/lib/prisma";
import type { PartnerType } from "../../../generated/prisma/enums";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { SearchableSelect } from "@/components/ui/select";
import { CustomerSearch } from "./search";
import Link from "next/link";
import { sendPasswordResetEmail } from "@/lib/mail";
import bcrypt from "bcryptjs";
import { UserPlus, User, Mail, Building2, Pencil, KeyRound, Trash2 } from "lucide-react";

async function createCustomer(formData: FormData) {
  "use server";
  const session = await getServerSession(authOptions);
  const emailSession = session?.user?.email ?? "";
  const meSession = emailSession ? await prisma.user.findUnique({ where: { email: emailSession }, include: { role: { include: { permissions: { include: { permission: true } } } } } }) : null;
  const permSession = new Set((meSession?.role?.permissions ?? []).map((rp) => rp.permission.key));
  if (!permSession.has("CUSTOMER_MANAGEMENT")) return;
  const firstName = String(formData.get("first_name") || "").trim();
  const lastName = String(formData.get("last_name") || "").trim();
  const emailAddress = String(formData.get("email_address") || "").trim();
  const address = String(formData.get("address") || "").trim();
  const country = String(formData.get("country") || "").trim();
  const phoneNumber = String(formData.get("phone_number") || "").trim();
  const jobTitle = String(formData.get("job_title") || "").trim();
  const techName = String(formData.get("technical_contact_name") || "").trim();
  const techPhone = String(formData.get("technical_phone_number") || "").trim();
  const techEmail = String(formData.get("technical_email") || "").trim();
  const billName = String(formData.get("billing_contact_name") || "").trim();
  const billPhone = String(formData.get("billing_phone_number") || "").trim();
  const billEmail = String(formData.get("billing_email") || "").trim();
  const companyId = String(formData.get("companyId") || "").trim();
  const partnerType = String(formData.get("partner_type") || "").trim();
  const password = String(formData.get("password") || "").trim();
  const finalEmail = emailAddress;
  const finalName = [firstName, lastName].filter(Boolean).join(" ");
  if (!finalEmail || !password) return;
  const allowedCompanies = meSession?.companyId ? await prisma.company.findMany({ where: { OR: [{ id: meSession.companyId }, { parentId: meSession.companyId }] }, select: { id: true } }) : [];
  const allowedCompanyIds = new Set(allowedCompanies.map((c) => c.id));
  if (companyId && allowedCompanyIds.size > 0 && !allowedCompanyIds.has(companyId)) {
    redirect("/admin/customers?toast=Tidak%20diizinkan&toastType=error");
  }
  const role = await prisma.role.findFirst({ where: { name: "Customer" } });
  if (!role) return;
  const hash = await bcrypt.hash(password, 10);
  await prisma.user.create({
    data: {
      email: finalEmail,
      name: finalName,
      address,
      country,
      phoneNumber,
      jobTitle: jobTitle || null,
      technicalContactName: techName || null,
      technicalPhoneNumber: techPhone || null,
      technicalEmail: techEmail || null,
      billingContactName: billName || null,
      billingPhoneNumber: billPhone || null,
      billingEmail: billEmail || null,
      companyId: companyId || null,
      partnerType: partnerType === "RESELLER" || partnerType === "END_USER" ? (partnerType as PartnerType) : null,
      passwordHash: hash,
      roleId: role.id,
    },
  });
  
  try {
    await sendPasswordResetEmail(finalEmail, finalName, password);
  } catch (error) {
    console.error("Failed to send welcome email:", error);
  }

  revalidatePath("/admin/customers");
  redirect("/admin/customers?toast=Customer%20berhasil%20ditambahkan")
}

async function deleteCustomer(formData: FormData) {
  "use server";
  const session = await getServerSession(authOptions);
  const emailSession = session?.user?.email ?? "";
  const meSession = emailSession ? await prisma.user.findUnique({ where: { email: emailSession }, include: { role: { include: { permissions: { include: { permission: true } } } } } }) : null;
  const permSession = new Set((meSession?.role?.permissions ?? []).map((rp) => rp.permission.key));
  if (!permSession.has("CUSTOMER_MANAGEMENT")) return;
  const id = String(formData.get("id") || "");
  if (!id) return;
  const u = await prisma.user.findUnique({ where: { id } });
  const allowedCompanies = meSession?.companyId ? await prisma.company.findMany({ where: { OR: [{ id: meSession.companyId }, { parentId: meSession.companyId }] }, select: { id: true } }) : [];
  const allowedCompanyIds = new Set(allowedCompanies.map((c) => c.id));
  if (allowedCompanyIds.size > 0 && u?.companyId && !allowedCompanyIds.has(u.companyId)) {
    redirect("/admin/customers?toast=Tidak%20diizinkan&toastType=error");
  }
  await prisma.user.delete({ where: { id } });
  revalidatePath("/admin/customers");
}

async function resetPassword(formData: FormData) {
  "use server";
  const session = await getServerSession(authOptions);
  const emailSession = session?.user?.email ?? "";
  const meSession = emailSession ? await prisma.user.findUnique({ where: { email: emailSession }, include: { role: { include: { permissions: { include: { permission: true } } } } } }) : null;
  const permSession = new Set((meSession?.role?.permissions ?? []).map((rp) => rp.permission.key));
  if (!permSession.has("CUSTOMER_MANAGEMENT")) return;
  
  const id = String(formData.get("id") || "");
  if (!id) return;
  
  const u = await prisma.user.findUnique({ where: { id } });
  if (!u) return;

  const newPassword = Math.random().toString(36).slice(-8);
  const hash = await bcrypt.hash(newPassword, 10);
  
  await prisma.user.update({
    where: { id },
    data: { passwordHash: hash }
  });

  try {
    await sendPasswordResetEmail(u.email, u.name || u.email, newPassword);
  } catch (error) {
    console.error("Failed to send reset email:", error);
  }

  revalidatePath("/admin/customers");
  redirect("/admin/customers?toast=Password%20berhasil%20direset%20dan%20dikirim%20ke%20email")
}

async function updateCustomer(formData: FormData) {
  "use server";
  const session = await getServerSession(authOptions);
  const emailSession = session?.user?.email ?? "";
  const meSession = emailSession ? await prisma.user.findUnique({ where: { email: emailSession }, include: { role: { include: { permissions: { include: { permission: true } } } } } }) : null;
  const permSession = new Set((meSession?.role?.permissions ?? []).map((rp) => rp.permission.key));
  if (!permSession.has("CUSTOMER_MANAGEMENT")) return;
  const id = String(formData.get("id") || "");
  const firstName = String(formData.get("first_name") || "").trim();
  const lastName = String(formData.get("last_name") || "").trim();
  const emailAddress = String(formData.get("email_address") || "").trim();
  const address = String(formData.get("address") || "").trim();
  const country = String(formData.get("country") || "").trim();
  const phoneNumber = String(formData.get("phone_number") || "").trim();
  const jobTitle = String(formData.get("job_title") || "").trim();
  const techName = String(formData.get("technical_contact_name") || "").trim();
  const techPhone = String(formData.get("technical_phone_number") || "").trim();
  const techEmail = String(formData.get("technical_email") || "").trim();
  const billName = String(formData.get("billing_contact_name") || "").trim();
  const billPhone = String(formData.get("billing_phone_number") || "").trim();
  const billEmail = String(formData.get("billing_email") || "").trim();
  const companyId = String(formData.get("companyId") || "").trim();
  const partnerType = String(formData.get("partner_type") || "").trim();
  const password = String(formData.get("password") || "").trim();
  const finalEmail = emailAddress;
  const finalName = [firstName, lastName].filter(Boolean).join(" ");
  if (!id || !finalEmail) return;
  const u = await prisma.user.findUnique({ where: { id } });
  if (!u) return;
  const allowedCompanies = meSession?.companyId ? await prisma.company.findMany({ where: { OR: [{ id: meSession.companyId }, { parentId: meSession.companyId }] }, select: { id: true } }) : [];
  const allowedCompanyIds = new Set(allowedCompanies.map((c) => c.id));
  if (allowedCompanyIds.size > 0) {
    const targetCompanyId = companyId || u.companyId || "";
    if (targetCompanyId && !allowedCompanyIds.has(targetCompanyId)) {
      redirect("/admin/customers?toast=Tidak%20diizinkan&toastType=error");
    }
    if (u.companyId && !allowedCompanyIds.has(u.companyId)) {
      redirect("/admin/customers?toast=Tidak%20diizinkan&toastType=error");
    }
  }
  const data: { email: string; name?: string; address?: string | null; country?: string | null; phoneNumber?: string | null; jobTitle?: string | null; technicalContactName?: string | null; technicalPhoneNumber?: string | null; technicalEmail?: string | null; billingContactName?: string | null; billingPhoneNumber?: string | null; billingEmail?: string | null; companyId?: string | null; partnerType?: PartnerType | null; passwordHash?: string } = { email: finalEmail };
  if (finalName) data.name = finalName;
  data.address = address || null;
  data.country = country || null;
  data.phoneNumber = phoneNumber || null;
  data.jobTitle = jobTitle || null;
  data.technicalContactName = techName || null;
  data.technicalPhoneNumber = techPhone || null;
  data.technicalEmail = techEmail || null;
  data.billingContactName = billName || null;
  data.billingPhoneNumber = billPhone || null;
  data.billingEmail = billEmail || null;
  data.companyId = companyId || null;
  data.partnerType = partnerType === "RESELLER" || partnerType === "END_USER" ? (partnerType as PartnerType) : null;
  if (password) {
    const hash = await bcrypt.hash(password, 10);
    data.passwordHash = hash;
    try {
      await sendPasswordResetEmail(finalEmail, finalName, password);
    } catch (error) {
      console.error("Failed to send password reset email:", error);
    }
  }
  await prisma.user.update({ where: { id }, data });
  revalidatePath("/admin/customers");
  redirect("/admin/customers?toast=Customer%20berhasil%20diperbarui")
}

export default async function CustomersPage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const q = typeof searchParams.q === "string" ? searchParams.q : undefined;

  const session = await getServerSession(authOptions);
  const email = session?.user?.email ?? "";
  const me = email ? await prisma.user.findUnique({ where: { email }, include: { role: { include: { permissions: { include: { permission: true } } } } } }) : null;
  const perm = new Set((me?.role?.permissions ?? []).map((rp) => rp.permission.key));
  if (!perm.has("CUSTOMER_MANAGEMENT")) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold">Customer Management</h1>
        <p>Anda tidak memiliki permission untuk mengakses halaman ini.</p>
      </div>
    );
  }
  const companies = await prisma.company.findMany({
    where: me?.companyId ? { OR: [{ id: me.companyId }, { parentId: me.companyId }] } : {},
    orderBy: { name: "asc" },
  });
  const allowedCompanyIds = new Set(companies.map((c) => c.id));
  
  const searchFilter = q
    ? {
        OR: [
          { name: { contains: q, mode: "insensitive" } as any },
          { email: { contains: q, mode: "insensitive" } as any },
          { company: { name: { contains: q, mode: "insensitive" } as any } },
        ],
      }
    : {};

  const customers = await prisma.user.findMany({
    where: {
      role: { name: "Customer" },
      ...(allowedCompanyIds.size > 0 ? { companyId: { in: Array.from(allowedCompanyIds) } } : {}),
      ...searchFilter,
    },
    include: { company: true },
    orderBy: { email: "asc" },
  });
  const countries = [
    "Indonesia",
    "Malaysia",
    "Singapore",
    "Thailand",
    "Philippines",
  ];
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">Customer Management</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">Kelola data customer dan akses platform.</p>
        </div>
        <div className="flex items-center gap-3">
          <CustomerSearch />
          <Dialog>
            <DialogTrigger asChild>
              <Button className="h-9 bg-slate-900 hover:bg-slate-800 text-white shadow-sm">
                <UserPlus className="h-4 w-4 mr-2" />
                Tambah Customer
              </Button>
            </DialogTrigger>
          <DialogContent className="sm:max-w-3xl">
            <DialogHeader>
              <DialogTitle className="text-base font-semibold">Tambah Customer</DialogTitle>
            </DialogHeader>
            <form action={createCustomer} className="space-y-6">
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
                  <div className="space-y-1.5 md:col-span-2">
                    <Label htmlFor="address" className="text-sm font-medium text-slate-700">Address</Label>
                    <Input id="address" name="address" className="h-9 border-slate-200 focus:border-primary focus:ring-primary/20" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="country" className="text-sm font-medium text-slate-700">Country</Label>
                    <SearchableSelect name="country" options={countries.map((c) => ({ label: c, value: c }))} />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="phone_number" className="text-sm font-medium text-slate-700">Phone Number</Label>
                    <Input id="phone_number" name="phone_number" type="tel" className="h-9 border-slate-200 focus:border-primary focus:ring-primary/20" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="job_title" className="text-sm font-medium text-slate-700">Job Title</Label>
                    <Input id="job_title" name="job_title" className="h-9 border-slate-200 focus:border-primary focus:ring-primary/20" />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="text-sm font-medium text-slate-700">Technical Information</div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="technical_contact_name" className="text-sm font-medium text-slate-700">Technical Contact Name</Label>
                    <Input id="technical_contact_name" name="technical_contact_name" className="h-9 border-slate-200 focus:border-primary focus:ring-primary/20" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="technical_phone_number" className="text-sm font-medium text-slate-700">Technical Phone Number</Label>
                    <Input id="technical_phone_number" name="technical_phone_number" type="tel" className="h-9 border-slate-200 focus:border-primary focus:ring-primary/20" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="technical_email" className="text-sm font-medium text-slate-700">Technical Email</Label>
                    <Input id="technical_email" name="technical_email" type="email" className="h-9 border-slate-200 focus:border-primary focus:ring-primary/20" />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="text-sm font-medium text-slate-700">Billing Information</div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="billing_contact_name" className="text-sm font-medium text-slate-700">Billing Contact Name</Label>
                    <Input id="billing_contact_name" name="billing_contact_name" className="h-9 border-slate-200 focus:border-primary focus:ring-primary/20" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="billing_phone_number" className="text-sm font-medium text-slate-700">Billing Phone Number</Label>
                    <Input id="billing_phone_number" name="billing_phone_number" type="tel" className="h-9 border-slate-200 focus:border-primary focus:ring-primary/20" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="billing_email" className="text-sm font-medium text-slate-700">Billing Email</Label>
                    <Input id="billing_email" name="billing_email" type="email" className="h-9 border-slate-200 focus:border-primary focus:ring-primary/20" />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="text-sm font-medium text-slate-700">Company Information</div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1.5 md:col-span-2">
                    <Label htmlFor="companyId" className="text-sm font-medium text-slate-700">Company</Label>
                    <SearchableSelect name="companyId" options={companies.map((c) => ({ label: c.name, value: c.id }))} />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="partner_type" className="text-sm font-medium text-slate-700">Partner Type</Label>
                    <SearchableSelect name="partner_type" options={[{ label: "Reseller", value: "RESELLER" }, { label: "End User", value: "END_USER" }]} />
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="password" className="text-sm font-medium text-slate-700">Password</Label>
                <Input id="password" name="password" type="password" className="h-9 border-slate-200 focus:border-primary focus:ring-primary/20" />
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
                <th className="text-left py-3 px-5 font-medium text-slate-500 text-xs uppercase tracking-wider">Customer</th>
                <th className="text-left py-3 px-5 font-medium text-slate-500 text-xs uppercase tracking-wider">Job Title</th>
                <th className="text-left py-3 px-5 font-medium text-slate-500 text-xs uppercase tracking-wider">Email</th>
                <th className="text-left py-3 px-5 font-medium text-slate-500 text-xs uppercase tracking-wider">Company</th>
                <th className="text-right py-3 px-5 font-medium text-slate-500 text-xs uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {customers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-5 py-16">
                    <div className="flex flex-col items-center justify-center text-center">
                      <div className="h-12 w-12 rounded-full bg-slate-50 flex items-center justify-center mb-3">
                        <User className="h-6 w-6 text-slate-400" />
                      </div>
                      <p className="text-sm font-medium text-slate-900">Tidak ada customer ditemukan</p>
                      <p className="text-xs text-slate-500 mt-1">Coba ubah kata kunci pencarian atau tambah customer baru.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                customers.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="py-3 px-5">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-xs font-semibold text-slate-600 shrink-0">
                          {(c.name ?? "").split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)}
                        </div>
                        <div className="min-w-0">
                          <div className="font-medium text-slate-900 truncate">{c.name || "Unnamed"}</div>
                          {c.partnerType && (
                            <span className="inline-flex items-center mt-0.5">
                              <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${c.partnerType === "RESELLER" ? "bg-blue-50 text-blue-600 border border-blue-100" : "bg-emerald-50 text-emerald-600 border border-emerald-100"}`}>
                                {c.partnerType === "RESELLER" ? "Reseller" : "End User"}
                              </span>
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-5 text-slate-600">{c.jobTitle || "-"}</td>
                    <td className="py-3 px-5">
                      <div className="flex items-center gap-2 text-slate-600">
                        <Mail className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">{c.email}</span>
                      </div>
                    </td>
                    <td className="py-3 px-5">
                      <div className="flex items-center gap-2 text-slate-600">
                        <Building2 className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">{c.company?.name ?? "-"}</span>
                      </div>
                    </td>
                    <td className="py-3 px-5 text-right">
                      <div className="flex items-center justify-end gap-1 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-slate-900 hover:bg-slate-100" asChild>
                          <Link href={`/admin/customers/${c.id}/edit`} prefetch={false} title={`Edit ${c.name}`}>
                            <Pencil className="h-3.5 w-3.5" />
                          </Link>
                        </Button>
                        <form action={resetPassword} className="inline-flex">
                          <input type="hidden" name="id" value={c.id} />
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-slate-900 hover:bg-slate-100" type="submit" title="Reset password">
                            <KeyRound className="h-3.5 w-3.5" />
                          </Button>
                        </form>
                        <form action={deleteCustomer} className="inline-flex">
                          <input type="hidden" name="id" value={c.id} />
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50" type="submit" title="Hapus">
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </form>
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
