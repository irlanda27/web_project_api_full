const expressWinston = require('express-winston');
const winston = require('winston');
const path = require('path');

const REQUEST_LOG = path.resolve(__dirname, '..', 'logs', 'request.log');
const ERROR_LOG   = path.resolve(__dirname, '..', 'logs', 'error.log');

const requestLogger = expressWinston.logger({
  transports: [new winston.transports.File({ filename: REQUEST_LOG })],
  format: winston.format.json(),
  meta: true,
  msg: 'HTTP {{req.method}} {{req.url}}',
});

const errorLogger = expressWinston.errorLogger({
  transports: [new winston.transports.File({ filename: ERROR_LOG })],
  format: winston.format.json(),
});

module.exports = { requestLogger, errorLogger };