/*
  Warnings:

  - Added the required column `active` to the `ProfessionalSpecializations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProfessionalSpecializations" ADD COLUMN     "active" BOOLEAN NOT NULL;
