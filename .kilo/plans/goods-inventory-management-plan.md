# Implementation Plan: Goods In/Out & Inventory Monitoring System

## Overview
Extend the existing dynamic DocType system to track physical location (Building → Floor → Room) and customer ownership for inventory items, then build an admin inventory management page.

---

## Step 1: Prisma Schema — Add Location & Ownership to InventoryMovement

**File:** `prisma/schema.prisma`

Add `roomId` and `ownerCustomerId` fields to `InventoryMovement`:

```prisma
model InventoryMovement {
  id               String     @id @default(cuid())
  inventoryId      String
  quantity         Int
  reference        String?
  type             String
  roomId           String?    // Track physical location
  ownerCustomerId  String?    // Track customer ownership (Company.id)
  metadata         Json?      // Additional audit data
  createdAt        DateTime   @default(now())
  inventory        Inventory  @relation(fields: [inventoryId], references: [id])
  room             Room?      @relation(fields: [roomId], references: [id])
  ownerCustomer    Company?   @relation(fields: [ownerCustomerId], references: [id])

  @@index([inventoryId])
  @@index([roomId])
  @@index([ownerCustomerId])
}
```

Also add reverse relations to `Room` and `Company`:

```prisma
model Room {
  ...
  movements        InventoryMovement[]
}

model Company {
  ...
  inventoryMovements InventoryMovement[]
}
```

**Then run:** `npx prisma db push` (or `npx prisma migrate dev`)

---

## Step 2: Seed — Add New Fields to Goods In/Out Item DocTypes

**File:** `prisma/seed.ts` (lines 736-741 for goods_in_item, lines 810-815 for goods_out_item)

### 2a. goods_in_item — Add fields after existing fields

Current fields: `item_name` (TEXT), `quantity` (NUMBER), `serial_number` (TEXT), `description` (TEXTAREA)

New fields to add:

```typescript
const goodsInItemFields = [
  { key: "item_name",         label: "Nama Barang",       type: "TEXT",     required: false, order: 1 },  // Make optional (auto-populated from product)
  { key: "quantity",          label: "Jumlah",            type: "NUMBER",   required: true,  order: 2 },
  { key: "serial_number",     label: "Serial Number",     type: "TEXT",     required: false, order: 3 },
  { key: "description",       label: "Deskripsi/Kondisi", type: "TEXTAREA", required: false, order: 4 },
  // NEW FIELDS:
  { key: "product_id",        label: "Produk",            type: "LINK",     required: true,  order: 5,
    config: { source: { table: "Product", labelField: "name", valueField: "id", filter: { dependsOn: "branch_id", field: "branchId" } } } },
  { key: "building_id",       label: "Gedung",            type: "DROPDOWN", required: true,  order: 6,
    config: { source: { table: "Building", labelField: "name", valueField: "id", filter: { dependsOn: "branch_id", field: "branchId" } } } },
  { key: "floor_id",          label: "Lantai",            type: "DROPDOWN", required: true,  order: 7,
    config: { source: { table: "Floor", labelField: "name", valueField: "id", filter: { dependsOn: "building_id", field: "buildingId" } } } },
  { key: "room_id",           label: "Ruangan",           type: "DROPDOWN", required: true,  order: 8,
    config: { source: { table: "Room", labelField: "name", valueField: "id", filter: { dependsOn: "floor_id", field: "floorId" } } } },
  { key: "owner_customer_id", label: "Customer Pemilik",  type: "LINK",     required: true,  order: 9,
    config: { source: { table: "Company", labelField: "name", valueField: "id" } } },
];
```

**Note on Floor.name:** The `Floor` model has `level` (Int) but no `name` field. We need to either:
- Option A: Add a `name` field to Floor in Prisma schema (e.g. "Lantai 1", "Lantai 2")
- Option B: Use `level` as labelField and generate labels like "Level 1"
- **Recommended: Option A** — Add `name String` to Floor model, update seed to populate Floor names

### 2b. goods_out_item — Same field additions

Identical new fields as goods_in_item.

### 2c. Update preview templates

Update the `previewTemplate` in both `goods_in_request` and `goods_out_request` configs to include the new fields in the HTML preview.

### 2d. Add `branch_id` form field to parent DocTypes (optional)

The prompt suggests making `branchId` required on parent DocTypes. Currently `branchId` is set at the `DocRecord` level, not as a form field. We can either:
- Add a `branch_id` DROPDOWN field to `goods_in_request` / `goods_out_request` — this ensures the branch is always explicit
- **OR** keep the current behavior where branch is inferred from cookie/session

**Recommended:** Keep current behavior (branch from cookie/session) since it's already working and the admin edit page already handles branch selection. Adding a branch field would require UI changes to both customer and admin create pages.

---

## Step 3: Update `on_approve` Hook

**File:** `src/lib/doc-hooks.ts` (lines 652-710)

Current logic already reads `product_id` from row data. Update to also read `room_id` and `owner_customer_id`, and write them to `InventoryMovement`.

```typescript
// Updated loop body (lines 662-707):
for (const row of rows) {
    const d = (row.data ?? {}) as Record<string, unknown>
    const productId = String(d["product_id"] || "")
    const qty = toNumber(d["quantity"] || d["qty"])
    const branchId = rec.branchId
    const roomId = String(d["room_id"] || "") || undefined
    const ownerCustomerId = String(d["owner_customer_id"] || "") || undefined

    if (productId && qty > 0 && branchId) {
        const sign = isGoodsIn ? 1 : -1
        const change = qty * sign

        await prisma.$transaction(async (tx) => {
            const inv = await tx.inventory.findUnique({
                where: { productId_branchId: { productId, branchId } }
            })

            let inventoryId = inv?.id

            if (inv) {
                await tx.inventory.update({
                    where: { id: inv.id },
                    data: { quantity: { increment: change } }
                })
            } else {
                const newInv = await tx.inventory.create({
                    data: { productId, branchId, quantity: change }
                })
                inventoryId = newInv.id
            }

            if (inventoryId) {
                await tx.inventoryMovement.create({
                    data: {
                        inventoryId,
                        quantity: change,
                        reference: rec.code || rec.id,
                        type: isGoodsIn ? "IN" : "OUT",
                        roomId: roomId || null,
                        ownerCustomerId: ownerCustomerId || null,
                        metadata: {
                            productName: d["item_name"] || "",
                            serialNumber: d["serial_number"] || "",
                            buildingId: d["building_id"] || "",
                            floorId: d["floor_id"] || "",
                        }
                    }
                })
            }
        })
    }
}
```

Also add a guard at the top of the goods in/out block:

```typescript
if (!rec.branchId) {
    console.error(`[runDocEventHook] Goods in/out record ${rec.id} has no branchId — skipping inventory update`)
    return
}
```

---

## Step 4: Add Floor.name Field to Prisma Schema

**File:** `prisma/schema.prisma`

```prisma
model Floor {
  id         String   @id @default(cuid())
  name       String   // NEW: e.g. "Lantai 1", "Lantai 2"
  level      Int
  buildingId String
  ...
}
```

**Then run:** `npx prisma db push`

---

## Step 5: Update Customer Create Page — Render New Fields

**File:** `src/app/customer/docs/[key]/create/page.tsx`

The page already renders fields dynamically based on `DocField.type`. The new fields (LINK, DROPDOWN) will be rendered automatically by the existing field rendering logic. However, we need to ensure:

1. **LINK fields** are rendered as `SearchableSelect` with options from the dynamic-options API
2. **DROPDOWN fields with `source.filter`** are rendered via `DependentDropdown` component

The existing code already handles both cases. The key change is in how child row fields are resolved and passed to `ChildRowsAccordion`.

**What to verify/change:**
- The `childOptionsByFieldKey` resolution (in the server component) must handle `table` mode with dependency filtering for the new DROPDOWN fields
- The `ChildRowsAccordion` component already supports `DependentDropdown` for fields with `source.filter`
- The `product_id` LINK field needs options from the Product table filtered by branch

The existing infrastructure should handle this automatically since the field configs use `source.table` and `source.filter` patterns that are already supported.

---

## Step 6: Update Admin Doc Edit Page — Render New Fields

**File:** `src/app/admin/docs/[key]/[id]/page.tsx`

Same as Step 5 — the admin edit page already resolves child field options with the same patterns. The new fields will be rendered automatically.

**Verify:**
- `childOptionsByFieldKey` resolution handles the new DROPDOWN fields with cascading dependencies
- The `ChildRowsAccordion` receives correct `optionsMap` for the new fields
- The `branchId` is passed to child row components for branch-scoped filtering

---

## Step 7: Update Customer Inventory Page

**File:** `src/app/customer/inventory/page.tsx` and `client.tsx`

### 7a. Server component — Include location data

Update the query to also fetch `room`, `building`, `floor` names from the DocRow data:

```typescript
// In page.tsx, the DocRow.data JSON already contains building_id, floor_id, room_id, owner_customer_id
// We just need to pass them through to the client component
```

The data is already in `DocRow.data` as JSON — no additional queries needed. The client component just needs to read and display it.

### 7b. Client component — Show location and customer columns

Update the balance table to show:
- Building → Floor → Room (concatenated)
- Customer (owner_customer_id → Company name)

Update the in/out history tables similarly.

**File:** `src/app/customer/inventory/client.tsx`

Add columns:
- Balance tab: Building | Floor | Room | Customer
- In/Out tabs: Building | Floor | Room | Customer

Group balance by `product_id` (not `item_name`) when available, fall back to `item_name`.

---

## Step 8: Build Admin Inventory Management Page

**New files:**
- `src/app/admin/inventory/management/page.tsx` (server component)
- `src/app/admin/inventory/management/client.tsx` (client component)

### 8a. Server component (`page.tsx`)

Query approach — use `InventoryMovement` with includes:

```typescript
// Fetch all inventory movements with location and customer data
const movements = await prisma.inventoryMovement.findMany({
  include: {
    inventory: {
      include: { product: true, branch: true }
    },
    room: {
      include: { floor: { include: { building: true } } }
    },
    ownerCustomer: true,
  },
  orderBy: { createdAt: "desc" }
})

// Calculate current balance per (product, room, customer)
// Group by room hierarchy: Building → Floor → Room → Product → Customer
```

Alternatively, query DocRows directly (like the existing inventory dropdown logic) to get the full item data including serial numbers:

```typescript
// Fetch all completed goods_in_item and goods_out_item rows
// Filter by branch (from cookie)
// Include parent record for date/status
// Calculate balance per (product_id, room_id, owner_customer_id)
```

**Recommended approach:** Use the DocRow query approach (consistent with existing patterns) but also include room/building/floor names by looking up the IDs.

### 8b. Client component (`client.tsx`)

Table columns:
| Building | Floor | Room | Product | Qty | Customer | Serial Numbers | Last Movement |

Features:
- Filter by: Branch, Building, Floor, Room, Customer
- Group by: Room hierarchy (Building → Floor → Room)
- Click-to-drilldown: Show movement history per room/product/customer
- Summary cards: Total items, Total rooms with items, Total customers with items

### 8c. Add sidebar link

**File:** `src/components/app-sidebar.tsx`

Add to the "Main" or "Management" group:
```typescript
{ title: "Inventory", href: "/admin/inventory/management", icon: Package }
```

---

## Step 9: Update Dynamic Options API (if needed)

**File:** `src/app/api/dynamic-options/route.ts`

The existing `table` mode already supports:
- Fetching from any Prisma model (Building, Floor, Room, Company)
- Dependency filtering via `depField`/`depValue` params
- Branch scoping

The cascading Building → Floor → Room dropdowns will work via:
1. `building_id` DROPDOWN: `source.table = "Building"`, `source.filter = { dependsOn: "branch_id", field: "branchId" }`
2. `floor_id` DROPDOWN: `source.table = "Floor"`, `source.filter = { dependsOn: "building_id", field: "buildingId" }`
3. `room_id` DROPDOWN: `source.table = "Room"`, `source.filter = { dependsOn: "floor_id", field: "floorId" }`

**No changes needed to the API** — the existing `table` mode with dependency filtering handles this.

However, we need to verify that the `Floor` model's `name` field is properly populated (Step 4) so the dropdown labels are meaningful.

---

## Step 10: Add Seed Data for Building/Floor/Room

**File:** `prisma/seed.ts`

Add sample Building/Floor/Room data so the system has data to work with:

```typescript
// Sample building
const building = await prisma.building.create({
  data: { name: "Main Building", branchId: branch.id }
})

const floor1 = await prisma.floor.create({
  data: { name: "Lantai 1", level: 1, buildingId: building.id }
})
const floor2 = await prisma.floor.create({
  data: { name: "Lantai 2", level: 2, buildingId: building.id }
})

await prisma.room.createMany({
  data: [
    { name: "Room A-101", floorId: floor1.id },
    { name: "Room A-102", floorId: floor1.id },
    { name: "Room B-201", floorId: floor2.id },
  ]
})
```

---

## Execution Order

1. **Prisma schema changes** (Steps 1, 4) — Add fields to InventoryMovement, Floor.name
2. **Run migration** — `npx prisma db push`
3. **Seed updates** (Steps 2, 10) — Add DocType fields, sample data
4. **Run seed** — `npx prisma db seed`
5. **Hook update** (Step 3) — Update doc-hooks.ts
6. **Customer UI** (Step 7) — Update inventory page
7. **Admin UI** (Step 8) — Build inventory management page
8. **Sidebar** (Step 8c) — Add navigation link
9. **Testing** — Create test goods in/out records, verify inventory movements, verify admin page

---

## Files Changed Summary

| File | Change |
|------|--------|
| `prisma/schema.prisma` | Add `roomId`, `ownerCustomerId`, `metadata` to InventoryMovement; add `name` to Floor; add reverse relations |
| `prisma/seed.ts` | Add new fields to goods_in_item/goods_out_item DocTypes; add Building/Floor/Room sample data; update Floor model |
| `src/lib/doc-hooks.ts` | Update `on_approve` to read/write location and ownership data |
| `src/app/customer/inventory/page.tsx` | Minor query adjustments (data already in JSON) |
| `src/app/customer/inventory/client.tsx` | Add location and customer columns to tables |
| `src/app/admin/inventory/management/page.tsx` | **NEW** — Server component for admin inventory monitoring |
| `src/app/admin/inventory/management/client.tsx` | **NEW** — Client component with interactive table and filters |
| `src/components/app-sidebar.tsx` | Add Inventory link to sidebar |
| `src/app/api/dynamic-options/route.ts` | No changes needed (existing `table` mode handles cascading) |

---

## Key Architectural Decisions

1. **Store location in DocRow.data JSON AND in InventoryMovement** — DocRow.data holds the form values; InventoryMovement holds the audit trail. This allows the admin monitoring page to query InventoryMovement directly for room-grouped views.

2. **Keep `item_name` as optional fallback** — Existing data uses `item_name` for grouping. New data will use `product_id`. The customer inventory page should group by `product_id` when available, fall back to `item_name`.

3. **No changes to Inventory model** — The `Inventory` model stays as `@@unique([productId, branchId])`. Room-level tracking is done via `InventoryMovement.roomId`, not by changing the inventory balance key. This keeps the balance calculation simple.

4. **Use existing `table` mode for cascading dropdowns** — No new API endpoints needed. The Building → Floor → Room chain uses the existing dependency filtering in `/api/dynamic-options`.

5. **Floor.name is necessary** — The `Floor` model only has `level` (Int). Adding a `name` field makes dropdown labels meaningful ("Lantai 1" vs "Level 1").
