/*
  Warnings:

  - You are about to drop the column `city` on the `Address` table. All the data in the column will be lost.
  - Added the required column `cityId` to the `Address` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Address" DROP COLUMN "city",
ADD COLUMN     "cityId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
