// src/model/student/studentModel.js

const db = require('../../config/db');
const util = require('util');
const logger = require('../../utils/logger'); // Ensure logger is correctly set up

const query = util.promisify(db.query).bind(db);

/**
 * Check if an email already exists in the database.
 * @param {string} email - The user's email to check.
 * @returns {Promise<Array>} - Array of user rows.
 */
async function checkEmail(email) {
    try {
        const sql = `SELECT * FROM tb_users WHERE email = ?`;
        const result = await query(sql, [email]);
        logger.info(`Checked email: ${email} - Found: ${result.length}`);
        return result;
    } catch (error) {
        logger.error(`Error checking email (${email}): ${error.message}`);
        throw error;
    }
}

/**
 * Check if a mobile number already exists in the database.
 * @param {string} mobile - The user's mobile to check.
 * @returns {Promise<Array>} - Array of user rows.
 */
async function checkmobile(mobile) {
    try {
        const sql = `SELECT * FROM tb_users WHERE mobile = ?`;
        const result = await query(sql, [mobile]);
        logger.info(`Checked mobile: ${mobile} - Found: ${result.length}`);
        return result;
    } catch (error) {
        logger.error(`Error checking mobile (${mobile}): ${error.message}`);
        throw error;
    }
}

/**
 * Create a new student in the `tb_users` table.
 * @param {string} firstname
 * @param {string} lastname
 * @param {string} email
 * @param {string} password - Hashed password
 * @param {string} mobile
 * @returns {Promise<Object>}
 */
async function createStudent(firstname, lastname, email, password, mobile) {
    const sql = `
    INSERT INTO tb_users (firstname, lastname, email, password, mobile, role)
    VALUES (?, ?, ?, ?, ?, ?)`;
    try {
        const result = await query(sql, [firstname, lastname, email, password, mobile, 2]); // 2 = student
        logger.info(`✅ Student created: ${email} (ID: ${result.insertId})`);
        return result;
    } catch (error) {
        logger.error(`❌ Failed to create student (${email}): ${error.message}`);
        throw error;
    }
}

/**
 * Clear/reset OTP token for a given email.
 * @param {string} email
 * @returns {Promise<Object>}
 */
async function updateToken(email) {
    try {
        const sql = `UPDATE tb_users SET token = NULL WHERE email = ?`;
        const result = await query(sql, [email]);
        logger.info(`OTP token cleared for: ${email}`);
        return result;
    } catch (error) {
        logger.error(`Failed to update token for ${email}: ${error.message}`);
        throw error;
    }
}

/**
 * Update user's password.
 * @param {string} email
 * @param {string} password - Hashed password
 * @returns {Promise<Object>}
 */
async function updatePassword(email, password) {
    try {
        const sql = `UPDATE tb_users SET password = ? WHERE email = ?`;
        const result = await query(sql, [password, email]);
        logger.info(`Password updated for: ${email}`);
        return result;
    } catch (error) {
        logger.error(`Failed to update password for ${email}: ${error.message}`);
        throw error;
    }
}
module.exports = {
    checkEmail,
    checkmobile,
    createStudent,
    updateToken,
    updatePassword,
};
