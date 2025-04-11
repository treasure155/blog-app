// middleware/auth.js

module.exports.protect = (req, res, next) => {
    if (req.session.admin) {
      return next();  // Allow access if the user is logged in
    }
    return res.redirect('/auth');  // Redirect to the login page if not authenticated
  };
  