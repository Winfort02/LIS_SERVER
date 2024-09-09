-- CreateTable
CREATE TABLE `urinalysis` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `patient_id` INTEGER NOT NULL,
    `physician` VARCHAR(191) NOT NULL,
    `lab_no` VARCHAR(191) NOT NULL,
    `color` VARCHAR(191) NULL,
    `transparancy` VARCHAR(191) NULL,
    `ph` DECIMAL(65, 30) NOT NULL,
    `spec_gravity` DECIMAL(65, 30) NOT NULL,
    `reduce_sugar` VARCHAR(191) NULL,
    `protein` VARCHAR(191) NULL,
    `wbc_count` DECIMAL(65, 30) NOT NULL,
    `rbc_count` DECIMAL(65, 30) NOT NULL,
    `squamous` VARCHAR(191) NULL,
    `rental_tubular` VARCHAR(191) NULL,
    `transitional` VARCHAR(191) NULL,
    `bacteria` VARCHAR(191) NULL,
    `yeast` VARCHAR(191) NULL,
    `mucus_thread` VARCHAR(191) NULL,
    `amorphous_urates` VARCHAR(191) NULL,
    `amorphous_phosphates` VARCHAR(191) NULL,
    `uric_acid` VARCHAR(191) NULL,
    `calcium_oxalate` VARCHAR(191) NULL,
    `triple_phosphate` VARCHAR(191) NULL,
    `calcium_carbonate` VARCHAR(191) NULL,
    `calcium_phosphate` VARCHAR(191) NULL,
    `ammonium_biurate` VARCHAR(191) NULL,
    `hyaline` VARCHAR(191) NULL,
    `fine_granular` VARCHAR(191) NULL,
    `coarse_granular` VARCHAR(191) NULL,
    `cast_rbc` DECIMAL(65, 30) NOT NULL,
    `cast_wbc` DECIMAL(65, 30) NOT NULL,
    `cast_waxy` VARCHAR(191) NULL,
    `cast_broad` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `remarks` TEXT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `urinalysis` ADD CONSTRAINT `urinalysis_patient_id_fkey` FOREIGN KEY (`patient_id`) REFERENCES `patients`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
