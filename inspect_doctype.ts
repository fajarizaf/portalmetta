
import "dotenv/config"
import { prisma } from "./src/lib/prisma"

async function main() {
  const dt = await prisma.docType.findUnique({ where: { key: "goods_in_request" } })
  console.log(JSON.stringify(dt, null, 2))
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect()
  })
