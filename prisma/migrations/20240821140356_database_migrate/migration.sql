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
CREATE TABLE `hematology` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `patient_id` INTEGER NOT NULL,
    `physician` VARCHAR(191) NOT NULL,
    `lab_no` DECIMAL(10, 2) NOT NULL,
    `hemoglobin` DECIMAL(10, 2) NOT NULL,
    `hematocrit` DECIMAL(10, 2) NOT NULL,
    `rbc_count` DECIMAL(10, 2) NOT NULL,
    `wbc_count` DECIMAL(10, 2) NOT NULL,
    `platelet_count` DECIMAL(10, 2) NOT NULL,
    `neutrophil` DECIMAL(10, 2) NOT NULL,
    `segmented` DECIMAL(10, 2) NOT NULL,
    `stab` DECIMAL(10, 2) NOT NULL,
    `lymphocyties` DECIMAL(10, 2) NOT NULL,
    `monocyties` DECIMAL(10, 2) NOT NULL,
    `eosinophils` DECIMAL(10, 2) NOT NULL,
    `basophils` DECIMAL(10, 2) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `remarks` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `hematology` ADD CONSTRAINT `hematology_patient_id_fkey` FOREIGN KEY (`patient_id`) REFERENCES `patients`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
