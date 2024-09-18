/*
  Warnings:

  - You are about to drop the column `species` on the `FishCatchAbundance` table. All the data in the column will be lost.
  - You are about to drop the column `species` on the `FishCatchOccurrence` table. All the data in the column will be lost.
  - Added the required column `speciesId` to the `FishCatchAbundance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `speciesId` to the `FishCatchOccurrence` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FishCatchAbundance" DROP COLUMN "species",
ADD COLUMN     "speciesId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "FishCatchOccurrence" DROP COLUMN "species",
ADD COLUMN     "speciesId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Species" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Species_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Species_name_key" ON "Species"("name");

-- CreateIndex
CREATE INDEX "Species_name_idx" ON "Species"("name");

-- AddForeignKey
ALTER TABLE "FishCatchOccurrence" ADD CONSTRAINT "FishCatchOccurrence_speciesId_fkey" FOREIGN KEY ("speciesId") REFERENCES "Species"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FishCatchAbundance" ADD CONSTRAINT "FishCatchAbundance_speciesId_fkey" FOREIGN KEY ("speciesId") REFERENCES "Species"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
