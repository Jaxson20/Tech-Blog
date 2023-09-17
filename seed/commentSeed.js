// seeds/comment-seeds.js
const { CommentModel } = require('../models');

const commentData = [
  {
    content: 'Great post!',
    user_id: 1, // User ID for the commenter (adjust as needed).
    blog_post_id: 1, // Blog post ID for the associated post (adjust as needed).
  },
  {
    content: 'I have a question about this topic.',
    user_id: 2, // User ID for the commenter (adjust as needed).
    blog_post_id: 1, // Blog post ID for the associated post (adjust as needed).
  },
  {
    content: 'Interesting insights!',
    user_id: 3, // User ID for the commenter (adjust as needed).
    blog_post_id: 2, // Blog post ID for the associated post (adjust as needed).
  },
  // Add more comments as needed.
];

const seedComments = () => CommentModel.bulkCreate(commentData);

module.exports = seedComments;

