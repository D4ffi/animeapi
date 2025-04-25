// prisma/migrate.js
const { execSync } = require('child_process');

/**
 * Script para ejecutar una migración de Prisma de manera segura
 */
function runMigration() {
    try {
        console.log('Iniciando migración de la base de datos...');

        // Generar la migración (en modo desarrollo, pedir nombre interactivamente)
        console.log('\n1. Generando migración...');
        execSync('npx prisma migrate dev --name add_genres_table', { stdio: 'inherit' });

        // Generar el cliente Prisma
        console.log('\n2. Actualizando cliente Prisma...');
        execSync('npx prisma generate', { stdio: 'inherit' });

        console.log('\n✅ Migración completada exitosamente!');

        // Sugerencias adicionales
        console.log('\nSugerencias:');
        console.log('- Para verificar la estructura de la base de datos: npx prisma studio');
        console.log('- Para aplicar la migración en producción: npx prisma migrate deploy');

    } catch (error) {
        console.error('\n❌ Error durante la migración:', error.message);
        console.log('\nPuede intentar los siguientes pasos para solucionar el problema:');
        console.log('1. Verificar la conexión a la base de datos en .env');
        console.log('2. Asegurarse de que la base de datos existe');
        console.log('3. Comprobar que el esquema es válido: npx prisma validate');
        process.exit(1);
    }
}

runMigration();