import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import "dotenv/config";

type DocFieldSeed = {
  key: string
  label: string
  type: string
  required: boolean
  order: number
  config?: unknown
  readOnly?: boolean
}

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
  console.log("Setting up Rack Mapping DocType...");

  // 1. Ensure master_rack DocType exists
  const rackDt = await prisma.docType.upsert({
    where: { key: "master_rack" },
    update: {
      name: "Master Rack",
      icon: "LayoutGrid",
      config: {
        listFields: ["rack_name", "room_id", "company_id", "status"],
        filterFields: ["branch_id", "building_id", "floor_id", "room_id", "status", "company_id"],
        naming: { mode: "field", field: "rack_name" },
        childDocTypes: {
          patch_panels: "rack_patch_panel",
          hardware: "rack_hardware"
        }
      }
    },
    create: {
      key: "master_rack",
      name: "Master Rack",
      icon: "LayoutGrid",
      config: {
        listFields: ["rack_name", "room_id", "company_id", "status"],
        filterFields: ["branch_id", "building_id", "floor_id", "room_id", "status", "company_id"],
        naming: { mode: "field", field: "rack_name" },
        childDocTypes: {
          patch_panels: "rack_patch_panel",
          hardware: "rack_hardware"
        }
      }
    }
  });

  const fields: DocFieldSeed[] = [
    { 
      key: "branch_id", 
      label: "Branch", 
      type: "DROPDOWN", 
      required: true, 
      order: 10, 
      config: { 
        source: { table: "Branch", labelField: "name", valueField: "id" } 
      } 
    },
    { 
      key: "building_id", 
      label: "Building", 
      type: "DROPDOWN", 
      required: true, 
      order: 20, 
      config: { 
        source: { 
          table: "Building", 
          labelField: "name", 
          valueField: "id",
          filter: { field: "branchId", dependsOn: "branch_id" }
        } 
      } 
    },
    { 
      key: "floor_id", 
      label: "Floor", 
      type: "DROPDOWN", 
      required: true, 
      order: 30, 
      config: { 
        source: { 
          table: "Floor", 
          labelField: "level", 
          valueField: "id",
          filter: { field: "buildingId", dependsOn: "building_id" }
        } 
      } 
    },
    { 
      key: "room_id", 
      label: "Room", 
      type: "DROPDOWN", 
      required: true, 
      order: 40, 
      config: { 
        source: { 
          table: "Room", 
          labelField: "name", 
          valueField: "id",
          filter: { field: "floorId", dependsOn: "floor_id" }
        } 
      } 
    },
    { 
      key: "rack_id", 
      label: "ID Rack", 
      type: "TEXT", 
      required: true, 
      order: 50, 
      readOnly: true 
    },
    { 
      key: "rack_name", 
      label: "Nama Rack", 
      type: "TEXT", 
      required: true, 
      order: 51 
    },
    { 
      key: "status", 
      label: "Status", 
      type: "DROPDOWN", 
      required: true, 
      order: 60, 
      config: { 
        options: [
          { label: "Available", value: "Available" },
          { label: "In Use", value: "In Use" },
          { label: "Maintenance", value: "Maintenance" },
          { label: "Reserved", value: "Reserved" }
        ] 
      } 
    },
    { 
      key: "company_id", 
      label: "Assigned Company", 
      type: "DROPDOWN", 
      required: false, 
      order: 70, 
      config: { 
        source: { table: "Company", labelField: "name", valueField: "id" } 
      } 
    },
    {
      key: "patch_panels",
      label: "Patch Panels",
      type: "TABLE",
      required: false,
      order: 80
    },
    {
      key: "hardware",
      label: "Hardware",
      type: "TABLE",
      required: false,
      order: 90
    }
  ];

  for (const f of fields) {
    await prisma.docField.upsert({
      where: { docTypeId_key: { docTypeId: rackDt.id, key: f.key } },
      update: { label: f.label, type: f.type as any, required: f.required, order: f.order, config: f.config as any },
      create: { docTypeId: rackDt.id, key: f.key, label: f.label, type: f.type as any, required: f.required, order: f.order, config: f.config as any }
    });
  }

  // 2. Ensure rack_patch_panel DocType exists
  const panelDt = await prisma.docType.upsert({
    where: { key: "rack_patch_panel" },
    update: {
      name: "Rack Patch Panel",
      config: {
        listFields: ["patch_panel_number"],
        naming: { mode: "field", field: "patch_panel_number" },
      }
    },
    create: {
      key: "rack_patch_panel",
      name: "Rack Patch Panel",
      config: {
        listFields: ["patch_panel_number"],
        naming: { mode: "field", field: "patch_panel_number" },
      }
    }
  });

  const panelFields: DocFieldSeed[] = [
    { key: "patch_panel_number", label: "Patch Panel Number", type: "TEXT", required: true, order: 10 },
  ];

  for (const f of panelFields) {
    await prisma.docField.upsert({
      where: { docTypeId_key: { docTypeId: panelDt.id, key: f.key } },
      update: { label: f.label, type: f.type as any, required: f.required, order: f.order, config: f.config as any },
      create: { docTypeId: panelDt.id, key: f.key, label: f.label, type: f.type as any, required: f.required, order: f.order, config: f.config as any }
    });
  }

  // Remove obsolete fields for rack_patch_panel if they exist
  await prisma.docField.deleteMany({
    where: {
      docTypeId: panelDt.id,
      key: { in: ["name", "type", "port_count", "u_position", "ports"] }
    }
  });

  // 3. Ensure rack_patch_panel_port is removed (as we only want 1 field now)
  const oldPortDt = await prisma.docType.findUnique({ where: { key: "rack_patch_panel_port" } });
  if (oldPortDt) {
    await prisma.docField.deleteMany({ where: { docTypeId: oldPortDt.id } });
    await prisma.docPermission.deleteMany({ where: { docTypeId: oldPortDt.id } });
    await prisma.docType.delete({ where: { id: oldPortDt.id } });
  }

  // 4. Ensure Admin role has permissions for rack_patch_panel
  const roles = await prisma.role.findMany();
  const adminRole = roles.find(r => r.name === "Admin");
  if (adminRole) {
    // Permissions for Patch Panel
    await prisma.docPermission.upsert({
      where: { docTypeId_roleId: { docTypeId: panelDt.id, roleId: adminRole.id } },
      update: { canRead: true, canCreate: true, canWrite: true, canDelete: true },
      create: { docTypeId: panelDt.id, roleId: adminRole.id, canRead: true, canCreate: true, canWrite: true, canDelete: true }
    });
  }

  // 5. Ensure rack_hardware DocType exists
  const hardwareDt = await prisma.docType.upsert({
    where: { key: "rack_hardware" },
    update: {
      name: "Rack Hardware",
      config: {
        listFields: ["name", "serial_number", "electricity", "weight"],
      }
    },
    create: {
      key: "rack_hardware",
      name: "Rack Hardware",
      config: {
        listFields: ["name", "serial_number", "electricity", "weight"],
      }
    }
  });

  const hardwareFields: DocFieldSeed[] = [
    { key: "name", label: "Nama Hardware", type: "TEXT", required: true, order: 10 },
    { key: "description", label: "Deskripsi", type: "TEXTAREA", required: false, order: 20 },
    { key: "serial_number", label: "Serial Number", type: "TEXT", required: true, order: 30 },
    { key: "electricity", label: "Kebutuhan Listrik (Watt)", type: "NUMBER", required: false, order: 40 },
    { key: "weight", label: "Berat (kg)", type: "NUMBER", required: false, order: 50 },
  ];

  for (const f of hardwareFields) {
    await prisma.docField.upsert({
      where: { docTypeId_key: { docTypeId: hardwareDt.id, key: f.key } },
      update: { label: f.label, type: f.type as any, required: f.required, order: f.order, config: f.config as any },
      create: { docTypeId: hardwareDt.id, key: f.key, label: f.label, type: f.type as any, required: f.required, order: f.order, config: f.config as any }
    });
  }

  // 6. Ensure Admin role has permissions for rack_hardware
  if (adminRole) {
    await prisma.docPermission.upsert({
      where: { docTypeId_roleId: { docTypeId: hardwareDt.id, roleId: adminRole.id } },
      update: { canRead: true, canCreate: true, canWrite: true, canDelete: true },
      create: { docTypeId: hardwareDt.id, roleId: adminRole.id, canRead: true, canCreate: true, canWrite: true, canDelete: true }
    });
  }

  console.log("Rack Mapping setup completed!");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
