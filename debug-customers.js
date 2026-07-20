
const { PrismaClient } = require('./src/generated/prisma');
const prisma = new PrismaClient();

async function main() {
  try {
    const companies = await prisma.company.findMany({
      include: {
        customers: true
      }
    });

    console.log("Found companies:", companies.length);
    for (const c of companies) {
      console.log(`Company: ${c.name} (ID: ${c.id})`);
      console.log(`  Customers count: ${c.customers.length}`);
      if (c.customers.length > 0) {
        console.log(`  First customer: ${c.customers[0].email} (CompanyID: ${c.customers[0].companyId})`);
      }
    }
    
    // Also check users to see if they have companyId
    const usersWithCompany = await prisma.user.findMany({
        where: {
            companyId: { not: null }
        },
        take: 5
    });
    console.log("\nUsers with companyId:", usersWithCompany.length);
    for(const u of usersWithCompany) {
        console.log(`User: ${u.email}, CompanyID: ${u.companyId}`);
    }

  } catch (e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
}

main();
