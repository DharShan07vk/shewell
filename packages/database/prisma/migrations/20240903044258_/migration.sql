-- CreateTable
CREATE TABLE "Comment" (
    "id" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "bookAppointmentId" TEXT NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_bookAppointmentId_fkey" FOREIGN KEY ("bookAppointmentId") REFERENCES "BookAppointment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
