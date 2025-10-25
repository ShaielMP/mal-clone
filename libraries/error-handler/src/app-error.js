export class AppError extends Error {
  /**
   * @param {string} name - Error name/code (e.g., 'NOT_FOUND', 'VALIDATION_ERROR')
   * @param {number} httpCode - HTTP status code
   * @param {string} description - Description of error message
   * @param {boolean} isOperational - True if error is expected/handled
   */
  constructor(name, httpCode, description, isOperational = true) {
    super(description);

    Object.setPrototypeOf(this, new.target.prototype);

    this.name = name;
    this.httpCode = httpCode;
    this.isOperational = isOperational;

    Error.captureStackTrace(this);
  }
}

// Common errors
export class NotFoundError extends AppError {
  constructor(resource = 'Resource not found') {
    super('NOT_FOUND', 404, `${resource} not found`, true);
  }
}

export class ValidationError extends AppError {
  constructor(message = 'Validation failed') {
    super('VALIDATION_ERROR', 400, message, true);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = 'Unauthorized access') {
    super('UNAUTHORIZED', 401, message, true);
  }
}

export class ForbiddenError extends AppError {
  constructor(message = 'Forbidden access') {
    super('FORBIDDEN', 403, message, true);
  }
}

export class ConflictError extends AppError {
  constructor(message = 'Resource already exists') {
    super('CONFLICT', 409, message, true);
  }
}

export class InternalServerError extends AppError {
  constructor(message = 'Internal server error') {
    super('INTERNAL_SERVER_ERROR', 500, message, false);
  }
}
