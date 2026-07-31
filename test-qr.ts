import * as dotenv from "dotenv";
dotenv.config();

import { prisma } from "./src/lib/prisma";
import { validateQRToken } from "./src/lib/qr";

async function run() {
  const dt = await prisma.docType.findUnique({ where: { key: "access_card" } });
  if (!dt) return console.log("no dt");

  const rec = await prisma.docRecord.findFirst({ where: { docTypeId: dt.id } });
  if (!rec) return console.log("no rec");

  const token = (rec.data as any).qr_token;
  console.log("Found token:", token);

  try {
    const res = await validateQRToken(token);
    console.log("Validation res:", JSON.stringify(res, null, 2));
  } catch (err) {
    console.error("Validation error:", err);
  }
}

run().catch(console.error).finally(() => process.exit(0));
