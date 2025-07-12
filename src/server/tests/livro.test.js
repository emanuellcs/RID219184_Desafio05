import request from 'supertest';
import { app, server } from '../server.js';
import db from '../db/database.js';

describe('API de Livros', () => {
  beforeEach(async () => {
    // Limpa a tabela de livros antes de cada teste.
    await db('livros').del();
  });

  afterAll(async () => {
    // Fecha a conexão com o banco de dados e o servidor após todos os testes.
    await db.destroy();
    server.close();
  });

  it('deve retornar um array vazio se não houver livros', async () => {
    const res = await request(app).get('/api/livros');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual([]);
  });

  it('deve criar um novo livro com dados válidos', async () => {
    const newBook = {
      id: 1,
      titulo: 'Livro de Teste 1',
      numero_paginas: 100,
      isbn: '9781234567890',
      editora: 'Editora de Teste',
    };
    const res = await request(app).post('/api/livros').send(newBook);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual(expect.objectContaining(newBook));
  });

  it('deve retornar 409 para ID duplicado', async () => {
    const newBook = {
      id: 1,
      titulo: 'Livro de Teste 1',
      numero_paginas: 100,
      isbn: '9781234567890',
      editora: 'Editora de Teste',
    };
    await request(app).post('/api/livros').send(newBook);
    const res = await request(app).post('/api/livros').send(newBook);
    expect(res.statusCode).toEqual(409);
    expect(res.body.message).toContain('Já existe um livro com o ID fornecido.');
  });

  it('deve retornar 400 para campo obrigatório ausente (titulo)', async () => {
    const invalidBook = {
      id: 2,
      numero_paginas: 100,
      isbn: '9781234567890',
      editora: 'Editora de Teste',
    };
    const res = await request(app).post('/api/livros').send(invalidBook);
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toContain('O campo título é obrigatório.');
  });

  it('deve retornar 400 para formato de ISBN inválido', async () => {
    const invalidBook = {
      id: 3,
      titulo: 'Livro de Teste 3',
      numero_paginas: 100,
      isbn: '123',
      editora: 'Editora de Teste',
    };
    const res = await request(app).post('/api/livros').send(invalidBook);
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toContain('O campo ISBN deve conter 13 dígitos numéricos.');
  });

  it('deve retornar um livro específico por ID', async () => {
    const newBook = {
      id: 1,
      titulo: 'Livro de Teste 1',
      numero_paginas: 100,
      isbn: '9781234567890',
      editora: 'Editora de Teste',
    };
    await request(app).post('/api/livros').send(newBook);
    const res = await request(app).get('/api/livros/1');
    expect(res.statusCode).toEqual(200);
    expect(res.body.id).toEqual(1);
  });

  it('deve retornar 404 para um ID inexistente', async () => {
    const res = await request(app).get('/api/livros/999');
    expect(res.statusCode).toEqual(404);
    expect(res.body.message).toContain('Livro não encontrado');
  });

  it('deve atualizar um livro existente com dados válidos', async () => {
    const newBook = {
      id: 1,
      titulo: 'Livro de Teste 1',
      numero_paginas: 100,
      isbn: '9781234567890',
      editora: 'Editora de Teste',
    };
    await request(app).post('/api/livros').send(newBook);
    const updatedBook = {
      id: 2,
      titulo: 'Livro de Teste 1 Atualizado',
      numero_paginas: 120,
    };
    const res = await request(app).put('/api/livros/1').send(updatedBook);
    expect(res.statusCode).toEqual(200);
    expect(res.body.id).toEqual(2);
    expect(res.body.titulo).toEqual('Livro de Teste 1 Atualizado');
    expect(res.body.numero_paginas).toEqual(120);
  });

  it('deve retornar 400 para numero_paginas inválido', async () => {
    const invalidUpdate = {
      numero_paginas: 0,
    };
    const res = await request(app).put('/api/livros/1').send(invalidUpdate);
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toContain('O campo número de páginas deve ser maior que 0.');
  });

  it('deve retornar 400 se nenhum campo for fornecido para atualização', async () => {
    const noFieldsUpdate = {};
    const res = await request(app).put('/api/livros/1').send(noFieldsUpdate);
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toContain('Nenhum campo para atualizar.');
  });

  it('deve deletar um livro existente', async () => {
    const newBook = {
      id: 1,
      titulo: 'Livro de Teste 1',
      numero_paginas: 100,
      isbn: '9781234567890',
      editora: 'Editora de Teste',
    };
    await request(app).post('/api/livros').send(newBook);
    const res = await request(app).delete('/api/livros/1');
    expect(res.statusCode).toEqual(204);
  });

  it('deve retornar 404 para um ID inexistente na exclusão', async () => {
    const res = await request(app).delete('/api/livros/999');
    expect(res.statusCode).toEqual(404);
    expect(res.body.message).toContain('Livro não encontrado');
  });
});