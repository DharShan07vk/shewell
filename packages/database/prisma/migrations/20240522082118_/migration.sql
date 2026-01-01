/*
  Warnings:

  - You are about to drop the `_ProfessionalDegreeToProfessionalUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ProfessionalExperienceToProfessionalUser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `professionalUserId` to the `ProfessionalDegree` table without a default value. This is not possible if the table is not empty.
  - Added the required column `professionalUserId` to the `ProfessionalExperience` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_ProfessionalDegreeToProfessionalUser" DROP CONSTRAINT "_ProfessionalDegreeToProfessionalUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProfessionalDegreeToProfessionalUser" DROP CONSTRAINT "_ProfessionalDegreeToProfessionalUser_B_fkey";

-- DropForeignKey
ALTER TABLE "_ProfessionalExperienceToProfessionalUser" DROP CONSTRAINT "_ProfessionalExperienceToProfessionalUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProfessionalExperienceToProfessionalUser" DROP CONSTRAINT "_ProfessionalExperienceToProfessionalUser_B_fkey";

-- AlterTable
ALTER TABLE "ProfessionalDegree" ADD COLUMN     "professionalUserId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ProfessionalExperience" ADD COLUMN     "professionalUserId" TEXT NOT NULL;

-- DropTable
DROP TABLE "_ProfessionalDegreeToProfessionalUser";

-- DropTable
DROP TABLE "_ProfessionalExperienceToProfessionalUser";

-- AddForeignKey
ALTER TABLE "ProfessionalDegree" ADD CONSTRAINT "ProfessionalDegree_professionalUserId_fkey" FOREIGN KEY ("professionalUserId") REFERENCES "ProfessionalUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfessionalExperience" ADD CONSTRAINT "ProfessionalExperience_professionalUserId_fkey" FOREIGN KEY ("professionalUserId") REFERENCES "ProfessionalUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
