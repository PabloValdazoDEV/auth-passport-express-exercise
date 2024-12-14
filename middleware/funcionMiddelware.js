const prisma = require('../prisma/prisma.js')

function isAuthenticated(req, res, next) {
  if (req.user) {
    return next();
  }
  return res.redirect('/auth/login');
}
function  redirectLogin  (req, res, next){
  if(req.user !== undefined){
    res.redirect("/post/foro")
  }
  return next()
}

function proteccionRuta (req, res, next) {

  const rutas = ['/auth/login', '/auth/register', '/auth/logout','/post/foro', '/post/create', '/post/delete/']


  if(rutas.includes(req.path)){
    return next()
  }

  if(!req.session || !req.session.passport){
    return res.redirect("/auth/login")
  }
  return next();

}

module.exports = { isAuthenticated, redirectLogin, proteccionRuta };