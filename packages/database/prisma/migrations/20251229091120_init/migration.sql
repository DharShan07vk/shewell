/*
  Warnings:

  - The primary key for the `_CategoryToCoupon` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `_CouponToProduct` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `_CouponToUser` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `_ProductToUser` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `_ProfessionalSpecializationsToProfessionalUser` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `_ProfessionalUser Languages` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[A,B]` on the table `_CategoryToCoupon` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[A,B]` on the table `_CouponToProduct` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[A,B]` on the table `_CouponToUser` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[A,B]` on the table `_ProductToUser` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[A,B]` on the table `_ProfessionalSpecializationsToProfessionalUser` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[A,B]` on the table `_ProfessionalUser Languages` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "_CategoryToCoupon" DROP CONSTRAINT "_CategoryToCoupon_AB_pkey";

-- AlterTable
ALTER TABLE "_CouponToProduct" DROP CONSTRAINT "_CouponToProduct_AB_pkey";

-- AlterTable
ALTER TABLE "_CouponToUser" DROP CONSTRAINT "_CouponToUser_AB_pkey";

-- AlterTable
ALTER TABLE "_ProductToUser" DROP CONSTRAINT "_ProductToUser_AB_pkey";

-- AlterTable
ALTER TABLE "_ProfessionalSpecializationsToProfessionalUser" DROP CONSTRAINT "_ProfessionalSpecializationsToProfessionalUser_AB_pkey";

-- AlterTable
ALTER TABLE "_ProfessionalUser Languages" DROP CONSTRAINT "_ProfessionalUser Languages_AB_pkey";

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToCoupon_AB_unique" ON "_CategoryToCoupon"("A", "B");

-- CreateIndex
CREATE UNIQUE INDEX "_CouponToProduct_AB_unique" ON "_CouponToProduct"("A", "B");

-- CreateIndex
CREATE UNIQUE INDEX "_CouponToUser_AB_unique" ON "_CouponToUser"("A", "B");

-- CreateIndex
CREATE UNIQUE INDEX "_ProductToUser_AB_unique" ON "_ProductToUser"("A", "B");

-- CreateIndex
CREATE UNIQUE INDEX "_ProfessionalSpecializationsToProfessionalUser_AB_unique" ON "_ProfessionalSpecializationsToProfessionalUser"("A", "B");

-- CreateIndex
CREATE UNIQUE INDEX "_ProfessionalUser Languages_AB_unique" ON "_ProfessionalUser Languages"("A", "B");
