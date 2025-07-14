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
