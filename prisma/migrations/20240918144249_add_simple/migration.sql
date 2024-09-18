/*
  Warnings:

  - You are about to drop the column `dataSource` on the `FishCatchAbundance` table. All the data in the column will be lost.
  - You are about to drop the column `locationId` on the `FishCatchAbundance` table. All the data in the column will be lost.
  - You are about to drop the column `speciesId` on the `FishCatchAbundance` table. All the data in the column will be lost.
  - You are about to drop the column `dataSource` on the `FishCatchOccurrence` table. All the data in the column will be lost.
  - You are about to drop the column `locationId` on the `FishCatchOccurrence` table. All the data in the column will be lost.
  - You are about to drop the column `speciesId` on the `FishCatchOccurrence` table. All the data in the column will be lost.
  - You are about to drop the `Location` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Species` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `species` to the `FishCatchAbundance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `FishCatchAbundance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `species` to the `FishCatchOccurrence` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `FishCatchOccurrence` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "FishCatchAbundance" DROP CONSTRAINT "FishCatchAbundance_locationId_fkey";

-- DropForeignKey
ALTER TABLE "FishCatchAbundance" DROP CONSTRAINT "FishCatchAbundance_speciesId_fkey";

-- DropForeignKey
ALTER TABLE "FishCatchOccurrence" DROP CONSTRAINT "FishCatchOccurrence_locationId_fkey";

-- DropForeignKey
ALTER TABLE "FishCatchOccurrence" DROP CONSTRAINT "FishCatchOccurrence_speciesId_fkey";

-- AlterTable
ALTER TABLE "FishCatchAbundance" DROP COLUMN "dataSource",
DROP COLUMN "locationId",
DROP COLUMN "speciesId",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "species" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "FishCatchOccurrence" DROP COLUMN "dataSource",
DROP COLUMN "locationId",
DROP COLUMN "speciesId",
ADD COLUMN     "catchWeight" DOUBLE PRECISION,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "species" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "Location";

-- DropTable
DROP TABLE "Species";

-- DropEnum
DROP TYPE "OccurrenceType";

-- CreateIndex
CREATE INDEX "FishCatchAbundance_latitude_longitude_date_idx" ON "FishCatchAbundance"("latitude", "longitude", "date");

-- CreateIndex
CREATE INDEX "FishCatchOccurrence_latitude_longitude_date_idx" ON "FishCatchOccurrence"("latitude", "longitude", "date");
