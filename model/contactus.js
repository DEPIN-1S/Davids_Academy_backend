var db = require("../config/db");
var util = require("util")
const query = util.promisify(db.query).bind(db);
const logger = require('../utils/logger'); 

module.exports.AddcContactDetailsquery = async (name, email, phone, course_interested, message) => {
    var Query = `insert into tb_contact_us (cu_name,cu_email,cu_phone,cu_course_interested,cu_message) values (?,?,?,?,?)`;
    var data = await query(Query, [name, email, phone, course_interested, message])
    return data;
}

module.exports.ListContactUsQuery = async () => {
    var Query = `select * from tb_contact_us ORDER BY cu_id DESC`;
    var data = await query(Query);
    return data;
}

module.exports.CheckContactData = async (contact_us_id) => {
    try {
        const sql = `SELECT * from tb_contact_us where cu_id=?`;
        logger.info('[ContactUsModel] Checking contact us data from db', { contact_us_id });
        const data = await query(sql, [contact_us_id]);
        return data;
    } catch (error) {
        logger.error('[ContactUsModel] Error in Checking contact us data', { error: error.message });
        throw error;
    }
}

module.exports.UpdateContactUsStatus = async (contact_us_id, status) => {
    try {
        const sql = `update tb_contact_us set (cu_status=?) where cu_id=?`;
        logger.info('[ContactUsModel] Updating contact us status', { contact_us_id, status });
        const data = await query(sql, [status, contact_us_id]);
        return data;
    } catch (error) {
        logger.error('[ContactUsModel] Error in Updating contact us status', { error: error.message });
        throw error;
    }
}