"use client"
import * as React from "react"
import QRCodeLib from "qrcode"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Download, RefreshCw, QrCode } from "lucide-react"

interface VisitorQRCardProps {
  recordId: string
  companyId: string
  qrToken: string | null
  qrStatus: string | null
  checkInTime: string | null
  checkOutTime: string | null
  visitDate: string | null
}

export function VisitorQRCard({
  recordId,
  companyId,
  qrToken,
  qrStatus,
  checkInTime,
  checkOutTime,
  visitDate,
}: VisitorQRCardProps) {
  const [qrDataUrl, setQrDataUrl] = React.useState<string | null>(null)
  const [generating, setGenerating] = React.useState(false)
  const [downloading, setDownloading] = React.useState(false)
  const canvasRef = React.useRef<HTMLCanvasElement>(null)

  React.useEffect(() => {
    if (!qrToken) return
    const payload = JSON.stringify({
      docType: "visitor_request",
      id: recordId,
      token: qrToken,
      customerId: companyId,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    })
    QRCodeLib.toDataURL(payload, {
      width: 300,
      margin: 2,
      color: { dark: "#000000", light: "#ffffff" },
    }).then(setQrDataUrl)
  }, [qrToken, recordId, companyId])

  const handleRefresh = async () => {
    setGenerating(true)
    try {
      const res = await fetch("/api/visits/generate-qr", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recordId }),
      })
      if (res.ok) {
        window.location.reload()
      }
    } finally {
      setGenerating(false)
    }
  }

  const handleDownload = async () => {
    if (!qrDataUrl) return
    setDownloading(true)
    try {
      const link = document.createElement("a")
      link.download = `visitor-qr-${recordId.slice(0, 8)}.png`
      link.href = qrDataUrl
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } finally {
      setDownloading(false)
    }
  }

  const statusLabel = !qrStatus || qrStatus === "pending"
    ? "Belum di-check-in"
    : qrStatus === "checked_in"
    ? `Sudah di-check-in${checkInTime ? ` (${new Date(checkInTime).toLocaleDateString("id-ID")})` : ""}`
    : "Sudah check-out"

  const statusVariant: "default" | "secondary" | "destructive" | "outline" =
    !qrStatus || qrStatus === "pending"
      ? "outline"
      : qrStatus === "checked_in"
      ? "default"
      : "secondary"

  const statusColor =
    !qrStatus || qrStatus === "pending"
      ? "bg-yellow-100 text-yellow-800 border-yellow-300"
      : qrStatus === "checked_in"
      ? "bg-green-100 text-green-800 border-green-300"
      : "bg-gray-100 text-gray-600 border-gray-300"

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6 flex flex-col items-center gap-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
          <QrCode className="w-4 h-4" />
          QR Visitor Pass
        </div>

        {qrDataUrl ? (
          <div className="relative p-4 bg-white rounded-xl shadow-lg border-2 border-dashed border-slate-200">
            <img
              src={qrDataUrl}
              alt="QR Code Visitor Pass"
              width={220}
              height={220}
              className="block"
            />
          </div>
        ) : (
          <div className="w-[220px] h-[220px] flex items-center justify-center bg-muted rounded-xl border-2 border-dashed">
            <span className="text-sm text-muted-foreground">No QR Code</span>
          </div>
        )}

        <Badge variant={statusVariant} className={`text-xs px-3 py-1 ${statusColor}`}>
          {statusLabel}
        </Badge>

        {checkInTime && (
          <div className="text-xs text-muted-foreground text-center">
            Check-in: {new Date(checkInTime).toLocaleString("id-ID")}
          </div>
        )}
        {checkOutTime && (
          <div className="text-xs text-muted-foreground text-center">
            Check-out: {new Date(checkOutTime).toLocaleString("id-ID")}
          </div>
        )}

        <div className="flex gap-2 w-full">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={handleDownload}
            disabled={!qrDataUrl || downloading}
          >
            <Download className="w-4 h-4 mr-1" />
            {downloading ? "Downloading..." : "Download QR"}
          </Button>
          {(!qrStatus || qrStatus === "pending") && (
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={handleRefresh}
              disabled={generating}
            >
              <RefreshCw className={`w-4 h-4 mr-1 ${generating ? "animate-spin" : ""}`} />
              {generating ? "Generating..." : "Refresh QR"}
            </Button>
          )}
        </div>

        <canvas ref={canvasRef} className="hidden" />
      </CardContent>
    </Card>
  )
}
