# Product Management - Technical Documentation

## Data Model

- Branch ownership: `ProductGroup.branchId`, `Product.branchId`
- Hierarchy: `ProductGroup.parentId` (self-relation)
- Classification: `Product.classification` ∈ {FREE, ONETIME, RECURRING}
- Dynamic fields: `ProductSpecField` with `type` ∈ {TEXT, NUMBER, DROPDOWN, CHECKBOX} and `config` JSON
- Pricing: `ProductPrice` with `pricingModel` ∈ {FIXED, DISCOUNT, TIERED} and `config` JSON

## Tables

- ProductGroup(id, name, branchId, parentId, description, createdAt, updatedAt)
- Product(id, name, branchId, groupId, classification, active, createdAt, updatedAt)
- ProductSpecField(id, productId, key, label, type, required, config, createdAt, updatedAt)
- ProductPrice(id, productId, currency, basePrice, setupFee, pricingModel, config, validFrom, validTo, createdAt, updatedAt)

## API (Server Actions)

- Groups: createGroup, updateGroup, deleteGroup
- Products: createProduct, updateProduct, deleteProduct
- Specs: addSpecField, updateSpecField, deleteSpecField
- Prices: addPrice, updatePrice, deletePrice

## Validation

- Require `branchId` (from cookie) when creating products/groups
- Ensure unique `ProductSpecField(productId, key)`
- Non-negative `basePrice`, `setupFee`
- JSON `config` must parseable

## Search/Filter

- Server-side filter by branch; client-side inputs for name, classification, group

## Pricing Config Examples

- Discount: `{ "discountPercent": 10 }`
- Tiered: `{ "tiers": [{ "upTo": 10, "price": 1000 }, { "upTo": 50, "price": 800 }] }`

## Spec Config Examples

- Dropdown options: `{ "options": [{ "label": "Small", "value": "S" }, { "label": "Large", "value": "L" }] }`
- Accessories with quantity: `{ "options": [{ "label": "Cable", "value": "cable", "qty": 1 }] }`