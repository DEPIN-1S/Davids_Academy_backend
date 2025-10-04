const model = require('../../model/student/tests')
const logger = require('../../utils/logger');
module.exports.ListAllTests = async (req, res) => {
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
        const courseId = studentData[0]?.target_exam
        const tests = await model.ListAllTestsWithStatus(courseId, user_id)
        logger.info("Tests listed successfully with status", user_id)
        return res.send({
            result: true,
            message: "Tests listed successfully",
            data: tests
        })
    } catch (error) {
        return res.send({
            result: false,
            message: error.message
        })
    }
}
module.exports.ListTestQuestions = async (req, res) => {
    try {
        const { user_id } = req?.user
        const { test_id } = req.body
        if (!test_id) {
            logger.warn("Test id is required")
            return res.send({
                result: false,
                message: "Test id is required"
            })
        }
        const studentData = await model.GetStudentData(user_id)
        if (studentData.length == 0) {
            logger.error("Student not found.Please login again", user_id)
            return res.send({
                result: false,
                message: "Student not found.Please login again"
            })
        }
        const courseId = studentData[0]?.target_exam
        const checkTest = await model.CheckTest(test_id, courseId)
        if (checkTest.length === 0) {
            logger.error("Test data not found", test_id, courseId)
            return res.send({
                result: false,
                message: "Test data not found"
            })
        }
        const testQuestions = await model.ListTestQuestions(test_id)
        const questionIds = testQuestions.map(item => item?.questionId)
        logger.info("Test questions listed successfully", test_id)
        return res.send({
            result: true,
            message: "Test questions listed successfully",
            data: questionIds
        })
    } catch (error) {
        return res.send({
            result: false,
            message: error.message
        })
    }
}
module.exports.GetQuestionData = async (req, res) => {
    try {
        const { user_id } = req.user
        const { test_id, questionId } = req.body
        if (!test_id || !questionId) {
            logger.warn("Test id and question id are required")
            return res.send({
                result: false,
                message: "Test id and question id are required"
            })
        }
        const studentData = await model.GetStudentData(user_id)
        if (studentData.length == 0) {
            logger.error("Student not found.Please login again", user_id)
            return res.send({
                result: false,
                message: "Student not found.Please login again"
            })
        }
        const courseId = studentData[0]?.target_exam
        const checkTest = await model.CheckTest(test_id, courseId)
        if (checkTest.length === 0) {
            logger.error("Test data not found", test_id, courseId)
            return res.send({
                result: false,
                message: "Test data not found"
            })
        }
        const checkQuestionInTest = await model.CheckQuestionInTest(test_id, questionId)
        if (checkQuestionInTest.length === 0) {
            logger.error("Question not available in this test", test_id, questionId)
            return res.send({
                result: false,
                message: "Question not available in this test"
            })
        }
        const checkQuestion = await model.CheckQuestion(questionId)
        if (checkQuestion.length === 0) {
            logger.error("Question not found. Invalid question id", questionId)
            return res.send({
                result: false,
                message: "Question not found. Invalid question id"
            })
        }
        const questionData = await model.GetQuestionData(questionId)
        let fullQuestionData = null
        if (questionData[0]?.question_type.toLowerCase() === "mcq") {
            const mcqoptions = await model.Getmcqoption(questionId);
            const mcqAnswers = await model.GetmcqAnswers(questionId);
            const additionalInfo = await model.GetAdditionalInfo(questionId);
            const explanation = await model.Getexplantion(questionId)
            fullQuestionData = {
                ...questionData[0],
                mcqoptions,
                mcqAnswers,
                additionalInfo,
                explanation
            };
        }
        if (questionData[0]?.question_type.toLowerCase() === "dropdown") {
            let dropdownTexts = await model.Getdropdownquestiontext(questionId);
            let dropdownquestiontext = await Promise.all(
                dropdownTexts.map(async (item) => {
                    item.dropdownoption = await model.Getdropdownoption(item.id);
                    return item;
                })
            );
            let tabsInfo = await model.Gettabs(questionId);
            let additionalInfo = await model.getAdditionalInfo(questionId);
            let explanation = await model.Getexplantion(questionId);
            fullQuestionData = {
                ...questionData[0],
                dropdownTexts,
                dropdownquestiontext,
                tabsInfo,
                additionalInfo,
                explanation
            };
        }

        if (questionData[0]?.question_type.toLowerCase() === "sorting") {
            const sortingoptions = await model.Getsortingoption(questionId);
            const additionalInfo = await model.getAdditionalInfo(questionId);
            const explanation = await model.Getexplantion(questionId);
            fullQuestionData = {
                ...questionData[0],
                sortingoptions,
                additionalInfo,
                explanation
            };
        }

        if (questionData[0]?.question_type.toLowerCase() === "sentence highlight") {
            const highlightOptions = await model.GetHighlightOptions(questionId);
            const tabsInfo = await model.Gettabs(questionId);
            const additionalInfo = await model.getAdditionalInfo(questionId);
            const explanation = await model.Getexplantion(questionId);
            fullQuestionData = {
                ...questionData[0],
                highlightOptions,
                tabsInfo,
                additionalInfo,
                explanation
            };
        }

        if (questionData[0]?.question_type.toLowerCase() === "fill in the blanks") {
            const filltheblankstext = await model.GetFilltheblankstext(questionId);
            const filltheblanksoptions = await model.GetFilltheblankstextOptions(questionId);
            const additionalInfo = await model.getAdditionalInfo(questionId);
            const explanation = await model.Getexplantion(questionId);
            fullQuestionData = {
                ...questionData[0],
                filltheblankstext,
                filltheblanksoptions,
                additionalInfo,
                explanation
            };
        };

        if (questionData[0]?.question_type.toLowerCase() === "drag drop") {
            const headings = await model.GetDragDropQuestionsheading(questionId);
            const dropdownquestiontext = await Promise.all(
                headings.map(async (item) => {
                    item.dragdropoption = await model.GetDragDropoption(item.id);
                    return item;
                })
            );
            const tabsInfo = await model.Gettabs(questionId);
            const additionalInfo = await model.getAdditionalInfo(questionId);
            const explanation = await model.Getexplantion(questionId);
            fullQuestionData = {
                ...questionData[0],
                headings,
                dropdownquestiontext,
                tabsInfo,
                additionalInfo,
                explanation
            };
        };
        if (questionData[0]?.question_type.toLowerCase() === "multiple radio") {
            const clientfindings = await model.GetMultipleRadioQuestionsClientfindings(questionId);
            const radioOption = await model.GetMultipleRadioQuestionsRadioOption(questionId);
            const tabsInfo = await model.Gettabs(questionId);
            const additionalInfo = await model.getAdditionalInfo(questionId);
            const explanation = await model.Getexplantion(questionId);
            fullQuestionData = {
                ...questionData[0],
                clientfindings,
                radioOption,
                tabsInfo,
                additionalInfo,
                explanation
            };
        }

        return res.send({
            result: true,
            message: "Question data retrived successfuly",
            data: fullQuestionData
        })
    } catch (error) {
        return res.send({
            result: false,
            message: error.message
        })
    }
}
// submit question method
module.exports.SubmitQuestions = async (req, res) => {
    try {
        const { user_id } = req?.user
        const { test_id, questionId, is_correct, mark } = req.body
        if (!test_id || !questionId || !is_correct || !mark) {
            logger.warn("Test id, question id, is correct and mark are required")
            return res.send({
                result: false,
                message: "Test id, question id, is correct and mark are required"
            })
        }
        const studentData = await model.GetStudentData(user_id)
        if (studentData.length == 0) {
            logger.error("Student not found.Please login again", user_id)
            return res.send({
                result: false,
                message: "Student not found.Please login again"
            })
        }
        const courseId = studentData[0]?.target_exam
        const checkTest = await model.CheckTest(test_id, courseId)
        if (checkTest.length === 0) {
            logger.error("Test data not found", test_id, courseId)
            return res.send({
                result: false,
                message: "Test data not found"
            })
        }
        const checkQuestionInTest = await model.CheckQuestionInTest(test_id, questionId)
        if (checkQuestionInTest.length === 0) {
            logger.error("Question not available in this test", test_id, questionId)
            return res.send({
                result: false,
                message: "Question not available in this test"
            })
        }
        const checkQuestion = await model.CheckQuestion(questionId)
        if (checkQuestion.length === 0) {
            logger.error("Question not found. Invalid question id", questionId)
            return res.send({
                result: false,
                message: "Question not found. Invalid question id"
            })
        }
        // Validation for already submitted question  **** UNCOMMENT TO USE VALIDATION ****
        // const checkAlreadySubmitted = await model.CheckQuestionAlreadySubmitted(user_id, question_id, test_id)
        // if (checkAlreadySubmitted.length > 0) {
        // logger.error("This question already submitted for this test", questionId)
        //     return res.send({
        //         result: false,
        //         message: "This question already submitted for this test"
        //     })
        // }
        const submitData = await model.SubmitQuestionData(user_id, questionId, test_id, is_correct, mark)
        if (submitData.affectedRows > 0) {
            return res.send({
                result: true,
                message: "Question data submitted successfully"
            })
        } else {
            return res.send({
                result: false,
                message: "Failed to submit data"
            })
        }
    } catch (error) {
        return res.send({
            result: false,
            message: error.message
        })
    }
}
module.exports.SubmitTest = async (req, res) => {
    try {
        const { user_id } = req?.user
        const { test_id } = req.body
        if (!test_id) {
            logger.warn("Test id is required")
            return res.send({
                result: false,
                message: "Test id is required"
            })
        }
        const studentData = await model.GetStudentData(user_id)
        if (studentData.length == 0) {
            logger.error("Student not found.Please login again", user_id)
            return res.send({
                result: false,
                message: "Student not found.Please login again"
            })
        }
        const courseId = studentData[0]?.target_exam
        const checkTest = await model.CheckTest(test_id, courseId)
        if (checkTest.length === 0) {
            logger.error("Test data not found", test_id, courseId)
            return res.send({
                result: false,
                message: "Test data not found"
            })
        }
        // Check if test already submitted
        const checkAlreadySubmitted = await model.CheckTestAlreadySubmitted(user_id, test_id)
        if (checkAlreadySubmitted.length > 0) {
            if (checkAlreadySubmitted[0].is_submitted === 1) {
                logger.error("Test already submitted", test_id, courseId)
                return res.send({
                    result: false,
                    message: "Test already submitted"
                })
            }
            // If pending, update existing record
            const submittedAnswers = await model.GetSubmittedAnswer(user_id, test_id)
            const totalMark = submittedAnswers.reduce((sum, item) => sum + item.sq_mark, 0)
            await model.SubmitTestData(user_id, test_id, totalMark)
        } else {
            // New submission
            const submittedAnswers = await model.GetSubmittedAnswer(user_id, test_id)
            const totalMark = submittedAnswers.reduce((sum, item) => sum + item.sq_mark, 0)
            const submitTest = await model.SubmitTestData(user_id, test_id, totalMark)
            if (submitTest.affectedRows === 0) {
                return res.send({
                    result: false,
                    message: "Failed to submit test"
                })
            }
        }
        // Update status to completed/submitted (for both new and existing)
        const updateStatus = await model.UpdateTestSubmissionStatus(user_id, test_id)
        if (updateStatus.affectedRows > 0) {
            return res.send({
                result: true,
                message: "Test submitted successfully"
            })
        } else {
            return res.send({
                result: false,
                message: "Failed to update test status"
            })
        }
    } catch (error) {
        return res.send({
            result: false,
            message: error.message
        })
    }
}