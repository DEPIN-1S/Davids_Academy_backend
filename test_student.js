require('dotenv').config();
const mysql = require('mysql');
const util = require('util');

async function testQuery() {
    const connection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
    });
    connection.connect();
    const query = util.promisify(connection.query).bind(connection);

    try {
        console.log("Finding topics with QBank questions...");
        const sql = `SELECT topic_id, COUNT(*) as count FROM tb_questions WHERE exam_type = 'q-bank' GROUP BY topic_id HAVING count > 0`;
        const r1 = await query(sql);
        console.table(r1);

    } catch (e) {
        console.error(e);
    } finally {
        connection.end();
    }
}
testQuery();
