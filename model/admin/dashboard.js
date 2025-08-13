const db = require('../../config/db');
const util = require('util');
const query = util.promisify(db.query).bind(db);
const logger = require('../../utils/logger');

// module.exports.ListAllStudents = async () => {
//     const sql = `
//         SELECT 
//             u.*, 
//             c.* 
//         FROM tb_users u
//         LEFT JOIN courses c 
//             ON c.cs_id = u.target_exam
//         WHERE u.role = ?
//     `;
//     try {
//         const result = await query(sql, ["student"]);
//         logger.info(`✅ [ListAllStudents] Successfully retrieved all students with courses from db`);
//         return result;
//     } catch (err) {
//         logger.error(`[ListAllStudents] ❌ Failed to retrieve students with courses from db`);
//         throw err;
//     }
// };

module.exports.ListAllStudentsWithGrowth = async () => {
    const sql = `
        SELECT 
            (SELECT COUNT(*) FROM tb_users WHERE role = 'student') AS total_count,
            (SELECT COUNT(*) FROM tb_users WHERE role = 'student'
             AND MONTH(created_at) = MONTH(CURRENT_DATE())
             AND YEAR(created_at) = YEAR(CURRENT_DATE())) AS current_month,
            (SELECT COUNT(*) FROM tb_users WHERE role = 'student'
             AND MONTH(created_at) = MONTH(DATE_SUB(CURRENT_DATE(), INTERVAL 1 MONTH))
             AND YEAR(created_at) = YEAR(DATE_SUB(CURRENT_DATE(), INTERVAL 1 MONTH))) AS last_month
    `;
    try {
        const [result] = await query(sql);
        logger.info(`✅ [ListAllStudentsWithGrowth] Successfully retrieved all students and growth from db`);
        return result;
    } catch (err) {
        logger.error(`[ListAllStudentsWithGrowth] ❌ Failed to retrieve all students and growth from db`);
        throw err;
    }
};


module.exports.ListAllCourses = async () => {
    const sql = `SELECT * FROM courses`;
    try {
        const result = await query(sql);
        logger.info(`✅ [ListAllCourses] Successfully retrieved all courses from db`);
        return result;
    } catch (err) {
        logger.error(`[ListAllCourses] ❌ Failed to retrieve all courses from db`);
        throw err;
    }
}


module.exports.ListTestGrowth = async () => {
    const sql = `
        SELECT 
            (SELECT COUNT(*) FROM tb_tests) AS total_count,
            (SELECT COUNT(*) FROM tb_tests
             WHERE MONTH(createdAt) = MONTH(CURRENT_DATE())
             AND YEAR(createdAt) = YEAR(CURRENT_DATE())) AS current_month,
            (SELECT COUNT(*) FROM tb_tests
             WHERE MONTH(createdAt) = MONTH(DATE_SUB(CURRENT_DATE(), INTERVAL 1 MONTH))
             AND YEAR(createdAt) = YEAR(DATE_SUB(CURRENT_DATE(), INTERVAL 1 MONTH))) AS last_month
    `;
    try {
        const [result] = await query(sql);
        logger.info(`✅ [ListAllCourses] Successfully retrieved all tests and growth from db`);
        return result;
    } catch (err) {
        logger.error(`[ListAllCourses] ❌ Failed to retrieve all tests and growth from db`);
        throw err;
    }
};



module.exports.ListLast5Enquiries = async () => {
    const sql = `
        SELECT * 
        FROM tb_contact_us
        ORDER BY cu_created_at DESC
        LIMIT 5
    `;
    try {
        const result = await query(sql);
        logger.info(`✅ [ListLast5Enquiries] Successfully retrieved last 5 enquiries from db`);
        return result;
    } catch (err) {
        logger.error(`[ListLast5Enquiries] ❌ Failed to retrieve last 5 enquiries from db`);
        throw err;
    }
};


// model/dashboard.js
module.exports.ListTopPerformingCourses = async () => {
    const sql = `
        SELECT 
            c.cs_name AS course_name,
            ROUND(AVG(st.st_score), 0) AS avg_score
        FROM tb_submittedTest st
        INNER JOIN tb_users u ON u.id = st.st_user_id
        INNER JOIN courses c ON c.cs_id = u.target_exam
        WHERE MONTH(st.st_created_at) = MONTH(CURRENT_DATE())
          AND YEAR(st.st_created_at) = YEAR(CURRENT_DATE())
        GROUP BY c.cs_id
        ORDER BY avg_score DESC
        LIMIT 3
    `;
    try {
        const result = await query(sql);
        logger.info(`✅ [ListTopPerformingCourses] Successfully listed top performing courses from db`);
        return result;
    } catch (err) {
        logger.error(`[ListTopPerformingCourses] ❌ Failed to list top performing courses from db`);
        throw err;
    }
};
