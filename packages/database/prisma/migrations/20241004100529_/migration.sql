/*
  Warnings:

  - You are about to drop the column `meetingId` on the `ProfessionalUser` table. All the data in the column will be lost.
  - You are about to drop the column `meetingLink` on the `ProfessionalUser` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "BookAppointment" ADD COLUMN     "meetingId" TEXT,
ADD COLUMN     "meetingLink" TEXT;

-- AlterTable
ALTER TABLE "ProfessionalUser" DROP COLUMN "meetingId",
DROP COLUMN "meetingLink";
