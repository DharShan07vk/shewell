-- CreateTable
CREATE TABLE "FAQ" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "FAQ_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FAQ" ADD CONSTRAINT "FAQ_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
