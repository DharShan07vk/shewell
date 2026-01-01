-- AlterTable
ALTER TABLE "ProfessionalSpecializations" ADD COLUMN     "professionalSpecializationParentCategoryId" TEXT;

-- CreateTable
CREATE TABLE "ProfessionalSpecializationParentCategory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,
    "deletedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProfessionalSpecializationParentCategory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProfessionalSpecializations" ADD CONSTRAINT "ProfessionalSpecializations_professionalSpecializationPare_fkey" FOREIGN KEY ("professionalSpecializationParentCategoryId") REFERENCES "ProfessionalSpecializationParentCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;
