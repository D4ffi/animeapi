// src/middleware/animeValidator.js

/**
 * Middleware para validar datos de anime en las solicitudes
 */
const animeValidator = {
    /**
     * Valida los datos al crear o actualizar un anime
     */
    validateAnimeData(req, res, next) {
        const { title, episodes, releaseYear, rating } = req.body;

        const errors = [];

        // Validar título (requerido)
        if (!title || title.trim() === '') {
            errors.push('El título del anime es obligatorio');
        }

        // Validar número de episodios (si está presente)
        if (episodes !== undefined && (!Number.isInteger(episodes) || episodes < 0)) {
            errors.push('El número de episodios debe ser un entero positivo');
        }

        // Validar año de lanzamiento (si está presente)
        if (releaseYear !== undefined) {
            const currentYear = new Date().getFullYear();
            if (!Number.isInteger(releaseYear) || releaseYear < 1900 || releaseYear > currentYear + 5) {
                errors.push(`El año de lanzamiento debe estar entre 1900 y ${currentYear + 5}`);
            }
        }

        // Validar calificación (si está presente)
        if (rating !== undefined && (typeof rating !== 'number' || rating < 0 || rating > 10)) {
            errors.push('La calificación debe ser un número entre 0 y 10');
        }

        // Si hay errores, devolver respuesta de error
        if (errors.length > 0) {
            const error = new Error('Datos de anime inválidos');
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
    validateAnimeId(req, res, next) {
        const id = req.params.id;

        if (!id || isNaN(parseInt(id)) || parseInt(id) <= 0) {
            const error = new Error('ID de anime inválido');
            error.statusCode = 400;
            return next(error);
        }

        // Si todo está bien, continuar
        next();
    }
};

module.exports = animeValidator;