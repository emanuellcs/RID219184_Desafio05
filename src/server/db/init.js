const fs = require('fs');
const path = require('path');
const pool = require('./database.js');

const sql = fs.readFileSync(path.join(__dirname, 'init.sql')).toString();

pool.query(sql, (err, res) => {
  if (err) {
    console.error('Erro ao inicializar o banco de dados', err.stack);
  } else {
    console.log('Banco de dados inicializado com sucesso.');
  }
  pool.end();
});