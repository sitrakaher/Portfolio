require('dotenv').config();
const pino = require('pino');
const pinoHttp = require('pino-http');
const Log = process.env.LOG_LEVEL;
const nodeEnv = process.env.NODE_ENV;
// Logger principal
const logger = pino({
  level: Log || 'info',
  transport:
    nodeEnv !== 'production'
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