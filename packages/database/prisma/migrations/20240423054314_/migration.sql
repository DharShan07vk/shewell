/*
  Warnings:

  - You are about to drop the `professionalUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "professionalUser";

-- CreateTable
CREATE TABLE "ProfessionalUser" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProfessionalUser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProfessionalUser_email_key" ON "ProfessionalUser"("email");
