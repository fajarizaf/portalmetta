import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getDocPreviewData } from "@/lib/doc-data";
import { buildDefaultHtml } from "@/lib/doc-renderer";
import { generatePDFFromHTML } from "@/lib/mail";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { role: { include: { permissions: { include: { permission: true } } } } },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 401 });
    }

    const perm = new Set((user.role?.permissions ?? []).map((rp) => rp.permission.key));
    const isAdmin = perm.has("ADMIN_PANEL_ACCESS");

    // Fetch Invoice Record
    const invoiceDt = await prisma.docType.findUnique({ where: { key: "invoice" } });
    if (!invoiceDt) {
      return NextResponse.json({ error: "Invoice DocType not found" }, { status: 404 });
    }

    const invoice = await prisma.docRecord.findUnique({
      where: { id },
    });

    if (!invoice || invoice.docTypeId !== invoiceDt.id) {
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    }

    // Permission check for customer role
    if (!isAdmin) {
      const d = (invoice.data ?? {}) as Record<string, any>;
      const customerId = String(d.customer_id || d.customer || "");
      const userCompanyId = user.companyId || "";
      const userCompany = userCompanyId
        ? await prisma.company.findUnique({ where: { id: userCompanyId }, select: { parentId: true } })
        : null;

      const allowedCompanyIds = new Set([userCompanyId, userCompany?.parentId].filter(Boolean));
      if (!customerId || !allowedCompanyIds.has(customerId)) {
        return NextResponse.json({ error: "Forbidden: No access to this invoice" }, { status: 403 });
      }
    }

    // Fetch preview data for rendering
    const previewData = await getDocPreviewData("invoice", id, user.id);
    if (!previewData) {
      return NextResponse.json({ error: "Failed to load invoice preview data" }, { status: 500 });
    }

    const fieldsToPass = previewData.docType.fields.map((f) => ({
      key: f.key,
      label: f.label,
      type: f.type,
    }));

    // Build invoice HTML
    const htmlContent = buildDefaultHtml({
      docTypeName: "INVOICE",
      code: previewData.record.code || previewData.record.id,
      status: previewData.record.status || "Draft",
      currency: "IDR",
      grandTotal: previewData.grandTotal,
      fields: fieldsToPass,
      values: previewData.values,
      dynamicOptions: previewData.dynamicOptions,
      childFields: previewData.childFields,
      rows: previewData.rows,
      childOptions: previewData.childOptions,
      fromCompanyName: "MettaDC Data Center",
      companyLogoUrl: previewData.company?.logoUrl || undefined,
      fromCompanyEmail: "billing@mettadc.com",
      fromCompanyPhone: "+62 21 5000 8888",
      toName: previewData.customerCompanyName || previewData.customerPIC?.name || "Customer",
    });

    // Generate PDF Buffer using Puppeteer
    const pdfBuffer = await generatePDFFromHTML(htmlContent);

    const filename = `Invoice_${previewData.record.code || id}.pdf`;

    return new NextResponse(new Uint8Array(pdfBuffer), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="${filename}"`,
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    });
  } catch (error) {
    console.error("Error generating invoice PDF:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Gagal membuat PDF invoice" },
      { status: 500 }
    );
  }
}
