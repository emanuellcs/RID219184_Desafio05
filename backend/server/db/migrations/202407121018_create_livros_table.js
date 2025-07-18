// Migration para criar a tabela 'livros' no banco de dados.
exports.up = function (knex) {
  // Cria a tabela 'livros' com as colunas especificadas.
  return knex.schema.createTable('livros', function (table) {
    // ID do livro, fornecido pelo usuário.
    table.integer('id').primary();
    // Título do livro, não pode ser nulo.
    table.string('titulo').notNullable();
    // Número de páginas do livro.
    table.integer('numero_paginas');
    // ISBN do livro.
    table.string('isbn');
    // Editora do livro.
    table.string('editora');
  });
};

// Desfaz a migration, deletando a tabela 'livros'.
exports.down = function (knex) {
  return knex.schema.dropTable('livros');
};