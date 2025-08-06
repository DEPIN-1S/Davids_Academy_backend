var express = require('express')
var route = express.Router()
var {verifyToken} = require('../middleware/verifyAuth')
var upload =require('../utils/multer')


var{ContactUs,ListContacts}= require('../controller/contactus');

route.post('/contact-us',ContactUs)

route.post('/list/contact-us',ListContacts)

module.exports = route;
