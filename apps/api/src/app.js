import Fastify from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import dotenv from 'dotenv';
import { createLogger } from '@mal-clone/logger';
import { ErrorHandler } from '@mal-clone/error-handler';

dotenv.config();

export async function buildApp() {
  const logger = createLogger();

  const app = Fastify({
    logger,
    disableRequestLogging: process.env.NODE_ENV === 'production',
    requestIdLogLabel: 'requestId',
    requestIdHeader: 'x-Request-Id'
  });

  const errorHandler = new ErrorHandler(logger);

  // Plugins
  await app.register(cors, { origin: true });
  await app.register(helmet, { contentSecurityPolicy: false });

  // Routes
  app.get('/', async (request, reply) => {
    return {
      message: 'MyAnimeList Clone API',
      version: '1.0.0',
      status: 'running',
      environment: process.env.NODE_ENV
    };
  });

  // Health check
  app.get('/health', async (request, reply) => {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime()
    };
  });

  app.addHook('onRequest', async (request, reply) => {
    request.log.info(
      {
        url: request.url,
        method: request.method,
        params: request.params,
        query: request.query
      },
      'Incoming request'
    );
  });

  app.addHook('onResponse', async (request, reply) => {
    request.log.info(
      {
        url: request.url,
        method: request.method,
        statusCode: reply.statusCode,
        responseTime: reply.getResponseTime()
      },
      'Request completed'
    );
  });

  app.get('/test-error', async (request, reply) => {
    const { NotFoundError } = await import('@mal-clone/error-handler');
    throw new NotFoundError('Test resource');
  });

  app.setErrorHandler(async (error, request, reply) => {
    return errorHandler.handleError(error, request, reply);
  });

  app.setNotFoundHandler(async (request, reply) => {
    reply.status(404).send({
      status: 'error',
      code: 'NOT_FOUND',
      message: 'Route not found',
      path: request.url
    });
  });

  return app;
}
