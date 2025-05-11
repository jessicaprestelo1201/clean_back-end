/*
  Warnings:

  - You are about to drop the column `nota` on the `avaliacoes` table. All the data in the column will be lost.
  - You are about to drop the column `categoriaMarca` on the `produtos` table. All the data in the column will be lost.
  - You are about to drop the column `imagem` on the `produtos` table. All the data in the column will be lost.
  - You are about to drop the column `linkMarca` on the `produtos` table. All the data in the column will be lost.
  - Added the required column `estrelas` to the `avaliacoes` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_avaliacoes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "estrelas" INTEGER NOT NULL,
    "comentario" TEXT,
    "avaliacaoSite" BOOLEAN NOT NULL,
    "nomeUsuario" TEXT NOT NULL,
    "fotoUsuario" TEXT,
    "produtoId" TEXT,
    "usuarioId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "avaliacoes_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "produtos" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "avaliacoes_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_avaliacoes" ("avaliacaoSite", "comentario", "createdAt", "fotoUsuario", "id", "nomeUsuario", "produtoId", "usuarioId") SELECT "avaliacaoSite", "comentario", "createdAt", "fotoUsuario", "id", "nomeUsuario", "produtoId", "usuarioId" FROM "avaliacoes";
DROP TABLE "avaliacoes";
ALTER TABLE "new_avaliacoes" RENAME TO "avaliacoes";
CREATE TABLE "new_comentarios" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "conteudo" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "produtoId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "comentarios_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "comentarios_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "produtos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_comentarios" ("conteudo", "createdAt", "id", "produtoId", "updatedAt", "usuarioId") SELECT "conteudo", "createdAt", "id", "produtoId", "updatedAt", "usuarioId" FROM "comentarios";
DROP TABLE "comentarios";
ALTER TABLE "new_comentarios" RENAME TO "comentarios";
CREATE TABLE "new_curtidas" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "usuarioId" TEXT NOT NULL,
    "produtoId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "curtidas_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "curtidas_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "produtos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_curtidas" ("createdAt", "id", "produtoId", "usuarioId") SELECT "createdAt", "id", "produtoId", "usuarioId" FROM "curtidas";
DROP TABLE "curtidas";
ALTER TABLE "new_curtidas" RENAME TO "curtidas";
CREATE TABLE "new_produtos" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "preco" REAL NOT NULL,
    "categoria" TEXT NOT NULL,
    "cor" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_produtos" ("categoria", "cor", "createdAt", "descricao", "id", "nome", "preco", "updatedAt") SELECT "categoria", "cor", "createdAt", "descricao", "id", "nome", "preco", "updatedAt" FROM "produtos";
DROP TABLE "produtos";
ALTER TABLE "new_produtos" RENAME TO "produtos";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
