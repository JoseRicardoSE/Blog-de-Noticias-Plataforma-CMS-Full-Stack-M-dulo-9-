import { Router } from 'express';
import { getAllArticles, getArticleById, createArticle, updateArticle, deleteArticle } from '../controllers/articleController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';
import { verifyAdmin } from '../middlewares/adminMiddleware.js';
import { validateArticle } from '../validators/articleValidator.js';

const router = Router();

router.get('/', getAllArticles);
router.get('/:id', getArticleById);

// Ruta protegida (Solo Admin)
router.post('/', verifyToken, verifyAdmin, validateArticle, createArticle);
router.put('/:id', verifyToken, verifyAdmin, validateArticle, updateArticle);
router.delete('/:id', verifyToken, verifyAdmin, deleteArticle);

export default router;
