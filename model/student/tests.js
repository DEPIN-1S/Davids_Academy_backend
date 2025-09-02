const db = require('../../config/db');
const util = require('util');
const query = util.promisify(db.query).bind(db);
const logger = require('../../utils/logger');


module.exports.ListAllTests = async (courseId) => {
    try {
        const sql = `
            SELECT * 
            FROM tb_tests 
            WHERE courseId = ?
            AND DATE(fromDate) <= CURDATE()
            AND DATE(toDate) >= CURDATE()
        `;
        logger.info('[Testsmodel] Listing tests in db', courseId);
        const data = await query(sql, [courseId]);
        return data;
    } catch (error) {
        logger.error('[Testsmodel] Error in listing tests', { error: error.message });
        throw error;
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


module.exports.CheckTest = async (test_id, courseId) => {
    try {
        const sql = `SELECT * from tb_tests where id=? and courseId=?`;
        logger.info('[Usermodel] Check data of test in db', test_id, courseId);
        const data = await query(sql, [test_id, courseId]);
        return data;
    } catch (error) {
        logger.error('[Usermodel] Error in check data of test', { error: error.message });
        throw error;
    }
}


module.exports.ListTestQuestions = async (test_id) => {
    try {
        const sql = `SELECT * from tb_testQuestions where testId=? `;
        logger.info('[Usermodel] List questions of test in db', test_id);
        const data = await query(sql, [test_id]);
        return data;
    } catch (error) {
        logger.error('[Usermodel] Error in list questions of test', { error: error.message });
        throw error;
    }
}


module.exports.CheckQuestionInTest = async (test_id, questionId) => {
    try {
        const sql = `SELECT * from tb_testQuestions where testId=? and questionId=?`;
        logger.info('[Usermodel] Check questions present in test in db', test_id, questionId);
        const data = await query(sql, [test_id, questionId]);
        return data;
    } catch (error) {
        logger.error('[Usermodel] Error in check questions present in test', { error: error.message });
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


module.exports.GetDragDropoption = async (headings_id) => {
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


module.exports.CheckQuestionAlreadySubmitted = async (user_id, question_id, test_id) => {
    const sql = `SELECT * FROM tb_submittedQuestions WHERE sq_user_id=? and sq_test_id=? and sq_question_id=?`; // Confirm this is the correct ID for multiple radio
    try {
        const result = await query(sql, [user_id, test_id, question_id]);
        logger.info(`✅ [CheckQuestionAlreadySubmitted] Check question already submitted -user : ${user_id} question : ${question_id} test : ${test_id}`);
        return result;
    } catch (err) {
        logger.error(`[CheckQuestionAlreadySubmitted] ❌ Failed to Check question already submitted - ${err.message}`);
        throw err;
    }
}


module.exports.SubmitQuestionData = async (user_id, question_id, test_id, is_correct, mark) => {
    const sql = `INSERT into tb_submittedQuestions ( sq_user_id, sq_test_id, sq_question_id,sq_is_correct,sq_mark) values(?,?,?,?,?)`; // Confirm this is the correct ID for multiple radio
    try {
        const result = await query(sql, [user_id, test_id, question_id, is_correct, mark]);
        logger.info(`✅ [SubmitQuestionData] Submitting the question data -user : ${user_id} question : ${question_id} test : ${test_id}`);
        return result;
    } catch (err) {
        logger.error(`[SubmitQuestionData] ❌ Failed to submit question data - ${err.message}`);
        throw err;
    }
}


module.exports.CheckTestAlreadySubmitted = async (user_id, test_id) => {
    const sql = `SELECT * from tb_submittedTest where st_user_id=? and st_test_id=?`;
    try {
        const result = await query(sql, [user_id, test_id]);
        logger.info(`✅ [CheckTestAlreadySubmitted] Check test already submitted or not -user : ${user_id} test : ${test_id}`);
        return result;
    } catch (err) {
        logger.error(`[CheckTestAlreadySubmitted] ❌ Failed to Check test already submitted or not - ${err.message}`);
        throw err;
    }
}


module.exports.SubmitTestData = async (user_id, test_id, total_score) => {
    const sql = `INSERT into tb_submittedtest ( st_user_id, st_test_id,st_score ) values(?,?,?)`;
    try {
        const result = await query(sql, [user_id, test_id, total_score]);
        logger.info(`✅ [SubmitTestData] Submitting the test data -user : ${user_id} score : ${total_score} test : ${test_id}`);
        return result;
    } catch (err) {
        logger.error(`[SubmitTestData] ❌ Failed to submit test data - ${err.message}`);
        throw err;
    }
}


module.exports.GetSubmittedAnswer = async (user_id, test_id) => {
    const sql = `SELECT * from tb_submittedQuestions where sq_user_id=? and sq_test_id=?`;
    try {
        const result = await query(sql, [user_id, test_id]);
        logger.info(`✅ [GetSubmittedAnswer] List submitted question data -user : ${user_id} test : ${test_id}`);
        return result;
    } catch (err) {
        logger.error(`[GetSubmittedAnswer] ❌ Failed to list submitted question data - ${err.message}`);
        throw err;
    }
}