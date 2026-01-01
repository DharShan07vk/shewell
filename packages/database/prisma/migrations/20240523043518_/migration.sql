/*
  Warnings:

  - You are about to drop the column `cityId` on the `Address` table. All the data in the column will be lost.
  - Added the required column `city` to the `Address` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_cityId_fkey";

-- AlterTable
ALTER TABLE "Address" DROP COLUMN "cityId",
ADD COLUMN     "city" TEXT NOT NULL;
