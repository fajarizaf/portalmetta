"use server"

import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { revalidatePath } from "next/cache"

export async function updateRackAssignment(formData: FormData) {
  const session = await getServerSession(authOptions)
  if (!session) throw new Error("Unauthorized")

  const recordId = formData.get("recordId") as string
  const companyId = formData.get("companyId") as string // Can be empty string for deassign
  const status = formData.get("status") as string

  const record = await prisma.docRecord.findUnique({ where: { id: recordId } })
  if (!record) throw new Error("Record not found")

  const currentData = (record.data ?? {}) as Record<string, any>
  const nextData = {
    ...currentData,
    company_id: companyId || null,
    status: status
  }

  await prisma.docRecord.update({
    where: { id: recordId },
    data: {
      data: nextData,
      status: status // Sync status to the record status as well if needed
    }
  })

  revalidatePath("/admin/rack-mapping")
}

export async function deleteRack(formData: FormData) {
  const session = await getServerSession(authOptions)
  if (!session) throw new Error("Unauthorized")

  const recordId = formData.get("recordId") as string
  if (!recordId) throw new Error("Record ID is required")

  // Check permission
  const email = session.user?.email ?? ""
  const me = await prisma.user.findUnique({
    where: { email },
    include: { role: { include: { permissions: { include: { permission: true } } } } }
  })
  const perm = new Set((me?.role?.permissions ?? []).map((rp) => rp.permission.key))
  if (!perm.has("ADMIN_PANEL_ACCESS")) {
    throw new Error("Access Denied")
  }

  await prisma.docRecord.delete({ where: { id: recordId } })
  revalidatePath("/admin/rack-mapping")
}
