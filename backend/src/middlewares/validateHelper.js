import { validationResult } from 'express-validator';

export const validateResult = (req, res, next) => {
  try {
    validationResult(req).throw();
    return next();
  } catch (err) {
    return res.status(400).json({
      error: 'Error de validación de datos',
      details: err.array()
    });
  }
};
