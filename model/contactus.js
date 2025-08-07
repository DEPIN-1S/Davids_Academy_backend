var db = require("../config/db");
var util = require("util")
const query = util.promisify(db.query).bind(db);

module.exports.AddcContactDetailsquery = async (name, email, phone, subject, message) => {
    var Query = `insert into contactus (cu_name,cu_email,cu_phone,cu_subject,cu_message) values (?,?,?,?,?)`;
    var data = await query(Query, [name, email, phone, subject, message])
    return data;
}

module.exports.ListContactUsQuery = async (cu_id) => {
    var Query = `select * from contactus ORDER BY cu_id DESC`;
    var data = await query(Query, [cu_id]);
    return data;

}