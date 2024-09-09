/*
  Warnings:

  - You are about to alter the column `ph` on the `urinalysis` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `spec_gravity` on the `urinalysis` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `wbc_count` on the `urinalysis` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `rbc_count` on the `urinalysis` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `cast_rbc` on the `urinalysis` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `cast_wbc` on the `urinalysis` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.

*/
-- AlterTable
ALTER TABLE `urinalysis` MODIFY `ph` DECIMAL(10, 2) NOT NULL,
    MODIFY `spec_gravity` DECIMAL(10, 2) NOT NULL,
    MODIFY `wbc_count` DECIMAL(10, 2) NOT NULL,
    MODIFY `rbc_count` DECIMAL(10, 2) NOT NULL,
    MODIFY `cast_rbc` DECIMAL(10, 2) NOT NULL,
    MODIFY `cast_wbc` DECIMAL(10, 2) NOT NULL;
