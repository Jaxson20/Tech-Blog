const router = require('express').Router();
const { CommentModel, UserModel } = require('../models');
const withAuth = require('./authMiddleware'); // Import authentication middleware

// Route to create a new comment (POST request)
router.post('/', withAuth, async (req, res) => {
  try {
    const newComment = await CommentModel.create({
      content: req.body.content,
      blogpost_id: req.body.blogpost_id,
      user_id: req.session.user_id, 
    });

    res.redirect(`/post/${req.body.blogpost_id}`);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Route to update an existing comment (PUT request)
router.put('/:id', withAuth, async (req, res) => {
  try {
    const updatedComment = await CommentModel.update(
      {
        content: req.body.content,
      },
      {
        where: {
          id: req.params.id, 
          user_id: req.session.user_id, 
        },
      }
    );

    // Check if the update was successful
    if (updatedComment[0] === 0) {
      res.status(404).json({ message: 'Comment not found' });
    } else {
      res.redirect(`/post/${req.body.blogpost_id}`);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Route to delete an existing comment (DELETE request)
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const deletedComment = await CommentModel.destroy({
      where: {
        id: req.params.id, 
        user_id: req.session.user_id, 
      },
    });

    // Check if the deletion was successful
    if (!deletedComment) {
      res.status(404).json({ message: 'Comment not found or unauthorized' });
    } else {
      res.redirect(`/post/${req.body.blogpost_id}`);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;

  
