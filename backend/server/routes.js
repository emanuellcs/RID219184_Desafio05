// Define as rotas da API para a gestão de livros.
import express from 'express';
import {
  getLivros,
  getLivroById,
  createLivro,
  updateLivro,
  deleteLivro,
} from './controllers/livroController.js';

const router = express.Router();

// Rota para listar todos os livros.
router.get('/livros', (req, res, next) => { console.log('GET /livros hit'); getLivros(req, res, next); });
// Rota para obter um livro específico pelo ID.
router.get('/livros/:id', getLivroById);
// Rota para adicionar um novo livro.
router.post('/livros', (req, res, next) => { console.log('POST /livros hit'); createLivro(req, res, next); });
// Rota para atualizar um livro existente pelo ID.
router.put('/livros/:id', updateLivro);
// Rota para remover um livro pelo ID.
router.delete('/livros/:id', deleteLivro);

export default router;