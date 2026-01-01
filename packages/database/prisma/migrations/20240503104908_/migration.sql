/*
  Warnings:

  - You are about to drop the column `price` on the `Product` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_mediaId_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "price",
ALTER COLUMN "deletedAt" DROP NOT NULL,
ALTER COLUMN "mediaId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "Media"("id") ON DELETE SET NULL ON UPDATE CASCADE;
