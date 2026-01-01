/*
  Warnings:

  - You are about to drop the column `expInMonths` on the `ProfessionalQualifications` table. All the data in the column will be lost.
  - You are about to drop the column `expInYears` on the `ProfessionalQualifications` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ProfessionalQualifications" DROP COLUMN "expInMonths",
DROP COLUMN "expInYears",
ADD COLUMN     "department" TEXT,
ADD COLUMN     "location" TEXT,
ADD COLUMN     "position" TEXT,
ADD COLUMN     "years" TEXT;
