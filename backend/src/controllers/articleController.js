import { Article, User, Comment } from '../models/index.js';
import { Op } from 'sequelize';

export const getAllArticles = async (req, res) => {
  try {
    const { categoria, search, page = 1, limit = 10 } = req.query;
    
    const whereClause = {};
    if (categoria) {
      whereClause.categoria = categoria;
    }
    if (search) {
      // Usamos iLike para búsquedas insensibles a mayúsculas/minúsculas en PostgreSQL
      // Ampliamos la búsqueda para que no solo busque en el título, sino también en el copete y el contenido
      whereClause[Op.or] = [
        { titulo: { [Op.iLike]: `%${search}%` } },
        { copete: { [Op.iLike]: `%${search}%` } },
        { contenido: { [Op.iLike]: `%${search}%` } }
      ];
    }

    const offset = (page - 1) * limit;

    const { count, rows } = await Article.findAndCountAll({
      where: whereClause,
      order: [['createdAt', 'DESC']],
      limit: parseInt(limit),
      offset: parseInt(offset),
      include: [
        { model: User, as: 'author', attributes: ['id', 'nombre'] }
      ]
    });

    res.json({
      data: rows,
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page)
    });
  } catch (error) {
    console.error('Error al obtener noticias:', error);
    res.status(500).json({ error: 'Error al obtener las noticias.' });
  }
};

export const getArticleById = async (req, res) => {
  try {
    const { id } = req.params;

    const article = await Article.findByPk(id, {
      include: [
        { model: User, as: 'author', attributes: ['id', 'nombre'] }
      ]
    });

    if (!article) {
      return res.status(404).json({ error: 'Noticia no encontrada.' });
    }

    res.json(article);
  } catch (error) {
    console.error('Error al obtener la noticia:', error);
    res.status(500).json({ error: 'Error al obtener la noticia.' });
  }
};

export const createArticle = async (req, res) => {
  try {
    const { titulo, copete, contenido, categoria, imagen } = req.body;
    const author_id = req.user.id; // Viene del token decodificado

    const newArticle = await Article.create({
      titulo,
      copete,
      contenido,
      categoria,
      imagen,
      author_id
    });

    res.status(201).json({ message: 'Noticia creada exitosamente', article: newArticle });
  } catch (error) {
    console.error('Error al crear noticia:', error);
    res.status(500).json({ error: 'Error al crear la noticia.' });
  }
};

export const updateArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, copete, contenido, categoria, imagen } = req.body;

    const article = await Article.findByPk(id);
    if (!article) {
      return res.status(404).json({ error: 'Noticia no encontrada.' });
    }

    await article.update({ titulo, copete, contenido, categoria, imagen });

    res.json({ message: 'Noticia actualizada exitosamente', article });
  } catch (error) {
    console.error('Error al actualizar noticia:', error);
    res.status(500).json({ error: 'Error al actualizar la noticia.' });
  }
};

export const deleteArticle = async (req, res) => {
  try {
    const { id } = req.params;

    const article = await Article.findByPk(id);
    if (!article) {
      return res.status(404).json({ error: 'Noticia no encontrada.' });
    }

    await article.destroy();
    res.json({ message: 'Noticia eliminada exitosamente' });
  } catch (error) {
    console.error('Error al eliminar noticia:', error);
    res.status(500).json({ error: 'Error al eliminar la noticia.' });
  }
};

