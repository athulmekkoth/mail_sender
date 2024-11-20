/*
  Warnings:

  - You are about to drop the `Idea` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Like` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Idea" DROP CONSTRAINT "Idea_createdById_fkey";

-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_createdById_fkey";

-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_ideaId_fkey";

-- AlterTable
ALTER TABLE "RefreshToken" ALTER COLUMN "expiresAt" SET DEFAULT NOW() + interval '7 days';

-- DropTable
DROP TABLE "Idea";

-- DropTable
DROP TABLE "Like";
