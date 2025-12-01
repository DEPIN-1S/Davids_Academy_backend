const db = require('../../config/db');
const util = require('util');
const query = util.promisify(db.query).bind(db);
const logger = require('../../utils/logger');

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

module.exports.GetTestResult = async (studentId, test_id) => {
  try {
    const sql = `SELECT * from tb_submittedQuestions where sq_user_id=? and sq_test_id=?`;
    logger.info('[Usermodel] Get data of student submitted test in db', studentId, test_id);
    const data = await query(sql, [studentId, test_id]);
    return data;
  } catch (error) {
    logger.error('[Usermodel] Error in Get data of student submitted test', { error: error.message });
    throw error;
  }
}
module.exports.ListSubmittedTests = async (user_id) => {
  const sql = `
    SELECT 
      st.*, 
      t.testTitle, t.fromDate, t.toDate, t.totalQuestions, 
      CASE WHEN st.st_score > 0 THEN 1 ELSE 0 END AS isInProgress  
    FROM tb_submittedTest st
    LEFT JOIN tb_tests t ON st.st_test_id = t.id
    WHERE st.st_user_id = ?
  `;
  try {
    const result = await query(sql, [user_id]);
    logger.info(` [ListSubmittedTests] List submitted test data -user : ${user_id} `);
    return result;
  } catch (err) {
    logger.error(`[ListSubmittedTests]  Failed to list submitted test data - ${err.message}`);
    throw err;
  }
};
module.exports.UpdateTestSubmissionStatus = async (user_id, test_id) => {
  const sql = `
    UPDATE tb_submittedTest 
    SET is_submitted = 1, status = 'completed', st_updated_at = CURRENT_TIMESTAMP 
    WHERE st_user_id = ? AND st_test_id = ?
  `;
  try {
    const result = await query(sql, [user_id, test_id]);
    logger.info(` [UpdateTestSubmissionStatus] Updated submission status -user: ${user_id} test: ${test_id}, affectedRows: ${result.affectedRows}`);
    return result;
  } catch (err) {
    logger.error(`[UpdateTestSubmissionStatus]  Failed to update submission status - ${err.message}`);
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

module.exports.GetTotalQuestionsInQBank = async () => {
  const sql = `
    SELECT id 
  FROM tb_questions 
  WHERE LOWER(exam_type) = LOWER(?)
  `;
  try {
    const result = await query(sql, ["q-bank"]);
    logger.info(` [Get questionbank Questions] Get question bank questions `);
    return result;
  } catch (err) {
    logger.error(`[Get questionbank questions]  Failed to get question bank questions - ${err.message}`);
    throw err;
  }
}

module.exports.CheckTest = async (test_id) => {
  const sql = `
    SELECT id 
  FROM tb_tests 
  WHERE id = ?
  `;
  try {
    const result = await query(sql, [test_id]);
    logger.info(` [Check test] Check test exist in db : ${test_id} `);
    return result;
  } catch (err) {
    logger.error(`[Check test]  Failed to Check test exist : ${test_id} - ${err.message}`);
    throw err;
  }
}

module.exports.CheckTestSubmitted = async (test_id, user_id) => {
  const sql = `
    SELECT * 
  FROM tb_submittedTest
  WHERE st_user_id = ? and st_test_id=?
  `;
  try {
    const result = await query(sql, [user_id, test_id]);
    logger.info(` [Check test submitted] Check test submitted in db : test_id - ${test_id}, user_id - ${user_id} `);
    return result;
  } catch (err) {
    logger.error(`[Check test submitted]  Failed to Check test submitted :test_id - ${test_id}, user_id - ${user_id} - ${err.message}`);
    throw err;
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


module.exports.GetMockTestMCQSubmittedAnswer = async (user_id, test_id, question_id) => {
  try {
    const sql = `SELECT * from tb_Mocktest_Mcq_Student_Answers where userId=? and testId=? and questionId=?`;
    logger.info(`[Usermodel] Check mocktest mcq submitted answer in db - userId : ${user_id}, testId : ${test_id}, questionId : ${question_id}`);
    const data = await query(sql, [user_id, test_id, question_id]);
    return data;
  } catch (error) {
    logger.error('[Usermodel] Error in mocktest mcq submitted answer in db', { error: error.message });
    throw error;
  }
}

module.exports.GetMockTestDropdownSubmittedAnswer = async (user_id, test_id, question_id) => {
  try {
    const sql = `SELECT * from tb_dropdown_Mocktest_student_answers where userId=? and testId=? and questionId=?`;
    logger.info(`[Usermodel] Check mocktest dropdown submitted answer in db - userId : ${user_id}, testId : ${test_id}, questionId : ${question_id}`);
    const data = await query(sql, [user_id, test_id, question_id]);
    return data;
  } catch (error) {
    logger.error('[Usermodel] Error in mocktest dropdown submitted answer in db', { error: error.message });
    throw error;
  }
}

module.exports.GetMockTestSortSubmittedAnswer = async (user_id, test_id, question_id) => {
  try {
    const sql = `SELECT * from tb_sort_Mocktest_student_answers where userId=? and testId=? and questionId=?`;
    logger.info(`[Usermodel] Check mocktest sort submitted answer in db - userId : ${user_id}, testId : ${test_id}, questionId : ${question_id}`);
    const data = await query(sql, [user_id, test_id, question_id]);
    return data;
  } catch (error) {
    logger.error('[Usermodel] Error in mocktest sort submitted answer in db', { error: error.message });
    throw error;
  }
}

module.exports.GetMockTestSentenceHighlightSubmittedAnswer = async (user_id, test_id, question_id) => {
  try {
    const sql = `SELECT * from tb_sentenceHiglight_Mocktest_student_answers where userId=? and testId=? and questionId=?`;
    logger.info(`[Usermodel] Check mocktest sentence highlight submitted answer in db - userId : ${user_id}, testId : ${test_id}, questionId : ${question_id}`);
    const data = await query(sql, [user_id, test_id, question_id]);
    return data;
  } catch (error) {
    logger.error('[Usermodel] Error in mocktest sentence highlight submitted answer in db', { error: error.message });
    throw error;
  }
}

module.exports.GetMockTestDragDropSubmittedAnswer = async (user_id, test_id, question_id) => {
  try {
    const sql = `SELECT * from tb_dragdrop_Mocktest_student_answers where userId=? and testId=? and questionId=?`;
    logger.info(`[Usermodel] Check mocktest drag drop submitted answer in db - userId : ${user_id}, testId : ${test_id}, questionId : ${question_id}`);
    const data = await query(sql, [user_id, test_id, question_id]);
    return data;
  } catch (error) {
    logger.error('[Usermodel] Error in mocktest drag drop submitted answer in db', { error: error.message });
    throw error;
  }
}

module.exports.GetMockTestMultipleRadioSubmittedAnswer = async (user_id, test_id, question_id) => {
  try {
    const sql = `SELECT * from tb_multiradio_Mocktest_student_answers where userId=? and testId=? and questionId=?`;
    logger.info(`[Usermodel] Check mocktest multiple radio submitted answer in db - userId : ${user_id}, testId : ${test_id}, questionId : ${question_id}`);
    const data = await query(sql, [user_id, test_id, question_id]);
    return data;
  } catch (error) {
    logger.error('[Usermodel] Error in mocktest multiple radio submitted answer in db', { error: error.message });
    throw error;
  }
}

module.exports.GetMockTestTableDropdownSubmittedAnswer = async (user_id, test_id, question_id) => {
  try {
    const sql = `SELECT * from tb_tabledropdown_Mocktest_student_answers where userId=? and testId=? and questionId=?`;
    logger.info(`[Usermodel] Check mocktest table dropdown submitted answer in db - userId : ${user_id}, testId : ${test_id}, questionId : ${question_id}`);
    const data = await query(sql, [user_id, test_id, question_id]);
    return data;
  } catch (error) {
    logger.error('[Usermodel] Error in mocktest table dropdown submitted answer in db', { error: error.message });
    throw error;
  }
}

module.exports.GetMockTestTableHighlightSubmittedAnswer = async (user_id, test_id, question_id) => {
  try {
    const sql = `SELECT * from tb_tablehighlight_Mocktest_student_answers where userId=? and testId=? and questionId=?`;
    logger.info(`[Usermodel] Check mocktest table highlight submitted answer in db - userId : ${user_id}, testId : ${test_id}, questionId : ${question_id}`);
    const data = await query(sql, [user_id, test_id, question_id]);
    return data;
  } catch (error) {
    logger.error('[Usermodel] Error in mocktest table highlight submitted answer in db', { error: error.message });
    throw error;
  }
}

module.exports.GetMockTestMultiDropDownSubmittedAnswer = async (user_id, test_id, question_id) => {
  try {
    const sql = `SELECT * from tb_multidropdown_Mocktest_student_answers where userId=? and testId=? and questionId=?`;
    logger.info(`[Usermodel] Check mocktest multi dropdown submitted answer in db - userId : ${user_id}, testId : ${test_id}, questionId : ${question_id}`);
    const data = await query(sql, [user_id, test_id, question_id]);
    return data;
  } catch (error) {
    logger.error('[Usermodel] Error in mocktest multi dropdown submitted answer in db', { error: error.message });
    throw error;
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
    const sql = `SELECT * from tb_dropdown_Qbank_student_answers where userId=?  and questionId=?`;
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
