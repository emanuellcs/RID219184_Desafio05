// Configuração do servidor Express.
import express from 'express';
import cors from 'cors';
import routes from './routes.js';
import errorHandler from './middleware/errorHandler.js';

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
export { app, server };