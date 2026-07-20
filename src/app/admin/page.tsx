
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cookies } from "next/headers";
import { Users, Package, CreditCard, Clock, ArrowUpRight, FileText, Activity } from "lucide-react";
import Link from "next/link";

export default async function AdminHome() {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email ?? "";
  const me = email ? await prisma.user.findUnique({ where: { email }, include: { role: { include: { permissions: { include: { permission: true } } } } } }) : null;
  const perm = new Set((me?.role?.permissions ?? []).map((rp) => rp.permission.key));

  if (!perm.has("ADMIN_PANEL_ACCESS")) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <h1 className="text-2xl font-bold">Akses Ditolak</h1>
        <p className="text-muted-foreground">Anda tidak memiliki permission untuk mengakses dashboard admin.</p>
      </div>
    );
  }

  const cookieStore = await cookies();
  const cookieBranchId = cookieStore.get("branchId")?.value;
  
  // Robust branch resolution matching layout
  const isSuper = perm.has("COMPANY_MANAGEMENT");
  const assignedBranches = await prisma.branch.findMany({ 
    where: { admins: { some: { userId: me?.id ?? "" } } }, 
    orderBy: { name: "asc" } 
  });
  
  const superBranches = isSuper
    ? await prisma.branch.findMany({
        where: {
          OR: [
            { companyId: me?.companyId ?? undefined },
            { company: { parentId: me?.companyId ?? undefined } },
          ],
        },
        orderBy: { name: "asc" },
      })
    : [];
    
  const baseBranches = (assignedBranches.length > 0 && !isSuper)
      ? assignedBranches
      : (superBranches.length > 0 ? superBranches : await prisma.branch.findMany({ where: { companyId: me?.companyId ?? undefined }, orderBy: { name: "asc" } }));
      
  const branchesMap = new Map<string, { id: string; name: string }>();
  for (const b of baseBranches) branchesMap.set(b.id, { id: b.id, name: b.name });
  for (const b of assignedBranches) branchesMap.set(b.id, { id: b.id, name: b.name });
  
  const branches = Array.from(branchesMap.values());
  const candidateBranchId = cookieBranchId ?? branches[0]?.id;
  const allowedBranchIds = new Set(branches.map((b) => b.id));
  const selectedBranchId = allowedBranchIds.has(String(candidateBranchId)) ? candidateBranchId : branches[0]?.id;

  // Fetch Summary Data with branch filter
  const branchFilter = selectedBranchId ? { branchId: selectedBranchId } : {};

  const customersCount = await prisma.user.count({ 
    where: { 
      role: { name: "CUSTOMER" },
      // Customers are often global or tied to company, but if they are tied to branch:
      ...(selectedBranchId ? { company: { branches: { some: { id: selectedBranchId } } } } : {})
    } 
  });
  
  const subDt = await prisma.docType.findUnique({ where: { key: "subscription_management" } });
  const activeSubs = subDt ? await prisma.docRecord.findMany({ 
    where: { 
      docTypeId: subDt.id, 
      status: "Active",
      ...branchFilter
    } 
  }) : [];
  
  const totalMRC = activeSubs.reduce((acc, s) => acc + Number((s.data as any)?.total_mrc || 0), 0);
  
  const pendingDocs = await prisma.docRecord.findMany({
    where: { 
      AND: [
        {
          OR: [
            { status: { contains: "Pending" } },
            { status: { contains: "Draft" } },
            { status: { contains: "Review" } }
          ]
        },
        {
          docType: {
            NOT: {
              key: { endsWith: "_item" }
            }
          }
        },
        branchFilter
      ]
    },
    include: { docType: true },
    orderBy: { createdAt: "desc" },
    take: 5
  });

  const recentActivities = await prisma.docRecord.findMany({
    where: {
      AND: [
        {
          docType: {
            NOT: {
              key: { endsWith: "_item" }
            }
          }
        },
        branchFilter
      ]
    },
    include: { docType: true, createdBy: true },
    orderBy: { updatedAt: "desc" },
    take: 5
  });

  const stats = [
    {
      title: "Total Customers",
      value: customersCount,
      icon: Users,
      color: "text-blue-600",
      bg: "bg-blue-100",
      link: "/admin/customers"
    },
    {
      title: "Active Services",
      value: activeSubs.length,
      icon: Package,
      color: "text-emerald-600",
      bg: "bg-emerald-100",
      link: "/admin/docs/subscription_management"
    },
    {
      title: "Monthly Revenue (MRC)",
      value: new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(totalMRC),
      icon: CreditCard,
      color: "text-orange-600",
      bg: "bg-orange-100",
      link: "/admin/docs/subscription_management"
    },
    {
      title: "Pending Tasks",
      value: await prisma.docRecord.count({ 
        where: { 
          AND: [
            { status: { contains: "Pending" } },
            { docType: { NOT: { key: { endsWith: "_item" } } } },
            branchFilter
          ]
        } 
      }),
      icon: Clock,
      color: "text-rose-600",
      bg: "bg-rose-100",
      link: "/admin/docs"
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">Selamat datang kembali, {session?.user?.name}. Berikut adalah ringkasan sistem hari ini.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <div className={`${stat.bg} p-2 rounded-md`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <Link href={stat.link} className="text-xs text-muted-foreground flex items-center hover:underline mt-1">
                Lihat detail <ArrowUpRight className="ml-1 h-3 w-3" />
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        {/* Recent Activity */}
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Aktivitas Terbaru
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.length > 0 ? (
                recentActivities.map((act) => (
                  <div key={act.id} className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="h-9 w-9 rounded-full bg-muted flex items-center justify-center shrink-0">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-sm font-medium leading-none">
                          {act.docType.name} - {act.code || act.id.slice(0, 8)}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Oleh {act.createdBy?.name || act.createdBy?.email} • {new Date(act.updatedAt).toLocaleTimeString("id-ID", { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline">{act.status}</Badge>
                  </div>
                ))
              ) : (
                <p className="text-center py-4 text-muted-foreground italic">Belum ada aktivitas terbaru.</p>
              )}
            </div>
            <div className="mt-4 pt-4 border-t">
               <Button variant="ghost" className="w-full text-xs" asChild>
                  <Link href="/admin/docs">Lihat Semua Dokumen</Link>
               </Button>
            </div>
          </CardContent>
        </Card>

        {/* Pending Tasks / Workflow */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-rose-500" />
              Perlu Perhatian
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingDocs.length > 0 ? (
                pendingDocs.map((doc) => (
                  <Link 
                    key={doc.id} 
                    href={`/admin/docs/${doc.docType.key}/${doc.id}`}
                    className="flex flex-col gap-1 p-3 rounded-lg border border-rose-100 bg-rose-50/30 hover:bg-rose-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-rose-600 uppercase tracking-wider">{doc.docType.name}</span>
                      <span className="text-[10px] text-muted-foreground">{new Date(doc.createdAt).toLocaleDateString("id-ID")}</span>
                    </div>
                    <p className="text-sm font-semibold">{doc.code || "No Code"}</p>
                    <div className="flex items-center justify-between mt-1">
                      <Badge variant="secondary" className="text-[10px] h-5 bg-white">{doc.status}</Badge>
                      <span className="text-[10px] font-medium text-rose-500">Review &rarr;</span>
                    </div>
                  </Link>
                ))
              ) : (
                <p className="text-center py-4 text-muted-foreground italic">Semua tugas selesai! 🎉</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
