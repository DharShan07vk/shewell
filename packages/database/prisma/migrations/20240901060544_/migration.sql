/*
  Warnings:

  - You are about to drop the `_ProfessionalLanguagesToProfessionalQualifications` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ProfessionalLanguagesToProfessionalQualifications" DROP CONSTRAINT "_ProfessionalLanguagesToProfessionalQualifications_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProfessionalLanguagesToProfessionalQualifications" DROP CONSTRAINT "_ProfessionalLanguagesToProfessionalQualifications_B_fkey";

-- DropTable
DROP TABLE "_ProfessionalLanguagesToProfessionalQualifications";

-- CreateTable
CREATE TABLE "_ProfessionalUser Languages" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ProfessionalUser Languages_AB_unique" ON "_ProfessionalUser Languages"("A", "B");

-- CreateIndex
CREATE INDEX "_ProfessionalUser Languages_B_index" ON "_ProfessionalUser Languages"("B");

-- AddForeignKey
ALTER TABLE "_ProfessionalUser Languages" ADD CONSTRAINT "_ProfessionalUser Languages_A_fkey" FOREIGN KEY ("A") REFERENCES "ProfessionalLanguages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProfessionalUser Languages" ADD CONSTRAINT "_ProfessionalUser Languages_B_fkey" FOREIGN KEY ("B") REFERENCES "ProfessionalUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;
