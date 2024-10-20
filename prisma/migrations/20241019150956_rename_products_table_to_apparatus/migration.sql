/*
  Warnings:

  - You are about to drop the column `product_id` on the `stock_in` table. All the data in the column will be lost.
  - You are about to drop the column `product_id` on the `stock_out` table. All the data in the column will be lost.
  - You are about to drop the `products` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `apparatus_id` to the `stock_in` table without a default value. This is not possible if the table is not empty.
  - Added the required column `apparatus_id` to the `stock_out` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `stock_in` DROP FOREIGN KEY `stock_in_product_id_fkey`;

-- DropForeignKey
ALTER TABLE `stock_out` DROP FOREIGN KEY `stock_out_product_id_fkey`;

-- AlterTable
ALTER TABLE `stock_in` DROP COLUMN `product_id`,
    ADD COLUMN `apparatus_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `stock_out` DROP COLUMN `product_id`,
    ADD COLUMN `apparatus_id` INTEGER NOT NULL;

-- DropTable
DROP TABLE `products`;

-- CreateTable
CREATE TABLE `apparatus` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `apparatus_name` VARCHAR(191) NOT NULL,
    `unit` VARCHAR(191) NOT NULL,
    `status` BOOLEAN NOT NULL,
    `quanity` DECIMAL(10, 2) NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `apparatus_apparatus_name_key`(`apparatus_name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `stock_in` ADD CONSTRAINT `stock_in_apparatus_id_fkey` FOREIGN KEY (`apparatus_id`) REFERENCES `apparatus`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `stock_out` ADD CONSTRAINT `stock_out_apparatus_id_fkey` FOREIGN KEY (`apparatus_id`) REFERENCES `apparatus`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
