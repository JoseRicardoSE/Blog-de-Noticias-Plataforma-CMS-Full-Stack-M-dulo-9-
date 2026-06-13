import { sequelize } from '../config/database.js';
import { User } from './User.js';
import { Article } from './Article.js';
import { Comment } from './Comment.js';

// Un usuario puede crear muchas noticias (autor)
User.hasMany(Article, { foreignKey: 'author_id', as: 'articles' });
Article.belongsTo(User, { foreignKey: 'author_id', as: 'author' });

// Una noticia puede tener muchos comentarios
Article.hasMany(Comment, { foreignKey: 'article_id', as: 'comments' });
Comment.belongsTo(Article, { foreignKey: 'article_id', as: 'article' });

// Un usuario puede escribir muchos comentarios
User.hasMany(Comment, { foreignKey: 'user_id', as: 'comments' });
Comment.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

export { sequelize, User, Article, Comment };
