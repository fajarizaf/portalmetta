import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { QrCode, Camera, Eye, RefreshCw } from "lucide-react"

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

  // Build today date string in LOCAL timezone (YYYY-MM-DD format) to match
  // the format of data["visit_date"] stored in the database
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`
  const weekLaterStr = `${weekLater.getFullYear()}-${String(weekLater.getMonth() + 1).padStart(2, "0")}-${String(weekLater.getDate()).padStart(2, "0")}`

  const records = await prisma.docRecord.findMany({
    where: { docTypeId: dt.id },
    orderBy: { updatedAt: "desc" },
    take: 500,
  })

  // Filter records whose visit_date is within range (string comparison)
  const filtered = records.filter((r) => {
    const data = (r.data ?? {}) as Record<string, unknown>
    const visitDate = typeof data["visit_date"] === "string" ? data["visit_date"] : null
    if (!visitDate) return false
    // Direct string comparison works for YYYY-MM-DD format
    return visitDate >= todayStr && visitDate <= weekLaterStr
  })

  // Stats: today's visits
  const todayVisits = filtered.filter((r) => {
    const data = (r.data ?? {}) as Record<string, unknown>
    return data["visit_date"] === todayStr
  })
  // Active = checked in (regardless of check_out, they may still be on premise)
  // OR checked out today (just finished visit)
  const activeVisits = todayVisits.filter((r) => {
    const data = (r.data ?? {}) as Record<string, unknown>
    return data["qr_status"] === "checked_in"
  })
  const completedVisits = todayVisits.filter((r) => {
    const data = (r.data ?? {}) as Record<string, unknown>
    return data["qr_status"] === "checked_out"
  })

  function qrStatusBadge(status: unknown) {
    const s = String(status || "pending")
    if (s === "checked_in") return <Badge className="bg-green-100 text-green-800 border-green-300">Checked In</Badge>
    if (s === "checked_out") return <Badge className="bg-gray-100 text-gray-600 border-gray-300">Checked Out</Badge>
    return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">Pending</Badge>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Visits</h1>
          <p className="text-sm text-muted-foreground">Manage visitor passes and QR codes</p>
        </div>
        <Link href="/admin/visits/scanner">
          <Button>
            <Camera className="w-4 h-4 mr-2" />
            Open Scanner
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Today&apos;s Visits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{todayVisits.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active (Checked In)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">{activeVisits.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-500">{completedVisits.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>Visitor Requests ({filtered.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Code</TableHead>
                  <TableHead>Visitor</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Visit Date</TableHead>
                  <TableHead>Purpose</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>QR Status</TableHead>
                  <TableHead>Check-In</TableHead>
                  <TableHead>Check-Out</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={10} className="text-center py-8 text-muted-foreground">
                      No visitor requests found for the next 7 days.
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.map((r) => {
                    const data = (r.data ?? {}) as Record<string, unknown>
                    const visitors = Array.isArray(data["visitors"]) ? (data["visitors"] as Array<Record<string, unknown>>) : []
                    const firstVisitor = visitors[0]
                    const visitorName = firstVisitor ? String(firstVisitor["visitor_name"] || "N/A") : "N/A"
                    const companyId = typeof data["company_id"] === "string" ? data["company_id"] : ""

                    return (
                      <TableRow key={r.id}>
                        <TableCell className="font-mono text-sm">{r.code ?? r.id.slice(0, 8)}</TableCell>
                        <TableCell>{visitorName}{visitors.length > 1 ? ` (+${visitors.length - 1})` : ""}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{companyId ? companyId.slice(0, 8) + "..." : "-"}</TableCell>
                        <TableCell className="text-sm">{String(data["visit_date"] || "-")}</TableCell>
                        <TableCell className="text-sm max-w-[200px] truncate">{String(data["purpose"] || "-")}</TableCell>
                        <TableCell>
                          <Badge variant={r.status === "Approved" ? "default" : "outline"}>{r.status ?? "Draft"}</Badge>
                        </TableCell>
                        <TableCell>{qrStatusBadge(data["qr_status"])}</TableCell>
                        <TableCell className="text-sm">{data["check_in_time"] ? new Date(data["check_in_time"] as string).toLocaleTimeString("id-ID") : "-"}</TableCell>
                        <TableCell className="text-sm">{data["check_out_time"] ? new Date(data["check_out_time"] as string).toLocaleTimeString("id-ID") : "-"}</TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Link href={`/admin/docs/visitor_request/${r.id}`}>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Eye className="w-4 h-4" />
                              </Button>
                            </Link>
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
