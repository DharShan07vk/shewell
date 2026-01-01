-- CreateTable
CREATE TABLE "ProfessionalAccount" (
    "id" TEXT NOT NULL,
    "session" TEXT NOT NULL,
    "expiresAt" TEXT NOT NULL,
    "professionalUserId" TEXT NOT NULL,

    CONSTRAINT "ProfessionalAccount_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProfessionalAccount" ADD CONSTRAINT "ProfessionalAccount_professionalUserId_fkey" FOREIGN KEY ("professionalUserId") REFERENCES "ProfessionalUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
