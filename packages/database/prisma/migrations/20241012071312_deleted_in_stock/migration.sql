/*
  Warnings:

  - You are about to drop the column `inStock` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `inStock` on the `ProductVariant` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "inStock";

-- AlterTable
ALTER TABLE "ProductVariant" DROP COLUMN "inStock";
