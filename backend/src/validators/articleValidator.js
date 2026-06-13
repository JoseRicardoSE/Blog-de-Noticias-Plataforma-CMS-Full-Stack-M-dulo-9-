import { check } from 'express-validator';
import { validateResult } from '../middlewares/validateHelper.js';

export const validateArticle = [
  check('titulo')
    .exists().withMessage('El título es requerido')
    .notEmpty().withMessage('El título no puede estar vacío')
    .isString().withMessage('El título debe ser texto')
    .isLength({ max: 100 }).withMessage('El título no puede exceder los 100 caracteres')
    .trim()
    .escape(),
  check('copete')
    .exists().withMessage('El copete es requerido')
    .notEmpty().withMessage('El copete no puede estar vacío')
    .isString()
    .isLength({ max: 250 }).withMessage('El copete no puede exceder los 250 caracteres')
    .trim()
    .escape(),
  check('contenido')
    .exists().withMessage('El contenido es requerido')
    .notEmpty().withMessage('El contenido no puede estar vacío')
    .isString()
    .isLength({ max: 5000 }).withMessage('El contenido no puede exceder los 5000 caracteres')
    .trim()
    .escape(),
  check('categoria')
    .exists().withMessage('La categoría es requerida')
    .notEmpty().withMessage('La categoría no puede estar vacía')
    .isString()
    .trim()
    .escape(),
  check('imagen')
    .optional({ checkFalsy: true }) // Permite null o string vacío
    .isURL().withMessage('La imagen debe ser una URL válida'),
  (req, res, next) => validateResult(req, res, next)
];
