-- AlterTable
ALTER TABLE "Blog" ADD COLUMN     "popularBlog" BOOLEAN DEFAULT false,
ADD COLUMN     "seoDescription" TEXT,
ADD COLUMN     "seoKeywords" TEXT[],
ADD COLUMN     "seoTitle" TEXT;
