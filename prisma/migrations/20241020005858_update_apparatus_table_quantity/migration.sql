/*
  Warnings:

  - You are about to drop the column `quanity` on the `apparatus` table. All the data in the column will be lost.
  - You are about to drop the `stock_in` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `stock_out` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `stock_in` DROP FOREIGN KEY `stock_in_apparatus_id_fkey`;

-- DropForeignKey
ALTER TABLE `stock_in` DROP FOREIGN KEY `stock_in_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `stock_out` DROP FOREIGN KEY `stock_out_apparatus_id_fkey`;

-- DropForeignKey
ALTER TABLE `stock_out` DROP FOREIGN KEY `stock_out_test_id_fkey`;

-- DropForeignKey
ALTER TABLE `stock_out` DROP FOREIGN KEY `stock_out_user_id_fkey`;

-- AlterTable
ALTER TABLE `apparatus` DROP COLUMN `quanity`,
    ADD COLUMN `quantity` INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE `stock_in`;

-- DropTable
DROP TABLE `stock_out`;
