/*
  Warnings:

  - You are about to drop the column `professionalUserId` on the `ProfessionalSpecializations` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProfessionalSpecializations" DROP CONSTRAINT "ProfessionalSpecializations_professionalUserId_fkey";

-- AlterTable
ALTER TABLE "ProfessionalSpecializations" DROP COLUMN "professionalUserId";

-- CreateTable
CREATE TABLE "_ProfessionalSpecializationsToProfessionalUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ProfessionalSpecializationsToProfessionalUser_AB_unique" ON "_ProfessionalSpecializationsToProfessionalUser"("A", "B");

-- CreateIndex
CREATE INDEX "_ProfessionalSpecializationsToProfessionalUser_B_index" ON "_ProfessionalSpecializationsToProfessionalUser"("B");

-- AddForeignKey
ALTER TABLE "_ProfessionalSpecializationsToProfessionalUser" ADD CONSTRAINT "_ProfessionalSpecializationsToProfessionalUser_A_fkey" FOREIGN KEY ("A") REFERENCES "ProfessionalSpecializations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProfessionalSpecializationsToProfessionalUser" ADD CONSTRAINT "_ProfessionalSpecializationsToProfessionalUser_B_fkey" FOREIGN KEY ("B") REFERENCES "ProfessionalUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;
