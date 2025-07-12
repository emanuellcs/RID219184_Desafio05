// Configuração do servidor Express.
const express = require('express');
const cors = require('cors');
const routes = require('./routes.js');
const errorHandler = require('./middleware/errorHandler.js');

const app = express();
const port = process.env.PORT || 3002;

// Configura middlewares para CORS e parsing de JSON.
app.use(cors());
app.use(express.json());
app.use('/api', routes);

// Middleware para tratamento de erros.
app.use(errorHandler);

// Inicia o servidor.
const server = app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

// Exporta a aplicação e o servidor para fins de teste.
module.exports = { app, server };