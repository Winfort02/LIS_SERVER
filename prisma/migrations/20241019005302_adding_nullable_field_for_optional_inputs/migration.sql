-- AlterTable
ALTER TABLE `chemistry` MODIFY `fasting_blood_sugar` DECIMAL(10, 2) NULL,
    MODIFY `random_blood_sugar` DECIMAL(10, 2) NULL,
    MODIFY `post_prandial` DECIMAL(10, 2) NULL,
    MODIFY `total_cholesterol` DECIMAL(10, 2) NULL,
    MODIFY `triglycerides` DECIMAL(10, 2) NULL,
    MODIFY `hdl` DECIMAL(10, 2) NULL,
    MODIFY `ldl` DECIMAL(10, 2) NULL,
    MODIFY `uric_acid` DECIMAL(10, 2) NULL,
    MODIFY `creatinine` DECIMAL(10, 2) NULL,
    MODIFY `bun` DECIMAL(10, 2) NULL,
    MODIFY `sgpt` DECIMAL(10, 2) NULL,
    MODIFY `sgot` DECIMAL(10, 2) NULL,
    MODIFY `sodium` DECIMAL(10, 2) NULL,
    MODIFY `potasium` DECIMAL(10, 2) NULL,
    MODIFY `ionized_calcium` DECIMAL(10, 2) NULL,
    MODIFY `calcium` DECIMAL(10, 2) NULL;

-- AlterTable
ALTER TABLE `urinalysis` MODIFY `cast_rbc` DECIMAL(10, 2) NULL,
    MODIFY `cast_wbc` DECIMAL(10, 2) NULL;
