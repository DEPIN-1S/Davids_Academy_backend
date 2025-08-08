const db = require('../../config/db');
const util = require('util');
const query = util.promisify(db.query).bind(db);
const logger = require('../../utils/logger');


module.exports.CreateNote = async (title, description, user_id) => {
    try {
        const sql = `INSERT into tb_notes (n_title,n_description,n_user_id) values(?,?,?)`;
        logger.info('[Notemodel] Creating note in student', { title, description, user_id });
        const data = await query(sql, [title, description, user_id]);
        return data;
    } catch (error) {
        logger.error('[Usermodel] Error creating note in student', { error: error.message });
        throw error;
    }
}


module.exports.CheckNote = async (note_id, user_id) => {
    try {
        const sql = `SELECT * from tb_notes where n_id=? and n_user_id=? and n_is_deleted=?`;
        logger.info('[Notemodel] Checking student note', { note_id, user_id });
        const data = await query(sql, [note_id, user_id, 0]);
        return data;
    } catch (error) {
        logger.error('[Usermodel] Error checking student note', { error: error.message });
        throw error;
    }
}


module.exports.EditNote = async (condition, note_id) => {
    try {
        const sql = `UPDATE tb_notes ${condition} where n_id=?`;
        logger.info('[Notemodel] Editing student note', { condition, note_id });
        const data = await query(sql, [note_id]);
        return data;
    } catch (error) {
        logger.error('[Usermodel] Error editing student note', { error: error.message });
        throw error;
    }
}


module.exports.GetNotesByDate = async (user_id, dateCondition = '', limit = 10, offset = 0) => {
    try {
        const sql = `SELECT * FROM tb_notes
        WHERE n_user_id = ? and n_is_deleted=0 ${dateCondition} 
        ORDER BY n_created_at DESC
        LIMIT ? OFFSET ?`;
        logger.info('[Notemodel] Listing all student note', { user_id, dateCondition, limit, offset });
        const data = await query(sql, [user_id, limit, offset]);
        return data;
    } catch (error) {
        logger.error('[Usermodel] Error in listing student note', { error: error.message });
        throw error;
    }
}


module.exports.CountNotes = async (user_id, dateCondition = '') => {
    try {
        const sql = `SELECT COUNT(*) as count FROM tb_notes
        WHERE n_user_id = ? and n_is_deleted=0 ${dateCondition}`;
        logger.info('[Notemodel] Counting student notes', { user_id, dateCondition });
        const data = await query(sql, [user_id]);
        return data;
    } catch (error) {
        logger.error('[Usermodel] Error in counting student note', { error: error.message });
        throw error;
    }
}


module.exports.DeleteNote = async (note_id) => {
    try {
        const sql = `UPDATE tb_notes set n_is_deleted=1 where n_id=?`;
        logger.info('[Notemodel] Delete student note', { note_id });
        const data = await query(sql, [note_id]);
        return data;
    } catch (error) {
        logger.error('[Usermodel] Error in delete student note', { error: error.message });
        throw error;
    }
}