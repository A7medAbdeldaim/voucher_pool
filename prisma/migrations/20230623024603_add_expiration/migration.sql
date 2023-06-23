/*
  Warnings:

  - Added the required column `expiration_at` to the `voucher_data` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "voucher_data" ADD COLUMN     "expiration_at" TIMESTAMP(3) NOT NULL;
