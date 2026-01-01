-- CreateTable
CREATE TABLE "ProfessionalDegree" (
    "id" TEXT NOT NULL,
    "degree" TEXT NOT NULL,

    CONSTRAINT "ProfessionalDegree_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProfessionalExperience" (
    "id" TEXT NOT NULL,
    "experience" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "hospital" TEXT NOT NULL,

    CONSTRAINT "ProfessionalExperience_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ProfessionalDegreeToProfessionalUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ProfessionalExperienceToProfessionalUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ProfessionalDegreeToProfessionalUser_AB_unique" ON "_ProfessionalDegreeToProfessionalUser"("A", "B");

-- CreateIndex
CREATE INDEX "_ProfessionalDegreeToProfessionalUser_B_index" ON "_ProfessionalDegreeToProfessionalUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ProfessionalExperienceToProfessionalUser_AB_unique" ON "_ProfessionalExperienceToProfessionalUser"("A", "B");

-- CreateIndex
CREATE INDEX "_ProfessionalExperienceToProfessionalUser_B_index" ON "_ProfessionalExperienceToProfessionalUser"("B");

-- AddForeignKey
ALTER TABLE "_ProfessionalDegreeToProfessionalUser" ADD CONSTRAINT "_ProfessionalDegreeToProfessionalUser_A_fkey" FOREIGN KEY ("A") REFERENCES "ProfessionalDegree"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProfessionalDegreeToProfessionalUser" ADD CONSTRAINT "_ProfessionalDegreeToProfessionalUser_B_fkey" FOREIGN KEY ("B") REFERENCES "ProfessionalUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProfessionalExperienceToProfessionalUser" ADD CONSTRAINT "_ProfessionalExperienceToProfessionalUser_A_fkey" FOREIGN KEY ("A") REFERENCES "ProfessionalExperience"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProfessionalExperienceToProfessionalUser" ADD CONSTRAINT "_ProfessionalExperienceToProfessionalUser_B_fkey" FOREIGN KEY ("B") REFERENCES "ProfessionalUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;
