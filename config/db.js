// src/config/db.js
const mysql = require('mysql');
const util = require('util');
const logger = require('../utils/logger');

const stripQuotes = (value) =>
  typeof value === 'string' ? value.replace(/^['"]|['"]$/g, '') : value;

const pool = mysql.createPool({
    connectionLimit: 10,
    host: stripQuotes(process.env.DB_HOST),
    user: stripQuotes(process.env.DB_USER),
    password: stripQuotes(process.env.DB_PASSWORD),
    database: stripQuotes(process.env.DB_DATABASE),
    port: Number(stripQuotes(process.env.DB_PORT)) || 3306,
    connectTimeout: 60000,
    acquireTimeout: 60000,
    timeout: 60000,
    waitForConnections: true,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 10000,
});
// Promisify pool.query for async/await support
pool.query = util.promisify(pool.query);

const isLocal = (process.env.NODE_ENV || '').toLowerCase() !== 'production';
const MAX_CONNECT_ATTEMPTS = isLocal ? 5 : 3;

const testConnection = (attempt = 1) => {
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('MySQL connection error:', err);
            logger.error(`MySQL connection error (attempt ${attempt}/${MAX_CONNECT_ATTEMPTS}): ${err.message}`);
            if (attempt < MAX_CONNECT_ATTEMPTS) {
                const delayMs = attempt * 3000;
                logger.warn(`Retrying MySQL connection in ${delayMs / 1000}s...`);
                setTimeout(() => testConnection(attempt + 1), delayMs);
                return;
            }
            if (isLocal) {
                logger.warn('MySQL is not reachable yet. Server will keep running and retry on the next keep-alive ping.');
                return;
            }
            process.exit(1);
        }
        logger.info('✅ Connected to MySQL database');
        connection.release();
    });
};

testConnection();

// Periodic keep-alive ping
setInterval(() => {
    pool.query('SELECT 1', (err) => {
        if (err) {
            logger.warn(`🔄 MySQL keep-alive failed: ${err.message}`);
        } else {
            logger.info('🔄 MySQL keep-alive ping successful');
        }
    });
}, 5 * 60 * 1000); // every 5 minutes

// Optional: listen for pool errors
pool.on('error', (err) => {
    logger.error(`❗ MySQL Pool Error: ${err.message}`);
});

module.exports = pool;
