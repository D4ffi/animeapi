// src/middleware/genreValidator.js

/**
 * Middleware para validar datos de género en las solicitudes
 */
const genreValidator = {
    /**
     * Valida los datos al crear o actualizar un género
     */
    validateGenreData(req, res, next) {
        const { name, description } = req.body;
        const errors = [];

        // Validar nombre (requerido)
        if (!name || name.trim() === '') {
            errors.push('El nombre del género es obligatorio');
        }

        // Validar que el nombre no sea demasiado largo
        if (name && name.length > 100) {
            errors.push('El nombre del género no puede exceder los 100 caracteres');
        }

        // Validar descripción (opcional)
        if (description && description.length > 1000) {
            errors.push('La descripción no puede exceder los 1000 caracteres');
        }

        // Si hay errores, devolver respuesta de error
        if (errors.length > 0) {
            const error = new Error('Datos de género inválidos');
            error.statusCode = 400;
            error.details = errors;
            return next(error);
        }

        // Si todo está bien, continuar
        next();
    },

    /**
     * Valida que el ID sea un número entero válido
     */
    validateGenreId(req, res, next) {
        const id = req.params.id;

        if (!id || isNaN(parseInt(id)) || parseInt(id) <= 0) {
            const error = new Error('ID de género inválido');
            error.statusCode = 400;
            return next(error);
        }

        // Si todo está bien, continuar
        next();
    }
};

module.exports = genreValidator;