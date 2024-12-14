const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const passport = require('passport');
const prisma = require('../prisma/prisma.js')
const {redirectLogin} = require("../middleware/funcionMiddelware.js");

router.post('/register', async (req, res) => {
  try {
    if(!req.body.password && !req.body.username){
      res.status(500)
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await prisma.user.create({
      data: {
        username: req.body.username,
        password: hashedPassword,
      }
    });
    res.redirect('/post/foro');
  } catch (error) {
    console.log(error)
    res.redirect('/auth/register');
  }
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/post/foro',
  failureRedirect: '/auth/login',
  failureFlash: false,
}));

router.get('/login',redirectLogin,  (req, res) => {
  res.render('login');
});

router.get('/register',redirectLogin,  (req, res) => {
  res.render('register');
});

router.get('/github',redirectLogin,  passport.authenticate('github', { scope: ['user:email'] }));

router.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/post/foro');
  }
);

router.get('/logout', function(req, res, next){
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/auth/login');
  });
});

module.exports = router;