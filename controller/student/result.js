const model = require('../../model/student/result')
const logger = require('../../utils/logger');



module.exports.ListSubmittedTest = async (req, res) => {
    try {
        const { user_id } = req?.user
        const studentData = await model.GetStudentData(user_id)
        if (studentData.length == 0) {
            logger.error("Student not found.Please login again", user_id)
            return res.send({
                result: false,
                message: "Student not found.Please login again"
            })
        }
        const tests = await model.ListSubmittedTests(user_id)
        return res.send({
            result: true,
            message: "Data retrieved successfully",
            data: tests
        })
    } catch (error) {
        return res.send({
            result: false,
            message: error.message
        })
    }
}


module.exports.ListTestResult = async (req, res) => {
    try {
        const { user_id } = req?.user
        const studentData = await model.GetStudentData(user_id)
        if (studentData.length == 0) {
            logger.error("Student not found.Please login again", user_id)
            return res.send({
                result: false,
                message: "Student not found.Please login again"
            })
        }
        const { test_id } = req.body || {}
        if (!test_id) {
            return res.send({
                result: false,
                message: "Test id is required"
            })
        }
        const testData = await model.GetTestResult(user_id, test_id)
        return res.send({
            result: true,
            message: "Data retrieved successfully",
            data: testData
        })
    } catch (error) {
        return res.send({
            result: false,
            message: error.message
        })
    }
}


module.exports.ListQuestionBankResults = async (req, res) => {
    try {
        const { user_id } = req?.user
        const studentData = await model.GetStudentData(user_id)
        if (studentData.length == 0) {
            logger.error("Student not found.Please login again", user_id)
            return res.send({
                result: false,
                message: "Student not found.Please login again"
            })
        }
        const totalQuestions = await model.GetTotalQuestionsInQBank()
        const results = await model.GetQuestionBankResult(user_id)
        const isCorrect = results.filter(item => item.is_correct == 1);
        return res.send({
            result: true,
            message: "Data retrieved successfully",
            data: {
                total: totalQuestions.length,
                attempted: results.length,
                correct: isCorrect.length,
                details: results
            }
        })
    } catch (error) {
        return res.send({
            result: false,
            message: error.message
        })
    }
}