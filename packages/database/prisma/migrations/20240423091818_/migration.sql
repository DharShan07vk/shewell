-- CreateTable
CREATE TABLE "ProfessionalUploads" (
    "id" SERIAL NOT NULL,
    "imgUrl" TEXT NOT NULL,
    "documentUrl" TEXT NOT NULL,
    "aboutYou" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProfessionalUploads_pkey" PRIMARY KEY ("id")
);
