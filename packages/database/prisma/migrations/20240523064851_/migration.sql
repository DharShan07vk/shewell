/*
  Warnings:

  - You are about to drop the column `experience` on the `ProfessionalExperience` table. All the data in the column will be lost.
  - You are about to drop the column `hospital` on the `ProfessionalExperience` table. All the data in the column will be lost.
  - Added the required column `location` to the `ProfessionalExperience` table without a default value. This is not possible if the table is not empty.
  - Added the required column `years` to the `ProfessionalExperience` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProfessionalExperience" DROP COLUMN "experience",
DROP COLUMN "hospital",
ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "years" TEXT NOT NULL;
