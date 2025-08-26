const db = require('../../config/db');
const util = require('util');
const query = util.promisify(db.query).bind(db);
const logger = require('../../utils/logger');


module.exports.ListSubmittedTests = async (user_id) => {
    const sql = `SELECT * from tb_submittedTest where st_user_id=?`;
    try {
        const result = await query(sql, [user_id]);
        logger.info(`✅ [GetSubmittedAnswer] List submitted test data -user : ${user_id} `);
        return result;
    } catch (err) {
        logger.error(`[GetSubmittedAnswer] ❌ Failed to list submitted test data - ${err.message}`);
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