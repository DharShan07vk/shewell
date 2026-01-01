/*
  Warnings:

  - You are about to drop the column `rating` on the `ProfessionalUser` table. All the data in the column will be lost.
  - You are about to drop the column `review` on the `ProfessionalUser` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ProfessionalUser" DROP COLUMN "rating",
DROP COLUMN "review";

-- CreateTable
CREATE TABLE "ProfessionalUserRating" (
    "id" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "review" TEXT NOT NULL,
    "professionalUserId" TEXT NOT NULL,

    CONSTRAINT "ProfessionalUserRating_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProfessionalUserRating" ADD CONSTRAINT "ProfessionalUserRating_professionalUserId_fkey" FOREIGN KEY ("professionalUserId") REFERENCES "ProfessionalUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
