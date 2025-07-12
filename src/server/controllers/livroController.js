const Joi = require('joi');
const db = require('../db/database.js');

/**
 * @description Obtém todos os livros do banco de dados.
 * @param {object} req - O objeto de requisição.
 * @param {object} res - O objeto de resposta.
 * @param {function} next - A próxima função de middleware.
 */
const getLivros = async (req, res, next) => {
  try {
    const livros = await db('livros').select('*');
    res.json(livros);
  } catch (error) {
    next({ status: 500, message: 'Erro ao buscar livros.', error });
  }
};

/**
 * @description Obtém um livro específico por ID do banco de dados.
 * @param {object} req - O objeto de requisição.
 * @param {object} res - O objeto de resposta.
 * @param {function} next - A próxima função de middleware.
 */
const getLivroById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const livro = await db('livros').where({ id }).first();
    if (livro) {
      res.json(livro);
    } else {
      next({ status: 404, message: 'Livro não encontrado.' });
    }
  } catch (error) {
    next({ status: 500, message: 'Erro ao buscar o livro.', error });
  }
};

/**
 * @description Cria um novo livro no banco de dados após validação dos dados.
 * @param {object} req - O objeto de requisição.
 * @param {object} res - O objeto de resposta.
 * @param {function} next - A próxima função de middleware.
 */
const createLivro = async (req, res, next) => {
  try {
    const schema = Joi.object({
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

    const { error, value } = schema.validate(req.body);
    if (error) {
      return next({ status: 400, message: error.details[0].message });
    }

    const [newLivro] = await db('livros').insert(value).returning('*');
    res.status(201).json(newLivro);
  } catch (error) {
    if (error.code === 'SQLITE_CONSTRAINT') {
      return next({ status: 409, message: 'Já existe um livro com o ID fornecido.' });
    }
    next({ status: 500, message: 'Erro ao criar o livro.', error });
  }
};

/**
 * @description Atualiza um livro existente no banco de dados após validação dos dados.
 * @param {object} req - O objeto de requisição.
 * @param {object} res - O objeto de resposta.
 * @param {function} next - A próxima função de middleware.
 */
const updateLivro = async (req, res, next) => {
  try {
    const { id } = req.params;
    const schema = Joi.object({
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

    const { error, value } = schema.validate(req.body);
    if (error) {
      return next({ status: 400, message: error.details[0].message });
    }

    if (Object.keys(value).length === 0) {
      return next({ status: 400, message: 'Nenhum campo para atualizar.' });
    }

    const [updatedLivro] = await db('livros').where({ id }).update(value).returning('*');
    if (updatedLivro) {
      res.json(updatedLivro);
    } else {
      next({ status: 404, message: 'Livro não encontrado.' });
    }
  } catch (error) {
    next({ status: 500, message: 'Erro ao atualizar o livro.', error });
  }
};

/**
 * @description Deleta um livro do banco de dados por ID.
 * @param {object} req - O objeto de requisição.
 * @param {object} res - O objeto de resposta.
 * @param {function} next - A próxima função de middleware.
 */
const deleteLivro = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedCount = await db('livros').where({ id }).del();
    if (deletedCount > 0) {
      res.status(204).send();
    } else {
      next({ status: 404, message: 'Livro não encontrado.' });
    }
  } catch (error) {
    next({ status: 500, message: 'Erro ao deletar o livro.', error });
  }
};

module.exports = {
  getLivros,
  getLivroById,
  createLivro,
  updateLivro,
  deleteLivro,
};