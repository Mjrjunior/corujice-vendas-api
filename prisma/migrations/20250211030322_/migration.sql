/*
  Warnings:

  - You are about to drop the column `orderId` on the `order_items` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `order_items` table. All the data in the column will be lost.
  - You are about to drop the column `companyId` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `companyId` on the `products` table. All the data in the column will be lost.
  - Added the required column `order_id` to the `order_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_id` to the `order_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `company_id` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `company_id` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "order_items" DROP CONSTRAINT "order_items_orderId_fkey";

-- DropForeignKey
ALTER TABLE "order_items" DROP CONSTRAINT "order_items_productId_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_companyId_fkey";

-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_companyId_fkey";

-- DropIndex
DROP INDEX "order_items_orderId_idx";

-- DropIndex
DROP INDEX "order_items_productId_idx";

-- DropIndex
DROP INDEX "orders_companyId_idx";

-- DropIndex
DROP INDEX "products_companyId_idx";

-- AlterTable
ALTER TABLE "order_items" DROP COLUMN "orderId",
DROP COLUMN "productId",
ADD COLUMN     "order_id" TEXT NOT NULL,
ADD COLUMN     "product_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "companyId",
ADD COLUMN     "company_id" TEXT NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "products" DROP COLUMN "companyId",
ADD COLUMN     "company_id" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "order_items_product_id_idx" ON "order_items"("product_id");

-- CreateIndex
CREATE INDEX "order_items_order_id_idx" ON "order_items"("order_id");

-- CreateIndex
CREATE INDEX "orders_company_id_idx" ON "orders"("company_id");

-- CreateIndex
CREATE INDEX "products_company_id_idx" ON "products"("company_id");

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
