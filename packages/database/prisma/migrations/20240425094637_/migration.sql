/*
  Warnings:

  - You are about to drop the `ProfessionalAccount` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProfessionalAccount" DROP CONSTRAINT "ProfessionalAccount_professionalUserId_fkey";

-- DropTable
DROP TABLE "ProfessionalAccount";

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "professionalUserId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_professionalUserId_fkey" FOREIGN KEY ("professionalUserId") REFERENCES "ProfessionalUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
