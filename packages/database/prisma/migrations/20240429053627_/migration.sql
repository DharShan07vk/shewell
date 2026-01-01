/*
  Warnings:

  - You are about to drop the column `avgRationg` on the `Products` table. All the data in the column will be lost.
  - Added the required column `avgRating` to the `Products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Products" DROP COLUMN "avgRationg",
ADD COLUMN     "avgRating" DECIMAL(65,30) NOT NULL;
