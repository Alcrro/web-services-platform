/*
  Warnings:

  - You are about to drop the column `uniqueId` on the `ServiceOrder` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[orderNo]` on the table `ServiceOrder` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "public"."ServiceOrder_uniqueId_key";

-- AlterTable
ALTER TABLE "ServiceOrder" DROP COLUMN "uniqueId",
ADD COLUMN     "orderNo" SERIAL NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ServiceOrder_orderNo_key" ON "ServiceOrder"("orderNo");
