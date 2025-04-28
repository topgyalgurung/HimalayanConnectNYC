-- DropForeignKey
ALTER TABLE "ResourceEditSuggestion" DROP CONSTRAINT "ResourceEditSuggestion_resourceId_fkey";

-- DropForeignKey
ALTER TABLE "ResourceLike" DROP CONSTRAINT "ResourceLike_resourceId_fkey";

-- DropForeignKey
ALTER TABLE "ResourceReview" DROP CONSTRAINT "ResourceReview_resourceId_fkey";

-- AddForeignKey
ALTER TABLE "ResourceEditSuggestion" ADD CONSTRAINT "ResourceEditSuggestion_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES "Resource"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResourceLike" ADD CONSTRAINT "ResourceLike_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES "Resource"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResourceReview" ADD CONSTRAINT "ResourceReview_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES "Resource"("id") ON DELETE CASCADE ON UPDATE CASCADE;
