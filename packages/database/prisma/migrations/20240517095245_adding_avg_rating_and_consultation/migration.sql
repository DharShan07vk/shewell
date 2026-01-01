/*
  Warnings:

  - Added the required column `avgRating` to the `ProfessionalUser` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalConsultations` to the `ProfessionalUser` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProfessionalUser" ADD COLUMN     "avgRating" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "totalConsultations" INTEGER NOT NULL;
