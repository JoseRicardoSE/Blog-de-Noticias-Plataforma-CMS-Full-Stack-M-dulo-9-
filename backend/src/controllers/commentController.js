import { Comment, Article, User } from '../models/index.js';

export const createComment = async (req, res) => {
  try {
    const { id } = req.params; // ID de la noticia
    const { contenido } = req.body;
    const user_id = req.user.id;

    // Verificar que la noticia exista
    const article = await Article.findByPk(id);
    if (!article) {
      return res.status(404).json({ error: 'Noticia no encontrada.' });
    }

    const newComment = await Comment.create({
      contenido,
      article_id: id,
      user_id
    });

    res.status(201).json({ message: 'Comentario agregado', comment: newComment });
  } catch (error) {
    console.error('Error al crear comentario:', error);
    res.status(500).json({ error: 'Error al agregar el comentario.' });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;

    const comment = await Comment.findByPk(commentId);
    if (!comment) {
      return res.status(404).json({ error: 'Comentario no encontrado.' });
    }

    // Solo admin o el dueño del comentario pueden borrarlo
    if (req.user.rol !== 'admin' && req.user.id !== comment.user_id) {
      return res.status(403).json({ error: 'Acceso denegado. No tienes permisos para borrar este comentario.' });
    }

    await comment.destroy();
    res.json({ message: 'Comentario eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar comentario:', error);
    res.status(500).json({ error: 'Error al eliminar el comentario.' });
  }
};

export const updateComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { contenido } = req.body;

    const comment = await Comment.findByPk(commentId);
    if (!comment) {
      return res.status(404).json({ error: 'Comentario no encontrado.' });
    }

    // Solo admin o el dueño del comentario pueden editarlo
    if (req.user.rol !== 'admin' && req.user.id !== comment.user_id) {
      return res.status(403).json({ error: 'Acceso denegado. No tienes permisos para editar este comentario.' });
    }

    await comment.update({ contenido });
    res.json({ message: 'Comentario actualizado exitosamente' });
  } catch (error) {
    console.error('Error al actualizar comentario:', error);
    res.status(500).json({ error: 'Error al actualizar el comentario.' });
  }
};

export const getCommentsByArticle = async (req, res) => {
  try {
    const { id } = req.params; // ID de la noticia
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const { count, rows } = await Comment.findAndCountAll({
      where: { article_id: id },
      order: [['createdAt', 'DESC']],
      limit: parseInt(limit),
      offset: parseInt(offset),
      include: [
        { model: User, as: 'user', attributes: ['id', 'nombre'] }
      ]
    });

    res.json({
      data: rows,
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page)
    });
  } catch (error) {
    console.error('Error al obtener comentarios:', error);
    res.status(500).json({ error: 'Error al obtener los comentarios.' });
  }
};

