import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { cookies } from "next/headers";
import { Users, Package, CreditCard, Clock, ArrowUpRight, FileText, Activity, TrendingUp, ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default async function AdminHome() {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email ?? "";
  const me = email ? await prisma.user.findUnique({ where: { email }, include: { role: { include: { permissions: { include: { permission: true } } } } } }) : null;
  const perm = new Set((me?.role?.permissions ?? []).map((rp) => rp.permission.key));

  if (!perm.has("ADMIN_PANEL_ACCESS")) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center">
          <FileText className="w-8 h-8 text-red-400" />
        </div>
        <div className="text-center">
          <h1 className="text-xl font-semibold text-slate-900">Access Denied</h1>
          <p className="text-sm text-slate-500 mt-1">You don&apos;t have permission to access the admin dashboard.</p>
        </div>
      </div>
    );
  }

  const cookieStore = await cookies();
  const cookieBranchId = cookieStore.get("branchId")?.value;

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

  const branchFilter = selectedBranchId ? { branchId: selectedBranchId } : {};

  const customersCount = await prisma.user.count({
    where: {
      role: { name: "Customer" },
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

  const pendingCount = await prisma.docRecord.count({
    where: {
      AND: [
        { status: { contains: "Pending" } },
        { docType: { NOT: { key: { endsWith: "_item" } } } },
        branchFilter
      ]
    }
  });

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
    take: 8
  });

  const stats = [
    {
      title: "Total Customers",
      value: customersCount,
      icon: Users,
      accent: "bg-blue-500",
      text: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-100",
      link: "/admin/customers",
    },
    {
      title: "Active Services",
      value: activeSubs.length,
      icon: Package,
      accent: "bg-emerald-500",
      text: "text-emerald-600",
      bg: "bg-emerald-50",
      border: "border-emerald-100",
      link: "/admin/docs/subscription_management",
    },
    {
      title: "Monthly Revenue",
      value: new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(totalMRC),
      icon: TrendingUp,
      accent: "bg-amber-500",
      text: "text-amber-600",
      bg: "bg-amber-50",
      border: "border-amber-100",
      link: "/admin/docs/subscription_management",
    },
    {
      title: "Pending Tasks",
      value: pendingCount,
      icon: Clock,
      accent: "bg-rose-500",
      text: "text-rose-600",
      bg: "bg-rose-50",
      border: "border-rose-100",
      link: "/admin/docs",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold text-slate-900 tracking-tight">Dashboard</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Welcome back, {session?.user?.name}. Here&apos;s your system overview.
          </p>
        </div>
        <span className="text-[11px] sm:text-xs text-slate-400 font-medium">
          {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
        </span>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <Link
            key={i}
            href={stat.link}
            className="group relative bg-white rounded-2xl border border-slate-200/80 p-5 hover:border-slate-300 transition-all duration-300"
          >
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-[13px] font-medium text-slate-500">{stat.title}</p>
                <p className="text-[28px] font-bold text-slate-900 tracking-tight leading-none">{stat.value}</p>
              </div>
              <div className={cn("w-11 h-11 rounded-xl flex items-center justify-center", stat.bg, stat.text)}>
                <stat.icon className="w-5 h-5" strokeWidth={1.5} />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-1 text-[11px] font-medium text-slate-400 group-hover:text-slate-600 transition-colors">
              View details
              <ArrowUpRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </Link>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-7">
        {/* Recent Activity */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200/80 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center">
                <Activity className="w-4 h-4 text-slate-600" strokeWidth={1.5} />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-slate-900">Recent Activity</h2>
                <p className="text-[11px] text-slate-500">Latest document updates</p>
              </div>
            </div>
            <Link
              href="/admin/docs"
              className="text-xs font-medium text-slate-500 hover:text-slate-900 transition-colors flex items-center gap-1"
            >
              View all
              <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="divide-y divide-slate-50">
            {recentActivities.length > 0 ? (
              recentActivities.map((act) => (
                <Link
                  key={act.id}
                  href={`/admin/docs/${act.docType.key}/${act.id}`}
                  className="flex items-center gap-4 px-6 py-3.5 hover:bg-slate-50/80 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center shrink-0 group-hover:bg-slate-900 group-hover:text-white transition-all duration-200">
                    <FileText className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" strokeWidth={1.5} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 truncate">
                      {act.docType.name}
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5 truncate">
                      {act.code || act.id.slice(0, 8)} &middot; {act.createdBy?.name || act.createdBy?.email}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className={cn(
                      "inline-flex px-2.5 py-1 rounded-full text-[11px] font-medium",
                      ["Completed", "Approved", "Active", "Paid"].includes(act.status ?? "") ? "bg-emerald-50 text-emerald-700 border border-emerald-100" :
                      ["Rejected", "Cancelled"].includes(act.status ?? "") ? "bg-red-50 text-red-700 border border-red-100" :
                      "bg-slate-100 text-slate-600 border border-slate-200"
                    )}>
                      {act.status}
                    </span>
                    <p className="text-[10px] text-slate-400 mt-1.5">
                      {new Date(act.updatedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </p>
                  </div>
                </Link>
              ))
            ) : (
              <div className="p-10 text-center">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-3">
                  <Activity className="w-6 h-6 text-slate-400" strokeWidth={1.5} />
                </div>
                <p className="text-sm font-medium text-slate-900">No recent activity</p>
                <p className="text-xs text-slate-500 mt-1">Activities will appear here</p>
              </div>
            )}
          </div>
        </div>

        {/* Pending Tasks */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center">
                  <Clock className="w-4 h-4 text-amber-600" strokeWidth={1.5} />
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-slate-900">Needs Attention</h2>
                  <p className="text-[11px] text-slate-500">Documents pending review</p>
                </div>
              </div>
              {pendingCount > 0 && (
                <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 text-[11px] font-semibold border border-amber-100">
                  {pendingCount}
                </span>
              )}
            </div>

            <div className="divide-y divide-slate-50">
              {pendingDocs.length > 0 ? (
                pendingDocs.map((doc) => (
                  <Link
                    key={doc.id}
                    href={`/admin/docs/${doc.docType.key}/${doc.id}`}
                    className="flex items-center gap-3 px-5 py-3.5 hover:bg-slate-50/80 transition-colors group"
                  >
                    <div className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-900 truncate">{doc.code || "No Code"}</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">{doc.docType.name}</p>
                    </div>
                    <span className="inline-flex px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 text-[11px] font-medium border border-amber-100 shrink-0">
                      {doc.status}
                    </span>
                  </Link>
                ))
              ) : (
                <div className="p-8 text-center">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-sm font-semibold text-slate-900">All caught up</p>
                  <p className="text-xs text-slate-500 mt-1">No pending tasks</p>
                </div>
              )}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100">
              <h2 className="text-sm font-semibold text-slate-900">Quick Links</h2>
            </div>
            <div className="p-2">
              <Link
                href="/admin/customers"
                className="flex items-center gap-3 px-3 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-xl transition-all"
              >
                <Users className="w-4 h-4 text-slate-400" strokeWidth={1.5} />
                Manage Customers
              </Link>
              <Link
                href="/admin/docs/subscription_management"
                className="flex items-center gap-3 px-3 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-xl transition-all"
              >
                <Package className="w-4 h-4 text-slate-400" strokeWidth={1.5} />
                Subscriptions
              </Link>
              <Link
                href="/admin/rack-mapping"
                className="flex items-center gap-3 px-3 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-xl transition-all"
              >
                <FileText className="w-4 h-4 text-slate-400" strokeWidth={1.5} />
                Rack Mapping
              </Link>
              <Link
                href="/admin/settings"
                className="flex items-center gap-3 px-3 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-xl transition-all"
              >
                <CreditCard className="w-4 h-4 text-slate-400" strokeWidth={1.5} />
                Settings
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
