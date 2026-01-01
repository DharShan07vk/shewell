-- AlterEnum
ALTER TYPE "BookAppointmentStatus" ADD VALUE 'CANCELLED_WITH_REFUND';

-- AlterTable
ALTER TABLE "BookAppointment" ADD COLUMN     "razorpayRefundId" TEXT;
