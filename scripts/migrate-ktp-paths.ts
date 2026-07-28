/**
 * Migration: Update KTP file paths to use API route
 *
 * Updates all existing ktp_file paths in the database from
 * `/uploads/doc-attachments/...` to `/api/uploads/doc-attachments/...`
 * to use the new API route handler that works in production.
 *
 * Usage:
 *   npx tsx scripts/migrate-ktp-paths.ts
 */

import "dotenv/config";
import { prisma } from "../src/lib/prisma";

async function migrateDocRecordPaths() {
  // Fetch all and filter in memory (Prisma JSON path queries are limited)
  const records = await prisma.docRecord.findMany();
  let updated = 0;
  for (const record of records) {
    const data = (record.data ?? {}) as Record<string, unknown>;
    if (typeof data["ktp_file"] === "string" && data["ktp_file"].startsWith("/uploads/")) {
      data["ktp_file"] = data["ktp_file"].replace("/uploads/", "/api/uploads/");
      await prisma.docRecord.update({
        where: { id: record.id },
        data: { data: data as any },
      });
      updated++;
    }
  }
  return updated;
}

async function migrateDocRowPaths() {
  const rows = await prisma.docRow.findMany();
  let updated = 0;
  for (const row of rows) {
    const data = (row.data ?? {}) as Record<string, unknown>;
    if (typeof data["ktp_file"] === "string" && data["ktp_file"].startsWith("/uploads/")) {
      data["ktp_file"] = data["ktp_file"].replace("/uploads/", "/api/uploads/");
      await prisma.docRow.update({
        where: { id: row.id },
        data: { data: data as any },
      });
      updated++;
    }
  }
  return updated;
}

async function main() {
  console.log("🚀 Migrating KTP file paths to use API route...\n");

  console.log("  Updating DocRecord...");
  const recCount = await migrateDocRecordPaths();
  console.log(`  ✓ Updated ${recCount} DocRecord(s)`);

  console.log("  Updating DocRow...");
  const rowCount = await migrateDocRowPaths();
  console.log(`  ✓ Updated ${rowCount} DocRow(s)`);

  console.log("\n✅ Migration completed!");
}

main()
  .catch((e) => {
    console.error("❌ Migration failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
