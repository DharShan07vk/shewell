-- CreateEnum
CREATE TYPE "ProductVariantInventoryUpdateType" AS ENUM ('ADJUST_AVAILABLE', 'MOVE_TO_UNAVAILABLE', 'ADJUST_ON_HAND');

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "breadth" DECIMAL(9,2),
ADD COLUMN     "discountInCent" INTEGER,
ADD COLUMN     "expectedDelivery" TIMESTAMP(3),
ADD COLUMN     "height" DECIMAL(9,2),
ADD COLUMN     "length" DECIMAL(9,2),
ADD COLUMN     "razorpay_refund_id" TEXT,
ADD COLUMN     "shiprocket_order_id" TEXT,
ADD COLUMN     "shiprocket_shipment_id" TEXT,
ADD COLUMN     "weight" DECIMAL(9,2);

-- AlterTable
ALTER TABLE "ProductVariant" ADD COLUMN     "productVariantInventoyId" TEXT;

-- CreateTable
CREATE TABLE "ProductVariantInventory" (
    "id" TEXT NOT NULL,
    "incoming" INTEGER NOT NULL DEFAULT 0,
    "unavailable" INTEGER NOT NULL DEFAULT 0,
    "available" INTEGER NOT NULL DEFAULT 0,
    "onHand" INTEGER NOT NULL DEFAULT 0,
    "commited" INTEGER NOT NULL DEFAULT 0,
    "productVariantId" TEXT NOT NULL,

    CONSTRAINT "ProductVariantInventory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductVariantInventoryUpdate" (
    "id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "reason" TEXT NOT NULL,
    "updateType" "ProductVariantInventoryUpdateType" NOT NULL,
    "updateById" TEXT NOT NULL,
    "productVariantInventoryId" TEXT NOT NULL,

    CONSTRAINT "ProductVariantInventoryUpdate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProductVariantInventory_productVariantId_key" ON "ProductVariantInventory"("productVariantId");

-- AddForeignKey
ALTER TABLE "ProductVariantInventory" ADD CONSTRAINT "ProductVariantInventory_productVariantId_fkey" FOREIGN KEY ("productVariantId") REFERENCES "ProductVariant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductVariantInventoryUpdate" ADD CONSTRAINT "ProductVariantInventoryUpdate_updateById_fkey" FOREIGN KEY ("updateById") REFERENCES "AdminUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductVariantInventoryUpdate" ADD CONSTRAINT "ProductVariantInventoryUpdate_productVariantInventoryId_fkey" FOREIGN KEY ("productVariantInventoryId") REFERENCES "ProductVariantInventory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
