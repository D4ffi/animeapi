// src/middleware/requestLogger.js

/**
 * Middleware para registrar información de cada solicitud
 * Útil para depuración y monitoreo
 */
function requestLogger(req, res, next) {
    const start = Date.now();

    // Registrar información básica de la solicitud
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);

    // Registrar cuerpo de la solicitud en desarrollo (opcional)
    if (process.env.NODE_ENV === 'development' && req.body) {
        console.log('Body:', JSON.stringify(req.body, null, 2));
    }

    // Cuando la respuesta termine, registrar el tiempo que tomó
    res.on('finish', () => {
        const duration = Date.now() - start;
        console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} ${res.statusCode} - ${duration}ms`);
    });

    next();
}

module.exports = requestLogger;