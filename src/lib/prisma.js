const { PrismaClient } = require('@prisma/client');

// Evita múltiples instancias de Prisma Client en desarrollo
const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV === 'development') global.prisma = prisma;

module.exports = prisma;