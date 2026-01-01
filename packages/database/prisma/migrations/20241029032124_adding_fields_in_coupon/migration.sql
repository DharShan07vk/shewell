/*
  Warnings:

  - Added the required column `numberOfTime` to the `Coupon` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Coupon" ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "numberOfTime" INTEGER NOT NULL;

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

-- CreateTable
CREATE TABLE "_CategoryToCoupon" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CouponToProduct_AB_unique" ON "_CouponToProduct"("A", "B");

-- CreateIndex
CREATE INDEX "_CouponToProduct_B_index" ON "_CouponToProduct"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CouponToUser_AB_unique" ON "_CouponToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_CouponToUser_B_index" ON "_CouponToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToCoupon_AB_unique" ON "_CategoryToCoupon"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToCoupon_B_index" ON "_CategoryToCoupon"("B");

-- AddForeignKey
ALTER TABLE "_CouponToProduct" ADD CONSTRAINT "_CouponToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "Coupon"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CouponToProduct" ADD CONSTRAINT "_CouponToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CouponToUser" ADD CONSTRAINT "_CouponToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Coupon"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CouponToUser" ADD CONSTRAINT "_CouponToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToCoupon" ADD CONSTRAINT "_CategoryToCoupon_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToCoupon" ADD CONSTRAINT "_CategoryToCoupon_B_fkey" FOREIGN KEY ("B") REFERENCES "Coupon"("id") ON DELETE CASCADE ON UPDATE CASCADE;
