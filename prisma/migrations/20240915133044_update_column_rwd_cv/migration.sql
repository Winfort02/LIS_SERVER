/*
  Warnings:

  - You are about to drop the column `rdw_dv` on the `hematology` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `hematology` DROP COLUMN `rdw_dv`,
    ADD COLUMN `rdw_cv` DECIMAL(10, 2) NOT NULL DEFAULT 0.00;
