/*
  Warnings:

  - You are about to drop the column `documentUrl` on the `ProfessionalUploads` table. All the data in the column will be lost.
  - You are about to drop the column `mediaId` on the `ProfessionalUploads` table. All the data in the column will be lost.
  - Added the required column `documentId` to the `ProfessionalUploads` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageId` to the `ProfessionalUploads` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ProfessionalUploads" DROP CONSTRAINT "ProfessionalUploads_mediaId_fkey";

-- AlterTable
ALTER TABLE "ProfessionalUploads" DROP COLUMN "documentUrl",
DROP COLUMN "mediaId",
ADD COLUMN     "documentId" TEXT NOT NULL,
ADD COLUMN     "imageId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "ProfessionalUploads" ADD CONSTRAINT "ProfessionalUploads_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Media"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfessionalUploads" ADD CONSTRAINT "ProfessionalUploads_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Media"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
