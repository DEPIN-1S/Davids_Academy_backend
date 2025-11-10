const db = require('../../config/db');
const util = require('util');
const query = util.promisify(db.query).bind(db);
const logger = require('../../utils/logger');


module.exports.CheckEmail = async (condition) => {
    try {
        const sql = `SELECT * FROM tb_users ${condition} `;
        logger.info('[Usermodel] Fetching email data', { condition });
        const data = await query(sql);
        return data;
    } catch (error) {
        logger.error('[Usermodel] Error checking email data', { error: error.message });
        throw error;
    }
}


module.exports.InsertStudent = async (fullname, email, phone, password, target_exam) => {
    console.log('Test', fullname, email, phone, password, target_exam);
    try {
        const sql = `INSERT INTO tb_users (firstname,email,mobile,password,target_exam,role) VALUES (?,?,?,?,?,?)`;
        logger.info('[Usermodel] Inserting student in db', { fullname, email, phone, password, target_exam });
        const data = await query(sql, [fullname, email, phone, password, target_exam, "student"]);
        return data;
    } catch (error) {
        logger.error('[Usermodel] Error inserting student', { error: error.message });
        throw error;
    }
};



module.exports.EditStudent = async (setClause, values) => {
    try {
        const sql = `UPDATE tb_users SET ${setClause} WHERE id = ?`;
        console.log('sql', sql);
        logger.info('[Usermodel] Updating student in db', setClause, values);
        const data = await query(sql, values);
        return data;
    } catch (error) {
        logger.error('[Usermodel] Error updating student', { error: error.message });
        throw error;
    }
}


module.exports.ListAllStudents = async (whereClause = "", params = []) => {
    try {
        const sql = `SELECT u.*,c.cs_name FROM tb_users u INNER JOIN courses c ON c.cs_id = u.target_exam ${whereClause} LIMIT ? OFFSET ?`;
        logger.info('[Usermodel] Listing students from db', { whereClause, params });
        const data = await query(sql, params);
        return data;
    } catch (error) {
        logger.error('[Usermodel] Error in listing student', { error: error.message });
        throw error;
    }
};


module.exports.CountAllStudents = async (whereClause = "", params = []) => {
    try {
        const sql = `SELECT  COUNT(*) AS total from tb_users ${whereClause} `;
        logger.info('[Usermodel] Counting students from db', { whereClause, params });
        const data = await query(sql, params);
        return data;
    } catch (error) {
        logger.error('[Usermodel] Error in counting student', { error: error.message });
        throw error;
    }
}


module.exports.CheckStudent = async (student_id) => {
    try {
        const sql = `SELECT * from tb_users where id=? and role=?`;
        logger.info('[Usermodel] Check student with id ', { student_id });
        const data = await query(sql, [student_id, "student"]);
        return data;
    } catch (error) {
        logger.error('[Usermodel] Error in check student ', { error: error.message });
        throw error;
    }
}


module.exports.UpdateStatus = async (student_id, status) => {
    try {
        const sql = `UPDATE tb_users set status=? where id=?`;
        logger.info(`[Usermodel] Updating student status`, { student_id, new_status: status });
        const data = await query(sql, [status, student_id]);
        return data;
    } catch (error) {
        logger.error('[Usermodel] Error in update student status', { error: error.message });
        throw error;
    }
}


module.exports.ListSubmittedTest = async (student_id) => {
    try {
        const sql = `SELECT 
    t.id AS test_id, 
    t.testTitle, 
    t.fromDate, 
    t.toDate, 
    t.totalQuestions,
    COUNT(sq.sq_id) AS total_attempted,
    SUM(CASE WHEN sq.sq_is_correct = 1 THEN 1 ELSE 0 END) AS correct_count,
    SUM(CASE WHEN sq.sq_is_correct = 0 THEN 1 ELSE 0 END) AS wrong_count
FROM tb_tests t
LEFT JOIN tb_submittedQuestions sq 
    ON t.id = sq.sq_test_id
WHERE sq.sq_user_id = ?
GROUP BY t.id, t.testTitle, t.fromDate, t.toDate, t.totalQuestions;
`;
        logger.info(`[ListSubmittedTest] Listing student submitted test from db`, { student_id });
        const data = await query(sql, [student_id]);
        return data;
    } catch (error) {
        logger.error('[ListSubmittedTest] Error in list student submitted test', { error: error.message });
        throw error;
    }
}
// list question bank result
module.exports.ListQuestionBankResult = async (student_id) => {
    try {
        const sql = `SELECT
    COUNT(id) AS total_attempted,
    SUM(CASE WHEN is_correct = 1 THEN 1 ELSE 0 END) AS correct_count,
    SUM(CASE WHEN is_correct = 0 THEN 1 ELSE 0 END) AS wrong_count
    FROM  tb_QbankSubmit  
  WHERE  user_id = ?;
`;
        logger.info(`[ListSubmittedTest] Listing student submitted test from db`, { student_id });
        const data = await query(sql, [student_id]);
        return data;
    } catch (error) {
        logger.error('[ListSubmittedTest] Error in list student submitted test', { error: error.message });
        throw error;
    }
}
// total QBank questions
module.exports.totalQuestionBankQuestions = async (course) => {
    try {
        const sql = `SELECT COUNT(*) as total_questions FROM tb_questions 
        WHERE courseId = ? AND exam_type = 'q-bank';
`;
        logger.info(`[ListSubmittedTest] Listing student submitted test from db`, { course });
        const data = await query(sql, [course]);
        return data;
    } catch (error) {
        logger.error('[ListSubmittedTest] Error in list student submitted test', { error: error.message });
        throw error;
    }
}

module.exports.ListSubmittedQuestions = async (student_id, test_id) => {
    try {
        const sql = `SELECT * from tb_submittedQuestions where sq_user_id=? and sq_test_id=?`;
        logger.info(`[ListSubmittedTest] Listing student submitted questions from db`, { student_id });
        const data = await query(sql, [student_id, test_id]);
        return data;
    } catch (error) {
        logger.error('[ListSubmittedTest] Error in list student submitted questions', { error: error.message });
        throw error;
    }
}

module.exports.CheckTest = async (test_id) => {
    try {
        const sql = `SELECT * from tb_tests where id=?`;
        logger.info(`[Check Test] Check test exist in db`, { test_id });
        const data = await query(sql, [test_id]);
        return data;
    } catch (error) {
        logger.error('[Check Test] Error in  Check test exist in db', { error: error.message });
        throw error;
    }
}


module.exports.DeleteSubmittedTest = async (student_id, test_id) => {
    try {
        const sql = `Delete from tb_submittedQuestions where sq_user_id=? and sq_test_id=?`;
        logger.info(`[Delete submitted test] Delete submitted test from db`, { student_id, test_id });
        const data = await query(sql, [student_id, test_id]);
        return data;
    } catch (error) {
        logger.error('[Delete submitted test] Error in Delete submitted test from db', { error: error.message });
        throw error;
    }
}
module.exports.DeleteSubmittedMockTest = async (student_id, test_id) => {
    try {
        const sql = `Delete from tb_submittedTest where st_user_id=? and st_test_id=?`;
        logger.info(`[Delete submitted mock test] Delete submitted test from db`, { student_id, test_id });
        const data = await query(sql, [student_id, test_id]);
        return data;
    } catch (error) {
        logger.error('[Delete submitted test] Error in Delete submitted test from db', { error: error.message });
        throw error;
    }
}
module.exports.DeleteQuestionBank = async (student_id) => {
    try {
        const sql = `Delete from tb_QbankSubmit where user_id=? `;
        logger.info(`[Delete submitted question bank] Delete submitted question bank from db`, { student_id });
        const data = await query(sql, [student_id]);
        return data;
    } catch (error) {
        logger.error('[Delete submitted question bank] Error in Delete submitted question bank from db', { error: error.message });
        throw error;
    }
}