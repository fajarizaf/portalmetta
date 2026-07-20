import { prisma } from "./src/lib/prisma"

async function main() {
  const dt = await prisma.docType.findUnique({ where: { key: "sales_order" } })
  const config = dt?.config as any
  const tpl = config?.previewTemplate
  console.log("Template length:", tpl?.length)
  console.log("Contains {{customer.pic.name}}?", tpl?.includes("{{customer.pic.name}}"))
  console.log("Contains {{ customer.pic.name }}?", tpl?.includes("{{ customer.pic.name }}"))
  
  // Regex check
  const regex = /\{\{\s*customer\.pic\.name\s*\}\}/g
  console.log("Regex match?", regex.test(tpl))
}

main().catch(console.error)
