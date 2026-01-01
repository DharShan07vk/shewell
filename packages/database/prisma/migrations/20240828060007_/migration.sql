-- CreateTable
CREATE TABLE "AdditionalPatient" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "coupleMessage" TEXT NOT NULL,
    "patientId" TEXT,

    CONSTRAINT "AdditionalPatient_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AdditionalPatient" ADD CONSTRAINT "AdditionalPatient_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE SET NULL ON UPDATE CASCADE;
