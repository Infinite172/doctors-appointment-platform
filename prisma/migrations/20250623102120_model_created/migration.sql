/*
  Warnings:

  - The values [CLIENT,LAWYER] on the enum `UserRole` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `lawyerId` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `clientDescription` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `clientId` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `lawyerId` on the `Availability` table. All the data in the column will be lost.
  - You are about to drop the column `lawyerId` on the `Payout` table. All the data in the column will be lost.
  - Added the required column `clientId` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lawyerId` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lawyerId` to the `Availability` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lawyerId` to the `Payout` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "UserRole_new" AS ENUM ('UNASSIGNED', 'CLIENT', 'LAWYER', 'ADMIN');
ALTER TABLE "User" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "role" TYPE "UserRole_new" USING ("role"::text::"UserRole_new");
ALTER TYPE "UserRole" RENAME TO "UserRole_old";
ALTER TYPE "UserRole_new" RENAME TO "UserRole";
DROP TYPE "UserRole_old";
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'UNASSIGNED';
COMMIT;

-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_lawyerId_fkey";

-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_clientId_fkey";

-- DropForeignKey
ALTER TABLE "Availability" DROP CONSTRAINT "Availability_lawyerId_fkey";

-- DropForeignKey
ALTER TABLE "Payout" DROP CONSTRAINT "Payout_lawyerId_fkey";

-- DropIndex
DROP INDEX "Appointment_lawyerId_startTime_idx";

-- DropIndex
DROP INDEX "Availability_lawyerId_startTime_idx";

-- DropIndex
DROP INDEX "Payout_lawyerId_status_idx";

-- AlterTable
ALTER TABLE "Appointment" DROP COLUMN "lawyerId",
DROP COLUMN "clientDescription",
DROP COLUMN "clientId",
ADD COLUMN     "clientDescription" TEXT,
ADD COLUMN     "clientId" TEXT NOT NULL,
ADD COLUMN     "lawyerId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Availability" DROP COLUMN "lawyerId",
ADD COLUMN     "lawyerId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Payout" DROP COLUMN "lawyerId",
ADD COLUMN     "lawyerId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Appointment_lawyerId_startTime_idx" ON "Appointment"("lawyerId", "startTime");

-- CreateIndex
CREATE INDEX "Availability_lawyerId_startTime_idx" ON "Availability"("lawyerId", "startTime");

-- CreateIndex
CREATE INDEX "Payout_lawyerId_status_idx" ON "Payout"("lawyerId", "status");

-- AddForeignKey
ALTER TABLE "Availability" ADD CONSTRAINT "Availability_lawyerId_fkey" FOREIGN KEY ("lawyerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_lawyerId_fkey" FOREIGN KEY ("lawyerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payout" ADD CONSTRAINT "Payout_lawyerId_fkey" FOREIGN KEY ("lawyerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
