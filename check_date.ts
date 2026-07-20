
import { config } from "dotenv";
config();
import { prisma } from "./src/lib/prisma";

async function main() {
  const dt = await prisma.docType.findUnique({ 
    where: { key: "request" }, 
    include: { fields: true } 
  });
  
  console.log("Field Definition:");
  console.log(JSON.stringify(dt?.fields.find(f => f.key === "req_date"), null, 2));

  console.log("\nSample Records:");
  const records = await prisma.docRecord.findMany({
    where: { docType: { key: "request" } },
    take: 5,
    orderBy: { createdAt: 'desc' }
  });

  records.forEach(r => {
    const d = r.data as any;
    console.log(`ID: ${r.id}, req_date: ${d.req_date}`);
  });
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
