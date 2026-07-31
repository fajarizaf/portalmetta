import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsTrigger, TabsList } from "@/components/ui/tabs";
import { SearchableSelect } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, User, Building, Phone, Mail, CreditCard, Activity, Package, ShieldCheck, MapPin, FileText, LayoutGrid, FileSearch, ShoppingCart, ChevronRight, CheckCircle2, CircleDashed, Clock, XCircle } from "lucide-react";
import Link from "next/link";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import QRCode from "qrcode";
import crypto from "crypto";
import { QrCode, PowerOff } from "lucide-react";
import type { PartnerType } from "@/generated/prisma/enums";
import { sendPasswordResetEmail } from "@/lib/mail";
import { cn } from "@/lib/utils";


async function generateAccessCard(formData: FormData) {
  "use server";
  const session = await getServerSession(authOptions);
  const emailSession = session?.user?.email ?? "";
  const meSession = emailSession ? await prisma.user.findUnique({ where: { email: emailSession }, include: { role: { include: { permissions: { include: { permission: true } } } } } }) : null;
  const permSession = new Set((meSession?.role?.permissions ?? []).map((rp) => rp.permission.key));
  if (!permSession.has("CUSTOMER_MANAGEMENT")) return;

  const id = String(formData.get("id"));
  const companyId = String(formData.get("companyId") || "");
  if (!id) return;

  let dt = await prisma.docType.findUnique({ where: { key: "access_card" } });
  if (!dt) {
    dt = await prisma.docType.create({
      data: {
        key: "access_card",
        name: "Access Card",
      }
    });
  }

  const allCards = await prisma.docRecord.findMany({
    where: { docTypeId: dt.id }
  });
  const exist = allCards.find((r) => {
    const d = (r.data ?? {}) as Record<string, any>;
    return d.user_id === id;
  });

  if (exist) {
    const curData = (exist.data ?? {}) as Record<string, any>;
    const token = curData.qr_token || crypto.randomUUID();
    await prisma.docRecord.update({
      where: { id: exist.id },
      data: {
        status: "active",
        data: {
          ...curData,
          user_id: id,
          customer_id: companyId || curData.customer_id || "",
          qr_token: token,
        } as any
      }
    });
  } else {
    const token = crypto.randomUUID();
    const qrData = {
      user_id: id,
      customer_id: companyId || "",
      qr_token: token,
    };
    await prisma.docRecord.create({
      data: {
        docTypeId: dt.id,
        code: `AC-${id.substring(0,6).toUpperCase()}`,
        status: "active",
        data: qrData as any,
        createdById: meSession?.id,
      }
    });
  }
  revalidatePath(`/admin/customers/${id}/edit`);
}

async function revokeAccessCard(formData: FormData) {
  "use server";
  const session = await getServerSession(authOptions);
  const emailSession = session?.user?.email ?? "";
  const meSession = emailSession ? await prisma.user.findUnique({ where: { email: emailSession }, include: { role: { include: { permissions: { include: { permission: true } } } } } }) : null;
  const permSession = new Set((meSession?.role?.permissions ?? []).map((rp) => rp.permission.key));
  if (!permSession.has("CUSTOMER_MANAGEMENT")) return;

  const recordId = String(formData.get("recordId"));
  const id = String(formData.get("id"));
  if (!recordId) return;
  await prisma.docRecord.update({
    where: { id: recordId },
    data: { status: "revoked" }
  });
  revalidatePath(`/admin/customers/${id}/edit`);
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

  const data: any = { email: finalEmail };
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
  revalidatePath(`/admin/customers/${id}/edit`);
  revalidatePath("/admin/customers");
  redirect(`/admin/customers?toast=Customer%20berhasil%20diperbarui`);
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

function formatIDR(v: unknown): string {
  const n = typeof v === "number" ? v : Number(v ?? 0)
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(Number.isFinite(n) ? n : 0)
}

function DocListCard({ docs, docTypeKey, label, icon: Icon }: {
  docs: Array<{ id: string; code: string | null; status: string | null; createdAt: Date; docType: { key: string } }>
  docTypeKey: string
  label: string
  icon: typeof FileText
}) {
  return (
    <div className="divide-y divide-slate-50">
      {docs.length > 0 ? (
        docs.map((doc) => {
          const StatusIcon = statusIcon(doc.status)
          return (
            <Link
              key={doc.id}
              href={`/admin/docs/${doc.docType.key}/${doc.id}`}
              className="flex items-center justify-between px-6 py-3.5 hover:bg-slate-50/60 transition-colors group"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-50 border border-slate-100 shrink-0 group-hover:border-slate-900/20 group-hover:bg-slate-100 transition-all">
                  <Icon className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
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
        })
      ) : (
        <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
          <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center mb-3">
            <Icon className="w-6 h-6 text-slate-300" />
          </div>
          <p className="text-sm text-slate-400">No data available.</p>
        </div>
      )}
    </div>
  )
}

export default async function EditCustomerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getServerSession(authOptions);
  const email = session?.user?.email ?? "";
  const me = email ? await prisma.user.findUnique({ where: { email }, include: { role: { include: { permissions: { include: { permission: true } } } } } }) : null;
  const perm = new Set((me?.role?.permissions ?? []).map((rp) => rp.permission.key));

  if (!perm.has("CUSTOMER_MANAGEMENT")) {
    return redirect("/admin/customers?toast=Akses%20Ditolak&toastType=error");
  }

  const customer = await prisma.user.findUnique({
    where: { id },
    include: { company: true, role: true }
  });

  if (!customer) return notFound();

  const accessCardDt = await prisma.docType.findUnique({ where: { key: "access_card" } });
  const allAccessCards = accessCardDt ? await prisma.docRecord.findMany({
    where: { docTypeId: accessCardDt.id }
  }) : [];
  const accessCardRecord = allAccessCards.find((r) => {
    const d = (r.data ?? {}) as Record<string, any>;
    return d.user_id === customer.id;
  }) || null;

  let qrDataUrl = null;
  if (accessCardRecord && accessCardRecord.status === "active") {
    const data = (accessCardRecord.data ?? {}) as Record<string, any>;
    const token = data.qr_token;
    if (token) {
      const payload = {
        docType: "access_card",
        token: token,
        customerId: data.customer_id || "",
        userId: customer.id
      };
      qrDataUrl = await QRCode.toDataURL(JSON.stringify(payload), {
        width: 300,
        margin: 2,
        color: { dark: "#000000", light: "#ffffff" }
      });
    }
  }

  const companies = await prisma.company.findMany({ orderBy: { name: "asc" } });

  const relatedDocs = await prisma.docRecord.findMany({
    where: {
      OR: [
        { createdById: customer.id },
        { data: { path: "$.customer_id", equals: customer.companyId as any } },
        { data: { path: "$.customer", equals: customer.companyId as any } }
      ]
    },
    include: { docType: true },
    orderBy: { createdAt: "desc" },
    take: 10
  }) as any[];

  const subDt = await prisma.docType.findUnique({ where: { key: "subscription_management" } });
  const subscriptions = subDt && customer.companyId ? await prisma.docRecord.findMany({
    where: {
      docTypeId: subDt.id,
      data: { path: "$.customer_id", equals: customer.companyId as any }
    },
    orderBy: { createdAt: "desc" }
  }) : [];

  const rackDt = await prisma.docType.findUnique({ where: { key: "master_rack" } });
  const customerRacks = rackDt && customer.companyId ? await prisma.docRecord.findMany({
    where: {
      docTypeId: rackDt.id,
      data: { path: "$.company_id", equals: customer.companyId as any }
    },
    orderBy: { createdAt: "desc" }
  }) : [];

  const roomIds = Array.from(new Set(customerRacks.map(r => (r.data as any)?.room_id).filter(Boolean))) as string[];
  const buildingIds = Array.from(new Set(customerRacks.map(r => (r.data as any)?.building_id).filter(Boolean))) as string[];

  const [rooms, buildings] = await Promise.all([
    prisma.room.findMany({ where: { id: { in: roomIds } }, select: { id: true, name: true } }),
    prisma.building.findMany({ where: { id: { in: buildingIds } }, select: { id: true, name: true } })
  ]);

  const roomMap = Object.fromEntries(rooms.map(r => [r.id, r.name]));
  const buildingMap = Object.fromEntries(buildings.map(b => [b.id, b.name]));

  const goodsInItemType = await prisma.docType.findUnique({ where: { key: "goods_in_item" } });
  const goodsOutItemType = await prisma.docType.findUnique({ where: { key: "goods_out_item" } });

  const inventoryInRows = goodsInItemType && customer.companyId ? await prisma.docRow.findMany({
    where: {
      childDocTypeId: goodsInItemType.id,
      record: {
        AND: [
          { OR: [
            { createdById: customer.id },
            { data: { path: "$.customer_id", equals: customer.companyId as any } },
            { data: { path: "$.customer", equals: customer.companyId as any } }
          ]},
          { OR: [
            { status: { equals: "Completed" } },
            { status: { contains: "Complete" } },
            { status: { contains: "COMPLETED" } },
          ]}
        ]
      }
    },
    include: { record: true },
    orderBy: { createdAt: "desc" }
  }) : [];

  const inventoryOutRows = goodsOutItemType && customer.companyId ? await prisma.docRow.findMany({
    where: {
      childDocTypeId: goodsOutItemType.id,
      record: {
        AND: [
          { OR: [
            { createdById: customer.id },
            { data: { path: "$.customer_id", equals: customer.companyId as any } },
            { data: { path: "$.customer", equals: customer.companyId as any } }
          ]},
          { OR: [
            { status: { equals: "Completed" } },
            { status: { contains: "Complete" } },
            { status: { contains: "COMPLETED" } },
          ]}
        ]
      }
    },
    include: { record: true },
    orderBy: { createdAt: "desc" }
  }) : [];

  const balanceMap = new Map<string, { itemName: string, qty: number, lastUpdate: Date, serialNumbers: Set<string> }>();

  inventoryInRows.forEach(item => {
    const d = (item.data ?? {}) as any;
    const name = d.item_name || "Unknown Item";
    const qty = Number(d.quantity || 0);
    const sn = d.serial_number;
    const key = name.trim().toLowerCase();
    if (!balanceMap.has(key)) balanceMap.set(key, { itemName: name, qty: 0, lastUpdate: new Date(0), serialNumbers: new Set() });
    const entry = balanceMap.get(key)!;
    entry.qty += qty;
    if (sn) entry.serialNumbers.add(sn);
    const date = new Date(item.record.createdAt);
    if (date > entry.lastUpdate) entry.lastUpdate = date;
  });

  inventoryOutRows.forEach(item => {
    const d = (item.data ?? {}) as any;
    const name = d.item_name || "Unknown Item";
    const qty = Number(d.quantity || 0);
    const sn = d.serial_number;
    const key = name.trim().toLowerCase();
    if (balanceMap.has(key)) {
      const entry = balanceMap.get(key)!;
      entry.qty -= qty;
      if (sn) entry.serialNumbers.delete(sn);
      const date = new Date(item.record.createdAt);
      if (date > entry.lastUpdate) entry.lastUpdate = date;
    }
  });

  const stockBalance = Array.from(balanceMap.values()).filter(i => i.qty !== 0);

  const quotationDt = await prisma.docType.findUnique({ where: { key: "quotation" } });
  const quotations = quotationDt && customer.companyId ? await prisma.docRecord.findMany({
    where: {
      docTypeId: quotationDt.id,
      data: { path: "$.customer", equals: customer.companyId as any }
    },
    orderBy: { createdAt: "desc" }
  }) : [];

  const soDt = await prisma.docType.findUnique({ where: { key: "sales_order" } });
  const salesOrders = soDt && customer.companyId ? await prisma.docRecord.findMany({
    where: {
      docTypeId: soDt.id,
      data: { path: "$.customer", equals: customer.companyId as any }
    },
    orderBy: { createdAt: "desc" }
  }) : [];

  const countries = ["Indonesia", "Malaysia", "Singapore", "Thailand", "Philippines"];
  const nameParts = (customer.name ?? "").split(" ");
  const firstName = nameParts[0] ?? "";
  const lastName = nameParts.slice(1).join(" ");

  const activeSubs = subscriptions.filter(s => s.status === "Active").length;
  const totalMRC = subscriptions.reduce((acc, s) => acc + Number((s.data as any)?.total_mrc ?? 0), 0);

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="outline" size="icon" asChild className="h-9 w-9 border-slate-200 hover:border-slate-300 hover:bg-slate-50">
            <Link href="/admin/customers">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <Link href="/admin/customers" className="hover:text-slate-600 transition-colors">Customers</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-slate-900 font-medium">{customer.name}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Card */}
      <Card className="border-slate-200/60 bg-white overflow-hidden">
        <div className="sm:flex">
          <div className="sm:flex sm:items-center gap-6 p-6 flex-1">
            <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-100 overflow-hidden shrink-0 mx-auto sm:mx-0">
              <span className="text-xl font-bold text-slate-600">
                {customer.name?.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)}
              </span>
            </div>
            <div className="flex-1 text-center sm:text-left mt-4 sm:mt-0">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
                <h1 className="text-xl font-bold text-slate-900 tracking-tight">{customer.name}</h1>
                {customer.company && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-blue-50 text-blue-700 border border-blue-200">
                    <Building className="w-3 h-3" />
                    {customer.company.name}
                  </span>
                )}
              </div>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-5 gap-y-1.5 mt-2 text-sm text-slate-500">
                <div className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{customer.email}</span>
                </div>
                {customer.phoneNumber && (
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{customer.phoneNumber}</span>
                  </div>
                )}
                {customer.jobTitle && (
                  <div className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{customer.jobTitle}</span>
                  </div>
                )}
              </div>
              {(customer.address || customer.country) && (
                <div className="flex items-center justify-center sm:justify-start gap-1.5 mt-1 text-sm text-slate-400">
                  <MapPin className="w-3.5 h-3.5 shrink-0" />
                  <span>{[customer.address, customer.country].filter(Boolean).join(", ")}</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex sm:flex-col border-t sm:border-t-0 sm:border-l border-slate-100 divide-x sm:divide-x-0 sm:divide-y divide-slate-100">
            <div className="flex-1 px-6 py-4 text-center sm:min-w-[110px]">
              <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Active Services</p>
              <p className="text-xl font-bold text-slate-900 mt-1 tabular-nums">{activeSubs}</p>
            </div>
            <div className="flex-1 px-6 py-4 text-center sm:min-w-[110px]">
              <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Total MRC</p>
              <p className="text-xl font-bold text-slate-900 mt-1 tabular-nums">{formatIDR(totalMRC)}</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="profile" className="space-y-6">
        <div className="overflow-x-auto -mx-4 px-4">
          <TabsList className="inline-flex h-10 items-center gap-1 bg-white border border-slate-200/60 p-1 rounded-xl shadow-sm w-max">
            <TabsTrigger value="profile" className="data-[state=active]:bg-slate-900 data-[state=active]:text-white rounded-lg px-4 py-1.5 text-sm font-medium text-slate-600 hover:text-slate-900 transition-all whitespace-nowrap">Profile Info</TabsTrigger>
            <TabsTrigger value="activity" className="data-[state=active]:bg-slate-900 data-[state=active]:text-white rounded-lg px-4 py-1.5 text-sm font-medium text-slate-600 hover:text-slate-900 transition-all whitespace-nowrap">Activity</TabsTrigger>
            <TabsTrigger value="access_card" className="data-[state=active]:bg-slate-900 data-[state=active]:text-white rounded-lg px-4 py-1.5 text-sm font-medium text-slate-600 hover:text-slate-900 transition-all whitespace-nowrap">Access Card</TabsTrigger>
          </TabsList>
        </div>

        {/* Profile Info */}
        <TabsContent value="profile">
          <Card className="border-slate-200/60 bg-white">
            <CardHeader className="px-6 py-5 border-b border-slate-100">
              <CardTitle className="text-base font-semibold text-slate-900">Edit Customer Information</CardTitle>
              <p className="text-sm text-slate-400 mt-0.5">Update customer profile details, contacts, and account settings.</p>
            </CardHeader>
            <CardContent className="p-6">
              <form action={updateCustomer} className="space-y-8">
                <input type="hidden" name="id" value={customer.id} />

                <div>
                  <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">Personal & Contact</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <Label htmlFor="first_name" className="text-sm font-medium text-slate-700">First Name</Label>
                      <Input id="first_name" name="first_name" defaultValue={firstName} className="h-10 border-slate-200 focus:border-slate-400 focus:ring-slate-400/20" />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="last_name" className="text-sm font-medium text-slate-700">Last Name</Label>
                      <Input id="last_name" name="last_name" defaultValue={lastName} className="h-10 border-slate-200 focus:border-slate-400 focus:ring-slate-400/20" />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="email_address" className="text-sm font-medium text-slate-700">Email Address</Label>
                      <Input id="email_address" name="email_address" type="email" defaultValue={customer.email} className="h-10 border-slate-200 focus:border-slate-400 focus:ring-slate-400/20" />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="phone_number" className="text-sm font-medium text-slate-700">Phone Number</Label>
                      <Input id="phone_number" name="phone_number" defaultValue={customer.phoneNumber ?? ""} className="h-10 border-slate-200 focus:border-slate-400 focus:ring-slate-400/20" />
                    </div>
                    <div className="md:col-span-2 space-y-1.5">
                      <Label htmlFor="address" className="text-sm font-medium text-slate-700">Address</Label>
                      <Input id="address" name="address" defaultValue={customer.address ?? ""} className="h-10 border-slate-200 focus:border-slate-400 focus:ring-slate-400/20" />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="country" className="text-sm font-medium text-slate-700">Country</Label>
                      <SearchableSelect name="country" defaultValue={customer.country ?? ""} options={countries.map(c => ({ label: c, value: c }))} />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="job_title" className="text-sm font-medium text-slate-700">Job Title</Label>
                      <Input id="job_title" name="job_title" defaultValue={customer.jobTitle ?? ""} className="h-10 border-slate-200 focus:border-slate-400 focus:ring-slate-400/20" />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">Technical Point of Contact</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div className="space-y-1.5">
                      <Label htmlFor="technical_contact_name" className="text-sm font-medium text-slate-700">Name</Label>
                      <Input id="technical_contact_name" name="technical_contact_name" defaultValue={customer.technicalContactName ?? ""} className="h-10 border-slate-200 focus:border-slate-400 focus:ring-slate-400/20" />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="technical_phone_number" className="text-sm font-medium text-slate-700">Phone</Label>
                      <Input id="technical_phone_number" name="technical_phone_number" defaultValue={customer.technicalPhoneNumber ?? ""} className="h-10 border-slate-200 focus:border-slate-400 focus:ring-slate-400/20" />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="technical_email" className="text-sm font-medium text-slate-700">Email</Label>
                      <Input id="technical_email" name="technical_email" type="email" defaultValue={customer.technicalEmail ?? ""} className="h-10 border-slate-200 focus:border-slate-400 focus:ring-slate-400/20" />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">Billing Point of Contact</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div className="space-y-1.5">
                      <Label htmlFor="billing_contact_name" className="text-sm font-medium text-slate-700">Name</Label>
                      <Input id="billing_contact_name" name="billing_contact_name" defaultValue={customer.billingContactName ?? ""} className="h-10 border-slate-200 focus:border-slate-400 focus:ring-slate-400/20" />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="billing_phone_number" className="text-sm font-medium text-slate-700">Phone</Label>
                      <Input id="billing_phone_number" name="billing_phone_number" defaultValue={customer.billingPhoneNumber ?? ""} className="h-10 border-slate-200 focus:border-slate-400 focus:ring-slate-400/20" />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="billing_email" className="text-sm font-medium text-slate-700">Email</Label>
                      <Input id="billing_email" name="billing_email" type="email" defaultValue={customer.billingEmail ?? ""} className="h-10 border-slate-200 focus:border-slate-400 focus:ring-slate-400/20" />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">Company & Partner Status</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <Label htmlFor="companyId" className="text-sm font-medium text-slate-700">Company</Label>
                      <SearchableSelect name="companyId" defaultValue={customer.companyId ?? ""} options={companies.map(c => ({ label: c.name, value: c.id }))} />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="partner_type" className="text-sm font-medium text-slate-700">Partner Type</Label>
                      <SearchableSelect name="partner_type" defaultValue={customer.partnerType ?? ""} options={[{ label: "Reseller", value: "RESELLER" }, { label: "End User", value: "END_USER" }]} />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">Security</h3>
                  <div className="max-w-xs space-y-1.5">
                    <Label htmlFor="password" className="text-sm font-medium text-slate-700">New Password</Label>
                    <Input id="password" name="password" type="password" placeholder="Leave blank to keep current" className="h-10 border-slate-200 focus:border-slate-400 focus:ring-slate-400/20" />
                    <p className="text-xs text-slate-400 mt-1">Enter a new password to reset it. An email will be sent to the customer.</p>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-100">
                  <Button variant="outline" asChild className="border-slate-200 hover:border-slate-300">
                    <Link href="/admin/customers">Cancel</Link>
                  </Button>
                  <Button type="submit" className="bg-slate-900 hover:bg-slate-800 text-white">Save Changes</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Activity */}
        <TabsContent value="activity">
          <Card className="border-slate-200/60 bg-white overflow-hidden">
            <CardHeader className="px-6 py-4 border-b border-slate-100">
              <CardTitle className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                <FileText className="w-4 h-4 text-slate-500" />
                Recent Documents & Requests
                <span className="text-xs font-normal text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">{relatedDocs.length}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <DocListCard docs={relatedDocs as any} docTypeKey="" label="Activity" icon={FileText} />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Access Card */}
        <TabsContent value="access_card">
          <Card className="border-slate-200/60 bg-white">
            <CardHeader className="px-6 py-5 border-b border-slate-100 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base font-semibold text-slate-900">Visit Access Card</CardTitle>
                <p className="text-sm text-slate-400 mt-0.5">Generate a reusable QR code access card for visits.</p>
              </div>
              <Badge variant="outline" className={cn("font-medium", accessCardRecord?.status === "active" ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-slate-100 text-slate-500 border-slate-200")}>
                {accessCardRecord?.status === "active" ? "Active" : accessCardRecord?.status === "revoked" ? "Revoked" : "Not Generated"}
              </Badge>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                <div className="flex-1 w-full max-w-md">
                  {accessCardRecord?.status === "active" && qrDataUrl ? (
                    <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 flex flex-col items-center justify-center text-center">
                      <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-100 mb-6">
                        <img src={qrDataUrl} alt="Access Card QR Code" className="w-64 h-64" />
                      </div>
                      <h4 className="font-semibold text-slate-900 text-lg mb-1">{customer.name}</h4>
                      <p className="text-sm text-slate-500 mb-4">{customer.company?.name || "Independent User"}</p>
                      
                      <form action={revokeAccessCard} className="w-full">
                        <input type="hidden" name="id" value={customer.id} />
                        <input type="hidden" name="recordId" value={accessCardRecord.id} />
                        <Button variant="destructive" type="submit" className="w-full gap-2">
                          <PowerOff className="w-4 h-4" />
                          Revoke Access Card
                        </Button>
                      </form>
                    </div>
                  ) : (
                    <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 flex flex-col items-center justify-center text-center py-16">
                      <div className="w-16 h-16 rounded-full bg-slate-200 flex items-center justify-center mb-4 text-slate-500">
                        <QrCode className="w-8 h-8" />
                      </div>
                      <h4 className="font-semibold text-slate-900 mb-2">No Active Access Card</h4>
                      <p className="text-sm text-slate-500 max-w-xs mx-auto mb-6">Generate a permanent QR code for this customer to use during visits.</p>
                      <form action={generateAccessCard}>
                        <input type="hidden" name="id" value={customer.id} />
                        <input type="hidden" name="companyId" value={customer.companyId || ""} />
                        <Button type="submit" className="bg-slate-900 hover:bg-slate-800 text-white gap-2">
                          <QrCode className="w-4 h-4" />
                          Generate Access Card
                        </Button>
                      </form>
                    </div>
                  )}
                </div>
                <div className="flex-1 bg-blue-50/50 rounded-2xl p-6 border border-blue-100">
                  <h4 className="font-semibold text-blue-900 flex items-center gap-2 mb-4">
                    <FileText className="w-4 h-4" />
                    Cara kerjanya
                  </h4>
                  <ul className="space-y-3 text-sm text-blue-800">
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-blue-200 flex items-center justify-center shrink-0 mt-0.5 text-xs font-medium">1</div>
                      <p>Buat access card untuk menghasilkan QR code permanen.</p>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-blue-200 flex items-center justify-center shrink-0 mt-0.5 text-xs font-medium">2</div>
                      <p>QR code ini dapat dipindai pada saat check-in kapan saja.</p>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-blue-200 flex items-center justify-center shrink-0 mt-0.5 text-xs font-medium">3</div>
                      <p>Berbeda dengan tiket visitor biasa, QR code ini tidak memiliki batas waktu 24 jam.</p>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-blue-200 flex items-center justify-center shrink-0 mt-0.5 text-xs font-medium">4</div>
                      <p>Jika akses ingin dicabut, klik "Revoke Access Card" untuk menonaktifkan QR code tersebut.</p>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
</Tabs>
    </div>
  );
}
