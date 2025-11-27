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
            let tabsInfo = await model.Gettabs(questionId);
            const mcqAnswers = await model.GetmcqAnswers(questionId);
            const additionalInfo = await model.GetAdditionalInfo(questionId);
            const explanation = await model.Getexplantion(questionId)
            fullQuestionData = {
                ...questionData[0],
                tabsInfo,
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
            let tabsInfo = await model.Gettabs(questionId);
            fullQuestionData = {
                ...questionData[0],
                tabsInfo,
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


// controller/questions.js
module.exports.submitQuestionResponse = async (req, res) => {
    logger.info('📥 Received student answer submission');
    try {
        const student_id = req?.user?.user_id
        let {
            questionId,
            questionType,
            exam_type,
            test_id,
        } = req.body;

        if (!questionId || !questionType || !["Mock Test", "q-bank"].includes(exam_type)) {
            return res.status(400).json({
                result: false,
                message: 'questionId, questionType and exam type are required and exam type should be mock test / qbank'
            });
        }

        exam_type = exam_type?.toLowerCase()?.trim();
        questionType = questionType?.toLowerCase()?.trim();

        // Common meta that you might want to store with every answer
        const baseMeta = {
            userId: student_id,
            testId: test_id,
            questionId: questionId
        };
        /* ============== MCQ ============== */
        if (questionType === 'mcq') {
            // expected: selectedOptions = ["A", "C"] or ["option_id_1", "option_id_2"]
            let { selectedOptions } = req.body;
            const parsedSelected = typeof selectedOptions === 'string'
                ? JSON.parse(selectedOptions)
                : (selectedOptions || []);

            // Example model call – implement this in your model:
            // Save one row per option or one row per question (answer as JSON).
            for (const option of parsedSelected) {
                if (exam_type === "mock test") {
                    await model.insertStudentMockTestMcqResponse({
                        ...baseMeta,
                        answer: option
                    });
                } else {
                    await model.insertStudentQbankMcqResponse({
                        ...baseMeta,
                        answer: option
                    })
                }
            }

            return res.status(201).json({
                result: true,
                message: 'MCQ answer saved successfully',
                data: {
                    ...baseMeta,
                    selectedOptions: parsedSelected
                }
            });
        }

        /* ============== DROPDOWN ============== */
        if (questionType === 'dropdown') {
            /**
             * expected request:
             * answers: JSON string/array like:
             * [
             *   { dropdownField: "Na+", selectedValue: "135–145 mEq/L" },
             *   { dropdownField: "K+", selectedValue: "3.5–5.0 mEq/L" }
             * ]
             */
            let { answers } = req.body;
            const parsedAnswers = typeof answers === 'string'
                ? JSON.parse(answers)
                : (answers || []);

            for (const ans of parsedAnswers) {
                if (exam_type === "mock test") {
                    await model.insertStudentMockTestDropdownAnswer({
                        ...baseMeta,
                        dropdownField: ans.dropdownField,
                        answer: ans.selectedValue
                    });
                } else {
                    await model.insertStudentQbankDropdownAnswer({
                        ...baseMeta,
                        dropdownField: ans.dropdownField,
                        answer: ans.selectedValue
                    })
                }
            }

            return res.status(201).json({
                result: true,
                message: 'Dropdown answer saved successfully',
                data: {
                    ...baseMeta,
                    answers: parsedAnswers
                }
            });
        }

        /* ============== SORTING ============== */
        if (questionType === 'sorting') {
            /**
             * expected:
             * sortItems: [
             *   { sortItem: "Step 1", order: 2 },
             *   { sortItem: "Step 2", order: 1 },
             * ]
             */
            let { sortItems } = req.body;
            const parsedSortItems = typeof sortItems === 'string'
                ? JSON.parse(sortItems)
                : (sortItems || []);

            for (const item of parsedSortItems) {
                if (exam_type === "mock test") {
                    await model.insertStudentMockTestSortingAnswer({
                        ...baseMeta,
                        sortItem: item.sortItem,
                        sortOrder: item.order
                    });
                } else {
                    await model.insertStudentQbankSortingAnswer({
                        ...baseMeta,
                        sortItem: item.sortItem,
                        sortOrder: item.order
                    })
                }
            }

            return res.status(201).json({
                result: true,
                message: 'Sorting answer saved successfully',
                data: {
                    ...baseMeta,
                    sortItems: parsedSortItems
                }
            });
        }

        /* ============== SENTENCE HIGHLIGHT ============== */
        if (questionType === 'sentence highlight') {
            /**
             * expected:
             * answers: ["sentence_id_1", "sentence_id_3"]
             * OR text itself – depends on how you render options.
             */
            let { answers } = req.body;
            const parsedAnswers = typeof answers === 'string'
                ? JSON.parse(answers)
                : (answers || []);

            for (const ans of parsedAnswers) {
                if (exam_type === "mock test") {
                    await model.insertStudentMockTestSentenceHighlightAnswer({
                        ...baseMeta,
                        answer: ans
                    });
                } else {
                    await model.insertStudentQbankSentenceHighlightAnswer({
                        ...baseMeta,
                        answer: ans
                    })
                }
            }

            return res.status(201).json({
                result: true,
                message: 'Sentence Highlight answer saved successfully',
                data: {
                    ...baseMeta,
                    answers: parsedAnswers
                }
            });
        }

        /* ============== FILL IN THE BLANKS ============== */
        if (questionType === 'fill in the blanks') {
            /**
             * expected:
             * blanks: [
             *   { blank_index: 1, answer: "heart" },
             *   { blank_index: 2, answer: "lungs" }
             * ]
             */
            let { blanks } = req.body;
            const parsedBlanks = typeof blanks === 'string'
                ? JSON.parse(blanks)
                : (blanks || []);

            for (const b of parsedBlanks) {
                await model.insertStudentFillBlankAnswer({
                    ...baseMeta,
                    blank_index: b.blank_index,
                    answer: b.answer
                });
            }

            return res.status(201).json({
                result: true,
                message: 'Fill in the Blanks answer saved successfully',
                data: {
                    ...baseMeta,
                    blanks: parsedBlanks
                }
            });
        }

        /* ============== DRAG DROP ============== */
        if (questionType === 'drag drop') {
            /**
             * expected:
             * drag_and_drop_answer: [
             *   { option_heading: "Vitamin", droppedValue: "Vitamin D" },
             *   { option_heading: "Mineral", droppedValue: "Calcium" }
             * ]
             */
            let { drag_and_drop_answer } = req.body;
            const parsed = typeof drag_and_drop_answer === 'string'
                ? JSON.parse(drag_and_drop_answer)
                : (drag_and_drop_answer || []);

            for (const item of parsed) {
                if (exam_type === "mock test") {
                    await model.insertStudentMockTestDragDropAnswer({
                        ...baseMeta,
                        heading: item.option_heading,
                        answer: item.droppedValue
                    });
                } else {
                    await model.insertStudentQbankDragDropAnswer({
                        ...baseMeta,
                        heading: item.option_heading,
                        answer: item.droppedValue
                    })
                }
            }
            return res.status(201).json({
                result: true,
                message: 'Drag & Drop answer saved successfully',
                data: {
                    ...baseMeta,
                    drag_and_drop_answer: parsed
                }
            });
        }

        /* ============== MULTIPLE RADIO ============== */
        if (questionType === 'multiple radio') {
            /**
             * expected:
             * question_content_answers: [
             *   { question_text: "Client A", selected: "Option 2" },
             *   { question_text: "Client B", selected: "Option 1" }
             * ]
             */
            let { question_content_answers } = req.body;
            const parsedAns = typeof question_content_answers === 'string'
                ? JSON.parse(question_content_answers)
                : (question_content_answers || []);

            for (const item of parsedAns) {
                if (exam_type === "mock test") {
                    await model.insertStudentMockTestMultipleRadioAnswer({
                        ...baseMeta,
                        clientfindings: item.question_text,
                        answer: item.selected
                    });
                } else {
                    await model.insertStudentQbankMultipleRadioAnswer({
                        ...baseMeta,
                        clientfindings: item.question_text,
                        answer: item.selected
                    })
                }
            }

            return res.status(201).json({
                result: true,
                message: 'Multiple Radio answer saved successfully',
                data: {
                    ...baseMeta,
                    question_content_answers: parsedAns
                }
            });
        }

        /* ============== TABLE DROPDOWN ============== */
        if (questionType === 'table dropdown') {
            /**
             * expected:
             * tableDropdownAnswers: [
             *   { rowLabel: "Client A", answer: "Option 1" },
             *   { rowLabel: "Client B", answer: "Option 3" }
             * ]
             */
            let { tableDropdownAnswers } = req.body;
            const parsed = typeof tableDropdownAnswers === 'string'
                ? JSON.parse(tableDropdownAnswers)
                : (tableDropdownAnswers || []);

            for (const ans of parsed) {
                if (exam_type === "mock test") {
                    await model.insertStudentMockTestTableDropdownAnswer({
                        ...baseMeta,
                        rowlabel: ans.rowLabel,
                        answer: ans.answer
                    });
                } else {
                    await model.insertStudentQbankTableDropdownAnswer({
                        ...baseMeta,
                        rowlabel: ans.rowLabel,
                        answer: ans.answer
                    })
                }
            }

            return res.status(201).json({
                result: true,
                message: 'Table Dropdown answer saved successfully',
                data: {
                    ...baseMeta,
                    tableDropdownAnswers: parsed
                }
            });
        }

        /* ============== TABLE HIGHLIGHT ============== */
        if (questionType === 'table highlight') {
            /**
             * expected:
             * answers: [
             *   { leftColumn: "sample", rightColumn: "answer" },
             *   { leftColumn: "sample2", rightColumn: "answer" }
             * ]
             */
            let { answers } = req.body;
            const parsed = typeof answers === 'string'
                ? JSON.parse(answers)
                : (answers || []);

            for (const ans of parsed) {
                if (exam_type === "mock test") {
                    await model.insertStudentTableMockTestHighlightAnswer({
                        ...baseMeta,
                        leftColumn: ans.leftColumn,
                        rightColumn: ans.rightColumn
                    });
                } else {
                    await model.insertStudentTableQbankHighlightAnswer({
                        ...baseMeta,
                        leftColumn: ans.leftColumn,
                        rightColumn: ans.rightColumn
                    })
                }
            }

            return res.status(201).json({
                result: true,
                message: 'Table Highlight answer saved successfully',
                data: {
                    ...baseMeta,
                    answers: parsed
                }
            });
        }

        /* ============== MULTIDROPDOWN ============== */
        if (questionType === 'multidropdown') {
            /**
             * expected:
             * rowsAnswer: [
             *   {
             *     rowLabel: "Client A",
             *     columns: [
             *       { colIndex: 0, selected: "Option 1" },
             *       { colIndex: 1, selected: "Option 3" }
             *     ]
             *   },
             *   ...
             * ]
             */
            let { rowsAnswer } = req.body;
            const parsedRows = typeof rowsAnswer === 'string'
                ? JSON.parse(rowsAnswer)
                : (rowsAnswer || []);

            for (const r of parsedRows) {
                if (!Array.isArray(r.columns)) continue;
                for (const c of r.columns) {
                    if (exam_type === "mock test") {
                        await model.insertStudentMockTestMultiDropdownAnswer({
                            ...baseMeta,
                            rowId: r.rowLabel,
                            colIndex: Number(c.colIndex),
                            answer: c.selected
                        });
                    } else {
                        await model.insertStudentQbankMultiDropdownAnswer({
                            ...baseMeta,
                            rowId: r.rowLabel,
                            colIndex: Number(c.colIndex),
                            answer: c.selected
                        })
                    }
                }
            }

            return res.status(201).json({
                result: true,
                message: 'Multi Dropdown answer saved successfully',
                data: {
                    ...baseMeta,
                    rowsAnswer: parsedRows
                }
            });
        }

        // Unknown question type
        return res.status(400).json({
            result: false,
            message: `Unsupported questionType: ${questionType}`
        });
    } catch (error) {
        logger.error(`❌ Failed to save student answer: ${error.message}`, error);
        return res.status(500).json({
            result: false,
            message: 'Internal Server Error',
            error: error.message
        });
    }
};
