/*
  Warnings:

  - You are about to drop the column `name` on the `Patient` table. All the data in the column will be lost.
  - Added the required column `firstName` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Patient` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Patient" DROP COLUMN "name",
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Patient" ADD CONSTRAINT "Patient_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
