require('dotenv').config();
const mysql = require('mysql');
const util = require('util');

async function fixTopics() {
    try {
        const connection = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
        });
        connection.connect();
        const query = util.promisify(connection.query).bind(connection);

        const topics = await query('SELECT topic_id, topic_name FROM tb_topics LIMIT 1');
        if (topics.length > 0) {
            const topicId = topics[0].topic_id;
            console.log("Found topic:", topics[0].topic_name, topicId);
            const result = await query('UPDATE tb_questions SET topic_id = ? WHERE topic_id IS NULL AND id > 700', [topicId]);
            console.log("Updated questions:", result.affectedRows);
        } else {
            console.log("No topics found in the database. Cannot backfill.");
        }
        
        connection.end();
    } catch (error) {
        console.error("Error:", error);
    }
}
fixTopics();
