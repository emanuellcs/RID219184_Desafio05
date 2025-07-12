import Joi from 'joi';
import pool from '../db/database.js';

// Obtém todos os livros do banco de dados.
export const getLivros = async (req, res, next) => {
  try {
    const result = await pool.query('SELECT * FROM livros');
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
};

// Obtém um livro específico por ID do banco de dados.
export const getLivroById = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log('getLivroById: Requested ID:', id);
    const result = await pool.query('SELECT * FROM livros WHERE id = $1', [id]);
    if (result.rows.length > 0) {
      console.log('getLivroById: Result:', result.rows[0]);
      res.json(result.rows[0]);
    } else {
      console.log('getLivroById: Book not found for ID:', id);
      res.status(404).send('Livro não encontrado');
    }
  } catch (error) {
    console.error('Error in getLivroById:', error);
    next(error);
  }
};

// Cria um novo livro no banco de dados após validação dos dados.
export const createLivro = async (req, res, next) => {
  try {
    console.log('createLivro: Incoming request body:', req.body);
    // Define o esquema de validação para os dados do livro.
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

    // Valida os dados da requisição.
    const { error, value } = schema.validate(req.body);
    if (error) {
      console.log('createLivro: Joi validation error:', error.details[0].message);
      return res.status(400).json({ message: error.details[0].message });
    }

    const { id, titulo, numero_paginas, isbn, editora } = value;
    console.log('createLivro: Data to be inserted:', value);

    // Insere o novo livro no banco de dados.
    const result = await pool.query(
      'INSERT INTO livros (id, titulo, numero_paginas, isbn, editora) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [id, titulo, numero_paginas, isbn, editora]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

// Atualiza um livro existente no banco de dados após validação dos dados.
export const updateLivro = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log('updateLivro: Incoming request body:', req.body, 'ID:', id);
    // Define o esquema de validação para os dados de atualização do livro.
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

    // Valida os dados da requisição.
    const { error, value } = schema.validate(req.body);
    if (error) {
      console.log('updateLivro: Joi validation error:', error.details[0].message);
      return res.status(400).json({ message: error.details[0].message });
    }

    // Prepara a cláusula SET para a atualização do banco de dados.
    const fields = Object.keys(value);
    const values = Object.values(value);
    if (fields.length === 0) {
      return res.status(400).json({ message: 'Nenhum campo para atualizar.' });
    }
    console.log('updateLivro: Data to be updated:', value, 'for ID:', id);

    const setClause = fields.map((field, index) => `${field} = $${index + 1}`).join(', ');
    // Executa a atualização no banco de dados.
    const result = await pool.query(`UPDATE livros SET ${setClause} WHERE id = $${fields.length + 1} RETURNING *`, [...values, id]);
    // Verifica se o livro foi atualizado.
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).send('Livro não encontrado');
    }
  } catch (error) {
    next(error);
  }
};

// Deleta um livro do banco de dados por ID.
export const deleteLivro = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log('deleteLivro: ID to be deleted:', id);
    // Executa a exclusão no banco de dados.
    const result = await pool.query('DELETE FROM livros WHERE id = $1', [id]);
    // Verifica se o livro foi deletado.
    if (result.rowCount > 0) {
      console.log('deleteLivro: Book deleted for ID:', id);
      res.status(204).send();
    } else {
      console.log('deleteLivro: Book not found for ID:', id);
      res.status(404).send('Livro não encontrado');
    }
  } catch (error) {
    next(error);
  }
};