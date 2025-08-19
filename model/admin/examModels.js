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
      question,question_type_id,courseId, answer,exam_type, difficulty,exhibit) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const values = [
        data.question,
        data.question_type_id,
        data.courseId,
        data.answer,
        data.exam_type,
        data.difficulty,
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

async function insertDropdownQuestion(question, question_type_id, exam_type, difficulty, courseId) {
    const sql = `INSERT INTO tb_questions (question,question_type_id,exam_type, difficulty,courseId) 
                 VALUES (?, ?, ?, ?, ?)`;

    try {
        const result = await query(sql, [
            question,
            question_type_id,
            exam_type,
            difficulty,
            courseId,
        ]);

        logger.info(`✅ insertDropdownQuestion: Inserted question ID=${result.insertId}`);
        return result;
    } catch (err) {
        logger.error(`❌ insertDropdownQuestion: Failed to insert question - ${err.message}`);
        throw err;
    }
}


async function insertDropdownHeading(questionId, dropdownField, dropdownanswer, blank_or_not) {
    const sql = `INSERT INTO tb_dropdowns (questionId, dropdownField, dropdownanswer,blankOrNot) VALUES (?, ?, ? ,?)`;
    try {
        const result = await query(sql, [questionId, dropdownField, dropdownanswer, blank_or_not]);
        logger.info(`🔽 insertDropdownField: Added dropdown question text "${dropdownField}" and answer "${dropdownanswer}" (QID=${questionId})`);
        return result;
    } catch (err) {
        logger.error(`❌ insertDropdownField: Failed to insert dropdown question text "${dropdownField}" - ${err.message}`);
        throw err;
    }
}



async function insertDropdownHeadingOptions(questionId, headingtextId, option) {
    const sql = `INSERT INTO tb_dropdownOptions (questionId, dropdowntext_id, dropdownValue) VALUES (?, ?, ?)`;
    try {
        const result = await query(sql, [questionId, headingtextId, option]);
        logger.info(`✅ insertDropdownOptions of question text id : "${headingtextId}" and options "${option}" added (QID=${questionId})`);
        return result;
    } catch (err) {
        logger.error(`❌ insertDropdownOptions: Failed for question text id "${headingtextId}" - ${err.message}`);
        throw err;
    }
}

/**
 * Inserts a new dropdown question into `tb_dropdownQuestion`.
 * @param {string} question - The question text.
  * @param {string} answer - The answer text.
 * @returns {Promise<object>} Result of the INSERT query.
 */

async function insertSentenceQuestion(question, question_type_id, exam_type, difficulty, courseId, answer) {
    const sql = `INSERT INTO tb_questions (question,question_type_id,exam_type, difficulty,courseId, answer) 
                 VALUES (?, ?, ?, ?, ?, ?)`;

    try {
        const result = await query(sql, [
            question,
            question_type_id,
            exam_type,
            difficulty,
            courseId,
            answer
        ]);

        logger.info(`✅ insertSentenceQuestion: Inserted question ID=${result.insertId}`);
        return result;
    } catch (err) {
        logger.error(`❌ insertSentenceQuestion: Failed to insert question - ${err.message}`);
        throw err;
    }
}

async function insertHighlightOptionsortItems(questionId, option) {
    const sql = `INSERT INTO tb_sentanceHighlight (questionId, options) VALUES (?, ?)`;
    try {
        const result = await query(sql, [questionId, option]);
        logger.info(`✅ [insertHighlightOption] Successfully inserted highlight option for questionId = ${questionId}`);
        return result;
    } catch (err) {
        logger.error(`❌ [insertHighlightOption] Failed to insert highlight option for questionId = ${questionId} - ${err.message}`);
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


// ---------------------------------fill in the blanks------------------------//

async function insertFillTheBlanksQuestion(question, question_type_id, answer, exam_type, difficulty, courseId) {
    const sql = `INSERT INTO tb_questions (question,question_type_id,answer,exam_type, difficulty,courseId) 
                 VALUES (?, ?, ?, ?, ?, ?)`;

    try {
        const result = await query(sql, [
            question,
            question_type_id,
            answer,
            exam_type,
            difficulty,
            courseId,
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

async function insertMultipleRadioQuestion(question, question_type_id, exam_type, difficulty, courseId) {
    const sql = `INSERT INTO tb_questions (question, question_type_id, exam_type, difficulty, courseId) VALUES (?, ?, ?, ?, ?)`;
    try {
        const result = await query(sql, [
            question,
            question_type_id,
            exam_type,
            difficulty,
            courseId
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


async function insertDragDropQuestion(question, question_type_id, exam_type, drag_drop_content, difficulty, courseId) {
    const sql = `INSERT INTO tb_questions (question,question_type_id,exam_type,drag_drop_content, difficulty,courseId) 
                 VALUES (?, ?, ?, ?, ?, ?)`;

    try {
        const result = await query(sql, [
            question,
            question_type_id,
            exam_type,
            drag_drop_content,
            difficulty,
            courseId
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

async function insertDragDropOptionsHeadingValues(questionId, heading_id, option_value) {
    const sql = `INSERT INTO DragAndDrop_Headings_Options (question_id,headings_id,options_value) VALUES (?,?,?)`;
    try {
        const result = await query(sql, [questionId, heading_id, option_value]);
        logger.info(`insert DragAndDrop_Headings_Options: Inserted DragAndDrop_Headings_Options for questionId=${questionId}`);
        return result;
    } catch (error) {
        logger.error('DragAndDrop_Headings_Options: Failed to insert DragAndDrop_Headings_Options for questionId=%d: %o', questionId, error);
        throw error;
    }
}


// get all exam question


async function Gettabs(questionId) {
    const sql = `SELECT * FROM tb_questionTabs WHERE questionId = ?`;
    try {
        const result = await query(sql, [questionId]);
        logger.info(`✅ [Gettabs] Successfully retrieved tabs for questionId = ${questionId}`);
        return result;
    } catch (err) {
        logger.error(`[Gettabs] ❌ Failed to retrieve tabs for questionId = ${questionId} - ${err.message}`);
        throw err;
    }
}


async function getAdditionalInfo(questionId) {
    const sql = `SELECT * FROM tb_additionalInfo WHERE questionId = ?`;
    try {
        const result = await query(sql, [questionId]);
        logger.info(`✅ [getAdditionalInfo] Successfully retrieved additional info for questionId = ${questionId}`);
        return result;
    } catch (err) {
        logger.error(`[getAdditionalInfo] ❌ Failed to retrieve additional info for questionId = ${questionId} - ${err.message}`);
        throw err;
    }
}


async function Getexplantion(questionId) {
    const sql = `SELECT * FROM tb_explanation WHERE questionId =?`;
    try {
        const result = await query(sql, [questionId]);
        logger.info('✅ [getSentenceHighlightQuestions] Successfully retrieved sentence highlight questions ');
        return result;
    } catch (err) {
        logger.error(`[getSentenceHighlightQuestions] ❌ Failed to retrieve sentence highlight questions - ${err.message}`);
        throw err;
    }
}

//get mcq question

async function getMcqQuestions(condition) {
    const sql = `SELECT * FROM tb_questions WHERE question_type_id = 7 ${condition}`;
    try {
        const result = await query(sql);
        logger.info('✅ [getMcqQuestions] Successfully retrieved MCQ questions of type ID 7');
        return result;
    } catch (err) {
        logger.error(`[getMcqQuestions] ❌ Failed to retrieve MCQ questions - ${err.message}`);
        throw err;
    }
}

async function Getmcqoption(questionId) {
    const sql = `SELECT * FROM tb_mcqOptions WHERE questionId = ?`;
    try {
        const result = await query(sql, [questionId]);
        logger.info(`✅ [Getmcqoption] Successfully retrieved MCQ options for questionId = ${questionId}`);
        return result;
    } catch (err) {
        logger.error(`[Getmcqoption] ❌ Failed to retrieve MCQ options for questionId = ${questionId} - ${err.message}`);
        throw err;
    }
}



//get dropdown question

async function getDropdownQuestions(condition) {
    const sql = `SELECT * FROM tb_questions WHERE question_type_id = 8 ${condition}`;
    try {
        const result = await query(sql);
        logger.info('✅ [getDropdownQuestions] Successfully retrieved dropdown-type questions (question_type_id = 8)');
        return result;
    } catch (err) {
        logger.error(`[getDropdownQuestions] ❌ Failed to retrieve dropdown-type questions - ${err.message}`);
        throw err;
    }
}
async function Getdropdownquestiontext(questionId) {
    const sql = `SELECT id, questionId, dropdownField, blankOrNot, createdAt, updatedAt FROM tb_dropdowns WHERE questionId = ?`;
    try {
        const result = await query(sql, [questionId]);
        logger.info(`✅ [Getdropdownquestiontext] Successfully retrieved dropdown-type questions for questionId = ${questionId}`);
        return result;
    } catch (err) {
        logger.error(`[Getdropdownquestiontext] ❌ Failed to retrieve dropdown-type questions for questionId = ${questionId} - ${err.message}`);
        throw err;
    }
}


async function Getdropdownoption(dropdowntext_id) {
    const sql = `SELECT * FROM tb_dropdownOptions WHERE dropdowntext_id = ?`;
    try {
        const result = await query(sql, [dropdowntext_id]);
        logger.info(`✅ [Getdropdownoption] Successfully retrieved dropdown options for dropdowntext_id = ${dropdowntext_id}`);
        return result;
    } catch (err) {
        logger.error(`[Getdropdownoption] ❌ Failed to retrieve dropdown options for dropdowntext_id = ${dropdowntext_id} - ${err.message}`);
        throw err;
    }
}


// get sorting questions

async function getSortingQuestions(condition) {
    const sql = `SELECT * FROM tb_questions WHERE question_type_id = 11 ${condition}`;
    try {
        const result = await query(sql);
        logger.info('✅ [getSortingQuestions] Successfully retrieved sorting questions (question_type_id = 11)');
        return result;
    } catch (err) {
        logger.error(`[getSortingQuestions] ❌ Failed to retrieve sorting questions - ${err.message}`);
        throw err;
    }
}


async function Getsortingoption(questionId) {
    const sql = `SELECT id, questionId, sortItem,itemOrder FROM tb_sortItems WHERE questionId = ?`;
    try {
        const result = await query(sql, [questionId]);
        logger.info(`✅ [Getsortingoption] Successfully retrieved sorting options for questionId = ${questionId}`);
        return result;
    } catch (err) {
        logger.error(`[Getsortingoption] ❌ Failed to retrieve sorting options for questionId = ${questionId} - ${err.message}`);
        throw err;
    }
}


async function GetSentenceHighlightOptions(questionId) {
    const sql = `SELECT * from tb_sentanceHighlight WHERE questionId = ?`;
    try {
        const result = await query(sql, [questionId]);
        logger.info(`✅ [GetSentenceHighlightOptions] Successfully retrieved sentence high light options for questionId = ${questionId}`);
        return result;
    } catch (err) {
        logger.error(`[GetSentenceHighlightOptions] ❌ Failed to retrieve sentence high light options for questionId = ${questionId} - ${err.message}`);
        throw err;
    }
}

// get fill in the blanks question

async function getFillInTheBlanksQuestions(condition) {
    const sql = `SELECT * FROM tb_questions WHERE question_type_id = 13 ${condition}`; // Change 5 to the correct ID if different
    try {
        const result = await query(sql);
        logger.info('✅ [getFillInTheBlanksQuestions] Successfully retrieved fill-in-the-blanks questions (question_type_id = 5)');
        return result;
    } catch (err) {
        logger.error(`[getFillInTheBlanksQuestions] ❌ Failed to retrieve fill-in-the-blanks questions - ${err.message}`);
        throw err;
    }
}

async function GetFilltheblankstext(questionId) {
    const sql = `SELECT id, question_id, question_text FROM tb_fillTheBlanks WHERE question_id = ?`;
    try {
        const result = await query(sql, [questionId]);
        logger.info(`✅ [GetFilltheblankstext] Successfully retrieved fill-the-blanks text for question_id = ${questionId}`);
        return result;
    } catch (err) {
        logger.error(`[GetFilltheblankstext] ❌ Failed to retrieve fill-the-blanks text for question_id = ${questionId} - ${err.message}`);
        throw err;
    }
}

async function GetFilltheblankstextOptions(questionId) {
    const sql = `SELECT * FROM tb_fillTheBlanks_options WHERE question_id = ?`;
    try {
        const result = await query(sql, [questionId]);
        logger.info(`✅ [GetFilltheblankstextOptions] Successfully retrieved fill-the-blanks options for question_id = ${questionId}`);
        return result;
    } catch (err) {
        logger.error(`[GetFilltheblankstextOptions] ❌ Failed to retrieve fill-the-blanks options for question_id = ${questionId} - ${err.message}`);
        throw err;
    }
}


// get drag and drop question

async function getDragDropQuestions(condition) {
    const sql = `SELECT * FROM tb_questions WHERE question_type_id = 9 ${condition}`;
    try {
        const result = await query(sql);
        logger.info('✅ [getDragDropQuestions] Successfully retrieved drag-and-drop questions (question_type_id = 5)');
        return result;
    } catch (err) {
        logger.error(`[getDragDropQuestions] ❌ Failed to retrieve drag-and-drop questions - ${err.message}`);
        throw err;
    }
}


async function GetDragDropQuestionsheading(questionId) {
    const sql = `SELECT * FROM DragAndDrop_Headings WHERE question_id = ?`;
    try {
        const result = await query(sql, [questionId]);
        logger.info('✅ [getDragDropQuestions] Successfully retrieved drag-and-drop questions (question_type_id = 5)');
        return result;
    } catch (err) {
        logger.error(`[getDragDropQuestions] ❌ Failed to retrieve drag-and-drop questions - ${err.message}`);
        throw err;
    }
}

async function GetDragDropoption(headings_id) {
    const sql = `SELECT * FROM DragAndDrop_Headings_Options WHERE headings_id = ?`;
    try {
        const result = await query(sql, [headings_id]);
        logger.info('✅ [getDragDropQuestions] Successfully retrieved drag-and-drop questions (question_type_id = 5)');
        return result;
    } catch (err) {
        logger.error(`[getDragDropQuestions] ❌ Failed to retrieve drag-and-drop questions - ${err.message}`);
        throw err;
    }
}

// get multiple radio button question

async function getMultipleRadioQuestions(condition) {
    const sql = `SELECT * FROM tb_questions WHERE question_type_id = 10 ${condition}`; // Confirm this is the correct ID for multiple radio
    try {
        const result = await query(sql);
        logger.info('✅ [getMultipleRadioQuestions] Successfully retrieved multiple-radio questions (question_type_id = 5)');
        return result;
    } catch (err) {
        logger.error(`[getMultipleRadioQuestions] ❌ Failed to retrieve multiple-radio questions - ${err.message}`);
        throw err;
    }
}

async function GetMultipleRadioQuestionsClientfindings(questionId) {
    const sql = `SELECT * FROM tb_MultipleRadio WHERE question_id =?`; // Confirm this is the correct ID for multiple radio
    try {
        const result = await query(sql, [questionId]);
        logger.info('✅ [getMultipleRadioQuestions] Successfully retrieved multiple-radio questions (question_type_id = 5)');
        return result;
    } catch (err) {
        logger.error(`[getMultipleRadioQuestions] ❌ Failed to retrieve multiple-radio questions - ${err.message}`);
        throw err;
    }
}

async function GetMultipleRadioQuestionsRadioOption(questionId) {
    const sql = `SELECT * FROM tb_MultipleRadio WHERE question_id = ?`; // Confirm this is the correct ID for multiple radio
    try {
        const result = await query(sql, [questionId]);
        logger.info('✅ [getMultipleRadioQuestions] Successfully retrieved multiple-radio questions (question_type_id = 5)');
        return result;
    } catch (err) {
        logger.error(`[getMultipleRadioQuestions] ❌ Failed to retrieve multiple-radio questions - ${err.message}`);
        throw err;
    }
}

//get sentance highlight questions

async function getSentenceHighlightQuestions(condition) {
    const sql = `SELECT * FROM tb_questions WHERE question_type_id = 12 ${condition}`;
    try {
        const result = await query(sql);
        logger.info('✅ [getSentenceHighlightQuestions] Successfully retrieved sentence highlight questions (question_type_id = 5)');
        return result;
    } catch (err) {
        logger.error(`[getSentenceHighlightQuestions] ❌ Failed to retrieve sentence highlight questions - ${err.message}`);
        throw err;
    }
}
/**
 * Fetch all questions from tb_questions table
 * where exam_type is 'Mock Test' and not deleted
 *
 * @returns {Promise<Array>} List of questions
 */
async function listMockTestQuestions() {
    try {
        // Prepare SQL – selecting all columns from tb_questions
        // Filtering by exam_type = 'Mock Test' and isDeleted false/null
        const sql = `
            SELECT id,question
            FROM tb_questions
            WHERE exam_type = 'Mock Test'
              AND (isDeleted IS NULL OR isDeleted = 0)
        `;

        // Execute SQL query
        const rows = await query(sql);

        // Log the successful query and count of results
        logger.info(`✅ Retrieved ${rows.length} Mock Test questions from database`);

        return rows;
    } catch (error) {
        // Log the error for debugging/troubleshooting
        logger.error(`❌ Error in listMockTestQuestions: ${error.message}`);

        // Re-throw to let the controller handle the response
        throw error;
    }
}
// tb_tests
// Insert a new test into tb_tests
// Params:
//   fromDate - start date of the test
//   toDate   - end date of the test
//   testTitle - title/type of the test
//   courseId - associated course ID
//
// Returns: Result of the insert operation (e.g. insertId, affectedRows)
async function insertTest({ fromDate, toDate, testTitle, courseId }) {
    try {
        // Prepare SQL statement to insert a test row
        const sql = `
            INSERT INTO tb_tests (fromDate, toDate, testTitle, courseId)
            VALUES (?, ?, ?, ?)
        `;

        // Parameters for the query, in correct order
        const values = [fromDate, toDate, testTitle, courseId];

        // Execute the query
        const result = await query(sql, values);

        // Log successful insert with details
        logger.info(
            `✅ Test created: testTitle=${testTitle}, fromDate=${fromDate}, toDate=${toDate}, courseId=${courseId}, insertId=${result.insertId}`
        );

        return result; // May include insertId, affectedRows, etc.
    } catch (error) {
        // Log error to tracking system with formatted details
        logger.error(
            `❌ Failed to insert test: ${error.message} | Params: fromDate=${fromDate}, toDate=${toDate}, testTitle=${testTitle}, courseId=${courseId}`
        );
        throw error;
    }
}

// tb_testQuestions
async function insertTestQuestion({ testId, questionId }) {
    const sql = `
      INSERT INTO tb_testQuestions (testId, questionId)
      VALUES (?, ?)`;
    const values = [testId, questionId];
    const result = await query(sql, values);
    return result;
}
async function updateTest({ id, testdate, testTitle, courseId }) {
    const sql = `UPDATE tb_tests SET testdate=?, testTitle=?, courseId=? WHERE id=?`;
    return query(sql, [testdate, testTitle, courseId, id]);
}
async function deleteTestQuestionsByTestId(testId) {
    const sql = `DELETE FROM tb_testQuestions WHERE testId=?`;
    return query(sql, [testId]);
}
async function deleteTest(id) {
    const sql = `DELETE FROM tb_tests WHERE id=?`;
    return query(sql, [id]);
}


// CREATE: insert a new marklist record
async function insertMarklist({ studentId, testId, testStatus, mark }) {
    const sql = `INSERT INTO tb_marklist (studentId, testId, testStatus, mark) VALUES (?, ?, ?,?)`;
    const result = await query(sql, [studentId, testId, testStatus, mark]);
    return result;
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
    insertDropdownHeading,
    insertDropdownHeadingOptions,
    insertSortItems,
    insertSentenceQuestion,
    insertHighlightOptionsortItems,
    GetSentenceHighlightOptions,
    insertFillBlankQuestionContent,
    insertFillTheBlanksQuestion,
    insertFillBlankQuestionOptionsHeading,
    insertFillBlankQuestionOptionsHeadingValues,
    insertMultipleRadioQuestionContent,
    insertMultipleRadioQuestion,
    insertMultipleRadioOptions,
    insertDragDropQuestion,
    insertDragDropOptionsHeading,
    insertDragDropOptionsHeadingValues,

    getMcqQuestions,
    Getmcqoption,

    getDropdownQuestions,
    Getdropdownquestiontext,
    Getdropdownoption,

    getFillInTheBlanksQuestions,
    GetFilltheblankstext,
    GetFilltheblankstextOptions,

    getDragDropQuestions,
    GetDragDropQuestionsheading,
    GetDragDropoption,

    getMultipleRadioQuestions,
    GetMultipleRadioQuestionsClientfindings,
    GetMultipleRadioQuestionsRadioOption,

    getSortingQuestions,
    Getsortingoption,

    getSentenceHighlightQuestions,

    Gettabs,
    getAdditionalInfo,
    Getexplantion,
    listMockTestQuestions,
    insertTest,
    insertTestQuestion,
    updateTest,
    deleteTestQuestionsByTestId,
    deleteTest,
    insertMarklist
};

