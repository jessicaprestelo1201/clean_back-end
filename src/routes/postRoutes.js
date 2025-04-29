const express = require('express');
const router = express.Router();
const PostController = require('../controllers/PostController');

// GET /api/posts
router.get('/posts', PostController.getAll);

// POST /api/posts
router.post('/posts', PostController.create);

module.exports = router;