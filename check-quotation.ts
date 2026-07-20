
import { prisma } from "@/lib/prisma"

async function main() {
  const dt = await prisma.docType.findUnique({
    where: { key: "quotation" },
    include: { fields: true }
  })
  if (!dt) {
    console.log("Quotation doctype not found")
    return
  }
  const targets = ["date", "valid_until", "payment_terms", "tanggal", "berlaku_sampai", "term_of_payment"]
  const fields = dt.fields.filter(f => 
    targets.includes(f.key) || 
    targets.some(t => f.label?.toLowerCase().includes(t)) ||
    f.required
  )
  
  console.log("All fields:", dt.fields.map(f => ({ key: f.key, label: f.label, required: f.required, type: f.type })))
}

main()
