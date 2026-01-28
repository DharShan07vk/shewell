/*
  Warnings:

  - You are about to drop the column `bannerMediaId` on the `Session` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_bannerMediaId_fkey";

-- AlterTable
ALTER TABLE "Session" DROP COLUMN "bannerMediaId";

-- CreateTable
CREATE TABLE "SessionBanner" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "mediaId" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SessionBanner_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SessionBanner" ADD CONSTRAINT "SessionBanner_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SessionBanner" ADD CONSTRAINT "SessionBanner_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "Media"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
