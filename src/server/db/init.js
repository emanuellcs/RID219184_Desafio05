import knex from 'knex';
import knexfile from '../../../knexfile.cjs';

const environment = process.env.NODE_ENV || 'development';
const config = knexfile[environment];

async function initializeDatabase() {
  try {
    const db = knex(config);
    console.log('Executando migrações...');
    await db.migrate.latest();
    console.log('Migrações concluídas com sucesso.');

    // Se houver seeds no futuro, descomente a linha abaixo:
    // console.log('Executando seeds...');
    // await db.seed.run();
    // console.log('Seeds concluídas com sucesso.');

    await db.destroy();
    console.log('Conexão com o banco de dados fechada.');
  } catch (error) {
    console.error('Erro ao inicializar o banco de dados:', error);
    process.exit(1);
  }
}

initializeDatabase();