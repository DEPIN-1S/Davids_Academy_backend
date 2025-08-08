var db = require('../../config/db');
var util = require("util");
const query = util.promisify(db.query).bind(db);

module.exports.CheckEmail = async (email) => {
    let Query = `select * from users where u_email=?`
    return await query(Query, [email])
}

module.exports.CheckPhone = async (phone) => {
    let Query = `select * from users where u_mobile=?`
    return await query(Query, [phone])
}

module.exports.CreateUser = async (firstname, lastname, email, password, phone, token) => {
    let Query = `insert into users (u_firstname,u_lastname,u_email,u_password,u_mobile,u_token) values(?,?,?,?,?,?)`
    return await query(Query, [firstname, lastname, email, password, phone, token])
}

module.exports.UpdateToken = async (email) => {
    const Query = `UPDATE users SET u_token = NULL WHERE u_email = ?`;
    return await query(Query, [email]);
};

module.exports.UpdatePassword = async (email, password) => {
    const Query = `update users set u_password=? where u_email=?`
    return await query(Query, [password, email])
}