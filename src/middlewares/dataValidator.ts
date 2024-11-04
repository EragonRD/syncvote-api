import { body } from 'express-validator';

export const validateCreateUser = [
  body('email').isEmail().withMessage('Email is required'),
  body('password').notEmpty().withMessage('Password is required'),
  body('username').notEmpty().withMessage('Username is required'),
];

export const validateLoginUser = [
  body('email').isEmail().withMessage('Email is required'),
  body('password').notEmpty().withMessage('Password is required'),
];

export const validateCreatePost = [
  body('title')
    .notEmpty()
    .withMessage('Title is required')
    .isString()
    .withMessage('Title must be a string'),
  body('description')
    .notEmpty()
    .withMessage('Description is required')
    .isString()
    .withMessage('Description must be a string'),
  body('categories')
    .isArray({ min: 1 })
    .withMessage('At least one category is required')
    .custom((categories) =>
      categories.every((category: string) => typeof category === 'string')
    )
    .withMessage('All categories must be strings'),
];

export const validateUpdateUser = [
  body('email').optional().isEmail().withMessage('Must be a valid email'),
  body('username').optional().isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
  
];
