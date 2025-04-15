// src/middleware/jsonParser.js
const express = require('express');

/**
 * Middleware para procesar automáticamente cuerpos JSON en las solicitudes
 * Configura límites para prevenir ataques de denegación de servicio
 */
const jsonParser = express.json({
    limit: '1mb', // Limita el tamaño de las solicitudes JSON
    strict: true // Solo acepta arrays y objetos válidos según la especificación JSON
});

module.exports = jsonParser;