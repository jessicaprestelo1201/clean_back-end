const express = require('express');
const router = express.Router();
const postRoutes = require('./api/post.routes');

router.use('/api/posts', postRoutes);

module.exports = router;