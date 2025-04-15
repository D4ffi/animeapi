const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Configuración de variables de entorno
dotenv.config();

// Importar rutas
const animeRoutes = require('./routes/animeRoutes');
const characterRoutes = require('./routes/characterRoutes');
const commentRoutes = require('./routes/commentRoutes');

const app = express();
const PORT = process.env.PORT || 3000;


// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas base
app.get('/', (req, res) => {
    res.send('Bienvenido a la API de Anime');
});

// Rutas de la API
app.use('/api/animes', animeRoutes);
app.use('/api/characters', characterRoutes);
app.use('/api/comments', commentRoutes);

// Importar servicios para rutas anidadas
const characterService = require('./services/characterService');
const commentService = require('./services/commentService');

// Rutas anidadas para acceder a personajes y comentarios de un anime específico
app.get('/api/animes/:animeId/characters', (req, res) => {
    const { animeId } = req.params;
    characterService.getCharactersByAnimeId(animeId)
        .then(characters => res.json(characters))
        .catch(err => {
            console.error('Error:', err);
            res.status(500).json({ error: 'Error al obtener personajes del anime' });
        });
});

app.get('/api/animes/:animeId/comments', (req, res) => {
    const { animeId } = req.params;
    commentService.getCommentsByAnimeId(animeId)
        .then(comments => res.json(comments))
        .catch(err => {
            console.error('Error:', err);
            res.status(500).json({ error: 'Error al obtener comentarios del anime' });
        });
});

// Manejo de rutas no encontradas
app.use((req, res) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
});

// Manejo de errores global
/**
 * @param {Error} err - Error object
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 * @param {import('express').NextFunction} next - Express next function
 */
const errorHandler = (err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
};

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});