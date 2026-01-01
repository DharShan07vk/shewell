/*
  Warnings:

  - You are about to drop the column `dispalyedQualification` on the `ProfessionalDisplayQualification` table. All the data in the column will be lost.
  - Added the required column `name` to the `ProfessionalDisplayQualification` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProfessionalDisplayQualification" DROP COLUMN "dispalyedQualification",
ADD COLUMN     "name" TEXT NOT NULL;
