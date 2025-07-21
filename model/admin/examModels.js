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
    INSERT INTO tb_questions (
      question, answer, difficulty, subject, lesson, clientNeedArea,
      clientNeedTopic, exhibit, isDeleted, createdAt, updatedAt
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?,?, false, NOW(), NOW())
  `;
    const values = [
        data.question,
        data.question_type_id,
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

async function insertDropdownQuestion(question,question_type_id, difficulty, subject, lesson, clientNeedArea, clientNeedTopic) {
    const sql = `INSERT INTO tb_questions (question,question_type_id, difficulty, subject, lesson, clientNeedArea, clientNeedTopic) 
                 VALUES (?, ?, ?, ?, ?, ?,?)`;

    try {
        const result = await query(sql, [
            question,
            question_type_id,
            difficulty,
            subject,
            lesson,
            clientNeedArea,
            clientNeedTopic
        ]);

        logger.info(`✅ insertDropdownQuestion: Inserted question ID=${result.insertId}`);
        return result;
    } catch (err) {
        logger.error(`❌ insertDropdownQuestion: Failed to insert question - ${err.message}`);
        throw err;
    }
}
/**
 * Inserts a new dropdown question into `tb_dropdownQuestion`.
 * @param {string} question - The question text.
  * @param {string} answer - The answer text.
 * @returns {Promise<object>} Result of the INSERT query.
 */

async function insertSentenceQuestion(question,question_type_id, difficulty, subject, lesson, clientNeedArea, clientNeedTopic, answer) {
    const sql = `INSERT INTO tb_questions (question,question_type_id, difficulty, subject, lesson, clientNeedArea, clientNeedTopic, answer) 
                 VALUES (?, ?, ?, ?, ?, ?, ?,?)`;

    try {
        const result = await query(sql, [
            question,
            question_type_id,
            difficulty,
            subject,
            lesson,
            clientNeedArea,
            clientNeedTopic,
            answer
        ]);

        logger.info(`✅ insertSentenceQuestion: Inserted question ID=${result.insertId}`);
        return result;
    } catch (err) {
        logger.error(`❌ insertSentenceQuestion: Failed to insert question - ${err.message}`);
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
    const sql = `INSERT INTO tb_questionTabs (questionId, tabKey, tabValue) VALUES (?, ?, ?)`;
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
 * Inserts sort item for a sorting question into `tb_sortItems`.
 * @param {number} questionId - The question's ID.
 * @param {string} sortItem - Tab label.
 * @param {string} itemOrder - Tab content.
 * @returns {Promise<object>} Result of the INSERT query.
 */
async function insertSortItems(questionId, sortItem, itemOrder) {
    const sql = `INSERT INTO tb_sortItems (questionId, sortItem, itemOrder) VALUES (?, ?, ?)`;
    try {
        const result = await query(sql, [questionId, sortItem, itemOrder]);
        logger.info(`📄 insertTab: Tab "${sortItem}" added for question ID=${questionId}`);
        return result;
    } catch (err) {
        logger.error(`❌ insertTab: Failed for question ID=${questionId}, tabKey=${sortItem} - ${err.message}`);
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

// ---------------------------------fill in the blanks------------------------//

async function insertFillTheBlanksQuestion(question, question_type_id, answer, difficulty, subject, lesson, clientNeedArea, clientNeedTopic) {
    const sql = `INSERT INTO tb_questions (question,question_type_id,answer, difficulty, subject, lesson, clientNeedArea, clientNeedTopic) 
                 VALUES (?, ?, ?, ?, ?, ?,?,?)`;

    try {
        const result = await query(sql, [
            question,
            question_type_id,
            answer,
            difficulty,
            subject,
            lesson,
            clientNeedArea,
            clientNeedTopic
        ]);

        logger.info(`✅ insertFillTheBlanksQuestion: Inserted question ID=${result.insertId}`);
        return result;
    } catch (err) {
        logger.error(`❌ insertFillTheBlanksQuestion: Failed to insert question - ${err.message}`);
        throw err;
    }
}
async function insertFillBlankQuestionContent(questionId, question_text, fill_blanks_answer, blank_or_not) {
    const sql = `INSERT INTO tb_fillTheBlanks (question_id,question_text,answers,blankOrNot) VALUES (?,?,?,?)`;
    try {
        const result = await query(sql, [questionId, question_text, fill_blanks_answer, blank_or_not]);
        logger.info(`insert FillTheBlanks Question content: Inserted question text for questionId=${questionId}`);
        return result;
    } catch (error) {
        logger.error('FillTheBlanks Question content: Failed to insert question text for questionId=%d: %o', questionId, error);
        throw error;
    }
}

async function insertFillBlankQuestionOptionsHeading(questionId, option_heading) {
    const sql = `INSERT INTO DragAndDrop_Headings (question_id,headings) VALUES (?,?)`;
    try {
        const result = await query(sql, [questionId, option_heading]);
        logger.info(`insert FillTheBlanks Options DragAndDrop_Headings: Inserted question drag and option heading for questionId=${questionId}`);
        return result;
    } catch (error) {
        logger.error('FillTheBlanks Question option DragAndDrop_Headings: Failed to insert question drag and option heading for questionId=%d: %o', questionId, error);
        throw error;
    }
}


async function insertFillBlankQuestionOptionsHeadingValues(questionId, heading_id, option_value) {
    const sql = `INSERT INTO DragAndDrop_Headings_Options (question_id,headings_id,options_value) VALUES (?,?,?)`;
    try {
        const result = await query(sql, [questionId, heading_id, option_value]);
        logger.info(`insert FillTheBlanks DragAndDrop_Headings_Options: Inserted question DragAndDrop_Headings_Options for questionId=${questionId}`);
        return result;
    } catch (error) {
        logger.error('FillTheBlanks Question DragAndDrop_Headings_Options: Failed to insert question DragAndDrop_Headings_Options for questionId=%d: %o', questionId, error);
        throw error;
    }
}



// ---------------------------------Multiple Radio------------------------//

async function insertMultipleRadioQuestion(question, question_type_id, difficulty, subject, lesson, clientNeedArea, clientNeedTopic) {
    const sql = `INSERT INTO tb_questions (question,question_type_id, difficulty, subject, lesson, clientNeedArea, clientNeedTopic) 
                 VALUES (?, ?, ?, ?, ?, ?, ?)`;

    try {
        const result = await query(sql, [
            question,
            question_type_id,
            difficulty,
            subject,
            lesson,
            clientNeedArea,
            clientNeedTopic
        ]);

        logger.info(`✅ insertMultipleRadioQuestion: Inserted question ID=${result.insertId}`);
        return result;
    } catch (err) {
        logger.error(`❌ insertMultipleRadioQuestion: Failed to insert question - ${err.message}`);
        throw err;
    }
}
async function insertMultipleRadioQuestionContent(questionId, question_text, question_answer) {
    const sql = `INSERT INTO tb_MultipleRadio (question_id,client_findings,answer) VALUES (?,?,?)`;
    try {
        const result = await query(sql, [questionId, question_text, question_answer]);
        logger.info(`insert MultipleRadio Question content: Inserted question text for questionId=${questionId}`);
        return result;
    } catch (error) {
        logger.error('MultipleRadio Question content: Failed to insert question text for questionId=%d: %o', questionId, error);
        throw error;
    }
}

async function insertMultipleRadioOptions(questionId, option_value) {
    const sql = `INSERT INTO tb_MultipleRadio_RadioOptions (question_id,options) VALUES (?,?)`;
    try {
        const result = await query(sql, [questionId, option_value]);
        logger.info(`insert MultipleRadio radio Options: Inserted question option for questionId=${questionId}`);
        return result;
    } catch (error) {
        logger.error('MultipleRadio radio option: Failed to insert question option for questionId=%d: %o', questionId, error);
        throw error;
    }
}


//--------------------------- Drag and Drop ------------------------------------------


async function insertDragDropQuestion(question,question_type_id, drag_drop_content, difficulty, subject, lesson, clientNeedArea, clientNeedTopic) {
    const sql = `INSERT INTO tb_questions (question,question_type_id,drag_drop_content, difficulty, subject, lesson, clientNeedArea, clientNeedTopic) 
                 VALUES (?, ?, ?, ?, ?, ?, ?,?)`;

    try {
        const result = await query(sql, [
            question,
            question_type_id,
            drag_drop_content,
            difficulty,
            subject,
            lesson,
            clientNeedArea,
            clientNeedTopic
        ]);

        logger.info(`✅ insertMultipleRadioQuestion: Inserted question ID=${result.insertId}`);
        return result;
    } catch (err) {
        logger.error(`❌ insertMultipleRadioQuestion: Failed to insert question - ${err.message}`);
        throw err;
    }
}
async function insertDragDropOptionsHeading(questionId, option_heading, question_answer) {
    const sql = `INSERT INTO DragAndDrop_Headings (question_id,headings,drag_drop_answer) VALUES (?,?,?)`;
    try {
        const result = await query(sql, [questionId, option_heading, question_answer]);
        logger.info(`insert DragAndDrop_Headings and answer: Inserted DragAndDrop_Headings and answer for questionId=${questionId}`);
        return result;
    } catch (error) {
        logger.error('DragAndDrop_Headings and answer: Failed to insert DragAndDrop_Headings and answer for questionId=%d: %o', questionId, error);
        throw error;
    }
}

async function insertDragDropOptionsHeadingValues(questionId,heading_id, option_value) {
    const sql = `INSERT INTO DragAndDrop_Headings_Options (question_id,headings_id,options_value) VALUES (?,?,?)`;
    try {
        const result = await query(sql, [questionId,heading_id, option_value]);
        logger.info(`insert DragAndDrop_Headings_Options: Inserted DragAndDrop_Headings_Options for questionId=${questionId}`);
        return result;
    } catch (error) {
        logger.error('DragAndDrop_Headings_Options: Failed to insert DragAndDrop_Headings_Options for questionId=%d: %o', questionId, error);
        throw error;
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
    insertDropdownAnswer,
    insertSortItems,
    insertSentenceQuestion,
    insertFillBlankQuestionContent,
    insertFillTheBlanksQuestion,
    insertFillBlankQuestionOptionsHeading,
    insertFillBlankQuestionOptionsHeadingValues,
    insertMultipleRadioQuestionContent,
    insertMultipleRadioQuestion,
    insertMultipleRadioOptions,
    insertDragDropQuestion,
    insertDragDropOptionsHeading,
    insertDragDropOptionsHeadingValues
};
