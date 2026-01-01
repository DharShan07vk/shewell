/*
  Warnings:

  - You are about to drop the column `documentId` on the `ProfessionalUploads` table. All the data in the column will be lost.
  - You are about to drop the column `imageId` on the `ProfessionalUploads` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProfessionalUploads" DROP CONSTRAINT "ProfessionalUploads_documentId_fkey";

-- DropForeignKey
ALTER TABLE "ProfessionalUploads" DROP CONSTRAINT "ProfessionalUploads_imageId_fkey";

-- AlterTable
ALTER TABLE "ProfessionalUploads" DROP COLUMN "documentId",
DROP COLUMN "imageId";
