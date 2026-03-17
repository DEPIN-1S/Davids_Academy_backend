require('dotenv').config();
const mysql = require('mysql');
const util = require('util');

async function testFetch() {
    try {
        const connection = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
        });
        connection.connect();
        const query = util.promisify(connection.query).bind(connection);

        const sql = `
            SELECT q.id,q.exam_type, q.question, q.difficulty,c.cs_name,t.type as questionType, top.topic_name
            FROM tb_questions q INNER JOIN courses c ON c.cs_id=q.courseId
            INNER JOIN  tb_questionType t ON q.question_type_id=t.id
            LEFT JOIN tb_topics top ON q.topic_id = top.topic_id
            WHERE q.exam_type = ?
              AND (q.isDeleted IS NULL OR q.isDeleted = 0) ORDER BY q.id DESC
            LIMIT ?
            OFFSET ?
        `;
        const rows = await query(sql, ["q-bank", 5, 0]);
        console.log("Returned rows:");
        console.table(rows);
        
        connection.end();
    } catch (error) {
        console.error("Error:", error);
    }
}
testFetch();
