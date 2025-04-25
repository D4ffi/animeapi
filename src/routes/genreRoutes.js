const express = require('express');
const genreController = require('../controller/genreController');
const genreValidator = require('../middleware/genreValidator');

const router = express.Router();

// Rutas básicas para géneros
router.get('/', genreController.getAllGenres);
router.get('/search', genreController.getGenreByName);
router.get('/:id', genreValidator.validateGenreId, genreController.getGenreById);
router.post('/', genreValidator.validateGenreData, genreController.createGenre);
router.put('/:id',
    genreValidator.validateGenreId,
    genreValidator.validateGenreData,
    genreController.updateGenre
);
router.delete('/:id', genreValidator.validateGenreId, genreController.deleteGenre);

// Rutas para relaciones entre géneros y animes
router.get('/:id/animes', genreValidator.validateGenreId, genreController.getAnimesByGenre);
router.post('/:genreId/animes/:animeId', genreController.addAnimeToGenre);
router.delete('/:genreId/animes/:animeId', genreController.removeAnimeFromGenre);

module.exports = router;