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


module.exports = route;
