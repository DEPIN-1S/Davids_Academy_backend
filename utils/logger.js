// src/utils/logger.js
const fs = require('fs');
const path = require('path');
const { createLogger, format, transports } = require('winston');

// ✅ Ensure logs directory exists
const logDir = path.join(__dirname, '../../logs');
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
}

// ✅ Define a human-readable log format (same for both local & live)
const logFormat = format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(({ timestamp, level, message, stack }) => {
        return `${timestamp} [${level}]: ${stack || message}`;
    })
);

// ✅ Create logger
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

        // ✅ General logs (info, warn, etc.)
        new transports.File({
            filename: path.join(logDir, 'app.log'),
            level: 'info',
            handleExceptions: true,
        }),
    ],
    exitOnError: false,
});

// ✅ Add console output (for both local and production)
logger.add(new transports.Console({
    format: format.combine(
        format.colorize(),
        logFormat
    )
}));

// ✅ Handle unhandled rejections and exceptions
process.on('unhandledRejection', (reason) => {
    logger.error(`Unhandled Rejection: ${reason}`);
});
process.on('uncaughtException', (err) => {
    logger.error(`Uncaught Exception: ${err.message}`, { stack: err.stack });
});

module.exports = logger;
