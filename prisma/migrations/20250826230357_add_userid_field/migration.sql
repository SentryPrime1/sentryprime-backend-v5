/*
  Warnings:

  - Added the required column `userId` to the `ScanResult` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ScanResult" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "issues" JSONB NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_ScanResult" ("createdAt", "id", "issues", "status", "url") SELECT "createdAt", "id", "issues", "status", "url" FROM "ScanResult";
DROP TABLE "ScanResult";
ALTER TABLE "new_ScanResult" RENAME TO "ScanResult";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
