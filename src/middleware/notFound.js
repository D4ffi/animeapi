// src/middleware/notFound.js

/**
 * Middleware para manejar rutas que no existen
 * Debe colocarse después de todas las rutas definidas
 */
function notFound(req, res, next) {
    const error = new Error(`Ruta no encontrada: ${req.originalUrl}`);
    error.statusCode = 404;
    next(error);
}

module.exports = notFound;