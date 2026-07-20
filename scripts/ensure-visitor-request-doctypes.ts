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

async function upsertDocType(args: {
  key: string
  name: string
  icon?: string | null
  branchId?: string | null
  config?: Record<string, unknown>
  fields: FieldSeed[]
}) {
  const docType = await prisma.docType.upsert({
    where: { key: args.key },
    create: {
      key: args.key,
      name: args.name,
      icon: args.icon ?? null,
      branchId: args.branchId ?? null,
      config: (args.config ?? {}) as any,
    },
    update: {
      name: args.name,
      icon: args.icon ?? null,
      branchId: args.branchId ?? null,
      config: (args.config ?? {}) as any,
    },
  })

  for (const f of args.fields) {
    await prisma.docField.upsert({
      where: { docTypeId_key: { docTypeId: docType.id, key: f.key } },
      create: {
        docTypeId: docType.id,
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

  return docType
}

async function upsertPermissions(docTypeId: string, rules: Array<{ roleName: string; canRead: boolean; canCreate: boolean; canWrite: boolean; canAssign?: boolean; canDelete?: boolean }>) {
  const allRoles = await prisma.role.findMany({ select: { id: true, name: true } })
  for (const r of rules) {
    const matched = allRoles.filter((role) => role.name.toLowerCase() === r.roleName.toLowerCase())
    for (const role of matched) {
      await prisma.docPermission.upsert({
        where: { docTypeId_roleId: { docTypeId, roleId: role.id } },
        create: {
          docTypeId,
          roleId: role.id,
          canRead: r.canRead,
          canCreate: r.canCreate,
          canWrite: r.canWrite,
          canAssign: Boolean(r.canAssign),
          canDelete: Boolean(r.canDelete),
        },
        update: {
          canRead: r.canRead,
          canCreate: r.canCreate,
          canWrite: r.canWrite,
          canAssign: Boolean(r.canAssign),
          canDelete: Boolean(r.canDelete),
        },
      })
    }
  }
}

async function main() {
  const visitorChild = await upsertDocType({
    key: "visitor_request_item",
    name: "Visitor",
    icon: null,
    branchId: null,
    config: {
      listFields: ["visitor_name", "nik", "ktp_file"],
      filterFields: [],
    },
    fields: [
      { key: "visitor_name", label: "Nama Visitor", type: "TEXT", required: true, order: 10 },
      { key: "nik", label: "NIK", type: "TEXT", required: true, order: 20 },
      { key: "phone_number", label: "No. HP", type: "TEXT", required: false, order: 30 },
      { key: "email", label: "Email", type: "TEXT", required: false, order: 40 },
      { key: "ktp_file", label: "Upload KTP", type: "ATTACHMENT", required: true, order: 50 },
      { key: "notes", label: "Catatan", type: "TEXTAREA", required: false, order: 60 },
    ],
  })

  const visitorRequest = await upsertDocType({
    key: "visitor_request",
    name: "Visitor Request",
    icon: "Users",
    branchId: null,
    config: {
      listFields: ["visit_date", "purpose"],
      filterFields: ["visit_date"],
      childDocTypeKey: "visitor_request_item",
      naming: {
        mode: "series",
        field: "naming_series",
        defaultPattern: "VR-####",
      },
    },
    fields: [
      { key: "visit_date", label: "Tanggal Kunjungan", type: "DATE", required: true, order: 10 },
      { key: "purpose", label: "Keperluan", type: "TEXTAREA", required: true, order: 20 },
      { key: "naming_series", label: "Series", type: "TEXT", required: false, order: 30, config: { defaultValue: "VR-####" } },
      { key: "visitors", label: "Daftar Visitor", type: "TABLE", required: false, order: 100, config: { childDocTypeKey: "visitor_request_item" } },
    ],
  })

  await upsertPermissions(visitorRequest.id, [
    { roleName: "Customer", canRead: true, canCreate: true, canWrite: true, canAssign: false, canDelete: false },
    { roleName: "ADMIN", canRead: true, canCreate: true, canWrite: true, canAssign: true, canDelete: true },
    { roleName: "Admin", canRead: true, canCreate: true, canWrite: true, canAssign: true, canDelete: true },
    { roleName: "Operational Manager", canRead: true, canCreate: true, canWrite: true, canAssign: true, canDelete: false },
    { roleName: "Security", canRead: true, canCreate: false, canWrite: false, canAssign: false, canDelete: false },
  ])

  await upsertPermissions(visitorChild.id, [
    { roleName: "Customer", canRead: true, canCreate: true, canWrite: true, canAssign: false, canDelete: false },
    { roleName: "ADMIN", canRead: true, canCreate: true, canWrite: true, canAssign: true, canDelete: true },
    { roleName: "Admin", canRead: true, canCreate: true, canWrite: true, canAssign: true, canDelete: true },
    { roleName: "Operational Manager", canRead: true, canCreate: true, canWrite: true, canAssign: true, canDelete: false },
    { roleName: "Security", canRead: true, canCreate: false, canWrite: false, canAssign: false, canDelete: false },
  ])

  console.log("Done:", { visitorRequest: visitorRequest.key, visitorChild: visitorChild.key })
}

main()
  .catch((e) => {
    console.error(e)
    process.exitCode = 1
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
