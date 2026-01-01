/*
  Warnings:

  - Added the required column `productId` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Review" ADD COLUMN     "productId" TEXT NOT NULL,
ALTER COLUMN "rating" SET DATA TYPE TEXT,
ALTER COLUMN "approved" SET DEFAULT false;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
