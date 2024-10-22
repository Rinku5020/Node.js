const express = require('express');
const blogController = require('../controllers/blogController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const router = express.Router();

router
  router.get('/posts', blogController.getAllPosts);
  // router.post('/posts/:id', authMiddleware.protect, roleMiddleware.restrictTo('user'), blogController.createPost);
  router.post('/posts', authMiddleware.protect, roleMiddleware.restrictTo('user'), blogController.createPost);

// Route for editing a post (with :id)
router.put('/posts/:id', authMiddleware.protect, roleMiddleware.restrictTo('user'), blogController.updatePost);

module.exports = router;
