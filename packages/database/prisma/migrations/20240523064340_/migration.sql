/*
  Warnings:

  - You are about to drop the column `department` on the `ProfessionalQualifications` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `ProfessionalQualifications` table. All the data in the column will be lost.
  - You are about to drop the column `position` on the `ProfessionalQualifications` table. All the data in the column will be lost.
  - You are about to drop the column `years` on the `ProfessionalQualifications` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ProfessionalExperience" ADD COLUMN     "professionalQualificationsId" TEXT;

-- AlterTable
ALTER TABLE "ProfessionalQualifications" DROP COLUMN "department",
DROP COLUMN "location",
DROP COLUMN "position",
DROP COLUMN "years";

-- AddForeignKey
ALTER TABLE "ProfessionalExperience" ADD CONSTRAINT "ProfessionalExperience_professionalQualificationsId_fkey" FOREIGN KEY ("professionalQualificationsId") REFERENCES "ProfessionalQualifications"("id") ON DELETE SET NULL ON UPDATE CASCADE;
