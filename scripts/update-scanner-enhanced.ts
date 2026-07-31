import * as fs from "fs";
import * as path from "path";

function updateScannerPage() {
  const filePath = path.join(process.cwd(), "src/app/admin/visits/scanner/page.tsx");
  let file = fs.readFileSync(filePath, "utf-8");

  // Add Upload and FileText icons if not present
  if (!file.includes("Upload,")) {
    file = file.replace(
      'import { Camera, CameraOff, LogIn, LogOut, QrCode, ArrowLeft, History, CheckCircle2, AlertCircle, XCircle } from "lucide-react"',
      'import { Camera, CameraOff, LogIn, LogOut, QrCode, ArrowLeft, History, CheckCircle2, AlertCircle, XCircle, Upload, Search, FileText } from "lucide-react"'
    );
  }

  // Refactor scanner logic with processDecodedText
  const scannerCallbackStart = file.indexOf("async (decodedText) => {");
  const scannerCallbackEnd = file.indexOf("() => {} // Ignore errors during scanning");

  if (scannerCallbackStart !== -1 && scannerCallbackEnd !== -1) {
    // Insert processDecodedText definition inside component
    const processFn = `
  const [manualToken, setManualToken] = React.useState("")

  const processDecodedText = async (rawText: string) => {
    try {
      const cleanText = rawText.trim()
      let token = ""
      
      try {
        const payload = JSON.parse(cleanText)
        token = payload.token || ""
      } catch {
        token = cleanText
      }

      if (!token) {
        showToast("Format QR code tidak valid / token kosong", "error")
        return
      }

      const validateRes = await fetch(\`/api/visits/qr/\${token}/validate\`)
      const validation = await validateRes.json()
      setScanResult(validation)

      if (validation.valid) {
        const rec = validation.record
        setScanHistory((prev) => [{
          token: token,
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
        showToast("QR Code Valid!", "success")
      } else {
        showToast(validation.error || "QR Code tidak valid", "error")
      }
    } catch (error: any) {
      console.error("Error processing QR:", error)
      showToast("Gagal memproses QR code", "error")
    }
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      const tempId = "qr-reader-file-temp"
      let tempDiv = document.getElementById(tempId)
      if (!tempDiv) {
        tempDiv = document.createElement("div")
        tempDiv.id = tempId
        tempDiv.style.display = "none"
        document.body.appendChild(tempDiv)
      }
      const html5QrCode = new Html5Qrcode(tempId)
      const decodedText = await html5QrCode.scanFile(file, true)
      await processDecodedText(decodedText)
    } catch {
      showToast("Gagal membaca QR Code dari file gambar", "error")
    } finally {
      e.target.value = ""
    }
  }

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!manualToken.trim()) return
    processDecodedText(manualToken)
  }
`;

    // Replace the inner callback of scanner.start
    file = file.replace(
      /async \(decodedText\) => \{[\s\S]*?\}\s*,\s*\(\) => \{\} \/\/ Ignore errors during scanning/,
      `async (decodedText) => {
          try { await scanner.pause(true) } catch {}
          await processDecodedText(decodedText)
        },
        () => {}`
    );

    // Insert processFn before startScanner
    file = file.replace(
      /const startScanner = React\.useCallback/,
      processFn + "\n  const startScanner = React.useCallback"
    );
  }

  // Add Upload and Manual Input UI near Header / Controls
  const buttonHeaderRegex = /<div className="flex gap-2">\n\s+\{!scanning \?/
  const newHeaderButtons = `<div className="flex flex-wrap items-center gap-2">
            <label className="inline-flex items-center gap-2 h-10 px-4 rounded-md bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-sm font-medium shadow-sm transition-all cursor-pointer">
              <Upload className="w-4 h-4 text-slate-500" />
              Upload Image
              <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
            </label>

            {!scanning ?`

  file = file.replace(buttonHeaderRegex, newHeaderButtons)

  // Add Manual Input Bar right above Scanner Window
  const scannerWindowRegex = /\{\/\* Scanner Window \*\/\}/
  const manualInputUI = `{/* Manual Code / Token Input */}
            <form onSubmit={handleManualSubmit} className="bg-white rounded-md p-3 border border-slate-200/80 shadow-sm flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Paste QR payload JSON atau Token disini..."
                  value={manualToken}
                  onChange={(e) => setManualToken(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-sm bg-slate-50 rounded-md border-0 ring-1 ring-inset ring-slate-200 focus:ring-2 focus:ring-slate-900 transition-all font-mono"
                />
              </div>
              <Button type="submit" className="h-9 px-4 rounded-md bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium shrink-0">
                Check Code
              </Button>
            </form>

            {/* Scanner Window */}`

  file = file.replace(scannerWindowRegex, manualInputUI)

  fs.writeFileSync(filePath, file)
}

updateScannerPage()
