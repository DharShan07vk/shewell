/*
  Warnings:

  - You are about to drop the column `issue` on the `ProfessionalModes` table. All the data in the column will be lost.
  - You are about to drop the column `listing` on the `ProfessionalModes` table. All the data in the column will be lost.
  - You are about to drop the column `meetingType` on the `ProfessionalModes` table. All the data in the column will be lost.
  - You are about to drop the column `sessionMode` on the `ProfessionalModes` table. All the data in the column will be lost.
  - You are about to drop the column `sessionType` on the `ProfessionalModes` table. All the data in the column will be lost.
  - You are about to drop the column `gender` on the `ProfessionalQualifications` table. All the data in the column will be lost.
  - You are about to drop the `ProfessionalUploads` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `aboutYou` to the `ProfessionalUser` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `ProfessionalUser` table without a default value. This is not possible if the table is not empty.
  - Added the required column `issue` to the `ProfessionalUser` table without a default value. This is not possible if the table is not empty.
  - Added the required column `listing` to the `ProfessionalUser` table without a default value. This is not possible if the table is not empty.
  - Added the required column `meetingType` to the `ProfessionalUser` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sessionMode` to the `ProfessionalUser` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sessionType` to the `ProfessionalUser` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProfessionalModes" DROP COLUMN "issue",
DROP COLUMN "listing",
DROP COLUMN "meetingType",
DROP COLUMN "sessionMode",
DROP COLUMN "sessionType";

-- AlterTable
ALTER TABLE "ProfessionalQualifications" DROP COLUMN "gender";

-- AlterTable
ALTER TABLE "ProfessionalUser" ADD COLUMN     "aboutYou" TEXT NOT NULL,
ADD COLUMN     "gender" TEXT NOT NULL,
ADD COLUMN     "issue" TEXT NOT NULL,
ADD COLUMN     "listing" TEXT NOT NULL,
ADD COLUMN     "meetingType" TEXT NOT NULL,
ADD COLUMN     "sessionMode" TEXT NOT NULL,
ADD COLUMN     "sessionType" TEXT NOT NULL;

-- DropTable
DROP TABLE "ProfessionalUploads";
