/*
  Warnings:

  - You are about to drop the column `serviceModeId` on the `BookAppointment` table. All the data in the column will be lost.
  - You are about to drop the `ServiceMode` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `description` to the `BookAppointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `planName` to the `BookAppointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `priceInCents` to the `BookAppointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `serviceType` to the `BookAppointment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "BookAppointment" DROP CONSTRAINT "BookAppointment_serviceModeId_fkey";

-- AlterTable
ALTER TABLE "BookAppointment" DROP COLUMN "serviceModeId",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "planName" TEXT NOT NULL,
ADD COLUMN     "priceInCents" INTEGER NOT NULL,
ADD COLUMN     "serviceType" "AppointmentType" NOT NULL;

-- DropTable
DROP TABLE "ServiceMode";
