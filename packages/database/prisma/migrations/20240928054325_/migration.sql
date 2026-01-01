/*
  Warnings:

  - A unique constraint covering the columns `[mediaId]` on the table `ProfessionalUser` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "ProfessionalUser" ADD COLUMN     "mediaId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "ProfessionalUser_mediaId_key" ON "ProfessionalUser"("mediaId");

-- AddForeignKey
ALTER TABLE "ProfessionalUser" ADD CONSTRAINT "ProfessionalUser_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "Media"("id") ON DELETE SET NULL ON UPDATE CASCADE;
