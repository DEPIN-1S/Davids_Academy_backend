const model = require('../../model/student/questions')
const logger = require('../../utils/logger');
module.exports.ListQuestionsFromQBank = async (req, res) => {
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
        const questionData = await model.ListQuestionIdsNotSubmitted(courseId, user_id)
        const questions = questionData.map(item => item.id)
        logger.info("Question ids listed successfully", user_id, courseId)
        return res.send({
            result: true,
            message: "Question ids listed successfully",
            data: questions
        })
    } catch (error) {
        return res.send({
            result: false,
            message: error.message
        })
    }
}
module.exports.GetQuestionDataFromQBank = async (req, res) => {
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
        const { questionId } = req.body || {}
        if (!questionId) {
            return res.send({
                result: false,
                message: "Question id is required"
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
        if (questionData[0]?.question_type?.toLowerCase() === "mcq") {
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
        if (questionData[0]?.question_type?.toLowerCase() === "dropdown") {
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
                tabsInfo,
                dropdowns: dropdownTexts,
                additionalInfo,
                explanation
            };
        }

        if (questionData[0]?.question_type?.toLowerCase() === "sorting") {
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

        if (questionData[0]?.question_type?.toLowerCase() === "sentence highlight") {
            const highlightOptions = await model.GetHighlightOptions(questionId);
            const highlightAnswers = await model.GetHighlightAnswers(questionId);
            const tabsInfo = await model.Gettabs(questionId);
            const additionalInfo = await model.getAdditionalInfo(questionId);
            const explanation = await model.Getexplantion(questionId);
            fullQuestionData = {
                ...questionData[0],
                highlightOptions,
                highlightAnswers,
                tabsInfo,
                additionalInfo,
                explanation
            };
        }

        if (questionData[0]?.question_type?.toLowerCase() === "fill in the blanks") {
            const filltheblankstext = await model.GetFilltheblankstext(questionId);
            const filltheblanksoptions = await model.GetFilltheblankstextOptions(questionId);
            const filltheblanksHeading = await model.GetFilltheblanksHeading(questionId);
            let heading = filltheblanksHeading[0].headings;
            const additionalInfo = await model.getAdditionalInfo(questionId);
            const explanation = await model.Getexplantion(questionId);
            fullQuestionData = {
                ...questionData[0],
                FTBquestion_content: filltheblankstext,
                FTBoptions: { heading: heading, options: filltheblanksoptions },
                additionalInfo,
                explanation
            };
        };

        if (questionData[0]?.question_type?.toLowerCase() === "drag drop") {
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
                tabsInfo,
                branches: headings,
                additionalInfo,
                explanation
            };
        };
        if (questionData[0]?.question_type?.toLowerCase() === "multiple radio") {
            const clientfindings = await model.GetMultipleRadioQuestionsClientfindings(questionId);
            const radioOption = await model.GetMultipleRadioQuestionsRadioOption(questionId);
            const tabsInfo = await model.Gettabs(questionId);
            const additionalInfo = await model.getAdditionalInfo(questionId);
            const explanation = await model.Getexplantion(questionId);
            fullQuestionData = {
                ...questionData[0],
                questionContent: clientfindings,
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
module.exports.GetSampleQuestionData = async (req, res) => {
    try {
        const { questionId } = req.body || {}
        if (!questionId) {
            return res.send({
                result: false,
                message: "Question id is required"
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
        if (questionData[0]?.question_type?.toLowerCase() === "mcq") {
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
        if (questionData[0]?.question_type?.toLowerCase() === "dropdown") {
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
                tabsInfo,
                dropdowns: dropdownTexts,
                additionalInfo,
                explanation
            };
        }

        if (questionData[0]?.question_type?.toLowerCase() === "sorting") {
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

        if (questionData[0]?.question_type?.toLowerCase() === "sentence highlight") {
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

        if (questionData[0]?.question_type?.toLowerCase() === "fill in the blanks") {
            const filltheblankstext = await model.GetFilltheblankstext(questionId);
            const filltheblanksoptions = await model.GetFilltheblankstextOptions(questionId);
            const filltheblanksHeading = await model.GetFilltheblanksHeading(questionId);
            let heading = filltheblanksHeading[0].headings;
            const additionalInfo = await model.getAdditionalInfo(questionId);
            const explanation = await model.Getexplantion(questionId);
            fullQuestionData = {
                ...questionData[0],
                FTBquestion_content: filltheblankstext,
                FTBoptions: { heading: heading, options: filltheblanksoptions },
                additionalInfo,
                explanation
            };
        };

        if (questionData[0]?.question_type?.toLowerCase() === "drag drop") {
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
                tabsInfo,
                branches: headings,
                additionalInfo,
                explanation
            };
        };
        if (questionData[0]?.question_type?.toLowerCase() === "multiple radio") {
            const clientfindings = await model.GetMultipleRadioQuestionsClientfindings(questionId);
            const radioOption = await model.GetMultipleRadioQuestionsRadioOption(questionId);
            const tabsInfo = await model.Gettabs(questionId);
            const additionalInfo = await model.getAdditionalInfo(questionId);
            const explanation = await model.Getexplantion(questionId);
            fullQuestionData = {
                ...questionData[0],
                questionContent: clientfindings,
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