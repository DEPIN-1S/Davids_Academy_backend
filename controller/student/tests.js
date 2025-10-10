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
            const highlightAnswers = await model.GetHighlightAnswers(questionId);
            const tabsInfo = await model.Gettabs(questionId);
            const additionalInfo = await model.getAdditionalInfo(questionId);
            const explanation = await model.Getexplantion(questionId);
            fullQuestionData = {
                ...questionData[0],
                tabsInfo,
                highlightOptions,
                highlightAnswers,
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
        // Table Dropdown
        if (questionData[0]?.question_type?.toLowerCase() === 'table dropdown') {
            const tabsInfo = await model.Gettabs(questionId);
            const headers = await model.GetTableDropdownHeaders(questionId);
            const rows = await model.GetTableDropdownRows(questionId); // fields
            // attach options to each row
            for (const r of rows) {
                r.dropdownOptions = await model.GetTableDropdownOptions(questionId, r.id);
            }
            const answers = await model.GetTableDropdownAnswer(questionId);
            const additionalInfo = await model.getAdditionalInfo(questionId);
            const explanation = await model.Getexplantion(questionId);

            fullQuestionData = {
                ...questionData[0],
                tabsInfo,
                tableHeaders: headers?.[0] ? { leftHeader: headers[0].left_header, rightHeader: headers[0].right_header } : null,
                tableDropdownFields: rows.map(r => ({ id: r.id, fieldLabel: r.field_label, dropdownOptions: r.dropdownOptions.map(o => o.option_value) })),
                tableDropdownAnswers: answers.map(a => ({ rowLabel: a.row_label, answer: a.answer })),
                additionalInfo,
                explanation
            };
        }

        // Table Highlight
        if (questionData[0]?.question_type?.toLowerCase() === 'table highlight') {
            const tabsInfo = await model.Gettabs(questionId);
            const headers = await model.GetTableDropdownHeaders(questionId);
            const rows = await model.GetTableHighlightRows(questionId); // left/right text rows
            const mcqAnswers = await model.GetmcqAnswers(questionId); // array of objects
            // Extract only the answer values as an array
            const answer = Array.isArray(mcqAnswers)
                ? mcqAnswers.map(obj => obj.mcqAnswer)
                : [];
            const additionalInfo = await model.getAdditionalInfo(questionId);
            const explanation = await model.Getexplantion(questionId);

            fullQuestionData = {
                ...questionData[0],
                tabsInfo,
                tableHeaders: headers?.[0] ? { leftHeader: headers[0].left_header, rightHeader: headers[0].right_header } : null,
                tableFields: rows.map(r => ({ id: r.id, leftColumn: r.left_column, rightColumn: r.right_column, sortOrder: r.sort_order })),
                answer, // array of strings if you store them
                additionalInfo,
                explanation
            };
        }
        // Multi Dropdown
        if (questionData[0]?.question_type?.toLowerCase() === 'multidropdown') {
            const tabsInfo = await model.Gettabs(questionId); // [memory:2]
            const headers = await model.GetMultiDropdownHeaders(questionId); // [memory:2]
            const rows = await model.GetMultiDropdownRows(questionId); // [memory:2]

            for (const r of rows) {
                const cells = await model.GetMultiDropdownCells(r.id, r.id, questionId); // [memory:2]

                // Group by col_index, skipping any col_index === 0
                const grouped = cells.reduce((acc, c) => {
                    if (!c) return acc; // [memory:2]

                    // Skip unwanted col_index 0 entirely
                    if (c.col_index === 0) {
                        logger.warn('Skipped cell with col_index 0 in GetQuestionDataFromQBank', { cell: c, questionId, rowId: r.id }); // [memory:2]
                        return acc; // [memory:2]
                    }

                    if (!acc[c.col_index]) acc[c.col_index] = { colIndex: c.col_index, options: [], answer: null }; // [memory:2]
                    if (c.option_value != null) acc[c.col_index].options.push(c.option_value); // [memory:2]
                    if (c.answer_value != null) acc[c.col_index].answer = c.answer_value; // [memory:2]
                    return acc; // [memory:2]
                }, {}); // [memory:2]

                // Materialize sorted columns (no colIndex 0 present)
                r.columns = Object.values(grouped).sort((a, b) => a.colIndex - b.colIndex); // [memory:2]
            }

            const additionalInfo = await model.getAdditionalInfo(questionId); // [memory:2]
            const explanation = await model.Getexplantion(questionId); // [memory:2]

            fullQuestionData = {
                ...questionData[0],
                tabsInfo,
                headers: headers.map(h => h.header_text), // [memory:2]
                // Also ensure any pre-existing colIndex 0 in rows is filtered out defensively
                rows: rows.map(r => ({
                    rowLabel: r.row_label,
                    columns: (r.columns || []).filter(col => col && col.colIndex !== 0).sort((a, b) => a.colIndex - b.colIndex),
                })), // [memory:2]
                additionalInfo,
                explanation,
            }; // [memory:2]
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
        const studentData = await model.GetStudentData(user_id)
        if (studentData.length == 0) {
            logger.error("Student not found.Please login again", user_id)
            return res.send({
                result: false,
                message: "Student not found.Please login again"
            })
        }
        const courseId = studentData[0]?.target_exam
        // If a test_id is provided (non-null, non-empty), validate the test and question membership
        if (test_id !== null && test_id !== '') {
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