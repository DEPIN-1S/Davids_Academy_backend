// src/model/admin/examModel.js

const db = require('../../config/db');
const util = require('util');
const query = util.promisify(db.query).bind(db);
const logger = require('../../utils/logger');
/**
 * Inserts a new exam type into the tb_examType table.
 *
 * @async
 * @function insertExamType
 * @param   {string} type - The exam type to insert.
 * @returns {Promise<object>} The result of the INSERT operation.
 * @throws  Will throw an error if the database query fails.
 */
async function insertExamType(type) {
    const sql = `
    INSERT INTO tb_examType (type)
    VALUES (?)
  `;
    logger.info('insertExamType: inserting "%s"', type);

    try {
        const result = await query(sql, [type]);
        logger.info('insertExamType: success, insertedId=%d', result.insertId);
        return result;
    } catch (err) {
        logger.error('insertExamType: error inserting "%s": %o', type, err);
        throw err;
    }
}

/**
 * Updates an existing exam type in the tb_exam_type table.
 *
 * @async
 * @function updateExamType
 * @param   {string} examType - The new exam type value.
 * @param   {number} id       - The primary key ID of the row to update.
 * @returns {Promise<object>} The result of the UPDATE operation.
 * @throws  Will throw an error if the database query fails.
 */
async function updateExamType(examType, id) {
    const sql = `UPDATE tb_examType SET type = ? WHERE id=?`;
    logger.info('updateExamType: updating id=%d to "%s"', id, examType);
    try {
        const result = await query(sql, [examType, id]);
        if (result.affectedRows === 0) {
            logger.warn('updateExamType: no rows updated for id=%d', id);
        } else {
            logger.info('updateExamType: success, affectedRows=%d', result.affectedRows);
        }
        return result;
    } catch (err) {
        logger.error('updateExamType: error updating id=%d: %o', id, err);
        throw err;
    }
}
async function deleteExamType(id) {
    const sql = `UPDATE tb_examType SET isDeleted=true WHERE id=?`;
    logger.info('deleteExamType: deleting id=%d to "%s"', id);
    try {
        const result = await query(sql, [id]);
        if (result.affectedRows === 0) {
            logger.warn('deleteExamType: no rows deleted for id=%d', id);
        } else {
            logger.info('deleteExamType: success, affectedRows=%d', result.affectedRows);
        }
        return result;
    } catch (err) {
        logger.error('deleteExamType: error deleting id=%d: %o', id, err);
        throw err;
    }
}
module.exports = {
    insertExamType,
    updateExamType,
    deleteExamType,
};
