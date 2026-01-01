/*
  Warnings:

  - Added the required column `countryId` to the `State` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "State" ADD COLUMN     "countryId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "State" ADD CONSTRAINT "State_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
