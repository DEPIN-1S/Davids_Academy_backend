// src/validations/examValidation.js

const { body } = require('express-validator');

module.exports.questionTypeValidation = [
    body('questionType')
        .trim()
        .notEmpty()
        .withMessage('ExamType is required')
        .isLength({ max: 100 })
        .withMessage('ExamType must be at most 100 characters'),
];
module.exports.insertTestValidation = [
    body('testdate')
        .notEmpty().withMessage('Test date is required')
        .isISO8601().withMessage('Test date must be a valid date (YYYY-MM-DD)'),

    body('testType')
        .trim()
        .notEmpty().withMessage('Test type is required')
        .isLength({ max: 100 }).withMessage('Test type must be at most 100 characters'),

    body('questionId')
        .isArray({ min: 1 }).withMessage('questionIds must be a non-empty array'),

    body('questionId.*')
        .isInt({ min: 1 }).withMessage('Each questionId must be a positive integer'),
];