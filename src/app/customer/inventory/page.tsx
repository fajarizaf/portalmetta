import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import { InventoryClient } from "./client"

export const metadata = {
  title: "Inventory | Customer Portal",
}

export default async function InventoryPage() {
  const session = await getServerSession(authOptions)
  
  if (!session?.user?.email) {
    redirect("/auth/signin")
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  })

  if (!user) {
    redirect("/auth/signin")
  }

  // Fetch DocTypes to get IDs
  const goodsInItemType = await prisma.docType.findUnique({
    where: { key: "goods_in_item" },
  })
  
  const goodsOutItemType = await prisma.docType.findUnique({
    where: { key: "goods_out_item" },
  })

  // Fetch items
  let goodsInItems: any[] = []
  if (goodsInItemType) {
    goodsInItems = await prisma.docRow.findMany({
      where: {
        childDocTypeId: goodsInItemType.id,
        record: {
          createdById: user.id,
          OR: [
            { status: { equals: "Completed" } },
            { status: { contains: "Complete" } },
            { status: { contains: "COMPLETED" } },
          ],
        },
      },
      include: {
        record: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    })
  }

  let goodsOutItems: any[] = []
  if (goodsOutItemType) {
    goodsOutItems = await prisma.docRow.findMany({
      where: {
        childDocTypeId: goodsOutItemType.id,
        record: {
          createdById: user.id,
          OR: [
            { status: { equals: "Completed" } },
            { status: { contains: "Complete" } },
            { status: { contains: "COMPLETED" } },
          ],
        },
      },
      include: {
        record: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    })
  }

  return <InventoryClient inItems={goodsInItems} outItems={goodsOutItems} />
}
