/*
  Warnings:

  - Added the required column `usedFor` to the `HomeBanner` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "HomeBannerType" AS ENUM ('HomeBannerClient', 'HomeBannerDoctor');

-- AlterTable
ALTER TABLE "HomeBanner" ADD COLUMN     "usedFor" "HomeBannerType" NOT NULL;
