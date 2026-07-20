import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { DocumentPreview } from "@/components/document-preview"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import type { FieldType } from "@/generated/prisma/enums"
import { getLogoDataUri } from "@/lib/server-utils"
import { getDocPreviewData } from "@/lib/doc-data"
import { prisma } from "@/lib/prisma"

export default async function DocPreviewPage({ params }: { params?: Record<string, string | string[] | undefined> | Promise<Record<string, string | string[] | undefined>> }) {
  const session = await getServerSession(authOptions)
  const email = session?.user?.email ?? ""
  const user = email ? await prisma.user.findUnique({ where: { email }, include: { role: { include: { permissions: { include: { permission: true } } } } } }) : null
  const permGlobal = new Set((user?.role?.permissions ?? []).map((rp) => rp.permission.key))
  if (!permGlobal.has("ADMIN_PANEL_ACCESS") && !permGlobal.has("DOCUMENTS_MANAGEMENT")) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold">Preview Dokumen</h1>
        <p>Anda tidak memiliki akses.</p>
      </div>
    )
  }
  const p = ((await params) ?? {}) as Record<string, string | string[] | undefined>
  const keyRaw = p?.key
  const idRaw = p?.id
  const key = typeof keyRaw === "string" ? keyRaw : Array.isArray(keyRaw) ? keyRaw[0] : ""
  const id = typeof idRaw === "string" ? idRaw : Array.isArray(idRaw) ? idRaw[0] : ""
  if (!key) redirect("/admin/doctypes")
  if (!id) redirect(`/admin/docs/${key}`)
  
  if (!user) redirect("/login")
  
  const data = await getDocPreviewData(key, id, user.id)
  if (!data) redirect(`/admin/docs/${key}`)

  const { docType, record, values, dynamicOptions, childFields, rows, childOptions, grandTotal, company, customerEmail, customerPhoneNumber, customerAddress, customerJobTitle, customerCompanyName, creatorName, creatorEmail, creatorRole, assignedToName, assignedToEmail, assignedToRole, salesManagerName, salesManagerEmail, seriesName, parentSeriesName, grandParentSeriesName, createdDate, parentRecord, grandParentRecord, customerPIC } = data

  const logoDataUri = getLogoDataUri(company?.logoUrl)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Preview Dokumen</h1>
        <Button asChild><Link href={`/admin/docs/${key}/${id}`}>Kembali ke Detail</Link></Button>
      </div>
      <DocumentPreview
        docTypeKey={docType.key}
        docTypeName={docType.name}
        code={record.code ?? record.id}
        status={record.status ?? ""}
        currency={String(values["currency"] ?? "")}
        grandTotal={grandTotal}
        fields={docType.fields.map((f) => ({ key: f.key, label: f.label, type: f.type as FieldType }))}
        values={values}
        dynamicOptions={dynamicOptions}
        childFields={childFields}
        rows={rows}
        childOptions={childOptions}
        defaultTemplate={(docType.config as unknown as Record<string, unknown>)?.["previewTemplate"] as string | undefined}
        companyName={company?.name}
        companyLogoUrl={logoDataUri}
        companyAddress={company?.address ?? undefined}
        companyEmail={company?.companyEmail ?? undefined}
        companyPhoneNumber={company?.companyPhoneNumber ?? undefined}
        customerEmail={customerEmail}
        customerPhoneNumber={customerPhoneNumber}
        customerAddress={customerAddress}
        customerJobTitle={customerJobTitle}
        customerCompanyName={customerCompanyName}
        creatorName={creatorName}
        creatorEmail={creatorEmail}
        creatorRole={creatorRole}
        assignedToName={assignedToName}
        assignedToEmail={assignedToEmail}
        assignedToRole={assignedToRole}
        salesManagerName={salesManagerName}
        salesManagerEmail={salesManagerEmail}
        seriesName={seriesName}
        parentSeriesName={parentSeriesName}
        grandParentSeriesName={grandParentSeriesName}
        createdDate={createdDate}
        parentRecord={parentRecord}
        grandParentRecord={grandParentRecord}
        companyPIC={company?.pic ? {
          name: company.pic.name,
          email: company.pic.email,
          phoneNumber: company.pic.phoneNumber,
          technicalContactName: company.pic.technicalContactName,
          billingContactName: company.pic.billingContactName,
          technicalPhoneNumber: company.pic.technicalPhoneNumber,
          billingPhoneNumber: company.pic.billingPhoneNumber,
          technicalEmail: company.pic.technicalEmail,
          billingEmail: company.pic.billingEmail
        } : null}
        customerPIC={customerPIC ? {
          name: customerPIC.name,
          email: customerPIC.email,
          phoneNumber: customerPIC.phoneNumber,
          technicalContactName: customerPIC.technicalContactName,
          billingContactName: customerPIC.billingContactName,
          technicalPhoneNumber: customerPIC.technicalPhoneNumber,
          billingPhoneNumber: customerPIC.billingPhoneNumber,
          technicalEmail: customerPIC.technicalEmail,
          billingEmail: customerPIC.billingEmail
        } : null}
      />
    </div>
  )
}
