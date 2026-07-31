import * as fs from "fs";
import * as path from "path";

function updateQR() {
  const filePath = path.join(process.cwd(), "src/lib/qr.ts");
  let file = fs.readFileSync(filePath, "utf-8");

  // 1. Update QRValidationResult interface
  file = file.replace(
    /valid: boolean\n  error\?: string\n  record\?: \{/,
    `valid: boolean\n  error?: string\n  isAccessCard?: boolean\n  record?: {`
  );

  // 2. Update validateQRToken
  const oldValidateFnStart = file.indexOf("export async function validateQRToken(token: string): Promise<QRValidationResult> {");
  const oldValidateFnEnd = file.indexOf("  // Merge visitors into data", oldValidateFnStart);
  if (oldValidateFnStart === -1 || oldValidateFnEnd === -1) {
    console.error("Could not find validateQRToken logic in qr.ts");
    return;
  }

  const newLogic = `export async function validateQRToken(token: string): Promise<QRValidationResult> {
  const dtVisitor = await prisma.docType.findUnique({ where: { key: "visitor_request" } })
  const dtAccessCard = await prisma.docType.findUnique({ where: { key: "access_card" } })

  const docTypeIds = []
  if (dtVisitor) docTypeIds.push(dtVisitor.id)
  if (dtAccessCard) docTypeIds.push(dtAccessCard.id)

  const records = await prisma.docRecord.findMany({
    where: { docTypeId: { in: docTypeIds } },
    take: 1000,
  })

  const record = records.find((r) => {
    const data = (r.data ?? {}) as Record<string, unknown>
    return data["qr_token"] === token
  })

  if (!record) {
    return { valid: false, error: "QR code tidak valid" }
  }

  const isAccessCard = dtAccessCard ? record.docTypeId === dtAccessCard.id : false
  const data = (record.data ?? {}) as Record<string, unknown>

  if (!isAccessCard) {
    const expiresAt = typeof data["qr_expires_at"] === "string" ? data["qr_expires_at"] : null
    if (!expiresAt || isQRExpired(expiresAt)) {
      return { valid: false, error: "QR code sudah expired" }
    }
    const recordStatus = (record.status ?? "").toLowerCase()
    if (recordStatus !== "approved") {
      const statusLabel = record.status || "Draft"
      return { valid: false, error: \`Visitor request belum di-approve (status: \${statusLabel})\` }
    }
  } else {
    if (record.status?.toLowerCase() !== "active") {
      return { valid: false, error: "Access card sudah tidak aktif / di-revoke" }
    }
  }

  const visitorRows = await prisma.docRow.findMany({
    where: { recordId: record.id },
    orderBy: { idx: "asc" },
  })
  
  const visitors = isAccessCard ? [] : visitorRows.map((row) => {
    const d = (row.data ?? {}) as Record<string, unknown>
    return {
      visitor_name: String(d["visitor_name"] || "-"),
      nik: String(d["nik"] || "-"),
      phone_number: typeof d["phone_number"] === "string" ? d["phone_number"] : undefined,
      email: typeof d["email"] === "string" ? d["email"] : undefined,
      ktp_file: typeof d["ktp_file"] === "string" ? d["ktp_file"] : undefined,
      notes: typeof d["notes"] === "string" ? d["notes"] : undefined,
    }
  })

`;
  
  file = file.substring(0, oldValidateFnStart) + newLogic + file.substring(oldValidateFnEnd);

  // Update return object to include isAccessCard
  file = file.replace(
    /valid: true,\n    record: \{/,
    `valid: true,\n    isAccessCard,\n    record: {`
  );

  fs.writeFileSync(filePath, file);
}

function updateCheckin() {
  const filePath = path.join(process.cwd(), "src/app/api/visits/checkin/route.ts");
  let file = fs.readFileSync(filePath, "utf-8");

  // Allow access card to check in if checked out
  const blockLogicRegex = /if \(rec\.qrStatus === "checked_in" \|\| rec\.qrStatus === "checked_out"\) \{/;
  file = file.replace(
    blockLogicRegex,
    `if (rec.qrStatus === "checked_in" || (!validation.isAccessCard && rec.qrStatus === "checked_out")) {`
  );
  
  fs.writeFileSync(filePath, file);
}

function updateCheckout() {
  const filePath = path.join(process.cwd(), "src/app/api/visits/checkout/route.ts");
  let file = fs.readFileSync(filePath, "utf-8");

  // Allow access card to check out
  const blockLogicRegex = /if \(rec\.qrStatus === "checked_out" \|\| !rec\.qrStatus\) \{/;
  file = file.replace(
    blockLogicRegex,
    `if (rec.qrStatus === "checked_out" || (!validation.isAccessCard && !rec.qrStatus)) {`
  );

  fs.writeFileSync(filePath, file);
}

updateQR();
updateCheckin();
updateCheckout();
