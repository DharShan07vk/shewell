/*
  Warnings:

  - Added the required column `countryId` to the `City` table without a default value. This is not possible if the table is not empty.
  - Added the required column `countryId` to the `State` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('CART', 'PAYMENT_SUCCESSFUL', 'PAYMENT_PENDING', 'PAYMMENT_FAILED', 'OUT_FOR_DELIVERY', 'CANCELLED', 'RETURNED');

-- AlterTable
ALTER TABLE "City" ADD COLUMN     "countryId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "State" ADD COLUMN     "countryId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "name" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Address" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "mobile" TEXT NOT NULL,
    "houseNo" TEXT NOT NULL,
    "area" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "countryId" TEXT NOT NULL,
    "stateId" TEXT NOT NULL,
    "landmark" TEXT NOT NULL,
    "pincode" TEXT NOT NULL,
    "addressType" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "userId" TEXT NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "status" "OrderStatus" NOT NULL,
    "subTotalInCent" INTEGER NOT NULL,
    "taxesInCent" INTEGER NOT NULL,
    "deliveryFeesInCent" INTEGER NOT NULL,
    "totalInCent" INTEGER NOT NULL,
    "couponId" TEXT,
    "addressId" TEXT NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Coupon" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "isPercent" BOOLEAN NOT NULL,
    "description" TEXT NOT NULL,
    "newUser" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "active" BOOLEAN NOT NULL,

    CONSTRAINT "Coupon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LineItem" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "productVariantId" TEXT NOT NULL,
    "perUnitPriceInCent" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "subTotalInCent" INTEGER NOT NULL,
    "discountInCent" INTEGER NOT NULL,
    "totalInCent" INTEGER NOT NULL,

    CONSTRAINT "LineItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Country" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "iso3" TEXT NOT NULL,
    "iso2" TEXT NOT NULL,
    "phoneCode" TEXT NOT NULL,
    "currency" TEXT NOT NULL,
    "currencyName" TEXT NOT NULL,
    "currencySymbol" TEXT NOT NULL,
    "region" TEXT,
    "regionId" TEXT,
    "subRegion" TEXT,
    "subregionId" TEXT,
    "nationality" TEXT,
    "timezones" JSONB,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Country_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AvailablePincodes" (
    "id" TEXT NOT NULL,
    "pincode" TEXT NOT NULL,
    "stateId" TEXT,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AvailablePincodes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Address_email_key" ON "Address"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Coupon_code_key" ON "Coupon"("code");

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "State"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_couponId_fkey" FOREIGN KEY ("couponId") REFERENCES "Coupon"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LineItem" ADD CONSTRAINT "LineItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LineItem" ADD CONSTRAINT "LineItem_productVariantId_fkey" FOREIGN KEY ("productVariantId") REFERENCES "ProductVariant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AvailablePincodes" ADD CONSTRAINT "AvailablePincodes_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "State"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "State" ADD CONSTRAINT "State_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "City" ADD CONSTRAINT "City_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
