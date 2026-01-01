-- CreateTable
CREATE TABLE "ProfessionalModes" (
    "id" SERIAL NOT NULL,
    "sessionMode" TEXT NOT NULL,
    "sessionType" TEXT NOT NULL,
    "meetingType" TEXT NOT NULL,
    "listing" TEXT NOT NULL,
    "issue" TEXT NOT NULL,

    CONSTRAINT "ProfessionalModes_pkey" PRIMARY KEY ("id")
);
