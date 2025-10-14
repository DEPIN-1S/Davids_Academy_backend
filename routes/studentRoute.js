var express = require('express')
var route = express.Router()
var { verifyToken } = require('../middleware/verifyAuth')

var { ContactUs } = require('../controller/contactus');
route.post('/contact-us', ContactUs)

const { CreateNote, EditNote, ListNotes, DeleteNote } = require('../controller/student/notes')
route.post('/note/create', verifyToken, CreateNote)
route.post('/note/edit', verifyToken, EditNote)
route.post('/note/list', verifyToken, ListNotes)
route.post('/note/delete', verifyToken, DeleteNote)

const { ListAllRecordings } = require('../controller/student/recordings')
route.post('/recodings/list', verifyToken, ListAllRecordings)

const { ListAllTests, ListTestQuestions, GetQuestionData, SubmitQuestions, SubmitTest } = require('../controller/student/tests')
route.get('/test/list', verifyToken, ListAllTests)
route.post('/test/questions', verifyToken, ListTestQuestions)
route.post('/test/question/data', verifyToken, GetQuestionData)
route.post('/test/question/submit', verifyToken, SubmitQuestions)
route.post('/test/submit', verifyToken, SubmitTest)

const { ListQuestionsFromQBank, GetQuestionDataFromQBank, GetSampleQuestionData } = require('../controller/student/questions')
route.get('/questions/list', verifyToken, ListQuestionsFromQBank)
route.post('/questions/data', verifyToken, GetQuestionDataFromQBank)
route.post('/questions/sample-questionnaire', GetSampleQuestionData)
const { ListSubmittedTest, ListTestResult } = require('../controller/student/result')
route.get('/result/list', verifyToken, ListSubmittedTest)
route.post('/result/data', verifyToken, ListTestResult)


const { GetSuccessStoriesPublic } = require('../controller/student/successStory')
route.get('/success-story/list', GetSuccessStoriesPublic)


module.exports = route;
