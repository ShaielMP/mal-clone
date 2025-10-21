import knex from "knex";
import dotenv from "dotenv";

dotenv.config();

export const db = knex({
    client: "mysql2",
    connection: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        charset: "utf8mb4"
    },
    pool: {
        min: 2,
        max: 10,
        acquireTimeoutMillis: 30000,
        idleTimeoutMillis: 30000
    },
    debug: process.env.NODE_ENV === "development"
});

// Test de conexión
export async function testConnection() {
    try {
        await db.raw("SELECT 1");
        console.log("Conexión exitosa a la base de datos.");
        return true;
    } catch (error) {
        console.error("Error al conectar a la base de datos:", error);
        return false;
    }
}