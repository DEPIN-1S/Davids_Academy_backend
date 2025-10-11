const db = require('../../config/db');
const util = require('util');
const query = util.promisify(db.query).bind(db);
const logger = require('../../utils/logger');


module.exports.GetAllSuccessStories = async (limit = 10, offset = 0) => {
    try {
        const sql = `SELECT * FROM tb_success_stories 
        ORDER BY createdAt DESC
        LIMIT ? OFFSET ?`;
        logger.info('[SuccessStoryModel] Listing all success stories', { limit, offset });
        const data = await query(sql, [limit, offset]);
        return data;
    } catch (error) {
        logger.error('[SuccessStoryModel] Error in listing success stories', { error: error.message });
        throw error;
    }
}

module.exports.CountSuccessStories = async () => {
    try {
        const sql = `SELECT COUNT(*) as count FROM tb_success_stories`;
        logger.info('[SuccessStoryModel] Counting success stories');
        const data = await query(sql);
        return data;
    } catch (error) {
        logger.error('[SuccessStoryModel] Error in counting success stories', { error: error.message });
        throw error;
    }
}