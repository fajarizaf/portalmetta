import { NextRequest, NextResponse } from "next/server"
import { validateQRToken } from "@/lib/qr"

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params
  if (!token) return NextResponse.json({ error: "Token required" }, { status: 400 })

  const result = await validateQRToken(token)
  if (!result.valid) {
    return NextResponse.json({ valid: false, error: result.error }, { status: 400 })
  }

  return NextResponse.json({ valid: true, record: result.record })
}
