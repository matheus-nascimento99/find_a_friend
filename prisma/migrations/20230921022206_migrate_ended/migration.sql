/*
  Warnings:

  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[email]` on the table `orgs` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cellphone` to the `orgs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `orgs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `latitude` to the `orgs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `orgs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password_hash` to the `orgs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postal_code` to the `orgs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sponsor` to the `orgs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `street` to the `orgs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `about` to the `pets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `age` to the `pets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `pets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `energy_level` to the `pets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `independence_level` to the `pets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mien` to the `pets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `pets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `organizationId` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orgs" ADD COLUMN     "cellphone" BIGINT NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "latitude" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "longitude" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "password_hash" TEXT NOT NULL,
ADD COLUMN     "postal_code" BIGINT NOT NULL,
ADD COLUMN     "sponsor" TEXT NOT NULL,
ADD COLUMN     "street" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "pets" ADD COLUMN     "about" TEXT NOT NULL,
ADD COLUMN     "age" TEXT NOT NULL,
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "energy_level" TEXT NOT NULL,
ADD COLUMN     "independence_level" TEXT NOT NULL,
ADD COLUMN     "mien" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "organizationId" TEXT NOT NULL;

-- DropTable
DROP TABLE "users";

-- CreateTable
CREATE TABLE "photos" (
    "id" TEXT NOT NULL,
    "photo_url" TEXT NOT NULL,
    "petId" TEXT NOT NULL,

    CONSTRAINT "photos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "requirements" (
    "id" TEXT NOT NULL,
    "requirement" TEXT NOT NULL,
    "petId" TEXT NOT NULL,

    CONSTRAINT "requirements_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "orgs_email_key" ON "orgs"("email");

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "orgs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "photos" ADD CONSTRAINT "photos_petId_fkey" FOREIGN KEY ("petId") REFERENCES "pets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "requirements" ADD CONSTRAINT "requirements_petId_fkey" FOREIGN KEY ("petId") REFERENCES "pets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
