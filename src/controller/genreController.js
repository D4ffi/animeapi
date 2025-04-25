const genreService = require('../services/genreService');

// Obtener todos los géneros
async function getAllGenres(req, res) {
    try {
        const genres = await genreService.getAllGenres();
        res.json(genres);
    } catch (error) {
        console.error('Error al obtener géneros:', error);
        res.status(500).json({ error: 'Error al obtener géneros' });
    }
}

// Obtener un género por ID
async function getGenreById(req, res) {
    try {
        const { id } = req.params;
        const genre = await genreService.getGenreById(id);

        if (!genre) {
            return res.status(404).json({ error: 'Género no encontrado' });
        }

        res.json(genre);
    } catch (error) {
        console.error('Error al obtener género por ID:', error);
        res.status(500).json({ error: 'Error al obtener género' });
    }
}

// Obtener género por nombre
async function getGenreByName(req, res) {
    try {
        const { name } = req.query;

        if (!name) {
            return res.status(400).json({ error: 'Se requiere el parámetro "name"' });
        }

        const genre = await genreService.getGenreByName(name);

        if (!genre) {
            return res.status(404).json({ error: 'Género no encontrado' });
        }

        res.json(genre);
    } catch (error) {
        console.error('Error al obtener género por nombre:', error);
        res.status(500).json({ error: 'Error al obtener género' });
    }
}

// Crear un nuevo género
async function createGenre(req, res) {
    try {
        const genreData = req.body;

        // Verificar si ya existe un género con el mismo nombre
        const existingGenre = await genreService.getGenreByName(genreData.name);
        if (existingGenre) {
            return res.status(400).json({ error: 'Ya existe un género con este nombre' });
        }

        const newGenre = await genreService.createGenre(genreData);
        res.status(201).json(newGenre);
    } catch (error) {
        console.error('Error al crear género:', error);
        res.status(500).json({ error: 'Error al crear género' });
    }
}

// Actualizar un género
async function updateGenre(req, res) {
    try {
        const { id } = req.params;
        const genreData = req.body;

        // Verificar si el género existe
        const genre = await genreService.getGenreById(id);
        if (!genre) {
            return res.status(404).json({ error: 'Género no encontrado' });
        }

        // Verificar si hay otro género con el mismo nombre
        if (genreData.name && genreData.name !== genre.name) {
            const existingGenre = await genreService.getGenreByName(genreData.name);
            if (existingGenre) {
                return res.status(400).json({ error: 'Ya existe otro género con este nombre' });
            }
        }

        const updatedGenre = await genreService.updateGenre(id, genreData);
        res.json(updatedGenre);
    } catch (error) {
        console.error('Error al actualizar género:', error);
        res.status(500).json({ error: 'Error al actualizar género' });
    }
}

// Eliminar un género
async function deleteGenre(req, res) {
    try {
        const { id } = req.params;

        // Verificar si el género existe
        const genre = await genreService.getGenreById(id);
        if (!genre) {
            return res.status(404).json({ error: 'Género no encontrado' });
        }

        await genreService.deleteGenre(id);
        res.status(204).send();
    } catch (error) {
        console.error('Error al eliminar género:', error);
        res.status(500).json({ error: 'Error al eliminar género' });
    }
}

// Obtener animes por género
async function getAnimesByGenre(req, res) {
    try {
        const { id } = req.params;

        // Verificar si el género existe
        const genre = await genreService.getGenreById(id);
        if (!genre) {
            return res.status(404).json({ error: 'Género no encontrado' });
        }

        const animes = await genreService.getAnimesByGenreId(id);
        res.json(animes);
    } catch (error) {
        console.error('Error al obtener animes por género:', error);
        res.status(500).json({ error: 'Error al obtener animes por género' });
    }
}

// Agregar anime a género
async function addAnimeToGenre(req, res) {
    try {
        const { genreId, animeId } = req.params;

        // Verificar si la relación ya existe
        const genre = await genreService.getGenreById(genreId);
        if (!genre) {
            return res.status(404).json({ error: 'Género no encontrado' });
        }

        const existingRelation = genre.animeGenres.find(ag => ag.animeId === parseInt(animeId));
        if (existingRelation) {
            return res.status(400).json({ error: 'El anime ya está asociado a este género' });
        }

        const result = await genreService.addAnimeToGenre(animeId, genreId);
        res.status(201).json(result);
    } catch (error) {
        console.error('Error al agregar anime a género:', error);
        res.status(500).json({ error: 'Error al agregar anime a género' });
    }
}

// Eliminar anime de género
async function removeAnimeFromGenre(req, res) {
    try {
        const { genreId, animeId } = req.params;

        // Verificar si la relación existe
        const genre = await genreService.getGenreById(genreId);
        if (!genre) {
            return res.status(404).json({ error: 'Género no encontrado' });
        }

        const existingRelation = genre.animeGenres.find(ag => ag.animeId === parseInt(animeId));
        if (!existingRelation) {
            return res.status(404).json({ error: 'El anime no está asociado a este género' });
        }

        await genreService.removeAnimeFromGenre(animeId, genreId);
        res.status(204).send();
    } catch (error) {
        console.error('Error al eliminar anime de género:', error);
        res.status(500).json({ error: 'Error al eliminar anime de género' });
    }
}

module.exports = {
    getAllGenres,
    getGenreById,
    getGenreByName,
    createGenre,
    updateGenre,
    deleteGenre,
    getAnimesByGenre,
    addAnimeToGenre,
    removeAnimeFromGenre
};