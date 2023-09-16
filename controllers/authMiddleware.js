// controllers/authMiddleware.js
const withAuth = (req, res, next) => {
    // Check if the user is authenticated
    if (!req.session.user_id) {
      // If not authenticated, redirect to the login page or any other desired action
      res.redirect('/login'); // Replace with the actual login route
    } else {
      // If authenticated, continue to the next route handler
      next();
    }
  };
  
  module.exports = withAuth;
  