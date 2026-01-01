/*
  Warnings:

  - A unique constraint covering the columns `[email,userType]` on the table `Newsletter` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Newsletter_email_key";

-- CreateIndex
CREATE UNIQUE INDEX "Newsletter_email_userType_key" ON "Newsletter"("email", "userType");
