/*
  Warnings:

  - You are about to drop the column `expires` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `professionalUserId` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `sessionToken` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Session` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `Session` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `categoryId` to the `Session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endAt` to the `Session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startAt` to the `Session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Session` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Trimester" AS ENUM ('FIRST', 'SECOND', 'THIRD');

-- CreateEnum
CREATE TYPE "SessionStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'COMPLETED', 'FAILED', 'REFUNDED');

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_professionalUserId_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_userId_fkey";

-- DropIndex
DROP INDEX "Session_sessionToken_key";

-- AlterTable
ALTER TABLE "Session" DROP COLUMN "expires",
DROP COLUMN "professionalUserId",
DROP COLUMN "sessionToken",
DROP COLUMN "userId",
ADD COLUMN     "categoryId" TEXT NOT NULL,
ADD COLUMN     "endAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "price" DECIMAL(10,2) NOT NULL,
ADD COLUMN     "slug" TEXT NOT NULL,
ADD COLUMN     "startAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "status" "SessionStatus" NOT NULL DEFAULT 'DRAFT',
ADD COLUMN     "title" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "AuthSession" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "professionalUserId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "AuthSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SessionCategory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "trimester" "Trimester" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SessionCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SessionRegistration" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "paymentStatus" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SessionRegistration_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AuthSession_sessionToken_key" ON "AuthSession"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "SessionCategory_slug_key" ON "SessionCategory"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "SessionRegistration_sessionId_userId_key" ON "SessionRegistration"("sessionId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_slug_key" ON "Session"("slug");

-- AddForeignKey
ALTER TABLE "AuthSession" ADD CONSTRAINT "AuthSession_professionalUserId_fkey" FOREIGN KEY ("professionalUserId") REFERENCES "ProfessionalUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuthSession" ADD CONSTRAINT "AuthSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "SessionCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SessionRegistration" ADD CONSTRAINT "SessionRegistration_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SessionRegistration" ADD CONSTRAINT "SessionRegistration_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
