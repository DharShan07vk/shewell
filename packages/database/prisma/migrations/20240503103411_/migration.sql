-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "seoKeywords" TEXT[] DEFAULT ARRAY[]::TEXT[];
