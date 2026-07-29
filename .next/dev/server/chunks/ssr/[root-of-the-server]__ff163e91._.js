module.exports = [
"[project]/src/lib/utils.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-rsc] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
}),
"[project]/src/components/ui/button.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Button",
    ()=>Button,
    "buttonVariants",
    ()=>buttonVariants
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-slot/dist/index.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/class-variance-authority/dist/index.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-rsc] (ecmascript)");
;
;
;
;
const buttonVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cva"])("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive", {
    variants: {
        variant: {
            default: "bg-primary text-primary-foreground hover:bg-primary/90",
            destructive: "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
            outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
            secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
            ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
            link: "text-primary underline-offset-4 hover:underline"
        },
        size: {
            default: "h-9 px-4 py-2 has-[>svg]:px-3",
            sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
            lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
            icon: "size-9",
            "icon-sm": "size-8",
            "icon-lg": "size-10"
        }
    },
    defaultVariants: {
        variant: "default",
        size: "default"
    }
});
function Button({ className, variant = "default", size = "default", asChild = false, ...props }) {
    const Comp = asChild ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Slot"] : "button";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(Comp, {
        "data-slot": "button",
        "data-variant": variant,
        "data-size": size,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cn"])(buttonVariants({
            variant,
            size,
            className
        })),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/button.tsx",
        lineNumber: 55,
        columnNumber: 5
    }, this);
}
;
}),
"[externals]/node:path [external] (node:path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:path", () => require("node:path"));

module.exports = mod;
}),
"[externals]/node:url [external] (node:url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:url", () => require("node:url"));

module.exports = mod;
}),
"[project]/src/generated/prisma/internal/class.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getPrismaClientClass",
    ()=>getPrismaClientClass
]);
/* !!! This is code generated by Prisma. Do not edit directly. !!! */ /* eslint-disable */ // biome-ignore-all lint: generated file
// @ts-nocheck 
/*
 * WARNING: This is an internal file that is subject to change!
 *
 * 🛑 Under no circumstances should you import this file directly! 🛑
 *
 * Please import the `PrismaClient` class from the `client.ts` file instead.
 */ var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client$2f$runtime$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2f$runtime$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__ = __turbopack_context__.i("[externals]/@prisma/client/runtime/client [external] (@prisma/client/runtime/client, cjs, [project]/node_modules/@prisma/client)");
;
const config = {
    "previewFeatures": [],
    "clientVersion": "7.2.0",
    "engineVersion": "0c8ef2ce45c83248ab3df073180d5eda9e8be7a3",
    "activeProvider": "mysql",
    "inlineSchema": "generator client {\n  provider = \"prisma-client\"\n  output   = \"../src/generated/prisma\"\n}\n\ndatasource db {\n  provider = \"mysql\"\n}\n\nmodel User {\n  id                   String                 @id @default(cuid())\n  email                String                 @unique\n  name                 String?\n  passwordHash         String\n  roleId               String\n  companyId            String?\n  resetToken           String?                @unique\n  resetTokenExpiry     DateTime?\n  createdAt            DateTime               @default(now())\n  updatedAt            DateTime               @updatedAt\n  address              String?\n  phoneNumber          String?\n  billingContactName   String?\n  billingEmail         String?\n  billingPhoneNumber   String?\n  country              String?\n  partnerType          PartnerType?\n  technicalContactName String?\n  technicalEmail       String?\n  technicalPhoneNumber String?\n  jobTitle             String?\n  picForCompanies      Company[]              @relation(\"CompanyPIC\")\n  assignedDocs         DocRecord[]            @relation(\"DocRecordAssignedTo\")\n  createdDocs          DocRecord[]            @relation(\"DocRecordCreatedBy\")\n  updatedDocs          DocRecord[]            @relation(\"DocRecordUpdatedBy\")\n  company              Company?               @relation(\"CompanyCustomers\", fields: [companyId], references: [id])\n  role                 Role                   @relation(fields: [roleId], references: [id])\n  assignedBranches     UserBranchAssignment[]\n\n  @@index([companyId], map: \"User_companyId_fkey\")\n  @@index([roleId], map: \"User_roleId_fkey\")\n}\n\nmodel Role {\n  id             String           @id @default(cuid())\n  name           String\n  description    String?\n  createdAt      DateTime         @default(now())\n  updatedAt      DateTime         @updatedAt\n  branchId       String?\n  docPermissions DocPermission[]\n  branch         Branch?          @relation(fields: [branchId], references: [id])\n  permissions    RolePermission[]\n  users          User[]\n\n  @@unique([branchId, name])\n}\n\nmodel Permission {\n  id          String           @id @default(cuid())\n  key         String           @unique\n  description String?\n  createdAt   DateTime         @default(now())\n  updatedAt   DateTime         @updatedAt\n  roles       RolePermission[]\n}\n\nmodel RolePermission {\n  roleId       String\n  permissionId String\n  permission   Permission @relation(fields: [permissionId], references: [id])\n  role         Role       @relation(fields: [roleId], references: [id])\n\n  @@id([roleId, permissionId])\n  @@index([permissionId], map: \"RolePermission_permissionId_fkey\")\n}\n\nmodel Company {\n  id                 String              @id @default(cuid())\n  name               String              @unique\n  createdAt          DateTime            @default(now())\n  updatedAt          DateTime            @updatedAt\n  address            String?\n  companyEmail       String?\n  companyPhoneNumber String?\n  fax                String?\n  isDataCenter       Boolean             @default(false)\n  parentId           String?\n  logoUrl            String?\n  picId              String?\n  branches           Branch[]\n  parent             Company?            @relation(\"CompanyHierarchy\", fields: [parentId], references: [id])\n  children           Company[]           @relation(\"CompanyHierarchy\")\n  pic                User?               @relation(\"CompanyPIC\", fields: [picId], references: [id])\n  customers          User[]              @relation(\"CompanyCustomers\")\n  inventoryMovements InventoryMovement[]\n\n  @@index([parentId], map: \"Company_parentId_fkey\")\n  @@index([picId], map: \"Company_picId_fkey\")\n}\n\nmodel Branch {\n  id                String                 @id @default(cuid())\n  name              String\n  code              String                 @unique\n  companyId         String?\n  createdAt         DateTime               @default(now())\n  updatedAt         DateTime               @updatedAt\n  company           Company?               @relation(fields: [companyId], references: [id])\n  buildings         Building[]\n  docNamingCounters DocNamingCounter[]\n  docRecords        DocRecord[]\n  docTypes          DocType[]\n  docWorkflows      DocWorkflow[]\n  products          Product[]\n  productGroups     ProductGroup[]\n  roles             Role[]\n  admins            UserBranchAssignment[]\n  inventory         Inventory[]\n\n  @@index([companyId], map: \"Branch_companyId_fkey\")\n}\n\nmodel Building {\n  id        String   @id @default(cuid())\n  name      String\n  branchId  String\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n  branch    Branch   @relation(fields: [branchId], references: [id])\n  floors    Floor[]\n\n  @@index([branchId], map: \"Building_branchId_fkey\")\n}\n\nmodel Floor {\n  id         String   @id @default(cuid())\n  name       String\n  level      Int\n  buildingId String\n  createdAt  DateTime @default(now())\n  updatedAt  DateTime @updatedAt\n  building   Building @relation(fields: [buildingId], references: [id])\n  rooms      Room[]\n\n  @@index([buildingId], map: \"Floor_buildingId_fkey\")\n}\n\nmodel Room {\n  id        String              @id @default(cuid())\n  name      String\n  floorId   String\n  createdAt DateTime            @default(now())\n  updatedAt DateTime            @updatedAt\n  floor     Floor               @relation(fields: [floorId], references: [id])\n  movements InventoryMovement[]\n\n  @@index([floorId], map: \"Room_floorId_fkey\")\n}\n\nmodel UserBranchAssignment {\n  userId     String\n  branchId   String\n  assignedAt DateTime @default(now())\n  branch     Branch   @relation(fields: [branchId], references: [id])\n  user       User     @relation(fields: [userId], references: [id])\n\n  @@id([userId, branchId])\n  @@index([branchId], map: \"UserBranchAssignment_branchId_fkey\")\n}\n\nmodel ProductGroup {\n  id          String         @id @default(cuid())\n  name        String\n  branchId    String\n  parentId    String?\n  description String?\n  createdAt   DateTime       @default(now())\n  updatedAt   DateTime       @updatedAt\n  products    Product[]\n  branch      Branch         @relation(fields: [branchId], references: [id])\n  parent      ProductGroup?  @relation(\"ProductGroupHierarchy\", fields: [parentId], references: [id])\n  children    ProductGroup[] @relation(\"ProductGroupHierarchy\")\n\n  @@index([branchId])\n  @@index([parentId], map: \"ProductGroup_parentId_fkey\")\n}\n\nmodel Product {\n  id             String             @id @default(cuid())\n  name           String\n  branchId       String\n  groupId        String?\n  classification PaymentModel\n  active         Boolean            @default(true)\n  createdAt      DateTime           @default(now())\n  updatedAt      DateTime           @updatedAt\n  description    String?\n  orderMode      OrderMode          @default(DIRECT)\n  branch         Branch             @relation(fields: [branchId], references: [id])\n  group          ProductGroup?      @relation(fields: [groupId], references: [id])\n  prices         ProductPrice[]\n  specs          ProductSpecField[]\n  inventory      Inventory[]\n\n  @@index([branchId])\n  @@index([groupId], map: \"Product_groupId_fkey\")\n}\n\nmodel ProductSpecField {\n  id        String    @id @default(cuid())\n  productId String\n  key       String\n  label     String\n  type      FieldType\n  required  Boolean   @default(false)\n  config    Json?\n  createdAt DateTime  @default(now())\n  updatedAt DateTime  @updatedAt\n  product   Product   @relation(fields: [productId], references: [id])\n\n  @@unique([productId, key])\n}\n\nmodel ProductPrice {\n  id           String       @id @default(cuid())\n  productId    String\n  currency     String       @default(\"IDR\")\n  basePrice    Int          @default(0)\n  setupFee     Int          @default(0)\n  pricingModel PricingModel\n  config       Json?\n  validFrom    DateTime?\n  validTo      DateTime?\n  createdAt    DateTime     @default(now())\n  updatedAt    DateTime     @updatedAt\n  product      Product      @relation(fields: [productId], references: [id])\n\n  @@index([productId], map: \"ProductPrice_productId_fkey\")\n}\n\nmodel Inventory {\n  id        String              @id @default(cuid())\n  productId String\n  branchId  String\n  quantity  Int                 @default(0)\n  createdAt DateTime            @default(now())\n  updatedAt DateTime            @updatedAt\n  product   Product             @relation(fields: [productId], references: [id])\n  branch    Branch              @relation(fields: [branchId], references: [id])\n  movements InventoryMovement[]\n\n  @@unique([productId, branchId])\n  @@index([productId])\n  @@index([branchId])\n}\n\nmodel InventoryMovement {\n  id              String     @id @default(cuid())\n  inventoryId     String?\n  quantity        Int // Positive for IN, Negative for OUT\n  reference       String? // DocRecord ID or Code\n  type            String // \"IN\" | \"OUT\" | \"ADJUSTMENT\"\n  roomId          String?\n  ownerCustomerId String?\n  metadata        Json?\n  createdAt       DateTime   @default(now())\n  inventory       Inventory? @relation(fields: [inventoryId], references: [id])\n  room            Room?      @relation(fields: [roomId], references: [id])\n  ownerCustomer   Company?   @relation(fields: [ownerCustomerId], references: [id])\n\n  @@index([inventoryId])\n  @@index([roomId])\n  @@index([ownerCustomerId])\n}\n\nmodel DocType {\n  id             String             @id @default(cuid())\n  key            String             @unique\n  name           String\n  description    String?\n  branchId       String?\n  config         Json?\n  createdAt      DateTime           @default(now())\n  updatedAt      DateTime           @updatedAt\n  icon           String?\n  hasPreview     Boolean            @default(false)\n  fields         DocField[]\n  namingCounters DocNamingCounter[]\n  permissions    DocPermission[]\n  records        DocRecord[]\n  childRows      DocRow[]           @relation(\"DocRowChildType\")\n  branch         Branch?            @relation(fields: [branchId], references: [id])\n  workflows      DocWorkflow[]\n\n  @@index([branchId])\n}\n\nmodel DocField {\n  id        String    @id @default(cuid())\n  docTypeId String\n  key       String\n  label     String\n  type      FieldType\n  required  Boolean   @default(false)\n  order     Int       @default(0)\n  config    Json?\n  createdAt DateTime  @default(now())\n  updatedAt DateTime  @updatedAt\n  readOnly  Boolean   @default(false)\n  docType   DocType   @relation(fields: [docTypeId], references: [id])\n\n  @@unique([docTypeId, key])\n}\n\nmodel DocRecord {\n  id           String      @id @default(cuid())\n  docTypeId    String\n  branchId     String?\n  status       String?\n  data         Json\n  createdById  String?\n  updatedById  String?\n  createdAt    DateTime    @default(now())\n  updatedAt    DateTime    @updatedAt\n  code         String?     @unique\n  docStatus    Int?\n  parentId     String?\n  assignedToId String?\n  assignedTo   User?       @relation(\"DocRecordAssignedTo\", fields: [assignedToId], references: [id])\n  branch       Branch?     @relation(fields: [branchId], references: [id])\n  createdBy    User?       @relation(\"DocRecordCreatedBy\", fields: [createdById], references: [id])\n  docType      DocType     @relation(fields: [docTypeId], references: [id])\n  parent       DocRecord?  @relation(\"DocRecordHierarchy\", fields: [parentId], references: [id])\n  children     DocRecord[] @relation(\"DocRecordHierarchy\")\n  updatedBy    User?       @relation(\"DocRecordUpdatedBy\", fields: [updatedById], references: [id])\n  rows         DocRow[]\n\n  @@index([docTypeId])\n  @@index([branchId])\n  @@index([parentId])\n  @@index([assignedToId], map: \"DocRecord_assignedToId_fkey\")\n  @@index([createdById], map: \"DocRecord_createdById_fkey\")\n  @@index([updatedById], map: \"DocRecord_updatedById_fkey\")\n}\n\nmodel DocRow {\n  id             String    @id @default(cuid())\n  recordId       String\n  childDocTypeId String?\n  idx            Int       @default(0)\n  data           Json\n  createdAt      DateTime  @default(now())\n  updatedAt      DateTime  @updatedAt\n  childDocType   DocType?  @relation(\"DocRowChildType\", fields: [childDocTypeId], references: [id])\n  record         DocRecord @relation(fields: [recordId], references: [id])\n\n  @@index([recordId])\n  @@index([childDocTypeId], map: \"DocRow_childDocTypeId_fkey\")\n}\n\nmodel DocPermission {\n  id        String   @id @default(cuid())\n  docTypeId String\n  roleId    String\n  canCreate Boolean  @default(false)\n  canRead   Boolean  @default(true)\n  canWrite  Boolean  @default(false)\n  canDelete Boolean  @default(false)\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n  canAssign Boolean  @default(false)\n  docType   DocType  @relation(fields: [docTypeId], references: [id])\n  role      Role     @relation(fields: [roleId], references: [id])\n\n  @@unique([docTypeId, roleId])\n  @@index([roleId], map: \"DocPermission_roleId_fkey\")\n}\n\nmodel DocWorkflow {\n  id                 String   @id @default(cuid())\n  docTypeId          String\n  branchId           String?\n  name               String\n  config             Json?\n  createdAt          DateTime @default(now())\n  updatedAt          DateTime @updatedAt\n  dontOverrideStatus Boolean  @default(false)\n  isActive           Boolean  @default(true)\n  branch             Branch?  @relation(fields: [branchId], references: [id])\n  docType            DocType  @relation(fields: [docTypeId], references: [id])\n\n  @@unique([docTypeId, branchId])\n  @@index([branchId])\n}\n\nmodel DocNamingCounter {\n  id        String   @id @default(cuid())\n  docTypeId String\n  branchId  String?\n  series    String\n  seq       Int      @default(0)\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n  branch    Branch?  @relation(fields: [branchId], references: [id])\n  docType   DocType  @relation(fields: [docTypeId], references: [id])\n\n  @@unique([docTypeId, branchId, series])\n  @@index([docTypeId, branchId])\n  @@index([branchId], map: \"DocNamingCounter_branchId_fkey\")\n}\n\nenum PartnerType {\n  RESELLER\n  END_USER\n}\n\nenum PaymentModel {\n  FREE\n  ONETIME\n  RECURRING\n}\n\nenum FieldType {\n  TEXT\n  TEXTAREA\n  NUMBER\n  PRICE\n  DROPDOWN\n  CHECKBOX\n  DATE\n  DATETIME\n  LINK\n  TABLE\n  ATTACHMENT\n}\n\nenum PricingModel {\n  FIXED\n  DISCOUNT\n  TIERED\n}\n\nenum OrderMode {\n  DIRECT\n  REQUEST\n}\n",
    "runtimeDataModel": {
        "models": {},
        "enums": {},
        "types": {}
    }
};
config.runtimeDataModel = JSON.parse("{\"models\":{\"User\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"email\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"name\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"passwordHash\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"roleId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"companyId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"resetToken\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"resetTokenExpiry\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"address\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"phoneNumber\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"billingContactName\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"billingEmail\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"billingPhoneNumber\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"country\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"partnerType\",\"kind\":\"enum\",\"type\":\"PartnerType\"},{\"name\":\"technicalContactName\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"technicalEmail\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"technicalPhoneNumber\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"jobTitle\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"picForCompanies\",\"kind\":\"object\",\"type\":\"Company\",\"relationName\":\"CompanyPIC\"},{\"name\":\"assignedDocs\",\"kind\":\"object\",\"type\":\"DocRecord\",\"relationName\":\"DocRecordAssignedTo\"},{\"name\":\"createdDocs\",\"kind\":\"object\",\"type\":\"DocRecord\",\"relationName\":\"DocRecordCreatedBy\"},{\"name\":\"updatedDocs\",\"kind\":\"object\",\"type\":\"DocRecord\",\"relationName\":\"DocRecordUpdatedBy\"},{\"name\":\"company\",\"kind\":\"object\",\"type\":\"Company\",\"relationName\":\"CompanyCustomers\"},{\"name\":\"role\",\"kind\":\"object\",\"type\":\"Role\",\"relationName\":\"RoleToUser\"},{\"name\":\"assignedBranches\",\"kind\":\"object\",\"type\":\"UserBranchAssignment\",\"relationName\":\"UserToUserBranchAssignment\"}],\"dbName\":null},\"Role\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"name\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"description\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"branchId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"docPermissions\",\"kind\":\"object\",\"type\":\"DocPermission\",\"relationName\":\"DocPermissionToRole\"},{\"name\":\"branch\",\"kind\":\"object\",\"type\":\"Branch\",\"relationName\":\"BranchToRole\"},{\"name\":\"permissions\",\"kind\":\"object\",\"type\":\"RolePermission\",\"relationName\":\"RoleToRolePermission\"},{\"name\":\"users\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"RoleToUser\"}],\"dbName\":null},\"Permission\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"key\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"description\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"roles\",\"kind\":\"object\",\"type\":\"RolePermission\",\"relationName\":\"PermissionToRolePermission\"}],\"dbName\":null},\"RolePermission\":{\"fields\":[{\"name\":\"roleId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"permissionId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"permission\",\"kind\":\"object\",\"type\":\"Permission\",\"relationName\":\"PermissionToRolePermission\"},{\"name\":\"role\",\"kind\":\"object\",\"type\":\"Role\",\"relationName\":\"RoleToRolePermission\"}],\"dbName\":null},\"Company\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"name\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"address\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"companyEmail\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"companyPhoneNumber\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"fax\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"isDataCenter\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"parentId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"logoUrl\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"picId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"branches\",\"kind\":\"object\",\"type\":\"Branch\",\"relationName\":\"BranchToCompany\"},{\"name\":\"parent\",\"kind\":\"object\",\"type\":\"Company\",\"relationName\":\"CompanyHierarchy\"},{\"name\":\"children\",\"kind\":\"object\",\"type\":\"Company\",\"relationName\":\"CompanyHierarchy\"},{\"name\":\"pic\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"CompanyPIC\"},{\"name\":\"customers\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"CompanyCustomers\"},{\"name\":\"inventoryMovements\",\"kind\":\"object\",\"type\":\"InventoryMovement\",\"relationName\":\"CompanyToInventoryMovement\"}],\"dbName\":null},\"Branch\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"name\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"code\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"companyId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"company\",\"kind\":\"object\",\"type\":\"Company\",\"relationName\":\"BranchToCompany\"},{\"name\":\"buildings\",\"kind\":\"object\",\"type\":\"Building\",\"relationName\":\"BranchToBuilding\"},{\"name\":\"docNamingCounters\",\"kind\":\"object\",\"type\":\"DocNamingCounter\",\"relationName\":\"BranchToDocNamingCounter\"},{\"name\":\"docRecords\",\"kind\":\"object\",\"type\":\"DocRecord\",\"relationName\":\"BranchToDocRecord\"},{\"name\":\"docTypes\",\"kind\":\"object\",\"type\":\"DocType\",\"relationName\":\"BranchToDocType\"},{\"name\":\"docWorkflows\",\"kind\":\"object\",\"type\":\"DocWorkflow\",\"relationName\":\"BranchToDocWorkflow\"},{\"name\":\"products\",\"kind\":\"object\",\"type\":\"Product\",\"relationName\":\"BranchToProduct\"},{\"name\":\"productGroups\",\"kind\":\"object\",\"type\":\"ProductGroup\",\"relationName\":\"BranchToProductGroup\"},{\"name\":\"roles\",\"kind\":\"object\",\"type\":\"Role\",\"relationName\":\"BranchToRole\"},{\"name\":\"admins\",\"kind\":\"object\",\"type\":\"UserBranchAssignment\",\"relationName\":\"BranchToUserBranchAssignment\"},{\"name\":\"inventory\",\"kind\":\"object\",\"type\":\"Inventory\",\"relationName\":\"BranchToInventory\"}],\"dbName\":null},\"Building\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"name\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"branchId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"branch\",\"kind\":\"object\",\"type\":\"Branch\",\"relationName\":\"BranchToBuilding\"},{\"name\":\"floors\",\"kind\":\"object\",\"type\":\"Floor\",\"relationName\":\"BuildingToFloor\"}],\"dbName\":null},\"Floor\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"name\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"level\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"buildingId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"building\",\"kind\":\"object\",\"type\":\"Building\",\"relationName\":\"BuildingToFloor\"},{\"name\":\"rooms\",\"kind\":\"object\",\"type\":\"Room\",\"relationName\":\"FloorToRoom\"}],\"dbName\":null},\"Room\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"name\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"floorId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"floor\",\"kind\":\"object\",\"type\":\"Floor\",\"relationName\":\"FloorToRoom\"},{\"name\":\"movements\",\"kind\":\"object\",\"type\":\"InventoryMovement\",\"relationName\":\"InventoryMovementToRoom\"}],\"dbName\":null},\"UserBranchAssignment\":{\"fields\":[{\"name\":\"userId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"branchId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"assignedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"branch\",\"kind\":\"object\",\"type\":\"Branch\",\"relationName\":\"BranchToUserBranchAssignment\"},{\"name\":\"user\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"UserToUserBranchAssignment\"}],\"dbName\":null},\"ProductGroup\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"name\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"branchId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"parentId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"description\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"products\",\"kind\":\"object\",\"type\":\"Product\",\"relationName\":\"ProductToProductGroup\"},{\"name\":\"branch\",\"kind\":\"object\",\"type\":\"Branch\",\"relationName\":\"BranchToProductGroup\"},{\"name\":\"parent\",\"kind\":\"object\",\"type\":\"ProductGroup\",\"relationName\":\"ProductGroupHierarchy\"},{\"name\":\"children\",\"kind\":\"object\",\"type\":\"ProductGroup\",\"relationName\":\"ProductGroupHierarchy\"}],\"dbName\":null},\"Product\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"name\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"branchId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"groupId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"classification\",\"kind\":\"enum\",\"type\":\"PaymentModel\"},{\"name\":\"active\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"description\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"orderMode\",\"kind\":\"enum\",\"type\":\"OrderMode\"},{\"name\":\"branch\",\"kind\":\"object\",\"type\":\"Branch\",\"relationName\":\"BranchToProduct\"},{\"name\":\"group\",\"kind\":\"object\",\"type\":\"ProductGroup\",\"relationName\":\"ProductToProductGroup\"},{\"name\":\"prices\",\"kind\":\"object\",\"type\":\"ProductPrice\",\"relationName\":\"ProductToProductPrice\"},{\"name\":\"specs\",\"kind\":\"object\",\"type\":\"ProductSpecField\",\"relationName\":\"ProductToProductSpecField\"},{\"name\":\"inventory\",\"kind\":\"object\",\"type\":\"Inventory\",\"relationName\":\"InventoryToProduct\"}],\"dbName\":null},\"ProductSpecField\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"productId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"key\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"label\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"type\",\"kind\":\"enum\",\"type\":\"FieldType\"},{\"name\":\"required\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"config\",\"kind\":\"scalar\",\"type\":\"Json\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"product\",\"kind\":\"object\",\"type\":\"Product\",\"relationName\":\"ProductToProductSpecField\"}],\"dbName\":null},\"ProductPrice\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"productId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"currency\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"basePrice\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"setupFee\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"pricingModel\",\"kind\":\"enum\",\"type\":\"PricingModel\"},{\"name\":\"config\",\"kind\":\"scalar\",\"type\":\"Json\"},{\"name\":\"validFrom\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"validTo\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"product\",\"kind\":\"object\",\"type\":\"Product\",\"relationName\":\"ProductToProductPrice\"}],\"dbName\":null},\"Inventory\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"productId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"branchId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"quantity\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"product\",\"kind\":\"object\",\"type\":\"Product\",\"relationName\":\"InventoryToProduct\"},{\"name\":\"branch\",\"kind\":\"object\",\"type\":\"Branch\",\"relationName\":\"BranchToInventory\"},{\"name\":\"movements\",\"kind\":\"object\",\"type\":\"InventoryMovement\",\"relationName\":\"InventoryToInventoryMovement\"}],\"dbName\":null},\"InventoryMovement\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"inventoryId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"quantity\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"reference\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"type\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"roomId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"ownerCustomerId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"metadata\",\"kind\":\"scalar\",\"type\":\"Json\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"inventory\",\"kind\":\"object\",\"type\":\"Inventory\",\"relationName\":\"InventoryToInventoryMovement\"},{\"name\":\"room\",\"kind\":\"object\",\"type\":\"Room\",\"relationName\":\"InventoryMovementToRoom\"},{\"name\":\"ownerCustomer\",\"kind\":\"object\",\"type\":\"Company\",\"relationName\":\"CompanyToInventoryMovement\"}],\"dbName\":null},\"DocType\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"key\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"name\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"description\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"branchId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"config\",\"kind\":\"scalar\",\"type\":\"Json\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"icon\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"hasPreview\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"fields\",\"kind\":\"object\",\"type\":\"DocField\",\"relationName\":\"DocFieldToDocType\"},{\"name\":\"namingCounters\",\"kind\":\"object\",\"type\":\"DocNamingCounter\",\"relationName\":\"DocNamingCounterToDocType\"},{\"name\":\"permissions\",\"kind\":\"object\",\"type\":\"DocPermission\",\"relationName\":\"DocPermissionToDocType\"},{\"name\":\"records\",\"kind\":\"object\",\"type\":\"DocRecord\",\"relationName\":\"DocRecordToDocType\"},{\"name\":\"childRows\",\"kind\":\"object\",\"type\":\"DocRow\",\"relationName\":\"DocRowChildType\"},{\"name\":\"branch\",\"kind\":\"object\",\"type\":\"Branch\",\"relationName\":\"BranchToDocType\"},{\"name\":\"workflows\",\"kind\":\"object\",\"type\":\"DocWorkflow\",\"relationName\":\"DocTypeToDocWorkflow\"}],\"dbName\":null},\"DocField\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"docTypeId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"key\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"label\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"type\",\"kind\":\"enum\",\"type\":\"FieldType\"},{\"name\":\"required\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"order\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"config\",\"kind\":\"scalar\",\"type\":\"Json\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"readOnly\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"docType\",\"kind\":\"object\",\"type\":\"DocType\",\"relationName\":\"DocFieldToDocType\"}],\"dbName\":null},\"DocRecord\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"docTypeId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"branchId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"status\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"data\",\"kind\":\"scalar\",\"type\":\"Json\"},{\"name\":\"createdById\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"updatedById\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"code\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"docStatus\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"parentId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"assignedToId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"assignedTo\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"DocRecordAssignedTo\"},{\"name\":\"branch\",\"kind\":\"object\",\"type\":\"Branch\",\"relationName\":\"BranchToDocRecord\"},{\"name\":\"createdBy\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"DocRecordCreatedBy\"},{\"name\":\"docType\",\"kind\":\"object\",\"type\":\"DocType\",\"relationName\":\"DocRecordToDocType\"},{\"name\":\"parent\",\"kind\":\"object\",\"type\":\"DocRecord\",\"relationName\":\"DocRecordHierarchy\"},{\"name\":\"children\",\"kind\":\"object\",\"type\":\"DocRecord\",\"relationName\":\"DocRecordHierarchy\"},{\"name\":\"updatedBy\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"DocRecordUpdatedBy\"},{\"name\":\"rows\",\"kind\":\"object\",\"type\":\"DocRow\",\"relationName\":\"DocRecordToDocRow\"}],\"dbName\":null},\"DocRow\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"recordId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"childDocTypeId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"idx\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"data\",\"kind\":\"scalar\",\"type\":\"Json\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"childDocType\",\"kind\":\"object\",\"type\":\"DocType\",\"relationName\":\"DocRowChildType\"},{\"name\":\"record\",\"kind\":\"object\",\"type\":\"DocRecord\",\"relationName\":\"DocRecordToDocRow\"}],\"dbName\":null},\"DocPermission\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"docTypeId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"roleId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"canCreate\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"canRead\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"canWrite\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"canDelete\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"canAssign\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"docType\",\"kind\":\"object\",\"type\":\"DocType\",\"relationName\":\"DocPermissionToDocType\"},{\"name\":\"role\",\"kind\":\"object\",\"type\":\"Role\",\"relationName\":\"DocPermissionToRole\"}],\"dbName\":null},\"DocWorkflow\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"docTypeId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"branchId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"name\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"config\",\"kind\":\"scalar\",\"type\":\"Json\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"dontOverrideStatus\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"isActive\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"branch\",\"kind\":\"object\",\"type\":\"Branch\",\"relationName\":\"BranchToDocWorkflow\"},{\"name\":\"docType\",\"kind\":\"object\",\"type\":\"DocType\",\"relationName\":\"DocTypeToDocWorkflow\"}],\"dbName\":null},\"DocNamingCounter\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"docTypeId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"branchId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"series\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"seq\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"branch\",\"kind\":\"object\",\"type\":\"Branch\",\"relationName\":\"BranchToDocNamingCounter\"},{\"name\":\"docType\",\"kind\":\"object\",\"type\":\"DocType\",\"relationName\":\"DocNamingCounterToDocType\"}],\"dbName\":null}},\"enums\":{},\"types\":{}}");
async function decodeBase64AsWasm(wasmBase64) {
    const { Buffer } = await __turbopack_context__.A("[externals]/node:buffer [external] (node:buffer, cjs, async loader)");
    const wasmArray = Buffer.from(wasmBase64, 'base64');
    return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
    getRuntime: async ()=>await __turbopack_context__.A("[externals]/@prisma/client/runtime/query_compiler_bg.mysql.mjs [external] (@prisma/client/runtime/query_compiler_bg.mysql.mjs, esm_import, [project]/node_modules/@prisma/client, async loader)"),
    getQueryCompilerWasmModule: async ()=>{
        const { wasm } = await __turbopack_context__.A("[externals]/@prisma/client/runtime/query_compiler_bg.mysql.wasm-base64.mjs [external] (@prisma/client/runtime/query_compiler_bg.mysql.wasm-base64.mjs, esm_import, [project]/node_modules/@prisma/client, async loader)");
        return await decodeBase64AsWasm(wasm);
    }
};
function getPrismaClientClass() {
    return __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client$2f$runtime$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2f$runtime$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["getPrismaClient"](config);
}
}),
"[project]/src/generated/prisma/internal/prismaNamespace.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AnyNull",
    ()=>AnyNull,
    "BranchOrderByRelevanceFieldEnum",
    ()=>BranchOrderByRelevanceFieldEnum,
    "BranchScalarFieldEnum",
    ()=>BranchScalarFieldEnum,
    "BuildingOrderByRelevanceFieldEnum",
    ()=>BuildingOrderByRelevanceFieldEnum,
    "BuildingScalarFieldEnum",
    ()=>BuildingScalarFieldEnum,
    "CompanyOrderByRelevanceFieldEnum",
    ()=>CompanyOrderByRelevanceFieldEnum,
    "CompanyScalarFieldEnum",
    ()=>CompanyScalarFieldEnum,
    "DbNull",
    ()=>DbNull,
    "Decimal",
    ()=>Decimal,
    "DocFieldOrderByRelevanceFieldEnum",
    ()=>DocFieldOrderByRelevanceFieldEnum,
    "DocFieldScalarFieldEnum",
    ()=>DocFieldScalarFieldEnum,
    "DocNamingCounterOrderByRelevanceFieldEnum",
    ()=>DocNamingCounterOrderByRelevanceFieldEnum,
    "DocNamingCounterScalarFieldEnum",
    ()=>DocNamingCounterScalarFieldEnum,
    "DocPermissionOrderByRelevanceFieldEnum",
    ()=>DocPermissionOrderByRelevanceFieldEnum,
    "DocPermissionScalarFieldEnum",
    ()=>DocPermissionScalarFieldEnum,
    "DocRecordOrderByRelevanceFieldEnum",
    ()=>DocRecordOrderByRelevanceFieldEnum,
    "DocRecordScalarFieldEnum",
    ()=>DocRecordScalarFieldEnum,
    "DocRowOrderByRelevanceFieldEnum",
    ()=>DocRowOrderByRelevanceFieldEnum,
    "DocRowScalarFieldEnum",
    ()=>DocRowScalarFieldEnum,
    "DocTypeOrderByRelevanceFieldEnum",
    ()=>DocTypeOrderByRelevanceFieldEnum,
    "DocTypeScalarFieldEnum",
    ()=>DocTypeScalarFieldEnum,
    "DocWorkflowOrderByRelevanceFieldEnum",
    ()=>DocWorkflowOrderByRelevanceFieldEnum,
    "DocWorkflowScalarFieldEnum",
    ()=>DocWorkflowScalarFieldEnum,
    "FloorOrderByRelevanceFieldEnum",
    ()=>FloorOrderByRelevanceFieldEnum,
    "FloorScalarFieldEnum",
    ()=>FloorScalarFieldEnum,
    "InventoryMovementOrderByRelevanceFieldEnum",
    ()=>InventoryMovementOrderByRelevanceFieldEnum,
    "InventoryMovementScalarFieldEnum",
    ()=>InventoryMovementScalarFieldEnum,
    "InventoryOrderByRelevanceFieldEnum",
    ()=>InventoryOrderByRelevanceFieldEnum,
    "InventoryScalarFieldEnum",
    ()=>InventoryScalarFieldEnum,
    "JsonNull",
    ()=>JsonNull,
    "JsonNullValueFilter",
    ()=>JsonNullValueFilter,
    "JsonNullValueInput",
    ()=>JsonNullValueInput,
    "ModelName",
    ()=>ModelName,
    "NullTypes",
    ()=>NullTypes,
    "NullableJsonNullValueInput",
    ()=>NullableJsonNullValueInput,
    "NullsOrder",
    ()=>NullsOrder,
    "PermissionOrderByRelevanceFieldEnum",
    ()=>PermissionOrderByRelevanceFieldEnum,
    "PermissionScalarFieldEnum",
    ()=>PermissionScalarFieldEnum,
    "PrismaClientInitializationError",
    ()=>PrismaClientInitializationError,
    "PrismaClientKnownRequestError",
    ()=>PrismaClientKnownRequestError,
    "PrismaClientRustPanicError",
    ()=>PrismaClientRustPanicError,
    "PrismaClientUnknownRequestError",
    ()=>PrismaClientUnknownRequestError,
    "PrismaClientValidationError",
    ()=>PrismaClientValidationError,
    "ProductGroupOrderByRelevanceFieldEnum",
    ()=>ProductGroupOrderByRelevanceFieldEnum,
    "ProductGroupScalarFieldEnum",
    ()=>ProductGroupScalarFieldEnum,
    "ProductOrderByRelevanceFieldEnum",
    ()=>ProductOrderByRelevanceFieldEnum,
    "ProductPriceOrderByRelevanceFieldEnum",
    ()=>ProductPriceOrderByRelevanceFieldEnum,
    "ProductPriceScalarFieldEnum",
    ()=>ProductPriceScalarFieldEnum,
    "ProductScalarFieldEnum",
    ()=>ProductScalarFieldEnum,
    "ProductSpecFieldOrderByRelevanceFieldEnum",
    ()=>ProductSpecFieldOrderByRelevanceFieldEnum,
    "ProductSpecFieldScalarFieldEnum",
    ()=>ProductSpecFieldScalarFieldEnum,
    "QueryMode",
    ()=>QueryMode,
    "RoleOrderByRelevanceFieldEnum",
    ()=>RoleOrderByRelevanceFieldEnum,
    "RolePermissionOrderByRelevanceFieldEnum",
    ()=>RolePermissionOrderByRelevanceFieldEnum,
    "RolePermissionScalarFieldEnum",
    ()=>RolePermissionScalarFieldEnum,
    "RoleScalarFieldEnum",
    ()=>RoleScalarFieldEnum,
    "RoomOrderByRelevanceFieldEnum",
    ()=>RoomOrderByRelevanceFieldEnum,
    "RoomScalarFieldEnum",
    ()=>RoomScalarFieldEnum,
    "SortOrder",
    ()=>SortOrder,
    "Sql",
    ()=>Sql,
    "TransactionIsolationLevel",
    ()=>TransactionIsolationLevel,
    "UserBranchAssignmentOrderByRelevanceFieldEnum",
    ()=>UserBranchAssignmentOrderByRelevanceFieldEnum,
    "UserBranchAssignmentScalarFieldEnum",
    ()=>UserBranchAssignmentScalarFieldEnum,
    "UserOrderByRelevanceFieldEnum",
    ()=>UserOrderByRelevanceFieldEnum,
    "UserScalarFieldEnum",
    ()=>UserScalarFieldEnum,
    "defineExtension",
    ()=>defineExtension,
    "empty",
    ()=>empty,
    "getExtensionContext",
    ()=>getExtensionContext,
    "join",
    ()=>join,
    "prismaVersion",
    ()=>prismaVersion,
    "raw",
    ()=>raw,
    "sql",
    ()=>sql
]);
/* !!! This is code generated by Prisma. Do not edit directly. !!! */ /* eslint-disable */ // biome-ignore-all lint: generated file
// @ts-nocheck 
/*
 * WARNING: This is an internal file that is subject to change!
 *
 * 🛑 Under no circumstances should you import this file directly! 🛑
 *
 * All exports from this file are wrapped under a `Prisma` namespace object in the client.ts file.
 * While this enables partial backward compatibility, it is not part of the stable public API.
 *
 * If you are looking for your Models, Enums, and Input Types, please import them from the respective
 * model files in the `model` directory!
 */ var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client$2f$runtime$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2f$runtime$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__ = __turbopack_context__.i("[externals]/@prisma/client/runtime/client [external] (@prisma/client/runtime/client, cjs, [project]/node_modules/@prisma/client)");
;
const PrismaClientKnownRequestError = __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client$2f$runtime$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2f$runtime$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["PrismaClientKnownRequestError"];
const PrismaClientUnknownRequestError = __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client$2f$runtime$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2f$runtime$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["PrismaClientUnknownRequestError"];
const PrismaClientRustPanicError = __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client$2f$runtime$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2f$runtime$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["PrismaClientRustPanicError"];
const PrismaClientInitializationError = __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client$2f$runtime$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2f$runtime$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["PrismaClientInitializationError"];
const PrismaClientValidationError = __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client$2f$runtime$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2f$runtime$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["PrismaClientValidationError"];
const sql = __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client$2f$runtime$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2f$runtime$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["sqltag"];
const empty = __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client$2f$runtime$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2f$runtime$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["empty"];
const join = __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client$2f$runtime$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2f$runtime$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["join"];
const raw = __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client$2f$runtime$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2f$runtime$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["raw"];
const Sql = __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client$2f$runtime$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2f$runtime$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["Sql"];
const Decimal = __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client$2f$runtime$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2f$runtime$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["Decimal"];
const getExtensionContext = __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client$2f$runtime$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2f$runtime$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["Extensions"].getExtensionContext;
const prismaVersion = {
    client: "7.2.0",
    engine: "0c8ef2ce45c83248ab3df073180d5eda9e8be7a3"
};
const NullTypes = {
    DbNull: __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client$2f$runtime$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2f$runtime$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["NullTypes"].DbNull,
    JsonNull: __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client$2f$runtime$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2f$runtime$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["NullTypes"].JsonNull,
    AnyNull: __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client$2f$runtime$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2f$runtime$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["NullTypes"].AnyNull
};
const DbNull = __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client$2f$runtime$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2f$runtime$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["DbNull"];
const JsonNull = __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client$2f$runtime$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2f$runtime$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["JsonNull"];
const AnyNull = __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client$2f$runtime$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2f$runtime$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["AnyNull"];
const ModelName = {
    User: 'User',
    Role: 'Role',
    Permission: 'Permission',
    RolePermission: 'RolePermission',
    Company: 'Company',
    Branch: 'Branch',
    Building: 'Building',
    Floor: 'Floor',
    Room: 'Room',
    UserBranchAssignment: 'UserBranchAssignment',
    ProductGroup: 'ProductGroup',
    Product: 'Product',
    ProductSpecField: 'ProductSpecField',
    ProductPrice: 'ProductPrice',
    Inventory: 'Inventory',
    InventoryMovement: 'InventoryMovement',
    DocType: 'DocType',
    DocField: 'DocField',
    DocRecord: 'DocRecord',
    DocRow: 'DocRow',
    DocPermission: 'DocPermission',
    DocWorkflow: 'DocWorkflow',
    DocNamingCounter: 'DocNamingCounter'
};
const TransactionIsolationLevel = __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client$2f$runtime$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2f$runtime$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["makeStrictEnum"]({
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
});
const UserScalarFieldEnum = {
    id: 'id',
    email: 'email',
    name: 'name',
    passwordHash: 'passwordHash',
    roleId: 'roleId',
    companyId: 'companyId',
    resetToken: 'resetToken',
    resetTokenExpiry: 'resetTokenExpiry',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    address: 'address',
    phoneNumber: 'phoneNumber',
    billingContactName: 'billingContactName',
    billingEmail: 'billingEmail',
    billingPhoneNumber: 'billingPhoneNumber',
    country: 'country',
    partnerType: 'partnerType',
    technicalContactName: 'technicalContactName',
    technicalEmail: 'technicalEmail',
    technicalPhoneNumber: 'technicalPhoneNumber',
    jobTitle: 'jobTitle'
};
const RoleScalarFieldEnum = {
    id: 'id',
    name: 'name',
    description: 'description',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    branchId: 'branchId'
};
const PermissionScalarFieldEnum = {
    id: 'id',
    key: 'key',
    description: 'description',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
const RolePermissionScalarFieldEnum = {
    roleId: 'roleId',
    permissionId: 'permissionId'
};
const CompanyScalarFieldEnum = {
    id: 'id',
    name: 'name',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    address: 'address',
    companyEmail: 'companyEmail',
    companyPhoneNumber: 'companyPhoneNumber',
    fax: 'fax',
    isDataCenter: 'isDataCenter',
    parentId: 'parentId',
    logoUrl: 'logoUrl',
    picId: 'picId'
};
const BranchScalarFieldEnum = {
    id: 'id',
    name: 'name',
    code: 'code',
    companyId: 'companyId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
const BuildingScalarFieldEnum = {
    id: 'id',
    name: 'name',
    branchId: 'branchId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
const FloorScalarFieldEnum = {
    id: 'id',
    name: 'name',
    level: 'level',
    buildingId: 'buildingId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
const RoomScalarFieldEnum = {
    id: 'id',
    name: 'name',
    floorId: 'floorId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
const UserBranchAssignmentScalarFieldEnum = {
    userId: 'userId',
    branchId: 'branchId',
    assignedAt: 'assignedAt'
};
const ProductGroupScalarFieldEnum = {
    id: 'id',
    name: 'name',
    branchId: 'branchId',
    parentId: 'parentId',
    description: 'description',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
const ProductScalarFieldEnum = {
    id: 'id',
    name: 'name',
    branchId: 'branchId',
    groupId: 'groupId',
    classification: 'classification',
    active: 'active',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    description: 'description',
    orderMode: 'orderMode'
};
const ProductSpecFieldScalarFieldEnum = {
    id: 'id',
    productId: 'productId',
    key: 'key',
    label: 'label',
    type: 'type',
    required: 'required',
    config: 'config',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
const ProductPriceScalarFieldEnum = {
    id: 'id',
    productId: 'productId',
    currency: 'currency',
    basePrice: 'basePrice',
    setupFee: 'setupFee',
    pricingModel: 'pricingModel',
    config: 'config',
    validFrom: 'validFrom',
    validTo: 'validTo',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
const InventoryScalarFieldEnum = {
    id: 'id',
    productId: 'productId',
    branchId: 'branchId',
    quantity: 'quantity',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
const InventoryMovementScalarFieldEnum = {
    id: 'id',
    inventoryId: 'inventoryId',
    quantity: 'quantity',
    reference: 'reference',
    type: 'type',
    roomId: 'roomId',
    ownerCustomerId: 'ownerCustomerId',
    metadata: 'metadata',
    createdAt: 'createdAt'
};
const DocTypeScalarFieldEnum = {
    id: 'id',
    key: 'key',
    name: 'name',
    description: 'description',
    branchId: 'branchId',
    config: 'config',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    icon: 'icon',
    hasPreview: 'hasPreview'
};
const DocFieldScalarFieldEnum = {
    id: 'id',
    docTypeId: 'docTypeId',
    key: 'key',
    label: 'label',
    type: 'type',
    required: 'required',
    order: 'order',
    config: 'config',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    readOnly: 'readOnly'
};
const DocRecordScalarFieldEnum = {
    id: 'id',
    docTypeId: 'docTypeId',
    branchId: 'branchId',
    status: 'status',
    data: 'data',
    createdById: 'createdById',
    updatedById: 'updatedById',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    code: 'code',
    docStatus: 'docStatus',
    parentId: 'parentId',
    assignedToId: 'assignedToId'
};
const DocRowScalarFieldEnum = {
    id: 'id',
    recordId: 'recordId',
    childDocTypeId: 'childDocTypeId',
    idx: 'idx',
    data: 'data',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
const DocPermissionScalarFieldEnum = {
    id: 'id',
    docTypeId: 'docTypeId',
    roleId: 'roleId',
    canCreate: 'canCreate',
    canRead: 'canRead',
    canWrite: 'canWrite',
    canDelete: 'canDelete',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    canAssign: 'canAssign'
};
const DocWorkflowScalarFieldEnum = {
    id: 'id',
    docTypeId: 'docTypeId',
    branchId: 'branchId',
    name: 'name',
    config: 'config',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    dontOverrideStatus: 'dontOverrideStatus',
    isActive: 'isActive'
};
const DocNamingCounterScalarFieldEnum = {
    id: 'id',
    docTypeId: 'docTypeId',
    branchId: 'branchId',
    series: 'series',
    seq: 'seq',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
const SortOrder = {
    asc: 'asc',
    desc: 'desc'
};
const NullableJsonNullValueInput = {
    DbNull: DbNull,
    JsonNull: JsonNull
};
const JsonNullValueInput = {
    JsonNull: JsonNull
};
const NullsOrder = {
    first: 'first',
    last: 'last'
};
const UserOrderByRelevanceFieldEnum = {
    id: 'id',
    email: 'email',
    name: 'name',
    passwordHash: 'passwordHash',
    roleId: 'roleId',
    companyId: 'companyId',
    resetToken: 'resetToken',
    address: 'address',
    phoneNumber: 'phoneNumber',
    billingContactName: 'billingContactName',
    billingEmail: 'billingEmail',
    billingPhoneNumber: 'billingPhoneNumber',
    country: 'country',
    technicalContactName: 'technicalContactName',
    technicalEmail: 'technicalEmail',
    technicalPhoneNumber: 'technicalPhoneNumber',
    jobTitle: 'jobTitle'
};
const RoleOrderByRelevanceFieldEnum = {
    id: 'id',
    name: 'name',
    description: 'description',
    branchId: 'branchId'
};
const PermissionOrderByRelevanceFieldEnum = {
    id: 'id',
    key: 'key',
    description: 'description'
};
const RolePermissionOrderByRelevanceFieldEnum = {
    roleId: 'roleId',
    permissionId: 'permissionId'
};
const CompanyOrderByRelevanceFieldEnum = {
    id: 'id',
    name: 'name',
    address: 'address',
    companyEmail: 'companyEmail',
    companyPhoneNumber: 'companyPhoneNumber',
    fax: 'fax',
    parentId: 'parentId',
    logoUrl: 'logoUrl',
    picId: 'picId'
};
const BranchOrderByRelevanceFieldEnum = {
    id: 'id',
    name: 'name',
    code: 'code',
    companyId: 'companyId'
};
const BuildingOrderByRelevanceFieldEnum = {
    id: 'id',
    name: 'name',
    branchId: 'branchId'
};
const FloorOrderByRelevanceFieldEnum = {
    id: 'id',
    name: 'name',
    buildingId: 'buildingId'
};
const RoomOrderByRelevanceFieldEnum = {
    id: 'id',
    name: 'name',
    floorId: 'floorId'
};
const UserBranchAssignmentOrderByRelevanceFieldEnum = {
    userId: 'userId',
    branchId: 'branchId'
};
const ProductGroupOrderByRelevanceFieldEnum = {
    id: 'id',
    name: 'name',
    branchId: 'branchId',
    parentId: 'parentId',
    description: 'description'
};
const ProductOrderByRelevanceFieldEnum = {
    id: 'id',
    name: 'name',
    branchId: 'branchId',
    groupId: 'groupId',
    description: 'description'
};
const JsonNullValueFilter = {
    DbNull: DbNull,
    JsonNull: JsonNull,
    AnyNull: AnyNull
};
const QueryMode = {
    default: 'default',
    insensitive: 'insensitive'
};
const ProductSpecFieldOrderByRelevanceFieldEnum = {
    id: 'id',
    productId: 'productId',
    key: 'key',
    label: 'label'
};
const ProductPriceOrderByRelevanceFieldEnum = {
    id: 'id',
    productId: 'productId',
    currency: 'currency'
};
const InventoryOrderByRelevanceFieldEnum = {
    id: 'id',
    productId: 'productId',
    branchId: 'branchId'
};
const InventoryMovementOrderByRelevanceFieldEnum = {
    id: 'id',
    inventoryId: 'inventoryId',
    reference: 'reference',
    type: 'type',
    roomId: 'roomId',
    ownerCustomerId: 'ownerCustomerId'
};
const DocTypeOrderByRelevanceFieldEnum = {
    id: 'id',
    key: 'key',
    name: 'name',
    description: 'description',
    branchId: 'branchId',
    icon: 'icon'
};
const DocFieldOrderByRelevanceFieldEnum = {
    id: 'id',
    docTypeId: 'docTypeId',
    key: 'key',
    label: 'label'
};
const DocRecordOrderByRelevanceFieldEnum = {
    id: 'id',
    docTypeId: 'docTypeId',
    branchId: 'branchId',
    status: 'status',
    createdById: 'createdById',
    updatedById: 'updatedById',
    code: 'code',
    parentId: 'parentId',
    assignedToId: 'assignedToId'
};
const DocRowOrderByRelevanceFieldEnum = {
    id: 'id',
    recordId: 'recordId',
    childDocTypeId: 'childDocTypeId'
};
const DocPermissionOrderByRelevanceFieldEnum = {
    id: 'id',
    docTypeId: 'docTypeId',
    roleId: 'roleId'
};
const DocWorkflowOrderByRelevanceFieldEnum = {
    id: 'id',
    docTypeId: 'docTypeId',
    branchId: 'branchId',
    name: 'name'
};
const DocNamingCounterOrderByRelevanceFieldEnum = {
    id: 'id',
    docTypeId: 'docTypeId',
    branchId: 'branchId',
    series: 'series'
};
const defineExtension = __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client$2f$runtime$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2f$runtime$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["Extensions"].defineExtension;
}),
"[project]/src/generated/prisma/enums.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* !!! This is code generated by Prisma. Do not edit directly. !!! */ /* eslint-disable */ // biome-ignore-all lint: generated file
// @ts-nocheck 
/*
* This file exports all enum related types from the schema.
*
* 🟢 You can import this file directly.
*/ __turbopack_context__.s([
    "FieldType",
    ()=>FieldType,
    "OrderMode",
    ()=>OrderMode,
    "PartnerType",
    ()=>PartnerType,
    "PaymentModel",
    ()=>PaymentModel,
    "PricingModel",
    ()=>PricingModel
]);
const PartnerType = {
    RESELLER: 'RESELLER',
    END_USER: 'END_USER'
};
const PaymentModel = {
    FREE: 'FREE',
    ONETIME: 'ONETIME',
    RECURRING: 'RECURRING'
};
const FieldType = {
    TEXT: 'TEXT',
    TEXTAREA: 'TEXTAREA',
    NUMBER: 'NUMBER',
    PRICE: 'PRICE',
    DROPDOWN: 'DROPDOWN',
    CHECKBOX: 'CHECKBOX',
    DATE: 'DATE',
    DATETIME: 'DATETIME',
    LINK: 'LINK',
    TABLE: 'TABLE',
    ATTACHMENT: 'ATTACHMENT'
};
const PricingModel = {
    FIXED: 'FIXED',
    DISCOUNT: 'DISCOUNT',
    TIERED: 'TIERED'
};
const OrderMode = {
    DIRECT: 'DIRECT',
    REQUEST: 'REQUEST'
};
}),
"[project]/src/generated/prisma/client.ts [app-rsc] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

/* !!! This is code generated by Prisma. Do not edit directly. !!! */ /* eslint-disable */ // biome-ignore-all lint: generated file
// @ts-nocheck 
/*
 * This file should be your main import to use Prisma. Through it you get access to all the models, enums, and input types.
 * If you're looking for something you can import in the client-side of your application, please refer to the `browser.ts` file instead.
 *
 * 🟢 You can import this file directly.
 */ __turbopack_context__.s([
    "PrismaClient",
    ()=>PrismaClient
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:path [external] (node:path, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$url__$5b$external$5d$__$28$node$3a$url$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:url [external] (node:url, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$generated$2f$prisma$2f$internal$2f$class$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/generated/prisma/internal/class.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$generated$2f$prisma$2f$internal$2f$prismaNamespace$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/generated/prisma/internal/prismaNamespace.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$generated$2f$prisma$2f$enums$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/generated/prisma/enums.ts [app-rsc] (ecmascript)");
const __TURBOPACK__import$2e$meta__ = {
    get url () {
        return `file://${__turbopack_context__.P("src/generated/prisma/client.ts")}`;
    }
};
;
;
globalThis['__dirname'] = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["dirname"]((0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$url__$5b$external$5d$__$28$node$3a$url$2c$__cjs$29$__["fileURLToPath"])(__TURBOPACK__import$2e$meta__.url));
;
;
;
;
const PrismaClient = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$generated$2f$prisma$2f$internal$2f$class$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getPrismaClientClass"]();
;
}),
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}),
"[externals]/net [external] (net, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("net", () => require("net"));

module.exports = mod;
}),
"[externals]/buffer [external] (buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("buffer", () => require("buffer"));

module.exports = mod;
}),
"[externals]/string_decoder [external] (string_decoder, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("string_decoder", () => require("string_decoder"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[externals]/tls [external] (tls, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("tls", () => require("tls"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/os [external] (os, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("os", () => require("os"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[project]/src/lib/prisma.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "prisma",
    ()=>prisma
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$generated$2f$prisma$2f$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/generated/prisma/client.ts [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$adapter$2d$mariadb$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@prisma/adapter-mariadb/dist/index.mjs [app-rsc] (ecmascript)");
;
;
const globalForPrisma = globalThis;
function ensureClient() {
    const existing = globalForPrisma.prismaInstance;
    if (existing) {
        return existing;
    }
    const adapter = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$adapter$2d$mariadb$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PrismaMariaDb"]({
        host: process.env.DATABASE_HOST || "localhost",
        user: process.env.DATABASE_USER || "root",
        password: process.env.DATABASE_PASSWORD || "",
        database: process.env.DATABASE_NAME || "mettadc",
        connectionLimit: 20
    });
    const c = new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$generated$2f$prisma$2f$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["PrismaClient"]({
        log: [
            "error"
        ],
        adapter
    });
    if ("TURBOPACK compile-time truthy", 1) {
        globalForPrisma.prismaInstance = c;
    }
    return c;
}
const prisma = ensureClient();
}),
"[externals]/url [external] (url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}),
"[externals]/http [external] (http, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}),
"[externals]/assert [external] (assert, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("assert", () => require("assert"));

module.exports = mod;
}),
"[externals]/querystring [external] (querystring, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("querystring", () => require("querystring"));

module.exports = mod;
}),
"[externals]/https [external] (https, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}),
"[externals]/node:fs/promises [external] (node:fs/promises, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:fs/promises", () => require("node:fs/promises"));

module.exports = mod;
}),
"[project]/src/lib/auth.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "authOptions",
    ()=>authOptions
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$providers$2f$credentials$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-auth/providers/credentials.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/prisma.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/bcryptjs/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:fs/promises [external] (node:fs/promises, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:path [external] (node:path, cjs)");
;
;
;
;
;
const authOptions = {
    session: {
        strategy: "jwt"
    },
    providers: [
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$providers$2f$credentials$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"])({
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "email"
                },
                password: {
                    label: "Password",
                    type: "password"
                }
            },
            authorize: async (credentials)=>{
                if (!credentials?.email || !credentials?.password) return null;
                const user = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].user.findUnique({
                    where: {
                        email: credentials.email
                    },
                    include: {
                        role: {
                            include: {
                                permissions: {
                                    include: {
                                        permission: true
                                    }
                                }
                            }
                        }
                    }
                });
                if (!user) return null;
                const ok = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].compare(credentials.password, user.passwordHash);
                if (!ok) return null;
                const perm = new Set((user.role?.permissions ?? []).map((rp)=>rp.permission.key));
                const roleName = perm.has("ADMIN_PANEL_ACCESS") ? "ADMIN" : user.role.name;
                return {
                    id: user.id,
                    email: user.email,
                    name: user.name ?? user.email,
                    role: roleName
                };
            }
        })
    ],
    pages: {
        signIn: "/login"
    },
    callbacks: {
        async jwt ({ token, user }) {
            if (user) {
                const u = user;
                const t = token;
                t.id = u.id;
                t.role = u.role;
                return t;
            }
            return token;
        },
        async session ({ session, token }) {
            const t = token;
            const id = t.id;
            if (id && session.user) {
                const dir = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(process.cwd(), "public", "uploads", "avatars");
                const candidates = [
                    "png",
                    "jpg",
                    "svg"
                ];
                for (const ext of candidates){
                    try {
                        await __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__["default"].access(__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(dir, `${id}.${ext}`));
                        session.user.image = `/uploads/avatars/${id}.${ext}`;
                        break;
                    } catch  {}
                }
            }
            return session;
        }
    }
};
}),
"[project]/src/components/ui/sidebar.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Sidebar",
    ()=>Sidebar,
    "SidebarContent",
    ()=>SidebarContent,
    "SidebarFooter",
    ()=>SidebarFooter,
    "SidebarGroup",
    ()=>SidebarGroup,
    "SidebarGroupAction",
    ()=>SidebarGroupAction,
    "SidebarGroupContent",
    ()=>SidebarGroupContent,
    "SidebarGroupLabel",
    ()=>SidebarGroupLabel,
    "SidebarHeader",
    ()=>SidebarHeader,
    "SidebarInput",
    ()=>SidebarInput,
    "SidebarInset",
    ()=>SidebarInset,
    "SidebarMenu",
    ()=>SidebarMenu,
    "SidebarMenuAction",
    ()=>SidebarMenuAction,
    "SidebarMenuBadge",
    ()=>SidebarMenuBadge,
    "SidebarMenuButton",
    ()=>SidebarMenuButton,
    "SidebarMenuItem",
    ()=>SidebarMenuItem,
    "SidebarMenuSkeleton",
    ()=>SidebarMenuSkeleton,
    "SidebarMenuSub",
    ()=>SidebarMenuSub,
    "SidebarMenuSubButton",
    ()=>SidebarMenuSubButton,
    "SidebarMenuSubItem",
    ()=>SidebarMenuSubItem,
    "SidebarProvider",
    ()=>SidebarProvider,
    "SidebarRail",
    ()=>SidebarRail,
    "SidebarSeparator",
    ()=>SidebarSeparator,
    "SidebarTrigger",
    ()=>SidebarTrigger,
    "useSidebar",
    ()=>useSidebar
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const Sidebar = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call Sidebar() from the server but Sidebar is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/ui/sidebar.tsx <module evaluation>", "Sidebar");
const SidebarContent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call SidebarContent() from the server but SidebarContent is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/ui/sidebar.tsx <module evaluation>", "SidebarContent");
const SidebarFooter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call SidebarFooter() from the server but SidebarFooter is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/ui/sidebar.tsx <module evaluation>", "SidebarFooter");
const SidebarGroup = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call SidebarGroup() from the server but SidebarGroup is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/ui/sidebar.tsx <module evaluation>", "SidebarGroup");
const SidebarGroupAction = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call SidebarGroupAction() from the server but SidebarGroupAction is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/ui/sidebar.tsx <module evaluation>", "SidebarGroupAction");
const SidebarGroupContent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call SidebarGroupContent() from the server but SidebarGroupContent is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/ui/sidebar.tsx <module evaluation>", "SidebarGroupContent");
const SidebarGroupLabel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call SidebarGroupLabel() from the server but SidebarGroupLabel is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/ui/sidebar.tsx <module evaluation>", "SidebarGroupLabel");
const SidebarHeader = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call SidebarHeader() from the server but SidebarHeader is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/ui/sidebar.tsx <module evaluation>", "SidebarHeader");
const SidebarInput = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call SidebarInput() from the server but SidebarInput is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/ui/sidebar.tsx <module evaluation>", "SidebarInput");
const SidebarInset = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call SidebarInset() from the server but SidebarInset is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/ui/sidebar.tsx <module evaluation>", "SidebarInset");
const SidebarMenu = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call SidebarMenu() from the server but SidebarMenu is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/ui/sidebar.tsx <module evaluation>", "SidebarMenu");
const SidebarMenuAction = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call SidebarMenuAction() from the server but SidebarMenuAction is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/ui/sidebar.tsx <module evaluation>", "SidebarMenuAction");
const SidebarMenuBadge = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call SidebarMenuBadge() from the server but SidebarMenuBadge is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/ui/sidebar.tsx <module evaluation>", "SidebarMenuBadge");
const SidebarMenuButton = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call SidebarMenuButton() from the server but SidebarMenuButton is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/ui/sidebar.tsx <module evaluation>", "SidebarMenuButton");
const SidebarMenuItem = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call SidebarMenuItem() from the server but SidebarMenuItem is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/ui/sidebar.tsx <module evaluation>", "SidebarMenuItem");
const SidebarMenuSkeleton = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call SidebarMenuSkeleton() from the server but SidebarMenuSkeleton is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/ui/sidebar.tsx <module evaluation>", "SidebarMenuSkeleton");
const SidebarMenuSub = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call SidebarMenuSub() from the server but SidebarMenuSub is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/ui/sidebar.tsx <module evaluation>", "SidebarMenuSub");
const SidebarMenuSubButton = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call SidebarMenuSubButton() from the server but SidebarMenuSubButton is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/ui/sidebar.tsx <module evaluation>", "SidebarMenuSubButton");
const SidebarMenuSubItem = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call SidebarMenuSubItem() from the server but SidebarMenuSubItem is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/ui/sidebar.tsx <module evaluation>", "SidebarMenuSubItem");
const SidebarProvider = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call SidebarProvider() from the server but SidebarProvider is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/ui/sidebar.tsx <module evaluation>", "SidebarProvider");
const SidebarRail = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call SidebarRail() from the server but SidebarRail is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/ui/sidebar.tsx <module evaluation>", "SidebarRail");
const SidebarSeparator = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call SidebarSeparator() from the server but SidebarSeparator is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/ui/sidebar.tsx <module evaluation>", "SidebarSeparator");
const SidebarTrigger = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call SidebarTrigger() from the server but SidebarTrigger is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/ui/sidebar.tsx <module evaluation>", "SidebarTrigger");
const useSidebar = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call useSidebar() from the server but useSidebar is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/ui/sidebar.tsx <module evaluation>", "useSidebar");
}),
"[project]/src/components/ui/sidebar.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Sidebar",
    ()=>Sidebar,
    "SidebarContent",
    ()=>SidebarContent,
    "SidebarFooter",
    ()=>SidebarFooter,
    "SidebarGroup",
    ()=>SidebarGroup,
    "SidebarGroupAction",
    ()=>SidebarGroupAction,
    "SidebarGroupContent",
    ()=>SidebarGroupContent,
    "SidebarGroupLabel",
    ()=>SidebarGroupLabel,
    "SidebarHeader",
    ()=>SidebarHeader,
    "SidebarInput",
    ()=>SidebarInput,
    "SidebarInset",
    ()=>SidebarInset,
    "SidebarMenu",
    ()=>SidebarMenu,
    "SidebarMenuAction",
    ()=>SidebarMenuAction,
    "SidebarMenuBadge",
    ()=>SidebarMenuBadge,
    "SidebarMenuButton",
    ()=>SidebarMenuButton,
    "SidebarMenuItem",
    ()=>SidebarMenuItem,
    "SidebarMenuSkeleton",
    ()=>SidebarMenuSkeleton,
    "SidebarMenuSub",
    ()=>SidebarMenuSub,
    "SidebarMenuSubButton",
    ()=>SidebarMenuSubButton,
    "SidebarMenuSubItem",
    ()=>SidebarMenuSubItem,
    "SidebarProvider",
    ()=>SidebarProvider,
    "SidebarRail",
    ()=>SidebarRail,
    "SidebarSeparator",
    ()=>SidebarSeparator,
    "SidebarTrigger",
    ()=>SidebarTrigger,
    "useSidebar",
    ()=>useSidebar
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const Sidebar = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call Sidebar() from the server but Sidebar is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/ui/sidebar.tsx", "Sidebar");
const SidebarContent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call SidebarContent() from the server but SidebarContent is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/ui/sidebar.tsx", "SidebarContent");
const SidebarFooter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call SidebarFooter() from the server but SidebarFooter is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/ui/sidebar.tsx", "SidebarFooter");
const SidebarGroup = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call SidebarGroup() from the server but SidebarGroup is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/ui/sidebar.tsx", "SidebarGroup");
const SidebarGroupAction = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call SidebarGroupAction() from the server but SidebarGroupAction is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/ui/sidebar.tsx", "SidebarGroupAction");
const SidebarGroupContent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call SidebarGroupContent() from the server but SidebarGroupContent is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/ui/sidebar.tsx", "SidebarGroupContent");
const SidebarGroupLabel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call SidebarGroupLabel() from the server but SidebarGroupLabel is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/ui/sidebar.tsx", "SidebarGroupLabel");
const SidebarHeader = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call SidebarHeader() from the server but SidebarHeader is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/ui/sidebar.tsx", "SidebarHeader");
const SidebarInput = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call SidebarInput() from the server but SidebarInput is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/ui/sidebar.tsx", "SidebarInput");
const SidebarInset = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call SidebarInset() from the server but SidebarInset is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/ui/sidebar.tsx", "SidebarInset");
const SidebarMenu = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call SidebarMenu() from the server but SidebarMenu is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/ui/sidebar.tsx", "SidebarMenu");
const SidebarMenuAction = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call SidebarMenuAction() from the server but SidebarMenuAction is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/ui/sidebar.tsx", "SidebarMenuAction");
const SidebarMenuBadge = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call SidebarMenuBadge() from the server but SidebarMenuBadge is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/ui/sidebar.tsx", "SidebarMenuBadge");
const SidebarMenuButton = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call SidebarMenuButton() from the server but SidebarMenuButton is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/ui/sidebar.tsx", "SidebarMenuButton");
const SidebarMenuItem = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call SidebarMenuItem() from the server but SidebarMenuItem is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/ui/sidebar.tsx", "SidebarMenuItem");
const SidebarMenuSkeleton = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call SidebarMenuSkeleton() from the server but SidebarMenuSkeleton is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/ui/sidebar.tsx", "SidebarMenuSkeleton");
const SidebarMenuSub = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call SidebarMenuSub() from the server but SidebarMenuSub is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/ui/sidebar.tsx", "SidebarMenuSub");
const SidebarMenuSubButton = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call SidebarMenuSubButton() from the server but SidebarMenuSubButton is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/ui/sidebar.tsx", "SidebarMenuSubButton");
const SidebarMenuSubItem = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call SidebarMenuSubItem() from the server but SidebarMenuSubItem is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/ui/sidebar.tsx", "SidebarMenuSubItem");
const SidebarProvider = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call SidebarProvider() from the server but SidebarProvider is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/ui/sidebar.tsx", "SidebarProvider");
const SidebarRail = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call SidebarRail() from the server but SidebarRail is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/ui/sidebar.tsx", "SidebarRail");
const SidebarSeparator = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call SidebarSeparator() from the server but SidebarSeparator is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/ui/sidebar.tsx", "SidebarSeparator");
const SidebarTrigger = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call SidebarTrigger() from the server but SidebarTrigger is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/ui/sidebar.tsx", "SidebarTrigger");
const useSidebar = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call useSidebar() from the server but useSidebar is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/ui/sidebar.tsx", "useSidebar");
}),
"[project]/src/components/ui/sidebar.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$sidebar$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/components/ui/sidebar.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$sidebar$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/src/components/ui/sidebar.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$sidebar$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/src/components/app-sidebar.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AppSidebar",
    ()=>AppSidebar
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const AppSidebar = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call AppSidebar() from the server but AppSidebar is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/app-sidebar.tsx <module evaluation>", "AppSidebar");
}),
"[project]/src/components/app-sidebar.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AppSidebar",
    ()=>AppSidebar
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const AppSidebar = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call AppSidebar() from the server but AppSidebar is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/app-sidebar.tsx", "AppSidebar");
}),
"[project]/src/components/app-sidebar.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$app$2d$sidebar$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/components/app-sidebar.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$app$2d$sidebar$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/src/components/app-sidebar.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$app$2d$sidebar$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/src/components/admin-breadcrumbs.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AdminBreadcrumbs",
    ()=>AdminBreadcrumbs
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const AdminBreadcrumbs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call AdminBreadcrumbs() from the server but AdminBreadcrumbs is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/admin-breadcrumbs.tsx <module evaluation>", "AdminBreadcrumbs");
}),
"[project]/src/components/admin-breadcrumbs.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AdminBreadcrumbs",
    ()=>AdminBreadcrumbs
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const AdminBreadcrumbs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call AdminBreadcrumbs() from the server but AdminBreadcrumbs is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/admin-breadcrumbs.tsx", "AdminBreadcrumbs");
}),
"[project]/src/components/admin-breadcrumbs.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$admin$2d$breadcrumbs$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/components/admin-breadcrumbs.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$admin$2d$breadcrumbs$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/src/components/admin-breadcrumbs.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$admin$2d$breadcrumbs$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/src/components/user-menu.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "UserMenu",
    ()=>UserMenu
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const UserMenu = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call UserMenu() from the server but UserMenu is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/user-menu.tsx <module evaluation>", "UserMenu");
}),
"[project]/src/components/user-menu.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "UserMenu",
    ()=>UserMenu
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const UserMenu = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call UserMenu() from the server but UserMenu is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/user-menu.tsx", "UserMenu");
}),
"[project]/src/components/user-menu.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$user$2d$menu$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/components/user-menu.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$user$2d$menu$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/src/components/user-menu.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$user$2d$menu$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/src/components/toast.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ToastHost",
    ()=>ToastHost
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const ToastHost = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call ToastHost() from the server but ToastHost is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/toast.tsx <module evaluation>", "ToastHost");
}),
"[project]/src/components/toast.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ToastHost",
    ()=>ToastHost
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const ToastHost = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call ToastHost() from the server but ToastHost is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/toast.tsx", "ToastHost");
}),
"[project]/src/components/toast.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$toast$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/components/toast.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$toast$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/src/components/toast.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$toast$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/src/components/navigation-loading.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "NavigationLoadingOverlay",
    ()=>NavigationLoadingOverlay
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const NavigationLoadingOverlay = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call NavigationLoadingOverlay() from the server but NavigationLoadingOverlay is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/navigation-loading.tsx <module evaluation>", "NavigationLoadingOverlay");
}),
"[project]/src/components/navigation-loading.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "NavigationLoadingOverlay",
    ()=>NavigationLoadingOverlay
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const NavigationLoadingOverlay = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call NavigationLoadingOverlay() from the server but NavigationLoadingOverlay is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/navigation-loading.tsx", "NavigationLoadingOverlay");
}),
"[project]/src/components/navigation-loading.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$navigation$2d$loading$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/components/navigation-loading.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$navigation$2d$loading$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/src/components/navigation-loading.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$navigation$2d$loading$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/src/app/admin/layout.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "$$RSC_SERVER_ACTION_0",
    ()=>$$RSC_SERVER_ACTION_0,
    "$$RSC_SERVER_ACTION_1",
    ()=>$$RSC_SERVER_ACTION_1,
    "default",
    ()=>AdminLayout
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
/* __next_internal_action_entry_do_not_use__ [{"00d499b4fcbd55fa1b7eb958c5da1b6f921ae2d34c":"$$RSC_SERVER_ACTION_1","403cef642a57b0975b8254e008e61d34b710700710":"$$RSC_SERVER_ACTION_0"},"",""] */ var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/bell.js [app-rsc] (ecmascript) <export default as Bell>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$life$2d$buoy$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__LifeBuoy$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/life-buoy.js [app-rsc] (ecmascript) <export default as LifeBuoy>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$grid$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutGrid$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/layout-grid.js [app-rsc] (ecmascript) <export default as LayoutGrid>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$qr$2d$code$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__QrCode$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/qr-code.js [app-rsc] (ecmascript) <export default as QrCode>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/prisma.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-auth/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/auth.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/headers.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$api$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/api/navigation.react-server.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/components/navigation.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$sidebar$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/sidebar.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$app$2d$sidebar$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/app-sidebar.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$admin$2d$breadcrumbs$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/admin-breadcrumbs.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$user$2d$menu$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/user-menu.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$toast$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/toast.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$navigation$2d$loading$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/navigation-loading.tsx [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
const $$RSC_SERVER_ACTION_0 = async function setBranchFilter(formData) {
    const branchId = String(formData.get("branchId") || "");
    if (!branchId) return;
    const store = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])();
    store.set("branchId", branchId, {
        path: "/"
    });
    const referer = (await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["headers"])()).get("referer") || "/admin";
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])(referer);
};
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])($$RSC_SERVER_ACTION_0, "403cef642a57b0975b8254e008e61d34b710700710", null);
var setBranchFilter = $$RSC_SERVER_ACTION_0;
const $$RSC_SERVER_ACTION_1 = async function clearImpersonation() {
    const store = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])();
    store.delete("impersonateUserId");
};
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])($$RSC_SERVER_ACTION_1, "00d499b4fcbd55fa1b7eb958c5da1b6f921ae2d34c", null);
var clearImpersonation = $$RSC_SERVER_ACTION_1;
async function AdminLayout({ children }) {
    const session = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getServerSession"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["authOptions"]);
    const email = session?.user?.email ?? "";
    const me = email ? await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].user.findUnique({
        where: {
            email
        },
        select: {
            id: true,
            name: true,
            companyId: true,
            role: {
                select: {
                    id: true,
                    name: true,
                    permissions: {
                        include: {
                            permission: true
                        }
                    }
                }
            }
        }
    }) : null;
    const perm = new Set(me?.role?.permissions?.map((rp)=>rp.permission.key) ?? []);
    const isSuper = perm.has("COMPANY_MANAGEMENT");
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])();
    const assignedBranches = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].branch.findMany({
        where: {
            admins: {
                some: {
                    userId: me?.id ?? ""
                }
            }
        },
        orderBy: {
            name: "asc"
        }
    });
    const useStrictAssigned = assignedBranches.length > 0 && !isSuper;
    const superBranches = isSuper ? await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].branch.findMany({
        where: {
            OR: [
                {
                    companyId: me?.companyId ?? undefined
                },
                {
                    company: {
                        parentId: me?.companyId ?? undefined
                    }
                }
            ]
        },
        orderBy: {
            name: "asc"
        }
    }) : [];
    const baseBranches = useStrictAssigned ? assignedBranches : superBranches.length > 0 ? superBranches : await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].branch.findMany({
        where: {
            companyId: me?.companyId ?? undefined
        },
        orderBy: {
            name: "asc"
        }
    });
    const branchesMap = new Map();
    for (const b of baseBranches)branchesMap.set(b.id, {
        id: b.id,
        name: b.name
    });
    for (const b of assignedBranches)branchesMap.set(b.id, {
        id: b.id,
        name: b.name
    });
    const branches = Array.from(branchesMap.values());
    const cookieBranchId = cookieStore.get("branchId")?.value;
    const isImpersonating = Boolean(cookieStore.get("impersonateUserId")?.value);
    const candidateBranchId = cookieBranchId ?? branches[0]?.id;
    const allowedBranchIds = new Set(branches.map((b)=>b.id));
    const selectedBranchId = allowedBranchIds.has(String(candidateBranchId)) ? candidateBranchId : branches[0]?.id;
    const company = me?.companyId ? await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].company.findUnique({
        where: {
            id: me.companyId
        },
        select: {
            logoUrl: true,
            name: true
        }
    }) : null;
    const docTypesAll = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].docType.findMany({
        select: {
            id: true,
            key: true,
            name: true,
            branchId: true,
            config: true,
            icon: true,
            permissions: {
                where: {
                    roleId: me?.role?.id
                }
            }
        }
    });
    const childDocTypeKeys = new Set();
    for (const dt of docTypesAll){
        const cfg = dt.config ?? {};
        if (cfg.childDocTypeKey) childDocTypeKeys.add(cfg.childDocTypeKey);
        if (cfg.childDocTypes) {
            for (const k of Object.values(cfg.childDocTypes)){
                if (typeof k === "string") childDocTypeKeys.add(k);
            }
        }
    }
    const navDocTypes = docTypesAll.filter((dt)=>{
        if (dt.branchId && dt.branchId !== selectedBranchId) return false;
        if (childDocTypeKeys.has(dt.key)) {
            if (dt.key.endsWith("_item") || dt.key.endsWith("_row") || dt.key.endsWith("_detail") || dt.key === "rack_patch_panel" || dt.key === "rack_hardware" || dt.key === "cross_connect") {
                return false;
            }
        }
        if (dt.key === "support_ticket") return false;
        const p = dt.permissions[0];
        const hasGlobalAccess = perm.has("DOCUMENTS_MANAGEMENT") || perm.has("ADMIN_PANEL_ACCESS");
        return p && p.canRead || hasGlobalAccess;
    }).sort((a, b)=>a.name.localeCompare(b.name));
    const notifyEnabledIds = docTypesAll.filter((dt)=>{
        const cfg = dt.config ?? {};
        return Boolean(cfg.notifyConfig?.adminEnabled);
    }).map((dt)=>dt.id);
    const notifyDocTypes = new Map(docTypesAll.filter((dt)=>notifyEnabledIds.includes(dt.id)).map((dt)=>[
            dt.id,
            dt
        ]));
    const recentRecords = notifyEnabledIds.length > 0 ? await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].docRecord.findMany({
        where: {
            docTypeId: {
                in: notifyEnabledIds
            },
            ...selectedBranchId ? {
                branchId: selectedBranchId
            } : {}
        },
        orderBy: {
            updatedAt: "desc"
        },
        take: 20
    }) : [];
    const notifItems = recentRecords.flatMap((r)=>{
        const d = r.data ?? {};
        const acts = Array.isArray(d["__activity"]) ? d["__activity"] : [];
        const lastStatus = acts.filter((a)=>a.text.startsWith("Status diubah:"));
        const a = lastStatus.length > 0 ? lastStatus[lastStatus.length - 1] : null;
        return a ? [
            {
                at: a.at,
                text: a.text,
                recordId: r.id,
                docTypeId: r.docTypeId
            }
        ] : [];
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$sidebar$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SidebarProvider"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$app$2d$sidebar$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["AppSidebar"], {
                company: company,
                branches: branches,
                selectedBranchId: selectedBranchId,
                setBranchFilter: setBranchFilter,
                canManageCompanies: perm.has("COMPANY_MANAGEMENT"),
                canManageCustomers: perm.has("CUSTOMER_MANAGEMENT"),
                canManageDoctypes: perm.has("DOCTYPE_MANAGEMENT"),
                canManageDocuments: perm.has("DOCUMENTS_MANAGEMENT"),
                canManageVisits: perm.has("VISITING_MANAGEMENT") || perm.has("ADMIN_PANEL_ACCESS"),
                showSettings: perm.has("ADMIN_PANEL_ACCESS"),
                roleName: me?.role?.name,
                docTypes: navDocTypes
            }, void 0, false, {
                fileName: "[project]/src/app/admin/layout.tsx",
                lineNumber: 116,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$sidebar$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SidebarInset"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$navigation$2d$loading$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["NavigationLoadingOverlay"], {}, void 0, false, {
                        fileName: "[project]/src/app/admin/layout.tsx",
                        lineNumber: 131,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                        className: "sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/60",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex h-14 items-center gap-3 px-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$sidebar$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SidebarTrigger"], {
                                            className: "text-slate-500 hover:text-slate-900 hover:bg-slate-100/80 transition-colors -ml-1"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/admin/layout.tsx",
                                            lineNumber: 137,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-px h-5 bg-slate-200"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/admin/layout.tsx",
                                            lineNumber: 138,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$admin$2d$breadcrumbs$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["AdminBreadcrumbs"], {}, void 0, false, {
                                            fileName: "[project]/src/app/admin/layout.tsx",
                                            lineNumber: 139,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/admin/layout.tsx",
                                    lineNumber: 136,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "ml-auto flex items-center gap-1.5",
                                    children: [
                                        isImpersonating ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                            action: clearImpersonation,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Button"], {
                                                variant: "outline",
                                                size: "sm",
                                                className: "h-8 text-xs font-medium border-slate-200 text-slate-600 hover:bg-slate-50",
                                                children: "Kembali ke Super Admin"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/admin/layout.tsx",
                                                lineNumber: 145,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/admin/layout.tsx",
                                            lineNumber: 144,
                                            columnNumber: 17
                                        }, this) : null,
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/admin/rack-mapping",
                                            className: "flex items-center gap-2 px-3 py-2 text-[13px] font-medium text-slate-500 hover:text-slate-900 hover:bg-slate-100/80 rounded-lg transition-all",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$grid$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutGrid$3e$__["LayoutGrid"], {
                                                    className: "w-4 h-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/admin/layout.tsx",
                                                    lineNumber: 155,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "hidden sm:inline",
                                                    children: "Rack"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/admin/layout.tsx",
                                                    lineNumber: 156,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/admin/layout.tsx",
                                            lineNumber: 151,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/admin/docs/support_ticket",
                                            className: "flex items-center gap-2 px-3 py-2 text-[13px] font-medium text-slate-500 hover:text-slate-900 hover:bg-slate-100/80 rounded-lg transition-all",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$life$2d$buoy$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__LifeBuoy$3e$__["LifeBuoy"], {
                                                    className: "w-4 h-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/admin/layout.tsx",
                                                    lineNumber: 163,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "hidden sm:inline",
                                                    children: "Support"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/admin/layout.tsx",
                                                    lineNumber: 164,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/admin/layout.tsx",
                                            lineNumber: 159,
                                            columnNumber: 15
                                        }, this),
                                        (perm.has("VISITING_MANAGEMENT") || perm.has("ADMIN_PANEL_ACCESS")) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/admin/visits/scanner",
                                            className: "flex items-center gap-2 px-3 py-2 text-[13px] font-medium text-slate-500 hover:text-slate-900 hover:bg-slate-100/80 rounded-lg transition-all",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$qr$2d$code$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__QrCode$3e$__["QrCode"], {
                                                    className: "w-4 h-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/admin/layout.tsx",
                                                    lineNumber: 172,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "hidden sm:inline",
                                                    children: "Scanner"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/admin/layout.tsx",
                                                    lineNumber: 173,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/admin/layout.tsx",
                                            lineNumber: 168,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-px h-5 bg-slate-200 mx-1"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/admin/layout.tsx",
                                            lineNumber: 177,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "relative group",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    className: "relative flex items-center justify-center w-9 h-9 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100/80 transition-all",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__["Bell"], {
                                                            className: "w-4 h-4"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/admin/layout.tsx",
                                                            lineNumber: 182,
                                                            columnNumber: 19
                                                        }, this),
                                                        notifItems.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "absolute -top-0.5 -right-0.5 inline-flex items-center justify-center rounded-full bg-red-500 text-white text-[10px] min-w-[18px] h-[18px] px-1 font-semibold ring-2 ring-white",
                                                            children: notifItems.length > 99 ? "99+" : notifItems.length
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/admin/layout.tsx",
                                                            lineNumber: 184,
                                                            columnNumber: 21
                                                        }, this) : null
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/admin/layout.tsx",
                                                    lineNumber: 181,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "invisible group-hover:invisible opacity-0 group-hover:opacity-100 absolute right-0 mt-1 w-80 bg-white rounded-xl border border-slate-200/60 shadow-xl shadow-slate-900/5 transition-all duration-200 pointer-events-none group-hover:pointer-events-auto z-50",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "px-4 py-3 border-b border-slate-100",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-xs font-semibold text-slate-900",
                                                                children: "Notifications"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/admin/layout.tsx",
                                                                lineNumber: 193,
                                                                columnNumber: 21
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/admin/layout.tsx",
                                                            lineNumber: 192,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "max-h-80 overflow-auto",
                                                            children: notifItems.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "p-6 text-center",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__["Bell"], {
                                                                        className: "w-8 h-8 text-slate-300 mx-auto mb-2"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/admin/layout.tsx",
                                                                        lineNumber: 198,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-xs text-slate-500",
                                                                        children: "No new notifications"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/admin/layout.tsx",
                                                                        lineNumber: 199,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/admin/layout.tsx",
                                                                lineNumber: 197,
                                                                columnNumber: 23
                                                            }, this) : notifItems.map((n, i)=>{
                                                                const dt = notifyDocTypes.get(n.docTypeId);
                                                                const dtLabel = dt?.name ?? "Document";
                                                                const path = dt?.key ? `/admin/docs/${dt.key}/${n.recordId}` : "#";
                                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                                    href: path,
                                                                    className: "block px-4 py-3 hover:bg-slate-50/80 transition-colors border-b border-slate-50 last:border-0",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "text-xs font-medium text-slate-900",
                                                                            children: dtLabel
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/admin/layout.tsx",
                                                                            lineNumber: 208,
                                                                            columnNumber: 29
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "text-xs text-slate-500 mt-0.5 line-clamp-2",
                                                                            children: n.text
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/admin/layout.tsx",
                                                                            lineNumber: 209,
                                                                            columnNumber: 29
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "text-[10px] text-slate-400 mt-1",
                                                                            children: new Date(n.at).toLocaleString("id-ID", {
                                                                                dateStyle: "medium",
                                                                                timeStyle: "short"
                                                                            })
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/admin/layout.tsx",
                                                                            lineNumber: 210,
                                                                            columnNumber: 29
                                                                        }, this)
                                                                    ]
                                                                }, i, true, {
                                                                    fileName: "[project]/src/app/admin/layout.tsx",
                                                                    lineNumber: 207,
                                                                    columnNumber: 27
                                                                }, this);
                                                            })
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/admin/layout.tsx",
                                                            lineNumber: 195,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/admin/layout.tsx",
                                                    lineNumber: 191,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/admin/layout.tsx",
                                            lineNumber: 180,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-px h-5 bg-slate-200 mx-0.5"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/admin/layout.tsx",
                                            lineNumber: 219,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$user$2d$menu$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["UserMenu"], {
                                            name: me?.name || email,
                                            email: email,
                                            roleName: me?.role?.name || "",
                                            imageUrl: session?.user?.image ?? undefined
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/admin/layout.tsx",
                                            lineNumber: 221,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/admin/layout.tsx",
                                    lineNumber: 142,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/admin/layout.tsx",
                            lineNumber: 135,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/admin/layout.tsx",
                        lineNumber: 134,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                        className: "p-6 bg-[#f8fafc] min-h-[calc(100vh-3.5rem)] flex-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$toast$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ToastHost"], {}, void 0, false, {
                                fileName: "[project]/src/app/admin/layout.tsx",
                                lineNumber: 227,
                                columnNumber: 11
                            }, this),
                            children
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/admin/layout.tsx",
                        lineNumber: 226,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/admin/layout.tsx",
                lineNumber: 130,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/admin/layout.tsx",
        lineNumber: 115,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__ff163e91._.js.map