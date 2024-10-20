/*
  Warnings:

  - You are about to drop the column `remarks` on the `stock_in` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `stock_in` table. All the data in the column will be lost.
  - You are about to drop the `stock_in_items` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `apparatus_id` to the `stock_in` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `stock_in` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stock_id` to the `stock_in` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `stock_in` DROP FOREIGN KEY `stock_in_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `stock_in_items` DROP FOREIGN KEY `stock_in_items_apparatus_id_fkey`;

-- DropForeignKey
ALTER TABLE `stock_in_items` DROP FOREIGN KEY `stock_in_items_stock_in_id_fkey`;

-- AlterTable
ALTER TABLE `stock_in` DROP COLUMN `remarks`,
    DROP COLUMN `user_id`,
    ADD COLUMN `apparatus_id` INTEGER NOT NULL,
    ADD COLUMN `quantity` INTEGER NOT NULL,
    ADD COLUMN `stock_id` INTEGER NOT NULL;

-- DropTable
DROP TABLE `stock_in_items`;

-- CreateTable
CREATE TABLE `stock` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `type` ENUM('STOCK_IN', 'STOCK_OUT') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `stock_out` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `apparatus_id` INTEGER NOT NULL,
    `stock_id` INTEGER NOT NULL,
    `test_id` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `stock` ADD CONSTRAINT `stock_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `stock_in` ADD CONSTRAINT `stock_in_apparatus_id_fkey` FOREIGN KEY (`apparatus_id`) REFERENCES `apparatus`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `stock_in` ADD CONSTRAINT `stock_in_stock_id_fkey` FOREIGN KEY (`stock_id`) REFERENCES `stock`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `stock_out` ADD CONSTRAINT `stock_out_apparatus_id_fkey` FOREIGN KEY (`apparatus_id`) REFERENCES `apparatus`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `stock_out` ADD CONSTRAINT `stock_out_stock_id_fkey` FOREIGN KEY (`stock_id`) REFERENCES `stock`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `stock_out` ADD CONSTRAINT `stock_out_test_id_fkey` FOREIGN KEY (`test_id`) REFERENCES `tests`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
