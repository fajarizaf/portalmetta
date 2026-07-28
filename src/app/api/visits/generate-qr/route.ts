import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { generateQRToken, createQRPayload } from "@/lib/qr"

export async function POST(request: NextRequest) {
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
  const { recordId } = body
  if (!recordId) return NextResponse.json({ error: "recordId required" }, { status: 400 })

  const record = await prisma.docRecord.findUnique({ where: { id: recordId } })
  if (!record) return NextResponse.json({ error: "Record not found" }, { status: 404 })

  const docType = await prisma.docType.findUnique({ where: { id: record.docTypeId } })
  if (!docType || docType.key !== "visitor_request") {
    return NextResponse.json({ error: "Invalid document type" }, { status: 400 })
  }

  const data = (record.data ?? {}) as Record<string, unknown>
  const newToken = generateQRToken()
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()

  const updatedData = {
    ...data,
    qr_token: newToken,
    qr_status: "pending",
    qr_expires_at: expiresAt,
    qr_generated_at: new Date().toISOString(),
  }

  await prisma.docRecord.update({
    where: { id: recordId },
    data: { data: updatedData as any },
  })

  return NextResponse.json({
    success: true,
    token: newToken,
    expiresAt,
  })
}
