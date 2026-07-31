import * as dotenv from "dotenv";
dotenv.config();

import { prisma } from "../src/lib/prisma";
import { validateQRToken } from "../src/lib/qr";
import QRCode from "qrcode";
import crypto from "crypto";

async function debugFlow() {
  console.log("=== START DEBUG FLOW ===");

  // 1. Get a user
  const user = await prisma.user.findFirst({
    include: { company: true }
  });
  if (!user) {
    console.error("No user found in DB!");
    return;
  }
  console.log(`Testing with User ID: ${user.id}, Name: ${user.name}, Email: ${user.email}`);

  // 2. Ensure access_card docType exists
  let dt = await prisma.docType.findUnique({ where: { key: "access_card" } });
  if (!dt) {
    console.log("Creating access_card DocType...");
    dt = await prisma.docType.create({
      data: {
        key: "access_card",
        name: "Access Card",
      }
    });
  }
  console.log(`DocType ID: ${dt.id}`);

  // 3. Find or Create access_card DocRecord
  const allCards = await prisma.docRecord.findMany({
    where: { docTypeId: dt.id }
  });
  let record = allCards.find((r) => {
    const d = (r.data ?? {}) as Record<string, any>;
    return d.user_id === user.id;
  });

  const token = crypto.randomUUID();
  if (record) {
    console.log(`Updating existing record ID: ${record.id}`);
    const curData = (record.data ?? {}) as Record<string, any>;
    record = await prisma.docRecord.update({
      where: { id: record.id },
      data: {
        status: "active",
        data: {
          ...curData,
          user_id: user.id,
          customer_id: user.companyId || "",
          qr_token: token,
        } as any
      }
    });
  } else {
    console.log("Creating new access_card record...");
    record = await prisma.docRecord.create({
      data: {
        docTypeId: dt.id,
        code: `AC-${user.id.substring(0, 6).toUpperCase()}`,
        status: "active",
        data: {
          user_id: user.id,
          customer_id: user.companyId || "",
          qr_token: token,
        } as any
      }
    });
  }

  const recData = (record.data ?? {}) as Record<string, any>;
  console.log("Record in DB:", {
    id: record.id,
    code: record.code,
    status: record.status,
    qr_token: recData.qr_token,
    user_id: recData.user_id,
  });

  // 4. Construct payload for QR code
  const payload = {
    docType: "access_card",
    token: recData.qr_token,
    customerId: recData.customer_id || "",
    userId: user.id
  };
  const jsonStr = JSON.stringify(payload);
  console.log("Generated QR Code JSON payload:", jsonStr);

  // 5. Test QR code generation
  const dataUrl = await QRCode.toDataURL(jsonStr);
  console.log("QR Data URL generated successfully, length:", dataUrl.length);

  // 6. Test validateQRToken
  console.log("Testing validateQRToken with token:", recData.qr_token);
  const validation = await validateQRToken(recData.qr_token);
  console.log("Validation Result:", JSON.stringify(validation, null, 2));

  console.log("=== END DEBUG FLOW ===");
}

debugFlow().catch(console.error).finally(() => process.exit(0));
