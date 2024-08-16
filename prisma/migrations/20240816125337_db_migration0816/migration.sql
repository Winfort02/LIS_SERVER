-- CreateTable
CREATE TABLE `patients` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `last_name` VARCHAR(191) NOT NULL,
    `first_name` VARCHAR(191) NOT NULL,
    `middle_name` VARCHAR(191) NOT NULL,
    `contact_number` VARCHAR(191) NOT NULL,
    `date_of_birth` DATETIME(3) NOT NULL,
    `sex` VARCHAR(191) NOT NULL,
    `address` TEXT NOT NULL,
    `civil_status` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `test_orders` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `test_type` TEXT NOT NULL,
    `specify_test` TEXT NOT NULL,
    `sample` TEXT NOT NULL,
    `patient_id` INTEGER NOT NULL,
    `collection_date_time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `test_orders_patient_id_key`(`patient_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `result_type_hematology` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `test_order_id` INTEGER NOT NULL,
    `patient_id` INTEGER NOT NULL,
    `test_requested_hemoglobin` INTEGER NULL,
    `test_requested_hematocrit` INTEGER NULL,
    `test_requested_rbc_count` INTEGER NULL,
    `test_requested_wbc_count` INTEGER NULL,
    `test_requested_platelet_count` INTEGER NULL,
    `test_requested_dc_neutrophil` INTEGER NULL,
    `test_requested_segmented` INTEGER NULL,
    `test_requested_dc_stab` INTEGER NULL,
    `test_requested_dc_lymhocytes` INTEGER NULL,
    `test_requested_monocytes` INTEGER NULL,
    `test_requested_dc_eosinophils` INTEGER NULL,
    `test_requested_dc_basophils` INTEGER NULL,
    `test_requested_blood_typing_abo` INTEGER NULL,
    `test_requested_blood_typing_rh` INTEGER NULL,
    `date_of_result` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `remarks` TEXT NOT NULL,

    UNIQUE INDEX `result_type_hematology_test_order_id_key`(`test_order_id`),
    UNIQUE INDEX `result_type_hematology_patient_id_key`(`patient_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `result_type_chemistry` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `test_order_id` INTEGER NOT NULL,
    `patient_id` INTEGER NOT NULL,
    `last_meal` INTEGER NULL,
    `time_taken` INTEGER NULL,
    `blood_sugar_fasting` INTEGER NULL,
    `blood_sugar_random` INTEGER NULL,
    `blood_sugar_2hr_post` INTEGER NULL,
    `prandial` VARCHAR(191) NULL,
    `lipid_profile_total_choresterol` INTEGER NULL,
    `lipid_profile_triglycerides` INTEGER NULL,
    `lipid_profile_hdl` INTEGER NULL,
    `kidney_ft_uric_acid` INTEGER NULL,
    `kidney_ft_creatine` INTEGER NULL,
    `kidney_ft_bun` INTEGER NULL,
    `enzymes_sgpt` INTEGER NULL,
    `enzymes_sgot` INTEGER NULL,
    `electrolytes_sodium` INTEGER NULL,
    `electrolytes_potassium` INTEGER NULL,
    `electrolytes_calcium` INTEGER NULL,
    `date_of_result` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `remarks` TEXT NOT NULL,

    UNIQUE INDEX `result_type_chemistry_test_order_id_key`(`test_order_id`),
    UNIQUE INDEX `result_type_chemistry_patient_id_key`(`patient_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `result_type_urinalysis` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `test_order_id` INTEGER NOT NULL,
    `patient_id` INTEGER NOT NULL,
    `physical_property_color` TEXT NULL,
    `physical_property_transparency` TEXT NULL,
    `physical_property_ph` INTEGER NULL,
    `physical_property_specific_gravity` INTEGER NULL,
    `chemical_test_reducing_sugar` INTEGER NULL,
    `chemical_test_protein` INTEGER NULL,
    `me_wbc` INTEGER NULL,
    `me_rbc` INTEGER NULL,
    `me_ec_squamous` TEXT NULL,
    `me_ec_renal_tubolar` TEXT NULL,
    `me_ec_transitional` TEXT NULL,
    `me_ec_bacteria` TEXT NULL,
    `me_ec_yeast` TEXT NULL,
    `me_ec_mucos_threads` TEXT NULL,
    `me_crytals_amorphous_urates` TEXT NULL,
    `me_crytals_amorphous_phosphates` TEXT NULL,
    `me_crytals_uric_acid` TEXT NULL,
    `me_crytals_calcium_oxalate` TEXT NULL,
    `me_crytals_tripple_phosphate` TEXT NULL,
    `me_crytals_calcium_carbonate` TEXT NULL,
    `me_crytals_phosphate` TEXT NULL,
    `me_crytals_ammonium_biurate` TEXT NULL,
    `me_cast_hyline` TEXT NULL,
    `me_cast_fine_granular` TEXT NULL,
    `me_cast_coarse_granular` TEXT NULL,
    `me_cast_rbc` TEXT NULL,
    `me_cast_wbc` TEXT NULL,
    `me_cast_waxy` TEXT NULL,
    `me_cast_board` TEXT NULL,
    `date_of_result` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `remarks` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `inventory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `item` TEXT NOT NULL,
    `item_type` TEXT NOT NULL,
    `item_description` TEXT NOT NULL,
    `quantity_in_stock` INTEGER NOT NULL,
    `reorder_level` INTEGER NOT NULL,
    `storage_location` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usage_logs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `inventory_id` INTEGER NOT NULL,
    `quantity_used` INTEGER NOT NULL,
    `date_of_use` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `purpose_of_use` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `test_orders` ADD CONSTRAINT `test_orders_patient_id_fkey` FOREIGN KEY (`patient_id`) REFERENCES `patients`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `result_type_hematology` ADD CONSTRAINT `result_type_hematology_test_order_id_fkey` FOREIGN KEY (`test_order_id`) REFERENCES `test_orders`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `result_type_hematology` ADD CONSTRAINT `result_type_hematology_patient_id_fkey` FOREIGN KEY (`patient_id`) REFERENCES `patients`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `result_type_chemistry` ADD CONSTRAINT `result_type_chemistry_test_order_id_fkey` FOREIGN KEY (`test_order_id`) REFERENCES `test_orders`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `result_type_chemistry` ADD CONSTRAINT `result_type_chemistry_patient_id_fkey` FOREIGN KEY (`patient_id`) REFERENCES `patients`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `result_type_urinalysis` ADD CONSTRAINT `result_type_urinalysis_test_order_id_fkey` FOREIGN KEY (`test_order_id`) REFERENCES `test_orders`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `result_type_urinalysis` ADD CONSTRAINT `result_type_urinalysis_patient_id_fkey` FOREIGN KEY (`patient_id`) REFERENCES `patients`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `usage_logs` ADD CONSTRAINT `usage_logs_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `usage_logs` ADD CONSTRAINT `usage_logs_inventory_id_fkey` FOREIGN KEY (`inventory_id`) REFERENCES `inventory`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
