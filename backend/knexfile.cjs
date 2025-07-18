// Arquivo de configuração do Knex para gerenciar as migrações e seeds do banco de dados.
const path = require('path');

module.exports = {
  // Ambiente de desenvolvimento
  development: {
    // Cliente do banco de dados
    client: 'sqlite3',
    // Configurações de conexão
    connection: {
      // Caminho para o arquivo do banco de dados SQLite
      filename: path.resolve(__dirname, 'server', 'db', 'database.sqlite'),
    },
    // Diretório para os arquivos de migração
    migrations: {
      directory: path.resolve(__dirname, 'server', 'db', 'migrations'),
    },
    // Diretório para os arquivos de seed
    seeds: {
      directory: path.resolve(__dirname, 'server', 'db', 'seeds'),
    },
    // Utiliza NULL como valor padrão
    useNullAsDefault: true,
  },
};