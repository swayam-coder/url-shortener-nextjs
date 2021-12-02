/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `link` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `user` table. All the data in the column will be lost.
  - Added the required column `shortenedUrlPath` to the `Link` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `link` DROP COLUMN `imageUrl`,
    ADD COLUMN `shortenedUrlPath` VARCHAR(191) NOT NULL,
    MODIFY `description` VARCHAR(191) NULL,
    MODIFY `category` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `role`;
