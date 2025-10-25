import pino from 'pino';

/**
 * Create application logger
 * @param {Object} options - Logger options
 * @returns {pino.Logger}
 */
export function createLogger(options = {}) {
  const {
    level = process.env.LOG_LEVEL || 'info',
    prettyPrint = process.env.NODE_ENV === 'development'
  } = options;

  const config = {
    level,
    formatters: {
      level(label) {
        return { level: label.toUpperCase() };
      }
    },
    timestamp: pino.stdTimeFunctions.isoTime,
    serializers: {
      req: req => ({
        method: req.method,
        url: req.url,
        params: req.params,
        query: req.query,
        remoteAddress: req.ip
      }),
      res: res => ({
        statusCode: res.statusCode
      }),
      err: pino.stdSerializers.err
    }
  };

  if (prettyPrint) {
    config.transport = {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'HH:MM:ss.l',
        ignore: 'pid,hostname',
        messageFormat: '{msg} {req.method} {req.url}',
        errorLikeObjectKeys: ['err', 'error']
      }
    };
  }

  return pino(config);
}

export const logger = createLogger();
