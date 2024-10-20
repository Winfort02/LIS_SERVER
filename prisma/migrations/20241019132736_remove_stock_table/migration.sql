/*
  Warnings:

  - You are about to drop the column `stock_id` on the `stock_in` table. All the data in the column will be lost.
  - You are about to drop the `stocks` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `product_id` to the `stock_in` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `stock_in` DROP FOREIGN KEY `stock_in_stock_id_fkey`;

-- DropForeignKey
ALTER TABLE `stocks` DROP FOREIGN KEY `stocks_product_id_fkey`;

-- AlterTable
ALTER TABLE `products` ADD COLUMN `quanity` DECIMAL(10, 2) NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `stock_in` DROP COLUMN `stock_id`,
    ADD COLUMN `product_id` INTEGER NOT NULL;

-- DropTable
DROP TABLE `stocks`;

-- AddForeignKey
ALTER TABLE `stock_in` ADD CONSTRAINT `stock_in_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
