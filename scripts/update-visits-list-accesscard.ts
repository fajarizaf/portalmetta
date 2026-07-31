import * as fs from "fs";
import * as path from "path";

function updateCheckinAPI() {
  const filePath = path.join(process.cwd(), "src/app/api/visits/checkin/route.ts");
  let file = fs.readFileSync(filePath, "utf-8");

  const oldDataObj = `  const now = new Date().toISOString()
  const updatedData = {
    ...rec.data,
    qr_status: "checked_in",
    check_in_time: now,
  }`;

  const newDataObj = `  const nowObj = new Date()
  const now = nowObj.toISOString()
  const todayStr = \`\${nowObj.getFullYear()}-\${String(nowObj.getMonth() + 1).padStart(2, "0")}-\${String(nowObj.getDate()).padStart(2, "0")}\`

  const updatedData = {
    ...rec.data,
    qr_status: "checked_in",
    check_in_time: now,
    visit_date: validation.isAccessCard ? todayStr : ((rec.data as any)?.visit_date || todayStr),
  }`;

  file = file.replace(oldDataObj, newDataObj);
  fs.writeFileSync(filePath, file);
}

function updateCheckoutAPI() {
  const filePath = path.join(process.cwd(), "src/app/api/visits/checkout/route.ts");
  let file = fs.readFileSync(filePath, "utf-8");

  const oldDataObj = `  const now = new Date().toISOString()
  const updatedData = {
    ...rec.data,
    qr_status: "checked_out",
    check_out_time: now,
  }`;

  const newDataObj = `  const nowObj = new Date()
  const now = nowObj.toISOString()
  const todayStr = \`\${nowObj.getFullYear()}-\${String(nowObj.getMonth() + 1).padStart(2, "0")}-\${String(nowObj.getDate()).padStart(2, "0")}\`

  const updatedData = {
    ...rec.data,
    qr_status: "checked_out",
    check_out_time: now,
    visit_date: validation.isAccessCard ? todayStr : ((rec.data as any)?.visit_date || todayStr),
  }`;

  file = file.replace(oldDataObj, newDataObj);
  fs.writeFileSync(filePath, file);
}

function updateVisitsPage() {
  const filePath = path.join(process.cwd(), "src/app/admin/visits/page.tsx");
  let file = fs.readFileSync(filePath, "utf-8");

  // 1. Fetch both visitor_request AND access_card docTypes
  const oldDtQuery = `  const dt = await prisma.docType.findUnique({ where: { key: "visitor_request" } })
  if (!dt) redirect("/admin")`;

  const newDtQuery = `  const dtVisitor = await prisma.docType.findUnique({ where: { key: "visitor_request" } })
  const dtAccessCard = await prisma.docType.findUnique({ where: { key: "access_card" } })

  const docTypeIds: string[] = []
  if (dtVisitor) docTypeIds.push(dtVisitor.id)
  if (dtAccessCard) docTypeIds.push(dtAccessCard.id)

  if (docTypeIds.length === 0) redirect("/admin")`;

  file = file.replace(oldDtQuery, newDtQuery);

  // 2. Fetch docRecords with docTypeId in docTypeIds
  file = file.replace(
    `where: { docTypeId: dt.id },`,
    `where: { docTypeId: { in: docTypeIds } },`
  );

  // 3. Fetch User map for resolving Access Card holder names
  const userMapFetch = `
  const users = await prisma.user.findMany({ include: { company: true } });
  const userMap = Object.fromEntries(users.map((u) => [u.id, u]));
`;
  file = file.replace(
    `const totalCount = records.length`,
    userMapFetch + `\n  const totalCount = records.length`
  );

  // 4. Update filtering logic for access_card
  const oldFilterRegex = /const filtered = records\.filter\(\(r\) => \{[\s\S]*?\n  \}\)/;
  const newFilter = `const filtered = records.filter((r) => {
    const data = (r.data ?? {}) as Record<string, unknown>
    const isAccess = dtAccessCard && r.docTypeId === dtAccessCard.id
    const visitDate = typeof data["visit_date"] === "string" ? data["visit_date"] : null

    if (isAccess) {
      if (!visitDate && !data["qr_status"]) return false;
      if (visitDate) return visitDate >= todayStr && visitDate <= weekLaterStr;
      return true;
    }

    if (!visitDate) return false
    return visitDate >= todayStr && visitDate <= weekLaterStr
  })`;
  file = file.replace(oldFilterRegex, newFilter);

  // 5. Update item rendering in map to handle access_card
  const oldItemRenderRegex = /const data = \(r\.data \?\? \{\}\) as Record<string, unknown>[\s\S]*?const ownerCustomer = String\(data\["owner_customer_id"\] \|\| "-"\)/;

  const newItemRender = `const data = (r.data ?? {}) as Record<string, unknown>
              const isAccess = dtAccessCard && r.docTypeId === dtAccessCard.id
              const rows = Array.isArray(r.rows) ? r.rows : []

              let visitorName = "-"
              let visitorNik = "-"
              let visitorPhone = "-"
              let ownerCustomer = String(data["owner_customer_id"] || data["customer"] || "-")

              if (isAccess) {
                const userId = data["user_id"] as string
                if (userId && userMap[userId]) {
                  const u = userMap[userId]
                  visitorName = u.name || u.email
                  visitorPhone = u.phoneNumber || "-"
                  ownerCustomer = u.company?.name || "Access Card Holder"
                } else {
                  visitorName = "Access Card Holder"
                }
              } else {
                const firstVisitorRow = rows.length > 0 ? (rows[0].data ?? {}) as Record<string, unknown> : null
                visitorName = firstVisitorRow ? String(firstVisitorRow["visitor_name"] || "N/A") : "N/A"
                visitorNik = firstVisitorRow ? String(firstVisitorRow["nik"] || "-") : "-"
                visitorPhone = firstVisitorRow ? String(firstVisitorRow["phone_number"] || "-") : "-"
              }

              const purpose = isAccess ? "Access Card Visit" : String(data["purpose"] || "-")
              const visitDate = String(data["visit_date"] || (isAccess ? "Permanent" : "-"))`;

  file = file.replace(oldItemRenderRegex, newItemRender);

  // 6. Update Link href for access_card item
  file = file.replace(
    `href={\`/admin/docs/visitor_request/\${r.id}\`}`,
    `href={isAccess ? \`/admin/customers/\${data["user_id"] || ""}/edit\` : \`/admin/docs/visitor_request/\${r.id}\`}`
  );

  // 7. Add Badge for Access Card in visit card
  const oldBadgeLine = `{docStatusBadge(r.status ?? "Draft")}`;
  const newBadgeLine = `{isAccess ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium border bg-blue-50 text-blue-700 border-blue-200/60">
                            <QrCode className="h-3 w-3" /> Access Card
                          </span>
                        ) : docStatusBadge(r.status ?? "Draft")}`;
  file = file.replace(oldBadgeLine, newBadgeLine);

  fs.writeFileSync(filePath, file);
}

updateCheckinAPI();
updateCheckoutAPI();
updateVisitsPage();
