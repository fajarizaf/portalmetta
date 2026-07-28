import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions)
  const email = session?.user?.email ?? ""
  if (!email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const me = await prisma.user.findUnique({
    where: { email },
    include: { role: { include: { permissions: { include: { permission: true } } } } },
  })
  if (!me) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const perm = new Set(me.role?.permissions?.map((rp) => rp.permission.key) ?? [])
  if (!perm.has("VISITING_MANAGEMENT") && !perm.has("ADMIN_PANEL_ACCESS")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  const sp = request.nextUrl.searchParams
  const date = sp.get("date")
  const status = sp.get("status")
  const page = parseInt(sp.get("page") || "1", 10)
  const limit = parseInt(sp.get("limit") || "50", 10)

  // Get the visitor_request doctype
  const dt = await prisma.docType.findUnique({ where: { key: "visitor_request" } })
  if (!dt) return NextResponse.json({ records: [], total: 0 })

  const where: any = { docTypeId: dt.id }
  if (status && status !== "all") {
    where.data = { path: ["qr_status"], equals: status }
  }

  const records = await prisma.docRecord.findMany({
    where,
    orderBy: { updatedAt: "desc" },
    skip: (page - 1) * limit,
    take: limit,
  })

  const total = await prisma.docRecord.count({ where })

  const enriched = records.map((r) => {
    const data = (r.data ?? {}) as Record<string, unknown>
    const scanLog = Array.isArray(data["__scan_log"]) ? (data["__scan_log"] as Array<Record<string, unknown>>) : []

    let filteredLog = scanLog
    if (date) {
      filteredLog = scanLog.filter((entry) => {
        const at = typeof entry.at === "string" ? entry.at : ""
        return at.startsWith(date)
      })
    }

    return {
      id: r.id,
      code: r.code,
      status: r.status,
      qrStatus: data["qr_status"],
      qrToken: data["qr_token"],
      checkInTime: data["check_in_time"],
      checkOutTime: data["check_out_time"],
      visitDate: data["visit_date"],
      purpose: data["purpose"],
      scanLog: filteredLog,
      updatedAt: r.updatedAt,
    }
  })

  // Filter by date on visit_date field if provided
  let filtered = enriched
  if (date) {
    filtered = enriched.filter((r) => {
      return r.visitDate === date
    })
  }

  return NextResponse.json({ records: filtered, total: filtered.length })
}
