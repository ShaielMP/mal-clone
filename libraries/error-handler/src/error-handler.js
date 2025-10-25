import { AppError } from './app-error.js';

export class ErrorHandler {
  constructor(logger) {
    this.logger = logger;
  }

  /**
   * Handle errors in a centralized way
   * @param {Error} error
   * @param {Object} request - Fastify request object
   * @param {Object} reply - Fastify reply object
   */
  handleError(error, request, reply) {
    this.logger.error(
      {
        err: error,
        url: request.url,
        method: request.method,
        params: request.params,
        query: request.query,
        user: request.user?.id
      },
      'An error occurred'
    );

    if (error instanceof AppError && error.isOperational) {
      return reply.status(error.httpCode).send({
        status: 'error',
        code: error.name,
        message: error.message,
        timestamp: error.timestamp
      });
    }

    if (error.validation) {
      return reply.status(400).send({
        status: 'error',
        code: 'VALIDATION_ERROR',
        message: 'Invalid request data',
        errors: error.validation
      });
    }

    if (error.code && error.code.startsWith('ER_')) {
      return this.handleDatabaseError(error, reply);
    }

    return reply.status(500).send({
      status: 'error',
      code: 'INTERNAL_SERVER_ERROR',
      message: 'An unexpected error occurred'
    });
  }

  handleDatabaseError(error, reply) {
    if (error.code === 'ER_DUP_ENTRY') {
      return reply.status(409).send({
        status: 'error',
        code: 'DUPLICATE_ENTRY',
        message: 'Resource already exists'
      });
    }

    // Foreign key constraint
    if (error.code === 'ER_NO_REFERENCED_ROW_2') {
      return reply.status(400).send({
        status: 'error',
        code: 'INVALID_REFERENCE',
        message: 'Referenced resource does not exist'
      });
    }

    // Generic database error
    return reply.status(500).send({
      status: 'error',
      code: 'DATABASE_ERROR',
      message: 'Database operation failed'
    });
  }

  isTrustedError(error) {
    if (error instanceof AppError) {
      return error.isOperational;
    }
    return false;
  }
}
