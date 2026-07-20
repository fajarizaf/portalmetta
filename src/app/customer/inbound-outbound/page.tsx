import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { CustomerSidebar } from "@/components/customer/customer-sidebar"
import { InboundOutboundClient } from "./client"
import type { FieldType } from "@/generated/prisma/enums"
import type { Prisma } from "@/generated/prisma/client"

async function getDocs(key: string, me: any, scopeCompanyId: string | null, userCompanyId: string | null) {
  const docType = await prisma.docType.findUnique({ 
    where: { key }, 
    include: { fields: true, permissions: true } 
  })
  
  if (!docType) return { type: null, docs: [] }

  const permission = docType.permissions.find((pr) => pr.roleId === me.roleId)
  if (!permission?.canRead) return { type: null, docs: [] }

  // Ownership Logic
  const companyLinkFields = docType.fields
    .filter((f) => f.type === ("LINK" as FieldType) && (f.config as any)?.ref === "Company")
    .map((f) => f.key)
  
  const userLinkFields = docType.fields
    .filter((f) => f.type === ("LINK" as FieldType) && (f.config as any)?.ref === "User")
    .map((f) => f.key)

  const ownershipConditions: Prisma.DocRecordWhereInput[] = []
  
  // 1. Created by Me
  ownershipConditions.push({ createdById: me.id })
  
  // 2. Created by My Team
  if (scopeCompanyId) {
    ownershipConditions.push({ createdBy: { companyId: scopeCompanyId } })
  }
  
  // 3. Assigned to Me
  ownershipConditions.push({ assignedToId: me.id })
  
  // 4. Linked to My Company
  if (userCompanyId) {
    for (const k of companyLinkFields) {
        ownershipConditions.push({ data: { path: `$.${k}`, equals: userCompanyId } as unknown as Prisma.JsonFilter })
    }
  }

  // 5. Linked to Me
  for (const k of userLinkFields) {
      ownershipConditions.push({ data: { path: `$.${k}`, equals: me.id } as unknown as Prisma.JsonFilter })
  }

  const docs = await prisma.docRecord.findMany({
    where: {
        docTypeId: docType.id,
        OR: ownershipConditions
    },
    orderBy: { updatedAt: "desc" },
    take: 20
  })

  // Serialize dates
  const docsSerialized = docs.map((d) => ({
    ...d,
    createdAt: d.createdAt.toISOString(),
    updatedAt: d.updatedAt.toISOString(),
  }))

  return { type: docType, docs: docsSerialized }
}

export default async function InboundOutboundPage() {
  const session = await getServerSession(authOptions)
  const email = session?.user?.email ?? ""
  const me = email ? await prisma.user.findUnique({ where: { email }, include: { role: { include: { permissions: { include: { permission: true } } } } } }) : null
  
  if (!me) redirect("/customer")

  const userCompanyId = email ? (await prisma.user.findUnique({ where: { email }, select: { companyId: true } }))?.companyId ?? null : null
  const parentCompanyId = userCompanyId ? (await prisma.company.findUnique({ where: { id: userCompanyId }, select: { parentId: true } }))?.parentId ?? null : null
  const scopeCompanyId = parentCompanyId ?? userCompanyId

  const goodsIn = await getDocs("goods_in_request", me, scopeCompanyId, userCompanyId)
  const goodsOut = await getDocs("goods_out_request", me, scopeCompanyId, userCompanyId)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <CustomerSidebar roleId={me.roleId} />
      <div className="lg:col-span-9">
         <InboundOutboundClient 
            goodsInType={goodsIn.type} 
            goodsInDocs={goodsIn.docs} 
            goodsOutType={goodsOut.type} 
            goodsOutDocs={goodsOut.docs} 
         />
      </div>
    </div>
  )
}
