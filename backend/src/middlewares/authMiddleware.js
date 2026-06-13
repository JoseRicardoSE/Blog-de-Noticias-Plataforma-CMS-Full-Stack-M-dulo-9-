import jwt from 'jsonwebtoken';
import 'dotenv/config';

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  
  if (!authHeader) {
    return res.status(403).json({ error: 'No se proporcionó un token.' });
  }

  // Usualmente el header es: "Bearer TOKEN"
  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(403).json({ error: 'Formato de token inválido.' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Token inválido o expirado.' });
    }
    
    // Guardamos la info del usuario en la request para usarla en los controladores
    req.user = decoded;
    next();
  });
};
