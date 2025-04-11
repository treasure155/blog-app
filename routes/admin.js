const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const multer = require('multer');
const path = require('path');
const { protect } = require('../middleware/auth'); // Ensure 'protect' middleware is working

// Image upload configuration
const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({ storage });

// Admin Dashboard - Route to Display All Posts
router.get('/admin/dashboard', protect, async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.render('admin/dashboard', { posts }); // Render the dashboard with posts
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Handle New Post Submission - Route to Add a New Post
router.post('/admin/new-post', protect, upload.single('image'), async (req, res) => {
  try {
    const { title, content } = req.body;
    const image = req.file ? '/uploads/' + req.file.filename : ''; // Image path

    // Create a new post
    const newPost = new Post({ title, content, image });
    await newPost.save();

    res.redirect('/admin/dashboard'); // Redirect back to the dashboard after saving the post
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router; // Fixed typo here: `module. Exports` should be `module.exports`
