/*
  Warnings:

  - You are about to drop the column `productsId` on the `ProductBenefit` table. All the data in the column will be lost.
  - Added the required column `productId` to the `ProductBenefit` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ProductBenefit" DROP CONSTRAINT "ProductBenefit_productsId_fkey";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "bestSeller" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "ProductBenefit" DROP COLUMN "productsId",
ADD COLUMN     "productId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "ProductBenefit" ADD CONSTRAINT "ProductBenefit_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
