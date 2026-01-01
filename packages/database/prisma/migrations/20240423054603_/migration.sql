/*
  Warnings:

  - Added the required column `dob` to the `ProfessionalUser` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProfessionalUser" ADD COLUMN     "dob" TEXT NOT NULL;
