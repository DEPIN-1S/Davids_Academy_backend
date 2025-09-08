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
        const sql = `SELECT s.*,t.testTitle,t.fromDate,t.toDate from tb_submittedTest s INNER JOIN tb_tests t ON t.id=s.st_test_id where st_user_id=?`;
        logger.info(`[ListSubmittedTest] Listing student submitted test from db`, { student_id });
        const data = await query(sql, [student_id]);
        return data;
    } catch (error) {
        logger.error('[ListSubmittedTest] Error in list student submitted test', { error: error.message });
        throw error;
    }
}

module.exports.ListSubmittedQuestions = async (student_id, test_id) => {
    try {
        const sql = `SELECT * from tb_submittedQuestions where st_user_id=? and st_test_id=?`;
        logger.info(`[ListSubmittedTest] Listing student submitted questions from db`, { student_id });
        const data = await query(sql, [student_id, test_id]);
        return data;
    } catch (error) {
        logger.error('[ListSubmittedTest] Error in list student submitted questions', { error: error.message });
        throw error;
    }
}



