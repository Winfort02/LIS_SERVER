-- CreateTable
CREATE TABLE `chemistry` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `test_id` INTEGER NOT NULL,
    `physician` VARCHAR(191) NOT NULL,
    `lab_no` VARCHAR(191) NOT NULL,
    `last_meal_take` DATETIME(3) NOT NULL,
    `test_requested` VARCHAR(191) NOT NULL,
    `fasting_blood_sugar` DECIMAL(10, 2) NOT NULL,
    `random_blood_sugar` DECIMAL(10, 2) NOT NULL,
    `post_prandial` DECIMAL(10, 2) NOT NULL,
    `total_cholesterol` DECIMAL(10, 2) NOT NULL,
    `triglycerides` DECIMAL(10, 2) NOT NULL,
    `hdl` DECIMAL(10, 2) NOT NULL,
    `ldl` DECIMAL(10, 2) NOT NULL,
    `uric_acid` DECIMAL(10, 2) NOT NULL,
    `creatinine` DECIMAL(10, 2) NOT NULL,
    `bun` DECIMAL(10, 2) NOT NULL,
    `sgpt` DECIMAL(10, 2) NOT NULL,
    `sgot` DECIMAL(10, 2) NOT NULL,
    `sodium` DECIMAL(10, 2) NOT NULL,
    `potasium` DECIMAL(10, 2) NOT NULL,
    `ionized_calcium` DECIMAL(10, 2) NOT NULL,
    `calcium` DECIMAL(10, 2) NOT NULL,
    `remarks` TEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `chemistry_test_id_key`(`test_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `chemistry` ADD CONSTRAINT `chemistry_test_id_fkey` FOREIGN KEY (`test_id`) REFERENCES `tests`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
