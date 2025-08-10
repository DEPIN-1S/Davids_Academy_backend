const db = require('../../config/db');
const util = require('util');
const query = util.promisify(db.query).bind(db);
const logger = require('../../utils/logger');


module.exports.InsertRecordings = async (title, thumbnail, course, subject, duration, tutor_name, video_url) => {
    try {
        const sql = `INSERT into tb_recordings (r_title,r_thumbnail,r_course,r_subject,r_duration,r_tutor_name,r_video_url)`;
        logger.info('[Recordingsmodel] Inserting recordings in db', { title, thumbnail, course, subject, duration, tutor_name, video_url });
        const data = await query(sql, [title, thumbnail, course, subject, duration, tutor_name, video_url]);
        return data;
    } catch (error) {
        logger.error('[Recordingsmodel] Error inserting recordings', { error: error.message });
        throw error;
    }
}

module.exports.CheckRecording = async (recording_id) => {
    try {
        const sql = `SELECT * from tb_recordings where r_id=?)`;
        logger.info('[Recordingsmodel] Checking recordings in db', { recording_id });
        const data = await query(sql, [recording_id]);
        return data;
    } catch (error) {
        logger.error('[Recordingsmodel] Error Checking recordings', { error: error.message });
        throw error;
    }
}


module.exports.EditRecordings = async (setClause, values) => {
    try {
        const sql = `UPDATE tb_recordings SET ${setClause} WHERE r_id = ?`;
        logger.info('[Recordingsmodel] Updating recordings in db', setClause, values);
        const data = await query(sql, values);
        return data;
    } catch (error) {
        logger.error('[Recordingsmodel] Error updating recordings', { error: error.message });
        throw error;
    }
}


module.exports.ListRecordings = async (whereClause = "", params = []) => {
    try {
        const sql = `SELECT * from tb_recordings ${whereClause} LIMIT ? OFFSET ?`;
        logger.info('[Recordingsmodel] Listing recordings in db', whereClause = "", params = []);
        const data = await query(sql, params);
        return data;
    } catch (error) {
        logger.error('[Recordingsmodel] Error in listing recordings', { error: error.message });
        throw error;
    }
}


module.exports.CountRecordings = async (whereClause = "", params = []) => {
    try {
        const sql = `SELECT COUNT(*) AS total FROM tb_recordings ${whereClause}`;
        logger.info('[Recordingsmodel] Counting recordings in db', whereClause = "", params = []);
        const data = await query(sql, params);
        return data;
    } catch (error) {
        logger.error('[Recordingsmodel] Error in Counting recordings', { error: error.message });
        throw error;
    }
}


module.exports.DeleteRecording = async (recording_id) => {
    try {
        const sql = `DELETE from tb_recordings where r_id=?`;
        logger.info('[Recordingsmodel] Delete recording in db', recording_id);
        const data = await query(sql, [recording_id]);
        return data;
    } catch (error) {
        logger.error('[Recordingsmodel] Error in delete recordings', { error: error.message });
        throw error;
    }
}