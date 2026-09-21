const db = require('../../config/db');
const util = require('util');
const query = util.promisify(db.query).bind(db);
const logger = require('../../utils/logger');

module.exports.GetAllSuccessStories = async (limit = 100, offset = 0) => {
    try {
        // Removed 'created_at' if it doesn't exist; add back if your schema has it (e.g., SELECT id, image, created_at ...)
        const sql = `SELECT id, image FROM tb_success_stories ORDER BY id DESC LIMIT ? OFFSET ?`;
        logger.info('[SuccessStoryModel] Fetching all success stories', { limit, offset });
        const data = await query(sql, [limit, offset]);
        return data;
    } catch (error) {
        logger.error('[SuccessStoryModel] Error fetching success stories', { error: error.message });
        throw error;
    }
};

module.exports.CountSuccessStories = async () => {
    try {
        const sql = `SELECT COUNT(*) as count FROM tb_success_stories`;
        logger.info('[SuccessStoryModel] Counting success stories');
        const data = await query(sql);
        return data;
    } catch (error) {
        logger.error('[SuccessStoryModel] Error counting success stories', { error: error.message });
        throw error;
    }
};