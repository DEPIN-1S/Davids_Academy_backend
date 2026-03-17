require('dotenv').config();
const mysql = require('mysql');
const util = require('util');

async function check() {
    try {
        const connection = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
        });

        connection.connect();
        const query = util.promisify(connection.query).bind(connection);

        const rows = await query('SELECT id, question_type_id, exam_type, topic_id FROM tb_questions ORDER BY id DESC LIMIT 5');
        console.log("Recent questions (latest 5):");
        console.table(rows);
        
        const topicRows = await query('SELECT * FROM tb_topics ORDER BY topic_id DESC LIMIT 5');
        console.log("Recent topics:");
        console.table(topicRows);

        connection.end();
    } catch (error) {
        console.error("Error:", error);
    }
}
check();
