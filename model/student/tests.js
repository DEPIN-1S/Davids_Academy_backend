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
// list questions not submitted by student
module.exports.ListUnsubmittedTestQuestions = async (test_id, user_id) => {
    try {
        const sql = `
      SELECT questionId
      FROM tb_testQuestions tq
      WHERE tq.testId = ?
        AND NOT EXISTS (
          SELECT 1
          FROM tb_submittedQuestions sq
          WHERE sq.sq_test_id = tq.testId
            AND sq.sq_user_id = ?
            AND sq.sq_question_id = tq.questionId
        )
      ORDER BY tq.id ASC
    `;
        logger.info('[Testsmodel] List unsubmitted questions for test', { test_id, user_id });
        const data = await query(sql, [test_id, user_id]);
        console.log(data);
        return data;
    } catch (error) {
        logger.error('[Testsmodel] Error listing unsubmitted questions', { error: error.message, test_id, user_id });
        throw error;
    }
};

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
// >>>>>>>>>>>>>>>>>>Question data of each questions<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
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
// get mcq options
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
// get mcq answers 
module.exports.GetmcqAnswers = async (questionId) => {
    try {
        const sql = `SELECT * from tb_mcqAnswers where questionId=?`;
        logger.info('[MCQOptionsmodel] Retriveing answers from tb_mcqAnswers table in db', questionId);
        const data = await query(sql, [questionId]);
        return data;
    } catch (error) {
        logger.error('[MCQAnswersmodel] Error in retriveing options from mcq options table in db', { error: error.message });
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
        const sql = `SELECT id, questionId, dropdownField,dropdownanswer, blankOrNot, createdAt, updatedAt FROM tb_dropdowns WHERE questionId = ?`;
        const data = await query(sql, [questionId]);
        logger.info(` [Getdropdownquestiontext] Successfully retrieved dropdown-type questions for questionId = ${questionId}`);
        return data;
    } catch (error) {
        logger.error(`[Getdropdownquestiontext]  Failed to retrieve dropdown-type questions for questionId = ${questionId} - ${err.message}`);
        throw error;
    }
}
module.exports.Getdropdownoption = async (dropdowntext_id) => {
    const sql = `SELECT * FROM tb_dropdownOptions WHERE dropdowntext_id = ?`;
    try {
        const result = await query(sql, [dropdowntext_id]);
        logger.info(` [Getdropdownoption] Successfully retrieved dropdown options for dropdowntext_id = ${dropdowntext_id}`);
        return result;
    } catch (err) {
        logger.error(`[Getdropdownoption]  Failed to retrieve dropdown options for dropdowntext_id = ${dropdowntext_id} - ${err.message}`);
        throw err;
    }
}
module.exports.Gettabs = async (questionId) => {
    const sql = `SELECT * FROM tb_questionTabs WHERE questionId = ?`;
    try {
        const result = await query(sql, [questionId]);
        logger.info(` [Gettabs] Successfully retrieved tabs for questionId = ${questionId}`);
        return result;
    } catch (err) {
        logger.error(`[Gettabs]  Failed to retrieve tabs for questionId = ${questionId} - ${err.message}`);
        throw err;
    }
}
module.exports.GetHighlightOptions = async (questionId) => {
    const sql = `SELECT * FROM tb_sentanceHighlight WHERE questionId = ?`;
    try {
        const result = await query(sql, [questionId]);
        logger.info(` [GetHighlightOptions] Successfully retrieved sentence highligh options for questionId = ${questionId}`);
        return result;
    } catch (err) {
        logger.error(`[GetHighlightOptions]  Failed to retrieve sentence highligh options for questionId = ${questionId} - ${err.message}`);
        throw err;
    }
}
module.exports.GetHighlightAnswers = async (questionId) => {
    const sql = `SELECT id,questionId,answer FROM tb_sentenceHighlightAnswers WHERE questionId = ?`;
    try {
        const result = await query(sql, [questionId]);
        logger.info(` [GetHighlightOptions] Successfully retrieved sentence highlight answers for questionId = ${questionId}`);
        return result;
    } catch (err) {
        logger.error(`[GetHighlightOptions]  Failed to retrieve sentence highligh answers for questionId = ${questionId} - ${err.message}`);
        throw err;
    }
}
module.exports.getAdditionalInfo = async (questionId) => {
    const sql = `SELECT * FROM tb_additionalInfo WHERE questionId = ?`;
    try {
        const result = await query(sql, [questionId]);
        logger.info(` [getAdditionalInfo] Successfully retrieved additional info for questionId = ${questionId}`);
        return result;
    } catch (err) {
        logger.error(`[getAdditionalInfo]  Failed to retrieve additional info for questionId = ${questionId} - ${err.message}`);
        throw err;
    }
}
module.exports.Getexplantion = async (questionId) => {
    const sql = `SELECT * FROM tb_explanation WHERE questionId =?`;
    try {
        const result = await query(sql, [questionId]);
        logger.info(' [Getexplantion] Successfully retrieved sentence highlight questions ');
        return result;
    } catch (err) {
        logger.error(`[Getexplantion]  Failed to retrieve sentence highlight questions - ${err.message}`);
        throw err;
    }
}
module.exports.Getsortingoption = async (questionId) => {
    const sql = `SELECT id, questionId, sortItem,itemOrder FROM tb_sortItems WHERE questionId = ?`;
    try {
        const result = await query(sql, [questionId]);
        logger.info(` [Getsortingoption] Successfully retrieved sorting options for questionId = ${questionId}`);
        return result;
    } catch (err) {
        logger.error(`[Getsortingoption]  Failed to retrieve sorting options for questionId = ${questionId} - ${err.message}`);
        throw err;
    }
}
module.exports.GetFilltheblankstext = async (questionId) => {
    const sql = `SELECT id, question_id, question_text FROM tb_fillTheBlanks WHERE question_id = ?`;
    try {
        const result = await query(sql, [questionId]);
        logger.info(` [GetFilltheblankstext] Successfully retrieved fill-the-blanks text for question_id = ${questionId}`);
        return result;
    } catch (err) {
        logger.error(`[GetFilltheblankstext]  Failed to retrieve fill-the-blanks text for question_id = ${questionId} - ${err.message}`);
        throw err;
    }
}
module.exports.GetFilltheblankstextOptions = async (questionId) => {
    const sql = `SELECT * FROM tb_fillTheBlanks_options WHERE question_id = ?`;
    try {
        const result = await query(sql, [questionId]);
        logger.info(` [GetFilltheblankstextOptions] Successfully retrieved fill-the-blanks options for question_id = ${questionId}`);
        return result;
    } catch (err) {
        logger.error(`[GetFilltheblankstextOptions]  Failed to retrieve fill-the-blanks options for question_id = ${questionId} - ${err.message}`);
        throw err;
    }
}
module.exports.GetDragDropQuestionsheading = async (questionId) => {
    const sql = `SELECT * FROM DragAndDrop_Headings WHERE question_id = ?`;
    try {
        const result = await query(sql, [questionId]);
        logger.info(' [getDragDropQuestions] Successfully retrieved drag-and-drop questions (question_type_id = 5)');
        return result;
    } catch (err) {
        logger.error(`[getDragDropQuestions]  Failed to retrieve drag-and-drop questions - ${err.message}`);
        throw err;
    }
}
module.exports.GetDragDropoption = async (headings_id) => {
    const sql = `SELECT * FROM DragAndDrop_Headings_Options WHERE headings_id = ?`;
    try {
        const result = await query(sql, [headings_id]);
        logger.info(' [getDragDropQuestions] Successfully retrieved drag-and-drop questions (question_type_id = 5)');
        return result;
    } catch (err) {
        logger.error(`[getDragDropQuestions]  Failed to retrieve drag-and-drop questions - ${err.message}`);
        throw err;
    }
}
module.exports.GetMultipleRadioQuestionsClientfindings = async (questionId) => {
    const sql = `SELECT * FROM tb_MultipleRadio WHERE question_id =?`; // Confirm this is the correct ID for multiple radio
    try {
        const result = await query(sql, [questionId]);
        logger.info(' [getMultipleRadioQuestions] Successfully retrieved multiple-radio questions (question_type_id = 5)');
        return result;
    } catch (err) {
        logger.error(`[getMultipleRadioQuestions]  Failed to retrieve multiple-radio questions - ${err.message}`);
        throw err;
    }
}
module.exports.GetMultipleRadioQuestionsRadioOption = async (questionId) => {
    const sql = `SELECT * FROM tb_MultipleRadio WHERE question_id = ?`; // Confirm this is the correct ID for multiple radio
    try {
        const result = await query(sql, [questionId]);
        logger.info(' [getMultipleRadioQuestions] Successfully retrieved multiple-radio questions (question_type_id = 5)');
        return result;
    } catch (err) {
        logger.error(`[getMultipleRadioQuestions]  Failed to retrieve multiple-radio questions - ${err.message}`);
        throw err;
    }
}
// Table Dropdown
module.exports.GetTableDropdownHeaders = async (questionId) => {
    const sql = `SELECT left_header, right_header FROM tb_table_dropdown_headers WHERE question_id = ?`;
    try {
        const result = await query(sql, [questionId]);
        logger.info(`[GetTableDropdownHeaders] Successfully retrieved headers for questionId = ${questionId}`);
        return result;
    } catch (err) {
        logger.error(`[GetTableDropdownHeaders] ❌ Failed to retrieve headers for questionId = ${questionId} - ${err.message}`);
        throw err;
    }
};

module.exports.GetTableDropdownRows = async (questionId) => {
    const sql = `SELECT id, field_label FROM tb_table_dropdown_fields WHERE question_id = ?`;
    try {
        const result = await query(sql, [questionId]);
        logger.info(`[GetTableDropdownRows] Successfully retrieved rows for questionId = ${questionId}`);
        return result;
    } catch (err) {
        logger.error(`[GetTableDropdownRows] ❌ Failed to retrieve rows for questionId = ${questionId} - ${err.message}`);
        throw err;
    }
};

module.exports.GetTableDropdownOptions = async (questionId, rowId) => {
    const sql = `SELECT option_value FROM tb_table_dropdown_options WHERE question_id=? AND row_id = ?`;
    try {
        const result = await query(sql, [questionId, rowId]);
        logger.info(`[GetTableDropdownOptions] Successfully retrieved options for questionId = ${questionId}, rowId = ${rowId}`);
        return result;
    } catch (err) {
        logger.error(`[GetTableDropdownOptions] ❌ Failed to retrieve options for questionId = ${questionId}, rowId = ${rowId} - ${err.message}`);
        throw err;
    }
};

module.exports.GetTableDropdownAnswer = async (questionId) => {
    const sql = `SELECT row_label,answer FROM tb_table_dropdown_answers WHERE question_id = ?`;
    try {
        const result = await query(sql, [questionId]);
        logger.info(`[GetTableDropdownAnswer] Successfully retrieved answers for questionId = ${questionId}`);
        return result;
    } catch (err) {
        logger.error(`[GetTableDropdownAnswer] ❌ Failed to retrieve answers for questionId = ${questionId} - ${err.message}`);
        throw err;
    }
};

// Table Highlight
module.exports.GetTableHighlightRows = async (questionId) => {
    const sql = `SELECT id, left_column, right_column, sort_order FROM tb_table_highlight_rows WHERE question_id = ? ORDER BY COALESCE(sort_order, id) ASC`;
    try {
        const result = await query(sql, [questionId]);
        logger.info(`[GetTableHighlightRows] Successfully retrieved highlight rows for questionId = ${questionId}`);
        return result;
    } catch (err) {
        logger.error(`[GetTableHighlightRows] ❌ Failed to retrieve highlight rows for questionId = ${questionId} - ${err.message}`);
        throw err;
    }
};

// Multi Dropdown
module.exports.GetMultiDropdownHeaders = async function (questionId) {
    const sql = `SELECT col_index, header_text
               FROM tb_multi_dropdown_headers
               WHERE question_id = ?
               ORDER BY col_index ASC`;
    try {
        const rows = await query(sql, [questionId]);
        logger.info(`✅ [GetMultiDropdownHeaders] q=${questionId} count=${rows.length}`);
        return rows;
    } catch (err) {
        logger.error(`❌ [GetMultiDropdownHeaders] q=${questionId} - ${err.message}`);
        throw err;
    }
};

module.exports.GetMultiDropdownRows = async (questionId) => {
    const sql = `SELECT id, row_label, sort_order FROM tb_multi_dropdown_rows WHERE question_id = ? ORDER BY COALESCE(sort_order, id) ASC`;
    try {
        const result = await query(sql, [questionId]);
        logger.info(`[GetMultiDropdownRows] Successfully retrieved multi dropdown rows for questionId = ${questionId}`);
        return result;
    } catch (err) {
        logger.error(`[GetMultiDropdownRows] ❌ Failed to retrieve multi dropdown rows for questionId = ${questionId} - ${err.message}`);
        throw err;
    }
};
module.exports.GetMultiDropdownCells = async function (rowId, rowId, questionId) {
    const sql = `
    SELECT
      h.col_index,
      o.option_value,
      a.answer_value
    FROM tb_multi_dropdown_headers h
    LEFT JOIN tb_multi_dropdown_options o
      ON o.question_id = h.question_id
     AND o.row_id = ?
     AND o.col_index = h.col_index
    LEFT JOIN tb_multi_dropdown_answers a
      ON a.question_id = h.question_id
     AND a.row_id = ?
     AND a.col_index = h.col_index
    WHERE h.question_id = ?
    ORDER BY h.col_index ASC, o.id ASC
  `;
    try {
        const rows = await query(sql, [rowId, rowId, questionId]);
        logger.info(`✅ [GetMultiDropdownCells] q=${questionId} row=${rowId} rows=${rows.length}`);
        return rows;
    } catch (err) {
        logger.error(`❌ [GetMultiDropdownCells] q=${questionId} row=${rowId} - ${err.message}`);
        throw err;
    }
};

module.exports.GetMultiDropdownOptions = async (rowId) => {
    const sql = `SELECT option_value FROM tb_multi_dropdown_options WHERE row_id = ? ORDER BY id ASC`;
    try {
        const result = await query(sql, [rowId]);
        logger.info(`[GetMultiDropdownOptions] Successfully retrieved multi dropdown options for rowId = ${rowId}`);
        return result;
    } catch (err) {
        logger.error(`[GetMultiDropdownOptions] ❌ Failed to retrieve multi dropdown options for rowId = ${rowId} - ${err.message}`);
        throw err;
    }
};

module.exports.GetMultiDropdownAnswers = async (rowId) => {
    const sql = `SELECT answer_value FROM tb_multi_dropdown_answers WHERE row_id = ? ORDER BY id ASC`;
    try {
        const result = await query(sql, [rowId]);
        logger.info(`[GetMultiDropdownAnswers] Successfully retrieved multi dropdown answers for rowId = ${rowId}`);
        return result;
    } catch (err) {
        logger.error(`[GetMultiDropdownAnswers] ❌ Failed to retrieve multi dropdown answers for rowId = ${rowId} - ${err.message}`);
        throw err;
    }
};

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< test related models >>>>>>>>>>>>>>>>>>>>>>>>>>>>>

module.exports.CheckQuestionAlreadySubmitted = async (user_id, question_id, test_id) => {
    const sql = `SELECT * FROM tb_submittedQuestions WHERE sq_user_id=? and sq_test_id=? and sq_question_id=?`; // Confirm this is the correct ID for multiple radio
    try {
        const result = await query(sql, [user_id, test_id, question_id]);
        logger.info(` [CheckQuestionAlreadySubmitted] Check question already submitted -user : ${user_id} question : ${question_id} test : ${test_id}`);
        return result;
    } catch (err) {
        logger.error(`[CheckQuestionAlreadySubmitted]  Failed to Check question already submitted - ${err.message}`);
        throw err;
    }
}
// insert mock test answers
module.exports.SubmitQuestionData = async (user_id, question_id, test_id, is_correct, mark) => {
    const sql = `INSERT into tb_submittedQuestions ( sq_user_id, sq_test_id, sq_question_id,sq_is_correct,sq_mark) values(?,?,?,?,?)`; // Confirm this is the correct ID for multiple radio
    try {
        const result = await query(sql, [user_id, test_id, question_id, is_correct, mark]);
        logger.info(` [SubmitQuestionData] Submitting the question data -user : ${user_id} question : ${question_id} test : ${test_id}`);
        return result;
    } catch (err) {
        logger.error(`[SubmitQuestionData]  Failed to submit question data - ${err.message}`);
        throw err;
    }
}
// insert q bank answers
module.exports.SubmitQbankQuestionData = async (user_id, question_id, is_correct, mark) => {
    const sql = `INSERT INTO tb_QbankSubmit (user_id, questionId, is_correct, mark) VALUES (?, ?, ?, ?)`;
    try {
        const result = await query(sql, [user_id, question_id, is_correct, mark]);
        logger.info(`[SubmitQbankQuestionData] Submitting question data - user: ${user_id}, question: ${question_id}`);
        return result;
    } catch (err) {
        logger.error(`[SubmitQbankQuestionData] Failed to submit question data - ${err.message}`);
        throw err;
    }
}

module.exports.CheckTestAlreadySubmitted = async (user_id, test_id) => {
    const sql = `SELECT * from tb_submittedTest where st_user_id=? and st_test_id=?`;
    try {
        const result = await query(sql, [user_id, test_id]);
        logger.info(` [CheckTestAlreadySubmitted] Check test already submitted or not -user : ${user_id} test : ${test_id}`);
        return result;
    } catch (err) {
        logger.error(`[CheckTestAlreadySubmitted]  Failed to Check test already submitted or not - ${err.message}`);
        throw err;
    }
}
module.exports.GetSubmittedAnswer = async (user_id, test_id) => {
    const sql = `SELECT * from tb_submittedQuestions where sq_user_id=? and sq_test_id=?`;
    try {
        const result = await query(sql, [user_id, test_id]);
        logger.info(` [GetSubmittedAnswer] List submitted question data -user : ${user_id} test : ${test_id}`);
        return result;
    } catch (err) {
        logger.error(`[GetSubmittedAnswer]  Failed to list submitted question data - ${err.message}`);
        throw err;
    }
}
module.exports.SubmitTestData = async (user_id, test_id, total_score) => {
    const sql = `
    INSERT INTO tb_submittedTest (st_user_id, st_test_id, st_score, st_created_at, st_updated_at, is_submitted, status) 
    VALUES (?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 0, 'pending')
    ON DUPLICATE KEY UPDATE 
      st_score = VALUES(st_score), 
      st_updated_at = CURRENT_TIMESTAMP,
      is_submitted = 0,
      status = 'pending'
  `;
    try {
        const result = await query(sql, [user_id, test_id, total_score]);
        logger.info(`✅ [SubmitTestData] UPSERT test data -user: ${user_id} score: ${total_score} test: ${test_id}, affectedRows: ${result.affectedRows}`);
        return result;
    } catch (err) {
        logger.error(`[SubmitTestData] ❌ Failed to UPSERT test data - ${err.message}`);
        throw err;
    }
};
// Ensure this method is present
module.exports.UpdateTestSubmissionStatus = async (user_id, test_id) => {
    const sql = `
    UPDATE tb_submittedTest 
    SET is_submitted = 1, status = 'completed', st_updated_at = CURRENT_TIMESTAMP 
    WHERE st_user_id = ? AND st_test_id = ?
  `;
    try {
        const result = await query(sql, [user_id, test_id]);
        logger.info(`✅ [UpdateTestSubmissionStatus] Set completed -user: ${user_id} test: ${test_id}, affectedRows: ${result.affectedRows}`);
        return result;
    } catch (err) {
        logger.error(`[UpdateTestSubmissionStatus]  Failed to set completed - ${err.message}`);
        throw err;
    }
};
// Enhanced ListAllTestsWithStatus (for /test/list)
// module.exports.ListAllTestsWithStatus = async (courseId, user_id) => {
//     const sql = `
//     SELECT
//   t.id, t.testTitle, t.courseId, t.fromDate, t.toDate,t.totalQuestions,
//   st.is_submitted, st.status,
//   usq.submittedQuestions, usq.correctAnswers, usq.wrongAnswers,
//   CASE WHEN st.is_submitted = 1 THEN 1 ELSE 0 END AS isCompleted
// FROM tb_tests t
// LEFT JOIN (
//   SELECT 
//     st_test_id, st_user_id,
//     MAX(is_submitted) AS is_submitted,
//     MAX(status) AS status
//   FROM tb_submittedTest
//   GROUP BY st_test_id, st_user_id
// ) st
//   ON t.id = st.st_test_id AND st.st_user_id = ?
// LEFT JOIN (
//   SELECT 
//     sq_test_id, sq_user_id,
//     COUNT(DISTINCT sq_question_id) AS submittedQuestions,
//     COUNT(DISTINCT CASE WHEN sq_is_correct = 1 THEN sq_question_id END) AS correctAnswers,
//     COUNT(DISTINCT CASE WHEN sq_is_correct = 0 THEN sq_question_id END) AS wrongAnswers
//   FROM tb_submittedQuestions
//   GROUP BY sq_test_id, sq_user_id
// ) usq
//   ON t.id = usq.sq_test_id AND usq.sq_user_id = ?
// WHERE t.courseId = ?
//   AND DATE(t.fromDate) <= CURDATE()
//   AND DATE(t.toDate) >= CURDATE()
// ORDER BY t.fromDate DESC;

//   `;
//     try {
//         const data = await query(sql, [user_id, user_id, courseId]);
//         logger.info('[Testsmodel] Listed tests with status', { courseId, user_id });
//         return data;
//     } catch (error) {
//         logger.error('[Testsmodel] Error listing tests with status', { error: error.message });
//         throw error;
//     }
// };

module.exports.ListAllTestsWithStatus = async (courseId, user_id, search = "") => {
    const sql = `
    SELECT
      t.id,
      t.testTitle,
      t.courseId,
      t.fromDate,
      t.toDate,
      t.totalQuestions,
      st.is_submitted,
      st.status,
      usq.submittedQuestions,
      usq.correctAnswers,
      usq.wrongAnswers,
      CASE WHEN st.is_submitted = 1 THEN 1 ELSE 0 END AS isCompleted
    FROM tb_tests t
    LEFT JOIN (
      SELECT 
        st_test_id,
        st_user_id,
        MAX(is_submitted) AS is_submitted,
        MAX(status) AS status
      FROM tb_submittedTest
      GROUP BY st_test_id, st_user_id
    ) st
      ON t.id = st.st_test_id AND st.st_user_id = ?
    LEFT JOIN (
      SELECT 
        sq_test_id,
        sq_user_id,
        COUNT(DISTINCT sq_question_id) AS submittedQuestions,
        COUNT(DISTINCT CASE WHEN sq_is_correct = 1 THEN sq_question_id END) AS correctAnswers,
        COUNT(DISTINCT CASE WHEN sq_is_correct = 0 THEN sq_question_id END) AS wrongAnswers
      FROM tb_submittedQuestions
      GROUP BY sq_test_id, sq_user_id
    ) usq
      ON t.id = usq.sq_test_id AND usq.sq_user_id = ?
    WHERE t.courseId = ?
      AND DATE(t.fromDate) <= CURDATE()
      AND DATE(t.toDate) >= CURDATE()
      AND (
        ? = '' 
        OR t.testTitle LIKE CONCAT('%', ?, '%')
      )
    ORDER BY t.fromDate DESC;
    `;

    try {
        const data = await query(sql, [
            user_id,
            user_id,
            courseId,
            search,
            search
        ]);

        logger.info('[Testsmodel] Listed tests with status', { courseId, user_id, search });
        return data;
    } catch (error) {
        logger.error('[Testsmodel] Error listing tests with status', { error: error.message });
        throw error;
    }
};

