import prisma from "../../prisma/prisma.js";

class ProductModel {
  async create(data) {
    return await prisma.product.create({ 
      data,
      include: {
        curtidas: true,
        comentarios: { include: { user: true } }
      }
    });
  }

  async getAll() {
    return await prisma.product.findMany({
      include: {
        _count: {
          select: { curtidas: true, comentarios: true }
        }
      }
    });
  }

  async getById(id) {
    return await prisma.product.findUnique({
      where: { id },
      include: {
        curtidas: { include: { user: true } },
        comentarios: { include: { user: true } }
      }
    });
  }
}

export default new ProductModel();