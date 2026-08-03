/*
  Warnings:

  - Added the required column `type` to the `ServiceOrderItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ServiceOrderItem" DROP COLUMN "type",
ADD COLUMN     "type" "FeatureType" NOT NULL;

-- DropEnum
DROP TYPE "public"."ServiceOrderItemType";
