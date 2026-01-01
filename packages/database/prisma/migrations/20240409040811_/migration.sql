-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('CART', 'PAYMENT_SUCCESSFUL', 'PAYMENT_PENDING', 'PAYMMENT_FAILED', 'OUT_FOR_DELIVERY', 'CANCELLED', 'RETURNED');

-- CreateEnum
CREATE TYPE "Weekday" AS ENUM ('SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT');

-- CreateEnum
CREATE TYPE "VenueBookingStatus" AS ENUM ('PAYMENT_PENDING', 'PENDING', 'CONFIRMED', 'COMPLETED');

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "mediaId" TEXT,
    "parentCategoryId" TEXT,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Currency" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Currency_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdminUser" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AdminUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "middleName" TEXT,
    "lastName" TEXT,
    "email" TEXT NOT NULL,
    "emailVerified" TIMESTAMP(3),
    "passwordHash" TEXT,
    "accountType" TEXT NOT NULL DEFAULT 'normal',
    "uid" TEXT,
    "token" TEXT,
    "refreshToken" TEXT,
    "resetPasswordToken" TEXT,
    "resetPasswordSentAt" TIMESTAMP(3),
    "active" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "token_type" TEXT,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "id_token" TEXT,
    "scope" TEXT,
    "session_state" TEXT,
    "expires_at" INTEGER,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HomeBanner" (
    "id" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "imageAltText" TEXT,
    "imageKey" TEXT,
    "comment" TEXT,
    "url" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HomeBanner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "avgRating" DECIMAL(65,30) NOT NULL,
    "veg" BOOLEAN,
    "totalReviews" INTEGER NOT NULL,
    "seoTitle" TEXT,
    "seoDescription" TEXT,
    "seoKeywords" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "active" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "bestseller" BOOLEAN NOT NULL DEFAULT false,
    "brandId" TEXT,
    "categoryId" TEXT NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductBenefit" (
    "id" TEXT NOT NULL,
    "benefit" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "ProductBenefit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductStats" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "stat" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "ProductStats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MediaOnProducts" (
    "order" INTEGER NOT NULL,
    "imageAltText" TEXT,
    "comment" TEXT,
    "productId" TEXT NOT NULL,
    "mediaId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MediaOnProducts_pkey" PRIMARY KEY ("mediaId","productId")
);

-- CreateTable
CREATE TABLE "ProductVariant" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "stock" INTEGER NOT NULL DEFAULT 0,
    "productId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "ProductVariant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductVariantPrice" (
    "id" TEXT NOT NULL,
    "priceInCents" INTEGER NOT NULL,
    "discountInCents" INTEGER,
    "discountInPercentage" INTEGER,
    "discountEndDate" TIMESTAMP(3),
    "productVariantId" TEXT NOT NULL,
    "currencyId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "ProductVariantPrice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "review" TEXT NOT NULL,
    "approved" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReviewImage" (
    "id" TEXT NOT NULL,
    "imageKey" TEXT,
    "comment" TEXT,
    "reviewId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ReviewImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Log" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "recordId" TEXT NOT NULL,
    "recordTitle" VARCHAR(128),
    "difference" JSON,
    "action" VARCHAR(128) NOT NULL,
    "resource" VARCHAR(128) NOT NULL,
    "adminUserId" VARCHAR(128) NOT NULL,

    CONSTRAINT "Log_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Media" (
    "id" TEXT NOT NULL,
    "fileKey" TEXT NOT NULL,
    "comments" TEXT,
    "mimeType" TEXT,
    "fileUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Media_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Brand" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "seoTitle" TEXT,
    "seoDescription" TEXT,
    "seoKeywords" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "mediaId" TEXT,

    CONSTRAINT "Brand_pkey" PRIMARY KEY ("id")
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
    "numberOfTime" INTEGER NOT NULL,
    "active" BOOLEAN NOT NULL,

    CONSTRAINT "Coupon_pkey" PRIMARY KEY ("id")
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
CREATE TABLE "AvailablePincodes" (
    "id" TEXT NOT NULL,
    "pincode" TEXT NOT NULL,
    "stateId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AvailablePincodes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GymMembership" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "amountInCents" INTEGER NOT NULL,
    "monthsInPlan" INTEGER NOT NULL,
    "discount" INTEGER NOT NULL,
    "active" BOOLEAN NOT NULL,
    "features" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "couponId" TEXT,

    CONSTRAINT "GymMembership_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Testimonials" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "fileKey" TEXT NOT NULL,
    "mimeType" TEXT,
    "fileUrl" TEXT,
    "active" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Testimonials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BlogCategory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BlogCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Blog" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "fileKey" TEXT NOT NULL,
    "mimeType" TEXT,
    "fileUrl" TEXT,
    "body" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Blog_pkey" PRIMARY KEY ("id")
);

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
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Country_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "State" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "stateCode" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "countryId" TEXT NOT NULL,

    CONSTRAINT "State_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "City" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "stateId" TEXT NOT NULL,
    "countryId" TEXT NOT NULL,
    "latitude" DECIMAL(65,30) NOT NULL,
    "longitude" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "City_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VenueWorkingTimeSlot" (
    "id" TEXT NOT NULL,
    "venueId" TEXT NOT NULL,
    "weekDay" "Weekday" NOT NULL,
    "from" TEXT NOT NULL,
    "till" TEXT NOT NULL,
    "slotDurationInMinutes" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VenueWorkingTimeSlot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VenueBooking" (
    "id" TEXT NOT NULL,
    "gameId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "startOn" DATE NOT NULL,
    "endOn" DATE NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "status" "VenueBookingStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VenueBooking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Game" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GameVenue" (
    "noOfCourts" INTEGER NOT NULL,
    "gameId" TEXT NOT NULL,
    "venueId" TEXT NOT NULL,

    CONSTRAINT "GameVenue_pkey" PRIMARY KEY ("gameId","venueId")
);

-- CreateTable
CREATE TABLE "Venue" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "streetAddress" TEXT,
    "latitude" TEXT,
    "longitude" TEXT,
    "stateId" TEXT NOT NULL,
    "countryId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Venue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VenueBlockDate" (
    "id" TEXT NOT NULL,
    "blockedAt" DATE NOT NULL,
    "venueId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VenueBlockDate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MediaOnVenues" (
    "order" INTEGER NOT NULL,
    "imageAltText" TEXT,
    "comment" TEXT,
    "venueId" TEXT NOT NULL,
    "mediaId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MediaOnVenues_pkey" PRIMARY KEY ("mediaId","venueId")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CategoryToCoupon" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ProductToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_CouponToProduct" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_CouponToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "AdminUser_email_key" ON "AdminUser"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "Product_slug_key" ON "Product"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "ProductVariantPrice_productVariantId_key" ON "ProductVariantPrice"("productVariantId");

-- CreateIndex
CREATE UNIQUE INDEX "Coupon_code_key" ON "Coupon"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Address_email_key" ON "Address"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToCoupon_AB_unique" ON "_CategoryToCoupon"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToCoupon_B_index" ON "_CategoryToCoupon"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ProductToUser_AB_unique" ON "_ProductToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductToUser_B_index" ON "_ProductToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CouponToProduct_AB_unique" ON "_CouponToProduct"("A", "B");

-- CreateIndex
CREATE INDEX "_CouponToProduct_B_index" ON "_CouponToProduct"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CouponToUser_AB_unique" ON "_CouponToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_CouponToUser_B_index" ON "_CouponToUser"("B");

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "Media"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_parentCategoryId_fkey" FOREIGN KEY ("parentCategoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductBenefit" ADD CONSTRAINT "ProductBenefit_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductStats" ADD CONSTRAINT "ProductStats_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MediaOnProducts" ADD CONSTRAINT "MediaOnProducts_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MediaOnProducts" ADD CONSTRAINT "MediaOnProducts_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "Media"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductVariant" ADD CONSTRAINT "ProductVariant_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductVariantPrice" ADD CONSTRAINT "ProductVariantPrice_productVariantId_fkey" FOREIGN KEY ("productVariantId") REFERENCES "ProductVariant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductVariantPrice" ADD CONSTRAINT "ProductVariantPrice_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "Currency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReviewImage" ADD CONSTRAINT "ReviewImage_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "Review"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Brand" ADD CONSTRAINT "Brand_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "Media"("id") ON DELETE SET NULL ON UPDATE CASCADE;

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
ALTER TABLE "GymMembership" ADD CONSTRAINT "GymMembership_couponId_fkey" FOREIGN KEY ("couponId") REFERENCES "Coupon"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Blog" ADD CONSTRAINT "Blog_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "BlogCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "State"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "State" ADD CONSTRAINT "State_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "City" ADD CONSTRAINT "City_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "State"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "City" ADD CONSTRAINT "City_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VenueWorkingTimeSlot" ADD CONSTRAINT "VenueWorkingTimeSlot_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES "Venue"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VenueBooking" ADD CONSTRAINT "VenueBooking_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VenueBooking" ADD CONSTRAINT "VenueBooking_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameVenue" ADD CONSTRAINT "GameVenue_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameVenue" ADD CONSTRAINT "GameVenue_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES "Venue"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Venue" ADD CONSTRAINT "Venue_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "State"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Venue" ADD CONSTRAINT "Venue_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VenueBlockDate" ADD CONSTRAINT "VenueBlockDate_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES "Venue"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MediaOnVenues" ADD CONSTRAINT "MediaOnVenues_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES "Venue"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MediaOnVenues" ADD CONSTRAINT "MediaOnVenues_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "Media"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToCoupon" ADD CONSTRAINT "_CategoryToCoupon_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToCoupon" ADD CONSTRAINT "_CategoryToCoupon_B_fkey" FOREIGN KEY ("B") REFERENCES "Coupon"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToUser" ADD CONSTRAINT "_ProductToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToUser" ADD CONSTRAINT "_ProductToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CouponToProduct" ADD CONSTRAINT "_CouponToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "Coupon"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CouponToProduct" ADD CONSTRAINT "_CouponToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CouponToUser" ADD CONSTRAINT "_CouponToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Coupon"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CouponToUser" ADD CONSTRAINT "_CouponToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
