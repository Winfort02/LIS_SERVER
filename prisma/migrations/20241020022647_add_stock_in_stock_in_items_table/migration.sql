-- CreateTable
CREATE TABLE `stock_in` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `remarks` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `stock_in_items` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `apparatus_id` INTEGER NOT NULL,
    `stock_in_id` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `stock_in` ADD CONSTRAINT `stock_in_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `stock_in_items` ADD CONSTRAINT `stock_in_items_apparatus_id_fkey` FOREIGN KEY (`apparatus_id`) REFERENCES `apparatus`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `stock_in_items` ADD CONSTRAINT `stock_in_items_stock_in_id_fkey` FOREIGN KEY (`stock_in_id`) REFERENCES `stock_in`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
