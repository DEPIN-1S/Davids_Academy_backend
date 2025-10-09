const db = require('../../config/db');
const util = require('util');
const query = util.promisify(db.query).bind(db);
const logger = require('../../utils/logger');
module.exports.ListRecordings = async (whereClause = "", params = []) => {
    try {
        const sql = `SELECT * from tb_recordings ${whereClause} LIMIT ? OFFSET ?`;
        logger.info('[Recordingsmodel] Listing recordings in db', { whereClause, params });
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
        logger.info('[Recordingsmodel] Counting recordings in db', { whereClause, params });
        const data = await query(sql, params);
        return data;
    } catch (error) {
        logger.error('[Recordingsmodel] Error in Counting recordings', { error: error.message });
        throw error;
    }
}
