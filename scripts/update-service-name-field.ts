import "dotenv/config";
import { prisma } from "../src/lib/prisma";

async function main() {
  const subDt = await prisma.docType.findUnique({
    where: { key: "subscription_management" },
    include: { fields: true },
  });

  if (!subDt) {
    console.error("subscription_management DocType not found");
    return;
  }

  const snField = subDt.fields.find((f) => f.key === "service_name");
  if (snField) {
    await prisma.docField.update({
      where: { id: snField.id },
      data: {
        type: "DROPDOWN",
        config: {
          source: {
            table: "Product",
            labelField: "name",
            valueField: "name",
          },
        },
      },
    });
    console.log("✅ Updated service_name docField to DROPDOWN with Product source!");
  } else {
    await prisma.docField.create({
      data: {
        docTypeId: subDt.id,
        key: "service_name",
        label: "Nama Layanan",
        type: "DROPDOWN",
        required: false,
        order: 1.5,
        config: {
          source: {
            table: "Product",
            labelField: "name",
            valueField: "name",
          },
        },
      },
    });
    console.log("✅ Created service_name docField as DROPDOWN with Product source!");
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
