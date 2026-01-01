-- CreateTable
CREATE TABLE "ServiceMode" (
    "id" TEXT NOT NULL,
    "serviceType" "AppointmentType" NOT NULL,

    CONSTRAINT "ServiceMode_pkey" PRIMARY KEY ("id")
);
