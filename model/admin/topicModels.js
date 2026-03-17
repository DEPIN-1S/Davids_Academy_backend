const pool = require('../../config/db');
const logger = require('../../utils/logger');

module.exports.InsertTopic = async (course_id, topic_name) => {
    try {
        const sql = `INSERT INTO tb_topics (course_id, topic_name) VALUES (?, ?)`;
        const result = await pool.query(sql, [course_id, topic_name]);
        logger.info(`✅ [TopicsModel] Inserted topic: ${topic_name} under course ${course_id}`);
        return { success: true, insertId: result.insertId };
    } catch (err) {
        logger.error(`❌ [TopicsModel] Failed to insert topic: ${err.message}`);
        return { success: false, error: err.message };
    }
};

module.exports.ListTopicsByCourse = async (course_id) => {
    try {
        const sql = `SELECT * FROM tb_topics WHERE course_id = ? ORDER BY created_at DESC`;
        const result = await pool.query(sql, [course_id]);
        logger.info(`✅ [TopicsModel] Listed topics for course ${course_id}`);
        return { success: true, topics: result };
    } catch (err) {
        logger.error(`❌ [TopicsModel] Failed to list topics: ${err.message}`);
        return { success: false, error: err.message };
    }
};

module.exports.DeleteTopic = async (topic_id) => {
    try {
        const sql = `DELETE FROM tb_topics WHERE topic_id = ?`;
        const result = await pool.query(sql, [topic_id]);
        logger.info(`✅ [TopicsModel] Deleted topic ${topic_id}`);
        return { success: true, affectedRows: result.affectedRows };
    } catch (err) {
        logger.error(`❌ [TopicsModel] Failed to delete topic: ${err.message}`);
        return { success: false, error: err.message };
    }
};

module.exports.UpdateTopic = async (topic_id, topic_name) => {
    try {
        const sql = `UPDATE tb_topics SET topic_name = ? WHERE topic_id = ?`;
        const result = await pool.query(sql, [topic_name, topic_id]);
        logger.info(`✅ [TopicsModel] Updated topic ${topic_id} to ${topic_name}`);
        return { success: true, affectedRows: result.affectedRows };
    } catch (err) {
        logger.error(`❌ [TopicsModel] Failed to update topic: ${err.message}`);
        return { success: false, error: err.message };
    }
};
