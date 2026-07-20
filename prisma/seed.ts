import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import type { Prisma } from "../src/generated/prisma/client";
import type { FieldType } from "../src/generated/prisma/enums";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import bcrypt from "bcryptjs";

const adapter = new PrismaMariaDb({
  host: process.env.DATABASE_HOST || "localhost",
  user: process.env.DATABASE_USER || "root",
  password: process.env.DATABASE_PASSWORD || "",
  database: process.env.DATABASE_NAME || "mettadc",
  connectionLimit: 5,
});
const prisma = new PrismaClient({ adapter, log: [] });

async function run() {
  const permissions = [
    { key: "ADMIN_PANEL_ACCESS", description: "" },
    { key: "BRANCH_MANAGEMENT", description: "" },
    { key: "BUILDING_MANAGEMENT", description: "" },
    { key: "FLOOR_MANAGEMENT", description: "" },
    { key: "ROOM_MANAGEMENT", description: "" },
    { key: "ROLE_MANAGEMENT", description: "" },
    { key: "ROLE_ACCESS_MANAGEMENT", description: "" },
    { key: "COMPANY_MANAGEMENT", description: "" },
    { key: "CUSTOMER_MANAGEMENT", description: "" },
    { key: "DC_COMPANY_MANAGEMENT", description: "" },
    { key: "DOCTYPE_MANAGEMENT", description: "" },
    { key: "DOCUMENTS_MANAGEMENT", description: "" },
  ];

  for (const p of permissions) {
    await prisma.permission.upsert({
      where: { key: p.key },
      update: {},
      create: { key: p.key, description: p.description },
    });
  }

  const allPerms = await prisma.permission.findMany();

  const company = await prisma.company.upsert({
    where: { name: "Default Company" },
    update: {},
    create: { name: "Default Company" },
  });

  const branch = await prisma.branch.upsert({
    where: { code: "HQ" },
    update: {},
    create: { name: "Headquarters", code: "HQ", companyId: company.id },
  });

  const adminRole = await prisma.role.upsert({
    where: { branchId_name: { branchId: branch.id, name: "ADMIN" } },
    update: {},
    create: { name: "ADMIN", branchId: branch.id },
  });
  const customerRole = await prisma.role.upsert({
    where: { branchId_name: { branchId: branch.id, name: "CUSTOMER" } },
    update: {},
    create: { name: "CUSTOMER", branchId: branch.id },
  });
  for (const perm of allPerms) {
    await prisma.rolePermission.upsert({
      where: { roleId_permissionId: { roleId: adminRole.id, permissionId: perm.id } },
      update: {},
      create: { roleId: adminRole.id, permissionId: perm.id },
    });
  }

  const adminPassword = await bcrypt.hash("admin123", 10);
  const admin = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      email: "admin@example.com",
      name: "Admin",
      passwordHash: adminPassword,
      roleId: adminRole.id,
      companyId: company.id,
    },
  });

  await prisma.userBranchAssignment.upsert({
    where: { userId_branchId: { userId: admin.id, branchId: branch.id } },
    update: {},
    create: { userId: admin.id, branchId: branch.id },
  });

  const superPassword = await bcrypt.hash("superadmin123", 10);
  const superadmin = await prisma.user.upsert({
    where: { email: "superadmin@example.com" },
    update: {},
    create: {
      email: "superadmin@example.com",
      name: "Super Admin",
      passwordHash: superPassword,
      roleId: adminRole.id,
      companyId: company.id,
    },
  });

  await prisma.userBranchAssignment.upsert({
    where: { userId_branchId: { userId: superadmin.id, branchId: branch.id } },
    update: {},
    create: { userId: superadmin.id, branchId: branch.id },
  });

  const customerPassword = await bcrypt.hash("customer123", 10);
  await prisma.user.upsert({
    where: { email: "customer@example.com" },
    update: {},
    create: {
      email: "customer@example.com",
      name: "Customer",
      passwordHash: customerPassword,
      roleId: customerRole.id,
      companyId: company.id,
    },
  });

  // DocType: Quotation (header)
  const quotation = await prisma.docType.upsert({
    where: { key: "quotation" },
    update: {},
    create: { key: "quotation", name: "Quotation", description: "Dokumen penawaran", branchId: branch.id },
  })

  // Fields for Quotation
  const qFields: Array<{ key: string; label: string; type: FieldType; required?: boolean; order: number; config?: Record<string, unknown> }> = [
    { key: "quote_no", label: "Nomor Penawaran", type: "TEXT", required: true, order: 1 },
    { key: "quote_date", label: "Tanggal", type: "DATE", required: true, order: 2 },
    { key: "customer_id", label: "Customer", type: "DROPDOWN", required: true, order: 3, config: { source: { table: "Company", labelField: "name", valueField: "id" } } },
    { key: "currency", label: "Mata Uang", type: "DROPDOWN", required: true, order: 4, config: { options: [ { label: "IDR", value: "IDR" }, { label: "USD", value: "USD" } ] } },
    { key: "valid_until", label: "Berlaku Sampai", type: "DATE", required: true, order: 5 },
    { 
      key: "term_of_payment", 
      label: "Term Of Payment", 
      type: "DROPDOWN", 
      required: true, 
      order: 6, 
      config: { 
        options: [
          { label: "One Time", value: "One Time" },
          { label: "Monthly", value: "Monthly" },
          { label: "Quarterly", value: "Quarterly" },
          { label: "Annually", value: "Annually" }
        ] 
      } 
    },
    { key: "notes", label: "Catatan", type: "TEXTAREA", required: false, order: 70 },
    { key: "subtotal_nrc", label: "Subtotal NRC", type: "PRICE", required: false, order: 71 },
    { key: "subtotal_mrc", label: "Subtotal MRC", type: "PRICE", required: false, order: 72 },
    { key: "total_contract", label: "Total Contract", type: "PRICE", required: false, order: 75 },
    { key: "items", label: "Items", type: "TABLE", required: false, order: 80 },
  ]
  for (const f of qFields) {
    const configValue: Prisma.InputJsonValue | undefined = f.config ? (f.config as unknown as Prisma.InputJsonValue) : undefined
    const isReadOnly = f.key === "total_contract" || f.key === "subtotal_nrc" || f.key === "subtotal_mrc"
    await prisma.docField.upsert({
      where: { docTypeId_key: { docTypeId: quotation.id, key: f.key } },
      update: { label: f.label, type: f.type, order: f.order, readOnly: isReadOnly, config: configValue },
      create: { docTypeId: quotation.id, key: f.key, label: f.label, type: f.type, required: !!f.required, order: f.order, config: configValue, readOnly: isReadOnly },
    })
  }

  // DocType: Quotation Item (child rows)
  const quotationItem = await prisma.docType.upsert({
    where: { key: "quotation_item" },
    update: {},
    create: { key: "quotation_item", name: "Quotation Item", description: "Item penawaran", branchId: branch.id },
  })

  const qiFields: Array<{ key: string; label: string; type: FieldType; required?: boolean; order: number; config?: Record<string, unknown> }> = [
    { key: "product_id", label: "Produk", type: "DROPDOWN", required: true, order: 1, config: { source: { table: "Product", labelField: "name", valueField: "id" } } },
    { key: "service_name", label: "Nama Layanan", type: "TEXT", required: false, order: 1.5 },
    { key: "qty", label: "Jumlah", type: "NUMBER", required: true, order: 2, config: { default: 1 } },
    { key: "nrc", label: "NRC (Setup Fee)", type: "NUMBER", required: false, order: 2.1 },
    { key: "mrc", label: "MRC (Monthly Fee)", type: "NUMBER", required: false, order: 2.2 },
    { key: "price", label: "Total Harga", type: "NUMBER", required: true, order: 3 },
    { key: "discount_percent", label: "Diskon (%)", type: "NUMBER", required: false, order: 4 },
    { key: "description", label: "Deskripsi", type: "TEXTAREA", required: false, order: 5 },
  ]
  for (const f of qiFields) {
    const configValue: Prisma.InputJsonValue | undefined = f.config ? (f.config as unknown as Prisma.InputJsonValue) : undefined
    await prisma.docField.upsert({
      where: { docTypeId_key: { docTypeId: quotationItem.id, key: f.key } },
      update: { label: f.label, type: f.type, order: f.order, config: configValue },
      create: { docTypeId: quotationItem.id, key: f.key, label: f.label, type: f.type, required: !!f.required, order: f.order, config: configValue },
    })
  }

  // Link child item DocType in quotation config (for future UI rows)
  {
    const current = await prisma.docType.findUnique({ where: { id: quotation.id } })
    const cfg = ((current?.config ?? {}) as unknown as Record<string, unknown>)
    let changed = false
    if (!cfg["childDocTypeKey"]) {
      cfg["childDocTypeKey"] = "quotation_item"
      changed = true
    }
    const computeVal = {
      totalFromRows: [
        {
          targetField: "subtotal_nrc",
          childDocTypeKey: "quotation_item",
          formula: "qty * nrc"
        },
        {
          targetField: "subtotal_mrc",
          childDocTypeKey: "quotation_item",
          formula: "qty * mrc"
        },
        {
          targetField: "total_contract",
          childDocTypeKey: "quotation_item",
          qtyKey: "qty",
          nrcKey: "nrc",
          mrcKey: "mrc"
        }
      ]
    }
    if (JSON.stringify(cfg["compute"]) !== JSON.stringify(computeVal)) {
      cfg["compute"] = computeVal
      changed = true
    }
    if (changed) {
      await prisma.docType.update({ where: { id: quotation.id }, data: { config: cfg as unknown as Prisma.InputJsonValue } })
    }
  }

  {
    const current = await prisma.docType.findUnique({ where: { id: quotation.id } })
    const cfg = ((current?.config ?? {}) as unknown as Record<string, unknown>)
    const map = ((cfg["childDocTypes"] ?? {}) as Record<string, string>)
    let changed = false
    if (!map["items"]) { map["items"] = "quotation_item"; cfg["childDocTypes"] = map; changed = true }
    if (!cfg["previewTemplate"]) {
      cfg["previewTemplate"] = (
        `<!DOCTYPE html><div><div>{{docTypeName}}</div><div>Kode: {{code}}</div><div>Status: {{status}}</div><div>Mata Uang: {{currency}}</div><div>Total: {{total_contract_currency}}</div><table><thead><tr><th>Produk</th><th>Qty</th><th>NRC</th><th>MRC</th><th>Total</th></tr></thead><tbody>{{#rows}}<tr><td>{{row.product_id_label}}</td><td>{{row.qty}}</td><td>{{row.nrc_currency}}</td><td>{{row.mrc_currency}}</td><td>{{row.price_currency}}</td></tr>{{/rows}}</tbody></table></div>`
      )
      changed = true
    }
    if (changed) {
      await prisma.docType.update({ where: { id: quotation.id }, data: { config: cfg as unknown as Prisma.InputJsonValue } })
    }
  }

  // Permissions
  await prisma.docPermission.upsert({
    where: { docTypeId_roleId: { docTypeId: quotation.id, roleId: adminRole.id } },
    update: {},
    create: { docTypeId: quotation.id, roleId: adminRole.id, canCreate: true, canRead: true, canWrite: true, canDelete: true },
  })
  await prisma.docPermission.upsert({
    where: { docTypeId_roleId: { docTypeId: quotation.id, roleId: customerRole.id } },
    update: {},
    create: { docTypeId: quotation.id, roleId: customerRole.id, canCreate: true, canRead: true, canWrite: false, canDelete: false },
  })

  // DocType: Sales Order (header)
  const salesOrder = await prisma.docType.upsert({
    where: { key: "sales_order" },
    update: {},
    create: { key: "sales_order", name: "Sales Order", description: "Dokumen pesanan penjualan", branchId: branch.id },
  })

  // Fields for Sales Order (mirip Quotation)
  const soFields: Array<{ key: string; label: string; type: FieldType; required?: boolean; order: number; config?: Record<string, unknown> }> = [
    { key: "order_no", label: "Nomor Order", type: "TEXT", required: true, order: 1 },
    { key: "order_date", label: "Tanggal", type: "DATE", required: true, order: 2 },
    { key: "customer_id", label: "Customer", type: "DROPDOWN", required: true, order: 3, config: { source: { table: "Company", labelField: "name", valueField: "id" } } },
    { key: "currency", label: "Mata Uang", type: "DROPDOWN", required: true, order: 4, config: { options: [ { label: "IDR", value: "IDR" }, { label: "USD", value: "USD" } ] } },
    { 
      key: "term_of_payment", 
      label: "Term Of Payment", 
      type: "DROPDOWN", 
      required: true, 
      order: 4.5, 
      config: { 
        options: [
          { label: "One Time", value: "One Time" },
          { label: "Monthly", value: "Monthly" },
          { label: "Quarterly", value: "Quarterly" },
          { label: "Annually", value: "Annually" }
        ] 
      } 
    },
    { key: "notes", label: "Catatan", type: "TEXTAREA", required: false, order: 50 },
    { key: "subtotal_nrc", label: "Subtotal NRC", type: "PRICE", required: false, order: 51 },
    { key: "subtotal_mrc", label: "Subtotal MRC", type: "PRICE", required: false, order: 52 },
    { key: "total_contract", label: "Total Contract", type: "PRICE", required: false, order: 55 },
    { key: "items", label: "Items", type: "TABLE", required: false, order: 60 },
  ]
  for (const f of soFields) {
    const configValue: Prisma.InputJsonValue | undefined = f.config ? (f.config as unknown as Prisma.InputJsonValue) : undefined
    const isReadOnly = f.key === "total_contract" || f.key === "subtotal_nrc" || f.key === "subtotal_mrc"
    await prisma.docField.upsert({
      where: { docTypeId_key: { docTypeId: salesOrder.id, key: f.key } },
      update: { label: f.label, type: f.type, order: f.order, readOnly: isReadOnly, config: configValue },
      create: { docTypeId: salesOrder.id, key: f.key, label: f.label, type: f.type, required: !!f.required, order: f.order, config: configValue, readOnly: isReadOnly },
    })
  }

  // DocType: Sales Order Item (child rows)
  const salesOrderItem = await prisma.docType.upsert({
    where: { key: "sales_order_item" },
    update: {},
    create: { key: "sales_order_item", name: "Sales Order Item", description: "Item pesanan penjualan", branchId: branch.id },
  })

  const soiFields: Array<{ key: string; label: string; type: FieldType; required?: boolean; order: number; config?: Record<string, unknown> }> = [
    { key: "product_id", label: "Produk", type: "DROPDOWN", required: true, order: 1, config: { source: { table: "Product", labelField: "name", valueField: "id" } } },
    { key: "service_name", label: "Nama Layanan", type: "TEXT", required: false, order: 1.5 },
    { key: "qty", label: "Jumlah", type: "NUMBER", required: true, order: 2, config: { default: 1 } },
    { key: "nrc", label: "NRC (Setup Fee)", type: "NUMBER", required: false, order: 2.1 },
    { key: "mrc", label: "MRC (Monthly Fee)", type: "NUMBER", required: false, order: 2.2 },
    { key: "price", label: "Total Harga", type: "NUMBER", required: true, order: 3 },
    { key: "discount_percent", label: "Diskon (%)", type: "NUMBER", required: false, order: 4 },
    { key: "description", label: "Deskripsi", type: "TEXTAREA", required: false, order: 5 },
  ]
  for (const f of soiFields) {
    const configValue: Prisma.InputJsonValue | undefined = f.config ? (f.config as unknown as Prisma.InputJsonValue) : undefined
    await prisma.docField.upsert({
      where: { docTypeId_key: { docTypeId: salesOrderItem.id, key: f.key } },
      update: { label: f.label, type: f.type, order: f.order, config: configValue },
      create: { docTypeId: salesOrderItem.id, key: f.key, label: f.label, type: f.type, required: !!f.required, order: f.order, config: configValue },
    })
  }

  // Link child item DocType in sales_order config
  {
    const current = await prisma.docType.findUnique({ where: { id: salesOrder.id } })
    const cfg = ((current?.config ?? {}) as unknown as Record<string, unknown>)
    let changed = false
    if (!cfg["childDocTypeKey"]) {
      cfg["childDocTypeKey"] = "sales_order_item"
      changed = true
    }
    const computeVal = {
      totalFromRows: [
        {
          targetField: "subtotal_nrc",
          childDocTypeKey: "sales_order_item",
          formula: "qty * nrc"
        },
        {
          targetField: "subtotal_mrc",
          childDocTypeKey: "sales_order_item",
          formula: "qty * mrc"
        },
        {
          targetField: "total_contract",
          childDocTypeKey: "sales_order_item",
          qtyKey: "qty",
          nrcKey: "nrc",
          mrcKey: "mrc"
        }
      ]
    }
    if (JSON.stringify(cfg["compute"]) !== JSON.stringify(computeVal)) {
      cfg["compute"] = computeVal
      changed = true
    }
    if (changed) {
      await prisma.docType.update({ where: { id: salesOrder.id }, data: { config: cfg as unknown as Prisma.InputJsonValue } })
    }
  }

  {
    const current = await prisma.docType.findUnique({ where: { id: salesOrder.id } })
    const cfg = ((current?.config ?? {}) as unknown as Record<string, unknown>)
    const map = ((cfg["childDocTypes"] ?? {}) as Record<string, string>)
    let changed = false
    if (!map["items"]) { map["items"] = "sales_order_item"; cfg["childDocTypes"] = map; changed = true }
    if (!cfg["previewTemplate"]) {
      cfg["previewTemplate"] = (
        `<!DOCTYPE html><div><div>{{docTypeName}}</div><div>Kode: {{code}}</div><div>Status: {{status}}</div><div>Mata Uang: {{currency}}</div><div>Total: {{total_contract_currency}}</div><table><thead><tr><th>Produk</th><th>Qty</th><th>NRC</th><th>MRC</th><th>Total</th></tr></thead><tbody>{{#rows}}<tr><td>{{row.product_id_label}}</td><td>{{row.qty}}</td><td>{{row.nrc_currency}}</td><td>{{row.mrc_currency}}</td><td>{{row.price_currency}}</td></tr>{{/rows}}</tbody></table></div>`
      )
      changed = true
    }
    if (changed) {
      await prisma.docType.update({ where: { id: salesOrder.id }, data: { config: cfg as unknown as Prisma.InputJsonValue } })
    }
  }

  // Permissions for Sales Order
  await prisma.docPermission.upsert({
    where: { docTypeId_roleId: { docTypeId: salesOrder.id, roleId: adminRole.id } },
    update: {},
    create: { docTypeId: salesOrder.id, roleId: adminRole.id, canCreate: true, canRead: true, canWrite: true, canDelete: true },
  })
  await prisma.docPermission.upsert({
    where: { docTypeId_roleId: { docTypeId: salesOrder.id, roleId: customerRole.id } },
    update: {},
    create: { docTypeId: salesOrder.id, roleId: customerRole.id, canCreate: false, canRead: true, canWrite: false, canDelete: false },
  })

  // DocType: Subscription Management
  const subMgmt = await prisma.docType.upsert({
    where: { key: "subscription_management" },
    update: { branchId: null },
    create: { 
      key: "subscription_management", 
      name: "Subscription Management", 
      description: "Manajemen langganan recurring", 
      branchId: null,
      icon: "Repeat",
      config: {
        naming: {
          mode: "series",
          defaultPattern: "SUB-.YYYY.-#####"
        }
      } as any
    },
  })

  const subFields: Array<{ key: string; label: string; type: FieldType; required?: boolean; order: number; config?: Record<string, unknown> }> = [
    { key: "sales_order_id", label: "Sales Order", type: "TEXT", required: true, order: 1 },
    { key: "service_name", label: "Nama Layanan", type: "TEXT", required: false, order: 1.5 },
    { key: "customer_id", label: "Customer", type: "DROPDOWN", required: true, order: 2, config: { source: { table: "Company", labelField: "name", valueField: "id" } } },
    { key: "start_date", label: "Start Date", type: "DATE", required: true, order: 3 },
    { key: "end_date", label: "End Date", type: "DATE", required: false, order: 4 },
    { 
      key: "frequency", 
      label: "Frequency", 
      type: "DROPDOWN", 
      required: true, 
      order: 5, 
      config: { 
        options: [
          { label: "One Time", value: "One Time" },
          { label: "Monthly", value: "Monthly" },
          { label: "Quarterly", value: "Quarterly" },
          { label: "Annually", value: "Annually" }
        ] 
      } 
    },
    { 
      key: "status", 
      label: "Status", 
      type: "DROPDOWN", 
      required: true, 
      order: 6, 
      config: { 
        options: [
          { label: "Active", value: "Active" },
          { label: "Deactive", value: "Deactive" },
          { label: "Cancelled", value: "Cancelled" },
          { label: "Expired", value: "Expired" }
        ],
        default: "Deactive"
      } 
    },
    { key: "total_mrc", label: "Total MRC", type: "PRICE", required: true, order: 7 },
    { key: "next_billing_date", label: "Next Billing Date", type: "DATE", required: false, order: 8 },
  ]
  for (const f of subFields) {
    const configValue: Prisma.InputJsonValue | undefined = f.config ? (f.config as unknown as Prisma.InputJsonValue) : undefined
    await prisma.docField.upsert({
      where: { docTypeId_key: { docTypeId: subMgmt.id, key: f.key } },
      update: { label: f.label, type: f.type, order: f.order, config: configValue },
      create: { docTypeId: subMgmt.id, key: f.key, label: f.label, type: f.type, required: !!f.required, order: f.order, config: configValue },
    })
  }

  await prisma.docPermission.upsert({
    where: { docTypeId_roleId: { docTypeId: subMgmt.id, roleId: adminRole.id } },
    update: {},
    create: { docTypeId: subMgmt.id, roleId: adminRole.id, canCreate: true, canRead: true, canWrite: true, canDelete: true },
  })
  await prisma.docPermission.upsert({
    where: { docTypeId_roleId: { docTypeId: subMgmt.id, roleId: customerRole.id } },
    update: {},
    create: { docTypeId: subMgmt.id, roleId: customerRole.id, canCreate: false, canRead: true, canWrite: false, canDelete: false },
  })

  // DocType: Request (header)
  const request = await prisma.docType.upsert({
    where: { key: "request" },
    update: {},
    create: { key: "request", name: "Request", description: "Dokumen permintaan", branchId: branch.id },
  })

  const reqFields: Array<{ key: string; label: string; type: FieldType; required?: boolean; order: number; config?: Record<string, unknown> }> = [
    { key: "req_no", label: "Nomor Request", type: "TEXT", required: true, order: 1 },
    { key: "req_date", label: "Tanggal", type: "DATE", required: true, order: 2 },
    { key: "customer_id", label: "Customer", type: "DROPDOWN", required: true, order: 3, config: { source: { table: "Company", labelField: "name", valueField: "id" } } },
    { key: "currency", label: "Mata Uang", type: "DROPDOWN", required: true, order: 4, config: { options: [ { label: "IDR", value: "IDR" }, { label: "USD", value: "USD" } ] } },
    { 
      key: "term_of_payment", 
      label: "Term Of Payment", 
      type: "DROPDOWN", 
      required: true, 
      order: 4.5, 
      config: { 
        options: [
          { label: "One Time", value: "One Time" },
          { label: "Monthly", value: "Monthly" },
          { label: "Quarterly", value: "Quarterly" },
          { label: "Annually", value: "Annually" }
        ] 
      } 
    },
    { key: "notes", label: "Catatan", type: "TEXTAREA", required: false, order: 5 },
    { key: "items", label: "Items", type: "TABLE", required: false, order: 6 },
  ]
  for (const f of reqFields) {
    const configValue: Prisma.InputJsonValue | undefined = f.config ? (f.config as unknown as Prisma.InputJsonValue) : undefined
    await prisma.docField.upsert({
      where: { docTypeId_key: { docTypeId: request.id, key: f.key } },
      update: { label: f.label, type: f.type, order: f.order, config: configValue },
      create: { docTypeId: request.id, key: f.key, label: f.label, type: f.type, required: !!f.required, order: f.order, config: configValue },
    })
  }

  // DocType: Request Item (child rows)
  const requestItem = await prisma.docType.upsert({
    where: { key: "request_item" },
    update: {},
    create: { key: "request_item", name: "Request Item", description: "Item permintaan", branchId: branch.id },
  })

  const rqiFields: Array<{ key: string; label: string; type: FieldType; required?: boolean; order: number; config?: Record<string, unknown> }> = [
    { key: "product_id", label: "Produk", type: "DROPDOWN", required: true, order: 1, config: { source: { table: "Product", labelField: "name", valueField: "id" } } },
    { key: "qty", label: "Jumlah", type: "NUMBER", required: true, order: 2 },
    { key: "price", label: "Harga Satuan", type: "NUMBER", required: true, order: 3 },
    { key: "discount_percent", label: "Diskon (%)", type: "NUMBER", required: false, order: 4 },
    { key: "description", label: "Deskripsi", type: "TEXTAREA", required: false, order: 5 },
  ]
  for (const f of rqiFields) {
    const configValue: Prisma.InputJsonValue | undefined = f.config ? (f.config as unknown as Prisma.InputJsonValue) : undefined
    await prisma.docField.upsert({
      where: { docTypeId_key: { docTypeId: requestItem.id, key: f.key } },
      update: { label: f.label, type: f.type, order: f.order, config: configValue },
      create: { docTypeId: requestItem.id, key: f.key, label: f.label, type: f.type, required: !!f.required, order: f.order, config: configValue },
    })
  }

  {
    const current = await prisma.docType.findUnique({ where: { id: request.id } })
    const cfg = ((current?.config ?? {}) as unknown as Record<string, unknown>)
    if (!cfg["childDocTypeKey"]) {
      cfg["childDocTypeKey"] = "request_item"
      await prisma.docType.update({ where: { id: request.id }, data: { config: cfg as unknown as Prisma.InputJsonValue } })
    }
  }

  {
    const current = await prisma.docType.findUnique({ where: { id: request.id } })
    const cfg = ((current?.config ?? {}) as unknown as Record<string, unknown>)
    const map = ((cfg["childDocTypes"] ?? {}) as Record<string, string>)
    let changed = false
    if (!map["items"]) { map["items"] = "request_item"; cfg["childDocTypes"] = map; changed = true }
    if (!cfg["previewTemplate"]) {
      cfg["previewTemplate"] = (
        `<!DOCTYPE html><div><div>{{docTypeName}}</div><div>Kode: {{code}}</div><div>Status: {{status}}</div><div>Mata Uang: {{currency}}</div><div>Total: {{grandTotal_currency}}</div><table><thead><tr><th>Produk</th><th>Qty</th><th>Harga</th><th>Diskon (%)</th></tr></thead><tbody>{{#rows}}<tr><td>{{row.product_id_label}}</td><td>{{row.qty}}</td><td>{{row.price}}</td><td>{{row.discount_percent}}</td></tr>{{/rows}}</tbody></table></div>`
      )
      changed = true
    }
    if (changed) {
      await prisma.docType.update({ where: { id: request.id }, data: { config: cfg as unknown as Prisma.InputJsonValue } })
    }
  }

  await prisma.docPermission.upsert({
    where: { docTypeId_roleId: { docTypeId: request.id, roleId: adminRole.id } },
    update: {},
    create: { docTypeId: request.id, roleId: adminRole.id, canCreate: true, canRead: true, canWrite: true, canDelete: true },
  })
  await prisma.docPermission.upsert({
    where: { docTypeId_roleId: { docTypeId: request.id, roleId: customerRole.id } },
    update: {},
    create: { docTypeId: request.id, roleId: customerRole.id, canCreate: false, canRead: true, canWrite: false, canDelete: false },
  })

  // DocType: Work Order (header)
  const workOrder = await prisma.docType.upsert({
    where: { key: "work_order" },
    update: {},
    create: { key: "work_order", name: "Work Order", description: "Dokumen perintah kerja", branchId: branch.id },
  })

  const woFields: Array<{ key: string; label: string; type: FieldType; required?: boolean; order: number; config?: Record<string, unknown> }> = [
    { key: "wo_no", label: "Nomor WO", type: "TEXT", required: true, order: 1 },
    { key: "wo_date", label: "Tanggal", type: "DATE", required: true, order: 2 },
    { key: "customer_id", label: "Customer", type: "DROPDOWN", required: true, order: 3, config: { source: { table: "Company", labelField: "name", valueField: "id" } } },
    { key: "currency", label: "Mata Uang", type: "DROPDOWN", required: true, order: 4, config: { options: [ { label: "IDR", value: "IDR" }, { label: "USD", value: "USD" } ] } },
    { 
      key: "term_of_payment", 
      label: "Term Of Payment", 
      type: "DROPDOWN", 
      required: true, 
      order: 4.5, 
      config: { 
        options: [
          { label: "One Time", value: "One Time" },
          { label: "Monthly", value: "Monthly" },
          { label: "Quarterly", value: "Quarterly" },
          { label: "Annually", value: "Annually" }
        ] 
      } 
    },
    { key: "notes", label: "Catatan", type: "TEXTAREA", required: false, order: 5 },
    { key: "items", label: "Items", type: "TABLE", required: false, order: 6 },
  ]
  for (const f of woFields) {
    const configValue: Prisma.InputJsonValue | undefined = f.config ? (f.config as unknown as Prisma.InputJsonValue) : undefined
    await prisma.docField.upsert({
      where: { docTypeId_key: { docTypeId: workOrder.id, key: f.key } },
      update: { label: f.label, type: f.type, order: f.order, config: configValue },
      create: { docTypeId: workOrder.id, key: f.key, label: f.label, type: f.type, required: !!f.required, order: f.order, config: configValue },
    })
  }

  // DocType: Work Order Item (child rows)
  const workOrderItem = await prisma.docType.upsert({
    where: { key: "work_order_item" },
    update: { config: { listFields: ["product_id", "qty", "price", "discount_percent"] } },
    create: { key: "work_order_item", name: "Work Order Item", description: "Item perintah kerja", branchId: branch.id, config: { listFields: ["product_id", "qty", "price", "discount_percent"] } },
  })

  const woiFields: Array<{ key: string; label: string; type: FieldType; required?: boolean; order: number; config?: Record<string, unknown> }> = [
    { key: "product_id", label: "Produk", type: "DROPDOWN", required: true, order: 1, config: { source: { table: "Product", labelField: "name", valueField: "id" } } },
    { key: "qty", label: "Jumlah", type: "NUMBER", required: true, order: 2 },
    { key: "price", label: "Harga Satuan", type: "NUMBER", required: true, order: 3 },
    { key: "discount_percent", label: "Diskon (%)", type: "NUMBER", required: false, order: 4 },
    { key: "description", label: "Deskripsi", type: "TEXTAREA", required: false, order: 5 },
  ]
  for (const f of woiFields) {
    const configValue: Prisma.InputJsonValue | undefined = f.config ? (f.config as unknown as Prisma.InputJsonValue) : undefined
    await prisma.docField.upsert({
      where: { docTypeId_key: { docTypeId: workOrderItem.id, key: f.key } },
      update: { label: f.label, type: f.type, order: f.order, config: configValue },
      create: { docTypeId: workOrderItem.id, key: f.key, label: f.label, type: f.type, required: !!f.required, order: f.order, config: configValue },
    })
  }

  {
    const current = await prisma.docType.findUnique({ where: { id: workOrder.id } })
    const cfg = ((current?.config ?? {}) as unknown as Record<string, unknown>)
    if (!cfg["childDocTypeKey"]) {
      cfg["childDocTypeKey"] = "work_order_item"
      await prisma.docType.update({ where: { id: workOrder.id }, data: { config: cfg as unknown as Prisma.InputJsonValue } })
    }
  }

  {
    const current = await prisma.docType.findUnique({ where: { id: workOrder.id } })
    const cfg = ((current?.config ?? {}) as unknown as Record<string, unknown>)
    const map = ((cfg["childDocTypes"] ?? {}) as Record<string, string>)
    let changed = false
    if (!map["items"]) { map["items"] = "work_order_item"; cfg["childDocTypes"] = map; changed = true }
    if (!cfg["previewTemplate"]) {
      cfg["previewTemplate"] = (
        `<!DOCTYPE html><div><div>{{docTypeName}}</div><div>Kode: {{code}}</div><div>Status: {{status}}</div><div>Mata Uang: {{currency}}</div><div>Total: {{grandTotal_currency}}</div><table><thead><tr><th>Produk</th><th>Qty</th><th>Harga</th><th>Diskon (%)</th></tr></thead><tbody>{{#rows}}<tr><td>{{row.product_id_label}}</td><td>{{row.qty}}</td><td>{{row.price}}</td><td>{{row.discount_percent}}</td></tr>{{/rows}}</tbody></table></div>`
      )
      changed = true
    }
    if (changed) {
      await prisma.docType.update({ where: { id: workOrder.id }, data: { config: cfg as unknown as Prisma.InputJsonValue } })
    }
  }

  await prisma.docPermission.upsert({
    where: { docTypeId_roleId: { docTypeId: workOrder.id, roleId: adminRole.id } },
    update: {},
    create: { docTypeId: workOrder.id, roleId: adminRole.id, canCreate: true, canRead: true, canWrite: true, canDelete: true },
  })
  await prisma.docPermission.upsert({
    where: { docTypeId_roleId: { docTypeId: workOrder.id, roleId: customerRole.id } },
    update: {},
    create: { docTypeId: workOrder.id, roleId: customerRole.id, canCreate: false, canRead: true, canWrite: false, canDelete: false },
  })

  // Child DocType Permissions for ADMIN (Grant Full Access)
  const childDocTypes = [quotationItem, salesOrderItem, requestItem, workOrderItem]
  for (const cdt of childDocTypes) {
    await prisma.docPermission.upsert({
      where: { docTypeId_roleId: { docTypeId: cdt.id, roleId: adminRole.id } },
      update: {},
      create: { docTypeId: cdt.id, roleId: adminRole.id, canCreate: true, canRead: true, canWrite: true, canDelete: true },
    })
  }

  // --- Goods In Request ---
  const goodsIn = await prisma.docType.upsert({
    where: { key: "goods_in_request" },
    update: {},
    create: { 
      key: "goods_in_request", 
      name: "Goods In Request", 
      description: "Permintaan Barang Masuk", 
      branchId: branch.id,
      config: {
        naming: { defaultPattern: "GIN-{YYYY}-{MM}-{#####}" },
        previewTemplate: `<!DOCTYPE html><div><h1 class="text-xl font-bold">Goods In Request</h1><div>Code: {{code}}</div><div>Date: {{request_date}}</div><div>Sender: {{sender_name}}</div><div>Status: {{status}}</div><br/><table><thead><tr><th>Item</th><th>Qty</th><th>Serial No</th><th>Desc</th></tr></thead><tbody>{{#rows}}<tr><td>{{row.item_name}}</td><td>{{row.quantity}}</td><td>{{row.serial_number}}</td><td>{{row.description}}</td></tr>{{/rows}}</tbody></table></div>`
      }
    },
  });

  const goodsInFields: Array<{ key: string; label: string; type: FieldType; required?: boolean; order: number; config?: Record<string, unknown> }> = [
    { key: "request_date", label: "Tanggal Permintaan", type: "DATE", required: true, order: 1 },
    { key: "sender_name", label: "Nama Pengirim", type: "TEXT", required: true, order: 2 },
    { key: "sender_contact", label: "Kontak Pengirim", type: "TEXT", required: false, order: 3 },
    { key: "notes", label: "Catatan", type: "TEXTAREA", required: false, order: 4 },
    { key: "status", label: "Status", type: "DROPDOWN", required: true, order: 5, config: { options: [
      { label: "Draft", value: "Draft" },
      { label: "Submitted", value: "Submitted" },
      { label: "Approved", value: "Approved" },
      { label: "Rejected", value: "Rejected" },
      { label: "Completed", value: "Completed" }
    ], defaultValue: "Draft" } },
    { key: "items", label: "Daftar Barang", type: "TABLE", required: false, order: 6 },
  ];

  for (const f of goodsInFields) {
    const configValue: Prisma.InputJsonValue | undefined = f.config ? (f.config as unknown as Prisma.InputJsonValue) : undefined;
    await prisma.docField.upsert({
      where: { docTypeId_key: { docTypeId: goodsIn.id, key: f.key } },
      update: { label: f.label, type: f.type, required: !!f.required, order: f.order, config: configValue },
      create: { docTypeId: goodsIn.id, key: f.key, label: f.label, type: f.type, required: !!f.required, order: f.order, config: configValue },
    });
  }

  // Child DocType: Goods In Item
  const goodsInItem = await prisma.docType.upsert({
    where: { key: "goods_in_item" },
    update: {},
    create: { key: "goods_in_item", name: "Goods In Item", description: "Item Barang Masuk", branchId: branch.id },
  });

  const goodsInItemFields: Array<{ key: string; label: string; type: FieldType; required?: boolean; order: number; config?: Record<string, unknown> }> = [
    { key: "item_name", label: "Nama Barang", type: "TEXT", required: true, order: 1 },
    { key: "quantity", label: "Jumlah", type: "NUMBER", required: true, order: 2 },
    { key: "serial_number", label: "Serial Number", type: "TEXT", required: false, order: 3 },
    { key: "description", label: "Deskripsi/Kondisi", type: "TEXTAREA", required: false, order: 4 },
  ];

  for (const f of goodsInItemFields) {
    const configValue: Prisma.InputJsonValue | undefined = f.config ? (f.config as unknown as Prisma.InputJsonValue) : undefined;
    await prisma.docField.upsert({
      where: { docTypeId_key: { docTypeId: goodsInItem.id, key: f.key } },
      update: { label: f.label, type: f.type, required: !!f.required, order: f.order, config: configValue },
      create: { docTypeId: goodsInItem.id, key: f.key, label: f.label, type: f.type, required: !!f.required, order: f.order, config: configValue },
    });
  }

  // Link child
  {
    const current = await prisma.docType.findUnique({ where: { id: goodsIn.id } });
    const cfg = ((current?.config ?? {}) as unknown as Record<string, unknown>);
    const map = ((cfg["childDocTypes"] ?? {}) as Record<string, string>);
    map["items"] = "goods_in_item";
    cfg["childDocTypes"] = map;
    cfg["childDocTypeKey"] = "goods_in_item";
    await prisma.docType.update({ where: { id: goodsIn.id }, data: { config: cfg as unknown as Prisma.InputJsonValue } });
  }

  // --- Goods Out Request ---
  const goodsOut = await prisma.docType.upsert({
    where: { key: "goods_out_request" },
    update: {},
    create: { 
      key: "goods_out_request", 
      name: "Goods Out Request", 
      description: "Permintaan Barang Keluar", 
      branchId: branch.id,
      config: {
        naming: { defaultPattern: "GOUT-{YYYY}-{MM}-{#####}" },
        previewTemplate: `<!DOCTYPE html><div><h1 class="text-xl font-bold">Goods Out Request</h1><div>Code: {{code}}</div><div>Date: {{request_date}}</div><div>Recipient: {{recipient_name}}</div><div>Status: {{status}}</div><br/><table><thead><tr><th>Item</th><th>Qty</th><th>Serial No</th><th>Desc</th></tr></thead><tbody>{{#rows}}<tr><td>{{row.item_name}}</td><td>{{row.quantity}}</td><td>{{row.serial_number}}</td><td>{{row.description}}</td></tr>{{/rows}}</tbody></table></div>`
      }
    },
  });

  const goodsOutFields: Array<{ key: string; label: string; type: FieldType; required?: boolean; order: number; config?: Record<string, unknown> }> = [
    { key: "request_date", label: "Tanggal Permintaan", type: "DATE", required: true, order: 1 },
    { key: "recipient_name", label: "Nama Penerima", type: "TEXT", required: true, order: 2 },
    { key: "recipient_contact", label: "Kontak Penerima", type: "TEXT", required: false, order: 3 },
    { key: "notes", label: "Catatan", type: "TEXTAREA", required: false, order: 4 },
    { key: "status", label: "Status", type: "DROPDOWN", required: true, order: 5, config: { options: [
      { label: "Draft", value: "Draft" },
      { label: "Submitted", value: "Submitted" },
      { label: "Approved", value: "Approved" },
      { label: "Rejected", value: "Rejected" },
      { label: "Completed", value: "Completed" }
    ], defaultValue: "Draft" } },
    { key: "items", label: "Daftar Barang", type: "TABLE", required: false, order: 6 },
  ];

  for (const f of goodsOutFields) {
    const configValue: Prisma.InputJsonValue | undefined = f.config ? (f.config as unknown as Prisma.InputJsonValue) : undefined;
    await prisma.docField.upsert({
      where: { docTypeId_key: { docTypeId: goodsOut.id, key: f.key } },
      update: { label: f.label, type: f.type, required: !!f.required, order: f.order, config: configValue },
      create: { docTypeId: goodsOut.id, key: f.key, label: f.label, type: f.type, required: !!f.required, order: f.order, config: configValue },
    });
  }

  // Child DocType: Goods Out Item
  const goodsOutItem = await prisma.docType.upsert({
    where: { key: "goods_out_item" },
    update: {},
    create: { key: "goods_out_item", name: "Goods Out Item", description: "Item Barang Keluar", branchId: branch.id },
  });

  const goodsOutItemFields: Array<{ key: string; label: string; type: FieldType; required?: boolean; order: number; config?: Record<string, unknown> }> = [
    { key: "item_name", label: "Nama Barang", type: "TEXT", required: true, order: 1 },
    { key: "quantity", label: "Jumlah", type: "NUMBER", required: true, order: 2 },
    { key: "serial_number", label: "Serial Number", type: "TEXT", required: false, order: 3 },
    { key: "description", label: "Deskripsi/Kondisi", type: "TEXTAREA", required: false, order: 4 },
  ];

  for (const f of goodsOutItemFields) {
    const configValue: Prisma.InputJsonValue | undefined = f.config ? (f.config as unknown as Prisma.InputJsonValue) : undefined;
    await prisma.docField.upsert({
      where: { docTypeId_key: { docTypeId: goodsOutItem.id, key: f.key } },
      update: { label: f.label, type: f.type, required: !!f.required, order: f.order, config: configValue },
      create: { docTypeId: goodsOutItem.id, key: f.key, label: f.label, type: f.type, required: !!f.required, order: f.order, config: configValue },
    });
  }

  // Link child
  {
    const current = await prisma.docType.findUnique({ where: { id: goodsOut.id } });
    const cfg = ((current?.config ?? {}) as unknown as Record<string, unknown>);
    const map = ((cfg["childDocTypes"] ?? {}) as Record<string, string>);
    map["items"] = "goods_out_item";
    cfg["childDocTypes"] = map;
    cfg["childDocTypeKey"] = "goods_out_item";
    await prisma.docType.update({ where: { id: goodsOut.id }, data: { config: cfg as unknown as Prisma.InputJsonValue } });
  }

  // Permissions for Goods Movement
  const gmDocTypes = [goodsIn, goodsInItem, goodsOut, goodsOutItem];
  
  if (adminRole) {
    for (const dt of gmDocTypes) {
      await prisma.docPermission.upsert({
        where: { docTypeId_roleId: { roleId: adminRole.id, docTypeId: dt.id } },
        update: { canCreate: true, canRead: true, canWrite: true, canDelete: true },
        create: { roleId: adminRole.id, docTypeId: dt.id, canCreate: true, canRead: true, canWrite: true, canDelete: true },
      });
    }
  }

  if (customerRole) {
    for (const dt of gmDocTypes) {
      await prisma.docPermission.upsert({
        where: { docTypeId_roleId: { roleId: customerRole.id, docTypeId: dt.id } },
        update: { canCreate: true, canRead: true, canWrite: true, canDelete: true }, 
        create: { roleId: customerRole.id, docTypeId: dt.id, canCreate: true, canRead: true, canWrite: true, canDelete: true },
      });
    }
  }
}

run()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async () => {
    await prisma.$disconnect();
    process.exit(1);
  });