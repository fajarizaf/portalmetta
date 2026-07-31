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
import { ArrowLeft, Building, Phone, Mail, MapPin, Users, FileText, LayoutGrid, Trash2, ChevronRight, Building2, Globe, Hash, CircleDashed, CheckCircle2, Clock, XCircle, Package, ArrowDownToLine, ArrowUpFromLine } from "lucide-react";
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
  docs: Array<{ id: string; code: string | null; status: string | null; createdAt: Date; data?: any; docType: { key: string } }>
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
            {docs.slice(0, 50).map((doc) => {
              const StatusIcon = statusIcon(doc.status)
              const d = (doc.data || {}) as Record<string, any>
              const displayTitle = d.rack_name || d.name || d.title || doc.code || doc.id
              const displaySubtitle = doc.code && d.rack_name ? doc.code : undefined
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
                      <div className="text-sm font-medium text-slate-900 truncate">{displayTitle}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        {displaySubtitle ? `${displaySubtitle} · ` : ""}
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
        { data: { path: "$.customer", equals: company.id as any } },
        { data: { path: "$.company_id", equals: company.id as any } },
        { data: { path: "$.company_id", equals: company.name as any } },
        { data: { path: "$.customer_id", equals: company.name as any } },
        { data: { path: "$.owner_customer_id", equals: company.name as any } },
        { data: { path: "$.customer", equals: company.name as any } },
        { data: { path: "$.company", equals: company.id as any } },
        { data: { path: "$.company", equals: company.name as any } },
        { data: { path: "$.company_name", equals: company.name as any } },
        { createdBy: { companyId: company.id } },
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

  const totalDocs = relatedDocs.length;

  const goodsInItemType = await prisma.docType.findUnique({ where: { key: "goods_in_item" } });
  const goodsOutItemType = await prisma.docType.findUnique({ where: { key: "goods_out_item" } });

  const completedRecordStatus = {
    OR: [
      { status: { equals: "Completed" } },
      { status: { contains: "Complete" } },
      { status: { contains: "COMPLETED" } },
    ]
  };

  const docRowCompanyFilter = [
    { data: { path: "$.owner_customer_id", equals: company.id as any } },
    { data: { path: "$.owner_customer_id", equals: company.name as any } },
    { data: { path: "$.customer_id", equals: company.id as any } },
    { data: { path: "$.customer_id", equals: company.name as any } },
    { data: { path: "$.company_id", equals: company.id as any } },
    { data: { path: "$.company_id", equals: company.name as any } },
    { record: { createdBy: { companyId: company.id } } },
    { record: { data: { path: "$.customer_id", equals: company.id as any } } },
    { record: { data: { path: "$.customer_id", equals: company.name as any } } },
    { record: { data: { path: "$.owner_customer_id", equals: company.id as any } } },
    { record: { data: { path: "$.owner_customer_id", equals: company.name as any } } },
  ];

  const [companyGoodsInRows, companyGoodsOutRows, allBuildings, allFloors, allRooms] = await Promise.all([
    goodsInItemType ? prisma.docRow.findMany({
      where: {
        childDocTypeId: goodsInItemType.id,
        record: completedRecordStatus,
        OR: docRowCompanyFilter,
      },
      include: { record: true }
    }) : [],
    goodsOutItemType ? prisma.docRow.findMany({
      where: {
        childDocTypeId: goodsOutItemType.id,
        record: completedRecordStatus,
        OR: docRowCompanyFilter,
      },
      include: { record: true }
    }) : [],
    prisma.building.findMany({ select: { id: true, name: true } }),
    prisma.floor.findMany({ select: { id: true, name: true } }),
    prisma.room.findMany({ select: { id: true, name: true } }),
  ]);

  const buildingNameMap = new Map(allBuildings.map(b => [b.id, b.name]));
  const floorNameMap = new Map(allFloors.map(f => [f.id, f.name]));
  const roomNameMap = new Map(allRooms.map(r => [r.id, r.name]));

  interface CompanyInventoryEntry {
    key: string;
    itemName: string;
    typeOfMaterial: string;
    brand: string;
    buildingName: string;
    floorName: string;
    roomName: string;
    qty: number;
    serialNumbers: Set<string>;
    lastUpdate: Date;
  }

  const inventoryMap = new Map<string, CompanyInventoryEntry>();

  const processInventoryRow = (row: typeof companyGoodsInRows[0], sign: number) => {
    const d = (row.data ?? {}) as Record<string, any>;
    const itemName = String(d.item_name || d.name || "").trim();
    const typeOfMaterial = String(d.type_of_material || "").trim();
    const brand = String(d.brand || "").trim();
    const buildingId = String(d.building_id || "").trim();
    const floorId = String(d.floor_id || "").trim();
    const roomId = String(d.room_id || "").trim();
    const qty = Number(d.quantity || d.qty || 0);
    const sn = String(d.serial_number || "").trim();

    const key = `${itemName}|${typeOfMaterial}|${brand}|${buildingId}|${floorId}|${roomId}`;

    if (!inventoryMap.has(key)) {
      inventoryMap.set(key, {
        key,
        itemName: itemName || typeOfMaterial || "Item",
        typeOfMaterial,
        brand,
        buildingName: buildingNameMap.get(buildingId) || buildingId || "-",
        floorName: floorNameMap.get(floorId) || floorId || "-",
        roomName: roomNameMap.get(roomId) || roomId || "-",
        qty: 0,
        serialNumbers: new Set(),
        lastUpdate: new Date(0)
      });
    }

    const entry = inventoryMap.get(key)!;
    entry.qty += qty * sign;
    if (sn) {
      if (sign > 0) entry.serialNumbers.add(sn);
      else entry.serialNumbers.delete(sn);
    }
    const createdAt = new Date(row.record.createdAt);
    if (createdAt > entry.lastUpdate) entry.lastUpdate = createdAt;
  };

  companyGoodsInRows.forEach(row => processInventoryRow(row, 1));
  companyGoodsOutRows.forEach(row => processInventoryRow(row, -1));

  const companyInventory = Array.from(inventoryMap.values()).filter(i => Math.abs(i.qty) > 0 || i.serialNumbers.size > 0);

  const companyMovements = [
    ...companyGoodsInRows.map((row) => {
      const d = (row.data ?? {}) as Record<string, any>;
      const buildingId = String(d.building_id || "").trim();
      const floorId = String(d.floor_id || "").trim();
      const roomId = String(d.room_id || "").trim();
      return {
        id: row.id,
        type: "IN" as const,
        docKey: "goods_in_request",
        recordId: row.record.id,
        code: row.record.code || row.record.id,
        itemName: String(d.item_name || d.name || d.type_of_material || "Item").trim(),
        typeOfMaterial: String(d.type_of_material || "").trim(),
        brand: String(d.brand || "").trim(),
        buildingName: buildingNameMap.get(buildingId) || buildingId || "-",
        floorName: floorNameMap.get(floorId) || floorId || "-",
        roomName: roomNameMap.get(roomId) || roomId || "-",
        qty: Number(d.quantity || d.qty || 0),
        serialNumber: String(d.serial_number || "").trim(),
        createdAt: new Date(row.createdAt || row.record.createdAt),
      };
    }),
    ...companyGoodsOutRows.map((row) => {
      const d = (row.data ?? {}) as Record<string, any>;
      const buildingId = String(d.building_id || "").trim();
      const floorId = String(d.floor_id || "").trim();
      const roomId = String(d.room_id || "").trim();
      return {
        id: row.id,
        type: "OUT" as const,
        docKey: "goods_out_request",
        recordId: row.record.id,
        code: row.record.code || row.record.id,
        itemName: String(d.item_name || d.name || d.type_of_material || "Item").trim(),
        typeOfMaterial: String(d.type_of_material || "").trim(),
        brand: String(d.brand || "").trim(),
        buildingName: buildingNameMap.get(buildingId) || buildingId || "-",
        floorName: floorNameMap.get(floorId) || floorId || "-",
        roomName: roomNameMap.get(roomId) || roomId || "-",
        qty: Number(d.quantity || d.qty || 0),
        serialNumber: String(d.serial_number || "").trim(),
        createdAt: new Date(row.createdAt || row.record.createdAt),
      };
    }),
  ].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

  const docTabs: Array<{
    key: string;
    label: string;
    icon: typeof FileText;
  }> = [
    { key: "quotation", label: "Quotation", icon: FileText },
    { key: "visitor_request", label: "Request", icon: Clock },
    { key: "sales_order", label: "Sales Order", icon: CheckCircle2 },
    { key: "subscription_management", label: "Subscription", icon: Globe },
    { key: "master_rack", label: "Rack", icon: LayoutGrid },
    { key: "invoice", label: "Invoices", icon: FileText },
    { key: "transaction", label: "Transaction", icon: Hash },
    { key: "work_order", label: "Work Order", icon: Building2 },
  ];

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
          <TabsList className="inline-flex h-11 items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl border border-slate-200/80 w-max">
            <TabsTrigger
              value="info"
              className="data-[state=active]:bg-slate-900 data-[state=active]:text-white rounded-xl px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-all shadow-xs flex items-center gap-2"
            >
              <Building2 className="w-4 h-4" />
              General Info
            </TabsTrigger>
            <TabsTrigger
              value="users"
              className="data-[state=active]:bg-slate-900 data-[state=active]:text-white rounded-xl px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-all shadow-xs flex items-center gap-2"
            >
              <Users className="w-4 h-4" />
              Users
            </TabsTrigger>
            <TabsTrigger
              value="documents"
              className="data-[state=active]:bg-slate-900 data-[state=active]:text-white rounded-xl px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-all shadow-xs flex items-center gap-2"
            >
              <FileText className="w-4 h-4" />
              Documents
            </TabsTrigger>
            <TabsTrigger
              value="inventory"
              className="data-[state=active]:bg-slate-900 data-[state=active]:text-white rounded-xl px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-all shadow-xs flex items-center gap-2"
            >
              <Package className="w-4 h-4" />
              Inventory
            </TabsTrigger>
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
        <TabsContent value="documents" className="space-y-6">
          <Tabs defaultValue={docTabs[0].key} className="space-y-6">
            <div className="overflow-x-auto -mx-4 px-4">
              <TabsList className="inline-flex h-10 items-center gap-1 bg-slate-100/80 p-1 rounded-xl border border-slate-200/60 shadow-xs w-max">
                {docTabs.map(({ key, label, icon: SubIcon }) => (
                  <TabsTrigger
                    key={key}
                    value={key}
                    className="data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-xs rounded-lg px-3.5 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 transition-all whitespace-nowrap flex items-center gap-2"
                  >
                    <SubIcon className="w-3.5 h-3.5 text-slate-400" />
                    {label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {docTabs.map(({ key, label, icon }) => (
              <TabsContent key={key} value={key}>
                <DocListCard
                  docs={docsByKey[key] || []}
                  docTypeKey={key}
                  label={label}
                  icon={icon}
                  emptyMessage={`No ${label.toLowerCase()} history found.`}
                  filterParam={key === "visitor_request" ? `owner_customer_id=${company.id}` : key === "master_rack" ? `company_id=${company.id}` : `customer_id=${company.id}`}
                />
              </TabsContent>
            ))}
          </Tabs>
        </TabsContent>

        {/* Inventory */}
        <TabsContent value="inventory" className="space-y-6">
          {/* Active Stock Balance */}
          <Card className="border-slate-200/60 bg-white overflow-hidden">
            <CardHeader className="px-6 py-4 border-b border-slate-100">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-sm font-semibold text-slate-900">Current Stock Balance</CardTitle>
                  <p className="text-xs text-slate-400 mt-0.5">{companyInventory.length} active inventory item{companyInventory.length !== 1 ? "s" : ""} in stock</p>
                </div>
                <Button size="sm" asChild className="h-8 text-xs bg-slate-900 hover:bg-slate-800 text-white">
                  <Link href="/admin/inventory/management">Open Inventory Management</Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {companyInventory.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-100 bg-slate-50/50">
                        <th className="text-left py-3 px-6 font-medium text-slate-400 text-[11px] uppercase tracking-wider">Item Name / Material</th>
                        <th className="text-left py-3 px-6 font-medium text-slate-400 text-[11px] uppercase tracking-wider">Brand</th>
                        <th className="text-left py-3 px-6 font-medium text-slate-400 text-[11px] uppercase tracking-wider">Location (Building / Floor / Room)</th>
                        <th className="text-left py-3 px-6 font-medium text-slate-400 text-[11px] uppercase tracking-wider">Qty</th>
                        <th className="text-left py-3 px-6 font-medium text-slate-400 text-[11px] uppercase tracking-wider">Serial Numbers</th>
                        <th className="text-right py-3 px-6 font-medium text-slate-400 text-[11px] uppercase tracking-wider">Last Movement</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {companyInventory.map((item) => (
                        <tr key={item.key} className="hover:bg-slate-50/50 transition-colors">
                          <td className="py-3.5 px-6 font-medium text-slate-900">
                            <div>{item.itemName}</div>
                            {item.typeOfMaterial && item.typeOfMaterial !== item.itemName && (
                              <div className="text-xs text-slate-400 font-normal">{item.typeOfMaterial}</div>
                            )}
                          </td>
                          <td className="py-3.5 px-6 text-slate-600">{item.brand || "-"}</td>
                          <td className="py-3.5 px-6 text-slate-600">
                            {item.buildingName} / {item.floorName} / {item.roomName}
                          </td>
                          <td className="py-3.5 px-6">
                            <Badge variant={item.qty > 0 ? "default" : "secondary"}>
                              {item.qty} unit{item.qty !== 1 ? "s" : ""}
                            </Badge>
                          </td>
                          <td className="py-3.5 px-6 text-slate-500 max-w-[200px] truncate" title={Array.from(item.serialNumbers).join(", ")}>
                            {item.serialNumbers.size > 0 ? Array.from(item.serialNumbers).join(", ") : "-"}
                          </td>
                          <td className="py-3.5 px-6 text-right text-slate-500 whitespace-nowrap">
                            {item.lastUpdate.getTime() > 0 ? item.lastUpdate.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "-"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center mb-3">
                    <Package className="w-6 h-6 text-slate-300" />
                  </div>
                  <p className="text-sm text-slate-500 font-medium">No active stock</p>
                  <p className="text-xs text-slate-400 mt-1">This company has no active stock or inventory recorded.</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Inbound & Outbound Movement History */}
          <Card className="border-slate-200/60 bg-white overflow-hidden">
            <CardHeader className="px-6 py-4 border-b border-slate-100">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-sm font-semibold text-slate-900">Inbound & Outbound Movement History</CardTitle>
                  <p className="text-xs text-slate-400 mt-0.5">{companyMovements.length} total movement transaction{companyMovements.length !== 1 ? "s" : ""}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {companyMovements.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-100 bg-slate-50/50">
                        <th className="text-left py-3 px-6 font-medium text-slate-400 text-[11px] uppercase tracking-wider">Type</th>
                        <th className="text-left py-3 px-6 font-medium text-slate-400 text-[11px] uppercase tracking-wider">Reference Code</th>
                        <th className="text-left py-3 px-6 font-medium text-slate-400 text-[11px] uppercase tracking-wider">Item / Material</th>
                        <th className="text-left py-3 px-6 font-medium text-slate-400 text-[11px] uppercase tracking-wider">Brand</th>
                        <th className="text-left py-3 px-6 font-medium text-slate-400 text-[11px] uppercase tracking-wider">Location</th>
                        <th className="text-left py-3 px-6 font-medium text-slate-400 text-[11px] uppercase tracking-wider">Qty</th>
                        <th className="text-left py-3 px-6 font-medium text-slate-400 text-[11px] uppercase tracking-wider">Serial Number</th>
                        <th className="text-right py-3 px-6 font-medium text-slate-400 text-[11px] uppercase tracking-wider">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {companyMovements.map((mov) => (
                        <tr key={`${mov.type}-${mov.id}`} className="hover:bg-slate-50/50 transition-colors">
                          <td className="py-3.5 px-6">
                            {mov.type === "IN" ? (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                                <ArrowDownToLine className="w-3 h-3" />
                                INBOUND
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                                <ArrowUpFromLine className="w-3 h-3" />
                                OUTBOUND
                              </span>
                            )}
                          </td>
                          <td className="py-3.5 px-6 font-medium text-slate-900">
                            <Link href={`/admin/docs/${mov.docKey}/${mov.recordId}`} className="hover:underline text-blue-600">
                              {mov.code}
                            </Link>
                          </td>
                          <td className="py-3.5 px-6 text-slate-900 font-medium">
                            <div>{mov.itemName}</div>
                            {mov.typeOfMaterial && mov.typeOfMaterial !== mov.itemName && (
                              <div className="text-xs text-slate-400 font-normal">{mov.typeOfMaterial}</div>
                            )}
                          </td>
                          <td className="py-3.5 px-6 text-slate-600">{mov.brand || "-"}</td>
                          <td className="py-3.5 px-6 text-slate-600">
                            {mov.buildingName} / {mov.floorName} / {mov.roomName}
                          </td>
                          <td className="py-3.5 px-6 font-medium">
                            <span className={mov.type === "IN" ? "text-emerald-600 font-semibold" : "text-amber-600 font-semibold"}>
                              {mov.type === "IN" ? `+${mov.qty}` : `-${mov.qty}`}
                            </span>
                          </td>
                          <td className="py-3.5 px-6 text-slate-500 max-w-[150px] truncate" title={mov.serialNumber}>
                            {mov.serialNumber || "-"}
                          </td>
                          <td className="py-3.5 px-6 text-right text-slate-500 whitespace-nowrap">
                            {mov.createdAt.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center mb-3">
                    <FileText className="w-6 h-6 text-slate-300" />
                  </div>
                  <p className="text-sm text-slate-500 font-medium">No movement history</p>
                  <p className="text-xs text-slate-400 mt-1">No inbound or outbound movement transactions found for this company.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
