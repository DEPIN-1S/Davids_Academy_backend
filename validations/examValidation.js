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
    // fromdate: required, valid date
    body('fromDate')
        .notEmpty().withMessage('From date is required')
        .isISO8601().withMessage('From date must be a valid date (YYYY-MM-DD)'),

    // todate: required, valid date, must be >= fromdate
    body('toDate')
        .notEmpty().withMessage('To date is required')
        .isISO8601().withMessage('To date must be a valid date (YYYY-MM-DD)')
        .custom((value, { req }) => {
            const fromDate = req.body.fromdate;
            if (!fromDate || !value) return true; // skip if previous validations fail
            const from = new Date(fromDate);
            const to = new Date(value);
            if (to < from) {
                throw new Error('To date must be on or after From date');
            }
            return true;
        }),

    // testType: required, trimmed, max length 100 characters
    body('testTitle')
        .trim()
        .notEmpty().withMessage('Test type is required')
        .isLength({ max: 100 }).withMessage('Test type must be at most 100 characters'),

    // courseId: required, positive integer
    body('courseId')
        .notEmpty().withMessage('Course id is required')
        .isInt({ min: 1 }).withMessage('Course id must be a positive integer'),

    // questionIds: required, non-empty array
    body('questionIds')
        .isArray({ min: 1 }).withMessage('questionIds must be a non-empty array'),

    // each questionId must be a positive integer
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