import prisma from "../prisma/prisma.js";

class CommentModel {
  async create(data) {
    return await prisma.comment.create({
      data,
      include: { user: true }
    });
  }

  async getByProduct(produtoId) {
    return await prisma.comment.findMany({
      where: { produtoId },
      include: { user: true }
    });
  }

  async delete(id) {
    await prisma.comment.delete({
      where: { id }
    });
    return true;
  }
}

export default new CommentModel();