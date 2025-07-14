// src/controller/admin/examController.js

const { validationResult } = require('express-validator');
const model = require('../../model/admin/examModel');
const logger = require('../../utils/logger');  // Your Winston instance
/**
 * POST /api/exam/examType
 * Body: { examType: string }
 */
module.exports.createExamType = async (req, res) => {
    // 1. Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const msgs = errors.array().map(err => err.msg);
        logger.warn('Validation failed for createExamType: %o', msgs);
        return res.status(400).json({
            result: false,
            errors: msgs,
        });
    }
    const { examType } = req.body;
    logger.info('Attempting to insert ExamType: %s', examType);
    try {
        // 2. Insert into DB
        const result = await model.insertExamType(examType);
        if (result.affectedRows === 0) {
            logger.error('No rows affected inserting ExamType: %s', examType);
            return res.status(500).json({
                result: false,
                message: 'Failed to add ExamType in the database',
            });
        }
        logger.info('Successfully inserted ExamType: %s', examType);
        return res.status(200).json({
            result: true,
            message: 'Exam type saved successfully',
        });

    } catch (error) {
        // 3. Log unexpected errors
        logger.error('createExamType error: %o', error);
        return res.status(500).json({
            result: false,
            message: error.message || 'Internal Server Error',
        });
    }
};
/**
 * PATCH /api/exam/examType
 * Body: { id: int,examType: string }
 */
module.exports.updateExamType = async (req, res) => {
    // 1. Validate request
    const errors = validationResult(req);
    const { id } = req.params;
    const { examType } = req.body;
    logger.info('Attempting to update ExamType by id: %s', id);
    try {
        // 2. Insert into DB
        const result = await model.updateExamType(examType, id);
        if (result.affectedRows === 0) {
            logger.error('No rows affected inserting ExamType: %s', examType);
            return res.status(500).json({
                result: false,
                message: 'Failed to add ExamType in the database',
            });
        }
        logger.info('Successfully inserted ExamType: %s', examType);
        return res.status(200).json({
            result: true,
            message: 'Exam type updated successfully',
        });

    } catch (error) {
        // 3. Log unexpected errors
        logger.error('updateExamType error: %o', error);
        return res.status(500).json({
            result: false,
            message: error.message || 'Internal Server Error',
        });
    }
};
/**
 * PATCH /api/exam/examType
 * Body: { id: int }
 */
module.exports.deleteExamType = async (req, res) => {
    // 1. Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const msgs = errors.array().map(err => err.msg);
        logger.warn('Validation failed for createExamType: %o', msgs);
        return res.status(400).json({
            result: false,
            errors: msgs,
        });
    }
    const { examType } = req.body;
    logger.info('Attempting to insert ExamType: %s', examType);
    try {
        // 2. Insert into DB
        const result = await model.insertExamType(examType);
        if (result.affectedRows === 0) {
            logger.error('No rows affected inserting ExamType: %s', examType);
            return res.status(500).json({
                result: false,
                message: 'Failed to add ExamType in the database',
            });
        }
        logger.info('Successfully inserted ExamType: %s', examType);
        return res.status(200).json({
            result: true,
            message: 'Exam type saved successfully',
        });

    } catch (error) {
        // 3. Log unexpected errors
        logger.error('createExamType error: %o', error);
        return res.status(500).json({
            result: false,
            message: error.message || 'Internal Server Error',
        });
    }
};