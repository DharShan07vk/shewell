/*
  Warnings:

  - You are about to drop the column `language` on the `ProfessionalQualifications` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ProfessionalQualifications" DROP COLUMN "language";

-- CreateTable
CREATE TABLE "ProfessionalLanguages" (
    "id" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "professionalQualificationsId" TEXT,

    CONSTRAINT "ProfessionalLanguages_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProfessionalLanguages" ADD CONSTRAINT "ProfessionalLanguages_professionalQualificationsId_fkey" FOREIGN KEY ("professionalQualificationsId") REFERENCES "ProfessionalQualifications"("id") ON DELETE SET NULL ON UPDATE CASCADE;
