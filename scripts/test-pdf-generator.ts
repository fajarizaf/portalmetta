import "dotenv/config";
import { prisma } from "../src/lib/prisma";
import { generatePDFFromHTML } from "../src/lib/mail";
import { buildDefaultHtml } from "../src/lib/doc-renderer";
import { getDocPreviewData } from "../src/lib/doc-data";

async function testPdf() {
  console.log("Testing PDF Generation...");
  const invoice = await prisma.docRecord.findFirst({
    where: { docType: { key: "invoice" } },
  });

  if (!invoice) {
    console.log("No invoice found, skipping test.");
    return;
  }

  const user = await prisma.user.findFirst();
  if (!user) throw new Error("No user found");

  const preview = await getDocPreviewData("invoice", invoice.id, user.id);
  if (!preview) throw new Error("Failed to get preview data");

  const html = buildDefaultHtml({
    docTypeName: "INVOICE",
    code: preview.record.code || preview.record.id,
    status: preview.record.status || "Draft",
    currency: "IDR",
    grandTotal: preview.grandTotal,
    fields: preview.docType.fields.map((f) => ({ key: f.key, label: f.label, type: f.type })),
    values: preview.values,
    dynamicOptions: preview.dynamicOptions,
    childFields: preview.childFields,
    rows: preview.rows,
    childOptions: preview.childOptions,
    fromCompanyName: "MettaDC Data Center",
    companyLogoUrl: preview.company?.logoUrl || undefined,
    fromCompanyEmail: "billing@mettadc.com",
    fromCompanyPhone: "+62 21 5000 8888",
    toName: preview.customerCompanyName || "Customer",
  });

  const pdfBuffer = await generatePDFFromHTML(html);
  console.log(`✅ PDF generated successfully! Buffer length: ${pdfBuffer.length} bytes.`);
}

testPdf().catch((e) => console.error("PDF test error:", e)).finally(() => prisma.$disconnect());
