// src/lib/supabase.js
const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');

// Cargar variables de entorno si no se ha hecho ya
if (process.env.SUPABASE_URL === undefined || process.env.SUPABASE_ANON_KEY === undefined) {
    dotenv.config();
}

// Verificar que las variables de entorno necesarias estén definidas
if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
    console.error('Error: Variables de entorno SUPABASE_URL y SUPABASE_ANON_KEY son requeridas');
    process.exit(1);
}

// Crear el cliente de Supabase
const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY,
    {
        auth: {
            persistSession: false // No persistir la sesión, ya que es un backend
        }
    }
);

// Evitar múltiples instancias en desarrollo (similar a tu enfoque con Prisma)
if (process.env.NODE_ENV === 'development') global.supabase = global.supabase || supabase;

module.exports = supabase;