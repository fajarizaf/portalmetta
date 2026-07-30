import Link from "next/link"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export default async function CustomerDocsHome() {
  const session = await getServerSession(authOptions)
  const email = session?.user?.email ?? ""
  const me = email ? await prisma.user.findUnique({ where: { email }, include: { role: { include: { permissions: { include: { permission: true } } } } } }) : null
  if (!me) {
    return (
      <div className="space-y-4">
        <h1 className="text-xl sm:text-2xl font-semibold">Dokumen</h1>
        <p className="text-xs sm:text-sm text-muted-foreground">Silakan login untuk melihat dokumen.</p>
      </div>
    )
  }

  const docTypes = await prisma.docType.findMany({ include: { permissions: true }, orderBy: { name: "asc" } })
  const accessible = docTypes.filter((dt) => {
    const isHidden = ["goods_in_item", "goods_out_item"].includes(dt.key)
    return !isHidden && dt.permissions.some((p) => p.roleId === me.roleId && p.canRead)
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-xl sm:text-2xl font-semibold">Dokumen</h1>
          <div className="text-xs text-muted-foreground">Pilih jenis dokumen untuk melihat daftar</div>
        </div>
      </div>
      {accessible.length === 0 ? (
        <div className="text-sm text-muted-foreground">Tidak ada DocType yang dapat diakses.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {accessible.map((dt) => (
            <Link key={dt.id} href={`/customer/docs/${dt.key}`} className="border rounded p-4 hover:bg-accent">
              <div className="text-base font-medium">{dt.name}</div>
              <div className="text-xs text-muted-foreground">{dt.key}</div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}