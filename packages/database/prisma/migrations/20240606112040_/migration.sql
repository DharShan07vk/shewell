/*
  Warnings:

  - You are about to drop the `_ProfessionalSpecializationsToProfessionalUser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `professionalUserId` to the `ProfessionalSpecializations` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_ProfessionalSpecializationsToProfessionalUser" DROP CONSTRAINT "_ProfessionalSpecializationsToProfessionalUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProfessionalSpecializationsToProfessionalUser" DROP CONSTRAINT "_ProfessionalSpecializationsToProfessionalUser_B_fkey";

-- AlterTable
ALTER TABLE "ProfessionalSpecializations" ADD COLUMN     "professionalUserId" TEXT NOT NULL;

-- DropTable
DROP TABLE "_ProfessionalSpecializationsToProfessionalUser";

-- AddForeignKey
ALTER TABLE "ProfessionalSpecializations" ADD CONSTRAINT "ProfessionalSpecializations_professionalUserId_fkey" FOREIGN KEY ("professionalUserId") REFERENCES "ProfessionalUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
