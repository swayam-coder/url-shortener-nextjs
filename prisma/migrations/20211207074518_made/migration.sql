-- DropForeignKey
ALTER TABLE `link` DROP FOREIGN KEY `Link_userId_fkey`;

-- AlterTable
ALTER TABLE `link` MODIFY `userId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Link` ADD CONSTRAINT `Link_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
