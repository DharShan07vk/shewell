/*
  Warnings:

  - Added the required column `city` to the `ProfessionalQualifications` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ProfessionalQualifications" DROP CONSTRAINT "ProfessionalQualifications_cityId_fkey";

-- AlterTable
ALTER TABLE "ProfessionalQualifications" ADD COLUMN     "city" TEXT NOT NULL,
ALTER COLUMN "cityId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "ProfessionalQualifications" ADD CONSTRAINT "ProfessionalQualifications_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE SET NULL ON UPDATE CASCADE;
