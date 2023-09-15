// models/index.js

const UserModel = require('./user');
const BlogPostModel = require('./blogPost');
const CommentModel = require('./comment');

module.exports = {
  UserModel,
  BlogPostModel,
  CommentModel,
};
