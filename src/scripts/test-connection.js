// src/scripts/test-connection.js
const prisma = require('../lib/prisma');

async function testConnection() {
    try {
        // Intentar una consulta simple
        const count = await prisma.anime.count();
        console.log(`Conexión exitosa. Número de animes: ${count}`);
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
    } finally {
        await prisma.$disconnect();
    }
}

testConnection();