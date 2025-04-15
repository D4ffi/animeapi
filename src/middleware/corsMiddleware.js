// src/middleware/corsMiddleware.js
const cors = require('cors');

/**
 * Configuración de CORS para permitir solicitudes desde orígenes específicos
 * Especialmente útil si tienes un frontend separado que consume esta API
 */
const corsOptions = {
    origin: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    maxAge: 86400 // 24 horas en segundos
};

module.exports = cors(corsOptions);