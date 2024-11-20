-- DropIndex
DROP INDEX "Emails_userId_key";

-- AlterTable
ALTER TABLE "RefreshToken" ALTER COLUMN "expiresAt" SET DEFAULT NOW() + interval '7 days';
