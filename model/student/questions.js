const db = require('../../config/db');
const util = require('util');
const query = util.promisify(db.query).bind(db);
const logger = require('../../utils/logger');


module.exports.ListQuestionIds = async (courseId) => {
    const sql = `SELECT id from tb_questions WHERE courseId = ? and exam_type=?`;
    try {
        const result = await query(sql, [courseId, 'q-bank']);
        logger.info(`✅ [ListQuestionIds] Successfully retrieved list of question ids based on course id = ${courseId} and exam_type = 'q-bank'`);
        return result;
    } catch (err) {
        logger.error(`[ListQuestionIds] ❌ Failed to retrieve list of question ids based on course id = ${courseId} ${err.message}`);
        throw err;
    }
}

module.exports.GetStudentData = async (studentId) => {
    try {
        const sql = `SELECT * from tb_users where id=?`;
        logger.info('[Usermodel] Get data of student in db', studentId);
        const data = await query(sql, [studentId]);
        return data;
    } catch (error) {
        logger.error('[Usermodel] Error in Get data of student', { error: error.message });
        throw error;
    }
}

module.exports.CheckQuestion = async (questionId) => {
    try {
        const sql = `SELECT * from tb_questions where id=?`;
        logger.info('[Usermodel] Check questions in db', questionId);
        const data = await query(sql, [questionId]);
        return data;
    } catch (error) {
        logger.error('[Usermodel] Error in check questions in db', { error: error.message });
        throw error;
    }
}


module.exports.GetQuestionData = async (questionId) => {
    try {
        const sql = `
            SELECT 
                q.*, 
                qt.type AS question_type
            FROM 
                tb_questions q
            LEFT JOIN 
                tb_questionType qt 
            ON 
                q.question_type_id = qt.id
            WHERE 
                q.id = ?
        `;

        logger.info('[Usermodel] GetQuestionData with join', questionId);
        const data = await query(sql, [questionId]);
        return data;

    } catch (error) {
        logger.error('[Usermodel] Error in GetQuestionData', { error: error.message });
        throw error;
    }
}


module.exports.GetMcqQuestion = async (questionId) => {
    try {
        const sql = `SELECT * from tb_questions where id=?`;
        logger.info('[Usermodel] Check questions in db', questionId);
        const data = await query(sql, [questionId]);
        return data;
    } catch (error) {
        logger.error('[Usermodel] Error in check questions in db', { error: error.message });
        throw error;
    }
}


module.exports.Getmcqoption = async (questionId) => {
    try {
        const sql = `SELECT * from tb_mcqOptions where questionId=?`;
        logger.info('[MCQOptionsmodel] Retriveing options from mcq options table in db', questionId);
        const data = await query(sql, [questionId]);
        return data;
    } catch (error) {
        logger.error('[MCQOptionsmodel] Error in retriveing options from mcq options table in db', { error: error.message });
        throw error;
    }
}


module.exports.GetAdditionalInfo = async (questionId) => {
    try {
        const sql = `SELECT * from tb_additionalInfo where questionId=?`;
        logger.info('[MCQOptionsmodel] Retriveing mcq aditional info from additional info table in db', questionId);
        const data = await query(sql, [questionId]);
        return data;
    } catch (error) {
        logger.error('[MCQOptionsmodel] Error in retriveing mcq aditional info from additional info table in db', { error: error.message });
        throw error;
    }
}


module.exports.Getexplantion = async (questionId) => {
    try {
        const sql = `SELECT * from tb_explanation where questionId=?`;
        logger.info('[MCQOptionsmodel] Retriveing mcq explanation from explanation table in db', questionId);
        const data = await query(sql, [questionId]);
        return data;
    } catch (error) {
        logger.error('[MCQOptionsmodel] Error in retriveing mcq explanation from explanation table in db', { error: error.message });
        throw error;
    }
}


module.exports.Getdropdownquestiontext = async (questionId) => {
    try {
        const sql = `SELECT id, questionId, dropdownField, blankOrNot, createdAt, updatedAt FROM tb_dropdowns WHERE questionId = ?`;
        const data = await query(sql, [questionId]);
        logger.info(`✅ [Getdropdownquestiontext] Successfully retrieved dropdown-type questions for questionId = ${questionId}`);
        return data;
    } catch (error) {
        logger.error(`[Getdropdownquestiontext] ❌ Failed to retrieve dropdown-type questions for questionId = ${questionId} - ${err.message}`);
        throw error;
    }
}


module.exports.Getdropdownoption = async (dropdowntext_id) => {
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


module.exports.Gettabs = async (questionId) => {
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


module.exports.GetHighlightOptions = async (questionId) => {
    const sql = `SELECT * FROM tb_sentanceHighlight WHERE questionId = ?`;
    try {
        const result = await query(sql, [questionId]);
        logger.info(`✅ [GetHighlightOptions] Successfully retrieved sentence highligh options for questionId = ${questionId}`);
        return result;
    } catch (err) {
        logger.error(`[GetHighlightOptions] ❌ Failed to retrieve sentence highligh options for questionId = ${questionId} - ${err.message}`);
        throw err;
    }
}


module.exports.getAdditionalInfo = async (questionId) => {
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


module.exports.Getexplantion = async (questionId) => {
    const sql = `SELECT * FROM tb_explanation WHERE questionId =?`;
    try {
        const result = await query(sql, [questionId]);
        logger.info('✅ [Getexplantion] Successfully retrieved sentence highlight questions ');
        return result;
    } catch (err) {
        logger.error(`[Getexplantion] ❌ Failed to retrieve sentence highlight questions - ${err.message}`);
        throw err;
    }
}


module.exports.Getsortingoption = async (questionId) => {
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


module.exports.GetFilltheblankstext = async (questionId) => {
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


module.exports.GetFilltheblankstextOptions = async (questionId) => {
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


module.exports.GetDragDropQuestionsheading = async (questionId) => {
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


module.exports.GetDragDropoption = async (questionId) => {
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


module.exports.GetMultipleRadioQuestionsClientfindings = async (questionId) => {
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


module.exports.GetMultipleRadioQuestionsRadioOption = async (questionId) => {
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
