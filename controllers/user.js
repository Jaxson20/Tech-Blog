const router = require('express').Router();
const { User } = require('../models');
const bcrypt = require('bcrypt');

// Route to render the login page
router.get('/login', (req, res) => {
  res.render('login'); 
});

// Route to handle user login
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { username: req.body.username } });

    if (!userData || !userData.checkPassword(req.body.password)) {
      res.status(400).json({ message: 'Incorrect username or password' });
      return;
    }

    req.session.user_id = userData.id;
    res.redirect('/dashboard'); 
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// user logout
router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/'); 
  });
});

module.exports = router;


