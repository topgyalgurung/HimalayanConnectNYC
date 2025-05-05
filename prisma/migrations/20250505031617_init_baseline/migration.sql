/*
  Warnings:

  - The `status` column on the `ResourceEditSuggestion` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "ResourceEditSuggestion" DROP COLUMN "status",
ADD COLUMN     "status" "ResourceStatus" NOT NULL DEFAULT 'PENDING';
