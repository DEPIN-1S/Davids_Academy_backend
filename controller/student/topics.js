const model = require('../../model/student/tests'); // Using test model to get course ID
const utilityDb = require('../../config/db');
const util = require('util');
const query = util.promisify(utilityDb.query).bind(utilityDb);
const logger = require('../../utils/logger');

module.exports.GetStudentTopics = async (req, res) => {
    try {
        const { user_id } = req?.user;
        
        // Find the course ID assigned to the student
        const studentData = await model.GetStudentData(user_id);
        if (studentData.length == 0) {
            logger.error("Student not found. Please login again", user_id);
            return res.send({
                result: false,
                message: "Student not found. Please login again"
            });
        }
        
        const courseId = studentData[0]?.target_exam;

        if (!courseId) {
             return res.send({
                result: true,
                message: "No Course mapped",
                data: []
            });
        }
        
        const sql = `
            SELECT 
                t.topic_id, 
                t.topic_name,
                (
                    SELECT COUNT(id) 
                    FROM tb_questions q 
                    WHERE q.topic_id = t.topic_id 
                    AND q.courseId = t.course_id 
                    AND q.exam_type = 'q-bank'
                ) AS total_questions,
                (
                    SELECT COUNT(DISTINCT qs.questionId)
                    FROM tb_QbankSubmit qs
                    INNER JOIN tb_questions q2 ON qs.questionId = q2.id
                    WHERE qs.user_id = ? 
                    AND q2.topic_id = t.topic_id
                    AND q2.exam_type = 'q-bank'
                ) AS completed_questions
            FROM tb_topics t 
            WHERE t.course_id = ? 
            ORDER BY t.created_at DESC
        `;
        const topicsRaw = await query(sql, [user_id, courseId]);
        
        const topics = topicsRaw.map(t => {
            const total = Number(t.total_questions) || 0;
            const completed = Number(t.completed_questions) || 0;
            return {
                ...t,
                is_completed: total > 0 && completed >= total
            };
        });
        
        logger.info("Successfully listed dynamic topics for student course.", { user_id, courseId, topicCount: topics.length });

        return res.send({
            result: true,
            message: "Student topics retrieved successfully",
            data: topics
        });
        
    } catch (error) {
        logger.error('[TopicController] Error fetching student topics', { error: error.message });
        return res.send({
            result: false,
            message: error.message
        });
    }
};
