// models/index.js

const UserModel = require('./user');
const BlogPostModel = require('./BlogPost'); 
const CommentModel = require('./comment');

module.exports = {
  UserModel,
  BlogPostModel,
  CommentModel,
};
