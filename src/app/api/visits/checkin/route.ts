import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { validateQRToken, logScanActivity, checkRateLimit } from "@/lib/qr"

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown"

  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 })
  }

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

  const body = await request.json()
  const { token } = body
  if (!token) return NextResponse.json({ error: "Token required" }, { status: 400 })

  const validation = await validateQRToken(token)
  if (!validation.valid || !validation.record) {
    await logScanActivity({
      recordId: "",
      token,
      action: "checkin",
      success: false,
      error: validation.error,
      ip,
      scannedBy: me.email,
    })
    return NextResponse.json({ error: validation.error }, { status: 400 })
  }

  const rec = validation.record
  if (rec.qrStatus === "checked_in" || rec.qrStatus === "checked_out") {
    await logScanActivity({
      recordId: rec.id,
      token,
      action: "checkin",
      success: false,
      error: `Visitor sudah ${rec.qrStatus === "checked_in" ? "check-in" : "check-out"}`,
      ip,
      scannedBy: me.email,
    })
    return NextResponse.json({
      error: `Visitor sudah ${rec.qrStatus === "checked_in" ? "check-in" : "check-out"}`,
      qrStatus: rec.qrStatus,
      checkInTime: rec.checkInTime,
      checkOutTime: rec.checkOutTime,
    }, { status: 400 })
  }

  const now = new Date().toISOString()
  const updatedData = {
    ...rec.data,
    qr_status: "checked_in",
    check_in_time: now,
  }

  await prisma.docRecord.update({
    where: { id: rec.id },
    data: { data: updatedData as any },
  })

  await logScanActivity({
    recordId: rec.id,
    token,
    action: "checkin",
    success: true,
    ip,
    scannedBy: me.email,
  })

  return NextResponse.json({
    success: true,
    qrStatus: "checked_in",
    checkInTime: now,
    record: {
      id: rec.id,
      code: rec.code,
      data: rec.data,
    },
  })
}
