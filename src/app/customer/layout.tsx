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
import { Search, LifeBuoy, LayoutGrid, Share2 } from "lucide-react"
import { CustomerNav } from "@/components/customer/customer-nav"
import { NotificationPopover } from "@/components/customer/notification-popover"
import { Button } from "@/components/ui/button"

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
    <div className="min-h-screen bg-slate-50">
      <NavigationLoadingOverlay />
      
      {/* Top Header: Logo and User Profile */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-4">
             {company ? (
              <Link href="/customer" className="flex items-center">
                {company.logoUrl ? (
                  <Image src={company.logoUrl} alt={company?.name || "Company"} width={140} height={40} className="h-10 w-auto object-contain" />
                ) : (
                  <span className="text-xl font-bold text-primary">{company.name || "Company"}</span>
                )}
              </Link>
            ) : null}
            
            {/* Branch Selector - kept here for functionality */}
            {branches.length > 0 ? (
              <div className="w-48">
                 <BranchSelector branches={branches} selectedBranchId={selectedBranchId ?? undefined} action={setCustomerBranch} />
              </div>
            ) : null}
          </div>

          {/* User & Notifications */}
          <div className="flex items-center gap-4">
             <Button asChild variant="ghost" className="relative gap-2" title="Rack Management">
              <Link href="/customer/my-racks">
                <LayoutGrid className="size-5" />
                <span className="text-sm font-medium">Rack Management</span>
              </Link>
            </Button>
             <Button asChild variant="ghost" className="relative gap-2" title="Support Ticket">
              <Link href="/customer/support">
                <LifeBuoy className="size-5" />
                <span className="text-sm font-medium">Support Ticket</span>
              </Link>
            </Button>
             <UserMenu name={name} email={email} roleName={me?.role?.name ?? ""} imageUrl={session?.user?.image ?? undefined} />
             
             <NotificationPopover items={notifItems} />
          </div>
        </div>
      </header>

      {/* Secondary Navigation: Menu and Search */}
      <div className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
           <div className="flex items-center gap-4">
              <CustomerNav />
           </div>

           <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
              <Input placeholder="Search..." className="pl-9 bg-slate-50 border-slate-200" />
           </div>
        </div>
      </div>

      <main className="container mx-auto p-4 py-8">
        <ToastHost />
        {children}
      </main>
    </div>
  )
}
