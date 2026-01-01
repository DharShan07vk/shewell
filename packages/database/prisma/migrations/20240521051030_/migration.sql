/*
  Warnings:

  - You are about to drop the column `professionalQualificationsId` on the `ProfessionalLanguages` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProfessionalLanguages" DROP CONSTRAINT "ProfessionalLanguages_professionalQualificationsId_fkey";

-- AlterTable
ALTER TABLE "ProfessionalLanguages" DROP COLUMN "professionalQualificationsId";

-- CreateTable
CREATE TABLE "_ProfessionalLanguagesToProfessionalQualifications" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ProfessionalLanguagesToProfessionalQualifications_AB_unique" ON "_ProfessionalLanguagesToProfessionalQualifications"("A", "B");

-- CreateIndex
CREATE INDEX "_ProfessionalLanguagesToProfessionalQualifications_B_index" ON "_ProfessionalLanguagesToProfessionalQualifications"("B");

-- AddForeignKey
ALTER TABLE "_ProfessionalLanguagesToProfessionalQualifications" ADD CONSTRAINT "_ProfessionalLanguagesToProfessionalQualifications_A_fkey" FOREIGN KEY ("A") REFERENCES "ProfessionalLanguages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProfessionalLanguagesToProfessionalQualifications" ADD CONSTRAINT "_ProfessionalLanguagesToProfessionalQualifications_B_fkey" FOREIGN KEY ("B") REFERENCES "ProfessionalQualifications"("id") ON DELETE CASCADE ON UPDATE CASCADE;
