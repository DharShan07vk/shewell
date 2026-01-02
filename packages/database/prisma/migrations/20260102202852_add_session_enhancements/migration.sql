-- CreateEnum
CREATE TYPE "SessionType" AS ENUM ('ONLINE', 'RECORDING');

-- AlterTable
ALTER TABLE "Session" ADD COLUMN     "bannerMediaId" TEXT,
ADD COLUMN     "language" TEXT NOT NULL DEFAULT 'English',
ADD COLUMN     "meetingLink" TEXT,
ADD COLUMN     "overview" TEXT,
ADD COLUMN     "thumbnailMediaId" TEXT,
ADD COLUMN     "type" "SessionType" NOT NULL DEFAULT 'ONLINE';

-- AlterTable
ALTER TABLE "SessionRegistration" ADD COLUMN     "amountPaid" DECIMAL(10,2),
ADD COLUMN     "razorpayOrderId" TEXT,
ADD COLUMN     "razorpayPaymentId" TEXT,
ADD COLUMN     "razorpaySignature" TEXT;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_thumbnailMediaId_fkey" FOREIGN KEY ("thumbnailMediaId") REFERENCES "Media"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_bannerMediaId_fkey" FOREIGN KEY ("bannerMediaId") REFERENCES "Media"("id") ON DELETE SET NULL ON UPDATE CASCADE;
