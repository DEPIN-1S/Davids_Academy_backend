// src/utils/logger.js
const { createLogger, format, transports } = require('winston');

const logger = createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.errors({ stack: true }),
        format.splat(),
        format.json()
    ),
    defaultMeta: { service: 'david-academy-api' },
    transports: [
        // ✅ Error logs go to error.log
        new transports.File({ filename: 'logs/error.log', level: 'error' }),

        // ✅ All other logs go to app.log (excluding error, because already logged above)
        new transports.File({
            filename: 'logs/app.log',
            level: 'info',
            handleExceptions: true,
            format: format.combine(
                format((info) => info.level !== 'error' ? info : false)(), // filter out error
                format.json()
            )
        }),
    ],
});

// ✅ Add console logger only for non-production environments
if (process.env.NODE_ENV !== 'production') {
    logger.add(new transports.Console({
        format: format.combine(
            format.colorize(),
            format.simple()
        )
    }));
}

module.exports = logger;
