import db from './server/db/database.js';

async function countLivros() {
  try {
    const result = await db('livros').count('* as total');
    console.log(`Total records in 'livros' table: ${result[0].total}`);
  } catch (error) {
    console.error('Error counting records:', error);
  } finally {
    await db.destroy();
  }
}

countLivros();