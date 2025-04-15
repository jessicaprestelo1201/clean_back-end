const prisma = require('../utils/database');

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createPost = async (req, res) => {
  const { title, content } = req.body;
  try {
    const post = await prisma.post.create({
      data: { title, content }
    });
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};