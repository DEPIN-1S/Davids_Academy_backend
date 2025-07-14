// Import the Express framework
var express = require('express');
// Create a new router instance
var route = express.Router();
const { examTypeValidation } = require('../validations/examValidation');
// Import controller functions for authentication
const { postExamType } = require('../controller/admin/examController');

route.post('/examType', examTypeValidation, postExamType);
// Export the router to be used in the main app
module.exports = route;
