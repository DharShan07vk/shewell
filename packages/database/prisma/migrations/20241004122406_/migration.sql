/*
  Warnings:

  - You are about to drop the column `deletedAt` on the `Country` table. All the data in the column will be lost.
  - Added the required column `countryId` to the `City` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "City" ADD COLUMN     "countryId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Country" DROP COLUMN "deletedAt";

-- AddForeignKey
ALTER TABLE "City" ADD CONSTRAINT "City_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
