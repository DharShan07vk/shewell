ALTER TABLE "MediaonProducts" DROP CONSTRAINT "MediaonProducts_mediaId_fkey";

-- DropForeignKey
ALTER TABLE "MediaonProducts" DROP CONSTRAINT "MediaonProducts_productId_fkey";

-- DropTable
DROP TABLE "MediaonProducts";

-- CreateTable
CREATE TABLE "MediaOnProducts" (
    "order" INTEGER NOT NULL,
    "imageAltText" TEXT,
    "comment" TEXT,
    "productId" TEXT NOT NULL,
    "mediaId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MediaOnProducts_pkey" PRIMARY KEY ("mediaId","productId")
);

-- AddForeignKey
ALTER TABLE "MediaOnProducts" ADD CONSTRAINT "MediaOnProducts_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MediaOnProducts" ADD CONSTRAINT "MediaOnProducts_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "Media"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
