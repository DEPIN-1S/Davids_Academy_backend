const db = require('../../config/db');
const util = require('util');
const query = util.promisify(db.query).bind(db);
const logger = require('../../utils/logger');


module.exports.CheckEmail = async (condition) => {
    try {
        const sql = `SELECT * FROM tb_users ${condition} `;
        logger.info('[Usermodel] Fetching email data', { condition });
        const data = await query(sql);
        return data;
    } catch (error) {
        logger.error('[Usermodel] Error checking email data', { error: error.message });
        throw error;
    }
}


module.exports.InsertStudent = async (fullname, email, phone, password, target_exam) => {
    console.log('Test', fullname, email, phone, password, target_exam);
    try {
        const sql = `INSERT INTO tb_users (firstname,email,mobile,password,target_exam,role) VALUES (?,?,?,?,?,?)`;
        logger.info('[Usermodel] Inserting student in db', { fullname, email, phone, password, target_exam });
        const data = await query(sql, [fullname, email, phone, password, target_exam, "student"]);
        return data;
    } catch (error) {
        logger.error('[Usermodel] Error inserting student', { error: error.message });
        throw error;
    }
};



module.exports.EditStudent = async (setClause, values) => {
    try {
        const sql = `UPDATE tb_users SET ${setClause} WHERE id = ?`;
        console.log('sql', sql);
        logger.info('[Usermodel] Updating student in db', setClause, values);
        const data = await query(sql, values);
        return data;
    } catch (error) {
        logger.error('[Usermodel] Error updating student', { error: error.message });
        throw error;
    }
}


module.exports.ListAllStudents = async (whereClause = "", params = []) => {
    try {
        const sql = `SELECT u.*,c.cs_name FROM tb_users u INNER JOIN courses c ON c.cs_id = u.target_exam ${whereClause} LIMIT ? OFFSET ?`;
        logger.info('[Usermodel] Listing students from db', { whereClause, params });
        const data = await query(sql, params);
        return data;
    } catch (error) {
        logger.error('[Usermodel] Error in listing student', { error: error.message });
        throw error;
    }
};


module.exports.CountAllStudents = async (whereClause = "", params = []) => {
    try {
        const sql = `SELECT  COUNT(*) AS total from tb_users ${whereClause} `;
        logger.info('[Usermodel] Counting students from db', { whereClause, params });
        const data = await query(sql, params);
        return data;
    } catch (error) {
        logger.error('[Usermodel] Error in counting student', { error: error.message });
        throw error;
    }
}


module.exports.CheckStudent = async (student_id) => {
    try {
        const sql = `SELECT * from tb_users where id=? and role=?`;
        logger.info('[Usermodel] Check student with id ', { student_id });
        const data = await query(sql, [student_id, "student"]);
        return data;
    } catch (error) {
        logger.error('[Usermodel] Error in check student ', { error: error.message });
        throw error;
    }
}


module.exports.UpdateStatus = async (student_id, status) => {
    try {
        const sql = `UPDATE tb_users set status=? where id=?`;
        logger.info(`[Usermodel] Updating student status`, { student_id, new_status: status });
        const data = await query(sql, [status, student_id]);
        return data;
    } catch (error) {
        logger.error('[Usermodel] Error in update student status', { error: error.message });
        throw error;
    }
}


module.exports.ListSubmittedTest = async (student_id) => {
    try {
        const sql = `SELECT 
    t.id AS test_id, 
    t.testTitle, 
    t.fromDate, 
    t.toDate, 
    t.totalQuestions,
    COUNT(DISTINCT sq.sq_question_id) AS total_attempted,
    COUNT(DISTINCT CASE WHEN sq.sq_is_correct = 1 THEN sq.sq_question_id END) AS correct_count,
    COUNT(DISTINCT CASE WHEN sq.sq_is_correct = 0 THEN sq.sq_question_id END) AS wrong_count
FROM tb_tests t
LEFT JOIN tb_submittedQuestions sq 
    ON t.id = sq.sq_test_id AND sq.sq_user_id = ?
WHERE (sq.sq_user_id = ? OR sq.sq_user_id IS NULL)
GROUP BY t.id, t.testTitle, t.fromDate, t.toDate, t.totalQuestions;
`;
        logger.info(`[ListSubmittedTest] Listing student submitted test from db`, { student_id });
        const data = await query(sql, [student_id, student_id]);
        return data;
    } catch (error) {
        logger.error('[ListSubmittedTest] Error in list student submitted test', { error: error.message });
        throw error;
    }
}
// list question bank result
module.exports.ListQuestionBankResult = async (student_id, courseId) => {
    try {
        const sql = `SELECT 
            top.topic_id,
            top.topic_name,
            COUNT(DISTINCT qb.id) AS total_attempted,
            SUM(CASE WHEN qb.is_correct = 1 THEN 1 ELSE 0 END) AS correct_count,
            SUM(CASE WHEN qb.is_correct = 0 THEN 1 ELSE 0 END) AS wrong_count
        FROM tb_topics top
        LEFT JOIN tb_questions q ON q.topic_id = top.topic_id AND q.exam_type = 'q-bank' AND q.courseId = ?
        LEFT JOIN tb_QbankSubmit qb ON qb.questionId = q.id AND qb.user_id = ?
        WHERE top.course_id = ?
        GROUP BY top.topic_id, top.topic_name;`;
        
        logger.info(`[ListQuestionBankResult] Listing student submitted qbank from db`, { student_id, courseId });
        const data = await query(sql, [courseId, student_id, courseId]);
        return data;
    } catch (error) {
        logger.error('[ListQuestionBankResult] Error in list student submitted qbank', { error: error.message });
        throw error;
    }
}
// total QBank questions per topic
module.exports.totalQuestionBankQuestions = async (course) => {
    try {
        const sql = `SELECT topic_id, COUNT(*) as total_questions FROM tb_questions 
        WHERE courseId = ? AND exam_type = 'q-bank' AND topic_id IS NOT NULL
        GROUP BY topic_id;
`;
        logger.info(`[totalQuestionBankQuestions] Counting total query bank questions`, { course });
        const data = await query(sql, [course]);
        return data;
    } catch (error) {
        logger.error('[totalQuestionBankQuestions] Error in getting total qbank questions', { error: error.message });
        throw error;
    }
}

module.exports.ListSubmittedQuestions = async (student_id, test_id) => {
    try {
        const sql = `SELECT * from tb_submittedQuestions where sq_user_id=? and sq_test_id=?`;
        logger.info(`[ListSubmittedTest] Listing student submitted questions from db`, { student_id });
        const data = await query(sql, [student_id, test_id]);
        return data;
    } catch (error) {
        logger.error('[ListSubmittedTest] Error in list student submitted questions', { error: error.message });
        throw error;
    }
}

module.exports.CheckTest = async (test_id) => {
    try {
        const sql = `SELECT * from tb_tests where id=?`;
        logger.info(`[Check Test] Check test exist in db`, { test_id });
        const data = await query(sql, [test_id]);
        return data;
    } catch (error) {
        logger.error('[Check Test] Error in  Check test exist in db', { error: error.message });
        throw error;
    }
}


module.exports.DeleteSubmittedTest = async (student_id, test_id) => {
    try {
        const sql = `Delete from tb_submittedQuestions where sq_user_id=? and sq_test_id=?`;
        logger.info(`[Delete submitted test] Delete submitted test from db`, { student_id, test_id });
        const data = await query(sql, [student_id, test_id]);
        return data;
    } catch (error) {
        logger.error('[Delete submitted test] Error in Delete submitted test from db', { error: error.message });
        throw error;
    }
}
module.exports.DeleteSubmittedMockTest = async (student_id, test_id) => {
    try {
        const sql = `Delete from tb_submittedTest where st_user_id=? and st_test_id=?`;
        logger.info(`[Delete submitted mock test] Delete submitted test from db`, { student_id, test_id });
        const data = await query(sql, [student_id, test_id]);
        return data;
    } catch (error) {
        logger.error('[Delete submitted test] Error in Delete submitted test from db', { error: error.message });
        throw error;
    }
}
module.exports.DeleteQuestionBank = async (student_id, topic_id = null) => {
    try {
        let sql = `DELETE qb FROM tb_QbankSubmit qb `;
        const params = [student_id];
        
        if (topic_id) {
            sql += `JOIN tb_questions q ON qb.questionId = q.id WHERE qb.user_id = ? AND q.topic_id = ?`;
            params.push(topic_id);
        } else {
            sql += `WHERE qb.user_id = ?`;
        }
        
        logger.info(`[Delete submitted question bank] Delete submitted question bank from db`, { student_id, topic_id });
        const data = await query(sql, params);
        return data;
    } catch (error) {
        logger.error('[Delete submitted question bank] Error in Delete submitted question bank from db', { error: error.message });
        throw error;
    }
}

// Reset all Q-Bank progress as one unit. If any delete fails, every delete is
// rolled back so the summary and question-type answer tables cannot disagree.
module.exports.ResetQuestionBankProgress = async (student_id, topic_id = null) => {
    const connection = await new Promise((resolve, reject) => {
        db.getConnection((error, conn) => error ? reject(error) : resolve(conn));
    });
    const run = (sql, params) => new Promise((resolve, reject) => {
        connection.query(sql, params, (error, result) =>
            error ? reject(error) : resolve(result)
        );
    });
    const begin = () => new Promise((resolve, reject) => {
        connection.beginTransaction(error => error ? reject(error) : resolve());
    });
    const commit = () => new Promise((resolve, reject) => {
        connection.commit(error => error ? reject(error) : resolve());
    });
    const rollback = () => new Promise(resolve => {
        connection.rollback(() => resolve());
    });

    const tables = [
        { name: 'tb_QbankSubmit', userColumn: 'user_id' },
        { name: 'tb_Qbank_Mcq_Student_Answers', userColumn: 'userId' },
        { name: 'tb_dropdown_Qbank_student_answers', userColumn: 'userId' },
        { name: 'tb_sort_Qbank_student_answers', userColumn: 'userId' },
        { name: 'tb_sentenceHiglight_Qbank_student_answers', userColumn: 'userId' },
        { name: 'tb_dragdrop_Qbank_student_answers', userColumn: 'userId' },
        { name: 'tb_multiradio_Qbank_student_answers', userColumn: 'userId' },
        { name: 'tb_tabledropdown_Qbank_student_answers', userColumn: 'userId' },
        { name: 'tb_tablehighlight_Qbank_student_answers', userColumn: 'userId' },
        { name: 'tb_multidropdown_Qbank_student_answers', userColumn: 'userId' },
    ];

    try {
        await begin();
        const deletedByTable = {};

        for (const table of tables) {
            let sql;
            let params;
            if (topic_id != null) {
                sql = `DELETE progress
                    FROM ${table.name} progress
                    INNER JOIN tb_questions q ON progress.questionId = q.id
                    WHERE progress.${table.userColumn} = ? AND q.topic_id = ?`;
                params = [student_id, topic_id];
            } else {
                sql = `DELETE FROM ${table.name} WHERE ${table.userColumn} = ?`;
                params = [student_id];
            }
            const result = await run(sql, params);
            deletedByTable[table.name] = result.affectedRows || 0;
        }

        let remainingSql = `
            SELECT COUNT(*) AS count
            FROM tb_QbankSubmit progress
            INNER JOIN tb_questions q ON progress.questionId = q.id
            WHERE progress.user_id = ?`;
        const remainingParams = [student_id];
        if (topic_id != null) {
            remainingSql += ` AND q.topic_id = ?`;
            remainingParams.push(topic_id);
        }
        const remaining = await run(remainingSql, remainingParams);
        const remainingSubmissions = Number(remaining[0]?.count) || 0;
        if (remainingSubmissions !== 0) {
            throw new Error('Q-Bank reset verification failed');
        }

        await commit();
        logger.info('[ResetQuestionBankProgress] Q-Bank progress reset', {
            student_id,
            topic_id,
            deletedByTable,
        });
        return {
            affectedRows: Object.values(deletedByTable).reduce(
                (total, count) => total + count,
                0
            ),
            deletedByTable,
            remainingSubmissions,
        };
    } catch (error) {
        await rollback();
        logger.error('[ResetQuestionBankProgress] Transaction rolled back', {
            student_id,
            topic_id,
            error: error.message,
        });
        throw error;
    } finally {
        connection.release();
    }
};

module.exports.DeleteSubmittedMockTestMCQAnswers = async (student_id, test_id) => {
    try {
        const sql = `Delete from tb_Mocktest_Mcq_Student_Answers where userId=? and testId=? `;
        logger.info(`[Delete submitted MCQ mock test student answer] Delete submitted mocktest mcq answer from db`, { student_id, test_id });
        const data = await query(sql, [student_id, test_id]);
        return data;
    } catch (error) {
        logger.error('[Delete submitted MCQ mock test answer] Error in Delete submitted mocktest mcq answer from db', { error: error.message });
        throw error;
    }
}

module.exports.DeleteSubmittedMockTestDropdownAnswers = async (student_id, test_id) => {
    try {
        const sql = `Delete from tb_dropdown_Mocktest_student_answers where userId=? and testId=? `;
        logger.info(`[Delete submitted dropdown mock test student answer] Delete submitted dropdown mocktest answer from db`, { student_id, test_id });
        const data = await query(sql, [student_id, test_id]);
        return data;
    } catch (error) {
        logger.error('[Delete submitted dropdown mock test answer] Error in Delete submitted dropdown mock test answer from db', { error: error.message });
        throw error;
    }
}

module.exports.DeleteSubmittedMockTestSortAnswers = async (student_id, test_id) => {
    try {
        const sql = `Delete from tb_sort_Mocktest_student_answers where userId=? and testId=? `;
        logger.info(`[Delete submitted sort mock test student answer] Delete submitted sort mocktest answer from db`, { student_id, test_id });
        const data = await query(sql, [student_id, test_id]);
        return data;
    } catch (error) {
        logger.error('[Delete submitted sort mock test answer] Error in Delete submitted sort mock test answer from db', { error: error.message });
        throw error;
    }
}

module.exports.DeleteSubmittedMockTestSentenceHighlightAnswers = async (student_id, test_id) => {
    try {
        const sql = `Delete from tb_sentenceHiglight_Mocktest_student_answers where userId=? and testId=? `;
        logger.info(`[Delete submitted sentence highlight mock test student answer] Delete submitted sentence highlight mocktest answer from db`, { student_id, test_id });
        const data = await query(sql, [student_id, test_id]);
        return data;
    } catch (error) {
        logger.error('[Delete submitted sentence highlight mock test answer] Error in Delete submitted sentence highlight mock test answer from db', { error: error.message });
        throw error;
    }
}

module.exports.DeleteSubmittedMockTestDragdropAnswers = async (student_id, test_id) => {
    try {
        const sql = `Delete from tb_dragdrop_Mocktest_student_answers where userId=? and testId=? `;
        logger.info(`[Delete submitted dragdrop mock test student answer] Delete submitted dragdrop mocktest answer from db`, { student_id, test_id });
        const data = await query(sql, [student_id, test_id]);
        return data;
    } catch (error) {
        logger.error('[Delete submitted dragdrop mock test answer] Error in Delete submitted dragdrop mock test answer from db', { error: error.message });
        throw error;
    }
}

module.exports.DeleteSubmittedMockTestMultiRadioAnswers = async (student_id, test_id) => {
    try {
        const sql = `Delete from tb_multiradio_Mocktest_student_answers where userId=? and testId=? `;
        logger.info(`[Delete submitted multiradio mock test student answer] Delete submitted multiradio mocktest answer from db`, { student_id, test_id });
        const data = await query(sql, [student_id, test_id]);
        return data;
    } catch (error) {
        logger.error('[Delete submitted multiradio mock test answer] Error in Delete submitted multiradio mock test answer from db', { error: error.message });
        throw error;
    }
}

module.exports.DeleteSubmittedMockTestTableDropdownAnswers = async (student_id, test_id) => {
    try {
        const sql = `Delete from tb_tabledropdown_Mocktest_student_answers where userId=? and testId=? `;
        logger.info(`[Delete submitted table dropdown mock test student answer] Delete submitted table dropdown mocktest answer from db`, { student_id, test_id });
        const data = await query(sql, [student_id, test_id]);
        return data;
    } catch (error) {
        logger.error('[Delete submitted table dropdown mock test answer] Error in Delete submitted table dropdown mock test answer from db', { error: error.message });
        throw error;
    }
}

module.exports.DeleteSubmittedMockTestTableHighlightAnswers = async (student_id, test_id) => {
    try {
        const sql = `Delete from tb_tablehighlight_Mocktest_student_answers where userId=? and testId=? `;
        logger.info(`[Delete submitted table highlight mock test student answer] Delete submitted table highlight mocktest answer from db`, { student_id, test_id });
        const data = await query(sql, [student_id, test_id]);
        return data;
    } catch (error) {
        logger.error('[Delete submitted table highlight mock test answer] Error in Delete submitted table highlight mock test answer from db', { error: error.message });
        throw error;
    }
}

module.exports.DeleteSubmittedMockTestMultiDropdownAnswers = async (student_id, test_id) => {
    try {
        const sql = `Delete from tb_multidropdown_Mocktest_student_answers where userId=? and testId=? `;
        logger.info(`[Delete submitted multi dropdown mock test student answer] Delete submitted multi dropdown mocktest answer from db`, { student_id, test_id });
        const data = await query(sql, [student_id, test_id]);
        return data;
    } catch (error) {
        logger.error('[Delete submitted multi dropdown mock test answer] Error in Delete submitted multi dropdown mock test answer from db', { error: error.message });
        throw error;
    }
}

module.exports.DeleteSubmittedQbankMCQAnswers = async (student_id, topic_id = null) => {
    try {
        let sql = `DELETE qb FROM tb_Qbank_Mcq_Student_Answers qb `;
        const params = [student_id];
        
        if (topic_id) {
            sql += `JOIN tb_questions q ON qb.questionId = q.id WHERE qb.userId = ? AND q.topic_id = ?`;
            params.push(topic_id);
        } else {
            sql += `WHERE qb.userId = ?`;
        }
        
        logger.info(`[Delete submitted mcq qbank student answer] Delete submitted mcq qbank answer from db`, { student_id, topic_id });
        const data = await query(sql, params);
        return data;
    } catch (error) {
        logger.error('[Delete submitted mcq qbank answer] Error in Delete submitted mcq qbank answer from db', { error: error.message });
        throw error;
    }
}

module.exports.DeleteSubmittedQbankDropdownAnswers = async (student_id, topic_id = null) => {
    try {
        let sql = `DELETE qb FROM tb_dropdown_Qbank_student_answers qb `;
        const params = [student_id];
        
        if (topic_id) {
            sql += `JOIN tb_questions q ON qb.questionId = q.id WHERE qb.userId = ? AND q.topic_id = ?`;
            params.push(topic_id);
        } else {
            sql += `WHERE qb.userId = ?`;
        }
        
        logger.info(`[Delete submitted dropdown qbank student answer] Delete submitted dropdown qbank answer from db`, { student_id, topic_id });
        const data = await query(sql, params);
        return data;
    } catch (error) {
        logger.error('[Delete submitted dropdown qbank answer] Error in Delete submitted dropdown qbank answer from db', { error: error.message });
        throw error;
    }
}

module.exports.DeleteSubmittedQbankSortAnswers = async (student_id, topic_id = null) => {
    try {
        let sql = `DELETE qb FROM tb_sort_Qbank_student_answers qb `;
        const params = [student_id];
        
        if (topic_id) {
            sql += `JOIN tb_questions q ON qb.questionId = q.id WHERE qb.userId = ? AND q.topic_id = ?`;
            params.push(topic_id);
        } else {
            sql += `WHERE qb.userId = ?`;
        }
        
        logger.info(`[Delete submitted sort qbank student answer] Delete submitted sort qbank answer from db`, { student_id, topic_id });
        const data = await query(sql, params);
        return data;
    } catch (error) {
        logger.error('[Delete submitted sort qbank answer] Error in Delete submitted sort qbank answer from db', { error: error.message });
        throw error;
    }
}

module.exports.DeleteSubmittedQbankSentenceHighlightAnswers = async (student_id, topic_id = null) => {
    try {
        let sql = `DELETE qb FROM tb_sentenceHiglight_Qbank_student_answers qb `;
        const params = [student_id];
        
        if (topic_id) {
            sql += `JOIN tb_questions q ON qb.questionId = q.id WHERE qb.userId = ? AND q.topic_id = ?`;
            params.push(topic_id);
        } else {
            sql += `WHERE qb.userId = ?`;
        }
        
        logger.info(`[Delete submitted sentence hightlight qbank student answer] Delete submitted sentence hightlight qbank answer from db`, { student_id, topic_id });
        const data = await query(sql, params);
        return data;
    } catch (error) {
        logger.error('[Delete submitted sentence hightlight qbank answer] Error in Delete submitted sentence hightlight qbank answer from db', { error: error.message });
        throw error;
    }
}

module.exports.DeleteSubmittedQbankDragdropAnswers = async (student_id, topic_id = null) => {
    try {
        let sql = `DELETE qb FROM tb_dragdrop_Qbank_student_answers qb `;
        const params = [student_id];
        
        if (topic_id) {
            sql += `JOIN tb_questions q ON qb.questionId = q.id WHERE qb.userId = ? AND q.topic_id = ?`;
            params.push(topic_id);
        } else {
            sql += `WHERE qb.userId = ?`;
        }
        
        logger.info(`[Delete submitted dragdrop qbank student answer] Delete submitted dragdrop qbank answer from db`, { student_id, topic_id });
        const data = await query(sql, params);
        return data;
    } catch (error) {
        logger.error('[Delete submitted dragdrop qbank answer] Error in Delete submitted dragdrop qbank answer from db', { error: error.message });
        throw error;
    }
}

module.exports.DeleteSubmittedQbankMultiRadioAnswers = async (student_id, topic_id = null) => {
    try {
        let sql = `DELETE qb FROM tb_multiradio_Qbank_student_answers qb `;
        const params = [student_id];
        
        if (topic_id) {
            sql += `JOIN tb_questions q ON qb.questionId = q.id WHERE qb.userId = ? AND q.topic_id = ?`;
            params.push(topic_id);
        } else {
            sql += `WHERE qb.userId = ?`;
        }
        
        logger.info(`[Delete submitted multi radio qbank student answer] Delete submitted multi radio qbank answer from db`, { student_id, topic_id });
        const data = await query(sql, params);
        return data;
    } catch (error) {
        logger.error('[Delete submitted multi radio qbank answer] Error in Delete submitted multi radio qbank answer from db', { error: error.message });
        throw error;
    }
}

module.exports.DeleteSubmittedQbankTableDropdownAnswers = async (student_id, topic_id = null) => {
    try {
        let sql = `DELETE qb FROM tb_tabledropdown_Qbank_student_answers qb `;
        const params = [student_id];
        
        if (topic_id) {
            sql += `JOIN tb_questions q ON qb.questionId = q.id WHERE qb.userId = ? AND q.topic_id = ?`;
            params.push(topic_id);
        } else {
            sql += `WHERE qb.userId = ?`;
        }
        
        logger.info(`[Delete submitted table dropdown qbank student answer] Delete submitted table dropdown qbank answer from db`, { student_id, topic_id });
        const data = await query(sql, params);
        return data;
    } catch (error) {
        logger.error('[Delete submitted table dropdown qbank answer] Error in Delete submitted table dropdown qbank answer from db', { error: error.message });
        throw error;
    }
}

module.exports.DeleteSubmittedQbankTableHighlightAnswers = async (student_id, topic_id = null) => {
    try {
        let sql = `DELETE qb FROM tb_tablehighlight_Qbank_student_answers qb `;
        const params = [student_id];
        
        if (topic_id) {
            sql += `JOIN tb_questions q ON qb.questionId = q.id WHERE qb.userId = ? AND q.topic_id = ?`;
            params.push(topic_id);
        } else {
            sql += `WHERE qb.userId = ?`;
        }
        
        logger.info(`[Delete submitted table highlight qbank student answer] Delete submitted table highlight qbank answer from db`, { student_id, topic_id });
        const data = await query(sql, params);
        return data;
    } catch (error) {
        logger.error('[Delete submitted table highlight qbank answer] Error in Delete submitted table highlight qbank answer from db', { error: error.message });
        throw error;
    }
}

module.exports.DeleteSubmittedQbankMultiDropdownAnswers = async (student_id, topic_id = null) => {
    try {
        let sql = `DELETE qb FROM tb_multidropdown_Qbank_student_answers qb `;
        const params = [student_id];
        
        if (topic_id) {
            sql += `JOIN tb_questions q ON qb.questionId = q.id WHERE qb.userId = ? AND q.topic_id = ?`;
            params.push(topic_id);
        } else {
            sql += `WHERE qb.userId = ?`;
        }
        
        logger.info(`[Delete submitted multi dropdown qbank student answer] Delete submitted multi dropdown qbank answer from db`, { student_id, topic_id });
        const data = await query(sql, params);
        return data;
    } catch (error) {
        logger.error('[Delete submitted multi dropdown qbank answer] Error in Delete submitted multi dropdown qbank answer from db', { error: error.message });
        throw error;
    }
}