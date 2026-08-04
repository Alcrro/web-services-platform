-- CreateEnum
CREATE TYPE "DiscussionStatus" AS ENUM ('DRAFT', 'CONFIRMED');

-- AlterTable
ALTER TABLE "ServiceOrderItem" ADD COLUMN     "discussionId" TEXT;

-- CreateTable
CREATE TABLE "OrderDiscussion" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "notes" TEXT NOT NULL DEFAULT '',
    "status" "DiscussionStatus" NOT NULL DEFAULT 'DRAFT',
    "aiResponse" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OrderDiscussion_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ServiceOrderItem" ADD CONSTRAINT "ServiceOrderItem_discussionId_fkey" FOREIGN KEY ("discussionId") REFERENCES "OrderDiscussion"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderDiscussion" ADD CONSTRAINT "OrderDiscussion_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "ServiceOrder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
