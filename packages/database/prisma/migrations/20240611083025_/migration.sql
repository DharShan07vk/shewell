/*
  Warnings:

  - Added the required column `status` to the `BookAppointment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BookAppointment" ADD COLUMN     "status" "BookAppointmentStatus" NOT NULL;
