/**
 * Migration: Update Goods In/Out Request preview templates
 *
 * Replaces the simple preview templates for goods_in_request and
 * goods_out_request with proper, professional templates similar to
 * the sales_order template style.
 *
 * Usage:
 *   npx tsx scripts/update-goods-preview-templates.ts
 */

import "dotenv/config";
import { prisma } from "../src/lib/prisma";
import * as fs from "node:fs";
import * as path from "node:path";

const GOODS_IN_TEMPLATE = fs.readFileSync(
  path.join(__dirname, "..", "prisma", "templates", "goods_in_request_preview.html"),
  "utf-8"
);

const GOODS_OUT_TEMPLATE = fs.readFileSync(
  path.join(__dirname, "..", "prisma", "templates", "goods_out_request_preview.html"),
  "utf-8"
);

const DOC_TYPE_KEYS = [
  { key: "goods_in_request", template: GOODS_IN_TEMPLATE, label: "Goods In Request" },
  { key: "goods_out_request", template: GOODS_OUT_TEMPLATE, label: "Goods Out Request" },
] as const;

async function main() {
  console.log("🚀 Updating preview templates for Goods In/Out Request...\n");

  for (const { key, template, label } of DOC_TYPE_KEYS) {
    const docType = await prisma.docType.findUnique({ where: { key } });
    if (!docType) {
      console.log(`   ⚠️  DocType '${key}' not found, skipping`);
      continue;
    }

    const cfg = (docType.config ?? {}) as Record<string, unknown>;
    cfg.previewTemplate = template;

    await prisma.docType.update({
      where: { id: docType.id },
      data: { config: cfg as any },
    });

    console.log(`   ✓ Updated preview template for ${label} (${key})`);
  }

  console.log("\n✅ Migration completed successfully!");
  console.log("\n📋 Templates updated:");
  console.log("   - goods_in_request: with Sender section, items table, signatures");
  console.log("   - goods_out_request: with Recipient section, items table, signatures");
}

main()
  .catch((e) => {
    console.error("❌ Migration failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
