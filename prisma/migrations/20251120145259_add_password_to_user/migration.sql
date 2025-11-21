-- CreateEnum
CREATE TYPE "CarType" AS ENUM ('sedan', 'suv', 'luxury', 'sports', 'convertible', 'van');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "password" TEXT;

-- CreateTable
CREATE TABLE "Car" (
    "id" TEXT NOT NULL,
    "make" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "seats" INTEGER NOT NULL,
    "transmission" TEXT NOT NULL,
    "type" "CarType" NOT NULL,
    "images" JSONB NOT NULL,
    "features" JSONB NOT NULL,
    "available" BOOLEAN NOT NULL DEFAULT true,
    "hostId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Car_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Car_hostId_idx" ON "Car"("hostId");

-- CreateIndex
CREATE INDEX "Car_type_idx" ON "Car"("type");

-- CreateIndex
CREATE INDEX "Car_available_idx" ON "Car"("available");

-- CreateIndex
CREATE INDEX "Car_make_idx" ON "Car"("make");

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
