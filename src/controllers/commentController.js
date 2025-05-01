import CommentModel from "../models/commentModel.js";

class CommentController {
  // Criar comentário
  async create(req, res) {
    try {
      const { conteudo, produtoId } = req.body;

      if (!conteudo || !produtoId) {
        return res.status(400).json({ error: "Conteúdo e ID do produto são obrigatórios." });
      }

      const comment = await CommentModel.create({
        conteudo,
        usuarioId: req.userId,
        produtoId
      });

      res.status(201).json({
        message: `Comentário criado com sucesso para o produto ${produtoId}.`,
        comment
      });
    } catch (error) {
      res.status(500).json({ error: `Erro ao criar comentário: ${error.message}` });
    }
  }

  // Buscar todos os comentários
  async getAll(req, res) {
    try {
      const comments = await CommentModel.getAll();
      res.status(200).json({
        message: "Comentários encontrados com sucesso.",
        comments
      });
    } catch (error) {
      res.status(500).json({ error: `Erro ao buscar comentários: ${error.message}` });
    }
  }

  // Buscar comentário por ID
  async getById(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ error: "ID do comentário é obrigatório." });
      }

      const comment = await CommentModel.findById(id);

      if (!comment) {
        return res.status(404).json({ error: "Comentário não encontrado." });
      }

      res.status(200).json({
        message: `Comentário com ID ${id} encontrado com sucesso.`,
        comment
      });
    } catch (error) {
      res.status(500).json({ error: `Erro ao buscar comentário: ${error.message}` });
    }
  }

  // Buscar comentários por produto
  async getByProduct(req, res) {
    try {
      const { produtoId } = req.params;

      if (!produtoId) {
        return res.status(400).json({ error: "ID do produto é obrigatório." });
      }

      const comments = await CommentModel.getByProduct(produtoId);

      res.status(200).json({
        message: `Comentários encontrados para o produto ${produtoId}.`,
        comments
      });
    } catch (error) {
      res.status(500).json({ error: `Erro ao buscar comentários: ${error.message}` });
    }
  }

  // Atualizar comentário
  async update(req, res) {
    try {
      const { id } = req.params;
      const { conteudo } = req.body;

      if (!id || !conteudo) {
        return res.status(400).json({ error: "ID do comentário e conteúdo são obrigatórios." });
      }

      const comment = await CommentModel.update(id, { conteudo });

      res.status(200).json({
        message: `Comentário com ID ${id} atualizado com sucesso.`,
        comment
      });
    } catch (error) {
      res.status(500).json({ error: `Erro ao atualizar comentário: ${error.message}` });
    }
  }

  // Deletar comentário
  async delete(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ error: "ID do comentário é obrigatório." });
      }

      const comment = await CommentModel.findById(id);

      if (!comment) {
        return res.status(404).json({ error: "Comentário não encontrado." });
      }

      if (comment.usuarioId !== req.userId) {
        return res.status(403).json({ error: "Você não tem permissão para deletar este comentário." });
      }

      await CommentModel.delete(id);

      res.status(200).json({ message: `Comentário com ID ${id} deletado com sucesso.` });
    } catch (error) {
      res.status(500).json({ error: `Erro ao deletar comentário: ${error.message}` });
    }
  }
}

export default new CommentController();