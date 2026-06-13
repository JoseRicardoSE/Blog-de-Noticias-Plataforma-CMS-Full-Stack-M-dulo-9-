import { check, body } from 'express-validator';
import { validateResult } from '../middlewares/validateHelper.js';
import { User } from '../models/index.js';

export const validateRegister = [
  check('nombre')
    .exists().withMessage('El nombre es requerido')
    .notEmpty().withMessage('El nombre no puede estar vacío')
    .isString().withMessage('El nombre debe ser texto')
    .isLength({ min: 3, max: 30 }).withMessage('El nombre debe tener entre 3 y 30 caracteres')
    .trim()
    .escape()
    .custom(async (value) => {
      const user = await User.findOne({ where: { nombre: value } });
      if (user) {
        throw new Error('El nombre de usuario ya está en uso');
      }
      return true;
    }),
  check('email')
    .exists().withMessage('El email es requerido')
    .isEmail().withMessage('Debe ser un email válido')
    .normalizeEmail(),
  check('password')
    .exists().withMessage('La contraseña es requerida')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{6,8}$/)
    .withMessage('La contraseña debe tener entre 6 y 8 caracteres, al menos una mayúscula, una minúscula y un símbolo especial'),
  (req, res, next) => validateResult(req, res, next)
];

export const validateLogin = [
  check('email')
    .exists().withMessage('El email es requerido')
    .isEmail().withMessage('Debe ser un email válido')
    .normalizeEmail(),
  check('password')
    .exists().withMessage('La contraseña es requerida')
    .notEmpty().withMessage('La contraseña no puede estar vacía'),
  (req, res, next) => validateResult(req, res, next)
];
