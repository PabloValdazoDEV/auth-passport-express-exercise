const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const passport = require('passport');
const prisma = require('../prisma/prisma.js')

// Ruta de registro
router.post('/register', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await prisma.user.create({
      data: {
        username: req.body.username,
        password: hashedPassword
      }
    });
    res.redirect('/auth/post');
  } catch (error) {
    console.log(error)
    res.redirect('/auth/register');
  }
});

// Ruta de inicio de sesión
router.post('/login', passport.authenticate('local', {
  successRedirect: '/post/foro',
  failureRedirect: '/auth/login',
  failureFlash: true,
}));

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/register', (req, res) => {
  res.render('register');
});


module.exports = router;