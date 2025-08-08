var express = require('express')
var route = express.Router()
var { verifyToken } = require('../middleware/verifyAuth')


var { ContactUs } = require('../controller/contactus');
route.post('/contact-us', ContactUs)


module.exports = route;
