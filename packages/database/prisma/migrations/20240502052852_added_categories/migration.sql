/*
  Warnings:

  - You are about to drop the `Products` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "ProductCategory" AS ENUM ('MOTHER', 'CHILD');

-- DropForeignKey
ALTER TABLE "Products" DROP CONSTRAINT "Products_mediaId_fkey";

-- DropTable
DROP TABLE "Products";

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "avgRating" DECIMAL(65,30) NOT NULL,
    "totalReviews" INTEGER NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3) NOT NULL,
    "mediaId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "productCategory" "ProductCategory" NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductBenefit" (
    "id" TEXT NOT NULL,
    "benefit" TEXT NOT NULL,
    "productsId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductBenefit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductVariant" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductVariant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductStats" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "stat" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductStats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3) NOT NULL,
    "slug" TEXT NOT NULL,
    "mediaId" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_slug_key" ON "Product"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Category_slug_key" ON "Category"("slug");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "Media"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductBenefit" ADD CONSTRAINT "ProductBenefit_productsId_fkey" FOREIGN KEY ("productsId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductVariant" ADD CONSTRAINT "ProductVariant_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductStats" ADD CONSTRAINT "ProductStats_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "Media"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
