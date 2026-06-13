import express from 'express';
import cors from 'cors';

// Rutas (se importarán aquí)
import authRoutes from './routes/authRoutes.js';
import articleRoutes from './routes/articleRoutes.js';
import commentRoutes from './routes/commentRoutes.js';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas Base
app.use('/api/auth', authRoutes);
app.use('/api/noticias', articleRoutes);
app.use('/api/noticias', commentRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ message: 'API Blog de Noticias Módulo 9 funcionando correctamente.' });
});

export { app };
