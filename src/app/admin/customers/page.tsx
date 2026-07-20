import { prisma } from "@/lib/prisma";
import type { PartnerType } from "../../../generated/prisma/enums";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import bcrypt from "bcryptjs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { SearchableSelect } from "@/components/ui/select";
import { CustomerSearch } from "./search";
import Link from "next/link";
import { sendPasswordResetEmail } from "@/lib/mail";

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
  const role = await prisma.role.findFirst({ where: { name: "CUSTOMER" } });
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
  
  // Send email notification to new customer
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

  // Generate random password
  const newPassword = Math.random().toString(36).slice(-8);
  const hash = await bcrypt.hash(newPassword, 10);
  
  await prisma.user.update({
    where: { id },
    data: { passwordHash: hash }
  });

  // Send email
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
    // Send email notification to customer
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
      role: { name: "CUSTOMER" },
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
      <h1 className="text-2xl font-semibold">Customer Management</h1>
      <div className="flex justify-between items-center gap-4">
        <CustomerSearch />
        <Dialog>
          <DialogTrigger asChild>
            <Button>Tambah Customer</Button>
          </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tambah Customer</DialogTitle>
          </DialogHeader>
          <form action={createCustomer} className="space-y-6">
            <div className="space-y-3">
              <div className="text-sm font-medium">Personal Information</div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first_name">First Name</Label>
                  <Input id="first_name" name="first_name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last_name">Last Name</Label>
                  <Input id="last_name" name="last_name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email_address">Email Address</Label>
                  <Input id="email_address" name="email_address" type="email" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" name="address" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <SearchableSelect name="country" options={countries.map((c) => ({ label: c, value: c }))} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone_number">Phone Number</Label>
                  <Input id="phone_number" name="phone_number" type="tel" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="job_title">Job Title</Label>
                  <Input id="job_title" name="job_title" />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="text-sm font-medium">Technical Information</div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="technical_contact_name">Technical Contact Name</Label>
                  <Input id="technical_contact_name" name="technical_contact_name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="technical_phone_number">Technical Phone Number</Label>
                  <Input id="technical_phone_number" name="technical_phone_number" type="tel" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="technical_email">Technical Email</Label>
                  <Input id="technical_email" name="technical_email" type="email" />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="text-sm font-medium">Billing Information</div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="billing_contact_name">Billing Contact Name</Label>
                  <Input id="billing_contact_name" name="billing_contact_name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="billing_phone_number">Billing Phone Number</Label>
                  <Input id="billing_phone_number" name="billing_phone_number" type="tel" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="billing_email">Billing Email</Label>
                  <Input id="billing_email" name="billing_email" type="email" />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="text-sm font-medium">Company Information</div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="companyId">Company</Label>
                  <SearchableSelect name="companyId" options={companies.map((c) => ({ label: c.name, value: c.id }))} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="partner_type">Partner Type</Label>
                  <SearchableSelect name="partner_type" options={[{ label: "Reseller", value: "RESELLER" }, { label: "End User", value: "END_USER" }]} />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" />
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
              <th className="p-2">Job Title</th>
              <th className="p-2">Email</th>
              <th className="p-2">Company</th>
              <th className="p-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c) => (
              <tr key={c.id} className="border-b">
                <td className="p-2">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                      {(c.name ?? "").split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)}
                    </div>
                    <span>{c.name}</span>
                  </div>
                </td>
                <td className="p-2">{c.jobTitle}</td>
                <td className="p-2">{c.email}</td>
                <td className="p-2">{c.company?.name ?? "-"}</td>
                <td className="p-2">
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link 
                        href={`/admin/customers/${c.id}/edit`} 
                        prefetch={false}
                        title={`Edit ${c.name} (${c.id})`}
                      >
                        Edit
                      </Link>
                    </Button>
                    <form action={resetPassword} className="inline-flex">
                      <input type="hidden" name="id" value={c.id} />
                      <Button variant="secondary" size="sm" type="submit" title="Reset password dan kirim via email">
                        Reset PW
                      </Button>
                    </form>
                    <form action={deleteCustomer} className="inline-flex">
                      <input type="hidden" name="id" value={c.id} />
                      <Button variant="destructive" size="sm">Hapus</Button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}