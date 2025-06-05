import prisma from "../../prisma/prisma.js";

class AvaliacaoModel {
  // Criar avaliação
  async create(data) {
    return await prisma.avaliacao.create({
      data,
      include: {
        usuario: true,
        produto: true
      }
    });
  }

  // Buscar todas as avaliações
  async getAll() {
    return await prisma.avaliacao.findMany({
      include: {
        usuario: true,
        produto: true
      }
    });
  }

  async getSiteReviews() {
    return await prisma.avaliacao.findMany({
      where: { avaliacaoSite: true },
      include: {
        usuario: true,
        produto: true
      }
    });
  }

  // Buscar avaliação por ID
  async getById(id) {
    return await prisma.avaliacao.findUnique({
      where: { id },
      include: {
        usuario: true,
        produto: true
      }
    });
  }

  // Atualizar avaliação
  async update(id, data) {
    return await prisma.avaliacao.update({
      where: { id },
      data
    });
  }

  // Deletar avaliação
  async delete(id) {
    await prisma.avaliacao.delete({
      where: { id }
    });
    return true;
  }
}

export default new AvaliacaoModel();