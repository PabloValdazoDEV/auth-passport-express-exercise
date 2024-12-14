const prisma = require('../prisma/prisma.js')

function isAuthenticated(req, res, next) {
  if (req.user) {
    return next();
  }

  res.redirect('/auth/login');
}
function  redirectLogin  (req, res, next){
  if(req.user !== undefined){
    res.redirect("/post/foro")
  }
  return next()
}

function prueba (req, res, next) {

  const rutas = ['/auth/login', '/auth/register', '/auth/logout','/post/foro','/post/create']

  if(rutas.includes(req.path)){
    return next()
  }

  if(!req.session || !req.session.user){
    return res.redirect("/auth/login")
  }
  next()

}




module.exports = { isAuthenticated, redirectLogin, prueba };