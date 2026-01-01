-- CreateTable
CREATE TABLE "ProfessionalQualifications" (
    "id" SERIAL NOT NULL,
    "degree" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "expInYears" TEXT NOT NULL,
    "expInMonths" TEXT NOT NULL,
    "qualification" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProfessionalQualifications_pkey" PRIMARY KEY ("id")
);
