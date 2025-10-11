// Import the Express framework
var express = require('express');
// Create a new router instance
var route = express.Router();
// Import controller functions for authentication
const {
    CreateUser,
    VerifyOtp,
    ForgotPassword,
    Login,
    AdminResetPassword,
} = require('../controller/admin/loginControllers');
/**
 * @route   POST /user/create
 * @desc    Create a new user (sign-up/register)
 * @access  Public
 */
route.post('/user/create', CreateUser);
/**
 * @route   POST /user/verify-otp
 * @desc    Verify user email with OTP after registration
 * @access  Public
 */
route.post('/user/verify-otp', VerifyOtp);
/**
 * @route   POST /user/forgot-password
 * @desc    Handle forgot password by sending reset link or OTP
 * @access  Public
 */
route.post('/user/forgot-password', ForgotPassword);
/**
 * @route   POST /user/login
 * @desc    Login existing user and return token or session
 * @access  Public
 */
route.post('/login', Login);

route.post('/reset-password', AdminResetPassword);



// Export the router to be used in the main app
module.exports = route;
