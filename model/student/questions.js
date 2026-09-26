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

// List question ids for a course that the student has NOT submitted yet
module.exports.ListQuestionIdsNotSubmitted = async (courseId, studentId, topics = null, limitCount = null) => {
    let sql = `
      SELECT id FROM tb_questions 
      WHERE courseId = ? AND exam_type = 'q-bank'
      AND id NOT IN (
        SELECT questionId FROM tb_QbankSubmit WHERE user_id = ?
      )
    `;
    const params = [courseId, studentId];

    if (topics && topics.length > 0) {
        // topics should be an array of topic IDs or a comma-separated string
        const topicList = Array.isArray(topics) ? topics : topics.split(',').map(t => t.trim());
        const placeholders = topicList.map(() => '?').join(',');
        sql += ` AND topic_id IN (${placeholders})`;
        params.push(...topicList);
    }

    // Incomplete dropdown saves have a question row but no answer fields.
    // Keep them out of the student bank so the attempt screen is never empty.
    sql += `
      AND NOT EXISTS (
        SELECT 1 FROM tb_questionType qt
        WHERE qt.id = tb_questions.question_type_id
          AND LOWER(qt.type) = 'dropdown'
          AND NOT EXISTS (SELECT 1 FROM tb_dropdowns d WHERE d.questionId = tb_questions.id)
      )
      AND NOT EXISTS (
        SELECT 1 FROM tb_questionType qt
        WHERE qt.id = tb_questions.question_type_id
          AND LOWER(qt.type) = 'table dropdown'
          AND NOT EXISTS (SELECT 1 FROM tb_table_dropdown_fields f WHERE f.question_id = tb_questions.id)
      )
      AND NOT EXISTS (
        SELECT 1 FROM tb_questionType qt
        WHERE qt.id = tb_questions.question_type_id
          AND LOWER(qt.type) = 'multidropdown'
          AND NOT EXISTS (SELECT 1 FROM tb_multi_dropdown_rows r WHERE r.question_id = tb_questions.id)
      )
    `;
    
    // Always randomize for Q-Bank practice? Or just when a limit is provided?
    // According to best practices, custom mock exams are randomized. Let's strictly do this for count.
    if (limitCount && !isNaN(limitCount)) {
        sql += ` ORDER BY RAND() LIMIT ?`;
        params.push(Number(limitCount));
    }

    try {
        console.log("🔍 SQL QUERY GENERATED FOR Q-BANK:");
        console.log({ sql, params });
        const rows = await query(sql, params);
        logger.info(`✅ [ListQuestionIdsNotSubmitted] q=${courseId} student=${studentId} filtered by ${topics ? 'topics' : 'no topics'}, limit ${limitCount ? limitCount : 'none'} count=${rows.length}`);
        return rows;
    } catch (err) {
        logger.error(`❌ [ListQuestionIdsNotSubmitted] q=${courseId} student=${studentId} - ${err.message}`);
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
        const sql = `SELECT id, questionId, dropdownField,dropdownanswer, blankOrNot FROM tb_dropdowns WHERE questionId = ?`;
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
// get sentene highlight options

module.exports.GetHighlightOptions = async (questionId) => {
    const sql = `SELECT id,questionId,options FROM tb_sentanceHighlight WHERE questionId = ?`;
    try {
        const result = await query(sql, [questionId]);
        logger.info(`✅ [GetHighlightOptions] Successfully retrieved sentence highligh options for questionId = ${questionId}`);
        return result;
    } catch (err) {
        logger.error(`[GetHighlightOptions] ❌ Failed to retrieve sentence highligh options for questionId = ${questionId} - ${err.message}`);
        throw err;
    }
}
// get sentence highlight answers
module.exports.GetHighlightAnswers = async (questionId) => {
    const sql = `SELECT id,questionId,answer FROM tb_sentenceHighlightAnswers WHERE questionId = ?`;
    try {
        const result = await query(sql, [questionId]);
        logger.info(`✅ [GetHighlightAnswers] Successfully retrieved sentence highlight answers for questionId = ${questionId}`);
        return result;
    } catch (err) {
        logger.error(`[GetHighlightAnswers] ❌ Failed to retrieve sentence highlight answers for questionId = ${questionId} - ${err.message}`);
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
    const sql = `SELECT id, question_id, question_text,answers,blankOrNot FROM tb_fillTheBlanks WHERE question_id = ?`;
    try {
        const result = await query(sql, [questionId]);
        logger.info(`✅ [GetFilltheblankstext] Successfully retrieved fill-the-blanks text for question_id = ${questionId}`);
        return result;
    } catch (err) {
        logger.error(`[GetFilltheblankstext] ❌ Failed to retrieve fill-the-blanks text for question_id = ${questionId} - ${err.message}`);
        throw err;
    }
}
// fetch fill in the blanks heading
module.exports.GetFilltheblanksHeading = async (questionId) => {
    const sql = `SELECT headings FROM DragAndDrop_Headings WHERE question_id = ?`;
    try {
        const result = await query(sql, [questionId]);
        logger.info(`✅ [GetFilltheblankstextOptions] Successfully retrieved fill-the-blanks options for question_id = ${questionId}`);
        return result;
    } catch (err) {
        logger.error(`[GetFilltheblankstextOptions] ❌ Failed to retrieve fill-the-blanks options for question_id = ${questionId} - ${err.message}`);
        throw err;
    }
}
// fetch fill in the blanks options 
module.exports.GetFilltheblankstextOptions = async (questionId) => {
    const sql = `SELECT * FROM DragAndDrop_Headings_Options WHERE question_id = ?`;
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
        const result = await query(sql, [questionId]);
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
    const sql = `SELECT * FROM tb_MultipleRadio_RadioOptions WHERE question_id = ?`; // Confirm this is the correct ID for multiple radio
    try {
        const result = await query(sql, [questionId]);
        logger.info('✅ [getMultipleRadioQuestions] Successfully retrieved multiple-radio questions (question_type_id = 5)');
        return result;
    } catch (err) {
        logger.error(`[getMultipleRadioQuestions] ❌ Failed to retrieve multiple-radio questions - ${err.message}`);
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

module.exports.insertStudentMockTestMcqResponse = async ({ userId, testId, questionId, answer }) => {
    const sql = `insert into tb_Mocktest_Mcq_Student_Answers (userId,testId,questionId,answer) values (?,?,?,?)`;
    try {
        const result = await query(sql, [userId, testId, questionId, answer]);
        logger.info(`[Submitting student mocktest MCQ answer] Successfully submitted mocktest MCQ answer for userId = ${userId}, testId = ${testId}, questionId = ${questionId}`);
        return result;
    } catch (err) {
        logger.error(`[Submitting student mocktest MCQ answer] ❌ Failed to submit mocktest MCQ answer for userId = ${userId}, testId = ${testId}, questionId = ${questionId} - ${err.message}`);
        throw err;
    }
};

module.exports.insertStudentQbankMcqResponse = async ({ userId, questionId, answer }) => {
    const sql = `insert into tb_Qbank_Mcq_Student_Answers (userId,questionId,answer) values (?,?,?)`;
    try {
        const result = await query(sql, [userId, questionId, answer]);
        logger.info(`[Submitting student qbank MCQ answer] Successfully submitted qbank MCQ answer for userId = ${userId}, questionId = ${questionId}`);
        return result;
    } catch (err) {
        logger.error(`[Submitting student qbank MCQ answer] ❌ Failed to submit qbank MCQ answer for userId = ${userId}, questionId = ${questionId} - ${err.message}`);
        throw err;
    }
};


module.exports.insertStudentMockTestDropdownAnswer = async ({ userId, testId, questionId, dropdownField, answer }) => {
    const sql = `insert into tb_dropdown_Mocktest_student_answers (userId,testId,questionId,dropdownField,answer) values (?,?,?,?,?)`;
    try {
        const result = await query(sql, [userId, testId, questionId, dropdownField, answer]);
        logger.info(`[Submitting student mocktest Dropdown answer] Successfully submitted mocktest dropdown answer for userId = ${userId}, testId = ${testId}, questionId = ${questionId}, dropdownField=${dropdownField}`);
        return result;
    } catch (err) {
        logger.error(`[Submitting student mocktest Dropdown answer] ❌ Failed to submit mocktest dropdown answer for userId = ${userId}, testId = ${testId}, questionId = ${questionId} , dropdownField=${dropdownField} - ${err.message}`);
        throw err;
    }
};

module.exports.insertStudentQbankDropdownAnswer = async ({ userId, questionId, dropdownField, answer }) => {
    const sql = `insert into tb_dropdown_Qbank_student_answers (userId,questionId,dropdownField,answer) values (?,?,?,?)`;
    try {
        const result = await query(sql, [userId, questionId, dropdownField, answer]);
        logger.info(`[Submitting student qbank Dropdown answer] Successfully submitted qbank dropdown answer for userId = ${userId}, questionId = ${questionId}, dropdownField=${dropdownField}`);
        return result;
    } catch (err) {
        logger.error(`[Submitting student qbank Dropdown answer] ❌ Failed to submit qbank dropdown answer for userId = ${userId}, questionId = ${questionId} , dropdownField=${dropdownField} - ${err.message}`);
        throw err;
    }
};


module.exports.insertStudentMockTestSortingAnswer = async ({ userId, testId, questionId, sortItem, sortOrder }) => {
    const sql = `insert into tb_sort_Mocktest_student_answers (userId,testId,questionId,sortItem,sortOrder) values (?,?,?,?,?)`;
    try {
        const result = await query(sql, [userId, testId, questionId, sortItem, sortOrder]);
        logger.info(`[Submitting student mocktest sort answer] Successfully submitted mocktest sort answer for userId = ${userId}, testId = ${testId}, questionId = ${questionId}, sortItem=${sortItem}`);
        return result;
    } catch (err) {
        logger.error(`[Submitting student mocktest sort answer] ❌ Failed to submit mocktest sort answer for userId = ${userId}, testId = ${testId}, questionId = ${questionId} , sortItem=${sortItem} - ${err.message}`);
        throw err;
    }
};

module.exports.insertStudentQbankSortingAnswer = async ({ userId, questionId, sortItem, sortOrder }) => {
    const sql = `insert into tb_sort_Qbank_student_answers (userId,questionId,sortItem,sortOrder) values (?,?,?,?)`;
    try {
        const result = await query(sql, [userId, questionId, sortItem, sortOrder]);
        logger.info(`[Submitting student qbank sort answer] Successfully submitted qbank sort answer for userId = ${userId},  questionId = ${questionId}, sortItem=${sortItem}`);
        return result;
    } catch (err) {
        logger.error(`[Submitting student qbank sort answer] ❌ Failed to submit qbank sort answer for userId = ${userId},  questionId = ${questionId} , sortItem=${sortItem} - ${err.message}`);
        throw err;
    }
};


module.exports.insertStudentMockTestSentenceHighlightAnswer = async ({ userId, testId, questionId, answer }) => {
    const sql = `insert into tb_sentenceHiglight_Mocktest_student_answers (userId,testId,questionId,answer) values (?,?,?,?)`;
    try {
        const result = await query(sql, [userId, testId, questionId, answer]);
        logger.info(`[Submitting student mocktest sentence highlight answer] Successfully submitted mocktest sentence highlight answer for userId = ${userId}, testId = ${testId}, questionId = ${questionId}`);
        return result;
    } catch (err) {
        logger.error(`[Submitting student mocktest sentence highlight answer] ❌ Failed to submit mocktest sentence highlight answer for userId = ${userId}, testId = ${testId}, questionId = ${questionId} - ${err.message}`);
        throw err;
    }
};

module.exports.insertStudentQbankSentenceHighlightAnswer = async ({ userId, questionId, answer }) => {
    const sql = `insert into tb_sentenceHiglight_Qbank_student_answers (userId,questionId,answer) values (?,?,?)`;
    try {
        const result = await query(sql, [userId, questionId, answer]);
        logger.info(`[Submitting student qbank sentence highlight answer] Successfully submitted qbank sentence highlight answer for userId = ${userId},  questionId = ${questionId}`);
        return result;
    } catch (err) {
        logger.error(`[Submitting student qbank sentence highlight answer] ❌ Failed to submit qbank sentence highlight answer for userId = ${userId}, questionId = ${questionId} - ${err.message}`);
        throw err;
    }
};


module.exports.insertStudentMockTestDragDropAnswer = async ({ userId, testId, questionId, heading, answer }) => {
    const sql = `insert into tb_dragdrop_Mocktest_student_answers (userId,testId,questionId,heading,answer) values (?,?,?,?,?)`;
    try {
        const result = await query(sql, [userId, testId, questionId, heading, answer]);
        logger.info(`[Submitting student mocktest drag drop answer] Successfully submitted mocktest drag drop answer for userId = ${userId}, testId = ${testId}, questionId = ${questionId}, heading=${heading}`);
        return result;
    } catch (err) {
        logger.error(`[Submitting student mocktest drag drop answer] ❌ Failed to submit mocktest drag drop answer for userId = ${userId}, testId = ${testId}, questionId = ${questionId}, heading=${heading} - ${err.message}`);
        throw err;
    }
};

module.exports.insertStudentQbankDragDropAnswer = async ({ userId, questionId, heading, answer }) => {
    const sql = `insert into tb_dragdrop_Qbank_student_answers (userId,questionId,heading,answer) values (?,?,?,?)`;
    try {
        const result = await query(sql, [userId, questionId, heading, answer]);
        logger.info(`[Submitting student qbank drag drop answer] Successfully submitted qbank drag drop answer for userId = ${userId},  questionId = ${questionId}, heading=${heading}`);
        return result;
    } catch (err) {
        logger.error(`[Submitting student qbank drag drop answer] ❌ Failed to submit qbank drag drop answer for userId = ${userId},  questionId = ${questionId}, heading=${heading} - ${err.message}`);
        throw err;
    }
};


module.exports.insertStudentMockTestMultipleRadioAnswer = async ({ userId, testId, questionId, clientfindings, answer }) => {
    const sql = `insert into tb_multiradio_Mocktest_student_answers (userId,testId,questionId,clientfindings,answer) values (?,?,?,?,?)`;
    try {
        const result = await query(sql, [userId, testId, questionId, clientfindings, answer]);
        logger.info(`[Submitting student mocktest multiple radio answer] Successfully submitted mocktest multiple radio answer for userId = ${userId}, testId = ${testId}, questionId = ${questionId}, clientfindings=${clientfindings}`);
        return result;
    } catch (err) {
        logger.error(`[Submitting student mocktest multiple radio answer] ❌ Failed to submit mocktest multiple radio answer for userId = ${userId}, testId = ${testId}, questionId = ${questionId}, clientfindings=${clientfindings} - ${err.message}`);
        throw err;
    }
};

module.exports.insertStudentQbankMultipleRadioAnswer = async ({ userId, questionId, clientfindings, answer }) => {
    const sql = `insert into tb_multiradio_Qbank_student_answers (userId,questionId,clientfindings,answer) values (?,?,?,?)`;
    try {
        const result = await query(sql, [userId, questionId, clientfindings, answer]);
        logger.info(`[Submitting student qbank multiple radio answer] Successfully submitted qbank multiple radio answer for userId = ${userId},  questionId = ${questionId}, clientfindings=${clientfindings}`);
        return result;
    } catch (err) {
        logger.error(`[Submitting student qbank multiple radio answer] ❌ Failed to submit qbank multiple radio answer for userId = ${userId}, questionId = ${questionId}, clientfindings=${clientfindings} - ${err.message}`);
        throw err;
    }
};

module.exports.insertStudentMockTestTableDropdownAnswer = async ({ userId, testId, questionId, rowlabel, answer }) => {
    const sql = `insert into tb_tabledropdown_Mocktest_student_answers (userId,testId,questionId,rowlabel,answer) values (?,?,?,?,?)`;
    try {
        const result = await query(sql, [userId, testId, questionId, rowlabel, answer]);
        logger.info(`[Submitting student mocktest table dropdown answer] Successfully submitted mocktest table dropdown answer for userId = ${userId}, testId = ${testId}, questionId = ${questionId}, rowlabel=${rowlabel}`);
        return result;
    } catch (err) {
        logger.error(`[Submitting student mocktest table dropdown answer] ❌ Failed to submit mocktest table dropdown answer for userId = ${userId}, testId = ${testId}, questionId = ${questionId}, rowlabel=${rowlabel} - ${err.message}`);
        throw err;
    }
};

module.exports.insertStudentQbankTableDropdownAnswer = async ({ userId, questionId, rowlabel, answer }) => {
    const sql = `insert into tb_tabledropdown_Qbank_student_answers (userId,questionId,rowlabel,answer) values (?,?,?,?)`;
    try {
        const result = await query(sql, [userId, questionId, rowlabel, answer]);
        logger.info(`[Submitting student qbank table dropdown answer] Successfully submitted qbank table dropdown answer for userId = ${userId}, questionId = ${questionId}, rowlabel=${rowlabel}`);
        return result;
    } catch (err) {
        logger.error(`[Submitting student qbank table dropdown answer] ❌ Failed to submit qbank table dropdown answer for userId = ${userId}, questionId = ${questionId}, rowlabel=${rowlabel} - ${err.message}`);
        throw err;
    }
};


module.exports.insertStudentTableMockTestHighlightAnswer = async ({ userId, testId, questionId, leftColumn, rightColumn }) => {
    const sql = `insert into tb_tablehighlight_Mocktest_student_answers (userId,testId,questionId,leftColumn,rightColumn) values (?,?,?,?,?)`;
    try {
        const result = await query(sql, [userId, testId, questionId, leftColumn, rightColumn]);
        logger.info(`[Submitting student mocktest highlight answer] Successfully submitted mocktest highlight answer for userId = ${userId}, testId = ${testId}, questionId = ${questionId}, leftColumn=${leftColumn}, rightColumn=${rightColumn}`);
        return result;
    } catch (err) {
        logger.error(`[Submitting student mocktest highlight answer] ❌ Failed to submit mocktest highlight answer for userId = ${userId}, testId = ${testId}, questionId = ${questionId}, leftColumn=${leftColumn}, rightColumn=${rightColumn} - ${err.message}`);
        throw err;
    }
};

module.exports.insertStudentTableQbankHighlightAnswer = async ({ userId, questionId, leftColumn, rightColumn }) => {
    const sql = `insert into tb_tablehighlight_Qbank_student_answers (userId,questionId,leftColumn,rightColumn) values (?,?,?,?)`;
    try {
        const result = await query(sql, [userId, questionId, leftColumn, rightColumn]);
        logger.info(`[Submitting student qbank highlight answer] Successfully submitted qbank highlight answer for userId = ${userId}, questionId = ${questionId}, leftColumn=${leftColumn}, rightColumn=${rightColumn}`);
        return result;
    } catch (err) {
        logger.error(`[Submitting student qbank highlight answer] ❌ Failed to submit qbank highlight answer for userId = ${userId}, questionId = ${questionId}, leftColumn=${leftColumn}, rightColumn=${rightColumn} - ${err.message}`);
        throw err;
    }
};



module.exports.insertStudentMockTestMultiDropdownAnswer = async ({ userId, testId, questionId, rowId, colIndex, answer }) => {
    const sql = `insert into tb_multidropdown_Mocktest_student_answers (userId,testId,questionId,rowId,colIndex,answer) values (?,?,?,?,?,?)`;
    try {
        const result = await query(sql, [userId, testId, questionId, rowId, colIndex, answer]);
        logger.info(`[Submitting student mocktest multi dropdown answer] Successfully submitted mocktest multi dropdown answer for userId = ${userId}, testId = ${testId}, questionId = ${questionId}, rowId=${rowId}, colIndex=${colIndex}`);
        return result;
    } catch (err) {
        logger.error(`[Submitting student mocktest multi dropdown answer] ❌ Failed to submit mocktest multi dropdown answer for userId = ${userId}, testId = ${testId}, questionId = ${questionId}, rowId=${rowId}, colIndex=${colIndex} - ${err.message}`);
        throw err;
    }
};


module.exports.insertStudentQbankMultiDropdownAnswer = async ({ userId, questionId, rowId, colIndex, answer }) => {
    const sql = `insert into tb_multidropdown_Qbank_student_answers (userId,questionId,rowId,colIndex,answer) values (?,?,?,?,?)`;
    try {
        const result = await query(sql, [userId, questionId, rowId, colIndex, answer]);
        logger.info(`[Submitting student qbank multi dropdown answer] Successfully submitted qbank multi dropdown answer for userId = ${userId}, questionId = ${questionId}, rowId=${rowId}, colIndex=${colIndex}`);
        return result;
    } catch (err) {
        logger.error(`[Submitting student qbank multi dropdown answer] ❌ Failed to submit qbank multi dropdown answer for userId = ${userId}, questionId = ${questionId}, rowId=${rowId}, colIndex=${colIndex} - ${err.message}`);
        throw err;
    }
};


module.exports.GetQuestionBankResult = async (user_id) => {
    const sql = `
    Select * from tb_QbankSubmit where user_id = ?
  `;
    try {
        const result = await query(sql, [user_id]);
        logger.info(` [Get questionbank result] Get question bank result -user: ${user_id}`);
        return result;
    } catch (err) {
        logger.error(`[Get questionbank result]  Failed to get question bank result - ${err.message}`);
        throw err;
    }
}


module.exports.GetQbankMCQSubmittedAnswer = async (user_id, question_id) => {
  try {
    const sql = `SELECT * from tb_Qbank_Mcq_Student_Answers where userId=?  and questionId=?`;
    logger.info(`[Usermodel] Check qbank mcq submitted answer in db - userId : ${user_id}, questionId : ${question_id}`);
    const data = await query(sql, [user_id, question_id]);
    return data;
  } catch (error) {
    logger.error('[Usermodel] Error in qbank mcq submitted answer in db', { error: error.message });
    throw error;
  }
}


module.exports.GetQbankDropdownSubmittedAnswer = async (user_id, question_id) => {
  try {
    const sql = `SELECT * from tb_tabledropdown_Qbank_student_answers where userId=?  and questionId=?`;
    logger.info(`[Usermodel] Check qbank dropdown submitted answer in db - userId : ${user_id}, questionId : ${question_id}`);
    const data = await query(sql, [user_id, question_id]);
    return data;
  } catch (error) {
    logger.error('[Usermodel] Error in qbank dropdown submitted answer in db', { error: error.message });
    throw error;
  }
}


module.exports.GetQbankSortSubmittedAnswer = async (user_id, question_id) => {
  try {
    const sql = `SELECT * from tb_sort_Qbank_student_answers where userId=? and questionId=?`;
    logger.info(`[Usermodel] Check qbank sort submitted answer in db - userId : ${user_id}, questionId : ${question_id}`);
    const data = await query(sql, [user_id, question_id]);
    return data;
  } catch (error) {
    logger.error('[Usermodel] Error in qbank sort submitted answer in db', { error: error.message });
    throw error;
  }
}


module.exports.GetQbankSentenceHighlightSubmittedAnswer = async (user_id, question_id) => {
  try {
    const sql = `SELECT * from tb_sentenceHiglight_Qbank_student_answers where userId=? and questionId=?`;
    logger.info(`[Usermodel] Check qbank sentence highlight submitted answer in db - userId : ${user_id},  questionId : ${question_id}`);
    const data = await query(sql, [user_id, question_id]);
    return data;
  } catch (error) {
    logger.error('[Usermodel] Error in qbank sentence highlight submitted answer in db', { error: error.message });
    throw error;
  }
}


module.exports.GetQbankDragDropSubmittedAnswer = async (user_id, question_id) => {
  try {
    const sql = `SELECT * from tb_dragdrop_Qbank_student_answers where userId=? and questionId=?`;
    logger.info(`[Usermodel] Check qbank drag drop submitted answer in db - userId : ${user_id},  questionId : ${question_id}`);
    const data = await query(sql, [user_id, question_id]);
    return data;
  } catch (error) {
    logger.error('[Usermodel] Error in qbank drag drop submitted answer in db', { error: error.message });
    throw error;
  }
}


module.exports.GetQbankMultipleRadioSubmittedAnswer = async (user_id, question_id) => {
  try {
    const sql = `SELECT * from tb_multiradio_Qbank_student_answers where userId=? and questionId=?`;
    logger.info(`[Usermodel] Check qbank multiple radio submitted answer in db - userId : ${user_id}, questionId : ${question_id}`);
    const data = await query(sql, [user_id, question_id]);
    return data;
  } catch (error) {
    logger.error('[Usermodel] Error in qbank multiple radio submitted answer in db', { error: error.message });
    throw error;
  }
}


module.exports.GetQbankTableDropdownSubmittedAnswer = async (user_id, question_id) => {
  try {
    const sql = `SELECT * from tb_tabledropdown_Qbank_student_answers where userId=? and questionId=?`;
    logger.info(`[Usermodel] Check qbank table dropdown submitted answer in db - userId : ${user_id},  questionId : ${question_id}`);
    const data = await query(sql, [user_id, question_id]);
    return data;
  } catch (error) {
    logger.error('[Usermodel] Error in qbank table dropdown submitted answer in db', { error: error.message });
    throw error;
  }
}


module.exports.GetQbankTableHighlightSubmittedAnswer = async (user_id, question_id) => {
  try {
    const sql = `SELECT * from tb_tablehighlight_Qbank_student_answers where userId=? and questionId=?`;
    logger.info(`[Usermodel] Check qbank table highlight submitted answer in db - userId : ${user_id},  questionId : ${question_id}`);
    const data = await query(sql, [user_id, question_id]);
    return data;
  } catch (error) {
    logger.error('[Usermodel] Error in qbank table highlight submitted answer in db', { error: error.message });
    throw error;
  }
}

module.exports.GetQbankMultiDropDownSubmittedAnswer = async (user_id, question_id) => {
  try {
    const sql = `SELECT * from tb_multidropdown_Qbank_student_answers where userId=? and questionId=?`;
    logger.info(`[Usermodel] Check qbank multi dropdown submitted answer in db - userId : ${user_id},  questionId : ${question_id}`);
    const data = await query(sql, [user_id, question_id]);
    return data;
  } catch (error) {
    logger.error('[Usermodel] Error in qbank multi dropdown submitted answer in db', { error: error.message });
    throw error;
  }
}
