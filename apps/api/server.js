import { buildApp } from "./src/app.js";
import { testConnection } from "./src/config/database.config.js";

const start = async () => {
    try {
        // Test database connection
        const dbConnected = await testConnection();

        if (!dbConnected) {
            process.exit(1);
        }

        // Build and start server
        const app = await buildApp();
        const port = process.env.PORT || 3000;
        const host = process.env.HOST || "0.0.0.0";

        await app.listen({ port, host });
        console.log(`Server running on http://${host}:${port}`);
        console.log(`Environment: ${process.env.NODE_ENV}`);
    } catch (error) {
        console.error("Error starting the server:", error);
        process.exit(1);
    }
}

start();