require('dotenv').config();
const mysql = require('mysql');
const util = require('util');

async function checkStatus() {
    const connection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
    });
    connection.connect();
    const query = util.promisify(connection.query).bind(connection);

    try {
        // 1. Show all topics
        const topics = await query('SELECT * FROM tb_topics ORDER BY topic_id');
        console.log('\n=== ALL TOPICS ===');
        console.table(topics);

        // 2. Count questions with NULL topic_id
        const nullTopics = await query('SELECT COUNT(*) as count FROM tb_questions WHERE topic_id IS NULL');
        console.log('\n=== Questions with NULL topic_id ===');
        console.log('Count:', nullTopics[0].count);

        // 3. Count questions WITH topic_id
        const withTopics = await query('SELECT COUNT(*) as count FROM tb_questions WHERE topic_id IS NOT NULL');
        console.log('\n=== Questions WITH topic_id ===');
        console.log('Count:', withTopics[0].count);

        // 4. Show questions grouped by courseId and topic_id
        const grouped = await query(`
            SELECT q.courseId, c.cs_name as course_name, q.topic_id, t.topic_name, COUNT(*) as question_count 
            FROM tb_questions q 
            LEFT JOIN tb_topics t ON q.topic_id = t.topic_id 
            LEFT JOIN courses c ON q.courseId = c.cs_id
            GROUP BY q.courseId, q.topic_id 
            ORDER BY q.courseId, q.topic_id
        `);
        console.log('\n=== Questions grouped by Course and Topic ===');
        console.table(grouped);

        // 5. Show distinct courses that have questions
        const courses = await query(`
            SELECT DISTINCT q.courseId, c.cs_name as course_name 
            FROM tb_questions q 
            LEFT JOIN courses c ON q.courseId = c.cs_id 
            ORDER BY q.courseId
        `);
        console.log('\n=== Courses with questions ===');
        console.table(courses);

        // 6. Show topics per course
        const topicsPerCourse = await query(`
            SELECT t.topic_id, t.course_id, t.topic_name, c.cs_name as course_name 
            FROM tb_topics t 
            LEFT JOIN courses c ON t.course_id = c.cs_id 
            ORDER BY t.course_id, t.topic_id
        `);
        console.log('\n=== Topics per Course ===');
        console.table(topicsPerCourse);

    } catch (error) {
        console.error('Error:', error.message);
    }

    connection.end();
}
checkStatus();
