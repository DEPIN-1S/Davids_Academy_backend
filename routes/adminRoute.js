var express = require('express')
var route = express.Router()
var { verifyToken, verifyRole } = require('../middleware/verifyAuth')

const { ListContacts, UpdateStatus } = require('../controller/contactus');
route.post('/list/contact-us', verifyToken, verifyRole(["admin"]), ListContacts)
route.post('/contact-us/update-status', verifyToken, verifyRole(["admin"]), UpdateStatus)

const { CreateStudent, ListAllStudents, UpdateStudentStatus, EditStudent } = require('../controller/admin/student')
route.post('/student/create', verifyToken, verifyRole(["admin"]), CreateStudent)
route.post('/student/edit', verifyToken, verifyRole(["admin"]), EditStudent)
route.post('/student/list', verifyToken, verifyRole(["admin"]), ListAllStudents)
route.post('/student/update-status', verifyToken, verifyRole(["admin"]), UpdateStudentStatus)

module.exports = route