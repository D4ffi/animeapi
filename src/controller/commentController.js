const commentService = require('../services/commentService');

// Obtener todos los comentarios
async function getAllComments(req, res) {
    try {
        const comments = await commentService.getAllComments();
        res.json(comments);
    } catch (error) {
        console.error('Error al obtener comentarios:', error);
        res.status(500).json({ error: 'Error al obtener comentarios' });
    }
}

// Obtener los comentarios de un anime específico
async function getCommentsByAnimeId(req, res) {
    try {
        const { animeId } = req.params;
        const comments = await commentService.getCommentsByAnimeId(animeId);
        res.json(comments);
    } catch (error) {
        console.error('Error al obtener comentarios del anime:', error);
        res.status(500).json({ error: 'Error al obtener comentarios del anime' });
    }
}

// Obtener un comentario por ID
async function getCommentById(req, res) {
    try {
        const { id } = req.params;
        const comment = await commentService.getCommentById(id);

        if (!comment) {
            return res.status(404).json({ error: 'Comentario no encontrado' });
        }

        res.json(comment);
    } catch (error) {
        console.error('Error al obtener comentario:', error);
        res.status(500).json({ error: 'Error al obtener comentario' });
    }
}

// Crear un nuevo comentario
async function createComment(req, res) {
    try {
        const commentData = req.body;
        const newComment = await commentService.createComment(commentData);
        res.status(201).json(newComment);
    } catch (error) {
        console.error('Error al crear comentario:', error);
        res.status(500).json({ error: 'Error al crear comentario' });
    }
}

// Actualizar un comentario
async function updateComment(req, res) {
    try {
        const { id } = req.params;
        const commentData = req.body;
        const updatedComment = await commentService.updateComment(id, commentData);

        res.json(updatedComment);
    } catch (error) {
        console.error('Error al actualizar comentario:', error);
        res.status(500).json({ error: 'Error al actualizar comentario' });
    }
}

// Eliminar un comentario
async function deleteComment(req, res) {
    try {
        const { id } = req.params;
        await commentService.deleteComment(id);

        res.status(204).send();
    } catch (error) {
        console.error('Error al eliminar comentario:', error);
        res.status(500).json({ error: 'Error al eliminar comentario' });
    }
}

module.exports = {
    getAllComments,
    getCommentsByAnimeId,
    getCommentById,
    createComment,
    updateComment,
    deleteComment
};