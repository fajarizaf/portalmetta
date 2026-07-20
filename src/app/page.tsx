import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import CustomerLoginForm from "@/components/customer-login-form"

export default async function Home() {
  const session = await getServerSession(authOptions)
  const email = session?.user?.email ?? ""
  if (email) {
    const me = await prisma.user.findUnique({ 
      where: { email }, 
      include: { role: { include: { permissions: { include: { permission: true } } } } } 
    })
    
    if (me) {
       const perm = new Set((me.role?.permissions ?? []).map((rp) => rp.permission?.key).filter(Boolean) as string[])
       if (perm.has("ADMIN_PANEL_ACCESS")) {
        redirect("/admin")
      } else {
        redirect("/customer")
      }
    }
  }
  return (
    <CustomerLoginForm />
  )
}
