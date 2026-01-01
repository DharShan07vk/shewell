/*
  Warnings:

  - You are about to drop the column `imgUrl` on the `ProfessionalUploads` table. All the data in the column will be lost.
  - You are about to drop the `ProfessionalPersonalInformation` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `mediaId` to the `ProfessionalUploads` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ProfessionalPersonalInformation" DROP CONSTRAINT "ProfessionalPersonalInformation_mediaId_fkey";

-- AlterTable
ALTER TABLE "ProfessionalUploads" DROP COLUMN "imgUrl",
ADD COLUMN     "mediaId" TEXT NOT NULL;

-- DropTable
DROP TABLE "ProfessionalPersonalInformation";

-- AddForeignKey
ALTER TABLE "ProfessionalUploads" ADD CONSTRAINT "ProfessionalUploads_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "Media"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
