// Configuração da conexão com o banco de dados utilizando o Knex.
const knex = require('knex');
const knexConfig = require('../../../knexfile');

// Inicializa a conexão com o banco de dados com base no ambiente de desenvolvimento.
const db = knex(knexConfig.development);

// Exporta a instância do banco de dados para ser utilizada em outras partes da aplicação.
module.exports = db;