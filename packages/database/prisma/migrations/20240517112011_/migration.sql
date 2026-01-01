/*
  Warnings:

  - You are about to drop the column `qualification` on the `ProfessionalQualifications` table. All the data in the column will be lost.
  - Added the required column `qualificationDisplay` to the `ProfessionalQualifications` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProfessionalQualifications" DROP COLUMN "qualification",
ADD COLUMN     "qualificationDisplay" TEXT NOT NULL;
