/*
  Warnings:

  - You are about to drop the column `meetingType` on the `ProfessionalUser` table. All the data in the column will be lost.
  - You are about to drop the column `sessionType` on the `ProfessionalUser` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ProfessionalUser" DROP COLUMN "meetingType",
DROP COLUMN "sessionType";
