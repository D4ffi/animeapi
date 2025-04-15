const prisma = require('../lib/prisma');

// Obtener todos los animes
async function getAllAnimes() {
    return prisma.anime.findMany({
        include: {
            comments: true,
            characters: true,
        },
    });
}

// Obtener un anime por ID
async function getAnimeById(id) {
    const animeId = parseInt(id);
    return prisma.anime.findUnique({
        where: { id: animeId },
        include: {
            comments: true,
            characters: true,
        },
    });
}

// Crear un nuevo anime
async function createAnime(data) {
    return prisma.anime.create({
        data,
    });
}

// Actualizar un anime
async function updateAnime(id, data) {
    const animeId = parseInt(id);
    return prisma.anime.update({
        where: { id: animeId },
        data,
    });
}

// Eliminar un anime
async function deleteAnime(id) {
    const animeId = parseInt(id);
    return prisma.anime.delete({
        where: { id: animeId },
    });
}

module.exports = {
    getAllAnimes,
    getAnimeById,
    createAnime,
    updateAnime,
    deleteAnime,
};