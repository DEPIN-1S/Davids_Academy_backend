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


module.exports.InsertStudent = async (fullname, email, phone, password, target_exam, class_type) => {
    try {
        const sql = `INSERT into tb_users (firstname,email,mobile,password,target_exam,class_type,role)`;
        logger.info('[Usermodel] Inserting student in db', { fullname, email, phone, password, target_exam, class_type });
        const data = await query(sql, [fullname, email, phone, password, target_exam, class_type, "student"]);
        return data;
    } catch (error) {
        logger.error('[Usermodel] Error inserting student', { error: error.message });
        throw error;
    }
}


module.exports.EditStudent = async (setClause, values) => {
    try {
        const sql = `UPDATE tb_students SET ${setClause} WHERE id = ?`;
        logger.info('[Usermodel] Updating student in db', setClause,values);
        const data = await query(sql.values);
        return data;
    } catch (error) {
        logger.error('[Usermodel] Error updating student', { error: error.message });
        throw error;
    }
}


module.exports.ListAllStudents = async (whereClause = "", params = []) => {
    try {
        const sql = `SELECT * from tb_users ${whereClause} LIMIT ? OFFSET ?`;
        logger.info('[Usermodel] Listing students from db', { whereClause, params });
        const data = await query(sql, params);
        return data;
    } catch (error) {
        logger.error('[Usermodel] Error in listing student', { error: error.message });
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
        const sql = `UPDATE tb_users (status=?) where id=?`;
        logger.info('[Usermodel] Update student status with id ', { student_id, status });
        const data = await query(sql, [status, student_id]);
        return data;
    } catch (error) {
        logger.error('[Usermodel] Error in update student status', { error: error.message });
        throw error;
    }
}



