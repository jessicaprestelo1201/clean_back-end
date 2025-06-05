-- CreateTable
CREATE TABLE "artigos" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "imagem" TEXT,
    "fontes" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_curtidas" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "usuarioId" TEXT,
    "produtoId" TEXT,
    "comentarioId" TEXT,
    "artigoId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "curtidas_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "curtidas_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "produtos" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "curtidas_comentarioId_fkey" FOREIGN KEY ("comentarioId") REFERENCES "comentarios" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "curtidas_artigoId_fkey" FOREIGN KEY ("artigoId") REFERENCES "artigos" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_curtidas" ("createdAt", "id", "produtoId", "usuarioId") SELECT "createdAt", "id", "produtoId", "usuarioId" FROM "curtidas";
DROP TABLE "curtidas";
ALTER TABLE "new_curtidas" RENAME TO "curtidas";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
