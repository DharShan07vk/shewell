-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_mediaId_fkey";

-- AlterTable
ALTER TABLE "Category" ALTER COLUMN "mediaId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "Media"("id") ON DELETE SET NULL ON UPDATE CASCADE;
