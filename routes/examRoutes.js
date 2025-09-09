// Import the Express framework
var express = require('express');
// Create a new router instance
var route = express.Router();
// const uploads = require('../uploads');
const uploads = require('../utils/multer')
var { verifyToken, verifyRole } = require('../middleware/verifyAuth')
const { questionTypeValidation, insertTestValidation, marklistCreateValidation } = require('../validations/examValidation');
// Import controller functions for authentication

const { getQuestions,
    createQuestionType,
    updateQuestionType,
    deleteQuestionType,
    createQuestion,
    updateQuestion,
    getSampleQuestionnaireQuestionIds,
    deleteQuestion,
    deleteQuestionById,
    listQuestions,
    listMockTestQuestions,
    createTest,
    getTest,
    listTestsPaginated,
    updateTest,
    deleteTest, createMarklist } = require('../controller/admin/examControllers');
/**
 * @route   POST /questionType
 * @desc    Validate and insert a new exam type into the database
 * @access  Private
 */
route.post('/questionType', verifyToken, questionTypeValidation, createQuestionType);
/**
 * @route   PATCH /questionType
 * @desc   update exam type from the database
 * @access  Public
 */
route.patch('/questionType/:id', verifyToken, questionTypeValidation, updateQuestionType);
/**
 * @route   PATCH /questionType
 * @desc    Delete  exam type from the database
 * @access  Public
 */
route.delete('/questionType/:id', verifyToken, questionTypeValidation, deleteQuestionType);
/**
 * @route   POST /question
 * @desc    Validate and insert a question into the database
 * @access  Private
 */
route.post('/question', verifyToken, uploads.fields([{ name: 'infoimage', maxCount: 1 }, { name: 'exhibit', maxCount: 1 }]), createQuestion);
/**
 * @route   POST /question
 * @desc    Validate and insert a question into the database
 * @access  Private
 */
route.get('/sample-questionnaire', verifyToken, getSampleQuestionnaireQuestionIds);
/**
 * @route   PUT /question
 * @desc    update question into the database
 * @access  Private
 */
route.put('/question/:id', verifyToken, updateQuestion);
/**
 * @route   PUT /question
 * @desc    update question into the database
 * @access  Private
 */
route.patch('/question/:id', verifyToken, deleteQuestion);

//exam question list route
route.post('/list/questions', verifyToken, getQuestions)


var { ListExamTypes, deleteExamTypes, AddExamTypes, UpdateExamTypes } = require('../controller/admin/questionTypes');

route.post('/add/question-types', verifyToken, AddExamTypes)

route.get('/list/question-types', verifyToken, ListExamTypes)

route.get('/edit/question-types', verifyToken, UpdateExamTypes)
// delete question type
route.post('/delete/question-types', verifyToken, deleteExamTypes)
// get all questions 
route.get(
    '/list/questions/:page', verifyToken,
    listQuestions
);
// get mock test questions
route.get(
    '/list/mock-test-questions', verifyToken,
    listMockTestQuestions
);
// delete question
route.delete(
    '/questions/:id', verifyToken,
    deleteQuestionById
);
// Create
route.post('/tests', verifyToken, insertTestValidation, createTest);
// list test get method
route.get('/list/test/:page', verifyToken, listTestsPaginated);
// // Read
// route.get('/tests/:id', getTest);
// Edit
route.put('/tests/:id', verifyToken, updateTest);
// Delete
route.delete('/tests/:id', verifyToken, deleteTest);
// Create
route.post('/marklist', verifyToken, marklistCreateValidation, createMarklist);
module.exports = route;
