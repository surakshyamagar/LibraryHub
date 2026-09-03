/*
  Warnings:

  - The `status` column on the `Borrowing` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "BorrowingStatus" AS ENUM ('BORROWED', 'RETURNED', 'OVERDUE');

-- AlterTable
ALTER TABLE "Borrowing" DROP COLUMN "status",
ADD COLUMN     "status" "BorrowingStatus" NOT NULL DEFAULT 'BORROWED';
