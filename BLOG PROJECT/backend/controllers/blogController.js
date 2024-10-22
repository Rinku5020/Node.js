const Blog = require('../models/blog');

// Create a new post
exports.createPost = async (req, res) => {
  try {
    const newPost = await Blog.create({ ...req.body, author: req.user.id });
    res.status(201).json({ status: 'success', data: newPost });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

// Get all posts
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Blog.find().populate('author');
    res.status(200).json({ status: 'success', data: posts });
  } catch (err) {
    res.status(500).json({ status: 'fail', message: err.message });
  }
};

// Update an existing post
exports.updatePost = async (req, res) => {
  try {
    // Find the post by ID
    const post = await Blog.findById(req.params.id);

    // Check if the post exists
    if (!post) {
      return res.status(404).json({ status: 'fail', message: 'Post not found' });
    }

    // Check if the user is the author of the post (or has the right permissions)
    if (post.author.toString() !== req.user.id) {
      return res.status(403).json({ status: 'fail', message: 'You are not authorized to update this post' });
    }

    // Update the post fields (only update the title and content)
    post.title = req.body.title || post.title;
    post.content = req.body.content || post.content;

    // Save the updated post
    const updatedPost = await post.save();

    // Return the updated post
    res.status(200).json({ status: 'success', data: updatedPost });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};
