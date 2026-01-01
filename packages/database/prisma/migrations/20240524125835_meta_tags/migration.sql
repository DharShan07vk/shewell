-- AlterTable
ALTER TABLE "BlogCategory" ADD COLUMN     "metaDescription" TEXT,
ADD COLUMN     "metaKeywords" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "metaTitle" TEXT;
