const model = require('../../model/admin/student')
const logger = require('../../utils/logger');
const { HashPassword } = require('../../utils/bcrypt')


module.exports.CreateStudent = async (req, res) => {
    try {
        const { fullname, email, phone, password, target_exam, class_type } = req.body || {}
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
        const hashedPassword = HashPassword(password)
        const insertStudent = await model.InsertStudent(fullname, trimmedEmail, phone, hashedPassword, target_exam, class_type)
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

module.exports.EditStudent = async (req, res) => {
    try {
        const { student_id, fullname, email, phone, target_exam, class_type } = req.body || {}
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
        let condition = ``
        if (fullname) {
            if (condition === ``) {
                condition += ` set firstname = '${fullname}'`
            } else {
                condition += ` and set firstname = '${fullname}'`
            }
        }

        if (email) {
            const trimmedEmail = email.toLowerCase().trim()
            const cond = ` WHERE email = '${trimmedEmail}' and id <> '${student_id}'`
            let checkEmail = await model.CheckEmail(cond)
            if (checkEmail.length > 0) {
                logger.error('Email already registered in db: %s', cond);
                return res.send({
                    result: false,
                    message: "Email already registered."
                })
            }
            if (condition === ``) {
                condition += ` set email = '${trimmedEmail}'`
            } else {
                condition += ` and set email = '${trimmedEmail}'`
            }
        }

        if (phone) {
            if (condition === ``) {
                condition += ` set mobile = '${phone}'`
            } else {
                condition += ` and set mobile = '${phone}'`
            }
        }

        if (target_exam) {
            if (condition === ``) {
                condition += ` set target_exam = '${target_exam}'`
            } else {
                condition += ` and set target_exam = '${target_exam}'`
            }
        }

        if (class_type) {
            if (condition === ``) {
                condition += ` set class_type = '${class_type}'`
            } else {
                condition += ` and set class_type = '${class_type}'`
            }
        }

        const updateStudent = await model.EditStudent(condition)
        if (updateStudent.affectedRows > 0) {
            logger.info(`Student updated successfully: ${email}`);
            return res.send({
                result: true,
                message: "Student updated successfully"
            })
        } else {
            logger.error(`Failed to update student: ${email}`);
            return res.send({
                result: false,
                message: "Failed to update student"
            })
        }
    } catch (error) {
        return res.send({
            result: false,
            message: error.message
        })
    }
}


module.exports.ListAllStudents = async (req, res) => {
    try {
        const { searchQuery, type, page = 1, limit = 10 } = req.body || {};

        if (!type || !["all", "active", "inactive"].includes(type)) {
            return res.send({
                result: false,
                message: "Type is required and must be one of [ 'all' , 'active' , 'inactive' ]"
            });
        }

        let conditions = [];
        let params = [];

        // Search condition
        if (searchQuery) {
            conditions.push(`(email LIKE ? OR id LIKE ? OR mobile LIKE ?)`);
            const term = `%${searchQuery}%`;
            params.push(term, term, term);
        }

        // Status condition
        if (type !== "all") {
            conditions.push(`status = ?`);
            params.push(type); // either "active" or "inactive"
        }
        conditions.push(`role = ?`);
        params.push("student");
        // Pagination calculation
        const offset = (page - 1) * limit;
        params.push(parseInt(limit), parseInt(offset));

        let whereClause = "";
        if (conditions.length > 0) {
            whereClause = "WHERE " + conditions.join(" AND ");
        }

        const studentList = await model.ListAllStudents(whereClause, params);
        logger.info(`Students listed successfully: ${whereClause, params}`);
        return res.send({
            result: true,
            message: "Students listed successfully",
            data: studentList
        })

    } catch (error) {
        return res.send({
            result: false,
            message: error.message
        })
    }
}


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