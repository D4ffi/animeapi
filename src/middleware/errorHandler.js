    /**
 * Middleware para manejar errores de forma centralizada
 * Debe ser el último middleware en la cadena
 */
function errorHandler(err, req, res, next) {
    // Determinar el código de estado
    const statusCode = err.statusCode || 500;

    // Preparar el mensaje de error
    const errorResponse = {
        error: true,
        message: err.message || 'Error interno del servidor',
    };

    // En desarrollo, incluir el stack trace
    if (process.env.NODE_ENV !== 'production') {
        errorResponse.stack = err.stack;
    }

    // Registrar el error para depuración
    console.error(`[Error ${statusCode}]: ${err.message}`);
    console.error(err.stack);

    // Responder con el error
    res.status(statusCode).json(errorResponse);
}

module.exports = errorHandler;