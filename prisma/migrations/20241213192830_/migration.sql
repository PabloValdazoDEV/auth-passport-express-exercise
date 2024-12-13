/*
  Warnings:

  - A unique constraint covering the columns `[githubId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "password" DROP NOT NULL,
ALTER COLUMN "githubId" DROP NOT NULL,
ALTER COLUMN "githubId" SET DEFAULT '';

-- CreateIndex
CREATE UNIQUE INDEX "User_githubId_key" ON "User"("githubId");