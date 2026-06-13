import { Router } from 'express';
import { createComment, deleteComment, updateComment, getCommentsByArticle } from '../controllers/commentController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';
import { validateComment } from '../validators/commentValidator.js';

const router = Router();

// Endpoint para obtener comentarios de forma paginada
router.get('/:id/comentarios', getCommentsByArticle);

router.post('/:id/comentarios', verifyToken, validateComment, createComment);

// Rutas protegidas (Admin o el propio usuario)
router.delete('/:id/comentarios/:commentId', verifyToken, deleteComment);
router.put('/:id/comentarios/:commentId', verifyToken, validateComment, updateComment);

export default router;
