const express = require('express');
const router = express.Router();
const postRoutes = require('./api/post.routes');

// API Routes
router.use('/api', postRoutes);

module.exports = router;