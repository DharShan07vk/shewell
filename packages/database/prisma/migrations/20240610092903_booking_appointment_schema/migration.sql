/*
  Warnings:

  - You are about to drop the column `firstName` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the column `message` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the `Test` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `name` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `ServiceMode` table without a default value. This is not possible if the table is not empty.
  - Added the required column `planName` to the `ServiceMode` table without a default value. This is not possible if the table is not empty.
  - Added the required column `priceInCents` to the `ServiceMode` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Patient" DROP CONSTRAINT "Patient_userId_fkey";

-- AlterTable
ALTER TABLE "Patient" DROP COLUMN "firstName",
DROP COLUMN "lastName",
DROP COLUMN "message",
DROP COLUMN "userId",
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ServiceMode" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "planName" TEXT NOT NULL,
ADD COLUMN     "priceInCents" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Test";

-- DropEnum
DROP TYPE "Check";

-- CreateTable
CREATE TABLE "BookAppointment" (
    "id" TEXT NOT NULL,
    "serviceModeId" TEXT NOT NULL,
    "professionalUserId" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "startingTime" TIMESTAMP(3) NOT NULL,
    "endingTime" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BookAppointment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BookAppointment" ADD CONSTRAINT "BookAppointment_serviceModeId_fkey" FOREIGN KEY ("serviceModeId") REFERENCES "ServiceMode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookAppointment" ADD CONSTRAINT "BookAppointment_professionalUserId_fkey" FOREIGN KEY ("professionalUserId") REFERENCES "ProfessionalUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookAppointment" ADD CONSTRAINT "BookAppointment_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
