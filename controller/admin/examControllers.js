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