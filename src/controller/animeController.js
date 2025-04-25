const animeService = require('../services/animeService');

// Obtener todos los animes
async function getAllAnimes(req, res) {
    try {
        const animes = await animeService.getAllAnimes();
        res.json(animes);
    } catch (error) {
        console.error('Error al obtener animes:', error);
        res.status(500).json({ error: 'Error al obtener animes' });
    }
}

// Obtener un anime por ID
async function getAnimeById(req, res) {
    try {
        const { id } = req.params;
        const anime = await animeService.getAnimeById(id);

        if (!anime) {
            return res.status(404).json({ error: 'Anime no encontrado' });
        }

        res.json(anime);
    } catch (error) {
        console.error('Error al obtener anime por ID:', error);
        res.status(500).json({ error: 'Error al obtener anime' });
    }
}

// Crear un nuevo anime
async function createAnime(req, res) {
    try {
        const animeData = req.body;
        const newAnime = await animeService.createAnime(animeData);
        res.status(201).json(newAnime);
    } catch (error) {
        console.error('Error al crear anime:', error);
        res.status(500).json({ error: 'Error al crear anime' });
    }
}

// Actualizar un anime
async function updateAnime(req, res) {
    try {
        const { id } = req.params;
        const animeData = req.body;
        const updatedAnime = await animeService.updateAnime(id, animeData);

        res.json(updatedAnime);
    } catch (error) {
        console.error('Error al actualizar anime:', error);
        res.status(500).json({ error: 'Error al actualizar anime' });
    }
}

// Eliminar un anime
async function deleteAnime(req, res) {
    try {
        const { id } = req.params;
        await animeService.deleteAnime(id);

        res.status(204).send();
    } catch (error) {
        console.error('Error al eliminar anime:', error);
        res.status(500).json({ error: 'Error al eliminar anime' });
    }
}

// Obtener géneros de un anime
async function getAnimeGenres(req, res) {
    try {
        const { id } = req.params;

        // Verificar si el anime existe
        const anime = await animeService.getAnimeById(id);
        if (!anime) {
            return res.status(404).json({ error: 'Anime no encontrado' });
        }

        const genres = await animeService.getAnimeGenres(id);
        res.json(genres);
    } catch (error) {
        console.error('Error al obtener géneros del anime:', error);
        res.status(500).json({ error: 'Error al obtener géneros del anime' });
    }
}

// Agregar género a un anime
async function addGenreToAnime(req, res) {
    try {
        const { animeId, genreId } = req.params;

        // Verificar si el anime existe
        const anime = await animeService.getAnimeById(animeId);
        if (!anime) {
            return res.status(404).json({ error: 'Anime no encontrado' });
        }

        // Verificar si el género ya está asociado al anime
        const genres = await animeService.getAnimeGenres(animeId);
        const genreExists = genres.some(g => g.id === parseInt(genreId));

        if (genreExists) {
            return res.status(400).json({ error: 'El género ya está asociado a este anime' });
        }

        const result = await animeService.addGenreToAnime(animeId, genreId);
        res.status(201).json(result);
    } catch (error) {
        console.error('Error al agregar género a anime:', error);
        res.status(500).json({ error: 'Error al agregar género a anime' });
    }
}

// Eliminar género de un anime
async function removeGenreFromAnime(req, res) {
    try {
        const { animeId, genreId } = req.params;

        // Verificar si el anime existe
        const anime = await animeService.getAnimeById(animeId);
        if (!anime) {
            return res.status(404).json({ error: 'Anime no encontrado' });
        }

        // Verificar si el género está asociado al anime
        const genres = await animeService.getAnimeGenres(animeId);
        const genreExists = genres.some(g => g.id === parseInt(genreId));

        if (!genreExists) {
            return res.status(404).json({ error: 'El género no está asociado a este anime' });
        }

        await animeService.removeGenreFromAnime(animeId, genreId);
        res.status(204).send();
    } catch (error) {
        console.error('Error al eliminar género de anime:', error);
        res.status(500).json({ error: 'Error al eliminar género de anime' });
    }
}

module.exports = {
    getAllAnimes,
    getAnimeById,
    createAnime,
    updateAnime,
    deleteAnime,
    getAnimeGenres,
    addGenreToAnime,
    removeGenreFromAnime
};