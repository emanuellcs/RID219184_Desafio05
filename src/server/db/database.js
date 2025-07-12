// Configuração da conexão com o banco de dados utilizando o Knex.
import knex from 'knex';
import knexConfig from '../../../knexfile.cjs';

// Inicializa a conexão com o banco de dados com base no ambiente de desenvolvimento.
const db = knex(knexConfig.development);

// Exporta a instância do banco de dados para ser utilizada em outras partes da aplicação.
export default db;