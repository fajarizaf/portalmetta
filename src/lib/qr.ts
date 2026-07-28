import QRCode from "qrcode"
import crypto from "crypto"
import { prisma } from "./prisma"

const QR_EXPIRY_HOURS = 24

export interface QRPayload {
  docType: string
  id: string
  token: string
  customerId: string
  expiresAt: string
}

export function generateQRToken(): string {
  return crypto.randomUUID()
}

export function createQRPayload(recordId: string, companyId: string, token: string): QRPayload {
  const expiresAt = new Date(Date.now() + QR_EXPIRY_HOURS * 60 * 60 * 1000)
  return {
    docType: "visitor_request",
    id: recordId,
    token,
    customerId: companyId,
    expiresAt: expiresAt.toISOString(),
  }
}

export async function generateQRCodeDataURL(payload: QRPayload): Promise<string> {
  const jsonStr = JSON.stringify(payload)
  return QRCode.toDataURL(jsonStr, {
    width: 300,
    margin: 2,
    color: { dark: "#000000", light: "#ffffff" },
  })
}

export async function generateQRCodeBuffer(payload: QRPayload): Promise<Buffer> {
  const jsonStr = JSON.stringify(payload)
  return QRCode.toBuffer(jsonStr, {
    width: 300,
    margin: 2,
    color: { dark: "#000000", light: "#ffffff" },
  })
}

export function isQRExpired(expiresAt: string): boolean {
  return new Date(expiresAt) < new Date()
}

export interface QRValidationResult {
  valid: boolean
  error?: string
  record?: {
    id: string
    code: string | null
    status: string | null
    data: Record<string, unknown>
    qrStatus: string | null
    checkInTime: Date | null
    checkOutTime: Date | null
    visitDate: string | null
  }
}

export async function validateQRToken(token: string): Promise<QRValidationResult> {
  const dt = await prisma.docType.findUnique({ where: { key: "visitor_request" } })
  if (!dt) return { valid: false, error: "Visitor request DocType tidak ditemukan" }

  const records = await prisma.docRecord.findMany({
    where: { docTypeId: dt.id },
    take: 1000,
  })

  const record = records.find((r) => {
    const data = (r.data ?? {}) as Record<string, unknown>
    return data["qr_token"] === token
  })

  if (!record) {
    return { valid: false, error: "QR code tidak valid" }
  }

  const data = (record.data ?? {}) as Record<string, unknown>
  const expiresAt = typeof data["qr_expires_at"] === "string" ? data["qr_expires_at"] : null

  if (!expiresAt || isQRExpired(expiresAt)) {
    return { valid: false, error: "QR code sudah expired" }
  }

  const recordStatus = (record.status ?? "").toLowerCase()
  if (recordStatus !== "approved") {
    const statusLabel = record.status || "Draft"
    return { valid: false, error: `Visitor request belum di-approve (status: ${statusLabel})` }
  }

  return {
    valid: true,
    record: {
      id: record.id,
      code: record.code,
      status: record.status,
      data,
      qrStatus: typeof data["qr_status"] === "string" ? data["qr_status"] : null,
      checkInTime: data["check_in_time"] ? new Date(data["check_in_time"] as string) : null,
      checkOutTime: data["check_out_time"] ? new Date(data["check_out_time"] as string) : null,
      visitDate: typeof data["visit_date"] === "string" ? data["visit_date"] : null,
    },
  }
}

// Simple in-memory rate limiter
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()

export function checkRateLimit(ip: string, maxRequests = 5, windowMs = 60000): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + windowMs })
    return true
  }

  if (entry.count >= maxRequests) {
    return false
  }

  entry.count++
  return true
}

export async function logScanActivity(params: {
  recordId: string
  token: string
  action: string
  success: boolean
  error?: string
  ip?: string
  scannedBy?: string
}): Promise<void> {
  const logEntry = {
    at: new Date().toISOString(),
    token: params.token,
    action: params.action,
    success: params.success,
    error: params.error,
    ip: params.ip,
    scannedBy: params.scannedBy,
  }

  const record = await prisma.docRecord.findUnique({ where: { id: params.recordId } })
  if (!record) return

  const data = (record.data ?? {}) as Record<string, unknown>
  const scanLog = Array.isArray(data["__scan_log"]) ? (data["__scan_log"] as Array<unknown>) : []
  scanLog.push(logEntry)

  // Keep only last 100 scan logs
  const trimmedLog = scanLog.slice(-100)

  await prisma.docRecord.update({
    where: { id: params.recordId },
    data: {
      data: { ...data, __scan_log: trimmedLog } as any,
    },
  })
}
