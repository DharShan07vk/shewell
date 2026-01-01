/*
  Warnings:

  - Added the required column `availabilityId` to the `ProfessionalUser` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Day" AS ENUM ('SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT');

-- AlterTable
ALTER TABLE "ProfessionalUser" ADD COLUMN     "availabilityId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Availability" (
    "id" TEXT NOT NULL,
    "available" BOOLEAN NOT NULL,
    "day" "Day" NOT NULL,

    CONSTRAINT "Availability_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AvailabilityTimings" (
    "id" TEXT NOT NULL,
    "startingTime" TIMESTAMP(3) NOT NULL,
    "endingTime" TIMESTAMP(3) NOT NULL,
    "availabilityId" TEXT,

    CONSTRAINT "AvailabilityTimings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UnAvailableDay" (
    "id" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "professionalUserId" TEXT,

    CONSTRAINT "UnAvailableDay_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProfessionalUser" ADD CONSTRAINT "ProfessionalUser_availabilityId_fkey" FOREIGN KEY ("availabilityId") REFERENCES "Availability"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AvailabilityTimings" ADD CONSTRAINT "AvailabilityTimings_availabilityId_fkey" FOREIGN KEY ("availabilityId") REFERENCES "Availability"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UnAvailableDay" ADD CONSTRAINT "UnAvailableDay_professionalUserId_fkey" FOREIGN KEY ("professionalUserId") REFERENCES "ProfessionalUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;
