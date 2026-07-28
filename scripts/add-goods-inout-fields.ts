/**
 * Migration: Add Goods In/Out Implementation & Inventory Monitoring Fields
 *
 * Adds/updates fields to goods_in_item and goods_out_item DocTypes:
 * - type_of_material: TEXT -> DROPDOWN (10 predefined options)
 * - building_id: NEW DROPDOWN (filter: branch_id)
 * - floor_id: NEW DROPDOWN (filter: building_id)
 * - room_id: NEW DROPDOWN (filter: floor_id)
 * - owner_customer_id: NEW TEXT (auto-filled from session)
 *
 * Usage:
 *   npx tsx scripts/add-goods-inout-fields.ts
 *   npx tsx scripts/add-goods-inout-fields.ts --rollback
 *
 * Safe to run multiple times (idempotent).
 */

import "dotenv/config";
import { prisma } from "../src/lib/prisma";

const TYPE_OF_MATERIAL_OPTIONS = {
  options: [
    { label: "Fiber Optic", value: "Fiber Optic" },
    { label: "UTP Cable", value: "UTP Cable" },
    { label: "Coaxial Cable", value: "Coaxial Cable" },
    { label: "Connector", value: "Connector" },
    { label: "Patch Panel", value: "Patch Panel" },
    { label: "Rack", value: "Rack" },
    { label: "Switch", value: "Switch" },
    { label: "Router", value: "Router" },
    { label: "Power Cable", value: "Power Cable" },
    { label: "Other", value: "Other" },
  ],
};

const FIELD_DEFINITIONS = {
  type_of_material: {
    label: "Type Of Material",
    type: "DROPDOWN" as const,
    required: true,
    order: 1,
    config: TYPE_OF_MATERIAL_OPTIONS,
  },
  building_id: {
    label: "Gedung",
    type: "DROPDOWN" as const,
    required: true,
    order: 6,
    config: {
      source: {
        table: "Building",
        labelField: "name",
        valueField: "id",
        filter: { dependsOn: "branch_id", field: "branchId" },
      },
    },
  },
  floor_id: {
    label: "Lantai",
    type: "DROPDOWN" as const,
    required: true,
    order: 7,
    config: {
      source: {
        table: "Floor",
        labelField: "name",
        valueField: "id",
        filter: { dependsOn: "building_id", field: "buildingId" },
      },
    },
  },
  room_id: {
    label: "Ruangan",
    type: "DROPDOWN" as const,
    required: true,
    order: 8,
    config: {
      source: {
        table: "Room",
        labelField: "name",
        valueField: "id",
        filter: { dependsOn: "floor_id", field: "floorId" },
      },
    },
  },
  owner_customer_id: {
    label: "Customer Pemilik",
    type: "TEXT" as const,
    required: false,
    order: 9,
    config: null,
  },
};

const DOC_TYPE_KEYS = ["goods_in_item", "goods_out_item"] as const;

async function applyMigration() {
  console.log("🚀 Starting migration: Goods In/Out fields...\n");

  for (const docTypeKey of DOC_TYPE_KEYS) {
    console.log(`📦 Processing DocType: ${docTypeKey}`);

    const docType = await prisma.docType.findUnique({
      where: { key: docTypeKey },
    });

    if (!docType) {
      console.log(`   ⚠️  DocType '${docTypeKey}' not found, skipping\n`);
      continue;
    }

    for (const [fieldKey, def] of Object.entries(FIELD_DEFINITIONS)) {
      const existing = await prisma.docField.findUnique({
        where: { docTypeId_key: { docTypeId: docType.id, key: fieldKey } },
      });

      if (existing) {
        await prisma.docField.update({
          where: { id: existing.id },
          data: {
            label: def.label,
            type: def.type,
            required: def.required,
            order: def.order,
            config: def.config as any,
          },
        });
        console.log(`   ✓ Updated: ${fieldKey} (${def.type})`);
      } else {
        await prisma.docField.create({
          data: {
            docTypeId: docType.id,
            key: fieldKey,
            label: def.label,
            type: def.type,
            required: def.required,
            order: def.order,
            config: def.config as any,
          },
        });
        console.log(`   ✓ Created: ${fieldKey} (${def.type})`);
      }
    }
    console.log();
  }

  console.log("✅ Migration completed successfully!\n");
}

async function rollbackMigration() {
  console.log("⏪ Starting rollback: Goods In/Out fields...\n");

  for (const docTypeKey of DOC_TYPE_KEYS) {
    console.log(`📦 Processing DocType: ${docTypeKey}`);

    const docType = await prisma.docType.findUnique({
      where: { key: docTypeKey },
    });

    if (!docType) {
      console.log(`   ⚠️  DocType '${docTypeKey}' not found, skipping\n`);
      continue;
    }

    // Revert type_of_material to TEXT
    const tomField = await prisma.docField.findUnique({
      where: { docTypeId_key: { docTypeId: docType.id, key: "type_of_material" } },
    });
    if (tomField) {
      await prisma.docField.update({
        where: { id: tomField.id },
        data: { type: "TEXT", config: null as any },
      });
      console.log(`   ✓ Reverted: type_of_material -> TEXT`);
    }

    // Remove the other fields
    for (const fieldKey of ["building_id", "floor_id", "room_id", "owner_customer_id"]) {
      const existing = await prisma.docField.findUnique({
        where: { docTypeId_key: { docTypeId: docType.id, key: fieldKey } },
      });
      if (existing) {
        await prisma.docField.delete({ where: { id: existing.id } });
        console.log(`   ✓ Removed: ${fieldKey}`);
      }
    }
    console.log();
  }

  console.log("✅ Rollback completed successfully!\n");
}

async function main() {
  const isRollback = process.argv.includes("--rollback");

  try {
    if (isRollback) {
      await rollbackMigration();
    } else {
      await applyMigration();
    }
  } catch (error) {
    console.error("❌ Migration failed:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
