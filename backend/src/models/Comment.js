import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const Comment = sequelize.define('Comment', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  contenido: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  // article_id y user_id se crearán con las asociaciones
}, {
  timestamps: true,
});
