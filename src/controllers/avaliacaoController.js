import AvaliacaoModel from "../models/avaliacaoModel.js";

class AvaliacaoController {
  // Criar avaliação
  async create(req, res) {
    try {
      const { nota, comentario, produtoId } = req.body;

      if (!nota || !produtoId) {
        return res.status(400).json({ error: "Nota e ID do produto são obrigatórios." });
      }

      if (nota < 1 || nota > 5) {
        return res.status(400).json({ error: "A nota deve estar entre 1 e 5." });
      }

      const avaliacao = await AvaliacaoModel.create({
        nota,
        comentario,
        usuarioId: req.userId,
        produtoId
      });

      res.status(201).json({
        message: "Avaliação criada com sucesso.",
        avaliacao
      });
    } catch (error) {
      res.status(500).json({ error: `Erro ao criar avaliação: ${error.message}` });
    }
  }

  // Buscar todas as avaliações
  async getAll(req, res) {
    try {
      const avaliacoes = await AvaliacaoModel.getAll();

      res.status(200).json({
        message: "Avaliações encontradas com sucesso.",
        avaliacoes
      });
    } catch (error) {
      res.status(500).json({ error: `Erro ao buscar avaliações: ${error.message}` });
    }
  }

  // Buscar avaliação por ID
  async getById(req, res) {
    try {
      const { id } = req.params;

      const avaliacao = await AvaliacaoModel.getById(id);

      if (!avaliacao) {
        return res.status(404).json({ error: "Avaliação não encontrada." });
      }

      res.status(200).json({
        message: `Avaliação com ID ${id} encontrada com sucesso.`,
        avaliacao
      });
    } catch (error) {
      res.status(500).json({ error: `Erro ao buscar avaliação: ${error.message}` });
    }
  }

  // Atualizar avaliação
  async update(req, res) {
    try {
      const { id } = req.params;
      const { nota, comentario } = req.body;

      if (!nota) {
        return res.status(400).json({ error: "Nota é obrigatória." });
      }

      if (nota < 1 || nota > 5) {
        return res.status(400).json({ error: "A nota deve estar entre 1 e 5." });
      }

      const avaliacao = await AvaliacaoModel.update(id, { nota, comentario });

      res.status(200).json({
        message: `Avaliação com ID ${id} atualizada com sucesso.`,
        avaliacao
      });
    } catch (error) {
      res.status(500).json({ error: `Erro ao atualizar avaliação: ${error.message}` });
    }
  }

  // Deletar avaliação
  async delete(req, res) {
    try {
      const { id } = req.params;

      await AvaliacaoModel.delete(id);

      res.status(200).json({ message: `Avaliação com ID ${id} deletada com sucesso.` });
    } catch (error) {
      res.status(500).json({ error: `Erro ao deletar avaliação: ${error.message}` });
    }
  }
}

export default new AvaliacaoController();