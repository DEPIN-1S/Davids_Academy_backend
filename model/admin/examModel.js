var db = require('../../config/db');
var util = require("util");
const query = util.promisify(db.query).bind(db);
/**
 * Insert a new exam type into tb_exam_type.
 * @param {string} type  The exam type to insert.
 * @returns Promise resolving to the result of the INSERT.
 */
module.exports.insertExamType = async (type) => {
    const sql = `
    INSERT INTO tb_examType (type)
    VALUES (?)
  `;
    return await query(sql, [type]);
};