-- CreateTable
CREATE TABLE "professionalUserAppointmentPrice" (
    "id" TEXT NOT NULL,
    "coupleSession" BOOLEAN NOT NULL,
    "time" INTEGER NOT NULL,
    "priceInCents" INTEGER NOT NULL,
    "professionalUserId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "professionalUserAppointmentPrice_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "professionalUserAppointmentPrice" ADD CONSTRAINT "professionalUserAppointmentPrice_professionalUserId_fkey" FOREIGN KEY ("professionalUserId") REFERENCES "ProfessionalUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
