import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import "dotenv/config";

const adapter = new PrismaMariaDb({
  host: process.env.DATABASE_HOST || "127.0.0.1",
  user: process.env.DATABASE_USER || "root",
  password: process.env.DATABASE_PASSWORD || "mysql",
  database: process.env.DATABASE_NAME || "mettadc",
  port: parseInt(process.env.DATABASE_PORT || "3306"),
  connectionLimit: 5,
});

const prisma = new PrismaClient({ log: ["error"], adapter });

async function main() {
  console.log("Creating Support Ticket DocTypes...")

  const roles = await prisma.role.findMany()
  const adminRole = roles.find(r => r.name === "Admin")
  const customerRole = roles.find(r => r.name === "Customer")

  if (!adminRole || !customerRole) {
    console.error("Required roles (Admin/Customer) not found.")
    return
  }

  // 1. Support Ticket (Parent)
  const ticketDt = await prisma.docType.upsert({
    where: { key: "support_ticket" },
    update: {
      name: "Support Ticket",
      icon: "LifeBuoy",
      config: {
        listFields: ["subject", "status", "priority", "category"],
        filterFields: ["status", "priority", "category"],
        naming: { mode: "series", pattern: "TCK-.YYYY.-.####." },
        childDocTypeKey: "ticket_message",
      }
    },
    create: {
      key: "support_ticket",
      name: "Support Ticket",
      icon: "LifeBuoy",
      config: {
        listFields: ["subject", "status", "priority", "category"],
        filterFields: ["status", "priority", "category"],
        naming: { mode: "series", pattern: "TCK-.YYYY.-.####." },
        childDocTypeKey: "ticket_message",
      }
    }
  })

  const ticketFields = [
    { key: "subject", label: "Subjek", type: "TEXT", required: true, order: 10 },
    { key: "category", label: "Kategori", type: "DROPDOWN", required: true, order: 20, config: { options: [{label: "Teknis", value: "Technical"}, {label: "Billing", value: "Billing"}, {label: "Umum", value: "General"}] } },
    { key: "priority", label: "Prioritas", type: "DROPDOWN", required: true, order: 30, config: { options: [{label: "Rendah", value: "Low"}, {label: "Normal", value: "Medium"}, {label: "Tinggi", value: "High"}] } },
    { key: "description", label: "Deskripsi Lengkap", type: "TEXTAREA", required: true, order: 40 },
    { key: "attachment", label: "Lampiran", type: "ATTACHMENT", required: false, order: 45 },
    { key: "messages", label: "Percakapan Tiket", type: "TABLE", required: false, order: 50 },
  ]

  for (const f of ticketFields) {
    await prisma.docField.upsert({
      where: { docTypeId_key: { docTypeId: ticketDt.id, key: f.key } },
      update: { label: f.label, type: f.type as any, required: f.required, order: f.order, config: f.config as any },
      create: { docTypeId: ticketDt.id, key: f.key, label: f.label, type: f.type as any, required: f.required, order: f.order, config: f.config as any }
    })
  }

  // 2. Ticket Message (Child)
  const messageDt = await prisma.docType.upsert({
    where: { key: "ticket_message" },
    update: {
      name: "Ticket Message",
      config: {
        listFields: ["message", "sender_name", "createdAt"],
      }
    },
    create: {
      key: "ticket_message",
      name: "Ticket Message",
      config: {
        listFields: ["message", "sender_name", "createdAt"],
      }
    }
  })

  const messageFields = [
    { key: "message", label: "Pesan", type: "TEXTAREA", required: true, order: 10 },
    { key: "sender_name", label: "Pengirim", type: "TEXT", readOnly: true, order: 20 },
    { key: "attachment", label: "Lampiran", type: "ATTACHMENT", order: 30 },
  ]

  for (const f of messageFields) {
    await prisma.docField.upsert({
      where: { docTypeId_key: { docTypeId: messageDt.id, key: f.key } },
      update: { label: f.label, type: f.type as any, required: f.required, order: f.order },
      create: { docTypeId: messageDt.id, key: f.key, label: f.label, type: f.type as any, required: f.required, order: f.order }
    })
  }

  // 3. Permissions
  const permissions = [
    { roleId: adminRole.id, canRead: true, canCreate: true, canWrite: true, canDelete: true, canAssign: true },
    { roleId: customerRole.id, canRead: true, canCreate: true, canWrite: true, canDelete: false, canAssign: false },
  ]

  for (const p of permissions) {
    await prisma.docPermission.upsert({
      where: { docTypeId_roleId: { docTypeId: ticketDt.id, roleId: p.roleId } },
      update: p,
      create: { docTypeId: ticketDt.id, ...p }
    })
    await prisma.docPermission.upsert({
      where: { docTypeId_roleId: { docTypeId: messageDt.id, roleId: p.roleId } },
      update: p,
      create: { docTypeId: messageDt.id, ...p }
    })
  }

  // 4. Workflow
  const wfConfig = {
    states: [
      { name: "Open", docStatus: 0 },
      { name: "In Progress", docStatus: 0 },
      { name: "Customer Reply", docStatus: 0 },
      { name: "Admin Reply", docStatus: 0 },
      { name: "Resolved", docStatus: 1 },
      { name: "Closed", docStatus: 1 },
    ],
    transitions: [
      { from: "Open", to: "In Progress", roles: ["Admin"] },
      { from: "Open", to: "Admin Reply", roles: ["Admin"] },
      { from: "In Progress", to: "Admin Reply", roles: ["Admin"] },
      { from: "Admin Reply", to: "Customer Reply", roles: ["Customer"] },
      { from: "Customer Reply", to: "Admin Reply", roles: ["Admin"] },
      { from: "Admin Reply", to: "Resolved", roles: ["Admin"] },
      { from: "Customer Reply", to: "Resolved", roles: ["Admin"] },
      { from: "In Progress", to: "Resolved", roles: ["Admin"] },
      { from: "Resolved", to: "Closed", roles: ["Admin", "Customer"] },
      { from: "Open", to: "Closed", roles: ["Customer"] },
    ]
  }

  const existingWf = await prisma.docWorkflow.findFirst({
    where: { docTypeId: ticketDt.id, branchId: null }
  })

  if (existingWf) {
    await prisma.docWorkflow.update({
      where: { id: existingWf.id },
      data: {
        name: "Support Ticket Workflow",
        isActive: true,
        config: wfConfig as any
      }
    })
  } else {
    await prisma.docWorkflow.create({
      data: {
        docTypeId: ticketDt.id,
        branchId: null,
        name: "Support Ticket Workflow",
        isActive: true,
        config: wfConfig as any
      }
    })
  }

  console.log("Ticketing DocTypes created successfully.")
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
