-- AlterTable
ALTER TABLE "ProfessionalUser" ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "deletedAt" DROP NOT NULL;
