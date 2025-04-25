const prisma = require('../lib/prisma');

// Obtener todos los géneros
async function getAllGenres() {
    return prisma.genre.findMany({
        include: {
            animeGenres: {
                include: {
                    anime: true
                }
            }
        }
    });
}

// Obtener un género por ID
async function getGenreById(id) {
    const genreId = parseInt(id);
    return prisma.genre.findUnique({
        where: { id: genreId },
        include: {
            animeGenres: {
                include: {
                    anime: true
                }
            }
        }
    });
}

// Obtener un género por nombre
async function getGenreByName(name) {
    return prisma.genre.findUnique({
        where: { name },
        include: {
            animeGenres: {
                include: {
                    anime: true
                }
            }
        }
    });
}

// Crear un nuevo género
async function createGenre(data) {
    return prisma.genre.create({
        data
    });
}

// Actualizar un género
async function updateGenre(id, data) {
    const genreId = parseInt(id);
    return prisma.genre.update({
        where: { id: genreId },
        data
    });
}

// Eliminar un género
async function deleteGenre(id) {
    const genreId = parseInt(id);
    return prisma.genre.delete({
        where: { id: genreId }
    });
}

// Obtener todos los animes de un género
async function getAnimesByGenreId(genreId) {
    const id = parseInt(genreId);
    const genre = await prisma.genre.findUnique({
        where: { id },
        include: {
            animeGenres: {
                include: {
                    anime: true
                }
            }
        }
    });

    return genre.animeGenres.map(ag => ag.anime);
}

// Asociar un anime a un género
async function addAnimeToGenre(animeId, genreId) {
    return prisma.animeGenre.create({
        data: {
            animeId: parseInt(animeId),
            genreId: parseInt(genreId)
        }
    });
}

// Eliminar la asociación entre un anime y un género
async function removeAnimeFromGenre(animeId, genreId) {
    return prisma.animeGenre.delete({
        where: {
            animeId_genreId: {
                animeId: parseInt(animeId),
                genreId: parseInt(genreId)
            }
        }
    });
}

module.exports = {
    getAllGenres,
    getGenreById,
    getGenreByName,
    createGenre,
    updateGenre,
    deleteGenre,
    getAnimesByGenreId,
    addAnimeToGenre,
    removeAnimeFromGenre
};