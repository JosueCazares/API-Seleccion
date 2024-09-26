/*
  Warnings:

  - The values [ACTIVO] on the enum `Periodos_status` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `aspirante` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE `periodos` MODIFY `status` ENUM('ABIERTA', 'INACTIVO') NOT NULL;

-- DropTable
DROP TABLE `aspirante`;

-- CreateTable
CREATE TABLE `Aspirantes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `telefono` VARCHAR(191) NOT NULL,
    `curp` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `carrera_deseada` VARCHAR(191) NOT NULL,
    `status` ENUM('ACEPTADO', 'RECHAZADO') NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
