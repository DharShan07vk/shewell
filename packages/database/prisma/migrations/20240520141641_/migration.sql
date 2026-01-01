-- CreateTable
CREATE TABLE "ProfessionalPersonalInformation" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "alternativeNumber" TEXT NOT NULL,
    "displayedQualification" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "mediaId" TEXT NOT NULL,

    CONSTRAINT "ProfessionalPersonalInformation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProfessionalPersonalInformation" ADD CONSTRAINT "ProfessionalPersonalInformation_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "Media"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
