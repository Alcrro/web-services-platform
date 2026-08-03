/*
  Warnings:

  - Added the required column `hours` to the `ServiceFeature` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."ServiceFeature" ADD COLUMN     "hours" INTEGER NOT NULL;
