// src/config/db.js
const mysql = require('mysql');
const logger = require('../utils/logger');
const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT || 3306,
});
// Initial test connection
pool.getConnection((err, connection) => {
    if (err) {
        console.error('MySQL connection error:', err);
        logger.error(`MySQL connection error: ${err.message}`);
        process.exit(1);
    }
    logger.info('✅ Connected to MySQL database');
    connection.release();
});
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
