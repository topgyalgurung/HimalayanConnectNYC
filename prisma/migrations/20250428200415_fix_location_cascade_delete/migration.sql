-- DropForeignKey
ALTER TABLE "Location" DROP CONSTRAINT "Location_resourceId_fkey";

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES "Resource"("id") ON DELETE CASCADE ON UPDATE CASCADE;
