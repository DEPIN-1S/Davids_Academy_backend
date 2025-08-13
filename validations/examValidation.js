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
    body('fromDate')
        .notEmpty().withMessage('From date is required')
        .isISO8601().withMessage('From date must be a valid date (YYYY-MM-DD)'),

    body('toDate')
        .notEmpty().withMessage('To date is required')
        .isISO8601().withMessage('To date must be a valid date (YYYY-MM-DD)'),

    body('testType')
        .trim()
        .notEmpty().withMessage('Test type is required')
        .isLength({ max: 100 }).withMessage('Test type must be at most 100 characters'),

    body('courseId')
        .trim()
        .notEmpty().withMessage('Course id is required')
        .isNumeric().withMessage('Course id must be the id of the course'),

    body('questionIds')
        .isArray({ min: 1 }).withMessage('questionIds must be a non-empty array'),

    body('questionIds.*')
        .isInt({ min: 1 }).withMessage('Each questionId must be a positive integer'),
];
module.exports.marklistCreateValidation = [
    body('studentId')
        .notEmpty().withMessage('studentId is required')
        .isInt({ min: 1 }).withMessage('studentId must be a positive integer'),

    body('testId')
        .notEmpty().withMessage('testId is required')
        .isInt({ min: 1 }).withMessage('testId must be a positive integer'),

    body('testStatus')
        .notEmpty().withMessage('testStatus is required')
        .isIn([1, 2]).withMessage('testStatus must be 1 (ongoing) or 2 (completed)'),
    body('mark')
        .notEmpty().withMessage('Mark is required')
        .isFloat({ min: 1 }).withMessage('Mark must be a positive number')

];