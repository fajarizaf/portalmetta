-- AlterTable
ALTER TABLE `Company` ADD COLUMN `parentId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Company` ADD CONSTRAINT `Company_parentId_fkey` FOREIGN KEY (`parentId`) REFERENCES `Company`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
