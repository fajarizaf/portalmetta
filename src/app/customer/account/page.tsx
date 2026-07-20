import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import bcrypt from "bcryptjs"
import { CustomerSidebar } from "@/components/customer/customer-sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

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

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <CustomerSidebar roleId={me.roleId} />

      <div className="lg:col-span-9 space-y-6">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold">My Account</h1>
          <p className="text-sm text-muted-foreground">Kelola informasi akun dan keamanan.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-none shadow-sm">
            <CardHeader className="pb-2 border-b">
              <CardTitle className="text-base">Informasi Akun</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-3 text-sm">
              <div className="flex items-center justify-between gap-4">
                <span className="text-muted-foreground">Nama</span>
                <span className="font-medium">{me.name ?? "-"}</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-muted-foreground">Email</span>
                <span className="font-medium">{me.email}</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-muted-foreground">Role</span>
                <span className="font-medium">{me.role?.name ?? "-"}</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-muted-foreground">Company</span>
                <span className="font-medium">{me.company?.name ?? "-"}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm">
            <CardHeader className="pb-2 border-b">
              <CardTitle className="text-base">Ganti Password</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <form action={changePassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Password Saat Ini</Label>
                  <Input id="currentPassword" name="currentPassword" type="password" required minLength={1} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">Password Baru</Label>
                  <Input id="newPassword" name="newPassword" type="password" required minLength={8} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Konfirmasi Password Baru</Label>
                  <Input id="confirmPassword" name="confirmPassword" type="password" required minLength={8} />
                </div>
                <Button type="submit" className="w-full">Simpan Password</Button>
              </form>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm lg:col-span-2">
            <CardHeader className="pb-2 border-b">
              <CardTitle className="text-base">Pengaturan Penagihan</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <form action={updateBilling} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                <div className="space-y-2">
                  <Label htmlFor="billingContactName">Nama Kontak Penagihan</Label>
                  <Input id="billingContactName" name="billingContactName" defaultValue={me.billingContactName ?? ""} placeholder="Contoh: John Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="billingEmail">Email Penagihan</Label>
                  <Input id="billingEmail" name="billingEmail" type="email" defaultValue={me.billingEmail ?? ""} placeholder="Contoh: finance@company.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="billingPhoneNumber">Nomor Telepon Penagihan</Label>
                  <Input id="billingPhoneNumber" name="billingPhoneNumber" defaultValue={me.billingPhoneNumber ?? ""} placeholder="Contoh: 081234567890" />
                </div>
                <div className="md:col-span-3 flex justify-end">
                  <Button type="submit">Simpan Pengaturan</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
