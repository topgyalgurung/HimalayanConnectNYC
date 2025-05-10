-- First, create a temporary column
ALTER TABLE "ResourceReview" ADD COLUMN "rating_new" DECIMAL(2,1);

-- Convert existing integer ratings to decimal (divide by 2 since they were stored as integers)
UPDATE "ResourceReview" SET "rating_new" = "rating"::DECIMAL / 2;

-- Drop the old column
ALTER TABLE "ResourceReview" DROP COLUMN "rating";

-- Rename the new column to rating
ALTER TABLE "ResourceReview" RENAME COLUMN "rating_new" TO "rating";

-- Make the column not null
ALTER TABLE "ResourceReview" ALTER COLUMN "rating" SET NOT NULL; 