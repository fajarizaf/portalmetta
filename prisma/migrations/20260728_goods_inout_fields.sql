-- =====================================================
-- Migration: Goods In/Out Implementation & Inventory Monitoring
-- Description: Add/update fields for Goods In/Out child DocTypes
--              to support location tracking (Building > Floor > Room)
--              and customer ownership monitoring
-- Author: Mettadc Platform Team
-- Date: 2026-07-28
-- =====================================================
--
-- This migration:
-- 1. Changes `type_of_material` from TEXT to DROPDOWN with predefined options
-- 2. Adds `building_id` (DROPDOWN, filter: branch_id)
-- 3. Adds `floor_id` (DROPDOWN, filter: building_id)
-- 4. Adds `room_id` (DROPDOWN, filter: floor_id)
-- 5. Adds `owner_customer_id` (TEXT, auto-filled from session)
--
-- Applied to: DocType `goods_in_item` and `goods_out_item`
-- Safe to run multiple times (idempotent)
-- =====================================================

SET @now = NOW(3);

-- =====================================================
-- GOODS IN ITEM
-- =====================================================

-- 1. Update or insert type_of_material: TEXT -> DROPDOWN
UPDATE DocField
SET
  type = 'DROPDOWN',
  config = JSON_OBJECT(
    'options', JSON_ARRAY(
      JSON_OBJECT('label', 'Fiber Optic', 'value', 'Fiber Optic'),
      JSON_OBJECT('label', 'UTP Cable', 'value', 'UTP Cable'),
      JSON_OBJECT('label', 'Coaxial Cable', 'value', 'Coaxial Cable'),
      JSON_OBJECT('label', 'Connector', 'value', 'Connector'),
      JSON_OBJECT('label', 'Patch Panel', 'value', 'Patch Panel'),
      JSON_OBJECT('label', 'Rack', 'value', 'Rack'),
      JSON_OBJECT('label', 'Switch', 'value', 'Switch'),
      JSON_OBJECT('label', 'Router', 'value', 'Router'),
      JSON_OBJECT('label', 'Power Cable', 'value', 'Power Cable'),
      JSON_OBJECT('label', 'Other', 'value', 'Other')
    )
  ),
  updatedAt = @now
WHERE docTypeId IN (SELECT id FROM DocType WHERE `key` = 'goods_in_item')
  AND `key` = 'type_of_material';

-- Insert type_of_material if not exists
INSERT INTO DocField (id, docTypeId, `key`, label, type, required, `order`, config, createdAt, updatedAt, readOnly)
SELECT
  CONCAT('field_gin_tom_', UNIX_TIMESTAMP()) as id,
  id as docTypeId,
  'type_of_material' as `key`,
  'Type Of Material' as label,
  'DROPDOWN' as type,
  1 as required,
  1 as `order`,
  JSON_OBJECT(
    'options', JSON_ARRAY(
      JSON_OBJECT('label', 'Fiber Optic', 'value', 'Fiber Optic'),
      JSON_OBJECT('label', 'UTP Cable', 'value', 'UTP Cable'),
      JSON_OBJECT('label', 'Coaxial Cable', 'value', 'Coaxial Cable'),
      JSON_OBJECT('label', 'Connector', 'value', 'Connector'),
      JSON_OBJECT('label', 'Patch Panel', 'value', 'Patch Panel'),
      JSON_OBJECT('label', 'Rack', 'value', 'Rack'),
      JSON_OBJECT('label', 'Switch', 'value', 'Switch'),
      JSON_OBJECT('label', 'Router', 'value', 'Router'),
      JSON_OBJECT('label', 'Power Cable', 'value', 'Power Cable'),
      JSON_OBJECT('label', 'Other', 'value', 'Other')
    )
  ) as config,
  @now as createdAt,
  @now as updatedAt,
  0 as readOnly
FROM DocType
WHERE `key` = 'goods_in_item'
  AND NOT EXISTS (
    SELECT 1 FROM DocField
    WHERE DocField.docTypeId = DocType.id
    AND DocField.`key` = 'type_of_material'
  );

-- 2. Add building_id (Gedung)
INSERT INTO DocField (id, docTypeId, `key`, label, type, required, `order`, config, createdAt, updatedAt, readOnly)
SELECT
  CONCAT('field_gin_bldg_', UNIX_TIMESTAMP()) as id,
  id as docTypeId,
  'building_id' as `key`,
  'Gedung' as label,
  'DROPDOWN' as type,
  1 as required,
  6 as `order`,
  JSON_OBJECT(
    'source', JSON_OBJECT(
      'table', 'Building',
      'labelField', 'name',
      'valueField', 'id',
      'filter', JSON_OBJECT(
        'dependsOn', 'branch_id',
        'field', 'branchId'
      )
    )
  ) as config,
  @now as createdAt,
  @now as updatedAt,
  0 as readOnly
FROM DocType
WHERE `key` = 'goods_in_item'
  AND NOT EXISTS (
    SELECT 1 FROM DocField
    WHERE DocField.docTypeId = DocType.id
    AND DocField.`key` = 'building_id'
  );

-- 3. Add floor_id (Lantai)
INSERT INTO DocField (id, docTypeId, `key`, label, type, required, `order`, config, createdAt, updatedAt, readOnly)
SELECT
  CONCAT('field_gin_flr_', UNIX_TIMESTAMP()) as id,
  id as docTypeId,
  'floor_id' as `key`,
  'Lantai' as label,
  'DROPDOWN' as type,
  1 as required,
  7 as `order`,
  JSON_OBJECT(
    'source', JSON_OBJECT(
      'table', 'Floor',
      'labelField', 'name',
      'valueField', 'id',
      'filter', JSON_OBJECT(
        'dependsOn', 'building_id',
        'field', 'buildingId'
      )
    )
  ) as config,
  @now as createdAt,
  @now as updatedAt,
  0 as readOnly
FROM DocType
WHERE `key` = 'goods_in_item'
  AND NOT EXISTS (
    SELECT 1 FROM DocField
    WHERE DocField.docTypeId = DocType.id
    AND DocField.`key` = 'floor_id'
  );

-- 4. Add room_id (Ruangan)
INSERT INTO DocField (id, docTypeId, `key`, label, type, required, `order`, config, createdAt, updatedAt, readOnly)
SELECT
  CONCAT('field_gin_rm_', UNIX_TIMESTAMP()) as id,
  id as docTypeId,
  'room_id' as `key`,
  'Ruangan' as label,
  'DROPDOWN' as type,
  1 as required,
  8 as `order`,
  JSON_OBJECT(
    'source', JSON_OBJECT(
      'table', 'Room',
      'labelField', 'name',
      'valueField', 'id',
      'filter', JSON_OBJECT(
        'dependsOn', 'floor_id',
        'field', 'floorId'
      )
    )
  ) as config,
  @now as createdAt,
  @now as updatedAt,
  0 as readOnly
FROM DocType
WHERE `key` = 'goods_in_item'
  AND NOT EXISTS (
    SELECT 1 FROM DocField
    WHERE DocField.docTypeId = DocType.id
    AND DocField.`key` = 'room_id'
  );

-- 5. Add owner_customer_id (Customer Pemilik)
INSERT INTO DocField (id, docTypeId, `key`, label, type, required, `order`, config, createdAt, updatedAt, readOnly)
SELECT
  CONCAT('field_gin_oc_', UNIX_TIMESTAMP()) as id,
  id as docTypeId,
  'owner_customer_id' as `key`,
  'Customer Pemilik' as label,
  'TEXT' as type,
  0 as required,
  9 as `order`,
  NULL as config,
  @now as createdAt,
  @now as updatedAt,
  0 as readOnly
FROM DocType
WHERE `key` = 'goods_in_item'
  AND NOT EXISTS (
    SELECT 1 FROM DocField
    WHERE DocField.docTypeId = DocType.id
    AND DocField.`key` = 'owner_customer_id'
  );


-- =====================================================
-- GOODS OUT ITEM
-- =====================================================

-- 1. Update or insert type_of_material: TEXT -> DROPDOWN
UPDATE DocField
SET
  type = 'DROPDOWN',
  config = JSON_OBJECT(
    'options', JSON_ARRAY(
      JSON_OBJECT('label', 'Fiber Optic', 'value', 'Fiber Optic'),
      JSON_OBJECT('label', 'UTP Cable', 'value', 'UTP Cable'),
      JSON_OBJECT('label', 'Coaxial Cable', 'value', 'Coaxial Cable'),
      JSON_OBJECT('label', 'Connector', 'value', 'Connector'),
      JSON_OBJECT('label', 'Patch Panel', 'value', 'Patch Panel'),
      JSON_OBJECT('label', 'Rack', 'value', 'Rack'),
      JSON_OBJECT('label', 'Switch', 'value', 'Switch'),
      JSON_OBJECT('label', 'Router', 'value', 'Router'),
      JSON_OBJECT('label', 'Power Cable', 'value', 'Power Cable'),
      JSON_OBJECT('label', 'Other', 'value', 'Other')
    )
  ),
  updatedAt = @now
WHERE docTypeId IN (SELECT id FROM DocType WHERE `key` = 'goods_out_item')
  AND `key` = 'type_of_material';

-- Insert type_of_material if not exists
INSERT INTO DocField (id, docTypeId, `key`, label, type, required, `order`, config, createdAt, updatedAt, readOnly)
SELECT
  CONCAT('field_gout_tom_', UNIX_TIMESTAMP()) as id,
  id as docTypeId,
  'type_of_material' as `key`,
  'Type Of Material' as label,
  'DROPDOWN' as type,
  1 as required,
  1 as `order`,
  JSON_OBJECT(
    'options', JSON_ARRAY(
      JSON_OBJECT('label', 'Fiber Optic', 'value', 'Fiber Optic'),
      JSON_OBJECT('label', 'UTP Cable', 'value', 'UTP Cable'),
      JSON_OBJECT('label', 'Coaxial Cable', 'value', 'Coaxial Cable'),
      JSON_OBJECT('label', 'Connector', 'value', 'Connector'),
      JSON_OBJECT('label', 'Patch Panel', 'value', 'Patch Panel'),
      JSON_OBJECT('label', 'Rack', 'value', 'Rack'),
      JSON_OBJECT('label', 'Switch', 'value', 'Switch'),
      JSON_OBJECT('label', 'Router', 'value', 'Router'),
      JSON_OBJECT('label', 'Power Cable', 'value', 'Power Cable'),
      JSON_OBJECT('label', 'Other', 'value', 'Other')
    )
  ) as config,
  @now as createdAt,
  @now as updatedAt,
  0 as readOnly
FROM DocType
WHERE `key` = 'goods_out_item'
  AND NOT EXISTS (
    SELECT 1 FROM DocField
    WHERE DocField.docTypeId = DocType.id
    AND DocField.`key` = 'type_of_material'
  );

-- 2. Add building_id (Gedung)
INSERT INTO DocField (id, docTypeId, `key`, label, type, required, `order`, config, createdAt, updatedAt, readOnly)
SELECT
  CONCAT('field_gout_bldg_', UNIX_TIMESTAMP()) as id,
  id as docTypeId,
  'building_id' as `key`,
  'Gedung' as label,
  'DROPDOWN' as type,
  1 as required,
  6 as `order`,
  JSON_OBJECT(
    'source', JSON_OBJECT(
      'table', 'Building',
      'labelField', 'name',
      'valueField', 'id',
      'filter', JSON_OBJECT(
        'dependsOn', 'branch_id',
        'field', 'branchId'
      )
    )
  ) as config,
  @now as createdAt,
  @now as updatedAt,
  0 as readOnly
FROM DocType
WHERE `key` = 'goods_out_item'
  AND NOT EXISTS (
    SELECT 1 FROM DocField
    WHERE DocField.docTypeId = DocType.id
    AND DocField.`key` = 'building_id'
  );

-- 3. Add floor_id (Lantai)
INSERT INTO DocField (id, docTypeId, `key`, label, type, required, `order`, config, createdAt, updatedAt, readOnly)
SELECT
  CONCAT('field_gout_flr_', UNIX_TIMESTAMP()) as id,
  id as docTypeId,
  'floor_id' as `key`,
  'Lantai' as label,
  'DROPDOWN' as type,
  1 as required,
  7 as `order`,
  JSON_OBJECT(
    'source', JSON_OBJECT(
      'table', 'Floor',
      'labelField', 'name',
      'valueField', 'id',
      'filter', JSON_OBJECT(
        'dependsOn', 'building_id',
        'field', 'buildingId'
      )
    )
  ) as config,
  @now as createdAt,
  @now as updatedAt,
  0 as readOnly
FROM DocType
WHERE `key` = 'goods_out_item'
  AND NOT EXISTS (
    SELECT 1 FROM DocField
    WHERE DocField.docTypeId = DocType.id
    AND DocField.`key` = 'floor_id'
  );

-- 4. Add room_id (Ruangan)
INSERT INTO DocField (id, docTypeId, `key`, label, type, required, `order`, config, createdAt, updatedAt, readOnly)
SELECT
  CONCAT('field_gout_rm_', UNIX_TIMESTAMP()) as id,
  id as docTypeId,
  'room_id' as `key`,
  'Ruangan' as label,
  'DROPDOWN' as type,
  1 as required,
  8 as `order`,
  JSON_OBJECT(
    'source', JSON_OBJECT(
      'table', 'Room',
      'labelField', 'name',
      'valueField', 'id',
      'filter', JSON_OBJECT(
        'dependsOn', 'floor_id',
        'field', 'floorId'
      )
    )
  ) as config,
  @now as createdAt,
  @now as updatedAt,
  0 as readOnly
FROM DocType
WHERE `key` = 'goods_out_item'
  AND NOT EXISTS (
    SELECT 1 FROM DocField
    WHERE DocField.docTypeId = DocType.id
    AND DocField.`key` = 'room_id'
  );

-- 5. Add owner_customer_id (Customer Pemilik)
INSERT INTO DocField (id, docTypeId, `key`, label, type, required, `order`, config, createdAt, updatedAt, readOnly)
SELECT
  CONCAT('field_gout_oc_', UNIX_TIMESTAMP()) as id,
  id as docTypeId,
  'owner_customer_id' as `key`,
  'Customer Pemilik' as label,
  'TEXT' as type,
  0 as required,
  9 as `order`,
  NULL as config,
  @now as createdAt,
  @now as updatedAt,
  0 as readOnly
FROM DocType
WHERE `key` = 'goods_out_item'
  AND NOT EXISTS (
    SELECT 1 FROM DocField
    WHERE DocField.docTypeId = DocType.id
    AND DocField.`key` = 'owner_customer_id'
  );


-- =====================================================
-- VERIFICATION QUERIES (uncomment to verify after running)
-- =====================================================

-- SELECT d.`key` as doctype, f.`key` as field_key, f.label, f.type, f.`order`
-- FROM DocField f
-- JOIN DocType d ON f.docTypeId = d.id
-- WHERE d.`key` IN ('goods_in_item', 'goods_out_item')
--   AND f.`key` IN ('type_of_material', 'building_id', 'floor_id', 'room_id', 'owner_customer_id')
-- ORDER BY d.`key`, f.`order`;

-- =====================================================
-- END OF MIGRATION
-- =====================================================
