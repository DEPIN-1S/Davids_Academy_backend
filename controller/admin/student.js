// Student Controller: Handles student registration, update, listing, status, and test/question submissions
const models = require('../../model/admin/loginModels');
const model = require('../../model/admin/student')
const logger = require('../../utils/logger');
const { HashPassword } = require('../../utils/bcrypt')
module.exports.CreateStudent = async (req, res) => {
    try {
        const { fullname, email, phone, password, target_exam } = req.body || {}
        if (!fullname || !email || !phone || !password || !target_exam) {
            return res.send({
                result: false,
                message: "Full name, email, phone, password and target exam are required"
            })
        }
        const trimmedEmail = email.toLowerCase().trim()
        const cond = ` WHERE email = '${trimmedEmail}'`
        let checkEmail = await model.CheckEmail(cond)
        if (checkEmail.length > 0) {
            logger.error('Email already registered in db: %s', trimmedEmail);
            return res.send({
                result: false,
                message: "Email already registered."
            })
        }
        const hashedPassword = await HashPassword(password)
        console.log('hashedPassword', hashedPassword);
        const insertStudent = await model.InsertStudent(fullname, trimmedEmail, phone, hashedPassword, target_exam)
        if (insertStudent.affectedRows > 0) {
            logger.info(`Student created successfully: ${email}`);
            return res.send({
                result: true,
                message: "Student registration successfull",
                data: {
                    email: trimmedEmail,
                    password
                }
            })
        } else {
            logger.error(`Failed to insert student: ${email}`);
            return res.send({
                result: false,
                message: "Failed to insert student"
            })
        }
    } catch (error) {
        return res.send({
            result: false,
            message: error.message
        })
    }
}
module.exports.AdminResetPassword = async (req, res) => {
    try {
        const { email, newPassword } = req.body;
        if (!email || !newPassword) {
            logger.warn("Missing fields in admin reset password request");
            return res.status(400).send({ result: false, message: 'Email and new password are required' });
        }

        const user = await models.checkEmail(email);
        if (user.length === 0) {
            logger.warn(`Admin reset password failed: email not found - ${email}`);
            return res.status(404).send({ result: false, message: 'User not found' });
        }

        const hashedPassword = await HashPassword(newPassword);
        const updateResult = await models.updatePassword(email, hashedPassword);
        if (updateResult.affectedRows > 0) {
            logger.info(`Admin reset password successful for user: ${email} by admin: ${req.user.email}`);
            return res.send({ result: true, message: 'Password reset successful' });
        } else {
            logger.error(`Admin reset password failed for user: ${email}`);
            return res.status(500).send({ result: false, message: 'Failed to reset password' });
        }
    } catch (error) {
        logger.error(`AdminResetPassword error: ${error.message}`);
        return res.status(500).send({ result: false, message: error.message });
    }
};


// update students
module.exports.EditStudent = async (req, res) => {
    try {
        const { student_id, fullname, email, phone, target_exam } = req.body || {}
        if (!student_id) {
            return res.send({
                result: false,
                message: "Student id is required"
            })
        }
        let checkStudent = await model.CheckStudent(student_id)
        if (checkStudent.length === 0) {
            logger.error('Student not found in db: %s', student_id);
            return res.send({
                result: false,
                message: "Student not found."
            })
        }

        // Check for duplicate email
        let trimmedEmail = email?.toLowerCase().trim();
        // Dynamically build update fields
        const fields = [];
        const values = [];

        if (fullname) {
            fields.push('firstname = ?');
            values.push(fullname);
        }

        if (trimmedEmail) {
            fields.push('email = ?');
            values.push(trimmedEmail);
        }

        if (phone) {
            fields.push('mobile = ?');
            values.push(phone);
        }

        if (target_exam) {
            fields.push('target_exam = ?');
            values.push(target_exam);
        }

        // Finalize query
        const setClause = fields.join(', ');
        values.push(student_id); // for WHERE clause

        // Only run update if there are fields
        if (fields.length > 0) {
            const updateStudent = await model.EditStudent(setClause, values)
            if (updateStudent.affectedRows === 0) {
                logger.error(`Failed to update student: ${email}`);
                return res.send({
                    result: false,
                    message: "Failed to update student"
                })
            }
        }
        logger.info(`Student updated successfully: ${email}`);
        return res.send({
            result: true,
            message: "Student updated successfully"
        })
    } catch (error) {
        return res.send({
            result: false,
            message: error.message
        })
    }
}
// list all students
module.exports.ListAllStudents = async (req, res) => {
    try {
        const {
            searchQuery = '',
            type,
            page = 1,
            limit = 10
        } = req.body || {};

        // Validate `type`
        const allowedTypes = ["all", "active", "inactive"];
        if (!type || !allowedTypes.includes(type)) {
            return res.send({
                result: false,
                message: "Type is required and must be one of [ 'all', 'active', 'inactive' ]"
            });
        }

        let conditions = [];
        let params = [];

        // Search filter
        if (searchQuery.trim()) {
            conditions.push(`(email LIKE ? OR id LIKE ? OR mobile LIKE ?)`);
            const term = `%${searchQuery.trim()}%`;
            params.push(term, term, term);
        }

        // Status filter
        if (type !== "all") {
            conditions.push(`status = ?`);
            params.push(type);
        }

        // Role filter (only students)
        conditions.push(`role = ?`);
        params.push("student");

        // WHERE clause
        const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

        // Clone params for count query (without limit/offset)
        const countParams = [...params];

        // Pagination setup
        const parsedLimit = parseInt(limit);
        const parsedPage = parseInt(page);
        const offset = (parsedPage - 1) * parsedLimit;

        // Add limit & offset
        params.push(parsedLimit, offset);

        // Fetch paginated students and total count
        const studentList = await model.ListAllStudents(whereClause, params);
        const countResult = await model.CountAllStudents(whereClause, countParams);
        const totalCount = countResult?.[0]?.total || 0;

        logger.info(`Students listed successfully: where=${whereClause}, params=${JSON.stringify(params)}`);

        return res.send({
            result: true,
            message: "Students listed successfully",
            data: studentList,
            pagination: {
                total: totalCount,
                page: parsedPage,
                limit: parsedLimit,
                totalPages: Math.ceil(totalCount / parsedLimit)
            }
        });

    } catch (error) {
        logger.error(`Error listing students: ${error.message}`);
        return res.send({
            result: false,
            message: "Failed to list students",
            error: error.message
        });
    }
};
module.exports.UpdateStudentStatus = async (req, res) => {
    try {
        let { student_id } = req.body || {}
        if (!student_id) {
            return res.send({
                result: false,
                message: "student id is required"
            })
        }
        let checkStudent = await model.CheckStudent(student_id)
        if (checkStudent.length === 0) {
            logger.error('Student not found in db: %s', student_id);
            return res.send({
                result: false,
                message: "Student not found."
            })
        }
        let status = checkStudent[0]?.status === "active" ? "inactive" : "active"
        let updated = await model.UpdateStatus(student_id, status)
        if (updated.affectedRows > 0) {
            logger.info(`Students status updated successfully: ${student_id}`);
            return res.send({
                result: true,
                message: "Student status updated successfully"
            })
        } else {
            return res.send({
                result: false,
                message: "Failed to update student status"
            })
        }
    } catch (error) {
        return res.send({
            result: false,
            message: error.message
        })
    }
}
module.exports.ListStudentSubmittedTest = async (req, res) => {
    try {
        let { student_id } = req.body || {}
        if (!student_id) {
            return res.send({
                result: false,
                message: "student id is required"
            })
        }
        let checkStudent = await model.CheckStudent(student_id)
        if (checkStudent.length === 0) {
            logger.error('Student not found in db: %s', student_id);
            return res.send({
                result: false,
                message: "Student not found."
            })
        }
        const submittedTest = await model.ListSubmittedTest(student_id)
        const QbankResult = await model.ListQuestionBankResult(student_id)
        const totalQBankQuestions = await model.totalQuestionBankQuestions(checkStudent[0]?.target_exam)
        // Safe extraction
        const totalQuestionsInQbank = totalQBankQuestions?.[0]?.total_questions || 0;

        // Assuming QbankResult has correct and wrong counts summed across available tests for the student,
        // otherwise you might need to sum them here explicitly.
        const qBankSummary = {
            totalQuestions: totalQuestionsInQbank,
            correct_count: QbankResult.reduce((acc, curr) => acc + (curr.correct_count || 0), 0),
            wrong_count: QbankResult.reduce((acc, curr) => acc + (curr.wrong_count || 0), 0)
        };
        return res.send({
            result: true,
            message: "Data retrieved successfully",
            data: { mockTest: submittedTest, qBank: qBankSummary }
        })
    } catch (error) {
        return res.send({
            result: false,
            message: error.message
        })
    }
}
module.exports.ListSubmittedQuestion = async (req, res) => {
    try {
        let { student_id, test_id } = req.body || {}
        if (!student_id || !test_id) {
            return res.send({
                result: false,
                message: "student id and test id are required"
            })
        }
        let checkStudent = await model.CheckStudent(student_id)
        if (checkStudent.length === 0) {
            logger.error('Student not found in db: %s', student_id);
            return res.send({
                result: false,
                message: "Student not found."
            })
        }
        const submittedQuestion = await model.ListSubmittedQuestions(student_id, test_id)
        return res.send({
            result: true,
            message: "Data retrieved successfully",
            data: submittedQuestion
        })
    } catch (error) {
        return res.send({
            result: false,
            message: error.message
        })
    }
}