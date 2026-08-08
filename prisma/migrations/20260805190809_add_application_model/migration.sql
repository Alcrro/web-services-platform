-- CreateEnum
CREATE TYPE "ApplicationStatus" AS ENUM ('APPLIED', 'INTERVIEW', 'WON', 'LOST', 'NO_RESPONSE');

-- CreateTable
CREATE TABLE "Application" (
    "id" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    "projectName" TEXT NOT NULL,
    "clientName" TEXT,
    "status" "ApplicationStatus" NOT NULL DEFAULT 'APPLIED',
    "budget" DECIMAL(65,30),
    "currency" TEXT NOT NULL DEFAULT 'EUR',
    "appliedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "respondedAt" TIMESTAMP(3),
    "closedAt" TIMESTAMP(3),
    "link" TEXT,
    "rawInput" TEXT,
    "aiAnalysis" JSONB,
    "notes" TEXT,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Application_pkey" PRIMARY KEY ("id")
);
