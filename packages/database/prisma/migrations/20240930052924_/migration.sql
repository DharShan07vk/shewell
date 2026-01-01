/*
  Warnings:

  - You are about to drop the column `ageLessthan18` on the `User` table. All the data in the column will be lost.
  - Added the required column `ageGreaterThan18` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "ageLessthan18",
ADD COLUMN     "ageGreaterThan18" BOOLEAN NOT NULL;
