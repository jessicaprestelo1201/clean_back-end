// Simulando um banco de dados em memória
let posts = [
  { id: 1, title: 'Primeiro Post', content: 'Conteúdo do primeiro post' },
  { id: 2, title: 'Segundo Post', content: 'Conteúdo do segundo post' }
];

class PostController {
  // GET /api/posts
  static async getAll(req, res) {
    try {
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar posts' });
    }
  }

  // POST /api/posts
  static async create(req, res) {
    try {
      const { title, content } = req.body;
      
      if (!title || !content) {
        return res.status(400).json({ error: 'Título e conteúdo são obrigatórios' });
      }

      const newPost = {
        id: posts.length + 1,
        title,
        content
      };

      posts.push(newPost);
      res.status(201).json(newPost);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar post' });
    }
  }
}

module.exports = PostController;