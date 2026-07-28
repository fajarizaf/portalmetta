import "dotenv/config"
import { prisma } from "../src/lib/prisma"

type FieldSeed = {
  key: string
  label: string
  type: any
  required?: boolean
  order?: number
  config?: Record<string, unknown>
  readOnly?: boolean
}

async function upsertField(docTypeId: string, f: FieldSeed) {
  await prisma.docField.upsert({
    where: { docTypeId_key: { docTypeId, key: f.key } },
    create: {
      docTypeId,
      key: f.key,
      label: f.label,
      type: f.type,
      required: Boolean(f.required),
      order: typeof f.order === "number" ? f.order : 0,
      config: (f.config ?? null) as any,
      readOnly: Boolean(f.readOnly),
    },
    update: {
      label: f.label,
      type: f.type,
      required: Boolean(f.required),
      order: typeof f.order === "number" ? f.order : 0,
      config: (f.config ?? null) as any,
      readOnly: Boolean(f.readOnly),
    },
  })
}

async function main() {
  // Add VISITING_MANAGEMENT permission
  await prisma.permission.upsert({
    where: { key: "VISITING_MANAGEMENT" },
    update: { description: "Manage visitor passes, QR codes, and scan operations" },
    create: { key: "VISITING_MANAGEMENT", description: "Manage visitor passes, QR codes, and scan operations" },
  })

  // Add QR fields to visitor_request
  const visitorRequest = await prisma.docType.findUnique({ where: { key: "visitor_request" } })
  if (!visitorRequest) {
    console.error("visitor_request DocType not found. Run ensure-visitor-request-doctypes.ts first.")
    return
  }

  const qrFields: FieldSeed[] = [
    { key: "qr_token", label: "QR Token", type: "TEXT", required: false, order: 35, readOnly: true },
    { key: "qr_status", label: "QR Status", type: "DROPDOWN", required: false, order: 36, readOnly: true, config: { options: [
      { label: "Pending", value: "pending" },
      { label: "Checked In", value: "checked_in" },
      { label: "Checked Out", value: "checked_out" },
    ], defaultValue: "pending" } },
    { key: "check_in_time", label: "Waktu Check-In", type: "TEXT", required: false, order: 37, readOnly: true },
    { key: "check_out_time", label: "Waktu Check-Out", type: "TEXT", required: false, order: 38, readOnly: true },
  ]

  for (const f of qrFields) {
    await upsertField(visitorRequest.id, f)
    console.log(`  Upserted field: ${f.key}`)
  }

  // Update config to include qr_status in listFields
  const current = await prisma.docType.findUnique({ where: { id: visitorRequest.id } })
  const cfg = ((current?.config ?? {}) as unknown as Record<string, unknown>)
  const listFields = (cfg["listFields"] ?? []) as string[]
  if (!listFields.includes("qr_status")) {
    listFields.push("qr_status")
    cfg["listFields"] = listFields
    await prisma.docType.update({
      where: { id: visitorRequest.id },
      data: { config: cfg as any },
    })
    console.log("  Updated config: added qr_status to listFields")
  }

  // Update Security role permissions for visitor_request to allow write
  const securityRoles = await prisma.role.findMany({
    where: { name: { in: ["Security", "ADMIN"] } },
  })
  for (const role of securityRoles) {
    await prisma.docPermission.upsert({
      where: { docTypeId_roleId: { docTypeId: visitorRequest.id, roleId: role.id } },
      update: { canWrite: true },
      create: {
        docTypeId: visitorRequest.id,
        roleId: role.id,
        canRead: true,
        canCreate: false,
        canWrite: true,
        canAssign: false,
        canDelete: false,
      },
    })
    console.log(`  Updated permissions for role: ${role.name}`)
  }

  // Assign VISITING_MANAGEMENT to Admin and Security roles
  const visitingPerm = await prisma.permission.findUnique({ where: { key: "VISITING_MANAGEMENT" } })
  if (visitingPerm) {
    const adminRoles = await prisma.role.findMany({
      where: { name: { in: ["ADMIN", "Admin", "Security"] } },
    })
    for (const role of adminRoles) {
      await prisma.rolePermission.upsert({
        where: { roleId_permissionId: { roleId: role.id, permissionId: visitingPerm.id } },
        update: {},
        create: { roleId: role.id, permissionId: visitingPerm.id },
      })
      console.log(`  Assigned VISITING_MANAGEMENT to role: ${role.name}`)
    }
  }

  console.log("Migration complete!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exitCode = 1
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
