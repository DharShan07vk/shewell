/*
  Warnings:

  - Added the required column `ageLessThan18` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "ageLessThan18" BOOLEAN NOT NULL;
