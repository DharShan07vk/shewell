-- AlterTable
ALTER TABLE "ProductBenefit" ALTER COLUMN "deletedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "ProductStats" ALTER COLUMN "deletedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "ProductVariant" ALTER COLUMN "deletedAt" DROP NOT NULL;
