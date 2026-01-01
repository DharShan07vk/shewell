-- CreateTable
CREATE TABLE "Document" (
    "id" TEXT NOT NULL,
    "fileKey" TEXT NOT NULL,
    "comments" TEXT NOT NULL,
    "fileUrl" TEXT,
    "mimeType" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "professionalUserId" TEXT NOT NULL,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_professionalUserId_fkey" FOREIGN KEY ("professionalUserId") REFERENCES "ProfessionalUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
