# MettaDC - Data Center Customer Portal

Portal manajemen data center terintegrasi untuk PT Metta Data Center, menyediakan Admin Panel dan Customer Portal dalam satu platform.

> **URL Produksi:** [portal.mettadc.id](https://portal.mettadc.id) | **Lokasi:** Jl. Jababeka XVII No. 1, Cikarang, Indonesia

---

## Arsitektur Sistem

```
┌──────────────────────────────────────────────────────────────────────────┐
│                         METTADC PORTAL                                    │
├────────────────────────────────┬─────────────────────────────────────────┤
│         ADMIN PANEL            │          CUSTOMER PORTAL                 │
│       (Role: ADMIN)            │    (Role: Customer/Sales/Finances)       │
├────────────────────────────────┴─────────────────────────────────────────┤
│                                                                          │
│   ┌─────────────┐  ┌──────────────┐  ┌─────────────────────────────┐    │
│   │  Dashboard   │  │  Master Data │  │   Document Engine (ERP)     │    │
│   │  Admin       │  │  Management  │  │  ┌────────┐  ┌──────────┐  │    │
│   └─────────────┘  └──────────────┘  │  │DocType │  │Workflow  │  │    │
│                                       │  │Config  │  │Engine    │  │    │
│   ┌─────────────┐  ┌──────────────┐  │  └────────┘  └──────────┘  │    │
│   │  Location   │  │  Rack        │  │  ┌────────┐  ┌──────────┐  │    │
│   │  Management │  │  Mapping     │  │  │Dynamic │  │Preview   │  │    │
│   └─────────────┘  └──────────────┘  │  │Fields  │  │Template  │  │    │
│                                       │  └────────┘  └──────────┘  │    │
│   ┌─────────────┐  ┌──────────────┐  └─────────────────────────────┘    │
│   │  Product    │  │  Billing &   │                                      │
│   │  Management │  │  Subscription│  ┌─────────────────────────────┐    │
│   └─────────────┘  └──────────────┘  │     Sales & Ordering        │    │
│                                       │  ┌────────┐  ┌──────────┐  │    │
│   ┌─────────────┐  ┌──────────────┐  │  │Quotati-│  │Sales     │  │    │
│   │  User &     │  │  Inventory   │  │  │on      │  │Order     │  │    │
│   │  Role Mgmt  │  │  Management  │  │  └────────┘  └──────────┘  │    │
│   └─────────────┘  └──────────────┘  │  ┌────────┐  ┌──────────┐  │    │
│                                       │  │Work    │  │Cross     │  │    │
│                                       │  │Order   │  │Connect   │  │    │
│                                       │  └────────┘  └──────────┘  │    │
│                                       └─────────────────────────────┘    │
├──────────────────────────────────────────────────────────────────────────┤
│                       MIDDLEWARE & AUTH                                   │
│   ┌──────────────┐  ┌───────────────┐  ┌─────────────────────────┐      │
│   │  NextAuth.js │  │  RBAC         │  │  Branch-level Scoping   │      │
│   │  (JWT)       │  │  Permissions  │  │  (Cookie-based)         │      │
│   └──────────────┘  └───────────────┘  └─────────────────────────┘      │
├──────────────────────────────────────────────────────────────────────────┤
│                         DATA LAYER                                        │
│   ┌──────────────┐  ┌───────────────┐  ┌─────────────────────────┐      │
│   │  Prisma ORM  │  │  MariaDB      │  │  Server Actions         │      │
│   │  v7          │  │  Database     │  │  + API Routes           │      │
│   └──────────────┘  └───────────────┘  └─────────────────────────┘      │
├──────────────────────────────────────────────────────────────────────────┤
│                      EXTERNAL SERVICES                                    │
│   ┌──────────────┐  ┌───────────────┐                                   │
│   │  Nodemailer  │  │  Puppeteer    │                                   │
│   │  (SMTP)      │  │  (PDF Gen)    │                                   │
│   └──────────────┘  └───────────────┘                                   │
└──────────────────────────────────────────────────────────────────────────┘
```

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 16.1 (App Router) |
| **UI Library** | React 19 + TypeScript 5 |
| **Styling** | Tailwind CSS v4 + shadcn/ui (Radix UI) |
| **ORM** | Prisma v7 |
| **Database** | MariaDB 10 |
| **Auth** | NextAuth.js v4 (Credentials + JWT) |
| **Rich Text** | CKEditor 5 |
| **PDF** | Puppeteer (HTML-to-PDF) |
| **Email** | Nodemailer (SMTP) |
| **Validation** | Zod v4 + react-hook-form |

---

## Fitur Utama

### 1. Configurable Document Engine (ERP)

Sistem manajemen dokumen dinamis yang dapat dikonfigurasi sepenuhnya melalui UI Admin. Mendukung berbagai jenis dokumen bisnis tanpa perubahan kode.

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    DOCUMENT ENGINE ARCHITECTURE                          │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│   DocType Configuration                                                 │
│   ┌─────────────────────────────────────────────────────────────────┐   │
│   │  DocType: "Quotation"                                           │   │
│   │                                                                  │   │
│   │   ┌──────────────┐  ┌─────────────┐  ┌───────────────────────┐  │   │
│   │   │ Fields       │  │ Naming      │  │ Workflow              │  │   │
│   │   │ ──────────── │  │ ─────────── │  │ ────────────────────  │  │   │
│   │   │ • customer   │  │ QT-#####    │  │ Draft → Submitted →  │  │   │
│   │   │ • date       │  │ Auto-incr.  │  │   ↓                  │  │   │
│   │   │ • total      │  │ Per branch  │  │ Approved             │  │   │
│   │   │ • items[]    │  │             │  │   ↓                  │  │   │
│   │   └──────────────┘  └─────────────┘  │ Rejected             │  │   │
│   │                                      └───────────────────────┘  │   │
│   │   ┌──────────────┐  ┌─────────────┐                            │   │
│   │   │ Child Rows   │  │ Preview     │  ┌───────────────────────┐  │   │
│   │   │ ──────────── │  │ ─────────── │  │ Hooks                 │  │   │
│   │   │ • product    │  │ HTML/       │  │ • on_submit → create  │  │   │
│   │   │ • qty        │  │ Mustache    │  │   SO                  │  │   │
│   │   │ • price      │  │ Template    │  │                       │  │   │
│   │   │ • amount     │  │             │  │                       │  │   │
│   │   └──────────────┘  └─────────────┘  └───────────────────────┘  │   │
│   └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
│   Document Lifecycle:                                                   │
│                                                                         │
│   Create → Edit → Submit → Approve/Reject → Complete                    │
│     │                                              │                    │
│     │  ← Child docs auto-created                   │                    │
│     └──────────────────────────────────────────────┘                    │
└─────────────────────────────────────────────────────────────────────────┘
```

**Jenis Dokumen yang Didukung:**

| Dokumen | Keterangan | Alur |
|---------|-----------|------|
| **Quotation** | Penawaran harga ke customer | Create → Submit → Approve → Auto SO |
| **Sales Order** | Pesanan penjualan | Create → Submit → Approve → Auto SO |
| **Work Order** | Instrukerja pengerjaan | Create → Submit → Approve |
| **Invoice** | Tagihan customer | Auto-generate dari subscription |
| **Support Ticket** | Tiket dukungan | Create → Assign → Resolved |
| **Visitor Request** | Permintaan kunjungan | Create → Approve → Completed |
| **Cross-Connect** | Koneksi antar rack | Create → Submit → Approve |
| **Goods In** | Barang masuk | Create → Approve → Inventory + |
| **Goods Out** | Barang keluar | Create → Approve → Inventory - |
| **Subscription** | Langganan layanan | Auto-created dari SO approved |

**Field Types yang Didukung:**

| Tipe | Kegunaan |
|------|----------|
| `TEXT` | Input teks singkat |
| `TEXTAREA` | Input teks panjang |
| `NUMBER` | Angka |
| `PRICE` | Harga (format Rupiah) |
| `DROPDOWN` | Pilihan dari daftar |
| `CHECKBOX` | Boolean (ya/tidak) |
| `DATE` | Tanggal |
| `DATETIME` | Tanggal + waktu |
| `LINK` | Relasi ke data lain |
| `TABLE` | Tabel baris (child rows) |
| `ATTACHMENT` | Upload file |

---

### 2. Sales & Order Management

```
┌──────────────────────────────────────────────────────────────────────────┐
│                          SALES FLOW                                       │
│                                                                          │
│   Customer Portal              Admin Panel                               │
│   ┌───────────┐               ┌───────────┐                              │
│   │  Browse   │               │  Create   │                              │
│   │  Product  │──────────────▶│  Quotation│                              │
│   └───────────┘               └─────┬─────┘                              │
│                                     │                                     │
│                               ┌─────▼─────┐                              │
│                               │  Submit   │                              │
│                               └─────┬─────┘                              │
│                                     │                                     │
│                        ┌────────────▼────────────┐                       │
│                        │    Approve / Reject     │                       │
│                        └────────────┬────────────┘                       │
│                                     │                                     │
│                  ┌──────────────────┼──────────────────┐                  │
│                  ▼                  ▼                  ▼                  │
│           ┌────────────┐    ┌────────────┐    ┌────────────┐            │
│           │Sales Order │    │   Work     │    │   Cross    │            │
│           │ (Auto)     │    │   Order    │    │  Connect   │            │
│           └──────┬─────┘    └────────────┘    └────────────┘            │
│                  │                                                       │
│           ┌──────▼─────┐                                                 │
│           │Subscription│  ← Auto-created                                 │
│           │   (Auto)   │                                                 │
│           └──────┬─────┘                                                 │
│                  │                                                       │
│           ┌──────▼─────┐                                                 │
│           │  Invoice   │  ← Auto-generated (single/bulk/prorate)        │
│           └────────────┘                                                 │
└──────────────────────────────────────────────────────────────────────────┘
```

**Fitur Ordering:**

| Mode | Keterangan |
|------|-----------|
| **Direct Order** | Customer langsung memesan produk tertentu |
| **Request Order** | Customer mengajukan permintaan, menunggu approval admin |
| **Multi-Item Order** | Pemesanan beberapa item sekaligus |

**Auto-generation:**
- Quotation di-approve → otomatis membuat **Sales Order**
- SO di-approve → otomatis membuat **Subscription** aktif
- Subscription aktif → otomatis generate **Invoice**

---

### 3. Billing & Subscription Management

```
┌──────────────────────────────────────────────────────────────────────────┐
│                         BILLING CYCLE                                     │
│                                                                          │
│   ┌─────────────────┐                                                    │
│   │  Subscription   │                                                    │
│   │  (Active)       │                                                    │
│   └────────┬────────┘                                                    │
│            │                                                              │
│            ├──▶ Monthly Billing                                          │
│            │     ┌────────────────────────────┐                          │
│            │     │  Pro-rata Calculation      │                          │
│            │     │  ────────────────────────  │                          │
│            │     │  Prorate = (sisa hari / 30)│                          │
│            │     │           × monthly_price  │                          │
│            │     └────────────────────────────┘                          │
│            │                                                              │
│            ├──▶ Quarterly Billing                                        │
│            │     (3 bulan × price, prorate awal)                         │
│            │                                                              │
│            ├──▶ Annual Billing                                           │
│            │     (12 bulan × price, prorate awal)                        │
│            │                                                              │
│            └──▶ Setup Fee (One-time)                                     │
│                  (Tagihan pertama kali)                                   │
│                                                                          │
│   ┌──────────────────────────────────────────────────────────────────┐   │
│   │  Invoice Generation                                               │   │
│   │   ┌────────────┐    ┌────────────┐    ┌────────────┐            │   │
│   │   │   Single   │    │    Bulk    │    │   Email    │            │   │
│   │   │  Generate  │    │  Generate  │    │  Delivery  │            │   │
│   │   └────────────┘    └────────────┘    └────────────┘            │   │
│   └──────────────────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────────────────┘
```

**Fitur Billing:**

- Prorate calculation (harian) untuk bulan pertama/tidak genap
- Billing cycle: Monthly, Quarterly, Annually
- Setup fee (one-time charge) untuk instalasi
- Bulk invoice generation untuk semua subscription aktif
- Invoice PDF via Puppeteer
- Email delivery otomatis ke customer
- Currency formatting Rupiah (IDR)

---

### 4. Product Management

```
┌──────────────────────────────────────────────────────────────────────────┐
│                       PRODUCT HIERARCHY                                   │
│                                                                          │
│   ┌──────────────────────────────┐                                       │
│   │        Product Group          │                                       │
│   │   ─────────────────────────  │                                       │
│   │   • Colocation                │                                       │
│   │     ├─ Rack Space             │                                       │
│   │     └─ Cross Connect          │                                       │
│   │   • Managed Service           │                                       │
│   │     ├─ Server                 │                                       │
│   │     └─ Storage                │                                       │
│   │   • Network                   │                                       │
│   │     ├─ Bandwidth              │                                       │
│   │     └─ VPN                    │                                       │
│   └──────────────────────────────┘                                       │
│                    │                                                      │
│                    ▼                                                      │
│   ┌──────────────────────────────────────────────────────────────────┐   │
│   │  Product: "Rack 42U"                                             │   │
│   │   ┌─────────────┐  ┌──────────────┐  ┌────────────────────────┐  │   │
│   │   │ Pricing     │  │ Spec Fields  │  │ Order Mode             │  │   │
│   │   │ ─────────── │  │ ──────────── │  │ ─────────────────────  │  │   │
│   │   │ FIXED:      │  │ • U Size     │  │ DIRECT or REQUEST      │  │   │
│   │   │  12U = 2M   │  │ • Power (VA) │  │                        │  │   │
│   │   │  24U = 4M   │  │ • Bandwidth  │  │                        │  │   │
│   │   │  42U = 7M   │  │              │  │                        │  │   │
│   │   │ TIERED:     │  │ Type:        │  │                        │  │   │
│   │   │  1-5 = 100K │  │ TEXT/DROPDOWN│  │                        │  │   │
│   │   │  6-20 = 90K │  │ /NUMBER/etc  │  │                        │  │   │
│   │   └─────────────┘  └──────────────┘  └────────────────────────┘  │   │
│   └──────────────────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────────────────┘
```

**Fitur Product:**

| Fitur | Keterangan |
|-------|-----------|
| **Hierarchical Groups** | Parent-child product groups |
| **Fixed Pricing** | Harga tetap per varian |
| **Discount Pricing** | Diskon dari harga dasar |
| **Tiered Pricing** | Harga berdasarkan volume/kuantitas |
| **Spec Fields** | Dynamic specification fields per produk |
| **Order Mode** | Direct (langsung) atau Request (perlu approval) |
| **Classification** | FREE, ONETIME, RECURRING |

---

### 5. Inventory & Goods Management

```
┌──────────────────────────────────────────────────────────────────────────┐
│                        INVENTORY FLOW                                      │
│                                                                          │
│   Goods In                               Goods Out                        │
│   ┌─────────────┐                        ┌─────────────┐                  │
│   │   Create    │                        │   Create    │                  │
│   │   Request   │                        │   Request   │                  │
│   └──────┬──────┘                        └──────┬──────┘                  │
│          │                                       │                         │
│   ┌──────▼──────┐                        ┌──────▼──────┐                  │
│   │   Approve   │                        │   Approve   │                  │
│   └──────┬──────┘                        └──────┬──────┘                  │
│          │                                       │                         │
│   ┌──────▼──────┐                        ┌──────▼──────┐                  │
│   │  Inventory  │                        │  Inventory  │                  │
│   │     (+)     │                        │     (-)     │                  │
│   └──────┬──────┘                        └──────┬──────┘                  │
│          │                                       │                         │
│          └────────────────┬──────────────────────┘                        │
│                           ▼                                               │
│                  ┌─────────────────┐                                      │
│                  │   Audit Trail   │                                      │
│                  │  ─────────────  │                                      │
│                  │  • IN / OUT / ADJ│                                     │
│                  │  • Timestamp     │                                     │
│                  │  • User          │                                     │
│                  │  • Quantity      │                                     │
│                  └─────────────────┘                                      │
└──────────────────────────────────────────────────────────────────────────┘
```

**Fitur Inventory:**

- Stock tracking per branch per produk
- Goods In/Out dengan approval workflow
- Audit trail lengkap (IN/OUT/ADJUSTMENT)
- Real-time stock balance calculation
- Tied ke Customer Portal untuk view

---

### 6. Data Center Infrastructure

```
┌──────────────────────────────────────────────────────────────────────────┐
│                     LOCATION HIERARCHY                                     │
│                                                                          │
│   ┌─────────────────┐                                                    │
│   │     Branch      │  e.g., "Jababeka"                                  │
│   │    Code: JBK    │                                                    │
│   └────────┬────────┘                                                    │
│            │                                                              │
│   ┌────────▼────────┐                                                    │
│   │    Building     │  e.g., "Gedung A"                                  │
│   └────────┬────────┘                                                    │
│            │                                                              │
│   ┌────────▼────────┐                                                    │
│   │      Floor      │  e.g., "Lantai 2"                                  │
│   └────────┬────────┘                                                    │
│            │                                                              │
│   ┌────────▼────────┐                                                    │
│   │       Room      │  e.g., "Server Room 1"                             │
│   └────────┬────────┘                                                    │
│            │                                                              │
│   ┌────────▼────────────────────────────────────────────────────────┐    │
│   │                      Rack Mapping                               │    │
│   │                                                                  │    │
│   │   Row A   │  01  │  02  │  03  │  04  │  05  │                 │    │
│   │   Row B   │  06  │  07  │  08  │  09  │  10  │                 │    │
│   │   Row C   │  11  │  12  │  13  │  14  │  15  │                 │    │
│   │                                                                  │    │
│   │   Status: ✅ Available  ❌ Occupied                              │    │
│   └──────────────────────────────────────────────────────────────────┘    │
└──────────────────────────────────────────────────────────────────────────┘
```

**Fitur Infrastructure:**

- Hirarki lokasi: Branch → Building → Floor → Room
- Visual rack mapping (grid layout)
- Rack status tracking (Available/Occupied)
- Cross-connect management antar rack
- Multi-branch support dengan branch switching

---

### 7. Customer Portal

```
┌──────────────────────────────────────────────────────────────────────────┐
│                   CUSTOMER PORTAL DASHBOARD                                │
│                                                                          │
│   ┌──────────────────────────────────────────────────────────────────┐   │
│   │  Welcome, Customer Name!                           [Branch ▼]    │   │
│   ├──────────────────────────────────────────────────────────────────┤   │
│   │                                                                  │   │
│   │   ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐       │   │
│   │   │  Active  │  │  Pending │  │  Monthly │  │  Support │       │   │
│   │   │ Services │  │  Invoice │  │  Cost    │  │  Tickets │       │   │
│   │   │    5     │  │    2     │  │  Rp12M   │  │    1     │       │   │
│   │   └──────────┘  └──────────┘  └──────────┘  └──────────┘       │   │
│   │                                                                  │   │
│   │   ┌──────────────────────────────────────────────────────────┐   │   │
│   │   │  Quick Access                                             │   │   │
│   │   │   ┌──────────┐  ┌──────────┐  ┌──────────┐              │   │   │
│   │   │   │  Order   │  │ My Racks │  │ Billing  │              │   │   │
│   │   │   │  New     │  │          │  │          │              │   │   │
│   │   │   └──────────┘  └──────────┘  └──────────┘              │   │   │
│   │   │   ┌──────────┐  ┌──────────┐  ┌──────────┐              │   │   │
│   │   │   │  Goods   │  │Inventory │  │  Support │              │   │   │
│   │   │   │  In/Out  │  │  View    │  │  Tickets │              │   │   │
│   │   │   └──────────┘  └──────────┘  └──────────┘              │   │   │
│   │   └──────────────────────────────────────────────────────────┘   │   │
│   └──────────────────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────────────────┘
```

**Halaman Customer:**

| Halaman | Keterangan |
|---------|-----------|
| **Dashboard** | Ringkasan layanan aktif, tagihan pending, biaya bulanan |
| **Order** | Katalog produk, order langsung atau request |
| **My Racks** | Daftar rack yang dimiliki customer |
| **Billing** | Daftar invoice, detail tagihan, download PDF |
| **Goods In/Out** | Tracking barang masuk/keluar |
| **Inventory** | Daftar inventaris customer |
| **Support** | Tiket dukungan dengan message threading |
| **Account** | Pengaturan akun (profil, password) |

---

### 8. User & Access Management

```
┌──────────────────────────────────────────────────────────────────────────┐
│                     ACCESS CONTROL MODEL                                   │
│                                                                          │
│   ┌─────────────┐           ┌─────────────┐                              │
│   │    User     │──────────▶│   Company   │                              │
│   └──────┬──────┘           └─────────────┘                              │
│          │                                                                │
│          │ assigned to                                                    │
│          ▼                                                                │
│   ┌──────────────────────────────────────────────────────────────────┐   │
│   │  Role                                                            │   │
│   │   ──────────────────────────────────────────────────────────     │   │
│   │   • Admin                                                         │   │
│   │   • Customer                                                      │   │
│   │   • Sales                                                         │   │
│   │   • Sales Manager                                                 │   │
│   │   • Finance                                                       │   │
│   │   • Technician                                                    │   │
│   └──────────────────────────────────────────────────────────────────┘   │
│          │                                                                │
│          ▼                                                                │
│   ┌──────────────────────────────────────────────────────────────────┐   │
│   │  Permission                                                      │   │
│   │   ──────────────────────────────────────────────────────────     │   │
│   │   • ADMIN_PANEL_ACCESS                                           │   │
│   │   • BRANCH_MANAGEMENT                                            │   │
│   │   • COMPANY_MANAGEMENT                                           │   │
│   │   • CUSTOMER_MANAGEMENT                                          │   │
│   │   • DOCUMENTS_MANAGEMENT                                         │   │
│   │   • DOCTYPE_MANAGEMENT                                           │   │
│   └──────────────────────────────────────────────────────────────────┘   │
│                                                                          │
│   ┌──────────────────────────────────────────────────────────────────┐   │
│   │  Document-Level Permissions                                       │   │
│   │   ──────────────────────────────────────────────────────────     │   │
│   │   • canCreate / canDelete                                         │   │
│   │   • canRead / canAssign                                           │   │
│   │   • canWrite — per Role per DocType                               │   │
│   └──────────────────────────────────────────────────────────────────┘   │
│                                                                          │
│   ┌──────────────────────────────────────────────────────────────────┐   │
│   │  Branch Scoping                                                   │   │
│   │   ──────────────────────────────────────────────────────────     │   │
│   │   User ──assigned──▶ Branch(s)                                    │   │
│   │   Active branch stored in cookie                                  │   │
│   │   All data filtered by active branch                              │   │
│   └──────────────────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────────────────┘
```

**Role Default:**

| Role | Akses |
|------|-------|
| **Admin** | Full access ke Admin Panel |
| **Customer** | Akses ke Customer Portal saja |
| **Sales** | Buat quotation, proses order |
| **Sales Manager** | Approve quotation & sales order |
| **Finance** | Kelola billing & invoice |
| **Technician** | Handle work order & support ticket |

---

### 9. Document Preview & Templates

```
┌──────────────────────────────────────────────────────────────────────────┐
│                   DOCUMENT PREVIEW SYSTEM                                  │
│                                                                          │
│   ┌──────────────────────────────────────────────────────────────────┐   │
│   │  Template (HTML + Mustache syntax)                                │   │
│   │   ──────────────────────────────────────────────────────────     │   │
│   │                                                                   │   │
│   │   <div class="quotation">                                        │   │
│   │     <h1>{{company_name}}</h1>                                     │   │
│   │     <p>Date: {{doc_date}}</p>                                     │   │
│   │     <table>                                                       │   │
│   │       {{#rows}}                                                   │   │
│   │       <tr>                                                        │   │
│   │         <td>{{product_name}}</td>                                 │   │
│   │         <td>{{quantity}}</td>                                      │   │
│   │         <td>{{price}}</td>                                         │   │
│   │       </tr>                                                       │   │
│   │       {{/rows}}                                                   │   │
│   │     </table>                                                      │   │
│   │     <p>Total: {{grand_total}}</p>                                 │   │
│   │   </div>                                                          │   │
│   └──────────────────────────────────┬───────────────────────────────┘   │
│                                      │                                   │
│                                      ▼                                   │
│   ┌──────────────────────────────────────────────────────────────────┐   │
│   │  Rendered Preview                                                 │   │
│   │   ──────────────────────────────────────────────────────────     │   │
│   │                                                                   │   │
│   │   ┌─────────────────────────────────────────────────────────┐    │   │
│   │   │              METTA DATA CENTER                           │    │   │
│   │   │              ─────────────────                           │    │   │
│   │   │   QUOTATION                                              │    │   │
│   │   │                                                          │    │   │
│   │   │   Date: 2026-07-15                                       │    │   │
│   │   │                                                          │    │   │
│   │   │   ┌──────────────┬──────────┬──────────────────┐        │    │   │
│   │   │   │   Product    │   Qty    │   Price          │        │    │   │
│   │   │   ├──────────────┼──────────┼──────────────────┤        │    │   │
│   │   │   │   Rack 42U   │    1     │   Rp7.000.000    │        │    │   │
│   │   │   │   Bandwidth  │   100M   │   Rp5.000.000    │        │    │   │
│   │   │   ├──────────────┼──────────┼──────────────────┤        │    │   │
│   │   │   │   Total      │          │   Rp12.000.000   │        │    │   │
│   │   │   └──────────────┴──────────┴──────────────────┘        │    │   │
│   │   └─────────────────────────────────────────────────────────┘    │   │
│   └──────────────────────────────────────────────────────────────────┘   │
│                                                                          │
│   Output: PDF (via Puppeteer) / Email / Screen Preview                    │
└──────────────────────────────────────────────────────────────────────────┘
```

---

### 10. Email & Notification System

| Tipe Email | Trigger | Konten |
|-----------|---------|--------|
| **Password Reset** | User klik "Forgot Password" | Link reset password (token, expiry) |
| **Admin Reset** | Admin reset password customer | New password via email |
| **Document Notification** | Doc state change | Detail perubahan dokumen |
| **Invoice Delivery** | Invoice generated | PDF attachment |

---

## Database Schema

```
┌──────────────────────────────────────────────────────────────────────────┐
│                      ENTITY RELATIONSHIP DIAGRAM                          │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│   ┌─────────┐      ┌─────────┐      ┌─────────────┐                     │
│   │   User  │─────▶│   Role  │─────▶│  Permission │                     │
│   └────┬────┘      └────┬────┘      └─────────────┘                     │
│        │ belongs_to      │ has_many                                      │
│        ▼                 ▼                                                │
│   ┌─────────┐      ┌────────────────┐                                   │
│   │ Company │      │ RolePermission │                                   │
│   └────┬────┘      └────────────────┘                                   │
│        │ 1:N                                                             │
│        ▼                                                                  │
│   ┌─────────┐      ┌─────────┐      ┌─────────┐      ┌─────────┐       │
│   │  Branch │─────▶│Building │─────▶│  Floor  │─────▶│  Room   │       │
│   └────┬────┘      └─────────┘      └─────────┘      └─────────┘       │
│        │                                                                  │
│        ▼                                                                  │
│   ┌──────────────┐      ┌─────────────┐                                 │
│   │ ProductGroup │      │  Inventory   │                                 │
│   └──────┬───────┘      └─────────────┘                                 │
│          │ 1:N                                                           │
│          ▼                                                                │
│   ┌──────────────┐  ┌───────────────────┐  ┌──────────────┐             │
│   │   Product    │─▶│ ProductSpecField  │  │ ProductPrice │             │
│   └──────────────┘  └───────────────────┘  └──────────────┘             │
│                                                                          │
│   ┌──────────┐      ┌─────────┐      ┌─────────────┐                   │
│   │ DocType  │─────▶│ DocField│      │ DocWorkflow │                   │
│   └────┬─────┘      └─────────┘      └─────────────┘                   │
│        │ 1:N                                                             │
│        ▼                                                                  │
│   ┌──────────────┐  ┌─────────────┐  ┌──────────────┐                   │
│   │  DocRecord   │─▶│   DocRow    │  │ DocPermission│                   │
│   └──────────────┘  └─────────────┘  └──────────────┘                   │
│                                                                          │
│   ┌────────────────────┐  ┌──────────────────┐                           │
│   │ InventoryMovement  │  │ DocNamingCounter │                           │
│   └────────────────────┘  └──────────────────┘                           │
└──────────────────────────────────────────────────────────────────────────┘
```

---

## Struktur Direktori

```
portalmetta/
├── prisma/
│   ├── schema.prisma          # Database schema (22 models)
│   ├── seed.ts                # Seed data
│   └── migrations/            # 11 migrations
├── src/
│   ├── app/
│   │   ├── admin/             # Admin Panel pages
│   │   │   ├── companies/     # Company management
│   │   │   ├── customers/     # Customer management
│   │   │   ├── doctypes/      # Document type config
│   │   │   ├── docs/          # Document management
│   │   │   ├── products/      # Product management
│   │   │   ├── rack-mapping/  # Rack visualization
│   │   │   ├── location-management/
│   │   │   ├── role-access/   # Permission management
│   │   │   └── settings/      # System settings
│   │   ├── customer/          # Customer Portal pages
│   │   │   ├── order/         # Product ordering
│   │   │   ├── billing/       # Invoice & billing
│   │   │   ├── my-racks/      # Rack ownership
│   │   │   ├── inbound-outbound/
│   │   │   ├── inventory/     # Customer inventory
│   │   │   ├── support/       # Support tickets
│   │   │   └── account/       # Account settings
│   │   ├── api/               # API routes
│   │   └── login/             # Authentication
│   ├── components/
│   │   ├── ui/                # shadcn/ui (20 components)
│   │   ├── customer/          # Customer-specific components
│   │   ├── products/          # Product config components
│   │   └── admin/             # Admin-specific components
│   ├── lib/
│   │   ├── auth.ts            # NextAuth configuration
│   │   ├── prisma.ts          # Prisma client
│   │   ├── billing.ts         # Billing calculations
│   │   ├── doc-data.ts        # Document data resolution
│   │   ├── doc-hooks.ts       # Document event hooks
│   │   ├── doc-renderer.ts    # HTML template renderer
│   │   ├── invoice-generator.ts
│   │   └── mail.ts            # Email service
│   └── hooks/                 # React hooks
├── scripts/                   # Utility scripts
├── docs/                      # Technical documentation
└── public/                    # Static assets & uploads
```

---

## Instalasi

### Prerequisites

- Node.js 20+
- MariaDB 10+
- npm atau yarn

### Setup

```bash
# Clone repository
git clone <repo-url>
cd portalmetta

# Install dependencies
npm install

# Konfigurasi environment
cp .env.example .env
# Edit .env dengan konfigurasi database dan email

# Database setup
npx prisma generate
npx prisma migrate dev
npx prisma db seed

# Jalankan development server
npm run dev
```

### Akun Default

| Email | Password | Role |
|-------|----------|------|
| `admin@example.com` | `admin123` | Admin |
| `superadmin@example.com` | `superadmin123` | Admin |
| `customer@example.com` | `customer123` | Customer |

---

## Scripts

```bash
npm run dev          # Development server
npm run build        # Production build
npm run start        # Start production server
npm run lint         # ESLint check
```

---

## License

Proprietary - PT Metta Data Center
