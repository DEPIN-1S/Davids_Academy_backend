const db = require('../../config/db');
const util = require('util');
const query = util.promisify(db.query).bind(db);
const logger = require('../../utils/logger');

module.exports.CreateSuccessStory = async (image) => {
    try {
        const sql = `INSERT into tb_success_stories (image) values(?)`;
        logger.info('[SuccessStoryModel] Creating success story', { image });
        const data = await query(sql, [image]);
        return data;
    } catch (error) {
        logger.error('[SuccessStoryModel] Error creating success story', { error: error.message });
        throw error;
    }
}

module.exports.CheckSuccessStory = async (story_id) => {
    try {
        const sql = `SELECT * from tb_success_stories where id=?`;
        logger.info('[SuccessStoryModel] Checking success story', { story_id });
        const data = await query(sql, [story_id]);
        return data;
    } catch (error) {
        logger.error('[SuccessStoryModel] Error checking success story', { error: error.message });
        throw error;
    }
}

module.exports.EditSuccessStory = async (image, story_id) => {
    try {
        const sql = `UPDATE tb_success_stories set image=? where id=?`;
        logger.info('[SuccessStoryModel] Editing success story', { image, story_id });
        const data = await query(sql, [image, story_id]);
        return data;
    } catch (error) {
        logger.error('[SuccessStoryModel] Error editing success story', { error: error.message });
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

module.exports.DeleteSuccessStory = async (story_id) => {
    try {
        const sql = `DELETE from tb_success_stories where id=?`;
        logger.info('[SuccessStoryModel] Delete success story', { story_id });
        const data = await query(sql, [story_id]);
        return data;
    } catch (error) {
        logger.error('[SuccessStoryModel] Error in delete success story', { error: error.message });
        throw error;
    }
}