/*
  Warnings:

  - A unique constraint covering the columns `[branchId,name]` on the table `Role` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `Role_name_key` ON `Role`;

-- AlterTable
ALTER TABLE `Role` ADD COLUMN `branchId` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Role_branchId_name_key` ON `Role`(`branchId`, `name`);

-- AddForeignKey
ALTER TABLE `Role` ADD CONSTRAINT `Role_branchId_fkey` FOREIGN KEY (`branchId`) REFERENCES `Branch`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
