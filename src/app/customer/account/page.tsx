import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import bcrypt from "bcryptjs"
import QRCode from "qrcode"
import { CustomerSidebar } from "@/components/customer/customer-sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { QrCode, ShieldCheck, CheckCircle2, Building, User, CreditCard } from "lucide-react"

async function changePassword(formData: FormData) {
  "use server"
  const session = await getServerSession(authOptions)
  const email = session?.user?.email ?? ""
  if (!email) redirect("/login")

  const me = await prisma.user.findUnique({ where: { email }, include: { role: { include: { permissions: { include: { permission: true } } } }, company: true } })
  if (!me) redirect("/login")

  const perm = new Set((me.role?.permissions ?? []).map((rp) => rp.permission.key))
  if (perm.has("ADMIN_PANEL_ACCESS")) redirect("/admin")

  const currentPassword = String(formData.get("currentPassword") || "")
  const newPassword = String(formData.get("newPassword") || "")
  const confirmPassword = String(formData.get("confirmPassword") || "")

  if (!currentPassword || !newPassword || !confirmPassword) {
    redirect(`/customer/account?toast=${encodeURIComponent("Lengkapi semua field")}&toastType=error`)
  }
  if (newPassword.length < 8) {
    redirect(`/customer/account?toast=${encodeURIComponent("Password baru minimal 8 karakter")}&toastType=error`)
  }
  if (newPassword !== confirmPassword) {
    redirect(`/customer/account?toast=${encodeURIComponent("Konfirmasi password tidak sama")}&toastType=error`)
  }

  const ok = await bcrypt.compare(currentPassword, me.passwordHash)
  if (!ok) {
    redirect(`/customer/account?toast=${encodeURIComponent("Password saat ini salah")}&toastType=error`)
  }

  const hash = await bcrypt.hash(newPassword, 10)
  await prisma.user.update({ where: { id: me.id }, data: { passwordHash: hash } })

  redirect(`/customer/account?toast=${encodeURIComponent("Password berhasil diperbarui")}&toastType=success`)
}

async function updateBilling(formData: FormData) {
  "use server"
  const session = await getServerSession(authOptions)
  const email = session?.user?.email ?? ""
  if (!email) redirect("/login")

  const me = await prisma.user.findUnique({ where: { email } })
  if (!me) redirect("/login")

  const billingEmail = String(formData.get("billingEmail") || "").trim()
  const billingContactName = String(formData.get("billingContactName") || "").trim()
  const billingPhoneNumber = String(formData.get("billingPhoneNumber") || "").trim()

  await prisma.user.update({
    where: { id: me.id },
    data: {
      billingEmail: billingEmail || null,
      billingContactName: billingContactName || null,
      billingPhoneNumber: billingPhoneNumber || null,
    }
  })

  redirect(`/customer/account?toast=${encodeURIComponent("Pengaturan penagihan berhasil diperbarui")}&toastType=success`)
}

export const metadata = {
  title: "My Account | Customer Portal",
}

export default async function CustomerAccountPage() {
  const session = await getServerSession(authOptions)
  const email = session?.user?.email ?? ""
  if (!email) redirect("/login")

  const me = await prisma.user.findUnique({ where: { email }, include: { role: { include: { permissions: { include: { permission: true } } } }, company: true } })
  if (!me) redirect("/login")

  const perm = new Set((me.role?.permissions ?? []).map((rp) => rp.permission.key))
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
        color: { dark: "#0f172a", light: "#ffffff" },
      })
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <CustomerSidebar roleId={me.roleId} />

      <div className="lg:col-span-9 space-y-6">
        <div className="space-y-1">
          <h1 className="text-xl sm:text-2xl font-semibold text-slate-900 tracking-tight">My Account</h1>
          <p className="text-xs sm:text-sm text-slate-500">Kelola informasi profil, kartu akses digital, dan keamanan akun Anda.</p>
        </div>

        {/* Clean Minimalist Digital Access Card */}
        <Card className="border border-slate-200/80 bg-white shadow-xs rounded-xl overflow-hidden">
          <CardHeader className="px-6 py-4 border-b border-slate-100 flex flex-row items-center justify-between bg-slate-50/50">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-white border border-slate-200/80 flex items-center justify-center shadow-2xs">
                <QrCode className="w-4 h-4 text-slate-700" />
              </div>
              <div>
                <CardTitle className="text-sm font-semibold text-slate-900">Visit Access Card</CardTitle>
                <p className="text-xs text-slate-500 mt-0.5">Digital pass untuk akses kunjungan lokasi.</p>
              </div>
            </div>
            {accessCardRecord?.status === "active" ? (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Active Pass
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-500 border border-slate-200/60">
                Not Active
              </span>
            )}
          </CardHeader>
          <CardContent className="p-6">
            {accessCardRecord?.status === "active" && qrDataUrl ? (
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                <div className="p-2.5 bg-white border border-slate-200/80 rounded-xl shadow-2xs shrink-0 flex items-center justify-center">
                  <img src={qrDataUrl} alt="Access Pass QR Code" className="w-40 h-40" />
                </div>
                <div className="flex-1 space-y-4 text-center sm:text-left min-w-0">
                  <div className="space-y-1">
                    <div className="flex items-center justify-center sm:justify-start gap-2">
                      <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Pass Holder</span>
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-slate-100 text-slate-600 border border-slate-200/60">
                        {accessCardRecord.code || accessCardRecord.id.slice(0, 8)}
                      </span>
                    </div>
                    <h3 className="text-base font-semibold text-slate-900 truncate">{me.name || me.email}</h3>
                    {me.company && (
                      <p className="text-xs text-slate-500 flex items-center justify-center sm:justify-start gap-1.5 mt-0.5">
                        <Building className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{me.company.name}</span>
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-slate-100 text-xs">
                    <div className="flex items-center gap-2 text-slate-600 bg-slate-50 px-3 py-2 rounded-lg border border-slate-100">
                      <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                      <div>
                        <p className="text-[10px] font-medium text-slate-400 uppercase">Access Type</p>
                        <p className="font-medium text-slate-800">Permanent / Reusable</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600 bg-slate-50 px-3 py-2 rounded-lg border border-slate-100">
                      <CreditCard className="w-4 h-4 text-blue-600 shrink-0" />
                      <div>
                        <p className="text-[10px] font-medium text-slate-400 uppercase">Validity</p>
                        <p className="font-medium text-slate-800">Unlimited (Active)</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-6 text-center space-y-2">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                  <QrCode className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-medium text-slate-800">Access Card Belum Aktif</h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">Silakan hubungi Administrator jika Anda membutuhkan kartu akses kunjungan digital.</p>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border border-slate-200/80 bg-white shadow-xs rounded-xl">
            <CardHeader className="px-6 py-4 border-b border-slate-100">
              <CardTitle className="text-sm font-semibold text-slate-900">Informasi Akun</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-3 text-xs sm:text-sm">
              <div className="flex items-center justify-between gap-4 py-1 border-b border-slate-50">
                <span className="text-slate-500">Nama</span>
                <span className="font-medium text-slate-900">{me.name ?? "-"}</span>
              </div>
              <div className="flex items-center justify-between gap-4 py-1 border-b border-slate-50">
                <span className="text-slate-500">Email</span>
                <span className="font-medium text-slate-900 font-mono">{me.email}</span>
              </div>
              <div className="flex items-center justify-between gap-4 py-1 border-b border-slate-50">
                <span className="text-slate-500">Role</span>
                <span className="font-medium text-slate-900">{me.role?.name ?? "-"}</span>
              </div>
              <div className="flex items-center justify-between gap-4 py-1">
                <span className="text-slate-500">Company</span>
                <span className="font-medium text-slate-900">{me.company?.name ?? "-"}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-slate-200/80 bg-white shadow-xs rounded-xl">
            <CardHeader className="px-6 py-4 border-b border-slate-100">
              <CardTitle className="text-sm font-semibold text-slate-900">Ganti Password</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <form action={changePassword} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="currentPassword" className="text-xs font-medium text-slate-700">Password Saat Ini</Label>
                  <Input id="currentPassword" name="currentPassword" type="password" required minLength={1} className="h-9 text-xs border-slate-200" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="newPassword" className="text-xs font-medium text-slate-700">Password Baru</Label>
                  <Input id="newPassword" name="newPassword" type="password" required minLength={8} className="h-9 text-xs border-slate-200" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="confirmPassword" className="text-xs font-medium text-slate-700">Konfirmasi Password Baru</Label>
                  <Input id="confirmPassword" name="confirmPassword" type="password" required minLength={8} className="h-9 text-xs border-slate-200" />
                </div>
                <Button type="submit" className="w-full h-9 bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium">Simpan Password</Button>
              </form>
            </CardContent>
          </Card>

          <Card className="border border-slate-200/80 bg-white shadow-xs rounded-xl lg:col-span-2">
            <CardHeader className="px-6 py-4 border-b border-slate-100">
              <CardTitle className="text-sm font-semibold text-slate-900">Pengaturan Penagihan</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <form action={updateBilling} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                <div className="space-y-1.5">
                  <Label htmlFor="billingContactName" className="text-xs font-medium text-slate-700">Nama Kontak Penagihan</Label>
                  <Input id="billingContactName" name="billingContactName" defaultValue={me.billingContactName ?? ""} placeholder="Contoh: John Doe" className="h-9 text-xs border-slate-200" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="billingEmail" className="text-xs font-medium text-slate-700">Email Penagihan</Label>
                  <Input id="billingEmail" name="billingEmail" type="email" defaultValue={me.billingEmail ?? ""} placeholder="Contoh: finance@company.com" className="h-9 text-xs border-slate-200" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="billingPhoneNumber" className="text-xs font-medium text-slate-700">Nomor Telepon Penagihan</Label>
                  <Input id="billingPhoneNumber" name="billingPhoneNumber" defaultValue={me.billingPhoneNumber ?? ""} placeholder="Contoh: 081234567890" className="h-9 text-xs border-slate-200" />
                </div>
                <div className="md:col-span-3 flex justify-end pt-2">
                  <Button type="submit" className="h-9 bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium">Simpan Pengaturan</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
