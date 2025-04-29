import prisma from "../prisma/prisma.js";

class LikeModel {
  async create(data) {
    return await prisma.like.create({ 
      data,
      include: { user: true }
    });
  }

  async delete(id) {
    await prisma.like.delete({
      where: { id }
    });
    return true;
  }

  async getByProduct(produtoId) {
    return await prisma.like.findMany({
      where: { produtoId },
      include: { user: true }
    });
  }
}

export default new LikeModel();