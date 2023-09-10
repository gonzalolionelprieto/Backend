import boom from 'boom';

// Middleware de manejo de errores personalizado
function errorMiddleware(err, req, res, next) {
  if (!err.isBoom) {
    // Si el error no es de tipo boom, crea un error boom con estado 500 (Error interno del servidor)
    err = boom.internal('Error interno del servidor', err);
  }

  const { output } = err;
  const statusCode = output.statusCode || 500;
  const payload = output.payload || { message: 'Error interno del servidor' };

  res.status(statusCode).json(payload);
}

export default errorMiddleware;
