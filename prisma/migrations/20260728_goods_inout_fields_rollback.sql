-- =====================================================
-- Rollback: Goods In/Out Implementation & Inventory Monitoring
-- Description: Revert the fields added by migration 20260728_goods_inout_fields.sql
-- Author: Mettadc Platform Team
-- Date: 2026-07-28
-- =====================================================
--
-- This rollback:
-- 1. Reverts `type_of_material` from DROPDOWN to TEXT
-- 2. Removes `building_id`, `floor_id`, `room_id`, `owner_customer_id` fields
--
-- Applied to: DocType `goods_in_item` and `goods_out_item`
-- Safe to run multiple times (idempotent)
-- =====================================================

-- Revert type_of_material to TEXT
UPDATE DocField
SET
  type = 'TEXT',
  config = NULL,
  updatedAt = NOW(3)
WHERE docTypeId IN (SELECT id FROM DocType WHERE `key` IN ('goods_in_item', 'goods_out_item'))
  AND `key` = 'type_of_material';

-- Remove building_id, floor_id, room_id, owner_customer_id
DELETE FROM DocField
WHERE docTypeId IN (SELECT id FROM DocType WHERE `key` IN ('goods_in_item', 'goods_out_item'))
  AND `key` IN ('building_id', 'floor_id', 'room_id', 'owner_customer_id');

-- =====================================================
-- END OF ROLLBACK
-- =====================================================
