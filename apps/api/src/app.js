import Fastify from "fastify";
import cors from "@fastify/cors";
import helmet from "@fastify/helmet";
import dotenv from "dotenv";

dotenv.config();

export async function buildApp() {
  const app = Fastify({
    logger: {
      level: process.env.LOG_LEVEL || "info",
      transport:
        process.env.NODE_ENV === "development"
          ? {
              target: "pino-pretty",
              options: {
                colorize: true,
                translateTime: "HH:MM:ss Z",
                ignore: "pid,hostname",
              },
            }
          : undefined,
    },
  });

  // Plugins
  await app.register(cors, { origin: true });
  await app.register(helmet, { contentSecurityPolicy: false });

  // Routes
  app.get("/", async (request, reply) => {
    return {
      message: "MyAnimeList Clone API",
      version: "1.0.0",
      status: "running",
    };
  });

  // Health check
  app.get("/health", async (request, reply) => {
    return { 
        status: "ok", 
        timestamp: new Date().toISOString() };
  });

  return app;
}
