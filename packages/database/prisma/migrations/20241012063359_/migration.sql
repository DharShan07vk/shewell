/*
  Warnings:

  - Made the column `firstName` on table `ProfessionalUser` required. This step will fail if there are existing NULL values in that column.
  - Made the column `phoneNumber` on table `ProfessionalUser` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `ProfessionalUser` required. This step will fail if there are existing NULL values in that column.
  - Made the column `passwordHash` on table `ProfessionalUser` required. This step will fail if there are existing NULL values in that column.
  - Made the column `dob` on table `ProfessionalUser` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "ProfessionalUser" ALTER COLUMN "firstName" SET NOT NULL,
ALTER COLUMN "phoneNumber" SET NOT NULL,
ALTER COLUMN "email" SET NOT NULL,
ALTER COLUMN "passwordHash" SET NOT NULL,
ALTER COLUMN "dob" SET NOT NULL;
