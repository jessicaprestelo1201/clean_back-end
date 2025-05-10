-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_avaliacoes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nota" INTEGER NOT NULL,
    "comentario" TEXT,
    "usuarioId" TEXT NOT NULL,
    "produtoId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "avaliacoes_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "avaliacoes_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "produtos" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_avaliacoes" ("comentario", "createdAt", "id", "nota", "produtoId", "usuarioId") SELECT "comentario", "createdAt", "id", "nota", "produtoId", "usuarioId" FROM "avaliacoes";
DROP TABLE "avaliacoes";
ALTER TABLE "new_avaliacoes" RENAME TO "avaliacoes";
CREATE TABLE "new_comentarios" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "conteudo" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "produtoId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "comentarios_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "comentarios_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "produtos" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_comentarios" ("conteudo", "createdAt", "id", "produtoId", "updatedAt", "usuarioId") SELECT "conteudo", "createdAt", "id", "produtoId", "updatedAt", "usuarioId" FROM "comentarios";
DROP TABLE "comentarios";
ALTER TABLE "new_comentarios" RENAME TO "comentarios";
CREATE TABLE "new_curtidas" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "usuarioId" TEXT NOT NULL,
    "produtoId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "curtidas_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "curtidas_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "produtos" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_curtidas" ("createdAt", "id", "produtoId", "usuarioId") SELECT "createdAt", "id", "produtoId", "usuarioId" FROM "curtidas";
DROP TABLE "curtidas";
ALTER TABLE "new_curtidas" RENAME TO "curtidas";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
