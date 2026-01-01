/*
  Warnings:

  - You are about to drop the column `years` on the `ProfessionalExperience` table. All the data in the column will be lost.
  - Added the required column `endingYear` to the `ProfessionalExperience` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startingYear` to the `ProfessionalExperience` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProfessionalExperience" DROP COLUMN "years",
ADD COLUMN     "endingYear" TEXT NOT NULL,
ADD COLUMN     "startingYear" TEXT NOT NULL;
