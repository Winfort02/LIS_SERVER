/*
  Warnings:

  - Added the required column `time_taken` to the `chemistry` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `chemistry` ADD COLUMN `time_taken` DATETIME(3) NOT NULL;
