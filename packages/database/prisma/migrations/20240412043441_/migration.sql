/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `accountType` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `active` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `emailVerified` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `middleName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `passwordHash` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `refreshToken` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `resetPasswordSentAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `resetPasswordToken` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `token` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `uid` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `User` table. All the data in the column will be lost.
  - The `id` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `Account` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Address` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AdminUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AvailablePincodes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Blog` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BlogCategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Brand` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `City` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Country` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Coupon` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Currency` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Game` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GameVenue` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GymMembership` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `HomeBanner` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `LineItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Log` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Media` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MediaOnProducts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MediaOnVenues` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Order` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Product` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProductBenefit` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProductStats` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProductVariant` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProductVariantPrice` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Review` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ReviewImage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `State` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Testimonials` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Transaction` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Venue` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VenueBlockDate` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VenueBooking` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VenueWorkingTimeSlot` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CategoryToCoupon` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CouponToProduct` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CouponToUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ProductToUser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_userId_fkey";

-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_countryId_fkey";

-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_stateId_fkey";

-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_userId_fkey";

-- DropForeignKey
ALTER TABLE "AvailablePincodes" DROP CONSTRAINT "AvailablePincodes_stateId_fkey";

-- DropForeignKey
ALTER TABLE "Blog" DROP CONSTRAINT "Blog_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "Brand" DROP CONSTRAINT "Brand_mediaId_fkey";

-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_mediaId_fkey";

-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_parentCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "City" DROP CONSTRAINT "City_countryId_fkey";

-- DropForeignKey
ALTER TABLE "City" DROP CONSTRAINT "City_stateId_fkey";

-- DropForeignKey
ALTER TABLE "GameVenue" DROP CONSTRAINT "GameVenue_gameId_fkey";

-- DropForeignKey
ALTER TABLE "GameVenue" DROP CONSTRAINT "GameVenue_venueId_fkey";

-- DropForeignKey
ALTER TABLE "GymMembership" DROP CONSTRAINT "GymMembership_couponId_fkey";

-- DropForeignKey
ALTER TABLE "LineItem" DROP CONSTRAINT "LineItem_orderId_fkey";

-- DropForeignKey
ALTER TABLE "LineItem" DROP CONSTRAINT "LineItem_productVariantId_fkey";

-- DropForeignKey
ALTER TABLE "MediaOnProducts" DROP CONSTRAINT "MediaOnProducts_mediaId_fkey";

-- DropForeignKey
ALTER TABLE "MediaOnProducts" DROP CONSTRAINT "MediaOnProducts_productId_fkey";

-- DropForeignKey
ALTER TABLE "MediaOnVenues" DROP CONSTRAINT "MediaOnVenues_mediaId_fkey";

-- DropForeignKey
ALTER TABLE "MediaOnVenues" DROP CONSTRAINT "MediaOnVenues_venueId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_addressId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_couponId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_userId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_brandId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "ProductBenefit" DROP CONSTRAINT "ProductBenefit_productId_fkey";

-- DropForeignKey
ALTER TABLE "ProductStats" DROP CONSTRAINT "ProductStats_productId_fkey";

-- DropForeignKey
ALTER TABLE "ProductVariant" DROP CONSTRAINT "ProductVariant_productId_fkey";

-- DropForeignKey
ALTER TABLE "ProductVariantPrice" DROP CONSTRAINT "ProductVariantPrice_currencyId_fkey";

-- DropForeignKey
ALTER TABLE "ProductVariantPrice" DROP CONSTRAINT "ProductVariantPrice_productVariantId_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_userId_fkey";

-- DropForeignKey
ALTER TABLE "ReviewImage" DROP CONSTRAINT "ReviewImage_reviewId_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_userId_fkey";

-- DropForeignKey
ALTER TABLE "State" DROP CONSTRAINT "State_countryId_fkey";

-- DropForeignKey
ALTER TABLE "Venue" DROP CONSTRAINT "Venue_countryId_fkey";

-- DropForeignKey
ALTER TABLE "Venue" DROP CONSTRAINT "Venue_stateId_fkey";

-- DropForeignKey
ALTER TABLE "VenueBlockDate" DROP CONSTRAINT "VenueBlockDate_venueId_fkey";

-- DropForeignKey
ALTER TABLE "VenueBooking" DROP CONSTRAINT "VenueBooking_gameId_fkey";

-- DropForeignKey
ALTER TABLE "VenueBooking" DROP CONSTRAINT "VenueBooking_userId_fkey";

-- DropForeignKey
ALTER TABLE "VenueWorkingTimeSlot" DROP CONSTRAINT "VenueWorkingTimeSlot_venueId_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToCoupon" DROP CONSTRAINT "_CategoryToCoupon_A_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToCoupon" DROP CONSTRAINT "_CategoryToCoupon_B_fkey";

-- DropForeignKey
ALTER TABLE "_CouponToProduct" DROP CONSTRAINT "_CouponToProduct_A_fkey";

-- DropForeignKey
ALTER TABLE "_CouponToProduct" DROP CONSTRAINT "_CouponToProduct_B_fkey";

-- DropForeignKey
ALTER TABLE "_CouponToUser" DROP CONSTRAINT "_CouponToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_CouponToUser" DROP CONSTRAINT "_CouponToUser_B_fkey";

-- DropForeignKey
ALTER TABLE "_ProductToUser" DROP CONSTRAINT "_ProductToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProductToUser" DROP CONSTRAINT "_ProductToUser_B_fkey";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "accountType",
DROP COLUMN "active",
DROP COLUMN "createdAt",
DROP COLUMN "emailVerified",
DROP COLUMN "firstName",
DROP COLUMN "lastName",
DROP COLUMN "middleName",
DROP COLUMN "passwordHash",
DROP COLUMN "refreshToken",
DROP COLUMN "resetPasswordSentAt",
DROP COLUMN "resetPasswordToken",
DROP COLUMN "token",
DROP COLUMN "uid",
DROP COLUMN "updatedAt",
ADD COLUMN     "password" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "Account";

-- DropTable
DROP TABLE "Address";

-- DropTable
DROP TABLE "AdminUser";

-- DropTable
DROP TABLE "AvailablePincodes";

-- DropTable
DROP TABLE "Blog";

-- DropTable
DROP TABLE "BlogCategory";

-- DropTable
DROP TABLE "Brand";

-- DropTable
DROP TABLE "Category";

-- DropTable
DROP TABLE "City";

-- DropTable
DROP TABLE "Country";

-- DropTable
DROP TABLE "Coupon";

-- DropTable
DROP TABLE "Currency";

-- DropTable
DROP TABLE "Game";

-- DropTable
DROP TABLE "GameVenue";

-- DropTable
DROP TABLE "GymMembership";

-- DropTable
DROP TABLE "HomeBanner";

-- DropTable
DROP TABLE "LineItem";

-- DropTable
DROP TABLE "Log";

-- DropTable
DROP TABLE "Media";

-- DropTable
DROP TABLE "MediaOnProducts";

-- DropTable
DROP TABLE "MediaOnVenues";

-- DropTable
DROP TABLE "Order";

-- DropTable
DROP TABLE "Product";

-- DropTable
DROP TABLE "ProductBenefit";

-- DropTable
DROP TABLE "ProductStats";

-- DropTable
DROP TABLE "ProductVariant";

-- DropTable
DROP TABLE "ProductVariantPrice";

-- DropTable
DROP TABLE "Review";

-- DropTable
DROP TABLE "ReviewImage";

-- DropTable
DROP TABLE "Session";

-- DropTable
DROP TABLE "State";

-- DropTable
DROP TABLE "Testimonials";

-- DropTable
DROP TABLE "Transaction";

-- DropTable
DROP TABLE "Venue";

-- DropTable
DROP TABLE "VenueBlockDate";

-- DropTable
DROP TABLE "VenueBooking";

-- DropTable
DROP TABLE "VenueWorkingTimeSlot";

-- DropTable
DROP TABLE "_CategoryToCoupon";

-- DropTable
DROP TABLE "_CouponToProduct";

-- DropTable
DROP TABLE "_CouponToUser";

-- DropTable
DROP TABLE "_ProductToUser";

-- DropEnum
DROP TYPE "OrderStatus";

-- DropEnum
DROP TYPE "VenueBookingStatus";

-- DropEnum
DROP TYPE "Weekday";
