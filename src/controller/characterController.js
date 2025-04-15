const characterService = require('../services/characterService');

// Obtener todos los personajes
async function getAllCharacters(req, res) {
    try {
        const characters = await characterService.getAllCharacters();
        res.json(characters);
    } catch (error) {
        console.error('Error al obtener personajes:', error);
        res.status(500).json({ error: 'Error al obtener personajes' });
    }
}

// Obtener los personajes de un anime específico
async function getCharactersByAnimeId(req, res) {
    try {
        const { animeId } = req.params;
        const characters = await characterService.getCharactersByAnimeId(animeId);
        res.json(characters);
    } catch (error) {
        console.error('Error al obtener personajes del anime:', error);
        res.status(500).json({ error: 'Error al obtener personajes del anime' });
    }
}

// Obtener un personaje por ID
async function getCharacterById(req, res) {
    try {
        const { id } = req.params;
        const character = await characterService.getCharacterById(id);

        if (!character) {
            return res.status(404).json({ error: 'Personaje no encontrado' });
        }

        res.json(character);
    } catch (error) {
        console.error('Error al obtener personaje:', error);
        res.status(500).json({ error: 'Error al obtener personaje' });
    }
}

// Crear un nuevo personaje
async function createCharacter(req, res) {
    try {
        const characterData = req.body;
        const newCharacter = await characterService.createCharacter(characterData);
        res.status(201).json(newCharacter);
    } catch (error) {
        console.error('Error al crear personaje:', error);
        res.status(500).json({ error: 'Error al crear personaje' });
    }
}

// Actualizar un personaje
async function updateCharacter(req, res) {
    try {
        const { id } = req.params;
        const characterData = req.body;
        const updatedCharacter = await characterService.updateCharacter(id, characterData);

        res.json(updatedCharacter);
    } catch (error) {
        console.error('Error al actualizar personaje:', error);
        res.status(500).json({ error: 'Error al actualizar personaje' });
    }
}

// Eliminar un personaje
async function deleteCharacter(req, res) {
    try {
        const { id } = req.params;
        await characterService.deleteCharacter(id);

        res.status(204).send();
    } catch (error) {
        console.error('Error al eliminar personaje:', error);
        res.status(500).json({ error: 'Error al eliminar personaje' });
    }
}

module.exports = {
    getAllCharacters,
    getCharactersByAnimeId,
    getCharacterById,
    createCharacter,
    updateCharacter,
    deleteCharacter
};