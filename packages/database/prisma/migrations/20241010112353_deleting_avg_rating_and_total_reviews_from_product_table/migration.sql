/*
  Warnings:

  - You are about to drop the column `avgRating` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `totalReviews` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "avgRating",
DROP COLUMN "totalReviews";
