import LikeModel from "../models/likeModel.js";

class LikeController {
  // Adicionar um produto aos curtidos
  async likeProduct(req, res) {
    try {
      const { produtoId } = req.body;

      if (!produtoId) {
        return res.status(400).json({ error: "ID do produto é obrigatório." });
      }

      // Verificar se o like já existe
      const existingLike = await LikeModel.findByUserAndProduct(req.userId, produtoId);
      if (existingLike) {
        return res.status(400).json({ error: "Você já curtiu este produto." });
      }

      const like = await LikeModel.create({
        usuarioId: req.userId,
        produtoId
      });

      res.status(201).json({
        message: `Produto ${produtoId} adicionado aos curtidos com sucesso.`,
        like
      });
    } catch (error) {
      res.status(500).json({ error: `Erro ao curtir produto: ${error.message}` });
    }
  }

  // Listar todos os produtos curtidos por um usuário
  async getAllLikes(req, res) {
    try {
      const likes = await LikeModel.getAllByUser(req.userId);

      res.status(200).json({
        message: "Produtos curtidos encontrados com sucesso.",
        likes
      });
    } catch (error) {
      res.status(500).json({ error: `Erro ao buscar produtos curtidos: ${error.message}` });
    }
  }

  // Listar curtidas de um produto específico
  async getLikes(req, res) {
    try {
      const { produtoId } = req.params;

      if (!produtoId) {
        return res.status(400).json({ error: "ID do produto é obrigatório." });
      }

      const likes = await LikeModel.getByProduct(produtoId);

      res.status(200).json({
        message: `Curtidas encontradas para o produto ${produtoId}.`,
        likes
      });
    } catch (error) {
      res.status(500).json({ error: `Erro ao buscar curtidas: ${error.message}` });
    }
  }

  // Remover um produto dos curtidos
  async unlike(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ error: "ID do like é obrigatório." });
      }

      const like = await LikeModel.delete(id);

      res.status(200).json({
        message: `Produto removido dos curtidos com sucesso.`,
        like
      });
    } catch (error) {
      res.status(500).json({ error: `Erro ao remover curtida: ${error.message}` });
    }
  }
}

export default new LikeController();