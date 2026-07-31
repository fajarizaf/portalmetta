import * as fs from "fs";
import * as path from "path";

function updateCustomerAccountPage() {
  const filePath = path.join(process.cwd(), "src/app/customer/account/page.tsx");
  let file = fs.readFileSync(filePath, "utf-8");

  // 1. Add imports
  if (!file.includes('import QRCode from "qrcode"')) {
    file = file.replace(
      'import bcrypt from "bcryptjs"',
      'import bcrypt from "bcryptjs"\nimport QRCode from "qrcode"\nimport { Badge } from "@/components/ui/badge"\nimport { QrCode, ShieldCheck, CheckCircle2 } from "lucide-react"'
    );
  }

  // 2. Fetch access card record inside CustomerAccountPage
  const fetchInjectBefore = `const perm = new Set((me.role?.permissions ?? []).map((rp) => rp.permission.key))
  if (perm.has("ADMIN_PANEL_ACCESS")) redirect("/admin")`;

  const fetchInjectCode = `const perm = new Set((me.role?.permissions ?? []).map((rp) => rp.permission.key))
  if (perm.has("ADMIN_PANEL_ACCESS")) redirect("/admin")

  const accessCardDt = await prisma.docType.findUnique({ where: { key: "access_card" } })
  const allAccessCards = accessCardDt ? await prisma.docRecord.findMany({
    where: { docTypeId: accessCardDt.id }
  }) : []
  const accessCardRecord = allAccessCards.find((r) => {
    const d = (r.data ?? {}) as Record<string, any>
    return d.user_id === me.id
  }) || null

  let qrDataUrl: string | null = null
  if (accessCardRecord && accessCardRecord.status === "active") {
    const data = (accessCardRecord.data ?? {}) as Record<string, any>
    const token = data.qr_token
    if (token) {
      const payload = {
        docType: "access_card",
        token: token,
        customerId: data.customer_id || me.companyId || "",
        userId: me.id,
      }
      qrDataUrl = await QRCode.toDataURL(JSON.stringify(payload), {
        width: 300,
        margin: 2,
        color: { dark: "#000000", light: "#ffffff" },
      })
    }
  }`;

  file = file.replace(fetchInjectBefore, fetchInjectCode);

  // 3. Add Access Card UI Section inside the page layout
  const oldGridHeader = `<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">`;

  const newGridHeader = `{/* Access Card Banner / Card */}
        <Card className="border-none shadow-sm bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden relative">
          <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <CardHeader className="pb-3 border-b border-white/10 flex flex-row items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center">
                <QrCode className="w-4 h-4 text-emerald-400" />
              </div>
              <div>
                <CardTitle className="text-base font-semibold text-white">Digital Access Pass</CardTitle>
                <p className="text-xs text-slate-400 mt-0.5">Gunakan QR code ini untuk akses kunjungan & check-in di lokasi.</p>
              </div>
            </div>
            <Badge variant="outline" className={accessCardRecord?.status === "active" ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" : "bg-white/10 text-slate-400 border-white/20"}>
              {accessCardRecord?.status === "active" ? "Active Pass" : "Not Active"}
            </Badge>
          </CardHeader>
          <CardContent className="pt-6 pb-8">
            {accessCardRecord?.status === "active" && qrDataUrl ? (
              <div className="flex flex-col sm:flex-row items-center gap-8">
                <div className="bg-white p-3 rounded-2xl shadow-xl border border-white/20 shrink-0">
                  <img src={qrDataUrl} alt="Access Pass QR Code" className="w-44 h-44 sm:w-48 sm:h-48" />
                </div>
                <div className="space-y-3 text-center sm:text-left flex-1 min-w-0">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-emerald-400 font-semibold">Official Access Pass</span>
                    <h3 className="text-lg font-bold text-white mt-0.5 truncate">{me.name || me.email}</h3>
                    <p className="text-xs text-slate-400">{me.company?.name || "Independent Account"}</p>
                  </div>
                  <div className="pt-2 border-t border-white/10 space-y-1.5 text-xs text-slate-300">
                    <div className="flex items-center justify-center sm:justify-start gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Permanent Visit Card (Unlimited Access)</span>
                    </div>
                    <div className="flex items-center justify-center sm:justify-start gap-2 text-slate-400 font-mono">
                      <span>Pass ID: {accessCardRecord.code || accessCardRecord.id.slice(0, 8)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mx-auto text-slate-400">
                  <QrCode className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-white">Access Card Belum Aktif</h4>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1">Silakan hubungi Administrator untuk membuat atau mengaktifkan kartu akses kunjungan Anda.</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">`;

  file = file.replace(oldGridHeader, newGridHeader);
  fs.writeFileSync(filePath, file);
}

updateCustomerAccountPage();
