-- CreateTable
CREATE TABLE "FishCatchOccurrence" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "speciesId" INTEGER NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "depth" DOUBLE PRECISION,
    "dataSource" TEXT NOT NULL,
    "locationId" INTEGER NOT NULL,

    CONSTRAINT "FishCatchOccurrence_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FishCatchAbundance" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "speciesId" INTEGER NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "catchWeight" DOUBLE PRECISION NOT NULL,
    "depth" DOUBLE PRECISION,
    "dataSource" TEXT NOT NULL,
    "locationId" INTEGER NOT NULL,

    CONSTRAINT "FishCatchAbundance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Species" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "habitatInfo" TEXT,

    CONSTRAINT "Species_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Location" (
    "id" SERIAL NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "description" TEXT,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "FishCatchOccurrence_date_idx" ON "FishCatchOccurrence"("date");

-- CreateIndex
CREATE INDEX "FishCatchOccurrence_speciesId_idx" ON "FishCatchOccurrence"("speciesId");

-- CreateIndex
CREATE INDEX "FishCatchOccurrence_latitude_longitude_idx" ON "FishCatchOccurrence"("latitude", "longitude");

-- CreateIndex
CREATE INDEX "FishCatchAbundance_date_idx" ON "FishCatchAbundance"("date");

-- CreateIndex
CREATE INDEX "FishCatchAbundance_speciesId_idx" ON "FishCatchAbundance"("speciesId");

-- CreateIndex
CREATE INDEX "FishCatchAbundance_latitude_longitude_idx" ON "FishCatchAbundance"("latitude", "longitude");

-- CreateIndex
CREATE UNIQUE INDEX "Species_name_key" ON "Species"("name");

-- AddForeignKey
ALTER TABLE "FishCatchOccurrence" ADD CONSTRAINT "FishCatchOccurrence_speciesId_fkey" FOREIGN KEY ("speciesId") REFERENCES "Species"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FishCatchOccurrence" ADD CONSTRAINT "FishCatchOccurrence_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FishCatchAbundance" ADD CONSTRAINT "FishCatchAbundance_speciesId_fkey" FOREIGN KEY ("speciesId") REFERENCES "Species"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FishCatchAbundance" ADD CONSTRAINT "FishCatchAbundance_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
