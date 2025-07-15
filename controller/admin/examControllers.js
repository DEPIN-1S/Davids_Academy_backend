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
            questionType,
            difficulty,
            subject,
            lesson,
            clientNeedArea,
            clientNeedTopic,
            explanationHeading,
            explanationText,
            info,
            infoImage
        } = req.body;

        // check for questionType
        if (questionType === 'MCQ') {
            const { question,
                answer,
                exhibit,
                options,
            } = req.body
            // Insert into tb_mcq
            const mcqResult = await model.insertMcqQuestion({
                question,
                answer,
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
            for (const option of options) {
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
                    answer,
                    difficulty,
                    subject,
                    lesson,
                    clientNeedArea,
                    clientNeedTopic,
                    exhibit,
                    options,
                    explanationHeading,
                    explanationText,
                    info,
                    infoImage
                }
            });
        }
        if (questionType === 'Dropdown') {
            const {
                question,
                tabs,
                dropdowns,
                answers
            } = req.body;
            // Insert question into tb_dropdownQuestion
            const questionResult = await model.insertDropdownQuestion(question, difficulty,
                subject,
                lesson,
                clientNeedArea,
                clientNeedTopic,);
            const questionId = questionResult.insertId;
            logger.info(`✅ Added dropdown question with ID: ${questionId}`);
            // Insert tabs into tb_DropdownQuestionTabs
            for (const tab of tabs) {
                await model.insertTab(questionId, tab.tabKey, tab.tabValue);
                logger.info(`📄 Inserted tab "${tab.tabKey}" for question ${questionId}`);
            }
            // Insert dropdown fields into tb_dropdowns
            for (const dropdown of dropdowns) {
                for (const value of dropdown.dropDownValue) {
                    await model.insertDropdownField(questionId, dropdown.dropdownField, value);
                    logger.info(`🔽 Dropdown field "${dropdown.dropdownField}" -> "${value}"`);
                }
            }
            // Insert correct answers into tb_dropdownAnswer
            for (const ans of answers) {
                await model.insertDropdownAnswer(questionId, ans.dropdownField, ans.dropdownValue);
                logger.info(`✅ Answer for "${ans.dropdownField}": ${ans.dropdownValue}`);
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
                    tabs,
                    dropdowns,
                    answers,
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
        if (questionType === 'Drag Drop') { }
        if (questionType === 'Multiple Radio') { }
        if (questionType === 'Sorting') {
            const {
                question,
                sortItems
            } = req.body;
            // Insert question into tb_dropdownQuestion
            const questionResult = await model.insertDropdownQuestion(question, difficulty,
                subject,
                lesson,
                clientNeedArea,
                clientNeedTopic);
            const questionId = questionResult.insertId;
            logger.info(`✅ Added dropdown question with ID: ${questionId}`);
            // Insert tabs into tb_DropdownQuestionTabs
            for (const item of sortItems) {
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
                    sortItems,
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
        if (questionType === 'Sentence Highlight') {
            const {
                question,
                tabs,
                answer
            } = req.body;
            // Insert question into tb_dropdownQuestion
            const questionResult = await model.insertSentenceQuestion(question, difficulty,
                subject,
                lesson,
                clientNeedArea,
                clientNeedTopic, answer);
            const questionId = questionResult.insertId;
            logger.info(`✅ Added dropdown question with ID: ${questionId}`);
            // Insert tabs into tb_DropdownQuestionTabs
            for (const tab of tabs) {
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
                    answer,
                    tabs,
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
        if (questionType === 'Dropdown and Sort') { }
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