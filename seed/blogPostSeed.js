// seeds/blog-post-seeds.js
const { BlogPostModel } = require('../models');

const blogPostData = [
  {
    title: 'Introduction to Tech Blogging',
    content: 'This is the first blog post about tech blogging.',
    user_id: 1, 
  },
  {
    title: 'The Latest Tech Trends',
    content: 'Here are some of the latest tech trends to watch out for.',
    user_id: 2, 
  },
  {
    title: 'Web Development Best Practices',
    content: 'Learn about best practices for web development.',
    user_id: 1, 
  },
];

const seedBlogPosts = () => BlogPostModel.bulkCreate(blogPostData);

module.exports = seedBlogPosts;

