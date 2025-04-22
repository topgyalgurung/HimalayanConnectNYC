-- CreateEnum
CREATE TYPE "EditStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- AlterTable
ALTER TABLE "Resource" ALTER COLUMN "openTime" SET DATA TYPE TIME,
ALTER COLUMN "closeTime" SET DATA TYPE TIME;

-- AlterTable
ALTER TABLE "ResourceEditSuggestion" ALTER COLUMN "status" SET DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "ResourceReview" ADD COLUMN     "isAnonymous" BOOLEAN NOT NULL DEFAULT false;
