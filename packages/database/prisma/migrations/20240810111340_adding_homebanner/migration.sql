-- CreateTable
CREATE TABLE "HomeBanner" (
    "id" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "url" TEXT,
    "mediaId" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "HomeBanner_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "HomeBanner" ADD CONSTRAINT "HomeBanner_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "Media"("id") ON DELETE SET NULL ON UPDATE CASCADE;
