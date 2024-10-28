/*
  Warnings:

  - Made the column `cast_rbc` on table `urinalysis` required. This step will fail if there are existing NULL values in that column.
  - Made the column `cast_wbc` on table `urinalysis` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `urinalysis` MODIFY `wbc_count` VARCHAR(191) NOT NULL,
    MODIFY `rbc_count` VARCHAR(191) NOT NULL,
    MODIFY `cast_rbc` VARCHAR(191) NOT NULL,
    MODIFY `cast_wbc` VARCHAR(191) NOT NULL;
