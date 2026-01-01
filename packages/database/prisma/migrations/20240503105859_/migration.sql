-- CreateTable
CREATE TABLE "MediaonProducts" (
    "order" INTEGER NOT NULL,
    "imageAltText" TEXT,
    "comment" TEXT,
    "productId" TEXT NOT NULL,
    "mediaId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MediaonProducts_pkey" PRIMARY KEY ("mediaId","productId")
);

-- AddForeignKey
ALTER TABLE "MediaonProducts" ADD CONSTRAINT "MediaonProducts_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MediaonProducts" ADD CONSTRAINT "MediaonProducts_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "Media"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
