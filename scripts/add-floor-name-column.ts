/**
 * Migration: Add Floor.name column to production database
 *
 * The Floor table in production doesn't have a `name` column.
 * The Prisma schema defines `name String` as required, but the
 * production database (from dump) doesn't have this column.
 *
 * This script:
 * 1. Checks if Floor.name column exists
 * 2. If not, adds it with default value CONCAT('Lantai ', level)
 * 3. Populates existing rows with the default value
 *
 * Usage:
 *   npx tsx scripts/add-floor-name-column.ts
 */

import "dotenv/config";
import { prisma } from "../src/lib/prisma";

async function main() {
  console.log("🚀 Checking Floor.name column...\n");

  // Check if column exists
  const columns = await prisma.$queryRawUnsafe<Array<{ COLUMN_NAME: string }>>(
    `SELECT COLUMN_NAME FROM information_schema.COLUMNS 
     WHERE TABLE_SCHEMA = DATABASE() 
     AND TABLE_NAME = 'Floor' 
     AND COLUMN_NAME = 'name'`
  );

  if (columns.length > 0) {
    console.log("✅ Floor.name column already exists. Nothing to do.\n");
    return;
  }

  console.log("⚠️  Floor.name column NOT found. Adding it now...\n");

  // Add column (initially nullable, we'll populate then make required)
  await prisma.$executeRawUnsafe(
    `ALTER TABLE \`Floor\` ADD COLUMN \`name\` VARCHAR(191) NULL`
  );
  console.log("   ✓ Added Floor.name column (nullable)");

  // Populate existing rows with default value
  const updateResult = await prisma.$executeRawUnsafe(
    `UPDATE \`Floor\` SET \`name\` = CONCAT('Lantai ', \`level\`) WHERE \`name\` IS NULL`
  );
  console.log(`   ✓ Populated ${updateResult} existing rows with default name`);

  // Now make it NOT NULL to match Prisma schema
  await prisma.$executeRawUnsafe(
    `ALTER TABLE \`Floor\` MODIFY COLUMN \`name\` VARCHAR(191) NOT NULL`
  );
  console.log("   ✓ Set Floor.name to NOT NULL");

  console.log("\n✅ Migration completed successfully!\n");
  console.log("📋 Summary:");
  console.log("   - Added Floor.name column");
  console.log("   - Populated existing rows with CONCAT('Lantai ', level)");
  console.log("   - Set NOT NULL constraint to match Prisma schema");
}

main()
  .catch((e) => {
    console.error("❌ Migration failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
