-- CreateEnum
CREATE TYPE "DocumentType" AS ENUM ('AADHAR_CARD', 'PAN_CARD', 'OTHER_DOCUMENTS');

-- AlterTable
ALTER TABLE "Document" ADD COLUMN     "type" "DocumentType";
