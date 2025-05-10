-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_avaliacoes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nota" INTEGER NOT NULL,
    "comentario" TEXT,
    "avaliacaoSite" BOOLEAN NOT NULL DEFAULT false,
    "usuarioId" TEXT NOT NULL,
    "produtoId" TEXT,
    "nomeUsuario" TEXT NOT NULL DEFAULT 'Usuário Desconhecido',
    "fotoUsuario" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "avaliacoes_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "avaliacoes_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "produtos" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_avaliacoes" ("comentario", "createdAt", "id", "nota", "produtoId", "usuarioId") SELECT "comentario", "createdAt", "id", "nota", "produtoId", "usuarioId" FROM "avaliacoes";
DROP TABLE "avaliacoes";
ALTER TABLE "new_avaliacoes" RENAME TO "avaliacoes";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
