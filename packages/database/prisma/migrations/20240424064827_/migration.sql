/*
  Warnings:

  - The primary key for the `ProfessionalModes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `ProfessionalQualifications` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `city` on the `ProfessionalQualifications` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `ProfessionalQualifications` table. All the data in the column will be lost.
  - The primary key for the `ProfessionalUploads` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `ProfessionalUser` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `cityId` to the `ProfessionalQualifications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `professionalUserId` to the `ProfessionalQualifications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stateId` to the `ProfessionalQualifications` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProfessionalModes" DROP CONSTRAINT "ProfessionalModes_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "ProfessionalModes_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "ProfessionalModes_id_seq";

-- AlterTable
ALTER TABLE "ProfessionalQualifications" DROP CONSTRAINT "ProfessionalQualifications_pkey",
DROP COLUMN "city",
DROP COLUMN "state",
ADD COLUMN     "cityId" TEXT NOT NULL,
ADD COLUMN     "professionalUserId" TEXT NOT NULL,
ADD COLUMN     "stateId" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "ProfessionalQualifications_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "ProfessionalQualifications_id_seq";

-- AlterTable
ALTER TABLE "ProfessionalUploads" DROP CONSTRAINT "ProfessionalUploads_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "ProfessionalUploads_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "ProfessionalUploads_id_seq";

-- AlterTable
ALTER TABLE "ProfessionalUser" DROP CONSTRAINT "ProfessionalUser_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "ProfessionalUser_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "ProfessionalUser_id_seq";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- CreateTable
CREATE TABLE "State" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "State_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "City" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "stateId" TEXT NOT NULL,

    CONSTRAINT "City_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProfessionalQualifications" ADD CONSTRAINT "ProfessionalQualifications_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "State"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfessionalQualifications" ADD CONSTRAINT "ProfessionalQualifications_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfessionalQualifications" ADD CONSTRAINT "ProfessionalQualifications_professionalUserId_fkey" FOREIGN KEY ("professionalUserId") REFERENCES "ProfessionalUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "City" ADD CONSTRAINT "City_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "State"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
