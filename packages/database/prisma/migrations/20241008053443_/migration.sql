/*
  Warnings:

  - Added the required column `active` to the `ProfessionalLanguages` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProfessionalLanguages" ADD COLUMN     "active" BOOLEAN NOT NULL;
