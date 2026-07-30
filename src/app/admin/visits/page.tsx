import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Camera, Eye, Inbox, QrCode, ArrowDownToLine, ArrowUpFromLine, CheckCircle2, Clock, Users, User, Building, Phone, Calendar, LogIn, LogOut, Timer } from "lucide-react"

export default async function AdminVisitsPage() {
  const session = await getServerSession(authOptions)
  const email = session?.user?.email ?? ""
  if (!email) redirect("/login")

  const me = await prisma.user.findUnique({
    where: { email },
    include: { role: { include: { permissions: { include: { permission: true } } } } },
  })
  if (!me) redirect("/login")

  const perm = new Set(me.role?.permissions?.map((rp) => rp.permission.key) ?? [])
  if (!perm.has("VISITING_MANAGEMENT") && !perm.has("ADMIN_PANEL_ACCESS")) {
    redirect("/admin")
  }

  const dt = await prisma.docType.findUnique({ where: { key: "visitor_request" } })
  if (!dt) redirect("/admin")

  // Get today and 7 days ahead
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const weekLater = new Date(today)
  weekLater.setDate(weekLater.getDate() + 7)

  // Build today date string in LOCAL timezone (YYYY-MM-DD format)
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`
  const weekLaterStr = `${weekLater.getFullYear()}-${String(weekLater.getMonth() + 1).padStart(2, "0")}-${String(weekLater.getDate()).padStart(2, "0")}`

  const records = await prisma.docRecord.findMany({
    where: { docTypeId: dt.id },
    orderBy: { updatedAt: "desc" },
    take: 500,
    include: { rows: true }
  })

  // Filter records whose visit_date is within range
  const filtered = records.filter((r) => {
    const data = (r.data ?? {}) as Record<string, unknown>
    const visitDate = typeof data["visit_date"] === "string" ? data["visit_date"] : null
    if (!visitDate) return false
    return visitDate >= todayStr && visitDate <= weekLaterStr
  })

  const todayVisits = filtered.filter((r) => {
    const data = (r.data ?? {}) as Record<string, unknown>
    return data["visit_date"] === todayStr
  })
  const activeVisits = todayVisits.filter((r) => {
    const data = (r.data ?? {}) as Record<string, unknown>
    return data["qr_status"] === "checked_in"
  })
  const completedVisits = todayVisits.filter((r) => {
    const data = (r.data ?? {}) as Record<string, unknown>
    return data["qr_status"] === "checked_out"
  })
  const totalCount = records.length
  const upcomingCount = filtered.length

  // Helper for status badge
  function qrStatusBadge(status: unknown, size: "sm" | "md" = "sm") {
    const s = String(status || "pending")
    const sizeClasses = size === "md" ? "px-2.5 py-1 text-xs" : "px-2 py-0.5 text-[11px]"
    if (s === "checked_in") return <span className={cn("inline-flex items-center gap-1 rounded-md font-medium border bg-emerald-50 text-emerald-700 border-emerald-200/60", sizeClasses)}><CheckCircle2 className="h-3 w-3" />Checked In</span>
    if (s === "checked_out") return <span className={cn("inline-flex items-center gap-1 rounded-md font-medium border bg-slate-50 text-slate-600 border-slate-200/60", sizeClasses)}><Clock className="h-3 w-3" />Checked Out</span>
    return <span className={cn("inline-flex items-center gap-1 rounded-md font-medium border bg-amber-50 text-amber-700 border-amber-200/60", sizeClasses)}><Clock className="h-3 w-3" />Awaiting Check-in</span>
  }

  function docStatusBadge(status: string) {
    const s = status?.toLowerCase() || ""
    if (s.includes("approve")) return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium border bg-emerald-50 text-emerald-700 border-emerald-200/60"><CheckCircle2 className="h-3 w-3" />Req: {status}</span>
    return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium border bg-slate-50 text-slate-600 border-slate-200/60">Req: {status}</span>
  }

  return (
    <div className="min-h-screen bg-slate-50/30 -m-4 sm:-m-6 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Link href="/admin" className="hover:text-slate-900 transition-colors flex items-center gap-1">
              <ArrowLeft className="h-3.5 w-3.5" />
              Admin
            </Link>
            <span className="text-slate-300">/</span>
            <span className="text-slate-900 font-medium">Visits</span>
          </div>

          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-2xl bg-white border border-slate-200/80 flex items-center justify-center">
                <QrCode className="h-7 w-7 text-slate-700" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">Visitor Visits</h1>
                <div className="flex items-center gap-2 mt-1 text-sm text-slate-500">
                  <Users className="h-3.5 w-3.5" />
                  <span>{totalCount} total</span>
                  <span className="text-slate-300">·</span>
                  <span>{upcomingCount} this week</span>
                  <span className="text-slate-300">·</span>
                  <span className="text-slate-700 font-medium">{todayVisits.length} today</span>
                </div>
              </div>
            </div>

            <Button asChild className="h-9 bg-slate-900 hover:bg-slate-800 text-white shadow-sm">
              <Link href="/admin/visits/scanner">
                <Camera className="h-4 w-4 mr-2" />
                Open Scanner
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="bg-white rounded-xl border border-slate-200/80 p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-slate-50 flex items-center justify-center">
                  <Users className="h-5 w-5 text-slate-500" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">Today&apos;s Visits</p>
                  <p className="text-xs text-slate-400 mt-0.5">All scheduled</p>
                </div>
              </div>
              <p className="text-3xl font-semibold tracking-tight tabular-nums text-slate-900">
                {todayVisits.length}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200/80 p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-emerald-50 flex items-center justify-center">
                  <ArrowDownToLine className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">Active (Checked In)</p>
                  <p className="text-xs text-slate-400 mt-0.5">Currently on premise</p>
                </div>
              </div>
              <p className="text-3xl font-semibold tracking-tight tabular-nums text-emerald-600">
                {activeVisits.length}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200/80 p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-slate-50 flex items-center justify-center">
                  <ArrowUpFromLine className="h-5 w-5 text-slate-500" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">Completed</p>
                  <p className="text-xs text-slate-400 mt-0.5">Checked out today</p>
                </div>
              </div>
              <p className="text-3xl font-semibold tracking-tight tabular-nums text-slate-600">
                {completedVisits.length}
              </p>
            </div>
          </div>
        </div>

        {/* Records List */}
        <div className="space-y-2">
          {filtered.length === 0 ? (
            <div className="bg-white rounded-xl border border-slate-200/80 border-dashed py-16 flex flex-col items-center justify-center text-center">
              <div className="h-12 w-12 rounded-full bg-slate-50 flex items-center justify-center mb-3">
                <Inbox className="h-6 w-6 text-slate-400" />
              </div>
              <h3 className="text-sm font-medium text-slate-900">No visitor requests found</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm">
                No visitor requests scheduled for the next 7 days.
              </p>
            </div>
          ) : (
            filtered.map((r: any) => {
              const data = (r.data ?? {}) as Record<string, unknown>
              const rows = Array.isArray(r.rows) ? r.rows : []
              const firstVisitorRow = rows.length > 0 ? (rows[0].data ?? {}) as Record<string, unknown> : null
              const visitorName = firstVisitorRow
                ? String(firstVisitorRow["visitor_name"] || "N/A")
                : "N/A"
              const visitorNik = firstVisitorRow
                ? String(firstVisitorRow["nik"] || "-")
                : "-"
              const visitorPhone = firstVisitorRow
                ? String(firstVisitorRow["phone_number"] || "-")
                : "-"
              const purpose = String(data["purpose"] || "-")
              const visitDate = String(data["visit_date"] || "-")
              const ownerCustomer = String(data["owner_customer_id"] || "-")

              // Calculate duration if both check-in and check-out exist
              let duration = ""
              if (data["check_in_time"] && data["check_out_time"]) {
                const inTime = new Date(String(data["check_in_time"]))
                const outTime = new Date(String(data["check_out_time"]))
                const diffMs = outTime.getTime() - inTime.getTime()
                if (diffMs > 0) {
                  const hours = Math.floor(diffMs / (1000 * 60 * 60))
                  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))
                  duration = hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`
                }
              }

              return (
                <div
                  key={r.id}
                  className="group bg-white rounded-xl border border-slate-200/80 hover:border-slate-300 transition-all duration-200"
                >
                  <div className="p-4 flex items-start gap-4">
                    <div className="flex-1 min-w-0">
                      {/* Top line: Code + Status + Visitors count */}
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <Link
                          href={`/admin/docs/visitor_request/${r.id}`}
                          className="font-mono text-sm font-semibold text-slate-900 hover:text-slate-700 transition-colors"
                        >
                          {r.code ?? r.id.slice(0, 8)}
                        </Link>
                        {docStatusBadge(r.status ?? "Draft")}
                        {qrStatusBadge(data["qr_status"])}
                        {rows.length > 0 && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium border bg-slate-50 text-slate-600 border-slate-200/60">
                            <Users className="h-3 w-3" />
                            {rows.length} visitor{rows.length > 1 ? "s" : ""}
                          </span>
                        )}
                      </div>

                      {/* Main info: Visitor + Company */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1.5 mb-2">
                        <div className="flex items-center gap-1.5 text-sm min-w-0">
                          <User className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                          <span className="text-slate-900 font-medium truncate">{visitorName}</span>
                          {rows.length > 1 && (
                            <span className="text-slate-400 text-xs shrink-0">+{rows.length - 1} more</span>
                          )}
                        </div>
                        <div className="flex items-center gap-1.5 text-sm min-w-0">
                          <Building className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                          <span className="text-slate-700 truncate">{ownerCustomer}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-slate-500 min-w-0">
                          <span className="text-slate-400 shrink-0">NIK:</span>
                          <span className="font-mono text-slate-600 truncate">{visitorNik}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-slate-500 min-w-0">
                          <Phone className="h-3 w-3 text-slate-400 shrink-0" />
                          <span className="text-slate-600 truncate">{visitorPhone}</span>
                        </div>
                      </div>

                      {/* Bottom line: Date + Purpose + Check-in/out + Duration */}
                      <div className="flex items-center gap-x-4 gap-y-1.5 text-xs text-slate-500 flex-wrap pt-1.5 border-t border-slate-100">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-3 w-3 text-slate-400" />
                          <span className="text-slate-600 font-medium">{visitDate}</span>
                        </div>
                        <span className="text-slate-300">·</span>
                        <div className="flex items-center gap-1.5 min-w-0 max-w-[200px]">
                          <span className="text-slate-400 shrink-0">Purpose:</span>
                          <span className="text-slate-600 truncate">{purpose}</span>
                        </div>
                        {data["check_in_time"] ? (
                          <>
                            <span className="text-slate-300">·</span>
                            <div className="flex items-center gap-1.5">
                              <LogIn className="h-3 w-3 text-emerald-600" />
                              <span className="text-emerald-700 font-medium">
                                {new Date(String(data["check_in_time"])).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })}
                              </span>
                            </div>
                          </>
                        ) : null}
                        {data["check_out_time"] ? (
                          <>
                            <span className="text-slate-300">·</span>
                            <div className="flex items-center gap-1.5">
                              <LogOut className="h-3 w-3 text-slate-500" />
                              <span className="text-slate-600 font-medium">
                                {new Date(String(data["check_out_time"])).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })}
                              </span>
                            </div>
                          </>
                        ) : null}
                        {duration && (
                          <>
                            <span className="text-slate-300">·</span>
                            <div className="flex items-center gap-1.5">
                              <Timer className="h-3 w-3 text-slate-400" />
                              <span className="text-slate-600 font-medium">{duration}</span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                      <Link href={`/admin/docs/visitor_request/${r.id}`}>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-slate-900">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}
