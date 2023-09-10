// authMiddleware.js
function requireAuth(req, res, next) {
    if (req.session.user) {
      // El usuario está autenticado, permite continuar
      next();
    } else {
      // El usuario no está autenticado, devuelve un error
      res.status(401).json({ status: "error", message: "No estás autenticado" });
    }
  }
  
  export { requireAuth };
  