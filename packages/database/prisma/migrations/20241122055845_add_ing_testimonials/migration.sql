-- CreateTable
CREATE TABLE "Testimonials" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "mediaId" TEXT,
    "active" BOOLEAN NOT NULL,
    "avgRating" DECIMAL(65,30),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Testimonials_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Testimonials" ADD CONSTRAINT "Testimonials_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "Media"("id") ON DELETE SET NULL ON UPDATE CASCADE;
