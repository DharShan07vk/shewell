-- AlterTable
ALTER TABLE "User" ADD COLUMN     "otpCreatedAt" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
