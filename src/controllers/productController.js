import ProductModel from "../models/productModel.js";

class ProductController {
  async create(req, res) {
    try {
      const product = await ProductModel.create(req.body);
      res.status(201).json(product);
    } catch (error) {
      res.status(500).json({ error: "Erro ao criar produto" });
    }
  }

  async getAll(req, res) {
    try {
      const products = await ProductModel.getAll();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar produtos" });
    }
  }

  async getById(req, res) {
    try {
      const product = await ProductModel.getById(req.params.id);
      product ? res.json(product) : res.status(404).send();
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar produto" });
    }
  }
}

export default new ProductController();