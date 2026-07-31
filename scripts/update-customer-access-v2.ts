import * as fs from "fs";
import * as path from "path";

function updateCustomerEditPage() {
  const filePath = path.join(process.cwd(), "src/app/admin/customers/[id]/edit/page.tsx");
  let file = fs.readFileSync(filePath, "utf-8");

  // Fix generateAccessCard
  const oldGenActionRegex = /async function generateAccessCard\(formData: FormData\) \{[\s\S]*?\n\}/;
  const newGenAction = `async function generateAccessCard(formData: FormData) {
  "use server";
  const session = await getServerSession(authOptions);
  const emailSession = session?.user?.email ?? "";
  const meSession = emailSession ? await prisma.user.findUnique({ where: { email: emailSession }, include: { role: { include: { permissions: { include: { permission: true } } } } } }) : null;
  const permSession = new Set((meSession?.role?.permissions ?? []).map((rp) => rp.permission.key));
  if (!permSession.has("CUSTOMER_MANAGEMENT")) return;

  const id = String(formData.get("id"));
  const companyId = String(formData.get("companyId") || "");
  if (!id) return;

  let dt = await prisma.docType.findUnique({ where: { key: "access_card" } });
  if (!dt) {
    dt = await prisma.docType.create({
      data: {
        key: "access_card",
        name: "Access Card",
      }
    });
  }

  const allCards = await prisma.docRecord.findMany({
    where: { docTypeId: dt.id }
  });
  const exist = allCards.find((r) => {
    const d = (r.data ?? {}) as Record<string, any>;
    return d.user_id === id;
  });

  if (exist) {
    const curData = (exist.data ?? {}) as Record<string, any>;
    const token = curData.qr_token || crypto.randomUUID();
    await prisma.docRecord.update({
      where: { id: exist.id },
      data: {
        status: "active",
        data: {
          ...curData,
          user_id: id,
          customer_id: companyId || curData.customer_id || "",
          qr_token: token,
        } as any
      }
    });
  } else {
    const token = crypto.randomUUID();
    const qrData = {
      user_id: id,
      customer_id: companyId || "",
      qr_token: token,
    };
    await prisma.docRecord.create({
      data: {
        docTypeId: dt.id,
        code: \`AC-\${id.substring(0,6).toUpperCase()}\`,
        status: "active",
        data: qrData as any,
        createdById: meSession?.id,
      }
    });
  }
  revalidatePath(\`/admin/customers/\${id}/edit\`);
}`;
  file = file.replace(oldGenActionRegex, newGenAction);

  // Fix accessCardRecord fetch on page load
  const oldFetchRegex = /const accessCardDt = await prisma\.docType\.findUnique\(\{ where: \{ key: "access_card" \} \}\);\s*const accessCardRecord = accessCardDt \? await prisma\.docRecord\.findFirst\([\s\S]*?\} \}\) : null;/;
  const newFetch = `const accessCardDt = await prisma.docType.findUnique({ where: { key: "access_card" } });
  const allAccessCards = accessCardDt ? await prisma.docRecord.findMany({
    where: { docTypeId: accessCardDt.id }
  }) : [];
  const accessCardRecord = allAccessCards.find((r) => {
    const d = (r.data ?? {}) as Record<string, any>;
    return d.user_id === customer.id;
  }) || null;`;
  file = file.replace(oldFetchRegex, newFetch);

  // Fix payload construction
  const oldPayloadRegex = /if \(accessCardRecord && accessCardRecord\.status === "active"\) \{[\s\S]*?\}\n  \}/;
  const newPayload = `if (accessCardRecord && accessCardRecord.status === "active") {
    const data = (accessCardRecord.data ?? {}) as Record<string, any>;
    const token = data.qr_token;
    if (token) {
      const payload = {
        docType: "access_card",
        token: token,
        customerId: data.customer_id || "",
        userId: customer.id
      };
      qrDataUrl = await QRCode.toDataURL(JSON.stringify(payload), {
        width: 300,
        margin: 2,
        color: { dark: "#000000", light: "#ffffff" }
      });
    }
  }`;
  file = file.replace(oldPayloadRegex, newPayload);

  fs.writeFileSync(filePath, file);
}

function updateQR() {
  const filePath = path.join(process.cwd(), "src/lib/qr.ts");
  let file = fs.readFileSync(filePath, "utf-8");

  // Remove take: 1000 limit in findMany
  file = file.replace(
    /take: 1000,\n/g,
    ""
  );

  fs.writeFileSync(filePath, file);
}

updateCustomerEditPage();
updateQR();
