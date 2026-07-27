
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
import { ArrowLeft, User, Building, Phone, Mail, CreditCard, Activity, Package, ShieldCheck, MapPin, FileText, LayoutGrid, FileSearch, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import type { PartnerType } from "@/generated/prisma/enums";
import { Prisma } from "@/generated/prisma/client";
import { sendPasswordResetEmail } from "@/lib/mail";

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
    // Send email notification to customer
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
    include: {
      company: true,
      role: true,
    }
  });

  if (!customer) return notFound();

  // Fetch related information
  const companies = await prisma.company.findMany({ orderBy: { name: "asc" } });
  
  // Recent Activities (DocRecords created by or linked to customer/company)
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

  // Active Subscriptions
  const subDt = await prisma.docType.findUnique({ where: { key: "subscription_management" } });
  const subscriptions = subDt && customer.companyId ? await prisma.docRecord.findMany({
    where: {
      docTypeId: subDt.id,
      data: { path: "$.customer_id", equals: customer.companyId as any }
    },
    orderBy: { createdAt: "desc" }
  }) : [];

  // Racks
  const rackDt = await prisma.docType.findUnique({ where: { key: "master_rack" } });
  const customerRacks = rackDt && customer.companyId ? await prisma.docRecord.findMany({
    where: {
      docTypeId: rackDt.id,
      data: { path: "$.company_id", equals: customer.companyId as any }
    },
    orderBy: { createdAt: "desc" }
  }) : [];

  // Fetch Room and Building names for Racks
  const roomIds = Array.from(new Set(customerRacks.map(r => (r.data as any)?.room_id).filter(Boolean))) as string[];
  const buildingIds = Array.from(new Set(customerRacks.map(r => (r.data as any)?.building_id).filter(Boolean))) as string[];
  
  const [rooms, buildings] = await Promise.all([
    prisma.room.findMany({ where: { id: { in: roomIds } }, select: { id: true, name: true } }),
    prisma.building.findMany({ where: { id: { in: buildingIds } }, select: { id: true, name: true } })
  ]);
  
  const roomMap = Object.fromEntries(rooms.map(r => [r.id, r.name]));
  const buildingMap = Object.fromEntries(buildings.map(b => [b.id, b.name]));

  // Inventory Data (Matching Customer Inventory Page Logic)
  const goodsInItemType = await prisma.docType.findUnique({ where: { key: "goods_in_item" } });
  const goodsOutItemType = await prisma.docType.findUnique({ where: { key: "goods_out_item" } });

  const inventoryInRows = goodsInItemType && customer.companyId ? await prisma.docRow.findMany({
    where: {
      childDocTypeId: goodsInItemType.id,
      record: {
        AND: [
          {
            OR: [
              { createdById: customer.id },
              { data: { path: "$.customer_id", equals: customer.companyId as any } },
              { data: { path: "$.customer", equals: customer.companyId as any } }
            ]
          },
          {
            OR: [
              { status: { equals: "Completed" } },
              { status: { contains: "Complete" } },
              { status: { contains: "COMPLETED" } },
            ]
          }
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
          {
            OR: [
              { createdById: customer.id },
              { data: { path: "$.customer_id", equals: customer.companyId as any } },
              { data: { path: "$.customer", equals: customer.companyId as any } }
            ]
          },
          {
            OR: [
              { status: { equals: "Completed" } },
              { status: { contains: "Complete" } },
              { status: { contains: "COMPLETED" } },
            ]
          }
        ]
      }
    },
    include: { record: true },
    orderBy: { createdAt: "desc" }
  }) : [];

  // Calculate Balance (Stock)
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

  // Quotations
  const quotationDt = await prisma.docType.findUnique({ where: { key: "quotation" } });
  const quotations = quotationDt && customer.companyId ? await prisma.docRecord.findMany({
    where: {
      docTypeId: quotationDt.id,
      data: { path: "$.customer", equals: customer.companyId as any }
    },
    orderBy: { createdAt: "desc" }
  }) : [];

  // Sales Orders
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

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/admin/customers">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Edit Customer</h1>
          <p className="text-muted-foreground">Manage customer profiles and view their related activities.</p>
        </div>
      </div>

      {/* Top Summary Card */}
      <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center text-3xl font-bold text-primary shrink-0">
                {customer.name?.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)}
              </div>
              <div className="flex-1 text-center md:text-left space-y-2">
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 justify-center md:justify-start">
                  <h2 className="text-2xl font-bold">{customer.name}</h2>
                  <div className="flex gap-2 justify-center">
                    <Badge variant={customer.company ? "default" : "outline"}>
                      {customer.company?.name ?? "Individual"}
                    </Badge>
                    <Badge variant="secondary">{customer.partnerType ?? "Standard"}</Badge>
                  </div>
                </div>
                <p className="text-muted-foreground">{customer.jobTitle ?? "No Job Title"}</p>
                
                <div className="flex flex-wrap gap-4 justify-center md:justify-start pt-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    <span>{customer.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    <span>{customer.phoneNumber ?? "-"}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{customer.address ? `${customer.address}, ${customer.country}` : "-"}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8 border-l pl-8 hidden md:grid">
                <div className="text-center">
                  <p className="text-xs text-slate-500 font-medium mb-1">Active Services</p>
                  <p className="text-[28px] font-bold tracking-tight leading-none">{subscriptions.filter(s => s.status === "Active").length}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-slate-500 font-medium mb-1">Total MRC</p>
                  <p className="text-[28px] font-bold text-primary tracking-tight leading-none">
                    {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(
                      subscriptions.reduce((acc, s) => acc + Number((s.data as any)?.total_mrc ?? 0), 0)
                    )}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Info & Forms - Now Full Width */}
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="flex flex-wrap h-auto gap-1 bg-transparent p-0 justify-start">
            <TabsTrigger value="profile" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border">Profile Info</TabsTrigger>
            <TabsTrigger value="activity" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border">Activity</TabsTrigger>
            <TabsTrigger value="subscriptions" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border">Subscriptions</TabsTrigger>
            <TabsTrigger value="racks" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border">Racks</TabsTrigger>
            <TabsTrigger value="inventory" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border">Inventory</TabsTrigger>
            <TabsTrigger value="quotations" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border">Quotations</TabsTrigger>
            <TabsTrigger value="sales_orders" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border">Sales Orders</TabsTrigger>
          </TabsList>

            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Detailed Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <form action={updateCustomer} className="space-y-8">
                    <input type="hidden" name="id" value={customer.id} />
                    
                    {/* Personal Section */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 font-semibold text-primary">
                        <User className="h-4 w-4" />
                        <span>Personal & Contact</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="first_name">First Name</Label>
                          <Input id="first_name" name="first_name" defaultValue={firstName} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="last_name">Last Name</Label>
                          <Input id="last_name" name="last_name" defaultValue={lastName} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email_address">Email Address</Label>
                          <Input id="email_address" name="email_address" type="email" defaultValue={customer.email} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone_number">Phone Number</Label>
                          <Input id="phone_number" name="phone_number" defaultValue={customer.phoneNumber ?? ""} />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor="address">Address</Label>
                          <Input id="address" name="address" defaultValue={customer.address ?? ""} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="country">Country</Label>
                          <SearchableSelect name="country" defaultValue={customer.country ?? ""} options={countries.map(c => ({ label: c, value: c }))} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="job_title">Job Title</Label>
                          <Input id="job_title" name="job_title" defaultValue={customer.jobTitle ?? ""} />
                        </div>
                      </div>
                    </div>

                    {/* Technical Section */}
                    <div className="space-y-4 pt-4 border-t">
                      <div className="flex items-center gap-2 font-semibold text-blue-600">
                        <Activity className="h-4 w-4" />
                        <span>Technical Point of Contact</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="technical_contact_name">Name</Label>
                          <Input id="technical_contact_name" name="technical_contact_name" defaultValue={customer.technicalContactName ?? ""} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="technical_phone_number">Phone</Label>
                          <Input id="technical_phone_number" name="technical_phone_number" defaultValue={customer.technicalPhoneNumber ?? ""} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="technical_email">Email</Label>
                          <Input id="technical_email" name="technical_email" type="email" defaultValue={customer.technicalEmail ?? ""} />
                        </div>
                      </div>
                    </div>

                    {/* Billing Section */}
                    <div className="space-y-4 pt-4 border-t">
                      <div className="flex items-center gap-2 font-semibold text-emerald-600">
                        <CreditCard className="h-4 w-4" />
                        <span>Billing Point of Contact</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="billing_contact_name">Name</Label>
                          <Input id="billing_contact_name" name="billing_contact_name" defaultValue={customer.billingContactName ?? ""} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="billing_phone_number">Phone</Label>
                          <Input id="billing_phone_number" name="billing_phone_number" defaultValue={customer.billingPhoneNumber ?? ""} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="billing_email">Email</Label>
                          <Input id="billing_email" name="billing_email" type="email" defaultValue={customer.billingEmail ?? ""} />
                        </div>
                      </div>
                    </div>

                    {/* Company Section */}
                    <div className="space-y-4 pt-4 border-t">
                      <div className="flex items-center gap-2 font-semibold text-orange-600">
                        <Building className="h-4 w-4" />
                        <span>Company & Partner Status</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="companyId">Company Assignment</Label>
                          <SearchableSelect name="companyId" defaultValue={customer.companyId ?? ""} options={companies.map(c => ({ label: c.name, value: c.id }))} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="partner_type">Partner Type</Label>
                          <SearchableSelect name="partner_type" defaultValue={customer.partnerType ?? ""} options={[{ label: "Reseller", value: "RESELLER" }, { label: "End User", value: "END_USER" }]} />
                        </div>
                      </div>
                    </div>

                    {/* Security Section */}
                    <div className="space-y-4 pt-4 border-t">
                      <div className="flex items-center gap-2 font-semibold text-destructive">
                        <ShieldCheck className="h-4 w-4" />
                        <span>Security</span>
                      </div>
                      <div className="max-w-xs space-y-2">
                        <Label htmlFor="password">New Password (leave blank to keep current)</Label>
                        <Input id="password" name="password" type="password" />
                      </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-6">
                      <Button variant="outline" asChild>
                        <Link href="/admin/customers">Cancel</Link>
                      </Button>
                      <Button type="submit">Save Changes</Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="activity">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Documents & Requests</CardTitle>
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
                        No recent document activities found.
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="subscriptions">
              <Card>
                <CardHeader>
                  <CardTitle>Active Service Subscriptions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {subscriptions.length > 0 ? (
                      subscriptions.map((sub) => {
                        const d = (sub.data ?? {}) as any;
                        return (
                          <div key={sub.id} className="p-4 rounded-lg border space-y-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2 font-bold">
                                <Package className="h-4 w-4 text-primary" />
                                <span>{d.service_name || "Unknown Service"}</span>
                              </div>
                              <Badge variant={sub.status === "Active" ? "default" : "secondary"}>
                                {sub.status}
                              </Badge>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                              <div>
                                <div className="text-muted-foreground mb-1">Code</div>
                                <div className="font-medium">{sub.code ?? "-"}</div>
                              </div>
                              <div>
                                <div className="text-muted-foreground mb-1">MRC</div>
                                <div className="font-medium text-primary">
                                  {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(d.total_mrc ?? 0)}
                                </div>
                              </div>
                              <div>
                                <div className="text-muted-foreground mb-1">Start Date</div>
                                <div className="font-medium">{d.start_date ?? "-"}</div>
                              </div>
                              <div>
                                <div className="text-muted-foreground mb-1">Frequency</div>
                                <div className="font-medium">{d.frequency ?? "Monthly"}</div>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="text-center py-8 text-muted-foreground italic">
                        No active subscriptions found.
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="racks">
              <Card>
                <CardHeader>
                  <CardTitle>Customer Racks</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {customerRacks.length > 0 ? (
                      customerRacks.map((rack) => {
                        const d = (rack.data ?? {}) as any;
                        return (
                          <div key={rack.id} className="p-4 rounded-lg border space-y-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2 font-bold">
                                <LayoutGrid className="h-4 w-4 text-primary" />
                                <span>{d.rack_name || d.id_rack || "Unnamed Rack"}</span>
                              </div>
                              <Badge variant={rack.status === "Active" || rack.status === "In Use" ? "default" : "secondary"}>
                                {rack.status}
                              </Badge>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                              <div>
                                <div className="text-muted-foreground mb-1">Rack ID</div>
                                <div className="font-medium">{d.id_rack || "-"}</div>
                              </div>
                              <div>
                                <div className="text-muted-foreground mb-1">Room</div>
                                <div className="font-medium">{roomMap[d.room_id] || d.room_id || "-"}</div>
                              </div>
                              <div>
                                <div className="text-muted-foreground mb-1">Building</div>
                                <div className="font-medium">{buildingMap[d.building_id] || d.building_id || "-"}</div>
                              </div>
                              <div>
                                <div className="text-muted-foreground mb-1">Code</div>
                                <div className="font-medium">{rack.code ?? "-"}</div>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="text-center py-8 text-muted-foreground italic">
                        No racks assigned to this customer.
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="inventory">
               <Card>
                 <CardHeader>
                   <CardTitle>Customer Inventory (Current Stock)</CardTitle>
                 </CardHeader>
                 <CardContent>
                   <div className="space-y-6">
                     {/* Stock Balance Table */}
                     <div className="rounded-md border overflow-hidden">
                       <table className="w-full text-sm">
                         <thead className="bg-slate-50 border-b">
                           <tr className="text-left text-xs font-semibold text-slate-500 uppercase">
                             <th className="px-4 py-3">Item Name</th>
                             <th className="px-4 py-3">Current Stock</th>
                             <th className="px-4 py-3">Serial Numbers</th>
                             <th className="px-4 py-3">Last Update</th>
                           </tr>
                         </thead>
                         <tbody className="divide-y">
                           {stockBalance.length > 0 ? (
                             stockBalance.map((item, idx) => (
                               <tr key={idx} className="hover:bg-slate-50 transition-colors">
                                 <td className="px-4 py-3 font-medium text-slate-900">{item.itemName}</td>
                                 <td className="px-4 py-3">
                                   <Badge variant={item.qty > 0 ? "default" : "destructive"}>{item.qty}</Badge>
                                 </td>
                                 <td className="px-4 py-3 text-slate-500 max-w-[200px] truncate" title={Array.from(item.serialNumbers).join(", ")}>
                                   {item.serialNumbers.size > 0 ? Array.from(item.serialNumbers).join(", ") : "-"}
                                 </td>
                                 <td className="px-4 py-3 text-slate-500">{item.lastUpdate.toLocaleDateString("en-GB")}</td>
                               </tr>
                             ))
                           ) : (
                             <tr>
                               <td colSpan={4} className="px-4 py-8 text-center text-muted-foreground italic">
                                 No stock items found for this customer.
                               </td>
                             </tr>
                           )}
                         </tbody>
                       </table>
                     </div>

                     {/* Recent Inbound History */}
                     <div className="space-y-3">
                       <h3 className="text-sm font-semibold text-slate-700">Recent Inbound History (In)</h3>
                       <div className="space-y-3">
                         {inventoryInRows.slice(0, 5).map((item) => {
                           const d = (item.data ?? {}) as any;
                           return (
                             <div key={item.id} className="p-3 rounded-lg border bg-slate-50/50 flex items-center justify-between text-xs">
                               <div className="flex items-center gap-3">
                                 <Package className="h-4 w-4 text-primary" />
                                 <div>
                                   <div className="font-bold">{d.item_name} (x{d.quantity})</div>
                                   <div className="text-slate-400">{item.record.code} • {new Date(item.createdAt).toLocaleDateString("en-GB")}</div>
                                 </div>
                               </div>
                               <Badge variant="outline" className="bg-white">Inbound</Badge>
                             </div>
                           );
                         })}
                       </div>
                     </div>

                     {/* Recent Outbound History */}
                     {inventoryOutRows.length > 0 && (
                       <div className="space-y-3">
                         <h3 className="text-sm font-semibold text-slate-700">Recent Outbound History (Out)</h3>
                         <div className="space-y-3">
                           {inventoryOutRows.slice(0, 5).map((item) => {
                             const d = (item.data ?? {}) as any;
                             return (
                               <div key={item.id} className="p-3 rounded-lg border bg-slate-50/50 flex items-center justify-between text-xs">
                                 <div className="flex items-center gap-3">
                                   <ShoppingCart className="h-4 w-4 text-destructive" />
                                   <div>
                                     <div className="font-bold">{d.item_name} (x{d.quantity})</div>
                                     <div className="text-slate-400">{item.record.code} • {new Date(item.createdAt).toLocaleDateString("en-GB")}</div>
                                   </div>
                                 </div>
                                 <Badge variant="outline" className="bg-white">Outbound</Badge>
                               </div>
                             );
                           })}
                         </div>
                       </div>
                     )}
                   </div>
                 </CardContent>
               </Card>
             </TabsContent>

             <TabsContent value="quotations">
               <Card>
                 <CardHeader>
                   <CardTitle>Customer Quotations</CardTitle>
                 </CardHeader>
                 <CardContent>
                   <div className="space-y-4">
                     {quotations.length > 0 ? (
                       quotations.map((q) => {
                         const d = (q.data ?? {}) as any;
                         return (
                           <Link 
                             key={q.id} 
                             href={`/admin/docs/quotation/${q.id}`}
                             className="block p-4 rounded-lg border space-y-3 hover:bg-muted transition-colors"
                           >
                             <div className="flex items-center justify-between">
                               <div className="flex items-center gap-2 font-bold">
                                 <FileSearch className="h-4 w-4 text-primary" />
                                 <span>{q.code || q.id}</span>
                               </div>
                               <Badge variant="outline">
                                 {q.status}
                               </Badge>
                             </div>
                             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                               <div>
                                 <div className="text-muted-foreground mb-1">Date</div>
                                 <div className="font-medium">{new Date(q.createdAt).toLocaleDateString("en-GB")}</div>
                               </div>
                               <div>
                                 <div className="text-muted-foreground mb-1">Total Amount</div>
                                 <div className="font-medium text-primary">
                                   {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(d.total_amount ?? 0)}
                                 </div>
                               </div>
                               <div className="md:col-span-2">
                                 <div className="text-muted-foreground mb-1">Subject/Notes</div>
                                 <div className="font-medium truncate">{d.notes || "-"}</div>
                               </div>
                             </div>
                           </Link>
                         );
                       })
                     ) : (
                       <div className="text-center py-8 text-muted-foreground italic">
                         No quotations found for this customer.
                       </div>
                     )}
                   </div>
                 </CardContent>
               </Card>
             </TabsContent>

             <TabsContent value="sales_orders">
               <Card>
                 <CardHeader>
                   <CardTitle>Customer Sales Orders</CardTitle>
                 </CardHeader>
                 <CardContent>
                   <div className="space-y-4">
                     {salesOrders.length > 0 ? (
                       salesOrders.map((so) => {
                         const d = (so.data ?? {}) as any;
                         return (
                           <Link 
                             key={so.id} 
                             href={`/admin/docs/sales_order/${so.id}`}
                             className="block p-4 rounded-lg border space-y-3 hover:bg-muted transition-colors"
                           >
                             <div className="flex items-center justify-between">
                               <div className="flex items-center gap-2 font-bold">
                                 <ShoppingCart className="h-4 w-4 text-primary" />
                                 <span>{so.code || so.id}</span>
                               </div>
                               <Badge variant={so.status === "Approved" ? "default" : "outline"}>
                                 {so.status}
                               </Badge>
                             </div>
                             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                               <div>
                                 <div className="text-muted-foreground mb-1">Date</div>
                                 <div className="font-medium">{new Date(so.createdAt).toLocaleDateString("en-GB")}</div>
                               </div>
                               <div>
                                 <div className="text-muted-foreground mb-1">Total MRC</div>
                                 <div className="font-medium text-primary">
                                   {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(d.subtotal_mrc ?? 0)}
                                 </div>
                               </div>
                               <div>
                                 <div className="text-muted-foreground mb-1">Total Contract</div>
                                 <div className="font-medium text-primary">
                                   {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(d.total_contract ?? 0)}
                                 </div>
                               </div>
                               <div>
                                 <div className="text-muted-foreground mb-1">Ref Quotation</div>
                                 <div className="font-medium">{d.quotation_id || "-"}</div>
                               </div>
                             </div>
                           </Link>
                         );
                       })
                     ) : (
                       <div className="text-center py-8 text-muted-foreground italic">
                         No sales orders found for this customer.
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
