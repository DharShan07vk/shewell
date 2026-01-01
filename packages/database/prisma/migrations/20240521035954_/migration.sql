/*
  Warnings:

  - You are about to drop the column `qualification` on the `ProfessionalQualifications` table. All the data in the column will be lost.
  - The `degree` column on the `ProfessionalQualifications` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `language` column on the `ProfessionalQualifications` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `displayedQualification` to the `ProfessionalQualifications` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProfessionalQualifications" DROP COLUMN "qualification",
ADD COLUMN     "displayedQualification" TEXT NOT NULL,
DROP COLUMN "degree",
ADD COLUMN     "degree" TEXT[],
DROP COLUMN "language",
ADD COLUMN     "language" TEXT[];
