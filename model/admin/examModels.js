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

/**
 * Updates an existing exam type in the tb_exam_type table.
 *
 * @async
 * @function deleteQuestionType
 * @param   {number} id       - The primary key ID of the row to update.
 * @returns {Promise<object>} The result of the UPDATE operation.
 * @throws  Will throw an error if the database query fails.
 */
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
/**
 * Inserts a new MCQ question into the tb_mcq table.
 * 
 * @async
 * @function insertMCQQuestion
 * @param {object} data - The MCQ question payload.
 * @returns {Promise<number>} The inserted question ID.
 */
async function insertMcqQuestion(data) {
    const sql = `
    INSERT INTO tb_mcq (
      question, answer, difficulty, subject, lesson, clientNeedArea,
      clientNeedTopic, exhibit, isDeleted, createdAt, updatedAt
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, false, NOW(), NOW())
  `;
    const values = [
        data.question,
        data.answer,
        data.difficulty,
        data.subject,
        data.lesson,
        data.clientNeedArea,
        data.clientNeedTopic,
        data.exhibit || null
    ];

    try {
        const result = await query(sql, values);
        logger.info(`insertMCQQuestion: Inserted MCQ with ID ${result.insertId}`);
        return result;
    } catch (error) {
        logger.error('insertMCQQuestion: Failed to insert MCQ: %o', error);
        throw error;
    }
}

/**
 * Inserts a single MCQ option into tb_mcqOptions table.
 * @param {number} questionId - The ID of the MCQ question.
 * @param {string} optionText - The option text to insert.
 * @returns {Promise<object>} Result of the INSERT operation.
 */
async function insertMcqOptions(questionId, optionText) {
    const sql = `INSERT INTO tb_mcqOptions (questionId, option) VALUES (?, ?)`;
    try {
        const result = await query(sql, [questionId, optionText]);
        logger.info(`insertMcqOption: Inserted option for questionId=${questionId}`);
        return result;
    } catch (error) {
        logger.error('insertMcqOption: Failed to insert option for questionId=%d: %o', questionId, error);
        throw error;
    }
}
/**
 * Inserts explanation for an MCQ into tb_mcqExplanation.
 * 
 * @async
 * @function insertMCQExplanation
 * @param {number} questionId - ID of the question.
 * @param {string} heading - Explanation heading.
 * @param {string} explanation - Explanation body.
 * @returns {Promise<object>} Insert result.
 */
async function insertMcqExplanation(questionId, heading, explanation) {
    const sql = `
    INSERT INTO tb_explanation (questionId, heading, explanation, isDeleted, createdAt, updatedAt)
    VALUES (?, ?, ?, false, NOW(), NOW())
  `;
    try {
        const result = await query(sql, [questionId, heading, explanation]);
        logger.info(`insertMCQExplanation: Inserted explanation for questionId=${questionId}`);
        return result;
    } catch (error) {
        logger.error('insertMCQExplanation: Failed to insert explanation: %o', error);
        throw error;
    }
}
/**
 * Inserts additional info into tb_additionalInfo for a specific MCQ.
 * 
 * @async
 * @function insertAdditionalInfo
 * @param {number} questionId - ID of the question.
 * @param {string} info - Text info.
 * @param {string|null} image - Image path or null.
 * @returns {Promise<object>} Insert result.
 */
async function insertAdditionalInfo(questionId, info, image = null) {
    const sql = `
    INSERT INTO tb_additionalInfo (questionId, info, image, isDeleted, createdAt, updatedAt)
    VALUES (?, ?, ?, false, NOW(), NOW())
  `;
    try {
        const result = await query(sql, [questionId, info, image]);
        logger.info(`insertAdditionalInfo: Inserted info for questionId=${questionId}`);
        return result;
    } catch (error) {
        logger.error('insertAdditionalInfo: Failed to insert additional info: %o', error);
        throw error;
    }
}
/**
 * Inserts a new dropdown question into `tb_dropdownQuestion`.
 * @param {string} question - The question text.
 * @returns {Promise<object>} Result of the INSERT query.
 */
async function insertDropdownQuestion(question) {
    const sql = `INSERT INTO tb_dropdownQuestion (question) VALUES (?)`;
    try {
        const result = await query(sql, [question]);
        logger.info(`✅ insertDropdownQuestion: Inserted question ID=${result.insertId}`);
        return result;
    } catch (err) {
        logger.error(`❌ insertDropdownQuestion: Failed to insert question - ${err.message}`);
        throw err;
    }
}

/**
 * Inserts a tab for a dropdown question into `tb_DropdownQuestionTabs`.
 * @param {number} questionId - The question's ID.
 * @param {string} tabKey - Tab label.
 * @param {string} tabValue - Tab content.
 * @returns {Promise<object>} Result of the INSERT query.
 */
async function insertTab(questionId, tabKey, tabValue) {
    const sql = `INSERT INTO tb_DropdownQuestionTabs (questionId, tabKey, tabValue) VALUES (?, ?, ?)`;
    try {
        const result = await query(sql, [questionId, tabKey, tabValue]);
        logger.info(`📄 insertTab: Tab "${tabKey}" added for question ID=${questionId}`);
        return result;
    } catch (err) {
        logger.error(`❌ insertTab: Failed for question ID=${questionId}, tabKey=${tabKey} - ${err.message}`);
        throw err;
    }
}

/**
 * Inserts dropdown options for a specific field into `tb_dropdowns`.
 * @param {number} questionId - The related question ID.
 * @param {string} dropdownField - The dropdown label.
 * @param {string} dropDownValue - The selectable value.
 * @returns {Promise<object>} Result of the INSERT query.
 */
async function insertDropdownField(questionId, dropdownField, dropDownValue) {
    const sql = `INSERT INTO tb_dropdowns (questionId, dropdownField, dropDownValue) VALUES (?, ?, ?)`;
    try {
        const result = await query(sql, [questionId, dropdownField, dropDownValue]);
        logger.info(`🔽 insertDropdownField: Added value "${dropDownValue}" to field "${dropdownField}" (QID=${questionId})`);
        return result;
    } catch (err) {
        logger.error(`❌ insertDropdownField: Failed to insert value "${dropDownValue}" - ${err.message}`);
        throw err;
    }
}

/**
 * Inserts the correct answer for a dropdown into `tb_dropdownAnswer`.
 * @param {number} questionId - Question ID.
 * @param {string} dropdownField - The dropdown label.
 * @param {string} dropdownValue - The correct value.
 * @returns {Promise<object>} Result of the INSERT query.
 */
async function insertDropdownAnswer(questionId, dropdownField, dropdownValue) {
    const sql = `INSERT INTO tb_dropdownAnswer (questionId, dropdownField, dropdownValue) VALUES (?, ?, ?)`;
    try {
        const result = await query(sql, [questionId, dropdownField, dropdownValue]);
        logger.info(`✅ insertDropdownAnswer: Correct answer "${dropdownValue}" for field "${dropdownField}" added (QID=${questionId})`);
        return result;
    } catch (err) {
        logger.error(`❌ insertDropdownAnswer: Failed for field "${dropdownField}" - ${err.message}`);
        throw err;
    }
}
module.exports = {
    insertQuestionType,
    updateQuestionType,
    deleteQuestionType,
    insertMcqQuestion,
    insertMcqOptions,
    insertMcqExplanation,
    insertAdditionalInfo,
    insertDropdownQuestion,
    insertTab,
    insertDropdownField,
    insertDropdownAnswer
};
