import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import type { Prisma } from "../src/generated/prisma/client";
import * as fs from "node:fs";
import * as path from "node:path";
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

  // --- Companies ---
  const companyData = [
    { name: "Default Company" },
    { name: "PT. MettaDC", isDataCenter: true, address: "SCBD, Treasury Tower, 5th Floor, District 8, Jl. Jenderal Sudirman No.52-53, RT.5/RW.3, Senayan, South Jakarta", companyEmail: "info@mettadc.com", companyPhoneNumber: "089238234324" },
    { name: "PT. Metro Data" },
    { name: "PT. Limputra Manggala Nusantara", isDataCenter: true },
    { name: "PT. Media Energi" },
    { name: "PT Gajah Mungkur" },
  ];
  const companiesByName: Record<string, string> = {};
  for (const c of companyData) {
    const existing = await prisma.company.findUnique({ where: { name: c.name } });
    if (existing) {
      companiesByName[c.name] = existing.id;
    } else {
      const created = await prisma.company.create({ data: { name: c.name, isDataCenter: c.isDataCenter ?? false, address: c.address ?? null, companyEmail: c.companyEmail ?? null, companyPhoneNumber: c.companyPhoneNumber ?? null } });
      companiesByName[c.name] = created.id;
    }
  }
  const company = await prisma.company.findUnique({ where: { name: "Default Company" } });
  if (!company) throw new Error("Default Company not found");

  // --- Branches ---
  const branchData = [
    { name: "JABABEKA", code: "HQ", companyName: "PT. MettaDC" },
    { name: "CYBER POP 1", code: "POP-1", companyName: "PT. MettaDC" },
    { name: "Holding Group", code: "HG", companyName: "PT. Limputra Manggala Nusantara" },
  ];
  const branchesByCode: Record<string, string> = {};
  for (const b of branchData) {
    const existing = await prisma.branch.findUnique({ where: { code: b.code } });
    if (existing) {
      branchesByCode[b.code] = existing.id;
    } else {
      const created = await prisma.branch.create({ data: { name: b.name, code: b.code, companyId: companiesByName[b.companyName] } });
      branchesByCode[b.code] = created.id;
    }
  }
  const branch = await prisma.branch.findUnique({ where: { code: "HQ" } });
  if (!branch) throw new Error("Branch HQ not found");

  // --- Roles ---
  const roleData = [
    { name: "ADMIN", branchCode: null },
    { name: "Admin", branchCode: "HQ" },
    { name: "Customer", branchCode: "HQ" },
    { name: "Engginer", branchCode: "HQ" },
    { name: "Finances", branchCode: "HQ" },
    { name: "Moderator", branchCode: "HQ" },
    { name: "Operational Manager", branchCode: "HQ" },
    { name: "Sales", branchCode: "HQ" },
    { name: "Sales Manager", branchCode: "HQ" },
    { name: "Security", branchCode: "POP-1" },
    { name: "Super Admin", branchCode: "HG" },
  ];
  const rolesByName: Record<string, string> = {};
  for (const r of roleData) {
    const bid = r.branchCode ? branchesByCode[r.branchCode] : null;
    if (bid === undefined) continue;
    const existing = bid
      ? await prisma.role.findFirst({ where: { name: r.name, branchId: bid } })
      : await prisma.role.findFirst({ where: { name: r.name, branchId: null } });
    if (existing) {
      rolesByName[r.name] = existing.id;
    } else {
      const created = await prisma.role.create({ data: { name: r.name, branchId: bid } });
      rolesByName[r.name] = created.id;
    }
  }
  const adminRole = await prisma.role.findFirst({ where: { name: "ADMIN", branchId: null } });
  const customerRole = await prisma.role.findFirst({ where: { name: "Customer", branchId: branch.id } });
  if (!adminRole || !customerRole) throw new Error("Required roles not found");
  for (const perm of allPerms) {
    await prisma.rolePermission.upsert({
      where: { roleId_permissionId: { roleId: adminRole.id, permissionId: perm.id } },
      update: {},
      create: { roleId: adminRole.id, permissionId: perm.id },
    });
  }

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
  await prisma.userBranchAssignment.upsert({
    where: { userId_branchId: { userId: superadmin.id, branchId: branchesByCode["HG"] } },
    update: {},
    create: { userId: superadmin.id, branchId: branchesByCode["HG"] },
  });

  const adminPassword = await bcrypt.hash("admin123", 10);
  const admin = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      email: "admin@example.com",
      name: "Admin",
      passwordHash: adminPassword,
      roleId: rolesByName["Admin"],
      companyId: companiesByName["PT. MettaDC"],
    },
  });
  await prisma.userBranchAssignment.upsert({
    where: { userId_branchId: { userId: admin.id, branchId: branchesByCode["HQ"] } },
    update: {},
    create: { userId: admin.id, branchId: branchesByCode["HQ"] },
  });
  await prisma.userBranchAssignment.upsert({
    where: { userId_branchId: { userId: admin.id, branchId: branchesByCode["POP-1"] } },
    update: {},
    create: { userId: admin.id, branchId: branchesByCode["POP-1"] },
  });

  const customerPassword = await bcrypt.hash("customer123", 10);
  const customer = await prisma.user.upsert({
    where: { email: "customer@example.com" },
    update: {},
    create: {
      email: "customer@example.com",
      name: "Customer",
      passwordHash: customerPassword,
      roleId: customerRole.id,
      companyId: companiesByName["PT. Metro Data"],
    },
  });

  // --- Additional Users (from dump) ---
  const defaultPassword = await bcrypt.hash("password123", 10);
  const additionalUsers = [
    { email: "customer2@example.com", name: "customer2", role: "Customer", company: "PT. Media Energi" },
    { email: "engginer@example.com", name: "engginer", role: "Engginer", company: "PT. MettaDC", branches: ["HQ", "POP-1"] },
    { email: "finance@example.com", name: "finance", role: "Finances", company: "PT. MettaDC", branches: ["HQ", "POP-1"] },
    { email: "operation@example.com", name: "operation", role: "Operational Manager", company: "PT. MettaDC", branches: ["HQ", "POP-1"] },
    { email: "raka@limputra.com", name: "Raka Renaldi", role: "Super Admin", company: "PT. Limputra Manggala Nusantara" },
    { email: "rio@limputra.com", name: "Rio Renaldi", role: "Super Admin", company: "PT. Limputra Manggala Nusantara" },
    { email: "sales@example.com", name: "sales metta", role: "Sales", company: "PT. MettaDC", branches: ["HQ", "POP-1"] },
    { email: "salesmanager@example.com", name: "salesmanager", role: "Sales Manager", company: "PT. MettaDC", branches: ["HQ", "POP-1"] },
    { email: "security@example.com", name: "security Wanaya", role: "Security", company: "PT. MettaDC", branches: ["POP-1"] },
  ];
  for (const u of additionalUsers) {
    const existing = await prisma.user.findUnique({ where: { email: u.email } });
    if (!existing) {
      const created = await prisma.user.create({
        data: {
          email: u.email,
          name: u.name,
          passwordHash: defaultPassword,
          roleId: rolesByName[u.role],
          companyId: companiesByName[u.company],
        },
      });
      const branchCodes = (u as any).branches ?? [];
      for (const bc of branchCodes) {
        const bid = branchesByCode[bc];
        if (bid) {
          await prisma.userBranchAssignment.upsert({
            where: { userId_branchId: { userId: created.id, branchId: bid } },
            update: {},
            create: { userId: created.id, branchId: bid },
          });
        }
      }
    }
  }

  // DocType: Quotation (header)
  const quotation = await prisma.docType.upsert({
    where: { key: "quotation" },
    update: { icon: "Plus" },
    create: { key: "quotation", name: "Quotation", description: "Dokumen penawaran", branchId: branch.id, icon: "Plus" },
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
    { key: "product_category", label: "Kategori Produk", type: "DROPDOWN", required: false, order: 0.5, config: { source: { table: "ProductGroup", labelField: "name", valueField: "id", where: { parentId: null } } } },
    { key: "product_sub_category", label: "Sub Kategori Produk", type: "DROPDOWN", required: false, order: 0.7, config: { source: { table: "ProductGroup", labelField: "name", valueField: "id", filter: { dependsOn: "product_category", field: "parentId" } } } },
    { key: "product_id", label: "Produk", type: "DROPDOWN", required: true, order: 1, config: { source: { table: "Product", labelField: "name", valueField: "id", filter: { dependsOn: "product_sub_category", field: "groupId" } } } },
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
    update: { icon: "Plus" },
    create: { key: "sales_order", name: "Sales Order", description: "Dokumen pesanan penjualan", branchId: branch.id, icon: "Plus" },
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
    { key: "product_category", label: "Kategori Produk", type: "DROPDOWN", required: false, order: 0.5, config: { source: { table: "ProductGroup", labelField: "name", valueField: "id", where: { parentId: null } } } },
    { key: "product_sub_category", label: "Sub Kategori Produk", type: "DROPDOWN", required: false, order: 0.7, config: { source: { table: "ProductGroup", labelField: "name", valueField: "id", filter: { dependsOn: "product_category", field: "parentId" } } } },
    { key: "product_id", label: "Produk", type: "DROPDOWN", required: true, order: 1, config: { source: { table: "Product", labelField: "name", valueField: "id", filter: { dependsOn: "product_sub_category", field: "groupId" } } } },
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
    if (!cfg["naming"]) {
      cfg["naming"] = { mode: "series", defaultPattern: "SO-#####" }
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
    update: { branchId: null, icon: "LayoutGrid" },
    create: { 
      key: "subscription_management", 
      name: "Subscription Management", 
      description: "Manajemen langganan recurring", 
      branchId: null,
      icon: "LayoutGrid",
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

  // DocType: Billing Schedule
  const billingScheduleDt = await prisma.docType.upsert({
    where: { key: "billing_schedule" },
    update: { branchId: null, icon: "Calendar" },
    create: {
      key: "billing_schedule",
      name: "Billing Schedule",
      description: "Jadwal penagihan otomatis subscription",
      branchId: null,
      icon: "Calendar",
      config: {
        naming: {
          mode: "series",
          defaultPattern: "SCH-#####"
        }
      } as any
    },
  })

  const schFields: Array<{ key: string; label: string; type: FieldType; required?: boolean; order: number; config?: Record<string, unknown> }> = [
    { key: "subscription_id", label: "Subscription", type: "TEXT", required: true, order: 1 },
    { key: "sales_order_id", label: "Sales Order", type: "TEXT", required: true, order: 2 },
    { key: "customer_id", label: "Customer", type: "DROPDOWN", required: true, order: 3, config: { source: { table: "Company", labelField: "name", valueField: "id" } } },
    { key: "item_name", label: "Item Layanan", type: "TEXT", required: true, order: 4 },
    { key: "charge_type", label: "Charge Type", type: "TEXT", required: true, order: 5 },
    { key: "billing_period_start", label: "Period Start", type: "DATE", required: true, order: 6 },
    { key: "billing_period_end", label: "Period End", type: "DATE", required: true, order: 7 },
    { key: "due_date", label: "Due Date", type: "DATE", required: true, order: 8 },
    { key: "amount", label: "Jumlah Tagihan", type: "PRICE", required: true, order: 9 },
    { key: "status", label: "Status", type: "TEXT", required: true, order: 10 },
  ]
  for (const f of schFields) {
    const configValue: Prisma.InputJsonValue | undefined = f.config ? (f.config as unknown as Prisma.InputJsonValue) : undefined
    await prisma.docField.upsert({
      where: { docTypeId_key: { docTypeId: billingScheduleDt.id, key: f.key } },
      update: { label: f.label, type: f.type, order: f.order, config: configValue },
      create: { docTypeId: billingScheduleDt.id, key: f.key, label: f.label, type: f.type, required: !!f.required, order: f.order, config: configValue },
    })
  }

  await prisma.docPermission.upsert({
    where: { docTypeId_roleId: { docTypeId: billingScheduleDt.id, roleId: adminRole.id } },
    update: {},
    create: { docTypeId: billingScheduleDt.id, roleId: adminRole.id, canCreate: true, canRead: true, canWrite: true, canDelete: true },
  })
  await prisma.docPermission.upsert({
    where: { docTypeId_roleId: { docTypeId: billingScheduleDt.id, roleId: customerRole.id } },
    update: {},
    create: { docTypeId: billingScheduleDt.id, roleId: customerRole.id, canCreate: false, canRead: true, canWrite: false, canDelete: false },
  })


  // DocType: Request (header)
  const request = await prisma.docType.upsert({
    where: { key: "request" },
    update: { icon: "Plus" },
    create: { key: "request", name: "Request", description: "Dokumen permintaan", branchId: branch.id, icon: "Plus" },
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
    { key: "product_category", label: "Kategori Produk", type: "DROPDOWN", required: false, order: 0.5, config: { source: { table: "ProductGroup", labelField: "name", valueField: "id", where: { parentId: null } } } },
    { key: "product_sub_category", label: "Sub Kategori Produk", type: "DROPDOWN", required: false, order: 0.7, config: { source: { table: "ProductGroup", labelField: "name", valueField: "id", filter: { dependsOn: "product_category", field: "parentId" } } } },
    { key: "product_id", label: "Produk", type: "DROPDOWN", required: true, order: 1, config: { source: { table: "Product", labelField: "name", valueField: "id", filter: { dependsOn: "product_sub_category", field: "groupId" } } } },
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
    update: { icon: "Pickaxe" },
    create: { key: "work_order", name: "Work Order", description: "Dokumen perintah kerja", branchId: branch.id, icon: "Pickaxe" },
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
    { key: "product_category", label: "Kategori Produk", type: "DROPDOWN", required: false, order: 0.5, config: { source: { table: "ProductGroup", labelField: "name", valueField: "id", where: { parentId: null } } } },
    { key: "product_sub_category", label: "Sub Kategori Produk", type: "DROPDOWN", required: false, order: 0.7, config: { source: { table: "ProductGroup", labelField: "name", valueField: "id", filter: { dependsOn: "product_category", field: "parentId" } } } },
    { key: "product_id", label: "Produk", type: "DROPDOWN", required: true, order: 1, config: { source: { table: "Product", labelField: "name", valueField: "id", filter: { dependsOn: "product_sub_category", field: "groupId" } } } },
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
  const goodsInPreviewTemplate = fs.readFileSync(
    path.join(__dirname, "templates", "goods_in_request_preview.html"),
    "utf-8"
  )
  const goodsIn = await prisma.docType.upsert({
    where: { key: "goods_in_request" },
    update: { icon: "Plus" },
    create: { 
      key: "goods_in_request", 
      name: "Goods In Request", 
      description: "Permintaan Barang Masuk", 
      branchId: branch.id,
      icon: "Plus",
      config: {
        naming: { defaultPattern: "GIN-{YYYY}-{MM}-{#####}" },
        previewTemplate: goodsInPreviewTemplate,
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
    { key: "type_of_material", label: "Type Of Material", type: "DROPDOWN", required: true, order: 1, config: { options: [
      { label: "Fiber Optic", value: "Fiber Optic" },
      { label: "UTP Cable", value: "UTP Cable" },
      { label: "Coaxial Cable", value: "Coaxial Cable" },
      { label: "Connector", value: "Connector" },
      { label: "Patch Panel", value: "Patch Panel" },
      { label: "Rack", value: "Rack" },
      { label: "Switch", value: "Switch" },
      { label: "Router", value: "Router" },
      { label: "Power Cable", value: "Power Cable" },
      { label: "Other", value: "Other" }
    ] } },
    { key: "item_name", label: "Nama Barang", type: "TEXT", required: false, order: 2 },
    { key: "quantity", label: "Jumlah", type: "NUMBER", required: true, order: 3 },
    { key: "serial_number", label: "Serial Number", type: "TEXT", required: false, order: 4 },
    { key: "description", label: "Deskripsi/Kondisi", type: "TEXTAREA", required: false, order: 5 },
    { key: "building_id", label: "Gedung", type: "DROPDOWN", required: true, order: 6,
      config: { source: { table: "Building", labelField: "name", valueField: "id", filter: { dependsOn: "branch_id", field: "branchId" } } } },
    { key: "floor_id", label: "Lantai", type: "DROPDOWN", required: true, order: 7,
      config: { source: { table: "Floor", labelField: "name", valueField: "id", filter: { dependsOn: "building_id", field: "buildingId" } } } },
    { key: "room_id", label: "Ruangan", type: "DROPDOWN", required: true, order: 8,
      config: { source: { table: "Room", labelField: "name", valueField: "id", filter: { dependsOn: "floor_id", field: "floorId" } } } },
    { key: "owner_customer_id", label: "Customer Pemilik", type: "TEXT", required: false, order: 9 },
  ];

  for (const f of goodsInItemFields) {
    const configValue: Prisma.InputJsonValue | undefined = f.config ? (f.config as unknown as Prisma.InputJsonValue) : undefined;
    await prisma.docField.upsert({
      where: { docTypeId_key: { docTypeId: goodsInItem.id, key: f.key } },
      update: { label: f.label, type: f.type, required: !!f.required, order: f.order, config: configValue },
      create: { docTypeId: goodsInItem.id, key: f.key, label: f.label, type: f.type, required: !!f.required, order: f.order, config: configValue },
    });
  }

  // Cleanup old product_id field (replaced by type_of_material)
  await prisma.docField.deleteMany({ where: { docTypeId: goodsInItem.id, key: "product_id" } });

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
  const goodsOutPreviewTemplate = fs.readFileSync(
    path.join(__dirname, "templates", "goods_out_request_preview.html"),
    "utf-8"
  )
  const goodsOut = await prisma.docType.upsert({
    where: { key: "goods_out_request" },
    update: { icon: "Plus" },
    create: { 
      key: "goods_out_request", 
      name: "Goods Out Request", 
      description: "Permintaan Barang Keluar", 
      branchId: branch.id,
      icon: "Plus",
      config: {
        naming: { defaultPattern: "GOUT-{YYYY}-{MM}-{#####}" },
        previewTemplate: goodsOutPreviewTemplate,
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
    { key: "type_of_material", label: "Type Of Material", type: "DROPDOWN", required: true, order: 1, config: { options: [
      { label: "Fiber Optic", value: "Fiber Optic" },
      { label: "UTP Cable", value: "UTP Cable" },
      { label: "Coaxial Cable", value: "Coaxial Cable" },
      { label: "Connector", value: "Connector" },
      { label: "Patch Panel", value: "Patch Panel" },
      { label: "Rack", value: "Rack" },
      { label: "Switch", value: "Switch" },
      { label: "Router", value: "Router" },
      { label: "Power Cable", value: "Power Cable" },
      { label: "Other", value: "Other" }
    ] } },
    { key: "item_name", label: "Nama Barang", type: "TEXT", required: false, order: 2 },
    { key: "quantity", label: "Jumlah", type: "NUMBER", required: true, order: 3 },
    { key: "serial_number", label: "Serial Number", type: "TEXT", required: false, order: 4 },
    { key: "description", label: "Deskripsi/Kondisi", type: "TEXTAREA", required: false, order: 5 },
    { key: "building_id", label: "Gedung", type: "DROPDOWN", required: true, order: 6,
      config: { source: { table: "Building", labelField: "name", valueField: "id", filter: { dependsOn: "branch_id", field: "branchId" } } } },
    { key: "floor_id", label: "Lantai", type: "DROPDOWN", required: true, order: 7,
      config: { source: { table: "Floor", labelField: "name", valueField: "id", filter: { dependsOn: "building_id", field: "buildingId" } } } },
    { key: "room_id", label: "Ruangan", type: "DROPDOWN", required: true, order: 8,
      config: { source: { table: "Room", labelField: "name", valueField: "id", filter: { dependsOn: "floor_id", field: "floorId" } } } },
    { key: "owner_customer_id", label: "Customer Pemilik", type: "TEXT", required: false, order: 9 },
  ];

  for (const f of goodsOutItemFields) {
    const configValue: Prisma.InputJsonValue | undefined = f.config ? (f.config as unknown as Prisma.InputJsonValue) : undefined;
    await prisma.docField.upsert({
      where: { docTypeId_key: { docTypeId: goodsOutItem.id, key: f.key } },
      update: { label: f.label, type: f.type, required: !!f.required, order: f.order, config: configValue },
      create: { docTypeId: goodsOutItem.id, key: f.key, label: f.label, type: f.type, required: !!f.required, order: f.order, config: configValue },
    });
  }

  // Cleanup old product_id field (replaced by type_of_material)
  await prisma.docField.deleteMany({ where: { docTypeId: goodsOutItem.id, key: "product_id" } });

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

  // --- Visitor Request & Support Ticket ---
  const visitorRequest = await prisma.docType.upsert({
    where: { key: "visitor_request" },
    update: { icon: "Users" },
    create: {
      key: "visitor_request",
      name: "Visitor Request",
      description: "Permintaan kunjungan visitor",
      branchId: branch.id,
      icon: "Users",
      config: {
        naming: { mode: "series", field: "naming_series", defaultPattern: "VR-####" },
        listFields: ["visit_date", "purpose"],
        filterFields: ["visit_date"],
        childDocTypeKey: "visitor_request_item",
      },
    },
  });

  const visitorRequestItem = await prisma.docType.upsert({
    where: { key: "visitor_request_item" },
    update: {},
    create: {
      key: "visitor_request_item",
      name: "Visitor",
      description: "Daftar visitor yang akan datang",
      branchId: branch.id,
      config: {
        listFields: ["visitor_name", "nik", "ktp_file"],
        filterFields: [],
      },
    },
  });

  const supportTicket = await prisma.docType.upsert({
    where: { key: "support_ticket" },
    update: { icon: "LifeBuoy" },
    create: {
      key: "support_ticket",
      name: "Support Ticket",
      description: "Tiket bantuan/support",
      branchId: branch.id,
      icon: "LifeBuoy",
      config: {
        naming: { mode: "series", field: "naming_series", defaultPattern: "TIC-#####" },
        listFields: ["subject", "status", "priority", "category"],
        filterFields: ["status", "priority", "category"],
        childDocTypeKey: "ticket_message",
        assignmentEnabled: false,
      },
    },
  });

  const ticketMessage = await prisma.docType.upsert({
    where: { key: "ticket_message" },
    update: { icon: "Plus" },
    create: {
      key: "ticket_message",
      name: "Ticket Message",
      description: "Pesan percakapan tiket",
      branchId: branch.id,
      icon: "Plus",
      config: {
        listFields: ["message", "sender_name", "createdAt"],
        assignmentEnabled: false,
      },
    },
  });

  const visitorRequestFields: Array<{ key: string; label: string; type: FieldType; required?: boolean; order: number; config?: Record<string, unknown> }> = [
    { key: "visit_date", label: "Tanggal Kunjungan", type: "DATE", required: true, order: 10 },
    { key: "purpose", label: "Keperluan", type: "TEXTAREA", required: false, order: 20 },
    { key: "status", label: "Status", type: "DROPDOWN", required: true, order: 5, config: { options: [
      { label: "Draft", value: "Draft" },
      { label: "Submitted", value: "Submitted" },
      { label: "Approved", value: "Approved" },
      { label: "Rejected", value: "Rejected" },
      { label: "Completed", value: "Completed" }
    ], defaultValue: "Draft" } },
    { key: "visitors", label: "Daftar Visitor", type: "TABLE", required: false, order: 100, config: { childDocTypeKey: "visitor_request_item" } },
  ];

  for (const f of visitorRequestFields) {
    const configValue: Prisma.InputJsonValue | undefined = f.config ? (f.config as unknown as Prisma.InputJsonValue) : undefined;
    await prisma.docField.upsert({
      where: { docTypeId_key: { docTypeId: visitorRequest.id, key: f.key } },
      update: { label: f.label, type: f.type, required: !!f.required, order: f.order, config: configValue },
      create: { docTypeId: visitorRequest.id, key: f.key, label: f.label, type: f.type, required: !!f.required, order: f.order, config: configValue },
    });
  }

  const visitorRequestItemFields: Array<{ key: string; label: string; type: FieldType; required?: boolean; order: number }> = [
    { key: "visitor_name", label: "Nama Visitor", type: "TEXT", required: true, order: 10 },
    { key: "nik", label: "NIK", type: "TEXT", required: false, order: 20 },
    { key: "phone_number", label: "No. HP", type: "TEXT", required: false, order: 30 },
    { key: "email", label: "Email", type: "TEXT", required: false, order: 40 },
    { key: "ktp_file", label: "Upload KTP", type: "ATTACHMENT", required: false, order: 50 },
    { key: "notes", label: "Catatan", type: "TEXTAREA", required: false, order: 60 },
  ];

  for (const f of visitorRequestItemFields) {
    await prisma.docField.upsert({
      where: { docTypeId_key: { docTypeId: visitorRequestItem.id, key: f.key } },
      update: { label: f.label, type: f.type, required: !!f.required, order: f.order },
      create: { docTypeId: visitorRequestItem.id, key: f.key, label: f.label, type: f.type, required: !!f.required, order: f.order },
    });
  }

  const supportTicketFields: Array<{ key: string; label: string; type: FieldType; required?: boolean; order: number; config?: Record<string, unknown> }> = [
    { key: "subject", label: "Subjek", type: "TEXT", required: true, order: 10 },
    { key: "category", label: "Kategori", type: "DROPDOWN", required: false, order: 20, config: { options: [
      { label: "Technical", value: "Technical" },
      { label: "Billing", value: "Billing" },
      { label: "General", value: "General" },
      { label: "Complaint", value: "Complaint" }
    ] } },
    { key: "priority", label: "Prioritas", type: "DROPDOWN", required: false, order: 30, config: { options: [
      { label: "Low", value: "Low" },
      { label: "Medium", value: "Medium" },
      { label: "High", value: "High" },
      { label: "Urgent", value: "Urgent" }
    ], defaultValue: "Medium" } },
    { key: "status", label: "Status", type: "DROPDOWN", required: true, order: 5, config: { options: [
      { label: "Draft", value: "Draft" },
      { label: "Submitted", value: "Submitted" },
      { label: "Approved", value: "Approved" },
      { label: "Rejected", value: "Rejected" },
      { label: "Completed", value: "Completed" }
    ], defaultValue: "Draft" } },
    { key: "description", label: "Deskripsi Lengkap", type: "TEXTAREA", required: true, order: 40 },
    { key: "attachment", label: "Lampiran", type: "ATTACHMENT", required: false, order: 45 },
    { key: "messages", label: "Percakapan Tiket", type: "TABLE", required: false, order: 50, config: { childDocTypeKey: "ticket_message" } },
  ];

  for (const f of supportTicketFields) {
    const configValue: Prisma.InputJsonValue | undefined = f.config ? (f.config as unknown as Prisma.InputJsonValue) : undefined;
    await prisma.docField.upsert({
      where: { docTypeId_key: { docTypeId: supportTicket.id, key: f.key } },
      update: { label: f.label, type: f.type, required: !!f.required, order: f.order, config: configValue },
      create: { docTypeId: supportTicket.id, key: f.key, label: f.label, type: f.type, required: !!f.required, order: f.order, config: configValue },
    });
  }

  const ticketMessageFields: Array<{ key: string; label: string; type: FieldType; required?: boolean; order: number }> = [
    { key: "message", label: "Pesan", type: "TEXTAREA", required: true, order: 10 },
    { key: "sender_name", label: "Pengirim", type: "TEXT", required: false, order: 20 },
    { key: "attachment", label: "Lampiran", type: "ATTACHMENT", required: false, order: 30 },
  ];

  for (const f of ticketMessageFields) {
    await prisma.docField.upsert({
      where: { docTypeId_key: { docTypeId: ticketMessage.id, key: f.key } },
      update: { label: f.label, type: f.type, required: !!f.required, order: f.order },
      create: { docTypeId: ticketMessage.id, key: f.key, label: f.label, type: f.type, required: !!f.required, order: f.order },
    });
  }

  // Permissions for Visitor Request & Support Ticket
  const visitTicketDocTypes = [visitorRequest, visitorRequestItem, supportTicket, ticketMessage];
  if (adminRole) {
    for (const dt of visitTicketDocTypes) {
      await prisma.docPermission.upsert({
        where: { docTypeId_roleId: { roleId: adminRole.id, docTypeId: dt.id } },
        update: { canCreate: true, canRead: true, canWrite: true, canDelete: true },
        create: { roleId: adminRole.id, docTypeId: dt.id, canCreate: true, canRead: true, canWrite: true, canDelete: true },
      });
    }
  }
  if (customerRole) {
    for (const dt of visitTicketDocTypes) {
      await prisma.docPermission.upsert({
        where: { docTypeId_roleId: { roleId: customerRole.id, docTypeId: dt.id } },
        update: { canCreate: true, canRead: true, canWrite: true, canDelete: true },
        create: { roleId: customerRole.id, docTypeId: dt.id, canCreate: true, canRead: true, canWrite: true, canDelete: true },
      });
    }
  }

  // --- Product Groups ---
  const productGroups = [
    { name: "Additional Accessories", description: "peralatan pelengkap dan penunjang" },
    { name: "Additional Power", description: "Increate power to rack on datacenter" },
    { name: "Additional Rack", description: "Rack additional request" },
    { name: "Additional Services", description: "Layanan tambahan buat pelanggan data center" },
    { name: "Connectivity Services", description: "Layanan pendukung konektivitas" },
    { name: "Smart Hands", description: "Layanan pendukung untuk data center" },
  ];
  for (const g of productGroups) {
    const existing = await prisma.productGroup.findFirst({ where: { name: g.name, branchId: branch.id } });
    if (existing) {
      await prisma.productGroup.update({ where: { id: existing.id }, data: { description: g.description } });
    } else {
      await prisma.productGroup.create({ data: { name: g.name, description: g.description, branchId: branch.id } });
    }
  }

  // --- Sample Products ---
  const groupMap: Record<string, string> = {};
  for (const g of productGroups) {
    const rec = await prisma.productGroup.findFirst({ where: { name: g.name, branchId: branch.id } });
    if (rec) groupMap[g.name] = rec.id;
  }

  const sampleProducts = [
    { name: "Visual Inspection", classification: "ONETIME" as const, orderMode: "REQUEST" as const, group: "Smart Hands", description: "1 Request = 1 Rack\nPerform a visual inspection of the device (LED indicators, cables, and panels).\nSend photos/videos of the device condition as requested by the customer." },
    { name: "Soft Reboot", classification: "ONETIME" as const, orderMode: "REQUEST" as const, group: "Smart Hands", description: "1 Request = 1 Device\nLogin and procedure are provided and reset after work completion by customer" },
    { name: "Additional Power", classification: "ONETIME" as const, orderMode: "REQUEST" as const, group: "Additional Power", description: "Increate power to rack selected" },
    { name: "Black Panel", classification: "ONETIME" as const, orderMode: "DIRECT" as const, group: "Additional Accessories", description: null },
    { name: "CCTV", classification: "ONETIME" as const, orderMode: "DIRECT" as const, group: "Additional Accessories", description: null },
    { name: "Network Connector", classification: "ONETIME" as const, orderMode: "DIRECT" as const, group: "Additional Accessories", description: null },
    { name: "rPDU", classification: "ONETIME" as const, orderMode: "DIRECT" as const, group: "Additional Accessories", description: null },
    { name: "TakeOf Box", classification: "ONETIME" as const, orderMode: "DIRECT" as const, group: "Additional Accessories", description: null },
    { name: "Product Recuring", classification: "RECURRING" as const, orderMode: "DIRECT" as const, group: "Additional Accessories", description: null },
    { name: "Additional Rack", classification: "RECURRING" as const, orderMode: "REQUEST" as const, group: "Additional Rack", description: null },
    { name: "Cross Connect", classification: "RECURRING" as const, orderMode: "REQUEST" as const, group: "Connectivity Services", description: null },
    { name: "Component Replacement", classification: "ONETIME" as const, orderMode: "REQUEST" as const, group: "Smart Hands", description: null },
    { name: "Hard Reboot", classification: "ONETIME" as const, orderMode: "REQUEST" as const, group: "Smart Hands", description: null },
    { name: "Remote Assistance", classification: "ONETIME" as const, orderMode: "REQUEST" as const, group: "Smart Hands", description: null },
  ];

  for (const p of sampleProducts) {
    const existing = await prisma.product.findFirst({ where: { name: p.name, branchId: branch.id } });
    if (!existing) {
      await prisma.product.create({
        data: {
          name: p.name,
          branchId: branch.id,
          groupId: groupMap[p.group] ?? null,
          classification: p.classification,
          orderMode: p.orderMode,
          description: p.description,
          active: true,
        },
      });
    }
  }

  // --- Building / Floor / Room sample data ---
  const jbBranch = await prisma.branch.findUnique({ where: { code: "HQ" } });
  const cbBranch = await prisma.branch.findUnique({ where: { code: "POP-1" } });

  const buildingJB = jbBranch ? await prisma.building.upsert({
    where: { id: "cml5y51p8000oairnbfuf1b0a" },
    update: { name: "JB Building 1" },
    create: { id: "cml5y51p8000oairnbfuf1b0a", name: "JB Building 1", branchId: jbBranch.id },
  }) : null;

  const buildingCB = cbBranch ? await prisma.building.upsert({
    where: { id: "cml5y5aj9000pairn0inrthyf" },
    update: { name: "CB Building 1" },
    create: { id: "cml5y5aj9000pairn0inrthyf", name: "CB Building 1", branchId: cbBranch.id },
  }) : null;

  const floorJB = buildingJB ? await prisma.floor.upsert({
    where: { id: "cmnebejlu0000zorn14oe6m0y" },
    update: { name: "Lantai 1" },
    create: { id: "cmnebejlu0000zorn14oe6m0y", name: "Lantai 1", level: 1, buildingId: buildingJB.id },
  }) : null;

  const floorCB = buildingCB ? await prisma.floor.upsert({
    where: { id: "cmmu1rnex0000x1rn8eu3fcbk" },
    update: { name: "Lantai 1" },
    create: { id: "cmmu1rnex0000x1rn8eu3fcbk", name: "Lantai 1", level: 1, buildingId: buildingCB.id },
  }) : null;

  if (floorJB) {
    await prisma.room.upsert({
      where: { id: "cmnebejmw0001zornlkqfib2e" },
      update: {},
      create: { id: "cmnebejmw0001zornlkqfib2e", name: "Data Center Room A", floorId: floorJB.id },
    });
  }
  if (floorCB) {
    await prisma.room.upsert({
      where: { id: "cmmu1sbet0001x1rnvy2fi2pe" },
      update: {},
      create: { id: "cmmu1sbet0001x1rnvy2fi2pe", name: "MMR", floorId: floorCB.id },
    });
  }

  // Update existing Floor records that may lack a name
  await prisma.$executeRawUnsafe('UPDATE `Floor` SET `name` = CONCAT("Lantai ", `level`) WHERE `name` = "Lantai" OR `name` = ""');
}

run()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async () => {
    await prisma.$disconnect();
    process.exit(1);
  });