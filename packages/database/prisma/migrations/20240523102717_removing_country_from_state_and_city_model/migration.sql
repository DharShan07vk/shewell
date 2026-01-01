/*
  Warnings:

  - You are about to drop the column `countryId` on the `City` table. All the data in the column will be lost.
  - You are about to drop the column `countryId` on the `State` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "City" DROP CONSTRAINT "City_countryId_fkey";

-- DropForeignKey
ALTER TABLE "State" DROP CONSTRAINT "State_countryId_fkey";

-- AlterTable
ALTER TABLE "City" DROP COLUMN "countryId";

-- AlterTable
ALTER TABLE "State" DROP COLUMN "countryId";
