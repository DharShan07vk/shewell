/*
  Warnings:

  - You are about to drop the column `displayedQualification` on the `ProfessionalQualifications` table. All the data in the column will be lost.
  - Added the required column `displayedQualificationId` to the `ProfessionalQualifications` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProfessionalQualifications" DROP COLUMN "displayedQualification",
ADD COLUMN     "displayedQualificationId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "ProfessionalDisplayQualification" (
    "id" TEXT NOT NULL,
    "dispalyedQualification" TEXT NOT NULL,

    CONSTRAINT "ProfessionalDisplayQualification_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProfessionalQualifications" ADD CONSTRAINT "ProfessionalQualifications_displayedQualificationId_fkey" FOREIGN KEY ("displayedQualificationId") REFERENCES "ProfessionalDisplayQualification"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
