const router = require('express').Router();
const { BlogPostModel, UserModel, CommentModel } = require('../models');
const withAuth = require('./authMiddleware'); 

// Route to display all blog posts
router.get('/', async (req, res) => {
  try {
    const blogPosts = await BlogPostModel.findAll({
      include: [
        {
          model: UserModel,
          attributes: ['username'],
        },
        {
          model: CommentModel,
          attributes: ['content', 'created_at'],
          include: {
            model: UserModel,
            attributes: ['username'],
          },
        },
      ],
    });

    // Render the homepage with the retrieved blog posts
    res.render('homepage', { blogPosts });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Route to display a single blog post by ID
router.get('/post/:id', async (req, res) => {
  try {
    const blogPost = await BlogPostModel.findByPk(req.params.id, {
      include: [
        {
          model: UserModel,
          attributes: ['username'],
        },
        {
          model: CommentModel,
          attributes: ['content', 'created_at'],
          include: {
            model: UserModel,
            attributes: ['username'],
          },
        },
      ],
    });

    // Render the blog post details page
    res.render('single-blog-post', { blogPost });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Protected route to create a new blog post
router.get('/new', withAuth, (req, res) => {
  res.render('new-blog-post'); 
});

// Protected route to edit an existing blog post
router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    const blogPost = await BlogPostModel.findByPk(req.params.id);

    res.render('edit-blog-post', { blogPost });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Protected route to create (POST request)
router.post('/new', withAuth, async (req, res) => {
    try {
      const newBlogPost = await BlogPostModel.create({
        title: req.body.title,
        content: req.body.content,
        user_id: req.session.user_id, 
      });
  
      // Redirect 
      res.redirect(`/post/${newBlogPost.id}`);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  });
  
  // Protected route to update (PUT request)
  router.put('/edit/:id', withAuth, async (req, res) => {
    try {
      const updatedBlogPost = await BlogPostModel.update(
        {
          title: req.body.title,
          content: req.body.content,
        },
        {
          where: {
            id: req.params.id, 
          },
        }
      );
  
      // Check if the update was successful
      if (updatedBlogPost[0] === 0) {
        res.status(404).json({ message: 'Blog post not found' });
      } else {
        // Redirect 
        res.redirect(`/post/${req.params.id}`);
      }
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  });
  
  // Protected route to (DELETE request)
  router.delete('/delete/:id', withAuth, async (req, res) => {
    try {
      const deletedBlogPost = await BlogPostModel.destroy({
        where: {
          id: req.params.id, 
          user_id: req.session.user_id, 
        },
      });
  
      // Check if the deletion was successful
      if (!deletedBlogPost) {
        res.status(404).json({ message: 'Blog post not found or unauthorized' });
      } else {
        // Redirect to the homepage or another desired action after deletion
        res.redirect('/');
      }
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  });
  
  module.exports = router;
  


