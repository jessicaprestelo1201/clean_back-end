import prisma from "../../prisma/prisma.js";

class LikeModel {
  // Criar um like
  async create(data) {
    return await prisma.like.create({
      data,
      include: { user: true }
    });
  }

  // Deletar um like
  async delete(id) {
    await prisma.like.delete({
      where: { id }
    });
    return true;
  }

  // Buscar likes por produto
  async getByProduct(produtoId) {
    return await prisma.like.findMany({
      where: { produtoId },
      include: { user: true }
    });
  }

  // Buscar todos os likes de um usuário
  async getAllByUser(usuarioId) {
    return await prisma.like.findMany({
      where: { usuarioId },
      include: { product: true }
    });
  }

  // Verificar se um like já existe
  async findByUserAndProduct(usuarioId, produtoId) {
    return await prisma.like.findFirst({
      where: { usuarioId, produtoId }
    });
  }
}

export default new LikeModel();