var db = require('../../config/db');
var util = require("util");
const query = util.promisify(db.query).bind(db);

module.exports.CreateStudent = async (firstname, lastname, email, password, phone, token) => {
    let Query = `insert into users (u_firstname,u_lastname,u_email,u_password,u_mobile,u_token,u_role) values(?,?,?,?,?,?,?)`
    return await query(Query, [firstname, lastname, email, password, phone, token, "student"])
}