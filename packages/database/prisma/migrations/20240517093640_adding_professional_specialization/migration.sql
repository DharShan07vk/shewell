-- CreateTable
CREATE TABLE "ProfessionalSpecializations" (
    "id" TEXT NOT NULL,
    "specialization" TEXT NOT NULL,

    CONSTRAINT "ProfessionalSpecializations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ProfessionalSpecializationsToProfessionalUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ProfessionalSpecializationsToProfessionalUser_AB_unique" ON "_ProfessionalSpecializationsToProfessionalUser"("A", "B");

-- CreateIndex
CREATE INDEX "_ProfessionalSpecializationsToProfessionalUser_B_index" ON "_ProfessionalSpecializationsToProfessionalUser"("B");

-- AddForeignKey
ALTER TABLE "_ProfessionalSpecializationsToProfessionalUser" ADD CONSTRAINT "_ProfessionalSpecializationsToProfessionalUser_A_fkey" FOREIGN KEY ("A") REFERENCES "ProfessionalSpecializations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProfessionalSpecializationsToProfessionalUser" ADD CONSTRAINT "_ProfessionalSpecializationsToProfessionalUser_B_fkey" FOREIGN KEY ("B") REFERENCES "ProfessionalUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;
