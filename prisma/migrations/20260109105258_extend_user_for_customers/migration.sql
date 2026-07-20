-- AlterTable
ALTER TABLE `User` ADD COLUMN `billingContactName` VARCHAR(191) NULL,
    ADD COLUMN `billingEmail` VARCHAR(191) NULL,
    ADD COLUMN `billingPhoneNumber` VARCHAR(191) NULL,
    ADD COLUMN `country` VARCHAR(191) NULL,
    ADD COLUMN `partnerType` ENUM('RESELLER', 'END_USER') NULL,
    ADD COLUMN `technicalContactName` VARCHAR(191) NULL,
    ADD COLUMN `technicalEmail` VARCHAR(191) NULL,
    ADD COLUMN `technicalPhoneNumber` VARCHAR(191) NULL;
