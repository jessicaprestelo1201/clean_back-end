import CommentModel from "../models/commentModel.js";

class CommentController {
  async create(req, res) {
    try {
      const comment = await CommentModel.create({
        conteudo: req.body.conteudo,
        usuarioId: req.userId,
        produtoId: req.body.produtoId
      });
      res.status(201).json(comment);
    } catch (error) {
      res.status(500).json({ error: "Erro ao criar comentário" });
    }
  }

  async getByProduct(req, res) {
    try {
      const comments = await CommentModel.getByProduct(req.params.produtoId);
      res.json(comments);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar comentários" });
    }
  }

  async delete(req, res) {
    try {
      await CommentModel.delete(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Erro ao deletar comentário" });
    }
  }
}

export default new CommentController();