// src/model/student/studentModel.js

const db = require('../../config/db');
const util = require('util');
const logger = require('../../utils/logger'); // Make sure this path matches your setup

const query = util.promisify(db.query).bind(db);

/**
 * Creates a new student record in the `tb_users` table.
 *
 * @param {string} firstname - Student's first name.
 * @param {string} lastname - Student's last name.
 * @param {string} email - Student's email.
 * @param {string} password - Hashed password.
 * @param {string} phone - Student's phone number.
 * @returns {Promise<object>} - MySQL query result.
 */
async function createStudent(firstname, lastname, email, password, phone) {
    const sql = `
    INSERT INTO tb_users (firstname, lastname, email, password, phone, role)
    VALUES (?, ?, ?, ?, ?, ?)   
  `;
    try {
        const result = await query(sql, [firstname, lastname, email, password, phone, 2]); // role 2 = student

        logger.info(`✅ Student created: ${email} (ID: ${result.insertId})`);
        return result;
    } catch (error) {
        logger.error(`❌ Failed to create student (${email}): ${error.message}`);
        throw error; // Pass it to the controller
    }
}

module.exports = {
    createStudent,
};
