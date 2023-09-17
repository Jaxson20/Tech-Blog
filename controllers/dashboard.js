const router = require('express').Router();
const { BlogPostModel, UserModel, CommentModel } = require('../models');
const withAuth = require('./authMiddleware'); 

// Protected route to display the (GET request)
router.get('/', withAuth, async (req, res) => {
  try {
    const userBlogPosts = await BlogPostModel.findAll({
      where: {
        user_id: req.session.user_id, 
      },
      include: [
        {
          model: UserModel,
          attributes: ['username'],
        },
        {
          model: CommentModel,
          attributes: ['content', 'created_at'],
        },
      ],
    });

    res.render('dashboard', { userBlogPosts });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Protected route to create a (GET request)
router.get('/new', withAuth, (req, res) => {
  res.render('new-blog-post'); 
});

// Protected route to edit a (GET request)
router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    const blogPost = await BlogPostModel.findByPk(req.params.id);

    if (!blogPost || blogPost.user_id !== req.session.user_id) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    res.render('edit-blog-post', { blogPost });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Protected route to create a (POST request)
router.post('/new', withAuth, async (req, res) => {
  try {
    const newBlogPost = await BlogPostModel.create({
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.user_id, 
    });

    res.redirect(`/post/${newBlogPost.id}`);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Protected route to edit an existing blog post (PUT request)
router.put('/edit/:id', withAuth, async (req, res) => {
  try {
    const updatedBlogPost = await BlogPostModel.update(
      {
        title: req.body.title,
        content: req.body.content,
      },
      {
        where: {
          id: req.params.id, // Find the blog post by ID
        },
      }
    );

    // Check if the update was successful
    if (updatedBlogPost[0] === 0) {
      res.status(404).json({ message: 'Blog post not found' });
    } else {
      res.redirect(`/post/${req.params.id}`);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Protected route to delete a (DELETE request)
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
      res.redirect('/');
    }
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
