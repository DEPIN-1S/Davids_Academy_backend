var express = require('express')
var route = express.Router()
var { verifyToken, verifyRole } = require('../middleware/verifyAuth')
var upload = require('../utils/multer')

const { ListContacts, UpdateStatus } = require('../controller/contactus');
route.post('/list/contact-us', verifyToken, verifyRole(["admin"]), ListContacts)
route.post('/contact-us/update-status', verifyToken, verifyRole(["admin"]), UpdateStatus)

const { CreateStudent, ListAllStudents, UpdateStudentStatus, EditStudent, ListStudentSubmittedTest, ListSubmittedQuestion,AdminResetPassword } = require('../controller/admin/student')
route.post('/student/create', verifyToken, verifyRole(["admin"]), CreateStudent)
route.post('/student/edit', verifyToken, verifyRole(["admin"]), EditStudent)
route.post('/student/list', verifyToken, verifyRole(["admin"]), ListAllStudents)
route.post('/student/update-status', verifyToken, verifyRole(["admin"]), UpdateStudentStatus)
route.post('/student/test', verifyToken, verifyRole(["admin"]), ListStudentSubmittedTest)
route.post('/student/test/questions', verifyToken, verifyRole(["admin"]), ListSubmittedQuestion)
route.post('/student/reset-password', verifyToken, verifyRole(["admin"]),AdminResetPassword)


const { InsertRecord, ListAllRecordings, EditRecordings, DeleteRecordings } = require('../controller/admin/records')
route.post('/record/create', verifyToken, verifyRole(["admin"]), upload.fields([{ name: 'recordimage', maxCount: 1 }]), InsertRecord)
route.post('/record/edit', verifyToken, verifyRole(["admin"]), upload.fields([{ name: 'recordimage', maxCount: 1 }]), EditRecordings)
route.post('/record/list', verifyToken, verifyRole(["admin"]), ListAllRecordings)
route.post('/record/delete', verifyToken, verifyRole(["admin"]), DeleteRecordings)



const {CreateSuccessStory, EditSuccessStory,DeleteSuccessStory, } = require('../controller/admin/successStory')
route.post('/success-story/create', verifyToken, verifyRole(["admin"]), upload.single('image'), CreateSuccessStory);

// Edit - Accepts 'image' (or keep old via body)
route.put('/success-story/edit/:id', verifyToken, verifyRole(["admin"]), upload.single('image'), EditSuccessStory);

// Delete
route.delete('/success-story/:id', verifyToken, verifyRole(["admin"]), DeleteSuccessStory);




const { GetDashboard } = require('../controller/admin/dashboard')
route.get('/dashboard', verifyToken, verifyRole(["admin"]), GetDashboard)

module.exports = route