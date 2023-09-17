const authMiddleware = require('./authMiddleware');
const blogController = require('./blog');
const commentsController = require('./comments');
const dashboardController = require('./dashboard');
const errorMiddleware = require('./errorMiddleware');
const userController = require('./user');

module.exports = {
  authMiddleware,
  blogController,
  commentsController,
  dashboardController,
  errorMiddleware,
  userController,
};
