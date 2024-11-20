/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `Emails` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "logSchema" (
    "logID" TEXT NOT NULL,
    "logMessage" TEXT NOT NULL,
    "logObject" JSONB NOT NULL,
    "type" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "logSchema_pkey" PRIMARY KEY ("logID")
);

-- CreateIndex
CREATE UNIQUE INDEX "Emails_title_key" ON "Emails"("title");
