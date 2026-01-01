/*
  Warnings:

  - Added the required column `mediaId` to the `ProfessionalSpecializationParentCategory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProfessionalSpecializationParentCategory" ADD COLUMN     "mediaId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "_CategoryToCoupon" ADD CONSTRAINT "_CategoryToCoupon_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_CategoryToCoupon_AB_unique";

-- AlterTable
ALTER TABLE "_CouponToProduct" ADD CONSTRAINT "_CouponToProduct_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_CouponToProduct_AB_unique";

-- AlterTable
ALTER TABLE "_CouponToUser" ADD CONSTRAINT "_CouponToUser_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_CouponToUser_AB_unique";

-- AlterTable
ALTER TABLE "_ProductToUser" ADD CONSTRAINT "_ProductToUser_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_ProductToUser_AB_unique";

-- AlterTable
ALTER TABLE "_ProfessionalSpecializationsToProfessionalUser" ADD CONSTRAINT "_ProfessionalSpecializationsToProfessionalUser_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_ProfessionalSpecializationsToProfessionalUser_AB_unique";

-- AlterTable
ALTER TABLE "_ProfessionalUser Languages" ADD CONSTRAINT "_ProfessionalUser Languages_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_ProfessionalUser Languages_AB_unique";

-- AddForeignKey
ALTER TABLE "ProfessionalSpecializationParentCategory" ADD CONSTRAINT "ProfessionalSpecializationParentCategory_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "Media"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
