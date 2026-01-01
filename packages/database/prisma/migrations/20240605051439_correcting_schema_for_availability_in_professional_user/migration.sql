/*
  Warnings:

  - You are about to drop the column `availabilityId` on the `ProfessionalUser` table. All the data in the column will be lost.
  - Added the required column `professionalUserId` to the `Availability` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ProfessionalUser" DROP CONSTRAINT "ProfessionalUser_availabilityId_fkey";

-- AlterTable
ALTER TABLE "Availability" ADD COLUMN     "professionalUserId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ProfessionalUser" DROP COLUMN "availabilityId";

-- AddForeignKey
ALTER TABLE "Availability" ADD CONSTRAINT "Availability_professionalUserId_fkey" FOREIGN KEY ("professionalUserId") REFERENCES "ProfessionalUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
