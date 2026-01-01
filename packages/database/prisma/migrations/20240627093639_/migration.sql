-- DropForeignKey
ALTER TABLE "ProfessionalUser" DROP CONSTRAINT "ProfessionalUser_displayQualificationId_fkey";

-- AlterTable
ALTER TABLE "ProfessionalUser" ALTER COLUMN "displayQualificationId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "ProfessionalUser" ADD CONSTRAINT "ProfessionalUser_displayQualificationId_fkey" FOREIGN KEY ("displayQualificationId") REFERENCES "ProfessionalSpecializations"("id") ON DELETE SET NULL ON UPDATE CASCADE;
