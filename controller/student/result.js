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


module.exports.GetSubmittedResponse = async (req, res) => {
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
        const { questionId, test_id } = req.body
        if (!test_id) {
            return res.send({
                result: false,
                message: "Test id is required"
            })
        }
        const checkTest = await model.CheckTest(test_id)
        if (!checkTest || checkTest.length === 0) {
            logger.error("Test not found - ", test_id)
            return res.send({
                result: false,
                message: "Test not found."
            })
        }
        let result = null
        if (questionId) {
            const checkQuestion = await model.CheckQuestion(questionId);
            if (checkQuestion.length === 0) {
                logger.error("Question not found. Invalid question id", questionId);
                return res.send({ result: false, message: "Question not found. Invalid question id" });
            }

            const questionData = await model.GetQuestionData(questionId);
            const qTypeRaw = questionData?.[0]?.question_type;
            const qType = typeof qTypeRaw === 'string' ? qTypeRaw.toLowerCase().trim() : null;

            if (!qType) {
                logger.error("Question type missing for question:", questionId);
                return res.send({ result: false, message: "Question type missing." });
            }

            // Map normalized question types to model function names
            const submittedAnswerFnMap = {
                mcq: "GetMockTestMCQSubmittedAnswer",
                dropdown: "GetMockTestDropdownSubmittedAnswer",
                sorting: "GetMockTestSortSubmittedAnswer",
                "sentence highlight": "GetMockTestSentenceHighlightSubmittedAnswer",
                "drag drop": "GetMockTestDragDropSubmittedAnswer",
                "multiple radio": "GetMockTestMultipleRadioSubmittedAnswer",
                "table dropdown": "GetMockTestTableDropdownSubmittedAnswer",
                "table highlight": "GetMockTestTableHighlightSubmittedAnswer",
                multidropdown: "GetMockTestMultiDropDownSubmittedAnswer",
                // add more mappings here as needed
            };

            const fnName = submittedAnswerFnMap[qType];

            if (!fnName || typeof model[fnName] !== "function") {
                logger.error("No submitted-answer handler for question type:", qType, "question_id:", questionId);
                return res.send({ result: false, message: `Unsupported question type: ${qType}` });
            }

            // Call the selected model function
            const submittedData = await model[fnName](user_id, test_id, questionId);
            if (!Array.isArray(submittedData) || submittedData.length === 0) {
                logger.error("Submitted result not found", { user_id, test_id, questionId, qType });
                return res.send({ result: false, message: "Submitted result not found." });
            }

            result = submittedData;
        }
        const checkTestSubmitted = await model.CheckTestSubmitted(test_id, user_id)
        // if(!checkTestSubmitted||checkTestSubmitted.length===0){
        //     return res.send({
        //         result: false,
        //         message: "Submitted test not found."
        //     })
        // }
        return res.send({
            result: true,
            message: "Data retrieved successfully",
            answers: result,
            test_result: checkTestSubmitted
        })
    } catch (error) {
        return res.send({
            result: false,
            message: error.message
        })
    }
}

module.exports.GetQbankSubmittedResponse = async (req, res) => {
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
        const { questionId } = req.body
        if (!questionId) {
            return res.send({
                result: false,
                message: "Question id is required"
            })
        }
        const checkQuestion = await model.CheckQuestion(questionId);
        if (checkQuestion.length === 0) {
            logger.error("Question not found. Invalid question id", questionId);
            return res.send({ result: false, message: "Question not found. Invalid question id" });
        }

        const questionData = await model.GetQuestionData(questionId);
        const qTypeRaw = questionData?.[0]?.question_type;
        const qType = typeof qTypeRaw === 'string' ? qTypeRaw.toLowerCase().trim() : null;
        console.log("questionData : ", questionData)
        if (!qType) {
            logger.error("Question type missing for question:", questionId);
            return res.send({ result: false, message: "Question type missing." });
        }

        // Map normalized question types to model function names
        const submittedAnswerFnMap = {
            mcq: "GetQbankMCQSubmittedAnswer",
            dropdown: "GetQbankDropdownSubmittedAnswer",
            sorting: "GetQbankSortSubmittedAnswer",
            "sentence highlight": "GetQbankSentenceHighlightSubmittedAnswer",
            "drag drop": "GetQbankDragDropSubmittedAnswer",
            "multiple radio": "GetQbankMultipleRadioSubmittedAnswer",
            "table dropdown": "GetQbankTableDropdownSubmittedAnswer",
            "table highlight": "GetQbankTableHighlightSubmittedAnswer",
            multidropdown: "GetQbankMultiDropDownSubmittedAnswer",
            // add more mappings here as needed
        };

        const fnName = submittedAnswerFnMap[qType];

        if (!fnName || typeof model[fnName] !== "function") {
            logger.error("No submitted-answer handler for question type:", qType, "question_id:", questionId);
            return res.send({ result: false, message: `Unsupported question type: ${qType}` });
        }

        // Call the selected model function
        const submittedData = await model[fnName](user_id, questionId);
        if (!Array.isArray(submittedData) || submittedData.length === 0) {
            logger.error("Submitted result not found", { user_id, questionId, qType });
            return res.send({ result: false, message: "Submitted result not found." });
        }
        return res.send({
            result: true,
            message: "Data retrieved successfully",
            answers: submittedData
        })
    } catch (error) {
        return res.send({
            result: false,
            message: error.message
        })
    }
}