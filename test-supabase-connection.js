const pool = require('./src/server/db/supabase');

async function testSupabaseConnection() {
  let client;
  try {
    client = await pool.connect();
    const res = await client.query('SELECT 1+1 AS solution;');
    console.log('Conexão com Supabase bem-sucedida!');
    console.log('Resultado da consulta:', res.rows[0].solution);
  } catch (err) {
    console.error('Erro ao conectar ou consultar o Supabase:', err.message);
  } finally {
    if (client) {
      client.release();
      console.log('Conexão liberada de volta para o pool.');
    }
    process.exit();
  }
}

testSupabaseConnection();