/*
  Warnings:

  - You are about to drop the column `displayedQualificationId` on the `ProfessionalQualifications` table. All the data in the column will be lost.
  - You are about to drop the `ProfessionalDisplayQualification` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `displayQualificationId` to the `ProfessionalUser` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ProfessionalQualifications" DROP CONSTRAINT "ProfessionalQualifications_displayedQualificationId_fkey";

-- AlterTable
ALTER TABLE "ProfessionalQualifications" DROP COLUMN "displayedQualificationId";

-- AlterTable
ALTER TABLE "ProfessionalUser" ADD COLUMN     "displayQualificationId" TEXT NOT NULL;

-- DropTable
DROP TABLE "ProfessionalDisplayQualification";

-- AddForeignKey
ALTER TABLE "ProfessionalUser" ADD CONSTRAINT "ProfessionalUser_displayQualificationId_fkey" FOREIGN KEY ("displayQualificationId") REFERENCES "ProfessionalSpecializations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
