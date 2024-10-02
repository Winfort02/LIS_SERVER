-- AlterTable
ALTER TABLE `hematology` ADD COLUMN `mch` DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    ADD COLUMN `mchc` DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    ADD COLUMN `mcv` DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    ADD COLUMN `mpv` DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    ADD COLUMN `pdw` DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    ADD COLUMN `rdw_dv` DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    MODIFY `stab` DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    MODIFY `basophils` DECIMAL(10, 2) NOT NULL DEFAULT 0.00;