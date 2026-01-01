/*
  Warnings:

  - You are about to drop the column `meetingId` on the `BookAppointment` table. All the data in the column will be lost.
  - You are about to drop the column `meetingLink` on the `BookAppointment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "BookAppointment" DROP COLUMN "meetingId",
DROP COLUMN "meetingLink",
ADD COLUMN     "meeting" JSONB;
