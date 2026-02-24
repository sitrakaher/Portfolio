const pino = require('pino');
const pinoHttp = require('pino-http');

// Logger principal
const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  transport:
    process.env.NODE_ENV !== 'production'
      ? {
          target: 'pino-pretty',
          options: {
            colorize: true,
            translateTime: 'HH:MM:ss',
          },
        }
      : undefined,
});

// Middleware HTTP (injecte req.log)
const httpLogger = pinoHttp({ logger });

module.exports = { logger, httpLogger };