var express = require('express')
var route = express.Router()
var {verifyToken} = require('../middleware/verifyAuth')
var upload =require('../utils/multer')

const{CreateCourse,ListCourses,DeleteCourses,UpdateCourse}= require('../controller/admin/course')
//create course route
route.post('/create/course',upload.fields([{ name: 'courseimage', maxCount: 1 }]),CreateCourse)

//list course route
route.get('/list/courses',ListCourses)

//edit course route
route.post('/update/course',upload.fields([{ name: 'courseimage', maxCount: 1 }]),UpdateCourse)

//delete course route
route.delete('/delete/course/:cs_id',DeleteCourses)



module.exports= route