/*
  Warnings:

  - You are about to drop the column `ageLessThan18` on the `User` table. All the data in the column will be lost.
  - Added the required column `ageLessthan18` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "ageLessThan18",
ADD COLUMN     "ageLessthan18" BOOLEAN NOT NULL;
