/*
  Warnings:

  - A unique constraint covering the columns `[userName]` on the table `ProfessionalUser` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userName` to the `ProfessionalUser` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProfessionalUser" ADD COLUMN     "userName" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ProfessionalUser_userName_key" ON "ProfessionalUser"("userName");
