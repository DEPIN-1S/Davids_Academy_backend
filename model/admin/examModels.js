// src/model/admin/examModel.js

const db = require('../../config/db');
const util = require('util');
const query = util.promisify(db.query).bind(db);
const logger = require('../../utils/logger');
/**
 * Inserts a new exam type into the tb_questionType table.
 *
 * @async
 * @function insertQuestionType
 * @param   {string} type - The exam type to insert.
 * @returns {Promise<object>} The result of the INSERT operation.
 * @throws  Will throw an error if the database query fails.
 */
async function insertQuestionType(type) {
    const sql = `
    INSERT INTO tb_questionType (type)
    VALUES (?)
  `;
    logger.info('insertQuestionType: inserting "%s"', type);

    try {
        const result = await query(sql, [type]);
        logger.info('insertQuestionType: success, insertedId=%d', result.insertId);
        return result;
    } catch (err) {
        logger.error('insertQuestionType: error inserting "%s": %o', type, err);
        throw err;
    }
}

/**
 * Updates an existing exam type in the tb_exam_type table.
 *
 * @async
 * @function updateQuestionType
 * @param   {string} questionType - The new exam type value.
 * @param   {number} id       - The primary key ID of the row to update.
 * @returns {Promise<object>} The result of the UPDATE operation.
 * @throws  Will throw an error if the database query fails.
 */
async function updateQuestionType(questionType, id) {
    const sql = `UPDATE tb_questionType SET type = ? WHERE id=?`;
    logger.info('updateQuestionType: updating id=%d to "%s"', id, questionType);
    try {
        const result = await query(sql, [questionType, id]);
        if (result.affectedRows === 0) {
            logger.warn('updateQuestionType: no rows updated for id=%d', id);
        } else {
            logger.info('updateQuestionType: success, affectedRows=%d', result.affectedRows);
        }
        return result;
    } catch (err) {
        logger.error('updateQuestionType: error updating id=%d: %o', id, err);
        throw err;
    }
}
async function deleteQuestionType(id) {
    const sql = `UPDATE tb_questionType SET isDeleted=true WHERE id=?`;
    logger.info('deleteQuestionType: deleting id=%d to "%s"', id);
    try {
        const result = await query(sql, [id]);
        if (result.affectedRows === 0) {
            logger.warn('deleteQuestionType: no rows deleted for id=%d', id);
        } else {
            logger.info('deleteQuestionType: success, affectedRows=%d', result.affectedRows);
        }
        return result;
    } catch (err) {
        logger.error('deleteQuestionType: error deleting id=%d: %o', id, err);
        throw err;
    }
}
module.exports = {
    insertQuestionType,
    updateQuestionType,
    deleteQuestionType,
};
