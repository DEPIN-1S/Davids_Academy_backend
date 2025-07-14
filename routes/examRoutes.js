// Import the Express framework
var express = require('express');
// Create a new router instance
var route = express.Router();
const { examTypeValidation } = require('../validations/examValidation');
// Import controller functions for authentication
const { createExamType, updateExamType, deleteExamType } = require('../controller/admin/examControllers');
/**
 * @route   POST /examType
 * @desc    Validate and insert a new exam type into the database
 * @access  Private
 */
route.post('/examType', examTypeValidation, createExamType);
/**
 * @route   PATCH /examType
 * @desc   update exam type from the database
 * @access  Public
 */
route.patch('/examType/:id', examTypeValidation, updateExamType);
/**
 * @route   PATCH /examType
 * @desc    Delete  exam type from the database
 * @access  Public
 */
route.delete('/examType/:id', examTypeValidation, deleteExamType);
// Export the router to be used in the main app
module.exports = route;
