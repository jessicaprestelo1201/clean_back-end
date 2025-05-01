import ProductModel from "../models/productModel.js";

class ProductController {
  // Criar produto
  async create(req, res) {
    try {
      const { nome, descricao, preco, categoria, cor } = req.body;

      if (!nome || !preco || !categoria || !cor) {
        return res.status(400).json({ error: "Nome, preço, categoria e cor são obrigatórios." });
      }

      const product = await ProductModel.create({ nome, descricao, preco, categoria, cor });

      res.status(201).json({
        message: "Produto criado com sucesso.",
        product
      });
    } catch (error) {
      res.status(500).json({ error: `Erro ao criar produto: ${error.message}` });
    }
  }

  // Buscar todos os produtos
  async getAll(req, res) {
    try {
      const products = await ProductModel.getAll();

      res.status(200).json({
        message: "Produtos encontrados com sucesso.",
        products
      });
    } catch (error) {
      res.status(500).json({ error: `Erro ao buscar produtos: ${error.message}` });
    }
  }

  // Buscar produto por ID
  async getById(req, res) {
    try {
      const { id } = req.params;

      const product = await ProductModel.getById(id);

      if (!product) {
        return res.status(404).json({ error: "Produto não encontrado." });
      }

      res.status(200).json({
        message: `Produto com ID ${id} encontrado com sucesso.`,
        product
      });
    } catch (error) {
      res.status(500).json({ error: `Erro ao buscar produto: ${error.message}` });
    }
  }

  // Buscar produtos por categoria
  async getByCategory(req, res) {
    try {
      const { categoria } = req.params;

      const products = await ProductModel.getByCategory(categoria);

      res.status(200).json({
        message: `Produtos da categoria ${categoria} encontrados com sucesso.`,
        products
      });
    } catch (error) {
      res.status(500).json({ error: `Erro ao buscar produtos por categoria: ${error.message}` });
    }
  }

  // Buscar produtos por cor
  async getByColor(req, res) {
    try {
      const { cor } = req.params;

      const products = await ProductModel.getByColor(cor);

      res.status(200).json({
        message: `Produtos com a cor ${cor} encontrados com sucesso.`,
        products
      });
    } catch (error) {
      res.status(500).json({ error: `Erro ao buscar produtos por cor: ${error.message}` });
    }
  }

  // Atualizar produto
  async update(req, res) {
    try {
      const { id } = req.params;
      const { nome, descricao, preco, categoria, cor } = req.body;

      if (!nome || !preco || !categoria || !cor) {
        return res.status(400).json({ error: "Nome, preço, categoria e cor são obrigatórios." });
      }

      const product = await ProductModel.update(id, { nome, descricao, preco, categoria, cor });

      res.status(200).json({
        message: `Produto com ID ${id} atualizado com sucesso.`,
        product
      });
    } catch (error) {
      res.status(500).json({ error: `Erro ao atualizar produto: ${error.message}` });
    }
  }

  // Remover produto
  async delete(req, res) {
    try {
      const { id } = req.params;

      await ProductModel.delete(id);

      res.status(200).json({ message: `Produto com ID ${id} removido com sucesso.` });
    } catch (error) {
      res.status(500).json({ error: `Erro ao remover produto: ${error.message}` });
    }
  }
}

export default new ProductController();