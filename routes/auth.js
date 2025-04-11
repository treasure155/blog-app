const express = require('express');
const router = express.Router();
require('dotenv').config();

// Show login form
router.get('/auth', (req, res) => {
  res.render('auth', { error: null });
});

// Handle login
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    req.session.admin = true;
    return res.redirect('/admin/dashboard');
  } else {
    return res.render('auth', { error: 'Invalid login credentials' });
  }
});

// Logout
router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/auth');
  });
});

module.exports = router;
