-- AlterTable
ALTER TABLE "AdditionalPatient" ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Patient" ADD COLUMN     "deletedAt" TIMESTAMP(3);
