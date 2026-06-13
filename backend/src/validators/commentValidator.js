import { check } from 'express-validator';
import { validateResult } from '../middlewares/validateHelper.js';

export const validateComment = [
  check('contenido')
    .exists().withMessage('El contenido del comentario es requerido')
    .notEmpty().withMessage('El comentario no puede estar vacío')
    .isString().withMessage('El comentario debe ser texto')
    .isLength({ max: 250 }).withMessage('El comentario no puede exceder los 250 caracteres')
    .trim()
    .escape(),
  (req, res, next) => validateResult(req, res, next)
];
