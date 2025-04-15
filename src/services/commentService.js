
const prisma = require('../lib/prisma');

// Obtener todos los comentarios
async function getAllComments() {
    return prisma.comment.findMany();
}

// Obtener los comentarios de un anime específico
async function getCommentsByAnimeId(animeId) {
    const id = parseInt(animeId);
    return prisma.comment.findMany({
        where: { animeId: id }
    });
}

// Obtener un comentario por ID
async function getCommentById(id) {
    const commentId = parseInt(id);
    return prisma.comment.findUnique({
        where: { id: commentId }
    });
}

// Crear un nuevo comentario
async function createComment(data) {
    return prisma.comment.create({
        data
    });
}

// Actualizar un comentario
async function updateComment(id, data) {
    const commentId = parseInt(id);
    return prisma.comment.update({
        where: { id: commentId },
        data
    });
}

// Eliminar un comentario
async function deleteComment(id) {
    const commentId = parseInt(id);
    return prisma.comment.delete({
        where: { id: commentId }
    });
}

module.exports = {
    getAllComments,
    getCommentsByAnimeId,
    getCommentById,
    createComment,
    updateComment,
    deleteComment
};