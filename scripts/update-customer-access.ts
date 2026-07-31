import * as fs from "fs";
import * as path from "path";

function run() {
  const filePath = path.join(process.cwd(), "src/app/admin/customers/[id]/edit/page.tsx");
  let file = fs.readFileSync(filePath, "utf-8");

  // 1. Add imports
  if (!file.includes('import QRCode from "qrcode"')) {
    file = file.replace(
      /import bcrypt from "bcryptjs";/,
      `import bcrypt from "bcryptjs";\nimport QRCode from "qrcode";\nimport crypto from "crypto";\nimport { QrCode, PowerOff } from "lucide-react";`
    );
  }

  // 2. Add Server Actions
  if (!file.includes("async function generateAccessCard")) {
    const actionInjectRegex = /async function updateCustomer\(formData: FormData\) \{/;
    const newActions = `
async function generateAccessCard(formData: FormData) {
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
        category: "visit",
      }
    });
  }

  const exist = await prisma.docRecord.findFirst({
    where: { docTypeId: dt.id, data: { path: "$.user_id", equals: id as any } }
  });

  if (exist) {
    await prisma.docRecord.update({
      where: { id: exist.id },
      data: { status: "active" }
    });
  } else {
    const token = crypto.randomUUID();
    const qrData = {
      user_id: id,
      customer_id: companyId,
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
}

async function revokeAccessCard(formData: FormData) {
  "use server";
  const session = await getServerSession(authOptions);
  const emailSession = session?.user?.email ?? "";
  const meSession = emailSession ? await prisma.user.findUnique({ where: { email: emailSession }, include: { role: { include: { permissions: { include: { permission: true } } } } } }) : null;
  const permSession = new Set((meSession?.role?.permissions ?? []).map((rp) => rp.permission.key));
  if (!permSession.has("CUSTOMER_MANAGEMENT")) return;

  const recordId = String(formData.get("recordId"));
  const id = String(formData.get("id"));
  if (!recordId) return;
  await prisma.docRecord.update({
    where: { id: recordId },
    data: { status: "revoked" }
  });
  revalidatePath(\`/admin/customers/\${id}/edit\`);
}
`;
    file = file.replace(actionInjectRegex, newActions + "\nasync function updateCustomer(formData: FormData) {");
  }

  // 3. Fetch Access Card Data
  if (!file.includes("const accessCardDt = await prisma.docType.findUnique")) {
    const dataFetchRegex = /const customer = await prisma.user.findUnique\([\s\S]*?\n\n/m;
    const fetchInjection = `const accessCardDt = await prisma.docType.findUnique({ where: { key: "access_card" } });
  const accessCardRecord = accessCardDt ? await prisma.docRecord.findFirst({
    where: { docTypeId: accessCardDt.id, data: { path: "$.user_id", equals: customer.id as any } }
  }) : null;

  let qrDataUrl = null;
  if (accessCardRecord && accessCardRecord.status === "active") {
    const data = accessCardRecord.data as Record<string, any>;
    const payload = {
      docType: "access_card",
      token: data.qr_token,
      customerId: data.customer_id,
      userId: customer.id
    };
    qrDataUrl = await QRCode.toDataURL(JSON.stringify(payload), {
      width: 300,
      margin: 2,
      color: { dark: "#000000", light: "#ffffff" }
    });
  }\n\n`;
    file = file.replace(dataFetchRegex, (match) => match + fetchInjection);
  }

  // 4. Add Tab Trigger
  if (!file.includes('<TabsTrigger value="access_card"')) {
    const tabTriggerRegex = /<TabsTrigger value="sales_orders"[\s\S]*?<\/TabsTrigger>/;
    file = file.replace(tabTriggerRegex, (match) => match + `\n            <TabsTrigger value="access_card" className="data-[state=active]:bg-slate-900 data-[state=active]:text-white rounded-lg px-4 py-1.5 text-sm font-medium text-slate-600 hover:text-slate-900 transition-all whitespace-nowrap">Access Card</TabsTrigger>`);
  }

  // 5. Add Tab Content
  if (!file.includes('<TabsContent value="access_card">')) {
    const tabContentRegex = /<\/Tabs>\n    <\/div>\n  \);\n\}/;
    const newContent = `
        {/* Access Card */}
        <TabsContent value="access_card">
          <Card className="border-slate-200/60 bg-white">
            <CardHeader className="px-6 py-5 border-b border-slate-100 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base font-semibold text-slate-900">Visit Access Card</CardTitle>
                <p className="text-sm text-slate-400 mt-0.5">Generate a reusable QR code access card for visits.</p>
              </div>
              <Badge variant="outline" className={cn("font-medium", accessCardRecord?.status === "active" ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-slate-100 text-slate-500 border-slate-200")}>
                {accessCardRecord?.status === "active" ? "Active" : accessCardRecord?.status === "revoked" ? "Revoked" : "Not Generated"}
              </Badge>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                <div className="flex-1 w-full max-w-md">
                  {accessCardRecord?.status === "active" && qrDataUrl ? (
                    <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 flex flex-col items-center justify-center text-center">
                      <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-100 mb-6">
                        <img src={qrDataUrl} alt="Access Card QR Code" className="w-48 h-48" />
                      </div>
                      <h4 className="font-semibold text-slate-900 text-lg mb-1">{customer.name}</h4>
                      <p className="text-sm text-slate-500 mb-4">{customer.company?.name || "Independent User"}</p>
                      
                      <form action={revokeAccessCard} className="w-full">
                        <input type="hidden" name="id" value={customer.id} />
                        <input type="hidden" name="recordId" value={accessCardRecord.id} />
                        <Button variant="destructive" type="submit" className="w-full gap-2">
                          <PowerOff className="w-4 h-4" />
                          Revoke Access Card
                        </Button>
                      </form>
                    </div>
                  ) : (
                    <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 flex flex-col items-center justify-center text-center py-16">
                      <div className="w-16 h-16 rounded-full bg-slate-200 flex items-center justify-center mb-4 text-slate-500">
                        <QrCode className="w-8 h-8" />
                      </div>
                      <h4 className="font-semibold text-slate-900 mb-2">No Active Access Card</h4>
                      <p className="text-sm text-slate-500 max-w-xs mx-auto mb-6">Generate a permanent QR code for this customer to use during visits.</p>
                      <form action={generateAccessCard}>
                        <input type="hidden" name="id" value={customer.id} />
                        <input type="hidden" name="companyId" value={customer.companyId || ""} />
                        <Button type="submit" className="bg-slate-900 hover:bg-slate-800 text-white gap-2">
                          <QrCode className="w-4 h-4" />
                          Generate Access Card
                        </Button>
                      </form>
                    </div>
                  )}
                </div>
                <div className="flex-1 bg-blue-50/50 rounded-2xl p-6 border border-blue-100">
                  <h4 className="font-semibold text-blue-900 flex items-center gap-2 mb-4">
                    <FileText className="w-4 h-4" />
                    How it works
                  </h4>
                  <ul className="space-y-3 text-sm text-blue-800">
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-blue-200 flex items-center justify-center shrink-0 mt-0.5 text-xs font-medium">1</div>
                      <p>Generate the access card to provide a permanent QR code.</p>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-blue-200 flex items-center justify-center shrink-0 mt-0.5 text-xs font-medium">2</div>
                      <p>This QR code can be scanned at the security check-in at any time.</p>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-blue-200 flex items-center justify-center shrink-0 mt-0.5 text-xs font-medium">3</div>
                      <p>Unlike regular visitor passes, it does not expire after 24 hours.</p>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-blue-200 flex items-center justify-center shrink-0 mt-0.5 text-xs font-medium">4</div>
                      <p>If the customer is no longer authorized, click "Revoke Access Card" to invalidate the QR code.</p>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
`;
    file = file.replace(tabContentRegex, (match) => newContent + match);
  }

  fs.writeFileSync(filePath, file);
}

run();
