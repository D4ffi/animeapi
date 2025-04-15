const prisma = require('../lib/prisma');

// Obtener todos los personajes
async function getAllCharacters() {
    return prisma.character.findMany();
}

// Obtener los personajes de un anime específico
async function getCharactersByAnimeId(animeId) {
    const id = parseInt(animeId);
    return prisma.character.findMany({
        where: { animeId: id }
    });
}

// Obtener un personaje por ID
async function getCharacterById(id) {
    const characterId = parseInt(id);
    return prisma.character.findUnique({
        where: { id: characterId }
    });
}

// Crear un nuevo personaje
async function createCharacter(data) {
    return prisma.character.create({
        data
    });
}

// Actualizar un personaje
async function updateCharacter(id, data) {
    const characterId = parseInt(id);
    return prisma.character.update({
        where: { id: characterId },
        data
    });
}

// Eliminar un personaje
async function deleteCharacter(id) {
    const characterId = parseInt(id);
    return prisma.character.delete({
        where: { id: characterId }
    });
}

module.exports = {
    getAllCharacters,
    getCharactersByAnimeId,
    getCharacterById,
    createCharacter,
    updateCharacter,
    deleteCharacter
};