/*
  Warnings:

  - You are about to drop the column `coupleMessage` on the `AdditionalPatient` table. All the data in the column will be lost.
  - Added the required column `message` to the `AdditionalPatient` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AdditionalPatient" DROP COLUMN "coupleMessage",
ADD COLUMN     "message" TEXT NOT NULL;
