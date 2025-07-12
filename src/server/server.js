// Configuração do servidor Express.
const express = require('express');
const cors = require('cors');
const routes = require('./routes.js');

const app = express();
const port = process.env.PORT || 3002;

// Configura middlewares para CORS e parsing de JSON.
app.use(cors());
app.use(express.json());
app.use('/api', routes);

// Middleware para tratamento de erros globais.
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo deu errado no servidor!');
});

// Start the server
app.listen(port, () => {
  console.log(`Servidor está sendo executado na porta ${port}`);
});

// Export the app for testing purposes
module.exports = app;