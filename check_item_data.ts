
import "dotenv/config";
import { prisma } from "@/lib/prisma";

async function main() {
  const items = await prisma.docRecord.findMany({
    where: { docType: { key: "request_item" } },
    take: 1
  });
  if (items.length > 0) {
    console.log("Request Item Data Keys:", Object.keys(items[0].data as any));
    console.log("Request Item Data:", items[0].data);
  } else {
    console.log("No request items found.");
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
