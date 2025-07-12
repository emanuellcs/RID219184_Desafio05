const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const connectionString = process.env.SUPABASE_URL;

if (!connectionString) {
  console.error('Variável SUPABASE_URL não configurada.');
}

const pool = new Pool({
  connectionString: connectionString,
});

pool.on('error', (err) => {
  console.error('Erro inesperado no cliente ocioso', err);
  process.exit(-1);
});

module.exports = pool;