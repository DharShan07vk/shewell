/*
  Warnings:

  - Made the column `dob` on table `ProfessionalUser` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "ProfessionalUser" ALTER COLUMN "dob" SET NOT NULL;
