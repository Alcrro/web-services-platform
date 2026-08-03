/*
  Warnings:

  - You are about to drop the column `initialPrice` on the `Service` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "PriceDisplayModel" AS ENUM ('ONE_TIME', 'SUBSCRIPTION', 'CONTACT');

-- AlterTable
ALTER TABLE "Service" DROP COLUMN "initialPrice";

-- CreateTable
CREATE TABLE "ServicePricingConfig" (
    "id" SERIAL NOT NULL,
    "serviceId" INTEGER NOT NULL,
    "hourlyRate" DECIMAL(65,30) NOT NULL,
    "markupRate" DECIMAL(65,30) NOT NULL,
    "fixedCosts" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "taxRate" DECIMAL(65,30) NOT NULL DEFAULT 0.19,
    "displayPrice" DECIMAL(65,30),
    "displayModel" "PriceDisplayModel" NOT NULL DEFAULT 'ONE_TIME',
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ServicePricingConfig_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ServicePricingConfig_serviceId_key" ON "ServicePricingConfig"("serviceId");

-- AddForeignKey
ALTER TABLE "ServicePricingConfig" ADD CONSTRAINT "ServicePricingConfig_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
