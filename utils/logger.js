// src/utils/logger.js
const fs = require('fs');
const path = require('path');
const { createLogger, format, transports } = require('winston');

// ✅ Ensure log directory exists
const logDir = path.join(__dirname, '../../logs');
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
}

// ✅ Define log format
const logFormat = format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
);

const logger = createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: logFormat,
    defaultMeta: { service: 'david-academy-api' },
    transports: [
        // ✅ Error logs
        new transports.File({
            filename: path.join(logDir, 'error.log'),
            level: 'error',
            handleExceptions: true,
        }),

        // ✅ Info and all other logs
        new transports.File({
            filename: path.join(logDir, 'app.log'),
            level: 'info',
            handleExceptions: true,
        }),
    ],
    exitOnError: false,
});

// ✅ Add console output only in non-production environments
if (process.env.NODE_ENV !== 'production') {
    logger.add(new transports.Console({
        format: format.combine(
            format.colorize(),
            format.printf(info => `${info.timestamp} [${info.level}]: ${info.message}`)
        )
    }));
}

// ✅ Optional: handle unhandled promise rejections and uncaught exceptions
process.on('unhandledRejection', (reason) => {
    logger.error(`Unhandled Rejection: ${reason}`);
});
process.on('uncaughtException', (err) => {
    logger.error(`Uncaught Exception: ${err.message}`, { stack: err.stack });
});

module.exports = logger;
