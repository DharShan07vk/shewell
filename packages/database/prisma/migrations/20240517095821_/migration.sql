/*
  Warnings:

  - Made the column `avgRating` on table `ProfessionalUser` required. This step will fail if there are existing NULL values in that column.
  - Made the column `totalConsultations` on table `ProfessionalUser` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "ProfessionalUser" ALTER COLUMN "avgRating" SET NOT NULL,
ALTER COLUMN "totalConsultations" SET NOT NULL;
