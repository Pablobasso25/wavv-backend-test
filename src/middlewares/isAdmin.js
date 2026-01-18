export const isAdmin = (req, res, next) => {
  // req.user viene cargado desde el middleware authRequired
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ 
      message: "Acceso denegado: Se requieren permisos de administrador" 
    });
  }
  // Si es admin, lo deja pasar al controlador
  next();
};