"use client"
import * as React from "react"
import { Html5Qrcode } from "html5-qrcode"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Camera, CameraOff, LogIn, LogOut, QrCode, ArrowLeft, History } from "lucide-react"
import Link from "next/link"

interface ScanResult {
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

interface ScanHistoryEntry {
  token: string
  recordId: string
  recordCode: string
  action: string
  result: string
  timestamp: string
  visitorName?: string
}

export default function ScannerPage() {
  const [scanning, setScanning] = React.useState(false)
  const [cameraError, setCameraError] = React.useState<string | null>(null)
  const [scanResult, setScanResult] = React.useState<ScanResult | null>(null)
  const [processing, setProcessing] = React.useState(false)
  const [scanHistory, setScanHistory] = React.useState<ScanHistoryEntry[]>([])
  const [toast, setToast] = React.useState<{ message: string; type: "success" | "error" } | null>(null)
  const scannerRef = React.useRef<Html5Qrcode | null>(null)
  const containerRef = React.useRef<HTMLDivElement>(null)

  const extractVisitorName = (data: Record<string, unknown>): string => {
    const v = data["visitors"]
    if (Array.isArray(v) && v.length > 0) return String((v[0] as Record<string, unknown>)?.visitor_name || "N/A")
    return "N/A"
  }

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  const startScanner = React.useCallback(async () => {
    if (!containerRef.current) return
    setCameraError(null)
    setScanResult(null)

    try {
      const scanner = new Html5Qrcode("qr-reader")
      scannerRef.current = scanner

      await scanner.start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
          aspectRatio: 1.0,
        },
        async (decodedText) => {
          // Pause scanner while processing
          try { await scanner.pause(true) } catch {}

          try {
            const payload = JSON.parse(decodedText)
            if (payload.docType !== "visitor_request" || !payload.token) {
              showToast("QR code bukan visitor pass", "error")
              try { await scanner.resume() } catch {}
              return
            }

            // Validate token
            const validateRes = await fetch(`/api/visits/qr/${payload.token}/validate`)
            const validation = await validateRes.json()
            setScanResult(validation)

            if (validation.valid) {
              const rec = validation.record
              setScanHistory((prev) => [{
                token: payload.token,
                recordId: rec.id,
                recordCode: rec.code || rec.id.slice(0, 8),
                action: "scan",
                result: "QR Valid",
                timestamp: new Date().toLocaleString("id-ID"),
                visitorName: (() => {
                  const v = rec.data?.visitors
                  if (Array.isArray(v) && v.length > 0) return String((v[0] as Record<string, unknown>)?.visitor_name || "N/A")
                  return "N/A"
                })(),
              }, ...prev].slice(0, 50))
            }
          } catch {
            showToast("Format QR code tidak valid", "error")
            try { await scanner.resume() } catch {}
          }
        },
        () => {} // Ignore errors during scanning
      )
      setScanning(true)
    } catch (err: any) {
      setCameraError(err?.message || "Gagal mengakses kamera")
      setScanning(false)
    }
  }, [])

  const stopScanner = React.useCallback(async () => {
    try {
      if (scannerRef.current) {
        await scannerRef.current.stop()
        scannerRef.current.clear()
        scannerRef.current = null
      }
    } catch {}
    setScanning(false)
  }, [])

  React.useEffect(() => {
    return () => {
      if (scannerRef.current) {
        try { scannerRef.current.stop() } catch {}
        try { scannerRef.current.clear() } catch {}
      }
    }
  }, [])

  const handleCheckIn = async () => {
    if (!scanResult?.record) return
    setProcessing(true)
    try {
      // Find the QR token from record data
      const qrToken = scanResult.record.data?.qr_token
      if (!qrToken || typeof qrToken !== "string") {
        showToast("QR token tidak ditemukan", "error")
        return
      }
      const res = await fetch("/api/visits/checkin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: qrToken }),
      })
      const data = await res.json()
      if (res.ok) {
        showToast("Check-in berhasil!", "success")
        setScanResult({
          valid: true,
          record: {
            ...scanResult.record,
            qrStatus: "checked_in",
            checkInTime: new Date(data.checkInTime),
          },
        })
        setScanHistory((prev) => [{
          token: qrToken,
          recordId: scanResult.record!.id,
          recordCode: scanResult.record!.code || scanResult.record!.id.slice(0, 8),
          action: "checkin",
          result: "Success",
          timestamp: new Date().toLocaleString("id-ID"),
          visitorName: extractVisitorName(scanResult.record!.data),
        }, ...prev].slice(0, 50))
      } else {
        showToast(data.error || "Check-in gagal", "error")
        setScanHistory((prev) => [{
          token: qrToken,
          recordId: scanResult.record!.id,
          recordCode: scanResult.record!.code || scanResult.record!.id.slice(0, 8),
          action: "checkin",
          result: `Failed: ${data.error}`,
          timestamp: new Date().toLocaleString("id-ID"),
          visitorName: extractVisitorName(scanResult.record!.data),
        }, ...prev].slice(0, 50))
      }
    } catch {
      showToast("Network error", "error")
    } finally {
      setProcessing(false)
      // Resume scanner
      try { scannerRef.current?.resume() } catch {}
    }
  }

  const handleCheckOut = async () => {
    if (!scanResult?.record) return
    setProcessing(true)
    try {
      const qrToken = scanResult.record.data?.qr_token
      if (!qrToken || typeof qrToken !== "string") {
        showToast("QR token tidak ditemukan", "error")
        return
      }
      const res = await fetch("/api/visits/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: qrToken }),
      })
      const data = await res.json()
      if (res.ok) {
        showToast("Check-out berhasil!", "success")
        setScanResult({
          valid: true,
          record: {
            ...scanResult.record,
            qrStatus: "checked_out",
            checkOutTime: new Date(data.checkOutTime),
          },
        })
        setScanHistory((prev) => [{
          token: qrToken,
          recordId: scanResult.record!.id,
          recordCode: scanResult.record!.code || scanResult.record!.id.slice(0, 8),
          action: "checkout",
          result: "Success",
          timestamp: new Date().toLocaleString("id-ID"),
          visitorName: extractVisitorName(scanResult.record!.data),
        }, ...prev].slice(0, 50))
      } else {
        showToast(data.error || "Check-out gagal", "error")
        setScanHistory((prev) => [{
          token: qrToken,
          recordId: scanResult.record!.id,
          recordCode: scanResult.record!.code || scanResult.record!.id.slice(0, 8),
          action: "checkout",
          result: `Failed: ${data.error}`,
          timestamp: new Date().toLocaleString("id-ID"),
          visitorName: extractVisitorName(scanResult.record!.data),
        }, ...prev].slice(0, 50))
      }
    } catch {
      showToast("Network error", "error")
    } finally {
      setProcessing(false)
      try { scannerRef.current?.resume() } catch {}
    }
  }

  const getVisitorInfo = (data: Record<string, unknown>) => {
    const visitors = Array.isArray(data["visitors"]) ? (data["visitors"] as Array<Record<string, unknown>>) : []
    const first = visitors[0] ?? {}
    return {
      name: String(first["visitor_name"] || "-"),
      nik: String(first["nik"] || "-"),
      phone: String(first["phone_number"] || "-"),
      email: String(first["email"] || "-"),
      ktpFile: String(first["ktp_file"] || ""),
      count: visitors.length,
    }
  }

  const rec = scanResult?.record
  const visitorInfo = rec ? getVisitorInfo(rec.data) : null

  return (
    <div className="space-y-6">
      {/* Toast */}
      {toast && (
        <div className="fixed top-4 right-4 z-50">
          <div className={`rounded-md shadow-lg px-4 py-3 text-sm text-white ${toast.type === "success" ? "bg-green-600" : "bg-red-600"}`}>
            {toast.message}
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/admin/visits">
            <Button variant="outline" size="icon">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold">QR Scanner</h1>
            <p className="text-sm text-muted-foreground">Scan visitor QR codes for check-in/check-out</p>
          </div>
        </div>
        <div className="flex gap-2">
          {!scanning ? (
            <Button onClick={startScanner}>
              <Camera className="w-4 h-4 mr-2" />
              Start Scanner
            </Button>
          ) : (
            <Button onClick={stopScanner} variant="destructive">
              <CameraOff className="w-4 h-4 mr-2" />
              Stop Scanner
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Scanner Area */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="relative bg-black aspect-square max-h-[500px] flex items-center justify-center">
                <div id="qr-reader" ref={containerRef} className="w-full h-full" />

                {scanning && (
                  <>
                    {/* Corner markers */}
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="absolute top-8 left-8 w-16 h-16 border-t-4 border-l-4 border-green-400 rounded-tl-lg" />
                      <div className="absolute top-8 right-8 w-16 h-16 border-t-4 border-r-4 border-green-400 rounded-tr-lg" />
                      <div className="absolute bottom-8 left-8 w-16 h-16 border-b-4 border-l-4 border-green-400 rounded-bl-lg" />
                      <div className="absolute bottom-8 right-8 w-16 h-16 border-b-4 border-r-4 border-green-400 rounded-br-lg" />
                    </div>

                    {/* Animated scanning line */}
                    <div className="absolute inset-x-8 top-8 bottom-8 pointer-events-none overflow-hidden">
                      <div className="w-full h-0.5 bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.6)] animate-[scan_2s_ease-in-out_infinite]" />
                    </div>
                  </>
                )}

                {!scanning && !cameraError && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white/60">
                    <QrCode className="w-16 h-16 mb-4" />
                    <p className="text-lg font-medium">Click &quot;Start Scanner&quot; to begin</p>
                  </div>
                )}

                {cameraError && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white/60">
                    <CameraOff className="w-16 h-16 mb-4" />
                    <p className="text-lg font-medium text-red-400">Camera Error</p>
                    <p className="text-sm mt-2 max-w-xs text-center">{cameraError}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Scan Result Panel */}
          {rec && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <QrCode className="w-5 h-5" />
                  Scan Result
                  {scanResult?.valid ? (
                    <Badge className="bg-green-100 text-green-800">Valid</Badge>
                  ) : (
                    <Badge variant="destructive">Invalid</Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {visitorInfo && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Visitor Name</p>
                      <p className="font-medium">{visitorInfo.name}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">NIK</p>
                      <p className="font-medium">{visitorInfo.nik}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Phone</p>
                      <p className="font-medium">{visitorInfo.phone}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Visit Date</p>
                      <p className="font-medium">{String(rec.data["visit_date"] || "-")}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Purpose</p>
                      <p className="font-medium">{String(rec.data["purpose"] || "-")}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">QR Status</p>
                      <p className="font-medium">
                        {rec.qrStatus === "checked_in" ? (
                          <Badge className="bg-green-100 text-green-800">Checked In</Badge>
                        ) : rec.qrStatus === "checked_out" ? (
                          <Badge className="bg-gray-100 text-gray-600">Checked Out</Badge>
                        ) : (
                          <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
                        )}
                      </p>
                    </div>
                    {rec.checkInTime && (
                      <div>
                        <p className="text-xs text-muted-foreground">Check-In Time</p>
                        <p className="font-medium">{new Date(rec.checkInTime).toLocaleString("id-ID")}</p>
                      </div>
                    )}
                    {rec.checkOutTime && (
                      <div>
                        <p className="text-xs text-muted-foreground">Check-Out Time</p>
                        <p className="font-medium">{new Date(rec.checkOutTime).toLocaleString("id-ID")}</p>
                      </div>
                    )}
                    {visitorInfo?.email && (
                      <div>
                        <p className="text-xs text-muted-foreground">Email</p>
                        <p className="font-medium">{visitorInfo.email}</p>
                      </div>
                    )}
                  </div>
                )}

                {/* KTP Preview */}
                {visitorInfo?.ktpFile && (
                  <div className="border rounded-lg p-3">
                    <p className="text-xs text-muted-foreground mb-2">KTP Upload</p>
                    <a
                      href={visitorInfo.ktpFile}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary underline"
                    >
                      View KTP File
                    </a>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3 pt-2">
                  {rec.qrStatus !== "checked_in" && rec.qrStatus !== "checked_out" && (
                    <Button onClick={handleCheckIn} disabled={processing} className="bg-green-600 hover:bg-green-700">
                      <LogIn className="w-4 h-4 mr-2" />
                      {processing ? "Processing..." : "Check In"}
                    </Button>
                  )}
                  {rec.qrStatus === "checked_in" && (
                    <Button onClick={handleCheckOut} disabled={processing} variant="outline">
                      <LogOut className="w-4 h-4 mr-2" />
                      {processing ? "Processing..." : "Check Out"}
                    </Button>
                  )}
                  {rec.qrStatus === "checked_out" && (
                    <Badge className="bg-gray-100 text-gray-600 text-sm px-3 py-1">
                      Visit Completed
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {scanResult && !scanResult.valid && (
            <Card className="border-red-200">
              <CardContent className="p-4">
                <p className="text-red-600 font-medium">{scanResult.error}</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* History Panel */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm">
                <History className="w-4 h-4" />
                Scan History (Today)
              </CardTitle>
            </CardHeader>
            <CardContent>
              {scanHistory.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">No scans yet today</p>
              ) : (
                <div className="space-y-3 max-h-[600px] overflow-y-auto">
                  {scanHistory.map((entry, i) => (
                    <div key={i} className="border rounded-lg p-3 text-sm space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs">{entry.recordCode}</span>
                        <Badge variant={entry.action === "checkin" ? "default" : entry.action === "checkout" ? "secondary" : "outline"} className="text-[10px]">
                          {entry.action}
                        </Badge>
                      </div>
                      <p className="text-xs">{entry.visitorName}</p>
                      <p className={`text-xs ${entry.result === "Success" || entry.result === "QR Valid" ? "text-green-600" : "text-red-600"}`}>
                        {entry.result}
                      </p>
                      <p className="text-[10px] text-muted-foreground">{entry.timestamp}</p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Custom animation keyframes */}
      <style jsx>{`
        @keyframes scan {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(calc(100% - 2px)); }
        }
      `}</style>
    </div>
  )
}
