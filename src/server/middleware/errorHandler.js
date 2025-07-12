// src/server/middleware/errorHandler.js

/**
 * @description Middleware de tratamento de erros para a aplicação.
 * @param {object} err - O objeto de erro.
 * @param {object} req - O objeto de requisição.
 * @param {object} res - O objeto de resposta.
 * @param {function} next - A próxima função de middleware.
 */
const errorHandler = (err, req, res, next) => {
  const statusCode = err.status || 500;
  const message = err.message || 'Ocorreu um erro inesperado.';

  // Log do erro para depuração
  console.error({
    timestamp: new Date().toISOString(),
    statusCode,
    message,
    error: err.error,
    stack: err.stack,
  });

  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message,
  });
};

module.exports = errorHandler;