import fs from 'fs';
import path from 'path';
import pool from './database.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const sql = fs.readFileSync(path.join(__dirname, 'init.sql')).toString();

pool.query(sql, (err, res) => {
  if (err) {
    console.error('Erro ao inicializar o banco de dados', err.stack);
  } else {
    console.log('Banco de dados inicializado com sucesso.');
  }
  pool.end();
});