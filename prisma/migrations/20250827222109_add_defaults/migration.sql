-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ScanResult" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "issues" JSONB NOT NULL DEFAULT [],
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_ScanResult" ("createdAt", "id", "issues", "status", "url", "userId") SELECT "createdAt", "id", "issues", "status", "url", "userId" FROM "ScanResult";
DROP TABLE "ScanResult";
ALTER TABLE "new_ScanResult" RENAME TO "ScanResult";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
