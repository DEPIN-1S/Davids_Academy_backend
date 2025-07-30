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
            subject,
            lesson,
            clientNeedArea,
            clientNeedTopic,
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
                answer,
                exam_type,
                difficulty,
                subject,
                lesson,
                clientNeedArea,
                clientNeedTopic,
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
                    subject,
                    lesson,
                    clientNeedArea,
                    clientNeedTopic,
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
            const questionResult = await model.insertDropdownQuestion(question, question_type_id, exam_type, difficulty,
                subject,
                lesson,
                clientNeedArea,
                clientNeedTopic);

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
                    subject,
                    lesson,
                    clientNeedArea,
                    clientNeedTopic,
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
            const questionResult = await model.insertDropdownQuestion(question, question_type_id, exam_type, difficulty,
                subject,
                lesson,
                clientNeedArea,
                clientNeedTopic);
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
                    subject,
                    lesson,
                    clientNeedArea,
                    clientNeedTopic,
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
                answer
            } = req.body;

            const qstabs = typeof tabs === 'string' ? JSON.parse(tabs) : tabs;


            // Insert question into tb_dropdownQuestion
            const questionResult = await model.insertSentenceQuestion(question, question_type_id, exam_type, difficulty,
                subject,
                lesson,
                clientNeedArea,
                clientNeedTopic, answer);
            const questionId = questionResult.insertId;
            logger.info(`✅ Added dropdown question with ID: ${questionId}`);
            // Insert tabs into tb_DropdownQuestionTabs
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
                    subject,
                    lesson,
                    clientNeedArea,
                    clientNeedTopic,
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
                subject,
                lesson,
                clientNeedArea,
                clientNeedTopic);
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
                    subject,
                    lesson,
                    clientNeedArea,
                    clientNeedTopic,
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
            const questionResult = await model.insertDragDropQuestion(question, question_type_id, exam_type, drag_drop_content, difficulty,
                subject,
                lesson,
                clientNeedArea,
                clientNeedTopic,);
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
                    subject,
                    lesson,
                    clientNeedArea,
                    clientNeedTopic,
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
                subject,
                lesson,
                clientNeedArea,
                clientNeedTopic,);
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
                    subject,
                    lesson,
                    clientNeedArea,
                    clientNeedTopic,
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
        const requestedTypes = req.query.types || []; // Array like ['mcq', 'dropdown']

        let McqQuestions = await model.getMcqQuestions()
        let DropdownQuestions = await model.getDropdownQuestions()
        let FillInTheBlanksQuestions = await model.getFillInTheBlanksQuestions()
        let getDragDropQuestions = await model.getDragDropQuestions()
        let getMultipleRadioQuestions = await model.getMultipleRadioQuestions()
        let SortingQuestions = await model.getSortingQuestions()
        let SentenceHighlightQuestions = await model.getSentenceHighlightQuestions()

        //mcq question
        let getMcqQuestions = await Promise.all(
            McqQuestions.map(async (el) => {
                let questionId = el.id
                let getmcqoption = await model.Getmcqoption(questionId)
                let getAdditionalInfo = await model.getAdditionalInfo(questionId)
                let Getexplantion = await model.Getexplantion(questionId)

                el.mcqoptions = getmcqoption
                el.AdditionalInfo = getAdditionalInfo
                el.explantion = Getexplantion

                return el
            })
        )

        //dropdown question

        let getDropdownQuestions = await Promise.all(
            DropdownQuestions.map(async (el) => {
                let questionId = el.id;

                // Get dropdown question text
                let getdropdownquestiontext = await model.Getdropdownquestiontext(questionId);

                // For each dropdown text, fetch its options
                let dropdownTextsWithOptions = await Promise.all(
                    getdropdownquestiontext.map(async (item) => {
                        let dropdowntext_id = item.dropdowntext_id;
                        let getdropdownoption = await model.Getdropdownoption(dropdowntext_id);
                        item.dropdownoption = getdropdownoption;
                        return item;
                    })
                );

                // Fetch other related data
                let Gettabs = await model.Gettabs(questionId);
                let getAdditionalInfo = await model.getAdditionalInfo(questionId);
                let Getexplantion = await model.Getexplantion(questionId);

                // Add all collected info to `el`
                el.dropdownquestiontext = dropdownTextsWithOptions;
                el.tabsInfo = Gettabs;
                el.AdditionalInfo = getAdditionalInfo;
                el.explantion = Getexplantion;

                return el;
            })
        );

        // sorting question
        let getSortingQuestions = await Promise.all(
            SortingQuestions.map(async (el) => {
                let questionId = el.id
                let getsortingoption = await model.Getsortingoption(questionId)
                let getAdditionalInfo = await model.getAdditionalInfo(questionId)
                let Getexplantion = await model.Getexplantion(questionId)

                el.sortingoptions = getsortingoption
                el.AdditionalInfo = getAdditionalInfo
                el.explantion = Getexplantion


                return el
            })
        )

        // sentance high light

        //  let getSentenceHighlightQuestions = await Promise.all(
        //     SentenceHighlightQuestions.map(async (el) => {
        //         let questionId = el.id
        //         let getsortingoption = await model.Getsortingoption(questionId)
        //         let getAdditionalInfo = await model.getAdditionalInfo(questionId)
        //         let Getexplantion = await model.Getexplantion(questionId)

        //         el.sortingoptions = getsortingoption
        //         el.AdditionalInfo = getAdditionalInfo
        //         el.explantion = Getexplantion


        //         return el
        //     })
        // )

        // fill in the blanks
        let getFillInTheBlanksQuestions = await Promise.all(
            FillInTheBlanksQuestions.map(async (el) => {
                let questionId = el.id;

                // Get dropdown question text
                let getFilltheblankstext = await model.GetFilltheblankstext(questionId);

                // For each dropdown text, fetch its options
                let FilltheblanksWithOptions = await Promise.all(
                    getFilltheblankstext.map(async (item) => {
                        let text_id = item.headings_id;
                        let getFilltheblanksOptions = await model.GetFilltheblankstextOptions(text_id);
                        item.FilltheblanksOptions = getFilltheblanksOptions;
                        return item;
                    })
                );

                // Fetch other related data
                let getAdditionalInfo = await model.getAdditionalInfo(questionId);
                let Getexplantion = await model.Getexplantion(questionId);

                // Add all collected info to `el`
                el.filltheblanksoptions = FilltheblanksWithOptions;
                el.AdditionalInfo = getAdditionalInfo;
                el.explantion = Getexplantion;

                return el;
            })
        );



        // Define all 7 types and corresponding model fetchers
        const allQuestionTypes = {
            mcq: getMcqQuestions,
            dropdown: getDropdownQuestions,
            sorting: getSortingQuestions,
            sentenc_highlight: getSentenceHighlightQuestions,
            fill_in_the_blanks: getFillInTheBlanksQuestions,
            drag_drop: getDragDropQuestions,
            multiple_radio: getMultipleRadioQuestions,
        };

        // Use requested types or all
        const selectedTypes = requestedTypes.length > 0
            ? requestedTypes.map(type => type.toLowerCase())
            : Object.keys(allQuestionTypes);

        // Calculate how many to fetch from each type
        const questionsPerType = Math.ceil(count / selectedTypes.length);
        let allFetchedQuestions = [];

        for (const type of selectedTypes) {
            const fetchFn = allQuestionTypes[type];
            if (fetchFn) {
                const questions = await fetchFn(questionsPerType); // Limit per type
                allFetchedQuestions = allFetchedQuestions.concat(questions);
            }
        }

        // Shuffle to randomize across types
        const shuffled = allFetchedQuestions.sort(() => 0.5 - Math.random());

        // Return only `count` number of questions
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
