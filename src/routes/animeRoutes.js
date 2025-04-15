// src/routes/animeRoutes.js
const express = require('express');
const router = express.Router();
const animeService = require('../services/animeService');
const animeValidator = require('../middleware/animeValidator');

// Middleware para capturar errores en operaciones asíncronas
const asyncHandler = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

// Obtener todos los animes
router.get('/', asyncHandler(async (req, res) => {
    const animes = await animeService.getAllAnimes();
    res.json(animes);
}));

// Obtener un anime por ID
router.get('/:id',
    animeValidator.validateAnimeId,
    asyncHandler(async (req, res) => {
        const anime = await animeService.getAnimeById(req.params.id);

        if (!anime) {
            const error = new Error(`Anime con ID ${req.params.id} no encontrado`);
            error.statusCode = 404;
            throw error;
        }

        res.json(anime);
    })
);

// Crear un nuevo anime
router.post('/',
    animeValidator.validateAnimeData,
    asyncHandler(async (req, res) => {
        const newAnime = await animeService.createAnime(req.body);
        res.status(201).json(newAnime);
    })
);

// Actualizar un anime
router.put('/:id',
    animeValidator.validateAnimeId,
    animeValidator.validateAnimeData,
    asyncHandler(async (req, res) => {
        const anime = await animeService.getAnimeById(req.params.id);

        if (!anime) {
            const error = new Error(`Anime con ID ${req.params.id} no encontrado`);
            error.statusCode = 404;
            throw error;
        }

        const updatedAnime = await animeService.updateAnime(req.params.id, req.body);
        res.json(updatedAnime);
    })
);

// Eliminar un anime
router.delete('/:id',
    animeValidator.validateAnimeId,
    asyncHandler(async (req, res) => {
        const anime = await animeService.getAnimeById(req.params.id);

        if (!anime) {
            const error = new Error(`Anime con ID ${req.params.id} no encontrado`);
            error.statusCode = 404;
            throw error;
        }

        await animeService.deleteAnime(req.params.id);
        res.status(204).end();
    })
);

module.exports = router;