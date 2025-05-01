import prisma from "../../prisma/prisma.js";

class ProductModel {
  // Criar produto
  async create(data) {
    return await prisma.product.create({
      data,
      include: {
        curtidas: true,
        comentarios: { include: { usuario: true } }
      }
    });
  }

  // Buscar todos os produtos
  async getAll() {
    return await prisma.product.findMany({
      include: {
        _count: {
          select: { curtidas: true, comentarios: true }
        }
      }
    });
  }

  // Buscar produto por ID
  async getById(id) {
    return await prisma.product.findUnique({
      where: { id },
      include: {
        curtidas: { include: { usuario: true } },
        comentarios: { include: { usuario: true } }
      }
    });
  }

  // Buscar produtos por categoria
  async getByCategory(categoria) {
    return await prisma.product.findMany({
      where: { categoria },
      include: {
        _count: {
          select: { curtidas: true, comentarios: true }
        }
      }
    });
  }

  // Buscar produtos por cor
  async getByColor(cor) {
    return await prisma.product.findMany({
      where: { cor },
      include: {
        _count: {
          select: { curtidas: true, comentarios: true }
        }
      }
    });
  }

  // Atualizar produto
  async update(id, data) {
    return await prisma.product.update({
      where: { id },
      data
    });
  }

  // Remover produto
  async delete(id) {
    await prisma.product.delete({
      where: { id }
    });
    return true;
  }
}

export default new ProductModel();