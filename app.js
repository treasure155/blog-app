const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const dotenv = require('dotenv');
const path = require('path');
const multer = require('multer');
const { protect } = require('./middleware/auth');
const Post = require('./models/Post'); // Ensure that Post model is properly set

// Load environment variables
dotenv.config();

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Session setup
app.use(session({
  secret: process.env.SESSION_SECRET || 'defaultsecret',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 1 day
}));

// Static file storage (e.g., image uploads)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'public/uploads'));  // Ensure this folder exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
}).fields([
  { name: 'image', maxCount: 1 },
]);

// Route to show the login form
app.get('/auth', (req, res) => {
  res.render('auth', { error: null });
});

// Admin login handling
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
    req.session.admin = true;
    return res.redirect('/admin/dashboard');
  } else {
    return res.render('auth', { error: 'Invalid login credentials' });
  }
});

// Logout
app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/auth');
  });
});

// Admin Dashboard - Route to display all posts
app.get('/admin/dashboard', protect, async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.render('admin/dashboard', { posts });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Route to show the "Create New Post" form (addnew-post)
app.get('/admin/new-post', protect, (req, res) => {
  res.render('admin/new-post');  // Render the form to create a new post
});

// Handle new post submission (image and text)
app.post('/admin/new-post', protect, upload, async (req, res) => {
  try {
    const { title, content } = req.body;
    const image = req.files && req.files.image ? '/uploads/' + req.files.image[0].filename : '';  // Image path
  
    // Create a new post
    const newPost = new Post({ title, content, image });
    await newPost.save();
  
    // Redirect to the index page after saving the post
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Delete post route
// Delete post route (using GET method)
app.get('/admin/delete-post/:id', async (req, res) => {
  try {
    const postId = req.params.id;
    
    // Attempt to find and delete the post by its ID
    const post = await Post.findByIdAndDelete(postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Respond with success message
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (err) {
    console.error(err);
    // Respond with error message if something goes wrong
    res.status(500).json({ message: 'Error deleting post' });
  }
});


// Route for the index page that shows all posts
app.get('/', async (req, res) => {
  try {
    // Fetch all posts and sort by createdAt in descending order (latest first)
    const posts = await Post.find().sort({ createdAt: -1 });
    
    // Render the index page and pass the posts data
    res.render('index', { posts });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Route for displaying a full post
app.get('/post/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).send('Post not found');
    }
    res.render('post', { post }); // Render full post page
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Start server
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
