import { prisma } from "../src/lib/prisma";

async function main() {
  const branchName = "JABABEKA";
  const branch = await prisma.branch.findFirst({ where: { name: branchName } });
  if (!branch) {
    console.log(`Branch ${branchName} not found`);
    return;
  }
  const branchId = branch.id;
  const companyId = branch.companyId;

  console.log(`Setting up data for branch: ${branchName} (${branchId})`);

  // 1. Building, Floor, Room
  let building = await prisma.building.findFirst({ where: { branchId } });
  if (!building) {
    building = await prisma.building.create({
      data: { name: "Gedung Utama JABABEKA", branchId }
    });
  }

  let floor = await prisma.floor.findFirst({ where: { buildingId: building.id } });
  if (!floor) {
    floor = await prisma.floor.create({
      data: { name: `Lantai ${1}`, level: 1, buildingId: building.id }
    });
  }

  let room = await prisma.room.findFirst({ where: { floorId: floor.id } });
  if (!room) {
    room = await prisma.room.create({
      data: { name: "Data Center Room A", floorId: floor.id }
    });
  }

  // 2. Master Rack
  const rackDt = await prisma.docType.findUnique({ where: { key: "master_rack" } });
  if (rackDt) {
    const rackKey = "JB-RACK-01";
    // Simplified creation
    try {
      await prisma.docRecord.create({
        data: {
          docTypeId: rackDt.id,
          branchId,
          data: {
            rack_name: rackKey,
            rack_id: rackKey,
            branch_id: branchId,
            building_id: building.id,
            floor_id: floor.id,
            room_id: room.id,
            status: "Available",
            company_id: companyId
          }
        }
      });
      console.log(`Created Rack: ${rackKey}`);
    } catch (e) {
      console.log(`Rack ${rackKey} might already exist or failed to create`);
    }
  }

  // 3. Inventory (Goods In)
  const giDt = await prisma.docType.findUnique({ where: { key: "goods_in_request" } });
  const giiDt = await prisma.docType.findUnique({ where: { key: "goods_in_item" } });

  if (giDt && giiDt) {
    const giRecord = await prisma.docRecord.create({
      data: {
        docTypeId: giDt.id,
        branchId,
        status: "Completed",
        data: {
          reference_no: "REF-DEMO-001",
          date: new Date().toISOString()
        }
      }
    });

    const items = [
      { item_name: "Patch Cord LC-LC 3M", quantity: 50 },
      { item_name: "Connector SC", quantity: 100 },
      { item_name: "UTP Cable Cat6", quantity: 10 }
    ];

    for (const item of items) {
      await prisma.docRow.create({
        data: {
          recordId: giRecord.id,
          childDocTypeId: giiDt.id,
          data: item
        }
      });
    }
    console.log("Created Demo Inventory Items");
  }

  console.log("Setup completed!");
}

main().catch(console.error).finally(() => prisma.$disconnect());
