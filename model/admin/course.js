const util = require('util');
const db = require('../../config/db');
const logger = require('../../utils/logger');
const query = util.promisify(db.query).bind(db);

module.exports.getUserData = async (user_id, role) => {
    try {
        const sql = `SELECT * FROM tb_users WHERE id = ? AND role = ?`;
        logger.info('[CourseModel] Fetching user data', { user_id, role });
        const data = await query(sql, [user_id, role]);
        return data;
    } catch (error) {
        logger.error('[CourseModel] Error fetching user data', { error: error.message });
        throw error;
    }
};

module.exports.createCourse = async (course_name, sub_title, descrption, desc_points, courseImage) => {
    try {
        const sql = `INSERT INTO courses (cs_name, cs_sub_title, cs_description, cs_desc_points, cs_image) VALUES (?, ?, ?, ?, ?)`;
        logger.info('[CourseModel] Creating course', { course_name });
        const data = await query(sql, [course_name, sub_title, descrption, desc_points, courseImage]);
        return data;
    } catch (error) {
        logger.error('[CourseModel] Error creating course', { course_name, error: error.message });
        throw error;
    }
};

module.exports.ListCoursesQuerry = async (condition) => {
    try {
        const sql = `SELECT * FROM courses ${condition}`;
        logger.info('[CourseModel] Listing courses', { condition });
        const data = await query(sql);
        return data;
    } catch (error) {
        logger.error('[CourseModel] Error listing courses', { error: error.message });
        throw error;
    }
};

module.exports.CheckCourseQuery = async (cs_id) => {
    try {
        const sql = `SELECT * FROM courses WHERE cs_id = ?`;
        logger.info('[CourseModel] Checking course existence', { cs_id });
        const data = await query(sql, [cs_id]);
        return data;
    } catch (error) {
        logger.error('[CourseModel] Error checking course', { cs_id, error: error.message });
        throw error;
    }
};

module.exports.ChangeCourseInfo = async (condition, cs_id) => {
    try {
        const sql = `UPDATE courses ${condition} WHERE cs_id = ?`;
        logger.info('[CourseModel] Updating course', { cs_id, condition });
        const data = await query(sql, [cs_id]);
        return data;
    } catch (error) {
        logger.error('[CourseModel] Error updating course', { cs_id, error: error.message });
        throw error;
    }
};

module.exports.DeleteCourseQuery = async (cs_id) => {
    try {
        const sql = `DELETE FROM courses WHERE cs_id = ?`;
        logger.info('[CourseModel] Deleting course', { cs_id });
        const data = await query(sql, [cs_id]);
        return data;
    } catch (error) {
        logger.error('[CourseModel] Error deleting course', { cs_id, error: error.message });
        throw error;
    }
};
