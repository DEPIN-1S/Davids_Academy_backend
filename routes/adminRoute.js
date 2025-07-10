var express = require('express')
var route = express.Router()

const { CreateUser, VerifyOtp, ForgotPassword, Login } = require('../controller/admin/login')
route.post('/user/create', CreateUser)
route.post('/user/verify-otp', VerifyOtp)
route.post('/user/forgot-password', ForgotPassword)
route.post('/user/login', Login)


module.exports = route