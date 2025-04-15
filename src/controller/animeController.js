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

module.exports = {
    getAllAnimes,
    getAnimeById,
    createAnime,
    updateAnime,
    deleteAnime,
};