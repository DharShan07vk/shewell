/*
  Warnings:

  - Added the required column `userType` to the `Newsletter` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "userType" AS ENUM ('CLIENT', 'PROFESSIONAL_USER');

-- AlterTable
ALTER TABLE "Newsletter" ADD COLUMN     "userType" "userType" NOT NULL;
