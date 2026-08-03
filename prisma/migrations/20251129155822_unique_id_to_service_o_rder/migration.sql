/*
  Warnings:

  - A unique constraint covering the columns `[uniqueId]` on the table `ServiceOrder` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'DEVELOPER';

-- AlterTable
ALTER TABLE "ServiceOrder" ADD COLUMN     "uniqueId" SERIAL NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ServiceOrder_uniqueId_key" ON "ServiceOrder"("uniqueId");
