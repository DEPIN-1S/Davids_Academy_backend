require('dotenv').config();
const mysql = require('mysql');
const util = require('util');

async function assignTopicsToAllQuestions() {
    const connection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
    });
    connection.connect();
    const query = util.promisify(connection.query).bind(connection);

    try {
        // Step 1: Check before
        const before = await query('SELECT COUNT(*) as c FROM tb_questions WHERE topic_id IS NULL');
        console.log('Questions with NULL topic_id BEFORE update:', before[0].c);

        // Step 2: Get the existing topic for course 12
        const topics = await query('SELECT topic_id, topic_name FROM tb_topics WHERE course_id = 12');
        if (topics.length === 0) {
            console.log('ERROR: No topics found for course_id = 12');
            connection.end();
            return;
        }
        const topicId = topics[0].topic_id;
        console.log('Using topic:', topics[0].topic_name, '(topic_id=' + topicId + ')');

        // Step 3: Update all questions with NULL topic_id to use the existing topic
        const result = await query('UPDATE tb_questions SET topic_id = ? WHERE topic_id IS NULL', [topicId]);
        console.log('Updated rows:', result.affectedRows);

        // Step 4: Verify after
        const after = await query('SELECT COUNT(*) as c FROM tb_questions WHERE topic_id IS NULL');
        console.log('Questions with NULL topic_id AFTER update:', after[0].c);

        const total = await query('SELECT COUNT(*) as c FROM tb_questions WHERE topic_id = ?', [topicId]);
        console.log('Total questions now with topic_id=' + topicId + ':', total[0].c);

        console.log('\nDone! All questions now have the "Existing topics" topic assigned.');

    } catch (error) {
        console.error('Error:', error.message);
    }

    connection.end();
}

assignTopicsToAllQuestions();
