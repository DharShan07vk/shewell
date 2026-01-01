/*
  Warnings:

  - A unique constraint covering the columns `[bookAppointmentId]` on the table `ProfessionalUserRating` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `bookAppointmentId` to the `ProfessionalUserRating` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProfessionalUserRating" ADD COLUMN     "bookAppointmentId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ProfessionalUserRating_bookAppointmentId_key" ON "ProfessionalUserRating"("bookAppointmentId");

-- AddForeignKey
ALTER TABLE "ProfessionalUserRating" ADD CONSTRAINT "ProfessionalUserRating_bookAppointmentId_fkey" FOREIGN KEY ("bookAppointmentId") REFERENCES "BookAppointment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
