
import "dotenv/config";
import { prisma } from "../src/lib/prisma";

async function main() {
  const products = await prisma.product.findMany({ take: 5 });
  const branches = await prisma.branch.findMany({ take: 5 });

  if (products.length === 0 || branches.length === 0) {
    console.log("No products or branches found. Please seed products and branches first.");
    return;
  }

  console.log(`Seeding inventory for ${products.length} products in ${branches.length} branches...`);

  for (const branch of branches) {
    for (const product of products) {
      await prisma.inventory.upsert({
        where: {
          productId_branchId: {
            productId: product.id,
            branchId: branch.id,
          },
        },
        update: {
          quantity: { increment: 10 },
        },
        create: {
          productId: product.id,
          branchId: branch.id,
          quantity: 10,
        },
      });
      console.log(`Added 10 ${product.name} to branch ${branch.name}`);
    }
  }

  console.log("Inventory seeding completed!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
