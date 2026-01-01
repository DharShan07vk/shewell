-- CreateTable
CREATE TABLE "Media" (
    "id" TEXT NOT NULL,
    "fileKey" TEXT NOT NULL,
    "comments" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Media_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Products" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "avgRationg" DECIMAL(65,30) NOT NULL,
    "totalReviews" INTEGER NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3) NOT NULL,
    "mediaId" TEXT NOT NULL,

    CONSTRAINT "Products_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "Media"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
