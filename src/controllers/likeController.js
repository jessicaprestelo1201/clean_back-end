import LikeModel from "../models/likeModel.js";

class LikeController {
  async likeProduct(req, res) {
    try {
      const like = await LikeModel.create({
        usuarioId: req.userId,
        produtoId: req.body.produtoId
      });
      res.status(201).json(like);
    } catch (error) {
      res.status(500).json({ error: "Erro ao curtir produto" });
    }
  }

  async getLikes(req, res) {
    try {
      const likes = await LikeModel.getByProduct(req.params.produtoId);
      res.json(likes);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar curtidas" });
    }
  }

  async unlike(req, res) {
    try {
      await LikeModel.delete(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Erro ao remover curtida" });
    }
  }
}

export default new LikeController();