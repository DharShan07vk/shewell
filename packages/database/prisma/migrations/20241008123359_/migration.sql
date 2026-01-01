/*
  Warnings:

  - You are about to drop the column `coupleSession` on the `professionalUserAppointmentPrice` table. All the data in the column will be lost.
  - You are about to drop the column `priceInCents` on the `professionalUserAppointmentPrice` table. All the data in the column will be lost.
  - Added the required column `priceInCentsForCouple` to the `professionalUserAppointmentPrice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `priceInCentsForSingle` to the `professionalUserAppointmentPrice` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "professionalUserAppointmentPrice" DROP COLUMN "coupleSession",
DROP COLUMN "priceInCents",
ADD COLUMN     "priceInCentsForCouple" INTEGER NOT NULL,
ADD COLUMN     "priceInCentsForSingle" INTEGER NOT NULL;
