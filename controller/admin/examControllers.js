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
 * POST /api/exam/questionType
 * Body: { id: int }
 */
module.exports.uploadTabImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ result: false, message: 'No image file uploaded' });
        }

        const imageFile = req.file.filename;
        const imageUrl = `/uploads/tabImage/${imageFile}`;

        // Save image record to DB
        const insertId = await model.insertTabImage(imageUrl);

        res.status(201).json({
            result: true,
            message: 'Image uploaded successfully',
            data: { imageUrl }
        });
    } catch (error) {
        console.error(`❌ Failed to upload image: ${error.message}`);
        res.status(500).json({ result: false, message: 'Internal server error', error: error.message });
    }
};
// delete tabImage
module.exports.deleteTabImage = async (req, res) => {
    try {
        // Extract imageUrl from request - adjust as needed (body, query, or params)
        let { fileName } = req.body;
        fileName = '%' + fileName + '%';
        if (!fileName) {
            return res.status(400).json({ result: false, message: 'fileName is required' });
        }
        const deleteResult = await model.deleteTabImageByUrl(fileName);
        if (deleteResult.affectedRows === 0) {
            return res.status(404).json({ result: false, message: 'Image record not found' });
        }

        res.json({ result: true, message: 'Image deleted successfully' });
    } catch (error) {
        logger.error(`❌ Failed to delete image: ${error.message}`);
        res.status(500).json({ result: false, message: 'Internal server error', error: error.message });
    }
};
// check question text for duplicate get method
module.exports.checkQuestionExists = async (req, res) => {
    try {
        const { questionText } = req.query;
        if (!questionText) {
            return res.status(400).json({ result: false, message: 'questionText query parameter is required' });
        }
        const exists = await model.doesQuestionExist(questionText);
        if (exists) {
            return res.json({ result: false, message: 'Question already exists' });
        }
        res.json({ result: true, message: 'Question does not exist' });
    } catch (error) {
        console.error(`checkQuestionExists: ${error.message}`);
        res.status(500).json({ result: false, message: 'Internal server error', error: error.message });
    }
};
/**
 * POST /api/exam/question
 * Body: {  }
 */
module.exports.createQuestion = async (req, res) => {
    logger.info('📥 Received request to add new question');
    try {
        let {
            exam_type,
            question_type_id,
            questionType,
            difficulty,
            courseId,
            explanationHeading,
            explanationText,
            info,
            marks,
            topic_id
        } = req.body;
        console.log('exam_type', exam_type);
        exam_type = exam_type?.toLowerCase()?.trim();
        // For optional uploaded files
        let infoImageFile = req.files?.infoimage?.[0]?.filename || null;
        logger.info('Files received:', req.files);

        let infoImage = infoImageFile ? `/uploads/infoimages/${infoImageFile}` : null;
        let exhibitFile = req.files?.exhibit?.[0]?.filename || null;
        let exhibit = exhibitFile ? `/uploads/exhibit/${exhibitFile}` : null;
        // check for questionType
        if (questionType.toLowerCase().trim() === 'mcq') {
            const { question,
                answer,
                tabs,
                options,
                instructions
            } = req.body
            const qstabs = typeof tabs === 'string' ? JSON.parse(tabs) : tabs;
            let mcqoptions = typeof options === 'string' ? JSON.parse(options) : options;
            let mcqAnswer = typeof answer === 'string' ? JSON.parse(answer) : answer;
            // Insert into tb_mcq
            const mcqResult = await model.insertMcqQuestion({
                question,
                question_type_id,
                courseId,
                exam_type,
                difficulty,
                exhibit,
                marks,
                instructions,
                topic_id
            });
            const questionId = mcqResult.insertId;
            for (const ans of mcqAnswer) {
                const mcqAnswerResult = await model.insertMcqAnswer(questionId, ans);
            }


            logger.info('questionId', questionId);
            logger.info(`✅ Inserted MCQ (ID: ${questionId})`);
            // Insert tabs into tb_DropdownQuestionTabs
            for (const tab of qstabs) {
                await model.insertTab(questionId, tab.tabKey, tab.tabValue, tab.tabImage);
                logger.info(`📄 Inserted tab "${tab.tabKey}" for question ${questionId}`);
            }
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
                    instructions,
                    tabs: qstabs,
                    answer,
                    exam_type,
                    difficulty,
                    exhibit,
                    mcqoptions,
                    explanationHeading,
                    explanationText,
                    info,
                    infoImage,
                    marks
                }
            });
        }
        // insert dropdown question
        if (questionType.toLowerCase().trim() === 'dropdown') {
            const {
                question,
                tabs,
                dropdowns,
                answers,
                marks,
                instructions
            } = req.body;

            const qstabs = typeof tabs === 'string' ? JSON.parse(tabs) : tabs;

            const dropdowndetails = typeof dropdowns === 'string' ? JSON.parse(dropdowns) : dropdowns;

            const Dropdownanswers = typeof answers === 'string' ? JSON.parse(answers) : answers;

            // Insert question into tb_dropdownQuestion
            const questionResult = await model.insertDropdownQuestion(question, question_type_id, exam_type, difficulty, courseId, marks, instructions, topic_id);

            const questionId = questionResult.insertId;

            logger.info(`✅ Added dropdown question with ID: ${questionId}`);
            // Insert tabs into tb_DropdownQuestionTabs
            for (const tab of qstabs) {
                await model.insertTab(questionId, tab.tabKey, tab.tabValue, tab.tabImage);
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
                    instructions,
                    difficulty,
                    explanationHeading,
                    explanationText,
                    info,
                    infoImage
                }

            });
        }
        // insert sorting question
        if (questionType.toLowerCase().trim() === 'sorting') {
            const {
                question,
                tabs,
                sortItems,
                marks,
                instructions
            } = req.body;
            const sorteditems = typeof sortItems === 'string' ? JSON.parse(sortItems) : sortItems;
            const qstabs = typeof tabs === 'string' ? JSON.parse(tabs) : tabs;
            // Insert question into tb_dropdownQuestion
            const questionResult = await model.insertDropdownQuestion(question, question_type_id, exam_type, difficulty, courseId, marks, instructions, topic_id);
            const questionId = questionResult.insertId;
            for (const tab of qstabs) {
                await model.insertTab(questionId, tab.tabKey, tab.tabValue, tab.tabImage);
                logger.info(`📄 Inserted tab "${tab.tabKey}" for question ${questionId}`);
            }
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
                    tabs: qstabs,
                    instructions,
                    marks,
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
        // insert sentence highlight
        if (questionType.toLowerCase().trim() === 'sentence highlight') {
            let {
                question,
                tabs,
                passage,
                answers,
                highlightoptions,
                marks,
                instructions
            } = req.body;
            logger.info('tabs data testing', tabs);
            tabs = typeof tabs === 'string' ? JSON.parse(tabs) : tabs;
            highlightoptions = typeof highlightoptions === 'string' ? JSON.parse(highlightoptions) : highlightoptions;
            answers = typeof answers === 'string' ? JSON.parse(answers) : answers;
            // Insert question into tb_dropdownQuestion
            const questionResult = await model.insertSentenceQuestion(question, question_type_id, exam_type, difficulty, courseId, marks, passage, instructions, topic_id);
            const questionId = questionResult.insertId;
            logger.info(`✅ Added dropdown question with ID: ${questionId}`);
            // Insert tabs into tb_DropdownQuestionTabs
            for (const option of highlightoptions) {
                await model.insertHighlightOptionsortItems(questionId, option);
                logger.info(`🔹 Inserted option for question ${questionId}: ${option}`);
            }
            // insert answers to database
            for (const ans of answers) {
                await model.insertSentenceHiglightAnswers(questionId, ans);
                logger.info(`🔹 Inserted answer for question ${questionId}: ${ans}`);
            }
            for (const tab of tabs) {
                await model.insertTab(questionId, tab.tabKey, tab.tabValue, tab.tabImage);
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
                    answers,
                    exam_type,
                    tabs,
                    passage,
                    instructions,
                    highlightoptions,
                    difficulty,
                    explanationHeading,
                    explanationText,
                    info,
                    infoImage
                }

            });
        }
        // insert fill in the blanks
        if (questionType.toLowerCase().trim() === 'fill in the blanks') {
            const {
                question,
                answer,
                question_content,
                options,      // this comes as a JSON string in form-data
                tabs,         // tabs array with tabImage
                explanationHeading,
                explanationText,
                info,
                question_type_id,
                exam_type,
                difficulty,
                courseId,
                instructions
            } = req.body;
            // Parse options string safely into array
            let FTBoptions = [];
            try {
                FTBoptions = options ? JSON.parse(options) : [];
            } catch (error) {
                console.error('Failed to parse options JSON:', error);
                FTBoptions = [];
            }

            // Similarly parse question_content if needed
            let FTBquestion_content = [];
            try {
                FTBquestion_content = question_content ? JSON.parse(question_content) : [];
            } catch (error) {
                console.error('Failed to parse question_content JSON:', error);
                FTBquestion_content = [];
            }

            // Parse tabs array if present
            let FTBtabs = [];
            try {
                FTBtabs = tabs ? (typeof tabs === 'string' ? JSON.parse(tabs) : tabs) : [];
            } catch (error) {
                console.error('Failed to parse tabs JSON:', error);
                FTBtabs = [];
            }

            const questionResult = await model.insertFillTheBlanksQuestion(
                question,
                question_type_id,
                answer,
                exam_type,
                difficulty,
                courseId,
                marks,
                instructions,
                topic_id
            );
            const questionId = questionResult.insertId;
            logger.info(`✅ Added fill in the blanks question with ID: ${questionId}`);

            // Insert tabs if present
            for (const tab of FTBtabs) {
                await model.insertTab(questionId, tab.tabKey, tab.tabValue, tab.tabImage);
                logger.info(`📄 Inserted tab "${tab.tabKey}" for fill in the blanks question ${questionId}`);
            }

            // Insert question content
            for (const item of FTBquestion_content) {
                await model.insertFillBlankQuestionContent(
                    questionId,
                    item.question_text,
                    item.fill_blanks_answer,
                    item.blank_or_not
                );
                logger.info(`📄 Inserted fill in the blanks text "${item.question_text}" for question ${questionId}`);
            }

            // Insert options and their values
            for (const item of FTBoptions) {
                if (!item || !Array.isArray(item.option_value)) {
                    logger.warn(`Skipping invalid options item: ${JSON.stringify(item)}`);
                    continue;
                }

                let heading = await model.insertFillBlankQuestionOptionsHeading(questionId, item.option_heading);
                logger.info(`📄 Inserted option heading "${item.option_heading}" for question ${questionId}`);

                for (const value of item.option_value) {
                    await model.insertFillBlankQuestionOptionsHeadingValues(questionId, heading.insertId, value);
                    logger.info(`🔽 Inserted option value "${value}"`);
                }
            }

            // Explanation and additional info insertion here...
            if (explanationText) {
                await model.insertMcqExplanation(questionId, explanationHeading, explanationText);
                logger.info(`📝 Explanation added for question ${questionId}`);
            }
            if (info) {
                await model.insertAdditionalInfo(questionId, info, infoImage);
                logger.info(`📝 Additional info added for question ${questionId}`);
            }

            return res.status(201).json({
                result: true,
                message: "Fill in the Blanks question created successfully",
                data: {
                    questionId,
                    question,
                    question_type_id,
                    answer,
                    marks,
                    instructions,
                    exam_type,
                    tabs: FTBtabs,
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
        // insert drag drop question
        if (questionType.toLowerCase().trim() === 'drag drop') {

            const {
                question,
                drag_drop_content,
                explanationHeading,
                explanationText,
                info,
                question_type_id,
                exam_type,
                difficulty,
                courseId,
                marks,
                instructions
            } = req.body;

            // Parse tabs JSON string or use empty array if not present or invalid
            let tabs = [];
            try {
                tabs = typeof req.body.tabs === 'string' ? JSON.parse(req.body.tabs) : req.body.tabs || [];
            } catch (error) {
                console.error('Failed to parse tabs:', error);
                tabs = [];
            }

            // Parse drag_and_drop JSON string or use empty array if not present or invalid
            let drag_and_drop = [];
            try {
                drag_and_drop = typeof req.body.drag_and_drop === 'string' ? JSON.parse(req.body.drag_and_drop) : req.body.drag_and_drop || [];
            } catch (error) {
                console.error('Failed to parse drag_and_drop:', error);
                drag_and_drop = [];
            }

            // Insert question into tb_dropdownQuestion
            const questionResult = await model.insertDragDropQuestion(
                question,
                question_type_id,
                exam_type,
                drag_drop_content,
                difficulty,
                courseId,
                marks,
                instructions,
                topic_id
            );
            const questionId = questionResult.insertId;
            logger.info(`✅ Added Drag Drop question with ID: ${questionId}`);

            // Insert tabs into tb_DropdownQuestionTabs
            for (const tab of tabs) {
                await model.insertTab(questionId, tab.tabKey, tab.tabValue, tab.tabImage);
                logger.info(`📄 Inserted Drag Drop tab "${tab.tabKey}" for question ${questionId}`);
            }

            // Insert drag and drop options
            for (const item of drag_and_drop) {
                logger.info(`Processing drag_and_drop item`, item);

                const heading = await model.insertDragDropOptionsHeading(
                    questionId,
                    item.option_heading,
                    item.question_answer
                );
                logger.info(`📄 Inserted Drag Drop options heading "${item.option_heading}" and answer "${item.question_answer}" for question ${questionId}`);
                const heading_id = heading.insertId;

                for (const value of item.option_value) {
                    await model.insertDragDropOptionsHeadingValues(questionId, heading_id, value);
                    logger.info(`🔽 Drag Drop options heading values "${value}" saved`);
                }
            }

            // Explanations and additional info
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
                    marks,
                    instructions,
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
        // insert multiple radio question
        if (questionType.toLowerCase().trim() === 'multiple radio') {
            const {
                question,
                question_type_id,
                exam_type,
                difficulty,
                courseId,
                explanationHeading,
                explanationText,
                info,
                marks,
                instructions,
                multiradioHeading

            } = req.body;

            // Parse JSON string fields safely
            let tabs = [];
            try {
                tabs = typeof req.body.tabs === 'string' ? JSON.parse(req.body.tabs) : req.body.tabs || [];
            } catch (error) {
                console.error('Failed to parse tabs:', error);
                tabs = [];
            }

            let question_content = [];
            try {
                question_content = typeof req.body.question_content === 'string' ? JSON.parse(req.body.question_content) : req.body.question_content || [];
            } catch (error) {
                console.error('Failed to parse question_content:', error);
                question_content = [];
            }

            let radio_options = [];
            try {
                radio_options = typeof req.body.radio_options === 'string' ? JSON.parse(req.body.radio_options) : req.body.radio_options || [];
            } catch (error) {
                console.error('Failed to parse radio_options:', error);
                radio_options = [];
            }

            // Insert question into tb_dropdownQuestion
            const questionResult = await model.insertMultipleRadioQuestion(
                question,
                question_type_id,
                exam_type,
                difficulty,
                courseId,
                marks,
                instructions,
                multiradioHeading,
                topic_id
            );
            const questionId = questionResult.insertId;
            logger.info(`✅ Added Multiple Radio question with ID: ${questionId}`);

            // Insert tabs into tb_DropdownQuestionTabs
            for (const tab of tabs) {
                await model.insertTab(questionId, tab.tabKey, tab.tabValue, tab.tabImage);
                logger.info(`📄 Multiple Radio Inserted tab "${tab.tabKey}" for question ${questionId}`);
            }

            // Insert dropdown fields into tb_dropdowns
            for (const item of question_content) {
                await model.insertMultipleRadioQuestionContent(questionId, item.question_text, item.question_answer);
                logger.info(`🔽 Multiple Radio "${item.question_text}" -> "${item.question_answer}"`);
            }

            // Insert correct answers into tb_dropdownAnswer
            for (const item of radio_options) {
                await model.insertMultipleRadioOptions(questionId, item.option_value);
                logger.info(`✅ Multiple Radio option "${item.option_value}" added`);
            }

            // Insert explanation into tb_mcqExplanation
            if (explanationText) {
                await model.insertMcqExplanation(questionId, explanationHeading, explanationText);
                logger.info(`📝 Multiple Radio Explanation added for question ${questionId}`);
            }

            // Insert additional info
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
                    marks,
                    instructions,
                    tabs,
                    multiradioHeading,
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
        // Add after other question types in your createQuestion handler
        // Table Dropdown
        if (questionType.toLowerCase().trim() === 'table dropdown') {
            const {
                question,
                tabs,
                tableDropdownFields,          // rows/fields with dropdownOptions
                tableDropdownAnswers,         // [{ rowLabel, answer }]
                tableHeaders,                 // NEW: { leftHeader, rightHeader }
                marks,
                courseId,
                instructions,
                explanationHeading,
                explanationText,
                info,
                question_type_id,
                exam_type,
                difficulty,
            } = req.body;

            // Parse complex fields with guards
            let parsedTabs = [];
            let parsedFields = [];
            let parsedAnswers = [];
            let parsedHeaders = {};
            try {
                parsedTabs = typeof tabs === 'string' ? JSON.parse(tabs) : (tabs || []);
                parsedFields = typeof tableDropdownFields === 'string' ? JSON.parse(tableDropdownFields) : (tableDropdownFields || []);
                parsedAnswers = typeof tableDropdownAnswers === 'string' ? JSON.parse(tableDropdownAnswers) : (tableDropdownAnswers || []);
                parsedHeaders = typeof tableHeaders === 'string' ? JSON.parse(tableHeaders) : (tableHeaders || {});
            } catch (e) {
                logger.error('JSON parse error (tabs/fields/answers/headers):', e);
                return res.status(400).json({
                    result: false,
                    message: 'Invalid JSON in tabs/tableDropdownFields/tableDropdownAnswers/tableHeaders',
                });
            }

            // Basic validation
            if (!question) {
                return res.status(400).json({ result: false, message: 'question is required' });
            }
            if (!Array.isArray(parsedFields) || parsedFields.length === 0) {
                return res.status(400).json({ result: false, message: 'tableDropdownFields must be a non-empty array' });
            }

            // Insert question
            const questionResult = await model.insertTableDropdownQuestion(
                question,
                question_type_id,
                exam_type,
                difficulty,
                courseId,
                marks,
                instructions,
                topic_id
            );
            const questionId = questionResult.insertId;

            // Insert table headers (defaults if not provided)
            const leftHeader = parsedHeaders.leftHeader;
            const rightHeader = parsedHeaders.rightHeader;
            await model.insertTableDropdownHeaders(questionId, leftHeader, rightHeader);

            // Insert tabs
            if (Array.isArray(parsedTabs) && parsedTabs.length) {
                await Promise.all(
                    parsedTabs.map(tab => model.insertTab(questionId, tab.tabKey, tab.tabValue, tab.tabImage))
                );
            }

            // Insert rows and options
            for (const field of parsedFields) {
                const rowResult = await model.insertTableDropdownField(questionId, field.fieldLabel);
                const rowId = rowResult.insertId;
                if (Array.isArray(field.dropdownOptions) && field.dropdownOptions.length) {
                    await Promise.all(
                        field.dropdownOptions.map(opt => model.insertTableDropdownOption(questionId, rowId, opt))
                    );
                }
            }

            // Insert answers
            if (Array.isArray(parsedAnswers) && parsedAnswers.length) {
                await Promise.all(
                    parsedAnswers.map(ans => model.insertTableDropdownAnswer(questionId, ans.rowLabel, ans.answer))
                );
            }

            // Explanation and extra info
            if (explanationText) {
                await model.insertMcqExplanation(questionId, explanationHeading, explanationText);
            }
            if (info) {
                await model.insertAdditionalInfo(questionId, info, infoImage);
            }

            return res.status(201).json({
                result: true,
                message: 'Table Dropdown question created successfully',
                data: {
                    questionId,
                    question,
                    question_type_id,
                    exam_type,
                    difficulty,
                    marks,
                    tableHeaders: { leftHeader, rightHeader },
                    tabs: parsedTabs,
                    tableDropdownFields: parsedFields,
                    tableDropdownAnswers: parsedAnswers,
                    explanationHeading,
                    explanationText,
                    info,
                    infoImage
                }
            });
        }
        // Table Highlight
        if (questionType && questionType.toLowerCase().trim() === 'table highlight') {
            const {
                question,
                tabs,
                tableFields,           // [{ leftColumn: "text", rightColumn: "text" }, ...]
                answers,               // optional array of text answers to highlight
                tableHeaders,          // { leftHeader, rightHeader }
                marks,
                courseId,
                instructions,
                explanationHeading,
                explanationText,
                info,
                question_type_id,
                exam_type,
                difficulty,
            } = req.body;

            // Parse with guards
            let parsedTabs = [], parsedFields = [], parsedAnswers = [], parsedHeaders = {};
            try {
                parsedTabs = typeof tabs === 'string' ? JSON.parse(tabs) : (tabs || []);
                // Accept either 'tableFields' or legacy 'tableDropdownFields'
                const rawFields = req.body.tableFields ?? req.body.tableFields ?? [];
                parsedFields = typeof rawFields === 'string' ? JSON.parse(rawFields) : (rawFields || []);
                parsedAnswers = typeof answers === 'string' ? JSON.parse(answers) : (answers || []);
                parsedHeaders = typeof tableHeaders === 'string' ? JSON.parse(tableHeaders) : (tableHeaders || {});
            } catch (e) {
                logger.error('JSON parse error (tabs/fields/answers/headers):', e);
                return res.status(400).json({
                    result: false,
                    message: 'Invalid JSON in tabs/tableFields/answers/tableHeaders',
                });
            }

            // Validate
            if (!question) return res.status(400).json({ result: false, message: 'question is required' });
            if (!Array.isArray(parsedFields) || !parsedFields.length) {
                return res.status(400).json({ result: false, message: 'tableFields must be a non-empty array' });
            }

            // Insert question
            const questionResult = await model.insertTableDropdownQuestion(
                question, question_type_id, exam_type, difficulty, courseId, marks, instructions, topic_id
            );
            const questionId = questionResult.insertId;

            // Headers
            const leftHeader = parsedHeaders.leftHeader;
            const rightHeader = parsedHeaders.rightHeader;
            await model.insertTableDropdownHeaders(questionId, leftHeader, rightHeader);

            // Tabs
            if (Array.isArray(parsedTabs) && parsedTabs.length) {
                await Promise.all(parsedTabs.map(tab => model.insertTab(questionId, tab.tabKey, tab.tabValue, tab.tabImage)));
            }

            // Insert highlight rows (left/right text)
            let order = 1;
            for (const row of parsedFields) {
                const left = row.leftColumn ?? '';
                const right = row.rightColumn ?? '';
                await model.insertTableHighlightRow(questionId, left, right, order++);
            }

            // Optional answers
            if (Array.isArray(parsedAnswers) && parsedAnswers.length) {
                await Promise.all(parsedAnswers.map(ans => model.insertMcqAnswer(questionId, ans)));
            }

            // Explanation and extra info
            if (explanationText) await model.insertMcqExplanation(questionId, explanationHeading, explanationText);
            if (info) await model.insertAdditionalInfo(questionId, info, infoImage);

            return res.status(201).json({
                result: true,
                message: 'Table Highlight question created successfully',
                data: {
                    questionId,
                    question,
                    question_type_id,
                    exam_type,
                    difficulty,
                    marks,
                    tableHeaders: { leftHeader, rightHeader },
                    tabs: parsedTabs,
                    tableFields: parsedFields,
                    answers: parsedAnswers,
                    explanationHeading,
                    explanationText,
                    info,
                    infoImage
                }
            });
        }

        if (questionType && questionType.toLowerCase().trim() === 'multidropdown') {
            const {
                question,
                headers,          // e.g., ["Client", "Most Likely Complication", "Parameter to Monitor"]
                rows,             // see structure above
                tabs,
                marks,
                courseId,
                instructions,
                explanationHeading,
                explanationText,
                info,
                question_type_id,
                exam_type,
                difficulty,
            } = req.body;

            // Parse potentially stringified arrays
            let parsedHeaders = [], parsedRows = [], parsedTabs = [];
            try {
                parsedHeaders = typeof headers === 'string' ? JSON.parse(headers) : (headers || []);
                parsedRows = typeof rows === 'string' ? JSON.parse(rows) : (rows || []);
                parsedTabs = typeof tabs === 'string' ? JSON.parse(tabs) : (tabs || []);
            } catch (e) {
                logger.error('JSON parse error (headers/rows/tabs):', e);
                return res.status(400).json({ result: false, message: 'Invalid JSON in headers/rows/tabs' });
            }

            if (!question) return res.status(400).json({ result: false, message: 'question is required' });
            if (!Array.isArray(parsedHeaders) || parsedHeaders.length < 2) {
                return res.status(400).json({ result: false, message: 'headers must include at least two columns' });
            }
            if (!Array.isArray(parsedRows) || parsedRows.length === 0) {
                return res.status(400).json({ result: false, message: 'rows must be a non-empty array' });
            }

            // Insert question 
            const qRes = await model.insertTableDropdownQuestion(
                question, question_type_id, exam_type, difficulty, courseId, marks, instructions, topic_id
            );
            const questionId = qRes.insertId;

            // Headers
            await Promise.all(
                parsedHeaders.map((h, idx) => model.insertMultiDropdownHeader(questionId, idx, h))
            );

            // Tabs
            if (Array.isArray(parsedTabs) && parsedTabs.length) {
                await Promise.all(parsedTabs.map(tab => model.insertTab(questionId, tab.tabKey, tab.tabValue, tab.tabImage)));
            }

            // Rows + per-cell options/answers
            let order = 1;
            for (const r of parsedRows) {
                const rowRes = await model.insertMultiDropdownRow(questionId, r.rowLabel, order++);
                const rowId = rowRes.insertId;

                if (Array.isArray(r.columns)) {
                    for (const c of r.columns) {
                        const colIndex = Number(c.colIndex);
                        // insert options
                        if (Array.isArray(c.options)) {
                            await Promise.all(c.options.map(opt => model.insertMultiDropdownOption(questionId, rowId, colIndex, opt)));
                        }
                        // insert correct answer
                        if (typeof c.answer === 'string' && c.answer.length) {
                            await model.insertMultiDropdownAnswer(questionId, rowId, colIndex, c.answer);
                        }
                    }
                }
            }

            // Explanation and info
            if (explanationText) await model.insertMcqExplanation(questionId, explanationHeading, explanationText);
            if (info) await model.insertAdditionalInfo(questionId, info, infoImage);

            return res.status(201).json({
                result: true,
                message: 'Multi Dropdown question created successfully',
                data: {
                    questionId,
                    question,
                    headers: parsedHeaders,
                    rows: parsedRows,
                    tabs: parsedTabs,
                    marks,
                    difficulty,
                    instructions,
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
module.exports.getSampleQuestionnaireQuestionIds = async (req, res) => {
    try {
        const data = await model.fetchSampleQuestionnaireIds();
        return res.status(200).json({
            result: true,
            message: 'questionIds retrieved successfully',
            data: data,
        });
    } catch (error) {
        logger.error(`❌ Failed to retrieve  questions: ${error.message}`);
        return res.status(500).json({
            result: false,
            message: 'Internal Server Error',
            error: error.message,
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
module.exports.deleteQuestionById = async (req, res) => {
    const { id } = req.params;
    logger.info('Attempting to delete question ID: %s', id);
    try {
        // 1. Check if question is referenced in tb_testQuestions
        const isReferenced = await model.isQuestionReferenced(id);
        if (isReferenced) {
            logger.error('Question ID %s is referenced in tb_testQuestions. Cannot delete.', id);
            return res.status(409).json({
                result: false,
                message: 'Cannot delete question: It is referenced in tests.',
            });
        }
        // 2. Delete from DB
        const result = await model.deleteQuestionById(id);
        if (result.affectedRows === 0) {
            logger.error('No rows affected deleting question: %s', id);
            return res.status(404).json({
                result: false,
                message: 'Question not found or already deleted.',
            });
        }
        logger.info('Successfully deleted question: %s', id);
        return res.status(200).json({
            result: true,
            message: 'Question deleted successfully',
            data: result
        });

    } catch (error) {
        logger.error('deleteQuestion error: %o', error);
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
// Controller method with pagination support
module.exports.listQuestions = async (req, res) => {
    try {
        let { exam_type, limit = 10 } = req.query;
        let { page = 1, } = req.params;
        page = parseInt(page);
        limit = parseInt(limit);

        if (!exam_type) {
            return res.status(400).json({
                result: false,
                message: 'exam_type parameter is required',
            });
        }
        if (isNaN(page) || page < 1) page = 1;
        if (isNaN(limit) || limit < 1) limit = 10;

        exam_type = exam_type.toLowerCase();

        // Get total count of matching questions for pagination metadata
        const totalCount = await model.countQuestions(exam_type);

        // Calculate the offset for the query
        const offset = (page - 1) * limit;

        const questions = await model.listQuestionsPaginated(exam_type, limit, offset);

        return res.status(200).json({
            result: true,
            message: 'Questions retrieved successfully',
            count: questions.length,
            totalCount: totalCount,
            page: page,
            totalPages: Math.ceil(totalCount / limit),
            list: questions,
        });
    } catch (error) {
        logger.error(`❌ Failed to retrieve  questions: ${error.message}`);
        return res.status(500).json({
            result: false,
            message: 'Internal Server Error',
            error: error.message,
        });
    }
};
// list mock test questions
module.exports.listMockTestQuestions = async (req, res) => {
    try {
        const { courseId, topics } = req.query
        const questions = await model.listMockTestQuestions(courseId, topics);
        return res.status(200).json({
            result: true,
            message: 'Questions retrieved successfully',
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
  "testTitle": "final",
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
            fromDate,
            toDate,
            testTitle,
            courseId,
            questionIds // Array of question id numbers
        } = req.body;
        let totalQuestions = questionIds.length;
        // 1. Insert the test
        const testResult = await model.insertTest({
            fromDate,
            toDate,
            testTitle,
            courseId,
            totalQuestions
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
            data: {
                id: testId,
                fromDate,
                toDate,
                testTitle,
                courseId,
                totalQuestions
            },
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
// list test paginated
module.exports.listTestsPaginated = async (req, res) => {
    try {
        let page = parseInt(req.params.page, 10) || 1;
        let limit = parseInt(req.query.limit, 10) || 10;
        if (isNaN(page) || page < 1) page = 1;
        if (isNaN(limit) || limit < 1) limit = 10;
        // Get total count for pagination metadata
        const totalCount = await model.countTests();
        // Calculate offset
        const offset = (page - 1) * limit;

        // Get paginated tests
        const tests = await model.listTestsPaginated(limit, offset);
        const updated = await Promise.all(tests.map(async (el) => {
            const questionIdsResult = await model.fetchTestQuestionsById(el.id);
            const questionIds = questionIdsResult.map(q => q.questionId);
            return { ...el, questionIds };
        }));
        return res.status(200).json({
            result: true,
            message: 'Tests retrieved successfully',
            count: tests.length,
            totalCount: totalCount,
            page: page,
            totalPages: Math.ceil(totalCount / limit),
            list: updated
        });
    } catch (error) {
        logger.error(`❌ Failed to retrieve tests: ${error.message}`);
        return res.status(500).json({
            result: false,
            message: 'Internal Server Error',
            error: error.message,
        });
    }
};
// get test by id
module.exports.getTestById = async (req, res) => {
    try {
        const { id } = req.params;
        const testDataResult = await model.fetchTestById(id); // [ RowDataPacket { ... } ]
        const questionIdResult = await model.fetchTestQuestionsById(id); // [ RowDataPacket { questionId: ... }, ... ]
        // Extract test data from the first RowDataPacket
        const testData = testDataResult[0];
        // Map array of question RowDataPackets to array of questionId numbers
        const questionIds = questionIdResult.map(q => q.questionId);
        // Merge into final data format
        const responseData = {
            ...testData,
            questionIds
        };
        res.json({ data: responseData });
    } catch (error) {
        logger.error(`❌ Failed to fetch test: ${error.message}`);
        res.status(500).json({ result: false, message: 'Internal Server Error', error: error.message });
    }
};
// update  mock test 
module.exports.updateTest = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            fromDate,
            toDate,
            testTitle,
            courseId,
            questionIds
        } = req.body;
        let totalQuestions = questionIds.length;
        await model.updateTest(fromDate, toDate, testTitle, courseId, totalQuestions, id);
        // Remove all old question links for this test
        await model.deleteTestQuestionsByTestId(id);
        // Insert the new links
        if (Array.isArray(questionIds)) {
            for (const questionId of questionIds) {
                await model.insertTestQuestion({ testId: id, questionId });
            }
        }
        return res.json({
            result: true, message: 'Test updated successfully',
            data: {
                id,
                fromDate,
                toDate,
                testTitle,
                courseId,
                questionIds, totalQuestions
            }
        });
    } catch (error) {
        logger.error(`❌ Failed to update test: ${error.message}`);
        return res.status(500).json({ result: false, message: 'Internal Server Error', error: error.message });
    }
};
// delete mock test
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
