/*
  Warnings:

  - Added the required column `orderPlaced` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "orderPlaced" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "razorpay_order_id" TEXT,
ADD COLUMN     "razorpay_payment_id" TEXT,
ADD COLUMN     "razorpay_signature" TEXT;
