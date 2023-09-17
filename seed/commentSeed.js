const { CommentModel } = require('../models');

const commentData = [
  {
    content: 'Great post!',
    user_id: 1, 
    blog_post_id: 1, 
  },
  {
    content: 'I have a question about this topic.',
    user_id: 2, 
    blog_post_id: 1, 
  },
  {
    content: 'Interesting insights!',
    user_id: 3, 
    blog_post_id: 2, 
  },
];

const seedComments = () => CommentModel.bulkCreate(commentData);

module.exports = seedComments;

