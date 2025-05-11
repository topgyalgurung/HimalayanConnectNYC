/*
  Warnings:

  - The `openTime` column on the `Resource` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `closeTime` column on the `Resource` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `openTime` column on the `ResourceEditSuggestion` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `closeTime` column on the `ResourceEditSuggestion` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Resource" DROP COLUMN "openTime",
ADD COLUMN     "openTime" TIME(6),
DROP COLUMN "closeTime",
ADD COLUMN     "closeTime" TIME(6);

-- AlterTable
ALTER TABLE "ResourceEditSuggestion" DROP COLUMN "openTime",
ADD COLUMN     "openTime" TIME,
DROP COLUMN "closeTime",
ADD COLUMN     "closeTime" TIME;
