export const verifyAdmin = (req, res, next) => {
  // Asegurarse de que este middleware se use DESPUÉS de verifyToken
  if (!req.user) {
    return res.status(401).json({ error: 'Usuario no autenticado.' });
  }

  // Verificar rol
  if (req.user.rol !== 'admin') {
    return res.status(403).json({ error: 'Acceso denegado. Se requieren permisos de administrador.' });
  }

  next();
};
