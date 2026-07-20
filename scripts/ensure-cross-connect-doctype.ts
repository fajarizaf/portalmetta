
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import "dotenv/config";

const adapter = new PrismaMariaDb({
  host: process.env.DATABASE_HOST || "127.0.0.1",
  user: process.env.DATABASE_USER || "root",
  password: process.env.DATABASE_PASSWORD || "mysql",
  database: process.env.DATABASE_NAME || "mettadc",
  port: parseInt(process.env.DATABASE_PORT || "3306"),
  connectionLimit: 5,
});

const prisma = new PrismaClient({ log: ["error"], adapter });

async function main() {
  console.log("Setting up Cross Connect DocType...");

  const crossConnectDt = await prisma.docType.upsert({
    where: { key: "cross_connect" },
    update: {
      name: "Cross Connect",
      icon: "Share2",
      config: {
        listFields: ["branch_id", "activation_date", "cross_connect_type", "request_type", "status"],
        filterFields: ["branch_id", "cross_connect_type", "request_type", "status"],
        naming: { mode: "series", pattern: "CC-.YYYY.-.####." },
      }
    },
    create: {
      key: "cross_connect",
      name: "Cross Connect",
      icon: "Share2",
      config: {
        listFields: ["branch_id", "activation_date", "cross_connect_type", "request_type", "status"],
        filterFields: ["branch_id", "cross_connect_type", "request_type", "status"],
        naming: { mode: "series", pattern: "CC-.YYYY.-.####." },
      }
    }
  });

  const fields = [
    { key: "branch_id", label: "Branch", type: "DROPDOWN", required: true, order: 10, config: { source: { table: "Branch", labelField: "name", valueField: "id" } } },
    { key: "activation_date", label: "Activation Date", type: "DATE", required: true, order: 20 },
    { 
      key: "cross_connect_type", 
      label: "Cross Connect Type", 
      type: "DROPDOWN", 
      required: true, 
      order: 30, 
      config: { 
        options: [
          { label: "Fiber Optic", value: "Fiber Optic" },
          { label: "UTP", value: "UTP" }
        ] 
      } 
    },
    { 
      key: "request_type", 
      label: "Request Type", 
      type: "DROPDOWN", 
      required: true, 
      order: 40, 
      config: { 
        options: [
          { label: "New", value: "New" },
          { label: "Terminate", value: "Terminate" }
        ] 
      } 
    },
    { 
      key: "status", 
      label: "Status", 
      type: "DROPDOWN", 
      required: true, 
      order: 45, 
      config: { 
        options: [
          { label: "Active", value: "Active" },
          { label: "Inactive", value: "Inactive" }
        ] 
      } 
    },
    
    // SOURCE GROUP
    { key: "__header_source", label: "SOURCE", type: "TEXT", required: false, order: 50, readOnly: true },
    { 
      key: "source_rack_id", 
      label: "Rack ID", 
      type: "DROPDOWN", 
      required: true, 
      order: 60, 
      config: { 
        source: { 
          key: "master_rack", 
          labelField: "rack_name", 
          valueField: "id",
          filter: { field: "branch_id", dependsOn: "branch_id" }
        } 
      } 
    },
    { 
      key: "source_material", 
      label: "Material", 
      type: "DROPDOWN", 
      required: true, 
      order: 70, 
      config: { 
        source: { 
          mode: "inventory",
          filter: { field: "branch_id", dependsOn: "branch_id" }
        } 
      } 
    },
    { 
      key: "source_connector_type", 
      label: "Connector Type", 
      type: "DROPDOWN", 
      required: true, 
      order: 80, 
      config: { 
        source: { 
          mode: "static_dep", // Handled in API
          filter: { field: "cross_connect_type", dependsOn: "cross_connect_type" }
        } 
      } 
    },

    // DESTINATION GROUP
    { key: "__header_destination", label: "DESTINATION", type: "TEXT", required: false, order: 90, readOnly: true },
    { 
      key: "destination", 
      label: "Destination", 
      type: "DROPDOWN", 
      required: true, 
      order: 100, 
      config: { 
        options: [
          { label: "APJII", value: "APJII" },
          { label: "Open IXP", value: "Open IXP" }
        ] 
      } 
    },
    { key: "destination_rack_id", label: "Rack ID", type: "TEXT", required: true, order: 110 },
    { 
      key: "destination_connector_type", 
      label: "Connector Type", 
      type: "DROPDOWN", 
      required: true, 
      order: 120, 
      config: { 
        source: { 
          mode: "static_dep", // Handled in API
          filter: { field: "cross_connect_type", dependsOn: "cross_connect_type" }
        } 
      } 
    },
  ];

  for (const f of fields) {
    await prisma.docField.upsert({
      where: { docTypeId_key: { docTypeId: crossConnectDt.id, key: f.key } },
      update: { label: f.label, type: f.type as any, required: f.required, order: f.order, config: f.config as any },
      create: { docTypeId: crossConnectDt.id, key: f.key, label: f.label, type: f.type as any, required: f.required, order: f.order, config: f.config as any }
    });
  }

  // Permissions
  const roles = await prisma.role.findMany();
  const adminRole = roles.find(r => r.name === "Admin");
  const customerRole = roles.find(r => r.name === "Customer");

  if (adminRole) {
    await prisma.docPermission.upsert({
      where: { docTypeId_roleId: { docTypeId: crossConnectDt.id, roleId: adminRole.id } },
      update: { canRead: true, canCreate: true, canWrite: true, canDelete: true, canAssign: true },
      create: { docTypeId: crossConnectDt.id, roleId: adminRole.id, canRead: true, canCreate: true, canWrite: true, canDelete: true, canAssign: true }
    });
  }

  if (customerRole) {
    await prisma.docPermission.upsert({
      where: { docTypeId_roleId: { docTypeId: crossConnectDt.id, roleId: customerRole.id } },
      update: { canRead: true, canCreate: true, canWrite: true, canDelete: false, canAssign: false },
      create: { docTypeId: crossConnectDt.id, roleId: customerRole.id, canRead: true, canCreate: true, canWrite: true, canDelete: false, canAssign: false }
    });
  }

  // --- Product Group and Product ---
  console.log("Setting up Product Group and Product...");
  const branch = await prisma.branch.findFirst();
  if (!branch) {
    console.error("No branch found for product setup");
    return;
  }

  const productGroup = await prisma.productGroup.upsert({
    where: { id: "connectivity_services" },
    update: { name: "Connectivity Services", branchId: branch.id },
    create: { id: "connectivity_services", name: "Connectivity Services", branchId: branch.id }
  });

  const product = await prisma.product.upsert({
    where: { id: "prod_cross_connect" },
    update: { 
      name: "Cross Connect", 
      branchId: branch.id, 
      groupId: productGroup.id,
      classification: "RECURRING",
      active: true
    },
    create: { 
      id: "prod_cross_connect", 
      name: "Cross Connect", 
      branchId: branch.id, 
      groupId: productGroup.id,
      classification: "RECURRING",
      active: true
    }
  });

  await prisma.productPrice.upsert({
    where: { id: "price_cross_connect" },
    update: {
      productId: product.id,
      currency: "IDR",
      setupFee: 500000, // NRC
      basePrice: 1000000, // MRC
      pricingModel: "FIXED"
    },
    create: {
      id: "price_cross_connect",
      productId: product.id,
      currency: "IDR",
      setupFee: 500000, // NRC
      basePrice: 1000000, // MRC
      pricingModel: "FIXED"
    }
  });

  // --- Product Spec Fields ---
  console.log("Setting up Product Spec Fields...");
  const specFields = [
    { key: "activation_date", label: "Activation Date", type: "DATE", required: true },
    { 
      key: "cross_connect_type", 
      label: "Cross Connect Type", 
      type: "DROPDOWN", 
      required: true,
      config: { 
        options: [
          { label: "Fiber Optic", value: "Fiber Optic" },
          { label: "UTP", value: "UTP" }
        ] 
      }
    },
    { 
      key: "request_type", 
      label: "Request Type", 
      type: "DROPDOWN", 
      required: true,
      config: { 
        options: [
          { label: "New", value: "New" },
          { label: "Terminate", value: "Terminate" }
        ] 
      }
    },
    { 
      key: "status", 
      label: "Status", 
      type: "DROPDOWN", 
      required: true,
      config: { 
        options: [
          { label: "Active", value: "Active" },
          { label: "Inactive", value: "Inactive" }
        ] 
      }
    },
    { 
      key: "source_rack_id", 
      label: "Rack ID (Source)", 
      type: "DROPDOWN", 
      required: true,
      config: { 
        source: { 
          key: "master_rack", 
          labelField: "rack_name", 
          valueField: "id"
        } 
      }
    },
    { 
      key: "source_material", 
      label: "Material (Source)", 
      type: "DROPDOWN", 
      required: true,
      config: { 
        source: { 
          mode: "inventory"
        } 
      }
    },
    { 
      key: "source_connector_type", 
      label: "Connector Type (Source)", 
      type: "DROPDOWN", 
      required: true,
      config: { 
        source: { 
          mode: "static_dep",
          filter: { field: "cross_connect_type", dependsOn: "cross_connect_type" }
        } 
      }
    },
    { 
      key: "destination", 
      label: "Destination", 
      type: "DROPDOWN", 
      required: true,
      config: { 
        options: [
          { label: "APJII", value: "APJII" },
          { label: "Open IXP", value: "Open IXP" }
        ] 
      }
    },
    { key: "destination_rack_id", label: "Rack ID (Destination)", type: "TEXT", required: true },
    { 
      key: "destination_connector_type", 
      label: "Connector Type (Destination)", 
      type: "DROPDOWN", 
      required: true,
      config: { 
        source: { 
          mode: "static_dep",
          filter: { field: "cross_connect_type", dependsOn: "cross_connect_type" }
        } 
      }
    },
  ];

  for (const sf of specFields) {
    await prisma.productSpecField.upsert({
      where: { productId_key: { productId: product.id, key: sf.key } },
      update: { label: sf.label, type: sf.type as any, required: sf.required, config: sf.config as any },
      create: { productId: product.id, key: sf.key, label: sf.label, type: sf.type as any, required: sf.required, config: sf.config as any }
    });
  }

  console.log("Cross Connect DocType setup completed!");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
