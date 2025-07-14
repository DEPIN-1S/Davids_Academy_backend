// Import the Express framework
var express = require('express');
// Create a new router instance
var route = express.Router();
const { questionTypeValidation } = require('../validations/examValidation');
// Import controller functions for authentication
const { createQuestionType, updateQuestionType, deleteQuestionType } = require('../controller/admin/examControllers');
/**
 * @route   POST /examType
 * @desc    Validate and insert a new exam type into the database
 * @access  Private
 */
route.post('/questionType', questionTypeValidation, createQuestionType);
/**
 * @route   PATCH /questionType
 * @desc   update exam type from the database
 * @access  Public
 */
route.patch('/questionType/:id', questionTypeValidation, updateQuestionType);
/**
 * @route   PATCH /questionType
 * @desc    Delete  exam type from the database
 * @access  Public
 */
route.delete('/questionType/:id', questionTypeValidation, deleteQuestionType);
// Export the router to be used in the main app
module.exports = route;
