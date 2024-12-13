const prisma = require('../prisma/prisma.js')

function isAuthenticated(req, res, next) {
  if (req.user) {
    return next();
  }

  res.redirect('/auth/login');
}
async function  redirectLogin  (req, res, next){
  if(req.user !== undefined){
    res.redirect("/post/foro")
  }
  return next()
}

module.exports = { isAuthenticated, redirectLogin };
undefined