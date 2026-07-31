require("dotenv").config();
const { prisma } = require("./src/lib/prisma");
const { validateQRToken } = require("./src/lib/qr");

async function test() {
  console.log("DB Host:", process.env.DATABASE_HOST, "User:", process.env.DATABASE_USER);
  const dt = await prisma.docType.findUnique({ where: { key: "access_card" } });
  console.log("Access card docType:", dt);

  if (dt) {
    const recs = await prisma.docRecord.findMany({ where: { docTypeId: dt.id } });
    console.log("Found access card records:", recs.length);
    for (const r of recs) {
      console.log("Record ID:", r.id, "Data:", r.data);
      if (r.data && r.data.qr_token) {
        const val = await validateQRToken(r.data.qr_token);
        console.log("Validation for token", r.data.qr_token, "=>", JSON.stringify(val, null, 2));
      }
    }
  }
}

test().catch(console.error).finally(() => process.exit(0));
