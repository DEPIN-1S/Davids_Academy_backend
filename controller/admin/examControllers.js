// src/controller/admin/examController.js

const { validationResult } = require('express-validator');
const model = require('../../model/admin/examModels');
const logger = require('../../utils/logger');  // Your Winston instance
/**
 * POST /api/exam/questionType
 * Body: { questionType: string }
 */
module.exports.createQuestionType = async (req, res) => {
    // 1. Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const msgs = errors.array().map(err => err.msg);
        logger.warn('Validation failed for createQuestionType: %o', msgs);
        return res.status(400).json({
            result: false,
            errors: msgs,
        });
    }
    const { questionType } = req.body;
    logger.info('Attempting to insert questionType: %s', questionType);
    try {
        // 2. Insert into DB
        const result = await model.insertQuestionType(questionType);
        if (result.affectedRows === 0) {
            logger.error('No rows affected inserting questionType: %s', questionType);
            return res.status(500).json({
                result: false,
                message: 'Failed to add questionType in the database',
            });
        }
        logger.info('Successfully inserted questionType: %s', questionType);
        return res.status(200).json({
            result: true,
            message: 'Question type saved successfully',
            data: { questionType: questionType }
        });

    } catch (error) {
        // 3. Log unexpected errors
        logger.error('createQuestionType error: %o', error);
        return res.status(500).json({
            result: false,
            message: error.message || 'Internal Server Error',
        });
    }
};
/**
 * PATCH /api/exam/questionType
 * Body: { id: int,questionType: string }
 */
module.exports.updateQuestionType = async (req, res) => {
    const { id } = req.params;
    const { questionType } = req.body;
    logger.info('Attempting to update questionType by id: %s', id);
    try {
        // 2. Insert into DB
        const result = await model.updateQuestionType(questionType, id);
        if (result.affectedRows === 0) {
            logger.error('No rows affected inserting questionType: %s', questionType);
            return res.status(500).json({
                result: false,
                message: 'Failed to add questionType in the database',
            });
        }
        logger.info('Successfully inserted questionType: %s', questionType);
        return res.status(200).json({
            result: true,
            message: 'Question type updated successfully',
            data: { id: id, questionType: questionType }
        });

    } catch (error) {
        // 3. Log unexpected errors
        logger.error('updateQuestionType error: %o', error);
        return res.status(500).json({
            result: false,
            message: error.message || 'Internal Server Error',
        });
    }
};
/**
 * PATCH /api/exam/questionType
 * Body: { id: int }
 */
module.exports.deleteQuestionType = async (req, res) => {
    const { id } = req.params;
    logger.info('Attempting to delete questionType: %s', id);
    try {
        // 2. Insert into DB
        const result = await model.deleteQuestionType(id);
        if (result.affectedRows === 0) {
            logger.error('No rows affected deleting questionType: %s', id);
            return res.status(500).json({
                result: false,
                message: 'Failed to delete questionType in the database',
            });
        }
        logger.info('Successfully inserted questionType: %s', id);
        return res.status(200).json({
            result: true,
            message: 'Question type deleted successfully',
            data: result
        });

    } catch (error) {
        // 3. Log unexpected errors
        logger.error('deleteQuestionType error: %o', error);
        return res.status(500).json({
            result: false,
            message: error.message || 'Internal Server Error',
        });
    }
};
/**
 * POST /api/exam/question
 * Body: {  }
 */
module.exports.createQuestion = async (req, res) => {
    logger.info('📥 Received request to add new question');
    try {
        // const errors = validationResult(req);
        // if (!errors.isEmpty()) {
        //     logger.warn('⚠️ Validation failed for question submission');
        //     return res.status(400).json({
        //         result: false,
        //         errors: errors.array().map((err) => err.msg),
        //     });
        // }
        const {
            exam_type,
            question_type_id,
            questionType,
            difficulty,
            courseId,
            explanationHeading,
            explanationText,
            info,

        } = req.body;

        console.log("files: ", req.files);

        console.log("(req.files?.infoimage? :", req.files?.infoimage);

        const infoImageFile = req.files?.infoimage[0]?.filename;
        console.log("infoImageFile:", infoImageFile);

        const infoImage = infoImageFile ? `/uploads/infoimages/${infoImageFile}` : null;

        // check for questionType
        if (questionType.toLowerCase().trim() === 'mcq') {
            const { question,
                answer,
                exhibit,
                options,
            } = req.body

            let mcqoptions = typeof options === 'string' ? JSON.parse(options) : options;

            // Insert into tb_mcq
            const mcqResult = await model.insertMcqQuestion({
                question,
                question_type_id,
                courseId,
                answer,
                exam_type,
                difficulty,
                exhibit,
            });
            const questionId = mcqResult.insertId;
            logger.info('questionId', questionId);
            logger.info(`✅ Inserted MCQ (ID: ${questionId})`);
            // Insert options into tb_mcqOptions
            for (const option of mcqoptions) {
                await model.insertMcqOptions(questionId, option);
                logger.info(`🔹 Inserted option for question ${questionId}: ${option}`);
            }

            logger.info(`🔹 Option added to question ${questionId}: ${options}`);
            // Insert explanation into tb_mcqExplanation
            if (explanationText) {
                await model.insertMcqExplanation(questionId, explanationHeading, explanationText);
                logger.info(`📝 Explanation added for question ${questionId}`);
            }
            if (info) {
                await model.insertAdditionalInfo(questionId, info, infoImage);
                logger.info(`📝 Additional information added for question ${questionId}`);
            }
            return res.status(201).json({
                result: true,
                message: 'MCQ question added successfully',
                data: {
                    questionId,
                    question,
                    question_type_id,
                    answer,
                    exam_type,
                    difficulty,
                    exhibit,
                    mcqoptions,
                    explanationHeading,
                    explanationText,
                    info,
                    infoImage
                }
            });
        }

        if (questionType.toLowerCase().trim() === 'dropdown') {
            const {
                question,
                tabs,
                dropdowns,
                answers
            } = req.body;

            const qstabs = typeof tabs === 'string' ? JSON.parse(tabs) : tabs;

            const dropdowndetails = typeof dropdowns === 'string' ? JSON.parse(dropdowns) : dropdowns;

            const Dropdownanswers = typeof answers === 'string' ? JSON.parse(answers) : answers;

            // Insert question into tb_dropdownQuestion
            const questionResult = await model.insertDropdownQuestion(question, question_type_id, exam_type, difficulty, courseId);

            const questionId = questionResult.insertId;

            logger.info(`✅ Added dropdown question with ID: ${questionId}`);
            // Insert tabs into tb_DropdownQuestionTabs
            for (const tab of qstabs) {
                await model.insertTab(questionId, tab.tabKey, tab.tabValue);
                logger.info(`📄 Inserted tab "${tab.tabKey}" for question ${questionId}`);
            }

            // Insert dropdown fields into tb_dropdowns
            // Insert dropdown fields into tb_dropdowns
            if (Array.isArray(dropdowndetails)) {
                for (const dropdown of dropdowndetails) {
                    let adddropdownheading = await model.insertDropdownHeading(
                        questionId,
                        dropdown.dropdownField,
                        dropdown.dropdownanswer,
                        dropdown.blank_or_not
                    );

                    logger.info(
                        `🔽 Dropdown field question text "${dropdown.dropdownField}" and answer "${dropdown.dropdownanswer}"`
                    );

                    const headingtextId = adddropdownheading.insertId;

                    if (Array.isArray(dropdown.dropDowneOption)) {
                        for (const value of dropdown.dropDowneOption) {
                            await model.insertDropdownHeadingOptions(questionId, headingtextId, value);
                            logger.info(
                                `🔽 Dropdown field options question heading "${dropdown.dropdownField}" -> "${value}"`
                            );
                        }
                    } else {
                        logger.warn(`⚠️ No dropdown options found for "${dropdown.dropdownField}", skipping options.`);
                    }
                }
            } else {
                logger.error('❌ dropdowndetails is not a valid array or missing from request body');
                return res.status(400).json({
                    result: false,
                    message: 'Invalid or missing "dropdowns" array in request body.',
                });
            }


            // Insert explanation into tb_mcqExplanation
            if (explanationText) {
                await model.insertMcqExplanation(questionId, explanationHeading, explanationText);
                logger.info(`📝 Explanation added for question ${questionId}`);
            }
            if (info) {
                await model.insertAdditionalInfo(questionId, info, infoImage);
                logger.info(`📝 Additional information added for question ${questionId}`);
            }
            return res.status(201).json({
                result: true,
                message: "Dropdown question created successfully",
                data: {
                    questionId,
                    question,
                    question_type_id,
                    exam_type,
                    qstabs,
                    dropdowns,
                    Dropdownanswers,
                    difficulty,
                    explanationHeading,
                    explanationText,
                    info,
                    infoImage
                }

            });
        }

        if (questionType.toLowerCase().trim() === 'sorting') {
            const {
                question,
                sortItems
            } = req.body;

            const sorteditems = typeof sortItems === 'string' ? JSON.parse(sortItems) : sortItems;


            // Insert question into tb_dropdownQuestion
            const questionResult = await model.insertDropdownQuestion(question, question_type_id, exam_type, difficulty, courseId);
            const questionId = questionResult.insertId;
            logger.info(`✅ Added dropdown question with ID: ${questionId}`);
            // Insert tabs into tb_DropdownQuestionTabs
            for (const item of sorteditems) {
                await model.insertSortItems(questionId, item.sortItem, item.itemOrder);
                logger.info(`📄 Inserted sort items "${item.sortItem}" for question ${questionId}`);
            }
            // Insert explanation into tb_mcqExplanation
            if (explanationText) {
                await model.insertMcqExplanation(questionId, explanationHeading, explanationText);
                logger.info(`📝 Explanation added for question ${questionId}`);
            }
            if (info) {
                await model.insertAdditionalInfo(questionId, info, infoImage);
                logger.info(`📝 Additional information added for question ${questionId}`);
            }
            return res.status(201).json({
                result: true,
                message: "Sorting question created successfully",
                data: {
                    questionId,
                    question,
                    question_type_id,
                    exam_type,
                    sorteditems,
                    difficulty,
                    explanationHeading,
                    explanationText,
                    info,
                    infoImage
                }

            });
        }

        if (questionType.toLowerCase().trim() === 'sentence highlight') {
            const {
                question,
                tabs,
                answer,
                highlightoptions
            } = req.body;

            const qstabs = typeof tabs === 'string' ? JSON.parse(tabs) : tabs;


            // Insert question into tb_dropdownQuestion
            const questionResult = await model.insertSentenceQuestion(question, question_type_id, answer, exam_type, difficulty,
                courseId,
                answer);
            const questionId = questionResult.insertId;
            logger.info(`✅ Added dropdown question with ID: ${questionId}`);
            // Insert tabs into tb_DropdownQuestionTabs

            for (const option of highlightoptions) {
                await model.insertHighlightOptionsortItems(questionId, option);
                logger.info(`🔹 Inserted option for question ${questionId}: ${option}`);
            }

            for (const tab of qstabs) {
                await model.insertTab(questionId, tab.tabKey, tab.tabValue);
                logger.info(`📄 Inserted tab "${tab.tabKey}" for question ${questionId}`);
            }
            // Insert explanation into tb_mcqExplanation
            await model.insertMcqExplanation(questionId, explanationHeading, explanationText);
            logger.info(`📝 Explanation added for question ${questionId}`);
            await model.insertAdditionalInfo(questionId, info, infoImage);
            logger.info(`📝 Additional information added for question ${questionId}`);
            return res.status(201).json({
                result: true,
                message: "Sentence Highlight question created successfully",
                data: {
                    questionId,
                    question,
                    question_type_id,
                    answer,
                    exam_type,
                    qstabs,
                    difficulty,
                    explanationHeading,
                    explanationText,
                    info,
                    infoImage
                }

            });
        }

        if (questionType.toLowerCase().trim() === 'fill in the blanks') {
            const {
                question,
                answer,
                question_content,
                options
            } = req.body;

            console.log("req.body : ", req.body);

            const FTBquestion_content = typeof question_content === 'string' ? JSON.parse(question_content) : question_content;
            const FTBoptions = typeof options === 'string' ? JSON.parse(options) : options;

            // Insert question into tb_dropdownQuestion
            const questionResult = await model.insertFillTheBlanksQuestion(question, question_type_id, answer, exam_type, difficulty,
                courseId,
            );
            const questionId = questionResult.insertId;

            logger.info(`✅ Added dropdown question with ID: ${questionId}`);

            for (const item of FTBquestion_content) {

                await model.insertFillBlankQuestionContent(questionId, item.question_text, item.fill_blanks_answer, item.blank_or_not);

                logger.info(`📄 Inserted fill in the blanks text "${item.question_text}" with answer ${item.fill_blanks_answer}  for question ${questionId}`);
            }
            for (const item of FTBoptions) {

                let heading = await model.insertFillBlankQuestionOptionsHeading(questionId, item.option_heading);
                logger.info(`📄 Inserted fill in the blanks options heading "${item.option_heading}" for question ${questionId}`);
                const heading_id = heading.insertId;

                for (const value of item.option_value) {
                    await model.insertFillBlankQuestionOptionsHeadingValues(questionId, heading_id, value);
                    logger.info(`🔽 fill in the blanks options heading values "${value}" -> "${value}"`);
                }
            }

            if (explanationText) {
                await model.insertMcqExplanation(questionId, explanationHeading, explanationText);
                logger.info(`📝 Explanation added for question ${questionId}`);
            }
            if (info) {
                await model.insertAdditionalInfo(questionId, info, infoImage);
                logger.info(`📝 Additional information added for question ${questionId}`);
            }
            return res.status(201).json({
                result: true,
                message: "Fill in the Blanks question created successfully",
                data: {
                    questionId,
                    question,
                    question_type_id,
                    answer,
                    exam_type,
                    FTBquestion_content,
                    FTBoptions,
                    difficulty,
                    explanationHeading,
                    explanationText,
                    info,
                    infoImage
                }

            });
        }

        if (questionType.toLowerCase().trim() === 'drag drop') {

            const {
                question,
                drag_drop_content,
                tabs,
                drag_and_drop
            } = req.body;
            // Insert question into tb_dropdownQuestion
            const questionResult = await model.insertDragDropQuestion(question, question_type_id, exam_type, drag_drop_content, difficulty, courseId,
            );
            const questionId = questionResult.insertId;
            logger.info(`✅ Added Drag Drop question with ID: ${questionId}`);
            // Insert tabs into tb_DropdownQuestionTabs
            for (const tab of tabs) {
                await model.insertTab(questionId, tab.tabKey, tab.tabValue);
                logger.info(`📄 Inserted Drag Drop tab "${tab.tabKey}" for question ${questionId}`);
            }
            // Insert dropdown fields into tb_dropdowns
            for (const item of drag_and_drop) {
                console.log(drag_and_drop, "options");

                let heading = await model.insertDragDropOptionsHeading(questionId, item.option_heading, item.question_answer);
                logger.info(`📄 Inserted Drag Drop options heading "${item.option_heading}" and asnser "${item.question_answer}" for question ${questionId}`);
                const heading_id = heading.insertId;

                for (const value of item.option_value) {
                    console.log("value :", value);
                    await model.insertDragDropOptionsHeadingValues(questionId, heading_id, value);
                    logger.info(`🔽 Drag Drop options heading values "${value}" -> "${value}"`);
                }
            }

            // Insert explanation into tb_mcqExplanation
            if (explanationText) {
                await model.insertMcqExplanation(questionId, explanationHeading, explanationText);
                logger.info(`📝 Drag Drop Explanation added for question ${questionId}`);
            }
            if (info) {
                await model.insertAdditionalInfo(questionId, info, infoImage);
                logger.info(`📝 Drag Drop Additional information added for question ${questionId}`);
            }
            return res.status(201).json({
                result: true,
                message: "Drag and drop question created successfully",
                data: {
                    questionId,
                    question,
                    question_type_id,
                    exam_type,
                    drag_drop_content,
                    tabs,
                    drag_and_drop,
                    difficulty,
                    explanationHeading,
                    explanationText,
                    info,
                    infoImage
                }

            });

        }

        if (questionType.toLowerCase().trim() === 'multiple radio') {

            const {
                question,
                tabs,
                question_content,
                radio_options
            } = req.body;
            // Insert question into tb_dropdownQuestion
            const questionResult = await model.insertMultipleRadioQuestion(question, question_type_id, exam_type, difficulty,
                courseId,
            );
            const questionId = questionResult.insertId;
            logger.info(`✅ Added Multiple Radio question with ID: ${questionId}`);
            // Insert tabs into tb_DropdownQuestionTabs
            for (const tab of tabs) {
                await model.insertTab(questionId, tab.tabKey, tab.tabValue);
                logger.info(`📄 Multiple Radio Inserted tab "${tab.tabKey}" for question ${questionId}`);
            }
            // Insert dropdown fields into tb_dropdowns
            for (const item of question_content) {
                await model.insertMultipleRadioQuestionContent(questionId, item.question_text, item.question_answer);
                logger.info(`🔽 Multiple Radio "${item.question_text}" -> "${item}"`);

            }
            // Insert correct answers into tb_dropdownAnswer
            for (const item of radio_options) {
                await model.insertMultipleRadioOptions(questionId, item.option_value);
                logger.info(`✅  Multiple Radio option "${item.option_value}" added`);
            }
            // Insert explanation into tb_mcqExplanation
            if (explanationText) {
                await model.insertMcqExplanation(questionId, explanationHeading, explanationText);
                logger.info(`📝 Multiple Radio Explanation added for question ${questionId}`);
            }
            if (info) {
                await model.insertAdditionalInfo(questionId, info, infoImage);
                logger.info(`📝 Multiple Radio Additional information added for question ${questionId}`);
            }
            return res.status(201).json({
                result: true,
                message: "Multiple Radio question created successfully",
                data: {
                    questionId,
                    question,
                    question_type_id,
                    exam_type,
                    tabs,
                    question_content,
                    radio_options,
                    difficulty,
                    explanationHeading,
                    explanationText,
                    info,
                    infoImage
                }

            });

        }

    } catch (error) {
        logger.error(`❌ Failed to add question: ${error.message}`);
        return res.status(500).json({
            result: false,
            message: 'Internal Server Error',
            error: error.message,
        });
    }
};
/**
 * PUT /api/exam/question
 * Body: { id: int,questionType: string }
 */
module.exports.updateQuestion = async (req, res) => {
    const { id } = req.params;
    const { questionType } = req.body;
    logger.info('Attempting to update questionType by id: %s', id);
    try {
        // 2. Insert into DB
        const result = await model.updateQuestionType(questionType, id);
        if (result.affectedRows === 0) {
            logger.error('No rows affected inserting questionType: %s', questionType);
            return res.status(500).json({
                result: false,
                message: 'Failed to add questionType in the database',
            });
        }
        logger.info('Successfully inserted questionType: %s', questionType);
        return res.status(200).json({
            result: true,
            message: 'Question type updated successfully',
            data: { id: id, questionType: questionType }
        });

    } catch (error) {
        // 3. Log unexpected errors
        logger.error('updateQuestionType error: %o', error);
        return res.status(500).json({
            result: false,
            message: error.message || 'Internal Server Error',
        });
    }
};
/**
 * PATCH /api/exam/question
 * Body: { id: int }
 */
module.exports.deleteQuestion = async (req, res) => {
    const { id } = req.params;
    logger.info('Attempting to delete questionType: %s', id);
    try {
        // 2. Insert into DB
        const result = await model.deleteQuestionType(id);
        if (result.affectedRows === 0) {
            logger.error('No rows affected deleting questionType: %s', id);
            return res.status(500).json({
                result: false,
                message: 'Failed to delete questionType in the database',
            });
        }
        logger.info('Successfully inserted questionType: %s', id);
        return res.status(200).json({
            result: true,
            message: 'Question type deleted successfully',
            data: result
        });

    } catch (error) {
        // 3. Log unexpected errors
        logger.error('deleteQuestionType error: %o', error);
        return res.status(500).json({
            result: false,
            message: error.message || 'Internal Server Error',
        });
    }
};

// logger.info('Attempting to delete questionType: %s', id);

module.exports.getQuestions = async (req, res) => {
    try {
        const count = parseInt(req.query.count) || 10;
        const requestedTypesRaw = req.query.types || [];
        const requestedTypes = Array.isArray(requestedTypesRaw)
            ? requestedTypesRaw
            : [requestedTypesRaw];

        const { courseId } = req.body
        let condition = ``
        if (courseId) {
            condition += ` and courseId='${courseId}'`
        }

        // ✅ FETCH FUNCTIONS

        const fetchMcqQuestions = async (condition) => {
            let McqQuestions = await model.getMcqQuestions(condition);
            return await Promise.all(
                McqQuestions.map(async (el) => {
                    let questionId = el.id;
                    el.mcqoptions = await model.Getmcqoption(questionId);
                    el.AdditionalInfo = await model.getAdditionalInfo(questionId);
                    el.explantion = await model.Getexplantion(questionId);
                    return el;
                })
            );
        };

        const fetchDropdownQuestions = async (condition) => {
            let DropdownQuestions = await model.getDropdownQuestions(condition);
            return await Promise.all(
                DropdownQuestions.map(async (el) => {

                    let questionId = el.id;
                    let dropdownTexts = await model.Getdropdownquestiontext(questionId);
                    el.dropdownquestiontext = await Promise.all(
                        dropdownTexts.map(async (item) => {
                            item.dropdownoption = await model.Getdropdownoption(item.dropdowntext_id);
                            return item;
                        })
                    );
                    el.tabsInfo = await model.Gettabs(questionId);
                    el.AdditionalInfo = await model.getAdditionalInfo(questionId);
                    el.explantion = await model.Getexplantion(questionId);
                    return el;
                })
            );
        };

        const fetchSortingQuestions = async (condition) => {
            let SortingQuestions = await model.getSortingQuestions(condition);
            return await Promise.all(
                SortingQuestions.map(async (el) => {
                    let questionId = el.id;
                    el.sortingoptions = await model.Getsortingoption(questionId);
                    el.AdditionalInfo = await model.getAdditionalInfo(questionId);
                    el.explantion = await model.Getexplantion(questionId);
                    return el;
                })
            );
        };

        const fetchSentenceHighlightQuestions = async (condition) => {
            let SentenceHighlightQuestions = await model.getSentenceHighlightQuestions(condition);
            return await Promise.all(
                SentenceHighlightQuestions.map(async (el) => {
                    let questionId = el.id;
                    el.highlightoptions = await model.GetSentenceHighlightOptions(questionId);
                    el.tabsInfo = await model.Gettabs(questionId);
                    el.AdditionalInfo = await model.getAdditionalInfo(questionId);
                    el.explantion = await model.Getexplantion(questionId);
                    return el;
                })
            );
        };

        const fetchFillInTheBlanksQuestions = async (condition) => {
            let FillInTheBlanksQuestions = await model.getFillInTheBlanksQuestions(condition);
            return await Promise.all(
                FillInTheBlanksQuestions.map(async (el) => {
                    let questionId = el.id;
                    el.filltheblankstext = await model.GetFilltheblankstext(questionId);
                    el.filltheblanksoptions = await model.GetFilltheblankstextOptions(questionId);
                    el.AdditionalInfo = await model.getAdditionalInfo(questionId);
                    el.explantion = await model.Getexplantion(questionId);
                    return el;
                })
            );
        };

        const fetchDragDropQuestions = async (condition) => {
            let DragDropQuestions = await model.getDragDropQuestions(condition);
            return await Promise.all(
                DragDropQuestions.map(async (el) => {
                    let questionId = el.id;
                    let headings = await model.GetDragDropQuestionsheading(questionId);
                    el.dropdownquestiontext = await Promise.all(
                        headings.map(async (item) => {
                            item.dragdropoption = await model.GetDragDropoption(item.headings_id);
                            return item;
                        })
                    );
                    el.tabsInfo = await model.Gettabs(questionId);
                    el.AdditionalInfo = await model.getAdditionalInfo(questionId);
                    el.explantion = await model.Getexplantion(questionId);
                    return el;
                })
            );
        };

        const fetchMultipleRadioQuestions = async (condition) => {
            let MultipleRadioQuestions = await model.getMultipleRadioQuestions(condition);
            return await Promise.all(
                MultipleRadioQuestions.map(async (el) => {
                    let questionId = el.id;
                    el.clientfindings = await model.GetMultipleRadioQuestionsClientfindings(questionId);
                    el.RadioOption = await model.GetMultipleRadioQuestionsRadioOption(questionId);
                    el.tabsInfo = await model.Gettabs(questionId);
                    el.AdditionalInfo = await model.getAdditionalInfo(questionId);
                    el.explantion = await model.Getexplantion(questionId);
                    return el;
                })
            );
        };

        // ✅ MAP TYPES TO FUNCTIONS
        const allQuestionTypes = {
            mcq: fetchMcqQuestions,
            dropdown: fetchDropdownQuestions,
            sorting: fetchSortingQuestions,
            sentenc_highlight: fetchSentenceHighlightQuestions,
            fill_in_the_blanks: fetchFillInTheBlanksQuestions,
            drag_drop: fetchDragDropQuestions,
            multiple_radio: fetchMultipleRadioQuestions,
        };

        const selectedTypes = requestedTypes.length > 0
            ? requestedTypes.map(type => type.toLowerCase()).filter(type => allQuestionTypes[type])
            : Object.keys(allQuestionTypes);

        const questionsPerType = Math.ceil(count / selectedTypes.length);
        let allFetchedQuestions = [];

        for (const type of selectedTypes) {
            const fetchFn = allQuestionTypes[type];
            if (fetchFn) {
                const questions = await fetchFn();
                allFetchedQuestions = allFetchedQuestions.concat(questions.slice(0, questionsPerType));
            }
        }

        // ✅ SHUFFLE RESULTS
        const shuffled = allFetchedQuestions.sort(() => 0.5 - Math.random());
        const finalQuestions = shuffled.slice(0, count);

        return res.status(200).json({
            result: true,
            message: 'Questions fetched successfully',
            total: finalQuestions.length,
            data: finalQuestions,
        });

    } catch (error) {
        logger.error(`❌ Failed to fetch questions: ${error.message}`);
        return res.status(500).json({
            result: false,
            message: 'Internal Server Error',
            error: error.message,
        });
    }
};
module.exports.listMockTestQuestions = async (req, res) => {
    try {
        const questions = await model.listMockTestQuestions();
        return res.status(200).json({
            result: true,
            message: 'Mock Test questions retrieved successfully',
            count: questions.length,
            list: questions,
        });
    } catch (error) {
        logger.error(`❌ Failed to retrieve mock test questions: ${error.message}`);
        return res.status(500).json({
            result: false,
            message: 'Internal Server Error',
            error: error.message,
        });
    }
};
/**
 * PATCH /api/exam/tests
 * Body: {
  "testdate": "2025-08-10",
  "testType": "final",
  "questionIds": [12, 18, 35]
}
 */
module.exports.createTest = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({
                result: false,
                errors: errors.array().map(e => e.msg)
            });
        }
        const {
            testdate,
            testType,
            courseId,
            questionIds // Array of question id numbers
        } = req.body;
        // 1. Insert the test
        const testResult = await model.insertTest({
            testdate,
            testType,
            courseId
        });
        const testId = testResult.insertId;

        // 2. Insert into tb_testQuestions for each questionId
        if (Array.isArray(questionIds)) {
            for (const questionId of questionIds) {
                await model.insertTestQuestion({
                    testId,
                    questionId,
                });
            }
        }

        return res.status(201).json({
            result: true,
            message: 'Test created successfully',
            testId,
        });
    } catch (error) {
        logger.error(`❌ Failed to create test: ${error.message}`);
        return res.status(500).json({
            result: false,
            message: 'Internal Server Error',
            error: error.message,
        });
    }
};
module.exports.updateTest = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            testdate,
            testType,
            courseId,
            questionIds
        } = req.body;

        await model.updateTest({ id, testdate, testType, courseId });

        // Remove all old question links for this test
        await model.deleteTestQuestionsByTestId(id);

        // Insert the new links
        if (Array.isArray(questionIds)) {
            for (const questionId of questionIds) {
                await model.insertTestQuestion({ testId: id, questionId });
            }
        }

        return res.json({ result: true, message: 'Test updated successfully' });
    } catch (error) {
        logger.error(`❌ Failed to update test: ${error.message}`);
        return res.status(500).json({ result: false, message: 'Internal Server Error', error: error.message });
    }
};
module.exports.deleteTest = async (req, res) => {
    try {
        const { id } = req.params;
        // Delete links first
        await model.deleteTestQuestionsByTestId(id);
        // Delete the test
        await model.deleteTest(id);

        return res.json({ result: true, message: 'Test deleted successfully' });
    } catch (error) {
        logger.error(`❌ Failed to delete test: ${error.message}`);
        return res.status(500).json({ result: false, message: 'Internal Server Error', error: error.message });
    }
};
// Create new marklist
module.exports.createMarklist = async (req, res) => {
    // Log the incoming request body for traceability
    logger.info(' Received request to create new marklist', { body: req.body });

    try {
        // Destructure required fields
        const { studentId, testId, testStatus, mark } = req.body;

        // Validate presence (optional, if you haven't validated upstream)
        if (!studentId || !testId || !testStatus) {
            logger.warn(' Missing required marklist fields', { studentId, testId, testStatus, mark });
            return res.status(400).json({ result: false, message: 'Missing required fields.' });
        }

        // Call model to insert marklist record
        logger.info(' Inserting marklist record', { studentId, testId, testStatus, mark });
        const result = await model.insertMarklist({ studentId, testId, testStatus, mark });

        // Log the insert result
        logger.info('Marklist created successfully', { insertedId: result.insertId });

        // Respond with success status and the new record ID
        res.status(201).json({ result: true, message: 'Marklist created', id: result.insertId });
    } catch (error) {
        // Log error details for debugging
        logger.error(` Error creating marklist: ${error.message}`, { error });

        // Respond with error status
        res.status(500).json({ result: false, message: error.message });
    }
};
exports.updateMarklistByStudentId = async (req, res) => {
    try {
        const { studentId } = req.params;
        const { testId, testStatus, mark } = req.body;

        // Optional: log
        logger.info(`🔄 Updating marklist for studentId=${studentId}`, req.body);

        const result = await marklistModel.updateMarklistByStudentId(studentId, { testId, testStatus, mark });

        if (result.affectedRows === 0) {
            return res.status(404).json({ result: false, message: 'No marklist found for this studentId.' });
        }
        res.json({ result: true, message: 'Marklist updated', affectedRows: result.affectedRows });
    } catch (error) {
        logger.error(`❌ Failed to update marklist for studentId=${studentId}: ${error.message}`);
        res.status(500).json({ result: false, message: error.message });
    }
};
