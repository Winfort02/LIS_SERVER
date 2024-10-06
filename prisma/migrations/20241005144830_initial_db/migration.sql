-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` ENUM('ADMIN', 'USER') NOT NULL DEFAULT 'USER',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `patients` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `last_name` VARCHAR(191) NOT NULL,
    `first_name` VARCHAR(191) NOT NULL,
    `middle_name` VARCHAR(191) NOT NULL,
    `contact_number` VARCHAR(191) NOT NULL,
    `date_of_birth` DATE NOT NULL,
    `sex` VARCHAR(191) NOT NULL,
    `address` TEXT NOT NULL,
    `civil_status` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tests` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `patient_id` INTEGER NOT NULL,
    `transaction_number` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `tests_transaction_number_key`(`transaction_number`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `hematology` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `test_id` INTEGER NOT NULL,
    `physician` VARCHAR(191) NOT NULL,
    `lab_no` VARCHAR(191) NOT NULL,
    `hemoglobin` DECIMAL(10, 2) NOT NULL,
    `hematocrit` DECIMAL(10, 2) NOT NULL,
    `rbc_count` DECIMAL(10, 2) NOT NULL,
    `wbc_count` DECIMAL(10, 2) NOT NULL,
    `platelet_count` DECIMAL(10, 2) NOT NULL,
    `mcv` DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    `mch` DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    `mchc` DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    `rdw_cv` DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    `mpv` DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    `pdw` DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    `neutrophil` DECIMAL(10, 2) NOT NULL,
    `segmented` DECIMAL(10, 2) NOT NULL,
    `stab` DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    `lymphocyties` DECIMAL(10, 2) NOT NULL,
    `monocyties` DECIMAL(10, 2) NOT NULL,
    `eosinophils` DECIMAL(10, 2) NOT NULL,
    `basophils` DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `remarks` TEXT NOT NULL,

    UNIQUE INDEX `hematology_test_id_key`(`test_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `urinalysis` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `test_id` INTEGER NOT NULL,
    `physician` VARCHAR(191) NOT NULL,
    `lab_no` VARCHAR(191) NOT NULL,
    `color` VARCHAR(191) NULL,
    `transparancy` VARCHAR(191) NULL,
    `ph` DECIMAL(10, 2) NOT NULL,
    `spec_gravity` DECIMAL(10, 2) NOT NULL,
    `leukocyte_esterase` VARCHAR(191) NULL,
    `nitrite` VARCHAR(191) NULL,
    `urobilinogen` VARCHAR(191) NULL,
    `blood` VARCHAR(191) NULL,
    `ketones` VARCHAR(191) NULL,
    `bilirubin` VARCHAR(191) NULL,
    `glucose` VARCHAR(191) NULL,
    `protein` VARCHAR(191) NULL,
    `wbc_count` DECIMAL(10, 2) NOT NULL,
    `rbc_count` DECIMAL(10, 2) NOT NULL,
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
    `cast_rbc` DECIMAL(10, 2) NOT NULL,
    `cast_wbc` DECIMAL(10, 2) NOT NULL,
    `cast_waxy` VARCHAR(191) NULL,
    `cast_broad` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `remarks` TEXT NULL,

    UNIQUE INDEX `urinalysis_test_id_key`(`test_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tests` ADD CONSTRAINT `tests_patient_id_fkey` FOREIGN KEY (`patient_id`) REFERENCES `patients`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `hematology` ADD CONSTRAINT `hematology_test_id_fkey` FOREIGN KEY (`test_id`) REFERENCES `tests`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `urinalysis` ADD CONSTRAINT `urinalysis_test_id_fkey` FOREIGN KEY (`test_id`) REFERENCES `tests`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
