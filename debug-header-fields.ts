
import { PrismaClient } from "./src/generated/prisma/client"
import { PrismaMariaDb } from "@prisma/adapter-mariadb"
import "dotenv/config"

const adapter = new PrismaMariaDb({
  host: process.env.DATABASE_HOST || "localhost",
  user: process.env.DATABASE_USER || "root",
  password: process.env.DATABASE_PASSWORD || "",
  database: process.env.DATABASE_NAME || "mettadc",
  connectionLimit: 5,
});

const prisma = new PrismaClient({ adapter })

async function main() {
  const dt = await prisma.docType.findUnique({
    where: { key: "quotation" },
    include: { fields: true }
  })
  if (dt) {
    console.log("Fields for quotation:")
    for (const f of dt.fields) {
      console.log(`- ${f.key} (${f.type})`)
    }
  } else {
    console.log("DocType quotation not found")
  }
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect()
  })
