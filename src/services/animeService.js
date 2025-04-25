const prisma = require('../lib/prisma');

// Obtener todos los animes
async function getAllAnimes() {
    return prisma.anime.findMany({
        include: {
            comments: true,
            characters: true,
            animeGenres: {
                include: {
                    genre: true
                }
            }
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
            animeGenres: {
                include: {
                    genre: true
                }
            }
        },
    });
}

// Crear un nuevo anime
async function createAnime(data) {
    // Extraer géneros del objeto data si existen
    const { genreIds, ...animeData } = data;

    // Crear el anime con sus relaciones de género si existen
    if (genreIds && Array.isArray(genreIds) && genreIds.length > 0) {
        return prisma.anime.create({
            data: {
                ...animeData,
                animeGenres: {
                    create: genreIds.map(genreId => ({
                        genre: {
                            connect: { id: parseInt(genreId) }
                        }
                    }))
                }
            },
            include: {
                comments: true,
                characters: true,
                animeGenres: {
                    include: {
                        genre: true
                    }
                }
            }
        });
    }

    // Si no hay géneros, crear solo el anime
    return prisma.anime.create({
        data: animeData,
        include: {
            comments: true,
            characters: true,
            animeGenres: {
                include: {
                    genre: true
                }
            }
        }
    });
}

// Actualizar un anime
async function updateAnime(id, data) {
    const animeId = parseInt(id);

    // Extraer géneros del objeto data si existen
    const { genreIds, ...animeData } = data;

    // Si se proporcionaron géneros, actualizar las relaciones
    if (genreIds && Array.isArray(genreIds)) {
        // Primero, eliminar todas las relaciones existentes
        await prisma.animeGenre.deleteMany({
            where: { animeId }
        });

        // Luego, crear las nuevas relaciones
        if (genreIds.length > 0) {
            await Promise.all(
                genreIds.map(genreId =>
                    prisma.animeGenre.create({
                        data: {
                            animeId,
                            genreId: parseInt(genreId)
                        }
                    })
                )
            );
        }
    }

    // Actualizar los datos del anime
    return prisma.anime.update({
        where: { id: animeId },
        data: animeData,
        include: {
            comments: true,
            characters: true,
            animeGenres: {
                include: {
                    genre: true
                }
            }
        }
    });
}

// Eliminar un anime
async function deleteAnime(id) {
    const animeId = parseInt(id);
    return prisma.anime.delete({
        where: { id: animeId },
    });
}

// Obtener los géneros de un anime
async function getAnimeGenres(id) {
    const animeId = parseInt(id);
    const anime = await prisma.anime.findUnique({
        where: { id: animeId },
        include: {
            animeGenres: {
                include: {
                    genre: true
                }
            }
        }
    });

    return anime ? anime.animeGenres.map(ag => ag.genre) : [];
}

// Agregar un género a un anime
async function addGenreToAnime(animeId, genreId) {
    return prisma.animeGenre.create({
        data: {
            animeId: parseInt(animeId),
            genreId: parseInt(genreId)
        }
    });
}

// Eliminar un género de un anime
async function removeGenreFromAnime(animeId, genreId) {
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
    getAllAnimes,
    getAnimeById,
    createAnime,
    updateAnime,
    deleteAnime,
    getAnimeGenres,
    addGenreToAnime,
    removeGenreFromAnime
};