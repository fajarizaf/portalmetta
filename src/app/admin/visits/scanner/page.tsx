"use client"
import * as React from "react"
import { Html5Qrcode } from "html5-qrcode"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Camera, CameraOff, LogIn, LogOut, QrCode, ArrowLeft, History, CheckCircle2, AlertCircle } from "lucide-react"
import Link from "next/link"

interface ScanResult {
  valid: boolean
  error?: string
  record?: {
    id: string
    code: string | null
    status: string | null
    data: Record<string, unknown>
    visitors?: Array<{
      visitor_name: string
      nik: string
      phone_number?: string
      email?: string
      ktp_file?: string
      notes?: string
    }>
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

    // Check if browser supports getUserMedia (required for camera access)
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      const isHttps = window.location.protocol === "https:"
      const isLocalhost = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
      if (!isHttps && !isLocalhost) {
        setCameraError("Kamera memerlukan koneksi HTTPS. Silakan akses melalui HTTPS atau localhost.")
      } else {
        setCameraError("Browser tidak mendukung akses kamera. Gunakan Chrome/Firefox/Safari versi terbaru.")
      }
      setScanning(false)
      return
    }

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
      // Provide more specific error messages based on error type
      const errorName = err?.name || ""
      const errorMessage = err?.message || ""
      let friendlyMessage = "Gagal mengakses kamera"

      if (errorName === "NotAllowedError" || errorMessage.includes("Permission denied") || errorMessage.includes("denied")) {
        friendlyMessage = "Akses kamera ditolak. Silakan berikan izin kamera di pengaturan browser, lalu coba lagi."
      } else if (errorName === "NotFoundError" || errorMessage.includes("not found") || errorMessage.includes("No camera")) {
        friendlyMessage = "Kamera tidak ditemukan di perangkat ini."
      } else if (errorName === "NotReadableError" || errorMessage.includes("in use") || errorMessage.includes("busy")) {
        friendlyMessage = "Kamera sedang digunakan oleh aplikasi lain. Tutup aplikasi lain lalu coba lagi."
      } else if (errorName === "OverconstrainedError") {
        friendlyMessage = "Kamera tidak mendukung konfigurasi yang diminta. Coba perangkat lain."
      } else if (errorName === "NotSupportedError" || errorName === "SecurityError" || errorMessage.includes("HTTPS") || errorMessage.includes("secure")) {
        const isHttps = typeof window !== "undefined" && window.location.protocol === "https:"
        const isLocalhost = typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")
        if (!isHttps && !isLocalhost) {
          friendlyMessage = "Kamera memerlukan HTTPS. Akses melalui https:// atau localhost."
        } else {
          friendlyMessage = "Browser tidak mendukung akses kamera. Gunakan Chrome/Firefox/Safari versi terbaru."
        }
      } else if (errorMessage) {
        friendlyMessage = `Gagal mengakses kamera: ${errorMessage}`
      }

      setCameraError(friendlyMessage)
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
  // Prefer top-level visitors field, fallback to data.visitors
  const visitorsList = rec?.visitors ?? (rec ? (rec.data["visitors"] as Array<Record<string, unknown>> | undefined) : null) ?? []
  const visitorInfo = rec ? getVisitorInfo({ ...rec.data, visitors: visitorsList }) : null

  return (
    <div className="min-h-screen bg-[#F8FAFC] -m-4 sm:-m-6 p-4 sm:p-6 font-sans selection:bg-emerald-100 selection:text-emerald-900">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Toast */}
        {toast && (
          <div className="fixed top-6 right-6 z-50 animate-in fade-in slide-in-from-top-4 duration-300">
            <div className={`rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.12)] px-5 py-3 text-sm font-medium text-white flex items-center gap-2 backdrop-blur-md ${toast.type === "success" ? "bg-emerald-600/90" : "bg-red-600/90"}`}>
              {toast.type === "success" ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
              {toast.message}
            </div>
          </div>
        )}

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-slate-200/60">
          <div className="space-y-1">
            <Link href="/admin/visits" className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-900 transition-colors mb-2 bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded-md w-fit">
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Visits
            </Link>
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900">QR Scanner</h1>
            <p className="text-sm text-slate-500">Scan digital passes for instant check-in and authentication.</p>
          </div>
          <div className="flex gap-2">
            {!scanning ? (
              <Button onClick={startScanner} className="h-10 px-5 rounded-md bg-slate-900 hover:bg-slate-800 text-white text-sm shadow-md shadow-slate-900/10 transition-all">
                <Camera className="w-4 h-4 mr-2" />
                Start Scanner
              </Button>
            ) : (
              <Button onClick={stopScanner} variant="destructive" className="h-10 px-5 rounded-md text-sm shadow-md shadow-red-900/10 transition-all">
                <CameraOff className="w-4 h-4 mr-2" />
                Stop Scanner
              </Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Scanner & Result Area (Left Col) */}
          <div className="lg:col-span-8 space-y-5">
            
            {/* Scanner Window */}
            <div className="relative overflow-hidden rounded-md bg-slate-900 shadow-xl shadow-slate-900/10 ring-1 ring-white/10 aspect-[4/3] sm:aspect-[16/9] flex items-center justify-center">
              <div id="qr-reader" ref={containerRef} className="w-full h-full [&>video]:object-cover" />

              {scanning && (
                <>
                  <div className="absolute inset-0 pointer-events-none border-[8px] border-black/40 mix-blend-overlay" />
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 sm:w-72 sm:h-72">
                      <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-emerald-400 rounded-tl-lg" />
                      <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-emerald-400 rounded-tr-lg" />
                      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-emerald-400 rounded-bl-lg" />
                      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-emerald-400 rounded-br-lg" />
                      
                      <div className="absolute inset-x-2 top-2 bottom-2 overflow-hidden pointer-events-none">
                        <div className="w-full h-0.5 bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)] animate-[scan_2.5s_ease-in-out_infinite]" />
                      </div>
                    </div>
                  </div>
                </>
              )}

              {!scanning && !cameraError && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900 text-slate-400">
                  <div className="w-16 h-16 rounded-md bg-white/5 flex items-center justify-center mb-4">
                    <QrCode className="w-7 h-7 text-white/40" />
                  </div>
                  <p className="text-base font-medium text-white/80 tracking-wide">Ready to Scan</p>
                  <p className="text-xs mt-1 text-white/40">Activate the camera to begin reading passes</p>
                </div>
              )}

              {cameraError && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900 text-red-400/80 p-5 text-center">
                  <div className="w-16 h-16 rounded-lg bg-red-500/10 flex items-center justify-center mb-4">
                    <CameraOff className="w-7 h-7 text-red-400" />
                  </div>
                  <p className="text-base font-medium text-red-300">Camera Unavailable</p>
                  <p className="text-xs mt-1 max-w-sm text-red-400/60 leading-relaxed">{cameraError}</p>
                </div>
              )}
            </div>

            {/* Scan Result Card */}
            {rec && (
              <div className="animate-in slide-in-from-bottom-8 fade-in duration-500">
                <div className="bg-white rounded-md p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-100">
                  <div className="flex items-start justify-between mb-6 pb-4 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-md flex items-center justify-center ${scanResult?.valid ? "bg-emerald-50" : "bg-red-50"}`}>
                        <QrCode className={`w-6 h-6 ${scanResult?.valid ? "text-emerald-600" : "text-red-600"}`} />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold tracking-tight text-slate-900">Scan Result</h2>
                        <p className="text-xs font-medium text-slate-500 mt-0.5 uppercase tracking-wider">{rec.code || rec.id.slice(0,8)}</p>
                      </div>
                    </div>
                    {scanResult?.valid ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-50 text-emerald-700 text-xs font-medium ring-1 ring-inset ring-emerald-600/20">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Valid
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-red-50 text-red-700 text-xs font-medium ring-1 ring-inset ring-red-600/20">
                        <AlertCircle className="w-3.5 h-3.5" /> Invalid
                      </span>
                    )}
                  </div>

                  {visitorInfo && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-5">
                      <div className="space-y-1">
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Primary Visitor</p>
                        <p className="text-sm font-semibold text-slate-900">{visitorInfo.name}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">NIK / ID Number</p>
                        <p className="text-sm font-medium text-slate-700 font-mono">{visitorInfo.nik}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Phone</p>
                        <p className="text-sm font-medium text-slate-700">{visitorInfo.phone}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Scheduled Date</p>
                        <p className="text-sm font-medium text-slate-700">{String(rec.data["visit_date"] || "-")}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Purpose</p>
                        <p className="text-sm font-medium text-slate-700 line-clamp-2">{String(rec.data["purpose"] || "-")}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Status</p>
                        <div>
                          {rec.qrStatus === "checked_in" ? (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-emerald-50 text-emerald-700 text-xs font-semibold ring-1 ring-inset ring-emerald-600/20">
                              Checked In
                            </span>
                          ) : rec.qrStatus === "checked_out" ? (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-slate-100 text-slate-600 text-xs font-semibold ring-1 ring-inset ring-slate-400/20">
                              Checked Out
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-amber-50 text-amber-700 text-xs font-semibold ring-1 ring-inset ring-amber-600/20">
                              Awaiting Check-in
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap gap-3">
                    {rec.qrStatus !== "checked_in" && rec.qrStatus !== "checked_out" && (
                      <Button onClick={handleCheckIn} disabled={processing} className="h-10 px-6 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm shadow-md shadow-emerald-600/20 transition-all w-full sm:w-auto">
                        <LogIn className="w-4 h-4 mr-2" />
                        {processing ? "Processing..." : "Confirm Check In"}
                      </Button>
                    )}
                    {rec.qrStatus === "checked_in" && (
                      <Button onClick={handleCheckOut} disabled={processing} className="h-10 px-6 rounded-md bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm shadow-md shadow-slate-900/20 transition-all w-full sm:w-auto">
                        <LogOut className="w-4 h-4 mr-2" />
                        {processing ? "Processing..." : "Complete Check Out"}
                      </Button>
                    )}
                    {rec.qrStatus === "checked_out" && (
                      <div className="flex items-center justify-center h-10 px-6 rounded-md bg-slate-50 text-slate-500 font-medium text-sm border border-slate-200 w-full sm:w-auto">
                        Visit Completed
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
            
            {scanResult && !scanResult.valid && (
              <div className="bg-red-50 rounded-md p-6 border border-red-100 flex items-center gap-4 animate-in slide-in-from-bottom-4">
                <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center shrink-0">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h3 className="text-red-900 font-semibold text-base">Scan Failed</h3>
                  <p className="text-red-700 text-sm mt-0.5">{scanResult.error}</p>
                </div>
              </div>
            )}
          </div>

          {/* History Panel (Right Col) */}
          <div className="lg:col-span-4 space-y-5">
            <div className="bg-white rounded-lg p-5 sm:p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-100 sticky top-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-md bg-slate-50 flex items-center justify-center border border-slate-100">
                  <History className="w-4 h-4 text-slate-500" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Scan Activity</h3>
                  <p className="text-[10px] text-slate-400 font-medium tracking-wider">TODAY'S LOG</p>
                </div>
              </div>

              {scanHistory.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <div className="w-12 h-12 rounded-md bg-slate-50 flex items-center justify-center mb-3">
                    <History className="w-5 h-5 text-slate-300" />
                  </div>
                  <p className="text-slate-500 text-sm font-medium">No activity yet</p>
                  <p className="text-xs text-slate-400 mt-1">Recent scans will appear here</p>
                </div>
              ) : (
                <div className="space-y-5 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                  {scanHistory.map((entry, i) => (
                    <div key={i} className="flex gap-3 relative group">
                      {/* Timeline line */}
                      {i !== scanHistory.length - 1 && (
                        <div className="absolute left-[9px] top-6 bottom-[-20px] w-px bg-slate-100 group-hover:bg-slate-200 transition-colors" />
                      )}
                      
                      {/* Status Dot */}
                      <div className="relative mt-0.5">
                        <div className={`w-[18px] h-[18px] rounded-full border-4 border-white flex items-center justify-center ${entry.action === "checkin" ? "bg-emerald-500" : entry.action === "checkout" ? "bg-slate-800" : "bg-red-400"} shadow-sm z-10`}>
                          <div className="w-1 h-1 rounded-full bg-white" />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 pb-1">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-[11px] font-semibold text-slate-900">{entry.action.toUpperCase()}</p>
                          <span className="text-[9px] font-medium text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded-full">{entry.timestamp.split(" ")[1]}</span>
                        </div>
                        <p className="text-xs font-medium text-slate-700">{entry.visitorName}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[9px] font-mono font-medium text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded-md">{entry.recordCode}</span>
                          <span className={`text-[10px] font-medium ${entry.result === "Success" || entry.result === "QR Valid" ? "text-emerald-600" : "text-red-600"}`}>
                            {entry.result}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes scan {
            0% { transform: translateY(-50%); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateY(150%); opacity: 0; }
          }
          .custom-scrollbar::-webkit-scrollbar {
            width: 4px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #e2e8f0;
            border-radius: 10px;
          }
        `}</style>
      </div>
    </div>
  )
}
