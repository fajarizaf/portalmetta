# Prompt Implementasi — Sistem Goods In/Out dan Monitoring Inventory yang Proper

## Tujuan
Membangun sistem goods in/out yang proper dengan monitoring inventory di dalam gedung/ruangan, menampilkan kepemilikan item berdasarkan customer. Sistem ini harus memperluas DocType Goods In/Out yang sudah ada untuk menangkap lokasi fisik dan customer pemilik, serta menyediakan monitoring admin untuk semua item yang ada di dalam gedung.

---

## Kondisi Saat Ini
- Dynamic doc engine menggunakan `DocType`, `DocField`, `DocRecord`, `DocRow`
- DocType yang ada: `goods_in_request`, `goods_out_request`, `goods_in_item`, `goods_out_item`
- Inventory ditrack per `(product, branch)` via `on_approve` hook di `src/lib/doc-hooks.ts`
- Hirarki `Building > Floor > Room` sudah ada di Prisma tapi **tidak terhubung** ke inventory
- Belum ada tracking kepemilikan customer di level inventory

---

## Perubahan yang Diperlukan

### 1. Perluas DocType Goods In Item / Goods Out Item

Tambahkan field-field berikut ke kedua DocType `goods_in_item` dan `goods_out_item` di Prisma seed (`prisma/seed.ts` lines 689-858):

| Field | Type | Required | Sumber Data |
|-------|------|----------|--------------|
| `product_id` | LINK | Yes | Tabel `Product` (mengganti/melengkapi `item_name`) |
| `building_id` | DROPDOWN | Yes | Tabel `Building`, difilter berdasarkan branch yang dipilih |
| `floor_id` | DROPDOWN | Yes | Tabel `Floor`, difilter berdasarkan building yang dipilih |
| `room_id` | DROPDOWN | Yes | Tabel `Room`, difilter berdasarkan building yang dipilih |
| `owner_customer_id` | LINK | Yes | Tabel `Company` (Customer) |

Juga buat `branch_id` menjadi required pada parent DocType `goods_in_request` / `goods_out_request` agar inventory hook selalu memiliki konteks branch.

**Perilaku cascading dropdown**: Memilih building akan memfilter floors; memilih floor akan memfilter rooms. Ini menggunakan pola dynamic-options API yang sudah ada (`/api/dynamic-options`).

---

### 2. Perbaiki Mapping `item_name` → `productId`

Saat ini di `src/lib/doc-hooks.ts` (lines 590-649), hook `on_approve` menggunakan `item_name` (teks bebas) sebagai identifier produk. Ubah untuk menggunakan field `product_id` yang baru dari child rows.

Update:
```typescript
// Sebelum
const productId = row.data?.item_name;

// Sesudah
const productId = row.data?.product_id;
```

Pastikan record `Inventory` menggunakan `productId` ini untuk composite key `(productId, branchId)`.

---

### 3. Update Hook `on_approve`

File: `src/lib/doc-hooks.ts`

Pada approval `goods_in_request` / `goods_out_request`:
- Baca `branchId` dari `DocRecord.branchId` (saat ini optional; harus wajib setelah update DocType)
- Baca `product_id`, `room_id`, `owner_customer_id` dari setiap child `DocRow`
- Untuk Goods In: create/update record `Inventory`, buat `InventoryMovement` dengan `type: "IN"`
- Untuk Goods Out: create/update record `Inventory`, buat `InventoryMovement` dengan `type: "OUT"`
- Catat `owner_customer_id` di metadata atau reference movement untuk audit

---

### 4. Integrasikan Building/Floor/Room ke Inventory Workflow

Karena model `Building`, `Floor`, `Room` sudah ada di `prisma/schema.prisma` (lines 123-156), hubungkan ke inventory:

- `InventoryMovement` harus menyimpan `roomId` untuk track lokasi fisik eksak stok
- Alternatif: tambah `room_id` ke `DocRow` untuk goods in/out items (sudah diusulkan di field list di atas)
- Query admin di masa depan bisa group by room

---

### 5. Bangun Halaman Admin Inventory Management

**Route baru**: `/admin/inventory/management`

Halaman ini menggantikan dashboard stok dengan view inventory management yang sesungguhnya:

**Server Component** (`page.tsx`):
- Query semua completed `goods_in_request` dan `goods_out_request` records
- Include child `DocRow` items dengan `product_id`, `room_id`, `owner_customer_id`, quantity, serial_number
- Hitung current balance per `(product_id, room_id)` dengan menjumlah IN dan mengurangi OUT quantities
- Filter berdasarkan: branch, building, floor, room, customer
- Group hasil: Room → daftar item

**Client Component** (`client.tsx`):
- Kolom tabel: Building → Floor → Room | Product Name | Total Qty | Customer | Serial Numbers | Last Movement Date
- Sort/group by room hierarchy
- Click-to-drilldown ke movement history per room/product

**Catatan implementasi**:
- Gunakan pola data fetching yang ada di `src/app/admin/customers/[id]/edit/page.tsx` sebagai referensi
- Gunakan scoping logic yang sama untuk branch/customer
- Reuse balance calculation logic dari `src/app/customer/inventory/client.tsx`

---

### 6. Tambah DocType Inventory Adjustment (Opsional)

**DocType**: `inventory_adjustment`
- Fields: `reason` (TEXTAREA, required), `status`, `branch_id`
- Child items: `product_id`, `from_room_id`, `to_room_id`, `quantity`, `notes`
- On submit: buat `InventoryMovement` dengan `type: "ADJUSTMENT"` dan kurangi source room / tambah target room

Berguna untuk:
- Menyesuaikan selisih fisik stok
- Memindahkan stok antar ruangan
- Mencatat penemuan atau kerusakan barang

---

### 7. Update Form Customer-Side

File yang akan diubah:
- `src/app/customer/inventory/client.tsx` — tampilkan lokasi (building/floor/room) beserta stock balance
- `src/app/customer/inventory/page.tsx` — kirim data lokasi
- Customer create/edit pages untuk Goods In/Out requests — expose field `building_id`, `floor_id`, `room_id`, `owner_customer_id` dengan cascading dropdowns

---

### 8. Update Form Admin Edit

File yang akan diubah:
- `src/app/admin/docs/[key]/[id]/page.tsx` — saat editing goods in/out docs dengan `mode=inventory`, tampilkan field lokasi dan customer
- Admin doc create page — pastikan field baru di-render

---

## Urutan Eksekusi
1. **Seed / Schema**: Update `prisma/seed.ts` untuk tambah field baru ke Goods In/Out Item dan parent DocTypes
2. **Prisma Migration**: Jalankan `npx prisma db push` atau `npx prisma migrate dev` untuk tambah kolom baru ke `doc_field` (jika dynamic schema support-nya memungkinkan)
3. **Hook Update**: Update `src/lib/doc-hooks.ts` `on_approve` untuk menggunakan `product_id`, `room_id`, `owner_customer_id`, dan `branchId` yang wajib
4. **API Endpoints**: Tambah dynamic-options endpoints untuk cascading dropdown building → floor → room (atau reuse yang sudah ada)
5. **Customer UI**: Update customer create/edit forms dan inventory page untuk tampilkan field baru
6. **Admin UI**: Update admin doc edit forms untuk render field baru
7. **Admin Monitoring Page**: Build `/admin/inventory/management` (server + client components)
8. **Testing**: Buat test goods in/out records dengan data lokasi + customer, verifikasi inventory movements, verifikasi akurasi halaman admin

---

## Kriteria Validasi
- [ ] Membuat Goods In Request dengan field lokasi + customer + produk membuat matching Inventory record dengan peningkatan quantity
- [ ] Membuat Goods Out Request dengan field yang sama mengurangi quantity Inventory dan logging movement OUT
- [ ] `Product.id` digunakan sebagai identifier produk, bukan teks bebas `item_name`
- [ ] Admin Inventory Management page menampilkan semua item yang di-group by room beserta customer pemilik
- [ ] Users dengan scope branch hanya melihat data sesuai branch mereka
- [ ] Missing `branchId` pada Goods In/Out record ditolak atau di-handle dengan baik (tidak ada silent failure)

---

## Out of Scope
- Stock valuation (cost/price per movement): out of scope untuk v1
- Stock transfer antar branch: out of scope untuk v1
- Low-stock alerts / reorder triggers: out of scope untuk v1
- Mobile barcode scanning: out of scope untuk v1

---

## File yang Akan Diubah
- `prisma/seed.ts` — DocType/field definitions
- `src/lib/doc-hooks.ts` — logik `on_approve`
- `src/app/api/dynamic-options/route.ts` — tambah support cascading location dropdown jika perlu
- `src/app/customer/inventory/page.tsx` — kirim data lokasi
- `src/app/customer/inventory/client.tsx` — tampilkan kolom lokasi
- `src/app/admin/inventory/management/page.tsx` — **new file**
- `src/app/admin/inventory/management/client.tsx` — **new file**
- `src/app/admin/docs/[key]/[id]/page.tsx` — render field baru di edit form
- `src/app/admin/docs/[key]/page.tsx` — render field baru di create form
- Customer side create/edit pages untuk goods in/out — render field baru
