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