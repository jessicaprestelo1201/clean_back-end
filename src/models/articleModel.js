import prisma from "../../prisma/prisma.js";

class ArticleModel {
  // Criar artigo
  async create(data) {
    return await prisma.artigo.create({
      data,
      include: { curtidas: true }
    });
  }

  // Buscar todos os artigos
  async getAll() {
    return await prisma.artigo.findMany({
      include: { curtidas: true }
    });
  }

  // Buscar artigo por ID
  async getById(id) {
    return await prisma.artigo.findUnique({
      where: { id },
      include: { curtidas: true }
    });
  }

  // Atualizar artigo
  async update(id, data) {
    return await prisma.artigo.update({
      where: { id },
      data,
      include: { curtidas: true }
    });
  }

  // Deletar artigo
  async delete(id) {
    await prisma.artigo.delete({ where: { id } });
    return true;
  }
}

export default new ArticleModel();