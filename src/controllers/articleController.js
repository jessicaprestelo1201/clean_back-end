import ArticleModel from "../models/articleModel.js";

class ArticleController {
  // Criar artigo
  async create(req, res) {
    try {
      const { titulo, descricao, imagem, fontes } = req.body;
      if (!titulo || !descricao || !fontes) {
        return res.status(400).json({ error: "Título, descrição e fontes são obrigatórios." });
      }
      const artigo = await ArticleModel.create({
        titulo,
        descricao,
        imagem,
        fontes
      });
      res.status(201).json({ message: "Artigo criado com sucesso.", artigo });
    } catch (error) {
      res.status(500).json({ error: `Erro ao criar artigo: ${error.message}` });
    }
  }

  // Buscar todos os artigos
  async getAll(req, res) {
    try {
      const artigos = await ArticleModel.getAll();
      res.status(200).json({ message: "Artigos encontrados com sucesso.", artigos });
    } catch (error) {
      res.status(500).json({ error: `Erro ao buscar artigos: ${error.message}` });
    }
  }

  // Buscar artigo por ID
  async getById(req, res) {
    try {
      const { id } = req.params;
      const artigo = await ArticleModel.getById(id);
      if (!artigo) {
        return res.status(404).json({ error: "Artigo não encontrado." });
      }
      res.status(200).json({ message: "Artigo encontrado com sucesso.", artigo });
    } catch (error) {
      res.status(500).json({ error: `Erro ao buscar artigo: ${error.message}` });
    }
  }

  // Atualizar artigo
  async update(req, res) {
    try {
      const { id } = req.params;
      const { titulo, descricao, imagem, fontes } = req.body;
      const artigo = await ArticleModel.update(id, { titulo, descricao, imagem, fontes });
      res.status(200).json({ message: "Artigo atualizado com sucesso.", artigo });
    } catch (error) {
      res.status(500).json({ error: `Erro ao atualizar artigo: ${error.message}` });
    }
  }

  // Deletar artigo
  async delete(req, res) {
    try {
      const { id } = req.params;
      await ArticleModel.delete(id);
      res.status(200).json({ message: "Artigo deletado com sucesso." });
    } catch (error) {
      res.status(500).json({ error: `Erro ao deletar artigo: ${error.message}` });
    }
  }
}

export default new ArticleController();