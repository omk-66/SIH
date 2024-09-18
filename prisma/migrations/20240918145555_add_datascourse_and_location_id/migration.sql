/*
  Warnings:

  - Added the required column `dataSource` to the `FishCatchAbundance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `locationId` to the `FishCatchAbundance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dataSource` to the `FishCatchOccurrence` table without a default value. This is not possible if the table is not empty.
  - Added the required column `locationId` to the `FishCatchOccurrence` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FishCatchAbundance" ADD COLUMN     "dataSource" TEXT NOT NULL,
ADD COLUMN     "locationId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "FishCatchOccurrence" ADD COLUMN     "dataSource" TEXT NOT NULL,
ADD COLUMN     "locationId" INTEGER NOT NULL;
