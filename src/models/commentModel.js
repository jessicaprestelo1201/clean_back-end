import prisma from "../../prisma/prisma.js";

class CommentModel {
  // Criar comentário
  async create(data) {
    return await prisma.comment.create({
      data,
      include: {
        usuario: true, // Certifique-se de que o campo é `usuario` no schema.prisma
        produto: true  // Certifique-se de que o campo é `produto` no schema.prisma
      }
    });
  }

  // Buscar todos os comentários
  async getAll() {
    return await prisma.comment.findMany({
      include: { user: true }
    });
  }

  // Buscar comentário por ID
  async findById(id) {
    return await prisma.comment.findUnique({
      where: { id },
      include: { user: true }
    });
  }

  // Buscar comentários por produto
  async getByProduct(produtoId) {
    return await prisma.comment.findMany({
      where: { produtoId },
      include: { user: true }
    });
  }

  // Atualizar comentário
  async update(id, data) {
    return await prisma.comment.update({
      where: { id },
      data
    });
  }

  // Deletar comentário
  async delete(id) {
    await prisma.comment.delete({
      where: { id }
    });
    return true;
  }
}

export default new CommentModel();