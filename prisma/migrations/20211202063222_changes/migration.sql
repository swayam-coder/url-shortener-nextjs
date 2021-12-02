/*
  Warnings:

  - You are about to drop the `_linktouser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_linktouser` DROP FOREIGN KEY `_linktouser_ibfk_1`;

-- DropForeignKey
ALTER TABLE `_linktouser` DROP FOREIGN KEY `_linktouser_ibfk_2`;

-- DropTable
DROP TABLE `_linktouser`;

-- CreateTable
CREATE TABLE `_ShortenedLinks` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_ShortenedLinks_AB_unique`(`A`, `B`),
    INDEX `_ShortenedLinks_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Link` ADD CONSTRAINT `Link_id_fkey` FOREIGN KEY (`id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ShortenedLinks` ADD FOREIGN KEY (`A`) REFERENCES `Link`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ShortenedLinks` ADD FOREIGN KEY (`B`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
