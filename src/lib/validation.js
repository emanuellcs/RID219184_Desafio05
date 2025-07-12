import Joi from 'joi';

// Schema for creating a new book
export const bookCreateSchema = Joi.object({
  id: Joi.number().integer().required().messages({
    'any.required': 'O campo id é obrigatório.',
    'number.base': 'O campo id deve ser um número.',
    'number.integer': 'O campo id deve ser um número inteiro.',
  }),
  titulo: Joi.string().required().messages({
    'any.required': 'O campo título é obrigatório.',
    'string.empty': 'O campo título não pode estar vazio.',
  }),
  numero_paginas: Joi.number().integer().min(1).required().messages({
    'any.required': 'O campo número de páginas é obrigatório.',
    'number.base': 'O campo número de páginas deve ser um número.',
    'number.integer': 'O campo número de páginas deve ser um número inteiro.',
    'number.min': 'O campo número de páginas deve ser maior que 0.',
  }),
  isbn: Joi.string().pattern(new RegExp('^[0-9]{13}$')).required().messages({
    'any.required': 'O campo ISBN é obrigatório.',
    'string.empty': 'O campo ISBN não pode estar vazio.',
    'string.pattern.base': 'O campo ISBN deve conter 13 dígitos numéricos.',
  }),
  editora: Joi.string().required().messages({
    'any.required': 'O campo editora é obrigatório.',
    'string.empty': 'O campo editora não pode estar vazio.',
  }),
});

// Schema for updating an existing book
export const bookUpdateSchema = Joi.object({
  id: Joi.number().integer().messages({
    'number.base': 'O campo id deve ser um número.',
    'number.integer': 'O campo id deve ser um número inteiro.',
  }),
  titulo: Joi.string().messages({
    'string.empty': 'O campo título não pode estar vazio.',
  }),
  numero_paginas: Joi.number().integer().min(1).messages({
    'number.base': 'O campo número de páginas deve ser um número.',
    'number.integer': 'O campo número de páginas deve ser um número inteiro.',
    'number.min': 'O campo número de páginas deve ser maior que 0.',
  }),
  isbn: Joi.string().pattern(new RegExp('^[0-9]{13}$')).messages({
    'string.empty': 'O campo ISBN não pode estar vazio.',
    'string.pattern.base': 'O campo ISBN deve conter 13 dígitos numéricos.',
  }),
  editora: Joi.string().messages({
    'string.empty': 'O campo editora não pode estar vazio.',
  }),
});