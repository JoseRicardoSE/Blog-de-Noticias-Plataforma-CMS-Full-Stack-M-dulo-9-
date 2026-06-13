import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const Article = sequelize.define('Article', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  copete: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  contenido: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  categoria: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  imagen: {
    type: DataTypes.STRING, // URL de la imagen
    allowNull: true,
  },
  // author_id se creará con la asociación
}, {
  timestamps: true,
});
