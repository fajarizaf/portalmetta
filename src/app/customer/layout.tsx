import Link from "next/link"
import Image from "next/image"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { ToastHost } from "@/components/toast"
import { NavigationLoadingOverlay } from "@/components/navigation-loading"
import { UserMenu } from "@/components/user-menu"
import { prisma } from "@/lib/prisma"
import { BranchSelector } from "@/components/branch-selector"
import { cookies, headers } from "next/headers"
import { redirect } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Search, LifeBuoy, LayoutGrid } from "lucide-react"
import { CustomerNav } from "@/components/customer/customer-nav"
import { NotificationPopover } from "@/components/customer/notification-popover"

async function setCustomerBranch(formData: FormData) {
  "use server"
  const branchId = String(formData.get("branchId") || "")
  if (!branchId) return
  const store = await cookies()
  store.set("branchId", branchId, { path: "/" })
  const referer = (await headers()).get("referer") || "/customer"
  redirect(referer)
}

export const dynamic = "force-dynamic"

export default async function CustomerLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions)
  const email = session?.user?.email ?? ""
  const name = session?.user?.name ?? email
  const me = email ? await prisma.user.findUnique({ where: { email }, include: { role: { include: { permissions: { include: { permission: true } } } } } }) : null
  const userCompanyId = email ? (await prisma.user.findUnique({ where: { email }, select: { companyId: true } }))?.companyId ?? null : null
  const parentCompanyId = userCompanyId ? (await prisma.company.findUnique({ where: { id: userCompanyId }, select: { parentId: true } }))?.parentId ?? null : null
  const company = parentCompanyId ? await prisma.company.findUnique({ where: { id: parentCompanyId }, select: { logoUrl: true, name: true } }) : null
  const scopeCompanyId = parentCompanyId ?? userCompanyId
  const cookieStore = await cookies()
  const cookieBranchId = cookieStore.get("branchId")?.value
  const branches = scopeCompanyId ? await prisma.branch.findMany({ where: { companyId: scopeCompanyId }, orderBy: { name: "asc" } }) : []
  const allowedBranchIds = new Set(branches.map((b) => b.id))
  const candidateBranchId = cookieBranchId ?? branches[0]?.id
  const selectedBranchId = allowedBranchIds.has(String(candidateBranchId)) ? candidateBranchId : branches[0]?.id
  const docTypesAll = await prisma.docType.findMany({ include: { permissions: true }, orderBy: { name: "asc" } })
  const dtMap = new Map(docTypesAll.map((dt) => [dt.id, dt.key]))
  const notifyEnabledIds = docTypesAll.filter((dt) => {
    const cfg = (dt.config ?? {}) as unknown as { notifyConfig?: { customerEnabled?: boolean } }
    return Boolean(cfg.notifyConfig?.customerEnabled)
  }).map((dt) => dt.id)
  const recentRecords = notifyEnabledIds.length > 0 && me?.id ? await prisma.docRecord.findMany({ where: { docTypeId: { in: notifyEnabledIds }, ...(scopeCompanyId ? { createdBy: { companyId: scopeCompanyId } } : { createdById: me.id }) }, orderBy: { updatedAt: "desc" }, take: 20 }) : []
  const notifItems = recentRecords.flatMap((r) => {
    const d = (r.data ?? {}) as Record<string, unknown>
    const acts = Array.isArray(d["__activity"]) ? (d["__activity"] as Array<{ at: string; text: string }>) : []
    const lastStatus = acts.filter((a) => a.text.startsWith("Status diubah:"))
    const a = lastStatus.length > 0 ? lastStatus[lastStatus.length - 1] : null
    return a ? [{ at: a.at, text: a.text, recordId: r.id, docTypeKey: dtMap.get(r.docTypeId) ?? "" }] : []
  })

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <NavigationLoadingOverlay />

      {/* Top Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 ">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
          {/* Logo + Branch */}
          <div className="flex items-center gap-5">
            {company && (
              <Link href="/customer" className="flex items-center shrink-0 transition-opacity hover:opacity-80">
                {company.logoUrl ? (
                  <Image src={company.logoUrl} alt={company?.name || "Company"} width={140} height={40} className="h-9 w-auto object-contain" />
                ) : (
                  <span className="text-lg font-bold tracking-tight text-slate-900">{company.name || "Company"}</span>
                )}
              </Link>
            )}

              {branches.length > 0 && (
              <div className="w-auto sm:w-52 border-l border-slate-200 pl-3 sm:pl-5">
                <BranchSelector branches={branches} selectedBranchId={selectedBranchId ?? undefined} action={setCustomerBranch} />
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Link
              href="/customer/my-racks"
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 rounded-lg transition-all"
            >
              <LayoutGrid className="size-4" />
              <span className="hidden sm:inline">Rack</span>
            </Link>
            <Link
              href="/customer/support"
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 rounded-lg transition-all"
            >
              <LifeBuoy className="size-4" />
              <span className="hidden sm:inline">Support</span>
            </Link>

            <div className="w-px h-6 bg-slate-200 mx-1" />

            <UserMenu name={name} email={email} roleName={me?.role?.name ?? ""} imageUrl={session?.user?.image ?? undefined} />
            <NotificationPopover items={notifItems} />
          </div>
        </div>
      </header>

      {/* Secondary Navigation */}
      <div className="sticky top-14 sm:top-16 z-40 bg-white/70 backdrop-blur-lg border-b border-slate-200/50">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 h-12 flex items-center justify-between">
          <CustomerNav />

          <div className="relative w-56 hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
            <Input
              placeholder="Search..."
              className="pl-9 h-9 bg-slate-50/80 border-slate-200/80 rounded-lg text-sm focus:bg-white focus:ring-1 focus:ring-slate-300 transition-all placeholder:text-slate-400"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-[1400px] mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <ToastHost />
        {children}
      </main>
    </div>
  )
}
