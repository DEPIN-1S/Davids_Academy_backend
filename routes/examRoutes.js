// Import the Express framework
var express = require('express');
// Create a new router instance
var route = express.Router();
// const uploads = require('../uploads');
const uploads = require('../utils/multer')
const { questionTypeValidation } = require('../validations/examValidation');
// Import controller functions for authentication

const { getQuestions,createQuestionType, updateQuestionType, deleteQuestionType, createQuestion, updateQuestion, deleteQuestion } = require('../controller/admin/examControllers');
/**
 * @route   POST /questionType
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
/**
 * @route   POST /question
 * @desc    Validate and insert a question into the database
 * @access  Private
 */
route.post('/question', uploads.fields([{ name: 'infoimage', maxCount: 1 }]), createQuestion);
/**
 * @route   PUT /question
 * @desc    update question into the database
 * @access  Private
 */
route.put('/question/:id', updateQuestion);
/**
 * @route   PUT /question
 * @desc    update question into the database
 * @access  Private
 */
route.patch('/question/:id', deleteQuestion);

//exam question list route
route.post('/list/questions',getQuestions)


var{ListExamTypes,deleteExamTypes,AddExamTypes,UpdateExamTypes}= require('../controller/admin/questionTypes');

route.post('/add/question-types',AddExamTypes)

route.get('/list/question-types',ListExamTypes)

route.get('/edit/question-types',UpdateExamTypes)

route.post('/delete/question-types',deleteExamTypes)

module.exports = route;
